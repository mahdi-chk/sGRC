import { Component } from '@angular/core';
import { AuditingService } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function AuditorChecklistComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r4.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function AuditorChecklistComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 10);
    i0.ɵɵtemplate(1, AuditorChecklistComponent_nav_11_a_1_Template, 2, 4, "a", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorChecklistComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "i", 14);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun plan d'actions assign\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_div_14_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "span", 19);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 20);
    i0.ɵɵelementStart(8, "span", 21);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 22);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 23);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 24);
    i0.ɵɵelementStart(15, "label", 25);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 26);
    i0.ɵɵlistener("ngModelChange", function AuditorChecklistComponent_div_14_article_1_Template_input_ngModelChange_18_listener($event) { const item_r6 = ctx.$implicit; return item_r6.responsabilites = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 25);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 27);
    i0.ɵɵlistener("ngModelChange", function AuditorChecklistComponent_div_14_article_1_Template_input_ngModelChange_22_listener($event) { const item_r6 = ctx.$implicit; return item_r6.delai = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 25);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "select", 26);
    i0.ɵɵlistener("ngModelChange", function AuditorChecklistComponent_div_14_article_1_Template_select_ngModelChange_26_listener($event) { const item_r6 = ctx.$implicit; return item_r6.statut = $event; });
    i0.ɵɵelementStart(27, "option", 28);
    i0.ɵɵtext(28, "A venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 29);
    i0.ɵɵtext(30, "En cours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "option", 30);
    i0.ɵɵtext(32, "Termin\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 31);
    i0.ɵɵtext(34, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 32);
    i0.ɵɵelementStart(36, "button", 33);
    i0.ɵɵlistener("click", function AuditorChecklistComponent_div_14_article_1_Template_button_click_36_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const item_r6 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.saveItem(item_r6); });
    i0.ɵɵtext(37, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Code ", item_r6.code || item_r6.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.regleDnssi || item_r6.titre);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.horizon || "Non d\u00E9fini");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Priorit\u00E9 ", item_r6.priorite || "-", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r6.recommandations || item_r6.objectifs, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", item_r6.responsabilites);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", item_r6.delai);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", item_r6.statut);
} }
function AuditorChecklistComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtemplate(1, AuditorChecklistComponent_div_14_article_1_Template, 38, 8, "article", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.actionPlans);
} }
export class AuditorChecklistComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.actionPlans = [];
        this.isLoading = false;
        this.currentUserRole = getStoredAuditRole();
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadActionPlans();
    }
    loadActionPlans() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.router.navigate(['/login']);
            return;
        }
        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);
        this.currentUserRole = currentUser.role || null;
        this.auditingService.getActionPlans().subscribe({
            next: (data) => {
                this.actionPlans = (this.isSuperAdmin ? data : data.filter((item) => Number(item.auditeurId) === userId))
                    .map((item) => (Object.assign(Object.assign({}, item), { delai: item.delai ? new Date(item.delai).toISOString().slice(0, 10) : null })));
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    saveItem(item) {
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
            etatAvancement: item.statut
        }).subscribe({
            next: (updatedItem) => {
                Object.assign(item, Object.assign(Object.assign({}, updatedItem), { delai: updatedItem.delai ? new Date(updatedItem.delai).toISOString().slice(0, 10) : null }));
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la mise à jour.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    get isSuperAdmin() {
        return this.currentUserRole === UserRole.SUPER_ADMIN;
    }
}
AuditorChecklistComponent.ɵfac = function AuditorChecklistComponent_Factory(t) { return new (t || AuditorChecklistComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditorChecklistComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorChecklistComponent, selectors: [["app-auditor-checklist"]], decls: 15, vars: 4, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-list-check"], ["class", "audit-tabs", 4, "ngIf"], [1, "main-content", "card"], ["class", "empty-checklist", 4, "ngIf"], ["class", "action-plan-list", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "empty-checklist"], [1, "fas", "fa-list-ul"], [1, "action-plan-list"], ["class", "action-card", 4, "ngFor", "ngForOf"], [1, "action-card"], [1, "action-card-head"], [1, "rule-kicker"], [1, "action-badges"], [1, "badge", "horizon"], [1, "badge", "priority"], [1, "recommendation-box"], [1, "action-editor"], [1, "editor-field"], [3, "ngModel", "ngModelChange"], ["type", "date", 3, "ngModel", "ngModelChange"], ["value", "a_venir"], ["value", "en_cours"], ["value", "termine"], ["value", "en_retard"], [1, "editor-actions"], [1, "btn-save", 3, "click"]], template: function AuditorChecklistComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditorChecklistComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Renseignez l'avancement, le responsable et l'\u00E9ch\u00E9ance de vos plans d'actions d'audit autonomes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditorChecklistComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "section", 7);
        i0.ɵɵtemplate(13, AuditorChecklistComponent_div_13_Template, 4, 0, "div", 8);
        i0.ɵɵtemplate(14, AuditorChecklistComponent_div_14_Template, 2, 1, "div", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.isSuperAdmin ? "Plans d actions d audit" : "Mes Plans d actions", "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.actionPlans.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.actionPlans.length > 0);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption], styles: ["@import '../audit-shared';\r\n\r\n.dual-layout[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 320px minmax(0, 1fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n  background: #fff;\r\n  border-radius: 18px;\r\n  border: 1px solid #e2e8f0;\r\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);\r\n}\r\n\r\n.sidebar-list[_ngcontent-%COMP%] {\r\n  overflow: hidden;\r\n}\r\n\r\n.list-header[_ngcontent-%COMP%] {\r\n  padding: 1.1rem 1.25rem;\r\n  border-bottom: 1px solid #e2e8f0;\r\n}\r\n\r\n.list-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #0f172a;\r\n}\r\n\r\n.item-list[_ngcontent-%COMP%] {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.item-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.8rem;\r\n  padding: 1rem 1.25rem;\r\n  border-bottom: 1px solid #f1f5f9;\r\n  cursor: pointer;\r\n  transition: background 0.2s ease, transform 0.2s ease;\r\n}\r\n\r\n.item-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\r\n  background: #f8fbff;\r\n}\r\n\r\n.item-list[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #eff6ff 0%, #f8fbff 100%);\r\n  border-left: 4px solid #004a99;\r\n}\r\n\r\n.item-icon[_ngcontent-%COMP%] {\r\n  color: #004a99;\r\n  padding-top: 0.1rem;\r\n}\r\n\r\n.item-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.25rem;\r\n}\r\n\r\n.item-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: #0f172a;\r\n}\r\n\r\n.status-tag[_ngcontent-%COMP%] {\r\n  color: #64748b;\r\n  font-size: 0.8rem;\r\n  text-transform: capitalize;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%] {\r\n  padding: 1.4rem;\r\n}\r\n\r\n.content-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n  margin-bottom: 1.25rem;\r\n  padding-bottom: 1rem;\r\n  border-bottom: 1px solid #eef2f7;\r\n}\r\n\r\n.content-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #0f172a;\r\n}\r\n\r\n.mission-title[_ngcontent-%COMP%] {\r\n  margin: 0.35rem 0 0;\r\n  color: #475569;\r\n  font-size: 1.05rem;\r\n}\r\n\r\n.mission-deadline[_ngcontent-%COMP%] {\r\n  min-width: 170px;\r\n  padding: 0.85rem 1rem;\r\n  border-radius: 14px;\r\n  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);\r\n  border: 1px solid #dbeafe;\r\n}\r\n\r\n.deadline-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font-size: 0.78rem;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.04em;\r\n  color: #64748b;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.action-plan-list[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 1rem;\r\n}\r\n\r\n.action-card[_ngcontent-%COMP%] {\r\n  border: 1px solid #e2e8f0;\r\n  border-radius: 18px;\r\n  padding: 1rem;\r\n  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);\r\n}\r\n\r\n.action-card-head[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n  margin-bottom: 0.9rem;\r\n}\r\n\r\n.rule-kicker[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  font-size: 0.78rem;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.05em;\r\n  color: #64748b;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.action-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #0f172a;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.action-badges[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.55rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  border-radius: 999px;\r\n  padding: 0.4rem 0.75rem;\r\n  font-size: 0.82rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.badge.horizon[_ngcontent-%COMP%] {\r\n  background: #eff6ff;\r\n  color: #1d4ed8;\r\n}\r\n\r\n.badge.priority[_ngcontent-%COMP%] {\r\n  background: #fff7ed;\r\n  color: #c2410c;\r\n}\r\n\r\n.recommendation-box[_ngcontent-%COMP%] {\r\n  white-space: pre-wrap;\r\n  line-height: 1.6;\r\n  color: #1e293b;\r\n  background: #f8fafc;\r\n  border: 1px solid #e2e8f0;\r\n  border-radius: 14px;\r\n  padding: 0.95rem 1rem;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.action-editor[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: minmax(220px, 1.3fr) 170px 170px auto;\r\n  gap: 0.9rem;\r\n  align-items: end;\r\n}\r\n\r\n.editor-field[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.35rem;\r\n}\r\n\r\n.editor-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  color: #475569;\r\n  font-size: 0.85rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.editor-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .editor-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid #cbd5e1;\r\n  border-radius: 10px;\r\n  padding: 0.65rem 0.75rem;\r\n  box-sizing: border-box;\r\n  font: inherit;\r\n}\r\n\r\n.editor-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: end;\r\n}\r\n\r\n.btn-save[_ngcontent-%COMP%] {\r\n  border: none;\r\n  border-radius: 10px;\r\n  padding: 0.72rem 1rem;\r\n  background: #004a99;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n}\r\n\r\n.select-prompt[_ngcontent-%COMP%], .empty-checklist[_ngcontent-%COMP%], .empty-list[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  color: #64748b;\r\n  padding: 2rem 1rem;\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .action-editor[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  }\r\n\r\n  .editor-actions[_ngcontent-%COMP%] {\r\n    grid-column: span 2;\r\n  }\r\n}\r\n\r\n@media (max-width: 960px) {\r\n  .dual-layout[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .content-header[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .action-card-head[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .action-editor[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .editor-actions[_ngcontent-%COMP%] {\r\n    grid-column: span 1;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorChecklistComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-checklist',
                templateUrl: './auditor-checklist.component.html',
                styleUrls: ['./auditor-checklist.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-checklist.component.js.map