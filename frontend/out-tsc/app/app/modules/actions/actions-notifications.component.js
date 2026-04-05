import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from './actions.service';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./actions.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ActionsNotificationsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function ActionsNotificationsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelementStart(1, "div", 17);
    i0.ɵɵelementStart(2, "span", 18);
    i0.ɵɵtext(3, "Scenarios actifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Rappels ou escalades actuellement executes.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 17);
    i0.ɵɵelementStart(9, "span", 18);
    i0.ɵɵtext(10, "Emails");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Modeles d information ou de relance par email.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 17);
    i0.ɵɵelementStart(16, "span", 18);
    i0.ɵɵtext(17, "Alertes globales");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Alertes remontant actuellement dans le dispositif.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 17);
    i0.ɵɵelementStart(23, "span", 18);
    i0.ɵɵtext(24, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Source principale des escalades automatiques.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r7 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.activeCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.emailCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r7.summary.activeAlerts);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r7.summary.overdueActions);
} }
function ActionsNotificationsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Focus actif: ", ctx_r2.currentFocus, " ");
} }
function ActionsNotificationsComponent_div_19_article_1_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelementStart(1, "button", 30);
    i0.ɵɵlistener("click", function ActionsNotificationsComponent_div_19_article_1_div_18_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r13); const item_r9 = i0.ɵɵnextContext().$implicit; const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.openDetail(item_r9); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.detailLabel);
} }
function ActionsNotificationsComponent_div_19_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 22);
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 24);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 25);
    i0.ɵɵelementStart(10, "span", 26);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 27);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 26);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ActionsNotificationsComponent_div_19_article_1_div_18_Template, 3, 1, "div", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.trigger);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r8.getStatusClass(item_r9.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r9.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r9.channel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.audience);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Escalade ", item_r9.escalationLevel, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Prochain envoi: ", ctx_r8.formatDate(item_r9.nextSendAt), "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r9.detailLabel);
} }
function ActionsNotificationsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtemplate(1, ActionsNotificationsComponent_div_19_article_1_Template, 19, 9, "article", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.notifications);
} }
function ActionsNotificationsComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1, "Aucune notification parametree sur ce module.");
    i0.ɵɵelementEnd();
} }
export class ActionsNotificationsComponent {
    constructor(router, route, actionsService) {
        this.router = router;
        this.route = route;
        this.actionsService = actionsService;
        this.navItems = getActionsNavItems(getStoredActionsRole());
        this.overview = null;
        this.isLoading = false;
        this.currentFocus = '';
    }
    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.currentFocus = params.get('focus') || params.get('q') || '';
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
    openDetail(item) {
        if (!item.detailFilter) {
            return;
        }
        this.router.navigate(['/dashboard/actions-centralized'], {
            queryParams: item.detailFilter
        });
    }
    get notifications() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.notifications) || [];
    }
    get activeCount() {
        return this.notifications.filter(item => item.status === 'active').length;
    }
    get emailCount() {
        return this.notifications.filter(item => item.channel === 'email').length;
    }
    formatDate(value) {
        if (!value) {
            return 'Non planifie';
        }
        return new Date(value).toLocaleString('fr-FR');
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/_/g, '-')}`;
    }
}
ActionsNotificationsComponent.ɵfac = function ActionsNotificationsComponent_Factory(t) { return new (t || ActionsNotificationsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ActionsService)); };
ActionsNotificationsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionsNotificationsComponent, selectors: [["app-actions-notifications"]], decls: 22, vars: 7, consts: [[1, "actions-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-bell"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "actions-tabs"], ["routerLinkActive", "active", "class", "actions-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "status-line", 4, "ngIf"], ["class", "notification-list", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "actions-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "status-line"], [1, "notification-list"], ["class", "notification-item", 4, "ngFor", "ngForOf"], [1, "notification-item"], [1, "notification-head"], [1, "badge", 3, "ngClass"], [1, "notification-meta"], [1, "tag"], [1, "tag", "subtle"], ["class", "mini-actions", 4, "ngIf"], [1, "mini-actions"], ["type", "button", 1, "action-btn", 3, "click"], [1, "empty-state"]], template: function ActionsNotificationsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ActionsNotificationsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Notifications");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Pilotez les rappels, escalades et syntheses periodiques relies aux plans d actions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ActionsNotificationsComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ActionsNotificationsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ActionsNotificationsComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ActionsNotificationsComponent_div_18_Template, 2, 1, "div", 12);
        i0.ɵɵtemplate(19, ActionsNotificationsComponent_div_19_Template, 2, 1, "div", 13);
        i0.ɵɵtemplate(20, ActionsNotificationsComponent_ng_template_20_Template, 2, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
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
        i0.ɵɵproperty("ngIf", ctx.currentFocus);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.notifications.length > 0)("ngIfElse", _r4);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './actions-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsNotificationsComponent, [{
        type: Component,
        args: [{
                selector: 'app-actions-notifications',
                templateUrl: './actions-notifications.component.html',
                styleUrls: ['./actions-notifications.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.ActionsService }]; }, null); })();
//# sourceMappingURL=actions-notifications.component.js.map