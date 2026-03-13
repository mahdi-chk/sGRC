import path from 'path';

/**
 * File Security Utilities
 * Handles magic bytes validation and basic sanitization for uploaded files.
 */

export interface FileValidationResult {
    isValid: boolean;
    error?: string;
}

const MAGIC_BYTES: Record<string, string[]> = {
    pdf: ['25504446'],
    jpg: ['ffd8ff'],
    jpeg: ['ffd8ff'],
    png: ['89504e47'],
    docx: ['504b0304'],
    xlsx: ['504b0304'],
};

/**
 * Validates the file type using both extension and magic bytes.
 */
export function validateFileType(file: Express.Multer.File, allowedExtensions: string[]): FileValidationResult {
    const ext = path.extname(file.originalname).toLowerCase().substring(1);
    
    if (!allowedExtensions.includes(ext)) {
        return { isValid: false, error: `L'extension .${ext} n'est pas autorisée.` };
    }

    const magic = MAGIC_BYTES[ext];
    if (magic) {
        const header = file.buffer.toString('hex', 0, 4);
        const isValidMagic = magic.some(m => header.startsWith(m));
        if (!isValidMagic) {
            return { isValid: false, error: `Contenu de fichier non valide pour l'extension .${ext} (Magic bytes mismatch).` };
        }
    }

    // Additional check for Office files (DOCX/XLSX) to prevent Macros
    if (ext === 'docx' || ext === 'xlsx') {
        const content = file.buffer.toString('utf-8');
        if (content.includes('vbaProject.bin') || content.includes('vbaData.xml')) {
            return { isValid: false, error: 'Les fichiers contenant des macros ne sont pas autorisés.' };
        }
    }

    return { isValid: true };
}

/**
 * Sanitizes a file based on its type.
 * - PDF: Neutralizes JavaScript
 * - Word/Excel: Macros are already checked in validate
 * - Images: (Advanced sanitization like EXIF stripping would require dedicated libs)
 */
export function sanitizeFile(file: Express.Multer.File): Buffer {
    const ext = path.extname(file.originalname).toLowerCase().substring(1);
    let buffer = file.buffer;

    if (ext === 'pdf') {
        const content = buffer.toString('binary');
        // Neutralize common JS triggers in PDF
        const sanitizedContent = content
            .replace(/\/JS\b/g, '/__DISABLED_JS__')
            .replace(/\/JavaScript\b/g, '/__DISABLED_JAVASCRIPT__')
            .replace(/\/AA\b/g, '/__DISABLED_AA__') // Additional Actions
            .replace(/\/OpenAction\b/g, '/__DISABLED_OPENACTION__');
        
        buffer = Buffer.from(sanitizedContent, 'binary');
    }

    // Note: For images, without 'sharp' or similar, we can't easily strip EXIF.
    // However, by treating them strictly as data and never executing them, the risk is minimized.

    return buffer;
}
