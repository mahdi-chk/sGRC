import { execFile } from 'child_process';
import fs from 'fs';
import * as mammoth from 'mammoth';
import os from 'os';
import path from 'path';
import { createWorker } from 'tesseract.js';

export interface DocumentExtractionOptions {
    useOcrForPdf?: boolean;
    limitChars?: number | null;
    requireUsableText?: boolean;
    includeStructuredRegionsForImages?: boolean;
    maxPdfOcrPages?: number;
}

export interface ExtractedTextMetadata {
    format: 'pdf' | 'docx' | 'image';
    method: 'native' | 'ocr' | 'docx' | 'image-ocr';
    ocrUsed: boolean;
    scannedPdfLikely: boolean;
    nativeTextLength: number;
}

export interface ExtractedTextResult {
    text: string;
    metadata: ExtractedTextMetadata;
}

export class DocumentTextExtractor {
    private static readonly PDF_NATIVE_TEXT_MIN_CHARS = 120;
    private static readonly PDF_NATIVE_TEXT_MIN_WORDS = 20;
    private static readonly TESSERACT_NOISE_PATTERNS = [
        /Image too small to scale!!/i,
        /Line cannot be recognized!!/i,
    ];
    private static tesseractSilenceDepth = 0;
    private static originalStdoutWrite: typeof process.stdout.write | null = null;
    private static originalStderrWrite: typeof process.stderr.write | null = null;

    static cleanText(text: string): string {
        return text
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    static cleanTextPreserveLines(text: string): string {
        return text
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
            .split('\n')
            .map(line => line.replace(/[ \t]+/g, ' ').trim())
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    static limitText(text: string, maxChars: number = 4000): string {
        if (text.length <= maxChars) {
            return text;
        }

        return `${text.substring(0, maxChars)}... [Texte tronque]`;
    }

    private static hasEnoughExtractedText(text: string): boolean {
        const normalized = this.cleanText(text);
        if (normalized.length >= 80) {
            return true;
        }

        const words = normalized.split(/\s+/).filter(word => word.length > 1);
        return normalized.length >= 40 && words.length >= 6;
    }

    private static getTextStats(text: string): { length: number; words: number; alphaNumericChars: number } {
        const normalized = this.cleanText(text);
        return {
            length: normalized.length,
            words: normalized.split(/\s+/).filter(word => word.length > 1).length,
            alphaNumericChars: (normalized.match(/[A-Za-zÀ-ÿ0-9]/g) || []).length
        };
    }

    private static shouldRunPdfOcr(nativeText: string): boolean {
        const stats = this.getTextStats(nativeText);
        if (stats.length === 0) {
            return true;
        }

        if (stats.length >= 1200 && stats.words >= 180) {
            return false;
        }

        const alphaNumericRatio = stats.length > 0 ? stats.alphaNumericChars / stats.length : 0;
        if (alphaNumericRatio < 0.45) {
            return true;
        }

        return stats.length < this.PDF_NATIVE_TEXT_MIN_CHARS || stats.words < this.PDF_NATIVE_TEXT_MIN_WORDS;
    }

    private static normalizeOcrText(text: string): string {
        return text
            .split(/\r?\n/)
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(Boolean)
            .filter((line, index, all) => all.findIndex(item => item.toLowerCase() === line.toLowerCase()) === index)
            .join('\n');
    }

    private static getImageDimensions(buffer: Buffer): { width: number; height: number } | null {
        if (buffer.length < 24) {
            return null;
        }

        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
            return {
                width: buffer.readUInt32BE(16),
                height: buffer.readUInt32BE(20)
            };
        }

        if (buffer[0] === 0xff && buffer[1] === 0xd8) {
            let offset = 2;
            while (offset < buffer.length) {
                if (buffer[offset] !== 0xff) {
                    offset++;
                    continue;
                }

                const marker = buffer[offset + 1];
                const blockLength = buffer.readUInt16BE(offset + 2);
                const isStartOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);

                if (isStartOfFrame) {
                    return {
                        height: buffer.readUInt16BE(offset + 5),
                        width: buffer.readUInt16BE(offset + 7)
                    };
                }

                offset += 2 + blockLength;
            }
        }

        return null;
    }

