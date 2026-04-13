import { Router } from 'express';
import { AuditRecordType } from './audit-mission.model';
import { AuditingService } from './auditing.service';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { secureUpload } from '../../middleware/file.middleware';
import path from 'path';
import fs from 'fs';
import { appLogger } from '../../utils/app-logger';

const router = Router();

const uploadEvidence = secureUpload(['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'], 'evidenceFile', 15 * 1024 * 1024);
const uploadActionPlanFile = secureUpload(['xlsx', 'xls'], 'file', 15 * 1024 * 1024);

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

router.post('/suggest-plan', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const requestedType = String(req.body?.type || req.query?.type || AuditRecordType.PLAN_ACTION_AUDIT);
        appLogger.info('Auditing', 'Suggested AI planning request received', {
            userId: req.user!.id,
            role: req.user!.role,
            requestedType,
        });
        const plan = await AuditingService.suggestAnnualPlan(req.user!.role, requestedType);
        appLogger.info('Auditing', 'Suggested AI planning generated', {
            userId: req.user!.id,
            role: req.user!.role,
            suggestionCount: Array.isArray(plan) ? plan.length : 0,
            requestedType,
        });
        res.json(plan);
    } catch (error: any) {
        appLogger.error('Auditing', 'Suggested AI planning request failed', {
            userId: req.user?.id,
            role: req.user?.role,
            message: error?.message,
            stack: error?.stack,
        });
        res.status(500).json({ message: 'Erreur lors de la génération du plan', error: error.message });
    }
});

router.post('/create-missions', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const requestedType = String(req.body?.type || AuditRecordType.MISSION_AUDIT);
        appLogger.info('Auditing', 'Mission creation from suggested AI planning request received', {
            userId: req.user!.id,
            role: req.user!.role,
            requestedMissionCount: Array.isArray(req.body?.missions) ? req.body.missions.length : 0,
            requestedType,
        });
        const missions = await AuditingService.createMissionsFromPlan(req.user!.id, req.body.missions, requestedType);
        res.status(201).json(missions);
    } catch (error: any) {
        appLogger.error('Auditing', 'Mission creation from suggested AI planning failed', {
            userId: req.user?.id,
            role: req.user?.role,
            requestedMissionCount: Array.isArray(req.body?.missions) ? req.body.missions.length : 0,
            message: error?.message,
            stack: error?.stack,
        });
        res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
    }
});

router.get('/missions', async (req: AuthRequest, res) => {
    try {
        const { role, id } = req.user!;
        if (![UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR].includes(role)) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const requestedType = typeof req.query?.type === 'string' && req.query.type.trim()
            ? String(req.query.type)
            : undefined;
        const records = await AuditingService.getRecordsForUser(role, id, { type: requestedType });
        res.json(records);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des missions', error: error.message });
    }
});

router.post('/missions', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const record = await AuditingService.createRecord(req.user!.id, req.body);
        res.status(201).json(record);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
    }
});

router.put('/missions/:id/assign', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const { auditeurId } = req.body;
        const mission = await AuditingService.assignMission(parseInt(req.params.id as string, 10), parseInt(auditeurId, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l assignation', error: error.message });
    }
});

router.put('/missions/:id', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const mission = await AuditingService.updateMission(parseInt(req.params.id as string, 10), req.body);
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
    }
});

router.put('/missions/:id/report', authorizeRoles(UserRole.AUDITEUR, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const mission = await AuditingService.submitReport(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la soumission du rapport', error: error.message });
    }
});

router.delete('/missions/:id', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const result = await AuditingService.deleteMission(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
});

router.patch('/missions/:id/restore', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const mission = await AuditingService.restoreMission(parseInt(req.params.id as string, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration', error: error.message });
    }
});

router.get('/action-plans', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req: AuthRequest, res) => {
    try {
        const items = await AuditingService.getActionPlanRecords({
            auditSeniorId: req.user!.role === UserRole.AUDIT_SENIOR ? req.user!.id : undefined,
            auditeurId: req.user!.role === UserRole.AUDITEUR ? req.user!.id : undefined,
        });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des plans d actions', error: error.message });
    }
});

