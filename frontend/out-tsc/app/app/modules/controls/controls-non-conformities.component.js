import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ControlsNonConformitiesComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ControlsNonConformitiesComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "Ecarts ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Non-conformites encore actives dans le cycle de controle.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "Critiques / hautes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Ecarts a prioriser en premier.");
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
    i0.ɵɵtext(21, "Dossiers dont l echeance est depassee.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Total suivi");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Vue dediee au traitement des deviations constatees.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r6.summary.openNonConformities);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.criticalCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.overdueCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.items.length);
} }
function ControlsNonConformitiesComponent_div_18_article_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 22);
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 25);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 26);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r8.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r7.getStatusClass(item_r8.severity));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r8.severity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r8.department, " | Source : ", item_r8.source, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r8.owner || "Sans proprietaire");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.formatDate(item_r8.dueDate));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r7.getStatusClass(item_r8.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r8.status);
} }
function ControlsNonConformitiesComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Registre des non-conformites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Chaque ecart reste rattache a son departement, sa source et sa date cible de traitement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 20);
    i0.ɵɵtemplate(7, ControlsNonConformitiesComponent_div_18_article_7_Template, 15, 9, "article", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r2.items);
} }
function ControlsNonConformitiesComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1, "Aucune non-conformite ouverte dans ce perimetre.");
    i0.ɵɵelementEnd();
} }
export class ControlsNonConformitiesComponent {
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
    get items() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.nonConformities) || [];
    }
    get criticalCount() {
        return this.items.filter(item => /critical|critique|high|eleve/i.test(item.severity || '')).length;
    }
    get overdueCount() {
        const now = Date.now();
        return this.items.filter(item => item.dueDate && new Date(item.dueDate).getTime() < now).length;
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
ControlsNonConformitiesComponent.ɵfac = function ControlsNonConformitiesComponent_Factory(t) { return new (t || ControlsNonConformitiesComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsNonConformitiesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsNonConformitiesComponent, selectors: [["app-controls-non-conformities"]], decls: 21, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-shield-exclamation"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "controls-tabs"], ["routerLinkActive", "active", "class", "controls-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "content-card", 4, "ngIf", "ngIfElse"], ["emptyItems", ""], ["routerLinkActive", "active", 1, "controls-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "content-card"], [1, "card-head"], [1, "nonconformity-list"], ["class", "nonconformity-item", 4, "ngFor", "ngForOf"], [1, "nonconformity-item"], [1, "nonconformity-head"], [1, "tag", 3, "ngClass"], [1, "nonconformity-meta"], [3, "ngClass"], [1, "empty-state"]], template: function ControlsNonConformitiesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsNonConformitiesComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Suivi des Non-Conformites");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Page dediee aux ecarts detectes apres execution des controles et a leur traitement continu.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ControlsNonConformitiesComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ControlsNonConformitiesComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ControlsNonConformitiesComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ControlsNonConformitiesComponent_div_18_Template, 8, 1, "div", 12);
        i0.ɵɵtemplate(19, ControlsNonConformitiesComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
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
        i0.ɵɵproperty("ngIf", ctx.items.length > 0)("ngIfElse", _r3);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './controls-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsNonConformitiesComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls-non-conformities',
                templateUrl: './controls-non-conformities.component.html',
                styleUrls: ['./controls-non-conformities.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls-non-conformities.component.js.map