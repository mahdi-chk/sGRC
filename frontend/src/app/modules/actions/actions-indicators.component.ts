import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionIndicatorItem, ActionsOverview, ActionsService } from './actions.service';
import { RadarChartSeries } from '../../shared/components/radar-chart/radar-chart.component';

@Component({
  selector: 'app-actions-indicators',
  templateUrl: './actions-indicators.component.html',
  styleUrls: ['./actions-indicators.component.scss']
})
export class ActionsIndicatorsComponent implements OnInit {
  readonly navItems = getActionsNavItems(getStoredActionsRole());
  overview: ActionsOverview | null = null;
  isLoading = false;
  actionsRadarSeries: RadarChartSeries[] = [];

  readonly actionsRadarLabels = [
    'Cloture',
    'Efficacite',
    'Dans la cible',
    'Alertes maitrisees',
    'Critiques maitrisees',
    'Retards maitrises'
  ];

  constructor(
    private router: Router,
    private actionsService: ActionsService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.actionsService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.refreshActionsRadarSeries();
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.actionsRadarSeries = [];
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  exportIndicators(): void {
    const rows = this.indicators.map(item => ({
      KPI: item.label,
      Valeur: `${item.value}${item.unit}`,
      Cible: `${item.target}${item.unit}`,
      Tendance: item.trend,
      Commentaire: item.commentary
    }));

    this.downloadCsv('indicateurs-plans-actions.csv', rows);
  }

  get indicators(): ActionIndicatorItem[] {
    return this.overview?.indicators || [];
  }

  get onTargetCount(): number {
    return this.indicators.filter(item => item.value >= item.target).length;
  }

  getTrendClass(value: string | null | undefined): string {
    return `trend-${String(value || '').replace(/_/g, '-')}`;
  }

  refreshActionsRadarSeries(): void {
    if (!this.overview) {
      this.actionsRadarSeries = [];
      return;
    }

    const summary = this.overview.summary;
    const openTotal = Math.max(summary.totalOpenActions, 1);
    const onTargetRate = this.indicators.length > 0 ? Math.round((this.onTargetCount / this.indicators.length) * 100) : 0;

    this.actionsRadarSeries = [
      {
        label: 'Situation actuelle',
        values: [
          summary.completionRate,
          summary.effectivenessScore,
          onTargetRate,
          Math.max(0, 100 - (summary.activeAlerts * 15)),
          Math.max(0, 100 - Math.round((summary.criticalActions / openTotal) * 100)),
          Math.max(0, 100 - Math.round((summary.overdueActions / openTotal) * 100))
        ],
        color: '#2563eb',
        fillColor: 'rgba(37, 99, 235, 0.18)'
      },
      {
        label: 'Objectif cible',
        values: [85, 80, 80, 90, 85, 90],
        color: '#f59e0b',
        fillColor: 'rgba(245, 158, 11, 0.12)'
      }
    ];
  }

  private downloadCsv(filename: string, rows: Array<Record<string, unknown>>): void {
    if (!rows.length) {
      return;
    }

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(';'),
      ...rows.map(row => headers.map(header => this.escapeCsv(row[header])).join(';'))
    ].join('\n');
    const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  private escapeCsv(value: unknown): string {
    const text = String(value ?? '').replace(/"/g, '""');
    return `"${text}"`;
  }
}
