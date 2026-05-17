import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Risk, RiskStatus, RiskLevel } from '../risk/risk.model';
import { Incident, IncidentStatus } from '../incidents/incident.model';
import { AuditMission, AuditMissionStatus } from '../auditing/audit-mission.model';
import { Department } from '../departments/department.model';
import sequelize from '../../database';
import { LookupResolutionService } from '../../database/lookups/lookup.service';

const mapLookupCounts = (rows: any[], field: string, lookupKey: string) =>
    rows.map((row) => {
        const id = Number(row?.[field] ?? row?.get?.(field));
        const count = Number(row?.count ?? row?.get?.('count'));
        const lookup = LookupResolutionService.getStaticValue(lookupKey, id);

        return {
            id,
            code: lookup?.code ?? null,
            label: lookup?.label ?? null,
            count,
        };
    });

const countByLookup = async (model: any, columnName: string, alias: string, where: any = {}) =>
    model.findAll({
        attributes: [
            [sequelize.col(columnName), alias],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where,
        group: [sequelize.col(columnName)],
        raw: true,
    });

const countRiskMatrix = async (where: any = {}) =>
    Risk.findAll({
        attributes: [
            [sequelize.col('niveau_risque_id'), 'niveauRisqueId'],
            [sequelize.col('statut_id'), 'statutId'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where,
        group: [sequelize.col('niveau_risque_id'), sequelize.col('statut_id')],
        raw: true,
    });

const getLookupId = (key: string, code: string): number | null =>
    LookupResolutionService.getStaticValue(key, code)?.id ?? null;

const compactIds = (ids: Array<number | null | undefined>): number[] =>
    ids.filter((id): id is number => typeof id === 'number');

const buildPeriodWhere = (period?: string) => {
    const normalized = (period || 'all').toString().toLowerCase();
    const days = normalized === '30' || normalized === '90' || normalized === '180' || normalized === '365'
        ? Number(normalized)
        : null;

    if (!days) {
        return { where: {}, label: 'Toutes les donnees' };
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return {
        where: {
            createdAt: {
                [Op.gte]: startDate,
            },
        },
        label: `Derniers ${days} jours`,
    };
};

const getMonthKey = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const getMonthLabel = (date: Date): string =>
    date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }).replace('.', '');

const buildMonthlyTrend = async () => {
    const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        date.setMonth(date.getMonth() - (5 - index));

        return {
            key: getMonthKey(date),
            label: getMonthLabel(date),
            risks: 0,
            incidents: 0,
            audits: 0,
        };
    });
    const firstMonth = new Date();
    firstMonth.setDate(1);
    firstMonth.setHours(0, 0, 0, 0);
    firstMonth.setMonth(firstMonth.getMonth() - 5);
    const indexByMonth = new Map(months.map((month, index) => [month.key, index]));
    const where = { createdAt: { [Op.gte]: firstMonth } };

    const [risks, incidents, audits] = await Promise.all([
        Risk.findAll({ attributes: ['createdAt'], where, raw: true }),
        Incident.findAll({ attributes: ['createdAt'], where, raw: true }),
        AuditMission.findAll({ attributes: ['createdAt'], where, raw: true }),
    ]);

    const increment = (rows: any[], field: 'risks' | 'incidents' | 'audits') => {
        rows.forEach((row) => {
            const date = new Date(row.createdAt);
            const monthIndex = indexByMonth.get(getMonthKey(date));
            if (monthIndex !== undefined) {
                months[monthIndex][field] += 1;
            }
        });
    };

    increment(risks, 'risks');
    increment(incidents, 'incidents');
    increment(audits, 'audits');

    return months;
};

