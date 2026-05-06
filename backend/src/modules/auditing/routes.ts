import { Router } from 'express';
import { AuditRecordType } from './audit-mission.model';
import { AuditingService } from './auditing.service';
import { AuditPlanService } from './audit-plan.service';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { secureUpload } from '../../middleware/file.middleware';
import path from 'path';
import fs from 'fs';
import { appLogger } from '../../utils/app-logger';
import { AUDIT_ROLE_RESPONSIBILITY_MATRIX, AUDIT_WORK_PROGRAM_MODEL } from './audit-responsibility-matrix';

const router = Router();

const uploadEvidence = secureUpload(['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'], 'evidenceFile', 15 * 1024 * 1024);
const uploadActionPlanFile = secureUpload(['xlsx', 'xls'], 'file', 15 * 1024 * 1024);
const auditDivisionManagerRoles = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];
const auditMissionManagementRoles = [UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.SUPER_ADMIN];
const auditReportReviewRoles = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];
const auditAllRoles = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.SUPER_ADMIN];
const auditPlanReadRoles = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.TOP_MANAGEMENT, UserRole.CONTROLLER, UserRole.SUPER_ADMIN];

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

router.get('/responsibility-matrix', authorizeRoles(...auditPlanReadRoles), (_req, res) => {
    res.json({
        workProgramModel: AUDIT_WORK_PROGRAM_MODEL,
        roles: AUDIT_ROLE_RESPONSIBILITY_MATRIX,
    });
});

router.get('/lookups/:key', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const options = AuditPlanService.getLookupOptions(String(req.params.key || '').trim());
        res.json(options);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement du lookup', error: error.message });
    }
});

router.get('/plans', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const plans = await AuditPlanService.listPlans(req.user!.role, req.user!.id, {
            nom: typeof req.query.nom === 'string' ? req.query.nom : null,
            status: typeof req.query.status === 'string' ? req.query.status : null,
            nature: typeof req.query.nature === 'string' ? req.query.nature : null,
            dateDebut: typeof req.query.dateDebut === 'string' ? req.query.dateDebut : null,
            dateFin: typeof req.query.dateFin === 'string' ? req.query.dateFin : null,
        });
        res.json(plans);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des plans', error: error.message });
    }
});

router.post('/plans', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const plan = await AuditPlanService.createPlan(req.user!.id, req.body);
        res.status(201).json(plan);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation du plan', error: error.message });
    }
});

router.get('/plans/:id', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const plan = await AuditPlanService.getPlanDetail(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(plan);
    } catch (error: any) {
        res.status(404).json({ message: 'Erreur lors du chargement du plan', error: error.message });
    }
});

router.put('/plans/:id', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const plan = await AuditPlanService.updatePlan(parseInt(req.params.id as string, 10), req.user!.role, req.body);
        res.json(plan);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour du plan', error: error.message });
    }
});

router.delete('/plans/:id', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const result = await AuditPlanService.deletePlan(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du plan', error: error.message });
    }
});

router.patch('/plans/:id/restore', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const plan = await AuditPlanService.restorePlan(parseInt(req.params.id as string, 10));
        res.json(plan);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration du plan', error: error.message });
    }
});

router.post('/plans/:id/transitions', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const result = await AuditPlanService.applyTransition(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            String(req.body?.transition || ''),
            typeof req.body?.comment === 'string' ? req.body.comment : null
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la transition du plan', error: error.message });
    }
});

router.get('/plans/:id/workflow-history', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const items = await AuditPlanService.getWorkflowHistory(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement de l historique', error: error.message });
    }
});

router.get('/plans/:id/missions', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const missions = await AuditPlanService.getPlanMissions(parseInt(req.params.id as string, 10));
        res.json(missions);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des missions du plan', error: error.message });
    }
});

router.post('/plans/:id/missions', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const mission = await AuditPlanService.createPlanMission(parseInt(req.params.id as string, 10), req.user!.id, req.body);
        res.status(201).json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation de la mission du plan', error: error.message });
    }
});

router.get('/plans/:id/recommendations', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const items = await AuditPlanService.getPlanRecommendations(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des recommandations', error: error.message });
    }
});

router.get('/plans/:id/gantt', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const items = await AuditPlanService.getPlanGantt(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement du planning', error: error.message });
    }
});

router.get('/plans/:id/skills-report', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const report = await AuditPlanService.getSkillsReport(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(report);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement du rapport de competences', error: error.message });
    }
});

router.get('/plans/:id/export', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.getPlanExportData(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l export du plan', error: error.message });
    }
});

router.get('/skills', authorizeRoles(...auditPlanReadRoles), async (_req, res) => {
    try {
        const skills = await AuditPlanService.getSkills();
        res.json(skills);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des competences', error: error.message });
    }
});

router.post('/skills', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const skill = await AuditPlanService.createSkill(req.body);
        res.status(201).json(skill);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation de la competence', error: error.message });
    }
});

