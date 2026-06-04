import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ControlEvaluationLookupOption {
  id: number;
  code: string;
  label: string;
  description?: string | null;
  sortOrder?: number | null;
}

export interface ControlEvaluationFocusPoint {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
}

export interface ControlEvaluationPrinciple {
  id: number;
  componentId: number;
  code: string;
  title: string;
  description: string | null;
  orderIndex: number;
  focusPoints?: ControlEvaluationFocusPoint[];
}

export interface ControlEvaluationComponentRef {
  id: number;
  code: string;
  title: string;
  description: string | null;
  orderIndex: number;
  principles?: ControlEvaluationPrinciple[];
}

export interface ControlEvaluationSummary {
  assessmentCount: number;
  assessedCount: number;
  deficiencyCount: number;
  majorDeficiencyCount: number;
  averageScore: number;
  lastConclusion: any | null;
}

export interface ControlPrincipleAssessment {
  id: number;
  campaignId: number;
  componentId: number;
  principleId: number;
  implementationAnswer: string | null;
  implementationAnswerCode: string | null;
  operatingAnswer: string | null;
  operatingAnswerCode: string | null;
  result: string | null;
  resultCode: string | null;
  score: number;
  justification: string | null;
  component?: ControlEvaluationComponentRef;
  principle?: ControlEvaluationPrinciple;
  deficiencies?: ControlDeficiency[];
}

export interface ControlDeficiency {
  id: number;
  campaignId: number;
  assessmentId: number | null;
  title: string;
  description: string | null;
  severity: string | null;
  severityCode: string | null;
  status: string | null;
  statusCode: string | null;
  isMajor: boolean;
  impact: string | null;
  dueDate: string | null;
  correctiveAction: string | null;
  component?: ControlEvaluationComponentRef;
  principle?: ControlEvaluationPrinciple;
  compensatingMeasures?: ControlCompensatingMeasure[];
}

export interface ControlCompensatingMeasure {
  id: number;
  deficiencyId: number;
  title: string;
  description: string | null;
  status: string | null;
  statusCode: string | null;
  ownerUserId: number | null;
  dueDate: string | null;
  effectivenessNote: string | null;
}

export interface ControlEvaluationEvidence {
  id: number;
  campaignId: number;
  assessmentId: number | null;
  deficiencyId: number | null;
  title: string;
  sourceType: string | null;
  sourceTypeCode: string | null;
  filename: string | null;
  filePath: string | null;
  mimeType: string | null;
  capturedAt: string | null;
}

export interface ControlEvaluationCampaign {
  id: number;
  title: string;
  description: string | null;
  status: string | null;
  statusCode: string | null;
  objectiveType: string | null;
  objectiveTypeCode: string | null;
  scopeType: string | null;
  scopeTypeCode: string | null;
  scopeLabel: string | null;
  riskTolerance: string | null;
  startDate: string | null;
  dueDate: string | null;
  summary: ControlEvaluationSummary;
  assessments?: ControlPrincipleAssessment[];
  deficiencies?: ControlDeficiency[];
  evidence?: ControlEvaluationEvidence[];
  conclusions?: any[];
}

export interface ControlEvaluationReference {
  components: ControlEvaluationComponentRef[];
}

@Injectable({ providedIn: 'root' })
export class ControlEvaluationsService {
  private apiUrl = `${environment.apiUrl}/control-evaluations`;

  constructor(private http: HttpClient) {}

  getLookup(key: string): Observable<ControlEvaluationLookupOption[]> {
    return this.http.get<ControlEvaluationLookupOption[]>(`${this.apiUrl}/lookups/${key}`);
  }

  getReference(): Observable<ControlEvaluationReference> {
    return this.http.get<ControlEvaluationReference>(`${this.apiUrl}/reference`);
  }

  getCampaigns(): Observable<ControlEvaluationCampaign[]> {
    return this.http.get<ControlEvaluationCampaign[]>(`${this.apiUrl}/campaigns`);
  }

  getCampaign(id: number): Observable<ControlEvaluationCampaign> {
    return this.http.get<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns/${id}`);
  }

  createCampaign(payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns`, payload);
  }

  syncAssessments(campaignId: number): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns/${campaignId}/assessments/sync`, {});
  }

  updateCampaign(id: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.put<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns/${id}`, payload);
  }

  deleteCampaign(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/campaigns/${id}`);
  }

  updateAssessment(id: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.put<ControlEvaluationCampaign>(`${this.apiUrl}/assessments/${id}`, payload);
  }

  createDeficiency(payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/deficiencies`, payload);
  }

  updateDeficiency(id: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.put<ControlEvaluationCampaign>(`${this.apiUrl}/deficiencies/${id}`, payload);
  }

  createEvidence(campaignId: number, payload: FormData): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns/${campaignId}/evidence`, payload);
  }

  deleteEvidence(id: number): Observable<ControlEvaluationCampaign> {
    return this.http.delete<ControlEvaluationCampaign>(`${this.apiUrl}/evidence/${id}`);
  }

  createCompensatingMeasure(deficiencyId: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/deficiencies/${deficiencyId}/measures`, payload);
  }

  updateCompensatingMeasure(id: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.put<ControlEvaluationCampaign>(`${this.apiUrl}/measures/${id}`, payload);
  }

  previewConclusion(campaignId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaigns/${campaignId}/conclusion-preview`);
  }

  validateConclusion(campaignId: number, payload: any): Observable<ControlEvaluationCampaign> {
    return this.http.post<ControlEvaluationCampaign>(`${this.apiUrl}/campaigns/${campaignId}/conclusion`, payload);
  }
}
