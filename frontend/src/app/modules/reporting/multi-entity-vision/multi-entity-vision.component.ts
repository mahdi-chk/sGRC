import { Component, OnInit } from '@angular/core';
import { ReportingService, MultiEntityData } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';

@Component({
  selector: 'app-multi-entity-vision',
  templateUrl: './multi-entity-vision.component.html',
  styleUrls: ['./multi-entity-vision.component.scss']
})
export class MultiEntityVisionComponent implements OnInit {
  entities: MultiEntityData[] = [];
  isLoading = true;
  readonly navItems = REPORTING_NAV_ITEMS;

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities() {
    this.isLoading = true;
    this.reportingService.getMultiEntityData().subscribe(
      data => {
        this.entities = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading multi-entity data', error);
        this.isLoading = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
