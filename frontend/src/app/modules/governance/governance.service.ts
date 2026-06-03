import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

export interface GovernanceDocument {
  name: string;
  extension: string;
  size: number;
  lastModified: string;
  folderKey: string;
  folderLabel: string;
  viewUrl?: string;
  downloadUrl?: string;
}

export interface GovernanceFolder {
  key: string;
  label: string;
  relativePath: string;
  documents: GovernanceDocument[];
}

export interface GovernanceDocumentsResponse {
  role: string;
  canEdit: boolean;
  assignedFolderKey: string | null;
  folders: GovernanceFolder[];
}

export interface GovernanceFolderAnalytics {
  key: string;
  label: string;
  relativePath: string;
  documentCount: number;
  recentDocuments: number;
  staleDocuments: number;
  latestUpdate: string | null;
  averageAgeDays: number;
  totalSize: number;
}

export interface GovernanceOverviewResponse {
  role: string;
  canEdit: boolean;
  assignedFolderKey: string | null;
  summary: {
    totalFolders: number;
    populatedFolders: number;
    totalDocuments: number;
    recentDocuments: number;
    staleDocuments: number;
    latestUpdate: string | null;
  };
  folders: GovernanceFolderAnalytics[];
}

export interface GovernanceAuditEntry {
  document: string;
  action: string;
  actor: string;
  actorRole?: string;
  module?: string;
  date: string;
  details: string;
  status: string;
  statusClass: 'success' | 'warning' | 'info' | 'danger';
  method?: string;
  path?: string;
}

export interface GovernanceVersionSnapshot {
  name: string;
  version: string;
  scope: string;
  reason: string;
  owner: string;
  updatedAt: string;
  extension?: string;
  size?: number;
}

export interface GovernanceApprovalStage {
  role: string;
  rule: string;
  owner?: string;
  status?: 'done' | 'current' | 'todo' | 'rejected' | 'changes_requested';
}

export interface GovernanceWorkflowApprover {
  role: string;
  name: string;
  decision: string;
}

export interface GovernanceApprovalWorkflow {
  id?: string;
  name: string;
  scope: string;
  pending: number;
  recentDocuments: number;
  totalDocuments: number;
  channel: string;
  alert: string;
  alertClass: 'success' | 'warning';
  lastUpdate: string | null;
  dueDate?: string;
  status?: 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete';
  priority?: string;
  progress?: number;
  completedApprovals?: number;
  requiredApprovals?: number;
  nextAction?: string;
  actionsRequired?: string[];
  approvers?: GovernanceWorkflowApprover[];
  type?: string;
  decisionRules?: string[];
  module?: string;
  process?: string | null;
  macroProcess?: string | null;
  sourceType?: 'document' | 'risk' | 'audit' | 'incident';
  sourceId?: number | string | null;
  owner?: string;
  assignedTo?: string;
  actionable?: boolean;
  configured?: boolean;
  overridden?: boolean;
  canEditWorkflow?: boolean;
  canApproveWorkflow?: boolean;
  canAdminWorkflow?: boolean;
  stages: GovernanceApprovalStage[];
}

export type GovernanceWorkflowModule = 'Risques' | 'Audit' | 'Incidents';

export interface GovernanceWorkflowTemplate {
  id?: number;
  module: GovernanceWorkflowModule;
  process?: string | null;
  title: string;
  description?: string | null;
  isActive: boolean;
  version?: number;
  stages: GovernanceApprovalStage[];
}

export interface GovernanceWorkflowAccessRule {
  id?: number;
  module: GovernanceWorkflowModule;
  process?: string | null;
  principalType: 'role' | 'user';
  principalRole?: string | null;
  principalUserId?: number | null;
  canView: boolean;
  canEdit: boolean;
  canApprove: boolean;
  canAdmin: boolean;
  principalUser?: {
    id: number;
    nom: string;
    prenom: string;
    mail: string;
  };
}

export interface GovernanceRoleTraceabilityMember {
  id: number;
  name: string;
  mail: string;
  role: string;
  roleLabel: string;
  poste: string;
  departement?: string | null;
}

export interface GovernanceRoleTraceabilityProfile {
  module: string;
  supervisorRole: string;
  supervisorLabel: string;
  supervisor: {
    id: number;
    name: string;
    mail: string;
    poste: string;
    departement?: string | null;
  };
  subordinateLabel: string;
  members: GovernanceRoleTraceabilityMember[];
  stats: {
    members: number;
    assignments: number;
    openItems: number;
    lateItems: number;
  };
}

export interface GovernanceMaturityArea {
  name: string;
  framework: string;
  score: number;
  summary: string;
  recommendation: string;
}

export interface GovernanceAdoptionCampaign {
  title: string;
  target: string;
  coverage: number;
  documentCount: number;
  recentDocuments: number;
  staleDocuments: number;
  latestUpdate: string | null;
  nextStep: string;
}

@Injectable({ providedIn: 'root' })
export class GovernanceService {
  private apiUrl = `${environment.apiUrl}/governance`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getDocuments(): Observable<GovernanceDocumentsResponse> {
    return this.http.get<GovernanceDocumentsResponse>(`${this.apiUrl}/documents`).pipe(
      map(response => ({
        ...response,
        folders: response.folders.map(folder => ({
          ...folder,
          documents: folder.documents.map(document => ({
            ...document,
            viewUrl: this.buildFileUrl(document.folderKey, document.name),
            downloadUrl: this.buildFileUrl(document.folderKey, document.name, true)
          }))
        }))
      }))
    );
  }

