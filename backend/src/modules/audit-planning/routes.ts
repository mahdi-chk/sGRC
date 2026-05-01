import { Router } from 'express';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { AuditPlanService } from '../auditing/audit-plan.service';
import { AuditingService } from '../auditing/auditing.service';
import { AuditRecordType } from '../auditing/audit-mission.model';
import { appLogger } from '../../utils/app-logger';
import { AUDIT_ROLE_RESPONSIBILITY_MATRIX, AUDIT_WORK_PROGRAM_MODEL } from '../auditing/audit-responsibility-matrix';

const router = Router();

const auditDivisionManagerRoles = [UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];
const auditPlanningOperationalRoles = [UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.SUPER_ADMIN];
const auditPlanReadRoles = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.TOP_MANAGEMENT, UserRole.CONTROLLER, UserRole.SUPER_ADMIN];

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
        const plan = await AuditPlanService.getPlanDetail(parseInt(req.params.id as string, 10), req.user!.role);
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

router.get('/plans/:id/recommendations', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const items = await AuditPlanService.getPlanRecommendations(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des recommandations', error: error.message });
    }
});

router.get('/plans/:id/gantt', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const items = await AuditPlanService.getPlanGantt(parseInt(req.params.id as string, 10));
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement du planning', error: error.message });
    }
});

router.get('/plans/:id/skills-report', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const report = await AuditPlanService.getSkillsReport(parseInt(req.params.id as string, 10));
        res.json(report);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement du rapport de competences', error: error.message });
    }
});

router.get('/plans/:id/export', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.getPlanExportData(parseInt(req.params.id as string, 10), req.user!.role);
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l export du plan', error: error.message });
    }
});

router.get('/missions', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const requestedType = typeof req.query?.type === 'string' && req.query.type.trim()
            ? String(req.query.type)
            : null;
        const missions = await AuditPlanService.listMissions(req.user!.role, req.user!.id, { type: requestedType });
        res.json(missions);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des missions du plan d audit', error: error.message });
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

router.get('/missions/:id/resources', authorizeRoles(...auditPlanReadRoles), async (req, res) => {
    try {
        const data = await AuditPlanService.getMissionResources(parseInt(req.params.id as string, 10));
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des ressources de la mission', error: error.message });
    }
});

router.put('/missions/:id/resources', authorizeRoles(...auditDivisionManagerRoles), async (req, res) => {
    try {
        const data = await AuditPlanService.updateMissionResources(parseInt(req.params.id as string, 10), req.body);
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour des ressources de la mission', error: error.message });
    }
});

router.get('/work-program-templates', authorizeRoles(...auditPlanReadRoles), async (_req, res) => {
    try {
        const templates = await AuditPlanService.getWorkProgramTemplates();
        res.json(templates);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des programmes de travail', error: error.message });
    }
});

router.get('/missions/:id/workspace', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.getMissionWorkspace(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement de l espace mission', error: error.message });
    }
});

router.post('/missions/:id/mission-order/send', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.sendMissionOrder(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l envoi de l ordre de mission', error: error.message });
    }
});

router.put('/missions/:id/work-program', authorizeRoles(...auditPlanningOperationalRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.saveMissionWorkProgram(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la sauvegarde du programme de travail', error: error.message });
    }
});

router.put('/missions/:id/work-program/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.toggleMissionWorkProgramItem(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.user!.id,
            req.user!.role,
            Boolean(req.body?.estFait)
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour du programme de travail', error: error.message });
    }
});

router.post('/missions/:id/work-program-transitions', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.applyWorkProgramTransition(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la transition du programme de travail', error: error.message });
    }
});

router.put('/missions/:id/report', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.saveMissionReport(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la sauvegarde du rapport', error: error.message });
    }
});

router.post('/missions/:id/report-transitions', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const data = await AuditPlanService.applyReportTransition(
            parseInt(req.params.id as string, 10),
            req.user!.id,
            req.user!.role,
            req.body
        );
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la transition du rapport', error: error.message });
    }
});

router.get('/missions/:id/action-plans', authorizeRoles(...auditPlanReadRoles), async (req: AuthRequest, res) => {
    try {
        const items = await AuditPlanService.getMissionActionPlans(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(items);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du chargement des plans d action', error: error.message });
    }
});

router.post('/missions/:id/action-plans', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR), async (req: AuthRequest, res) => {
    try {
        const item = await AuditPlanService.createMissionActionPlan(
            parseInt(req.params.id as string, 10),
            req.user!.role,
            req.user!.id,
            req.body
        );
        res.status(201).json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation du plan d action', error: error.message });
    }
});

router.put('/missions/:id/action-plans/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.CONTROLLER), async (req: AuthRequest, res) => {
    try {
        const item = await AuditPlanService.updateMissionActionPlan(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.user!.role,
            req.user!.id,
            req.body
        );
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour du plan d action', error: error.message });
    }
});

router.delete('/missions/:id/action-plans/:itemId', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION), async (req: AuthRequest, res) => {
    try {
        const result = await AuditPlanService.deleteMissionActionPlan(
            parseInt(req.params.id as string, 10),
            parseInt(req.params.itemId as string, 10),
            req.user!.role,
            req.user!.id
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du plan d action', error: error.message });
    }
});

router.post('/suggest-plan', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const requestedType = String(req.body?.type || req.query?.type || AuditRecordType.MISSION_AUDIT);
        appLogger.info('AuditPlanning', 'Suggested AI planning request received', {
            userId: req.user!.id,
            role: req.user!.role,
            requestedType,
        });
        const plan = await AuditingService.suggestAnnualPlan(req.user!.role, requestedType);
        res.json(plan);
    } catch (error: any) {
        appLogger.error('AuditPlanning', 'Suggested AI planning request failed', {
            userId: req.user?.id,
            role: req.user?.role,
            message: error?.message,
            stack: error?.stack,
        });
        res.status(500).json({ message: 'Erreur lors de la generation du plan', error: error.message });
    }
});

router.post('/create-missions', authorizeRoles(...auditDivisionManagerRoles), async (req: AuthRequest, res) => {
    try {
        const requestedType = String(req.body?.type || AuditRecordType.MISSION_AUDIT);
        const missions = await AuditingService.createMissionsFromPlan(req.user!.id, req.body.missions, requestedType);
        res.status(201).json(missions);
    } catch (error: any) {
        appLogger.error('AuditPlanning', 'Mission creation from planning failed', {
            userId: req.user?.id,
            role: req.user?.role,
            requestedMissionCount: Array.isArray(req.body?.missions) ? req.body.missions.length : 0,
            message: error?.message,
            stack: error?.stack,
        });
        res.status(400).json({ message: 'Erreur lors de la creation des missions', error: error.message });
    }
});

export default router;
