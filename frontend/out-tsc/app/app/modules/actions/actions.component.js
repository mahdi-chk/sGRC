import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getActionsModuleItems, getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionsService } from './actions.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./actions.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ActionsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ActionsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelementStart(1, "div", 20);
    i0.ɵɵelementStart(2, "span", 21);
    i0.ɵɵtext(3, "Actions ouvertes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Actions encore en execution sur l ensemble du portefeuille.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 20);
    i0.ɵɵelementStart(9, "span", 21);
    i0.ɵɵtext(10, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Actions depassant leur echeance ou un jalon critique.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 20);
    i0.ɵɵelementStart(16, "span", 21);
    i0.ɵɵtext(17, "A 30 jours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Actions ou jalons attendus dans les 30 prochains jours.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 20);
    i0.ɵɵelementStart(23, "span", 21);
    i0.ɵɵtext(24, "Taux de cloture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Part des actions cloturees au dernier cycle de revue.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r6.summary.totalOpenActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.overdueActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.dueThisMonth);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", data_r6.summary.completionRate, "%");
} }
function ActionsComponent_a_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const module_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", module_r7.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r7.description);
} }
function ActionsComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Lecture rapide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Le module unifie les plans issus des audits, de la maitrise des risques et du traitement des incidents.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 15);
    i0.ɵɵelementStart(7, "div", 23);
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9, "Portefeuille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 23);
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14, "Alertes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 23);
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19, "Efficacite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r8 = ctx.ngIf;
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate2("", data_r8.summary.criticalActions, " actions prioritaires et ", data_r8.summary.blockedActions, " actions bloquees a arbitrer.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r8.summary.activeAlerts, " rappels ou escalades automatiques sont actuellement actives.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r8.summary.effectivenessScore, "% d efficacite moyenne mesuree sur les plans clotures.");
} }
function ActionsComponent_div_28_article_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 26);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 27);
    i0.ɵɵelementStart(6, "span", 28);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 29);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", "tone-" + item_r10.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.detail);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r10.sourceModule);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.owner);
} }
function ActionsComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Actions a faire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Suggestions purement visuelles generees a partir des retards, priorites et affectations detectes.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 24);
    i0.ɵɵtemplate(7, ActionsComponent_div_28_article_7_Template, 10, 5, "article", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r4.overview == null ? null : ctx_r4.overview.todoActions);
} }
export class ActionsComponent {
    constructor(router, actionsService) {
        this.router = router;
        this.actionsService = actionsService;
        this.currentRole = getStoredActionsRole();
        this.navItems = getActionsNavItems(this.currentRole);
        this.modules = getActionsModuleItems(this.currentRole);
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
        this.router.navigate(['/dashboard']);
    }
}
ActionsComponent.ɵfac = function ActionsComponent_Factory(t) { return new (t || ActionsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ActionsService)); };
ActionsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionsComponent, selectors: [["app-actions"]], decls: 29, vars: 7, consts: [[1, "actions-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "actions-tabs"], ["routerLinkActive", "active", "class", "actions-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], [1, "module-list"], ["class", "module-link", 3, "routerLink", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], ["routerLinkActive", "active", 1, "actions-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "module-link", 3, "routerLink"], [1, "module-link"], [1, "todo-list"], ["class", "todo-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "todo-item", 3, "ngClass"], [1, "todo-meta"], [1, "tag"], [1, "tag", "subtle"]], template: function ActionsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ActionsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Plans d Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Coordonnez les actions correctives, preventives et de remediations issues des risques, incidents et audits.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ActionsComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ActionsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ActionsComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "div", 14);
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22, "Sous-modules");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Chaque vue couvre un angle de pilotage distinct du plan d actions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 15);
        i0.ɵɵtemplate(26, ActionsComponent_a_26_Template, 5, 3, "a", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(27, ActionsComponent_div_27_Template, 22, 4, "div", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(28, ActionsComponent_div_28_Template, 8, 1, "div", 17);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngForOf", ctx.modules);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview == null ? null : ctx.overview.todoActions == null ? null : ctx.overview.todoActions.length);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './actions-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsComponent, [{
        type: Component,
        args: [{
                selector: 'app-actions',
                templateUrl: './actions.component.html',
                styleUrls: ['./actions.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ActionsService }]; }, null); })();
//# sourceMappingURL=actions.component.js.map