  getOverview(): Observable<GovernanceOverviewResponse> {
    return this.http.get<GovernanceOverviewResponse>(`${this.apiUrl}/overview`);
  }

  uploadDocument(roleKey: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('roleKey', roleKey);
    formData.append('document', file);

    return this.http.post(`${this.apiUrl}/documents`, formData);
  }

  deleteDocument(folderKey: string, fileName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${encodeURIComponent(folderKey)}/${encodeURIComponent(fileName)}`);
  }

  getAuditEntries(): Observable<GovernanceAuditEntry[]> {
    return this.http.get<{ entries: GovernanceAuditEntry[] }>(`${this.apiUrl}/history`).pipe(
      map(response => response.entries)
    );
  }

  getVersionSnapshots(): Observable<GovernanceVersionSnapshot[]> {
    return this.http.get<{ snapshots: GovernanceVersionSnapshot[] }>(`${this.apiUrl}/history`).pipe(
      map(response => response.snapshots)
    );
  }

  getApprovalWorkflows(): Observable<GovernanceApprovalWorkflow[]> {
    return this.http.get<{ workflows: GovernanceApprovalWorkflow[] }>(`${this.apiUrl}/approval-workflows`).pipe(
      map(response => response.workflows)
    );
  }

  getWorkflowConfigOptions(): Observable<{ modules: GovernanceWorkflowModule[]; rights: string[] }> {
    return this.http.get<{ modules: GovernanceWorkflowModule[]; rights: string[] }>(`${this.apiUrl}/workflow-config/options`);
  }

  getWorkflowTemplates(): Observable<GovernanceWorkflowTemplate[]> {
    return this.http.get<{ templates: GovernanceWorkflowTemplate[] }>(`${this.apiUrl}/workflow-templates`).pipe(
      map(response => response.templates)
    );
  }

  saveWorkflowTemplate(template: GovernanceWorkflowTemplate): Observable<GovernanceWorkflowTemplate> {
    const request = template.id
      ? this.http.put<{ template: GovernanceWorkflowTemplate }>(`${this.apiUrl}/workflow-templates/${template.id}`, template)
      : this.http.post<{ template: GovernanceWorkflowTemplate }>(`${this.apiUrl}/workflow-templates`, template);

    return request.pipe(map(response => response.template));
  }

  saveWorkflowInstanceConfig(workflow: GovernanceApprovalWorkflow, stages: GovernanceApprovalStage[], description: string = ''): Observable<any> {
    return this.http.put(`${this.apiUrl}/approval-workflows/${encodeURIComponent(workflow.id || '')}/config`, {
      sourceType: workflow.sourceType,
      sourceId: workflow.sourceId,
      process: workflow.process,
      title: workflow.name,
      description,
      stages
    });
  }

  resetWorkflowInstanceConfig(workflowId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/approval-workflows/${encodeURIComponent(workflowId)}/config`);
  }

  getWorkflowAccessRules(): Observable<GovernanceWorkflowAccessRule[]> {
    return this.http.get<{ rules: GovernanceWorkflowAccessRule[] }>(`${this.apiUrl}/workflow-access-rules`).pipe(
      map(response => response.rules)
    );
  }

  saveWorkflowAccessRules(rules: GovernanceWorkflowAccessRule[]): Observable<GovernanceWorkflowAccessRule[]> {
    return this.http.put<{ rules: GovernanceWorkflowAccessRule[] }>(`${this.apiUrl}/workflow-access-rules`, { rules }).pipe(
      map(response => response.rules)
    );
  }

  getRoleTraceabilityProfiles(): Observable<GovernanceRoleTraceabilityProfile[]> {
    return this.http.get<{ profiles: GovernanceRoleTraceabilityProfile[] }>(`${this.apiUrl}/role-traceability`).pipe(
      map(response => response.profiles)
    );
  }

  actOnApprovalWorkflow(id: string, action: 'approve' | 'reject' | 'request_changes' | 'restart', comment: string = ''): Observable<GovernanceApprovalWorkflow> {
    return this.http.post<{ workflow: GovernanceApprovalWorkflow }>(`${this.apiUrl}/approval-workflows/${encodeURIComponent(id)}/actions`, {
      action,
      comment
    }).pipe(
      map(response => response.workflow)
    );
  }

  getMaturityAreas(): Observable<GovernanceMaturityArea[]> {
    return this.http.get<{ areas: GovernanceMaturityArea[] }>(`${this.apiUrl}/maturity`).pipe(
      map(response => response.areas)
    );
  }

  getAdoptionCampaigns(): Observable<GovernanceAdoptionCampaign[]> {
    return this.http.get<{ campaigns: GovernanceAdoptionCampaign[] }>(`${this.apiUrl}/adoption`).pipe(
      map(response => response.campaigns)
    );
  }

  private buildFileUrl(folderKey: string, fileName: string, download: boolean = false): string {
    const token = this.authService.getToken();
    const params = [];

    if (token) {
      params.push(`token=${encodeURIComponent(token)}`);
    }

    if (download) {
      params.push('download=1');
    }

    const query = params.length > 0 ? `?${params.join('&')}` : '';
    return `${this.apiUrl}/documents/file/${encodeURIComponent(folderKey)}/${encodeURIComponent(fileName)}${query}`;
  }
}
