import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlEffectivenessItem, ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls-effectiveness',
  templateUrl: './controls-effectiveness.component.html',
  styleUrls: ['./controls-effectiveness.component.scss']
})
export class ControlsEffectivenessComponent implements OnInit {
  readonly navItems = getControlsNavItems(getStoredControlsRole());
  overview: ControlsOverview | null = null;
  isLoading = false;

  currentPage = 1;
  itemsPerPage = 10;

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
    this.currentPage = 1;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/controls']);
  }

  get effectiveness(): ControlEffectivenessItem[] {
    return this.overview?.effectiveness || [];
  }

  get paginatedEffectiveness(): ControlEffectivenessItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.effectiveness.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
  }

  get strongCount(): number {
    return this.effectiveness.filter(item => item.score >= 80).length;
  }

  get watchCount(): number {
    return this.effectiveness.filter(item => item.score >= 60 && item.score < 80).length;
  }

  get alertCount(): number {
    return this.effectiveness.filter(item => item.score < 60).length;
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getToneClass(score: number): string {
    if (score >= 80) {
      return 'tone-strong';
    }

    if (score >= 60) {
      return 'tone-watch';
    }

    return 'tone-alert';
  }

  getTrendLabel(value: string): string {
    if (value === 'en_baisse') {
      return 'En baisse';
    }

    if (value === 'en_hausse') {
      return 'En hausse';
    }

    return 'Stable';
  }

  getTrendClass(value: string): string {
    return `trend-${String(value || '').replace(/_/g, '-')}`;
  }
}
