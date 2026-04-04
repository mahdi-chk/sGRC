import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getActionsModuleItems, getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionsOverview, ActionsService } from './actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  private readonly currentRole = getStoredActionsRole();
  readonly navItems = getActionsNavItems(this.currentRole);
  readonly modules = getActionsModuleItems(this.currentRole);
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
    this.router.navigate(['/dashboard']);
  }
}
