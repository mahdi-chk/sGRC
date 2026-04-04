import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlRegistryItem, ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls-referential',
  templateUrl: './controls-referential.component.html',
  styleUrls: ['./controls-referential.component.scss']
})
export class ControlsReferentialComponent implements OnInit {
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

  get registry(): ControlRegistryItem[] {
    return this.overview?.registry || [];
  }

  get departmentCount(): number {
    return new Set(this.registry.map(item => item.department)).size;
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
