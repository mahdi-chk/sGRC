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
  date: string;
  details: string;
  status: string;
  statusClass: 'success' | 'warning' | 'info';
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
}

export interface GovernanceApprovalWorkflow {
  name: string;
  scope: string;
  pending: number;
  recentDocuments: number;
  totalDocuments: number;
  sla: string;
  channel: string;
  alert: string;
  alertClass: 'success' | 'warning';
  lastUpdate: string | null;
  stages: GovernanceApprovalStage[];
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
