import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { SystemSetting } from '../settings/setting.model';
import { UserRole } from '../users/user.roles';
import { appLogger } from '../../utils/app-logger';
import { DocumentTextExtractor } from './document-text-extractor';

const DEFAULT_NORMES_PATH = process.env.NORMES_PATH || path.join(__dirname, '../../../normes');
const OLLAMA_EMBED_URL = process.env.OLLAMA_EMBED_URL || 'http://localhost:11434/api/embeddings';
const EMBED_MODEL = 'nomic-embed-text';
const STORAGE_DIR = path.join(__dirname, '../../storage');
const DB_FILE = path.join(STORAGE_DIR, 'vector_db.json');

interface VectorEntry {
    text: string;
    embedding: number[];
    topic: 'risk' | 'audit' | 'general';
    metadata: {
        source: string;
        path: string;
    };
}

interface RAGIndexOptions {
    useOcr?: boolean;
}

interface IndexFileResult {
    success: boolean;
    chunkCount: number;
    ocrUsed: boolean;
    scannedPdfLikely: boolean;
    method: string;
}

export class RAGEngine {
    private static db: VectorEntry[] = [];
    private static isLoaded = false;
    private static readonly FILE_BATCH_SIZE = 2;
    private static readonly EMBEDDING_CONCURRENCY = 6;
    private static readonly MIN_CHUNK_CHARS = 120;
    private static embeddingCache = new Map<string, Promise<number[]>>();

    private static async loadDB() {
        if (this.isLoaded) return;

        if (fs.existsSync(DB_FILE)) {
            try {
                const data = fs.readFileSync(DB_FILE, 'utf8');
                this.db = JSON.parse(data);
                appLogger.info('RAG', 'Vector DB loaded', { count: this.db.length });
            } catch (err) {
                appLogger.error('RAG', 'Failed to load vector DB', err);
                this.db = [];
            }
        }
        this.isLoaded = true;
    }

    private static async saveDB() {
        if (!fs.existsSync(STORAGE_DIR)) {
            fs.mkdirSync(STORAGE_DIR, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, JSON.stringify(this.db), 'utf8');
    }

    static async checkIndexStatus(): Promise<boolean> {
        await this.loadDB();
        return this.db.length > 0;
    }

    static async getNormesPath(): Promise<string> {
        const setting = await SystemSetting.findOne({ where: { key: 'DOCS_PATH' } });
        return setting ? setting.value : DEFAULT_NORMES_PATH;
    }

    static async indexDocuments(options: RAGIndexOptions = {}): Promise<{
        success: boolean;
        count: number;
        files: number;
        failedFiles: number;
        useOcr: boolean;
        ocrUsedFiles: number;
        nativeFiles: number;
        scannedPdfLikelyFiles: number;
    }> {
        const docsPath = await this.getNormesPath();
        const files = this.getAllIndexableFiles(docsPath);
        this.db = [];
        this.embeddingCache.clear();
        const useOcr = options.useOcr === true;

        appLogger.info('RAG', 'Files discovered for indexing', {
            count: files.length,
            docsPath,
            useOcr,
        });

        let failedFiles = 0;
        let ocrUsedFiles = 0;
        let scannedPdfLikelyFiles = 0;
        const batchSize = this.FILE_BATCH_SIZE;
        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            const batchResults = await Promise.all(batch.map(file => this.indexFile(file, { useOcr })));
            failedFiles += batchResults.filter(result => !result.success).length;
            ocrUsedFiles += batchResults.filter(result => result.ocrUsed).length;
            scannedPdfLikelyFiles += batchResults.filter(result => result.scannedPdfLikely).length;
        }

        await this.saveDB();
        this.isLoaded = true;
        const actualUseOcr = useOcr || ocrUsedFiles > 0;
        appLogger.info('RAG', 'Document indexing completed', {
            chunks: this.db.length,
            files: files.length,
            failedFiles,
            useOcr: actualUseOcr,
            ocrUsedFiles,
            scannedPdfLikelyFiles,
        });

        return {
            success: failedFiles === 0,
            count: this.db.length,
            files: files.length,
            failedFiles,
            useOcr: actualUseOcr,
            ocrUsedFiles,
            nativeFiles: Math.max(0, files.length - failedFiles - ocrUsedFiles),
            scannedPdfLikelyFiles,
        };
    }

