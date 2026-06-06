import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStoredSupervisionRole, getSupervisionNavItems } from './supervision-navigation';
import { SupervisionOverview, SupervisionService } from './supervision.service';

@Component({
  selector: 'app-supervision',
  templateUrl: './supervision.component.html',
  styleUrls: ['./supervision.component.scss']
})
export class SupervisionComponent implements OnInit {
  readonly navItems = getSupervisionNavItems(getStoredSupervisionRole());
  overview: SupervisionOverview | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private supervisionService: SupervisionService
  ) {}

  ngOnInit(): void {
    this.supervisionService.watchOverview().subscribe(overview => {
      this.overview = overview;
    });
    this.loadOverview(false);
  }

  loadOverview(forceRefresh = true): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.supervisionService.loadOverview(forceRefresh).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message
          || 'Impossible de charger les donnees reelles de supervision.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
