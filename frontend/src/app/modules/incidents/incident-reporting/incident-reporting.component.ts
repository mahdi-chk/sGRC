import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import { RadarChartSeries } from '../../../shared/components/radar-chart/radar-chart.component';

interface CountShare {
  label: string;
  count: number;
  share: number;
  cssClass?: string;
}

interface MonthlyTrend {
  label: string;
  created: number;
  resolved: number;
}

@Component({
  selector: 'app-incident-reporting',
  templateUrl: './incident-reporting.component.html',
  styleUrls: ['./incident-reporting.component.scss']
})
export class IncidentReportingComponent implements OnInit {
  currentUserRole = getStoredIncidentRole();
  incidents: Incident[] = [];
  isLoading = false;
  totalIncidents = 0;
  openIncidents = 0;
  resolvedIncidents = 0;
  criticalIncidents = 0;
  highPriorityIncidents = 0;
  overdueIncidents = 0;
  dueSoonIncidents = 0;
  unassignedIncidents = 0;
  linkedRiskIncidents = 0;
  newThisMonth = 0;
  closedThisMonth = 0;
  backlogRate = 0;
  assignmentRate = 0;
  criticalOpenRate = 0;
  riskLinkRate = 0;
  averageCriticalAgeDays = 0;
  averageResolutionDays = 0;
  averageOpenAgeDays = 0;
  statusDistribution: CountShare[] = [];
  domainDistribution: CountShare[] = [];
  levelDistribution: CountShare[] = [];
  processDistribution: CountShare[] = [];
  criticalDomainDistribution: CountShare[] = [];
  agingBuckets: CountShare[] = [];
  monthlyTrend: MonthlyTrend[] = [];
  recentIncidents: Incident[] = [];
  incidentRadarSeries: RadarChartSeries[] = [];

  readonly incidentRadarLabels = [
    'Resolution',
    'Assignation',
    'Lien risque',
    'Backlog maitrise',
    'Critiques maitrises',
    'Delais maitrises'
  ];

  private readonly statusMeta: Record<string, { label: string; cssClass: string }> = {
    [IncidentStatus.NOUVEAU]: { label: 'Nouveaux', cssClass: 'status-new' },
    [IncidentStatus.EN_COURS]: { label: 'En cours', cssClass: 'status-progress' },
    [IncidentStatus.TRAITE]: { label: 'Traites', cssClass: 'status-resolved' },
    [IncidentStatus.CLOS]: { label: 'Clos', cssClass: 'status-closed' }
  };

  private readonly levelOrder = [
    IncidentNiveauRisque.CRITICAL,
    IncidentNiveauRisque.HIGH,
    IncidentNiveauRisque.SIGNIFICANT,
    IncidentNiveauRisque.MEDIUM,
    IncidentNiveauRisque.LIMITED,
    IncidentNiveauRisque.LOW
  ];

  private readonly levelMeta: Record<string, { label: string; cssClass: string }> = {
    [IncidentNiveauRisque.CRITICAL]: { label: 'Critique', cssClass: 'level-critical' },
    [IncidentNiveauRisque.HIGH]: { label: 'Eleve', cssClass: 'level-high' },
    [IncidentNiveauRisque.SIGNIFICANT]: { label: 'Significatif', cssClass: 'level-significant' },
    [IncidentNiveauRisque.MEDIUM]: { label: 'Moyen', cssClass: 'level-medium' },
    [IncidentNiveauRisque.LIMITED]: { label: 'Limite', cssClass: 'level-limited' },
    [IncidentNiveauRisque.LOW]: { label: 'Faible', cssClass: 'level-low' }
  };

