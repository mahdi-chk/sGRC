import { Component } from '@angular/core';
import { AuditingService, AuditRecordType } from '../../../core/services/auditing.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function PlanificationComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function PlanificationComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 13);
    i0.ɵɵtemplate(1, PlanificationComponent_nav_15_a_1_Template, 2, 4, "a", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function PlanificationComponent_div_16_div_11_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const suggestion_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Risque #", suggestion_r7.riskId, "");
} }
function PlanificationComponent_div_16_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵlistener("click", function PlanificationComponent_div_16_div_11_Template_div_click_1_listener() { const suggestion_r7 = ctx.$implicit; return suggestion_r7.selected = !suggestion_r7.selected; });
    i0.ɵɵelement(2, "i", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 26);
    i0.ɵɵelementStart(4, "div", 27);
    i0.ɵɵelementStart(5, "h4");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PlanificationComponent_div_16_div_11_span_7_Template, 2, 1, "span", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 29);
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "Objectif:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 30);
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14, "Responsable:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 31);
    i0.ɵɵelement(17, "i", 32);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const suggestion_r7 = ctx.$implicit;
    i0.ɵɵclassProp("selected", suggestion_r7.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-check-square", suggestion_r7.selected)("fa-square", !suggestion_r7.selected);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(suggestion_r7.regleDnssi || suggestion_r7.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", suggestion_r7.riskId);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", suggestion_r7.recommandations || suggestion_r7.objectifs, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", suggestion_r7.responsabilites || "A definir", "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Delai suggere: ", suggestion_r7.delaiSuggestion || 30, " jours ");
} }
function PlanificationComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelementStart(1, "div", 17);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Suggestions IA pour les missions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 18);
    i0.ɵɵelementStart(5, "button", 19);
    i0.ɵɵlistener("click", function PlanificationComponent_div_16_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.suggestedPlan = []; });
    i0.ɵɵtext(6, "Effacer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 20);
    i0.ɵɵlistener("click", function PlanificationComponent_div_16_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.createMissions(); });
    i0.ɵɵelement(8, "i", 21);
    i0.ɵɵtext(9, " Valider et Creer Missions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 22);
    i0.ɵɵtemplate(11, PlanificationComponent_div_16_div_11_Template, 19, 11, "div", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.isCreatingMissions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.suggestedPlan);
} }
function PlanificationComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Besoin d'aide pour structurer vos missions ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Cliquez sur \"Nouvelle Suggestion\" pour laisser l'IA proposer des missions d'audit prioritaires.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 36);
    i0.ɵɵlistener("click", function PlanificationComponent_div_17_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.generatePlan(); });
    i0.ɵɵtext(7, "Generer des suggestions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function PlanificationComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "L'IA analyse les risques en profondeur... Veuillez patienter.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class PlanificationComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.suggestedPlan = [];
        this.isGeneratingPlan = false;
        this.isCreatingMissions = false;
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        if (!this.isSeniorAuditor) {
            this.router.navigate(['/dashboard/auditor-missions']);
            return;
        }
    }
    get isSeniorAuditor() {
        const userString = sessionStorage.getItem('sgrc_user');
        const userAddress = userString ? JSON.parse(userString) : null;
        return (userAddress === null || userAddress === void 0 ? void 0 : userAddress.role) === UserRole.AUDIT_SENIOR || (userAddress === null || userAddress === void 0 ? void 0 : userAddress.role) === UserRole.SUPER_ADMIN;
    }
    generatePlan() {
        this.isGeneratingPlan = true;
        this.suggestedPlan = [];
        this.auditingService.suggestPlan(AuditRecordType.MISSION_AUDIT).subscribe({
            next: (plan) => {
                this.suggestedPlan = plan.map((item) => (Object.assign(Object.assign({}, item), { selected: true })));
                this.isGeneratingPlan = false;
            },
            error: (err) => {
                console.error(err);
                this.isGeneratingPlan = false;
                alert('Erreur lors de la suggestion des missions.');
            }
        });
    }
    createMissions() {
        const selected = this.suggestedPlan.filter((item) => item.selected);
        if (selected.length === 0) {
            return;
        }
        this.isCreatingMissions = true;
        this.auditingService.createMissionsFromPlan(selected, AuditRecordType.MISSION_AUDIT).subscribe({
            next: () => {
                this.isCreatingMissions = false;
                this.suggestedPlan = [];
                alert('Missions creees avec succes.');
                this.router.navigate(['/dashboard/auditing']);
            },
            error: (err) => {
                console.error(err);
                this.isCreatingMissions = false;
                alert('Erreur lors de la creation des missions.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard/auditing']);
    }
}
PlanificationComponent.ɵfac = function PlanificationComponent_Factory(t) { return new (t || PlanificationComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
PlanificationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlanificationComponent, selectors: [["app-planification"]], decls: 19, vars: 12, consts: [[1, "audit-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-magic"], [1, "header-actions"], [1, "btn-ai-plan", 3, "disabled", "click"], [1, "fas"], ["class", "audit-tabs", 4, "ngIf"], ["class", "plan-content", 4, "ngIf"], ["class", "empty-state-ai", 4, "ngIf"], ["class", "loading-ai", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "plan-content"], [1, "plan-header-row"], [1, "plan-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], [1, "fas", "fa-check-circle"], [1, "suggested-plan-grid"], ["class", "suggestion-card", 3, "selected", 4, "ngFor", "ngForOf"], [1, "suggestion-card"], [1, "card-check", 3, "click"], [1, "card-body"], [1, "card-top"], ["class", "risk-ref", 4, "ngIf"], [1, "obj"], [1, "resp"], [1, "card-footer"], [1, "far", "fa-calendar-alt"], [1, "risk-ref"], [1, "empty-state-ai"], [1, "fas", "fa-robot"], [1, "btn-primary-ghost", 3, "click"], [1, "loading-ai"], [1, "fas", "fa-circle-notch", "fa-spin"]], template: function PlanificationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function PlanificationComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Missions Suggerees (IA)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Utilisez l'intelligence artificielle pour generer des missions d'audit a partir de vos risques et du nouveau format mission.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function PlanificationComponent_Template_button_click_12_listener() { return ctx.generatePlan(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, PlanificationComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, PlanificationComponent_div_16_Template, 12, 2, "div", 10);
        i0.ɵɵtemplate(17, PlanificationComponent_div_17_Template, 8, 0, "div", 11);
        i0.ɵɵtemplate(18, PlanificationComponent_div_18_Template, 4, 0, "div", 12);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isGeneratingPlan);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-magic", !ctx.isGeneratingPlan)("fa-spinner", ctx.isGeneratingPlan)("fa-spin", ctx.isGeneratingPlan);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isGeneratingPlan ? "Analyse IA..." : "Nouvelle Suggestion", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.suggestedPlan.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.suggestedPlan.length === 0 && !ctx.isGeneratingPlan);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isGeneratingPlan);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], styles: ["@import '../auditing.component.scss';\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n    min-height: 100vh;\n}\n\n.plan-header-row[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 25px;\n    padding-bottom: 10px;\n    border-bottom: 2px solid #e2e8f0;\n\n    h3 {\n        margin: 0;\n        color: #0f172a;\n        font-weight: 800;\n    }\n}\n\n.plan-actions[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 12px;\n}\n\n\n\n.empty-state-ai[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 100px 40px;\n    background: white;\n    border-radius: 20px;\n    border: 2px dashed #e2e8f0;\n    text-align: center;\n    margin-top: 50px;\n\n    i {\n        font-size: 4rem;\n        color: #6366f1;\n        margin-bottom: 20px;\n    }\n\n    h3 {\n        color: #0f172a;\n        margin-bottom: 10px;\n    }\n\n    p {\n        color: #64748b;\n        max-width: 500px;\n        margin-bottom: 25px;\n    }\n}\n\n.loading-ai[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: 100px;\n    color: #6366f1;\n    gap: 20px;\n\n    i {\n        font-size: 3rem;\n    }\n}\n\n.btn-primary-ghost[_ngcontent-%COMP%] {\n    background: white;\n    color: #4f46e5;\n    border: 2px solid #4f46e5;\n    padding: 12px 24px;\n    border-radius: 12px;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.2s;\n\n    &:hover {\n        background: #f5f3ff;\n        transform: translateY(-2px);\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlanificationComponent, [{
        type: Component,
        args: [{
                selector: 'app-planification',
                templateUrl: './planification.component.html',
                styleUrls: ['./planification.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=planification.component.js.map