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

  uploadDocument(roleKey: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('roleKey', roleKey);
    formData.append('document', file);

    return this.http.post(`${this.apiUrl}/documents`, formData);
  }

  deleteDocument(folderKey: string, fileName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${encodeURIComponent(folderKey)}/${encodeURIComponent(fileName)}`);
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
