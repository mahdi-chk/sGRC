import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';

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
  averageResolutionDays = 0;
  averageOpenAgeDays = 0;
  statusDistribution: Array<{ label: string; count: number; cssClass: string }> = [];
  domainDistribution: Array<{ label: string; count: number }> = [];
  recentIncidents: Incident[] = [];

  private readonly statusMeta: Record<string, { label: string; cssClass: string }> = {
    [IncidentStatus.NOUVEAU]: { label: 'Nouveaux', cssClass: 'status-new' },
    [IncidentStatus.EN_COURS]: { label: 'En cours', cssClass: 'status-progress' },
    [IncidentStatus.TRAITE]: { label: 'Traites', cssClass: 'status-resolved' },
    [IncidentStatus.CLOS]: { label: 'Clos', cssClass: 'status-closed' }
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
        this.openIncidents = this.incidents.filter(i => this.getNormalizedStatus(i) !== IncidentStatus.CLOS).length;
        this.resolvedIncidents = this.incidents.filter(i => {
          const status = this.getNormalizedStatus(i);
          return status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS;
        }).length;
        this.criticalIncidents = this.incidents.filter(i => this.getNormalizedLevel(i) === IncidentNiveauRisque.CRITICAL).length;
        this.averageResolutionDays = this.calculateAverageResolutionDays(this.incidents);
        this.averageOpenAgeDays = this.calculateAverageOpenAgeDays(this.incidents);
        this.statusDistribution = this.buildStatusDistribution(this.incidents);
        this.domainDistribution = this.buildDomainDistribution(this.incidents);
        this.recentIncidents = [...this.incidents]
          .sort((a, b) => this.toTimestamp(b.updatedAt || b.createdAt) - this.toTimestamp(a.updatedAt || a.createdAt))
          .slice(0, 5);
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

  getPercent(count: number): number {
    return this.totalIncidents > 0 ? Math.round((count / this.totalIncidents) * 100) : 0;
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

  formatDays(value: number): string {
    if (!value) return '0 j';
    return `${value.toFixed(1)} j`;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  private buildStatusDistribution(data: Incident[]): Array<{ label: string; count: number; cssClass: string }> {
    return Object.entries(this.statusMeta).map(([status, meta]) => ({
      label: meta.label,
      count: data.filter(incident => this.getNormalizedStatus(incident) === status).length,
      cssClass: meta.cssClass
    }));
  }

  private buildDomainDistribution(data: Incident[]): Array<{ label: string; count: number }> {
    const grouped = new Map<string, number>();
    data.forEach((incident) => {
      const key = (incident.domaine || 'Non renseigne').trim() || 'Non renseigne';
      grouped.set(key, (grouped.get(key) || 0) + 1);
    });

    return [...grouped.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
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
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }
}