router.put('/skills/:id', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const skill = await AuditPlanService.updateSkill(parseInt(req.params.id as string, 10), req.body);
        res.json(skill);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour de la competence', error: error.message });
    }
});

router.delete('/skills/:id', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const result = await AuditPlanService.deleteSkill(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la competence', error: error.message });
    }
});

router.patch('/skills/:id/restore', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const skill = await AuditPlanService.restoreSkill(parseInt(req.params.id as string, 10));
        res.json(skill);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration de la competence', error: error.message });
    }
});

router.get('/missions/:id/resources', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.getMissionResources(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des ressources de la mission', error: error.message });
    }
});

router.put('/missions/:id/resources', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.updateMissionResources(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour des ressources de la mission', error: error.message });
    }
});

router.post('/suggest-plan', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const requestedType = String(req.body?.type || req.query?.type || AuditRecordType.MISSION_AUDIT);
        const requestedPlanId = req.body?.planId ? Number(req.body.planId) : null;
        appLogger.info('Auditing', 'Suggested AI planning request received', {
            userId: req.user!.id,
            role: req.user!.role,
            requestedType,
            requestedPlanId,
        });
        const plan = await AuditingService.suggestAnnualPlan(req.user!.role, requestedType, requestedPlanId);
        appLogger.info('Auditing', 'Suggested AI planning generated', {
            userId: req.user!.id,
            role: req.user!.role,
            suggestionCount: Array.isArray(plan) ? plan.length : 0,
            requestedType,
            requestedPlanId,
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

router.post('/create-missions', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
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
        if (![UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR].includes(role)) {
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

router.post('/missions', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const record = await AuditingService.createRecord(req.user!.id, req.body);
        res.status(201).json(record);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
    }
});

router.put('/missions/:id/assign', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const { auditeurId } = req.body;
        const mission = await AuditingService.assignMission(parseInt(req.params.id as string, 10), parseInt(auditeurId, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l assignation', error: error.message });
    }
});

router.put('/missions/:id', authorizeRoles(...auditMissionManagementRoles), async (req: AuthRequest, res) => {
    try {
        const mission = await AuditingService.updateMission(parseInt(req.params.id as string, 10), req.body, req.user!.id);
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

router.delete('/missions/:id', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const result = await AuditingService.deleteMission(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
});

router.patch('/missions/:id/restore', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const mission = await AuditingService.restoreMission(parseInt(req.params.id as string, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration', error: error.message });
    }
});

router.get('/action-plans', authorizeRoles(...auditAllRoles), async (req: AuthRequest, res) => {
    try {
        const items = await AuditingService.getActionPlanRecords({
            auditSeniorId: req.user!.role === UserRole.AUDIT_DIRECTEUR ? req.user!.id : undefined,
            auditeurId: req.user!.role === UserRole.AUDITEUR ? req.user!.id : undefined,
        });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des plans d actions', error: error.message });
    }
});

router.post('/action-plans', authorizeRoles(...auditMissionManagementRoles), async (req: AuthRequest, res) => {
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

router.put('/action-plans/:id', authorizeRoles(...auditAllRoles), async (req: AuthRequest, res) => {
    try {
        const item = await AuditingService.updateMission(parseInt(req.params.id as string, 10), {
            ...req.body,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
        }, req.user!.id);
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du plan d actions', error: error.message });
    }
});

router.delete('/action-plans/:id', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const result = await AuditingService.deleteMission(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du plan d actions', error: error.message });
    }
});

router.post('/action-plans/import', authorizeRoles(...auditMissionManagementRoles), uploadActionPlanFile, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }

        const items = await AuditingService.importActionPlans(req.user!.id, req.file, {
            riskId: req.body?.riskId ? Number(req.body.riskId) : null,
            planActionType: typeof req.body?.planActionType === 'string' ? req.body.planActionType : null,
            replaceExisting: false,
        });
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l import du plan d actions', error: error.message });
    }
});

router.post('/missions/import', authorizeRoles(...auditDivisionManagerRoles), uploadActionPlanFile, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier fourni' });
        }

        const riskId = req.body?.riskId ? Number(req.body.riskId) : null;
        const planActionType = typeof req.body?.planActionType === 'string' ? req.body.planActionType : null;
        const missions = await AuditingService.importMissionsFromExcel(req.user!.id, req.file, riskId, planActionType);
        res.status(201).json(missions);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l import des missions', error: error.message });
    }
});

router.put('/missions/:id/reset', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const mission = await AuditingService.resetMission(parseInt(req.params.id as string, 10));
        res.json(mission);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la réinitialisation', error: error.message });
    }
});

router.get('/checklists', authorizeRoles(...auditAllRoles), async (_req, res) => {
    try {
        const templates = await AuditingService.getChecklistTemplates();
        res.json(templates);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des modèles de checklists', error: error.message });
    }
});

