/**
 * @file auditing.service.ts
 * @description Service de communication avec l'API pour le module d'audit.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum AuditMissionStatus {
    NOK = 'nok',
    A_VENIR = 'nok',
    EN_COURS = 'en_cours',
    OK = 'ok',
    TERMINE = 'ok',
    EN_RETARD = 'nok',
    ANNULE = 'nok',
}

export enum AuditMissionHorizon {
    COURT_TERME = 'court_terme',
    MOYEN_TERME = 'moyen_terme',
}

export enum AuditRecordType {
    MISSION_AUDIT = 'mission_audit',
    PLAN_ACTION_AUDIT = 'plan_action_audit',
}

export interface AuditMission {
    id: number;
    type?: AuditRecordType;
    code?: string | null;
    titre: string;
    objectifs?: string | null;
    responsabilites?: string | null;
    description?: string | null;
    statut: AuditMissionStatus | string;
    riskId?: number | null;
    auditSeniorId: number;
    auditeurId?: number | null;
    checklistTemplateId?: number | null;
    delai: any;
    rapport?: string | null;
    recommandations?: string | null;
    ordre?: number | null;
    regleDnssi?: string | null;
    horizon?: string | null;
    priorite?: number | null;
    sourceExcelFile?: string | null;
    sourceExcelSheet?: string | null;
    sourceExcelRow?: number | null;
    sourceMissionId?: number | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    risk?: any;
    auditSenior?: any;
    auditeur?: any;
    sourceMission?: any;
}

export interface AuditChecklistTemplate {
    id: number;
    titre: string;
    description: string | null;
    createdById: number;
    createdAt: Date;
    items?: AuditChecklistTemplateItem[];
}

export interface AuditChecklistTemplateItem {
    id: number;
    templateId: number;
    texte: string;
}

export interface AuditMissionChecklistItem {
    id: number;
    missionId: number;
    texte: string;
    estFait: boolean;
}

export interface AuditMissionActionPlanItem {
    id: number;
    missionId: number | null;
    ordre: number;
    regleDnssi: string;
    recommandations: string;
    horizon: string | null;
    priorite: number | null;
    responsableId: number | null;
    responsableNom: string | null;
    echeance: string | null;
    etatAvancement: string;
    sourceExcelFile?: string | null;
    sourceExcelSheet?: string | null;
    sourceExcelRow?: number | null;
    responsable?: any;
}

export interface AuditMissionActionPlanPayload {
    code?: string | null;
    titre?: string | null;
    ordre?: number;
    regleDnssi: string;
    recommandations: string;
    horizon?: string | null;
    priorite?: number | null;
    responsableId?: number | null;
    responsableNom?: string | null;
    echeance?: string | null;
    etatAvancement?: string;
    riskId?: number | null;
}

export interface AuditEvidence {
    id: number;
    missionId: number;
    filename: string;
    path: string;
    uploadedById: number;
    createdAt: Date;
    uploader?: any;
    mission?: any;
}

@Injectable({
    providedIn: 'root'
})
export class AuditingService {
    private apiUrl = `${environment.apiUrl}/auditing`;

    constructor(private http: HttpClient) { }

    getMissions(type: AuditRecordType | 'all' = AuditRecordType.MISSION_AUDIT): Observable<AuditMission[]> {
        let params = new HttpParams();
        if (type !== 'all') {
            params = params.set('type', type);
        }
        return this.http.get<AuditMission[]>(`${this.apiUrl}/missions`, { params });
    }

    suggestPlan(type: AuditRecordType = AuditRecordType.PLAN_ACTION_AUDIT): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/suggest-plan`, { type });
    }

    createMissionsFromPlan(missions: any[], type: AuditRecordType = AuditRecordType.MISSION_AUDIT): Observable<any> {
        return this.http.post(`${this.apiUrl}/create-missions`, { missions, type });
    }

    createMission(data: Partial<AuditMission>): Observable<AuditMission> {
        return this.http.post<AuditMission>(`${this.apiUrl}/missions`, data);
    }

    assignMission(missionId: number, auditeurId: number): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/assign`, { auditeurId });
    }

    updateMission(missionId: number, data: Partial<AuditMission>): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}`, data);
    }

    submitReport(missionId: number, data: { rapport: string, recommandations: string }): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/report`, data);
    }

    deleteMission(missionId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}`);
    }

    resetMission(missionId: number): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/reset`, {});
    }

    getActionPlans(): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/action-plans`);
    }

    createActionPlan(payload: AuditMissionActionPlanPayload): Observable<AuditMission> {
        return this.http.post<AuditMission>(`${this.apiUrl}/action-plans`, payload);
    }

    updateActionPlan(actionPlanId: number, payload: Partial<AuditMissionActionPlanPayload & AuditMission>): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/action-plans/${actionPlanId}`, payload);
    }

    deleteActionPlan(actionPlanId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/action-plans/${actionPlanId}`);
    }

    importActionPlans(file: File, riskId?: number | null): Observable<AuditMission[]> {
        const formData = new FormData();
        formData.append('file', file);
        if (riskId) {
            formData.append('riskId', String(riskId));
        }
        return this.http.post<AuditMission[]>(`${this.apiUrl}/action-plans/import`, formData);
    }

    importMissions(file: File): Observable<AuditMission[]> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<AuditMission[]>(`${this.apiUrl}/missions/import`, formData);
    }

    getChecklistTemplates(): Observable<AuditChecklistTemplate[]> {
        return this.http.get<AuditChecklistTemplate[]>(`${this.apiUrl}/checklists`);
    }

    createChecklistTemplate(data: { titre: string, description?: string, items: string[] }): Observable<AuditChecklistTemplate> {
        return this.http.post<AuditChecklistTemplate>(`${this.apiUrl}/checklists`, data);
    }

    deleteChecklistTemplate(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/checklists/${id}`);
    }

    getMissionChecklistItems(missionId: number): Observable<AuditMissionChecklistItem[]> {
        return this.http.get<AuditMissionChecklistItem[]>(`${this.apiUrl}/missions/${missionId}/checklists`);
    }

    assignTemplateToMission(missionId: number, templateId: number): Observable<AuditMissionChecklistItem[]> {
        return this.http.post<AuditMissionChecklistItem[]>(`${this.apiUrl}/missions/${missionId}/checklists`, { templateId });
    }

    toggleMissionChecklistItem(missionId: number, itemId: number, estFait: boolean): Observable<AuditMissionChecklistItem> {
        return this.http.put<AuditMissionChecklistItem>(`${this.apiUrl}/missions/${missionId}/checklists/${itemId}`, { estFait });
    }

    getMissionActionPlanItems(missionId: number): Observable<AuditMissionActionPlanItem[]> {
        return this.http.get<AuditMissionActionPlanItem[]>(`${this.apiUrl}/missions/${missionId}/action-plans`);
    }

    createMissionActionPlanItem(missionId: number, payload: AuditMissionActionPlanPayload): Observable<AuditMissionActionPlanItem> {
        return this.http.post<AuditMissionActionPlanItem>(`${this.apiUrl}/missions/${missionId}/action-plans`, payload);
    }

    updateMissionActionPlanItem(missionId: number, itemId: number, payload: Partial<AuditMissionActionPlanPayload>): Observable<AuditMissionActionPlanItem> {
        return this.http.put<AuditMissionActionPlanItem>(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`, payload);
    }

    deleteMissionActionPlanItem(missionId: number, itemId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`);
    }

    importMissionActionPlan(missionId: number, file: File): Observable<AuditMissionActionPlanItem[]> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<AuditMissionActionPlanItem[]>(`${this.apiUrl}/missions/${missionId}/action-plans/import`, formData);
    }

    getMissionEvidence(missionId: number): Observable<AuditEvidence[]> {
        return this.http.get<AuditEvidence[]>(`${this.apiUrl}/missions/${missionId}/evidence`);
    }

    addMissionEvidence(missionId: number, file: File): Observable<AuditEvidence> {
        const formData = new FormData();
        formData.append('evidenceFile', file);
        return this.http.post<AuditEvidence>(`${this.apiUrl}/missions/${missionId}/evidence`, formData);
    }

    deleteMissionEvidence(missionId: number, evidenceId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/evidence/${evidenceId}`);
    }

    getAllEvidence(): Observable<AuditEvidence[]> {
        return this.http.get<AuditEvidence[]>(`${this.apiUrl}/evidence`);
    }

    getReportsToReview(): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/reports`);
    }
}
