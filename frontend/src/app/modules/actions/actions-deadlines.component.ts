import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionDeadlineItem, ActionsOverview, ActionsService } from './actions.service';

@Component({
  selector: 'app-actions-deadlines',
  templateUrl: './actions-deadlines.component.html',
  styleUrls: ['./actions-deadlines.component.scss']
})
export class ActionsDeadlinesComponent implements OnInit {
  readonly navItems = getActionsNavItems(getStoredActionsRole());
  overview: ActionsOverview | null = null;
  isLoading = false;
  currentQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsService: ActionsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.currentQuery = (params.get('q') || '').trim().toLowerCase();
    });

    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.actionsService.getOverview().subscribe({
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
    this.router.navigate(['/dashboard']);
  }

  exportPlanning(): void {
    const rows = this.filteredDeadlines.map(item => ({
      Action: item.title,
      Jalon: item.milestone,
      Debut: this.formatDate(item.startDate),
      Echeance: this.formatDate(item.dueDate),
      Statut: item.status,
      Avancement: `${item.progress}%`,
      Responsable: item.owner,
      Charge: item.resourceLoad,
      Dependances: item.dependencyCount,
      Blocage: item.blocker || '',
      Prevision: item.forecast
    }));

    this.downloadCsv('planning-plans-actions.csv', rows);
  }

  get deadlines(): ActionDeadlineItem[] {
    return this.overview?.deadlines || [];
  }

  get filteredDeadlines(): ActionDeadlineItem[] {
    if (!this.currentQuery) {
      return this.deadlines;
    }

    return this.deadlines.filter(item =>
      [item.title, item.milestone, item.owner].some(value =>
        String(value || '').toLowerCase().includes(this.currentQuery)
      )
    );
  }

  get atRiskCount(): number {
    return this.deadlines.filter(item => /risque|retard/i.test(item.status || '')).length;
  }

  get planningStart(): number {
    const dates = this.filteredDeadlines
      .map(item => item.startDate || item.dueDate)
      .filter(Boolean)
      .map(value => new Date(value as string).getTime());

    return dates.length ? Math.min(...dates) : Date.now();
  }

  get planningEnd(): number {
    const dates = this.filteredDeadlines
      .map(item => item.dueDate || item.startDate)
      .filter(Boolean)
      .map(value => new Date(value as string).getTime());

    return dates.length ? Math.max(...dates) : Date.now();
  }

  get ganttRangeLabel(): string {
    return `${this.formatDate(new Date(this.planningStart).toISOString())} - ${this.formatDate(new Date(this.planningEnd).toISOString())}`;
  }

  getTimelineOffset(item: ActionDeadlineItem): number {
    const start = item.startDate ? new Date(item.startDate).getTime() : this.planningStart;
    const range = Math.max(this.planningEnd - this.planningStart, 1);
    return Math.max(0, Math.min(92, Math.round(((start - this.planningStart) / range) * 100)));
  }

  getTimelineWidth(item: ActionDeadlineItem): number {
    const start = item.startDate ? new Date(item.startDate).getTime() : this.planningStart;
    const end = item.dueDate ? new Date(item.dueDate).getTime() : this.planningEnd;
    const range = Math.max(this.planningEnd - this.planningStart, 1);
    return Math.max(8, Math.min(100 - this.getTimelineOffset(item), Math.round(((end - start) / range) * 100)));
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
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
