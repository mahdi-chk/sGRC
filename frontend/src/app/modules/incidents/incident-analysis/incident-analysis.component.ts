import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incident, IncidentService } from '../../../core/services/incident.service';
import { Risk, RiskService } from '../../../core/services/risk.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user-role.enum';

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
  selectedRiskId: number | null = null;
  estimatedCost: number | null = null;
  observedSeverity = '';
  rootCauses: string[] = Array.from({ length: 5 }, () => '');

  constructor(
    private incidentService: IncidentService,
    private riskService: RiskService,
    private authService: AuthService,
    private router: Router
  ) {}

  get isReadOnlyRole(): boolean {
    return this.authService.getUserRole() === UserRole.TOP_MANAGEMENT;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = data;
        if (this.incidents.length > 0) {
          this.selectIncident(this.incidents[0]);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Impossible de charger les incidents.');
      }
    });

    this.riskService.getRisks().subscribe({
      next: (data) => {
        this.risks = data;
      },
      error: (err) => {
        console.error(err);
        alert('Impossible de charger les risques.');
      }
    });
  }

  selectIncident(incident: Incident): void {
    this.selectedIncident = incident;
    this.selectedRiskId = incident.riskId ?? null;
    this.observedSeverity = incident.niveauRisque || '';

    const parsedAnalysis = this.parseStoredAnalysis(incident.planActionTraitement);
    this.estimatedCost = parsedAnalysis.estimatedCost;
    this.rootCauses = parsedAnalysis.rootCauses;
  }

  onRiskSelectionChange(riskId: number | null): void {
    if (this.isReadOnlyRole) {
      return;
    }

    this.selectedRiskId = riskId;
    this.linkToRisk(riskId);
  }

  linkToRisk(riskId: number | null): void {
    if (!this.selectedIncident) return;

    this.isLoading = true;
    this.incidentService.updateIncident(this.selectedIncident.id, { riskId }).subscribe({
      next: (updatedIncident) => {
        this.selectedIncident = updatedIncident;
        this.selectedRiskId = updatedIncident.riskId ?? null;
        this.updateIncidentInList(updatedIncident);
        this.isLoading = false;
        alert('Lien avec le risque etabli.');
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors de la mise a jour du lien avec le risque.');
      }
    });
  }

  saveFullAnalysis(): void {
    if (!this.selectedIncident || this.isReadOnlyRole) return;

    this.isLoading = true;
    const payload = {
      riskId: this.selectedRiskId,
      niveauRisque: this.observedSeverity || null,
      planActionTraitement: this.buildAnalysisSummary()
    };

    this.incidentService.updateIncident(this.selectedIncident.id, payload).subscribe({
      next: (updatedIncident) => {
        this.selectedIncident = updatedIncident;
        this.updateIncidentInList(updatedIncident);
        this.isLoading = false;
        alert('Analyse complete sauvegardee avec succes.');
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors de la sauvegarde de l analyse.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  private updateIncidentInList(updatedIncident: Incident): void {
    const index = this.incidents.findIndex(incident => incident.id === updatedIncident.id);
    if (index !== -1) {
      this.incidents[index] = updatedIncident;
    }
  }

  private parseStoredAnalysis(rawValue?: string | null): { estimatedCost: number | null; rootCauses: string[] } {
    const rootCauses = Array.from({ length: 5 }, () => '');
    if (!rawValue) {
      return { estimatedCost: null, rootCauses };
    }

    const costMatch = rawValue.match(/Cout estime \(dirham \(MAD\)\)\s*:\s*([0-9]+(?:[.,][0-9]+)?)/i)
      || rawValue.match(/Cout estime \(EUR\)\s*:\s*([0-9]+(?:[.,][0-9]+)?)/i);
    const estimatedCost = costMatch ? Number(costMatch[1].replace(',', '.')) : null;

    for (let index = 0; index < 5; index += 1) {
      const whyMatch = rawValue.match(new RegExp(`Pourquoi ${index + 1}\\s*:\\s*(.+)`, 'i'));
      rootCauses[index] = whyMatch?.[1]?.trim() || '';
    }

    return { estimatedCost, rootCauses };
  }

  private buildAnalysisSummary(): string {
    const existingPlan = this.extractNonAnalysisPlan(this.selectedIncident?.planActionTraitement);
    const rootCauseLines = this.rootCauses
      .map((value, index) => value.trim() ? `Pourquoi ${index + 1}: ${value.trim()}` : '')
      .filter(Boolean);

    const analysisLines = [
      'Analyse incident',
      this.estimatedCost !== null && this.estimatedCost !== undefined ? `Cout estime (dirham (MAD)): ${this.estimatedCost}` : '',
      this.observedSeverity ? `Gravite constatee: ${this.observedSeverity}` : '',
      ...rootCauseLines
    ].filter(Boolean);

    return [existingPlan, analysisLines.join('\n')].filter(Boolean).join('\n\n');
  }

  private extractNonAnalysisPlan(rawValue?: string | null): string {
    if (!rawValue) {
      return '';
    }

    const marker = rawValue.indexOf('Analyse incident');
    return marker >= 0 ? rawValue.slice(0, marker).trim() : rawValue.trim();
  }
}
