import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReportingService } from '../../../core/services/reporting.service';
import { RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function DashboardViewComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵelement(1, "i", 15);
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
function DashboardViewComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 12);
    i0.ɵɵtemplate(1, DashboardViewComponent_nav_15_a_1_Template, 4, 5, "a", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function DashboardViewComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement des donnees...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DashboardViewComponent_div_17_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelementStart(1, "div", 67);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 68);
    i0.ɵɵelement(7, "div", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kpi_r12 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(kpi_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", kpi_r12.value, "", kpi_r12.unit, "");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r5.getKpiProgress(kpi_r12.id), "%");
} }
function DashboardViewComponent_div_17_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "span", 71);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const levelCode_r13 = ctx.$implicit;
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r6.getRiskLevelClass(levelCode_r13));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r6.getRiskLevelLabel(levelCode_r13), " (", ctx_r6.getRiskLevelCount(levelCode_r13), ") ");
} }
function DashboardViewComponent_div_17_div_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r14 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.getRiskStatusLabel(status_r14));
} }
function DashboardViewComponent_div_17_ng_container_83_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r17 = ctx.$implicit;
    const level_r15 = i0.ɵɵnextContext().$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r16.getMatrixTone(level_r15, status_r17));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r16.getMatrixCount(level_r15, status_r17), " ");
} }
function DashboardViewComponent_div_17_ng_container_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 73);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DashboardViewComponent_div_17_ng_container_83_div_3_Template, 2, 2, "div", 74);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const level_r15 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r8.getRiskLevelLabel(level_r15));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r8.riskStatusOrder);
} }
function DashboardViewComponent_div_17_div_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76);
    i0.ɵɵelementStart(1, "div", 77);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 78);
    i0.ɵɵelementStart(4, "div", 79);
    i0.ɵɵelementStart(5, "span", 80);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r19 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r9.getRiskStatusLabel(status_r19));
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r9.getPercent(status_r19.count, ctx_r9.stats.incidents.total), "%");
    i0.ɵɵproperty("ngClass", ctx_r9.getStatusClass(status_r19));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r19.count);
} }
function DashboardViewComponent_div_17_div_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "div", 82);
    i0.ɵɵelement(2, "i", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 84);
    i0.ɵɵelementStart(4, "span", 85);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 86);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 87);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r10.getRiskLevelClass(risk_r20.niveauRisqueCode || risk_r20.niveauRisque));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(risk_r20.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", risk_r20.domaine || "General", " \u2022 ", ctx_r10.getRiskStatusLabel(risk_r20.statutLabel || risk_r20.statutCode || risk_r20.statut), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 5, risk_r20.createdAt, "dd/MM"));
} }
function DashboardViewComponent_div_17_div_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "div", 88);
    i0.ɵɵelement(2, "i", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 84);
    i0.ɵɵelementStart(4, "span", 85);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 86);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 87);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r21 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(incident_r21.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r11.getRiskStatusLabel(incident_r21.statutLabel || incident_r21.statutCode || incident_r21.statut));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 3, incident_r21.createdAt, "dd/MM"));
} }
function DashboardViewComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "div", 20);
    i0.ɵɵelementStart(3, "div", 21);
    i0.ɵɵelement(4, "i", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 23);
    i0.ɵɵelementStart(6, "span", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 25);
    i0.ɵɵtext(9, "Risques identifies");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 26);
    i0.ɵɵelementStart(11, "div", 21);
    i0.ɵɵelement(12, "i", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 23);
    i0.ɵɵelementStart(14, "span", 24);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 25);
    i0.ɵɵtext(17, "Incidents declares");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 28);
    i0.ɵɵelementStart(19, "div", 21);
    i0.ɵɵelement(20, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 23);
    i0.ɵɵelementStart(22, "span", 24);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 25);
    i0.ɵɵtext(25, "Missions d audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 30);
    i0.ɵɵelementStart(27, "div", 31);
    i0.ɵɵelementStart(28, "h3");
    i0.ɵɵelement(29, "i", 32);
    i0.ɵɵtext(30, " KPI de pilotage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 33);
    i0.ɵɵtemplate(32, DashboardViewComponent_div_17_div_32_Template, 8, 5, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 35);
    i0.ɵɵelementStart(34, "h3");
    i0.ɵɵelement(35, "i", 36);
    i0.ɵɵtext(36, " Posture de risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 37);
    i0.ɵɵelementStart(38, "div", 38);
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "strong");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 38);
    i0.ɵɵelementStart(44, "span");
    i0.ɵɵtext(45, "En cours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "strong");
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 38);
    i0.ɵɵelementStart(49, "span");
    i0.ɵɵtext(50, "Traites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "strong");
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 38);
    i0.ɵɵelementStart(54, "span");
    i0.ɵɵtext(55, "Clotures");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "strong");
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 39);
    i0.ɵɵelementStart(59, "div", 40);
    i0.ɵɵelementStart(60, "h3");
    i0.ɵɵelement(61, "i", 41);
    i0.ɵɵtext(62, " Severite des risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "div", 42);
    i0.ɵɵelementStart(64, "div", 43);
    i0.ɵɵelementStart(65, "div", 44);
    i0.ɵɵelementStart(66, "span", 45);
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span", 46);
    i0.ɵɵtext(69, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 47);
    i0.ɵɵtemplate(71, DashboardViewComponent_div_17_div_71_Template, 3, 3, "div", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 49);
    i0.ɵɵelementStart(73, "div", 50);
    i0.ɵɵelementStart(74, "h3");
    i0.ɵɵelement(75, "i", 51);
    i0.ɵɵtext(76, " Apercu matrice de risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "button", 52);
    i0.ɵɵlistener("click", function DashboardViewComponent_div_17_Template_button_click_77_listener() { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.openRiskMatrix(); });
    i0.ɵɵtext(78, "Ouvrir la matrice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "div", 53);
    i0.ɵɵelementStart(80, "div", 54);
    i0.ɵɵtext(81, "Niveau / Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(82, DashboardViewComponent_div_17_div_82_Template, 2, 1, "div", 55);
    i0.ɵɵtemplate(83, DashboardViewComponent_div_17_ng_container_83_Template, 4, 2, "ng-container", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 40);
    i0.ɵɵelementStart(85, "h3");
    i0.ɵɵelement(86, "i", 57);
    i0.ɵɵtext(87, " Statut des incidents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 58);
    i0.ɵɵelementStart(89, "div", 59);
    i0.ɵɵtemplate(90, DashboardViewComponent_div_17_div_90_Template, 7, 5, "div", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "div", 61);
    i0.ɵɵelementStart(92, "h3");
    i0.ɵɵelement(93, "i", 62);
    i0.ɵɵtext(94, " Risques recents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "div", 63);
    i0.ɵɵtemplate(96, DashboardViewComponent_div_17_div_96_Template, 11, 8, "div", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(97, "div", 61);
    i0.ɵɵelementStart(98, "h3");
    i0.ɵɵelement(99, "i", 65);
    i0.ɵɵtext(100, " Incidents recents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "div", 63);
    i0.ɵɵtemplate(102, DashboardViewComponent_div_17_div_102_Template, 11, 6, "div", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.stats.risks.total);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.stats.incidents.total);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.stats.audits.total);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r2.kpis);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r2.getStatusCount(ctx_r2.riskStatusOrder[0]));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.getStatusCount(ctx_r2.riskStatusOrder[1]));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.getStatusCount(ctx_r2.riskStatusOrder[2]));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.getStatusCount(ctx_r2.riskStatusOrder[3]));
    i0.ɵɵadvance(7);
    i0.ɵɵstyleProp("--p_low", ctx_r2.getPercent(ctx_r2.getRiskLevelCount(ctx_r2.riskLevelOrder[0]), ctx_r2.stats.risks.total))("--p_limited", ctx_r2.getPercent(ctx_r2.getRiskLevelCount(ctx_r2.riskLevelOrder[1]), ctx_r2.stats.risks.total))("--p_med", ctx_r2.getPercent(ctx_r2.getRiskLevelCount(ctx_r2.riskLevelOrder[2]), ctx_r2.stats.risks.total))("--p_high", ctx_r2.getPercent(ctx_r2.getRiskLevelCount(ctx_r2.riskLevelOrder[3]), ctx_r2.stats.risks.total))("--p_crit", ctx_r2.getPercent(ctx_r2.getRiskLevelCount(ctx_r2.riskLevelOrder[4]), ctx_r2.stats.risks.total));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.stats.risks.total);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.riskLevelOrder);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngForOf", ctx_r2.riskStatusOrder);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.riskLevelOrder);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r2.stats.incidents.byStatus);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.stats.risks.recent);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.stats.incidents.recent);
} }
export class DashboardViewComponent {
    constructor(reportingService, router) {
        this.reportingService = reportingService;
        this.router = router;
        this.stats = null;
        this.kpis = [];
        this.isLoading = true;
        this.navItems = REPORTING_NAV_ITEMS;
        this.riskLevelOrder = [
            RiskLevel.LOW,
            RiskLevel.LIMITED,
            RiskLevel.MEDIUM,
            RiskLevel.HIGH,
            RiskLevel.CRITICAL,
        ];
        this.riskStatusOrder = [
            RiskStatus.OPEN,
            RiskStatus.IN_PROGRESS,
            RiskStatus.TREATED,
            RiskStatus.CLOSED,
        ];
        this.riskLevelLabels = {
            [RiskLevel.LOW]: 'Faible',
            [RiskLevel.LIMITED]: 'Limite',
            [RiskLevel.MEDIUM]: 'Moyen',
            [RiskLevel.HIGH]: 'Eleve',
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
            [RiskStatus.TREATED]: 'Traite',
            [RiskStatus.CLOSED]: 'Cloture',
        };
    }
    ngOnInit() {
        this.loadStats();
    }
    loadStats() {
        this.isLoading = true;
        forkJoin({
            stats: this.reportingService.getStats(),
            kpis: this.reportingService.getKpis(),
        }).subscribe(({ stats, kpis }) => {
            this.stats = stats;
            this.kpis = kpis;
            this.isLoading = false;
        }, (error) => {
            console.error('Error loading reporting dashboard data', error);
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
    getStatusCount(status) {
        var _a, _b;
        const entry = (_b = (_a = this.stats) === null || _a === void 0 ? void 0 : _a.risks.byStatus) === null || _b === void 0 ? void 0 : _b.find((item) => this.normalize(item === null || item === void 0 ? void 0 : item.code) === status);
        return Number((entry === null || entry === void 0 ? void 0 : entry.count) || 0);
    }
    getRiskLevelLabel(level) {
        if (level === null || level === void 0 ? void 0 : level.label) {
            return level.label;
        }
        const code = this.resolveRiskLevel((level === null || level === void 0 ? void 0 : level.code) || (level === null || level === void 0 ? void 0 : level.niveauRisque) || level);
        return code ? this.riskLevelLabels[code] : 'Non defini';
    }
    getRiskLevelClass(level) {
        return this.resolveRiskLevel((level === null || level === void 0 ? void 0 : level.code) || (level === null || level === void 0 ? void 0 : level.niveauRisque) || level) || 'default';
    }
    getRiskStatusLabel(status) {
        if (status === null || status === void 0 ? void 0 : status.label) {
            return status.label;
        }
        const normalized = this.normalize((status === null || status === void 0 ? void 0 : status.code) || (status === null || status === void 0 ? void 0 : status.statut) || status);
        return this.riskStatusLabels[normalized] || (status === null || status === void 0 ? void 0 : status.statut) || (status === null || status === void 0 ? void 0 : status.code) || status || 'Non defini';
    }
    getStatusClass(status) {
        return this.normalize((status === null || status === void 0 ? void 0 : status.code) || (status === null || status === void 0 ? void 0 : status.statut) || status) || 'default';
    }
    getKpiValue(id) {
        var _a;
        return Number(((_a = this.kpis.find((kpi) => kpi.id === id)) === null || _a === void 0 ? void 0 : _a.value) || 0);
    }
    getKpiUnit(id) {
        var _a;
        return ((_a = this.kpis.find((kpi) => kpi.id === id)) === null || _a === void 0 ? void 0 : _a.unit) || '';
    }
    getKpiProgress(id) {
        const value = this.getKpiValue(id);
        return this.getKpiUnit(id) === '%' ? Math.max(0, Math.min(100, value)) : 100;
    }
    getMatrixCount(level, status) {
        var _a, _b;
        const entry = (_b = (_a = this.stats) === null || _a === void 0 ? void 0 : _a.risks.matrix) === null || _b === void 0 ? void 0 : _b.find((cell) => this.resolveRiskLevel(cell.levelCode || cell.levelLabel) === level &&
            this.normalize(cell.statusCode || cell.statusLabel) === status);
        return Number((entry === null || entry === void 0 ? void 0 : entry.count) || 0);
    }
    getMatrixTone(level, status) {
        if (level === RiskLevel.CRITICAL && (status === RiskStatus.OPEN || status === RiskStatus.IN_PROGRESS)) {
            return 'tone-critical';
        }
        if (level === RiskLevel.HIGH && (status === RiskStatus.OPEN || status === RiskStatus.IN_PROGRESS)) {
            return 'tone-high';
        }
        if (status === RiskStatus.TREATED || status === RiskStatus.CLOSED) {
            return 'tone-managed';
        }
        return 'tone-neutral';
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    openRiskMatrix() {
        this.router.navigate(['/dashboard/reporting/risk-matrix']);
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
DashboardViewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardViewComponent, selectors: [["app-dashboard-view"]], decls: 18, vars: 6, consts: [[1, "role-dashboard", "reporting-dashboard", "dashboard-view-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-right"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", "fa-sync-alt"], ["class", "reporting-tabs", 4, "ngIf"], ["class", "loading-overlay", 4, "ngIf"], ["class", "dashboard-content", 4, "ngIf"], [1, "reporting-tabs"], ["routerLinkActive", "active", "class", "reporting-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "reporting-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "fas", 3, "ngClass"], [1, "loading-overlay"], [1, "spinner"], [1, "dashboard-content"], [1, "kpi-row"], [1, "kpi-card", "kpi-risks"], [1, "kpi-icon"], [1, "fas", "fa-exclamation-triangle"], [1, "kpi-info"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-incidents"], [1, "fas", "fa-fire"], [1, "kpi-card", "kpi-audits"], [1, "fas", "fa-clipboard-check"], [1, "insight-grid"], [1, "module-card", "premium", "kpi-detail-card"], [1, "fas", "fa-gauge-high"], [1, "kpi-detail-list"], ["class", "kpi-detail-item", 4, "ngFor", "ngForOf"], [1, "module-card", "premium", "posture-card"], [1, "fas", "fa-shield-halved"], [1, "posture-list"], [1, "posture-item"], [1, "dashboard-grid"], [1, "module-card", "premium", "chart-card"], [1, "fas", "fa-signal"], [1, "chart-container", "donut-wrapper"], [1, "donut-chart"], [1, "donut-inner"], [1, "total"], [1, "sub"], [1, "chart-legend"], ["class", "legend-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "module-card", "premium", "matrix-preview-card"], [1, "matrix-card-header"], [1, "fas", "fa-table-cells-large"], [1, "btn-inline", 3, "click"], [1, "matrix-preview-grid"], [1, "matrix-preview-corner"], ["class", "matrix-preview-header", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [1, "fas", "fa-tasks"], [1, "chart-container", "bar-wrapper"], [1, "bar-chart"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "module-card", "premium", "list-card"], [1, "fas", "fa-history"], [1, "item-list"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "fas", "fa-bolt"], [1, "kpi-detail-item"], [1, "kpi-detail-top"], [1, "kpi-progress-bar"], [1, "fill"], [1, "legend-item", 3, "ngClass"], [1, "dot"], [1, "matrix-preview-header"], [1, "matrix-preview-header", "row-title"], ["class", "matrix-preview-cell", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "matrix-preview-cell", 3, "ngClass"], [1, "bar-group"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill", 3, "ngClass"], [1, "bar-value"], [1, "list-item"], [1, "item-icon", 3, "ngClass"], [1, "fas", "fa-shield-alt"], [1, "item-details"], [1, "item-title"], [1, "item-meta"], [1, "item-date"], [1, "item-icon", "warning"], [1, "fas", "fa-exclamation-circle"]], template: function DashboardViewComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(8, " Tableaux de bord consolides");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vue transverse plus detaillee des risques, incidents, audits et indicateurs de performance.");
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
        i0.ɵɵtemplate(15, DashboardViewComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, DashboardViewComponent_div_16_Template, 4, 0, "div", 10);
        i0.ɵɵtemplate(17, DashboardViewComponent_div_17_Template, 103, 25, "div", 11);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-spin", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.stats);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i3.NgClass], pipes: [i3.DatePipe], styles: ["@import '../reporting-shared';\n\n.reporting-dashboard[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8fafc;\n  min-height: 100vh;\n}\n\n.dashboard-content[_ngcontent-%COMP%] {\n  animation: fadeIn 0.5s ease-out;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.kpi-row[_ngcontent-%COMP%], .insight-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease;\n\n  &:hover {\n    transform: translateY(-5px);\n  }\n\n  .kpi-icon {\n    width: 60px;\n    height: 60px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 24px;\n    margin-right: 20px;\n  }\n\n  .kpi-info {\n    display: flex;\n    flex-direction: column;\n\n    .kpi-value {\n      font-size: 28px;\n      font-weight: 800;\n      color: #1e293b;\n      line-height: 1;\n    }\n\n    .kpi-label {\n      font-size: 14px;\n      color: #64748b;\n      margin-top: 4px;\n    }\n  }\n\n  &.kpi-risks .kpi-icon { background: #fee2e2; color: #ef4444; }\n  &.kpi-incidents .kpi-icon { background: #ffedd5; color: #f97316; }\n  &.kpi-audits .kpi-icon { background: #e0f2fe; color: #0ea5e9; }\n}\n\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n@media (max-width: 1024px) {\n  .dashboard-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n}\n\n.module-card.premium[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 24px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n\n  h3 {\n    font-size: 18px;\n    font-weight: 700;\n    color: #334155;\n    margin-bottom: 24px;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n\n    i { color: #3b82f6; }\n  }\n}\n\n.kpi-detail-list[_ngcontent-%COMP%], .posture-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.kpi-detail-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}\n\n.kpi-detail-top[_ngcontent-%COMP%], .posture-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.kpi-detail-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .posture-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #475569;\n  font-weight: 600;\n}\n\n.kpi-detail-top[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .posture-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-size: 1.1rem;\n}\n\n.kpi-progress-bar[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  height: 8px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  overflow: hidden;\n\n  .fill {\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(90deg, #0f4c81, #38bdf8);\n  }\n}\n\n.posture-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: linear-gradient(180deg, #f8fafc, #ffffff);\n  border: 1px solid #e2e8f0;\n}\n\n.matrix-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.btn-inline[_ngcontent-%COMP%] {\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f4c81;\n  border-radius: 10px;\n  padding: 9px 12px;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.matrix-preview-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 150px repeat(4, minmax(80px, 1fr));\n  gap: 8px;\n}\n\n.matrix-preview-corner[_ngcontent-%COMP%], .matrix-preview-header[_ngcontent-%COMP%], .matrix-preview-cell[_ngcontent-%COMP%] {\n  min-height: 58px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 10px;\n  font-weight: 700;\n  border: 1px solid #e2e8f0;\n}\n\n.matrix-preview-corner[_ngcontent-%COMP%], .matrix-preview-header[_ngcontent-%COMP%] {\n  background: #eef4f9;\n  color: #334155;\n}\n\n.row-title[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  text-align: left;\n}\n\n.matrix-preview-cell[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #0f172a;\n}\n\n.tone-critical[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #fee2e2, #fecaca);\n  color: #991b1b;\n}\n\n.tone-high[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #ffedd5, #fed7aa);\n  color: #9a3412;\n}\n\n.tone-managed[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #dcfce7, #bbf7d0);\n  color: #166534;\n}\n\n.tone-neutral[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #fef9c3, #fde68a);\n  color: #854d0e;\n}\n\n.donut-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 40px;\n  justify-content: center;\n  padding: 20px 0;\n}\n\n.donut-chart[_ngcontent-%COMP%] {\n  --p_limited: 0;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  position: relative;\n  background: conic-gradient(\n    #ef4444 0 calc(var(--p_crit) * 1%),\n    #f97316 0 calc((var(--p_crit) + var(--p_high)) * 1%),\n    #eab308 0 calc((var(--p_crit) + var(--p_high) + var(--p_med)) * 1%),\n    #14b8a6 0 calc((var(--p_crit) + var(--p_high) + var(--p_med) + var(--p_limited)) * 1%),\n    #22c55e 0 calc((var(--p_crit) + var(--p_high) + var(--p_med) + var(--p_limited) + var(--p_low)) * 1%),\n    #e2e8f0 0 100%\n  );\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  .donut-inner {\n    width: 120px;\n    height: 120px;\n    background: white;\n    border-radius: 50%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);\n\n    .total { font-size: 32px; font-weight: 800; color: #1e293b; }\n    .sub { font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }\n  }\n}\n\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  .legend-item {\n    display: flex;\n    align-items: center;\n    font-size: 14px;\n    color: #475569;\n    font-weight: 500;\n\n    .dot {\n      width: 12px;\n      height: 12px;\n      border-radius: 4px;\n      margin-right: 10px;\n    }\n\n    &.critical .dot, &.critique .dot { background: #ef4444; }\n    &.high .dot, &.eleve .dot { background: #f97316; }\n    &.medium .dot, &.moyen .dot { background: #eab308; }\n    &.limited .dot, &.limite .dot { background: #14b8a6; }\n    &.low .dot, &.faible .dot { background: #22c55e; }\n  }\n}\n\n.bar-wrapper[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\n\n.bar-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n\n  .bar-label {\n    font-size: 14px;\n    color: #64748b;\n    margin-bottom: 8px;\n    font-weight: 600;\n  }\n\n  .bar-track {\n    height: 12px;\n    background: #f1f5f9;\n    border-radius: 6px;\n    overflow: hidden;\n  }\n\n  .bar-fill {\n    height: 100%;\n    border-radius: 6px;\n    position: relative;\n    transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\n    background: #3b82f6;\n\n    .bar-value {\n      position: absolute;\n      right: 8px;\n      top: -24px;\n      font-size: 12px;\n      font-weight: 700;\n      color: #334155;\n    }\n\n    &.nouveau { background: #3b82f6; }\n    &.en_cours, &.en-cours { background: #f59e0b; }\n    &.traite, &.treated { background: #10b981; }\n    &.clos, &.closed { background: #64748b; }\n  }\n}\n\n.item-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.list-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border-radius: 12px;\n  background: #f8fafc;\n  transition: background 0.2s;\n\n  &:hover { background: #f1f5f9; }\n\n  .item-icon {\n    width: 44px;\n    height: 44px;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 18px;\n    margin-right: 16px;\n\n    &.critical, &.critique { background: #fee2e2; color: #ef4444; }\n    &.high, &.eleve { background: #ffedd5; color: #f97316; }\n    &.medium, &.moyen { background: #fef9c3; color: #eab308; }\n    &.limited, &.limite { background: #ccfbf1; color: #0f766e; }\n    &.low, &.faible { background: #dcfce7; color: #22c55e; }\n    &.warning { background: #fef3c7; color: #d97706; }\n  }\n\n  .item-details {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n\n    .item-title { font-size: 15px; font-weight: 600; color: #1e293b; }\n    .item-meta { font-size: 12px; color: #64748b; }\n  }\n\n  .item-date { font-size: 13px; font-weight: 600; color: #94a3b8; }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 400px;\n  color: #64748b;\n\n  .spinner {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #f1f5f9;\n    border-top: 4px solid #3b82f6;\n    border-radius: 50%;\n    animation: spin 1s linear infinite;\n    margin-bottom: 16px;\n  }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n@media (max-width: 768px) {\n  .reporting-dashboard[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n\n  .matrix-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .matrix-preview-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 120px repeat(4, minmax(72px, 1fr));\n    overflow-x: auto;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardViewComponent, [{
        type: Component,
        args: [{
                selector: 'app-dashboard-view',
                templateUrl: './dashboard-view.component.html',
                styleUrls: ['./dashboard-view.component.scss'],
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=dashboard-view.component.js.map