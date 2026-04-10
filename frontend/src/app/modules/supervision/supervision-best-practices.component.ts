import { Component, OnInit } from '@angular/core';
import { SupervisionBestPractice, SupervisionService } from './supervision.service';

@Component({
  selector: 'app-supervision-best-practices',
  templateUrl: './supervision-best-practices.component.html',
  styleUrls: ['./supervision-best-practices.component.scss']
})
export class SupervisionBestPracticesComponent implements OnInit {
  practices: SupervisionBestPractice[] = [];
  query = '';

  constructor(private supervisionService: SupervisionService) {}

  ngOnInit(): void {
    this.supervisionService.getOverview().subscribe(overview => {
      this.practices = overview.modules.bestPractices;
    });
  }

  get filteredPractices(): SupervisionBestPractice[] {
    const query = this.query.trim().toLowerCase();

    if (!query) {
      return this.practices;
    }

    return this.practices.filter(practice =>
      [
        practice.title,
        practice.framework,
        practice.category,
        practice.summary,
        practice.linkedModule,
        ...(practice.tags || [])
      ].join(' ').toLowerCase().includes(query)
    );
  }
}
