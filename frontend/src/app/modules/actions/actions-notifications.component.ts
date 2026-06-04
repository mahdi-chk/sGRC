import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionNotificationItem, ActionsOverview, ActionsService } from './actions.service';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';

@Component({
  selector: 'app-actions-notifications',
  templateUrl: './actions-notifications.component.html',
  styleUrls: ['./actions-notifications.component.scss']
})
export class ActionsNotificationsComponent implements OnInit {
  readonly navItems = getActionsNavItems(getStoredActionsRole());
  overview: ActionsOverview | null = null;
  isLoading = false;
  currentFocus = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsService: ActionsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.currentFocus = params.get('focus') || params.get('q') || '';
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

  exportNotifications(): void {
    const rows = this.notifications.map(item => ({
      Scenario: item.title,
      Canal: item.channel,
      Audience: item.audience,
      Regle: item.rule,
      Perimetre: item.roleScope,
      Declencheur: item.trigger,
      Escalade: item.escalationLevel,
      Statut: item.status,
      ProchainEnvoi: this.formatDate(item.nextSendAt)
    }));

    this.downloadCsv('notifications-plans-actions.csv', rows);
  }

  openDetail(item: ActionNotificationItem): void {
    if (!item.detailFilter) {
      return;
    }

    this.router.navigate(['/dashboard/actions-centralized'], {
      queryParams: item.detailFilter
    });
  }

  get notifications(): ActionNotificationItem[] {
    return this.overview?.notifications || [];
  }

  get activeCount(): number {
    return this.notifications.filter(item => item.status === 'active').length;
  }

  get emailCount(): number {
    return this.notifications.filter(item => item.channel === 'email').length;
  }

  get appCount(): number {
    return this.notifications.filter(item => item.channel === 'in_app').length;
  }

  get smsReadyCount(): number {
    return this.notifications.filter(item => item.escalationLevel === 'niveau_3' || item.status === 'active').length;
  }

  get autoAssignmentCount(): number {
    return this.overview?.registry.filter(item => item.owner === 'Non assigne').length || 0;
  }

  get escalationCount(): number {
    return this.notifications.filter(item => item.escalationLevel !== 'niveau_1').length;
  }

  get dueThisMonthCount(): number {
    return this.overview?.summary.dueThisMonth || 0;
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleString('fr-FR');
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
