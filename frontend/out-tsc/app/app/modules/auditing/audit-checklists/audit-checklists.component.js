import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuditingService } from '../../../core/services/auditing.service';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function AuditChecklistsComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 43);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function AuditChecklistsComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 41);
    i0.ɵɵtemplate(1, AuditChecklistsComponent_nav_11_a_1_Template, 2, 4, "a", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditChecklistsComponent_div_12_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.feedback);
} }
function AuditChecklistsComponent_div_12_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r8.error);
} }
function AuditChecklistsComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtemplate(1, AuditChecklistsComponent_div_12_p_1_Template, 2, 1, "p", 45);
    i0.ɵɵtemplate(2, AuditChecklistsComponent_div_12_p_2_Template, 2, 1, "p", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.feedback);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.error);
} }
function AuditChecklistsComponent_small_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.importFile.name);
} }
function AuditChecklistsComponent_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun plan d'actions d'audit disponible.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditChecklistsComponent_div_104_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 53);
    i0.ɵɵelementStart(1, "div", 54);
    i0.ɵɵelementStart(2, "div", 55);
    i0.ɵɵelementStart(3, "span", 56);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 57);
    i0.ɵɵelementStart(8, "span", 58);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 59);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 60);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 61);
    i0.ɵɵelementStart(15, "label", 23);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Ordre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 24);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_104_article_1_Template_input_ngModelChange_18_listener($event) { const item_r10 = ctx.$implicit; return item_r10.ordre = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 23);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 26);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_104_article_1_Template_input_ngModelChange_22_listener($event) { const item_r10 = ctx.$implicit; return item_r10.responsabilites = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 23);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 33);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_104_article_1_Template_input_ngModelChange_26_listener($event) { const item_r10 = ctx.$implicit; return item_r10.delai = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "label", 23);
    i0.ɵɵelementStart(28, "span");
    i0.ɵɵtext(29, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 26);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_104_article_1_Template_select_ngModelChange_30_listener($event) { const item_r10 = ctx.$implicit; return item_r10.statut = $event; });
    i0.ɵɵelementStart(31, "option", 34);
    i0.ɵɵtext(32, "A venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 35);
    i0.ɵɵtext(34, "En cours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 36);
    i0.ɵɵtext(36, "Termin\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 37);
    i0.ɵɵtext(38, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 62);
    i0.ɵɵelementStart(40, "button", 63);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_104_article_1_Template_button_click_40_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const item_r10 = restoredCtx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.saveRow(item_r10); });
    i0.ɵɵtext(41, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 64);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_104_article_1_Template_button_click_42_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const item_r10 = restoredCtx.$implicit; const ctx_r17 = i0.ɵɵnextContext(2); return ctx_r17.deleteRow(item_r10); });
    i0.ɵɵtext(43, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Code ", item_r10.code || item_r10.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.regleDnssi || item_r10.titre);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r10.horizon || "Non d\u00E9fini");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Priorit\u00E9 ", item_r10.priorite || "-", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r10.recommandations || item_r10.objectifs, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", item_r10.ordre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", item_r10.responsabilites);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", item_r10.delai);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", item_r10.statut);
} }
function AuditChecklistsComponent_div_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, AuditChecklistsComponent_div_104_article_1_Template, 44, 9, "article", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.planItems);
} }
export class AuditChecklistsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.planItems = [];
        this.isLoading = false;
        this.isSaving = false;
        this.importFile = null;
        this.feedback = '';
        this.error = '';
        this.newItem = this.createEmptyItem();
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadPlan();
    }
    loadPlan() {
        this.isLoading = true;
        this.auditingService.getActionPlans().subscribe({
            next: (items) => {
                this.planItems = items.map((item) => this.normalizeItem(item));
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.planItems = [];
                this.isLoading = false;
                this.error = 'Impossible de charger les plans d actions.';
            }
        });
    }
    saveNewItem() {
        var _a, _b;
        if (!((_a = this.newItem.regleDnssi) === null || _a === void 0 ? void 0 : _a.trim()) || !((_b = this.newItem.recommandations) === null || _b === void 0 ? void 0 : _b.trim())) {
            this.error = 'La règle DNSSI et les recommandations sont obligatoires.';
            return;
        }
        this.isSaving = true;
        this.auditingService.createActionPlan(this.newItem).subscribe({
            next: () => {
                this.newItem = this.createEmptyItem();
                this.feedback = 'Plan d actions ajouté avec succès.';
                this.error = '';
                this.isSaving = false;
                this.loadPlan();
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.isSaving = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de l ajout.';
            }
        });
    }
    saveRow(item) {
        this.isSaving = true;
        this.auditingService.updateActionPlan(item.id, {
            code: item.code || null,
            titre: item.titre,
            ordre: item.ordre || 0,
            regleDnssi: item.regleDnssi || item.titre,
            recommandations: item.recommandations || item.objectifs || '',
            horizon: item.horizon,
            priorite: item.priorite,
            responsableId: item.auditeurId || null,
            responsableNom: item.responsabilites || '',
            echeance: item.delai ? String(item.delai) : null,
            riskId: item.riskId || null,
            etatAvancement: item.statut
        }).subscribe({
            next: (updated) => {
                Object.assign(item, this.normalizeItem(updated));
                this.feedback = 'Plan d actions mis à jour.';
                this.error = '';
                this.isSaving = false;
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.isSaving = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de la mise à jour.';
            }
        });
    }
    deleteRow(item) {
        if (!window.confirm(`Supprimer le plan ${item.code || item.titre} ?`)) {
            return;
        }
        this.auditingService.deleteActionPlan(item.id).subscribe({
            next: () => {
                this.planItems = this.planItems.filter((entry) => entry.id !== item.id);
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de la suppression.';
            }
        });
    }
    onFileSelected(event) {
        var _a;
        const input = event.target;
        this.importFile = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    }
    importExcel() {
        if (!this.importFile) {
            return;
        }
        this.isSaving = true;
        this.auditingService.importActionPlans(this.importFile).subscribe({
            next: (items) => {
                this.planItems = items.map((item) => this.normalizeItem(item));
                this.importFile = null;
                this.feedback = 'Import Excel terminé avec succès.';
                this.error = '';
                this.isSaving = false;
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.isSaving = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de l import Excel.';
            }
        });
    }
    createEmptyItem() {
        return {
            ordre: 0,
            regleDnssi: '',
            recommandations: '',
            horizon: 'court_terme',
            priorite: 1,
            responsableNom: '',
            echeance: '',
            etatAvancement: 'a_venir'
        };
    }
    normalizeItem(item) {
        return Object.assign(Object.assign({}, item), { delai: item.delai ? new Date(item.delai).toISOString().slice(0, 10) : null });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
AuditChecklistsComponent.ɵfac = function AuditChecklistsComponent_Factory(t) { return new (t || AuditChecklistsComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditChecklistsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditChecklistsComponent, selectors: [["app-audit-checklists"]], decls: 105, vars: 18, consts: [[1, "audit-page", "senior-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-list-check"], ["class", "audit-tabs", 4, "ngIf"], ["class", "feedback-card", 4, "ngIf"], [1, "layout-grid"], [1, "panel", "mission-panel"], [1, "panel-head"], [1, "import-box"], [1, "field"], ["type", "file", "accept", ".xlsx,.xls", 3, "change"], ["class", "file-hint", 4, "ngIf"], [1, "btn-primary", 3, "disabled", "click"], [1, "mission-summary"], [1, "summary-label"], [1, "panel", "content-panel"], [1, "panel-head", "hero-head"], [1, "composer-card"], [1, "composer-head"], [1, "form-grid"], [1, "field", "compact"], ["type", "number", 3, "ngModel", "ngModelChange"], ["placeholder", "POL-RISQUE", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange"], ["value", "court_terme"], ["value", "moyen_terme"], ["value", "long_terme"], [1, "field", "field-wide"], ["rows", "4", "placeholder", "D\u00E9crivez l'action ou la recommandation \u00E0 mettre en \u0153uvre.", 3, "ngModel", "ngModelChange"], ["placeholder", "Nom du responsable", 3, "ngModel", "ngModelChange"], ["type", "date", 3, "ngModel", "ngModelChange"], ["value", "a_venir"], ["value", "en_cours"], ["value", "termine"], ["value", "en_retard"], [1, "panel-head", "section-head"], ["class", "empty-state", 4, "ngIf"], ["class", "action-plan-list", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "feedback-card"], ["class", "success", 4, "ngIf"], ["class", "error", 4, "ngIf"], [1, "success"], [1, "error"], [1, "file-hint"], [1, "empty-state"], [1, "action-plan-list"], ["class", "action-card", 4, "ngFor", "ngForOf"], [1, "action-card"], [1, "action-card-head"], [1, "action-title"], [1, "rule-kicker"], [1, "action-badges"], [1, "badge", "horizon"], [1, "badge", "priority"], [1, "recommendation-box"], [1, "editor-grid"], [1, "row-actions"], [1, "btn-secondary", 3, "click"], [1, "btn-danger", 3, "click"]], template: function AuditChecklistsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditChecklistsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Plans d'actions d'audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "G\u00E9rez directement les plans d'actions d'audit autonomes, sans rattachement obligatoire \u00E0 une mission.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditChecklistsComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵtemplate(12, AuditChecklistsComponent_div_12_Template, 3, 2, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "aside", 9);
        i0.ɵɵelementStart(15, "div", 10);
        i0.ɵɵelementStart(16, "h2");
        i0.ɵɵtext(17, "Import Excel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "p");
        i0.ɵɵtext(19, "Chargez un fichier DNSSI pour cr\u00E9er plusieurs plans d'actions d'un coup.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 11);
        i0.ɵɵelementStart(21, "label", 12);
        i0.ɵɵelementStart(22, "span");
        i0.ɵɵtext(23, "Importer Excel DNSSI");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "input", 13);
        i0.ɵɵlistener("change", function AuditChecklistsComponent_Template_input_change_24_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(25, AuditChecklistsComponent_small_25_Template, 2, 1, "small", 14);
        i0.ɵɵelementStart(26, "button", 15);
        i0.ɵɵlistener("click", function AuditChecklistsComponent_Template_button_click_26_listener() { return ctx.importExcel(); });
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "div", 16);
        i0.ɵɵelementStart(29, "span", 17);
        i0.ɵɵtext(30, "Total");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "strong");
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "small");
        i0.ɵɵtext(34, "Plans d'actions d'audit actuellement disponibles.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "section", 18);
        i0.ɵɵelementStart(36, "div", 19);
        i0.ɵɵelementStart(37, "div");
        i0.ɵɵelementStart(38, "h2");
        i0.ɵɵtext(39, "Nouveau plan d'actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "p");
        i0.ɵɵtext(41, "Ajoutez une action autonome directement dans le registre d'audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "div", 20);
        i0.ɵɵelementStart(43, "div", 21);
        i0.ɵɵelementStart(44, "div");
        i0.ɵɵelementStart(45, "h3");
        i0.ɵɵtext(46, "Cr\u00E9ation manuelle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "p");
        i0.ɵɵtext(48, "Chaque ligne cr\u00E9e un nouvel enregistrement autonome dans `audit_missions`.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "button", 15);
        i0.ɵɵlistener("click", function AuditChecklistsComponent_Template_button_click_49_listener() { return ctx.saveNewItem(); });
        i0.ɵɵtext(50, "Cr\u00E9er le plan");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "div", 22);
        i0.ɵɵelementStart(52, "label", 23);
        i0.ɵɵelementStart(53, "span");
        i0.ɵɵtext(54, "Ordre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "input", 24);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_input_ngModelChange_55_listener($event) { return ctx.newItem.ordre = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "label", 23);
        i0.ɵɵelementStart(57, "span");
        i0.ɵɵtext(58, "R\u00E8gle DNSSI");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "input", 25);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_input_ngModelChange_59_listener($event) { return ctx.newItem.regleDnssi = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "label", 23);
        i0.ɵɵelementStart(61, "span");
        i0.ɵɵtext(62, "Horizon");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "select", 26);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_select_ngModelChange_63_listener($event) { return ctx.newItem.horizon = $event; });
        i0.ɵɵelementStart(64, "option", 27);
        i0.ɵɵtext(65, "Court terme");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "option", 28);
        i0.ɵɵtext(67, "Moyen terme");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "option", 29);
        i0.ɵɵtext(69, "Long terme");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "label", 23);
        i0.ɵɵelementStart(71, "span");
        i0.ɵɵtext(72, "Priorit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "input", 24);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_input_ngModelChange_73_listener($event) { return ctx.newItem.priorite = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(74, "label", 30);
        i0.ɵɵelementStart(75, "span");
        i0.ɵɵtext(76, "Recommandations");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "textarea", 31);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_textarea_ngModelChange_77_listener($event) { return ctx.newItem.recommandations = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "label", 23);
        i0.ɵɵelementStart(79, "span");
        i0.ɵɵtext(80, "Responsable");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(81, "input", 32);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_input_ngModelChange_81_listener($event) { return ctx.newItem.responsableNom = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "label", 23);
        i0.ɵɵelementStart(83, "span");
        i0.ɵɵtext(84, "Ech\u00E9ance");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(85, "input", 33);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_input_ngModelChange_85_listener($event) { return ctx.newItem.echeance = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(86, "label", 23);
        i0.ɵɵelementStart(87, "span");
        i0.ɵɵtext(88, "Etat d'avancement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(89, "select", 26);
        i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_Template_select_ngModelChange_89_listener($event) { return ctx.newItem.etatAvancement = $event; });
        i0.ɵɵelementStart(90, "option", 34);
        i0.ɵɵtext(91, "A venir");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(92, "option", 35);
        i0.ɵɵtext(93, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(94, "option", 36);
        i0.ɵɵtext(95, "Termin\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(96, "option", 37);
        i0.ɵɵtext(97, "En retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(98, "div", 38);
        i0.ɵɵelementStart(99, "h2");
        i0.ɵɵtext(100, "Registre des plans");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(101, "p");
        i0.ɵɵtext(102);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(103, AuditChecklistsComponent_div_103_Template, 3, 0, "div", 39);
        i0.ɵɵtemplate(104, AuditChecklistsComponent_div_104_Template, 2, 1, "div", 40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedback || ctx.error);
        i0.ɵɵadvance(13);
        i0.ɵɵproperty("ngIf", ctx.importFile);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.importFile || ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSaving ? "Import..." : "Importer le plan", " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.planItems.length, " plan(s)");
        i0.ɵɵadvance(17);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.newItem.ordre);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.regleDnssi);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.horizon);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngModel", ctx.newItem.priorite);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.recommandations);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.responsableNom);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.echeance);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.newItem.etatAvancement);
        i0.ɵɵadvance(13);
        i0.ɵɵtextInterpolate1("", ctx.planItems.length, " plan(s) d'actions suivis");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.planItems.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.planItems.length > 0);
    } }, directives: [i3.NgIf, i4.NumberValueAccessor, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], styles: ["@import '../audit-shared';\n\n.audit-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.feedback-card[_ngcontent-%COMP%], .panel[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 18px;\n  padding: 1.15rem 1.25rem;\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);\n}\n\n.feedback-card[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%] {\n  color: #0f766e;\n}\n\n.feedback-card[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.layout-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 340px minmax(0, 1fr);\n  gap: 1.5rem;\n  align-items: start;\n}\n\n.mission-panel[_ngcontent-%COMP%], .content-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.mission-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n\n.panel-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .panel-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.panel-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin-top: 0.35rem;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #334155;\n}\n\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  padding: 0.7rem 0.8rem;\n  font: inherit;\n  box-sizing: border-box;\n}\n\n.compact[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .compact[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .compact[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.65rem 0.75rem;\n}\n\n.mission-summary[_ngcontent-%COMP%] {\n  border: 1px solid #dbeafe;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #eff6ff 0%, #f8fbff 100%);\n  padding: 0.95rem 1rem;\n}\n\n.summary-label[_ngcontent-%COMP%], .mission-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .mission-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  margin-bottom: 0.25rem;\n}\n\n.mission-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n\n.mission-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #475569;\n  margin-top: 0.3rem;\n}\n\n.import-box[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.file-hint[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.82rem;\n  word-break: break-word;\n}\n\n.hero-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  padding-bottom: 0.25rem;\n}\n\n.hero-meta[_ngcontent-%COMP%] {\n  min-width: 170px;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);\n  border: 1px solid #dbeafe;\n}\n\n.meta-label[_ngcontent-%COMP%] {\n  display: block;\n  color: #64748b;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  margin-bottom: 0.25rem;\n}\n\n.composer-card[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 18px;\n  padding: 1rem;\n  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);\n}\n\n.composer-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n\n.composer-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .composer-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.composer-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  color: #64748b;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.field-wide[_ngcontent-%COMP%] {\n  grid-column: span 4;\n}\n\n.actions-row[_ngcontent-%COMP%], .row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.actions-row[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  margin-top: 1rem;\n}\n\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%], .btn-danger[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 10px;\n  padding: 0.72rem 1rem;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: #004a99;\n  color: #fff;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #0f172a;\n}\n\n.btn-danger[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.section-head[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n\n.action-plan-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.action-card[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 18px;\n  padding: 1rem;\n  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);\n}\n\n.action-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 0.9rem;\n}\n\n.rule-kicker[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #64748b;\n  margin-bottom: 0.25rem;\n}\n\n.action-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #0f172a;\n  font-size: 1.2rem;\n}\n\n.action-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 0.4rem 0.75rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.badge.horizon[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n\n.badge.priority[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n\n.recommendation-box[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.65;\n  color: #1e293b;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 0.95rem 1rem;\n  margin-bottom: 1rem;\n}\n\n.editor-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.9rem;\n  margin-bottom: 0.9rem;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n  padding: 1.5rem 0;\n}\n\n.empty-stage[_ngcontent-%COMP%] {\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.empty-stage[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #94a3b8;\n}\n\n.empty-stage[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .empty-stage[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n@media (max-width: 1180px) {\n  .form-grid[_ngcontent-%COMP%], .editor-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .field-wide[_ngcontent-%COMP%] {\n    grid-column: span 2;\n  }\n}\n\n@media (max-width: 960px) {\n  .layout-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .mission-panel[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n\n@media (max-width: 640px) {\n  .form-grid[_ngcontent-%COMP%], .editor-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .field-wide[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n\n  .action-card-head[_ngcontent-%COMP%], .row-actions[_ngcontent-%COMP%], .composer-head[_ngcontent-%COMP%], .hero-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .hero-meta[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditChecklistsComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-checklists',
                templateUrl: './audit-checklists.component.html',
                styleUrls: ['./audit-checklists.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-checklists.component.js.map