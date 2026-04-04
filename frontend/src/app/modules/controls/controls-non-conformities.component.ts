import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlNonConformityItem, ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls-non-conformities',
  templateUrl: './controls-non-conformities.component.html',
  styleUrls: ['./controls-non-conformities.component.scss']
})
export class ControlsNonConformitiesComponent implements OnInit {
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

  get items(): ControlNonConformityItem[] {
    return this.overview?.nonConformities || [];
  }

  get criticalCount(): number {
    return this.items.filter(item => /critical|critique|high|eleve/i.test(item.severity || '')).length;
  }

  get overdueCount(): number {
    const now = Date.now();
    return this.items.filter(item => item.dueDate && new Date(item.dueDate).getTime() < now).length;
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
