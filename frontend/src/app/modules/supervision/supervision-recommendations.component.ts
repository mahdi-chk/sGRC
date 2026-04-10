import { Component, OnInit } from '@angular/core';
import { SupervisionRecommendation, SupervisionService } from './supervision.service';

@Component({
  selector: 'app-supervision-recommendations',
  templateUrl: './supervision-recommendations.component.html',
  styleUrls: ['./supervision-recommendations.component.scss']
})
export class SupervisionRecommendationsComponent implements OnInit {
  recommendations: SupervisionRecommendation[] = [];
  priorityFilter = 'all';

  constructor(private supervisionService: SupervisionService) {}

  ngOnInit(): void {
    this.supervisionService.getOverview().subscribe(overview => {
      this.recommendations = overview.modules.recommendations;
    });
  }

  get filteredRecommendations(): SupervisionRecommendation[] {
    if (this.priorityFilter === 'all') {
      return this.recommendations;
    }

    return this.recommendations.filter(item => item.priority === this.priorityFilter);
  }
}