    private static async recognizeRectangle(
        worker: any,
        image: Buffer,
        rectangle: { left: number; top: number; width: number; height: number },
        extraParams?: Record<string, string>
    ): Promise<string> {
        await worker.setParameters({
            preserve_interword_spaces: '1',
            tessedit_pageseg_mode: '11',
            ...extraParams
        } as any);

        const result = await worker.recognize(image, { rectangle });
        return (result.data.text || '').trim();
    }

    private static async extractIncidentFormRegions(worker: any, image: Buffer): Promise<string[]> {
        const dimensions = this.getImageDimensions(image);
        if (!dimensions) {
            return [];
        }

        const { width, height } = dimensions;
        const rect = (left: number, top: number, rectWidth: number, rectHeight: number) => ({
            left: Math.max(0, Math.round(width * left)),
            top: Math.max(0, Math.round(height * top)),
            width: Math.max(1, Math.round(width * rectWidth)),
            height: Math.max(1, Math.round(height * rectHeight))
        });

        const regions = [
            rect(0.34, 0.235, 0.12, 0.05),
            rect(0.60, 0.235, 0.14, 0.05),
            rect(0.28, 0.275, 0.22, 0.05),
            rect(0.29, 0.315, 0.14, 0.05),
            rect(0.62, 0.315, 0.10, 0.04),
            rect(0.76, 0.315, 0.10, 0.04),
            rect(0.90, 0.315, 0.08, 0.04),
            rect(0.43, 0.365, 0.18, 0.045),
            rect(0.43, 0.398, 0.18, 0.05),
            rect(0.43, 0.438, 0.18, 0.05),
            rect(0.66, 0.47, 0.12, 0.16)
        ];

        const results = await Promise.all([
            this.recognizeRectangle(worker, image, regions[0]),
            this.recognizeRectangle(worker, image, regions[1]),
            this.recognizeRectangle(worker, image, regions[2]),
            this.recognizeRectangle(worker, image, regions[3]),
            this.recognizeRectangle(worker, image, regions[4], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[5], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[6], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[7]),
            this.recognizeRectangle(worker, image, regions[8]),
            this.recognizeRectangle(worker, image, regions[9], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[10]),
        ]);

        return results
            .flatMap(text => text.split(/\r?\n/))
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(Boolean);
    }

    private static async extractTextFromImageBuffer(imageBuffer: Buffer, includeStructuredRegions: boolean): Promise<string> {
        return this.withSilencedTesseractNoise(async () => {
            const worker = await createWorker('fra', 1, {
                logger: () => undefined,
                errorHandler: () => undefined,
            });
            const ocrChunks: string[] = [];

            try {
                const collectOcrPass = async (params: Record<string, string>) => {
                    await worker.setParameters({
                        preserve_interword_spaces: '1',
                        ...params
                    } as any);
                    const result = await worker.recognize(imageBuffer);
                    const text = (result.data.text || '').trim();
                    if (text) {
                        ocrChunks.push(text);
                    }
                };

                await collectOcrPass({ tessedit_pageseg_mode: '6' });
                await collectOcrPass({ tessedit_pageseg_mode: '11' });
                await collectOcrPass({ tessedit_pageseg_mode: '4' });
                await collectOcrPass({
                    tessedit_pageseg_mode: '11',
                    tessedit_char_whitelist: '0123456789/.- '
                });
                await collectOcrPass({
                    tessedit_pageseg_mode: '11',
                    tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZAAAAEEEEIIOOUUUaaaaeeeeiioouuu -/'
                });

                if (includeStructuredRegions) {
                    const regionTexts = await this.extractIncidentFormRegions(worker, imageBuffer);
                    ocrChunks.push(...regionTexts);
                }
            } finally {
                await worker.terminate();
            }

            return this.normalizeOcrText(ocrChunks.join('\n'));
        });
    }

    private static withSilencedTesseractNoise<T>(work: () => Promise<T>): Promise<T> {
        if (typeof process === 'undefined' || !process.stdout || !process.stderr) {
            return work();
        }

        const shouldSuppress = (chunk: unknown): boolean => {
            const text = typeof chunk === 'string' ? chunk : Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk ?? '');
            return this.TESSERACT_NOISE_PATTERNS.some(pattern => pattern.test(text));
        };

