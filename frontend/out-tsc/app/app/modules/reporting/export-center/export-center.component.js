import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportingService, } from '../../../core/services/reporting.service';
import { IncidentService } from '../../../core/services/incident.service';
import { RiskService } from '../../../core/services/risk.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "../../../core/services/risk.service";
import * as i3 from "../../../core/services/incident.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ExportCenterComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r4.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", item_r4.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.label);
} }
function ExportCenterComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 19);
    i0.ɵɵtemplate(1, ExportCenterComponent_nav_11_a_1_Template, 4, 5, "a", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function ExportCenterComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r1.statusTone);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r1.statusTone === "success" ? "fa-circle-check" : "fa-circle-exclamation");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusMessage);
} }
function ExportCenterComponent_div_30_i_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
} }
function ExportCenterComponent_div_30_i_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 32);
} }
function ExportCenterComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵelement(2, "i", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 27);
    i0.ɵɵelementStart(4, "h4");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 28);
    i0.ɵɵlistener("click", function ExportCenterComponent_div_30_Template_button_click_8_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const report_r5 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.generateReport(report_r5.id); });
    i0.ɵɵtemplate(9, ExportCenterComponent_div_30_i_9_Template, 1, 0, "i", 29);
    i0.ɵɵtemplate(10, ExportCenterComponent_div_30_i_10_Template, 1, 0, "i", 30);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const report_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(report_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r5.desc);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r2.isExporting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.exportingReportId !== report_r5.id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.exportingReportId === report_r5.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.exportingReportId === report_r5.id ? "Generation..." : "Generer", " ");
} }
export class ExportCenterComponent {
    constructor(reportingService, riskService, incidentService, router) {
        this.reportingService = reportingService;
        this.riskService = riskService;
        this.incidentService = incidentService;
        this.router = router;
        this.isExporting = false;
        this.exportingReportId = null;
        this.selectedFormat = 'xlsx';
        this.statusMessage = '';
        this.statusTone = '';
        this.navItems = REPORTING_NAV_ITEMS;
        this.reports = [
            { id: 'global', title: 'Rapport Global de Performance', desc: 'Rapport consolide incluant risques, incidents, audits, KPIs et vision multi-entites.' },
            { id: 'risks', title: 'Registre des Risques Consolide', desc: 'Liste complete des risques avec cotations, statuts et plans de traitement.' },
            { id: 'incidents', title: 'Rapport des Incidents', desc: 'Analyse des incidents declares avec dates, niveaux et domaines.' }
        ];
    }
    ngOnInit() { }
    generateReport(reportId) {
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
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    exportGlobalReport(stats, kpis, entities) {
        if (this.selectedFormat === 'xlsx') {
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
                ['Section', 'Metrique', 'Valeur'],
                ['Risques', 'Total', stats.risks.total],
                ['Incidents', 'Total', stats.incidents.total],
                ['Audits', 'Total', stats.audits.total],
            ]), 'Synthese');
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(kpis.map((kpi) => ({
                KPI: kpi.label,
                Valeur: `${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ''}`.trim(),
            }))), 'KPIs');
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(entities.map((entity) => ({
                Entite: entity.name,
                Risques: entity.riskCount,
                RisquesCritiques: entity.criticalRiskCount,
                TauxTraitement: `${entity.treatmentRate}%`,
            }))), 'Entites');
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
        let finalY = doc.lastAutoTable.finalY + 10;
        autoTable(doc, {
            startY: finalY,
            head: [['KPI', 'Valeur']],
            body: kpis.map((kpi) => [kpi.label, `${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ''}`.trim()]),
            theme: 'striped',
            headStyles: { fillColor: [15, 76, 129] },
        });
        finalY = doc.lastAutoTable.finalY + 10;
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
    exportRiskReport(risks) {
        const rows = risks.map((risk) => {
            var _a;
            return ({
                ID: risk.id,
                Titre: risk.titre,
                Domaine: risk.domaine || 'General',
                Departement: ((_a = risk.departement) === null || _a === void 0 ? void 0 : _a.nom) || 'Non specifie',
                Probabilite: risk.probabiliteLabel || risk.probabilite || 'Non defini',
                Impact: risk.impactLabel || risk.impact || 'Non defini',
                Niveau: risk.niveauRisqueLabel || risk.niveauRisqueCode || risk.niveauRisque || 'Non defini',
                Statut: risk.statutLabel || risk.statutCode || risk.statut || 'Non defini',
                Echeance: this.formatDate(risk.dateEcheance),
                Traitement: risk.planActionTraitement || 'Non defini',
            });
        });
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
    exportIncidentReport(incidents) {
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
    finishExport(tone, message) {
        this.isExporting = false;
        this.exportingReportId = null;
        this.statusTone = tone;
        this.statusMessage = message;
    }
    handleExportError(error) {
        console.error('Export error', error);
        this.finishExport('error', 'La generation du rapport a echoue.');
    }
    buildFilename(baseName) {
        const extension = this.selectedFormat === 'xlsx' ? 'xlsx' : 'pdf';
        const date = new Date().toISOString().split('T')[0];
        return `${baseName}_${date}.${extension}`;
    }
    formatDate(value) {
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
ExportCenterComponent.ɵfac = function ExportCenterComponent_Factory(t) { return new (t || ExportCenterComponent)(i0.ɵɵdirectiveInject(i1.ReportingService), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.IncidentService), i0.ɵɵdirectiveInject(i4.Router)); };
ExportCenterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ExportCenterComponent, selectors: [["app-export-center"]], decls: 31, vars: 7, consts: [[1, "role-dashboard", "reporting-dashboard", "export-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-file-export"], ["class", "reporting-tabs", 4, "ngIf"], [1, "export-container"], [1, "module-card", "premium", "export-config", "mb-4"], [1, "fas", "fa-cog"], [1, "config-row"], [1, "config-item"], [1, "format-toggle"], [3, "click"], [1, "fas", "fa-file-excel"], [1, "fas", "fa-file-pdf"], ["class", "status-line", 3, "ngClass", 4, "ngIf"], [1, "report-grid"], ["class", "report-card premium", 4, "ngFor", "ngForOf"], [1, "reporting-tabs"], ["routerLinkActive", "active", "class", "reporting-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "reporting-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "fas", 3, "ngClass"], [1, "status-line", 3, "ngClass"], [1, "report-card", "premium"], [1, "report-icon"], [1, "fas", "fa-file-signature"], [1, "report-info"], [1, "btn-download", 3, "disabled", "click"], ["class", "fas fa-download", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "fas", "fa-download"], [1, "fas", "fa-spinner", "fa-spin"]], template: function ExportCenterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ExportCenterComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Centre d'Exports");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Generez et telechargez des rapports detailes en PDF ou Excel depuis les donnees reelles du module reporting.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, ExportCenterComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "h3");
        i0.ɵɵelement(15, "i", 9);
        i0.ɵɵtext(16, " Configuration de l'Export");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 10);
        i0.ɵɵelementStart(18, "div", 11);
        i0.ɵɵelementStart(19, "label");
        i0.ɵɵtext(20, "Format de sortie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 12);
        i0.ɵɵelementStart(22, "button", 13);
        i0.ɵɵlistener("click", function ExportCenterComponent_Template_button_click_22_listener() { return ctx.selectedFormat = "xlsx"; });
        i0.ɵɵelement(23, "i", 14);
        i0.ɵɵtext(24, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "button", 13);
        i0.ɵɵlistener("click", function ExportCenterComponent_Template_button_click_25_listener() { return ctx.selectedFormat = "pdf"; });
        i0.ɵɵelement(26, "i", 15);
        i0.ɵɵtext(27, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(28, ExportCenterComponent_div_28_Template, 4, 3, "div", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "div", 17);
        i0.ɵɵtemplate(30, ExportCenterComponent_div_30_Template, 12, 6, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(11);
        i0.ɵɵclassProp("active", ctx.selectedFormat === "xlsx");
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("active", ctx.selectedFormat === "pdf");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.statusMessage);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.reports);
    } }, directives: [i5.NgIf, i5.NgForOf, i4.RouterLinkWithHref, i4.RouterLinkActive, i5.NgClass], styles: ["@import '../reporting-shared';\n\n.export-page[_ngcontent-%COMP%] {\n  .export-container {\n    max-width: 1000px;\n    margin: 0 auto;\n    animation: fadeIn 0.5s ease-out;\n  }\n\n  .export-config {\n    padding: 24px;\n    background: white;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n\n    .config-row {\n      display: flex;\n      gap: 40px;\n      margin-top: 20px;\n      margin-bottom: 18px;\n    }\n\n    .config-item {\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n\n      label {\n        font-size: 14px;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n      }\n    }\n\n    .format-toggle {\n      display: flex;\n      gap: 12px;\n\n      button {\n        padding: 12px 24px;\n        border-radius: 12px;\n        border: 2px solid #f1f5f9;\n        background: white;\n        font-weight: 700;\n        color: #64748b;\n        cursor: pointer;\n        transition: all 0.2s;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n\n        i { font-size: 18px; }\n\n        &.active {\n          border-color: #3b82f6;\n          color: #3b82f6;\n          background: #eff6ff;\n        }\n\n        &:hover:not(.active) {\n          border-color: #e2e8f0;\n          background: #f8fafc;\n        }\n      }\n    }\n  }\n\n  .status-line {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 14px 16px;\n    border-radius: 14px;\n    font-weight: 600;\n\n    &.success {\n      color: #166534;\n      background: #dcfce7;\n      border: 1px solid #bbf7d0;\n    }\n\n    &.error {\n      color: #991b1b;\n      background: #fee2e2;\n      border: 1px solid #fecaca;\n    }\n  }\n\n  .report-grid {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n  }\n\n  .report-card {\n    display: flex;\n    align-items: center;\n    padding: 24px;\n    background: white;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n    border: 1px solid rgba(0, 0, 0, 0.05);\n\n    .report-icon {\n      width: 56px;\n      height: 56px;\n      border-radius: 14px;\n      background: #f1f5f9;\n      color: #3b82f6;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 24px;\n      margin-right: 24px;\n    }\n\n    .report-info {\n      flex: 1;\n\n      h4 {\n        font-size: 18px;\n        font-weight: 700;\n        color: #1e293b;\n        margin: 0 0 4px 0;\n      }\n\n      p {\n        font-size: 14px;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .btn-download {\n      padding: 12px 24px;\n      background: #1e293b;\n      color: white;\n      border-radius: 12px;\n      border: none;\n      font-weight: 700;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      transition: all 0.2s;\n\n      &:hover:not(:disabled) {\n        background: #334155;\n        transform: translateY(-2px);\n      }\n\n      &:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n    }\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExportCenterComponent, [{
        type: Component,
        args: [{
                selector: 'app-export-center',
                templateUrl: './export-center.component.html',
                styleUrls: ['./export-center.component.scss']
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.RiskService }, { type: i3.IncidentService }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=export-center.component.js.map