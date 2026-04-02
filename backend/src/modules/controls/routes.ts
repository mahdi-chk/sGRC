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
import { AuditEvidence } from '../auditing/audit-evidence.model';

const router = Router();

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

const isPeriodicFrequency = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return Boolean(normalized) && normalized !== 'none' && normalized !== 'aucun';
};

const isCompletedRiskStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized === 'treated' || normalized === 'closed' || normalized === 'traite' || normalized === 'clos';
};

const isCompletedMissionStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized === 'termine' || normalized === 'closed';
};

const isOpenIncidentStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized !== 'traite' && normalized !== 'clos' && normalized !== 'closed' && normalized !== 'treated';
};

const inferControlType = (risk: any): string => {
    const corpus = `${risk?.dmrExistant || ''} ${risk?.planActionTraitement || ''} ${risk?.explication || ''}`.toLowerCase();

    if (/correc|remedi|remediat|action/.test(corpus)) {
        return 'correctif';
    }

    if (/controle|surveill|revue|monitor|detect/.test(corpus)) {
        return 'detectif';
    }

    return 'preventif';
};

const getSeverityWeight = (value: unknown): number => {
    const normalized = normalizeLookupValue(value);
    if (normalized === 'critical' || normalized === 'critique') {
        return 5;
    }
    if (normalized === 'high' || normalized === 'eleve' || normalized === 'elevee') {
        return 4;
    }
    if (normalized === 'significant' || normalized === 'medium' || normalized === 'significatif' || normalized === 'moyen') {
        return 3;
    }
    if (normalized === 'limited' || normalized === 'limite') {
        return 2;
    }
    return 1;
};

router.get(
    '/',
    authorizeRoles(...allowedRoles),
    (_req, res) => res.json({ message: 'Controls module ready', endpoints: ['/api/controls/overview'] })
);

