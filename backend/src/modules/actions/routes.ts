import { Router } from 'express';
import { Op } from 'sequelize';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { AUDIT_COORDINATION_ROLES, isAuditCoordinationRole, UserRole } from '../users/user.roles';
import { Risk } from '../risk/risk.model';
import { Department } from '../departments/department.model';
import { Organigramme } from '../organigramme/organigramme.model';
import { Incident } from '../incidents/incident.model';
import { User } from '../users/user.model';
import { AuditMission, AuditRecordType } from '../auditing/audit-mission.model';
import { AuditMissionResource } from '../auditing/audit-mission-resource.model';
import { Notification, NotificationType } from '../notifications/notification.model';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { AuditingService } from '../auditing/auditing.service';

const router = Router();
const assignableUserAttributes = ['id', 'prenom', 'nom', 'mail', 'poste', 'roleId'];

type ActionSourceType = 'risk' | 'incident' | 'audit';

router.use(authenticateToken);

const allowedRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT,
    ...AUDIT_COORDINATION_ROLES,
    UserRole.TOP_MANAGEMENT,
];

const normalizeLookupValue = (value: unknown): string =>
    String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s-]+/g, '_');

const buildDisplayName = (person: any): string => {
    if (!person) {
        return '';
    }

    if (person.prenom || person.nom) {
        return `${person.prenom || ''} ${person.nom || ''}`.trim();
    }

    return person.nom || '';
};

const uniqueNonEmpty = (values: unknown[]): string[] =>
    Array.from(new Set(values.map((value) => cleanText(value)).filter(Boolean)));

const cleanText = (value: unknown): string => String(value || '').replace(/\s+/g, ' ').trim();

