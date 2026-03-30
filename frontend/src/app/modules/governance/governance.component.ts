import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GovernanceDocument, GovernanceFolder, GovernanceService } from './governance.service';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss']
})
export class GovernanceComponent implements OnInit {
  folders: GovernanceFolder[] = [];
  currentRole = '';
  canEdit = false;
  assignedFolderKey: string | null = null;
  selectedRoleKey = '';
  selectedFile: File | null = null;
  isLoading = false;
  isUploading = false;
  feedbackMessage: string | null = null;
  feedbackType: 'success' | 'error' | null = null;

  constructor(
    private router: Router,
    private governanceService: GovernanceService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  get totalDocuments(): number {
    return this.folders.reduce((total, folder) => total + folder.documents.length, 0);
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.feedbackMessage = null;
    this.feedbackType = null;

    this.governanceService.getDocuments().subscribe({
      next: response => {
        this.folders = response.folders;
        this.currentRole = response.role;
        this.canEdit = response.canEdit;
        this.assignedFolderKey = response.assignedFolderKey;
        this.selectedRoleKey = response.assignedFolderKey || response.folders[0]?.key || '';
        this.isLoading = false;
      },
      error: err => {
        this.feedbackMessage = err?.error?.message || 'Impossible de charger les documents.';
        this.feedbackType = 'error';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  uploadDocument(): void {
    if (!this.canEdit || !this.selectedRoleKey || !this.selectedFile) {
      this.feedbackMessage = 'Selectionnez un dossier et un document.';
      this.feedbackType = 'error';
      return;
    }

    this.isUploading = true;
    this.feedbackMessage = null;
    this.feedbackType = null;

    this.governanceService.uploadDocument(this.selectedRoleKey, this.selectedFile).subscribe({
      next: () => {
        this.feedbackMessage = 'Document ajoute avec succes.';
        this.feedbackType = 'success';
        this.selectedFile = null;
        this.isUploading = false;
        this.loadDocuments();
      },
      error: err => {
        this.feedbackMessage = err?.error?.message || 'Echec de l\'ajout du document.';
        this.feedbackType = 'error';
        this.isUploading = false;
      }
    });
  }

  openDocument(document: GovernanceDocument): void {
    if (document.viewUrl) {
      window.open(document.viewUrl, '_blank', 'noopener');
    }
  }

  downloadDocument(document: GovernanceDocument): void {
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank', 'noopener');
    }
  }

  deleteDocument(document: GovernanceDocument): void {
    if (!this.canEdit) {
      return;
    }

    const confirmed = window.confirm(`Supprimer le document "${document.name}" ?`);
    if (!confirmed) {
      return;
    }

    this.governanceService.deleteDocument(document.folderKey, document.name).subscribe({
      next: () => {
        this.feedbackMessage = 'Document supprime avec succes.';
        this.feedbackType = 'success';
        this.loadDocuments();
      },
      error: err => {
        this.feedbackMessage = err?.error?.message || 'Echec de la suppression du document.';
        this.feedbackType = 'error';
      }
    });
  }

  formatSize(size: number): string {
    if (size < 1024) {
      return `${size} o`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} Ko`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
  }

  getFolderDocumentCount(folder: GovernanceFolder): string {
    const count = folder.documents.length;
    return count <= 1 ? `${count} document` : `${count} documents`;
  }

  getUploadTargets(): GovernanceFolder[] {
    return this.folders;
  }
}
