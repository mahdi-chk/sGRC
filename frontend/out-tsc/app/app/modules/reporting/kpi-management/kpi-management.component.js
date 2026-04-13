import { Component } from '@angular/core';
import { ReportingService } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function KpiManagementComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
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
function KpiManagementComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 12);
    i0.ɵɵtemplate(1, KpiManagementComponent_nav_15_a_1_Template, 4, 5, "a", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function KpiManagementComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementEnd();
} }
function KpiManagementComponent_div_17_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelementStart(1, "div", 21);
    i0.ɵɵelementStart(2, "span", 22);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 23);
    i0.ɵɵelement(5, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 25);
    i0.ɵɵelementStart(7, "span", 26);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 27);
    i0.ɵɵelement(10, "div", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 29);
    i0.ɵɵelementStart(12, "span", 30);
    i0.ɵɵtext(13, "Mise \u00E0 jour: Aujourd'hui");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kpi_r6 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(kpi_r6.label);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", kpi_r6.value, "", kpi_r6.unit, "");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", kpi_r6.unit === "%" ? kpi_r6.value : 100, "%");
} }
function KpiManagementComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, KpiManagementComponent_div_17_div_1_Template, 14, 5, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.kpis);
} }
export class KpiManagementComponent {
    constructor(reportingService, router) {
        this.reportingService = reportingService;
        this.router = router;
        this.kpis = [];
        this.isLoading = true;
        this.navItems = REPORTING_NAV_ITEMS;
    }
    ngOnInit() {
        this.loadKpis();
    }
    loadKpis() {
        this.isLoading = true;
        this.reportingService.getKpis().subscribe(data => {
            this.kpis = data;
            this.isLoading = false;
        }, error => {
            console.error('Error loading KPIs', error);
            this.isLoading = false;
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
KpiManagementComponent.ɵfac = function KpiManagementComponent_Factory(t) { return new (t || KpiManagementComponent)(i0.ɵɵdirectiveInject(i1.ReportingService), i0.ɵɵdirectiveInject(i2.Router)); };
KpiManagementComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KpiManagementComponent, selectors: [["app-kpi-management"]], decls: 18, vars: 6, consts: [[1, "role-dashboard", "reporting-dashboard", "kpi-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tachometer-alt"], [1, "header-right"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", "fa-sync-alt"], ["class", "reporting-tabs", 4, "ngIf"], ["class", "loading-overlay", 4, "ngIf"], ["class", "kpi-grid", 4, "ngIf"], [1, "reporting-tabs"], ["routerLinkActive", "active", "class", "reporting-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "reporting-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "fas", 3, "ngClass"], [1, "loading-overlay"], [1, "spinner"], [1, "kpi-grid"], ["class", "kpi-detail-card premium", 4, "ngFor", "ngForOf"], [1, "kpi-detail-card", "premium"], [1, "kpi-header"], [1, "kpi-label"], [1, "kpi-trend", "positive"], [1, "fas", "fa-caret-up"], [1, "kpi-body"], [1, "kpi-value-large"], [1, "kpi-progress-bar"], [1, "fill"], [1, "kpi-footer"], [1, "kpi-meta"]], template: function KpiManagementComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Indicateurs de Performance (KPI)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Suivi en temps r\u00E9el des objectifs de conformit\u00E9 et de gestion des risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_12_listener() { return ctx.loadKpis(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, KpiManagementComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, KpiManagementComponent_div_16_Template, 2, 0, "div", 10);
        i0.ɵɵtemplate(17, KpiManagementComponent_div_17_Template, 2, 1, "div", 11);
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
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i3.NgClass], styles: ["@import '../reporting-shared';\n\n.kpi-page[_ngcontent-%COMP%] {\n  .kpi-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 24px;\n    animation: fadeIn 0.5s ease-out;\n  }\n\n  .kpi-detail-card {\n    background: white;\n    border-radius: 20px;\n    padding: 24px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    min-height: 200px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    transition: all 0.3s ease;\n\n    &:hover {\n      transform: translateY(-5px);\n      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);\n      border-color: #3b82f6;\n    }\n\n    .kpi-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      margin-bottom: 20px;\n\n      .kpi-label {\n        font-size: 14px;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n        max-width: 80%;\n      }\n\n      .kpi-trend {\n        width: 32px;\n        height: 32px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 14px;\n\n        &.positive { background: #dcfce7; color: #22c55e; }\n        &.negative { background: #fee2e2; color: #ef4444; }\n      }\n    }\n\n    .kpi-body {\n      .kpi-value-large {\n        font-size: 42px;\n        font-weight: 800;\n        color: #1e293b;\n        display: block;\n        margin-bottom: 12px;\n      }\n\n      .kpi-progress-bar {\n        height: 8px;\n        background: #f1f5f9;\n        border-radius: 4px;\n        overflow: hidden;\n\n        .fill {\n          height: 100%;\n          background: linear-gradient(90deg, #3b82f6, #2dd4bf);\n          border-radius: 4px;\n        }\n      }\n    }\n\n    .kpi-footer {\n      margin-top: 20px;\n      padding-top: 15px;\n      border-top: 1px dashed #e2e8f0;\n      \n      .kpi-meta {\n        font-size: 12px;\n        color: #94a3b8;\n        font-weight: 500;\n      }\n    }\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KpiManagementComponent, [{
        type: Component,
        args: [{
                selector: 'app-kpi-management',
                templateUrl: './kpi-management.component.html',
                styleUrls: ['./kpi-management.component.scss']
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=kpi-management.component.js.map