import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionsService } from './actions.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./actions.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ActionsIndicatorsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ActionsIndicatorsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "KPI suivis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Mesures actuellement publiees dans le cockpit.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "Dans la cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Indicateurs deja au niveau d ambition attendu.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16);
    i0.ɵɵelementStart(16, "span", 17);
    i0.ɵɵtext(17, "Achevement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Taux de cloture du portefeuille sur la periode.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Efficacite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Reduction moyenne constatee apres implementation.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.indicators.length);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.onTargetCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", data_r6.summary.completionRate, "%");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", data_r6.summary.effectivenessScore, "%");
} }
function ActionsIndicatorsComponent_div_18_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20);
    i0.ɵɵelementStart(1, "div", 21);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 22);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 23);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r8.value, "", item_r8.unit, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r7.getTrendClass(item_r8.trend));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r8.trend);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.commentary);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", item_r8.target, "", item_r8.unit, "");
} }
function ActionsIndicatorsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, ActionsIndicatorsComponent_div_18_article_1_Template, 16, 8, "article", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.indicators);
} }
function ActionsIndicatorsComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Aucun indicateur n est disponible pour cette vue.");
    i0.ɵɵelementEnd();
} }
export class ActionsIndicatorsComponent {
    constructor(router, actionsService) {
        this.router = router;
        this.actionsService = actionsService;
        this.navItems = getActionsNavItems(getStoredActionsRole());
        this.overview = null;
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.actionsService.getOverview().subscribe({
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
    goBack() {
        this.router.navigate(['/dashboard/actions']);
    }
    get indicators() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.indicators) || [];
    }
    get onTargetCount() {
        return this.indicators.filter(item => item.value >= item.target).length;
    }
    getTrendClass(value) {
        return `trend-${String(value || '').replace(/_/g, '-')}`;
    }
}
ActionsIndicatorsComponent.ɵfac = function ActionsIndicatorsComponent_Factory(t) { return new (t || ActionsIndicatorsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ActionsService)); };
ActionsIndicatorsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionsIndicatorsComponent, selectors: [["app-actions-indicators"]], decls: 21, vars: 6, consts: [[1, "actions-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "actions-tabs"], ["routerLinkActive", "active", "class", "actions-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "indicator-grid", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "actions-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "indicator-grid"], ["class", "indicator-card", 4, "ngFor", "ngForOf"], [1, "indicator-card"], [1, "indicator-head"], [3, "ngClass"], [1, "indicator-target"], [1, "empty-state"]], template: function ActionsIndicatorsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ActionsIndicatorsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Indicateurs");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vision direction sur le rythme de cloture, l efficacite et la tension du portefeuille d actions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ActionsIndicatorsComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ActionsIndicatorsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ActionsIndicatorsComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ActionsIndicatorsComponent_div_18_Template, 2, 1, "div", 12);
        i0.ɵɵtemplate(19, ActionsIndicatorsComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(20);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.indicators.length > 0)("ngIfElse", _r3);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './actions-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsIndicatorsComponent, [{
        type: Component,
        args: [{
                selector: 'app-actions-indicators',
                templateUrl: './actions-indicators.component.html',
                styleUrls: ['./actions-indicators.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ActionsService }]; }, null); })();
//# sourceMappingURL=actions-indicators.component.js.map