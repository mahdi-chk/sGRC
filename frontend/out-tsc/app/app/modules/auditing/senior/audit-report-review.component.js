import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function AuditReportReviewComponent_nav_21_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function AuditReportReviewComponent_nav_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 24);
    i0.ɵɵtemplate(1, AuditReportReviewComponent_nav_21_a_1_Template, 2, 4, "a", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditReportReviewComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "i", 28);
    i0.ɵɵelementEnd();
} }
function AuditReportReviewComponent_li_31_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 29);
    i0.ɵɵlistener("click", function AuditReportReviewComponent_li_31_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r10); const r_r8 = restoredCtx.$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.selectReport(r_r8); });
    i0.ɵɵelementStart(1, "div", 30);
    i0.ɵɵelement(2, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 32);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r2.selectedReport == null ? null : ctx_r2.selectedReport.id) === r_r8.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(r_r8.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Par : ", r_r8.auditeur == null ? null : r_r8.auditeur.prenom, " ", r_r8.auditeur == null ? null : r_r8.auditeur.nom, "");
} }
function AuditReportReviewComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 33);
    i0.ɵɵelementStart(2, "div", 34);
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 35);
    i0.ɵɵelementStart(6, "span", 36);
    i0.ɵɵelement(7, "i", 37);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 38);
    i0.ɵɵelement(11, "i", 39);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 40);
    i0.ɵɵlistener("click", function AuditReportReviewComponent_div_33_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.validateReport(ctx_r11.selectedReport); });
    i0.ɵɵelement(14, "i", 41);
    i0.ɵɵtext(15, " Valider le Rapport ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 42);
    i0.ɵɵelementStart(17, "div", 43);
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵelement(19, "i", 44);
    i0.ɵɵtext(20, " R\u00E9sultats de l'Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 45);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 43);
    i0.ɵɵelementStart(24, "h3");
    i0.ɵɵelement(25, "i", 46);
    i0.ɵɵtext(26, " Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 47);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 43);
    i0.ɵɵelementStart(30, "h3");
    i0.ɵɵelement(31, "i", 48);
    i0.ɵɵtext(32, " Risque Adress\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 49);
    i0.ɵɵelementStart(34, "strong");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span", 50);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.selectedReport.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Mission du ", i0.ɵɵpipeBind2(9, 11, ctx_r3.selectedReport.createdAt, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" Auditeur : ", ctx_r3.selectedReport.auditeur == null ? null : ctx_r3.selectedReport.auditeur.prenom, " ", ctx_r3.selectedReport.auditeur == null ? null : ctx_r3.selectedReport.auditeur.nom, "");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.selectedReport.rapport, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.selectedReport.recommandations, " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.selectedReport.risk == null ? null : ctx_r3.selectedReport.risk.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.selectedReport.risk == null ? null : ctx_r3.selectedReport.risk.description);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap("level-" + (ctx_r3.selectedReport.risk == null ? null : ctx_r3.selectedReport.risk.criticite));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Criticit\u00E9 : ", ctx_r3.levelLabelMap[ctx_r3.selectedReport.risk == null ? null : ctx_r3.selectedReport.risk.criticite] || (ctx_r3.selectedReport.risk == null ? null : ctx_r3.selectedReport.risk.criticite), " ");
} }
function AuditReportReviewComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "S\u00E9lectionnez un rapport pour l'examiner.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class AuditReportReviewComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.reports = [];
        this.filteredReports = [];
        this.selectedReport = null;
        this.isLoading = false;
        this.filterStatus = 'All';
        // Expose Enum to template
        this.AuditMissionStatus = AuditMissionStatus;
        // Label mappings for UI
        this.statusLabelMap = {
            [AuditMissionStatus.A_VENIR]: 'À venir',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.TERMINE]: 'Terminé',
            [AuditMissionStatus.EN_RETARD]: 'En retard',
            [AuditMissionStatus.ANNULE]: 'Annulé',
            'a_reviser': 'À réviser'
        };
        this.levelLabelMap = {
            'low': 'Faible',
            'limited': 'Limité',
            'medium': 'Moyen',
            'high': 'Élevé',
            'critical': 'Critique'
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadReports();
    }
    loadReports() {
        this.isLoading = true;
        this.auditingService.getReportsToReview().subscribe({
            next: (data) => {
                this.reports = data;
                this.filteredReports = data;
                this.isLoading = false;
                if (this.reports.length > 0) {
                    this.selectReport(this.reports[0]);
                }
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    selectReport(report) {
        this.selectedReport = report;
    }
    applyFilter() {
        if (this.filterStatus === 'All') {
            this.filteredReports = this.reports;
        }
        else {
            this.filteredReports = this.reports.filter(r => {
                if (this.filterStatus === 'a_reviser') {
                    return r.statut === AuditMissionStatus.TERMINE; // Or some other logic if 'a_reviser' is distinct
                }
                return r.statut === this.filterStatus;
            });
        }
    }
    validateReport(report) {
        if (!confirm('Voulez-vous valider ce rapport et clore la mission ?'))
            return;
        this.isLoading = true;
        // Assuming 'Terminé' means ready for review, and we might add a 'Validé' state or just keep it as Terminé.
        // For now, let's just mark it as Terminé (already is) but potentially add audit Senior notes.
        const updateData = {
            statut: AuditMissionStatus.TERMINE,
            // we could add a validation note here if the backend was updated
        };
        this.auditingService.updateMission(report.id, updateData).subscribe({
            next: () => {
                this.isLoading = false;
                alert('Rapport validé avec succès !');
                this.loadReports();
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de la validation.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
AuditReportReviewComponent.ɵfac = function AuditReportReviewComponent_Factory(t) { return new (t || AuditReportReviewComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditReportReviewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditReportReviewComponent, selectors: [["app-audit-report-review"]], decls: 36, vars: 8, consts: [[1, "audit-page", "senior-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-file-contract"], [1, "header-actions"], [1, "filter-group", "premium"], [1, "fas", "fa-filter"], [3, "ngModel", "ngModelChange", "change"], ["value", "All"], [3, "value"], ["value", "Valid\u00E9", "disabled", ""], ["class", "audit-tabs", 4, "ngIf"], [1, "dual-layout"], [1, "sidebar-list", "card"], [1, "list-header"], [1, "count-tag"], ["class", "loading-state", 4, "ngIf"], [1, "item-list"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "main-content", "card"], [4, "ngIf", "ngIfElse"], ["selectPrompt", ""], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loading-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [3, "click"], [1, "item-icon"], [1, "fas", "fa-file-alt"], [1, "item-info"], [1, "content-header"], [1, "report-meta"], [1, "meta-tags"], [1, "tag", "date"], [1, "fas", "fa-calendar"], [1, "tag", "auditeur"], [1, "fas", "fa-user"], [1, "btn-primary", "validate-btn", 3, "click"], [1, "fas", "fa-check-double"], [1, "report-viewer"], [1, "viewer-section"], [1, "fas", "fa-align-left", "text-primary"], [1, "text-content", "shadow-sm"], [1, "fas", "fa-lightbulb", "text-warning"], [1, "text-content", "shadow-sm", "warning-light"], [1, "fas", "fa-shield-alt", "text-success"], [1, "risk-summary"], [1, "priority-badge"], [1, "select-prompt"], [1, "fas", "fa-file-signature"]], template: function AuditReportReviewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditReportReviewComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Centre de R\u00E9vision des Rapports");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Examinez et validez les rapports d'audit soumis par votre \u00E9quipe.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵelementStart(14, "select", 9);
        i0.ɵɵlistener("ngModelChange", function AuditReportReviewComponent_Template_select_ngModelChange_14_listener($event) { return ctx.filterStatus = $event; })("change", function AuditReportReviewComponent_Template_select_change_14_listener() { return ctx.applyFilter(); });
        i0.ɵɵelementStart(15, "option", 10);
        i0.ɵɵtext(16, "Tous les rapports");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "option", 11);
        i0.ɵɵtext(18, "Soumis / En attente");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "option", 12);
        i0.ɵɵtext(20, "Valid\u00E9s (version future)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(21, AuditReportReviewComponent_nav_21_Template, 2, 1, "nav", 13);
        i0.ɵɵelementStart(22, "div", 14);
        i0.ɵɵelementStart(23, "div", 15);
        i0.ɵɵelementStart(24, "div", 16);
        i0.ɵɵelementStart(25, "h3");
        i0.ɵɵtext(26, "Rapports Soumis");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "span", 17);
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(29, AuditReportReviewComponent_div_29_Template, 2, 0, "div", 18);
        i0.ɵɵelementStart(30, "ul", 19);
        i0.ɵɵtemplate(31, AuditReportReviewComponent_li_31_Template, 8, 5, "li", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 21);
        i0.ɵɵtemplate(33, AuditReportReviewComponent_div_33_Template, 40, 14, "div", 22);
        i0.ɵɵtemplate(34, AuditReportReviewComponent_ng_template_34_Template, 4, 0, "ng-template", null, 23, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r4 = i0.ɵɵreference(35);
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngModel", ctx.filterStatus);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.TERMINE);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.reports.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading && ctx.reports.length === 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.filteredReports);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedReport)("ngIfElse", _r4);
    } }, directives: [i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgModel, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i4.NgIf, i4.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], pipes: [i4.DatePipe], styles: ["@import '../audit-shared';\n\n.dual-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 380px 1fr;\n    gap: 25px;\n    height: calc(100vh - 220px);\n    margin-top: 20px;\n}\n\n.card[_ngcontent-%COMP%] {\n    background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #edf2f7; overflow: hidden; display: flex; flex-direction: column;\n}\n\n.sidebar-list[_ngcontent-%COMP%] {\n    .list-header {\n        padding: 20px 25px; border-bottom: 2px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;\n        h3 { margin: 0; font-size: 1.1rem; color: #1e293b; font-weight: 700; }\n        .count-tag { background: #e0f2fe; color: #004a99; padding: 2px 10px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; }\n    }\n    .item-list {\n        list-style: none; padding: 0; margin: 0; overflow-y: auto;\n        li {\n            padding: 18px 25px; border-bottom: 1px solid #f8fafc; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: all 0.2s;\n            &:hover { background: #f8fafc; }\n            &.active { background: #f0f7ff; border-left: 5px solid #004a99; .item-icon i { color: #004a99; } }\n            .item-icon i { font-size: 1.2rem; color: #94a3b8; }\n            .item-info { display: flex; flex-direction: column; strong { font-size: 0.95rem; color: #1e293b; } small { font-size: 0.8rem; color: #64748b; margin-top: 4px; } }\n        }\n    }\n}\n\n.main-content[_ngcontent-%COMP%] {\n    padding: 35px; overflow-y: auto;\n    .content-header {\n        display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 2px solid #f1f5f9;\n        .report-meta { h2 { margin: 0 0 10px 0; font-size: 1.6rem; color: #1e293b; color: #004a99; } .meta-tags { display: flex; gap: 20px; .tag { font-size: 0.85rem; color: #64748b; font-weight: 500; i { margin-right: 8px; color: #94a3b8; } } } }\n    }\n}\n\n.report-viewer[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; gap: 35px;\n    .viewer-section {\n        h3 { font-size: 1.15rem; color: #1e293b; margin-bottom: 18px; display: flex; align-items: center; gap: 12px; font-weight: 700; }\n        .text-content { background: #f8fafc; padding: 25px; border-radius: 12px; line-height: 1.7; color: #334155; font-size: 1.05rem; border: 1px solid #e2e8f0; white-space: pre-wrap; }\n        .text-content.warning-light { background: #fffbeb; border-color: #fef3c7; }\n    }\n}\n\n.risk-summary[_ngcontent-%COMP%] {\n    background: #f1f5f9; padding: 20px; border-radius: 10px; border-left: 5px solid #10b981;\n    strong { display: block; margin-bottom: 8px; font-size: 1.1rem; color: #1e293b; }\n    p { margin: 0 0 12px 0; color: #64748b; line-height: 1.5; }\n    .priority-badge { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; }\n}\n\n.filter-group.premium[_ngcontent-%COMP%] {\n    background: #f1f5f9; padding: 8px 15px; border-radius: 10px; display: flex; align-items: center; gap: 10px; border: 1px solid transparent;\n    i { color: #94a3b8; }\n    select { background: none; border: none; outline: none; font-weight: 600; color: #475569; font-size: 0.9rem; cursor: pointer; }\n}\n\n.validate-btn[_ngcontent-%COMP%] { padding: 12px 25px; border-radius: 10px; font-weight: 700; font-size: 1rem; }\n\n.select-prompt[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8; i { font-size: 4rem; color: #e2e8f0; margin-bottom: 25px; } p { font-size: 1.2rem; } }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditReportReviewComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-report-review',
                templateUrl: './audit-report-review.component.html',
                styleUrls: ['./audit-report-review.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-report-review.component.js.map