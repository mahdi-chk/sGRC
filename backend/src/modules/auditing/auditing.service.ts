/**
 * @file auditing.service.ts
 * @description Service de gestion des missions d'audit et des plans d'actions d'audit.
 */

import { Op } from 'sequelize';
import { AuditMission, AuditMissionStatus, AuditRecordType } from './audit-mission.model';
import { Risk } from '../risk/risk.model';
import { AIService } from '../ai/ai.service';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';
import { Notification, NotificationType } from '../notifications/notification.model';
import { emailService } from '../../utils/email.service';
import { AuditChecklistTemplate, AuditChecklistTemplateItem } from './audit-checklist-template.model';
import { AuditMissionChecklistItem } from './audit-mission-checklist.model';
import { AuditEvidence } from './audit-evidence.model';
import * as XLSX from 'xlsx';
import { getRestoreValues, getSoftDeleteValues, restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';
import { appLogger } from '../../utils/app-logger';
import { LookupResolutionService } from '../../database/lookups/lookup.service';

type MissionListFilter = {
    type?: string | null;
};

type ActionPlanImportOptions = {
    sourceMissionId?: number | null;
    riskId?: number | null;
    replaceExisting?: boolean;
};

export class AuditingService {
    private static normalizeRecordType(value: unknown): string {
        const normalized = String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');

        return normalized === AuditRecordType.PLAN_ACTION_AUDIT
            ? AuditRecordType.PLAN_ACTION_AUDIT
            : AuditRecordType.MISSION_AUDIT;
    }

    private static normalizeProgressStatus(value: unknown): string {
        const normalized = String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');

        if (normalized === 'ok' || normalized === AuditMissionStatus.OK || normalized === AuditMissionStatus.TERMINE) {
            return AuditMissionStatus.OK;
        }

        if (normalized === 'en_cours' || normalized === 'in_progress' || normalized === AuditMissionStatus.EN_COURS) {
            return AuditMissionStatus.EN_COURS;
        }

        if (
            normalized === 'nok'
            || normalized === AuditMissionStatus.NOK
            || normalized === AuditMissionStatus.A_VENIR
            || normalized === AuditMissionStatus.EN_RETARD
            || normalized === AuditMissionStatus.ANNULE
        ) {
            return AuditMissionStatus.NOK;
        }

        return AuditMissionStatus.NOK;
    }

    private static toLegacyProgressStatus(value: unknown): string {
        const normalized = String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');

        if (normalized === AuditMissionStatus.OK || normalized === AuditMissionStatus.TERMINE) {
            return 'OK';
        }

        if (normalized === AuditMissionStatus.EN_COURS) {
            return 'En cours';
        }

        return 'NOK';
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

        return null;
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

    private static cleanString(value: unknown): string | null {
        const cleaned = String(value || '').trim();
        return cleaned ? cleaned : null;
    }

    private static toInteger(value: unknown): number | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const parsed = Number(value);
        return Number.isInteger(parsed) ? parsed : null;
    }

    private static normalizePriority(value: unknown): number | null {
        const parsed = this.toInteger(value);
        if (parsed === null) {
            return null;
        }

        return [1, 2, 3].includes(parsed) ? parsed : null;
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

    private static ensureMissionRecord(record: AuditMission) {
        if (record.type !== AuditRecordType.MISSION_AUDIT) {
            throw new Error('Cette operation est reservee aux missions d audit');
        }
    }

    private static buildActionPlanTitle(data: any): string {
        return this.cleanString(data.titre)
            || this.cleanString(data.regleDnssi)
            || this.cleanString(data.code)
            || 'Plan d action audit';
    }

    private static async resolveActionPlanAssignee(data: any, fallbackResponsableNom?: string | null): Promise<number | null> {
        if (data.auditeurId !== undefined) {
            return this.toInteger(data.auditeurId);
        }

        if (data.responsableId !== undefined) {
            return this.toInteger(data.responsableId);
        }

        const responsibleName = data.responsableNom !== undefined
            ? this.cleanString(data.responsableNom)
            : fallbackResponsableNom || null;

        return this.resolveResponsibleName(responsibleName);
    }

    private static async buildActionPlanPayload(data: any, defaults: Partial<AuditMission> = {}): Promise<any> {
        const merged = { ...defaults, ...data, type: AuditRecordType.PLAN_ACTION_AUDIT };
        const responsableNom = this.cleanString(
            merged.responsableNom !== undefined ? merged.responsableNom : merged.responsabilites
        );
        const recommandations = this.cleanString(
            merged.recommandations !== undefined ? merged.recommandations : merged.objectifs
        );
        const delai = merged.delai !== undefined ? merged.delai : merged.echeance;

        return {
            type: AuditRecordType.PLAN_ACTION_AUDIT,
            code: this.cleanString(merged.code),
            titre: this.buildActionPlanTitle(merged),
            objectifs: recommandations,
            responsabilites: responsableNom,
            delai: this.parseExcelDate(delai),
            statut: this.normalizeProgressStatus(merged.statut !== undefined ? merged.statut : merged.etatAvancement),
            auditSeniorId: this.toInteger(merged.auditSeniorId),
            auditeurId: await this.resolveActionPlanAssignee(merged, responsableNom),
            riskId: this.toInteger(merged.riskId),
            checklistTemplateId: null,
            ordre: this.toInteger(merged.ordre) ?? 0,
            regleDnssi: this.cleanString(merged.regleDnssi),
            horizon: this.normalizeHorizon(merged.horizon),
            priorite: this.normalizePriority(merged.priorite),
            rapport: null,
            recommandations,
            sourceExcelFile: this.cleanString(merged.sourceExcelFile),
            sourceExcelSheet: this.cleanString(merged.sourceExcelSheet),
            sourceExcelRow: this.toInteger(merged.sourceExcelRow),
            sourceMissionId: this.toInteger(merged.sourceMissionId),
        };
    }

    private static buildMissionPayload(data: any, defaults: Partial<AuditMission> = {}): any {
        const merged = { ...defaults, ...data, type: AuditRecordType.MISSION_AUDIT };

        return {
            type: AuditRecordType.MISSION_AUDIT,
            code: this.cleanString(merged.code),
            titre: this.cleanString(merged.titre),
            objectifs: this.cleanString(merged.objectifs),
            responsabilites: this.cleanString(merged.responsabilites),
            delai: this.parseExcelDate(merged.delai),
            statut: this.normalizeProgressStatus(merged.statut),
            auditSeniorId: this.toInteger(merged.auditSeniorId),
            auditeurId: this.toInteger(merged.auditeurId),
            riskId: this.toInteger(merged.riskId),
            checklistTemplateId: this.toInteger(merged.checklistTemplateId),
            ordre: this.toInteger(merged.ordre) ?? 0,
            regleDnssi: this.cleanString(merged.regleDnssi),
            horizon: this.normalizeHorizon(merged.horizon),
            priorite: this.normalizePriority(merged.priorite),
            rapport: merged.rapport !== undefined ? merged.rapport : defaults.rapport ?? null,
            recommandations: merged.recommandations !== undefined ? merged.recommandations : defaults.recommandations ?? null,
            sourceExcelFile: this.cleanString(merged.sourceExcelFile),
            sourceExcelSheet: this.cleanString(merged.sourceExcelSheet),
            sourceExcelRow: this.toInteger(merged.sourceExcelRow),
            sourceMissionId: null,
        };
    }

    private static validatePayload(payload: any, isCreate: boolean): void {
        const type = this.normalizeRecordType(payload.type);
        const missingFields: string[] = [];

        if (!payload.auditSeniorId) {
            missingFields.push('auditSeniorId');
        }

        if (type === AuditRecordType.MISSION_AUDIT) {
            if (!payload.titre) missingFields.push('titre');
            if (!payload.objectifs) missingFields.push('objectifs');
            if (!payload.responsabilites) missingFields.push('responsabilites');
            if (!payload.delai) missingFields.push('delai');
        } else {
            if (!payload.titre) missingFields.push('titre');
            if (!payload.recommandations) missingFields.push('recommandations');
        }

        if (isCreate && missingFields.length > 0) {
            throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
        }
    }

    private static async ensureCode(record: AuditMission): Promise<AuditMission> {
        if (record.code && String(record.code).trim()) {
            return record;
        }

        await record.update({ code: String(record.id) });
        return record;
    }

    private static buildListWhere(role: UserRole, userId: number, filter: MissionListFilter = {}): Record<string, unknown> {
        const where: Record<string, unknown> = {};
        const normalizedType = filter.type ? this.normalizeRecordType(filter.type) : null;

        if (normalizedType) {
            where.type = normalizedType;
        }

        if (role === UserRole.AUDIT_SENIOR) {
            where.auditSeniorId = userId;
        } else if (role === UserRole.AUDITEUR) {
            where.auditeurId = userId;
        }

        return where;
    }

    private static sortRecordsForDisplay(records: AuditMission[]) {
        return [...records].sort((first, second) => {
            const firstType = this.normalizeRecordType(first.type);
            const secondType = this.normalizeRecordType(second.type);
            if (firstType !== secondType) {
                return firstType === AuditRecordType.MISSION_AUDIT ? -1 : 1;
            }

            const firstDate = first.delai ? new Date(first.delai).getTime() : Number.MAX_SAFE_INTEGER;
            const secondDate = second.delai ? new Date(second.delai).getTime() : Number.MAX_SAFE_INTEGER;
            if (firstDate !== secondDate) {
                return firstDate - secondDate;
            }

            return new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime();
        });
    }

    private static mapActionPlanRecordToLegacyItem(record: any) {
        const responsibleName = record.responsabilites
            || `${record.auditeur?.prenom || ''} ${record.auditeur?.nom || ''}`.trim()
            || null;

        return {
            id: record.id,
            missionId: record.sourceMissionId ?? null,
            ordre: record.ordre ?? 0,
            regleDnssi: record.regleDnssi || record.titre,
            recommandations: record.recommandations || record.objectifs || '',
            horizon: record.horizon || null,
            priorite: record.priorite ?? null,
            responsableId: record.auditeurId ?? null,
            responsableNom: responsibleName,
            echeance: record.delai || null,
            etatAvancement: this.toLegacyProgressStatus(record.statutCode || record.statut),
            sourceExcelFile: record.sourceExcelFile || null,
            sourceExcelSheet: record.sourceExcelSheet || null,
            sourceExcelRow: record.sourceExcelRow ?? null,
            responsable: record.auditeur || null,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        };
    }

    private static normalizeExcelHeader(value: unknown): string {
        return String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    private static resolveActionPlanColumnIndexes(headerRow: any[]) {
        const normalizedHeaders = headerRow.map((cell) => this.normalizeExcelHeader(cell));
        const findIndex = (...candidates: string[]) => normalizedHeaders.findIndex((value) =>
            candidates.some((candidate) => value.includes(candidate))
        );

        return {
            ordre: findIndex('ordre', 'numero'),
            regleDnssi: findIndex('regle dnssi', 'dnssi', 'regle'),
            recommandations: findIndex('recommandations', 'recommendations', 'action', 'mesure', 'description'),
            horizon: findIndex('horizon'),
            priorite: findIndex('priorite', 'priority'),
            responsableNom: findIndex('responsable', 'owner'),
            echeance: findIndex('echeance', 'date echeance', 'deadline', 'date limite'),
            etatAvancement: findIndex('etat d avancement', 'avancement', 'etat', 'statut', 'status'),
        };
    }

    private static async parseActionPlanImportRows(file: Express.Multer.File, baseDefaults: Record<string, unknown>) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer', cellDates: true });
        const sheetName = workbook.SheetNames.find((name) => name.toLowerCase().includes('pa_dnssi')) || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) throw new Error('Feuille Excel introuvable');

        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
            raw: true,
            defval: '',
        });
        const headerIndex = rows.findIndex((row) => Array.isArray(row) && row.some((cell) => String(cell || '').includes('Règle DNSSI') || String(cell || '').includes('RÃ¨gle DNSSI')));
        if (headerIndex === -1) throw new Error('Colonnes du plan d actions introuvables dans le fichier Excel');

        const dataRows = rows.slice(headerIndex + 1).filter((row) =>
            Array.isArray(row) && row.some((cell) => String(cell || '').trim() !== '')
        );

        const payloads: any[] = [];
        for (let index = 0; index < dataRows.length; index += 1) {
            const row = dataRows[index];
            const regleDnssi = String(row[2] || '').trim();
            const recommandations = String(row[3] || '').trim();

            if (!regleDnssi || !recommandations) {
                continue;
            }

            payloads.push({
                ...baseDefaults,
                ordre: row[1] ? Number(row[1]) : index + 1,
                regleDnssi,
                titre: regleDnssi,
                objectifs: recommandations,
                recommandations,
                horizon: this.normalizeHorizon(row[4]),
                priorite: row[5] !== '' ? Number(row[5]) : null,
                responsableNom: String(row[6] || '').trim() || null,
                delai: this.parseExcelDate(row[7]),
                echeance: this.parseExcelDate(row[7]),
                etatAvancement: this.normalizeProgressStatus(row[8]),
                sourceExcelFile: file.originalname,
                sourceExcelSheet: sheetName,
                sourceExcelRow: headerIndex + index + 2,
            });
        }

        if (payloads.length === 0) {
            throw new Error('Aucune ligne exploitable trouvée dans le fichier Excel');
        }

        return payloads;
    }

    private static async parseActionPlanImportRowsRobust(file: Express.Multer.File, baseDefaults: Record<string, unknown>) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer', cellDates: true });
        const sheetName = workbook.SheetNames.find((name) => name.toLowerCase().includes('pa_dnssi')) || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) throw new Error('Feuille Excel introuvable');

        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
            raw: true,
            defval: '',
        });
        const headerIndex = rows.findIndex((row) => {
            if (!Array.isArray(row)) {
                return false;
            }

            const normalizedRow = row.map((cell) => this.normalizeExcelHeader(cell));
            return normalizedRow.some((cell) => cell.includes('regle dnssi') || cell === 'dnssi')
                && normalizedRow.some((cell) => cell.includes('recommandation') || cell.includes('action') || cell.includes('mesure'));
        });
        if (headerIndex === -1) throw new Error('Colonnes du plan d actions introuvables dans le fichier Excel');

        const columnIndexes = this.resolveActionPlanColumnIndexes(rows[headerIndex] as any[]);
        const dataRows = rows.slice(headerIndex + 1).filter((row) =>
            Array.isArray(row) && row.some((cell) => String(cell || '').trim() !== '')
        );

        const payloads: any[] = [];
        for (let index = 0; index < dataRows.length; index += 1) {
            const row = dataRows[index];
            const readCell = (columnIndex: number, fallbackIndex: number) => {
                const resolvedIndex = columnIndex >= 0 ? columnIndex : fallbackIndex;
                return row[resolvedIndex];
            };

            const regleDnssi = String(readCell(columnIndexes.regleDnssi, 2) || '').trim();
            const recommandations = String(readCell(columnIndexes.recommandations, 3) || '').trim();

            if (!regleDnssi || !recommandations) {
                continue;
            }

            payloads.push({
                ...baseDefaults,
                ordre: readCell(columnIndexes.ordre, 1) ? Number(readCell(columnIndexes.ordre, 1)) : index + 1,
                regleDnssi,
                titre: regleDnssi,
                objectifs: recommandations,
                recommandations,
                horizon: this.normalizeHorizon(readCell(columnIndexes.horizon, 4)),
                priorite: readCell(columnIndexes.priorite, 5) !== '' ? Number(readCell(columnIndexes.priorite, 5)) : null,
                responsableNom: String(readCell(columnIndexes.responsableNom, 6) || '').trim() || null,
                delai: this.parseExcelDate(readCell(columnIndexes.echeance, 7)),
                echeance: this.parseExcelDate(readCell(columnIndexes.echeance, 7)),
                etatAvancement: this.normalizeProgressStatus(readCell(columnIndexes.etatAvancement, 8)),
                sourceExcelFile: file.originalname,
                sourceExcelSheet: sheetName,
                sourceExcelRow: headerIndex + index + 2,
            });
        }

        if (payloads.length === 0) {
            throw new Error('Aucune ligne exploitable trouvÃ©e dans le fichier Excel');
        }

        return payloads;
    }

    private static async createActionPlanRecords(payloads: any[]) {
        const createdRecords: AuditMission[] = [];

        for (const payload of payloads) {
            const planPayload = await this.buildActionPlanPayload(payload);
            this.validatePayload(planPayload, true);
            const created = await AuditMission.create(await LookupResolutionService.resolveEntityPayload('auditMission', planPayload));
            createdRecords.push(await this.ensureCode(created));
        }

        return createdRecords;
    }

    static async getRecordsForUser(role: UserRole, userId: number, filter: MissionListFilter = {}) {
        const where = this.buildListWhere(role, userId, filter);
        return this.sortRecordsForDisplay(await AuditMission.findAll({
            where,
            include: [
                { model: User, as: 'auditSenior', required: false },
                { model: User, as: 'auditeur', required: false },
                { model: Risk, as: 'risk', required: false },
                { model: AuditMission, as: 'sourceMission', required: false },
            ] as any,
        }));
    }

    static async suggestAnnualPlan(role: UserRole = UserRole.AUDIT_SENIOR, type: string = AuditRecordType.MISSION_AUDIT) {
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
            throw new Error('Aucun risque disponible pour générer un plan d audit');
        }

        const normalizedType = this.normalizeRecordType(type);
        const sortedRisks = [...risks].sort((a, b) => (b.niveauCotationRisqueNet || 0) - (a.niveauCotationRisqueNet || 0));
        const suggestions = await AIService.generateAuditPlan(sortedRisks, role);
        return suggestions.map((item) => ({
            ...item,
            type: normalizedType,
            regleDnssi: item.regleDnssi || item.titre || null,
            recommandations: item.recommandations || item.objectifs || item.titre || null,
        }));
    }

    static async createMissionsFromPlan(seniorId: number, missionsData: any[], type: string = AuditRecordType.MISSION_AUDIT) {
        const normalizedType = this.normalizeRecordType(type);
        const created: AuditMission[] = [];

        for (const data of missionsData) {
            const payload = normalizedType === AuditRecordType.PLAN_ACTION_AUDIT
                ? await this.buildActionPlanPayload({
                    ...data,
                    auditSeniorId: seniorId,
                    type: normalizedType,
                    titre: data.titre || data.regleDnssi || data.code,
                    regleDnssi: data.regleDnssi || data.titre || null,
                    recommandations: data.recommandations || data.objectifs || data.titre || '',
                    objectifs: data.recommandations || data.objectifs || data.titre || '',
                    delai: data.delai || new Date(Date.now() + (data.delaiSuggestion || 30) * 24 * 60 * 60 * 1000),
                    etatAvancement: data.etatAvancement || AuditMissionStatus.NOK,
                })
                : this.buildMissionPayload({
                    ...data,
                    auditSeniorId: seniorId,
                    type: normalizedType,
                    statut: AuditMissionStatus.NOK,
                    delai: data.delai || new Date(Date.now() + (data.delaiSuggestion || 30) * 24 * 60 * 60 * 1000),
                });

            this.validatePayload(payload, true);
            const createdRecord = await AuditMission.create(await LookupResolutionService.resolveEntityPayload('auditMission', payload));
            created.push(await this.ensureCode(createdRecord));
        }

        return created;
    }

    static async createRecord(actorId: number, data: any) {
        const type = this.normalizeRecordType(data.type);
        const payload = type === AuditRecordType.PLAN_ACTION_AUDIT
            ? await this.buildActionPlanPayload({
                ...data,
                auditSeniorId: data.auditSeniorId || actorId,
            })
            : this.buildMissionPayload({
                ...data,
                auditSeniorId: data.auditSeniorId || actorId,
            });

        this.validatePayload(payload, true);
        const createdRecord = await AuditMission.create(await LookupResolutionService.resolveEntityPayload('auditMission', payload));
        return this.ensureCode(createdRecord);
    }

    static async assignMission(missionId: number, auditeurId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Enregistrement introuvable');

        const targetStatus = mission.type === AuditRecordType.PLAN_ACTION_AUDIT
            ? (mission.statut === AuditMissionStatus.OK ? AuditMissionStatus.OK : AuditMissionStatus.EN_COURS)
            : AuditMissionStatus.EN_COURS;

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            auditeurId,
            statut: targetStatus
        }));

        try {
            const auditeur = await User.findByPk(auditeurId);
            if (auditeur) {
                const isPlan = mission.type === AuditRecordType.PLAN_ACTION_AUDIT;
                const content = isPlan
                    ? `Un plan d actions d audit vous a été affecté : ${mission.titre}`
                    : `Une nouvelle mission d audit vous a été assignée : ${mission.titre}`;

                await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                    userId: auditeurId,
                    type: NotificationType.AUDIT_MISSION_ASSIGNED,
                    content,
                    auditMissionId: missionId
                }));

                if (!isPlan) {
                    await emailService.sendAuditMissionAssignedEmail(
                        { mail: auditeur.mail, nom: auditeur.nom, prenom: auditeur.prenom },
                        { titre: mission.titre, id: mission.id }
                    );
                }
            }
        } catch (error) {
            appLogger.error('Auditing', 'Assignment notifications failed', error);
        }

        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk', 'auditSenior'] });
    }

    static async submitReport(
        missionId: number,
        actorId: number,
        actorRole: UserRole,
        reportData: { rapport: string, recommandations: string }
    ) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        const auditeurId = actorRole === UserRole.SUPER_ADMIN ? mission.auditeurId ?? actorId : actorId;
        if (mission.auditeurId !== auditeurId) throw new Error('Action non autorisée');

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            ...reportData,
            statut: AuditMissionStatus.OK
        }));

        try {
            const senior = await User.findByPk(mission.auditSeniorId);
            const actor = await User.findByPk(actorId);
            if (senior && actor) {
                await Notification.create(await LookupResolutionService.resolveEntityPayload('notification', {
                    userId: senior.id,
                    type: NotificationType.AUDIT_REPORT_SUBMITTED,
                    content: `Un rapport d audit a été soumis pour la mission : ${mission.titre}`,
                    auditMissionId: missionId
                }));

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

    static async updateMission(missionId: number, data: any) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Enregistrement introuvable');

        const payload = mission.type === AuditRecordType.PLAN_ACTION_AUDIT
            ? await this.buildActionPlanPayload(data, mission.get({ plain: true }) as Partial<AuditMission>)
            : this.buildMissionPayload(data, mission.get({ plain: true }) as Partial<AuditMission>);

        this.validatePayload(payload, false);
        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', payload));
        await this.ensureCode(mission);

        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk', 'auditSenior', 'sourceMission'] });
    }

    static async deleteMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Enregistrement introuvable');

        await softDeleteInstance(mission);

        if (mission.type === AuditRecordType.MISSION_AUDIT) {
            await AuditMissionChecklistItem.update(getSoftDeleteValues(), {
                where: { missionId, is_deleted: false }
            });
            await AuditEvidence.update(getSoftDeleteValues(), {
                where: { missionId, is_deleted: false }
            });
        }

        return { message: 'Enregistrement supprimé avec succès' };
    }

    static async restoreMission(missionId: number) {
        const mission = await AuditMission.scope('withDeleted').findByPk(missionId);
        if (!mission || !mission.is_deleted) throw new Error('Enregistrement introuvable');

        await restoreSoftDeletedInstance(mission);

        if (mission.type === AuditRecordType.MISSION_AUDIT) {
            await AuditMissionChecklistItem.scope('withDeleted').update(getRestoreValues(), {
                where: { missionId, is_deleted: true }
            });
            await AuditEvidence.scope('withDeleted').update(getRestoreValues(), {
                where: { missionId, is_deleted: true }
            });
        }

        return await AuditMission.findByPk(missionId, { include: ['auditeur', 'risk', 'auditSenior'] });
    }

    static async resetMission(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        await mission.update(await LookupResolutionService.resolveEntityPayload('auditMission', {
            auditeurId: null,
            rapport: null,
            recommandations: null,
            statut: AuditMissionStatus.NOK
        }));

        await AuditMissionChecklistItem.update(getSoftDeleteValues(), {
            where: { missionId, is_deleted: false }
        });

        return mission;
    }

    static async getActionPlanRecords(filter: { auditSeniorId?: number; auditeurId?: number } = {}) {
        const where: Record<string, unknown> = {
            type: AuditRecordType.PLAN_ACTION_AUDIT,
        };

        if (filter.auditSeniorId) {
            where.auditSeniorId = filter.auditSeniorId;
        }

        if (filter.auditeurId) {
            where.auditeurId = filter.auditeurId;
        }

        return await AuditMission.findAll({
            where,
            include: [
                { model: User, as: 'auditSenior', attributes: ['id', 'prenom', 'nom'], required: false },
                { model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom'], required: false },
                { model: Risk, as: 'risk', required: false },
                { model: AuditMission, as: 'sourceMission', required: false },
            ] as any,
            order: [['ordre', 'ASC'], ['updatedAt', 'DESC']]
        });
    }

    static async importActionPlans(actorId: number, file: Express.Multer.File, options: ActionPlanImportOptions = {}) {
        const rows = await this.parseActionPlanImportRowsRobust(file, {
            auditSeniorId: actorId,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
            riskId: options.riskId ?? null,
            sourceMissionId: options.sourceMissionId ?? null,
        });

        if (options.replaceExisting) {
            const replaceWhere: Record<string, unknown> = {
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                auditSeniorId: actorId,
                is_deleted: false,
            };

            if (options.sourceMissionId) {
                replaceWhere.sourceMissionId = options.sourceMissionId;
            } else {
                replaceWhere.sourceExcelFile = file.originalname;
            }

            await AuditMission.update(getSoftDeleteValues(), { where: replaceWhere });
        }

        return this.createActionPlanRecords(rows);
    }

    static async importMissionsFromExcel(actorId: number, file: Express.Multer.File, riskId: number | null = null) {
        const rows = await this.parseActionPlanImportRowsRobust(file, {
            auditSeniorId: actorId,
            type: AuditRecordType.MISSION_AUDIT,
            riskId,
        });

        const createdRecords: AuditMission[] = [];

        for (const row of rows) {
            const missionPayload = this.buildMissionPayload({
                ...row,
                type: AuditRecordType.MISSION_AUDIT,
                titre: row.titre || row.regleDnssi || 'Mission d audit',
                objectifs: row.recommandations || row.objectifs || row.titre || row.regleDnssi,
                responsabilites: row.responsableNom || row.responsabilites || 'A definir',
                delai: row.delai || row.echeance || new Date(),
                statut: row.etatAvancement || row.statut || AuditMissionStatus.NOK,
                recommandations: row.recommandations || row.objectifs || null,
            });

            this.validatePayload(missionPayload, true);
            const created = await AuditMission.create(await LookupResolutionService.resolveEntityPayload('auditMission', missionPayload));
            createdRecords.push(await this.ensureCode(created));
        }

        return createdRecords;
    }

    static async getMissionActionPlanItems(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');

        const records = await AuditMission.findAll({
            where: {
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                sourceMissionId: missionId,
            },
            include: [{ model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom'], required: false }],
            order: [['ordre', 'ASC'], ['createdAt', 'ASC']]
        });

        return records.map((record) => this.mapActionPlanRecordToLegacyItem(record));
    }

    static async createMissionActionPlanItem(missionId: number, data: any) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        const created = await this.createRecord(mission.auditSeniorId, {
            ...data,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
            sourceMissionId: missionId,
            riskId: mission.riskId,
        });

        const reloaded = await AuditMission.findByPk(created.id, {
            include: [{ model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom'], required: false }]
        });

        return this.mapActionPlanRecordToLegacyItem(reloaded);
    }

    static async updateMissionActionPlanItem(missionId: number, itemId: number, data: any) {
        const item = await AuditMission.findOne({
            where: { id: itemId, type: AuditRecordType.PLAN_ACTION_AUDIT, sourceMissionId: missionId }
        });
        if (!item) throw new Error('Ligne du plan d actions introuvable');

        await this.updateMission(itemId, {
            ...data,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
            sourceMissionId: missionId,
        });

        const updated = await AuditMission.findByPk(itemId, {
            include: [{ model: User, as: 'auditeur', attributes: ['id', 'prenom', 'nom'], required: false }]
        });

        return this.mapActionPlanRecordToLegacyItem(updated);
    }

    static async deleteMissionActionPlanItem(missionId: number, itemId: number) {
        const item = await AuditMission.findOne({
            where: { id: itemId, type: AuditRecordType.PLAN_ACTION_AUDIT, sourceMissionId: missionId }
        });
        if (!item) throw new Error('Ligne du plan d actions introuvable');

        await softDeleteInstance(item);
        return { message: 'Ligne du plan d actions supprimée avec succès' };
    }

    static async importMissionActionPlan(missionId: number, file: Express.Multer.File) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        await AuditMission.update(getSoftDeleteValues(), {
            where: {
                type: AuditRecordType.PLAN_ACTION_AUDIT,
                sourceMissionId: missionId,
                is_deleted: false
            }
        });

        await this.importActionPlans(mission.auditSeniorId, file, {
            sourceMissionId: missionId,
            riskId: mission.riskId,
            replaceExisting: false,
        });

        return this.getMissionActionPlanItems(missionId);
    }

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
            const itemsData = data.items.map((texte) => ({ templateId: template.id, texte }));
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
            where: { templateId, is_deleted: false }
        });

        return { message: 'Template supprimé avec succès' };
    }

    static async restoreChecklistTemplate(templateId: number) {
        const template = await AuditChecklistTemplate.scope('withDeleted').findByPk(templateId);
        if (!template || !template.is_deleted) throw new Error('Template non trouvé');

        await restoreSoftDeletedInstance(template);
        await AuditChecklistTemplateItem.scope('withDeleted').update(getRestoreValues(), {
            where: { templateId, is_deleted: true }
        });

        return await AuditChecklistTemplate.findByPk(template.id, {
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
    }

    static async getMissionChecklistItems(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        return await AuditMissionChecklistItem.findAll({
            where: { missionId },
            order: [['createdAt', 'ASC']]
        });
    }

    static async assignTemplateToMission(missionId: number, templateId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        const template = await AuditChecklistTemplate.findByPk(templateId, {
            include: [{ model: AuditChecklistTemplateItem, as: 'items' }]
        });
        if (!template) throw new Error('Template non trouvé');

        const existingItems = await AuditMissionChecklistItem.findAll({ where: { missionId } });
        const existingTexts = existingItems.map((item) => item.texte.toLowerCase().trim());

        const itemsToCreate = (template as any).items
            .filter((item: any) => !existingTexts.includes(item.texte.toLowerCase().trim()))
            .map((item: any) => ({
                missionId,
                texte: item.texte,
                estFait: false
            }));

        if (itemsToCreate.length > 0) {
            await AuditMissionChecklistItem.bulkCreate(itemsToCreate);
        }

        await mission.update({ checklistTemplateId: templateId });
        return await this.getMissionChecklistItems(missionId);
    }

    static async toggleMissionChecklistItem(missionId: number, itemId: number, estFait: boolean) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        const item = await AuditMissionChecklistItem.findOne({
            where: { id: itemId, missionId }
        });
        if (!item) throw new Error('Item non trouvé pour cette mission');

        await item.update({ estFait });
        return item;
    }

    static async getMissionEvidence(missionId: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

        return await AuditEvidence.findAll({
            where: { missionId },
            include: [{ model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] }],
            order: [['createdAt', 'DESC']]
        });
    }

    static async getAllEvidence() {
        return await AuditEvidence.findAll({
            include: [
                { model: User, as: 'uploader', attributes: ['id', 'prenom', 'nom'] },
                {
                    model: AuditMission,
                    as: 'mission',
                    attributes: ['id', 'titre', 'type'],
                    where: { type: AuditRecordType.MISSION_AUDIT },
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    static async getMissionsWithReports() {
        return await AuditMission.findAll({
            where: {
                type: AuditRecordType.MISSION_AUDIT,
                rapport: { [Op.ne]: null }
            },
            include: ['auditeur', 'auditSenior', 'risk'],
            order: [['updatedAt', 'DESC']]
        });
    }

    static async addMissionEvidence(missionId: number, filename: string, path: string, uploadedById: number) {
        const mission = await AuditMission.findByPk(missionId);
        if (!mission) throw new Error('Mission non trouvée');
        this.ensureMissionRecord(mission);

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
