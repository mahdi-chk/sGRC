import { Router, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { AIService } from './ai.service';
import { RAGEngine } from './rag.engine';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { secureUpload } from '../../middleware/file.middleware';

const router = Router();
const LONG_RUNNING_REQUEST_TIMEOUT_MS = Number(process.env.AI_LONG_REQUEST_TIMEOUT_MS || 30 * 60 * 1000);

const configureLongRunningRequest = (req: AuthRequest, res: Response) => {
    const timeoutMs = Number.isFinite(LONG_RUNNING_REQUEST_TIMEOUT_MS) && LONG_RUNNING_REQUEST_TIMEOUT_MS >= 0
        ? LONG_RUNNING_REQUEST_TIMEOUT_MS
        : 30 * 60 * 1000;

    req.setTimeout(timeoutMs);
    res.setTimeout(timeoutMs);
};

const parseBooleanFlag = (value: unknown): boolean | undefined => {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['1', 'true', 'yes', 'on'].includes(normalized)) {
            return true;
        }

        if (['0', 'false', 'no', 'off'].includes(normalized)) {
            return false;
        }
    }

    return undefined;
};

const uploadSecureDoc = secureUpload(['pdf', 'docx', 'jpg', 'jpeg', 'png'], 'file', 5 * 1024 * 1024);
const uploadRagDoc = secureUpload(['pdf', 'docx'], 'file', 15 * 1024 * 1024);

router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        configureLongRunningRequest(req, res);
        const { prompt, sessionId } = req.body;
        const role = req.user!.role;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        await AIService.generateResponse(prompt, role, sessionId, req.user!.id, res);
    } catch (error: any) {
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
});

router.get('/status', authenticateToken, async (_req: AuthRequest, res: Response) => {
    try {
        const isInitialized = await RAGEngine.checkIndexStatus();
        res.json({ isInitialized });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/generate-risks', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        configureLongRunningRequest(req, res);
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

router.post('/generate-risks-file', authenticateToken, uploadSecureDoc, async (req: AuthRequest, res: Response) => {
    try {
        configureLongRunningRequest(req, res);
        if (!req.file) {
            return res.status(400).json({ error: 'Fichier requis' });
        }

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
        configureLongRunningRequest(req, res);
        const useOcr = parseBooleanFlag(req.body?.useOcr);
        const result = await RAGEngine.indexDocuments({ useOcr });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/docs', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI, UserRole.RISK_MANAGER), async (_req: AuthRequest, res: Response) => {
    try {
        const docsPath = await RAGEngine.getNormesPath();

        const getAllDocs = (dir: string, fileList: any[] = [], currentSubDir: string = '') => {
            if (!fs.existsSync(dir)) {
                return fileList;
            }

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
        configureLongRunningRequest(req, res);
        if (!req.file) {
            return res.status(400).json({ error: 'Fichier requis' });
        }

        const useOcr = parseBooleanFlag(req.body?.useOcr);
        const docsPath = await RAGEngine.getNormesPath();
        if (!fs.existsSync(docsPath)) {
            fs.mkdirSync(docsPath, { recursive: true });
        }

        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        let finalPath = path.join(docsPath, safeName);

        if (fs.existsSync(finalPath)) {
            const ext = path.extname(safeName);
            const base = path.basename(safeName, ext);
            finalPath = path.join(docsPath, `${base}_${Date.now()}${ext}`);
        }

        await fs.promises.writeFile(finalPath, req.file.buffer);
        const indexing = await RAGEngine.indexDocuments({ useOcr });

        res.json({
            message: 'Fichier uploade et indexe avec succes',
            file: path.basename(finalPath),
            useOcr,
            indexing,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/docs/file', authenticateToken, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        configureLongRunningRequest(req, res);
        const filePathParam = req.query.path as string;
        const useOcr = parseBooleanFlag(req.query.useOcr);

        if (!filePathParam || filePathParam.includes('..')) {
            return res.status(400).json({ error: 'Chemin invalide' });
        }

        const docsPath = await RAGEngine.getNormesPath();
        const finalPath = path.resolve(docsPath, filePathParam);

        if (!fs.existsSync(finalPath)) {
            return res.status(404).json({ error: 'Fichier non trouve' });
        }

        await fs.promises.unlink(finalPath);
        const indexing = await RAGEngine.indexDocuments({ useOcr });

        res.json({
            message: 'Fichier supprime et index mis a jour',
            useOcr,
            indexing,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
