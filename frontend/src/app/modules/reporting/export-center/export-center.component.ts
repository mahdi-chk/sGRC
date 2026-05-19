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
import { AuditMission, AuditingService } from '../../../core/services/auditing.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';

type ExportReportId = 'global' | 'risks' | 'incidents' | 'audits' | 'entities' | 'pack';

@Component({
  selector: 'app-export-center',
  templateUrl: './export-center.component.html',
  styleUrls: ['./export-center.component.scss']
})
export class ExportCenterComponent implements OnInit {
  isExporting = false;
  exportingReportId: string | null = null;
  selectedFormat: 'pdf' | 'xlsx' = 'xlsx';
  selectedPeriod = 'all';
  includeDetails = true;
  statusMessage = '';
  statusTone: 'success' | 'error' | '' = '';
  readonly navItems = REPORTING_NAV_ITEMS;
  readonly periodOptions = [
    { value: 'all', label: 'Toutes les donnees' },
    { value: '30', label: '30 jours' },
    { value: '90', label: '90 jours' },
    { value: '180', label: '180 jours' },
    { value: '365', label: '12 mois' },
  ];

  reports = [
    { id: 'global' as ExportReportId, icon: 'fa-chart-line', title: 'Rapport Global de Performance', desc: 'Rapport consolide incluant risques, incidents, audits, KPIs et vision multi-entites.', tag: 'Direction' },
    { id: 'risks' as ExportReportId, icon: 'fa-shield-halved', title: 'Registre des Risques Consolide', desc: 'Liste complete des risques avec cotations, statuts et plans de traitement.', tag: 'Risques' },
    { id: 'incidents' as ExportReportId, icon: 'fa-bolt', title: 'Rapport des Incidents', desc: 'Analyse des incidents declares avec dates, niveaux, domaines et chronologie.', tag: 'Incidents' },
    { id: 'audits' as ExportReportId, icon: 'fa-clipboard-check', title: 'Rapport Audit & Plans d Action', desc: 'Portefeuille des missions, responsables, statuts, delais et progression.', tag: 'Audit' },
    { id: 'entities' as ExportReportId, icon: 'fa-building', title: 'Vision Multi-Entites', desc: 'Comparatif des departements avec score de traitement et exposition critique.', tag: 'Entites' },
    { id: 'pack' as ExportReportId, icon: 'fa-box-archive', title: 'Pack Complet GRC', desc: 'Export transverse avec synthese, risques, incidents, audits, KPIs et entites.', tag: 'Complet' },
  ];

