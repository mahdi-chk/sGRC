import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ControlsEffectivenessComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ControlsEffectivenessComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "Score moyen");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Vision moyenne de l efficacite des controles evalues.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "Solides");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Controles avec un score fort et une tendance favorable.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16);
    i0.ɵɵelementStart(16, "span", 17);
    i0.ɵɵtext(17, "Sous surveillance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Controles a confirmer ou a renforcer.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Fragiles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Controles ou la recurrence reste trop elevee.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r6.summary.effectivenessScore, "%");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.strongCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.watchCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.alertCount);
} }
function ControlsEffectivenessComponent_div_18_article_1_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 22);
    i0.ɵɵelementStart(12, "div");
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Avant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div");
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Apres");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div");
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "Tendance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong", 23);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r7.getToneClass(item_r8.score));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r8.controlCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r8.score, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Mise en oeuvre : ", ctx_r7.formatDate(item_r8.implementationDate), "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r8.incidentsBefore);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r8.incidentsAfter);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r7.getTrendClass(item_r8.recurrenceTrend));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.getTrendLabel(item_r8.recurrenceTrend));
} }
function ControlsEffectivenessComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, ControlsEffectivenessComponent_div_18_article_1_Template, 27, 9, "article", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.effectiveness);
} }
function ControlsEffectivenessComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Pas assez de donnees pour evaluer l efficacite.");
    i0.ɵɵelementEnd();
} }
export class ControlsEffectivenessComponent {
    constructor(router, controlsService) {
        this.router = router;
        this.controlsService = controlsService;
        this.navItems = getControlsNavItems(getStoredControlsRole());
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
    get effectiveness() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.effectiveness) || [];
    }
    get strongCount() {
        return this.effectiveness.filter(item => item.score >= 80).length;
    }
    get watchCount() {
        return this.effectiveness.filter(item => item.score >= 60 && item.score < 80).length;
    }
    get alertCount() {
        return this.effectiveness.filter(item => item.score < 60).length;
    }
    formatDate(value) {
        if (!value) {
            return 'Non planifie';
        }
        return new Date(value).toLocaleDateString('fr-FR');
    }
    getToneClass(score) {
        if (score >= 80) {
            return 'tone-strong';
        }
        if (score >= 60) {
            return 'tone-watch';
        }
        return 'tone-alert';
    }
    getTrendLabel(value) {
        if (value === 'en_baisse') {
            return 'En baisse';
        }
        if (value === 'en_hausse') {
            return 'En hausse';
        }
        return 'Stable';
    }
    getTrendClass(value) {
        return `trend-${String(value || '').replace(/_/g, '-')}`;
    }
}
ControlsEffectivenessComponent.ɵfac = function ControlsEffectivenessComponent_Factory(t) { return new (t || ControlsEffectivenessComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsEffectivenessComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsEffectivenessComponent, selectors: [["app-controls-effectiveness"]], decls: 21, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "controls-tabs"], ["routerLinkActive", "active", "class", "controls-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "effectiveness-grid", 4, "ngIf", "ngIfElse"], ["emptyEffectiveness", ""], ["routerLinkActive", "active", 1, "controls-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "effectiveness-grid"], ["class", "effectiveness-card", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "effectiveness-card", 3, "ngClass"], [1, "effectiveness-head"], [1, "effectiveness-metrics"], [3, "ngClass"], [1, "empty-state"]], template: function ControlsEffectivenessComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsEffectivenessComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Evaluation d Efficacite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Analyse dediee de la recurrence des incidents et du score d efficacite des controles mis en place.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ControlsEffectivenessComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ControlsEffectivenessComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ControlsEffectivenessComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ControlsEffectivenessComponent_div_18_Template, 2, 1, "div", 12);
        i0.ɵɵtemplate(19, ControlsEffectivenessComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
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
        i0.ɵɵproperty("ngIf", ctx.effectiveness.length > 0)("ngIfElse", _r3);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './controls-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsEffectivenessComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls-effectiveness',
                templateUrl: './controls-effectiveness.component.html',
                styleUrls: ['./controls-effectiveness.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls-effectiveness.component.js.map