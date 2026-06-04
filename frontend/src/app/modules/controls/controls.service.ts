import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ControlsSummary {
    totalControls: number;
    periodicControls: number;
    ponctualControls: number;
    upcomingActions: number;
    overdueActions: number;
    evidenceCount: number;
    effectivenessScore: number;
    openNonConformities: number;
}

export interface ControlRegistryItem {
    id: number;
    code: string;
    title: string;
    description?: string | null;
    controlType: string;
    controlTypeLabel?: string;
    executionType: string;
    occurrenceLabel: string;
    frequency?: string;
    frequencyLabel: string;
    departmentId?: number | null;
    department: string;
    linkedRisk: string;
    riskIds?: number[];
    risks?: { id: number; title: string }[];
    ownerUserId?: number | null;
    owner: string;
    maturity: number;
    nextReview: string | null;
    lastTestedAt?: string | null;
    effectivenessScore?: number;
    status: string;
    statusLabel?: string;
    tests?: ControlTestExecutionItem[];
}

export interface ControlTestExecutionItem {
    id: number;
    title: string;
    testMethod: string;
    result: string;
    plannedDate: string | null;
    executedAt: string | null;
    tester: string;
    score: number;
    notes: string | null;
    evidenceSummary: string | null;
}

export interface ControlsLookupOption {
    code: string;
    label: string;
}

export interface ControlsLookups {
    controlTypes: ControlsLookupOption[];
    frequencies: ControlsLookupOption[];
    statuses: ControlsLookupOption[];
    testMethods: ControlsLookupOption[];
    testResults: ControlsLookupOption[];
}

export interface ControlPlanningItem {
    id: string;
    title: string;
    scheduleType: string;
    cadence: string;
    occurrenceLabel: string;
    frequencyLabel: string;
    dueDate: string | null;
    department: string;
    owner: string;
    status: string;
    controlCode: string | null;
    linkLabel: string;
}

export interface ControlEvidenceItem {
    id: string;
    title: string;
    sourceType: string;
    author: string;
    depositedBy: string;
    department: string;
    controlCode: string | null;
    controlTitle: string | null;
    linkedAudit: string | null;
    auditLabel: string;
    uploadedAt: string;
    filename: string;
}

export interface ControlEffectivenessItem {
    controlCode: string;
    title: string;
    implementationDate: string | null;
    department: string;
    incidentsBefore: number;
    incidentsAfter: number;
    incidentsReproduced: boolean;
    lastIncidentDate: string | null;
    recurrenceTrend: string;
    evaluationResult: string;
    recurrenceNote: string;
    score: number;
}

export interface ControlNonConformityItem {
    id: number;
    title: string;
    department: string;
    status: string;
    severity: string;
    dueDate: string | null;
    owner: string;
    controlCode: string;
    controlTitle: string;
    detectionDate: string | null;
    followUpStatus: string;
    correctiveAction: string;
    occurredAfterControl: boolean;
    source: string;
}

export interface ControlsOverview {
    generatedAt: string;
    summary: ControlsSummary;
    registry: ControlRegistryItem[];
    planning: ControlPlanningItem[];
    evidence: ControlEvidenceItem[];
    effectiveness: ControlEffectivenessItem[];
    nonConformities: ControlNonConformityItem[];
}

@Injectable({ providedIn: 'root' })
export class ControlsService {
    private apiUrl = `${environment.apiUrl}/controls`;

    constructor(private http: HttpClient) {}

    getOverview(): Observable<ControlsOverview> {
        return this.http.get<ControlsOverview>(`${this.apiUrl}/overview`);
    }

    getControls(): Observable<ControlRegistryItem[]> {
        return this.http.get<ControlRegistryItem[]>(this.apiUrl);
    }

    getLookups(): Observable<ControlsLookups> {
        return this.http.get<ControlsLookups>(`${this.apiUrl}/lookups`);
    }

    createControl(payload: Partial<ControlRegistryItem>): Observable<ControlRegistryItem> {
        return this.http.post<ControlRegistryItem>(this.apiUrl, payload);
    }

    updateControl(id: number, payload: Partial<ControlRegistryItem>): Observable<ControlRegistryItem> {
        return this.http.put<ControlRegistryItem>(`${this.apiUrl}/${id}`, payload);
    }

    deleteControl(id: number): Observable<{ success: boolean }> {
        return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
    }

    createControlTest(controlId: number, payload: any): Observable<ControlRegistryItem> {
        return this.http.post<ControlRegistryItem>(`${this.apiUrl}/${controlId}/tests`, payload);
    }

    updateControlTest(testId: number, payload: any): Observable<ControlRegistryItem> {
        return this.http.put<ControlRegistryItem>(`${this.apiUrl}/tests/${testId}`, payload);
    }

    deleteControlTest(testId: number): Observable<ControlRegistryItem> {
        return this.http.delete<ControlRegistryItem>(`${this.apiUrl}/tests/${testId}`);
    }
}