const toIsoString = (value: unknown): string | null => {
    if (!value) {
        return null;
    }

    const date = new Date(value as any);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const isOverdue = (value: string | null): boolean =>
    Boolean(value) && new Date(value as string).getTime() < Date.now();

const isDueWithin = (value: string | null, days: number): boolean => {
    if (!value) {
        return false;
    }

    const now = Date.now();
    const dueAt = new Date(value).getTime();
    return dueAt >= now && dueAt <= now + days * 24 * 60 * 60 * 1000;
};

const isCriticalPriority = (priority: string): boolean =>
    priority === 'critique' || priority === 'elevee';

const isTerminalStatus = (status: string): boolean => status === 'clos';

const normalizePriority = (value: unknown): string => {
    const normalized = normalizeLookupValue(value);

    if (normalized === 'critical' || normalized === 'critique') {
        return 'critique';
    }

    if (normalized === 'high' || normalized === 'eleve' || normalized === 'elevee' || normalized === 'significant') {
        return 'elevee';
    }

    if (normalized === 'medium' || normalized === 'moyen') {
        return 'moyenne';
    }

    return 'faible';
};

const buildDependencies = (context: { owner: string; dueDate: string | null; hasActionPlan: boolean; hasEvidence: boolean }): string[] => {
    const dependencies: string[] = [];

    if (context.owner === 'Non assigne') {
        dependencies.push('Responsable a confirmer');
    }

    if (!context.dueDate) {
        dependencies.push('Echeance a definir');
    }

    if (!context.hasActionPlan) {
        dependencies.push('Action a formaliser');
    }

    if (!context.hasEvidence) {
        dependencies.push('Justificatif indisponible');
    }

    return dependencies;
};

const buildDisplayActions = (status: string, priority: string, owner: string): string[] => {
    const actions: string[] = ['Voir source'];

    if (owner === 'Non assigne') {
        actions.push('Affecter');
    }

    if (status === 'en_retard') {
        actions.push('Relancer');
    } else if (status === 'a_demarrer') {
        actions.push('Planifier');
    } else {
        actions.push('Suivre');
    }

    if (isCriticalPriority(priority)) {
        actions.push('Escalader');
    }

    return actions.slice(0, 3);
};

const deriveActionStatus = (rawStatus: string, dueDate: string | null, owner: string): string => {
    if (rawStatus === 'closed' || rawStatus === 'treated' || rawStatus === 'traite' || rawStatus === 'clos' || rawStatus === 'termine') {
        return 'clos';
    }

    if (owner === 'Non assigne' && !dueDate) {
        return 'bloquee';
    }

    if (isOverdue(dueDate)) {
        return 'en_retard';
    }

    if (rawStatus === 'in_progress' || rawStatus === 'en_cours') {
        return 'en_cours';
    }

    return 'a_demarrer';
};

const deriveProgress = (status: string, rawStatus: string): number => {
    if (status === 'clos') {
        return 100;
    }

    if (status === 'en_retard') {
        return rawStatus === 'en_retard' ? 45 : 35;
    }

    if (status === 'bloquee') {
        return 20;
    }

    if (status === 'en_cours') {
        return 60;
    }

    return 15;
};

const deriveDeadlineStatus = (item: any): string => {
    if (item.status === 'en_retard' || item.status === 'bloquee') {
        return 'a_risque';
    }

    if (item.progress >= 80) {
        return 'maitrise';
    }

    return item.status;
};

const buildForecast = (item: any): string => {
    if (!item.dueDate) {
        return 'Date cible a confirmer';
    }

    if (item.status === 'en_retard') {
        return 'Replanification requise';
    }

    if (item.status === 'bloquee') {
        return 'Arbitrage necessaire';
    }

    if (isDueWithin(item.dueDate, 7)) {
        return 'Point de passage proche';
    }

    return 'Trajectoire maintenue';
};

const buildTodoLabel = (item: any): string => {
    if (item.owner === 'Non assigne') {
        return `Affecter un responsable pour ${item.reference}`;
    }

    if (item.status === 'en_retard') {
        return `Relancer ${item.owner} sur ${item.reference}`;
    }

    if (isCriticalPriority(item.priority)) {
        return `Escalader ${item.reference} au sponsor`;
    }

    return `Suivre l avancement de ${item.reference}`;
};

const buildTodoTone = (item: any): string => {
    if (item.status === 'en_retard' || item.status === 'bloquee') {
        return 'alert';
    }

    if (isCriticalPriority(item.priority)) {
        return 'watch';
    }

    return 'good';
};

const compareDueDates = (left: string | null, right: string | null): number => {
    const leftTime = left ? new Date(left).getTime() : Number.MAX_SAFE_INTEGER;
    const rightTime = right ? new Date(right).getTime() : Number.MAX_SAFE_INTEGER;
    return leftTime - rightTime;
};

const statusRank = (status: string): number => {
    const ranks: Record<string, number> = {
        en_retard: 0,
        bloquee: 1,
        en_cours: 2,
        a_demarrer: 3,
        clos: 4,
    };

    return ranks[status] ?? 5;
};

const priorityRank = (priority: string): number => {
    const ranks: Record<string, number> = {
        critique: 0,
        elevee: 1,
        moyenne: 2,
        faible: 3,
    };

    return ranks[priority] ?? 4;
};

const compareRegistryItems = (left: any, right: any): number => {
    const statusDelta = statusRank(left.status) - statusRank(right.status);
    if (statusDelta !== 0) {
        return statusDelta;
    }

    const priorityDelta = priorityRank(left.priority) - priorityRank(right.priority);
    if (priorityDelta !== 0) {
        return priorityDelta;
    }

    return compareDueDates(left.dueDate, right.dueDate);
};

const getNextMondayMorning = (date: Date): Date => {
    const next = new Date(date);
    const daysUntilMonday = (8 - next.getDay()) % 7 || 7;
    next.setDate(next.getDate() + daysUntilMonday);
    next.setHours(8, 0, 0, 0);
    return next;
};

const createNotification = async (payload: Record<string, unknown>) =>
    Notification.create(await LookupResolutionService.resolveEntityPayload('notification', payload));

const parseActionKey = (actionId: string): { sourceType: ActionSourceType; entityId: number } | null => {
    const match = String(actionId || '').trim().match(/^(risk|incident|audit)-(\d+)$/i);

    if (!match) {
        return null;
    }

    return {
        sourceType: match[1].toLowerCase() as ActionSourceType,
        entityId: Number(match[2]),
    };
};

const getActionReference = (sourceType: ActionSourceType, entityId: number): string => {
    if (sourceType === 'risk') {
        return `PA-RSK-${entityId}`;
    }

    if (sourceType === 'incident') {
        return `PA-INC-${entityId}`;
    }

    return `PA-AUD-${entityId}`;
};

const mapActionStatusToSourceStatus = (sourceType: ActionSourceType, status: string): string | null => {
    const normalized = normalizeLookupValue(status);

    if (!normalized) {
        return null;
    }

    if (sourceType === 'risk') {
        if (normalized === 'clos') return 'treated';
        if (normalized === 'en_cours') return 'in_progress';
        if (normalized === 'a_demarrer') return 'open';
        return null;
    }

    if (sourceType === 'incident') {
        if (normalized === 'clos') return 'clos';
        if (normalized === 'en_cours') return 'en_cours';
        if (normalized === 'a_demarrer') return 'nouveau';
        return null;
    }

    if (normalized === 'clos') return 'ok';
    if (normalized === 'en_cours') return 'en_cours';
    if (normalized === 'a_demarrer' || normalized === 'en_retard') return 'nok';
    return null;
};

const parseOptionalDate = (value: unknown): Date | null | undefined => {
    if (value === undefined) {
        return undefined;
    }

    if (value === null || value === '') {
        return null;
    }

    const parsed = new Date(value as any);
    if (Number.isNaN(parsed.getTime())) {
        throw new Error('Date d echeance invalide');
    }

    return parsed;
};

const parseOptionalProgress = (value: unknown): number | undefined => {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }

    const progress = Number(value);
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
        throw new Error('Avancement invalide');
    }

    return Math.round(progress);
};

const canAssignSource = (role: string, sourceType: ActionSourceType): boolean => {
    if (role === UserRole.SUPER_ADMIN) {
        return true;
    }

    if (sourceType === 'risk') {
        return role === UserRole.RISK_MANAGER;
    }

    if (sourceType === 'incident') {
        return role === UserRole.RISK_MANAGER || isAuditCoordinationRole(role);
    }

    return isAuditCoordinationRole(role);
};

const canViewActionSource = (role: string, sourceType: ActionSourceType): boolean => {
    if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
        return true;
    }

    if (role === UserRole.RISK_AGENT) {
        return sourceType === 'risk';
    }

    if (role === UserRole.RISK_MANAGER) {
        return sourceType === 'risk' || sourceType === 'incident' || sourceType === 'audit';
    }

    if (isAuditCoordinationRole(role)) {
        return sourceType === 'risk' || sourceType === 'incident' || sourceType === 'audit';
    }

    return false;
};

