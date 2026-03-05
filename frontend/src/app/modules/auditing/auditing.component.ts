import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.scss']
})
export class AuditingComponent implements OnInit {
  activeTab: 'missions' | 'plan' = 'missions';
  missions: AuditMission[] = [];
  suggestedPlan: any[] = [];
  allUsers: any[] = [];
  auditors: any[] = [];

  // UI States
  isLoadingMissions = false;
  isGeneratingPlan = false;
  isCreatingMissions = false;
  isAssigning = false;
  isReporting = false;

  // Modals
  showAssignModal = false;
  showReportModal = false;
  showDetailModal = false;
  selectedMission: AuditMission | null = null;

  // Report Form
  reportData = {
    rapport: '',
    recommandations: ''
  };

  constructor(
    private auditingService: AuditingService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isAuditor && !this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/auditor-missions']);
      return;
    }
    this.loadMissions();
    this.loadUsers();
  }

  get isSeniorAuditor(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDIT_SENIOR || user.role === UserRole.SUPER_ADMIN;
  }

  get isAuditor(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDITEUR || user.role === UserRole.SUPER_ADMIN;
  }

  loadMissions() {
    this.isLoadingMissions = true;
    this.auditingService.getMissions().subscribe({
      next: (data) => {
        this.missions = data;
        this.isLoadingMissions = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMissions = false;
      }
    });
  }

  loadUsers() {
    this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe(users => {
      this.allUsers = users;
      this.auditors = users.filter(u => u.role === UserRole.AUDITEUR);
    });
  }

  generatePlan() {
    this.isGeneratingPlan = true;
    this.suggestedPlan = [];
    this.auditingService.suggestPlan().subscribe({
      next: (plan) => {
        this.suggestedPlan = plan.map(p => ({ ...p, selected: true }));
        this.isGeneratingPlan = false;
        this.activeTab = 'plan';
      },
      error: (err) => {
        console.error(err);
        this.isGeneratingPlan = false;
        alert('Erreur lors de la suggestion du plan d\'audit.');
      }
    });
  }

  createMissions() {
    const selected = this.suggestedPlan.filter(p => p.selected);
    if (selected.length === 0) return;

    this.isCreatingMissions = true;
    this.auditingService.createMissionsFromPlan(selected).subscribe({
      next: () => {
        this.isCreatingMissions = false;
        this.suggestedPlan = [];
        this.activeTab = 'missions';
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isCreatingMissions = false;
        alert('Erreur lors de la création des missions.');
      }
    });
  }

  openDetailModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.showDetailModal = true;
  }

  openAssignModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.showAssignModal = true;
  }

  assignMission(auditeurId: string) {
    if (!this.selectedMission || !auditeurId) return;
    this.isAssigning = true;
    this.auditingService.assignMission(this.selectedMission.id, parseInt(auditeurId)).subscribe({
      next: () => {
        this.isAssigning = false;
        this.showAssignModal = false;
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isAssigning = false;
      }
    });
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
    this.isReporting = true;
    this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
      next: () => {
        this.isReporting = false;
        this.showReportModal = false;
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isReporting = false;
      }
    });
  }

  deleteMission(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) return;

    this.auditingService.deleteMission(id).subscribe({
      next: () => {
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  resetMission(id: number) {
    if (!confirm('Réinitialiser cette mission (effacer rapport et assignation) ?')) return;

    this.auditingService.resetMission(id).subscribe({
      next: () => {
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la réinitialisation.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
