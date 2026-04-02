import { Request, Response } from 'express';
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

const countByLookup = async (model: any, columnName: string, alias: string) =>
    model.findAll({
        attributes: [
            [sequelize.col(columnName), alias],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: [sequelize.col(columnName)],
        raw: true,
    });

export class ReportingController {
    /**
     * Récupère les statistiques globales pour le tableau de bord
     */
    static async getDashboardStats(req: Request, res: Response) {
        try {
            // Comptage des Risques
            const totalRisks = await Risk.count();
            const risksByStatus = await countByLookup(Risk, 'statut_id', 'statutId');
            const risksByLevel = await countByLookup(Risk, 'niveau_risque_id', 'niveauRisqueId');

            // Comptage des Incidents
            const totalIncidents = await Incident.count();
            const incidentsByStatus = await countByLookup(Incident, 'statut_id', 'statutId');

            // Comptage des Missions d'Audit
            const totalAudits = await AuditMission.count();
            const auditsByStatus = await countByLookup(AuditMission, 'statut_id', 'statutId');

            // Éléments récents
            const recentRisks = await Risk.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
            const recentIncidents = await Incident.findAll({ limit: 5, order: [['createdAt', 'DESC']] });

            res.json({
                risks: {
                    total: totalRisks,
                    byStatus: mapLookupCounts(risksByStatus, 'statutId', 'risk.statut'),
                    byLevel: mapLookupCounts(risksByLevel, 'niveauRisqueId', 'risk.niveauRisque'),
                    recent: recentRisks
                },
                incidents: {
                    total: totalIncidents,
                    byStatus: mapLookupCounts(incidentsByStatus, 'statutId', 'incident.statut'),
                    recent: recentIncidents
                },
                audits: {
                    total: totalAudits,
                    byStatus: mapLookupCounts(auditsByStatus, 'statutId', 'auditMission.statut')
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la récupération des stats', error: error.message });
        }
    }

    /**
     * Récupère les indicateurs de performance (KPI)
     */
    static async getKpis(req: Request, res: Response) {
        try {
            const totalRisks = await Risk.count();
            const treatedRisks = await Risk.count({
                where: {
                    statutId: [
                        LookupResolutionService.getStaticValue('risk.statut', RiskStatus.TREATED)?.id,
                        LookupResolutionService.getStaticValue('risk.statut', RiskStatus.CLOSED)?.id,
                    ]
                }
            });
            const criticalRisks = await Risk.count({
                where: {
                    niveauRisqueId: LookupResolutionService.getStaticValue('risk.niveauRisque', RiskLevel.CRITICAL)?.id
                }
            });

            const totalIncidents = await Incident.count();
            const closedIncidents = await Incident.count({
                where: { statutId: LookupResolutionService.getStaticValue('incident.statut', IncidentStatus.CLOS)?.id }
            });

            const treatmentRate = totalRisks > 0 ? (treatedRisks / totalRisks) * 100 : 0;
            const incidentResolutionRate = totalIncidents > 0 ? (closedIncidents / totalIncidents) * 100 : 0;
            const riskCriticalityRate = totalRisks > 0 ? (criticalRisks / totalRisks) * 100 : 0;

            res.json([
                { id: 'risk_treatment', label: 'Taux de traitement des risques', value: Math.round(treatmentRate), unit: '%' },
                { id: 'incident_resolution', label: 'Taux de résolution des incidents', value: Math.round(incidentResolutionRate), unit: '%' },
                { id: 'critical_risk_ratio', label: 'Ratio de risques critiques', value: Math.round(riskCriticalityRate), unit: '%' },
                {
                    id: 'audit_completion',
                    label: 'Missions d\'audit terminées',
                    value: await AuditMission.count({
                        where: { statutId: LookupResolutionService.getStaticValue('auditMission.statut', AuditMissionStatus.TERMINE)?.id }
                    }),
                    unit: ''
                }
            ]);
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la récupération des KPI', error: error.message });
        }
    }

    /**
     * Récupère les données consolidées par entité (Département)
     */
    static async getMultiEntityData(req: Request, res: Response) {
        try {
            const data = await Department.findAll({
                include: [
                    {
                        model: Risk,
                        as: 'risks',
                        attributes: ['id', 'niveauRisqueId', 'statutId']
                    }
                ]
            });

            const consolidated = data.map(dept => {
                const risks = (dept as any).risks || [];
                return {
                    id: dept.id,
                    name: dept.nom,
                    riskCount: risks.length,
                    criticalRiskCount: risks.filter((r: any) => r.niveauRisque === RiskLevel.CRITICAL).length,
                    treatmentRate: risks.length > 0 
                        ? (risks.filter((r: any) => r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED).length / risks.length) * 100 
                        : 0
                };
            });

            res.json(consolidated);
        } catch (error: any) {
            res.status(500).json({ message: 'Erreur lors de la récupération des données multi-entités', error: error.message });
        }
    }

    /**
     * Endpoint pour l'export de données (Placeholder pour le moment)
     */
    static async generateExport(req: Request, res: Response) {
        res.json({ message: 'L\'export sera implémenté prochainement avec Excel/PDF.' });
    }
}
