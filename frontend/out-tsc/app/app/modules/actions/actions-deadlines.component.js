import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionsService } from './actions.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./actions.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ActionsDeadlinesComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function ActionsDeadlinesComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelementStart(1, "div", 17);
    i0.ɵɵelementStart(2, "span", 18);
    i0.ɵɵtext(3, "Jalons suivis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Jalons actuellement visibles sur la cadence de delivery.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 17);
    i0.ɵɵelementStart(9, "span", 18);
    i0.ɵɵtext(10, "A risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Jalons demandant arbitrage ou support immediat.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 17);
    i0.ɵɵelementStart(16, "span", 18);
    i0.ɵɵtext(17, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Actions depassant leur date d engagement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 17);
    i0.ɵɵelementStart(23, "span", 18);
    i0.ɵɵtext(24, "A 30 jours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Livrables attendus avant la prochaine revue mensuelle.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r7 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.deadlines.length);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.atRiskCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r7.summary.overdueActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r7.summary.dueThisMonth);
} }
function ActionsDeadlinesComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Focus actif: ", ctx_r2.currentQuery, " ");
} }
function ActionsDeadlinesComponent_div_19_article_7_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r9.blocker);
} }
function ActionsDeadlinesComponent_div_19_article_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 24);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 26);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 27);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 28);
    i0.ɵɵelement(12, "div", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 30);
    i0.ɵɵelementStart(14, "span", 31);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 32);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ActionsDeadlinesComponent_div_19_article_7_span_18_Template, 2, 1, "span", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r8.formatDate(item_r9.dueDate));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r9.milestone, " | ", item_r9.owner, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", item_r9.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r9.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r8.getStatusClass(item_r9.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r9.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.forecast);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r9.blocker);
} }
function ActionsDeadlinesComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelementStart(1, "div", 21);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Cadence des actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Les blocages et previsions de delivery permettent d anticiper les glissements.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 22);
    i0.ɵɵtemplate(7, ActionsDeadlinesComponent_div_19_article_7_Template, 19, 11, "article", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredDeadlines);
} }
function ActionsDeadlinesComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Aucune echeance n est disponible pour le moment.");
    i0.ɵɵelementEnd();
} }
export class ActionsDeadlinesComponent {
    constructor(router, route, actionsService) {
        this.router = router;
        this.route = route;
        this.actionsService = actionsService;
        this.navItems = getActionsNavItems(getStoredActionsRole());
        this.overview = null;
        this.isLoading = false;
        this.currentQuery = '';
    }
    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.currentQuery = (params.get('q') || '').trim().toLowerCase();
        });
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
    get deadlines() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.deadlines) || [];
    }
    get filteredDeadlines() {
        if (!this.currentQuery) {
            return this.deadlines;
        }
        return this.deadlines.filter(item => [item.title, item.milestone, item.owner].some(value => String(value || '').toLowerCase().includes(this.currentQuery)));
    }
    get atRiskCount() {
        return this.deadlines.filter(item => /risque|retard/i.test(item.status || '')).length;
    }
    formatDate(value) {
        if (!value) {
            return 'Non planifie';
        }
        return new Date(value).toLocaleDateString('fr-FR');
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/_/g, '-')}`;
    }
}
ActionsDeadlinesComponent.ɵfac = function ActionsDeadlinesComponent_Factory(t) { return new (t || ActionsDeadlinesComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ActionsService)); };
ActionsDeadlinesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionsDeadlinesComponent, selectors: [["app-actions-deadlines"]], decls: 22, vars: 7, consts: [[1, "actions-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-calendar-day"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "actions-tabs"], ["routerLinkActive", "active", "class", "actions-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "status-line", 4, "ngIf"], ["class", "content-card", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "actions-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "status-line"], [1, "content-card"], [1, "card-head"], [1, "timeline-list"], ["class", "timeline-item", 4, "ngFor", "ngForOf"], [1, "timeline-item"], [1, "timeline-date"], [1, "timeline-copy"], [1, "progress-line", "compact"], [1, "progress-track"], [1, "progress-fill"], [1, "timeline-meta"], [1, "badge", 3, "ngClass"], [1, "tag"], ["class", "tag subtle", 4, "ngIf"], [1, "tag", "subtle"], [1, "empty-state"]], template: function ActionsDeadlinesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ActionsDeadlinesComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Suivi des Echeances");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vue operationnelle des jalons, retards et previsions de livraison des plans d actions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ActionsDeadlinesComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ActionsDeadlinesComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ActionsDeadlinesComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ActionsDeadlinesComponent_div_18_Template, 2, 1, "div", 12);
        i0.ɵɵtemplate(19, ActionsDeadlinesComponent_div_19_Template, 8, 1, "div", 13);
        i0.ɵɵtemplate(20, ActionsDeadlinesComponent_ng_template_20_Template, 2, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r4 = i0.ɵɵreference(21);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.currentQuery);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredDeadlines.length > 0)("ngIfElse", _r4);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './actions-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsDeadlinesComponent, [{
        type: Component,
        args: [{
                selector: 'app-actions-deadlines',
                templateUrl: './actions-deadlines.component.html',
                styleUrls: ['./actions-deadlines.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.ActionsService }]; }, null); })();
//# sourceMappingURL=actions-deadlines.component.js.map