  constructor(
    private reportingService: ReportingService,
    private riskService: RiskService,
    private incidentService: IncidentService,
    private auditingService: AuditingService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  generateReport(reportId: ExportReportId): void {
    this.isExporting = true;
    this.exportingReportId = reportId;
    this.statusMessage = '';
    this.statusTone = '';

    if (reportId === 'global') {
      forkJoin({
        stats: this.reportingService.getStats(this.selectedPeriod),
        kpis: this.reportingService.getKpis(this.selectedPeriod),
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

    if (reportId === 'pack') {
      forkJoin({
        stats: this.reportingService.getStats(this.selectedPeriod),
        kpis: this.reportingService.getKpis(this.selectedPeriod),
        entities: this.reportingService.getMultiEntityData(),
        risks: this.riskService.getRisks(),
        incidents: this.incidentService.getIncidents(),
        audits: this.auditingService.getMissions('all'),
      }).subscribe({
        next: ({ stats, kpis, entities, risks, incidents, audits }) => {
          this.exportCompletePack(stats, kpis, entities, risks, incidents, audits);
          this.finishExport('success', `Pack complet genere au format ${this.selectedFormat.toUpperCase()}.`);
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

    if (reportId === 'audits') {
      this.auditingService.getMissions('all').subscribe({
        next: (audits) => {
          this.exportAuditReport(audits);
          this.finishExport('success', `Rapport audit genere au format ${this.selectedFormat.toUpperCase()}.`);
        },
        error: (error) => this.handleExportError(error),
      });
      return;
    }

    if (reportId === 'entities') {
      this.reportingService.getMultiEntityData().subscribe({
        next: (entities) => {
          this.exportEntityReport(entities);
          this.finishExport('success', `Vision multi-entites generee au format ${this.selectedFormat.toUpperCase()}.`);
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
        ['Periode', 'Filtre', stats.filters?.periodLabel || this.getSelectedPeriodLabel()],
        ['Risques', 'Total', stats.risks.total],
        ['Risques', 'Exposition', `${stats.risks.exposure.score}%`],
        ['Incidents', 'Total', stats.incidents.total],
        ['Incidents', 'Ouverts', stats.incidents.sla.open],
        ['Audits', 'Total', stats.audits.total],
        ['Audits', 'Avancement moyen', `${stats.audits.progress.average}%`],
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
        ['Risques', 'Exposition', `${stats.risks.exposure.score}%`],
        ['Incidents', 'Total', String(stats.incidents.total)],
        ['Incidents', 'Ouverts', String(stats.incidents.sla.open)],
        ['Audits', 'Total', String(stats.audits.total)],
        ['Audits', 'Avancement moyen', `${stats.audits.progress.average}%`],
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
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.includeDetails ? rows : rows.map(row => ({
        ID: row.ID,
        Titre: row.Titre,
        Niveau: row.Niveau,
        Statut: row.Statut,
        Echeance: row.Echeance,
      }))), 'Risques');
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

  private exportAuditReport(audits: AuditMission[]): void {
    const rows = audits.map((audit) => ({
      ID: audit.id,
      Code: audit.code || audit.id,
      Titre: audit.titre || 'Sans titre',
      Type: audit.type || 'Mission',
      Statut: audit.statut || 'Non defini',
      Auditeur: this.formatUserName((audit as any).auditeur),
      Debut: this.formatDate(audit.datePrevueDebut),
      Fin: this.formatDate(audit.datePrevueFin || audit.delai),
      Progression: `${audit.progressPercent || 0}%`,
      Recommandations: audit.recommandations || '-',
    }));

    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.includeDetails ? rows : rows.map(row => ({
        Code: row.Code,
        Titre: row.Titre,
        Type: row.Type,
        Statut: row.Statut,
        Progression: row.Progression,
      }))), 'Audits');
      XLSX.writeFile(workbook, this.buildFilename('rapport_audit'));
      return;
    }

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Rapport audit et plans d action', 14, 18);
    doc.setFontSize(10);
    doc.text(`Genere le ${this.formatDate(new Date())}`, 14, 25);

    autoTable(doc, {
      startY: 32,
      head: [['Code', 'Titre', 'Type', 'Statut', 'Auditeur', 'Fin', 'Progression']],
      body: rows.map(row => [String(row.Code), row.Titre, row.Type, row.Statut, row.Auditeur, row.Fin, row.Progression]),
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153] },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    doc.save(this.buildFilename('rapport_audit'));
  }

  private exportEntityReport(entities: MultiEntityData[]): void {
    const rows = entities.map(entity => ({
      Entite: entity.name,
      Risques: entity.riskCount,
      Critiques: entity.criticalRiskCount,
      PartCritique: entity.riskCount ? `${Math.round((entity.criticalRiskCount / entity.riskCount) * 100)}%` : '0%',
      Traitement: `${entity.treatmentRate}%`,
      Score: `${this.computeEntityScore(entity)}%`,
    }));

    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Entites');
      XLSX.writeFile(workbook, this.buildFilename('vision_multi_entites'));
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Vision multi-entites', 14, 20);
    doc.setFontSize(10);
    doc.text(`Genere le ${this.formatDate(new Date())}`, 14, 27);

    autoTable(doc, {
      startY: 35,
      head: [['Entite', 'Risques', 'Critiques', 'Part critique', 'Traitement', 'Score']],
      body: rows.map(row => [row.Entite, String(row.Risques), String(row.Critiques), row.PartCritique, row.Traitement, row.Score]),
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153] },
    });

    doc.save(this.buildFilename('vision_multi_entites'));
  }

  private exportCompletePack(
    stats: ReportingStats,
    kpis: KPI[],
    entities: MultiEntityData[],
    risks: Risk[],
    incidents: Incident[],
    audits: AuditMission[],
  ): void {
    if (this.selectedFormat === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
        ['Periode', stats.filters?.periodLabel || this.getSelectedPeriodLabel()],
        ['Risques', stats.risks.total],
        ['Incidents', stats.incidents.total],
        ['Audits', stats.audits.total],
        ['Exposition risque', `${stats.risks.exposure.score}%`],
      ]), 'Synthese');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(kpis), 'KPIs');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(entities), 'Entites');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(risks.map(risk => ({
        ID: risk.id,
        Titre: risk.titre,
        Domaine: risk.domaine || 'General',
        Niveau: risk.niveauRisqueLabel || risk.niveauRisqueCode || risk.niveauRisque || 'Non defini',
        Statut: risk.statutLabel || risk.statutCode || risk.statut || 'Non defini',
      }))), 'Risques');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(incidents.map(incident => ({
        ID: incident.id,
        Titre: incident.titre,
        Domaine: incident.domaine || 'General',
        Statut: incident.statutLabel || incident.statut || 'Non defini',
        Niveau: incident.niveauRisqueLabel || incident.niveauRisque || 'Non defini',
      }))), 'Incidents');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(audits.map(audit => ({
        Code: audit.code || audit.id,
        Titre: audit.titre,
        Type: audit.type,
        Statut: audit.statut,
        Progression: `${audit.progressPercent || 0}%`,
      }))), 'Audits');
      XLSX.writeFile(workbook, this.buildFilename('pack_grc_complet'));
      return;
    }

    this.exportGlobalReport(stats, kpis, entities);
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

  private getSelectedPeriodLabel(): string {
    return this.periodOptions.find(option => option.value === this.selectedPeriod)?.label || 'Toutes les donnees';
  }

  private computeEntityScore(entity: MultiEntityData): number {
    const criticalPenalty = entity.riskCount ? Math.round((entity.criticalRiskCount / entity.riskCount) * 35) : 0;
    return Math.max(0, Math.min(100, Math.round(entity.treatmentRate - criticalPenalty)));
  }

  private formatUserName(user: any): string {
    if (!user) {
      return '-';
    }

    return [user.prenom, user.nom].filter(Boolean).join(' ').trim()
      || user.fullName
      || user.name
      || user.email
      || user.mail
      || '-';
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