const getAssignableRoleIds = (sourceType: ActionSourceType): number[] => {
    if (sourceType === 'risk') {
        return [LookupResolutionService.getStaticValue('user.role', UserRole.RISK_AGENT)?.id]
            .filter((id): id is number => typeof id === 'number');
    }

    if (sourceType === 'incident') {
        return [
            LookupResolutionService.getStaticValue('user.role', UserRole.RISK_AGENT)?.id,
            LookupResolutionService.getStaticValue('user.role', UserRole.RISK_MANAGER)?.id,
        ].filter((id): id is number => typeof id === 'number');
    }

    return [LookupResolutionService.getStaticValue('user.role', UserRole.AUDITEUR)?.id]
        .filter((id): id is number => typeof id === 'number');
};

const loadAssignableUsers = async (sourceType: ActionSourceType) => {
    const roleIds = getAssignableRoleIds(sourceType);

    if (!roleIds.length) {
        return [];
    }

    return User.findAll({
        where: { roleId: { [Op.in]: roleIds } },
        attributes: assignableUserAttributes,
        order: [['prenom', 'ASC'], ['nom', 'ASC']],
    });
};

const resolveReminderRecipients = async (
    sourceType: ActionSourceType,
    entityId: number,
    actorUserId: number
): Promise<{ recipients: User[]; title: string; dueDate: string | null; relation: Record<string, number> }> => {
    if (sourceType === 'risk') {
        const risk = await Risk.findByPk(entityId);
        if (!risk) {
            throw new Error('Risque introuvable');
        }

        const recipientIds = Array.from(new Set([risk.riskAgentId, risk.riskManagerId].filter((id) => typeof id === 'number' && id !== actorUserId))) as number[];
        const recipients = recipientIds.length
            ? await User.findAll({ where: { id: { [Op.in]: recipientIds } } })
            : [];

        return {
            recipients,
            title: risk.titre,
            dueDate: toIsoString((risk as any).dateEcheance || (risk as any).prochaineEcheance),
            relation: { riskId: risk.id },
        };
    }

    if (sourceType === 'incident') {
        const incident = await Incident.findByPk(entityId);
        if (!incident) {
            throw new Error('Incident introuvable');
        }

        const recipients = incident.userId && incident.userId !== actorUserId
            ? await User.findAll({ where: { id: incident.userId } })
            : [];

        return {
            recipients,
            title: incident.titre,
            dueDate: toIsoString((incident as any).dateEcheance),
            relation: {},
        };
    }

    const mission = await AuditMission.findByPk(entityId);
    if (!mission) {
        throw new Error('Mission d audit introuvable');
    }

    const recipientIds = Array.from(new Set([mission.auditeurId, mission.auditSeniorId].filter((id) => typeof id === 'number' && id !== actorUserId))) as number[];
    const recipients = recipientIds.length
        ? await User.findAll({ where: { id: { [Op.in]: recipientIds } } })
        : [];

    return {
        recipients,
        title: mission.titre,
        dueDate: toIsoString(mission.delai),
        relation: { auditMissionId: mission.id },
    };
};

router.get(
    '/',
    authorizeRoles(...allowedRoles),
    (_req, res) => res.json({ message: 'Actions module ready', endpoints: ['/api/actions/overview'] })
);

