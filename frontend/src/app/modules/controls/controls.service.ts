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
    dueDate: string | null;
    department: string;
    owner: string;
    status: string;
    linkLabel: string;
}

export interface ControlEvidenceItem {
    id: string;
    title: string;
    sourceType: string;
    author: string;
    department: string;
    linkedAudit: string | null;
    uploadedAt: string;
    filename: string;
}

export interface ControlEffectivenessItem {
    controlCode: string;
    title: string;
    implementationDate: string | null;
    incidentsBefore: number;
    incidentsAfter: number;
    recurrenceTrend: string;
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
