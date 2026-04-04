import { Router } from 'express';
import { Op } from 'sequelize';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { Risk } from '../risk/risk.model';
import { Department } from '../departments/department.model';
import { Organigramme } from '../organigramme/organigramme.model';
import { Incident } from '../incidents/incident.model';
import { User } from '../users/user.model';
import { AuditMission } from '../auditing/audit-mission.model';
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
    UserRole.AUDIT_SENIOR,
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

const canAssignSource = (role: string, sourceType: ActionSourceType): boolean => {
    if (role === UserRole.SUPER_ADMIN) {
        return true;
    }

    if (sourceType === 'risk') {
        return role === UserRole.RISK_MANAGER;
    }

    if (sourceType === 'incident') {
        return role === UserRole.RISK_MANAGER || role === UserRole.AUDIT_SENIOR;
    }

    return role === UserRole.AUDIT_SENIOR;
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
): Promise<{ recipients: User[]; title: string; relation: Record<string, number> }> => {
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

        if (role === UserRole.AUDIT_SENIOR) {
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
                    { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
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

            missions = await AuditMission.findAll({
                where: missionWhere,
                include: [
                    {
                        model: Risk,
                        as: 'risk',
                        required: false,
                        include: riskIncludes,
                    },
                    { model: User, as: 'auditSenior', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
                ],
                order: [['delai', 'ASC']],
            });
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
        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
            incidents = await Incident.findAll({
                include: [{ model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] }],
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
                include: [{ model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] }],
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
                };
            }),
            ...incidents
                .filter((incident) => Boolean(cleanText(incident.planActionTraitement)) || normalizeLookupValue(incident.statut) !== 'clos')
                .map((incident) => {
                    const normalizedStatus = normalizeLookupValue(incident.statutCode || incident.statut);
                    const owner = buildDisplayName(incident.declareur) || 'Non assigne';
                    const dueDate = toIsoString(incident.dateEcheance);
                    const priority = normalizePriority(incident.niveauRisqueCode || incident.niveauRisque);
                    const status = deriveActionStatus(normalizedStatus, dueDate, owner);

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
                    };
                }),
            ...missions
                .filter((mission) => normalizeLookupValue(mission.statut) !== 'annule')
                .map((mission) => {
                    const normalizedStatus = normalizeLookupValue(mission.statut);
                    const owner = buildDisplayName(mission.auditeur) || buildDisplayName(mission.auditSenior) || 'Non assigne';
                    const dueDate = toIsoString(mission.delai);
                    const recommendations = cleanText(mission.recommandations);
                    const priority = normalizePriority(mission.risk?.niveauRisqueCode || mission.risk?.niveauRisque);
                    const status = deriveActionStatus(normalizedStatus, dueDate, owner);

                    return {
                        id: `audit-${mission.id}`,
                        reference: `PA-AUD-${mission.id}`,
                        title: recommendations || `Suivi des recommandations: ${mission.titre}`,
                        sourceModule: 'Audit',
                        sourceReference: `AUD-${mission.id}`,
                        sourceRoute: '/dashboard/audit-report-review',
                        priority,
                        status,
                        dueDate,
                        owner,
                        department: mission.risk?.departement?.nom || mission.risk?.domaine || 'Non rattache',
                        progress: deriveProgress(status, normalizedStatus),
                        dependencies: buildDependencies({
                            owner,
                            dueDate,
                            hasActionPlan: Boolean(recommendations),
                            hasEvidence: Boolean(mission.rapport),
                        }),
                        displayActions: buildDisplayActions(status, priority, owner),
                        lastUpdate: toIsoString(mission.updatedAt) || new Date().toISOString(),
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
            notifications.push({
                id: 'notif-due-soon',
                title: `${dueThisMonth} action(s) a suivre sous 30 jours`,
                channel: 'email',
                audience: 'Responsables de traitement',
                trigger: 'Echeance proche',
                nextSendAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
                escalationLevel: 'niveau_1',
                status: 'active',
            });
        }

        if (openRegistry.length > 0) {
            notifications.push({
                id: 'notif-weekly-summary',
                title: 'Synthese hebdomadaire du portefeuille actions',
                channel: 'email',
                audience: 'Top management et pilotage GRC',
                trigger: 'Revue hebdomadaire programmee',
                nextSendAt: getNextMondayMorning(now).toISOString(),
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

        const reminderReference = getActionReference(parsed.sourceType, parsed.entityId);
        const note = cleanText(req.body?.note);
        const { recipients, title, relation } = await resolveReminderRecipients(parsed.sourceType, parsed.entityId, req.user!.id);

        if (!recipients.length) {
            return res.status(400).json({
                message: 'Aucun destinataire exploitable pour cette relance',
            });
        }

        const actorLabel = req.user?.email ? ` par ${req.user.email}` : '';
        const baseContent = `Relance sur l action ${reminderReference} - ${title}. Merci de mettre a jour son avancement${actorLabel}.`;
        const content = note ? `${baseContent} Note: ${note}` : baseContent;

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
                userId: assigneeUserId,
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

export default router;
