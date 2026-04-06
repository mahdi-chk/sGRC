import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceAssessmentItem, ComplianceOverview, ComplianceService } from './compliance.service';

@Component({
  selector: 'app-compliance-assessments',
  templateUrl: './compliance-assessments.component.html',
  styleUrls: ['./compliance-assessments.component.scss']
})
export class ComplianceAssessmentsComponent implements OnInit {
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

  get assessments(): ComplianceAssessmentItem[] {
    return this.overview?.assessments || [];
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Sans echeance';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }
}
