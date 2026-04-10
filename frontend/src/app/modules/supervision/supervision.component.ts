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

  constructor(
    private router: Router,
    private supervisionService: SupervisionService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.supervisionService.getOverview().subscribe({
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
