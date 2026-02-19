import { Router, Request, Response } from 'express';
import { AIService } from './ai.service';
import { RAGEngine } from './rag.engine';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const response = await AIService.generateResponse(prompt);
        res.json({ response });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/status', async (req: Request, res: Response) => {
    try {
        const isInitialized = await RAGEngine.checkIndexStatus();
        res.json({ isInitialized });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/index', async (req: Request, res: Response) => {
    try {
        const result = await RAGEngine.indexDocuments();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
