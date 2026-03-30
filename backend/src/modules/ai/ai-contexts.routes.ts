import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { AIContextService, AIContextValidationError } from './ai-context.service';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI));

router.get('/', async (_req, res) => {
    try {
        const contexts = await AIContextService.getAllContexts();
        res.json(contexts);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des contextes IA.', error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const { name, type, content } = req.body || {};
        const context = await AIContextService.updateContext(name, type, content);
        res.json(context);
    } catch (error: any) {
        if (error instanceof AIContextValidationError) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Erreur lors de la mise a jour du contexte IA.', error: error.message });
    }
});

export default router;
