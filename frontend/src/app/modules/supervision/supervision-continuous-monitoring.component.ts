import { Component, OnInit } from '@angular/core';
import {
  SupervisionAlert,
  SupervisionHealthTrendPoint,
  SupervisionScoreBreakdown,
  SupervisionService,
  SupervisionWatchItem
} from './supervision.service';

@Component({
  selector: 'app-supervision-continuous-monitoring',
  templateUrl: './supervision-continuous-monitoring.component.html',
  styleUrls: ['./supervision-continuous-monitoring.component.scss']
})
export class SupervisionContinuousMonitoringComponent implements OnInit {
  status = '';
  focus = '';
  alerts: SupervisionAlert[] = [];
  trend: SupervisionHealthTrendPoint[] = [];
  breakdown: SupervisionScoreBreakdown[] = [];
  watchlist: SupervisionWatchItem[] = [];

  constructor(private supervisionService: SupervisionService) {}

  ngOnInit(): void {
    this.supervisionService.getOverview().subscribe(overview => {
      const monitoring = overview.modules.continuousMonitoring;
      this.status = monitoring.status;
      this.focus = monitoring.focus;
      this.alerts = monitoring.alerts;
      this.trend = monitoring.healthTrend;
      this.breakdown = monitoring.breakdown;
      this.watchlist = monitoring.watchlist;
    });
  }
}
