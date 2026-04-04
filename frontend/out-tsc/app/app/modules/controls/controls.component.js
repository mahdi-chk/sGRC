import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CONTROLS_NAV_ITEMS } from './controls-navigation';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ControlsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r4.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function ControlsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelementStart(1, "div", 20);
    i0.ɵɵelementStart(2, "span", 21);
    i0.ɵɵtext(3, "Controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Controles actuellement derives du perimetre operationnel charge.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 20);
    i0.ɵɵelementStart(9, "span", 21);
    i0.ɵɵtext(10, "Preuves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Justificatifs consolides depuis les audits, risques et incidents.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 20);
    i0.ɵɵelementStart(16, "span", 21);
    i0.ɵɵtext(17, "Score d efficacite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Mesure globale de l efficacite observee.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 20);
    i0.ɵɵelementStart(23, "span", 21);
    i0.ɵɵtext(24, "Non-conformites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Ecarts encore actifs dans le dispositif de suivi.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r5 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r5.summary.totalControls);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.evidenceCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", data_r5.summary.effectivenessScore, "%");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.openNonConformities);
} }
function ControlsComponent_a_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
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
function ControlsComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Lecture rapide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "La separation des interfaces facilite l acces direct a chaque sous-processus du controle interne.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 15);
    i0.ɵɵelementStart(7, "div", 23);
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9, "Referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 23);
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14, "Planification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 23);
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19, "Suivi continu");
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
    i0.ɵɵtextInterpolate2("", data_r7.summary.periodicControls, " controles periodiques et ", data_r7.summary.ponctualControls, " controles ponctuels visibles.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", data_r7.summary.upcomingActions, " actions a venir et ", data_r7.summary.overdueActions, " actions en retard.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r7.summary.openNonConformities, " non-conformites ouvertes a traiter en continu.");
} }
export class ControlsComponent {
    constructor(router, controlsService) {
        this.router = router;
        this.controlsService = controlsService;
        this.navItems = CONTROLS_NAV_ITEMS;
        this.overview = null;
        this.isLoading = false;
        this.modules = [
            {
                title: 'Referentiel des Controles',
                route: '/dashboard/controls-referential',
                description: 'Catalogue des controles relies aux risques, responsables et frequences.'
            },
            {
                title: 'Planification Automatisee',
                route: '/dashboard/controls-planning',
                description: 'Agenda consolide des controles et des audits, ponctuels ou periodiques.'
            },
            {
                title: 'Collecte de Preuves',
                route: '/dashboard/controls-evidence',
                description: 'Centralisation des justificatifs avec auteur et rattachement metier.'
            },
            {
                title: 'Evaluation d Efficacite',
                route: '/dashboard/controls-effectiveness',
                description: 'Mesure de la recurrence des incidents apres mise en oeuvre.'
            },
            {
                title: 'Suivi des Non-Conformites',
                route: '/dashboard/controls-non-conformities',
                description: 'Traitement continu des ecarts detectes apres execution.'
            }
        ];
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
        this.router.navigate(['/dashboard']);
    }
}
ControlsComponent.ɵfac = function ControlsComponent_Factory(t) { return new (t || ControlsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsComponent, selectors: [["app-controls"]], decls: 28, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-user-check"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "controls-tabs"], ["routerLinkActive", "active", "class", "controls-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], [1, "module-list"], ["class", "module-link", 3, "routerLink", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], ["routerLinkActive", "active", 1, "controls-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "module-link", 3, "routerLink"], [1, "module-link"]], template: function ControlsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Controles Internes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Point d entree du module. Chaque sous-module dispose maintenant de sa propre interface, a la maniere de Gouvernance.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ControlsComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ControlsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ControlsComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "div", 14);
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22, "Sous-modules");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Chaque domaine de travail a desormais sa page dediee et sa navigation propre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 15);
        i0.ɵɵtemplate(26, ControlsComponent_a_26_Template, 5, 3, "a", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(27, ControlsComponent_div_27_Template, 22, 5, "div", 17);
        i0.ɵɵelementEnd();
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
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './controls-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls',
                templateUrl: './controls.component.html',
                styleUrls: ['./controls.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls.component.js.map