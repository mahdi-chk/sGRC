import { Component } from '@angular/core';
import { ReportingService } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/reporting.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function MultiEntityVisionComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
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
function MultiEntityVisionComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 12);
    i0.ɵɵtemplate(1, MultiEntityVisionComponent_nav_15_a_1_Template, 4, 5, "a", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function MultiEntityVisionComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementEnd();
} }
function MultiEntityVisionComponent_div_17_tr_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵelementStart(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelementStart(10, "div", 26);
    i0.ɵɵelement(11, "div", 27);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵelementStart(16, "div", 28);
    i0.ɵɵelement(17, "i", 29);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entity_r6.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entity_r6.riskCount);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("zero", entity_r6.criticalRiskCount === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(entity_r6.criticalRiskCount);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", entity_r6.treatmentRate, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(14, 10, entity_r6.treatmentRate, "1.0-0"), "%");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", entity_r6.treatmentRate > 70 ? "high" : entity_r6.treatmentRate > 40 ? "medium" : "low");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(19, 13, entity_r6.treatmentRate / 20, "1.1-1"), "/5 ");
} }
function MultiEntityVisionComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵelement(3, "i", 20);
    i0.ɵɵtext(4, " Comparatif des D\u00E9partements");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "table", 21);
    i0.ɵɵelementStart(6, "thead");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "D\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Nombre de Risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Risques Critiques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Taux de Traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Score Global");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "tbody");
    i0.ɵɵtemplate(19, MultiEntityVisionComponent_div_17_tr_19_Template, 20, 16, "tr", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngForOf", ctx_r2.entities);
} }
export class MultiEntityVisionComponent {
    constructor(reportingService, router) {
        this.reportingService = reportingService;
        this.router = router;
        this.entities = [];
        this.isLoading = true;
        this.navItems = REPORTING_NAV_ITEMS;
    }
    ngOnInit() {
        this.loadEntities();
    }
    loadEntities() {
        this.isLoading = true;
        this.reportingService.getMultiEntityData().subscribe(data => {
            this.entities = data;
            this.isLoading = false;
        }, error => {
            console.error('Error loading multi-entity data', error);
            this.isLoading = false;
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
MultiEntityVisionComponent.ɵfac = function MultiEntityVisionComponent_Factory(t) { return new (t || MultiEntityVisionComponent)(i0.ɵɵdirectiveInject(i1.ReportingService), i0.ɵɵdirectiveInject(i2.Router)); };
MultiEntityVisionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MultiEntityVisionComponent, selectors: [["app-multi-entity-vision"]], decls: 18, vars: 6, consts: [[1, "role-dashboard", "reporting-dashboard", "multi-entity-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-project-diagram"], [1, "header-right"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", "fa-sync-alt"], ["class", "reporting-tabs", 4, "ngIf"], ["class", "loading-overlay", 4, "ngIf"], ["class", "entity-grid", 4, "ngIf"], [1, "reporting-tabs"], ["routerLinkActive", "active", "class", "reporting-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "reporting-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "fas", 3, "ngClass"], [1, "loading-overlay"], [1, "spinner"], [1, "entity-grid"], [1, "module-card", "premium", "table-card"], [1, "fas", "fa-table"], [1, "premium-table"], [4, "ngFor", "ngForOf"], [1, "entity-name"], [1, "badge", "count"], [1, "badge", "critical"], [1, "mini-progress"], [1, "bar"], [1, "score-indicator", 3, "ngClass"], [1, "fas", "fa-star"]], template: function MultiEntityVisionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function MultiEntityVisionComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Vision Multi-Entit\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Analyse comparative de la performance et des risques par d\u00E9partement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function MultiEntityVisionComponent_Template_button_click_12_listener() { return ctx.loadEntities(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, MultiEntityVisionComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, MultiEntityVisionComponent_div_16_Template, 2, 0, "div", 10);
        i0.ɵɵtemplate(17, MultiEntityVisionComponent_div_17_Template, 20, 1, "div", 11);
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
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i3.NgClass], pipes: [i3.DecimalPipe], styles: ["@import '../reporting-shared';\n\n.multi-entity-page[_ngcontent-%COMP%] {\n  .entity-grid {\n    animation: fadeIn 0.5s ease-out;\n  }\n\n  .table-card {\n    padding: 24px;\n    background: white;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n  }\n\n  .premium-table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 10px;\n\n    th {\n      text-align: left;\n      padding: 16px;\n      font-size: 13px;\n      font-weight: 700;\n      color: #64748b;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      border-bottom: 2px solid #f1f5f9;\n    }\n\n    td {\n      padding: 16px;\n      font-size: 15px;\n      color: #334155;\n      border-bottom: 1px solid #f1f5f9;\n    }\n\n    tr:hover td {\n      background: #f8fafc;\n    }\n\n    .entity-name {\n      font-weight: 700;\n      color: #1e293b;\n    }\n\n    .badge {\n      padding: 4px 12px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 700;\n      \n      &.count { background: #e0f2fe; color: #0369a1; }\n      &.critical { \n        background: #fee2e2; color: #b91c1c; \n        &.zero { background: #f1f5f9; color: #94a3b8; }\n      }\n    }\n\n    .mini-progress {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n\n      .bar {\n        flex: 1;\n        height: 8px;\n        background: #f1f5f9;\n        border-radius: 4px;\n        position: relative;\n        overflow: hidden;\n\n        &::after {\n          content: '';\n          position: absolute;\n          left: 0;\n          top: 0;\n          height: 100%;\n          width: inherit;\n          background: #3b82f6;\n        }\n      }\n\n      span { font-size: 13px; font-weight: 600; color: #64748b; min-width: 40px; }\n    }\n\n    .score-indicator {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-weight: 700;\n      font-size: 14px;\n\n      &.high { color: #059669; }\n      &.medium { color: #d97706; }\n      &.low { color: #dc2626; }\n    }\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MultiEntityVisionComponent, [{
        type: Component,
        args: [{
                selector: 'app-multi-entity-vision',
                templateUrl: './multi-entity-vision.component.html',
                styleUrls: ['./multi-entity-vision.component.scss']
            }]
    }], function () { return [{ type: i1.ReportingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=multi-entity-vision.component.js.map