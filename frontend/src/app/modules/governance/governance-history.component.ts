import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GovernanceAuditEntry, GovernanceService } from './governance.service';
import { getGovernanceNavItems, getStoredGovernanceRole } from './governance-navigation';

@Component({
  selector: 'app-governance-history',
  templateUrl: './governance-history.component.html',
  styleUrls: ['./governance-history.component.scss']
})
export class GovernanceHistoryComponent implements OnInit {
  readonly navItems = getGovernanceNavItems(getStoredGovernanceRole());
  auditEntries: GovernanceAuditEntry[] = [];
  isLoading = false;

  constructor(
    private router: Router,
    private governanceService: GovernanceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.governanceService.getAuditEntries().subscribe({
      next: entries => {
        this.auditEntries = entries
          .slice()
          .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
        this.isLoading = false;
      },
      error: () => {
        this.auditEntries = [];
        this.isLoading = false;
      }
    });

  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get successfulOperations(): number {
    return this.auditEntries.filter(entry => entry.statusClass === 'success').length;
  }

  get operationsToReview(): number {
    return this.auditEntries.filter(entry => entry.statusClass === 'warning' || entry.statusClass === 'danger').length;
  }

  get uniqueActors(): number {
    return new Set(this.auditEntries.map(entry => entry.actor).filter(Boolean)).size;
  }

  getModuleEntries(module?: string): GovernanceAuditEntry[] {
    return this.auditEntries.filter(entry => entry.module === module).slice(0, 6);
  }

  get recentModules(): string[] {
    return Array.from(new Set(this.auditEntries.map(entry => entry.module || 'Autre'))).slice(0, 4);
  }

  getStatusClass(entry: GovernanceAuditEntry): string {
    return entry.statusClass || 'info';
  }
}
