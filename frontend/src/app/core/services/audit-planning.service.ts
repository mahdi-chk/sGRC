import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum AuditPlanningRecordType {
    MISSION_AUDIT = 'mission_audit',
    PLAN_ACTION_AUDIT = 'plan_action_audit',
}

export interface LookupOption {
    id: number;
    code: string;
    label: string;
    description?: string | null;
    sortOrder?: number | null;
}

export interface AuditSkill {
    id: number;
    code: string;
    label: string;
    description?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface AuditPlanMissionResource {
    id?: number;
    missionId?: number;
    userId: number;
    user?: any;
    assignmentRole?: string | null;
    assignmentRoleCode?: string | null;
    assignmentRoleId?: number | null;
    allocationPercent?: number | null;
}

export interface AuditChecklistTemplate {
    id: number;
    titre: string;
    description: string | null;
    createdById: number;
    createdAt: Date | string;
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
    responsable?: any;
}

export interface AuditMissionActionPlanPayload {
    ordre?: number;
    regleDnssi: string;
    recommandations: string;
    planActionType?: string | null;
    horizon?: string | null;
    priorite?: number | null;
    responsableId?: number | null;
    responsableNom?: string | null;
    echeance?: string | null;
    etatAvancement?: string;
}

export interface AuditMissionWorkflowEvent {
    id: number;
    missionId: number;
    workflowType: string;
    workflowTypeLabel?: string;
    transitionCode: string;
    fromStatus?: string | null;
    fromStatusLabel?: string | null;
    toStatus?: string | null;
    toStatusLabel?: string | null;
    actorUserId?: number;
    actor?: any;
    comment?: string | null;
    createdAt: string | Date;
}

export interface AuditEmailLog {
    id: number;
    planId?: number | null;
    missionId?: number | null;
    scope: string;
    scopeLabel?: string;
    templateCode: string;
    subject: string;
    recipientEmail: string;
    recipientName?: string | null;
    recipientUserId?: number | null;
    recipientLabel?: string;
    actorName?: string | null;
    deliveryStatus: string;
    deliveryStatusLabel?: string;
    errorMessage?: string | null;
    messageId?: string | null;
    createdAt: string | Date;
}

export interface AuditMissionWorkspace {
    mission: AuditPlanMission;
    permissions: {
        canManageResources: boolean;
        canSendMissionOrder: boolean;
        canEditWorkProgram: boolean;
        canExecuteWorkProgram: boolean;
        canSubmitWorkProgram: boolean;
        canValidateWorkProgram: boolean;
        canApproveWorkProgram: boolean;
        canEditReport: boolean;
        canSubmitReport: boolean;
        canValidateReport: boolean;
        canApproveReport: boolean;
        canCreateActionPlan: boolean;
        canUpdateActionPlan: boolean;
        canDeleteActionPlan: boolean;
        canFollowActionPlan: boolean;
        canUploadEvidence: boolean;
        canDeleteEvidence: boolean;
    };
    missionOrder: {
        status: string;
        statusLabel: string;
        reference?: string | null;
        sentAt?: string | Date | null;
        sentBy?: any;
    };
    workProgram: {
        status: string;
        statusLabel: string;
        lastComment?: string | null;
        submittedAt?: string | Date | null;
        validatedAt?: string | Date | null;
        approvedAt?: string | Date | null;
        preparedBy?: any;
        validatedBy?: any;
        approvedBy?: any;
        checklistTemplateId?: number | null;
        completionPercent?: number | null;
        items: AuditMissionChecklistItem[];
    };
    report: {
        status: string;
        statusLabel: string;
        lastComment?: string | null;
        submittedAt?: string | Date | null;
        validatedAt?: string | Date | null;
        approvedAt?: string | Date | null;
        preparedBy?: any;
        validatedBy?: any;
        approvedBy?: any;
        rapport: string;
        recommandations: string;
    };
    actionPlans: AuditMissionActionPlanItem[];
    workflowHistory: AuditMissionWorkflowEvent[];
    emailHistory: AuditEmailLog[];
}

export interface AuditEvidence {
    id: number;
    missionId: number;
    filename: string;
    path: string;
    uploadedById: number;
    createdAt: Date | string;
    uploader?: any;
    mission?: any;
}

export interface AuditRoleResponsibility {
    role: string;
    label: string;
    profile: string;
    responsibilities: string[];
}

export interface AuditResponsibilityMatrixResponse {
    workProgramModel: {
        code: string;
        label: string;
        mappedEntity: string;
        description: string;
    };
    roles: AuditRoleResponsibility[];
}

export interface AuditPlanMissionRequiredSkillLink {
    id: number;
    missionId: number;
    skillId: number;
    skill?: AuditSkill;
}

export interface AuditPlanMission {
    id: number;
    type?: AuditPlanningRecordType | string;
    code?: string | null;
    titre: string;
    objectifs?: string | null;
    responsabilites?: string | null;
    statut: string;
    auditPlanId?: number | null;
    chefMissionId?: number | null;
    auditeurId?: number | null;
    checklistTemplateId?: number | null;
    category?: string | null;
    categoryCode?: string | null;
    quarter?: string | null;
    quarterCode?: string | null;
    axe?: string | null;
    evaluation?: string | null;
    datePrevueDebut?: string | Date | null;
    datePrevueFin?: string | Date | null;
    dateReelleDebut?: string | Date | null;
    dateReelleFin?: string | Date | null;
    progressPercent?: number | null;
    missionOrderStatus?: string | null;
    missionOrderStatusLabel?: string | null;
    missionOrderReference?: string | null;
    workProgramStatus?: string | null;
    workProgramStatusLabel?: string | null;
    reportStatus?: string | null;
    reportStatusLabel?: string | null;
    delai?: string | Date | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    auditSenior?: any;
    chefMission?: any;
    auditeur?: any;
    auditedPrincipal?: any;
    sourceMission?: any;
    resourceAssignments?: AuditPlanMissionResource[];
    requiredSkills?: AuditPlanMissionRequiredSkillLink[];
    is_deleted?: boolean;
    deleted_at?: string | Date | null;
}

export interface AuditPlanTransitionPayload {
    transition: string;
    comment?: string | null;
}

export interface AuditPlanWorkflowEvent {
    id: number;
    planId: number;
    transition?: string | null;
    transitionCode?: string | null;
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
    missionCount?: number;
    recommendationCount?: number;
    availableTransitions?: string[];
    missions?: AuditPlanMission[];
    recommendations?: AuditPlanMission[];
    workflowHistory?: AuditPlanWorkflowEvent[];
    emailHistory?: AuditEmailLog[];
    gantt?: AuditPlanGanttItem[];
    skillsReport?: AuditSkillGapReport;
    summary?: {
        missionCount: number;
        recommendationCount: number;
        completedMissionCount: number;
        inProgressMissionCount: number;
    };
}

export interface AuditPlanMissionResourcesPayload {
    resources: AuditPlanMissionResource[];
    requiredSkillIds?: number[];
}

@Injectable({
    providedIn: 'root'
})
export class AuditPlanningService {
    private apiUrl = `${environment.apiUrl}/audit-planning`;