const buildDomainStats = async (where: any, totalRisks: number) => {
    const rows = await Risk.findAll({
        attributes: [
            'domaine',
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where,
        group: ['domaine'],
        raw: true,
    });

    return rows
        .map((row: any) => ({
            label: row.domaine || 'Non defini',
            count: Number(row.count || 0),
            percent: totalRisks > 0 ? Math.round((Number(row.count || 0) / totalRisks) * 100) : 0,
        }))
        .sort((left, right) => right.count - left.count)
        .slice(0, 6);
};

const getRiskExposure = async (where: any, totalRisks: number) => {
    const riskRows = await Risk.findAll({
        attributes: ['niveauRisqueId', 'niveauCotationRisqueNet'],
        where,
        raw: true,
    });
    const weightsByCode: Record<string, number> = {
        [RiskLevel.LOW]: 1,
        [RiskLevel.LIMITED]: 2,
        [RiskLevel.MEDIUM]: 3,
        [RiskLevel.HIGH]: 4,
        [RiskLevel.CRITICAL]: 5,
    };
    const weightedScore = riskRows.reduce((total, row: any) => {
        const lookup = LookupResolutionService.getStaticValue('risk.niveauRisque', row.niveauRisqueId);
        return total + (weightsByCode[lookup?.code || ''] || 0);
    }, 0);
    const numericScores = riskRows
        .map((row: any) => Number(row.niveauCotationRisqueNet))
        .filter((score: number) => Number.isFinite(score) && score > 0);

    return {
        score: totalRisks > 0 ? Math.round((weightedScore / (totalRisks * 5)) * 100) : 0,
        averageNetScore: numericScores.length > 0
            ? Math.round(numericScores.reduce((total: number, score: number) => total + score, 0) / numericScores.length)
            : 0,
    };
};

export class ReportingController {
    static async getDashboardStats(req: Request, res: Response) {
        try {
            const period = buildPeriodWhere(req.query.period as string | undefined);
            const baseWhere = period.where;
            const now = new Date();
            const soon = new Date();
            soon.setDate(soon.getDate() + 30);
            const treatedRiskStatusIds = compactIds([
                getLookupId('risk.statut', RiskStatus.TREATED),
                getLookupId('risk.statut', RiskStatus.CLOSED),
            ]);
            const openRiskStatusWhere = treatedRiskStatusIds.length > 0
                ? { statutId: { [Op.notIn]: treatedRiskStatusIds } }
                : {};
            const closedIncidentStatusId = getLookupId('incident.statut', IncidentStatus.CLOS);
            const openIncidentStatusWhere = closedIncidentStatusId
                ? { statutId: { [Op.ne]: closedIncidentStatusId } }
                : {};
            const completedAuditStatusId = getLookupId('auditMission.statut', AuditMissionStatus.TERMINE);
            const openAuditStatusWhere = completedAuditStatusId
                ? { statutId: { [Op.ne]: completedAuditStatusId } }
                : {};
            const highExposureLevelIds = compactIds([
                getLookupId('risk.niveauRisque', RiskLevel.CRITICAL),
                getLookupId('risk.niveauRisque', RiskLevel.HIGH),
            ]);

            const totalRisks = await Risk.count({ where: baseWhere });
            const risksByStatus = await countByLookup(Risk, 'statut_id', 'statutId', baseWhere);
            const risksByLevel = await countByLookup(Risk, 'niveau_risque_id', 'niveauRisqueId', baseWhere);
            const riskMatrix = await countRiskMatrix(baseWhere);
            const riskDomainStats = await buildDomainStats(baseWhere, totalRisks);
            const riskExposure = await getRiskExposure(baseWhere, totalRisks);
            const openCriticalRisks = highExposureLevelIds.length > 0
                ? await Risk.count({
                    where: {
                        ...baseWhere,
                        ...openRiskStatusWhere,
                        niveauRisqueId: { [Op.in]: highExposureLevelIds },
                    },
                })
                : 0;
            const overdueRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    ...openRiskStatusWhere,
                    [Op.or]: [
                        { prochaineEcheance: { [Op.lt]: now } },
                        {
                            [Op.and]: [
                                { prochaineEcheance: null },
                                { dateEcheance: { [Op.lt]: now } },
                            ],
                        },
                    ],
                },
            });
            const dueSoonRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    ...openRiskStatusWhere,
                    [Op.or]: [
                        { prochaineEcheance: { [Op.between]: [now, soon] } },
                        {
                            [Op.and]: [
                                { prochaineEcheance: null },
                                { dateEcheance: { [Op.between]: [now, soon] } },
                            ],
                        },
                    ],
                },
            });
            const unassignedRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    riskAgentId: null,
                },
            });

            const totalIncidents = await Incident.count({ where: baseWhere });
            const incidentsByStatus = await countByLookup(Incident, 'statut_id', 'statutId', baseWhere);
            const incidentsByLevel = await countByLookup(Incident, 'niveau_risque_id', 'niveauRisqueId', baseWhere);
            const openIncidents = await Incident.count({
                where: {
                    ...baseWhere,
                    ...openIncidentStatusWhere,
                },
            });
            const overdueIncidents = await Incident.count({
                where: {
                    ...baseWhere,
                    ...openIncidentStatusWhere,
                    dateEcheance: { [Op.lt]: now },
                },
            });

            const totalAudits = await AuditMission.count({ where: baseWhere });
            const auditsByStatus = await countByLookup(AuditMission, 'statut_id', 'statutId', baseWhere);
            const completedAudits = completedAuditStatusId
                ? await AuditMission.count({ where: { ...baseWhere, statutId: completedAuditStatusId } })
                : 0;
            const inProgressAuditStatusId = getLookupId('auditMission.statut', AuditMissionStatus.EN_COURS);
            const inProgressAudits = inProgressAuditStatusId
                ? await AuditMission.count({ where: { ...baseWhere, statutId: inProgressAuditStatusId } })
                : 0;
            const overdueAudits = await AuditMission.count({
                where: {
                    ...baseWhere,
                    ...openAuditStatusWhere,
                    [Op.or]: [
                        { delai: { [Op.lt]: now } },
                        { datePrevueFin: { [Op.lt]: now } },
                    ],
                },
            });
            const auditProgressRows = await AuditMission.findAll({
                attributes: ['progressPercent'],
                where: baseWhere,
                raw: true,
            });
            const auditProgressValues = auditProgressRows
                .map((row: any) => Number(row.progressPercent))
                .filter((value: number) => Number.isFinite(value));
            const averageAuditProgress = auditProgressValues.length > 0
                ? Math.round(auditProgressValues.reduce((total: number, value: number) => total + value, 0) / auditProgressValues.length)
                : 0;
            const monthlyTrend = await buildMonthlyTrend();

            const recentRisks = await Risk.findAll({ where: baseWhere, limit: 5, order: [['createdAt', 'DESC']] });
            const recentIncidents = await Incident.findAll({ where: baseWhere, limit: 5, order: [['createdAt', 'DESC']] });

            res.json({
                filters: {
                    period: req.query.period || 'all',
                    periodLabel: period.label,
                },
                risks: {
                    total: totalRisks,
                    byStatus: mapLookupCounts(risksByStatus, 'statutId', 'risk.statut'),
                    byLevel: mapLookupCounts(risksByLevel, 'niveauRisqueId', 'risk.niveauRisque'),
                    byDomain: riskDomainStats,
                    matrix: riskMatrix.map((row: any) => {
                        const niveauRisqueId = Number(row?.niveauRisqueId ?? row?.get?.('niveauRisqueId'));
                        const statutId = Number(row?.statutId ?? row?.get?.('statutId'));
                        const levelLookup = LookupResolutionService.getStaticValue('risk.niveauRisque', niveauRisqueId);
                        const statusLookup = LookupResolutionService.getStaticValue('risk.statut', statutId);

                        return {
                            levelId: niveauRisqueId,
                            levelCode: levelLookup?.code ?? null,
                            levelLabel: levelLookup?.label ?? null,
                            statusId: statutId,
                            statusCode: statusLookup?.code ?? null,
                            statusLabel: statusLookup?.label ?? null,
                            count: Number(row?.count ?? row?.get?.('count') ?? 0),
                        };
                    }),
                    deadlines: {
                        overdue: overdueRisks,
                        dueSoon: dueSoonRisks,
                        unassigned: unassignedRisks,
                    },
                    exposure: {
                        ...riskExposure,
                        openCritical: openCriticalRisks,
                    },
                    recent: recentRisks,
                },
                incidents: {
                    total: totalIncidents,
                    byStatus: mapLookupCounts(incidentsByStatus, 'statutId', 'incident.statut'),
                    byLevel: mapLookupCounts(incidentsByLevel, 'niveauRisqueId', 'incident.niveauRisque'),
                    sla: {
                        open: openIncidents,
                        overdue: overdueIncidents,
                    },
                    recent: recentIncidents,
                },
                audits: {
                    total: totalAudits,
                    byStatus: mapLookupCounts(auditsByStatus, 'statutId', 'auditMission.statut'),
                    progress: {
                        average: averageAuditProgress,
                        completed: completedAudits,
                        inProgress: inProgressAudits,
                        overdue: overdueAudits,
                    },
                },
                trend: monthlyTrend,
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la recuperation des stats', error: error.message });
        }
    }

    static async getKpis(req: Request, res: Response) {
        try {
            const period = buildPeriodWhere(req.query.period as string | undefined);
            const baseWhere = period.where;
            const now = new Date();
            const treatedRiskStatusIds = compactIds([
                getLookupId('risk.statut', RiskStatus.TREATED),
                getLookupId('risk.statut', RiskStatus.CLOSED),
            ]);
            const totalRisks = await Risk.count({ where: baseWhere });
            const treatedRisks = treatedRiskStatusIds.length > 0
                ? await Risk.count({ where: { ...baseWhere, statutId: { [Op.in]: treatedRiskStatusIds } } })
                : 0;
            const criticalRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    niveauRisqueId: getLookupId('risk.niveauRisque', RiskLevel.CRITICAL),
                },
            });
            const openCriticalRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    niveauRisqueId: getLookupId('risk.niveauRisque', RiskLevel.CRITICAL),
                    ...(treatedRiskStatusIds.length > 0 ? { statutId: { [Op.notIn]: treatedRiskStatusIds } } : {}),
                },
            });
            const overdueRisks = await Risk.count({
                where: {
                    ...baseWhere,
                    ...(treatedRiskStatusIds.length > 0 ? { statutId: { [Op.notIn]: treatedRiskStatusIds } } : {}),
                    [Op.or]: [
                        { prochaineEcheance: { [Op.lt]: now } },
                        {
                            [Op.and]: [
                                { prochaineEcheance: null },
                                { dateEcheance: { [Op.lt]: now } },
                            ],
                        },
                    ],
                },
            });

            const totalIncidents = await Incident.count({ where: baseWhere });
            const closedIncidentStatusId = getLookupId('incident.statut', IncidentStatus.CLOS);
            const closedIncidents = closedIncidentStatusId
                ? await Incident.count({ where: { ...baseWhere, statutId: closedIncidentStatusId } })
                : 0;
            const overdueIncidents = await Incident.count({
                where: {
                    ...baseWhere,
                    ...(closedIncidentStatusId ? { statutId: { [Op.ne]: closedIncidentStatusId } } : {}),
                    dateEcheance: { [Op.lt]: now },
                },
            });

            const totalAudits = await AuditMission.count({ where: baseWhere });
            const completedAuditStatusId = getLookupId('auditMission.statut', AuditMissionStatus.TERMINE);
            const completedAudits = completedAuditStatusId
                ? await AuditMission.count({ where: { ...baseWhere, statutId: completedAuditStatusId } })
                : 0;
            const overdueAudits = await AuditMission.count({
                where: {
                    ...baseWhere,
                    ...(completedAuditStatusId ? { statutId: { [Op.ne]: completedAuditStatusId } } : {}),
                    [Op.or]: [
                        { delai: { [Op.lt]: now } },
                        { datePrevueFin: { [Op.lt]: now } },
                    ],
                },
            });

            const riskExposure = await getRiskExposure(baseWhere, totalRisks);
            const treatmentRate = totalRisks > 0 ? (treatedRisks / totalRisks) * 100 : 0;
            const incidentResolutionRate = totalIncidents > 0 ? (closedIncidents / totalIncidents) * 100 : 0;
            const riskCriticalityRate = totalRisks > 0 ? (criticalRisks / totalRisks) * 100 : 0;
            const auditCompletionRate = totalAudits > 0 ? (completedAudits / totalAudits) * 100 : 0;

            res.json([
                {
                    id: 'risk_treatment',
                    label: 'Taux de traitement des risques',
                    value: Math.round(treatmentRate),
                    unit: '%',
                    target: 85,
                    status: treatmentRate >= 85 ? 'good' : treatmentRate >= 60 ? 'warning' : 'critical',
                    category: 'Risques',
                    description: `${treatedRisks}/${totalRisks} risques traites ou clotures`,
                },
                {
                    id: 'incident_resolution',
                    label: 'Taux de resolution des incidents',
                    value: Math.round(incidentResolutionRate),
                    unit: '%',
                    target: 90,
                    status: incidentResolutionRate >= 90 ? 'good' : incidentResolutionRate >= 70 ? 'warning' : 'critical',
                    category: 'Incidents',
                    description: `${closedIncidents}/${totalIncidents} incidents clos`,
                },
                {
                    id: 'critical_risk_ratio',
                    label: 'Ratio de risques critiques',
                    value: Math.round(riskCriticalityRate),
                    unit: '%',
                    target: 10,
                    status: riskCriticalityRate <= 10 ? 'good' : riskCriticalityRate <= 25 ? 'warning' : 'critical',
                    category: 'Risques',
                    description: `${criticalRisks} risque(s) critique(s), dont ${openCriticalRisks} ouvert(s)`,
                    inverseTarget: true,
                },
                {
                    id: 'risk_exposure',
                    label: 'Score d exposition risque',
                    value: riskExposure.score,
                    unit: '%',
                    target: 35,
                    status: riskExposure.score <= 35 ? 'good' : riskExposure.score <= 60 ? 'warning' : 'critical',
                    category: 'Risques',
                    description: `Score net moyen: ${riskExposure.averageNetScore}`,
                    inverseTarget: true,
                },
                {
                    id: 'overdue_risks',
                    label: 'Risques en retard',
                    value: overdueRisks,
                    unit: '',
                    target: 0,
                    status: overdueRisks === 0 ? 'good' : overdueRisks <= 3 ? 'warning' : 'critical',
                    category: 'Echeances',
                    description: 'Risques ouverts avec echeance depassee',
                    inverseTarget: true,
                },
                {
                    id: 'incident_sla',
                    label: 'Incidents hors delai',
                    value: overdueIncidents,
                    unit: '',
                    target: 0,
                    status: overdueIncidents === 0 ? 'good' : overdueIncidents <= 3 ? 'warning' : 'critical',
                    category: 'Incidents',
                    description: 'Incidents non clos avec date echeance depassee',
                    inverseTarget: true,
                },
                {
                    id: 'audit_completion',
                    label: 'Avancement audit',
                    value: Math.round(auditCompletionRate),
                    unit: '%',
                    target: 75,
                    status: auditCompletionRate >= 75 ? 'good' : auditCompletionRate >= 50 ? 'warning' : 'critical',
                    category: 'Audit',
                    description: `${completedAudits}/${totalAudits} missions terminees`,
                },
                {
                    id: 'audit_overdue',
                    label: 'Audits en retard',
                    value: overdueAudits,
                    unit: '',
                    target: 0,
                    status: overdueAudits === 0 ? 'good' : overdueAudits <= 2 ? 'warning' : 'critical',
                    category: 'Audit',
                    description: 'Missions ouvertes avec delai depasse',
                    inverseTarget: true,
                },
            ]);
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la recuperation des KPI', error: error.message });
        }
    }

    static async getMultiEntityData(req: Request, res: Response) {
        try {
            const criticalRiskLevelId = getLookupId('risk.niveauRisque', RiskLevel.CRITICAL);
            const treatedRiskStatusIds = compactIds([
                getLookupId('risk.statut', RiskStatus.TREATED),
                getLookupId('risk.statut', RiskStatus.CLOSED),
            ]);
            const data = await Department.findAll({
                include: [
                    {
                        model: Risk,
                        as: 'risks',
                        attributes: ['id', 'niveauRisqueId', 'statutId'],
                    },
                ],
            });

            const consolidated = data.map((dept) => {
                const risks = (dept as any).risks || [];
                return {
                    id: dept.id,
                    name: dept.nom,
                    riskCount: risks.length,
                    criticalRiskCount: risks.filter((risk: any) => risk.niveauRisqueId === criticalRiskLevelId).length,
                    treatmentRate: risks.length > 0
                        ? (risks.filter((risk: any) => treatedRiskStatusIds.includes(risk.statutId)).length / risks.length) * 100
                        : 0,
                };
            });

            res.json(consolidated);
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la recuperation des donnees multi-entites', error: error.message });
        }
    }

    static async generateExport(req: Request, res: Response) {
        res.json({ message: 'L export sera implemente prochainement avec Excel/PDF.' });
    }
}
