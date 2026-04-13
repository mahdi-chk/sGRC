import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditRecordType } from '../../../core/services/auditing.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

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
    private auditingService: AuditingService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

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
    this.auditingService.suggestPlan(AuditRecordType.PLAN_ACTION_AUDIT).subscribe({
      next: (plan) => {
        this.suggestedPlan = plan.map((item) => ({ ...item, selected: true }));
        this.isGeneratingPlan = false;
      },
      error: (err) => {
        console.error(err);
        this.isGeneratingPlan = false;
        alert('Erreur lors de la suggestion du plan d actions.');
      }
    });
  }

  createMissions() {
    const selected = this.suggestedPlan.filter((item) => item.selected);
    if (selected.length === 0) {
      return;
    }

    this.isCreatingMissions = true;
    this.auditingService.createMissionsFromPlan(selected, AuditRecordType.PLAN_ACTION_AUDIT).subscribe({
      next: () => {
        this.isCreatingMissions = false;
        this.suggestedPlan = [];
        alert('Plans d actions créés avec succès.');
        this.router.navigate(['/dashboard/audit-checklists']);
      },
      error: (err) => {
        console.error(err);
        this.isCreatingMissions = false;
        alert('Erreur lors de la création des plans d actions.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/auditing']);
  }
}
