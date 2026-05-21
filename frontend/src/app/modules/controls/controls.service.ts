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
    controlType: string;
    executionType: string;
    occurrenceLabel: string;
    frequencyLabel: string;
    department: string;
    linkedRisk: string;
    owner: string;
    maturity: number;
    nextReview: string | null;
    status: string;
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
}
