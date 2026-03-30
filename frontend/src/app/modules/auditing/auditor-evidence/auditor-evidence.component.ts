import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditEvidence, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserRole } from '../../../core/models/user-role.enum';

@Component({
  selector: 'app-auditor-evidence',
  templateUrl: './auditor-evidence.component.html',
  styleUrls: ['./auditor-evidence.component.scss']
})
export class AuditorEvidenceComponent implements OnInit {
  missions: AuditMission[] = [];
  selectedMission: AuditMission | null = null;
  evidences: AuditEvidence[] = [];
  isLoading = false;
  isUploading = false;
  selectedFile: File | null = null;
  backendUrl = environment.apiUrl.replace('/api', '');
  currentUserRole: UserRole | null = null;

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    this.isLoading = true;
    const userStr = sessionStorage.getItem('sgrc_user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    const currentUser = JSON.parse(userStr);
    const userId = Number(currentUser.id);
    this.currentUserRole = currentUser.role || null;

    this.auditingService.getMissions().subscribe({
      next: (data) => {
        this.missions = data.filter(m => Number(m.auditeurId) === userId && m.statut !== AuditMissionStatus.ANNULE);
        if (this.isSuperAdmin) {
          this.missions = data.filter(m => m.statut !== AuditMissionStatus.ANNULE);
        }
        this.isLoading = false;
        if (this.missions.length > 0) {
          this.selectMission(this.missions[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  selectMission(mission: AuditMission) {
    this.selectedMission = mission;
    this.loadEvidences(mission.id);
  }

  loadEvidences(missionId: number) {
    this.isLoading = true;
    this.auditingService.getMissionEvidence(missionId).subscribe({
      next: (data) => {
        this.evidences = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadEvidence() {
    if (!this.selectedMission || !this.selectedFile) return;
    this.isUploading = true;
    this.auditingService.addMissionEvidence(this.selectedMission.id, this.selectedFile).subscribe({
      next: (newEvidence) => {
        this.evidences.unshift(newEvidence);
        this.selectedFile = null;
        this.isUploading = false;
        // Reset file input if possible
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error(err);
        this.isUploading = false;
        alert('Erreur lors de l\'upload du fichier.');
      }
    });
  }

  deleteEvidence(evidenceId: number) {
    if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?')) return;
    this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
      next: () => {
        this.evidences = this.evidences.filter(e => e.id !== evidenceId);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  downloadEvidence(path: string) {
    const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
    const normalizedPath = path.replace(/\\/g, '/');
    const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
    const token = sessionStorage.getItem('sgrc_token');
    const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
    window.open(urlWithToken, '_blank');
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  get isSuperAdmin(): boolean {
    return this.currentUserRole === UserRole.SUPER_ADMIN;
  }
}

