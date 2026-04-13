import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceModuleItems, getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceService } from './compliance.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./compliance.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function ComplianceComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r4.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function ComplianceComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelementStart(1, "div", 34);
    i0.ɵɵelementStart(2, "span", 35);
    i0.ɵɵtext(3, "Referentiels");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 34);
    i0.ɵɵelementStart(9, "span", 35);
    i0.ɵɵtext(10, "Couverture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 34);
    i0.ɵɵelementStart(16, "span", 35);
    i0.ɵɵtext(17, "Campagnes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Campagnes d auto-evaluation en cours d execution.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 34);
    i0.ɵɵelementStart(23, "span", 35);
    i0.ɵɵtext(24, "Ecarts ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r5 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r5.summary.frameworks);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r5.summary.activeRequirements, " exigences actives suivies dans le perimetre visible.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r5.summary.averageCoverage, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r5.summary.uncoveredRequirements, " exigences restent sans couverture suffisante.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r5.summary.campaignsInProgress);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.openGaps);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r5.summary.criticalGaps, " ecarts prioritaires demandent une action rapide.");
} }
function ComplianceComponent_a_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 36);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const module_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", module_r6.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r6.description);
} }
function ComplianceComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelementStart(1, "div", 12);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Lecture rapide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Le module s appuie deja sur les risques, audits, incidents et preuves existants pour construire une premiere vision de conformite.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 37);
    i0.ɵɵelementStart(7, "article", 38);
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9, "Mapping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "article", 38);
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14, "Preuves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "article", 38);
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19, "Veille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r7 = ctx.ngIf;
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("", data_r7.summary.mappedRequirements, " exigences ont deja au moins un dispositif de couverture rattache.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r7.summary.evidenceCount, " evidences recentes peuvent etre mobilisees pour la preparation d audit.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r7.summary.pendingUpdates, " sujets de veille ou points d attention sont en observation.");
} }
export class ComplianceComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.currentRole = getStoredComplianceRole();
        this.navItems = getComplianceNavItems(this.currentRole);
        this.modules = getComplianceModuleItems(this.currentRole).filter(item => item.route !== '/dashboard/compliance');
        this.overview = null;
        this.isLoading = false;
        this.filters = {
            status: '',
            entityKey: ''
        };
    }
    ngOnInit() {
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.complianceService.getOverview(this.filters).subscribe({
            next: overview => {
                this.overview = overview;
                this.isLoading = false;
            },
            error: () => {
                this.overview = null;
                this.isLoading = false;
            }
        });
    }
    resetFilters() {
        this.filters = {
            status: '',
            entityKey: ''
        };
        this.loadOverview();
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
ComplianceComponent.ɵfac = function ComplianceComponent_Factory(t) { return new (t || ComplianceComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceComponent, selectors: [["app-compliance"]], decls: 60, vars: 10, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-balance-scale"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "content-card"], [1, "card-head"], [1, "filter-row"], [1, "filter-field"], ["for", "compliance-status"], ["id", "compliance-status", 3, "ngModel", "ngModelChange"], ["value", ""], ["value", "active"], ["value", "draft"], ["value", "review_required"], ["value", "in_progress"], ["value", "open"], ["for", "compliance-entity"], ["id", "compliance-entity", "type", "text", "placeholder", "ex: filiale-maroc", 3, "ngModel", "ngModelChange"], [1, "filter-actions"], [1, "back-btn", 3, "disabled", "click"], ["class", "summary-grid", 4, "ngIf"], [1, "section-grid"], [1, "module-list"], ["class", "module-link", 3, "routerLink", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "module-link", 3, "routerLink"], [1, "item-list"], [1, "list-item"]], template: function ComplianceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Conformite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Cockpit du module pour piloter couverture des exigences, campagnes, ecarts et preuves de conformite.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "h2");
        i0.ɵɵtext(20, "Filtres dynamiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "p");
        i0.ɵɵtext(22, "Le cockpit interroge maintenant les donnees reelles du backend avec filtrage de statut et de perimetre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "div", 13);
        i0.ɵɵelementStart(24, "div", 14);
        i0.ɵɵelementStart(25, "label", 15);
        i0.ɵɵtext(26, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "select", 16);
        i0.ɵɵlistener("ngModelChange", function ComplianceComponent_Template_select_ngModelChange_27_listener($event) { return ctx.filters.status = $event; });
        i0.ɵɵelementStart(28, "option", 17);
        i0.ɵɵtext(29, "Tous");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "option", 18);
        i0.ɵɵtext(31, "Active");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "option", 19);
        i0.ɵɵtext(33, "Draft");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "option", 20);
        i0.ɵɵtext(35, "Review required");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "option", 21);
        i0.ɵɵtext(37, "In progress");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "option", 22);
        i0.ɵɵtext(39, "Open");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "div", 14);
        i0.ɵɵelementStart(41, "label", 23);
        i0.ɵɵtext(42, "Perimetre / Entity key");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "input", 24);
        i0.ɵɵlistener("ngModelChange", function ComplianceComponent_Template_input_ngModelChange_43_listener($event) { return ctx.filters.entityKey = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "div", 25);
        i0.ɵɵelementStart(45, "button", 7);
        i0.ɵɵlistener("click", function ComplianceComponent_Template_button_click_45_listener() { return ctx.loadOverview(); });
        i0.ɵɵtext(46, "Appliquer");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "button", 26);
        i0.ɵɵlistener("click", function ComplianceComponent_Template_button_click_47_listener() { return ctx.resetFilters(); });
        i0.ɵɵtext(48, "Reinitialiser");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(49, ComplianceComponent_div_49_Template, 29, 7, "div", 27);
        i0.ɵɵelementStart(50, "div", 28);
        i0.ɵɵelementStart(51, "div", 11);
        i0.ɵɵelementStart(52, "div", 12);
        i0.ɵɵelementStart(53, "h2");
        i0.ɵɵtext(54, "Sous-modules");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "p");
        i0.ɵɵtext(56, "Chaque domaine de travail dispose maintenant de sa page dediee avec filtrage RBAC.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "div", 29);
        i0.ɵɵtemplate(58, ComplianceComponent_a_58_Template, 5, 3, "a", 30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(59, ComplianceComponent_div_59_Template, 22, 3, "div", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngModel", ctx.filters.status);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("ngModel", ctx.filters.entityKey);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngForOf", ctx.modules);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
    } }, directives: [i3.NgClass, i3.NgForOf, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance',
                templateUrl: './compliance.component.html',
                styleUrls: ['./compliance.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance.component.js.map