router.post('/checklists', authorizeRoles(...auditMissionManagementRoles), async (req: AuthRequest, res) => {
    try {
        const template = await AuditingService.createChecklistTemplate(req.user!.id, req.body);
        res.status(201).json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création du modèle de checklist', error: error.message });
    }
});

router.put('/checklists/:id', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const template = await AuditingService.updateChecklistTemplate(parseInt(req.params.id as string, 10), req.body);
        res.json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification du modèle de checklist', error: error.message });
    }
});

router.delete('/checklists/:id', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const result = await AuditingService.deleteChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du modèle', error: error.message });
    }
});

router.patch('/checklists/:id/restore', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const template = await AuditingService.restoreChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration du modèle', error: error.message });
    }
});

router.get('/missions/:id/checklists', authorizeRoles(...auditAllRoles), async (req, res) => {
    try {
        const items = await AuditingService.getMissionChecklistItems(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.post('/missions/:id/checklists', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const items = await AuditingService.assignTemplateToMission(parseInt(req.params.id as string, 10), req.body.templateId);
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l assignation du modèle', error: error.message });
    }
});

router.put('/missions/:id/checklists/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDITEUR), async (req, res) => {
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

// Programme de travail = checklist
router.get('/work-program-templates', authorizeRoles(...auditAllRoles), async (_req, res) => {
    try {
        const templates = await AuditingService.getChecklistTemplates();
        res.json(templates);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des programmes de travail', error: error.message });
    }
});

router.post('/work-program-templates', authorizeRoles(...auditMissionManagementRoles), async (req: AuthRequest, res) => {
    try {
        const template = await AuditingService.createChecklistTemplate(req.user!.id, req.body);
        res.status(201).json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation du programme de travail', error: error.message });
    }
});

router.put('/work-program-templates/:id', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const template = await AuditingService.updateChecklistTemplate(parseInt(req.params.id as string, 10), req.body);
        res.json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification du programme de travail', error: error.message });
    }
});

router.delete('/work-program-templates/:id', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const result = await AuditingService.deleteChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du programme de travail', error: error.message });
    }
});

router.patch('/work-program-templates/:id/restore', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const template = await AuditingService.restoreChecklistTemplate(parseInt(req.params.id as string, 10));
        res.json(template);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration du programme de travail', error: error.message });
    }
});

router.get('/missions/:id/work-program', authorizeRoles(...auditAllRoles), async (req, res) => {
    try {
        const items = await AuditingService.getMissionChecklistItems(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement du programme de travail', error: error.message });
    }
});

router.post('/missions/:id/work-program', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const items = await AuditingService.assignTemplateToMission(parseInt(req.params.id as string, 10), req.body.templateId);
        res.status(201).json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l affectation du programme de travail', error: error.message });
    }
});

router.put('/missions/:id/work-program/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDITEUR), async (req, res) => {
    try {
        const item = await AuditingService.toggleMissionChecklistItem(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.body.estFait
        );
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la modification du programme de travail', error: error.message });
    }
});

router.get('/missions/:id/action-plans', authorizeRoles(...auditAllRoles), async (req, res) => {
    try {
        const items = await AuditingService.getMissionActionPlanItems(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement du plan d actions', error: error.message });
    }
});

router.post('/missions/:id/action-plans', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
    try {
        const item = await AuditingService.createMissionActionPlanItem(parseInt(req.params.id as string, 10), req.body);
        res.status(201).json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création de la ligne du plan d actions', error: error.message });
    }
});

router.put('/missions/:id/action-plans/:itemId', authorizeRoles(...auditAllRoles), async (req, res) => {
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

router.delete('/missions/:id/action-plans/:itemId', authorizeRoles(...auditMissionManagementRoles), async (req, res) => {
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

router.post('/missions/:id/action-plans/import', authorizeRoles(...auditMissionManagementRoles), uploadActionPlanFile, async (req: AuthRequest, res) => {
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

router.get('/missions/:id/evidence', authorizeRoles(...auditAllRoles), async (req, res) => {
    try {
        const evidence = await AuditingService.getMissionEvidence(parseInt(req.params.id as string, 10));
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.get('/evidence', authorizeRoles(...auditMissionManagementRoles), async (_req, res) => {
    try {
        const evidence = await AuditingService.getAllEvidence();
        res.json(evidence);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.get('/reports', authorizeRoles(...auditReportReviewRoles), async (_req, res) => {
    try {
        const reports = await AuditingService.getMissionsWithReports();
        res.json(reports);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
});

router.post('/missions/:id/evidence', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDITEUR), uploadEvidence, async (req: AuthRequest, res) => {
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

router.delete('/missions/:id/evidence/:evidenceId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.deleteMissionEvidence(parseInt(req.params.evidenceId as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la preuve', error: error.message });
    }
});

router.patch('/missions/:id/evidence/:evidenceId/restore', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDITEUR), async (req, res) => {
    try {
        const result = await AuditingService.restoreMissionEvidence(parseInt(req.params.evidenceId as string, 10));
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la restauration de la preuve', error: error.message });
    }
});

export default router;
