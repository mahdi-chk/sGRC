import { Op } from 'sequelize';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { getRestoreValues, getSoftDeleteValues, restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';
import { emailService } from '../../utils/email.service';
import { AuditMission, AuditMissionStatus, AuditRecordType } from './audit-mission.model';
import { AuditPlan } from './audit-plan.model';
import { AuditPlanWorkflowEvent } from './audit-plan-workflow-event.model';
import { AuditMissionWorkflowEvent } from './audit-mission-workflow-event.model';
import { AuditMissionChecklistItem } from './audit-mission-checklist.model';
import { AuditMissionResource } from './audit-mission-resource.model';
import { AuditMissionRequiredSkill, AuditSkill, UserAuditSkill } from './audit-skill.model';
import { AuditEvidence } from './audit-evidence.model';
import { AuditEmailLog } from './audit-email-log.model';
import { AuditingService } from './auditing.service';
import { Notification, NotificationType } from '../notifications/notification.model';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';
import { Risk } from '../risk/risk.model';
import {
    AUDIT_LOOKUP_KEYS,
    AuditMissionResourceRoleCode,
    AuditPlanNatureCode,
    AuditPlanStatusCode,
    AuditPlanTransitionCode,
} from './audit-lookup-codes';

type PlanFilter = {
    nom?: string | null;
    status?: string | null;
    nature?: string | null;
    dateDebut?: string | null;
    dateFin?: string | null;
};

type TransitionResult = {
    targetStatusCode: string;
    patch: Record<string, unknown>;
};

type MissionWorkflowType = 'mission_order' | 'work_program' | 'report' | 'recommendation';
type RecommendationTransitionCode =
    | 'envoyer_recommandation'
    | 'soumettre_plan_action'
    | 'demander_validation_plan_action'
    | 'demander_revue_plan_action'
    | 'demander_revue_validation_plan_action'
    | 'valider_plan_action'
    | 'demander_mise_a_jour_avancement'
    | 'soumettre_taux_avancement'
    | 'demander_revue_taux_avancement'
    | 'demander_validation_avancement_100'
    | 'demander_revoir_100'
    | 'valider_avancement_100'
    | 'fermer_recommandation'
    | 'reouvrir'
    | 'fermer_definitivement';

type MissionPermissions = {
    canManageResources: boolean;
    canSendMissionOrder: boolean;
    canEditWorkProgram: boolean;
    canExecuteWorkProgram: boolean;
    canSubmitWorkProgram: boolean;
    canValidateWorkProgram: boolean;
    canApproveWorkProgram: boolean;
    canEditReport: boolean;
    canSubmitReport: boolean;
    canValidateReport: boolean;
    canApproveReport: boolean;
    canCreateActionPlan: boolean;
    canUpdateActionPlan: boolean;
    canDeleteActionPlan: boolean;
    canFollowActionPlan: boolean;
    canUploadEvidence: boolean;
    canDeleteEvidence: boolean;
};

const PLAN_READ_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.AUDIT_DIRECTEUR,
    UserRole.AUDIT_RESPONSABLE,
    UserRole.CHEF_MISSION,
    UserRole.AUDITEUR,
    UserRole.TOP_MANAGEMENT,
    UserRole.CONTROLLER,
] as const;

const PLAN_WRITE_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.AUDIT_DIRECTEUR,
    UserRole.AUDIT_RESPONSABLE,
] as const;

