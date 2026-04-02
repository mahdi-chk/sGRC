import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportingService } from '../../../core/services/reporting.service';
import { RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
function DashboardViewComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement des donn\u00E9es...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DashboardViewComponent_div_16_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "span", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const levelCode_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r2.getRiskLevelClass(levelCode_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.getRiskLevelLabel(levelCode_r6), " (", ctx_r2.getRiskLevelCount(levelCode_r6), ") ");
} }
function DashboardViewComponent_div_16_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵelementStart(1, "div", 47);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 48);
    i0.ɵɵelementStart(4, "div", 49);
    i0.ɵɵelementStart(5, "span", 50);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.getRiskStatusLabel(status_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r3.getPercent(status_r7.count, ctx_r3.stats.incidents.total), "%");
    i0.ɵɵproperty("ngClass", ctx_r3.getStatusClass(status_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r7.count);
} }
function DashboardViewComponent_div_16_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelementStart(1, "div", 52);
    i0.ɵɵelement(2, "i", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 54);
    i0.ɵɵelementStart(4, "span", 55);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 56);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 57);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r8 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r4.getRiskLevelClass(risk_r8.niveauRisqueCode || risk_r8.niveauRisque));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(risk_r8.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", risk_r8.domaine || "G\u00E9n\u00E9ral", " \u2022 ", ctx_r4.getRiskStatusLabel(risk_r8.statutLabel || risk_r8.statutCode || risk_r8.statut), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 5, risk_r8.createdAt, "dd/MM"));
} }
function DashboardViewComponent_div_16_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelementStart(1, "div", 58);
    i0.ɵɵelement(2, "i", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 54);
    i0.ɵɵelementStart(4, "span", 55);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 56);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 57);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r9 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(incident_r9.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.getRiskStatusLabel(incident_r9.statutLabel || incident_r9.statutCode || incident_r9.statut));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 3, incident_r9.createdAt, "dd/MM"));
} }
function DashboardViewComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "div", 15);
    i0.ɵɵelementStart(3, "div", 16);
    i0.ɵɵelement(4, "i", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 18);
    i0.ɵɵelementStart(6, "span", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 20);
    i0.ɵɵtext(9, "Risques identifi\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 21);
    i0.ɵɵelementStart(11, "div", 16);
    i0.ɵɵelement(12, "i", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 18);
    i0.ɵɵelementStart(14, "span", 19);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 20);
    i0.ɵɵtext(17, "Incidents d\u00E9clar\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 23);
    i0.ɵɵelementStart(19, "div", 16);
    i0.ɵɵelement(20, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 18);
    i0.ɵɵelementStart(22, "span", 19);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 20);
    i0.ɵɵtext(25, "Missions d'audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 25);
    i0.ɵɵelementStart(27, "div", 26);
    i0.ɵɵelementStart(28, "h3");
    i0.ɵɵelement(29, "i", 27);
    i0.ɵɵtext(30, " S\u00E9v\u00E9rit\u00E9 des risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 28);
    i0.ɵɵelementStart(32, "div", 29);
    i0.ɵɵelementStart(33, "div", 30);
    i0.ɵɵelementStart(34, "span", 31);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 32);
    i0.ɵɵtext(37, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 33);
    i0.ɵɵtemplate(39, DashboardViewComponent_div_16_div_39_Template, 3, 3, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 26);
    i0.ɵɵelementStart(41, "h3");
    i0.ɵɵelement(42, "i", 35);
    i0.ɵɵtext(43, " Statut des incidents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 36);
    i0.ɵɵelementStart(45, "div", 37);
    i0.ɵɵtemplate(46, DashboardViewComponent_div_16_div_46_Template, 7, 5, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 39);
    i0.ɵɵelementStart(48, "h3");
    i0.ɵɵelement(49, "i", 40);
    i0.ɵɵtext(50, " Risques r\u00E9cents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 41);
    i0.ɵɵtemplate(52, DashboardViewComponent_div_16_div_52_Template, 11, 8, "div", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 39);
    i0.ɵɵelementStart(54, "h3");
    i0.ɵɵelement(55, "i", 43);
    i0.ɵɵtext(56, " Incidents r\u00E9cents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 41);
    i0.ɵɵtemplate(58, DashboardViewComponent_div_16_div_58_Template, 11, 6, "div", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.stats.risks.total);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.stats.incidents.total);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.stats.audits.total);
    i0.ɵɵadvance(9);
    i0.ɵɵstyleProp("--p_low", ctx_r1.getPercent(ctx_r1.getRiskLevelCount(ctx_r1.riskLevelOrder[0]), ctx_r1.stats.risks.total))("--p_limited", ctx_r1.getPercent(ctx_r1.getRiskLevelCount(ctx_r1.riskLevelOrder[1]), ctx_r1.stats.risks.total))("--p_med", ctx_r1.getPercent(ctx_r1.getRiskLevelCount(ctx_r1.riskLevelOrder[2]), ctx_r1.stats.risks.total))("--p_high", ctx_r1.getPercent(ctx_r1.getRiskLevelCount(ctx_r1.riskLevelOrder[3]), ctx_r1.stats.risks.total))("--p_crit", ctx_r1.getPercent(ctx_r1.getRiskLevelCount(ctx_r1.riskLevelOrder[4]), ctx_r1.stats.risks.total));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.stats.risks.total);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.riskLevelOrder);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r1.stats.incidents.byStatus);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.stats.risks.recent);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.stats.incidents.recent);
} }
export class DashboardViewComponent {
    constructor(reportingService, router) {
        this.reportingService = reportingService;
        this.router = router;
        this.stats = null;
        this.isLoading = true;
        this.riskLevelOrder = [
            RiskLevel.LOW,
            RiskLevel.LIMITED,
            RiskLevel.MEDIUM,
            RiskLevel.HIGH,
            RiskLevel.CRITICAL,
        ];
        this.riskLevelLabels = {
            [RiskLevel.LOW]: 'Faible',
            [RiskLevel.LIMITED]: 'Limité',
            [RiskLevel.MEDIUM]: 'Moyen',
            [RiskLevel.HIGH]: 'Élevé',
            [RiskLevel.CRITICAL]: 'Critique',
        };
        this.riskLevelAliases = {
            low: RiskLevel.LOW,
            faible: RiskLevel.LOW,
            limited: RiskLevel.LIMITED,
            limite: RiskLevel.LIMITED,
            medium: RiskLevel.MEDIUM,
            moyen: RiskLevel.MEDIUM,
            high: RiskLevel.HIGH,
            eleve: RiskLevel.HIGH,
            critical: RiskLevel.CRITICAL,
            critique: RiskLevel.CRITICAL,
        };
        this.riskStatusLabels = {
            [RiskStatus.OPEN]: 'Ouvert',
            [RiskStatus.IN_PROGRESS]: 'En cours',
            [RiskStatus.TREATED]: 'Traité',
            [RiskStatus.CLOSED]: 'Clôturé',
        };
    }
    ngOnInit() {
        this.loadStats();
    }
    loadStats() {
        this.isLoading = true;
        this.reportingService.getStats().subscribe((data) => {
            this.stats = data;
            this.isLoading = false;
        }, (error) => {
            console.error('Error loading stats', error);
            this.isLoading = false;
        });
    }
    getPercent(value, total) {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    }
    getRiskLevelCount(code) {
        var _a, _b;
        const entry = (_b = (_a = this.stats) === null || _a === void 0 ? void 0 : _a.risks.byLevel) === null || _b === void 0 ? void 0 : _b.find((level) => this.resolveRiskLevel(level === null || level === void 0 ? void 0 : level.code) === code);
        return Number((entry === null || entry === void 0 ? void 0 : entry.count) || 0);
    }
    getRiskLevelLabel(level) {
        if (level === null || level === void 0 ? void 0 : level.label) {
            return level.label;
        }
        const code = this.resolveRiskLevel((level === null || level === void 0 ? void 0 : level.code) || (level === null || level === void 0 ? void 0 : level.niveauRisque) || level);
        return code ? this.riskLevelLabels[code] : 'Non défini';
    }
    getRiskLevelClass(level) {
        return this.resolveRiskLevel((level === null || level === void 0 ? void 0 : level.code) || (level === null || level === void 0 ? void 0 : level.niveauRisque) || level) || 'default';
    }
    getRiskStatusLabel(status) {
        if (status === null || status === void 0 ? void 0 : status.label) {
            return status.label;
        }
        const normalized = this.normalize((status === null || status === void 0 ? void 0 : status.code) || (status === null || status === void 0 ? void 0 : status.statut) || status);
        return this.riskStatusLabels[normalized] || (status === null || status === void 0 ? void 0 : status.statut) || (status === null || status === void 0 ? void 0 : status.code) || status || 'Non défini';
    }
    getStatusClass(status) {
        return this.normalize((status === null || status === void 0 ? void 0 : status.code) || (status === null || status === void 0 ? void 0 : status.statut) || status) || 'default';
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    normalize(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    resolveRiskLevel(level) {
        const normalized = this.normalize(level);
        return this.riskLevelAliases[normalized] || null;
    }
}
DashboardViewComponent.ɵfac = function DashboardViewComponent_Factory(t) { return new (t || DashboardViewComponent)(i0.ɵɵdirectiveInject(i1.ReportingService), i0.ɵɵdirectiveInject(i2.Router)); };
DashboardViewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardViewComponent, selectors: [["app-dashboard-view"]], decls: 17, vars: 5, consts: [[1, "role-dashboard", "reporting-dashboard", "dashboard-view-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-right"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", "fa-sync-alt"], ["class", "loading-overlay", 4, "ngIf"], ["class", "dashboard-content", 4, "ngIf"], [1, "loading-overlay"], [1, "spinner"], [1, "dashboard-content"], [1, "kpi-row", "mb-4"], [1, "kpi-card", "kpi-risks"], [1, "kpi-icon"], [1, "fas", "fa-exclamation-triangle"], [1, "kpi-info"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-incidents"], [1, "fas", "fa-fire"], [1, "kpi-card", "kpi-audits"], [1, "fas", "fa-clipboard-check"], [1, "dashboard-grid"], [1, "module-card", "premium", "chart-card"], [1, "fas", "fa-signal"], [1, "chart-container", "donut-wrapper"], [1, "donut-chart"], [1, "donut-inner"], [1, "total"], [1, "sub"], [1, "chart-legend"], ["class", "legend-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "fas", "fa-tasks"], [1, "chart-container", "bar-wrapper"], [1, "bar-chart"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "module-card", "premium", "list-card"], [1, "fas", "fa-history"], [1, "item-list"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "fas", "fa-bolt"], [1, "legend-item", 3, "ngClass"], [1, "dot"], [1, "bar-group"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill", 3, "ngClass"], [1, "bar-value"], [1, "list-item"], [1, "item-icon", 3, "ngClass"], [1, "fas", "fa-shield-alt"], [1, "item-details"], [1, "item-title"], [1, "item-meta"], [1, "item-date"], [1, "item-icon", "warning"], [1, "fas", "fa-exclamation-circle"]], template: function DashboardViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function DashboardViewComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Tableaux de bord consolid\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vue d'ensemble transverse des risques, incidents et audits.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function DashboardViewComponent_Template_button_click_12_listener() { return ctx.loadStats(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, DashboardViewComponent_div_15_Template, 4, 0, "div", 9);
        i0.ɵɵtemplate(16, DashboardViewComponent_div_16_Template, 59, 18, "div", 10);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-spin", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.stats);
    } }, directives: [i3.NgIf, i3.NgForOf, i3.NgClass], pipes: [i3.DatePipe], styles: [".reporting-dashboard[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8fafc;\n  min-height: 100vh;\n}\n\n.dashboard-content[_ngcontent-%COMP%] {\n  animation: fadeIn 0.5s ease-out;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease;\n  \n  &:hover {\n    transform: translateY(-5px);\n  }\n\n  .kpi-icon {\n    width: 60px;\n    height: 60px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 24px;\n    margin-right: 20px;\n  }\n\n  .kpi-info {\n    display: flex;\n    flex-direction: column;\n\n    .kpi-value {\n      font-size: 28px;\n      font-weight: 800;\n      color: #1e293b;\n      line-height: 1;\n    }\n\n    .kpi-label {\n      font-size: 14px;\n      color: #64748b;\n      margin-top: 4px;\n    }\n  }\n\n  &.kpi-risks .kpi-icon { background: #fee2e2; color: #ef4444; }\n  &.kpi-incidents .kpi-icon { background: #ffedd5; color: #f97316; }\n  &.kpi-audits .kpi-icon { background: #e0f2fe; color: #0ea5e9; }\n}\n\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n@media (max-width: 1024px) {\n  .dashboard-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n}\n\n.module-card.premium[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 24px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n\n  h3 {\n    font-size: 18px;\n    font-weight: 700;\n    color: #334155;\n    margin-bottom: 24px;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n\n    i { color: #3b82f6; }\n  }\n}\n\n\n.donut-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 40px;\n  justify-content: center;\n  padding: 20px 0;\n}\n\n.donut-chart[_ngcontent-%COMP%] {\n  --p_limited: 0;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  position: relative;\n  background: conic-gradient(\n    #ef4444 0 calc(var(--p_crit) * 1%),\n    #f97316 0 calc((var(--p_crit) + var(--p_high)) * 1%),\n    #eab308 0 calc((var(--p_crit) + var(--p_high) + var(--p_med)) * 1%),\n    #14b8a6 0 calc((var(--p_crit) + var(--p_high) + var(--p_med) + var(--p_limited)) * 1%),\n    #22c55e 0 calc((var(--p_crit) + var(--p_high) + var(--p_med) + var(--p_limited) + var(--p_low)) * 1%),\n    #e2e8f0 0 100%\n  );\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  .donut-inner {\n    width: 120px;\n    height: 120px;\n    background: white;\n    border-radius: 50%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);\n\n    .total { font-size: 32px; font-weight: 800; color: #1e293b; }\n    .sub { font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }\n  }\n}\n\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  .legend-item {\n    display: flex;\n    align-items: center;\n    font-size: 14px;\n    color: #475569;\n    font-weight: 500;\n\n    .dot {\n      width: 12px;\n      height: 12px;\n      border-radius: 4px;\n      margin-right: 10px;\n    }\n\n    &.critical .dot, &.critique .dot { background: #ef4444; }\n    &.high .dot, &.eleve .dot { background: #f97316; }\n    &.medium .dot, &.moyen .dot { background: #eab308; }\n    &.limited .dot, &.limite .dot { background: #14b8a6; }\n    &.low .dot, &.faible .dot { background: #22c55e; }\n  }\n}\n\n.bar-wrapper[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\n\n.bar-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n\n  .bar-label {\n    font-size: 14px;\n    color: #64748b;\n    margin-bottom: 8px;\n    font-weight: 600;\n  }\n\n  .bar-track {\n    height: 12px;\n    background: #f1f5f9;\n    border-radius: 6px;\n    overflow: hidden;\n  }\n\n  .bar-fill {\n    height: 100%;\n    border-radius: 6px;\n    position: relative;\n    transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\n    background: #3b82f6;\n\n    .bar-value {\n      position: absolute;\n      right: 8px;\n      top: -24px;\n      font-size: 12px;\n      font-weight: 700;\n      color: #334155;\n    }\n\n    &.nouveau { background: #3b82f6; }\n    &.en_cours, &.en-cours { background: #f59e0b; }\n    &.traite, &.treated { background: #10b981; }\n    &.clos, &.closed { background: #64748b; }\n  }\n}\n\n\n.item-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.list-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border-radius: 12px;\n  background: #f8fafc;\n  transition: background 0.2s;\n\n  &:hover { background: #f1f5f9; }\n\n  .item-icon {\n    width: 44px;\n    height: 44px;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 18px;\n    margin-right: 16px;\n\n    &.critical, &.critique { background: #fee2e2; color: #ef4444; }\n    &.high, &.eleve { background: #ffedd5; color: #f97316; }\n    &.medium, &.moyen { background: #fef9c3; color: #eab308; }\n    &.limited, &.limite { background: #ccfbf1; color: #0f766e; }\n    &.low, &.faible { background: #dcfce7; color: #22c55e; }\n    &.warning { background: #fef3c7; color: #d97706; }\n  }\n\n  .item-details {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n\n    .item-title { font-size: 15px; font-weight: 600; color: #1e293b; }\n    .item-meta { font-size: 12px; color: #64748b; }\n  }\n\n  .item-date { font-size: 13px; font-weight: 600; color: #94a3b8; }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 400px;\n  color: #64748b;\n\n  .spinner {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #f1f5f9;\n    border-top: 4px solid #3b82f6;\n    border-radius: 50%;\n    animation: spin 1s linear infinite;\n    margin-bottom: 16px;\n  }\n}\n\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardViewComponent, [{
        type: Component,
        args: [{
                selector: 'app-dashboard-view',
                templateUrl: './dashboard-view.component.html',
                styleUrls: ['./dashboard-view.component.scss'],
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=dashboard-view.component.js.map