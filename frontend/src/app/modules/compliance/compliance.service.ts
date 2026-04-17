import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ComplianceSummary {
  frameworks: number;
  activeRequirements: number;
  mappedRequirements: number;
  uncoveredRequirements: number;
  averageCoverage: number;
  campaignsInProgress: number;
  openGaps: number;
  criticalGaps: number;
  evidenceCount: number;
  pendingUpdates: number;
}

export interface ComplianceFrameworkItem {
  code: string;
  name: string;
  version: string;
  jurisdiction: string;
  owner: string;
  requirements: number;
  mappedRequirements: number;
  coverage: number;
  status: string;
  lastReview: string | null;
}

export interface ComplianceMappingItem {
  requirementCode: string;
  framework: string;
  requirementTitle: string;
  coverageLevel: string;
  linkedControls: number;
  linkedRisks: number;
  linkedPolicies: number;
  linkedActions: number;
  owner: string;
}

export interface ComplianceAssessmentItem {
  id: string;
  title: string;
  framework: string;
  owner: string;
  dueDate: string | null;
  completion: number;
  answered: number;
  totalQuestions: number;
  status: string;
}

export interface ComplianceGapItem {
  id: string;
  title: string;
  framework: string;
  severity: string;
  status: string;
  owner: string;
  dueDate: string | null;
  source: string;
  remediationLink: string;
}

export interface ComplianceEvidenceItem {
  id: string;
  title: string;
  framework: string;
  sourceType: string;
  owner: string;
  uploadedAt: string | null;
  filename: string;
}

export interface ComplianceUpdateItem {
  id: string;
  title: string;
  framework: string;
  impactLevel: string;
  status: string;
  owner: string;
  detectedAt: string | null;
  nextAction: string;
}

export interface ComplianceOverview {
  generatedAt: string;
  role: string;
  summary: ComplianceSummary;
  frameworks: ComplianceFrameworkItem[];
  mappings: ComplianceMappingItem[];
  assessments: ComplianceAssessmentItem[];
  gaps: ComplianceGapItem[];
  evidence: ComplianceEvidenceItem[];
  updates: ComplianceUpdateItem[];
}

export interface ComplianceQueryFilters {
  frameworkId?: number;
  departmentId?: number;
  ownerUserId?: number;
  entityKey?: string;
  status?: string;
}

