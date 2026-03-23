import { Component, OnInit } from '@angular/core';
import { ReportingService, ReportingStats } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {
  stats: ReportingStats | null = null;
  isLoading = true;

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    this.reportingService.getStats().subscribe(
      data => {
        this.stats = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading stats', error);
        this.isLoading = false;
      }
    );
  }

  getPercent(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
