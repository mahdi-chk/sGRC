import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CONTROLS_NAV_ITEMS } from './controls-navigation';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ControlsReferentialComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ControlsReferentialComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "Controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Elements suivis dans le registre de controle.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "Periodiques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Controles relies a une frequence d execution.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16);
    i0.ɵɵelementStart(16, "span", 17);
    i0.ɵɵtext(17, "Ponctuels");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Controles lies a un besoin ou un contexte donne.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Departements couverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Perimetres actuellement rattaches au referentiel.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r6.summary.totalControls);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.periodicControls);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.ponctualControls);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.departmentCount);
} }
function ControlsReferentialComponent_div_18_tr_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵelementStart(9, "span", 22);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelementStart(12, "span", 23);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵelementStart(19, "span", 24);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const control_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r8.code);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r8.linkedRisk);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r8.controlType);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r8.executionType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r8.department);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r8.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r7.getStatusClass(control_r8.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.formatDate(control_r8.nextReview));
} }
function ControlsReferentialComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Catalogue des controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Vision dediee au referentiel, separee des preuves, de la planification et des non-conformites.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "table", 20);
    i0.ɵɵelementStart(7, "thead");
    i0.ɵɵelementStart(8, "tr");
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Controle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Execution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Departement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th");
    i0.ɵɵtext(22, "Revue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "tbody");
    i0.ɵɵtemplate(24, ControlsReferentialComponent_div_18_tr_24_Template, 21, 9, "tr", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(24);
    i0.ɵɵproperty("ngForOf", ctx_r2.registry);
} }
function ControlsReferentialComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1, "Aucun controle disponible pour ce perimetre.");
    i0.ɵɵelementEnd();
} }
export class ControlsReferentialComponent {
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
    get registry() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.registry) || [];
    }
    get departmentCount() {
        return new Set(this.registry.map(item => item.department)).size;
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
ControlsReferentialComponent.ɵfac = function ControlsReferentialComponent_Factory(t) { return new (t || ControlsReferentialComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsReferentialComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsReferentialComponent, selectors: [["app-controls-referential"]], decls: 21, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-book-bookmark"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "controls-tabs"], ["routerLinkActive", "active", "class", "controls-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "table-card", 4, "ngIf", "ngIfElse"], ["emptyRegistry", ""], ["routerLinkActive", "active", 1, "controls-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "table-card"], [1, "card-head"], [1, "controls-table"], [4, "ngFor", "ngForOf"], [1, "tag"], [1, "tag", "subtle"], [3, "ngClass"], [1, "empty-state"]], template: function ControlsReferentialComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsReferentialComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Referentiel des Controles");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Catalogue operationnel des controles relies aux risques, aux responsables et aux revues planifiees.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ControlsReferentialComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ControlsReferentialComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ControlsReferentialComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ControlsReferentialComponent_div_18_Template, 25, 1, "div", 12);
        i0.ɵɵtemplate(19, ControlsReferentialComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
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
        i0.ɵɵproperty("ngIf", ctx.registry.length > 0)("ngIfElse", _r3);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './controls-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsReferentialComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls-referential',
                templateUrl: './controls-referential.component.html',
                styleUrls: ['./controls-referential.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls-referential.component.js.map