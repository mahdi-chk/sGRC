import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditEvidence } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-audit-evidence-explorer',
  templateUrl: './audit-evidence-explorer.component.html',
  styleUrls: ['./audit-evidence-explorer.component.scss']
})
export class AuditEvidenceExplorerComponent implements OnInit {
  allEvidences: AuditEvidence[] = [];
  filteredEvidences: AuditEvidence[] = [];
  isLoading = false;
  searchTerm = '';
  backendUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllEvidence();
  }

  loadAllEvidence() {
    this.isLoading = true;
    this.auditingService.getAllEvidence().subscribe({
      next: (data) => {
        this.allEvidences = data;
        this.filteredEvidences = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEvidences = this.allEvidences;
      return;
    }
    this.filteredEvidences = this.allEvidences.filter(ev => 
      ev.filename.toLowerCase().includes(term) || 
      (ev as any).mission?.titre?.toLowerCase().includes(term) ||
      ev.uploader?.prenom?.toLowerCase().includes(term) ||
      ev.uploader?.nom?.toLowerCase().includes(term)
    );
  }

  downloadEvidence(path: string) {
    const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
    const normalizedPath = path.replace(/\\/g, '/');
    const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
    const token = sessionStorage.getItem('sgrc_token');
    const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
    window.open(urlWithToken, '_blank');
  }

  deleteEvidence(ev: AuditEvidence) {
    if (!confirm(`Voulez-vous vraiment supprimer la preuve "${ev.filename}" ?`)) return;
    this.auditingService.deleteMissionEvidence(ev.missionId, ev.id).subscribe({
      next: () => {
        this.allEvidences = this.allEvidences.filter(e => e.id !== ev.id);
        this.onSearch();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
