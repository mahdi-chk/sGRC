import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { SupervisionService } from './supervision.service';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles(UserRole.TOP_MANAGEMENT, UserRole.ADMIN_SI));

router.get('/overview', async (_req, res) => {
    try {
        const payload = await SupervisionService.getOverview();
        res.json(payload);
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la recuperation des donnees de supervision',
            error: error?.message || String(error),
        });
    }
});

export default router;