    constructor(private http: HttpClient) { }

    getResponsibilityMatrix(): Observable<AuditResponsibilityMatrixResponse> {
        return this.http.get<AuditResponsibilityMatrixResponse>(`${this.apiUrl}/responsibility-matrix`);
    }

    getLookupOptions(key: string): Observable<LookupOption[]> {
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

    getMissions(): Observable<AuditPlanMission[]> {
        return this.http.get<AuditPlanMission[]>(`${this.apiUrl}/missions`);
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

    getPlanMissions(planId: number): Observable<AuditPlanMission[]> {
        return this.http.get<AuditPlanMission[]>(`${this.apiUrl}/plans/${planId}/missions`);
    }

    getDeletedPlanMissions(planId: number): Observable<AuditPlanMission[]> {
        return this.http.get<AuditPlanMission[]>(`${this.apiUrl}/plans/${planId}/missions/deleted`);
    }

    createPlanMission(planId: number, payload: Partial<AuditPlanMission>): Observable<AuditPlanMission> {
        return this.http.post<AuditPlanMission>(`${this.apiUrl}/plans/${planId}/missions`, payload);
    }

    updatePlanMission(planId: number, missionId: number, payload: Partial<AuditPlanMission>): Observable<AuditPlanMission> {
        return this.http.put<AuditPlanMission>(`${this.apiUrl}/plans/${planId}/missions/${missionId}`, payload);
    }

    deletePlanMission(planId: number, missionId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/plans/${planId}/missions/${missionId}`);
    }

    restorePlanMission(planId: number, missionId: number): Observable<AuditPlanMission> {
        return this.http.patch<AuditPlanMission>(`${this.apiUrl}/plans/${planId}/missions/${missionId}/restore`, {});
    }

    getPlanRecommendations(planId: number): Observable<AuditPlanMission[]> {
        return this.http.get<AuditPlanMission[]>(`${this.apiUrl}/plans/${planId}/recommendations`);
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

    getWorkProgramTemplates(): Observable<AuditChecklistTemplate[]> {
        return this.http.get<AuditChecklistTemplate[]>(`${this.apiUrl}/work-program-templates`);
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

    getMissionResources(missionId: number): Observable<{ resources: AuditPlanMissionResource[]; requiredSkills: AuditPlanMissionRequiredSkillLink[] }> {
        return this.http.get<{ resources: AuditPlanMissionResource[]; requiredSkills: AuditPlanMissionRequiredSkillLink[] }>(`${this.apiUrl}/missions/${missionId}/resources`);
    }

    updateMissionResources(missionId: number, payload: AuditPlanMissionResourcesPayload): Observable<{ resources: AuditPlanMissionResource[]; requiredSkills: AuditPlanMissionRequiredSkillLink[] }> {
        return this.http.put<{ resources: AuditPlanMissionResource[]; requiredSkills: AuditPlanMissionRequiredSkillLink[] }>(`${this.apiUrl}/missions/${missionId}/resources`, payload);
    }

    getMissionWorkspace(missionId: number): Observable<AuditMissionWorkspace> {
        return this.http.get<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/workspace`);
    }

    sendMissionOrder(missionId: number, payload: { reference?: string | null; comment?: string | null }): Observable<AuditMissionWorkspace> {
        return this.http.post<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/mission-order/send`, payload);
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

    saveMissionWorkProgram(missionId: number, payload: { checklistTemplateId?: number | null; items: Partial<AuditMissionChecklistItem>[] }): Observable<AuditMissionWorkspace> {
        return this.http.put<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/work-program`, payload);
    }

