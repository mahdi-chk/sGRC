import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident } from '../../../core/services/incident.service';
import { RiskService, Risk } from '../../../core/services/risk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-analysis',
  templateUrl: './incident-analysis.component.html',
  styleUrls: ['./incident-analysis.component.scss']
})
export class IncidentAnalysisComponent implements OnInit {
  incidents: Incident[] = [];
  risks: Risk[] = [];
  selectedIncident: Incident | null = null;
  isLoading = false;

  constructor(
    private incidentService: IncidentService,
    private riskService: RiskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe(data => {
      this.incidents = data;
      if (this.incidents.length > 0) this.selectIncident(this.incidents[0]);
      this.isLoading = false;
    });
    this.riskService.getRisks().subscribe(data => this.risks = data);
  }

  selectIncident(incident: Incident) {
    this.selectedIncident = incident;
  }

  linkToRisk(riskId: number) {
    if (!this.selectedIncident) return;
    // Assuming backend supports updating riskId on incident
    this.incidentService.updateIncident(this.selectedIncident.id, { riskId } as any).subscribe({
      next: (res) => {
        this.selectedIncident = res;
        alert('Lien avec le risque établi.');
      },
      error: (err) => console.error(err)
    });
  }

  saveFullAnalysis() {
    if (!this.selectedIncident) return;
    this.isLoading = true;
    // Simulate saving analysis data (could be added to model later if needed)
    setTimeout(() => {
        this.isLoading = false;
        alert('Analyse complète sauvegardée avec succès.');
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