router.post('/action-plans', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req: AuthRequest, res) => {
    try {
        const item = await AuditingService.createRecord(req.user!.id, {
            ...req.body,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
        });
        res.status(201).json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création du plan d actions', error: error.message });
    }
});

router.put('/action-plans/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.updateMission(parseInt(req.params.id as string, 10), {
            ...req.body,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
        });
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du plan d actions', error: error.message });
    }
});

router.delete('/action-plans/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.deleteMission(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du plan d actions', error: error.message });
    }
});

router.post('/action-plans/import', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), uploadActionPlanFile, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }

        const items = await AuditingService.importActionPlans(req.user!.id, req.file, {
            riskId: req.body?.riskId ? Number(req.body.riskId) : null,
            replaceExisting: false,
        });
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l import du plan d actions', error: error.message });
    }
});

router.post('/missions/import', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), uploadActionPlanFile, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }

        const riskId = req.body?.riskId ? Number(req.body.riskId) : null;
        const missions = await AuditingService.importMissionsFromExcel(req.user!.id, req.file, riskId);
        res.status(201).json(missions);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l import des missions', error: error.message });
    }
});

router.put('/missions/:id/reset', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN), async (req, res) => {
    try {
        const mission = await AuditingService.resetMission(parseInt(req.params.id as string, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la réinitialisation', error: error.message });
    }
});

router.get('/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (_req, res) => {
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
        const result = await AuditingService.deleteChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du modèle', error: error.message });
    }
});

router.patch('/checklists/:id/restore', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const template = await AuditingService.restoreChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration du modèle', error: error.message });
    }
});

router.get('/missions/:id/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const items = await AuditingService.getMissionChecklistItems(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.post('/missions/:id/checklists', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const items = await AuditingService.assignTemplateToMission(parseInt(req.params.id as string, 10), req.body.templateId);
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l assignation du modèle', error: error.message });
    }
});

router.put('/missions/:id/checklists/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.toggleMissionChecklistItem(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.body.estFait
        );
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
    }
});

router.get('/missions/:id/action-plans', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const items = await AuditingService.getMissionActionPlanItems(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement du plan d actions', error: error.message });
    }
});

router.post('/missions/:id/action-plans', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.createMissionActionPlanItem(parseInt(req.params.id as string, 10), req.body);
        res.status(201).json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création de la ligne du plan d actions', error: error.message });
    }
});

router.put('/missions/:id/action-plans/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.updateMissionActionPlanItem(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.body
        );
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du plan d actions', error: error.message });
    }
});

router.delete('/missions/:id/action-plans/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.deleteMissionActionPlanItem(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10)
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la ligne du plan d actions', error: error.message });
    }
});

router.post('/missions/:id/action-plans/import', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), uploadActionPlanFile, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }

        const items = await AuditingService.importMissionActionPlan(parseInt(req.params.id as string, 10), req.file);
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l import du plan d actions', error: error.message });
    }
});

router.get('/missions/:id/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const evidence = await AuditingService.getMissionEvidence(parseInt(req.params.id as string, 10));
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.get('/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (_req, res) => {
    try {
        const evidence = await AuditingService.getAllEvidence();
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.get('/reports', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (_req, res) => {
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
        const evidence = await AuditingService.addMissionEvidence(parseInt(req.params.id as string, 10), req.file.originalname, filePath, req.user!.id);
        res.status(201).json(evidence);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l ajout de la preuve', error: error.message });
    }
});

router.delete('/missions/:id/evidence/:evidenceId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.deleteMissionEvidence(parseInt(req.params.evidenceId as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la preuve', error: error.message });
    }
});

router.patch('/missions/:id/evidence/:evidenceId/restore', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.restoreMissionEvidence(parseInt(req.params.evidenceId as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration de la preuve', error: error.message });
    }
});

export default router;