router.get('/overview', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;

        const riskIncludes = [
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
                        include: riskIncludes as any,
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
                    include: riskIncludes as any,
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
                include: riskIncludes as any,
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
                        include: riskIncludes as any,
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

        const missionIds = missions.map((mission) => mission.id);
        const evidences = missionIds.length
            ? await AuditEvidence.findAll({
                where: { missionId: { [Op.in]: missionIds } },
                include: [
                    { model: User, as: 'uploader', required: false, attributes: ['id', 'prenom', 'nom'] },
                    {
                        model: AuditMission,
                        as: 'mission',
                        required: false,
                        include: [
                            {
                                model: Risk,
                                as: 'risk',
                                required: false,
                                include: [{ model: Department, as: 'departement', required: false }],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            })
            : [];

        const registry = risks.map((risk) => {
            const owner =
                buildDisplayName(risk.riskAgent) ||
                buildDisplayName(risk.riskManager) ||
                buildDisplayName(risk.responsableTraitement);

            return {
                id: risk.id,
                code: `CTRL-${String(risk.id).padStart(4, '0')}`,
                title: risk.dmrExistant || risk.titre,
                controlType: inferControlType(risk),
                executionType: isPeriodicFrequency(risk.frequenceTraitement) ? 'periodique' : 'ponctuel',
                department: risk.departement?.nom || 'Non rattache',
                linkedRisk: risk.titre,
                owner: owner || 'Non assigne',
                maturity: Math.max(1, Math.min(5, Math.round((risk.niveauCotationRisqueNet || risk.niveauCotationRisqueBrut || 40) / 128))),
                nextReview: risk.prochaineEcheance || risk.dateEcheance || null,
                status: isCompletedRiskStatus(risk.statut) ? 'maitrise' : 'a_revoir',
            };
        });

        const planning = [
            ...registry.map((control) => ({
                id: `control-${control.id}`,
                title: control.title,
                scheduleType: 'controle',
                cadence: control.executionType,
                dueDate: control.nextReview,
                department: control.department,
                owner: control.owner,
                status: control.status,
                linkLabel: control.linkedRisk,
            })),
            ...missions.map((mission) => ({
                id: `audit-${mission.id}`,
                title: mission.titre,
                scheduleType: 'audit',
                cadence: isPeriodicFrequency(mission.risk?.frequenceTraitement) ? 'periodique' : 'ponctuel',
                dueDate: mission.delai || null,
                department: mission.risk?.departement?.nom || 'Non rattache',
                owner: buildDisplayName(mission.auditeur) || buildDisplayName(mission.auditSenior),
                status: normalizeLookupValue(mission.statut) === 'en_retard' ? 'en_retard' : mission.statut,
                linkLabel: mission.risk?.titre || 'Mission transverse',
            })),
        ].sort((first, second) => {
            const firstTime = first.dueDate ? new Date(first.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
            const secondTime = second.dueDate ? new Date(second.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
            return firstTime - secondTime;
        });

        const evidenceEntries = [
            ...evidences.map((evidence: any) => ({
                id: `audit-${evidence.id}`,
                title: evidence.mission?.titre || evidence.filename,
                sourceType: 'audit',
                author: buildDisplayName(evidence.uploader),
                department: evidence.mission?.risk?.departement?.nom || 'Non rattache',
                linkedAudit: evidence.mission?.titre || null,
                uploadedAt: evidence.createdAt,
                filename: evidence.filename,
            })),
            ...risks
                .filter((risk) => Boolean(risk.pieceJustificative))
                .map((risk) => ({
                    id: `risk-${risk.id}`,
                    title: risk.titre,
                    sourceType: 'risque',
                    author: buildDisplayName(risk.riskManager),
                    department: risk.departement?.nom || 'Non rattache',
                    linkedAudit: null,
                    uploadedAt: risk.updatedAt,
                    filename: String(risk.pieceJustificative).split(/[\\/]/).pop() || 'justificatif',
                })),
            ...incidents
                .filter((incident) => Boolean(incident.pieceJointe))
                .map((incident) => ({
                    id: `incident-${incident.id}`,
                    title: incident.titre,
                    sourceType: 'incident',
                    author: buildDisplayName(incident.declareur),
                    department: risks.find((risk) => risk.departementId === incident.departementId)?.departement?.nom || 'Non rattache',
                    linkedAudit: null,
                    uploadedAt: incident.updatedAt,
                    filename: String(incident.pieceJointe).split(/[\\/]/).pop() || 'piece-jointe',
                })),
        ].sort((first, second) => new Date(second.uploadedAt).getTime() - new Date(first.uploadedAt).getTime());

        const effectiveness = registry.map((control) => {
            const linkedRisk = risks.find((risk) => risk.id === control.id);
            const linkedMission = missions
                .filter((mission) => mission.riskId === control.id && isCompletedMissionStatus(mission.statut))
                .sort((first, second) => new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime())[0];

            const referenceDate = linkedMission?.updatedAt || linkedRisk?.dernierTraitement || linkedRisk?.updatedAt;
            const relatedIncidents = incidents.filter((incident) => incident.riskId === control.id || incident.departementId === linkedRisk?.departementId);
            const beforeCount = referenceDate
                ? relatedIncidents.filter((incident) => new Date(incident.dateSurvenance).getTime() < new Date(referenceDate).getTime()).length
                : relatedIncidents.length;
            const afterCount = referenceDate
                ? relatedIncidents.filter((incident) => new Date(incident.dateSurvenance).getTime() >= new Date(referenceDate).getTime()).length
                : relatedIncidents.length;

            let score = 68;
            if (afterCount === 0) {
                score += 16;
            }
            if (afterCount < beforeCount) {
                score += 8;
            }
            if (afterCount > beforeCount) {
                score -= 18;
            }
            if (isCompletedRiskStatus(linkedRisk?.statut)) {
                score += 8;
            } else {
                score -= 6;
            }
            if (evidenceEntries.some((entry) => entry.id === `risk-${control.id}` || entry.linkedAudit === linkedMission?.titre)) {
                score += 6;
            }

            score = Math.max(25, Math.min(100, score));

            return {
                controlCode: control.code,
                title: control.title,
                implementationDate: referenceDate || null,
                incidentsBefore: beforeCount,
                incidentsAfter: afterCount,
                recurrenceTrend: afterCount < beforeCount ? 'en_baisse' : afterCount > beforeCount ? 'en_hausse' : 'stable',
                score,
            };
        }).sort((first, second) => second.score - first.score);

        const nonConformities = incidents
            .filter((incident) => isOpenIncidentStatus(incident.statut))
            .map((incident) => {
                const linkedRisk = risks.find((risk) => risk.id === incident.riskId);
                const severity = linkedRisk?.niveauRisque || incident.niveauRisque || 'medium';

                return {
                    id: incident.id,
                    title: incident.titre,
                    department: linkedRisk?.departement?.nom || risks.find((risk) => risk.departementId === incident.departementId)?.departement?.nom || 'Non rattache',
                    status: incident.statut,
                    severity,
                    dueDate: incident.dateEcheance || linkedRisk?.dateEcheance || null,
                    owner: buildDisplayName(incident.declareur),
                    source: linkedRisk ? linkedRisk.titre : 'Surveillance continue',
                };
            })
            .sort((first, second) => {
                const severityDelta = getSeverityWeight(second.severity) - getSeverityWeight(first.severity);
                if (severityDelta !== 0) {
                    return severityDelta;
                }

                const firstTime = first.dueDate ? new Date(first.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
                const secondTime = second.dueDate ? new Date(second.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
                return firstTime - secondTime;
            });

        const now = Date.now();
        const planningWithDueDates = planning.filter((item) => Boolean(item.dueDate));

        const summary = {
            totalControls: registry.length,
            periodicControls: registry.filter((control) => control.executionType === 'periodique').length,
            ponctualControls: registry.filter((control) => control.executionType === 'ponctuel').length,
            upcomingActions: planningWithDueDates.filter((item) => {
                const dueTime = new Date(item.dueDate as string).getTime();
                return dueTime >= now && dueTime <= now + 30 * 24 * 60 * 60 * 1000;
            }).length,
            overdueActions: planningWithDueDates.filter((item) => new Date(item.dueDate as string).getTime() < now).length,
            evidenceCount: evidenceEntries.length,
            effectivenessScore: effectiveness.length
                ? Math.round(effectiveness.reduce((total, item) => total + item.score, 0) / effectiveness.length)
                : 0,
            openNonConformities: nonConformities.length,
        };

        res.json({
            generatedAt: new Date().toISOString(),
            summary,
            registry,
            planning,
            evidence: evidenceEntries,
            effectiveness,
            nonConformities,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la preparation du module de controles internes',
            error: error?.message || 'unknown_error',
        });
    }
});

export default router;
