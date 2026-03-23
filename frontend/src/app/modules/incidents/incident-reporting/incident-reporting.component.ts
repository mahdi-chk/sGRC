import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident } from '../../../core/services/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-reporting',
  templateUrl: './incident-reporting.component.html',
  styleUrls: ['./incident-reporting.component.scss']
})
export class IncidentReportingComponent implements OnInit {
  incidents: Incident[] = [];
  isLoading = false;
  
  // Stats
  totalIncidents = 0;
  openIncidents = 0;
  resolvedIncidents = 0;
  criticalIncidents = 0;

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe(data => {
      this.incidents = data;
      this.totalIncidents = data.length;
      this.openIncidents = data.filter(i => i.statut !== 'Clos').length;
      this.resolvedIncidents = data.filter(i => i.statut === 'Traité' || i.statut === 'Clos').length;
      this.criticalIncidents = data.filter(i => i.niveauRisque === 'Critique').length;
      this.isLoading = false;
    });
  }

  getPercent(count: number): number {
    return this.totalIncidents > 0 ? Math.round((count / this.totalIncidents) * 100) : 0;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
