import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CONTROLS_NAV_ITEMS } from './controls-navigation';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ControlsPlanningComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ControlsPlanningComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "Lignes planifiees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Agenda consolide des audits et des controles.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "A venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Elements attendus dans les 30 prochains jours.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16);
    i0.ɵɵelementStart(16, "span", 17);
    i0.ɵɵtext(17, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Points a replanifier ou a escalader.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Audits / Controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Repartition du planning integre.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.planning.length);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.upcomingActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.overdueActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2("", ctx_r1.auditCount, " / ", ctx_r1.controlCount, "");
} }
function ControlsPlanningComponent_div_18_article_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 22);
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 24);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 25);
    i0.ɵɵelementStart(9, "span", 26);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 27);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 28);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.formatDate(item_r8.dueDate));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r8.department, " | ", item_r8.owner || "Non assigne", "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r8.scheduleType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.cadence);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r7.getStatusClass(item_r8.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r8.linkLabel);
} }
function ControlsPlanningComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Agenda integre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Chaque ligne precise la nature, la cadence, le proprietaire et le rattachement metier.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 20);
    i0.ɵɵtemplate(7, ControlsPlanningComponent_div_18_article_7_Template, 15, 8, "article", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r2.planning);
} }
function ControlsPlanningComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Aucune ligne de planification disponible.");
    i0.ɵɵelementEnd();
} }
export class ControlsPlanningComponent {
    constructor(router, controlsService) {
        this.router = router;
        this.controlsService = controlsService;
        this.navItems = CONTROLS_NAV_ITEMS;
        this.overview = null;
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.controlsService.getOverview().subscribe({
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
        this.router.navigate(['/dashboard/controls']);
    }
    get planning() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.planning) || [];
    }
    get auditCount() {
        return this.planning.filter(item => item.scheduleType === 'audit').length;
    }
    get controlCount() {
        return this.planning.filter(item => item.scheduleType === 'controle').length;
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
ControlsPlanningComponent.ɵfac = function ControlsPlanningComponent_Factory(t) { return new (t || ControlsPlanningComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsPlanningComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsPlanningComponent, selectors: [["app-controls-planning"]], decls: 21, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-calendar-check"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "controls-tabs"], ["routerLinkActive", "active", "class", "controls-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "content-card", 4, "ngIf", "ngIfElse"], ["emptyPlanning", ""], ["routerLinkActive", "active", 1, "controls-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "content-card"], [1, "card-head"], [1, "agenda-list"], ["class", "agenda-item", 4, "ngFor", "ngForOf"], [1, "agenda-item"], [1, "agenda-date"], [1, "agenda-copy"], [1, "agenda-meta"], [1, "tag"], [1, "tag", "subtle"], [3, "ngClass"], [1, "empty-state"]], template: function ControlsPlanningComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsPlanningComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Planification Automatisee");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Lecture dediee aux controles et audits planifies, qu ils soient ponctuels ou periodiques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ControlsPlanningComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ControlsPlanningComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ControlsPlanningComponent_div_17_Template, 29, 5, "div", 11);
        i0.ɵɵtemplate(18, ControlsPlanningComponent_div_18_Template, 8, 1, "div", 12);
        i0.ɵɵtemplate(19, ControlsPlanningComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
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
        i0.ɵɵproperty("ngIf", ctx.planning.length > 0)("ngIfElse", _r3);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './controls-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsPlanningComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls-planning',
                templateUrl: './controls-planning.component.html',
                styleUrls: ['./controls-planning.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls-planning.component.js.map