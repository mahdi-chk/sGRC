/**
 * @file auditing.service.ts
 * @description Service de gestion des missions d'audit et du plan annuel.
 */

import { AuditMission, AuditMissionStatus } from './audit-mission.model';
import { Risk } from '../risk/risk.model';
import { AIService } from '../ai/ai.service';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';
import { Notification, NotificationType } from '../notifications/notification.model';
import { emailService } from '../../utils/email.service';

export class AuditingService {
    /**
     * Suggérer un plan d'audit annuel via l'IA.
     */
    static async suggestAnnualPlan(role: UserRole = UserRole.AUDIT_SENIOR) {
        // Récupérer tous les risques non clôturés
        const risks = await Risk.findAll({
            where: { statut: ['Ouvert', 'En cours', 'Traité'] }
        });

        if (risks.length === 0) {
            throw new Error('Aucun risque disponible pour générer un plan d\'audit');
        }

        // Utiliser l'IA pour générer des suggestions de missions
        const suggestions = await AIService.generateAuditPlan(risks, role);
        return suggestions;
    }

    /**
     * Créer des missions d'audit à partir du plan généré.
     */
    static async createMissionsFromPlan(seniorId: number, missionsData: any[]) {
        const missions = [];
        for (const data of missionsData) {
            const mission = await AuditMission.create({
                ...data,
                auditSeniorId: seniorId,
                statut: AuditMissionStatus.A_VENIR,
                delai: new Date(Date.now() + (data.delaiSuggestion || 30) * 24 * 60 * 60 * 1000)
            });
            missions.push(mission);
        }
        return missions;
    }

    /**
     * Assigner une mission à un auditeur.
     */
    static async assignMission(missionId: number, auditeurId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        await mission.update({ auditeurId, statut: AuditMissionStatus.EN_COURS });

        // Notifications & Emails
        try {
            const auditeur = await User.findByPk(auditeurId);
            if (auditeur) {
                // Internal notification
                await Notification.create({
                    userId: auditeurId,
                    type: NotificationType.AUDIT_MISSION_ASSIGNED,
                    content: `Une nouvelle mission d'audit vous a été assignée : ${mission.titre}`,
                    auditMissionId: missionId
                });

                // Email notification
                await emailService.sendAuditMissionAssignedEmail(
                    { mail: auditeur.mail, nom: auditeur.nom, prenom: auditeur.prenom },
                    { titre: mission.titre, id: mission.id }
                );
            }
        } catch (error) {
            console.error('Error sending assignment notifications:', error);
        }

        return mission;
    }

    /**
     * Mettre à jour le rapport d'audit.
     */
    static async submitReport(missionId: number, auditeurId: number, reportData: { rapport: string, recommandations: string }) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        if (mission.auditeurId !== auditeurId) throw new Error('Action non autorisée');

        await mission.update({
            ...reportData,
            statut: AuditMissionStatus.TERMINE
        });

        // Notifications & Emails
        try {
            const senior = await User.findByPk(mission.auditSeniorId);
            const auditeur = await User.findByPk(auditeurId);
            if (senior && auditeur) {
                // Internal notification
                await Notification.create({
                    userId: senior.id,
                    type: NotificationType.AUDIT_REPORT_SUBMITTED,
                    content: `Un rapport d'audit a été soumis pour la mission : ${mission.titre}`,
                    auditMissionId: missionId
                });

                // Email notification
                await emailService.sendAuditReportSubmittedEmail(
                    { mail: senior.mail, nom: senior.nom, prenom: senior.prenom },
                    { titre: mission.titre, auditeurNom: `${auditeur.prenom} ${auditeur.nom}` }
                );
            }
        } catch (error) {
            console.error('Error sending report submission notifications:', error);
        }

        return mission;
    }

    /**
     * Supprimer une mission d'audit.
     */
    static async deleteMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        await mission.destroy();
        return { message: 'Mission supprimée avec succès' };
    }

    /**
     * Remettre une mission à zéro (reset).
     */
    static async resetMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        await mission.update({
            auditeurId: null,
            rapport: null,
            recommandations: null,
            statut: AuditMissionStatus.A_VENIR
        });
        return mission;
    }
}
