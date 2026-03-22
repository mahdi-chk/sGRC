import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus, AuditEvidence } from '../../core/services/auditing.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-auditor-missions',
    templateUrl: './auditor-missions.component.html',
    styleUrls: ['./auditor-missions.component.scss']
})
export class AuditorMissionsComponent implements OnInit {
    missions: AuditMission[] = [];
    filteredMissions: AuditMission[] = [];
    isLoading = false;

    // Stats
    totalAssigned = 0;
    pendingCount = 0;
    completedCount = 0;

    showReportModal = false;
    showDetailModal = false;
    showChecklistModal = false;
    showEvidenceModal = false;
    selectedMission: AuditMission | null = null;
    currentChecklistItems: any[] = [];
    currentEvidences: AuditEvidence[] = [];
    selectedFile: File | null = null;
    isUploading = false;
    backendUrl = environment.apiUrl.replace('/api', '');

    reportData = {
        rapport: '',
        recommandations: ''
    };

    constructor(
        private auditingService: AuditingService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadMyMissions();
    }

    loadMyMissions() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.isLoading = false;
            return;
        }
        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);

        this.auditingService.getMissions().subscribe({
            next: (data) => {
                // The backend usually filters, but frontend filtering provides an extra layer of safety
                this.missions = data.filter(m => Number(m.auditeurId) === userId);
                this.calculateStats();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    calculateStats() {
        this.totalAssigned = this.missions.length;
        this.pendingCount = this.missions.filter(m => m.statut === AuditMissionStatus.EN_COURS).length;
        this.completedCount = this.missions.filter(m => m.statut === AuditMissionStatus.TERMINE).length;
    }

    openDetailModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }

    openReportModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.reportData = {
            rapport: mission.rapport || '',
            recommandations: mission.recommandations || ''
        };
        this.showReportModal = true;
    }

    openChecklistModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.isLoading = true;
        this.auditingService.getMissionChecklistItems(mission.id).subscribe({
            next: (items) => {
                this.currentChecklistItems = items;
                this.isLoading = false;
                this.showChecklistModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors du chargement de la checklist.');
            }
        });
    }

    toggleChecklistItem(item: any, isFinished: boolean) {
        if (!this.selectedMission) return;
        this.auditingService.toggleMissionChecklistItem(this.selectedMission.id, item.id, isFinished).subscribe({
            next: (updatedItem) => {
                item.estFait = updatedItem.estFait;
            },
            error: (err) => {
                console.error(err);
                item.estFait = !isFinished; // revert UI change
                alert('Erreur lors de la mise à jour.');
            }
        });
    }

    // --- PREUVES (EVIDENCE) ---

    openEvidenceModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.loadEvidences(mission.id);
        this.showEvidenceModal = true;
    }

    loadEvidences(missionId: number) {
        this.isLoading = true;
        this.auditingService.getMissionEvidence(missionId).subscribe({
            next: (data) => {
                this.currentEvidences = data;
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
                this.currentEvidences.unshift(newEvidence);
                this.selectedFile = null;
                this.isUploading = false;
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
                this.currentEvidences = this.currentEvidences.filter(e => e.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }

    downloadEvidence(path: string) {
        // Remove trailing slashes from backendUrl just in case
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        // The path stored in DB is like 'src\storage\evidence\file.pdf'
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
        
        // Get token for authorization (backend allows token in query string)
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        
        window.open(urlWithToken, '_blank');
    }

    submitReport() {
        if (!this.selectedMission) return;
        this.isLoading = true;
        this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
            next: () => {
                this.isLoading = false;
                this.showReportModal = false;
                this.loadMyMissions();
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de l\'envoi du rapport.');
            }
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
