import { Router, Response } from 'express';
import { AIService } from './ai.service';
import { RAGEngine } from './rag.engine';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import multer from 'multer';

const router = Router();

// Multer configuration for security and performance
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit for general docs
    },
    fileFilter: (req, file, cb) => {
        const extension = file.originalname.split('.').pop()?.toLowerCase();
        const allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];

        if (allowedExtensions.includes(extension || '')) {
            // Specific limit for images (OCR performance)
            if (['jpg', 'jpeg', 'png'].includes(extension || '') && parseInt(req.headers['content-length'] || '0') > 4 * 1024 * 1024) {
                return cb(new Error('Les images pour l\'OCR sont limitées à 4Mo'));
            }
            cb(null, true);
        } else {
            cb(new Error('Format de fichier non supporté. Utilisez PDF, DOCX, JPG ou PNG.'));
        }
    }
});

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
router.post('/generate-risks-file', authenticateToken, upload.single('file'), async (req: AuthRequest, res: Response) => {
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
        res.status(500).json({ error: error.message });
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

export default router;
