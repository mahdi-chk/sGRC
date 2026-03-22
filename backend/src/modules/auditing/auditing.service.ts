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
import { AuditChecklistTemplate, AuditChecklistTemplateItem } from './audit-checklist-template.model';
import { AuditMissionChecklistItem } from './audit-mission-checklist.model';
import { AuditEvidence } from './audit-evidence.model';
import fs from 'fs';

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
    static async updateMission(missionId: number, data: any) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        
        // Autoriser la modification du titre, objectifs, responsabilités, délai et statut
        await mission.update(data);
        
        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk'] });
    }

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
        
        // Supprimer aussi les checklists instanciées
        await AuditMissionChecklistItem.destroy({ where: { missionId } });
        
        return mission;
    }

    /**
     * --- CHECKLISTS TEMPLATES ---
     */

    static async getChecklistTemplates() {
        return await AuditChecklistTemplate.findAll({
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
    }

    static async createChecklistTemplate(userId: number, data: { titre: string, description?: string, items: string[] }) {
        const template = await AuditChecklistTemplate.create({
            titre: data.titre,
            description: data.description,
            createdById: userId
        });

        if (data.items && data.items.length > 0) {
            const itemsData = data.items.map(texte => ({ templateId: template.id, texte }));
            await AuditChecklistTemplateItem.bulkCreate(itemsData);
        }

        return await AuditChecklistTemplate.findByPk(template.id, {
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
    }

    static async deleteChecklistTemplate(templateId: number) {
        const template = await AuditChecklistTemplate.findByPk(templateId);
        if (!template) throw new Error('Template non trouvé');
        await template.destroy();
        return { message: 'Template supprimé avec succès' };
    }

    /**
     * --- MISSION CHECKLISTS ---
     */

    static async getMissionChecklistItems(missionId: number) {
        return await AuditMissionChecklistItem.findAll({
            where: { missionId },
            order: [['createdAt', 'ASC']]
        });
    }

    static async assignTemplateToMission(missionId: number, templateId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        const template = await AuditChecklistTemplate.findByPk(templateId, {
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
        if (!template) throw new Error('Template non trouvé');

        const existingItems = await AuditMissionChecklistItem.findAll({ where: { missionId } });
        const existingTexts = existingItems.map(i => i.texte.toLowerCase().trim());

        const itemsToCreate = (template as any).items
            .filter((item: any) => !existingTexts.includes(item.texte.toLowerCase().trim()))
            .map((item: any) => ({
                missionId: missionId,
                texte: item.texte,
                estFait: false
            }));

        if (itemsToCreate.length > 0) {
            await AuditMissionChecklistItem.bulkCreate(itemsToCreate);
        }

        // Link the template directly to the mission
        await mission.update({ checklistTemplateId: templateId });

        return await this.getMissionChecklistItems(missionId);
    }

    static async toggleMissionChecklistItem(missionId: number, itemId: number, estFait: boolean) {
        const item = await AuditMissionChecklistItem.findOne({
            where: { id: itemId, missionId }
        });
        if (!item) throw new Error('Item non trouvé pour cette mission');

        await item.update({ estFait });
        return item;
    }

    /**
     * --- TRAÇABILITÉ DES PREUVES ---
     */

    static async getMissionEvidence(missionId: number) {
        return await AuditEvidence.findAll({
            where: { missionId },
            include: [{ model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] }],
            order: [['createdAt', 'DESC']]
        });
    }

    /**
     * Récupérer TOUTES les preuves d'audit (pour Senior/Admin).
     */
    static async getAllEvidence() {
        return await AuditEvidence.findAll({
            include: [
                { model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] },
                { model: AuditMission, as: 'mission', attributes: ['id', 'titre'] }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    /**
     * Récupérer les missions ayant un rapport soumis (pour Review).
     */
    static async getMissionsWithReports() {
        return await AuditMission.findAll({
            where: {
                rapport: { [Symbol.for('ne')]: null }
            },
            include: ['auditeur', 'auditSenior', 'risk'],
            order: [['updatedAt', 'DESC']]
        });
    }

    static async addMissionEvidence(missionId: number, filename: string, path: string, uploadedById: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        const evidence = await AuditEvidence.create({
            missionId,
            filename,
            path,
            uploadedById
        });

        return await AuditEvidence.findByPk(evidence.id, {
            include: [{ model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] }]
        });
    }

    static async deleteMissionEvidence(evidenceId: number) {
        const evidence = await AuditEvidence.findByPk(evidenceId);
        if (!evidence) {
            throw new Error('Preuve non trouvée');
        }

        // Supprimer le fichier physiquement
        if (fs.existsSync(evidence.path)) {
            fs.unlinkSync(evidence.path);
        }

        await evidence.destroy();
        return { message: 'Preuve supprimée avec succès' };
    }
}
