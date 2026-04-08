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
import { AuditMissionActionPlanItem } from './audit-mission-action-plan.model';
import { AuditEvidence } from './audit-evidence.model';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { getRestoreValues, getSoftDeleteValues, restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';
import { appLogger } from '../../utils/app-logger';
import { LookupResolutionService } from '../../database/lookups/lookup.service';

export class AuditingService {
    private static normalizeProgressStatus(value: unknown): string {
        const normalized = String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');

        if (normalized === 'ok') {
            return 'ok';
        }

        if (normalized === 'en_cours' || normalized === 'in_progress') {
            return 'en_cours';
        }

        return 'nok';
    }

    private static normalizeHorizon(value: unknown): string | null {
        const raw = String(value || '').trim();
        if (!raw) {
            return null;
        }

        const normalized = raw
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ');

        if (normalized.includes('court')) {
            return 'court_terme';
        }

        if (normalized.includes('moyen')) {
            return 'moyen_terme';
        }

        if (normalized.includes('long')) {
            return 'long_terme';
        }

        return normalized.replace(/[\s-]+/g, '_');
    }

    private static parseExcelDate(value: unknown): Date | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        if (value instanceof Date) {
            return Number.isNaN(value.getTime()) ? null : value;
        }

        if (typeof value === 'number') {
            const parsed = XLSX.SSF.parse_date_code(value);
            if (!parsed) {
                return null;
            }

            return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d, parsed.H || 0, parsed.M || 0, parsed.S || 0));
        }

        const date = new Date(String(value));
        return Number.isNaN(date.getTime()) ? null : date;
    }

    private static async resolveResponsibleName(responsableNom: string | null): Promise<number | null> {
        if (!responsableNom) {
            return null;
        }

        const normalized = responsableNom.trim().toLowerCase();
        const users = await User.findAll({
            attributes: ['id', 'prenom', 'nom'],
        });

        const matched = users.find((user: any) => {
            const fullName = `${user.prenom || ''} ${user.nom || ''}`.trim().toLowerCase();
            return fullName === normalized || String(user.nom || '').trim().toLowerCase() === normalized;
        });

        return matched?.id ?? null;
    }

    /**
     * Suggérer un plan d'audit annuel via l'IA.
     */
    static async suggestAnnualPlan(role: UserRole = UserRole.AUDIT_SENIOR) {
        // Récupérer tous les risques non clôturés
        const risks = await Risk.findAll({
            where: {
                statutId: [
                    LookupResolutionService.getStaticValue('risk.statut', 'open')?.id,
                    LookupResolutionService.getStaticValue('risk.statut', 'in_progress')?.id,
                    LookupResolutionService.getStaticValue('risk.statut', 'treated')?.id,
                ]
            }
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
            const mission = await AuditMission.create(await LookupResolutionService.resolveEntityPayload('auditMission', {
                ...data,
                auditSeniorId: seniorId,
                statut: AuditMissionStatus.A_VENIR,
                delai: new Date(Date.now() + (data.delaiSuggestion || 30) * 24 * 60 * 60 * 1000),
                is_deleted: false,
                deleted_at: null,
            }));
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

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            auditeurId,
            statut: AuditMissionStatus.EN_COURS
        }));

        // Notifications & Emails
        try {
            const auditeur = await User.findByPk(auditeurId);
            if (auditeur) {
                // Internal notification
                await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                    userId: auditeurId,
                    type: NotificationType.AUDIT_MISSION_ASSIGNED,
                    content: `Une nouvelle mission d'audit vous a été assignée : ${mission.titre}`,
                    auditMissionId: missionId
                }));

                // Email notification
                await emailService.sendAuditMissionAssignedEmail(
                    { mail: auditeur.mail, nom: auditeur.nom, prenom: auditeur.prenom },
                    { titre: mission.titre, id: mission.id }
                );
            }
        } catch (error) {
            appLogger.error('Auditing', 'Assignment notifications failed', error);
        }

        return mission;
    }

    /**
     * Mettre à jour le rapport d'audit.
     */
    static async submitReport(
        missionId: number,
        actorId: number,
        actorRole: UserRole,
        reportData: { rapport: string, recommandations: string }
    ) {
        const mission = await AuditMission.findByPk(missionId);
        const auditeurId = actorRole === UserRole.SUPER_ADMIN ? mission?.auditeurId ?? actorId : actorId;
        if (!mission) throw new Error('Mission non trouvée');
        if (mission.auditeurId !== auditeurId) throw new Error('Action non autorisée');

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            ...reportData,
            statut: AuditMissionStatus.TERMINE
        }));

        // Notifications & Emails
        try {
            const senior = await User.findByPk(mission.auditSeniorId);
            const actor = await User.findByPk(actorId);
            if (senior && actor) {
                // Internal notification
                await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                    userId: senior.id,
                    type: NotificationType.AUDIT_REPORT_SUBMITTED,
                    content: `Un rapport d'audit a été soumis pour la mission : ${mission.titre}`,
                    auditMissionId: missionId
                }));

                // Email notification
                await emailService.sendAuditReportSubmittedEmail(
                    { mail: senior.mail, nom: senior.nom, prenom: senior.prenom },
                    { titre: mission.titre, auditeurNom: `${actor.prenom} ${actor.nom}` }
                );
            }
        } catch (error) {
            appLogger.error('Auditing', 'Report submission notifications failed', error);
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
        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', data));
        
        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk'] });
    }

    static async deleteMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        await softDeleteInstance(mission);
        await AuditMissionChecklistItem.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });
        await AuditEvidence.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });
        await AuditMissionActionPlanItem.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });

        return { message: 'Mission supprimée avec succès' };
    }

    static async restoreMission(missionId: number) {
        const mission = await AuditMission.scope('withDeleted').findByPk(missionId);
        if (!mission || !mission.is_deleted) throw new Error('Mission non trouvée');

        await restoreSoftDeletedInstance(mission);
        await AuditMissionChecklistItem.scope('withDeleted').update(getRestoreValues(), {
            where: {
                missionId,
                is_deleted: true
            }
        });
        await AuditEvidence.scope('withDeleted').update(getRestoreValues(), {
            where: {
                missionId,
                is_deleted: true
            }
        });
        await AuditMissionActionPlanItem.scope('withDeleted').update(getRestoreValues(), {
            where: {
                missionId,
                is_deleted: true
            }
        });

        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk'] });
    }

    /**
     * Remettre une mission à zéro (reset).
     */
    static async resetMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            auditeurId: null,
            rapport: null,
            recommandations: null,
            statut: AuditMissionStatus.A_VENIR
        }));
        
        // Supprimer aussi les checklists instanciées
        await AuditMissionChecklistItem.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });
        await AuditMissionActionPlanItem.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });
        
        return mission;
    }

    static async getMissionActionPlanItems(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        return await AuditMissionActionPlanItem.findAll({
            where: { missionId },
            include: [{ model: User, as: 'responsable', attributes: ['id', 'prenom', 'nom'], required: false }],
            order: [['ordre', 'ASC'], ['createdAt', 'ASC']]
        });
    }

    static async createMissionActionPlanItem(missionId: number, data: any) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        const responsableNom = String(data.responsableNom || '').trim() || null;
        const item = await AuditMissionActionPlanItem.create({
            missionId,
            ordre: Number(data.ordre || 0),
            regleDnssi: String(data.regleDnssi || '').trim(),
            recommandations: String(data.recommandations || '').trim(),
            horizon: this.normalizeHorizon(data.horizon),
            priorite: data.priorite !== undefined && data.priorite !== null && data.priorite !== '' ? Number(data.priorite) : null,
            responsableId: data.responsableId ? Number(data.responsableId) : await this.resolveResponsibleName(responsableNom),
            responsableNom,
            echeance: this.parseExcelDate(data.echeance),
            etatAvancement: this.normalizeProgressStatus(data.etatAvancement),
            sourceExcelFile: data.sourceExcelFile ? String(data.sourceExcelFile) : null,
            sourceExcelSheet: data.sourceExcelSheet ? String(data.sourceExcelSheet) : null,
            sourceExcelRow: data.sourceExcelRow ? Number(data.sourceExcelRow) : null,
        });

        return await AuditMissionActionPlanItem.findByPk(item.id, {
            include: [{ model: User, as: 'responsable', attributes: ['id', 'prenom', 'nom'], required: false }]
        });
    }

    static async updateMissionActionPlanItem(missionId: number, itemId: number, data: any) {
        const item = await AuditMissionActionPlanItem.findOne({
            where: { id: itemId, missionId }
        });
        if (!item) throw new Error('Ligne du plan d actions introuvable');

        const responsableNom = data.responsableNom !== undefined
            ? (String(data.responsableNom || '').trim() || null)
            : item.responsableNom;

        await item.update({
            ordre: data.ordre !== undefined ? Number(data.ordre || 0) : item.ordre,
            regleDnssi: data.regleDnssi !== undefined ? String(data.regleDnssi || '').trim() : item.regleDnssi,
            recommandations: data.recommandations !== undefined ? String(data.recommandations || '').trim() : item.recommandations,
            horizon: data.horizon !== undefined ? this.normalizeHorizon(data.horizon) : item.horizon,
            priorite: data.priorite !== undefined ? (data.priorite === '' || data.priorite === null ? null : Number(data.priorite)) : item.priorite,
            responsableId: data.responsableId !== undefined
                ? (data.responsableId ? Number(data.responsableId) : await this.resolveResponsibleName(responsableNom))
                : item.responsableId,
            responsableNom,
            echeance: data.echeance !== undefined ? this.parseExcelDate(data.echeance) : item.echeance,
            etatAvancement: data.etatAvancement !== undefined ? this.normalizeProgressStatus(data.etatAvancement) : item.etatAvancement,
        });

        return await AuditMissionActionPlanItem.findByPk(item.id, {
            include: [{ model: User, as: 'responsable', attributes: ['id', 'prenom', 'nom'], required: false }]
        });
    }

    static async deleteMissionActionPlanItem(missionId: number, itemId: number) {
        const item = await AuditMissionActionPlanItem.findOne({
            where: { id: itemId, missionId }
        });
        if (!item) throw new Error('Ligne du plan d actions introuvable');

        await softDeleteInstance(item);
        return { message: 'Ligne du plan d actions supprimée avec succès' };
    }

    static async importMissionActionPlan(missionId: number, file: Express.Multer.File) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        const workbook = XLSX.read(file.buffer, { type: 'buffer', cellDates: true });
        const sheetName = workbook.SheetNames.find((name) => name.toLowerCase().includes('pa_dnssi')) || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) throw new Error('Feuille Excel introuvable');

        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
            raw: true,
            defval: '',
        });
        const headerIndex = rows.findIndex((row) => Array.isArray(row) && row.some((cell) => String(cell || '').includes('Règle DNSSI')));
        if (headerIndex === -1) throw new Error('Colonnes du plan d actions introuvables dans le fichier Excel');

        const dataRows = rows.slice(headerIndex + 1).filter((row) =>
            Array.isArray(row) && row.some((cell) => String(cell || '').trim() !== '')
        );

        const createdItems = [];
        for (let index = 0; index < dataRows.length; index += 1) {
            const row = dataRows[index];
            const regleDnssi = String(row[2] || '').trim();
            const recommandations = String(row[3] || '').trim();

            if (!regleDnssi || !recommandations) {
                continue;
            }

            const responsableNom = String(row[6] || '').trim() || null;
            createdItems.push({
                missionId,
                ordre: row[1] ? Number(row[1]) : index + 1,
                regleDnssi,
                recommandations,
                horizon: this.normalizeHorizon(row[4]),
                priorite: row[5] !== '' ? Number(row[5]) : null,
                responsableId: await this.resolveResponsibleName(responsableNom),
                responsableNom,
                echeance: this.parseExcelDate(row[7]),
                etatAvancement: this.normalizeProgressStatus(row[8]),
                sourceExcelFile: file.originalname,
                sourceExcelSheet: sheetName,
                sourceExcelRow: headerIndex + index + 2,
            });
        }

        if (createdItems.length === 0) {
            throw new Error('Aucune ligne exploitable trouvée dans le fichier Excel');
        }

        await AuditMissionActionPlanItem.update(getSoftDeleteValues(), {
            where: {
                missionId,
                is_deleted: false
            }
        });

        await AuditMissionActionPlanItem.bulkCreate(createdItems);
        return await this.getMissionActionPlanItems(missionId);
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

        await softDeleteInstance(template);
        await AuditChecklistTemplateItem.update(getSoftDeleteValues(), {
            where: {
                templateId,
                is_deleted: false
            }
        });

        return { message: 'Template supprimé avec succès' };
    }

    static async restoreChecklistTemplate(templateId: number) {
        const template = await AuditChecklistTemplate.scope('withDeleted').findByPk(templateId);
        if (!template || !template.is_deleted) throw new Error('Template non trouvé');

        await restoreSoftDeletedInstance(template);
        await AuditChecklistTemplateItem.scope('withDeleted').update(getRestoreValues(), {
            where: {
                templateId,
                is_deleted: true
            }
        });

        return await AuditChecklistTemplate.findByPk(template.id, {
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
    }

    /**
     * --- MISSION CHECKLISTS ---
     */

    static async getMissionChecklistItems(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

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
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

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

        await softDeleteInstance(evidence);
        return { message: 'Preuve supprimée avec succès' };
    }

    static async restoreMissionEvidence(evidenceId: number) {
        const evidence = await AuditEvidence.scope('withDeleted').findByPk(evidenceId);
        if (!evidence || !evidence.is_deleted) {
            throw new Error('Preuve non trouvée');
        }

        await restoreSoftDeletedInstance(evidence);

        return await AuditEvidence.findByPk(evidence.id, {
            include: [{ model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] }]
        });
    }
}