        const installFilter = () => {
            if (this.tesseractSilenceDepth > 0) {
                this.tesseractSilenceDepth += 1;
                return;
            }

            this.tesseractSilenceDepth = 1;
            this.originalStdoutWrite = process.stdout.write.bind(process.stdout);
            this.originalStderrWrite = process.stderr.write.bind(process.stderr);

            process.stdout.write = ((chunk: any, encoding?: any, callback?: any) => {
                if (shouldSuppress(chunk)) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                    return true;
                }

                return this.originalStdoutWrite!(chunk, encoding, callback);
            }) as typeof process.stdout.write;

            process.stderr.write = ((chunk: any, encoding?: any, callback?: any) => {
                if (shouldSuppress(chunk)) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                    return true;
                }

                return this.originalStderrWrite!(chunk, encoding, callback);
            }) as typeof process.stderr.write;
        };

        const restoreFilter = () => {
            this.tesseractSilenceDepth -= 1;
            if (this.tesseractSilenceDepth > 0) {
                return;
            }

            if (this.originalStdoutWrite) {
                process.stdout.write = this.originalStdoutWrite;
            }

            if (this.originalStderrWrite) {
                process.stderr.write = this.originalStderrWrite;
            }

            this.originalStdoutWrite = null;
            this.originalStderrWrite = null;
            this.tesseractSilenceDepth = 0;
        };

        installFilter();

        return work().finally(() => {
            restoreFilter();
        });
    }

    private static execFileAsync(command: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
        return new Promise((resolve, reject) => {
            execFile(command, args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }, (error, stdout = '', stderr = '') => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({ stdout, stderr });
            });
        });
    }

    private static async commandExists(command: string): Promise<boolean> {
        const whereCommand = process.platform === 'win32' ? 'where' : 'which';

        return new Promise((resolve) => {
            execFile(whereCommand, [command], (error) => {
                resolve(!error);
            });
        });
    }

    private static async findExecutableRecursive(rootDir: string, executableName: string, maxDepth: number): Promise<string | null> {
        if (!rootDir || maxDepth < 0 || !fs.existsSync(rootDir)) {
            return null;
        }

        const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(rootDir, entry.name);

            if (entry.isFile() && entry.name.toLowerCase() === executableName.toLowerCase()) {
                return fullPath;
            }

            if (entry.isDirectory() && maxDepth > 0) {
                const found = await this.findExecutableRecursive(fullPath, executableName, maxDepth - 1);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    }

    private static async resolvePopplerExecutable(executableBaseName: 'pdftoppm' | 'pdftotext'): Promise<string> {
        const executableName = process.platform === 'win32' ? `${executableBaseName}.exe` : executableBaseName;
        const envPath = process.env.PDFTOPPM_PATH;

        if (envPath && fs.existsSync(envPath)) {
            const envStat = await fs.promises.stat(envPath);
            if (envStat.isDirectory()) {
                const candidateFromDir = path.join(envPath, executableName);
                if (fs.existsSync(candidateFromDir)) {
                    return candidateFromDir;
                }
            } else {
                const envDir = path.dirname(envPath);
                const siblingExecutable = path.join(envDir, executableName);
                if (fs.existsSync(siblingExecutable)) {
                    return siblingExecutable;
                }

                if (path.basename(envPath).toLowerCase() === executableName.toLowerCase()) {
                    return envPath;
                }
            }
        }

        if (await this.commandExists(executableBaseName)) {
            return executableBaseName;
        }

        const candidatePaths = [
            `C:\\ProgramData\\chocolatey\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\popplerutils\\tools\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\poppler-utils\\tools\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\poppler\\tools\\bin\\${executableName}`,
            `C:\\Program Files\\poppler\\Library\\bin\\${executableName}`,
            `C:\\Program Files\\poppler\\bin\\${executableName}`,
            `C:\\poppler-25.12.0\\Library\\bin\\${executableName}`
        ];

        for (const candidatePath of candidatePaths) {
            if (fs.existsSync(candidatePath)) {
                return candidatePath;
            }
        }

        const chocolateyLibDir = 'C:\\ProgramData\\chocolatey\\lib';
        const discoveredPath = await this.findExecutableRecursive(chocolateyLibDir, executableName, 5);
        if (discoveredPath) {
            return discoveredPath;
        }

        throw new Error(`OCR PDF indisponible sur ce serveur: ${executableBaseName} est introuvable. Configure PDFTOPPM_PATH ou installe un binaire Poppler contenant ${executableName}.`);
    }

    private static async extractTextFromPdfBufferNative(buffer: Buffer): Promise<string> {
        const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sgrc-pdf-text-'));
        const inputPdfPath = path.join(tempDir, 'input.pdf');

        try {
            await fs.promises.writeFile(inputPdfPath, buffer);
            const pdftotextPath = await this.resolvePopplerExecutable('pdftotext');
            const { stdout } = await this.execFileAsync(pdftotextPath, ['-layout', inputPdfPath, '-']);
            return stdout || '';
        } finally {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
        }
    }

    private static async extractTextFromPdfBufferWithOcr(buffer: Buffer, maxPages: number): Promise<string> {
        const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sgrc-pdf-ocr-'));
        const inputPdfPath = path.join(tempDir, 'input.pdf');
        const outputPrefix = path.join(tempDir, 'page');

        try {
            await fs.promises.writeFile(inputPdfPath, buffer);
            const pdftoppmPath = await this.resolvePopplerExecutable('pdftoppm');

            await this.execFileAsync(pdftoppmPath, [
                '-png',
                '-r',
                '200',
                '-f',
                '1',
                '-l',
                String(maxPages),
                inputPdfPath,
                outputPrefix
            ]);

            const generatedFiles = (await fs.promises.readdir(tempDir))
                .filter(fileName => /^page-\d+\.png$/i.test(fileName))
                .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

            if (generatedFiles.length === 0) {
                throw new Error('Aucune image OCR n a ete generee pour ce PDF.');
            }

            const ocrTexts: string[] = [];
            for (const generatedFile of generatedFiles) {
                const pageBuffer = await fs.promises.readFile(path.join(tempDir, generatedFile));
                const pageText = await this.extractTextFromImageBuffer(pageBuffer, false);
                if (pageText) {
                    ocrTexts.push(pageText);
                }
            }

            return ocrTexts.join('\n');
        } catch (error: any) {
            if (error?.code === 'ENOENT') {
                const toolMissingError = new Error('OCR PDF indisponible sur ce serveur: l outil pdftoppm est requis pour convertir les pages scannees en images.');
                (toolMissingError as any).statusCode = 400;
                (toolMissingError as any).cause = error;
                throw toolMissingError;
            }

            if (error?.message?.includes('pdftoppm est introuvable') || error?.message?.includes('pdftotext est introuvable')) {
                (error as any).statusCode = 400;
            }

            throw error;
        } finally {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
        }
    }

    private static buildPdfExtractionError(nativePdfError: any, ocrError: any): Error {
        const extractionError = new Error(
            nativePdfError
                ? 'Impossible de lire ce PDF. Le parseur PDF a echoue et le fallback OCR n a pas pu extraire un texte exploitable.'
                : 'Le PDF ne contient pas assez de texte exploitable et le fallback OCR n a rien pu extraire.'
        );

        (extractionError as any).statusCode = ocrError?.statusCode || 400;
        (extractionError as any).cause = ocrError;
        return extractionError;
    }

    private static async extractTextFromPdfBufferDetailed(buffer: Buffer, options: DocumentExtractionOptions): Promise<ExtractedTextResult> {
        const useOcrForPdf = options.useOcrForPdf === true;
        let nativePdfText = '';
        let nativePdfError: any = null;

        try {
            nativePdfText = await this.extractTextFromPdfBufferNative(buffer);
        } catch (error: any) {
            nativePdfError = error;
            if (!useOcrForPdf) {
                throw error;
            }
        }

        const normalizedNativeText = this.cleanText(nativePdfText);
        const scannedPdfLikely = !!nativePdfError || this.shouldRunPdfOcr(normalizedNativeText);
        if (!useOcrForPdf) {
            return {
                text: normalizedNativeText,
                metadata: {
                    format: 'pdf',
                    method: 'native',
                    ocrUsed: false,
                    scannedPdfLikely,
                    nativeTextLength: normalizedNativeText.length,
                }
            };
        }
        if (!scannedPdfLikely) {
            return {
                text: normalizedNativeText,
                metadata: {
                    format: 'pdf',
                    method: 'native',
                    ocrUsed: false,
                    scannedPdfLikely: false,
                    nativeTextLength: normalizedNativeText.length,
                }
            };
        }

        try {
            const ocrPdfText = await this.extractTextFromPdfBufferWithOcr(buffer, options.maxPdfOcrPages ?? 3);
            const normalizedOcrText = this.normalizeOcrText(ocrPdfText);
            const finalText = normalizedOcrText || normalizedNativeText;
            return {
                text: finalText,
                metadata: {
                    format: 'pdf',
                    method: normalizedOcrText ? 'ocr' : 'native',
                    ocrUsed: !!normalizedOcrText,
                    scannedPdfLikely: true,
                    nativeTextLength: normalizedNativeText.length,
                }
            };
        } catch (ocrError: any) {
            if (options.requireUsableText) {
                throw this.buildPdfExtractionError(nativePdfError, ocrError);
            }

            return {
                text: normalizedNativeText,
                metadata: {
                    format: 'pdf',
                    method: 'native',
                    ocrUsed: false,
                    scannedPdfLikely: true,
                    nativeTextLength: normalizedNativeText.length,
                }
            };
        }
    }

    private static async extractTextFromPdfBuffer(buffer: Buffer, options: DocumentExtractionOptions): Promise<string> {
        const result = await this.extractTextFromPdfBufferDetailed(buffer, options);
        return result.text;
    }

    static async extractTextFromFile(file: Express.Multer.File, options: DocumentExtractionOptions = {}): Promise<string> {
        const extension = file.originalname.split('.').pop()?.toLowerCase();
        const limitChars = options.limitChars === undefined ? 4000 : options.limitChars;
        const requireUsableText = options.requireUsableText !== false;
        let extractedText = '';

        if (extension === 'pdf') {
            extractedText = await this.extractTextFromPdfBuffer(file.buffer, {
                ...options,
                requireUsableText
            });

            if (requireUsableText && !this.hasEnoughExtractedText(extractedText)) {
                const extractionError = new Error('Le PDF ne contient pas assez de texte exploitable, meme apres tentative d OCR.');
                (extractionError as any).statusCode = 400;
                throw extractionError;
            }
        } else if (extension === 'docx') {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            extractedText = this.cleanTextPreserveLines(result.value);
        } else if (extension === 'txt') {
            extractedText = this.cleanTextPreserveLines(file.buffer.toString('utf8'));
        } else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
            extractedText = await this.extractTextFromImageBuffer(file.buffer, options.includeStructuredRegionsForImages !== false);
        } else {
            throw new Error('Format de fichier non supporte pour l extraction de texte');
        }

        const normalizedText = ['jpg', 'jpeg', 'png'].includes(extension || '')
            ? this.normalizeOcrText(extractedText)
            : this.cleanTextPreserveLines(extractedText);

        if (typeof limitChars === 'number') {
            return this.limitText(normalizedText, limitChars);
        }

        return normalizedText;
    }

    static async extractTextFromPathDetailed(filePath: string, options: DocumentExtractionOptions = {}): Promise<ExtractedTextResult> {
        const extension = path.extname(filePath).toLowerCase();
        const buffer = await fs.promises.readFile(filePath);

        if (extension === '.pdf') {
            return this.extractTextFromPdfBufferDetailed(buffer, {
                ...options,
                requireUsableText: options.requireUsableText ?? false,
                limitChars: null
            });
        }

        if (extension === '.docx') {
            const result = await mammoth.extractRawText({ buffer });
            return {
                text: this.cleanText(result.value),
                metadata: {
                    format: 'docx',
                    method: 'docx',
                    ocrUsed: false,
                    scannedPdfLikely: false,
                    nativeTextLength: 0,
                }
            };
        }

        throw new Error(`Format non supporte pour l indexation RAG: ${extension || 'inconnu'}`);
    }

    static async extractTextFromPath(filePath: string, options: DocumentExtractionOptions = {}): Promise<string> {
        const result = await this.extractTextFromPathDetailed(filePath, options);
        return result.text;
    }
}
