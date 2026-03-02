import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';

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

    // Modals
    showReportModal = false;
    showDetailModal = false;
    selectedMission: AuditMission | null = null;

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
