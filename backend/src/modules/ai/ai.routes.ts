import { Router, Response } from 'express';
import { AIService } from './ai.service';
import { RAGEngine } from './rag.engine';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';

const router = Router();

// Main chat endpoint with streaming support
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { prompt, sessionId } = req.body;
        const role = req.user!.role;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Pass res for streaming mode
        await AIService.generateResponse(prompt, role, sessionId, res);
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

export default router;
