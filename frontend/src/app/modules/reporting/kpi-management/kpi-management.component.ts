import { Component, OnInit } from '@angular/core';
import { ReportingService, KPI } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kpi-management',
  templateUrl: './kpi-management.component.html',
  styleUrls: ['./kpi-management.component.scss']
})
export class KpiManagementComponent implements OnInit {
  kpis: KPI[] = [];
  isLoading = true;

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadKpis();
  }

  loadKpis() {
    this.isLoading = true;
    this.reportingService.getKpis().subscribe(
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

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