    toggleMissionWorkProgramItem(missionId: number, itemId: number, estFait: boolean): Observable<AuditMissionWorkspace> {
        return this.http.put<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/work-program/${itemId}`, { estFait });
    }

    applyMissionWorkProgramTransition(missionId: number, payload: AuditPlanTransitionPayload): Observable<AuditMissionWorkspace> {
        return this.http.post<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/work-program-transitions`, payload);
    }

    saveMissionReport(missionId: number, payload: { rapport: string; recommandations: string }): Observable<AuditMissionWorkspace> {
        return this.http.put<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/report`, payload);
    }

    applyMissionReportTransition(missionId: number, payload: AuditPlanTransitionPayload): Observable<AuditMissionWorkspace> {
        return this.http.post<AuditMissionWorkspace>(`${this.apiUrl}/missions/${missionId}/report-transitions`, payload);
    }

    getMissionActionPlans(missionId: number): Observable<AuditMissionActionPlanItem[]> {
        return this.http.get<AuditMissionActionPlanItem[]>(`${this.apiUrl}/missions/${missionId}/action-plans`);
    }

    createMissionActionPlan(missionId: number, payload: AuditMissionActionPlanPayload): Observable<AuditMissionActionPlanItem> {
        return this.http.post<AuditMissionActionPlanItem>(`${this.apiUrl}/missions/${missionId}/action-plans`, payload);
    }

    updateMissionActionPlan(missionId: number, itemId: number, payload: Partial<AuditMissionActionPlanPayload>): Observable<AuditMissionActionPlanItem> {
        return this.http.put<AuditMissionActionPlanItem>(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`, payload);
    }

    deleteMissionActionPlan(missionId: number, itemId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`);
    }

    suggestPlan(type: AuditPlanningRecordType = AuditPlanningRecordType.MISSION_AUDIT, planId?: number | null): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/suggest-plan`, { type, planId });
    }

    createMissionsFromPlan(missions: any[], type: AuditPlanningRecordType = AuditPlanningRecordType.MISSION_AUDIT): Observable<any> {
        return this.http.post(`${this.apiUrl}/create-missions`, { missions, type });
    }

    createSuggestedMissionsInPlan(planId: number, missions: any[]): Observable<AuditPlanMission[]> {
        return this.http.post<AuditPlanMission[]>(`${this.apiUrl}/plans/${planId}/suggested-missions`, { missions });
    }
}
