import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsModuleItems, getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  private readonly currentRole = getStoredControlsRole();
  readonly navItems = getControlsNavItems(this.currentRole);
  readonly modules = getControlsModuleItems(this.currentRole);
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
    this.router.navigate(['/dashboard']);
  }
}
