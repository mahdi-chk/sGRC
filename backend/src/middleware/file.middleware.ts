import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { validateFileType, sanitizeFile } from '../utils/file-security.utils';
import { AuthRequest } from './auth.middleware';

/**
 * Middleware factory for secure file uploads.
 * @param allowedExtensions List of allowed extensions (without dot)
 * @param fieldName The name of the form field
 * @param fileSizeLimit Maximum file size in bytes (default 5MB)
 * @param useMemoryStorage Whether to use memory storage (default true)
 */
export const secureUpload = (
    allowedExtensions: string[],
    fieldName: string,
    fileSizeLimit: number = 5 * 1024 * 1024,
    useMemoryStorage: boolean = true
) => {
    // Multer configuration
    const storage = useMemoryStorage ? multer.memoryStorage() : multer.diskStorage({
        destination: 'src/storage/temp', // Temporary directory if not using memory
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, fieldName + '-' + uniqueSuffix + '-' + file.originalname);
        }
    });

    const upload = multer({
        storage,
        limits: { fileSize: fileSizeLimit }
    }).single(fieldName);

    return (req: Request, res: Response, next: NextFunction) => {
        upload(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: `Le fichier est trop volumineux. Limite: ${fileSizeLimit / (1024 * 1024)}Mo` });
                }
                return res.status(400).json({ error: `Erreur Multer: ${err.message}` });
            } else if (err) {
                return res.status(500).json({ error: `Erreur lors du téléchargement: ${err.message}` });
            }

            if (!req.file) {
                return next(); // Proceed if no file, the route handler will decide if it's required
            }

            // Security Validation
            const validation = validateFileType(req.file, allowedExtensions);
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.error });
            }

            // Sanitization
            try {
                req.file.buffer = sanitizeFile(req.file);
            } catch (authErr: any) {
                return res.status(500).json({ error: `Erreur de sécurisation du fichier: ${authErr.message}` });
            }

            next();
        });
    };
};
