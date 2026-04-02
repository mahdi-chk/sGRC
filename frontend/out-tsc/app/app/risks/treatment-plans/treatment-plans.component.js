import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, RiskStatus } from '../../core/services/risk.service';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
function TreatmentPlansComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵelementStart(1, "div", 31);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵelement(3, "i", 32);
    i0.ɵɵtext(4, " Performance globale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 33);
    i0.ɵɵelementStart(6, "div", 34);
    i0.ɵɵelementStart(7, "span", 35);
    i0.ɵɵtext(8, "Taux d'ach\u00E8vement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 36);
    i0.ɵɵelement(10, "div", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 38);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 34);
    i0.ɵɵelementStart(14, "span", 35);
    i0.ɵɵtext(15, "Plans en retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 36);
    i0.ɵɵelement(17, "div", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 38);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵstyleProp("width", ctx_r0.completionRate, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.completionRate, "%");
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("width", ctx_r0.overdueRate, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.overdueRate, "%");
} }
const _c0 = function (a0, a1, a2) { return { "success": a0, "primary": a1, "danger": a2 }; };
const _c1 = function (a0, a1, a2) { return { "badge-success": a0, "badge-primary": a1, "badge-danger": a2 }; };
function TreatmentPlansComponent_tr_65_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "div", 40);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelementStart(5, "div", 41);
    i0.ɵɵelementStart(6, "span", 42);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵelementStart(11, "div", 43);
    i0.ɵɵelementStart(12, "div", 44);
    i0.ɵɵelement(13, "div", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 46);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵelementStart(17, "span", 47);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 26);
    i0.ɵɵelementStart(20, "div", 48);
    i0.ɵɵelementStart(21, "button", 49);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_tr_65_Template_button_click_21_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const plan_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.viewDetails(plan_r4); });
    i0.ɵɵelement(22, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 51);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_tr_65_Template_button_click_23_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const plan_r4 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.editPlan(plan_r4); });
    i0.ɵɵelement(24, "i", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const plan_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("row-selected", (ctx_r1.selectedPlan == null ? null : ctx_r1.selectedPlan.id) === plan_r4.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(plan_r4.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(plan_r4.owner.charAt(0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(plan_r4.owner);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("width", plan_r4.progress, "%");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(11, _c0, plan_r4.status === "Termin\u00E9", plan_r4.status === "En cours", plan_r4.status === "En retard"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", plan_r4.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(15, _c1, plan_r4.status === "Termin\u00E9", plan_r4.status === "En cours", plan_r4.status === "En retard"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", plan_r4.status, " ");
} }
function TreatmentPlansComponent_tr_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 53);
    i0.ɵɵelementStart(2, "div", 54);
    i0.ɵɵelement(3, "i", 55);
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Aucun plan de traitement trouv\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function TreatmentPlansComponent_div_67_div_8_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 76);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r9.selectedPlan.description);
} }
function TreatmentPlansComponent_div_67_div_8_button_46_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 77);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_div_67_div_8_button_46_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(3); return ctx_r11.markAsCompleted(ctx_r11.selectedPlan); });
    i0.ɵɵelement(1, "i", 78);
    i0.ɵɵtext(2, " Marquer comme termin\u00E9 ");
    i0.ɵɵelementEnd();
} }
function TreatmentPlansComponent_div_67_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵelementStart(1, "div", 64);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3, "Plan d'action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 65);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 64);
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Risque associ\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 65);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 66);
    i0.ɵɵelementStart(12, "div", 64);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 65);
    i0.ɵɵelementStart(16, "span", 67);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 64);
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 65);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 66);
    i0.ɵɵelementStart(25, "div", 64);
    i0.ɵɵelementStart(26, "label");
    i0.ɵɵtext(27, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 65);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 64);
    i0.ɵɵelementStart(32, "label");
    i0.ɵɵtext(33, "Statut actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 47);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 64);
    i0.ɵɵelementStart(37, "label");
    i0.ɵɵtext(38, "Progression");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 68);
    i0.ɵɵelementStart(40, "div", 69);
    i0.ɵɵelement(41, "div", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span", 71);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(44, TreatmentPlansComponent_div_67_div_8_div_44_Template, 5, 1, "div", 72);
    i0.ɵɵelementStart(45, "div", 73);
    i0.ɵɵtemplate(46, TreatmentPlansComponent_div_67_div_8_button_46_Template, 3, 0, "button", 74);
    i0.ɵɵelementStart(47, "button", 75);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_div_67_div_8_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.closePanel(); });
    i0.ɵɵtext(48, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r8.selectedPlan.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r8.selectedPlan.riskTitle);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r8.selectedPlan.owner.charAt(0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.selectedPlan.owner, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r8.selectedPlan.domaine || "Non sp\u00E9cifi\u00E9");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(30, 14, ctx_r8.selectedPlan.dateEcheance, "dd/MM/yyyy"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(17, _c1, ctx_r8.selectedPlan.status === "Termin\u00E9", ctx_r8.selectedPlan.status === "En cours", ctx_r8.selectedPlan.status === "En retard"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.selectedPlan.status, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵstyleProp("width", ctx_r8.selectedPlan.progress, "%");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(21, _c0, ctx_r8.selectedPlan.status === "Termin\u00E9", ctx_r8.selectedPlan.status === "En cours", ctx_r8.selectedPlan.status === "En retard"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r8.selectedPlan.progress, "%");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedPlan.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedPlan.status !== "Termin\u00E9");
} }
function TreatmentPlansComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 56);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_div_67_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.closePanel(); });
    i0.ɵɵelementStart(1, "div", 57);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_div_67_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 58);
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵelement(4, "i", 59);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 60);
    i0.ɵɵlistener("click", function TreatmentPlansComponent_div_67_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r16); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.closePanel(); });
    i0.ɵɵelement(7, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, TreatmentPlansComponent_div_67_div_8_Template, 49, 25, "div", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r3.isEditing ? "fa-edit" : "fa-info-circle");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.isEditing ? "Modifier le plan" : "D\u00E9tails du plan", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedPlan);
} }
export class TreatmentPlansComponent {
    constructor(riskService, router) {
        this.riskService = riskService;
        this.router = router;
        this.plans = [];
        this.metrics = { total: 0, enCours: 0, enRetard: 0, termines: 0 };
        this.completionRate = 0;
        this.overdueRate = 0;
        this.selectedPlan = null;
        this.showDetailPanel = false;
        this.isEditing = false;
    }
    ngOnInit() {
        this.loadPlans();
    }
    loadPlans() {
        this.riskService.getRisks().subscribe((risks) => {
            const today = new Date();
            this.plans = risks.map((risk) => {
                let status = 'En cours';
                let progress = 0;
                const normalizedStatus = this.normalizeRiskStatus(risk.statutCode || risk.statut);
                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED) {
                    status = 'Terminé';
                    progress = 100;
                }
                else if (new Date(risk.dateEcheance) < today) {
                    status = 'En retard';
                    progress = 25;
                }
                else if (normalizedStatus === RiskStatus.IN_PROGRESS) {
                    status = 'En cours';
                    progress = 50;
                }
                else {
                    status = 'En cours';
                    progress = 10;
                }
                const owner = risk.responsableTraitement
                    ? `${risk.responsableTraitement.prenom} ${risk.responsableTraitement.nom}`
                    : 'Non assigné';
                return {
                    id: risk.id,
                    name: risk.planActionTraitement || `Traitement: ${risk.titre}`,
                    riskTitle: risk.titre,
                    description: risk.description,
                    domaine: risk.domaine,
                    dateEcheance: risk.dateEcheance,
                    progress,
                    status,
                    owner,
                    riskStatus: normalizedStatus,
                };
            });
            this.metrics.total = this.plans.length;
            this.metrics.enCours = this.plans.filter((plan) => plan.status === 'En cours').length;
            this.metrics.enRetard = this.plans.filter((plan) => plan.status === 'En retard').length;
            this.metrics.termines = this.plans.filter((plan) => plan.status === 'Terminé').length;
            this.completionRate = this.metrics.total > 0
                ? Math.round((this.metrics.termines / this.metrics.total) * 100)
                : 0;
            this.overdueRate = this.metrics.total > 0
                ? Math.round((this.metrics.enRetard / this.metrics.total) * 100)
                : 0;
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    viewDetails(plan) {
        this.selectedPlan = plan;
        this.showDetailPanel = true;
        this.isEditing = false;
    }
    editPlan(plan) {
        this.selectedPlan = plan;
        this.showDetailPanel = true;
        this.isEditing = true;
    }
    closePanel() {
        this.showDetailPanel = false;
        this.selectedPlan = null;
        this.isEditing = false;
    }
    markAsCompleted(plan) {
        this.riskService.updateStatus(plan.id, RiskStatus.TREATED).subscribe({
            next: () => {
                plan.status = 'Terminé';
                plan.progress = 100;
                this.recalcMetrics();
            },
            error: (error) => console.error('Erreur:', error),
        });
    }
    recalcMetrics() {
        this.metrics.enCours = this.plans.filter((plan) => plan.status === 'En cours').length;
        this.metrics.enRetard = this.plans.filter((plan) => plan.status === 'En retard').length;
        this.metrics.termines = this.plans.filter((plan) => plan.status === 'Terminé').length;
        this.completionRate = this.metrics.total > 0
            ? Math.round((this.metrics.termines / this.metrics.total) * 100)
            : 0;
        this.overdueRate = this.metrics.total > 0
            ? Math.round((this.metrics.enRetard / this.metrics.total) * 100)
            : 0;
    }
    normalizeRiskStatus(status) {
        return (status || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
TreatmentPlansComponent.ɵfac = function TreatmentPlansComponent_Factory(t) { return new (t || TreatmentPlansComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router)); };
TreatmentPlansComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TreatmentPlansComponent, selectors: [["app-treatment-plans"]], decls: 68, vars: 8, consts: [[1, "role-dashboard", "treatment-plans-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "header-right"], [1, "btn-action", "secondary", 3, "click"], [1, "fas", "fa-sync-alt"], [1, "kpi-row", "mb-4"], [1, "kpi-card", "kpi-total"], [1, "kpi-icon"], [1, "fas", "fa-clipboard-list"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-progress"], [1, "fas", "fa-spinner"], [1, "kpi-card", "kpi-danger"], [1, "fas", "fa-exclamation-triangle"], [1, "kpi-card", "kpi-closed"], [1, "fas", "fa-check-double"], ["class", "module-card premium stats-card mb-4", 4, "ngIf"], [1, "module-card", "premium", "full-width-card"], [1, "card-header-bar"], [1, "fas", "fa-list-check"], [1, "table-container"], [1, "text-right"], [3, "row-selected", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "detail-panel-overlay", 3, "click", 4, "ngIf"], [1, "module-card", "premium", "stats-card", "mb-4"], [1, "stats-header"], [1, "fas", "fa-tachometer-alt"], [1, "progress-row"], [1, "progress-item"], [1, "progress-title"], [1, "progress-track"], [1, "progress-fill", "success"], [1, "progress-value"], [1, "progress-fill", "danger"], [1, "plan-name"], [1, "owner-cell"], [1, "owner-avatar"], [1, "progress-cell"], [1, "mini-progress-track"], [1, "mini-progress-fill", 3, "ngClass"], [1, "progress-text"], [1, "status-badge", 3, "ngClass"], [1, "table-actions"], ["title", "Voir d\u00E9tails", 1, "action-btn", "primary", 3, "click"], [1, "fas", "fa-eye"], ["title", "\u00C9diter", 1, "action-btn", "secondary", 3, "click"], [1, "fas", "fa-edit"], ["colspan", "5"], [1, "empty-state"], [1, "fas", "fa-clipboard-check"], [1, "detail-panel-overlay", 3, "click"], [1, "detail-panel", 3, "click"], [1, "panel-header"], [1, "fas", 3, "ngClass"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], ["class", "panel-body", 4, "ngIf"], [1, "panel-body"], [1, "detail-section"], [1, "detail-value"], [1, "detail-row"], [1, "owner-avatar", "small"], [1, "detail-progress"], [1, "detail-progress-track"], [1, "detail-progress-fill", 3, "ngClass"], [1, "detail-progress-text"], ["class", "detail-section", 4, "ngIf"], [1, "panel-actions"], ["class", "btn-action primary full", 3, "click", 4, "ngIf"], [1, "btn-action", "secondary", "full", 3, "click"], [1, "detail-value", "desc"], [1, "btn-action", "primary", "full", 3, "click"], [1, "fas", "fa-check"]], template: function TreatmentPlansComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function TreatmentPlansComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Plans de traitement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Planifier les r\u00E9ponses, suivre l'ex\u00E9cution et mesurer l'efficacit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function TreatmentPlansComponent_Template_button_click_12_listener() { return ctx.loadPlans(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Rafra\u00EEchir ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 9);
        i0.ɵɵelementStart(16, "div", 10);
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelement(18, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "span", 14);
        i0.ɵɵtext(22, "Total des plans");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "div", 15);
        i0.ɵɵelementStart(24, "div", 11);
        i0.ɵɵelement(25, "i", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "span", 14);
        i0.ɵɵtext(29, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "div", 17);
        i0.ɵɵelementStart(31, "div", 11);
        i0.ɵɵelement(32, "i", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "span", 13);
        i0.ɵɵtext(34);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "span", 14);
        i0.ɵɵtext(36, "En retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 19);
        i0.ɵɵelementStart(38, "div", 11);
        i0.ɵɵelement(39, "i", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "span", 13);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "span", 14);
        i0.ɵɵtext(43, "Termin\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(44, TreatmentPlansComponent_div_44_Template, 20, 6, "div", 21);
        i0.ɵɵelementStart(45, "div", 22);
        i0.ɵɵelementStart(46, "div", 23);
        i0.ɵɵelementStart(47, "h3");
        i0.ɵɵelement(48, "i", 24);
        i0.ɵɵtext(49, " Suivi des ex\u00E9cutions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "div", 25);
        i0.ɵɵelementStart(51, "table");
        i0.ɵɵelementStart(52, "thead");
        i0.ɵɵelementStart(53, "tr");
        i0.ɵɵelementStart(54, "th");
        i0.ɵɵtext(55, "Plan d'action");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "th");
        i0.ɵɵtext(57, "Responsable");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "th");
        i0.ɵɵtext(59, "Progression");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "th");
        i0.ɵɵtext(61, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "th", 26);
        i0.ɵɵtext(63, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "tbody");
        i0.ɵɵtemplate(65, TreatmentPlansComponent_tr_65_Template, 25, 19, "tr", 27);
        i0.ɵɵtemplate(66, TreatmentPlansComponent_tr_66_Template, 6, 0, "tr", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(67, TreatmentPlansComponent_div_67_Template, 9, 3, "div", 29);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(20);
        i0.ɵɵtextInterpolate(ctx.metrics.total);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.metrics.enCours);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.metrics.enRetard);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.metrics.termines);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.metrics.total > 0);
        i0.ɵɵadvance(21);
        i0.ɵɵproperty("ngForOf", ctx.plans);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.plans.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailPanel);
    } }, directives: [i3.NgIf, i3.NgForOf, i3.NgClass], pipes: [i3.DatePipe], styles: [".treatment-plans-page[_ngcontent-%COMP%] {\n  animation: fadeIn 0.5s ease-out;\n}\n\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e0e0e0;\n\n  .header-left {\n    display: flex;\n    align-items: center;\n    gap: 15px;\n\n    h1 {\n      margin: 0;\n      color: #004a99;\n      font-size: 24px;\n      font-family: 'Montserrat', sans-serif;\n      font-weight: 700;\n      i { color: #3b82f6; margin-right: 8px; }\n    }\n    p { margin: 5px 0 0 0; color: #666; font-size: 14px; }\n  }\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  width: 38px; height: 38px;\n  border-radius: 50%;\n  border: 1px solid #e0e0e0;\n  background: white;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  color: #004a99;\n  transition: all 0.2s;\n  &:hover { background: #004a99; color: white; border-color: #004a99; }\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 10px 22px;\n  border-radius: 10px;\n  font-weight: 600;\n  font-size: 14px;\n  border: none;\n  cursor: pointer;\n  display: flex; align-items: center; gap: 8px;\n  transition: all 0.2s;\n  &.primary {\n    background: #004a99; color: white;\n    &:hover { background: #003366; box-shadow: 0 4px 12px rgba(0,74,153,0.2); }\n  }\n  &.secondary {\n    background: #f8f9fa; color: #444; border: 1px solid #ddd;\n    &:hover { background: #e9ecef; }\n  }\n}\n\n\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n  margin-bottom: 30px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 22px;\n  text-align: center;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.03);\n  border: 1px solid rgba(0,0,0,0.04);\n  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n\n  &:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }\n\n  .kpi-icon {\n    width: 50px; height: 50px;\n    border-radius: 14px;\n    display: flex; align-items: center; justify-content: center;\n    font-size: 1.4rem;\n    margin-bottom: 4px;\n  }\n\n  .kpi-value { font-size: 2rem; font-weight: 800; color: #1e293b; }\n  .kpi-label { font-size: 0.85rem; color: #666; font-weight: 500; }\n\n  &.kpi-total {\n    .kpi-icon { background: rgba(59,130,246,0.1); color: #3b82f6; }\n    border-top: 3px solid #3b82f6;\n  }\n  &.kpi-progress {\n    .kpi-icon { background: rgba(99,102,241,0.1); color: #6366f1; }\n    border-top: 3px solid #6366f1;\n  }\n  &.kpi-danger {\n    .kpi-icon { background: rgba(239,68,68,0.1); color: #ef4444; }\n    border-top: 3px solid #ef4444;\n  }\n  &.kpi-closed {\n    .kpi-icon { background: rgba(16,185,129,0.1); color: #10b981; }\n    border-top: 3px solid #10b981;\n  }\n}\n\n\n.stats-card[_ngcontent-%COMP%] {\n  padding: 25px !important;\n  margin-bottom: 25px;\n\n  .stats-header {\n    h3 {\n      margin: 0 0 20px 0; font-size: 1.15rem; font-weight: 700; color: #1a1a1a;\n      i { color: #c5a059; margin-right: 10px; }\n    }\n  }\n}\n\n.progress-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 30px;\n}\n\n.progress-item[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 14px;\n\n  .progress-title { font-size: 0.9rem; color: #64748b; font-weight: 600; min-width: 160px; }\n\n  .progress-track {\n    flex: 1; height: 10px; background: #f1f5f9; border-radius: 10px; overflow: hidden;\n  }\n\n  .progress-fill {\n    height: 100%;\n    border-radius: 10px;\n    transition: width 0.8s cubic-bezier(0.4,0,0.2,1);\n    &.success { background: linear-gradient(90deg, #10b981, #34d399); }\n    &.danger { background: linear-gradient(90deg, #ef4444, #f87171); }\n  }\n\n  .progress-value { font-size: 0.95rem; font-weight: 800; color: #1e293b; min-width: 45px; text-align: right; }\n}\n\n\n.full-width-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 0;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.03);\n  border: 1px solid rgba(0,0,0,0.04);\n  overflow: hidden;\n}\n\n.card-header-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 25px;\n  background: #f8fafc;\n  border-bottom: 1px solid #edf2f7;\n\n  h3 {\n    margin: 0; font-size: 1.1rem; font-weight: 700; color: #1a1a1a;\n    i { color: #c5a059; margin-right: 10px; }\n  }\n}\n\n.table-container[_ngcontent-%COMP%] { overflow-x: auto; }\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n\n  thead {\n    th {\n      padding: 14px 20px;\n      font-size: 0.8rem;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      color: #64748b;\n      font-weight: 700;\n      text-align: left;\n      background: #f8fafc;\n      border-bottom: 2px solid #edf2f7;\n      &.text-right { text-align: right; }\n    }\n  }\n\n  tbody {\n    tr {\n      transition: all 0.2s;\n      border-bottom: 1px solid #f1f5f9;\n\n      &:hover { background: #f8fafc; }\n      &:last-child { border-bottom: none; }\n    }\n\n    td {\n      padding: 16px 20px;\n      vertical-align: middle;\n      font-size: 0.9rem;\n      color: #334155;\n      &.text-right { text-align: right; }\n    }\n  }\n}\n\n.plan-name[_ngcontent-%COMP%] { font-weight: 600; color: #1e293b; }\n\n.owner-cell[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 10px;\n}\n\n.owner-avatar[_ngcontent-%COMP%] {\n  width: 32px; height: 32px;\n  border-radius: 10px;\n  background: rgba(59,130,246,0.1);\n  color: #3b82f6;\n  font-weight: 700; font-size: 0.85rem;\n  display: flex; align-items: center; justify-content: center;\n}\n\n.progress-cell[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 12px;\n}\n\n.mini-progress-track[_ngcontent-%COMP%] {\n  flex: 1; height: 8px; background: #f1f5f9; border-radius: 8px; overflow: hidden; min-width: 80px;\n}\n\n.mini-progress-fill[_ngcontent-%COMP%] {\n  height: 100%; border-radius: 8px;\n  transition: width 0.8s cubic-bezier(0.4,0,0.2,1);\n  &.success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &.primary { background: linear-gradient(90deg, #3b82f6, #60a5fa); }\n  &.danger { background: linear-gradient(90deg, #ef4444, #f87171); }\n}\n\n.progress-text[_ngcontent-%COMP%] { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }\n\n.status-badge[_ngcontent-%COMP%] {\n  padding: 5px 14px;\n  border-radius: 20px;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  display: inline-block;\n\n  &.badge-success { background: rgba(16,185,129,0.1); color: #10b981; }\n  &.badge-primary { background: rgba(59,130,246,0.1); color: #3b82f6; }\n  &.badge-danger { background: rgba(239,68,68,0.1); color: #ef4444; }\n}\n\n.table-actions[_ngcontent-%COMP%] {\n  display: flex; gap: 8px; justify-content: flex-end;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px; height: 34px;\n  border-radius: 10px;\n  border: none;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n\n  &.primary { background: rgba(99,102,241,0.1); color: #6366f1; &:hover { background: #6366f1; color: white; } }\n  &.secondary { background: #f1f5f9; color: #64748b; &:hover { background: #e2e8f0; color: #334155; } }\n}\n\n\n.empty-state[_ngcontent-%COMP%] {\n  padding: 60px 20px;\n  text-align: center;\n  color: #94a3b8;\n  i { font-size: 3rem; color: #cbd5e1; margin-bottom: 15px; }\n  p { font-size: 1rem; }\n}\n\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n\n@media (max-width: 768px) {\n  .kpi-row[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n  .progress-row[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .page-header[_ngcontent-%COMP%] { flex-direction: column; align-items: flex-start; gap: 15px; }\n}\n\n\n.row-selected[_ngcontent-%COMP%] {\n  background: rgba(99,102,241,0.04) !important;\n  border-left: 3px solid #6366f1;\n}\n\n\n.detail-panel-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.4);\n  z-index: 1000;\n  display: flex;\n  justify-content: flex-end;\n  animation: fadeIn 0.2s ease-out;\n}\n\n.detail-panel[_ngcontent-%COMP%] {\n  width: 480px;\n  max-width: 90vw;\n  height: 100vh;\n  background: white;\n  box-shadow: -10px 0 30px rgba(0,0,0,0.1);\n  animation: slideInRight 0.3s ease-out;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n}\n\n@keyframes slideInRight {\n  from { transform: translateX(100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 25px 30px;\n  border-bottom: 1px solid #edf2f7;\n  background: #f8fafc;\n\n  h3 {\n    margin: 0; font-size: 1.15rem; font-weight: 700; color: #1e293b;\n    i { color: #6366f1; margin-right: 10px; }\n  }\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px; height: 36px;\n  border-radius: 50%;\n  border: 1px solid #e2e8f0;\n  background: white;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  &:hover { background: #ef4444; color: white; border-color: #ef4444; }\n}\n\n.panel-body[_ngcontent-%COMP%] {\n  padding: 30px;\n  flex: 1;\n}\n\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 22px;\n\n  label {\n    display: block;\n    font-size: 0.78rem;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    color: #94a3b8;\n    font-weight: 700;\n    margin-bottom: 6px;\n  }\n\n  .detail-value {\n    margin: 0;\n    font-size: 0.95rem;\n    color: #1e293b;\n    font-weight: 500;\n    line-height: 1.5;\n\n    &.desc {\n      color: #64748b;\n      font-weight: 400;\n      background: #f8fafc;\n      padding: 12px;\n      border-radius: 8px;\n      border: 1px solid #e2e8f0;\n    }\n  }\n}\n\n.detail-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n\n.owner-avatar.small[_ngcontent-%COMP%] {\n  width: 24px; height: 24px;\n  font-size: 0.7rem;\n  display: inline-flex;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n\n.detail-progress[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 14px;\n}\n\n.detail-progress-track[_ngcontent-%COMP%] {\n  flex: 1; height: 10px; background: #f1f5f9; border-radius: 10px; overflow: hidden;\n}\n\n.detail-progress-fill[_ngcontent-%COMP%] {\n  height: 100%; border-radius: 10px;\n  transition: width 0.8s cubic-bezier(0.4,0,0.2,1);\n  &.success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &.primary { background: linear-gradient(90deg, #3b82f6, #60a5fa); }\n  &.danger { background: linear-gradient(90deg, #ef4444, #f87171); }\n}\n\n.detail-progress-text[_ngcontent-%COMP%] {\n  font-size: 1rem; font-weight: 800; color: #1e293b; min-width: 45px;\n}\n\n.panel-actions[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n\n  .btn-action.full {\n    width: 100%;\n    justify-content: center;\n    padding: 14px;\n    font-size: 0.95rem;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreatmentPlansComponent, [{
        type: Component,
        args: [{
                selector: 'app-treatment-plans',
                templateUrl: './treatment-plans.component.html',
                styleUrls: ['./treatment-plans.component.scss'],
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=treatment-plans.component.js.map