export interface ComplianceFrameworkRecord {
  id: number;
  code: string;
  name: string;
  version: string;
  jurisdiction: string | null;
  description: string | null;
  ownerUserId: number | null;
  departmentId: number | null;
  entityKey: string | null;
  status: string;
  statusCode?: string | null;
  statusLabel?: string | null;
  effectiveDate: string | null;
  reviewDate: string | null;
  owner?: { id: number; prenom?: string; nom?: string } | null;
  department?: { id: number; nom?: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComplianceRequirementRecord {
  id: number;
  frameworkId: number;
  code: string;
  title: string;
  description: string | null;
  chapter: string | null;
  orderIndex: number;
  applicability: string;
  applicabilityCode?: string | null;
  applicabilityLabel?: string | null;
  status: string;
  statusCode?: string | null;
  statusLabel?: string | null;
  weight: number;
  framework?: ComplianceFrameworkRecord | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComplianceMappingRecord {
  id: number;
  requirementId: number;
  sourceType: string;
  sourceTypeCode?: string | null;
  sourceTypeLabel?: string | null;
  sourceId: number | null;
  relatedEntityKey: string | null;
  coverageLevel: string;
  coverageLevelCode?: string | null;
  coverageLevelLabel?: string | null;
  rationale: string | null;
  ownerUserId: number | null;
  departmentId: number | null;
  entityKey: string | null;
  requirement?: ComplianceRequirementRecord | null;
  owner?: { id: number; prenom?: string; nom?: string } | null;
  department?: { id: number; nom?: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComplianceLinkableOption {
  id: number;
  label: string;
}

export interface ComplianceLinkableSources {
  risk: ComplianceLinkableOption[];
  audit: ComplianceLinkableOption[];
  incident: ComplianceLinkableOption[];
}

export interface ComplianceFrameworkPayload {
  code: string;
  name: string;
  version: string;
  jurisdiction?: string | null;
  description?: string | null;
  entityKey?: string | null;
  status?: string;
  effectiveDate?: string | null;
  reviewDate?: string | null;
}

export interface ComplianceRequirementPayload {
  frameworkId: number;
  code: string;
  title: string;
  description?: string | null;
  chapter?: string | null;
  orderIndex?: number;
  applicability?: string;
  status?: string;
  weight?: number;
}

export interface ComplianceMappingPayload {
  requirementId: number;
  sourceType: string;
  sourceId?: number | null;
  relatedEntityKey?: string | null;
  coverageLevel?: string;
  rationale?: string | null;
  entityKey?: string | null;
}

export interface ComplianceRequirementImportSkipped {
  code: string;
  title: string;
  reason: string;
}

export interface ComplianceRequirementImportResult {
  message: string;
  frameworkId: number;
  framework?: ComplianceFrameworkRecord;
  sourceFile: string;
  extractedCharacters: number;
  previewText: string;
  detectedRequirements: number;
  createdRequirements: number;
  skippedRequirements: number;
  created: ComplianceRequirementRecord[];
  skipped: ComplianceRequirementImportSkipped[];
}

export interface ComplianceAutoMapSkipped {
  requirementCode: string;
  sourceType: string;
  sourceId: number | null;
  reason: string;
}

export interface ComplianceAutoMapResult {
  message: string;
  frameworkId: number;
  createdCount: number;
  skippedCount: number;
  created: ComplianceMappingRecord[];
  skipped: ComplianceAutoMapSkipped[];
}

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private apiUrl = `${environment.apiUrl}/compliance`;

  constructor(private http: HttpClient) {}

  getOverview(filters: ComplianceQueryFilters = {}): Observable<ComplianceOverview> {
    return this.http.get<ComplianceOverview>(`${this.apiUrl}/overview`, {
      params: this.buildParams(filters)
    });
  }

  getFrameworks(filters: ComplianceQueryFilters = {}): Observable<ComplianceFrameworkRecord[]> {
    return this.http.get<ComplianceFrameworkRecord[]>(`${this.apiUrl}/frameworks`, {
      params: this.buildParams(filters)
    });
  }

  createFramework(payload: ComplianceFrameworkPayload): Observable<ComplianceFrameworkRecord> {
    return this.http.post<ComplianceFrameworkRecord>(`${this.apiUrl}/frameworks`, payload);
  }

  updateFramework(id: number, payload: ComplianceFrameworkPayload): Observable<ComplianceFrameworkRecord> {
    return this.http.put<ComplianceFrameworkRecord>(`${this.apiUrl}/frameworks/${id}`, payload);
  }

  deleteFramework(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/frameworks/${id}`);
  }

  getRequirements(frameworkId?: number): Observable<ComplianceRequirementRecord[]> {
    const filters = frameworkId ? { frameworkId } : {};
    return this.http.get<ComplianceRequirementRecord[]>(`${this.apiUrl}/requirements`, {
      params: this.buildParams(filters)
    });
  }

  createRequirement(payload: ComplianceRequirementPayload): Observable<ComplianceRequirementRecord> {
    return this.http.post<ComplianceRequirementRecord>(`${this.apiUrl}/requirements`, payload);
  }

  importRequirements(file: File): Observable<ComplianceRequirementImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ComplianceRequirementImportResult>(`${this.apiUrl}/frameworks/import`, formData);
  }

  updateRequirement(id: number, payload: ComplianceRequirementPayload): Observable<ComplianceRequirementRecord> {
    return this.http.put<ComplianceRequirementRecord>(`${this.apiUrl}/requirements/${id}`, payload);
  }

  deleteRequirement(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/requirements/${id}`);
  }

  getCampaigns(filters: ComplianceQueryFilters = {}): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/campaigns`, {
      params: this.buildParams(filters)
    });
  }

  getGaps(filters: ComplianceQueryFilters = {}): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gaps`, {
      params: this.buildParams(filters)
    });
  }

  getEvidence(filters: ComplianceQueryFilters = {}): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evidence`, {
      params: this.buildParams(filters)
    });
  }

  getMappings(): Observable<ComplianceMappingRecord[]> {
    return this.http.get<ComplianceMappingRecord[]>(`${this.apiUrl}/mappings`);
  }

  createMapping(payload: ComplianceMappingPayload): Observable<ComplianceMappingRecord> {
    return this.http.post<ComplianceMappingRecord>(`${this.apiUrl}/mappings`, payload);
  }

  autoMapFramework(frameworkId: number): Observable<ComplianceAutoMapResult> {
    return this.http.post<ComplianceAutoMapResult>(`${this.apiUrl}/mappings/auto-map`, { frameworkId });
  }

  updateMapping(id: number, payload: ComplianceMappingPayload): Observable<ComplianceMappingRecord> {
    return this.http.put<ComplianceMappingRecord>(`${this.apiUrl}/mappings/${id}`, payload);
  }

  deleteMapping(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/mappings/${id}`);
  }

  getLinkableSources(): Observable<ComplianceLinkableSources> {
    return this.http.get<ComplianceLinkableSources>(`${this.apiUrl}/linkable-sources`);
  }

  private buildParams(filters: ComplianceQueryFilters): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}
