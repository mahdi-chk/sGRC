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
    planActionType?: string | null;
    code?: string | null;
    titre: string;
    objectifs?: string | null;
    responsabilites?: string | null;
    description?: string | null;
    statut: AuditMissionStatus | string;
    riskId?: number | null;
    auditPlanId?: number | null;
    auditSeniorId: number;
    chefMissionId?: number | null;
    auditeurId?: number | null;
    auditedPrincipalId?: number | null;
    checklistTemplateId?: number | null;
    category?: string | null;
    categoryCode?: string | null;
    categoryId?: number | null;
    axe?: string | null;
    evaluation?: string | null;
    quarter?: string | null;
    quarterCode?: string | null;
    quarterId?: number | null;
    datePrevueDebut?: string | Date | null;
    datePrevueFin?: string | Date | null;
    dateReelleDebut?: string | Date | null;
    dateReelleFin?: string | Date | null;
    progressPercent?: number | null;
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
    chefMission?: any;
    auditeur?: any;
    auditedPrincipal?: any;
    auditPlan?: any;
    sourceMission?: any;
    resourceAssignments?: AuditMissionResource[];
    requiredSkills?: AuditMissionRequiredSkillLink[];
}

export interface LookupOption {
    id: number;
    code: string;
    label: string;
    description?: string | null;
    sortOrder?: number | null;
}

export interface AuditPlan {
    id: number;
    nom: string;
    calendrier?: string | null;
    description?: string | null;
    status?: string | null;
    statusCode?: string | null;
    statusId?: number | null;
    nature?: string | null;
    natureCode?: string | null;
    natureId?: number | null;
    isTemplate: boolean;
    dateDebut?: string | Date | null;
    dateFin?: string | Date | null;
    createdById?: number;
    createdBy?: any;
    submittedAt?: string | Date | null;
    validatedDirectionAt?: string | Date | null;
    validatedCouncilAt?: string | Date | null;
    validatedCommitteeAt?: string | Date | null;
    closedAt?: string | Date | null;
    closedDefinitivelyAt?: string | Date | null;
    missionCount?: number;
    recommendationCount?: number;
    availableTransitions?: string[];
    isEditable?: boolean;
    missions?: AuditMission[];
    recommendations?: AuditMission[];
    workflowHistory?: AuditPlanWorkflowEvent[];
    gantt?: AuditPlanGanttItem[];
    skillsReport?: AuditSkillGapReport;
    summary?: {
        missionCount: number;
        recommendationCount: number;
        completedMissionCount: number;
        inProgressMissionCount: number;
    };
}

export interface AuditPlanWorkflowEvent {
    id: number;
    planId: number;
    transition?: string | null;
    transitionCode?: string | null;
    transitionId?: number | null;
    fromStatusId?: number | null;
    fromStatusCode?: string | null;
    fromStatusLabel?: string | null;
    toStatusId?: number | null;
    toStatusCode?: string | null;
    toStatusLabel?: string | null;
    actorUserId?: number;
    actor?: any;
    comment?: string | null;
    createdAt: string | Date;
}

export interface AuditPlanTransitionPayload {
    transition: string;
    comment?: string | null;
}

export interface AuditPlanGanttItem {
    id: number;
    code?: string | null;
    titre: string;
    quarterCode?: string | null;
    quarterLabel?: string | null;
    statusCode?: string | null;
    statusLabel?: string | null;
    datePrevueDebut?: string | Date | null;
    datePrevueFin?: string | Date | null;
    dateReelleDebut?: string | Date | null;
    dateReelleFin?: string | Date | null;
    progressPercent?: number | null;
}

export interface AuditSkill {
    id: number;
    code: string;
    label: string;
    description?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface AuditMissionRequiredSkillLink {
    id: number;
    missionId: number;
    skillId: number;
    skill?: AuditSkill;
}

export interface AuditMissionResource {
    id?: number;
    missionId?: number;
    userId: number;
    user?: any;
    assignmentRole?: string | null;
    assignmentRoleCode?: string | null;
    assignmentRoleId?: number | null;
    allocationPercent?: number | null;
}

export interface AuditMissionResourcesPayload {
    resources: AuditMissionResource[];
    requiredSkillIds?: number[];
}

export interface AuditSkillGapMission {
    missionId: number;
    missionCode?: string | null;
    missionTitle: string;
    coverage: 'covered' | 'partial' | 'gap';
    requiredSkillCount: number;
    availableSkillCount: number;
    coveredSkillCount: number;
    gapSkillCount: number;
    requiredSkills: AuditSkill[];
    gapSkills: AuditSkill[];
}

export interface AuditSkillGapReport {
    summary: {
        missionCount: number;
        coveredCount: number;
        partialCount: number;
        gapCount: number;
    };
    missions: AuditSkillGapMission[];
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
    planActionType?: string | null;
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
    planActionType?: string | null;
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
    private planningApiUrl = `${environment.apiUrl}/audit-planning`;

    constructor(private http: HttpClient) { }

    getMissions(type: AuditRecordType | 'all' = AuditRecordType.MISSION_AUDIT): Observable<AuditMission[]> {
        let params = new HttpParams();
        if (type !== 'all') {
            params = params.set('type', type);
        }
        return this.http.get<AuditMission[]>(`${this.planningApiUrl}/missions`, { params });
    }