  private readonly levelAliases: Record<string, IncidentNiveauRisque> = {
    low: IncidentNiveauRisque.LOW,
    faible: IncidentNiveauRisque.LOW,
    limited: IncidentNiveauRisque.LIMITED,
    limite: IncidentNiveauRisque.LIMITED,
    medium: IncidentNiveauRisque.MEDIUM,
    moyen: IncidentNiveauRisque.MEDIUM,
    significant: IncidentNiveauRisque.SIGNIFICANT,
    significatif: IncidentNiveauRisque.SIGNIFICANT,
    high: IncidentNiveauRisque.HIGH,
    eleve: IncidentNiveauRisque.HIGH,
    critical: IncidentNiveauRisque.CRITICAL,
    critique: IncidentNiveauRisque.CRITICAL
  };

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  get navItems() {
    return getIncidentNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = data.map(incident => this.mapIncidentCodes(incident));
        this.totalIncidents = this.incidents.length;
        const openItems = this.incidents.filter(i => this.getNormalizedStatus(i) !== IncidentStatus.CLOS);
        const criticalOpenItems = openItems.filter(i => this.getNormalizedLevel(i) === IncidentNiveauRisque.CRITICAL);
        this.openIncidents = openItems.length;
        this.resolvedIncidents = this.incidents.filter(i => {
          const status = this.getNormalizedStatus(i);
          return status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS;
        }).length;
        this.criticalIncidents = this.incidents.filter(i => this.getNormalizedLevel(i) === IncidentNiveauRisque.CRITICAL).length;
        this.highPriorityIncidents = this.incidents.filter(i => {
          const level = this.getNormalizedLevel(i);
          return level === IncidentNiveauRisque.CRITICAL || level === IncidentNiveauRisque.HIGH;
        }).length;
        this.overdueIncidents = this.countOverdueIncidents(this.incidents);
        this.dueSoonIncidents = this.countDueSoonIncidents(this.incidents);
        this.unassignedIncidents = this.incidents.filter(i => !i.assigneeId && !i.assignee).length;
        this.linkedRiskIncidents = this.incidents.filter(i => !!i.riskId).length;
        this.newThisMonth = this.countCreatedThisMonth(this.incidents);
        this.closedThisMonth = this.countClosedThisMonth(this.incidents);
        this.backlogRate = this.getPercent(this.openIncidents);
        this.assignmentRate = this.getPercent(this.totalIncidents - this.unassignedIncidents);
        this.criticalOpenRate = this.getPercent(criticalOpenItems.length, this.openIncidents);
        this.riskLinkRate = this.getPercent(this.linkedRiskIncidents);
        this.averageResolutionDays = this.calculateAverageResolutionDays(this.incidents);
        this.averageOpenAgeDays = this.calculateAverageOpenAgeDays(this.incidents);
        this.averageCriticalAgeDays = this.calculateAverageOpenAgeDays(criticalOpenItems);
        this.statusDistribution = this.buildStatusDistribution(this.incidents);
        this.domainDistribution = this.buildDomainDistribution(this.incidents);
        this.levelDistribution = this.buildLevelDistribution(this.incidents);
        this.processDistribution = this.buildProcessDistribution(this.incidents);
        this.criticalDomainDistribution = this.buildCriticalDomainDistribution(this.incidents);
        this.agingBuckets = this.buildAgingBuckets(openItems);
        this.monthlyTrend = this.buildMonthlyTrend(this.incidents);
        this.recentIncidents = [...this.incidents]
          .sort((a, b) => this.toTimestamp(b.updatedAt || b.createdAt) - this.toTimestamp(a.updatedAt || a.createdAt))
          .slice(0, 5);
        this.refreshIncidentRadarSeries();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  exportReport() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('Rapport annuel exporte avec succes (format PDF).');
    }, 1500);
  }

  getPercent(count: number, total = this.totalIncidents): number {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }

  getBarWidth(count: number, maxCount: number): number {
    if (!maxCount) return 0;
    return Math.round((count / maxCount) * 100);
  }

  getStatusClass(status: IncidentStatus | string | undefined): string {
    switch (this.normalizeStatus(status)) {
      case IncidentStatus.NOUVEAU: return 'status-new';
      case IncidentStatus.EN_COURS: return 'status-progress';
      case IncidentStatus.TRAITE: return 'status-resolved';
      case IncidentStatus.CLOS: return 'status-closed';
      default: return 'status-default';
    }
  }

  getStatusLabel(status: IncidentStatus | string | undefined): string {
    if (!status) return 'Non defini';
    const normalized = this.normalizeStatus(status);
    return this.statusMeta[normalized]?.label || status;
  }

  getLevelLabel(level: IncidentNiveauRisque | string | undefined): string {
    if (!level) return 'Non defini';
    const normalized = this.normalizeLevel(level);
    return this.levelMeta[normalized]?.label || level;
  }

  getLevelClass(level: IncidentNiveauRisque | string | undefined): string {
    const normalized = this.normalizeLevel(level);
    return this.levelMeta[normalized]?.cssClass || 'level-default';
  }

  getMonthlyMax(): number {
    return Math.max(1, ...this.monthlyTrend.map(item => Math.max(item.created, item.resolved)));
  }

  getAgingMax(): number {
    return Math.max(1, ...this.agingBuckets.map(item => item.count));
  }

  getRiskPressureScore(): number {
    return Math.min(
      100,
      Math.round((this.getPercent(this.highPriorityIncidents) * 0.35) + (this.backlogRate * 0.25) + (this.getPercent(this.overdueIncidents) * 0.25) + (this.criticalOpenRate * 0.15))
    );
  }

  getRiskPressureLabel(): string {
    const score = this.getRiskPressureScore();
    if (score >= 70) return 'Critique';
    if (score >= 45) return 'Sous surveillance';
    return 'Maitrise';
  }

  formatDays(value: number): string {
    if (!value) return '0 j';
    return `${value.toFixed(1)} j`;
  }

  refreshIncidentRadarSeries(): void {
    this.incidentRadarSeries = [
      {
        label: 'Situation actuelle',
        values: [
          this.getPercent(this.resolvedIncidents),
          this.assignmentRate,
          this.riskLinkRate,
          100 - this.backlogRate,
          100 - this.criticalOpenRate,
          100 - this.getPercent(this.overdueIncidents)
        ],
        color: '#2563eb',
        fillColor: 'rgba(37, 99, 235, 0.18)'
      },
      {
        label: 'Objectif cible',
        values: [85, 90, 70, 80, 90, 95],
        color: '#f97316',
        fillColor: 'rgba(249, 115, 22, 0.13)'
      }
    ];
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  private buildStatusDistribution(data: Incident[]): CountShare[] {
    return Object.entries(this.statusMeta).map(([status, meta]) => ({
      label: meta.label,
      count: data.filter(incident => this.getNormalizedStatus(incident) === status).length,
      share: this.getPercent(data.filter(incident => this.getNormalizedStatus(incident) === status).length),
      cssClass: meta.cssClass
    }));
  }

  private buildDomainDistribution(data: Incident[]): CountShare[] {
    const grouped = new Map<string, number>();
    data.forEach((incident) => {
      const key = (incident.domaine || 'Non renseigne').trim() || 'Non renseigne';
      grouped.set(key, (grouped.get(key) || 0) + 1);
    });

    return [...grouped.entries()]
      .map(([label, count]) => ({ label, count, share: this.getPercent(count) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }

  private buildLevelDistribution(data: Incident[]): CountShare[] {
    return this.levelOrder.map((level) => {
      const count = data.filter(incident => this.getNormalizedLevel(incident) === level).length;
      return {
        label: this.levelMeta[level].label,
        count,
        share: this.getPercent(count),
        cssClass: this.levelMeta[level].cssClass
      };
    }).filter(item => item.count > 0);
  }

  private buildProcessDistribution(data: Incident[]): CountShare[] {
    const grouped = new Map<string, number>();
    data.forEach((incident) => {
      const key = (incident.processus || incident.macroProcessus || 'Non renseigne').trim() || 'Non renseigne';
      grouped.set(key, (grouped.get(key) || 0) + 1);
    });

    return [...grouped.entries()]
      .map(([label, count]) => ({ label, count, share: this.getPercent(count) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private buildCriticalDomainDistribution(data: Incident[]): CountShare[] {
    const criticalData = data.filter((incident) => {
      const level = this.getNormalizedLevel(incident);
      return level === IncidentNiveauRisque.CRITICAL || level === IncidentNiveauRisque.HIGH;
    });
    const grouped = new Map<string, number>();
    criticalData.forEach((incident) => {
      const key = (incident.domaine || 'Non renseigne').trim() || 'Non renseigne';
      grouped.set(key, (grouped.get(key) || 0) + 1);
    });

    return [...grouped.entries()]
      .map(([label, count]) => ({ label, count, share: this.getPercent(count, criticalData.length) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private buildAgingBuckets(openItems: Incident[]): CountShare[] {
    const buckets = [
      { label: '0-7 j', min: 0, max: 7 },
      { label: '8-30 j', min: 8, max: 30 },
      { label: '31-90 j', min: 31, max: 90 },
      { label: '+90 j', min: 91, max: Number.POSITIVE_INFINITY }
    ];
    const now = Date.now();

    return buckets.map((bucket) => {
      const count = openItems.filter((incident) => {
        const age = Math.floor(Math.max(now - this.toTimestamp(incident.createdAt), 0) / (1000 * 60 * 60 * 24));
        return age >= bucket.min && age <= bucket.max;
      }).length;
      return { label: bucket.label, count, share: this.getPercent(count, openItems.length) };
    });
  }

  private buildMonthlyTrend(data: Incident[]): MonthlyTrend[] {
    const months: MonthlyTrend[] = [];
    const now = new Date();

    for (let index = 5; index >= 0; index--) {
      const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
      const month = date.getMonth();
      const year = date.getFullYear();
      const label = date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
      months.push({
        label,
        created: data.filter(incident => this.isSameMonth(incident.createdAt, month, year)).length,
        resolved: data.filter(incident => {
          const status = this.getNormalizedStatus(incident);
          return (status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS) && this.isSameMonth(incident.updatedAt, month, year);
        }).length
      });
    }

    return months;
  }

  private calculateAverageResolutionDays(data: Incident[]): number {
    const resolvedIncidents = data.filter(incident =>
      (this.getNormalizedStatus(incident) === IncidentStatus.TRAITE || this.getNormalizedStatus(incident) === IncidentStatus.CLOS)
      && incident.createdAt && incident.updatedAt
    );
    if (resolvedIncidents.length === 0) return 0;

    const totalDays = resolvedIncidents.reduce((sum, incident) => {
      const diff = this.toTimestamp(incident.updatedAt) - this.toTimestamp(incident.createdAt);
      return sum + Math.max(diff, 0) / (1000 * 60 * 60 * 24);
    }, 0);

    return Number((totalDays / resolvedIncidents.length).toFixed(1));
  }

  private calculateAverageOpenAgeDays(data: Incident[]): number {
    const openIncidents = data.filter(incident => this.getNormalizedStatus(incident) !== IncidentStatus.CLOS && incident.createdAt);
    if (openIncidents.length === 0) return 0;

    const now = Date.now();
    const totalDays = openIncidents.reduce((sum, incident) => {
      const diff = now - this.toTimestamp(incident.createdAt);
      return sum + Math.max(diff, 0) / (1000 * 60 * 60 * 24);
    }, 0);

    return Number((totalDays / openIncidents.length).toFixed(1));
  }

  private toTimestamp(value: Date | string | undefined | null): number {
    if (!value) return 0;
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  private countOverdueIncidents(data: Incident[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.filter(incident => {
      if (this.getNormalizedStatus(incident) === IncidentStatus.CLOS || !incident.dateEcheance) return false;
      const dueDate = new Date(incident.dateEcheance);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    }).length;
  }

  private countDueSoonIncidents(data: Incident[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next30Days = new Date(today);
    next30Days.setDate(today.getDate() + 30);
    return data.filter(incident => {
      if (this.getNormalizedStatus(incident) === IncidentStatus.CLOS || !incident.dateEcheance) return false;
      const dueDate = new Date(incident.dateEcheance);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate >= today && dueDate <= next30Days;
    }).length;
  }

  private countCreatedThisMonth(data: Incident[]): number {
    const now = new Date();
    return data.filter(incident => this.isSameMonth(incident.createdAt, now.getMonth(), now.getFullYear())).length;
  }

  private countClosedThisMonth(data: Incident[]): number {
    const now = new Date();
    return data.filter(incident => {
      const status = this.getNormalizedStatus(incident);
      return (status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS) && this.isSameMonth(incident.updatedAt, now.getMonth(), now.getFullYear());
    }).length;
  }

  private isSameMonth(value: Date | string | undefined | null, month: number, year: number): boolean {
    const timestamp = this.toTimestamp(value);
    if (!timestamp) return false;
    const date = new Date(timestamp);
    return date.getMonth() === month && date.getFullYear() === year;
  }

  private mapIncidentCodes(incident: Incident): Incident {
    return {
      ...incident,
      statut: this.normalizeStatus((incident as any)?.statutCode || incident?.statut) as IncidentStatus,
      niveauRisque: this.normalizeLevel((incident as any)?.niveauRisqueCode || incident?.niveauRisque) as IncidentNiveauRisque
    };
  }

  private getNormalizedStatus(incident: Incident): string {
    return this.normalizeStatus((incident as any)?.statutCode || incident?.statut);
  }

  private getNormalizedLevel(incident: Incident): string {
    return this.normalizeLevel((incident as any)?.niveauRisqueCode || incident?.niveauRisque);
  }

  private normalizeStatus(value?: string | null): string {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }

  private normalizeLevel(value?: string | null): string {
    const normalized = (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
    return this.levelAliases[normalized] || normalized;
  }
}