const MISSION_ORDER_MANAGER_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE] as const;
const WORK_PROGRAM_EDITOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION] as const;
const WORK_PROGRAM_EXECUTION_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;
const WORK_PROGRAM_VALIDATOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE] as const;
const WORK_PROGRAM_APPROVER_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_DIRECTEUR] as const;
const REPORT_EDITOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;
const REPORT_SUBMITTER_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION] as const;
const REPORT_VALIDATOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE] as const;
const REPORT_APPROVER_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_DIRECTEUR] as const;
const ACTION_PLAN_CREATOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;
const ACTION_PLAN_UPDATE_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.CONTROLLER] as const;
const ACTION_PLAN_DELETE_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION] as const;
const RECOMMENDATION_AUDIT_OWNER_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;
const RECOMMENDATION_AUDIT_MANAGER_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE] as const;
const RECOMMENDATION_AUDITED_ROLES = [UserRole.SUPER_ADMIN, UserRole.CONTROLLER] as const;
const RECOMMENDATION_FINAL_CLOSER_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE] as const;
const EVIDENCE_UPLOAD_ROLES = [UserRole.SUPER_ADMIN, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;
const EVIDENCE_DELETE_ROLES = [UserRole.SUPER_ADMIN, UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR] as const;

const EDITABLE_WORKFLOW_STATUSES = ['draft', 'rework_requested'];

const WORK_PROGRAM_STATUS_LABELS: Record<string, string> = {
    draft: 'Brouillon',
    submitted: 'Soumis au chef de division',
    validated: 'Valide par le chef de division',
    approved: 'Approuve par le directeur',
    rework_requested: 'Retourne pour rework',
};

const REPORT_STATUS_LABELS: Record<string, string> = {
    draft: 'Brouillon',
    submitted: 'Soumis par le chef de mission',
    validated: 'Valide par le chef de division',
    approved: 'Approuve par le directeur',
    rework_requested: 'Retourne pour rework',
};

const RECOMMENDATION_STATUS_LABELS: Record<string, string> = {
    cree: 'Cree',
    recommandation_a_envoyer: 'Recommandation a envoyer',
    plan_actions_a_soumettre: 'Plan d actions a soumettre',
    plan_actions_a_revoir: 'Plan d actions a revoir',
    plan_actions_a_valider: 'Plan d actions a valider',
    plan_action_valide: 'Plan d action valide',
    plan_actions_a_mettre_a_jour: 'Plan d actions a mettre a jour',
    plan_actions_mis_a_jour: 'Plan d actions mis a jour',
    avancement_100_a_valider: 'Avancement 100% a valider',
    avancement_100_valide: 'Avancement 100% valide',
    ferme: 'Ferme',
    ferme_definitivement: 'Ferme definitivement',
};

const MISSION_ORDER_STATUS_LABELS: Record<string, string> = {
    pending: 'A envoyer',
    sent: 'Envoye',
};

const buildDisplayName = (user: any) =>
    `${user?.prenom || ''} ${user?.nom || ''}`.trim() || user?.mail || 'Utilisateur';

const isRoleAllowed = (role: string, allowedRoles: readonly string[]) =>
    allowedRoles.includes(role);

export class AuditPlanService {
    static getLookupOptions(key: string) {
        const allowedKeys = new Set<string>([
            AUDIT_LOOKUP_KEYS.PLAN_STATUS,
            AUDIT_LOOKUP_KEYS.PLAN_NATURE,
            AUDIT_LOOKUP_KEYS.PLAN_TRANSITION,
            AUDIT_LOOKUP_KEYS.MISSION_CATEGORY,
            AUDIT_LOOKUP_KEYS.MISSION_QUARTER,
            AUDIT_LOOKUP_KEYS.RESOURCE_ASSIGNMENT_ROLE,
        ]);

        if (!allowedKeys.has(key)) {
            throw new Error('Lookup audit non supporte');
        }

        const options = LookupResolutionService.getStaticOptions(key);
        if (key === AUDIT_LOOKUP_KEYS.RESOURCE_ASSIGNMENT_ROLE) {
            return options.filter((option: any) =>
                option.code === AuditMissionResourceRoleCode.CHEF_MISSION
                || option.code === AuditMissionResourceRoleCode.AUDITEUR
            );
        }

        return options;
    }

    private static async getPlanById(planId: number, withDeleted = false) {
        const scope = withDeleted ? AuditPlan.scope('withDeleted') : AuditPlan;
        const plan = await scope.findByPk(planId, {
            include: [{ model: User, as: 'createdBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false }],
        });

        if (!plan) {
            throw new Error('Plan d audit introuvable');
        }

        return plan;
    }

    private static ensurePlanReadable(role: string) {
        if (!isRoleAllowed(role, PLAN_READ_ROLES)) {
            throw new Error('Acces non autorise');
        }
    }

    private static ensurePlanWritable(role: string) {
        if (!isRoleAllowed(role, PLAN_WRITE_ROLES)) {
            throw new Error('Acces non autorise');
        }
    }

    private static async getMissionById(missionId: number) {
        const mission = await AuditMission.findByPk(missionId, {
            include: [
                { model: User, as: 'auditSenior', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'chefMission', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'missionOrderSender', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'workProgramPreparedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'workProgramValidatedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'workProgramApprovedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'reportPreparedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'reportValidatedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'reportApprovedBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { association: 'auditPlan', required: false } as any,
            ],
        });

        if (!mission || mission.type !== AuditRecordType.MISSION_AUDIT || !mission.auditPlanId) {
            throw new Error('Mission du plan introuvable');
        }

        return mission;
    }

    private static ensureMissionReadable(mission: AuditMission, role: string, userId: number) {
        this.ensurePlanReadable(role);

        if (role === UserRole.CHEF_MISSION && mission.chefMissionId !== userId) {
            throw new Error('Cette mission n est pas affectee a ce chef de mission');
        }

        if (role === UserRole.AUDITEUR && mission.auditeurId !== userId) {
            throw new Error('Cette mission n est pas affectee a cet auditeur');
        }
    }

    private static ensureMissionRole(mission: AuditMission, role: string, userId: number, allowedRoles: readonly string[]) {
        if (!isRoleAllowed(role, allowedRoles)) {
            throw new Error('Acces non autorise');
        }

        if (role === UserRole.CHEF_MISSION && allowedRoles.includes(UserRole.CHEF_MISSION) && mission.chefMissionId !== userId) {
            throw new Error('Cette mission n est pas affectee a ce chef de mission');
        }

        if (role === UserRole.AUDITEUR && allowedRoles.includes(UserRole.AUDITEUR) && mission.auditeurId !== userId) {
            throw new Error('Cette mission n est pas affectee a cet auditeur');
        }
    }

    private static getWorkflowStatusLabel(type: MissionWorkflowType, status: string | null | undefined) {
        const normalized = String(status || '').trim() || (type === 'mission_order' ? 'pending' : 'draft');
        const mapping = type === 'work_program'
            ? WORK_PROGRAM_STATUS_LABELS
            : type === 'report'
                ? REPORT_STATUS_LABELS
                : type === 'recommendation'
                    ? RECOMMENDATION_STATUS_LABELS
                    : MISSION_ORDER_STATUS_LABELS;

        return mapping[normalized] || normalized;
    }

    private static buildMissionPermissions(mission: AuditMission, role: string, userId: number): MissionPermissions {
        const isAssignedChef = role === UserRole.CHEF_MISSION && mission.chefMissionId === userId;
        const isAssignedAuditor = role === UserRole.AUDITEUR && mission.auditeurId === userId;
        const isGlobalManager = [UserRole.SUPER_ADMIN, UserRole.AUDIT_RESPONSABLE, UserRole.AUDIT_DIRECTEUR, UserRole.CONTROLLER].includes(role);
        const canEditWorkProgram = isRoleAllowed(role, WORK_PROGRAM_EDITOR_ROLES)
            && (role === UserRole.SUPER_ADMIN || role === UserRole.AUDIT_RESPONSABLE || isAssignedChef)
            && EDITABLE_WORKFLOW_STATUSES.includes(String(mission.workProgramStatus || 'draft'));
        const canEditReport = isRoleAllowed(role, REPORT_EDITOR_ROLES)
            && (
                role === UserRole.SUPER_ADMIN
                || isAssignedChef
                || isAssignedAuditor
            )
            && EDITABLE_WORKFLOW_STATUSES.includes(String(mission.reportStatus || 'draft'));

        return {
            canManageResources: isRoleAllowed(role, MISSION_ORDER_MANAGER_ROLES),
            canSendMissionOrder: isRoleAllowed(role, MISSION_ORDER_MANAGER_ROLES),
            canEditWorkProgram,
            canExecuteWorkProgram: isRoleAllowed(role, WORK_PROGRAM_EXECUTION_ROLES) && (role === UserRole.SUPER_ADMIN || isAssignedChef || isAssignedAuditor),
            canSubmitWorkProgram: isRoleAllowed(role, WORK_PROGRAM_EDITOR_ROLES)
                && (role === UserRole.SUPER_ADMIN || role === UserRole.AUDIT_RESPONSABLE || isAssignedChef)
                && ['draft', 'rework_requested'].includes(String(mission.workProgramStatus || 'draft')),
            canValidateWorkProgram: isRoleAllowed(role, WORK_PROGRAM_VALIDATOR_ROLES) && String(mission.workProgramStatus || 'draft') === 'submitted',
            canApproveWorkProgram: isRoleAllowed(role, WORK_PROGRAM_APPROVER_ROLES) && String(mission.workProgramStatus || 'draft') === 'validated',
            canEditReport,
            canSubmitReport: isRoleAllowed(role, REPORT_SUBMITTER_ROLES)
                && (role === UserRole.SUPER_ADMIN || isAssignedChef)
                && ['draft', 'rework_requested'].includes(String(mission.reportStatus || 'draft')),
            canValidateReport: isRoleAllowed(role, REPORT_VALIDATOR_ROLES) && String(mission.reportStatus || 'draft') === 'submitted',
            canApproveReport: isRoleAllowed(role, REPORT_APPROVER_ROLES) && String(mission.reportStatus || 'draft') === 'validated',
            canCreateActionPlan: isRoleAllowed(role, ACTION_PLAN_CREATOR_ROLES) && (role === UserRole.SUPER_ADMIN || isAssignedChef || isAssignedAuditor),
            canUpdateActionPlan: isRoleAllowed(role, ACTION_PLAN_UPDATE_ROLES) && (isGlobalManager || isAssignedChef || isAssignedAuditor),
            canDeleteActionPlan: isRoleAllowed(role, ACTION_PLAN_DELETE_ROLES) && (role !== UserRole.CHEF_MISSION || isAssignedChef),
            canFollowActionPlan: isRoleAllowed(role, ACTION_PLAN_UPDATE_ROLES) && (isGlobalManager || isAssignedChef || isAssignedAuditor),
            canUploadEvidence: isRoleAllowed(role, EVIDENCE_UPLOAD_ROLES) && (role === UserRole.SUPER_ADMIN || isAssignedChef || isAssignedAuditor),
            canDeleteEvidence: isRoleAllowed(role, EVIDENCE_DELETE_ROLES) && (isGlobalManager || isAssignedChef || isAssignedAuditor),
        };
    }

    private static async createMissionWorkflowEvent(
        missionId: number,
        actorUserId: number,
        workflowType: MissionWorkflowType,
        transitionCode: string,
        fromStatus: string | null,
        toStatus: string | null,
        comment?: string | null
    ) {
        await AuditMissionWorkflowEvent.create({
            missionId,
            actorUserId,
            workflowType,
            transitionCode,
            fromStatus,
            toStatus,
            comment: comment ? String(comment).trim() : null,
        });
    }

    private static async notifyMissionWorkflowParticipants(
        mission: AuditMission,
        actorUserId: number,
        notificationType: string,
        content: string,
        recipientIds: Array<number | null | undefined>
    ) {
        const uniqueRecipientIds = Array.from(new Set(
            recipientIds.filter((userId): userId is number => Number.isFinite(userId) && userId !== actorUserId)
        ));

        for (const userId of uniqueRecipientIds) {
            await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                userId,
                type: notificationType,
                content,
                auditMissionId: mission.id,
            }));
        }
    }

    private static async sendMissionWorkflowEmails(
        mission: AuditMission,
        actorUserId: number,
        recipientIds: Array<number | null | undefined>,
        payload: {
            transitionCode: string;
            comment?: string | null;
            reference?: string | null;
            dueDate?: string | null;
        }
    ) {
        const uniqueRecipientIds = Array.from(new Set(
            recipientIds.filter((userId): userId is number => Number.isFinite(userId) && userId !== actorUserId)
        ));

        if (uniqueRecipientIds.length === 0) {
            return;
        }

        const recipients = await User.findAll({
            where: { id: { [Op.in]: uniqueRecipientIds } },
            attributes: ['id', 'nom', 'prenom', 'mail'],
        });
        const actor = await User.findByPk(actorUserId, { attributes: ['id', 'nom', 'prenom', 'mail'] });
        const actorName = buildDisplayName(actor);

        for (const recipient of recipients) {
            await emailService.sendAuditMissionWorkflowEmail(
                { mail: recipient.mail, nom: recipient.nom, prenom: recipient.prenom, userId: recipient.id },
                {
                    missionTitle: mission.titre,
                    missionId: mission.id,
                    planId: mission.auditPlanId || null,
                    transitionCode: payload.transitionCode,
                    actorName,
                    comment: payload.comment || null,
                    reference: payload.reference || null,
                    dueDate: payload.dueDate || null,
                }
            );
        }
    }

    private static async syncMissionAssigneeFieldsFromResources(mission: AuditMission, clearMissing = false) {
        const activeResources = await AuditMissionResource.findAll({ where: { missionId: mission.id } });
        const chefMissionRoleId = LookupResolutionService.getStaticValue(
            AUDIT_LOOKUP_KEYS.RESOURCE_ASSIGNMENT_ROLE,
            AuditMissionResourceRoleCode.CHEF_MISSION
        )?.id;
        const auditeurRoleId = LookupResolutionService.getStaticValue(
            AUDIT_LOOKUP_KEYS.RESOURCE_ASSIGNMENT_ROLE,
            AuditMissionResourceRoleCode.AUDITEUR
        )?.id;

        const chefMissionAssignment = activeResources.find((item) => item.assignmentRoleId === chefMissionRoleId);
        const auditeurAssignment = activeResources.find((item) => item.assignmentRoleId === auditeurRoleId);
        const chefMissionId = chefMissionAssignment?.userId || (clearMissing ? null : mission.chefMissionId || null);
        const auditeurId = auditeurAssignment?.userId || (clearMissing ? null : mission.auditeurId || null);

        if (mission.chefMissionId !== chefMissionId || mission.auditeurId !== auditeurId) {
            await mission.update({ chefMissionId, auditeurId });
        }

        return mission;
    }

    private static ensurePlanEditable(plan: AuditPlan) {
        if (this.getPlanStatusCode(plan) === AuditPlanStatusCode.FERME_DEFINITIVEMENT) {
            throw new Error('Le plan est ferme definitivement et ne peut plus etre modifie');
        }
    }

    private static getPlanStatusCode(plan: AuditPlan): string {
        const payload = plan.toJSON() as any;
        return String(payload.statusCode || (plan as any).status || payload.status || '').trim();
    }

    private static buildPlanFilterWhere(role: string, userId: number, filter: PlanFilter = {}) {
        const where: Record<string, unknown> = {};

        if (role === UserRole.AUDIT_RESPONSABLE) {
            where.createdById = userId;
        }

        if (filter.nom) {
            where.nom = { [Op.like]: `%${String(filter.nom).trim()}%` };
        }

        return where;
    }

    private static isMissionScopedRole(role: string) {
        return [UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.CONTROLLER].includes(role as UserRole);
    }

    private static isRiskMissionReaderRole(role: string) {
        return [UserRole.RISK_MANAGER, UserRole.RISK_AGENT].includes(role as UserRole);
    }

    private static buildMissionScopeWhere(role: string, userId: number) {
        if (role === UserRole.CHEF_MISSION) {
            return { chefMissionId: userId };
        }

        if (role === UserRole.AUDITEUR) {
            return { auditeurId: userId };
        }

        if (role === UserRole.CONTROLLER) {
            return { auditedPrincipalId: userId };
        }

        return {};
    }

    private static async getVisibleMissionIds(planId: number, role: string, userId: number) {
        if (!this.isMissionScopedRole(role)) {
            const missions = await AuditMission.findAll({
                where: {
                    auditPlanId: planId,
                    type: AuditRecordType.MISSION_AUDIT,
                },
                attributes: ['id'],
            });

            return missions.map((mission) => mission.id);
        }

        if (role === UserRole.CONTROLLER) {
            const sourceMissions = await AuditMission.findAll({
                where: {
                    auditPlanId: planId,
                    type: AuditRecordType.MISSION_AUDIT,
                },
                attributes: ['id', 'auditedPrincipalId'],
            });
            const sourceMissionIds = sourceMissions.map((mission) => mission.id);
            const visibleMissionIds = new Set<number>(
                sourceMissions
                    .filter((mission) => mission.auditedPrincipalId === userId)
                    .map((mission) => mission.id)
            );

            if (sourceMissionIds.length > 0) {
                const resourceAssignments = await AuditMissionResource.findAll({
                    where: {
                        missionId: { [Op.in]: sourceMissionIds },
                        userId,
                    },
                    attributes: ['missionId'],
                });

                for (const assignment of resourceAssignments) {
                    visibleMissionIds.add(assignment.missionId);
                }
            }

            const assignedRecommendations = await AuditMission.findAll({
                where: {
                    type: AuditRecordType.PLAN_ACTION_AUDIT,
                    auditedPrincipalId: userId,
                    [Op.or]: [
                        { auditPlanId: planId },
                        ...(sourceMissionIds.length > 0 ? [{ sourceMissionId: { [Op.in]: sourceMissionIds } }] : []),
                    ],
                },
                attributes: ['sourceMissionId'],
            });

            for (const recommendation of assignedRecommendations) {
                if (recommendation.sourceMissionId) {
                    visibleMissionIds.add(recommendation.sourceMissionId);
                }
            }

            return Array.from(visibleMissionIds);
        }

        const missions = await AuditMission.findAll({
            where: {
                auditPlanId: planId,
                type: AuditRecordType.MISSION_AUDIT,
                ...this.buildMissionScopeWhere(role, userId),
            },
            attributes: ['id'],
        });

        return missions.map((mission) => mission.id);
    }

    static async listPlans(role: string, userId: number, filter: PlanFilter = {}) {
        this.ensurePlanReadable(role);
        const where = this.buildPlanFilterWhere(role, userId, filter);
        const resolvedNatureId = filter.nature
            ? await LookupResolutionService.resolveLookupId(AUDIT_LOOKUP_KEYS.PLAN_NATURE, filter.nature)
            : null;
        const resolvedStatusId = filter.status
            ? await LookupResolutionService.resolveLookupId(AUDIT_LOOKUP_KEYS.PLAN_STATUS, filter.status)
            : null;

        if (resolvedNatureId) {
            where.natureId = resolvedNatureId;
        }

        if (resolvedStatusId) {
            where.statusId = resolvedStatusId;
        }

        if (filter.dateDebut || filter.dateFin) {
            const range: any = {};
            if (filter.dateDebut) {
                range[Op.gte] = new Date(filter.dateDebut);
            }
            if (filter.dateFin) {
                range[Op.lte] = new Date(filter.dateFin);
            }
            where.dateDebut = range;
        }

        let plans = await AuditPlan.findAll({
            where,
            include: [{ model: User, as: 'createdBy', attributes: ['id', 'prenom', 'nom', 'mail'], required: false }],
            order: [['updatedAt', 'DESC']],
        });

        if (this.isMissionScopedRole(role) && plans.length > 0) {
            const candidatePlanIds = plans.map((plan) => plan.id);
            const visiblePlanIds = new Set<number>();

            if (role === UserRole.CONTROLLER) {
                const planMissions = await AuditMission.findAll({
                    where: {
                        auditPlanId: { [Op.in]: candidatePlanIds },
                        type: AuditRecordType.MISSION_AUDIT,
                    },
                    attributes: ['id', 'auditPlanId', 'auditedPrincipalId'],
                });
                const missionPlanMap = new Map<number, number>();

                for (const mission of planMissions) {
                    if (mission.auditPlanId) {
                        missionPlanMap.set(mission.id, mission.auditPlanId);
                    }
                    if (mission.auditPlanId && mission.auditedPrincipalId === userId) {
                        visiblePlanIds.add(mission.auditPlanId);
                    }
                }

                if (missionPlanMap.size > 0) {
                    const resourceAssignments = await AuditMissionResource.findAll({
                        where: {
                            missionId: { [Op.in]: Array.from(missionPlanMap.keys()) },
                            userId,
                        },
                        attributes: ['missionId'],
                    });

                    for (const assignment of resourceAssignments) {
                        const sourcePlanId = missionPlanMap.get(assignment.missionId);
                        if (sourcePlanId) {
                            visiblePlanIds.add(sourcePlanId);
                        }
                    }
                }

                const assignedRecommendations = await AuditMission.findAll({
                    where: {
                        type: AuditRecordType.PLAN_ACTION_AUDIT,
                        auditedPrincipalId: userId,
                        [Op.or]: [
                            { auditPlanId: { [Op.in]: candidatePlanIds } },
                            ...(missionPlanMap.size > 0 ? [{ sourceMissionId: { [Op.in]: Array.from(missionPlanMap.keys()) } }] : []),
                        ],
                    },
                    attributes: ['auditPlanId', 'sourceMissionId'],
                });

                for (const recommendation of assignedRecommendations) {
                    if (recommendation.auditPlanId) {
                        visiblePlanIds.add(recommendation.auditPlanId);
                    } else if (recommendation.sourceMissionId) {
                        const sourcePlanId = missionPlanMap.get(recommendation.sourceMissionId);
                        if (sourcePlanId) {
                            visiblePlanIds.add(sourcePlanId);
                        }
                    }
                }
            } else {
                const scopedMissions = await AuditMission.findAll({
                    where: {
                        auditPlanId: { [Op.in]: candidatePlanIds },
                        type: AuditRecordType.MISSION_AUDIT,
                        ...this.buildMissionScopeWhere(role, userId),
                    },
                    attributes: ['auditPlanId'],
                });

                for (const mission of scopedMissions) {
                    if (mission.auditPlanId) {
                        visiblePlanIds.add(mission.auditPlanId);
                    }
                }
            }

            plans = plans.filter((plan) => visiblePlanIds.has(plan.id));
        }

        const missionCountMap = new Map<number, number>();
        const recommendationCountMap = new Map<number, number>();
        const planIds = plans.map((plan) => plan.id);
        const missions = planIds.length > 0
            ? await AuditMission.findAll({
                where: {
                    auditPlanId: { [Op.in]: planIds },
                    ...(role !== UserRole.CONTROLLER ? {} : { type: AuditRecordType.MISSION_AUDIT }),
                },
                attributes: ['id', 'auditPlanId', 'type', 'statutId', 'auditedPrincipalId'],
            })
            : [];

        let visibleControllerSourceMissionIds = new Set<number>();

        if (role === UserRole.CONTROLLER && planIds.length > 0) {
            const missionPlanMap = new Map<number, number>();

            for (const mission of missions) {
                if (mission.auditPlanId) {
                    missionPlanMap.set(mission.id, mission.auditPlanId);
                }
                if (mission.auditPlanId && mission.auditedPrincipalId === userId) {
                    visibleControllerSourceMissionIds.add(mission.id);
                }
            }

            if (missionPlanMap.size > 0) {
                const resourceAssignments = await AuditMissionResource.findAll({
                    where: {
                        missionId: { [Op.in]: Array.from(missionPlanMap.keys()) },
                        userId,
                    },
                    attributes: ['missionId'],
                });

                for (const assignment of resourceAssignments) {
                    visibleControllerSourceMissionIds.add(assignment.missionId);
                }
            }

            const assignedRecommendations = await AuditMission.findAll({
                where: {
                    type: AuditRecordType.PLAN_ACTION_AUDIT,
                    [Op.or]: [
                        {
                            auditedPrincipalId: userId,
                            [Op.or]: [
                                { auditPlanId: { [Op.in]: planIds } },
                                ...(missionPlanMap.size > 0 ? [{ sourceMissionId: { [Op.in]: Array.from(missionPlanMap.keys()) } }] : []),
                            ],
                        },
                        ...(visibleControllerSourceMissionIds.size > 0 ? [{ sourceMissionId: { [Op.in]: Array.from(visibleControllerSourceMissionIds) } }] : []),
                    ],
                },
                attributes: ['id', 'auditPlanId', 'sourceMissionId'],
            });

            for (const recommendation of assignedRecommendations) {
                const sourcePlanId = recommendation.sourceMissionId
                    ? missionPlanMap.get(recommendation.sourceMissionId)
                    : null;
                const planId = recommendation.auditPlanId || sourcePlanId || null;

                if (planId) {
                    recommendationCountMap.set(planId, (recommendationCountMap.get(planId) || 0) + 1);
                }
                if (recommendation.sourceMissionId) {
                    visibleControllerSourceMissionIds.add(recommendation.sourceMissionId);
                }
            }
        }

        for (const mission of missions) {
            const planId = mission.auditPlanId || 0;
            if (!planId) {
                continue;
            }

            if (role === UserRole.CONTROLLER) {
                if (visibleControllerSourceMissionIds.has(mission.id)) {
                    missionCountMap.set(planId, (missionCountMap.get(planId) || 0) + 1);
                }
                continue;
            }

            if (mission.type === AuditRecordType.PLAN_ACTION_AUDIT) {
                recommendationCountMap.set(planId, (recommendationCountMap.get(planId) || 0) + 1);
            } else {
                missionCountMap.set(planId, (missionCountMap.get(planId) || 0) + 1);
            }
        }

        return plans.map((plan) => ({
            ...plan.toJSON(),
            missionCount: missionCountMap.get(plan.id) || 0,
            recommendationCount: recommendationCountMap.get(plan.id) || 0,
            availableTransitions: this.getAvailableTransitions(this.getPlanStatusCode(plan), role),
            isEditable: this.getPlanStatusCode(plan) !== AuditPlanStatusCode.FERME_DEFINITIVEMENT,
        }));
    }

    static async createPlan(actorId: number, data: any) {
        const payload = await LookupResolutionService.resolveEntityPayload('auditPlan', {
            nom: String(data.nom || '').trim(),
            calendrier: String(data.calendrier || '').trim() || null,
            description: String(data.description || '').trim() || null,
            nature: data.nature || AuditPlanNatureCode.ANNUEL,
            status: data.status || AuditPlanStatusCode.CREE,
            isTemplate: Boolean(data.isTemplate),
            dateDebut: data.dateDebut ? new Date(data.dateDebut) : null,
            dateFin: data.dateFin ? new Date(data.dateFin) : null,
            createdById: actorId,
        });

        if (!payload.nom) {
            throw new Error('Le nom du plan est obligatoire');
        }

        const created = await AuditPlan.create(payload);
        return this.getPlanDetail(created.id);
    }

    static async updatePlan(planId: number, actorRole: string, data: any) {
        this.ensurePlanWritable(actorRole);
        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const payload = await LookupResolutionService.resolveEntityPayload('auditPlan', {
            nom: data.nom !== undefined ? String(data.nom || '').trim() : plan.nom,
            calendrier: data.calendrier !== undefined ? String(data.calendrier || '').trim() || null : plan.calendrier,
            description: data.description !== undefined ? String(data.description || '').trim() || null : plan.description,
            nature: data.nature !== undefined ? data.nature : (plan as any).natureCode,
            isTemplate: data.isTemplate !== undefined ? Boolean(data.isTemplate) : plan.isTemplate,
            dateDebut: data.dateDebut !== undefined ? (data.dateDebut ? new Date(data.dateDebut) : null) : plan.dateDebut,
            dateFin: data.dateFin !== undefined ? (data.dateFin ? new Date(data.dateFin) : null) : plan.dateFin,
        });

        await plan.update(payload);
        return this.getPlanDetail(planId);
    }

    static async deletePlan(planId: number) {
        const plan = await this.getPlanById(planId);
        await softDeleteInstance(plan);

        await AuditMission.update(getSoftDeleteValues(), {
            where: { auditPlanId: planId, is_deleted: false },
        });

        return { message: 'Plan d audit supprime avec succes' };
    }

    static async restorePlan(planId: number) {
        const plan = await this.getPlanById(planId, true);
        if (!plan.is_deleted) {
            throw new Error('Le plan n est pas supprime');
        }

        if (this.getPlanStatusCode(plan) === AuditPlanStatusCode.FERME_DEFINITIVEMENT) {
            throw new Error('Un plan ferme definitivement ne peut pas etre restaure');
        }

        await restoreSoftDeletedInstance(plan);
        await AuditMission.scope('withDeleted').update(getRestoreValues(), {
            where: { auditPlanId: planId, is_deleted: true },
        });

        return this.getPlanDetail(planId);
    }

    private static getAvailableTransitions(statusCode: string, role: string) {
        const transitions: string[] = [];
        const isSupervisor = role === UserRole.AUDIT_RESPONSABLE || role === UserRole.SUPER_ADMIN;
        const isDirector = role === UserRole.AUDIT_DIRECTEUR || role === UserRole.SUPER_ADMIN;

        if (statusCode === AuditPlanStatusCode.CREE && isSupervisor) {
            transitions.push(AuditPlanTransitionCode.DEMANDER_VALIDATION, AuditPlanTransitionCode.DEFINIR_MODELE);
        }
        if (statusCode === AuditPlanStatusCode.A_VALIDER && isDirector) {
            transitions.push(AuditPlanTransitionCode.VALIDER_DIRECTION, AuditPlanTransitionCode.DEMANDER_REVUE);
        }
        if (statusCode === AuditPlanStatusCode.VALIDE_DIRECTION) {
            if (isSupervisor) {
                transitions.push(AuditPlanTransitionCode.VALIDER_CONSEIL);
            }
            if (isDirector || isSupervisor) {
                transitions.push(AuditPlanTransitionCode.DEMANDER_REVUE);
            }
        }
        if (statusCode === AuditPlanStatusCode.VALIDE_CONSEIL) {
            if (isSupervisor) {
                transitions.push(AuditPlanTransitionCode.VALIDER_COMITE);
            }
            if (isDirector || isSupervisor) {
                transitions.push(AuditPlanTransitionCode.DEMANDER_REVUE);
            }
        }
        if (statusCode === AuditPlanStatusCode.VALIDE_COMITE && isSupervisor) {
            transitions.push(AuditPlanTransitionCode.FERMER, AuditPlanTransitionCode.DEMANDER_REVUE);
        }
        if (statusCode === AuditPlanStatusCode.FERME && isSupervisor) {
            transitions.push(AuditPlanTransitionCode.REOUVRIR, AuditPlanTransitionCode.FERMER_DEFINITIVEMENT);
        }

        return transitions;
    }

    private static resolveTransition(currentStatusCode: string, transitionCode: string, comment?: string | null): TransitionResult {
        switch (transitionCode) {
            case AuditPlanTransitionCode.DEMANDER_VALIDATION:
                if (currentStatusCode !== AuditPlanStatusCode.CREE) {
                    throw new Error('Transition invalide');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.A_VALIDER,
                    patch: { submittedAt: new Date() },
                };
            case AuditPlanTransitionCode.VALIDER_DIRECTION:
                if (currentStatusCode !== AuditPlanStatusCode.A_VALIDER) {
                    throw new Error('La validation direction exige un plan a valider');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.VALIDE_DIRECTION,
                    patch: { validatedDirectionAt: new Date() },
                };
            case AuditPlanTransitionCode.DEMANDER_REVUE:
                if (!comment || !String(comment).trim()) {
                    throw new Error('Un commentaire est obligatoire pour demander une revue');
                }
                if (!([AuditPlanStatusCode.A_VALIDER, AuditPlanStatusCode.VALIDE_DIRECTION, AuditPlanStatusCode.VALIDE_CONSEIL, AuditPlanStatusCode.VALIDE_COMITE] as string[]).includes(currentStatusCode)) {
                    throw new Error('Transition invalide');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.CREE,
                    patch: {},
                };
            case AuditPlanTransitionCode.VALIDER_CONSEIL:
                if (currentStatusCode !== AuditPlanStatusCode.VALIDE_DIRECTION) {
                    throw new Error('Pas de validation Conseil sans Direction');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.VALIDE_CONSEIL,
                    patch: { validatedCouncilAt: new Date() },
                };
            case AuditPlanTransitionCode.VALIDER_COMITE:
                if (currentStatusCode !== AuditPlanStatusCode.VALIDE_CONSEIL) {
                    throw new Error('Pas de validation Comite sans Conseil');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.VALIDE_COMITE,
                    patch: { validatedCommitteeAt: new Date() },
                };
            case AuditPlanTransitionCode.FERMER:
                if (currentStatusCode !== AuditPlanStatusCode.VALIDE_COMITE) {
                    throw new Error('Seul un plan valide par Comite peut etre ferme');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.FERME,
                    patch: { closedAt: new Date() },
                };
            case AuditPlanTransitionCode.REOUVRIR:
                if (currentStatusCode !== AuditPlanStatusCode.FERME) {
                    throw new Error('Seul un plan ferme peut etre reouvert');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.VALIDE_COMITE,
                    patch: { closedAt: null },
                };
            case AuditPlanTransitionCode.FERMER_DEFINITIVEMENT:
                if (currentStatusCode !== AuditPlanStatusCode.FERME) {
                    throw new Error('Seul un plan ferme peut etre ferme definitivement');
                }
                return {
                    targetStatusCode: AuditPlanStatusCode.FERME_DEFINITIVEMENT,
                    patch: { closedDefinitivelyAt: new Date() },
                };
            case AuditPlanTransitionCode.DEFINIR_MODELE:
                if (currentStatusCode !== AuditPlanStatusCode.CREE) {
                    throw new Error('Seul un plan en creation peut etre defini comme modele');
                }
                return {
                    targetStatusCode: currentStatusCode,
                    patch: { isTemplate: true },
                };
            default:
                throw new Error('Transition inconnue');
        }
    }

    private static async createWorkflowEvent(planId: number, actorUserId: number, transitionCode: string, fromStatusId: number | null, toStatusId: number, comment?: string | null) {
        await AuditPlanWorkflowEvent.create(await LookupResolutionService.resolveEntityPayload('auditPlanWorkflowEvent', {
            planId,
            transition: transitionCode,
            fromStatusId,
            toStatusId,
            actorUserId,
            comment: comment ? String(comment).trim() : null,
        }));
    }

    private static async notifyPlanTransition(plan: AuditPlan, actorUserId: number, transitionCode: string, targetStatusCode: string) {
        const recipientRoleIds = (() => {
            switch (transitionCode) {
                case AuditPlanTransitionCode.DEMANDER_VALIDATION:
                    return [LookupResolutionService.getStaticValue('user.role', UserRole.AUDIT_DIRECTEUR)?.id];
                case AuditPlanTransitionCode.DEMANDER_REVUE:
                case AuditPlanTransitionCode.VALIDER_DIRECTION:
                    return [LookupResolutionService.getStaticValue('user.role', UserRole.AUDIT_RESPONSABLE)?.id];
                case AuditPlanTransitionCode.VALIDER_CONSEIL:
                case AuditPlanTransitionCode.VALIDER_COMITE:
                case AuditPlanTransitionCode.FERMER:
                case AuditPlanTransitionCode.REOUVRIR:
                case AuditPlanTransitionCode.FERMER_DEFINITIVEMENT:
                case AuditPlanTransitionCode.DEFINIR_MODELE:
                    return [LookupResolutionService.getStaticValue('user.role', UserRole.AUDIT_DIRECTEUR)?.id];
                default:
                    return [];
            }
        })();
        const recipients = await User.findAll({
            where: {
                roleId: {
                    [Op.in]: recipientRoleIds.filter(Boolean),
                },
            },
            attributes: ['id', 'nom', 'prenom', 'mail'],
        });

        const content = transitionCode === AuditPlanTransitionCode.DEMANDER_VALIDATION
            ? `Le plan d audit ${plan.nom} a ete soumis pour validation`
            : `Le plan d audit ${plan.nom} est maintenant au statut ${LookupResolutionService.getStaticValue(AUDIT_LOOKUP_KEYS.PLAN_STATUS, targetStatusCode)?.label || targetStatusCode}`;

        const type = transitionCode === AuditPlanTransitionCode.DEMANDER_VALIDATION
            ? NotificationType.AUDIT_PLAN_VALIDATION_REQUESTED
            : NotificationType.AUDIT_PLAN_STATUS_CHANGED;

        for (const recipient of recipients) {
            if (recipient.id === actorUserId) {
                continue;
            }

            await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                userId: recipient.id,
                type,
                content,
            }));
            await emailService.sendAuditPlanWorkflowEmail(
                { mail: recipient.mail, nom: recipient.nom, prenom: recipient.prenom, userId: recipient.id },
                { nom: plan.nom, transitionCode, planId: plan.id }
            );
        }
    }

    static async applyTransition(planId: number, actorUserId: number, actorRole: string, transitionCode: string, comment?: string | null) {
        const plan = await this.getPlanById(planId);
        const currentStatusCode = this.getPlanStatusCode(plan);
        const availableTransitions = this.getAvailableTransitions(currentStatusCode, actorRole);
        if (!availableTransitions.includes(transitionCode)) {
            throw new Error('Transition non autorisee pour ce role ou ce statut');
        }

        if (currentStatusCode === AuditPlanStatusCode.FERME_DEFINITIVEMENT) {
            throw new Error('Le plan est ferme definitivement');
        }

        const { targetStatusCode, patch } = this.resolveTransition(currentStatusCode, transitionCode, comment);
        const targetStatusId = await LookupResolutionService.requireLookupId(AUDIT_LOOKUP_KEYS.PLAN_STATUS, targetStatusCode);

        const updatePayload: Record<string, unknown> = {
            ...patch,
            statusId: targetStatusId,
        };

        if (transitionCode === AuditPlanTransitionCode.DEFINIR_MODELE) {
            delete updatePayload.statusId;
        }

        await plan.update(updatePayload);
        await this.createWorkflowEvent(planId, actorUserId, transitionCode, plan.statusId, targetStatusId, comment);
        await this.notifyPlanTransition(plan, actorUserId, transitionCode, targetStatusCode);

        return this.getPlanDetail(planId, actorRole);
    }

    private static async computeMissionProgress(mission: AuditMission) {
        const checklistItems = await AuditMissionChecklistItem.findAll({ where: { missionId: mission.id } });
        const linkedRecommendations = await AuditMission.findAll({
            where: {
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                sourceMissionId: mission.id,
            },
            attributes: ['id', 'statutId'],
        });

        const statusCode = (mission as any).statutCode || mission.statut;
        if (statusCode === AuditMissionStatus.OK || mission.dateReelleFin) {
            return 100;
        }

        const components: number[] = [];
        components.push(statusCode === AuditMissionStatus.EN_COURS ? 40 : 0);

        if (mission.dateReelleDebut) {
            components.push(25);
        }

        if (checklistItems.length > 0) {
            const doneCount = checklistItems.filter((item) => item.estFait).length;
            components.push(Math.round((doneCount / checklistItems.length) * 100));
        }

        if (linkedRecommendations.length > 0) {
            const okStatusId = LookupResolutionService.getStaticValue('auditMission.statut', AuditMissionStatus.OK)?.id;
            const completedCount = linkedRecommendations.filter((item) => item.statutId === okStatusId).length;
            components.push(Math.round((completedCount / linkedRecommendations.length) * 100));
        }

        if (components.length === 0) {
            return 0;
        }

        return Math.max(0, Math.min(100, Math.round(components.reduce((sum, value) => sum + value, 0) / components.length)));
    }

    private static async hydrateMission(mission: AuditMission) {
        const progressPercent = await this.computeMissionProgress(mission);
        if (mission.progressPercent !== progressPercent) {
            await mission.update({ progressPercent });
        }

        const resourceAssignments = await AuditMissionResource.findAll({
            where: { missionId: mission.id },
            include: [
                { model: User, as: 'user', attributes: ['id', 'nom', 'prenom', 'mail', 'poste'], required: false },
            ],
            order: [['createdAt', 'ASC']],
        });

        const requiredSkills = await AuditMissionRequiredSkill.findAll({
            where: { missionId: mission.id },
            include: [{ model: AuditSkill, as: 'skill', required: false }],
            order: [['createdAt', 'ASC']],
        });

        return {
            ...mission.toJSON(),
            progressPercent,
            missionOrderStatus: mission.missionOrderSentAt ? 'sent' : 'pending',
            missionOrderStatusLabel: this.getWorkflowStatusLabel('mission_order', mission.missionOrderSentAt ? 'sent' : 'pending'),
            workProgramStatus: mission.workProgramStatus || 'draft',
            workProgramStatusLabel: this.getWorkflowStatusLabel('work_program', mission.workProgramStatus || 'draft'),
            reportStatus: mission.reportStatus || 'draft',
            reportStatusLabel: this.getWorkflowStatusLabel('report', mission.reportStatus || 'draft'),
            resourceAssignments: resourceAssignments.map((item) => item.toJSON()),
            requiredSkills: requiredSkills.map((item) => item.toJSON()),
        };
    }

    static async getPlanMissions(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        const visibleMissionIds = actorUserId !== undefined && this.isMissionScopedRole(actorRole)
            ? await this.getVisibleMissionIds(planId, actorRole, actorUserId)
            : [];
        const scopedWhere = actorUserId !== undefined && this.isMissionScopedRole(actorRole)
            ? (visibleMissionIds.length > 0 ? { id: { [Op.in]: visibleMissionIds } } : { id: -1 })
            : {};
        const missions = await AuditMission.findAll({
            where: {
                auditPlanId: planId,
                type: AuditRecordType.MISSION_AUDIT,
                ...scopedWhere,
            },
            include: [
                { model: User, as: 'auditSenior', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'chefMission', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
            ],
            order: [['ordre', 'ASC'], ['datePrevueDebut', 'ASC'], ['createdAt', 'ASC']],
        });

        const enriched = [];
        for (const mission of missions) {
            enriched.push(await this.hydrateMission(mission));
        }

        return enriched;
    }

    static async listMissions(role: string, userId: number, filter: { type?: string | null } = {}) {
        if (!isRoleAllowed(role, PLAN_READ_ROLES) && !this.isRiskMissionReaderRole(role)) {
            throw new Error('Acces non autorise');
        }

        const requestedType = filter.type || AuditRecordType.MISSION_AUDIT;

        const where: Record<string, unknown> = {
            auditPlanId: { [Op.ne]: null },
            type: requestedType,
        };

        if (role === UserRole.CHEF_MISSION) {
            where.chefMissionId = userId;
        } else if (role === UserRole.AUDITEUR) {
            where.auditeurId = userId;
        } else if (this.isRiskMissionReaderRole(role)) {
            const riskWhere = role === UserRole.RISK_MANAGER
                ? { riskManagerId: userId }
                : { riskAgentId: userId };
            const risks = await Risk.findAll({
                where: riskWhere,
                attributes: ['id'],
            });
            const riskIds = risks.map((risk) => risk.id);
            where.riskId = riskIds.length > 0 ? { [Op.in]: riskIds } : -1;
        } else if (role === UserRole.CONTROLLER) {
            const planMissions = await AuditMission.findAll({
                where: {
                    auditPlanId: { [Op.ne]: null },
                    type: AuditRecordType.MISSION_AUDIT,
                },
                attributes: ['id', 'auditedPrincipalId'],
            });
            const missionIds = planMissions.map((mission) => mission.id);
            const visibleMissionIds = new Set<number>(
                planMissions
                    .filter((mission) => mission.auditedPrincipalId === userId)
                    .map((mission) => mission.id)
            );

            if (missionIds.length > 0) {
                const resourceAssignments = await AuditMissionResource.findAll({
                    where: {
                        missionId: { [Op.in]: missionIds },
                        userId,
                    },
                    attributes: ['missionId'],
                });

                for (const assignment of resourceAssignments) {
                    visibleMissionIds.add(assignment.missionId);
                }
            }

            if (requestedType === AuditRecordType.PLAN_ACTION_AUDIT) {
                delete where.auditPlanId;
                (where as any)[Op.or] = [
                    { auditedPrincipalId: userId },
                    ...(visibleMissionIds.size > 0 ? [{ sourceMissionId: { [Op.in]: Array.from(visibleMissionIds) } }] : []),
                ];
            } else {
                where.id = visibleMissionIds.size > 0 ? { [Op.in]: Array.from(visibleMissionIds) } : -1;
            }
        }

        const missions = await AuditMission.findAll({
            where,
            include: [
                { model: User, as: 'auditSenior', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'chefMission', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { association: 'auditPlan', required: false } as any,
            ],
            order: [['datePrevueFin', 'ASC'], ['updatedAt', 'DESC']],
        });

        const enriched = [];
        for (const mission of missions) {
            enriched.push(await this.hydrateMission(mission));
        }

        return enriched;
    }

    static async createPlanMission(planId: number, actorId: number, data: any) {
        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const mission = await AuditingService.createRecord(actorId, {
            ...data,
            type: AuditRecordType.MISSION_AUDIT,
            auditPlanId: planId,
        });

        return this.hydrateMission(mission);
    }

    static async createPlanMissionsFromSuggestions(planId: number, actorId: number, actorRole: string, missionsData: any[]) {
        this.ensurePlanWritable(actorRole);
        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const eligibleStatuses = [
            AuditPlanStatusCode.CREE,
            AuditPlanStatusCode.A_VALIDER,
            AuditPlanStatusCode.VALIDE_DIRECTION,
            AuditPlanStatusCode.VALIDE_CONSEIL,
            AuditPlanStatusCode.VALIDE_COMITE,
        ] as string[];

        if (!eligibleStatuses.includes(this.getPlanStatusCode(plan))) {
            throw new Error('Les suggestions IA peuvent etre ajoutees uniquement a un plan en creation, a valider ou deja valide');
        }

        if (!Array.isArray(missionsData) || missionsData.length === 0) {
            throw new Error('Aucune mission selectionnee');
        }

        const created: any[] = [];

        for (const data of missionsData) {
            const mission = await AuditingService.createRecord(actorId, {
                ...data,
                type: AuditRecordType.MISSION_AUDIT,
                auditPlanId: planId,
                titre: data.titre || data.regleDnssi || data.code,
                objectifs: data.objectifs || data.recommandations || data.titre || data.regleDnssi,
                responsabilites: data.responsabilites || data.responsableNom || 'A definir',
                category: data.category || data.categoryCode || data.categorie || null,
                quarter: data.quarter || data.quarterCode || data.trimestre || null,
                datePrevueDebut: data.datePrevueDebut || null,
                datePrevueFin: data.datePrevueFin || data.delai || null,
                axe: data.axe || null,
                evaluation: data.evaluation || null,
                delai: data.datePrevueFin || data.delai || new Date(Date.now() + (Number(data.delaiSuggestion) || 30) * 24 * 60 * 60 * 1000),
            });

            created.push(await this.hydrateMission(mission));
        }

        return created;
    }

    static async updatePlanMission(planId: number, missionId: number, actorRole: string, data: any) {
        this.ensurePlanWritable(actorRole);

        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const mission = await this.getMissionById(missionId);
        if (mission.auditPlanId !== planId) {
            throw new Error('La mission n appartient pas a ce plan');
        }

        const updated = await AuditingService.updateMission(missionId, {
            ...data,
            type: AuditRecordType.MISSION_AUDIT,
            auditPlanId: planId,
        });
        if (!updated) {
            throw new Error('Mission mise a jour introuvable');
        }

        return this.hydrateMission(updated);
    }

    static async getDeletedPlanMissions(planId: number) {
        const missions = await AuditMission.scope('withDeleted').findAll({
            where: {
                auditPlanId: planId,
                type: AuditRecordType.MISSION_AUDIT,
                is_deleted: true,
            },
            include: [
                { model: User, as: 'auditSenior', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'chefMission', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
            ],
            order: [['deleted_at', 'DESC'], ['updatedAt', 'DESC']],
        });

        return Promise.all(missions.map((mission) => this.hydrateMission(mission)));
    }

    static async deletePlanMission(planId: number, missionId: number, actorRole: string) {
        this.ensurePlanWritable(actorRole);
        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const mission = await this.getMissionById(missionId);
        if (mission.auditPlanId !== planId) {
            throw new Error('La mission n appartient pas a ce plan');
        }

        return AuditingService.deleteMission(missionId);
    }

    static async restorePlanMission(planId: number, missionId: number, actorRole: string) {
        this.ensurePlanWritable(actorRole);
        const plan = await this.getPlanById(planId);
        this.ensurePlanEditable(plan);

        const mission = await AuditMission.scope('withDeleted').findByPk(missionId);
        if (!mission || mission.auditPlanId !== planId || mission.type !== AuditRecordType.MISSION_AUDIT) {
            throw new Error('Mission archivee introuvable pour ce plan');
        }

        const restored = await AuditingService.restoreMission(missionId);
        if (!restored) {
            throw new Error('Mission restauree introuvable');
        }

        return this.hydrateMission(restored);
    }

    static async getPlanRecommendations(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        let visibleMissionIds: number[] = [];

        if (actorUserId !== undefined && actorRole === UserRole.CONTROLLER) {
            const planMissions = await AuditMission.findAll({
                where: {
                    auditPlanId: planId,
                    type: AuditRecordType.MISSION_AUDIT,
                },
                attributes: ['id', 'auditedPrincipalId'],
            });
            const sourceMissionIds = planMissions.map((mission) => mission.id);
            const directlyVisibleMissionIds = new Set<number>(
                planMissions
                    .filter((mission) => mission.auditedPrincipalId === actorUserId)
                    .map((mission) => mission.id)
            );

            if (sourceMissionIds.length > 0) {
                const resourceAssignments = await AuditMissionResource.findAll({
                    where: {
                        missionId: { [Op.in]: sourceMissionIds },
                        userId: actorUserId,
                    },
                    attributes: ['missionId'],
                });

                for (const assignment of resourceAssignments) {
                    directlyVisibleMissionIds.add(assignment.missionId);
                }
            }

            return AuditMission.findAll({
                where: {
                    type: AuditRecordType.PLAN_ACTION_AUDIT,
                    [Op.or]: [
                        {
                            auditedPrincipalId: actorUserId,
                            [Op.or]: [
                                { auditPlanId: planId },
                                ...(sourceMissionIds.length > 0 ? [{ sourceMissionId: { [Op.in]: sourceMissionIds } }] : []),
                            ],
                        },
                        ...(directlyVisibleMissionIds.size > 0 ? [{ sourceMissionId: { [Op.in]: Array.from(directlyVisibleMissionIds) } }] : []),
                    ],
                },
                include: [
                    { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                    { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                    { model: AuditMission, as: 'sourceMission', attributes: ['id', 'titre', 'code'], required: false },
                ],
                order: [['ordre', 'ASC'], ['updatedAt', 'DESC']],
            });
        }

        if (actorUserId !== undefined && this.isMissionScopedRole(actorRole)) {
            visibleMissionIds = await this.getVisibleMissionIds(planId, actorRole, actorUserId);
            if (visibleMissionIds.length === 0) {
                return [];
            }
        } else {
            const planMissions = await AuditMission.findAll({
                where: {
                    auditPlanId: planId,
                    type: AuditRecordType.MISSION_AUDIT,
                },
                attributes: ['id'],
            });
            visibleMissionIds = planMissions.map((mission) => mission.id);
        }

        const planScope = visibleMissionIds.length > 0
            ? {
                [Op.or]: [
                    { auditPlanId: planId },
                    { sourceMissionId: { [Op.in]: visibleMissionIds } },
                ],
            }
            : { auditPlanId: planId };

        return AuditMission.findAll({
            where: {
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                ...planScope,
            },
            include: [
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom', 'mail'], required: false },
                { model: AuditMission, as: 'sourceMission', attributes: ['id', 'titre', 'code'], required: false },
            ],
            order: [['ordre', 'ASC'], ['updatedAt', 'DESC']],
        });
    }

    static async getWorkflowHistory(planId: number) {
        const events = await AuditPlanWorkflowEvent.findAll({
            where: { planId },
            include: [{ model: User, as: 'actor', attributes: ['id', 'prenom', 'nom', 'mail'], required: false }],
            order: [['createdAt', 'ASC']],
        });

        return events.map((event) => {
            const payload = event.toJSON() as any;
            return {
                ...payload,
                fromStatusCode: LookupResolutionService.getStaticValue(AUDIT_LOOKUP_KEYS.PLAN_STATUS, event.fromStatusId)?.code || null,
                fromStatusLabel: LookupResolutionService.getStaticValue(AUDIT_LOOKUP_KEYS.PLAN_STATUS, event.fromStatusId)?.label || null,
                toStatusCode: LookupResolutionService.getStaticValue(AUDIT_LOOKUP_KEYS.PLAN_STATUS, event.toStatusId)?.code || null,
                toStatusLabel: LookupResolutionService.getStaticValue(AUDIT_LOOKUP_KEYS.PLAN_STATUS, event.toStatusId)?.label || null,
            };
        });
    }

    private static formatEmailLog(log: AuditEmailLog) {
        const payload = log.toJSON() as any;
        const deliveryStatus = String(log.deliveryStatus || '').trim().toLowerCase();
        const deliveryStatusLabel = deliveryStatus === 'sent'
            ? 'Envoye'
            : deliveryStatus === 'failed'
                ? 'Echec'
                : 'Ignore';

        return {
            ...payload,
            scopeLabel: log.scope === 'mission' ? 'Mission' : 'Plan',
            deliveryStatusLabel,
            recipientLabel: log.recipientName
                ? `${log.recipientName} <${log.recipientEmail}>`
                : log.recipientEmail,
        };
    }

    static async getPlanEmailHistory(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        this.ensurePlanReadable(actorRole);

        const where: Record<string, unknown> = { planId };

        if (actorUserId !== undefined && this.isMissionScopedRole(actorRole)) {
            const visibleMissionIds = await this.getVisibleMissionIds(planId, actorRole, actorUserId);
            if (visibleMissionIds.length === 0) {
                return [];
            }

            where.missionId = { [Op.in]: visibleMissionIds };
        }

        const logs = await AuditEmailLog.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });

        return logs.map((log) => this.formatEmailLog(log));
    }

    static async getPlanGantt(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        const missions = await this.getPlanMissions(planId, actorRole, actorUserId);
        return missions.map((mission: any) => ({
            id: mission.id,
            code: mission.code,
            titre: mission.titre,
            quarterCode: mission.quarterCode || null,
            quarterLabel: mission.quarter || null,
            statusCode: mission.statutCode || mission.statut,
            statusLabel: mission.statutLabel || mission.statut,
            datePrevueDebut: mission.datePrevueDebut,
            datePrevueFin: mission.datePrevueFin,
            dateReelleDebut: mission.dateReelleDebut,
            dateReelleFin: mission.dateReelleFin,
            progressPercent: mission.progressPercent || 0,
        }));
    }

    static async getWorkProgramTemplates() {
        return AuditingService.getChecklistTemplates();
    }

    private static async getMissionWorkflowHistory(missionId: number) {
        const events = await AuditMissionWorkflowEvent.findAll({
            where: { missionId },
            include: [{ model: User, as: 'actor', attributes: ['id', 'prenom', 'nom', 'mail'], required: false }],
            order: [['createdAt', 'ASC']],
        });

        return events.map((event) => ({
            ...event.toJSON(),
            workflowTypeLabel: event.workflowType === 'mission_order'
                ? 'Ordre de mission'
                : event.workflowType === 'work_program'
                    ? 'Programme de travail'
                    : event.workflowType === 'recommendation'
                        ? 'Recommandation'
                        : 'Rapport',
            fromStatusLabel: this.getWorkflowStatusLabel(event.workflowType as MissionWorkflowType, event.fromStatus),
            toStatusLabel: this.getWorkflowStatusLabel(event.workflowType as MissionWorkflowType, event.toStatus),
        }));
    }

    private static async getMissionEmailHistory(missionId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);

        const logs = await AuditEmailLog.findAll({
            where: { missionId },
            order: [['createdAt', 'DESC']],
        });

        return logs.map((log) => this.formatEmailLog(log));
    }

    static async sendMissionOrder(missionId: number, actorUserId: number, actorRole: string, data: any = {}) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, MISSION_ORDER_MANAGER_ROLES);
        await this.syncMissionAssigneeFieldsFromResources(mission);

        if (!mission.chefMissionId || !mission.auditeurId) {
            throw new Error('Affectez d abord un chef de mission et un auditeur avant l envoi de l ordre de mission');
        }

        const previousStatus = mission.missionOrderSentAt ? 'sent' : 'pending';
        await mission.update({
            missionOrderReference: String(data.reference || data.missionOrderReference || '').trim() || mission.missionOrderReference || `OM-${mission.id}`,
            missionOrderSentAt: new Date(),
            missionOrderSentById: actorUserId,
        });

        await this.createMissionWorkflowEvent(
            mission.id,
            actorUserId,
            'mission_order',
            previousStatus === 'sent' ? 'resend' : 'send',
            previousStatus,
            'sent',
            typeof data.comment === 'string' ? data.comment : null
        );

        await this.notifyMissionWorkflowParticipants(
            mission,
            actorUserId,
            NotificationType.AUDIT_PLAN_STATUS_CHANGED,
            `Ordre de mission envoye pour la mission : ${mission.titre}`,
            [mission.chefMissionId, mission.auditeurId, mission.auditSeniorId]
        );
        await this.sendMissionWorkflowEmails(
            mission,
            actorUserId,
            [mission.chefMissionId, mission.auditeurId, mission.auditSeniorId],
            {
                transitionCode: 'mission_order_sent',
                comment: typeof data.comment === 'string' ? data.comment : null,
                reference: String(data.reference || data.missionOrderReference || '').trim() || mission.missionOrderReference || `OM-${mission.id}`,
            }
        );

        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async saveMissionWorkProgram(missionId: number, actorUserId: number, actorRole: string, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_EDITOR_ROLES);

        if (!EDITABLE_WORKFLOW_STATUSES.includes(String(mission.workProgramStatus || 'draft'))) {
            throw new Error('Le programme de travail doit etre en brouillon ou retourne pour modification');
        }

        const rawItems = Array.isArray(data.items) ? data.items : [];
        const items = rawItems
            .map((item: any) => ({
                id: Number(item.id) || null,
                texte: String(item.texte || '').trim(),
                estFait: Boolean(item.estFait),
            }))
            .filter((item: any) => item.texte);

        const existingItems = await AuditMissionChecklistItem.scope('withDeleted').findAll({
            where: { missionId },
            order: [['createdAt', 'ASC']],
        });
        const keepIds = new Set<number>();

        for (const item of items) {
            const existing = item.id
                ? existingItems.find((current) => current.id === item.id)
                : null;

            if (existing) {
                keepIds.add(existing.id);
                if (existing.is_deleted) {
                    await restoreSoftDeletedInstance(existing);
                }
                await existing.update({
                    texte: item.texte,
                    estFait: item.estFait,
                });
            } else {
                const created = await AuditMissionChecklistItem.create({
                    missionId,
                    texte: item.texte,
                    estFait: item.estFait,
                });
                keepIds.add(created.id);
            }
        }

        for (const existing of existingItems) {
            if (!existing.is_deleted && !keepIds.has(existing.id)) {
                await softDeleteInstance(existing);
            }
        }

        const patch: Record<string, unknown> = {
            workProgramPreparedById: actorUserId,
        };

        if (data.checklistTemplateId !== undefined) {
            patch.checklistTemplateId = data.checklistTemplateId ? Number(data.checklistTemplateId) : null;
        }

        await mission.update(patch);
        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async toggleMissionWorkProgramItem(missionId: number, itemId: number, actorUserId: number, actorRole: string, estFait: boolean) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_EXECUTION_ROLES);

        if (!['validated', 'approved'].includes(String(mission.workProgramStatus || 'draft')) && !EDITABLE_WORKFLOW_STATUSES.includes(String(mission.workProgramStatus || 'draft'))) {
            throw new Error('Le programme de travail n est pas pret pour l execution');
        }

        await AuditingService.toggleMissionChecklistItem(missionId, itemId, estFait);
        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async applyWorkProgramTransition(missionId: number, actorUserId: number, actorRole: string, data: any) {
        const mission = await this.getMissionById(missionId);
        const transition = String(data.transition || '').trim();
        const currentStatus = String(mission.workProgramStatus || 'draft');
        const checklistItems = await AuditingService.getMissionChecklistItems(missionId);

        if (transition === 'submit') {
            this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_EDITOR_ROLES);
            if (!['draft', 'rework_requested'].includes(currentStatus)) {
                throw new Error('Le programme de travail ne peut pas etre soumis dans ce statut');
            }
            if (checklistItems.length === 0) {
                throw new Error('Ajoutez au moins un point de checklist avant la soumission');
            }

            await mission.update({
                workProgramStatus: 'submitted',
                workProgramSubmittedAt: new Date(),
                workProgramPreparedById: actorUserId,
                workProgramLastComment: String(data.comment || '').trim() || null,
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'work_program', 'submit', currentStatus, 'submitted', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Programme de travail soumis pour validation : ${mission.titre}`,
                [mission.auditSeniorId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.auditSeniorId], {
                transitionCode: 'work_program_submitted',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else if (transition === 'validate') {
            this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_VALIDATOR_ROLES);
            if (currentStatus !== 'submitted') {
                throw new Error('Le programme de travail doit etre soumis avant validation');
            }

            await mission.update({
                workProgramStatus: 'validated',
                workProgramValidatedAt: new Date(),
                workProgramValidatedById: actorUserId,
                workProgramLastComment: String(data.comment || '').trim() || null,
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'work_program', 'validate', currentStatus, 'validated', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Programme de travail valide et en attente d approbation : ${mission.titre}`,
                [mission.chefMissionId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.chefMissionId], {
                transitionCode: 'work_program_validated',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else if (transition === 'approve') {
            this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_APPROVER_ROLES);
            if (currentStatus !== 'validated') {
                throw new Error('Le programme de travail doit etre valide avant approbation');
            }

            await mission.update({
                workProgramStatus: 'approved',
                workProgramApprovedAt: new Date(),
                workProgramApprovedById: actorUserId,
                workProgramLastComment: String(data.comment || '').trim() || null,
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'work_program', 'approve', currentStatus, 'approved', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Programme de travail approuve pour la mission : ${mission.titre}`,
                [mission.chefMissionId, mission.auditeurId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.chefMissionId, mission.auditeurId], {
                transitionCode: 'work_program_approved',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else if (transition === 'request_rework') {
            if (isRoleAllowed(actorRole, WORK_PROGRAM_VALIDATOR_ROLES)) {
                this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_VALIDATOR_ROLES);
            } else {
                this.ensureMissionRole(mission, actorRole, actorUserId, WORK_PROGRAM_APPROVER_ROLES);
            }

            if (!['submitted', 'validated', 'approved'].includes(currentStatus)) {
                throw new Error('Le retour pour rework n est pas possible dans ce statut');
            }

            if (!String(data.comment || '').trim()) {
                throw new Error('Un commentaire est obligatoire pour retourner le programme de travail');
            }

            await mission.update({
                workProgramStatus: 'rework_requested',
                workProgramLastComment: String(data.comment || '').trim(),
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'work_program', 'request_rework', currentStatus, 'rework_requested', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Programme de travail retourne pour correction : ${mission.titre}`,
                [mission.chefMissionId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.chefMissionId], {
                transitionCode: 'work_program_rework_requested',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else {
            throw new Error('Transition du programme de travail inconnue');
        }

        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async saveMissionReport(missionId: number, actorUserId: number, actorRole: string, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_EDITOR_ROLES);

        if (!EDITABLE_WORKFLOW_STATUSES.includes(String(mission.reportStatus || 'draft'))) {
            throw new Error('Le rapport doit etre en brouillon ou retourne pour modification');
        }

        await mission.update({
            rapport: String(data.rapport || '').trim() || null,
            recommandations: String(data.recommandations || '').trim() || null,
            reportPreparedById: actorUserId,
        });

        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async applyReportTransition(missionId: number, actorUserId: number, actorRole: string, data: any) {
        const mission = await this.getMissionById(missionId);
        const transition = String(data.transition || '').trim();
        const currentStatus = String(mission.reportStatus || 'draft');

        if (transition === 'submit') {
            this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_SUBMITTER_ROLES);
            if (!['draft', 'rework_requested'].includes(currentStatus)) {
                throw new Error('Le rapport ne peut pas etre soumis dans ce statut');
            }
            if (!String(mission.rapport || '').trim()) {
                throw new Error('Le rapport doit etre renseigne avant soumission');
            }

            await mission.update({
                reportStatus: 'submitted',
                reportSubmittedAt: new Date(),
                reportPreparedById: actorUserId,
                reportLastComment: String(data.comment || '').trim() || null,
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'report', 'submit', currentStatus, 'submitted', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_REPORT_SUBMITTED,
                `Rapport d audit soumis pour la mission : ${mission.titre}`,
                [mission.auditSeniorId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.auditSeniorId], {
                transitionCode: 'report_submitted',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else if (transition === 'validate') {
            this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_VALIDATOR_ROLES);
            if (currentStatus !== 'submitted') {
                throw new Error('Le rapport doit etre soumis avant validation');
            }

            await mission.update({
                reportStatus: 'validated',
                reportValidatedAt: new Date(),
                reportValidatedById: actorUserId,
                reportLastComment: String(data.comment || '').trim() || null,
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'report', 'validate', currentStatus, 'validated', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Rapport valide et en attente d approbation : ${mission.titre}`,
                [mission.auditSeniorId, mission.chefMissionId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.auditSeniorId, mission.chefMissionId], {
                transitionCode: 'report_validated',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else if (transition === 'approve') {
            this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_APPROVER_ROLES);
            if (currentStatus !== 'validated') {
                throw new Error('Le rapport doit etre valide avant approbation');
            }

            await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
                reportStatus: 'approved',
                reportApprovedAt: new Date(),
                reportApprovedById: actorUserId,
                reportLastComment: String(data.comment || '').trim() || null,
                statut: AuditMissionStatus.OK,
                dateReelleFin: mission.dateReelleFin || new Date(),
            }) as any);
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'report', 'approve', currentStatus, 'approved', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Rapport d audit approuve et mission cloturee : ${mission.titre}`,
                [mission.chefMissionId, mission.auditeurId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.chefMissionId, mission.auditeurId], {
                transitionCode: 'report_approved',
                comment: typeof data.comment === 'string' ? data.comment : null,
                dueDate: mission.delai ? new Date(mission.delai).toLocaleDateString('fr-FR') : null,
            });
        } else if (transition === 'request_rework') {
            if (isRoleAllowed(actorRole, REPORT_VALIDATOR_ROLES)) {
                this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_VALIDATOR_ROLES);
            } else {
                this.ensureMissionRole(mission, actorRole, actorUserId, REPORT_APPROVER_ROLES);
            }

            if (!['submitted', 'validated', 'approved'].includes(currentStatus)) {
                throw new Error('Le retour pour rework n est pas possible dans ce statut');
            }

            if (!String(data.comment || '').trim()) {
                throw new Error('Un commentaire est obligatoire pour retourner le rapport');
            }

            await mission.update({
                reportStatus: 'rework_requested',
                reportLastComment: String(data.comment || '').trim(),
            });
            await this.createMissionWorkflowEvent(missionId, actorUserId, 'report', 'request_rework', currentStatus, 'rework_requested', data.comment);
            await this.notifyMissionWorkflowParticipants(
                mission,
                actorUserId,
                NotificationType.AUDIT_PLAN_STATUS_CHANGED,
                `Rapport retourne pour correction : ${mission.titre}`,
                [mission.chefMissionId, mission.auditeurId]
            );
            await this.sendMissionWorkflowEmails(mission, actorUserId, [mission.chefMissionId, mission.auditeurId], {
                transitionCode: 'report_rework_requested',
                comment: typeof data.comment === 'string' ? data.comment : null,
            });
        } else {
            throw new Error('Transition du rapport inconnue');
        }

        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async getMissionWorkspace(missionId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);

        const hydratedMission = await this.hydrateMission(mission);
        const checklistItems = await AuditingService.getMissionChecklistItems(missionId);
        const actionPlanItems = await AuditingService.getMissionActionPlanItems(missionId);
        const workflowHistory = await this.getMissionWorkflowHistory(missionId);
        const emailHistory = await this.getMissionEmailHistory(missionId, actorRole, actorUserId);
        const permissions = this.buildMissionPermissions(mission, actorRole, actorUserId);
        const checklistDoneCount = checklistItems.filter((item: any) => item.estFait).length;

        return {
            mission: hydratedMission,
            permissions,
            missionOrder: {
                status: mission.missionOrderSentAt ? 'sent' : 'pending',
                statusLabel: this.getWorkflowStatusLabel('mission_order', mission.missionOrderSentAt ? 'sent' : 'pending'),
                reference: mission.missionOrderReference || null,
                sentAt: mission.missionOrderSentAt,
                sentBy: (mission as any).missionOrderSender || null,
            },
            workProgram: {
                status: mission.workProgramStatus || 'draft',
                statusLabel: this.getWorkflowStatusLabel('work_program', mission.workProgramStatus || 'draft'),
                lastComment: mission.workProgramLastComment || null,
                submittedAt: mission.workProgramSubmittedAt,
                validatedAt: mission.workProgramValidatedAt,
                approvedAt: mission.workProgramApprovedAt,
                preparedBy: (mission as any).workProgramPreparedBy || null,
                validatedBy: (mission as any).workProgramValidatedBy || null,
                approvedBy: (mission as any).workProgramApprovedBy || null,
                checklistTemplateId: mission.checklistTemplateId || null,
                completionPercent: checklistItems.length > 0 ? Math.round((checklistDoneCount / checklistItems.length) * 100) : 0,
                items: checklistItems.map((item) => item.toJSON()),
            },
            report: {
                status: mission.reportStatus || 'draft',
                statusLabel: this.getWorkflowStatusLabel('report', mission.reportStatus || 'draft'),
                lastComment: mission.reportLastComment || null,
                submittedAt: mission.reportSubmittedAt,
                validatedAt: mission.reportValidatedAt,
                approvedAt: mission.reportApprovedAt,
                preparedBy: (mission as any).reportPreparedBy || null,
                validatedBy: (mission as any).reportValidatedBy || null,
                approvedBy: (mission as any).reportApprovedBy || null,
                rapport: mission.rapport || '',
                recommandations: mission.recommandations || '',
            },
            actionPlans: this.enrichRecommendationItems(mission, actionPlanItems, actorRole, actorUserId),
            workflowHistory,
            emailHistory,
        };
    }

    static async getMissionEvidence(missionId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);
        return AuditingService.getMissionEvidence(missionId);
    }

    static async addMissionEvidence(missionId: number, actorRole: string, actorUserId: number, filename: string, filePath: string) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, EVIDENCE_UPLOAD_ROLES);
        return AuditingService.addMissionEvidence(missionId, filename, filePath, actorUserId);
    }

    static async deleteMissionEvidence(missionId: number, evidenceId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, EVIDENCE_DELETE_ROLES);

        const evidence = await AuditEvidence.findByPk(evidenceId);
        if (!evidence || evidence.missionId !== missionId) {
            throw new Error('Preuve introuvable pour cette mission');
        }

        return AuditingService.deleteMissionEvidence(evidenceId);
    }

    private static isRecommendationAuditOwner(sourceMission: AuditMission, role: string, userId: number) {
        return role === UserRole.SUPER_ADMIN
            || (role === UserRole.CHEF_MISSION && sourceMission.chefMissionId === userId)
            || (role === UserRole.AUDITEUR && sourceMission.auditeurId === userId);
    }

    private static isRecommendationAuditedActor(recommendation: AuditMission, role: string, userId: number) {
        return role === UserRole.SUPER_ADMIN
            || (role === UserRole.CONTROLLER && (!recommendation.auditedPrincipalId || recommendation.auditedPrincipalId === userId));
    }

    private static getRecommendationAvailableTransitions(sourceMission: AuditMission, recommendation: AuditMission, role: string, userId: number): RecommendationTransitionCode[] {
        const status = String(recommendation.recommendationWorkflowStatus || 'cree');
        const isOwner = this.isRecommendationAuditOwner(sourceMission, role, userId);
        const isAudited = this.isRecommendationAuditedActor(recommendation, role, userId);
        const isManager = isRoleAllowed(role, RECOMMENDATION_AUDIT_MANAGER_ROLES);
        const transitions: RecommendationTransitionCode[] = [];

        if (['cree', 'recommandation_a_envoyer'].includes(status) && isOwner) {
            transitions.push('envoyer_recommandation');
        }

        if (['plan_actions_a_soumettre', 'plan_actions_a_revoir'].includes(status) && isAudited) {
            transitions.push('soumettre_plan_action');
        }

        if (status === 'plan_actions_a_revoir') {
            if (isOwner) {
                transitions.push('demander_revue_plan_action');
                transitions.push('demander_validation_plan_action');
            }
        }

        if (status === 'plan_actions_a_valider') {
            if (isManager) {
                transitions.push('demander_revue_validation_plan_action');
                transitions.push('valider_plan_action');
            }
        }

        if (status === 'plan_action_valide' && isOwner) {
            transitions.push('demander_mise_a_jour_avancement');
        }

        if (status === 'plan_actions_a_mettre_a_jour' && isAudited) {
            transitions.push('soumettre_taux_avancement');
        }

        if (['plan_actions_mis_a_jour', 'avancement_100_a_valider'].includes(status)) {
            if (isOwner) {
                transitions.push('demander_revue_taux_avancement');
                if (status === 'plan_actions_mis_a_jour' && Number(recommendation.progressPercent || 0) === 100) {
                    transitions.push('demander_validation_avancement_100');
                }
            }
            if (status === 'avancement_100_a_valider' && isManager && Number(recommendation.progressPercent || 0) === 100) {
                transitions.push('demander_revoir_100');
                transitions.push('valider_avancement_100');
            }
        }

        if (status === 'avancement_100_valide' && isOwner) {
            transitions.push('fermer_recommandation');
        }

        if (status === 'ferme' && isRoleAllowed(role, RECOMMENDATION_FINAL_CLOSER_ROLES)) {
            transitions.push('reouvrir', 'fermer_definitivement');
        }

        return transitions;
    }

    private static async getRecommendationRecord(missionId: number, itemId: number) {
        const item = await AuditMission.findOne({
            where: {
                id: itemId,
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                sourceMissionId: missionId,
            },
            include: [
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom'], required: false },
                { model: User, as: 'auditedPrincipal', attributes: ['id', 'prenom', 'nom'], required: false },
            ],
        });

        if (!item) {
            throw new Error('Recommandation introuvable');
        }

        return item;
    }

    private static async getAuditDivisionRecipientIds() {
        const roleId = LookupResolutionService.getStaticValue('user.role', UserRole.AUDIT_RESPONSABLE)?.id;
        if (!roleId) {
            return [];
        }

        const users = await User.findAll({
            where: { roleId },
            attributes: ['id'],
        });

        return users.map((user) => user.id);
    }

    private static async getRecommendationWorkflowRecipientIds(sourceMission: AuditMission, recommendation: AuditMission, transition: RecommendationTransitionCode) {
        const auditOwnerIds = [sourceMission.chefMissionId, sourceMission.auditeurId];
        const auditedId = recommendation.auditedPrincipalId || sourceMission.auditedPrincipalId;
        const divisionIds = await this.getAuditDivisionRecipientIds();

        switch (transition) {
            case 'envoyer_recommandation':
            case 'demander_revue_plan_action':
            case 'demander_mise_a_jour_avancement':
            case 'demander_revue_taux_avancement':
            case 'demander_revoir_100':
                return [auditedId];
            case 'soumettre_plan_action':
            case 'demander_revue_validation_plan_action':
            case 'valider_plan_action':
            case 'soumettre_taux_avancement':
            case 'valider_avancement_100':
            case 'reouvrir':
            case 'fermer_definitivement':
                return auditOwnerIds;
            case 'demander_validation_plan_action':
            case 'demander_validation_avancement_100':
            case 'fermer_recommandation':
                return divisionIds;
            default:
                return [];
        }
    }

    private static buildRecommendationNotificationContent(recommendation: AuditMission, transition: RecommendationTransitionCode, nextStatus: string) {
        const recommendationLabel = String(recommendation.regleDnssi || recommendation.recommandations || `#${recommendation.id}`).trim();
        const statusLabel = this.getWorkflowStatusLabel('recommendation', nextStatus);

        const transitionLabels: Record<RecommendationTransitionCode, string> = {
            envoyer_recommandation: 'a ete envoyee pour preparation du plan d action',
            soumettre_plan_action: 'a recu un plan d action a revoir',
            demander_validation_plan_action: 'est soumise pour validation du plan d action',
            demander_revue_plan_action: 'necessite une revue du plan d action',
            demander_revue_validation_plan_action: 'a ete retournee pour revue avant validation',
            valider_plan_action: 'a un plan d action valide',
            demander_mise_a_jour_avancement: 'necessite une mise a jour du taux d avancement',
            soumettre_taux_avancement: 'a recu une mise a jour du taux d avancement',
            demander_revue_taux_avancement: 'necessite une revue du taux d avancement',
            demander_validation_avancement_100: 'est soumise pour validation de l avancement 100%',
            demander_revoir_100: 'necessite une revue de l avancement 100%',
            valider_avancement_100: 'a un avancement 100% valide',
            fermer_recommandation: 'a ete fermee',
            reouvrir: 'a ete rouverte',
            fermer_definitivement: 'a ete fermee definitivement',
        };

        return `La recommandation ${recommendationLabel} ${transitionLabels[transition]}. Statut: ${statusLabel}`;
    }

    private static async notifyRecommendationWorkflow(sourceMission: AuditMission, recommendation: AuditMission, actorUserId: number, transition: RecommendationTransitionCode, nextStatus: string, comment?: string | null) {
        const recipientIds = await this.getRecommendationWorkflowRecipientIds(sourceMission, recommendation, transition);
        const notificationType = ['demander_validation_plan_action', 'demander_validation_avancement_100'].includes(transition)
            ? NotificationType.AUDIT_PLAN_VALIDATION_REQUESTED
            : NotificationType.AUDIT_PLAN_STATUS_CHANGED;
        const content = this.buildRecommendationNotificationContent(recommendation, transition, nextStatus);

        await this.notifyMissionWorkflowParticipants(
            sourceMission,
            actorUserId,
            notificationType,
            content,
            recipientIds
        );

        await this.sendMissionWorkflowEmails(
            sourceMission,
            actorUserId,
            recipientIds,
            {
                transitionCode: transition,
                comment: comment || null,
                reference: String(recommendation.regleDnssi || recommendation.recommandations || `#${recommendation.id}`).trim(),
            }
        );
    }

    private static enrichRecommendationItems(sourceMission: AuditMission, items: any[], role: string, userId: number) {
        return items.map((item) => {
            const status = String(item.workflowStatus || 'cree');
            const pseudoRecord = {
                ...item,
                recommendationWorkflowStatus: status,
                progressPercent: item.tauxAvancement ?? 0,
                auditedPrincipalId: item.coordinateurAuditeId ?? null,
            } as AuditMission;

            return {
                ...item,
                workflowStatus: status,
                workflowStatusLabel: this.getWorkflowStatusLabel('recommendation', status),
                availableTransitions: this.getRecommendationAvailableTransitions(sourceMission, pseudoRecord, role, userId),
            };
        });
    }

    private static buildRecommendationPatch(transition: RecommendationTransitionCode, recommendation: AuditMission, data: any, actorUserId: number) {
        const currentStatus = String(recommendation.recommendationWorkflowStatus || 'cree');
        const comment = String(data.comment || data.commentaireWorkflow || '').trim();
        const planAction = String(data.planAction || data.recommendationPlanAction || recommendation.recommendationPlanAction || '').trim();
        const tauxAvancement = data.tauxAvancement !== undefined || data.progressPercent !== undefined
            ? Number(data.tauxAvancement ?? data.progressPercent)
            : Number(recommendation.progressPercent || 0);
        const evaluationAvancement = String(data.evaluationAvancement || data.recommendationEvaluationAvancement || '').trim() || null;
        const now = new Date();

        const requireComment = () => {
            if (!comment) {
                throw new Error('Un commentaire est obligatoire pour demander une revue');
            }
        };

        if (transition === 'envoyer_recommandation') {
            if (!['cree', 'recommandation_a_envoyer'].includes(currentStatus)) {
                throw new Error('La recommandation ne peut pas etre envoyee dans ce statut');
            }
            if (!String(recommendation.recommandations || '').trim()) {
                throw new Error('La recommandation doit etre renseignee avant envoi');
            }
            return {
                status: 'plan_actions_a_soumettre',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_soumettre',
                    recommendationSentAt: now,
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'soumettre_plan_action') {
            if (!['plan_actions_a_soumettre', 'plan_actions_a_revoir'].includes(currentStatus)) {
                throw new Error('Le plan d action ne peut pas etre soumis dans ce statut');
            }
            if (!planAction) {
                throw new Error('Le plan d action est obligatoire avant soumission');
            }
            return {
                status: 'plan_actions_a_revoir',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_revoir',
                    recommendationPlanAction: planAction,
                    recommendationPlanSubmittedAt: now,
                    recommendationLastComment: comment || null,
                    auditedPrincipalId: recommendation.auditedPrincipalId || actorUserId,
                },
            };
        }

        if (transition === 'demander_revue_plan_action') {
            if (currentStatus !== 'plan_actions_a_revoir') {
                throw new Error('La demande de revue du plan d action est possible uniquement apres reception');
            }
            requireComment();
            return {
                status: 'plan_actions_a_soumettre',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_soumettre',
                    recommendationLastComment: comment,
                },
            };
        }

        if (transition === 'demander_validation_plan_action') {
            if (currentStatus !== 'plan_actions_a_revoir') {
                throw new Error('Le plan d action doit etre revu avant demande de validation');
            }
            return {
                status: 'plan_actions_a_valider',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_valider',
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'demander_revue_validation_plan_action') {
            if (currentStatus !== 'plan_actions_a_valider') {
                throw new Error('La revue par la division d audit est possible uniquement apres demande de validation');
            }
            requireComment();
            return {
                status: 'plan_actions_a_revoir',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_revoir',
                    recommendationLastComment: comment,
                },
            };
        }

        if (transition === 'valider_plan_action') {
            if (currentStatus !== 'plan_actions_a_valider') {
                throw new Error('Le plan d action doit etre soumis avant validation');
            }
            return {
                status: 'plan_action_valide',
                patch: {
                    recommendationWorkflowStatus: 'plan_action_valide',
                    recommendationPlanValidatedAt: now,
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'demander_mise_a_jour_avancement') {
            if (!['plan_action_valide', 'plan_actions_mis_a_jour'].includes(currentStatus)) {
                throw new Error('La mise a jour d avancement ne peut pas etre demandee dans ce statut');
            }
            return {
                status: 'plan_actions_a_mettre_a_jour',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_mettre_a_jour',
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'soumettre_taux_avancement') {
            if (currentStatus !== 'plan_actions_a_mettre_a_jour') {
                throw new Error('Le taux d avancement ne peut pas etre soumis dans ce statut');
            }
            if (!Number.isFinite(tauxAvancement) || tauxAvancement < 0 || tauxAvancement > 100) {
                throw new Error('Le taux d avancement doit etre compris entre 0 et 100');
            }
            if (!evaluationAvancement) {
                throw new Error('L evaluation d avancement est obligatoire');
            }
            if (!comment) {
                throw new Error('Un commentaire est obligatoire pour expliquer l avancement');
            }
            return {
                status: 'plan_actions_mis_a_jour',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_mis_a_jour',
                    recommendationEvaluationAvancement: evaluationAvancement,
                    recommendationProgressSubmittedAt: now,
                    recommendationLastComment: comment || null,
                    progressPercent: tauxAvancement,
                    statut: tauxAvancement === 100 ? AuditMissionStatus.OK : AuditMissionStatus.EN_COURS,
                    auditedPrincipalId: recommendation.auditedPrincipalId || actorUserId,
                },
            };
        }

        if (transition === 'demander_revue_taux_avancement') {
            if (!['plan_actions_mis_a_jour', 'avancement_100_a_valider'].includes(currentStatus)) {
                throw new Error('La revue du taux d avancement est possible uniquement apres mise a jour');
            }
            requireComment();
            return {
                status: 'plan_actions_a_mettre_a_jour',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_mettre_a_jour',
                    recommendationLastComment: comment,
                },
            };
        }

        if (transition === 'demander_validation_avancement_100') {
            if (currentStatus !== 'plan_actions_mis_a_jour') {
                throw new Error('La validation 100% peut etre demandee uniquement apres mise a jour');
            }
            if (Number(recommendation.progressPercent || 0) !== 100) {
                throw new Error('La demande de validation 100% exige un taux a 100%');
            }
            return {
                status: 'avancement_100_a_valider',
                patch: {
                    recommendationWorkflowStatus: 'avancement_100_a_valider',
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'demander_revoir_100') {
            if (currentStatus !== 'avancement_100_a_valider') {
                throw new Error('La revue du 100% est possible uniquement apres demande de validation');
            }
            requireComment();
            return {
                status: 'plan_actions_a_mettre_a_jour',
                patch: {
                    recommendationWorkflowStatus: 'plan_actions_a_mettre_a_jour',
                    recommendationLastComment: comment,
                },
            };
        }

        if (transition === 'valider_avancement_100') {
            if (currentStatus !== 'avancement_100_a_valider') {
                throw new Error('L avancement doit etre soumis avant validation');
            }
            if (Number(recommendation.progressPercent || 0) !== 100) {
                throw new Error('Seul un avancement a 100% peut etre valide');
            }
            return {
                status: 'avancement_100_valide',
                patch: {
                    recommendationWorkflowStatus: 'avancement_100_valide',
                    recommendationProgressValidatedAt: now,
                    recommendationLastComment: comment || null,
                    statut: AuditMissionStatus.OK,
                },
            };
        }

        if (transition === 'fermer_recommandation') {
            if (currentStatus !== 'avancement_100_valide') {
                throw new Error('La recommandation doit avoir un avancement 100% valide avant fermeture');
            }
            return {
                status: 'ferme',
                patch: {
                    recommendationWorkflowStatus: 'ferme',
                    recommendationClosedAt: now,
                    recommendationLastComment: comment || null,
                    statut: AuditMissionStatus.OK,
                },
            };
        }

        if (transition === 'reouvrir') {
            if (currentStatus !== 'ferme') {
                throw new Error('Seule une recommandation fermee peut etre rouverte');
            }
            return {
                status: 'plan_action_valide',
                patch: {
                    recommendationWorkflowStatus: 'plan_action_valide',
                    recommendationClosedAt: null,
                    recommendationLastComment: comment || null,
                },
            };
        }

        if (transition === 'fermer_definitivement') {
            if (currentStatus !== 'ferme') {
                throw new Error('Seule une recommandation fermee peut etre fermee definitivement');
            }
            return {
                status: 'ferme_definitivement',
                patch: {
                    recommendationWorkflowStatus: 'ferme_definitivement',
                    recommendationFinalClosedAt: now,
                    recommendationLastComment: comment || null,
                    statut: AuditMissionStatus.OK,
                },
            };
        }

        throw new Error('Transition de recommandation inconnue');
    }

    static async getMissionActionPlans(missionId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);
        const items = await AuditingService.getMissionActionPlanItems(missionId);
        return this.enrichRecommendationItems(mission, items, actorRole, actorUserId);
    }

    static async createMissionActionPlan(missionId: number, actorRole: string, actorUserId: number, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, ACTION_PLAN_CREATOR_ROLES);
        const item = await AuditingService.createMissionActionPlanItem(missionId, {
            ...data,
            recommendationWorkflowStatus: 'recommandation_a_envoyer',
        });
        return this.enrichRecommendationItems(mission, [item], actorRole, actorUserId)[0];
    }

    static async updateMissionActionPlan(missionId: number, itemId: number, actorRole: string, actorUserId: number, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, ACTION_PLAN_UPDATE_ROLES);
        const recommendation = await this.getRecommendationRecord(missionId, itemId);
        if (String(recommendation.recommendationWorkflowStatus || '') === 'ferme_definitivement') {
            throw new Error('Une recommandation fermee definitivement ne peut plus etre modifiee');
        }
        const item = await AuditingService.updateMissionActionPlanItem(missionId, itemId, data);
        return this.enrichRecommendationItems(mission, [item], actorRole, actorUserId)[0];
    }

    static async deleteMissionActionPlan(missionId: number, itemId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, ACTION_PLAN_DELETE_ROLES);
        return AuditingService.deleteMissionActionPlanItem(missionId, itemId);
    }

    static async applyRecommendationTransition(missionId: number, itemId: number, actorRole: string, actorUserId: number, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);

        const recommendation = await this.getRecommendationRecord(missionId, itemId);
        const transition = String(data.transition || '').trim() as RecommendationTransitionCode;
        const availableTransitions = this.getRecommendationAvailableTransitions(mission, recommendation, actorRole, actorUserId);
        if (!availableTransitions.includes(transition)) {
            throw new Error('Transition non autorisee pour votre profil ou le statut actuel');
        }

        const currentStatus = String(recommendation.recommendationWorkflowStatus || 'cree');
        const result = this.buildRecommendationPatch(transition, recommendation, data, actorUserId);
        await recommendation.update(await LookupResolutionService.resolveEntityPayload('auditMission', result.patch) as any);
        await this.createMissionWorkflowEvent(
            recommendation.id,
            actorUserId,
            'recommendation',
            transition,
            currentStatus,
            result.status,
            data.comment || data.commentaireWorkflow || null
        );
        await this.notifyRecommendationWorkflow(
            mission,
            recommendation,
            actorUserId,
            transition,
            result.status,
            data.comment || data.commentaireWorkflow || null
        );

        return this.getMissionWorkspace(missionId, actorRole, actorUserId);
    }

    static async getRecommendationWorkflowEvents(missionId: number, itemId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);
        await this.getRecommendationRecord(missionId, itemId);
        return this.getMissionWorkflowHistory(itemId);
    }

    static async getSkills() {
        return AuditSkill.findAll({ order: [['label', 'ASC']] });
    }

    static async createSkill(data: any) {
        const payload = {
            code: String(data.code || data.label || '').trim().toLowerCase().replace(/\s+/g, '_'),
            label: String(data.label || '').trim(),
            description: String(data.description || '').trim() || null,
        };

        if (!payload.code || !payload.label) {
            throw new Error('Le code et le label de la competence sont obligatoires');
        }

        return AuditSkill.create(payload);
    }

    static async updateSkill(skillId: number, data: any) {
        const skill = await AuditSkill.findByPk(skillId);
        if (!skill) {
            throw new Error('Competence introuvable');
        }

        await skill.update({
            code: data.code !== undefined ? String(data.code || '').trim().toLowerCase().replace(/\s+/g, '_') : skill.code,
            label: data.label !== undefined ? String(data.label || '').trim() : skill.label,
            description: data.description !== undefined ? String(data.description || '').trim() || null : skill.description,
        });

        return skill;
    }

    static async deleteSkill(skillId: number) {
        const skill = await AuditSkill.findByPk(skillId);
        if (!skill) {
            throw new Error('Competence introuvable');
        }

        await softDeleteInstance(skill);
        return { message: 'Competence supprimee avec succes' };
    }

    static async restoreSkill(skillId: number) {
        const skill = await AuditSkill.scope('withDeleted').findByPk(skillId);
        if (!skill || !skill.is_deleted) {
            throw new Error('Competence introuvable');
        }

        await restoreSoftDeletedInstance(skill);
        return skill;
    }

    static async getMissionResources(missionId: number, actorRole: string, actorUserId: number) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionReadable(mission, actorRole, actorUserId);

        const resources = await AuditMissionResource.findAll({
            where: { missionId },
            include: [{ model: User, as: 'user', attributes: ['id', 'nom', 'prenom', 'mail', 'poste'], required: false }],
            order: [['createdAt', 'ASC']],
        });
        const requiredSkills = await AuditMissionRequiredSkill.findAll({
            where: { missionId },
            include: [{ model: AuditSkill, as: 'skill', required: false }],
            order: [['createdAt', 'ASC']],
        });

        return {
            resources: resources.map((item) => item.toJSON()),
            requiredSkills: requiredSkills.map((item) => item.toJSON()),
        };
    }

    static async updateMissionResources(missionId: number, actorRole: string, actorUserId: number, data: any) {
        const mission = await this.getMissionById(missionId);
        this.ensureMissionRole(mission, actorRole, actorUserId, MISSION_ORDER_MANAGER_ROLES);

        const resources = Array.isArray(data.resources) ? data.resources : [];
        const nextKeys = new Set<string>();

        for (const resource of resources) {
            const userId = Number(resource.userId);
            const assignmentRole = resource.assignmentRole || resource.assignmentRoleCode || AuditMissionResourceRoleCode.AUDITEUR;
            const allocationPercent = Math.max(0, Math.min(100, Number(resource.allocationPercent || 100)));

            if (
                assignmentRole !== AuditMissionResourceRoleCode.CHEF_MISSION
                && assignmentRole !== AuditMissionResourceRoleCode.AUDITEUR
            ) {
                throw new Error('Le role d affectation doit etre Chef de Mission ou Auditeur');
            }

            nextKeys.add(`${userId}:${assignmentRole}`);

            const assignmentRoleId = await LookupResolutionService.requireLookupId(AUDIT_LOOKUP_KEYS.RESOURCE_ASSIGNMENT_ROLE, assignmentRole);
            const existing = await AuditMissionResource.scope('withDeleted').findOne({
                where: {
                    missionId,
                    userId,
                    assignmentRoleId,
                },
            });

            if (existing) {
                if (existing.is_deleted) {
                    await restoreSoftDeletedInstance(existing);
                }
                await existing.update({ allocationPercent });
            } else {
                await AuditMissionResource.create(await LookupResolutionService.resolveEntityPayload('auditMissionResource', {
                    missionId,
                    userId,
                    assignmentRole,
                    allocationPercent,
                }));
            }
        }

        const currentResources = await AuditMissionResource.findAll({ where: { missionId } });
        for (const resource of currentResources) {
            const resourceKey = `${resource.userId}:${(resource as any).assignmentRoleCode || (resource as any).assignmentRole}`;
            if (!nextKeys.has(resourceKey)) {
                await softDeleteInstance(resource);
            }
        }

        if (Array.isArray(data.requiredSkillIds)) {
            const nextSkillIds = new Set<number>(data.requiredSkillIds.map((value: any) => Number(value)).filter(Number.isFinite));
            const existingSkillLinks = await AuditMissionRequiredSkill.scope('withDeleted').findAll({ where: { missionId } });

            for (const skillId of nextSkillIds) {
                const existing = existingSkillLinks.find((item) => item.skillId === skillId);
                if (existing) {
                    if (existing.is_deleted) {
                        await restoreSoftDeletedInstance(existing);
                    }
                } else {
                    await AuditMissionRequiredSkill.create({ missionId, skillId });
                }
            }

            for (const item of existingSkillLinks) {
                if (!nextSkillIds.has(item.skillId)) {
                    await softDeleteInstance(item);
                }
            }
        }

        await this.syncMissionAssigneeFieldsFromResources(mission, true);

        return this.getMissionResources(missionId, actorRole, actorUserId);
    }

    static async getUserAuditSkills(userId: number) {
        return UserAuditSkill.findAll({
            where: { userId },
            include: [{ model: AuditSkill, as: 'skill', required: false }],
            order: [['createdAt', 'ASC']],
        });
    }

    static async updateUserAuditSkills(userId: number, data: any) {
        const skillIds = Array.isArray(data.skillIds)
            ? data.skillIds.map((value: any) => Number(value)).filter(Number.isFinite)
            : [];

        const existingLinks = await UserAuditSkill.scope('withDeleted').findAll({ where: { userId } });
        const nextIds = new Set<number>(skillIds);

        for (const skillId of nextIds) {
            const existing = existingLinks.find((item) => item.skillId === skillId);
            if (existing) {
                if (existing.is_deleted) {
                    await restoreSoftDeletedInstance(existing);
                }
            } else {
                await UserAuditSkill.create({ userId, skillId });
            }
        }

        for (const link of existingLinks) {
            if (!nextIds.has(link.skillId)) {
                await softDeleteInstance(link);
            }
        }

        return this.getUserAuditSkills(userId);
    }

    static async getSkillsReport(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        const missions = await this.getPlanMissions(planId, actorRole, actorUserId) as any[];
        const userIds = Array.from(new Set(missions.flatMap((mission) => (mission.resourceAssignments || []).map((resource: any) => resource.userId))));
        const userSkills = userIds.length > 0
            ? await UserAuditSkill.findAll({
                where: { userId: { [Op.in]: userIds } },
                include: [{ model: AuditSkill, as: 'skill', required: false }],
            })
            : [];

        const skillsByUserId = new Map<number, number[]>();
        for (const link of userSkills) {
            const existing = skillsByUserId.get(link.userId) || [];
            existing.push(link.skillId);
            skillsByUserId.set(link.userId, existing);
        }

        const missionCoverage = missions.map((mission) => {
            const requiredSkillIds = (mission.requiredSkills || []).map((item: any) => item.skillId);
            const availableSkillIds = Array.from(new Set(
                (mission.resourceAssignments || [])
                    .flatMap((resource: any) => skillsByUserId.get(resource.userId) || [])
            ));

            const coveredSkillIds = requiredSkillIds.filter((skillId: number) => availableSkillIds.includes(skillId));
            const gapSkillIds = requiredSkillIds.filter((skillId: number) => !availableSkillIds.includes(skillId));
            const coverage = requiredSkillIds.length === 0
                ? 'covered'
                : gapSkillIds.length === 0
                    ? 'covered'
                    : coveredSkillIds.length > 0
                        ? 'partial'
                        : 'gap';

            return {
                missionId: mission.id,
                missionCode: mission.code,
                missionTitle: mission.titre,
                coverage,
                requiredSkillCount: requiredSkillIds.length,
                availableSkillCount: availableSkillIds.length,
                coveredSkillCount: coveredSkillIds.length,
                gapSkillCount: gapSkillIds.length,
                requiredSkills: (mission.requiredSkills || []).map((item: any) => item.skill),
                gapSkills: (mission.requiredSkills || []).filter((item: any) => gapSkillIds.includes(item.skillId)).map((item: any) => item.skill),
            };
        });

        return {
            summary: {
                missionCount: missionCoverage.length,
                coveredCount: missionCoverage.filter((item) => item.coverage === 'covered').length,
                partialCount: missionCoverage.filter((item) => item.coverage === 'partial').length,
                gapCount: missionCoverage.filter((item) => item.coverage === 'gap').length,
            },
            missions: missionCoverage,
        };
    }

    static async getPlanExportData(planId: number, actorRole: string, actorUserId?: number) {
        const detail = await this.getPlanDetail(planId, actorRole, actorUserId);
        return {
            generatedAt: new Date().toISOString(),
            detail,
        };
    }

    static async getPlanDetail(planId: number, actorRole: string = UserRole.SUPER_ADMIN, actorUserId?: number) {
        this.ensurePlanReadable(actorRole);
        const plan = await this.getPlanById(planId);
        const visibleMissionIds = actorUserId !== undefined
            ? await this.getVisibleMissionIds(planId, actorRole, actorUserId)
            : [];

        if (actorUserId !== undefined && this.isMissionScopedRole(actorRole) && visibleMissionIds.length === 0) {
            if (actorRole !== UserRole.CONTROLLER) {
                throw new Error('Aucune mission de ce plan n est affectee a votre profil');
            }

            const assignedRecommendation = await AuditMission.findOne({
                where: {
                    auditPlanId: planId,
                    type: AuditRecordType.PLAN_ACTION_AUDIT,
                    auditedPrincipalId: actorUserId,
                },
                attributes: ['id'],
            });

            if (!assignedRecommendation) {
                throw new Error('Aucune recommandation de ce plan n est affectee a votre profil');
            }
        }

        const missions = await this.getPlanMissions(planId, actorRole, actorUserId);
        const recommendations = await this.getPlanRecommendations(planId, actorRole, actorUserId);
        const workflowHistory = await this.getWorkflowHistory(planId);
        const emailHistory = await this.getPlanEmailHistory(planId, actorRole, actorUserId);
        const gantt = await this.getPlanGantt(planId, actorRole, actorUserId);
        const skillsReport = await this.getSkillsReport(planId, actorRole, actorUserId);

        return {
            ...plan.toJSON(),
            missions,
            recommendations: recommendations.map((item) => item.toJSON()),
            workflowHistory,
            emailHistory,
            gantt,
            skillsReport,
            availableTransitions: this.getAvailableTransitions(this.getPlanStatusCode(plan), actorRole),
            summary: {
                missionCount: missions.length,
                recommendationCount: recommendations.length,
                completedMissionCount: missions.filter((item: any) => item.statutCode === AuditMissionStatus.OK).length,
                inProgressMissionCount: missions.filter((item: any) => item.statutCode === AuditMissionStatus.EN_COURS).length,
            },
        };
    }
}

export default AuditPlanService;
