import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceService } from './compliance.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./compliance.service";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function ComplianceUpdatesComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function ComplianceUpdatesComponent_div_24_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 21);
    i0.ɵɵelementStart(6, "span", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 22);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.framework);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r8.getStatusClass(item_r9.impactLevel));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r9.impactLevel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r8.getStatusClass(item_r9.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r9.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Detection: ", ctx_r8.formatDate(item_r9.detectedAt), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.nextAction);
} }
function ComplianceUpdatesComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, ComplianceUpdatesComponent_div_24_article_1_Template, 14, 8, "article", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.updates);
} }
function ComplianceUpdatesComponent_div_31_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 24);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 21);
    i0.ɵɵelementStart(6, "span", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r11.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r11.framework, " - ", item_r11.filename, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r11.sourceType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Owner: ", item_r11.owner, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ajoute le ", ctx_r10.formatDate(item_r11.uploadedAt), "");
} }
function ComplianceUpdatesComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, ComplianceUpdatesComponent_div_31_article_1_Template, 12, 6, "article", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.evidence);
} }
function ComplianceUpdatesComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucune alerte de veille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Les mises a jour reglementaires seront listees ici.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ComplianceUpdatesComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 28);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucune preuve recente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Les evidences de conformite apparaitront ici une fois reliees au perimetre du module.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ComplianceUpdatesComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.navItems = getComplianceNavItems(getStoredComplianceRole());
        this.overview = null;
        this.isLoading = false;
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
    }
    goBack() {
        this.router.navigate(['/dashboard/compliance']);
    }
    get updates() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.updates) || [];
    }
    get evidence() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.evidence) || [];
    }
    formatDate(value) {
        return value ? new Date(value).toLocaleDateString('fr-FR') : 'Date indisponible';
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
    }
}
ComplianceUpdatesComponent.ɵfac = function ComplianceUpdatesComponent_Factory(t) { return new (t || ComplianceUpdatesComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceUpdatesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceUpdatesComponent, selectors: [["app-compliance-updates"]], decls: 36, vars: 7, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-bell"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], ["class", "item-list", 4, "ngIf", "ngIfElse"], ["emptyUpdates", ""], ["emptyEvidence", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "item-list"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "list-item"], [1, "meta-row"], [1, "badge", 3, "ngClass"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "tag", "secondary"], [1, "empty-state"], [1, "fas", "fa-satellite-dish"], [1, "fas", "fa-file-shield"]], template: function ComplianceUpdatesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceUpdatesComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Mises a jour et preuves");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Lecture combinee des signaux de veille et des evidences utilisables pour un dossier de conformite.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceUpdatesComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceUpdatesComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "h2");
        i0.ɵɵtext(21, "Veille");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "p");
        i0.ɵɵtext(23, "Premiere base de flux a partir de l activite recente et des points d attention detectes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, ComplianceUpdatesComponent_div_24_Template, 2, 1, "div", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "div", 13);
        i0.ɵɵelementStart(27, "h2");
        i0.ɵɵtext(28, "Preuves recentes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "p");
        i0.ɵɵtext(30, "Elements deja disponibles pour preparer un dossier de conformite ou d audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(31, ComplianceUpdatesComponent_div_31_Template, 2, 1, "div", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(32, ComplianceUpdatesComponent_ng_template_32_Template, 6, 0, "ng-template", null, 15, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(34, ComplianceUpdatesComponent_ng_template_34_Template, 6, 0, "ng-template", null, 16, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(33);
        const _r5 = i0.ɵɵreference(35);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngIf", ctx.updates.length > 0)("ngIfElse", _r3);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.evidence.length > 0)("ngIfElse", _r5);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceUpdatesComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-updates',
                templateUrl: './compliance-updates.component.html',
                styleUrls: ['./compliance-updates.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-updates.component.js.map