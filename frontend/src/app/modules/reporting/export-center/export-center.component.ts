import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-export-center',
  templateUrl: './export-center.component.html',
  styleUrls: ['./export-center.component.scss']
})
export class ExportCenterComponent implements OnInit {
  isExporting = false;
  selectedFormat: 'pdf' | 'xlsx' = 'xlsx';
  
  reports = [
    { id: 'global', title: 'Rapport Global de Performance', desc: 'Rapport consolidé incluant Risques, Incidents et Audits.' },
    { id: 'risks', title: 'Registre des Risques Consolidé', desc: 'Liste complète des risques avec cotations et plans de traitement.' },
    { id: 'incidents', title: 'Rapport Annuel des Incidents', desc: 'Analyse statistique des incidents survenus sur l\'année.' }
  ];

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  generateReport(reportId: string) {
    this.isExporting = true;
    this.reportingService.exportData({ reportId, format: this.selectedFormat }).subscribe(
      () => {
        setTimeout(() => {
          this.isExporting = false;
          alert(`Le rapport "${reportId}" a été généré avec succès au format ${this.selectedFormat.toUpperCase()}.`);
        }, 2000);
      },
      error => {
        console.error('Export error', error);
        this.isExporting = false;
        // Simuler pour la démo si le backend n'est pas encore prêt pour l'export réel
        setTimeout(() => {
            this.isExporting = false;
            alert(`Simulation: Rapport "${reportId}" exporté.`);
        }, 1500);
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
