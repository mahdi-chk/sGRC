import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionIndicatorItem, ActionsOverview, ActionsService } from './actions.service';

@Component({
  selector: 'app-actions-indicators',
  templateUrl: './actions-indicators.component.html',
  styleUrls: ['./actions-indicators.component.scss']
})
export class ActionsIndicatorsComponent implements OnInit {
  readonly navItems = getActionsNavItems(getStoredActionsRole());
  overview: ActionsOverview | null = null;
  isLoading = false;

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

  get indicators(): ActionIndicatorItem[] {
    return this.overview?.indicators || [];
  }

  get onTargetCount(): number {
    return this.indicators.filter(item => item.value >= item.target).length;
  }

  getTrendClass(value: string | null | undefined): string {
    return `trend-${String(value || '').replace(/_/g, '-')}`;
  }
}
