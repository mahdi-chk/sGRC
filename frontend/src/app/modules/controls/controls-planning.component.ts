import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlPlanningItem, ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls-planning',
  templateUrl: './controls-planning.component.html',
  styleUrls: ['./controls-planning.component.scss']
})
export class ControlsPlanningComponent implements OnInit {
  readonly navItems = getControlsNavItems(getStoredControlsRole());
  overview: ControlsOverview | null = null;
  isLoading = false;

  constructor(
    private router: Router,
    private controlsService: ControlsService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
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
  }

  goBack(): void {
    this.router.navigate(['/dashboard/controls']);
  }

  get planning(): ControlPlanningItem[] {
    return this.overview?.planning || [];
  }

  get auditCount(): number {
    return this.planning.filter(item => item.scheduleType === 'audit').length;
  }

  get controlCount(): number {
    return this.planning.filter(item => item.scheduleType === 'controle').length;
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
