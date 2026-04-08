import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  KPI,
  MultiEntityData,
  ReportingService,
  ReportingStats,
} from '../../../core/services/reporting.service';
import { Incident, IncidentService } from '../../../core/services/incident.service';
import { Risk, RiskService } from '../../../core/services/risk.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';

@Component({
  selector: 'app-export-center',
  templateUrl: './export-center.component.html',
  styleUrls: ['./export-center.component.scss']
})
export class ExportCenterComponent implements OnInit {
  isExporting = false;
  exportingReportId: string | null = null;
  selectedFormat: 'pdf' | 'xlsx' = 'xlsx';
  statusMessage = '';
  statusTone: 'success' | 'error' | '' = '';
  readonly navItems = REPORTING_NAV_ITEMS;

  reports = [
    { id: 'global', title: 'Rapport Global de Performance', desc: 'Rapport consolide incluant risques, incidents, audits, KPIs et vision multi-entites.' },
    { id: 'risks', title: 'Registre des Risques Consolide', desc: 'Liste complete des risques avec cotations, statuts et plans de traitement.' },
    { id: 'incidents', title: 'Rapport des Incidents', desc: 'Analyse des incidents declares avec dates, niveaux et domaines.' }
  ];

  constructor(
    private reportingService: ReportingService,
    private riskService: RiskService,
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  generateReport(reportId: string): void {
    this.isExporting = true;
    this.exportingReportId = reportId;
    this.statusMessage = '';
    this.statusTone = '';

    if (reportId === 'global') {
      forkJoin({
        stats: this.reportingService.getStats(),
        kpis: this.reportingService.getKpis(),
        entities: this.reportingService.getMultiEntityData(),
      }).subscribe({
        next: ({ stats, kpis, entities }) => {
          this.exportGlobalReport(stats, kpis, entities);
          this.finishExport('success', `Rapport global genere au format ${this.selectedFormat.toUpperCase()}.`);
        },
        error: (error) => this.handleExportError(error),
      });
      return;
    }

    if (reportId === 'risks') {
      this.riskService.getRisks().subscribe({
        next: (risks) => {
          this.exportRiskReport(risks);
          this.finishExport('success', `Registre des risques genere au format ${this.selectedFormat.toUpperCase()}.`);
        },
        error: (error) => this.handleExportError(error),
      });
      return;
    }

    if (reportId === 'incidents') {
      this.incidentService.getIncidents().subscribe({
        next: (incidents) => {
          this.exportIncidentReport(incidents);
          this.finishExport('success', `Rapport des incidents genere au format ${this.selectedFormat.toUpperCase()}.`);
        },
        error: (error) => this.handleExportError(error),
      });
      return;
    }

    this.finishExport('error', 'Type de rapport non supporte.');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  private exportGlobalReport(stats: ReportingStats, kpis: KPI[], entities: MultiEntityData[]): void {
    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
        ['Section', 'Metrique', 'Valeur'],
        ['Risques', 'Total', stats.risks.total],
        ['Incidents', 'Total', stats.incidents.total],
        ['Audits', 'Total', stats.audits.total],
      ]), 'Synthese');

      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(
        kpis.map((kpi) => ({
          KPI: kpi.label,
          Valeur: `${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ''}`.trim(),
        }))
      ), 'KPIs');

      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(
        entities.map((entity) => ({
          Entite: entity.name,
          Risques: entity.riskCount,
          RisquesCritiques: entity.criticalRiskCount,
          TauxTraitement: `${entity.treatmentRate}%`,
        }))
      ), 'Entites');

      XLSX.writeFile(workbook, this.buildFilename('rapport_global'));
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Rapport global de performance', 14, 20);
    doc.setFontSize(10);
    doc.text(`Genere le ${this.formatDate(new Date())}`, 14, 27);

    autoTable(doc, {
      startY: 35,
      head: [['Section', 'Metrique', 'Valeur']],
      body: [
        ['Risques', 'Total', String(stats.risks.total)],
        ['Incidents', 'Total', String(stats.incidents.total)],
        ['Audits', 'Total', String(stats.audits.total)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 74, 153] },
    });

    let finalY = (doc as any).lastAutoTable.finalY + 10;

    autoTable(doc, {
      startY: finalY,
      head: [['KPI', 'Valeur']],
      body: kpis.map((kpi) => [kpi.label, `${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ''}`.trim()]),
      theme: 'striped',
      headStyles: { fillColor: [15, 76, 129] },
    });

    finalY = (doc as any).lastAutoTable.finalY + 10;

    autoTable(doc, {
      startY: finalY,
      head: [['Entite', 'Risques', 'Critiques', 'Traitement']],
      body: entities.map((entity) => [
        entity.name,
        String(entity.riskCount),
        String(entity.criticalRiskCount),
        `${entity.treatmentRate}%`,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59] },
    });

    doc.save(this.buildFilename('rapport_global'));
  }

  private exportRiskReport(risks: Risk[]): void {
    const rows = risks.map((risk) => ({
      ID: risk.id,
      Titre: risk.titre,
      Domaine: risk.domaine || 'General',
      Departement: risk.departement?.nom || 'Non specifie',
      Probabilite: risk.probabiliteLabel || risk.probabilite || 'Non defini',
      Impact: risk.impactLabel || risk.impact || 'Non defini',
      Niveau: risk.niveauRisqueLabel || risk.niveauRisqueCode || risk.niveauRisque || 'Non defini',
      Statut: risk.statutLabel || risk.statutCode || risk.statut || 'Non defini',
      Echeance: this.formatDate(risk.dateEcheance),
      Traitement: risk.planActionTraitement || 'Non defini',
    }));

    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Risques');
      XLSX.writeFile(workbook, this.buildFilename('registre_risques'));
      return;
    }

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Registre des risques consolide', 14, 18);
    doc.setFontSize(10);
    doc.text(`Genere le ${this.formatDate(new Date())}`, 14, 25);

    autoTable(doc, {
      startY: 32,
      head: [['ID', 'Titre', 'Domaine', 'Departement', 'Niveau', 'Statut', 'Echeance']],
      body: rows.map((row) => [
        String(row.ID),
        row.Titre,
        row.Domaine,
        row.Departement,
        row.Niveau,
        row.Statut,
        row.Echeance,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153] },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    doc.save(this.buildFilename('registre_risques'));
  }

  private exportIncidentReport(incidents: Incident[]): void {
    const rows = incidents.map((incident) => ({
      ID: incident.id,
      Titre: incident.titre,
      Description: incident.description || 'Non definie',
      Domaine: incident.domaine || 'General',
      Statut: incident.statutLabel || incident.statut || 'Non defini',
      Niveau: incident.niveauRisqueLabel || incident.niveauRisque || 'Non defini',
      DateSurvenance: this.formatDate(incident.dateSurvenance),
      DateCreation: this.formatDate(incident.createdAt),
    }));

    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Incidents');
      XLSX.writeFile(workbook, this.buildFilename('rapport_incidents'));
      return;
    }

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Rapport des incidents', 14, 18);
    doc.setFontSize(10);
    doc.text(`Genere le ${this.formatDate(new Date())}`, 14, 25);

    autoTable(doc, {
      startY: 32,
      head: [['ID', 'Titre', 'Domaine', 'Statut', 'Niveau', 'Date de survenance']],
      body: rows.map((row) => [
        String(row.ID),
        row.Titre,
        row.Domaine,
        row.Statut,
        row.Niveau,
        row.DateSurvenance,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153] },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    doc.save(this.buildFilename('rapport_incidents'));
  }

  private finishExport(tone: 'success' | 'error', message: string): void {
    this.isExporting = false;
    this.exportingReportId = null;
    this.statusTone = tone;
    this.statusMessage = message;
  }

  private handleExportError(error: unknown): void {
    console.error('Export error', error);
    this.finishExport('error', 'La generation du rapport a echoue.');
  }

  private buildFilename(baseName: string): string {
    const extension = this.selectedFormat === 'xlsx' ? 'xlsx' : 'pdf';
    const date = new Date().toISOString().split('T')[0];
    return `${baseName}_${date}.${extension}`;
  }

  private formatDate(value: Date | string | null | undefined): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '-';
    }

    return date.toLocaleDateString('fr-FR');
  }
}
