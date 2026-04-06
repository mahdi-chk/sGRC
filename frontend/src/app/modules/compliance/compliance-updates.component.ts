import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceEvidenceItem, ComplianceOverview, ComplianceService, ComplianceUpdateItem } from './compliance.service';

@Component({
  selector: 'app-compliance-updates',
  templateUrl: './compliance-updates.component.html',
  styleUrls: ['./compliance-updates.component.scss']
})
export class ComplianceUpdatesComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  overview: ComplianceOverview | null = null;
  isLoading = false;

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.complianceService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/compliance']);
  }

  get updates(): ComplianceUpdateItem[] {
    return this.overview?.updates || [];
  }

  get evidence(): ComplianceEvidenceItem[] {
    return this.overview?.evidence || [];
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Date indisponible';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }
}