    suggestPlan(type: AuditRecordType = AuditRecordType.MISSION_AUDIT, planId?: number | null): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/suggest-plan`, { type, planId });
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

    importActionPlans(file: File, riskId?: number | null, planActionType?: string | null): Observable<AuditMission[]> {
        const formData = new FormData();
        formData.append('file', file);
        if (riskId) {
            formData.append('riskId', String(riskId));
        }
        if (planActionType) {
            formData.append('planActionType', planActionType);
        }
        return this.http.post<AuditMission[]>(`${this.apiUrl}/action-plans/import`, formData);
    }

    importMissions(file: File, planActionType?: string | null): Observable<AuditMission[]> {
        const formData = new FormData();
        formData.append('file', file);
        if (planActionType) {
            formData.append('planActionType', planActionType);
        }
        return this.http.post<AuditMission[]>(`${this.apiUrl}/missions/import`, formData);
    }

    getChecklistTemplates(): Observable<AuditChecklistTemplate[]> {
        return this.http.get<AuditChecklistTemplate[]>(`${this.apiUrl}/checklists`);
    }

    createChecklistTemplate(data: { titre: string, description?: string, items: string[] }): Observable<AuditChecklistTemplate> {
        return this.http.post<AuditChecklistTemplate>(`${this.apiUrl}/checklists`, data);
    }

    updateChecklistTemplate(id: number, data: { titre: string, description?: string, items: string[] }): Observable<AuditChecklistTemplate> {
        return this.http.put<AuditChecklistTemplate>(`${this.apiUrl}/checklists/${id}`, data);
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

    getAuditLookupOptions(key: string): Observable<LookupOption[]> {
        return this.http.get<LookupOption[]>(`${this.apiUrl}/lookups/${encodeURIComponent(key)}`);
    }

    getPlans(filters?: Record<string, string | null | undefined>): Observable<AuditPlan[]> {
        let params = new HttpParams();
        Object.entries(filters || {}).forEach(([key, value]) => {
            if (value !== null && value !== undefined && String(value).trim() !== '') {
                params = params.set(key, String(value));
            }
        });

        return this.http.get<AuditPlan[]>(`${this.apiUrl}/plans`, { params });
    }

    createPlan(payload: Partial<AuditPlan>): Observable<AuditPlan> {
        return this.http.post<AuditPlan>(`${this.apiUrl}/plans`, payload);
    }

    getPlan(planId: number): Observable<AuditPlan> {
        return this.http.get<AuditPlan>(`${this.apiUrl}/plans/${planId}`);
    }

    updatePlan(planId: number, payload: Partial<AuditPlan>): Observable<AuditPlan> {
        return this.http.put<AuditPlan>(`${this.apiUrl}/plans/${planId}`, payload);
    }

    deletePlan(planId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/plans/${planId}`);
    }

    restorePlan(planId: number): Observable<AuditPlan> {
        return this.http.patch<AuditPlan>(`${this.apiUrl}/plans/${planId}/restore`, {});
    }

    applyPlanTransition(planId: number, payload: AuditPlanTransitionPayload): Observable<AuditPlan> {
        return this.http.post<AuditPlan>(`${this.apiUrl}/plans/${planId}/transitions`, payload);
    }

    getPlanWorkflowHistory(planId: number): Observable<AuditPlanWorkflowEvent[]> {
        return this.http.get<AuditPlanWorkflowEvent[]>(`${this.apiUrl}/plans/${planId}/workflow-history`);
    }

    getPlanMissions(planId: number): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/plans/${planId}/missions`);
    }

    createPlanMission(planId: number, payload: Partial<AuditMission>): Observable<AuditMission> {
        return this.http.post<AuditMission>(`${this.apiUrl}/plans/${planId}/missions`, payload);
    }

    getPlanRecommendations(planId: number): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/plans/${planId}/recommendations`);
    }

    getPlanGantt(planId: number): Observable<AuditPlanGanttItem[]> {
        return this.http.get<AuditPlanGanttItem[]>(`${this.apiUrl}/plans/${planId}/gantt`);
    }

    getPlanSkillsReport(planId: number): Observable<AuditSkillGapReport> {
        return this.http.get<AuditSkillGapReport>(`${this.apiUrl}/plans/${planId}/skills-report`);
    }

    getPlanExportData(planId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/plans/${planId}/export`);
    }

    getSkills(): Observable<AuditSkill[]> {
        return this.http.get<AuditSkill[]>(`${this.apiUrl}/skills`);
    }

    createSkill(payload: Partial<AuditSkill>): Observable<AuditSkill> {
        return this.http.post<AuditSkill>(`${this.apiUrl}/skills`, payload);
    }

    updateSkill(skillId: number, payload: Partial<AuditSkill>): Observable<AuditSkill> {
        return this.http.put<AuditSkill>(`${this.apiUrl}/skills/${skillId}`, payload);
    }

    deleteSkill(skillId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/skills/${skillId}`);
    }

    restoreSkill(skillId: number): Observable<AuditSkill> {
        return this.http.patch<AuditSkill>(`${this.apiUrl}/skills/${skillId}/restore`, {});
    }

    getMissionResources(missionId: number): Observable<{ resources: AuditMissionResource[]; requiredSkills: AuditMissionRequiredSkillLink[] }> {
        return this.http.get<{ resources: AuditMissionResource[]; requiredSkills: AuditMissionRequiredSkillLink[] }>(`${this.apiUrl}/missions/${missionId}/resources`);
    }

    updateMissionResources(missionId: number, payload: AuditMissionResourcesPayload): Observable<{ resources: AuditMissionResource[]; requiredSkills: AuditMissionRequiredSkillLink[] }> {
        return this.http.put<{ resources: AuditMissionResource[]; requiredSkills: AuditMissionRequiredSkillLink[] }>(`${this.apiUrl}/missions/${missionId}/resources`, payload);
    }
}
