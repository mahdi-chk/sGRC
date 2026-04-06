import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceModuleItems, getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceOverview, ComplianceQueryFilters, ComplianceService } from './compliance.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent implements OnInit {
  private readonly currentRole = getStoredComplianceRole();
  readonly navItems = getComplianceNavItems(this.currentRole);
  readonly modules = getComplianceModuleItems(this.currentRole).filter(item => item.route !== '/dashboard/compliance');
  overview: ComplianceOverview | null = null;
  isLoading = false;
  filters: ComplianceQueryFilters = {
    status: '',
    entityKey: ''
  };

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.complianceService.getOverview(this.filters).subscribe({
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

  resetFilters(): void {
    this.filters = {
      status: '',
      entityKey: ''
    };
    this.loadOverview();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
