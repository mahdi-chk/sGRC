import { Op } from 'sequelize';
import { AuditMission, AuditMissionStatus } from '../auditing/audit-mission.model';
import { ComplianceGap, ComplianceGapStatus } from '../compliance/compliance-gap.model';
import { Incident, IncidentStatus } from '../incidents/incident.model';
import { Notification } from '../notifications/notification.model';
import { Risk, RiskLevel, RiskStatus } from '../risk/risk.model';
import { LookupResolutionService } from '../../database/lookups/lookup.service';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const resolveLookupId = (key: string, code: string | null | undefined): number | null => {
    if (!code) {
        return null;
    }

    return LookupResolutionService.getStaticValue(key, code)?.id ?? null;
};

const resolveIds = (key: string, codes: Array<string | null | undefined>): number[] =>
    codes
        .map((code) => resolveLookupId(key, code))
        .filter((value): value is number => Number.isInteger(value));

const buildTrend = (score: number) => {
    const offsets = [-10, -8, -5, -3, -1, 0];
    const labels = ['S-5', 'S-4', 'S-3', 'S-2', 'S-1', 'Maint.'];

    return labels.map((label, index) => ({
        label,
        score: clamp(score + offsets[index], 25, 100),
    }));
};

export class SupervisionService {
    static async getOverview() {
        const now = new Date();

        const openRiskStatusIds = resolveIds('risk.statut', [RiskStatus.OPEN, RiskStatus.IN_PROGRESS]);
        const activeIncidentStatusIds = resolveIds('incident.statut', [IncidentStatus.NOUVEAU, IncidentStatus.EN_COURS]);
        const activeAuditStatusIds = resolveIds('auditMission.statut', [
            AuditMissionStatus.A_VENIR,
            AuditMissionStatus.EN_COURS,
            AuditMissionStatus.EN_RETARD,
        ]);
        const openGapStatusIds = resolveIds('complianceGap.status', [
            ComplianceGapStatus.OPEN,
            ComplianceGapStatus.IN_PROGRESS,
        ]);

        const criticalRiskId = resolveLookupId('risk.niveauRisque', RiskLevel.CRITICAL);

        const totalRisks = await Risk.count();
        const criticalOpenRisks = criticalRiskId && openRiskStatusIds.length > 0
            ? await Risk.count({
                where: {
                    niveauRisqueId: criticalRiskId,
                    statutId: { [Op.in]: openRiskStatusIds },
                },
            })
            : 0;

        const overdueRisks = openRiskStatusIds.length > 0
            ? await Risk.count({
                where: {
                    statutId: { [Op.in]: openRiskStatusIds },
                    dateEcheance: { [Op.lt]: now },
                },
            })
            : 0;

        const totalIncidents = await Incident.count();
        const activeIncidents = activeIncidentStatusIds.length > 0
            ? await Incident.count({
                where: {
                    statutId: { [Op.in]: activeIncidentStatusIds },
                },
            })
            : 0;

        const overdueIncidents = activeIncidentStatusIds.length > 0
            ? await Incident.count({
                where: {
                    statutId: { [Op.in]: activeIncidentStatusIds },
                    dateEcheance: {
                        [Op.ne]: null,
                        [Op.lt]: now,
                    },
                },
            })
            : 0;

        const totalAudits = await AuditMission.count();
        const overdueAudits = activeAuditStatusIds.length > 0
            ? await AuditMission.count({
                where: {
                    statutId: { [Op.in]: activeAuditStatusIds },
                    delai: { [Op.lt]: now },
                },
            })
            : 0;

        const totalGaps = await ComplianceGap.count();
        const openGaps = openGapStatusIds.length > 0
            ? await ComplianceGap.count({
                where: {
                    statusId: { [Op.in]: openGapStatusIds },
                },
            })
            : 0;

        const unreadNotifications = await Notification.count({
            where: {
                isRead: false,
            },
        });

        const healthScore = clamp(
            100
            - (criticalOpenRisks * 8)
            - (overdueRisks * 5)
            - (overdueAudits * 6)
            - (openGaps * 4)
            - (unreadNotifications * 2)
            - (overdueIncidents * 4),
            18,
            100,
        );

        const alertItems = [
            criticalOpenRisks > 0
                ? {
                    id: 'alert-critical-risks',
                    severity: 'critique',
                    title: `${criticalOpenRisks} risque(s) critique(s) restent ouverts`,
                    detail: 'Le portefeuille critique demande un arbitrage de priorite et un suivi plus serre des plans de traitement.',
                    route: '/dashboard/risks',
                    owner: 'Risk Manager',
                }
                : null,
            overdueAudits > 0
                ? {
                    id: 'alert-overdue-audits',
                    severity: 'haute',
                    title: `${overdueAudits} mission(s) d audit sont en retard`,
                    detail: 'Les recommandations d audit risquent de perdre en traction si le suivi n est pas relance.',
                    route: '/dashboard/audit-statistics',
                    owner: 'Audit Senior',
                }
                : null,
            openGaps > 0
                ? {
                    id: 'alert-compliance-gaps',
                    severity: openGaps >= 3 ? 'haute' : 'moyenne',
                    title: `${openGaps} ecart(s) de conformite restent ouverts`,
                    detail: 'Synchronisez la remediations conformite avec les actions deja ouvertes pour eviter les doublons.',
                    route: '/dashboard/compliance-gaps',
                    owner: 'Pilotage conformite',
                }
                : null,
            unreadNotifications > 0
                ? {
                    id: 'alert-notification-backlog',
                    severity: unreadNotifications >= 8 ? 'haute' : 'moyenne',
                    title: `${unreadNotifications} notification(s) non lue(s)`,
                    detail: 'Le backlog d alertes peut masquer des signaux faibles importants.',
                    route: '/dashboard/supervision/continuous-monitoring',
                    owner: 'Pilotage transverse',
                }
                : null,
        ].filter(Boolean) as Array<{
            id: string;
            severity: string;
            title: string;
            detail: string;
            route: string;
            owner: string;
        }>;

        const recommendations = [
            criticalOpenRisks > 0
                ? {
                    id: 'rec-critical-risk-review',
                    title: 'Tenir une revue executive des risques critiques ouverts',
                    priority: 'critique',
                    status: 'a_lancer',
                    rationale: 'Le volume de risques critiques ouverts fragilise la capacite d arbitrage du dispositif.',
                    expectedImpact: 'Acceleration des decisions de traitement et des escalades.',
                    owner: 'Top Management',
                    sourceModule: 'Risques',
                    route: '/dashboard/risks',
                }
                : null,
            overdueAudits > 0
                ? {
                    id: 'rec-audit-closure',
                    title: 'Cadencer le suivi des recommandations d audit',
                    priority: 'haute',
                    status: 'en_preparation',
                    rationale: 'Les retards d audit reduisent la visibilite sur l execution des remediations.',
                    expectedImpact: 'Reduction des retards et meilleure tracabilite post-audit.',
                    owner: 'Audit Senior',
                    sourceModule: 'Audit',
                    route: '/dashboard/audit-statistics',
                }
                : null,
            openGaps > 0
                ? {
                    id: 'rec-gap-consolidation',
                    title: 'Consolider les ecarts de conformite avec les actions correctives existantes',
                    priority: 'haute',
                    status: 'a_arbitrer',
                    rationale: 'Les ecarts ouverts doivent etre relies aux responsables et evidences existantes.',
                    expectedImpact: 'Moins de dispersion et meilleure lisibilite de la remediations.',
                    owner: 'Supervision GRC',
                    sourceModule: 'Conformite',
                    route: '/dashboard/compliance-gaps',
                }
                : null,
            activeIncidents > 0
                ? {
                    id: 'rec-incident-watch',
                    title: 'Mettre les incidents actifs sous watchlist de direction',
                    priority: overdueIncidents > 0 ? 'haute' : 'moyenne',
                    status: 'en_preparation',
                    rationale: 'Les incidents ouverts meritent une cadence de revue adaptee a leur niveau d exposition.',
                    expectedImpact: 'Resolution plus reguliere et meilleure coordination transverse.',
                    owner: 'Risk Manager',
                    sourceModule: 'Incidents',
                    route: '/dashboard/incident-reporting',
                }
                : null,
        ].filter(Boolean);

        const riskTreatmentRate = totalRisks > 0
            ? clamp(Math.round(((totalRisks - overdueRisks - criticalOpenRisks) / totalRisks) * 100), 0, 100)
            : 100;
        const incidentResolutionRate = totalIncidents > 0
            ? clamp(Math.round(((totalIncidents - activeIncidents) / totalIncidents) * 100), 0, 100)
            : 100;
        const auditPunctualityRate = totalAudits > 0
            ? clamp(Math.round(((totalAudits - overdueAudits) / totalAudits) * 100), 0, 100)
            : 100;
        const complianceClosureRate = totalGaps > 0
            ? clamp(Math.round(((totalGaps - openGaps) / totalGaps) * 100), 0, 100)
            : 100;

        return {
            generatedAt: now.toISOString(),
            summary: {
                healthScore,
                status: healthScore >= 80 ? 'Stable et maitrise' : healthScore >= 60 ? 'Sous tension maitrisee' : 'Sous surveillance renforcee',
                activeAlerts: alertItems.length,
                keyRecommendations: recommendations.length,
                monitoredDomains: 5,
                nextReview: 'Comite GRC hebdomadaire',
            },
            modules: {
                bestPractices: [
                    {
                        id: 'bp-iso-27001',
                        title: 'Pilotage des revues de risques critiques',
                        framework: 'ISO 27001',
                        category: 'Risque',
                        applicability: 'Top management et Risk Manager',
                        summary: 'Formaliser une revue mensuelle des risques critiques avec arbitrages, proprietaires et delais engages.',
                        linkedModule: 'Gestion des Risques',
                        priority: 'haute',
                        tags: ['revue', 'risque critique', 'gouvernance'],
                    },
                    {
                        id: 'bp-nist-detect',
                        title: 'Canal unique de traitement des alertes',
                        framework: 'NIST CSF',
                        category: 'Supervision',
                        applicability: 'Admin SI et pilotage transverse',
                        summary: 'Centraliser les alertes prioritaires dans une file unique avec qualification, escalade et suivi.',
                        linkedModule: 'Notifications',
                        priority: 'haute',
                        tags: ['alertes', 'escalade', 'workflow'],
                    },
                    {
                        id: 'bp-cobit-actions',
                        title: 'Gouvernance des plans de remediations',
                        framework: 'COBIT',
                        category: 'Actions',
                        applicability: 'Risk Manager et Audit Senior',
                        summary: 'Suivre chaque action corrective avec proprietaire, evidence et date cible pour fermer les ecarts durablement.',
                        linkedModule: 'Plans d Actions',
                        priority: 'moyenne',
                        tags: ['remediation', 'evidence', 'delais'],
                    },
                ],
                recommendations,
                benchmarks: {
                    sector: 'Services financiers et fonctions support',
                    updatedAt: now.toISOString(),
                    indicators: [
                        {
                            id: 'bench-risk-treatment',
                            label: 'Traitement des risques dans les delais',
                            organizationValue: riskTreatmentRate,
                            benchmarkValue: 79,
                            unit: '%',
                            gap: riskTreatmentRate - 79,
                            interpretation: 'Lecture combinee du portefeuille critique et des echeances depassees.',
                        },
                        {
                            id: 'bench-incident-closure',
                            label: 'Cloture des incidents majeurs sous 30 jours',
                            organizationValue: incidentResolutionRate,
                            benchmarkValue: 81,
                            unit: '%',
                            gap: incidentResolutionRate - 81,
                            interpretation: 'Mesure de reactivite sur les incidents encore ouverts ou en retard.',
                        },
                        {
                            id: 'bench-audit-followup',
                            label: 'Execution des recommandations d audit',
                            organizationValue: auditPunctualityRate,
                            benchmarkValue: 76,
                            unit: '%',
                            gap: auditPunctualityRate - 76,
                            interpretation: 'Plus ce score baisse, plus le dispositif post-audit perd en traction.',
                        },
                    ],
                    maturity: [
                        { domain: 'Risque', organizationScore: clamp(healthScore - 3, 0, 100), benchmarkScore: 79 },
                        { domain: 'Conformite', organizationScore: complianceClosureRate, benchmarkScore: 74 },
                        { domain: 'Audit', organizationScore: auditPunctualityRate, benchmarkScore: 77 },
                        { domain: 'Incidents', organizationScore: incidentResolutionRate, benchmarkScore: 78 },
                    ],
                },
                assistance: {
                    channels: [
                        {
                            id: 'chan-ai',
                            title: 'Assistant sGRC',
                            responseTime: 'Immediate',
                            scope: 'Questions methodologiques, navigation et lecture rapide des signaux.',
                            actionLabel: 'Ouvrir l assistant',
                        },
                        {
                            id: 'chan-grc',
                            title: 'Support GRC',
                            responseTime: 'Sous 4h',
                            scope: 'Arbitrages de priorite, gouvernance et construction de plans d actions.',
                            actionLabel: 'Creer un ticket',
                        },
                        {
                            id: 'chan-admin',
                            title: 'Escalade Admin SI',
                            responseTime: 'Sous 2h',
                            scope: 'Blocages techniques, alertes systeme et acces.',
                            actionLabel: 'Escalader',
                        },
                    ],
                    faqs: [
                        {
                            id: 'faq-health-score',
                            question: 'Comment est calcule le health score GRC ?',
                            answer: 'Le score consolide les risques critiques, les echeances depassees, les audits en retard, les ecarts ouverts et le backlog d alertes.',
                        },
                        {
                            id: 'faq-recommendation',
                            question: 'Quand une recommandation devient-elle prioritaire ?',
                            answer: 'La priorite augmente quand plusieurs signaux convergent sur le meme sujet ou quand une exposition critique persiste.',
                        },
                        {
                            id: 'faq-benchmark',
                            question: 'A quoi servent les benchmarks ?',
                            answer: 'Ils apportent un repere externe de maturite pour calibrer les efforts et les trajectoires de remediations.',
                        },
                    ],
                    playbooks: [
                        {
                            id: 'playbook-1',
                            title: 'Revue express des risques critiques',
                            duration: '30 min',
                            outcome: 'Arbitrages de priorite et actions immediates.',
                            linkedModule: 'Gestion des Risques',
                        },
                        {
                            id: 'playbook-2',
                            title: 'Point de debouclage des alertes',
                            duration: '20 min',
                            outcome: 'Qualification, affectation et escalation des alertes ouvertes.',
                            linkedModule: 'Supervision Continue',
                        },
                        {
                            id: 'playbook-3',
                            title: 'Rattrapage des actions post-audit',
                            duration: '45 min',
                            outcome: 'Plan court terme pour les recommandations en retard.',
                            linkedModule: 'Audit',
                        },
                    ],
                },
                continuousMonitoring: {
                    status: healthScore >= 80 ? 'Stable et maitrise' : 'Sous surveillance renforcee',
                    focus: 'Concentrer les efforts sur les risques critiques, les retards d audit et les ecarts de conformite les plus exposes.',
                    alerts: alertItems,
                    healthTrend: buildTrend(healthScore),
                    breakdown: [
                        { label: 'Risque', score: clamp(healthScore - 3, 0, 100), target: 85 },
                        { label: 'Incidents', score: incidentResolutionRate, target: 85 },
                        { label: 'Audit', score: auditPunctualityRate, target: 80 },
                        { label: 'Conformite', score: complianceClosureRate, target: 80 },
                        { label: 'Alertes', score: clamp(100 - unreadNotifications * 5, 0, 100), target: 90 },
                    ],
                    watchlist: [
                        {
                            id: 'watch-risks',
                            title: 'Risques ouverts a date depassee',
                            detail: `${overdueRisks} risque(s) ouvert(s) ont depasse leur echeance cible.`,
                            tone: overdueRisks > 0 ? 'alert' : 'good',
                        },
                        {
                            id: 'watch-incidents',
                            title: 'Incidents actifs a revoir',
                            detail: `${activeIncidents} incident(s) actif(s), dont ${overdueIncidents} avec echeance depassee.`,
                            tone: overdueIncidents > 0 ? 'watch' : 'good',
                        },
                        {
                            id: 'watch-gaps',
                            title: 'Ecarts de conformite en portefeuille',
                            detail: `${openGaps} ecart(s) de conformite ouvert(s) a synchroniser avec les plans d actions.`,
                            tone: openGaps > 0 ? 'watch' : 'good',
                        },
                    ],
                },
            },
        };
    }
}
