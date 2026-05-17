import { Component, OnInit } from '@angular/core';
import { ReportingService, KPI } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';

@Component({
  selector: 'app-kpi-management',
  templateUrl: './kpi-management.component.html',
  styleUrls: ['./kpi-management.component.scss']
})
export class KpiManagementComponent implements OnInit {
  kpis: KPI[] = [];
  isLoading = true;
  selectedPeriod = 'all';
  readonly navItems = REPORTING_NAV_ITEMS;
  readonly periodOptions = [
    { value: 'all', label: 'Tout' },
    { value: '30', label: '30 j' },
    { value: '90', label: '90 j' },
    { value: '180', label: '180 j' },
    { value: '365', label: '12 mois' },
  ];

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadKpis();
  }

  loadKpis() {
    this.isLoading = true;
    this.reportingService.getKpis(this.selectedPeriod).subscribe(
      data => {
        this.kpis = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading KPIs', error);
        this.isLoading = false;
      }
    );
  }

  setPeriod(period: string): void {
    if (this.selectedPeriod === period) {
      return;
    }

    this.selectedPeriod = period;
    this.loadKpis();
  }

  getProgress(kpi: KPI): number {
    if (kpi.unit === '%') {
      return Math.max(0, Math.min(100, kpi.value));
    }

    if (kpi.target === undefined || kpi.target === 0) {
      return kpi.value > 0 ? 100 : 0;
    }

    if (kpi.inverseTarget) {
      return kpi.value === 0 ? 100 : Math.max(0, Math.min(100, 100 - ((kpi.value / Math.max(kpi.target, 1)) * 100)));
    }

    return Math.max(0, Math.min(100, (kpi.value / kpi.target) * 100));
  }

  getStatusLabel(kpi: KPI): string {
    if (kpi.status === 'good') {
      return 'Maitrise';
    }

    if (kpi.status === 'warning') {
      return 'Surveillance';
    }

    return 'Prioritaire';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
