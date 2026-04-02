import { Component } from '@angular/core';
import { IncidentService, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/incident.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
function IncidentReportingComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelementStart(1, "span", 34);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 35);
    i0.ɵɵelement(4, "div", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(d_r1);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", 40 + d_r1.length * 5, "%");
} }
const _c0 = function () { return ["IT", "RH", "Finance", "Op\u00E9rations"]; };
export class IncidentReportingComponent {
    constructor(incidentService, router) {
        this.incidentService = incidentService;
        this.router = router;
        this.incidents = [];
        this.isLoading = false;
        // Stats
        this.totalIncidents = 0;
        this.openIncidents = 0;
        this.resolvedIncidents = 0;
        this.criticalIncidents = 0;
    }
    ngOnInit() {
        this.loadStats();
    }
    loadStats() {
        this.isLoading = true;
        this.incidentService.getIncidents().subscribe(data => {
            this.incidents = data;
            this.totalIncidents = data.length;
            this.openIncidents = data.filter(i => i.statut !== IncidentStatus.CLOS).length;
            this.resolvedIncidents = data.filter(i => i.statut === IncidentStatus.TRAITE || i.statut === IncidentStatus.CLOS).length;
            this.criticalIncidents = data.filter(i => i.niveauRisque === IncidentNiveauRisque.CRITICAL).length;
            this.isLoading = false;
        });
    }
    exportReport() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            alert('Rapport annuel exporté avec succès (format PDF).');
        }, 1500);
    }
    getPercent(count) {
        return this.totalIncidents > 0 ? Math.round((count / this.totalIncidents) * 100) : 0;
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
IncidentReportingComponent.ɵfac = function IncidentReportingComponent_Factory(t) { return new (t || IncidentReportingComponent)(i0.ɵɵdirectiveInject(i1.IncidentService), i0.ɵɵdirectiveInject(i2.Router)); };
IncidentReportingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentReportingComponent, selectors: [["app-incident-reporting"]], decls: 72, vars: 8, consts: [[1, "incident-page", "reporting-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-pie"], [1, "header-actions"], [1, "btn-premium", 3, "click"], [1, "fas", "fa-file-export"], [1, "reporting-container"], [1, "kpi-grid"], [1, "kpi-card", "shadow-sm", "blue"], [1, "kpi-icon"], [1, "fas", "fa-list-ul"], [1, "kpi-info"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "shadow-sm", "yellow"], [1, "fas", "fa-hourglass-half"], [1, "kpi-card", "shadow-sm", "green"], [1, "fas", "fa-check-double"], [1, "kpi-card", "shadow-sm", "red"], [1, "fas", "fa-exclamation-circle"], [1, "charts-grid", "mt-4"], [1, "chart-card", "card", "shadow-sm"], [1, "fas", "fa-chart-bar"], [1, "dummy-chart"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "fas", "fa-history"], [1, "dummy-stats"], [1, "stat-circle"], [1, "val"], [1, "lab"], [1, "bar-row"], [1, "label"], [1, "bar-container"], [1, "bar"]], template: function IncidentReportingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentReportingComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Reporting Consolid\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Visualisez les indicateurs cl\u00E9s de performance (KPI) et l'\u00E9volution des incidents sur l'ann\u00E9e.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function IncidentReportingComponent_Template_button_click_12_listener() { return ctx.exportReport(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Exporter Rapport Annuel ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 9);
        i0.ɵɵelementStart(16, "div", 10);
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelement(19, "i", 13);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 14);
        i0.ɵɵelementStart(21, "span", 15);
        i0.ɵɵtext(22, "Total Incidents");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "span", 16);
        i0.ɵɵtext(24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 17);
        i0.ɵɵelementStart(26, "div", 12);
        i0.ɵɵelement(27, "i", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "div", 14);
        i0.ɵɵelementStart(29, "span", 15);
        i0.ɵɵtext(30, "En cours / Ouverts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "span", 16);
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "small");
        i0.ɵɵtext(34);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "div", 19);
        i0.ɵɵelementStart(36, "div", 12);
        i0.ɵɵelement(37, "i", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 14);
        i0.ɵɵelementStart(39, "span", 15);
        i0.ɵɵtext(40, "Taux de R\u00E9solution");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "span", 16);
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "small");
        i0.ɵɵtext(44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 21);
        i0.ɵɵelementStart(46, "div", 12);
        i0.ɵɵelement(47, "i", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(48, "div", 14);
        i0.ɵɵelementStart(49, "span", 15);
        i0.ɵɵtext(50, "Incidents Critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "span", 16);
        i0.ɵɵtext(52);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "div", 23);
        i0.ɵɵelementStart(54, "div", 24);
        i0.ɵɵelementStart(55, "h3");
        i0.ɵɵelement(56, "i", 25);
        i0.ɵɵtext(57, " Volume par Domaine");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "div", 26);
        i0.ɵɵtemplate(59, IncidentReportingComponent_div_59_Template, 5, 3, "div", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 24);
        i0.ɵɵelementStart(61, "h3");
        i0.ɵɵelement(62, "i", 28);
        i0.ɵɵtext(63, " D\u00E9lais de Traitement Moyens");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "div", 29);
        i0.ɵɵelementStart(65, "div", 30);
        i0.ɵɵelementStart(66, "span", 31);
        i0.ɵɵtext(67, "4.2");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "span", 32);
        i0.ɵɵtext(69, "Jours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "p");
        i0.ɵɵtext(71, "Temps moyen entre la d\u00E9claration et la cl\u00F4ture d\u00E9finitive.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(24);
        i0.ɵɵtextInterpolate(ctx.totalIncidents);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.openIncidents);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.getPercent(ctx.openIncidents), "% du volume total");
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1("", ctx.getPercent(ctx.resolvedIncidents), "%");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.resolvedIncidents, " incidents trait\u00E9s");
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.criticalIncidents);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(7, _c0));
    } }, directives: [i3.NgForOf], styles: [".kpi-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 20px;\n    margin-top: 20px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n    background: white; padding: 25px; border-radius: 16px; display: flex; align-items: center; gap: 20px; border-left: 5px solid #e2e8f0; transition: all 0.3s;\n    &:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }\n    .kpi-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }\n    .kpi-info { display: flex; flex-direction: column; .kpi-label { font-size: 0.85rem; color: #64748b; font-weight: 600; } .kpi-value { font-size: 1.8rem; font-weight: 800; color: #1e293b; } small { font-size: 0.75rem; color: #94a3b8; } }\n    \n    &.blue { border-color: #3b82f6; .kpi-icon { background: #eff6ff; color: #3b82f6; } }\n    &.yellow { border-color: #eab308; .kpi-icon { background: #fefce8; color: #eab308; } }\n    &.green { border-color: #10b981; .kpi-icon { background: #ecfdf5; color: #10b981; } }\n    &.red { border-color: #ef4444; .kpi-icon { background: #fef2f2; color: #ef4444; } }\n}\n\n.charts-grid[_ngcontent-%COMP%] {\n    display: grid; grid-template-columns: 2fr 1fr; gap: 25px;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n    padding: 25px; background: white; border-radius: 16px; h3 { font-size: 1.1rem; color: #1e293b; font-weight: 700; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }\n}\n\n.dummy-chart[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; gap: 15px;\n    .bar-row {\n        display: flex; align-items: center; gap: 15px;\n        .label { width: 80px; font-size: 0.85rem; font-weight: 600; color: #64748b; }\n        .bar-container { flex-grow: 1; height: 12px; background: #f1f5f9; border-radius: 6px; overflow: hidden; .bar { height: 100%; background: #004a99; border-radius: 6px; } }\n    }\n}\n\n.dummy-stats[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px;\n    .stat-circle { width: 100px; height: 100px; border-radius: 50%; border: 8px solid #004a99; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; .val { font-size: 1.8rem; font-weight: 800; color: #004a99; } .lab { font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; } }\n    p { font-size: 0.9rem; color: #64748b; line-height: 1.5; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentReportingComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-reporting',
                templateUrl: './incident-reporting.component.html',
                styleUrls: ['./incident-reporting.component.scss']
            }]
    }], function () { return [{ type: i1.IncidentService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=incident-reporting.component.js.map