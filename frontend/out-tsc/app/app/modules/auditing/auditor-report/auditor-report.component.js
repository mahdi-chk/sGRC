import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function AuditorReportComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function AuditorReportComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 15);
    i0.ɵɵtemplate(1, AuditorReportComponent_nav_11_a_1_Template, 2, 4, "a", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorReportComponent_li_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 18);
    i0.ɵɵlistener("click", function AuditorReportComponent_li_18_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const mission_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.selectMission(mission_r7); });
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelement(2, "i", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 21);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r1.selectedMission == null ? null : ctx_r1.selectedMission.id) === mission_r7.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(mission_r7.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(mission_r7.statut.toLowerCase());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r7.statut);
} }
function AuditorReportComponent_div_20_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Ce rapport a d\u00E9j\u00E0 \u00E9t\u00E9 soumis. ");
    i0.ɵɵelementEnd();
} }
function AuditorReportComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 25);
    i0.ɵɵelementStart(7, "div", 26);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵelement(9, "i", 27);
    i0.ɵɵtext(10, " R\u00E9sultats de l'Audit (Rapport) ");
    i0.ɵɵelementStart(11, "span", 28);
    i0.ɵɵtext(12, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "textarea", 29);
    i0.ɵɵlistener("ngModelChange", function AuditorReportComponent_div_20_Template_textarea_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.reportData.rapport = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 26);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵelement(16, "i", 30);
    i0.ɵɵtext(17, " Recommandations ");
    i0.ɵɵelementStart(18, "span", 28);
    i0.ɵɵtext(19, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "textarea", 31);
    i0.ɵɵlistener("ngModelChange", function AuditorReportComponent_div_20_Template_textarea_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 32);
    i0.ɵɵtemplate(22, AuditorReportComponent_div_20_div_22_Template, 3, 0, "div", 33);
    i0.ɵɵelementStart(23, "button", 34);
    i0.ɵɵlistener("click", function AuditorReportComponent_div_20_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r12); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.submitReport(); });
    i0.ɵɵelement(24, "i", 35);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("R\u00E9daction du Rapport : ", ctx_r2.selectedMission.titre, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Assign\u00E9 par : ", ctx_r2.selectedMission.auditSenior == null ? null : ctx_r2.selectedMission.auditSenior.prenom, " ", ctx_r2.selectedMission.auditSenior == null ? null : ctx_r2.selectedMission.auditSenior.nom, "");
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", ctx_r2.reportData.rapport);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r2.reportData.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedMission.statut === "Termin\u00E9");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r2.isLoading || !ctx_r2.reportData.rapport || !ctx_r2.reportData.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isLoading ? "Envoi..." : "Soumettre le Rapport Final", " ");
} }
function AuditorReportComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "S\u00E9lectionnez une mission pour commencer la r\u00E9daction du rapport.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class AuditorReportComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        this.selectedMission = null;
        this.isLoading = false;
        this.currentUserRole = getStoredAuditRole();
        this.reportData = {
            rapport: '',
            recommandations: ''
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadMissions();
    }
    loadMissions() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.router.navigate(['/login']);
            return;
        }
        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);
        this.currentUserRole = currentUser.role || null;
        this.auditingService.getMissions().subscribe({
            next: (data) => {
                this.missions = data.filter(m => Number(m.auditeurId) === userId && m.statut !== AuditMissionStatus.ANNULE);
                if (this.isSuperAdmin) {
                    this.missions = data.filter(m => m.statut !== AuditMissionStatus.ANNULE);
                }
                this.isLoading = false;
                if (this.missions.length > 0) {
                    this.selectMission(this.missions[0]);
                }
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    selectMission(mission) {
        this.selectedMission = mission;
        this.reportData = {
            rapport: mission.rapport || '',
            recommandations: mission.recommandations || ''
        };
    }
    submitReport() {
        if (!this.selectedMission)
            return;
        this.isLoading = true;
        this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
            next: () => {
                this.isLoading = false;
                alert('Rapport soumis avec succès !');
                // Update local mission data
                if (this.selectedMission) {
                    this.selectedMission.rapport = this.reportData.rapport;
                    this.selectedMission.recommandations = this.reportData.recommandations;
                    this.selectedMission.statut = AuditMissionStatus.TERMINE;
                }
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de l\'envoi du rapport.');
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
AuditorReportComponent.ɵfac = function AuditorReportComponent_Factory(t) { return new (t || AuditorReportComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditorReportComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorReportComponent, selectors: [["app-auditor-report"]], decls: 23, vars: 4, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-file-signature"], ["class", "audit-tabs", 4, "ngIf"], [1, "dual-layout"], [1, "sidebar-list", "card"], [1, "list-header"], [1, "item-list"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "main-content", "card"], [4, "ngIf", "ngIfElse"], ["selectPrompt", ""], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [3, "click"], [1, "item-icon"], [1, "fas", "fa-file-invoice"], [1, "item-info"], [1, "status-tag"], [1, "content-header"], [1, "mission-meta"], [1, "report-form-container"], [1, "form-section"], [1, "fas", "fa-align-left"], [1, "req"], ["rows", "10", "placeholder", "D\u00E9crivez vos constatations, les \u00E9carts identifi\u00E9s et les points forts...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-lightbulb"], ["rows", "5", "placeholder", "Proposez des actions correctives pour rem\u00E9dier aux faiblesses identifi\u00E9es...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "form-actions-bar"], ["class", "status-info", 4, "ngIf"], [1, "btn-primary", "large", 3, "disabled", "click"], [1, "fas", "fa-paper-plane"], [1, "status-info"], [1, "fas", "fa-check-circle"], [1, "select-prompt"], [1, "fas", "fa-pen-nib"]], template: function AuditorReportComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditorReportComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Rapports et Suivi");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "R\u00E9digez vos conclusions d'audit et soumettez vos rapports finaux.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditorReportComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "h3");
        i0.ɵɵtext(16, "Missions Assign\u00E9es");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "ul", 10);
        i0.ɵɵtemplate(18, AuditorReportComponent_li_18_Template, 8, 6, "li", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 12);
        i0.ɵɵtemplate(20, AuditorReportComponent_div_20_Template, 26, 8, "div", 13);
        i0.ɵɵtemplate(21, AuditorReportComponent_ng_template_21_Template, 4, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(22);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.missions);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedMission)("ngIfElse", _r3);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel], styles: ["@import '../audit-shared';\n\n\n.dual-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 350px 1fr;\n    gap: 25px;\n    height: calc(100vh - 200px);\n    margin-top: 20px;\n}\n\n.card[_ngcontent-%COMP%] {\n    background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #edf2f7;\n    overflow: hidden; display: flex; flex-direction: column;\n}\n\n.sidebar-list[_ngcontent-%COMP%] {\n    .item-list {\n        list-style: none; padding: 0; margin: 0;\n        li {\n            padding: 15px 20px; cursor: pointer; border-bottom: 1px solid #f8fafc;\n            &.active { background: #f0f7ff; border-left: 4px solid #004a99; }\n        }\n    }\n}\n\n.main-content[_ngcontent-%COMP%] {\n    padding: 30px; overflow-y: auto;\n    .content-header { border-bottom: 1px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 25px; h2 { margin: 0; font-size: 1.4rem; color: #1e293b; } }\n}\n\n.report-form-container[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; gap: 25px;\n\n    .form-section {\n        display: flex; flex-direction: column; gap: 10px;\n        label { font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px; i { color: #004a99; } }\n        .finput { width: 100%; padding: 15px; border-radius: 10px; border: 1px solid #cbd5e1; font-family: inherit; resize: vertical; transition: border-color 0.2s; &:focus { outline: none; border-color: #004a99; box-shadow: 0 0 0 3px rgba(0,74,153,0.1); } }\n    }\n}\n\n.form-actions-bar[_ngcontent-%COMP%] {\n    display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9;\n    .status-info { color: #10b981; font-weight: 600; display: flex; align-items: center; gap: 8px; }\n    .btn-primary.large { padding: 12px 30px; font-size: 1.1rem; }\n}\n\n.select-prompt[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8; i { font-size: 3rem; color: #e2e8f0; margin-bottom: 20px; } }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorReportComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-report',
                templateUrl: './auditor-report.component.html',
                styleUrls: ['./auditor-report.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-report.component.js.map