router.get('/overview', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;

        const riskIncludes: any[] = [
            { model: Department, as: 'departement', required: false },
            { model: User, as: 'riskManager', required: false, attributes: ['id', 'prenom', 'nom'] },
            { model: User, as: 'riskAgent', required: false, attributes: ['id', 'prenom', 'nom'] },
            { model: Organigramme, as: 'responsableTraitement', required: false, attributes: ['id', 'nom'] },
        ];

        let risks: any[] = [];
        let missions: any[] = [];

        if (isAuditCoordinationRole(role)) {
            missions = await AuditMission.findAll({
                where: { auditSeniorId: userId },
                include: [
                    {
                        model: Risk,
                        as: 'risk',
                        required: false,
                        include: riskIncludes,
                    },
                    { model: User, as: 'auditSenior', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'chefMission', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
                    {
                        model: AuditMissionResource,
                        as: 'resourceAssignments',
                        required: false,
                        include: [{ model: User, as: 'user', required: false, attributes: ['id', 'prenom', 'nom'] }],
                    },
                ],
                order: [['delai', 'ASC']],
            });

            const riskIds = Array.from(
                new Set(
                    missions
                        .map((mission) => mission.riskId)
                        .filter((riskId) => typeof riskId === 'number')
                )
            );

            risks = riskIds.length
                ? await Risk.findAll({
                    where: { id: { [Op.in]: riskIds } },
                    include: riskIncludes,
                    order: [['updatedAt', 'DESC']],
                })
                : [];
        } else {
            const riskWhere: Record<string, unknown> = {};

            if (role === UserRole.RISK_MANAGER) {
                riskWhere.riskManagerId = userId;
            } else if (role === UserRole.RISK_AGENT) {
                riskWhere.riskAgentId = userId;
            }

            risks = await Risk.findAll({
                where: riskWhere,
                include: riskIncludes,
                order: [['updatedAt', 'DESC']],
            });

            const riskIds = risks.map((risk) => risk.id);
            const missionWhere: Record<string, unknown> = {};

            if ((role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) && riskIds.length) {
                missionWhere.riskId = { [Op.in]: riskIds };
            } else if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
                missionWhere.riskId = { [Op.in]: [-1] };
            }

            missions = canViewActionSource(role, 'audit')
                ? await AuditMission.findAll({
                    where: missionWhere,
                    include: [
                        {
                            model: Risk,
                            as: 'risk',
                            required: false,
                            include: riskIncludes,
                        },
                        { model: User, as: 'auditSenior', required: false, attributes: ['id', 'prenom', 'nom'] },
                        { model: User, as: 'chefMission', required: false, attributes: ['id', 'prenom', 'nom'] },
                        { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
                        {
                            model: AuditMissionResource,
                            as: 'resourceAssignments',
                            required: false,
                            include: [{ model: User, as: 'user', required: false, attributes: ['id', 'prenom', 'nom'] }],
                        },
                    ],
                    order: [['delai', 'ASC']],
                })
                : [];
        }

        const scopedRiskIds = Array.from(new Set(risks.map((risk) => risk.id)));
        const scopedDepartmentIds = Array.from(
            new Set(
                risks
                    .map((risk) => risk.departementId)
                    .filter((departementId) => typeof departementId === 'number')
            )
        );

        let incidents: any[] = [];
        if (!canViewActionSource(role, 'incident')) {
            incidents = [];
        } else if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
            incidents = await Incident.findAll({
                include: [
                    { model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'assignee', required: false, attributes: ['id', 'prenom', 'nom'] },
                ],
                order: [['updatedAt', 'DESC']],
            });
        } else if (scopedRiskIds.length || scopedDepartmentIds.length) {
            const incidentFilters: any[] = [];

            if (scopedRiskIds.length) {
                incidentFilters.push({ riskId: { [Op.in]: scopedRiskIds } });
            }

            if (scopedDepartmentIds.length) {
                incidentFilters.push({ departementId: { [Op.in]: scopedDepartmentIds } });
            }

            incidents = await Incident.findAll({
                where: { [Op.or]: incidentFilters },
                include: [
                    { model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'assignee', required: false, attributes: ['id', 'prenom', 'nom'] },
                ],
                order: [['updatedAt', 'DESC']],
            });
        }

        const registry = [
            ...risks.map((risk) => {
                const normalizedStatus = normalizeLookupValue(risk.statutCode || risk.statut);
                const owner = buildDisplayName(risk.responsableTraitement) ||
                    buildDisplayName(risk.riskAgent) ||
                    buildDisplayName(risk.riskManager) ||
                    'Non assigne';
                const dueDate = toIsoString(risk.dateEcheance || risk.prochaineEcheance);
                const status = deriveActionStatus(normalizedStatus, dueDate, owner);
                const assignees = uniqueNonEmpty([
                    buildDisplayName(risk.responsableTraitement),
                    buildDisplayName(risk.riskAgent),
                    buildDisplayName(risk.riskManager),
                ]);

                return {
                    id: `risk-${risk.id}`,
                    reference: `PA-RSK-${risk.id}`,
                    title: cleanText(risk.planActionTraitement) || `Traitement du risque: ${risk.titre}`,
                    sourceModule: 'Risques',
                    sourceReference: `RSK-${risk.id}`,
                    sourceRoute: '/dashboard/treatment-plans',
                    priority: normalizePriority(risk.niveauRisqueCode || risk.niveauRisque),
                    status,
                    dueDate,
                    owner,
                    department: risk.departement?.nom || risk.domaine || 'Non rattache',
                    progress: deriveProgress(status, normalizedStatus),
                    dependencies: buildDependencies({
                        owner,
                        dueDate,
                        hasActionPlan: Boolean(cleanText(risk.planActionTraitement)),
                        hasEvidence: Boolean(risk.pieceJustificative),
                    }),
                    displayActions: buildDisplayActions(status, normalizePriority(risk.niveauRisqueCode || risk.niveauRisque), owner),
                    lastUpdate: toIsoString(risk.updatedAt) || new Date().toISOString(),
                    startDate: toIsoString(risk.createdAt),
                    assignees: assignees.length ? assignees : ['Non assigne'],
                    resources: uniqueNonEmpty([risk.departement?.nom, risk.domaine, risk.macroProcessus, risk.processus]),
                    statusLabel: risk.statutLabel || risk.statutCode || risk.statut || status,
                    history: [
                        { at: toIsoString(risk.createdAt), event: 'Creation', actor: 'Risques', detail: `Risque cree: ${risk.titre}` },
                        { at: toIsoString(risk.updatedAt), event: 'Mise a jour', actor: owner, detail: cleanText(risk.planActionTraitement) || 'Plan d action a formaliser' },
                    ],
                };
            }),
            ...incidents
                .filter((incident) => Boolean(cleanText(incident.planActionTraitement)) || normalizeLookupValue(incident.statut) !== 'clos')
                .map((incident) => {
                    const normalizedStatus = normalizeLookupValue(incident.statutCode || incident.statut);
                    const owner = buildDisplayName(incident.assignee) || buildDisplayName(incident.declareur) || 'Non assigne';
                    const dueDate = toIsoString(incident.dateEcheance);
                    const priority = normalizePriority(incident.niveauRisqueCode || incident.niveauRisque);
                    const status = deriveActionStatus(normalizedStatus, dueDate, owner);
                    const assignees = uniqueNonEmpty([buildDisplayName(incident.assignee), buildDisplayName(incident.declareur)]);

                    return {
                        id: `incident-${incident.id}`,
                        reference: `PA-INC-${incident.id}`,
                        title: cleanText(incident.planActionTraitement) || `Traitement incident: ${incident.titre}`,
                        sourceModule: 'Incidents',
                        sourceReference: `INC-${incident.id}`,
                        sourceRoute: '/dashboard/incident-workflow',
                        priority,
                        status,
                        dueDate,
                        owner,
                        department: incident.domaine || 'Non rattache',
                        progress: deriveProgress(status, normalizedStatus),
                        dependencies: buildDependencies({
                            owner,
                            dueDate,
                            hasActionPlan: Boolean(cleanText(incident.planActionTraitement)),
                            hasEvidence: Boolean(incident.pieceJointe),
                        }),
                        displayActions: buildDisplayActions(status, priority, owner),
                        lastUpdate: toIsoString(incident.updatedAt) || new Date().toISOString(),
                        startDate: toIsoString(incident.createdAt || incident.dateSurvenance),
                        assignees: assignees.length ? assignees : ['Non assigne'],
                        resources: uniqueNonEmpty([incident.domaine, incident.macroProcessus, incident.processus]),
                        statusLabel: incident.statutLabel || incident.statutCode || incident.statut || status,
                        history: [
                            { at: toIsoString(incident.createdAt || incident.dateSurvenance), event: 'Declaration', actor: buildDisplayName(incident.declareur) || 'Incidents', detail: `Incident declare: ${incident.titre}` },
                            { at: toIsoString(incident.updatedAt), event: 'Traitement', actor: owner, detail: cleanText(incident.planActionTraitement) || 'Plan d action a formaliser' },
                        ],
                    };
                }),
            ...missions
                .filter((mission) => normalizeLookupValue(mission.statut) !== 'annule')
                .map((mission) => {
                    const normalizedStatus = normalizeLookupValue(mission.statut);
                    const owner = buildDisplayName(mission.auditeur) || buildDisplayName(mission.auditSenior) || 'Non assigne';
                    const dueDate = toIsoString(mission.delai);
                    const isPlanAction = mission.type === AuditRecordType.PLAN_ACTION_AUDIT;
                    const recommendations = cleanText(mission.recommandations || mission.objectifs);
                    const priority = normalizePriority(mission.risk?.niveauRisqueCode || mission.risk?.niveauRisque);
                    const status = deriveActionStatus(normalizedStatus, dueDate, owner);
                    const resourceNames = uniqueNonEmpty((mission.resourceAssignments || []).map((resource: any) => buildDisplayName(resource.user)));
                    const assignees = uniqueNonEmpty([
                        buildDisplayName(mission.auditeur),
                        buildDisplayName(mission.chefMission),
                        buildDisplayName(mission.auditSenior),
                        ...resourceNames,
                    ]);
                    const progress = typeof mission.progressPercent === 'number'
                        ? Math.max(0, Math.min(100, mission.progressPercent))
                        : deriveProgress(status, normalizedStatus);

                    return {
                        id: `audit-${mission.id}`,
                        reference: `${isPlanAction ? 'PA-AUD' : 'AUD'}-${mission.code || mission.id}`,
                        title: isPlanAction ? (recommendations || cleanText(mission.regleDnssi) || cleanText(mission.titre)) : (recommendations || `Suivi des recommandations: ${mission.titre}`),
                        sourceModule: isPlanAction ? 'Plan action audit' : 'Audit',
                        sourceReference: `AUD-${mission.id}`,
                        sourceRoute: isPlanAction ? '/dashboard/audit-checklists' : '/dashboard/audit-report-review',
                        priority,
                        status,
                        dueDate,
                        owner,
                        department: mission.risk?.departement?.nom || mission.risk?.domaine || 'Non rattache',
                        progress,
                        dependencies: buildDependencies({
                            owner,
                            dueDate,
                            hasActionPlan: Boolean(recommendations),
                            hasEvidence: isPlanAction ? true : Boolean(mission.rapport),
                        }),
                        displayActions: buildDisplayActions(status, priority, owner),
                        lastUpdate: toIsoString(mission.updatedAt) || new Date().toISOString(),
                        startDate: toIsoString(mission.dateReelleDebut || mission.datePrevueDebut || mission.createdAt),
                        assignees: assignees.length ? assignees : ['Non assigne'],
                        resources: uniqueNonEmpty([
                            mission.auditPlan?.nom,
                            mission.axe,
                            mission.risk?.departement?.nom,
                            mission.risk?.domaine,
                            ...resourceNames,
                        ]),
                        statusLabel: mission.statutLabel || mission.statutCode || mission.statut || status,
                        history: [
                            { at: toIsoString(mission.createdAt), event: 'Creation', actor: 'Audit', detail: `Mission creee: ${mission.titre}` },
                            { at: toIsoString(mission.updatedAt), event: 'Avancement', actor: owner, detail: `${progress}%` },
                        ],
                    };
                }),
        ].sort(compareRegistryItems);

        const openRegistry = registry.filter((item) => !isTerminalStatus(item.status));
        const closedRegistry = registry.filter((item) => isTerminalStatus(item.status));
        const overdueActions = openRegistry.filter((item) => isOverdue(item.dueDate)).length;
        const dueThisMonth = openRegistry.filter((item) => isDueWithin(item.dueDate, 30)).length;
        const criticalActions = openRegistry.filter((item) => isCriticalPriority(item.priority)).length;
        const blockedActions = openRegistry.filter((item) => item.status === 'bloquee' || item.dependencies.length >= 2).length;
        const completionRate = registry.length > 0 ? Math.round((closedRegistry.length / registry.length) * 100) : 0;
        const overdueRate = openRegistry.length > 0 ? Math.round((overdueActions / openRegistry.length) * 100) : 0;
        const effectivenessScore = Math.max(0, Math.min(100, Math.round((completionRate * 0.6) + ((100 - overdueRate) * 0.4))));

        const deadlines = openRegistry
            .filter((item) => Boolean(item.dueDate))
            .slice()
            .sort((left, right) => compareDueDates(left.dueDate, right.dueDate))
            .slice(0, 10)
            .map((item) => ({
                id: item.id,
                title: item.title,
                milestone: `Livrable ${item.reference} | ${item.sourceModule}`,
                dueDate: item.dueDate,
                status: deriveDeadlineStatus(item),
                progress: item.progress,
                owner: item.owner,
                blocker: item.dependencies.length > 0 ? item.dependencies[0] : null,
                forecast: buildForecast(item),
                startDate: item.startDate || item.lastUpdate,
                dependencyCount: item.dependencies.length,
                resourceLoad: item.assignees?.length ? `${item.assignees.length} responsable(s)` : 'Non assigne',
            }));

        const now = new Date();
        const notifications: any[] = [];

        if (overdueActions > 0) {
            notifications.push({
                id: 'notif-overdue',
                title: `${overdueActions} action(s) en retard a relancer`,
                channel: 'in_app',
                audience: 'Owners et managers',
                trigger: 'Retard detecte sur une echeance',
                nextSendAt: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
                escalationLevel: criticalActions > 0 ? 'niveau_3' : 'niveau_2',
                status: 'active',
                detailLabel: 'Voir les retards',
                detailFilter: { status: 'en_retard' },
            });
        }

        if (dueThisMonth > 0) {
            const dueSoonSendAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

            notifications.push({
                id: 'notif-due-soon',
                title: `${dueThisMonth} action(s) a suivre sous 30 jours`,
                channel: 'email',
                audience: 'Responsables de traitement',
                trigger: 'Echeance proche',
                nextSendAt: dueSoonSendAt,
                escalationLevel: 'niveau_1',
                status: 'active',
            });

            notifications.push({
                id: 'notif-due-soon-app',
                title: `${dueThisMonth} rappel(s) app pour echeances proches`,
                channel: 'in_app',
                audience: 'Responsables assignes',
                trigger: 'Echeance proche',
                nextSendAt: dueSoonSendAt,
                escalationLevel: 'niveau_1',
                status: 'active',
            });
        }

        if (openRegistry.length > 0) {
            const weeklySendAt = getNextMondayMorning(now).toISOString();

            notifications.push({
                id: 'notif-weekly-summary',
                title: 'Synthese hebdomadaire du portefeuille actions',
                channel: 'email',
                audience: 'Top management et pilotage GRC',
                trigger: 'Revue hebdomadaire programmee',
                nextSendAt: weeklySendAt,
                escalationLevel: 'niveau_1',
                status: 'planifiee',
            });

            notifications.push({
                id: 'notif-weekly-summary-app',
                title: 'Resume app hebdomadaire du portefeuille actions',
                channel: 'in_app',
                audience: 'Top management et pilotage GRC',
                trigger: 'Revue hebdomadaire programmee',
                nextSendAt: weeklySendAt,
                escalationLevel: 'niveau_1',
                status: 'planifiee',
            });
        }

        const itemsWithDueDate = registry.filter((item) => Boolean(item.dueDate));
        const closedOnTimeCount = registry.filter((item) =>
            isTerminalStatus(item.status) &&
            item.dueDate &&
            new Date(item.lastUpdate).getTime() <= new Date(item.dueDate).getTime()
        ).length;
        const closedWithDueDate = registry.filter((item) => isTerminalStatus(item.status) && Boolean(item.dueDate)).length;
        const onTimeRate = closedWithDueDate > 0 ? Math.round((closedOnTimeCount / closedWithDueDate) * 100) : completionRate;
        const pressureRate = openRegistry.length > 0 ? Math.round(((criticalActions + overdueActions) / openRegistry.length) * 100) : 0;

        const indicators = [
            {
                id: 'kpi-on-time',
                label: 'Cloture a echeance',
                value: onTimeRate,
                unit: '%',
                target: 85,
                trend: onTimeRate >= 85 ? 'en_hausse' : onTimeRate >= 65 ? 'stable' : 'en_baisse',
                commentary: closedWithDueDate > 0
                    ? `${closedOnTimeCount} action(s) cloturee(s) dans les delais sur ${closedWithDueDate}.`
                    : 'Aucune cloture exploitable a date pour mesurer le respect des delais.',
            },
            {
                id: 'kpi-open-critical',
                label: 'Actions critiques ouvertes',
                value: criticalActions,
                unit: '',
                target: 0,
                trend: criticalActions === 0 ? 'en_hausse' : criticalActions <= 3 ? 'stable' : 'en_baisse',
                commentary: `${criticalActions} action(s) prioritaire(s) restent ouvertes sur ${openRegistry.length} action(s) actives.`,
            },
            {
                id: 'kpi-effectiveness',
                label: 'Efficacite globale',
                value: effectivenessScore,
                unit: '%',
                target: 80,
                trend: effectivenessScore >= 80 ? 'en_hausse' : effectivenessScore >= 60 ? 'stable' : 'en_baisse',
                commentary: `${itemsWithDueDate.length} action(s) avec echeance alimentent le score de performance global.`,
            },
            {
                id: 'kpi-pressure',
                label: 'Tension du portefeuille',
                value: pressureRate,
                unit: '%',
                target: 20,
                trend: pressureRate <= 20 ? 'en_hausse' : pressureRate <= 40 ? 'stable' : 'en_baisse',
                commentary: 'Mesure combinee des actions critiques et des actions en retard encore ouvertes.',
            },
        ];

        const todoActions = openRegistry
            .slice()
            .sort(compareRegistryItems)
            .slice(0, 6)
            .map((item) => ({
                id: `todo-${item.id}`,
                title: buildTodoLabel(item),
                detail: `${item.sourceModule} | ${item.reference}${item.dueDate ? ` | echeance ${new Date(item.dueDate).toLocaleDateString('fr-FR')}` : ''}`,
                tone: buildTodoTone(item),
                sourceModule: item.sourceModule,
                owner: item.owner,
                dueDate: item.dueDate,
            }));

        res.json({
            generatedAt: new Date().toISOString(),
            summary: {
                totalOpenActions: openRegistry.length,
                overdueActions,
                dueThisMonth,
                completionRate,
                activeAlerts: notifications.filter((item) => item.status === 'active').length,
                effectivenessScore,
                criticalActions,
                blockedActions,
            },
            registry,
            deadlines,
            notifications,
            indicators,
            todoActions,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la preparation du module des plans d actions',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/:actionId/assignable-users', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const actionKey = Array.isArray(req.params.actionId) ? req.params.actionId[0] : req.params.actionId;
        const parsed = parseActionKey(actionKey);

        if (!parsed) {
            return res.status(400).json({ message: 'Identifiant d action invalide' });
        }

        if (!canViewActionSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Acces non autorise a cette source d action' });
        }

        if (!canAssignSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Permissions insuffisantes pour affecter cette action' });
        }

        const users = await loadAssignableUsers(parsed.sourceType);
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la recuperation des responsables assignables',
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/:actionId/remind', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const actionKey = Array.isArray(req.params.actionId) ? req.params.actionId[0] : req.params.actionId;
        const parsed = parseActionKey(actionKey);

        if (!parsed) {
            return res.status(400).json({ message: 'Identifiant d action invalide' });
        }

        if (!canViewActionSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Acces non autorise a cette source d action' });
        }

        const reminderReference = getActionReference(parsed.sourceType, parsed.entityId);
        const note = cleanText(req.body?.note);
        const { recipients, title, dueDate, relation } = await resolveReminderRecipients(parsed.sourceType, parsed.entityId, req.user!.id);

        if (!recipients.length) {
            return res.status(400).json({
                message: 'Aucun destinataire exploitable pour cette relance',
            });
        }

        const actorLabel = req.user?.email ? ` par ${req.user.email}` : '';
        const deadlineLabel = dueDate ? new Date(dueDate).toLocaleDateString('fr-FR') : 'non definie';
        const baseContent = `Rappel plan d action ${reminderReference} : ${title}. Prochaine echeance : ${deadlineLabel}. Merci de vous connecter a la plateforme pour verifier le suivi et mettre a jour l avancement${actorLabel}.`;
        const content = note ? `${baseContent} Note : ${note}` : baseContent;

        await Promise.all(
            recipients.map((recipient) =>
                createNotification({
                    userId: recipient.id,
                    type: NotificationType.REMINDER,
                    content,
                    ...relation,
                })
            )
        );

        res.json({
            message: 'Relance enregistree avec succes',
            sentCount: recipients.length,
            recipients: recipients.map((recipient) => ({
                id: recipient.id,
                name: buildDisplayName(recipient),
            })),
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la creation de la relance',
            error: error?.message || 'unknown_error',
        });
    }
});

