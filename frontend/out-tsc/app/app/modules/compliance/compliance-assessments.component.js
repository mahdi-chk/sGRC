import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceService } from './compliance.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./compliance.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ComplianceAssessmentsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r4.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function ComplianceAssessmentsComponent_div_17_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 17);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 18);
    i0.ɵɵelementStart(6, "span", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 20);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.framework);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", item_r6.completion, "% complete");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r6.answered, "/", item_r6.totalQuestions, " reponses");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Responsable: ", item_r6.owner, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Echeance: ", ctx_r5.formatDate(item_r6.dueDate), "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r5.getStatusClass(item_r6.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r6.status);
} }
function ComplianceAssessmentsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, ComplianceAssessmentsComponent_div_17_article_1_Template, 16, 9, "article", 15);
    i0.ɵɵelementStart(2, "app-pagination", 16);
    i0.ɵɵlistener("pageChanged", function ComplianceAssessmentsComponent_div_17_Template_app_pagination_pageChanged_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.onPageChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.paginatedAssessments);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("totalItems", ctx_r1.assessments.length)("currentPage", ctx_r1.currentPage)("pageSize", ctx_r1.itemsPerPage);
} }
function ComplianceAssessmentsComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucune campagne active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Les auto-evaluations seront visibles ici une fois les campagnes initialisees.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ComplianceAssessmentsComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.navItems = getComplianceNavItems(getStoredComplianceRole());
        this.overview = null;
        this.isLoading = false;
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }
    ngOnInit() {
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.complianceService.getOverview().subscribe({
            next: overview => {
                this.overview = overview;
                this.isLoading = false;
            },
            error: () => {
                this.overview = null;
                this.isLoading = false;
            }
        });
        this.currentPage = 1;
    }
    goBack() {
        this.router.navigate(['/dashboard/compliance']);
    }
    get assessments() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.assessments) || [];
    }
    get paginatedAssessments() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.assessments.slice(startIndex, startIndex + this.itemsPerPage);
    }
    onPageChanged(event) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }
    formatDate(value) {
        return value ? new Date(value).toLocaleDateString('fr-FR') : 'Sans echeance';
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
    }
}
ComplianceAssessmentsComponent.ɵfac = function ComplianceAssessmentsComponent_Factory(t) { return new (t || ComplianceAssessmentsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceAssessmentsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceAssessmentsComponent, selectors: [["app-compliance-assessments"]], decls: 20, vars: 5, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-list-check"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "item-list", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "item-list"], ["class", "list-item", 4, "ngFor", "ngForOf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged"], [1, "list-item"], [1, "meta-row"], [1, "tag"], [1, "badge", 3, "ngClass"], [1, "empty-state"], [1, "fas", "fa-clipboard-check"]], template: function ComplianceAssessmentsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceAssessmentsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Auto-evaluations");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Campagnes de conformite, progression des reponses et suivi des questionnaires par cadre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceAssessmentsComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceAssessmentsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ComplianceAssessmentsComponent_div_17_Template, 3, 4, "div", 11);
        i0.ɵɵtemplate(18, ComplianceAssessmentsComponent_ng_template_18_Template, 6, 0, "ng-template", null, 12, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(19);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.assessments.length > 0)("ngIfElse", _r2);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceAssessmentsComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-assessments',
                templateUrl: './compliance-assessments.component.html',
                styleUrls: ['./compliance-assessments.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-assessments.component.js.map