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
    this.router.navigate(['/dashboard/actions']);
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

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
  }
}
