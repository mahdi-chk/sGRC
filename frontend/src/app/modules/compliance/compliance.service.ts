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

export interface ComplianceCampaignRecord {
  id: number;
  frameworkId: number;
  title: string;
  status: string;
  statusCode?: string | null;
  statusLabel?: string | null;
  ownerUserId: number | null;
  assignedUserId: number | null;
  departmentId: number | null;
  entityKey: string | null;
  dueDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  framework?: ComplianceFrameworkRecord | null;
  owner?: { id: number; prenom?: string; nom?: string } | null;
  assignee?: { id: number; prenom?: string; nom?: string } | null;
  department?: { id: number; nom?: string } | null;
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

export interface ComplianceGapRecord {
  id: number;
  requirementId: number | null;
  title: string;
  description: string | null;
  severity: string;
  severityCode?: string | null;
  severityLabel?: string | null;
  status: string;
  statusCode?: string | null;
  statusLabel?: string | null;
  sourceType: string;
  sourceTypeCode?: string | null;
  sourceTypeLabel?: string | null;
  sourceId: number | null;
  ownerUserId: number | null;
  departmentId: number | null;
  entityKey: string | null;
  dueDate: string | null;
  remediationActionId: string | null;
  requirement?: ComplianceRequirementRecord | null;
  owner?: { id: number; prenom?: string; nom?: string } | null;
  department?: { id: number; nom?: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComplianceEvidenceRecord {
  id: number;
  requirementId: number | null;
  title: string;
  sourceType: string;
  sourceTypeCode?: string | null;
  sourceTypeLabel?: string | null;
  sourceId: number | null;
  filename: string | null;
  filePath: string | null;
  mimeType: string | null;
  ownerUserId: number | null;
  departmentId: number | null;
  entityKey: string | null;
  capturedAt: string | null;
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

export interface ComplianceCampaignPayload {
  frameworkId: number;
  title: string;
  status?: string;
  assignedUserId?: number | null;
  dueDate?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  entityKey?: string | null;
}

export interface ComplianceGapPayload {
  requirementId?: number | null;
  title: string;
  description?: string | null;
  severity?: string;
  status?: string;
  sourceType?: string;
  sourceId?: number | null;
  dueDate?: string | null;
  remediationActionId?: string | null;
  entityKey?: string | null;
}

export interface ComplianceEvidencePayload {
  requirementId?: number | null;
  title: string;
  sourceType?: string;
  sourceId?: number | null;
  filename?: string | null;
  filePath?: string | null;
  mimeType?: string | null;
  capturedAt?: string | null;
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

export interface CompliancePermissions {
  role: string;
  canViewFrameworks: boolean;
  canViewRequirements: boolean;
  canCreateFrameworks: boolean;
  canImportFrameworks: boolean;
  canEditFrameworks: boolean;
  canDeleteFrameworks: boolean;
  canCreateRequirements: boolean;
  canEditRequirements: boolean;
  canDeleteRequirements: boolean;
  canManageMappings: boolean;
  readRoles: string[];
  editRoles: string[];
  mappingEditorRoles: string[];
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

  getPermissions(): Observable<CompliancePermissions> {
    return this.http.get<CompliancePermissions>(`${this.apiUrl}/permissions`);
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

  getCampaigns(filters: ComplianceQueryFilters = {}): Observable<ComplianceCampaignRecord[]> {
    return this.http.get<ComplianceCampaignRecord[]>(`${this.apiUrl}/campaigns`, {
      params: this.buildParams(filters)
    });
  }

  createCampaign(payload: ComplianceCampaignPayload): Observable<ComplianceCampaignRecord> {
    return this.http.post<ComplianceCampaignRecord>(`${this.apiUrl}/campaigns`, payload);
  }

  updateCampaign(id: number, payload: ComplianceCampaignPayload): Observable<ComplianceCampaignRecord> {
    return this.http.put<ComplianceCampaignRecord>(`${this.apiUrl}/campaigns/${id}`, payload);
  }

  deleteCampaign(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/campaigns/${id}`);
  }

  getGaps(filters: ComplianceQueryFilters = {}): Observable<ComplianceGapRecord[]> {
    return this.http.get<ComplianceGapRecord[]>(`${this.apiUrl}/gaps`, {
      params: this.buildParams(filters)
    });
  }

  createGap(payload: ComplianceGapPayload): Observable<ComplianceGapRecord> {
    return this.http.post<ComplianceGapRecord>(`${this.apiUrl}/gaps`, payload);
  }

  updateGap(id: number, payload: ComplianceGapPayload): Observable<ComplianceGapRecord> {
    return this.http.put<ComplianceGapRecord>(`${this.apiUrl}/gaps/${id}`, payload);
  }

  deleteGap(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/gaps/${id}`);
  }

  getEvidence(filters: ComplianceQueryFilters = {}): Observable<ComplianceEvidenceRecord[]> {
    return this.http.get<ComplianceEvidenceRecord[]>(`${this.apiUrl}/evidence`, {
      params: this.buildParams(filters)
    });
  }

  createEvidence(payload: ComplianceEvidencePayload): Observable<ComplianceEvidenceRecord> {
    return this.http.post<ComplianceEvidenceRecord>(`${this.apiUrl}/evidence`, payload);
  }

  updateEvidence(id: number, payload: ComplianceEvidencePayload): Observable<ComplianceEvidenceRecord> {
    return this.http.put<ComplianceEvidenceRecord>(`${this.apiUrl}/evidence/${id}`, payload);
  }

  deleteEvidence(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/evidence/${id}`);
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