    private static async indexFile(file: string, options: RAGIndexOptions): Promise<IndexFileResult> {
        try {
            appLogger.debug('RAG', 'Indexing file', { file: path.basename(file) });
            let extraction = await DocumentTextExtractor.extractTextFromPathDetailed(file, {
                useOcrForPdf: options.useOcr === true,
                requireUsableText: false,
                limitChars: null,
            });

            if (!options.useOcr && extraction.metadata.format === 'pdf' && extraction.metadata.scannedPdfLikely) {
                appLogger.info('RAG', 'Scanned PDF detected, applying OCR to this file only', {
                    file: path.basename(file),
                });
                extraction = await DocumentTextExtractor.extractTextFromPathDetailed(file, {
                    useOcrForPdf: true,
                    requireUsableText: false,
                    limitChars: null,
                });
            }

            const chunks = this.splitText(extraction.text, 1000, 200);

            if (chunks.length === 0) {
                appLogger.warn('RAG', 'Document skipped because no usable text was extracted', {
                    file: path.basename(file),
                    useOcr: options.useOcr === true,
                    method: extraction.metadata.method,
                    scannedPdfLikely: extraction.metadata.scannedPdfLikely,
                });
                return {
                    success: false,
                    chunkCount: 0,
                    ocrUsed: extraction.metadata.ocrUsed,
                    scannedPdfLikely: extraction.metadata.scannedPdfLikely,
                    method: extraction.metadata.method,
                };
            }

            // Refined topic classification
            let topic: 'risk' | 'audit' | 'general' = 'general';
            const fileName = path.basename(file).toLowerCase();
            const lowerPath = file.toLowerCase();

            // Risk specific (ISO 27005 is for risk management)
            if (fileName.includes('27005') || lowerPath.includes('risk') || lowerPath.includes('risque')) {
                topic = 'risk';
            }
            // Audit specific (ISO 27001, 27002, COBIT, Audit procedures)
            else if (fileName.includes('27001') || fileName.includes('27002') || fileName.includes('27000') ||
                fileName.includes('27032') || lowerPath.includes('audit') || lowerPath.includes('cobit')) {
                topic = 'audit';
            }

            // Process chunks in parallel for this file
            const embeddings = await this.getEmbeddingsForChunks(chunks);

            chunks.forEach((chunk, idx) => {
                this.db.push({
                    text: chunk,
                    embedding: embeddings[idx],
                    topic: topic,
                    metadata: {
                        source: path.basename(file),
                        path: file
                    }
                });
            });

            appLogger.debug('RAG', 'File indexed', {
                file: path.basename(file),
                chunks: chunks.length,
                method: extraction.metadata.method,
                ocrUsed: extraction.metadata.ocrUsed,
                scannedPdfLikely: extraction.metadata.scannedPdfLikely,
            });

            return {
                success: true,
                chunkCount: chunks.length,
                ocrUsed: extraction.metadata.ocrUsed,
                scannedPdfLikely: extraction.metadata.scannedPdfLikely,
                method: extraction.metadata.method,
            };
        } catch (err: any) {
            appLogger.error('RAG', 'File indexing failed', {
                file,
                error: err.message || err,
                useOcr: options.useOcr === true,
            });
            return {
                success: false,
                chunkCount: 0,
                ocrUsed: false,
                scannedPdfLikely: false,
                method: 'native',
            };
        }
    }

    static async searchContext(query: string, role: UserRole, k: number = 3): Promise<string[]> {
        await this.loadDB();
        if (this.db.length === 0) return [];

        const queryEmbedding = await this.getEmbedding(query);

        // Filter by topic based on role
        let allowedTopics: string[] = ['general'];
        if (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN_SI || role === UserRole.TOP_MANAGEMENT) {
            allowedTopics = ['risk', 'audit', 'general'];
        } else if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
            allowedTopics = ['risk', 'general'];
        } else if (role === UserRole.AUDIT_SENIOR || role === UserRole.AUDITEUR) {
            allowedTopics = ['audit', 'general'];
        }

        const filteredDb = this.db.filter(entry => allowedTopics.includes(entry.topic));

        const scoredEntries = filteredDb.map(entry => ({
            text: entry.text,
            score: this.cosineSimilarity(queryEmbedding, entry.embedding)
        }));

        return scoredEntries
            .sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(e => e.text);
    }

    private static getAllIndexableFiles(dirPath: string, fileList: string[] = []): string[] {
        if (!fs.existsSync(dirPath)) return fileList;

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                this.getAllIndexableFiles(filePath, fileList);
            } else if (['.pdf', '.docx'].includes(path.extname(file).toLowerCase())) {
                fileList.push(filePath);
            }
        });
        return fileList;
    }

    private static splitText(text: string, chunkSize: number, overlap: number): string[] {
        const cleanedText = text.replace(/\s+/g, ' ');
        const chunks: string[] = [];
        let start = 0;
        while (start < cleanedText.length) {
            let end = start + chunkSize;
            const chunk = cleanedText.substring(start, end).trim();
            if (chunk.length >= this.MIN_CHUNK_CHARS) {
                chunks.push(chunk);
            } else if (chunk.length > 0 && chunks.length > 0) {
                chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${chunk}`.trim();
            }
            start += chunkSize - overlap;
        }

        return chunks.filter((chunk, index, all) => all.indexOf(chunk) === index);
    }

    private static async getEmbedding(text: string): Promise<number[]> {
        const normalizedText = text.trim();
        const cachedPromise = this.embeddingCache.get(normalizedText);
        if (cachedPromise) {
            return cachedPromise;
        }

        const embeddingPromise = (async () => {
            try {
                const response = await axios.post(OLLAMA_EMBED_URL, {
                    model: EMBED_MODEL,
                    prompt: normalizedText
                });
                return response.data.embedding;
            } catch (error: any) {
                this.embeddingCache.delete(normalizedText);
                appLogger.error('RAG', 'Embedding generation failed', error.message);
                throw new Error(`Failed to get embedding for model ${EMBED_MODEL}. Make sure it is pulled (ollama pull ${EMBED_MODEL}).`);
            }
        })();

        this.embeddingCache.set(normalizedText, embeddingPromise);

        try {
            return await embeddingPromise;
        } catch (error) {
            throw error;
        }
    }

    private static async getEmbeddingsForChunks(chunks: string[]): Promise<number[][]> {
        return this.mapWithConcurrency(chunks, this.EMBEDDING_CONCURRENCY, chunk => this.getEmbedding(chunk));
    }

    private static async mapWithConcurrency<TInput, TOutput>(
        items: TInput[],
        concurrency: number,
        mapper: (item: TInput, index: number) => Promise<TOutput>
    ): Promise<TOutput[]> {
        const results = new Array<TOutput>(items.length);
        let currentIndex = 0;

        const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
            while (true) {
                const itemIndex = currentIndex++;
                if (itemIndex >= items.length) {
                    return;
                }

                results[itemIndex] = await mapper(items[itemIndex], itemIndex);
            }
        });

        await Promise.all(workers);
        return results;
    }

    private static cosineSimilarity(vecA: number[], vecB: number[]): number {
        let dotProduct = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
