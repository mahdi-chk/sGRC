import { Router } from 'express';
import { AuditMission, AuditMissionStatus } from './audit-mission.model';
import { AuditingService } from './auditing.service';
import { Risk } from '../risk/risk.model';
import { AIService } from '../ai/ai.service';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { secureUpload } from '../../middleware/file.middleware';
import path from 'path';
import fs from 'fs';

const router = Router();

/**
 * Middleware d'upload sécurisé pour les preuves d'audit
 */
const uploadEvidence = secureUpload(['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'], 'evidenceFile', 15 * 1024 * 1024);

/**
 * Helper to save buffer to storage
 */
const saveToStorage = (file: Express.Multer.File, subDir: string): string => {
    const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const fullPath = path.join('src/storage', subDir, fileName);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, file.buffer);
    return fullPath;
};

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
 * MODIFIER UNE MISSION
 */
router.put('/missions/:id', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const mission = await AuditingService.updateMission(parseInt(req.params.id as string), req.body);
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
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
 * --- ROUTES CHECKLISTS TEMPLATES ---
 */

router.get('/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const templates = await AuditingService.getChecklistTemplates();
        res.json(templates);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des modèles de checklists', error: error.message });
    }
});

router.post('/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req: AuthRequest, res) => {
    try {
        const template = await AuditingService.createChecklistTemplate(req.user!.id, req.body);
        res.status(201).json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création du modèle de checklist', error: error.message });
    }
});

router.delete('/checklists/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const result = await AuditingService.deleteChecklistTemplate(parseInt(req.params.id as string));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du modèle', error: error.message });
    }
});

/**
 * --- ROUTES MISSION CHECKLISTS ---
 */

router.get('/missions/:id/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const items = await AuditingService.getMissionChecklistItems(parseInt(req.params.id as string));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.post('/missions/:id/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const items = await AuditingService.assignTemplateToMission(parseInt(req.params.id as string), req.body.templateId);
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'assignation du modèle', error: error.message });
    }
});

router.put('/missions/:id/checklists/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.toggleMissionChecklistItem(parseInt(req.params.id as string), parseInt(req.params.itemId as string), req.body.estFait);
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
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

/**
 * --- ROUTES TRAÇABILITÉ DES PREUVES ---
 */

router.get('/missions/:id/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const evidence = await AuditingService.getMissionEvidence(parseInt(req.params.id as string));
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

/**
 * RÉCUPÉRER TOUTES LES PREUVES (Global Explorer)
 */
router.get('/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const evidence = await AuditingService.getAllEvidence();
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

/**
 * RÉCUPÉRER LES RAPPORTS À RÉVISER
 */
router.get('/reports', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const reports = await AuditingService.getMissionsWithReports();
        res.json(reports);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.post('/missions/:id/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), uploadEvidence, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }
        const filePath = saveToStorage(req.file, 'evidence');
        const evidence = await AuditingService.addMissionEvidence(parseInt(req.params.id as string), req.file.originalname, filePath, req.user!.id);
        res.status(201).json(evidence);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout de la preuve', error: error.message });
    }
});

router.delete('/missions/:id/evidence/:evidenceId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.deleteMissionEvidence(parseInt(req.params.evidenceId as string));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la preuve', error: error.message });
    }
});

export default router;
