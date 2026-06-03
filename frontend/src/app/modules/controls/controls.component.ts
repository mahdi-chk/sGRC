import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsModuleItems, getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlsOverview, ControlsService } from './controls.service';
import { ControlEvaluationsService, ControlEvaluationCampaign } from './control-evaluations.service';
import { RadarChartSeries } from '../../shared/components/radar-chart/radar-chart.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  private readonly currentRole = getStoredControlsRole();
  readonly navItems = getControlsNavItems(this.currentRole);
  readonly modules = getControlsModuleItems(this.currentRole);
  overview: ControlsOverview | null = null;
  isLoading = false;
  campaigns: ControlEvaluationCampaign[] = [];
  cosoRadarSeries: RadarChartSeries[] = [];
  cosoRadarLabels: string[] = [];

  constructor(
    private router: Router,
    private controlsService: ControlsService,
    private evaluationsService: ControlEvaluationsService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  get latestCampaign(): ControlEvaluationCampaign | null {
    return this.campaigns.length ? this.campaigns[0] : null;
  }

  get cosoScore(): number {
    return this.latestCampaign?.summary?.averageScore || 0;
  }

  loadOverview(): void {
    this.isLoading = true;
    this.controlsService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.isLoading = false;
      }
    });

    this.evaluationsService.getCampaigns().subscribe({
      next: campaigns => {
        this.campaigns = campaigns || [];
        this.computeCosoRadar();
      },
      error: () => {
        this.campaigns = [];
        this.cosoRadarSeries = [];
        this.cosoRadarLabels = [];
      }
    });
  }

  computeCosoRadar(): void {
    const campaign = this.latestCampaign;
    if (!campaign?.assessments?.length) {
      this.cosoRadarSeries = [];
      this.cosoRadarLabels = [];
      return;
    }

    const grouped = new Map<string, { total: number; count: number }>();
    for (const assessment of campaign.assessments) {
      const componentName = assessment.component?.title || `Composante ${assessment.componentId}`;
      const entry = grouped.get(componentName) || { total: 0, count: 0 };
      entry.total += assessment.score || 0;
      entry.count += 1;
      grouped.set(componentName, entry);
    }

    this.cosoRadarLabels = Array.from(grouped.keys());
    const values = this.cosoRadarLabels.map(label => {
      const entry = grouped.get(label)!;
      return Math.round(entry.total / entry.count);
    });

    this.cosoRadarSeries = [{
      label: campaign.title || 'Campagne COSO',
      values,
      color: '#4f8cff',
      fillColor: 'rgba(79,140,255,0.18)'
    }];
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