router.put('/:actionId/assign', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const actionKey = Array.isArray(req.params.actionId) ? req.params.actionId[0] : req.params.actionId;
        const parsed = parseActionKey(actionKey);
        const assigneeUserId = Number(req.body?.userId);

        if (!parsed) {
            return res.status(400).json({ message: 'Identifiant d action invalide' });
        }

        if (!canViewActionSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Acces non autorise a cette source d action' });
        }

        if (!Number.isInteger(assigneeUserId) || assigneeUserId <= 0) {
            return res.status(400).json({ message: 'Responsable selectionne invalide' });
        }

        if (!canAssignSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Permissions insuffisantes pour affecter cette action' });
        }

        const assignableUsers = await loadAssignableUsers(parsed.sourceType);
        const assignee = assignableUsers.find((user) => user.id === assigneeUserId);

        if (!assignee) {
            return res.status(400).json({ message: 'Le responsable selectionne ne peut pas etre affecte a cette action' });
        }

        if (parsed.sourceType === 'risk') {
            const risk = await Risk.findByPk(parsed.entityId);
            if (!risk) {
                return res.status(404).json({ message: 'Risque introuvable' });
            }

            await risk.update(await LookupResolutionService.resolveEntityPayload('risk', {
                riskAgentId: assigneeUserId,
                statut: 'in_progress',
            }));

            await createNotification({
                userId: assigneeUserId,
                type: NotificationType.RISK_ASSIGNED,
                content: `Une action du portefeuille plans d actions vous a ete affectee : ${getActionReference(parsed.sourceType, parsed.entityId)} - ${risk.titre}`,
                riskId: risk.id,
            });

            return res.json({
                message: 'Action affectee avec succes',
                assignee: { id: assignee.id, name: buildDisplayName(assignee) },
            });
        }

        if (parsed.sourceType === 'incident') {
            const incident = await Incident.findByPk(parsed.entityId);
            if (!incident) {
                return res.status(404).json({ message: 'Incident introuvable' });
            }

            await incident.update(await LookupResolutionService.resolveEntityPayload('incident', {
                assigneeId: assigneeUserId,
                statut: incident.statut || 'en_cours',
            }));

            await createNotification({
                userId: assigneeUserId,
                type: NotificationType.STATUS_CHANGED,
                content: `Une action issue du registre incidents vous a ete affectee : ${getActionReference(parsed.sourceType, parsed.entityId)} - ${incident.titre}`,
            });

            return res.json({
                message: 'Action affectee avec succes',
                assignee: { id: assignee.id, name: buildDisplayName(assignee) },
            });
        }

        const mission = await AuditingService.assignMission(parsed.entityId, assigneeUserId);
        if (!mission) {
            return res.status(404).json({ message: 'Enregistrement audit introuvable' });
        }

        return res.json({
            message: 'Action affectee avec succes',
            assignee: { id: assignee.id, name: buildDisplayName(assignee) },
            auditMissionId: mission.id,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de l affectation de l action',
            error: error?.message || 'unknown_error',
        });
    }
});

