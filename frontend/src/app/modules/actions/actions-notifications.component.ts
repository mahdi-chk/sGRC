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
    this.router.navigate(['/dashboard/actions']);
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

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
  }
}
