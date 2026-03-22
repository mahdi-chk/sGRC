import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditChecklistTemplate } from '../../../core/services/auditing.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss']
})
export class PlanificationComponent implements OnInit {
  suggestedPlan: any[] = [];
  isGeneratingPlan = false;
  isCreatingMissions = false;

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/auditor-missions']);
      return;
    }
  }

  get isSeniorAuditor(): boolean {
    const userString = sessionStorage.getItem('sgrc_user');
    const userAddress = userString ? JSON.parse(userString) : null;
    return userAddress?.role === UserRole.AUDIT_SENIOR || userAddress?.role === UserRole.SUPER_ADMIN;
  }

  generatePlan() {
    this.isGeneratingPlan = true;
    this.suggestedPlan = [];
    this.auditingService.suggestPlan().subscribe({
      next: (plan) => {
        this.suggestedPlan = plan.map(p => ({ ...p, selected: true }));
        this.isGeneratingPlan = false;
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
        alert('Missions créées avec succès ! Redirection vers la liste...');
        this.router.navigate(['/dashboard/auditing']);
      },
      error: (err) => {
        console.error(err);
        this.isCreatingMissions = false;
        alert('Erreur lors de la création des missions.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/auditing']);
  }
}
