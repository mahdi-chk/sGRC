import { Component, OnInit } from '@angular/core';
import { AuditPlanningRecordType, AuditPlanningService } from '../../../core/services/audit-planning.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { getAuditPlanningNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss']
})
export class PlanificationComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  suggestedPlan: any[] = [];
  isGeneratingPlan = false;
  isCreatingMissions = false;

  constructor(
    private auditPlanningService: AuditPlanningService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditPlanningNavItems(this.currentUserRole);
  }

  get selectedSuggestionsCount(): number {
    return this.suggestedPlan.filter((item) => item.selected).length;
  }

  ngOnInit(): void {
    if (!this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/audit-plans']);
      return;
    }
  }

  get isSeniorAuditor(): boolean {
    const userString = sessionStorage.getItem('sgrc_user');
    const userAddress = userString ? JSON.parse(userString) : null;
    return userAddress?.role === UserRole.AUDIT_DIRECTEUR || userAddress?.role === UserRole.SUPER_ADMIN;
  }

  generatePlan() {
    this.isGeneratingPlan = true;
    this.suggestedPlan = [];
    this.auditPlanningService.suggestPlan(AuditPlanningRecordType.MISSION_AUDIT).subscribe({
      next: (plan) => {
        this.suggestedPlan = plan.map((item) => ({ ...item, selected: true }));
        this.isGeneratingPlan = false;
      },
      error: (err) => {
        console.error(err);
        this.isGeneratingPlan = false;
        alert('Erreur lors de la suggestion des missions.');
      }
    });
  }

  createMissions() {
    const selected = this.suggestedPlan.filter((item) => item.selected);
    if (selected.length === 0) {
      return;
    }

    this.isCreatingMissions = true;
    this.auditPlanningService.createMissionsFromPlan(selected, AuditPlanningRecordType.MISSION_AUDIT).subscribe({
      next: () => {
        this.isCreatingMissions = false;
        this.suggestedPlan = [];
        alert('Missions creees avec succes.');
        this.router.navigate(['/dashboard/audit-plans']);
      },
      error: (err) => {
        console.error(err);
        this.isCreatingMissions = false;
        alert('Erreur lors de la creation des missions.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/audit-plans']);
  }

  goToPlans() {
    this.router.navigate(['/dashboard/audit-plans']);
  }

  goToAudits() {
    this.router.navigate(['/dashboard/audit-plans']);
  }
}
