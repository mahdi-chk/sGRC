import { Component } from '@angular/core';
import { ReportingService } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
function ExportCenterComponent_div_28_i_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 24);
} }
function ExportCenterComponent_div_28_i_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
} }
function ExportCenterComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵelement(2, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 20);
    i0.ɵɵelementStart(4, "h4");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 21);
    i0.ɵɵlistener("click", function ExportCenterComponent_div_28_Template_button_click_8_listener() { const restoredCtx = i0.ɵɵrestoreView(_r5); const report_r1 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.generateReport(report_r1.id); });
    i0.ɵɵtemplate(9, ExportCenterComponent_div_28_i_9_Template, 1, 0, "i", 22);
    i0.ɵɵtemplate(10, ExportCenterComponent_div_28_i_10_Template, 1, 0, "i", 23);
    i0.ɵɵtext(11, " G\u00E9n\u00E9rer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const report_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(report_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r1.desc);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r0.isExporting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.isExporting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isExporting);
} }
export class ExportCenterComponent {
    constructor(reportingService, router) {
        this.reportingService = reportingService;
        this.router = router;
        this.isExporting = false;
        this.selectedFormat = 'xlsx';
        this.reports = [
            { id: 'global', title: 'Rapport Global de Performance', desc: 'Rapport consolidé incluant Risques, Incidents et Audits.' },
            { id: 'risks', title: 'Registre des Risques Consolidé', desc: 'Liste complète des risques avec cotations et plans de traitement.' },
            { id: 'incidents', title: 'Rapport Annuel des Incidents', desc: 'Analyse statistique des incidents survenus sur l\'année.' }
        ];
    }
    ngOnInit() { }
    generateReport(reportId) {
        this.isExporting = true;
        this.reportingService.exportData({ reportId, format: this.selectedFormat }).subscribe(() => {
            setTimeout(() => {
                this.isExporting = false;
                alert(`Le rapport "${reportId}" a été généré avec succès au format ${this.selectedFormat.toUpperCase()}.`);
            }, 2000);
        }, error => {
            console.error('Export error', error);
            this.isExporting = false;
            // Simuler pour la démo si le backend n'est pas encore prêt pour l'export réel
            setTimeout(() => {
                this.isExporting = false;
                alert(`Simulation: Rapport "${reportId}" exporté.`);
            }, 1500);
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
ExportCenterComponent.ɵfac = function ExportCenterComponent_Factory(t) { return new (t || ExportCenterComponent)(i0.ɵɵdirectiveInject(i1.ReportingService), i0.ɵɵdirectiveInject(i2.Router)); };
ExportCenterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ExportCenterComponent, selectors: [["app-export-center"]], decls: 29, vars: 5, consts: [[1, "role-dashboard", "reporting-dashboard", "export-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-file-export"], [1, "export-container"], [1, "module-card", "premium", "export-config", "mb-4"], [1, "fas", "fa-cog"], [1, "config-row"], [1, "config-item"], [1, "format-toggle"], [3, "click"], [1, "fas", "fa-file-excel"], [1, "fas", "fa-file-pdf"], [1, "report-grid"], ["class", "report-card premium", 4, "ngFor", "ngForOf"], [1, "report-card", "premium"], [1, "report-icon"], [1, "fas", "fa-file-signature"], [1, "report-info"], [1, "btn-download", 3, "disabled", "click"], ["class", "fas fa-download", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "fas", "fa-download"], [1, "fas", "fa-spinner", "fa-spin"]], template: function ExportCenterComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "G\u00E9n\u00E9rez et t\u00E9l\u00E9chargez des rapports d\u00E9taill\u00E9s pour la direction et les audits.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "h3");
        i0.ɵɵelement(14, "i", 8);
        i0.ɵɵtext(15, " Configuration de l'Export");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 9);
        i0.ɵɵelementStart(17, "div", 10);
        i0.ɵɵelementStart(18, "label");
        i0.ɵɵtext(19, "Format de sortie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 11);
        i0.ɵɵelementStart(21, "button", 12);
        i0.ɵɵlistener("click", function ExportCenterComponent_Template_button_click_21_listener() { return ctx.selectedFormat = "xlsx"; });
        i0.ɵɵelement(22, "i", 13);
        i0.ɵɵtext(23, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "button", 12);
        i0.ɵɵlistener("click", function ExportCenterComponent_Template_button_click_24_listener() { return ctx.selectedFormat = "pdf"; });
        i0.ɵɵelement(25, "i", 14);
        i0.ɵɵtext(26, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 15);
        i0.ɵɵtemplate(28, ExportCenterComponent_div_28_Template, 12, 5, "div", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(21);
        i0.ɵɵclassProp("active", ctx.selectedFormat === "xlsx");
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("active", ctx.selectedFormat === "pdf");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngForOf", ctx.reports);
    } }, directives: [i3.NgForOf, i3.NgIf], styles: [".export-page[_ngcontent-%COMP%] {\n  .export-container {\n    max-width: 1000px;\n    margin: 0 auto;\n    animation: fadeIn 0.5s ease-out;\n  }\n\n  .export-config {\n    padding: 24px;\n    background: white;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n\n    .config-row {\n      display: flex;\n      gap: 40px;\n      margin-top: 20px;\n    }\n\n    .config-item {\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n\n      label {\n        font-size: 14px;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n      }\n    }\n\n    .format-toggle {\n      display: flex;\n      gap: 12px;\n\n      button {\n        padding: 12px 24px;\n        border-radius: 12px;\n        border: 2px solid #f1f5f9;\n        background: white;\n        font-weight: 700;\n        color: #64748b;\n        cursor: pointer;\n        transition: all 0.2s;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n\n        i { font-size: 18px; }\n\n        &.active {\n          border-color: #3b82f6;\n          color: #3b82f6;\n          background: #eff6ff;\n        }\n\n        &:hover:not(.active) {\n          border-color: #e2e8f0;\n          background: #f8fafc;\n        }\n      }\n    }\n  }\n\n  .report-grid {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n  }\n\n  .report-card {\n    display: flex;\n    align-items: center;\n    padding: 24px;\n    background: white;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n    border: 1px solid rgba(0, 0, 0, 0.05);\n\n    .report-icon {\n      width: 56px;\n      height: 56px;\n      border-radius: 14px;\n      background: #f1f5f9;\n      color: #3b82f6;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 24px;\n      margin-right: 24px;\n    }\n\n    .report-info {\n      flex: 1;\n\n      h4 {\n        font-size: 18px;\n        font-weight: 700;\n        color: #1e293b;\n        margin: 0 0 4px 0;\n      }\n\n      p {\n        font-size: 14px;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .btn-download {\n      padding: 12px 24px;\n      background: #1e293b;\n      color: white;\n      border-radius: 12px;\n      border: none;\n      font-weight: 700;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      transition: all 0.2s;\n\n      &:hover:not(:disabled) {\n        background: #334155;\n        transform: translateY(-2px);\n      }\n\n      &:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n    }\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExportCenterComponent, [{
        type: Component,
        args: [{
                selector: 'app-export-center',
                templateUrl: './export-center.component.html',
                styleUrls: ['./export-center.component.scss']
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=export-center.component.js.map