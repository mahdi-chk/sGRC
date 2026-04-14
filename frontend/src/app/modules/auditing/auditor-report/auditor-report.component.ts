import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-auditor-report',
  templateUrl: './auditor-report.component.html',
  styleUrls: ['./auditor-report.component.scss']
})
export class AuditorReportComponent implements OnInit {
  missions: AuditMission[] = [];
  selectedMission: AuditMission | null = null;
  isLoading = false;
  currentUserRole: UserRole | null = getStoredAuditRole();
  reportData = {
    rapport: '',
    recommandations: ''
  };

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

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

    this.auditingService.getMissions('all').subscribe({
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
    this.reportData = {
      rapport: mission.rapport || '',
      recommandations: mission.recommandations || ''
    };
  }

  submitReport() {
    if (!this.selectedMission) return;
    this.isLoading = true;
    this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Rapport soumis avec succès !');
        // Update local mission data
        if (this.selectedMission) {
          this.selectedMission.rapport = this.reportData.rapport;
          this.selectedMission.recommandations = this.reportData.recommandations;
          this.selectedMission.statut = AuditMissionStatus.TERMINE;
        }
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

  get isSuperAdmin(): boolean {
    return this.currentUserRole === UserRole.SUPER_ADMIN;
  }
}

