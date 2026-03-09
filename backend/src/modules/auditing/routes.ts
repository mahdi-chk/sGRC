import { Router } from 'express';
import { AuditMission, AuditMissionStatus } from './audit-mission.model';
import { AuditingService } from './auditing.service';
import { Risk } from '../risk/risk.model';
import { AIService } from '../ai/ai.service';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';

const router = Router();

router.use(authenticateToken);

/**
 * GÉNÉRER UNE SUGGESTION DE PLAN ANNUEL (AI)
 * Accessible par : Audit Senior, Super Admin
 */
router.post('/suggest-plan', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const plan = await AuditingService.suggestAnnualPlan(req.user!.role);
        res.json(plan);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la génération du plan', error: error.message });
    }
});

/**
 * CRÉER DES MISSIONS À PARTIR D'UN PLAN
 */
router.post('/create-missions', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const missions = await AuditingService.createMissionsFromPlan(req.user!.id, req.body.missions);
        res.status(201).json(missions);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création des missions', error: error.message });
    }
});

/**
 * RÉCUPÉRER LES MISSIONS (Filtré par rôle)
 */
router.get('/missions', async (req: AuthRequest, res) => {
    try {
        const { role, id } = req.user!;
        let missions;

        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT || role === UserRole.ADMIN_SI || role === UserRole.RISK_MANAGER) {
            missions = await AuditMission.findAll({ include: ['auditSenior', 'auditeur', 'risk'] });
        } else if (role === UserRole.AUDIT_SENIOR) {
            missions = await AuditMission.findAll({
                where: { auditSeniorId: id },
                include: ['auditeur', 'risk']
            });
        } else if (role === UserRole.AUDITEUR) {
            missions = await AuditMission.findAll({
                where: { auditeurId: id },
                include: ['auditSenior', 'risk']
            });
        } else if (role === UserRole.RISK_AGENT) {
            missions = await AuditMission.findAll({
                include: [
                    {
                        model: Risk,
                        as: 'risk',
                        where: { riskAgentId: id }
                    },
                    'auditSenior', 'auditeur'
                ]
            });
        } else {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        res.json(missions);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des missions', error: error.message });
    }
});

/**
 * ASSIGNER UNE MISSION
 */
router.put('/missions/:id/assign', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const { auditeurId } = req.body;
        const mission = await AuditingService.assignMission(parseInt(req.params.id as string), parseInt(auditeurId));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'assignation', error: error.message });
    }
});

/**
 * SOUMETTRE UN RAPPORT (Auditeur)
 */
router.put('/missions/:id/report', authorizeRoles(UserRole.AUDITEUR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const mission = await AuditingService.submitReport(parseInt(req.params.id as string), req.user!.id, req.body);
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la soumission du rapport', error: error.message });
    }
});

/**
 * SUPPRIMER UNE MISSION
 */
router.delete('/missions/:id', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const result = await AuditingService.deleteMission(parseInt(req.params.id as string));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
});

/**
 * RESET UNE MISSION
 */
router.put('/missions/:id/reset', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const mission = await AuditingService.resetMission(parseInt(req.params.id as string));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la réinitialisation', error: error.message });
    }
});

export default router;
