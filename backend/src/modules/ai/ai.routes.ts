import { Router, Request, Response } from 'express';
import { AIService } from './ai.service';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await AIService.generateResponse(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
});

export default router;
