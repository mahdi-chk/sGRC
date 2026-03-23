import { Router } from 'express';
import { ReportingController } from './reporting.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

// Toutes les routes de reporting nécessitent une authentification
router.get('/stats', authenticateToken, ReportingController.getDashboardStats);
router.get('/kpis', authenticateToken, ReportingController.getKpis);
router.get('/multi-entity', authenticateToken, ReportingController.getMultiEntityData);
router.post('/export', authenticateToken, ReportingController.generateExport);

export default router;
