import { Router, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { AIService } from './ai.service';
import { RAGEngine } from './rag.engine';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import multer from 'multer';

import { secureUpload } from '../../middleware/file.middleware';

const router = Router();

/**
 * Middleware d'upload sécurisé pour les documents (PDF, DOCX, Images)
 */
const uploadSecureDoc = secureUpload(['pdf', 'docx', 'jpg', 'jpeg', 'png'], 'file', 5 * 1024 * 1024);

// Main chat endpoint with streaming support
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { prompt, sessionId } = req.body;
        const role = req.user!.role;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Pass res for streaming mode
        await AIService.generateResponse(prompt, role, sessionId, req.user!.id, res);
    } catch (error: any) {
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
});

router.get('/status', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const isInitialized = await RAGEngine.checkIndexStatus();
        res.json({ isInitialized });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/generate-risks', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { situation } = req.body;
        if (!situation) {
            return res.status(400).json({ error: 'Situation is required' });
        }
        const risks = await AIService.generateRisksFromSituation(situation, req.user!.role);
        res.json(risks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Génération de risques à partir d'un fichier (PDF, Word, Image)
 */
router.post('/generate-risks-file', authenticateToken, uploadSecureDoc, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Fichier requis' });
        }

        // Extraction, nettoyage et limitation du texte (fait dans AIService)
        const extractedText = await AIService.extractTextFromFile(req.file);

        if (!extractedText || extractedText.trim().length < 10) {
            return res.status(400).json({ error: 'Le fichier ne contient pas assez de texte exploitable.' });
        }

        const risks = await AIService.generateRisksFromSituation(extractedText, req.user!.role);
        res.json(risks);
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.post('/index', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const result = await RAGEngine.indexDocuments();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Gestion des documents RAG
 */
const uploadRagDoc = secureUpload(['pdf', 'docx'], 'file', 15 * 1024 * 1024);

router.get('/docs', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI, UserRole.RISK_MANAGER), async (req: AuthRequest, res: Response) => {
    try {
        const docsPath = await RAGEngine.getNormesPath();
        
        const getAllDocs = (dir: string, fileList: any[] = [], currentSubDir: string = '') => {
            if (!fs.existsSync(dir)) return fileList;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const itemPath = path.join(dir, item);
                const stat = fs.statSync(itemPath);
                if (stat.isDirectory()) {
                    getAllDocs(itemPath, fileList, path.join(currentSubDir, item));
                } else if (item.toLowerCase().endsWith('.pdf') || item.toLowerCase().endsWith('.docx')) {
                    fileList.push({
                        name: item,
                        relativePath: path.join(currentSubDir, item).replace(/\\/g, '/'),
                        size: stat.size,
                        uploadedAt: stat.mtime
                    });
                }
            }
            return fileList;
        };
        
        res.json(getAllDocs(docsPath));
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/docs/upload', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), uploadRagDoc, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Fichier requis' });
        }

        const docsPath = await RAGEngine.getNormesPath();
        if (!fs.existsSync(docsPath)) {
            fs.mkdirSync(docsPath, { recursive: true });
        }

        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        let finalPath = path.join(docsPath, safeName);

        if (fs.existsSync(finalPath)) {
            const ext = path.extname(safeName);
            const base = path.basename(safeName, ext);
            finalPath = path.join(docsPath, `${base}_${Date.now()}${ext}`);
        }

        await fs.promises.writeFile(finalPath, req.file.buffer);
        await RAGEngine.indexDocuments();

        res.json({ message: 'Fichier uploadé et indexé avec succès', file: path.basename(finalPath) });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/docs/file', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const filePathParam = req.query.path as string;
        if (!filePathParam || filePathParam.includes('..')) {
            return res.status(400).json({ error: 'Chemin invalide' });
        }
        
        const docsPath = await RAGEngine.getNormesPath();
        const finalPath = path.resolve(docsPath, filePathParam);

        if (fs.existsSync(finalPath)) {
            await fs.promises.unlink(finalPath);
            await RAGEngine.indexDocuments();
            res.json({ message: 'Fichier supprimé et index mis à jour' });
        } else {
            res.status(404).json({ error: 'Fichier non trouvé' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