router.put('/:actionId/tracking', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const actionKey = Array.isArray(req.params.actionId) ? req.params.actionId[0] : req.params.actionId;
        const parsed = parseActionKey(actionKey);

        if (!parsed) {
            return res.status(400).json({ message: 'Identifiant d action invalide' });
        }

        if (!canViewActionSource(req.user!.role, parsed.sourceType)) {
            return res.status(403).json({ message: 'Acces non autorise a cette source d action' });
        }

        const title = req.body?.title === undefined ? undefined : cleanText(req.body.title);
        const dueDate = parseOptionalDate(req.body?.dueDate);
        const progress = parseOptionalProgress(req.body?.progress);
        const mappedStatus = req.body?.status === undefined
            ? null
            : mapActionStatusToSourceStatus(parsed.sourceType, req.body.status);

        if (req.body?.status !== undefined && !mappedStatus) {
            return res.status(400).json({ message: 'Statut d action invalide pour cette source' });
        }

        if (parsed.sourceType === 'risk') {
            const risk = await Risk.findByPk(parsed.entityId);
            if (!risk) {
                return res.status(404).json({ message: 'Risque introuvable' });
            }

            const payload: Record<string, unknown> = {};
            if (title !== undefined) payload.planActionTraitement = title;
            if (dueDate !== undefined) payload.dateEcheance = dueDate;
            if (mappedStatus) payload.statut = mappedStatus;

            await risk.update(await LookupResolutionService.resolveEntityPayload('risk', payload));

            return res.json({
                message: 'Suivi du plan d action risque mis a jour',
                actionId: actionKey,
            });
        }

        if (parsed.sourceType === 'incident') {
            const incident = await Incident.findByPk(parsed.entityId);
            if (!incident) {
                return res.status(404).json({ message: 'Incident introuvable' });
            }

            const payload: Record<string, unknown> = {};
            if (title !== undefined) payload.planActionTraitement = title;
            if (dueDate !== undefined) payload.dateEcheance = dueDate;
            if (mappedStatus) payload.statut = mappedStatus;

            await incident.update(await LookupResolutionService.resolveEntityPayload('incident', payload));

            return res.json({
                message: 'Suivi du plan d action incident mis a jour',
                actionId: actionKey,
            });
        }

        const mission = await AuditMission.findByPk(parsed.entityId);
        if (!mission) {
            return res.status(404).json({ message: 'Enregistrement audit introuvable' });
        }

        const payload: Record<string, unknown> = {};
        if (title !== undefined) payload.recommandations = title;
        if (dueDate !== undefined) payload.delai = dueDate;
        if (progress !== undefined) payload.progressPercent = progress;
        if (mappedStatus) payload.statut = progress === 100 ? 'ok' : mappedStatus;

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', payload));

        return res.json({
            message: 'Suivi du plan d action audit mis a jour',
            actionId: actionKey,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la mise a jour du suivi action',
            error: error?.message || 'unknown_error',
        });
    }
});

export default router;
