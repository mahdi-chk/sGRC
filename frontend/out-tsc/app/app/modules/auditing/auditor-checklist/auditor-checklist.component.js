import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function AuditorChecklistComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r8.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r8.label, " ");
} }
function AuditorChecklistComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 17);
    i0.ɵɵtemplate(1, AuditorChecklistComponent_nav_11_a_1_Template, 2, 4, "a", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorChecklistComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_li_19_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 22);
    i0.ɵɵlistener("click", function AuditorChecklistComponent_li_19_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const mission_r9 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.selectMission(mission_r9); });
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵelement(2, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 25);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 26);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "i", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r2.selectedMission == null ? null : ctx_r2.selectedMission.id) === mission_r9.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(mission_r9.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(mission_r9.statut.toLowerCase());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r9.statut);
} }
function AuditorChecklistComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune mission assign\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_div_22_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_div_22_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun point de contr\u00F4le d\u00E9fini pour cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_div_22_div_8_ul_2_li_1_small_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 48);
    i0.ɵɵtext(1, "Compl\u00E9t\u00E9");
    i0.ɵɵelementEnd();
} }
function AuditorChecklistComponent_div_22_div_8_ul_2_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 41);
    i0.ɵɵelementStart(1, "label", 42);
    i0.ɵɵelementStart(2, "input", 43);
    i0.ɵɵlistener("change", function AuditorChecklistComponent_div_22_div_8_ul_2_li_1_Template_input_change_2_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r20); const item_r17 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(4); return ctx_r19.toggleChecklistItem(item_r17, $event.target.checked); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 44);
    i0.ɵɵelementStart(4, "div", 45);
    i0.ɵɵelementStart(5, "span", 46);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AuditorChecklistComponent_div_22_div_8_ul_2_li_1_small_7_Template, 2, 0, "small", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    i0.ɵɵclassProp("completed", item_r17.estFait);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", item_r17.estFait);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r17.texte);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r17.estFait);
} }
function AuditorChecklistComponent_div_22_div_8_ul_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 39);
    i0.ɵɵtemplate(1, AuditorChecklistComponent_div_22_div_8_ul_2_li_1_Template, 8, 5, "li", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r15.checklistItems);
} }
function AuditorChecklistComponent_div_22_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtemplate(1, AuditorChecklistComponent_div_22_div_8_div_1_Template, 4, 0, "div", 35);
    i0.ɵɵtemplate(2, AuditorChecklistComponent_div_22_div_8_ul_2_Template, 2, 1, "ul", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r13.checklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r13.checklistItems.length > 0);
} }
function AuditorChecklistComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 29);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 30);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AuditorChecklistComponent_div_22_div_7_Template, 2, 0, "div", 31);
    i0.ɵɵtemplate(8, AuditorChecklistComponent_div_22_div_8_Template, 3, 2, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Checklist : ", ctx_r4.selectedMission.titre, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00C9ch\u00E9ance : ", i0.ɵɵpipeBind2(6, 4, ctx_r4.selectedMission.delai, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r4.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r4.isLoading);
} }
function AuditorChecklistComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵelement(1, "i", 50);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Veuillez s\u00E9lectionner une mission dans la liste pour afficher sa checklist.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class AuditorChecklistComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        this.selectedMission = null;
        this.checklistItems = [];
        this.isLoading = false;
        this.currentUserRole = getStoredAuditRole();
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
                // Auto-select first mission if available
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
        this.isLoading = true;
        this.auditingService.getMissionChecklistItems(mission.id).subscribe({
            next: (items) => {
                this.checklistItems = items;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors du chargement de la checklist.');
            }
        });
    }
    toggleChecklistItem(item, isFinished) {
        if (!this.selectedMission)
            return;
        this.auditingService.toggleMissionChecklistItem(this.selectedMission.id, item.id, isFinished).subscribe({
            next: (updatedItem) => {
                item.estFait = updatedItem.estFait;
            },
            error: (err) => {
                console.error(err);
                item.estFait = !isFinished;
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
AuditorChecklistComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorChecklistComponent, selectors: [["app-auditor-checklist"]], decls: 25, vars: 7, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], ["class", "audit-tabs", 4, "ngIf"], [1, "dual-layout"], [1, "sidebar-list", "card"], [1, "list-header"], ["class", "loading-state", 4, "ngIf"], [1, "item-list"], [3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "empty-list", 4, "ngIf"], [1, "main-content", "card"], [4, "ngIf", "ngIfElse"], ["selectPrompt", ""], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loading-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [3, "click"], [1, "item-icon"], [1, "fas", "fa-briefcase"], [1, "item-info"], [1, "status-tag"], [1, "fas", "fa-chevron-right", "scroll-icon"], [1, "empty-list"], [1, "content-header"], [1, "mission-date"], ["class", "loading-overlay", 4, "ngIf"], ["class", "checklist-container", 4, "ngIf"], [1, "loading-overlay"], [1, "checklist-container"], ["class", "empty-checklist", 4, "ngIf"], ["class", "checklist-items", 4, "ngIf"], [1, "empty-checklist"], [1, "fas", "fa-list-ul"], [1, "checklist-items"], ["class", "checklist-item", 3, "completed", 4, "ngFor", "ngForOf"], [1, "checklist-item"], [1, "checkbox-container"], ["type", "checkbox", 3, "checked", "change"], [1, "checkmark"], [1, "item-content"], [1, "item-text"], ["class", "done-tag", 4, "ngIf"], [1, "done-tag"], [1, "select-prompt"], [1, "fas", "fa-mouse-pointer"]], template: function AuditorChecklistComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "Compl\u00E9tez les points de contr\u00F4le pour vos missions d'audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditorChecklistComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "h3");
        i0.ɵɵtext(16, "Missions Assign\u00E9es");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, AuditorChecklistComponent_div_17_Template, 2, 0, "div", 10);
        i0.ɵɵelementStart(18, "ul", 11);
        i0.ɵɵtemplate(19, AuditorChecklistComponent_li_19_Template, 9, 6, "li", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(20, AuditorChecklistComponent_div_20_Template, 3, 0, "div", 13);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 14);
        i0.ɵɵtemplate(22, AuditorChecklistComponent_div_22_Template, 9, 7, "div", 15);
        i0.ɵɵtemplate(23, AuditorChecklistComponent_ng_template_23_Template, 4, 0, "ng-template", null, 16, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r5 = i0.ɵɵreference(24);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.isSuperAdmin ? "Check-Lists d Audit" : "Mes Check-Lists", "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.isLoading && ctx.missions.length === 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.missions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.missions.length === 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedMission)("ngIfElse", _r5);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], pipes: [i3.DatePipe], styles: ["@import '../audit-shared';\n\n.dual-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 350px 1fr;\n    gap: 25px;\n    height: calc(100vh - 200px);\n    margin-top: 20px;\n}\n\n.card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.05);\n    border: 1px solid #edf2f7;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n}\n\n.sidebar-list[_ngcontent-%COMP%] {\n    .list-header {\n        padding: 20px;\n        border-bottom: 1px solid #edf2f7;\n        h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }\n    }\n\n    .item-list {\n        list-style: none;\n        padding: 0;\n        margin: 0;\n        overflow-y: auto;\n\n        li {\n            padding: 15px 20px;\n            display: flex;\n            align-items: center;\n            gap: 15px;\n            cursor: pointer;\n            transition: all 0.2s;\n            border-bottom: 1px solid #f8fafc;\n\n            &:hover { background: #f8fafc; }\n            &.active {\n                background: #f0f7ff;\n                border-left: 4px solid #004a99;\n                .item-icon i { color: #004a99; }\n            }\n\n            .item-icon i { color: #94a3b8; font-size: 1.1rem; }\n            .item-info {\n                flex: 1;\n                display: flex;\n                flex-direction: column;\n                strong { font-size: 0.95rem; color: #334155; }\n                .status-tag { \n                    font-size: 0.75rem; \n                    font-weight: 700;\n                    margin-top: 4px;\n                    &.termin\u00E9 { color: #10b981; }\n                    &.en-cours { color: #3b82f6; }\n                }\n            }\n            .scroll-icon { font-size: 0.8rem; color: #cbd5e1; }\n        }\n    }\n}\n\n.main-content[_ngcontent-%COMP%] {\n    padding: 30px;\n    position: relative;\n\n    .content-header {\n        margin-bottom: 25px;\n        border-bottom: 1px solid #f1f5f9;\n        padding-bottom: 15px;\n        h2 { margin: 0; font-size: 1.5rem; color: #1e293b; }\n        .mission-date { color: #64748b; font-size: 0.9rem; }\n    }\n\n    .checklist-items {\n        list-style: none;\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n    }\n\n    .checklist-item {\n        padding: 15px 20px;\n        background: #f8fafc;\n        border-radius: 10px;\n        border: 1px solid #edf2f7;\n        transition: all 0.2s;\n\n        &.completed {\n            background: #f0fdf4;\n            border-color: #dcfce7;\n            .item-text { text-decoration: line-through; color: #64748b; }\n        }\n\n        .checkbox-container {\n            display: flex;\n            align-items: center;\n            position: relative;\n            cursor: pointer;\n            font-size: 1rem;\n            user-select: none;\n            padding-left: 35px;\n\n            input { position: absolute; opacity: 0; cursor: pointer; }\n            .checkmark {\n                position: absolute;\n                top: 0; left: 0;\n                height: 24px; width: 24px;\n                background-color: white;\n                border: 2px solid #cbd5e1;\n                border-radius: 6px;\n                transition: all 0.2s;\n            }\n\n            &:hover input ~ .checkmark { border-color: #004a99; }\n            input:checked ~ .checkmark {\n                background-color: #004a99;\n                border-color: #004a99;\n                &:after { display: block; }\n            }\n\n            .checkmark:after {\n                content: \"\";\n                position: absolute;\n                display: none;\n                left: 8px; top: 4px;\n                width: 5px; height: 10px;\n                border: solid white;\n                border-width: 0 3px 3px 0;\n                transform: rotate(45deg);\n            }\n\n            .item-content {\n                display: flex;\n                flex-direction: column;\n                .item-text { font-weight: 500; color: #334155; }\n                .done-tag { font-size: 0.7rem; color: #10b981; font-weight: 700; text-transform: uppercase; }\n            }\n        }\n    }\n}\n\n.select-prompt[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    color: #94a3b8;\n    i { font-size: 3rem; margin-bottom: 20px; color: #e2e8f0; }\n    p { font-size: 1.1rem; }\n}\n\n.empty-checklist[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: 50px;\n    color: #94a3b8;\n    i { font-size: 3rem; margin-bottom: 20px; }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: rgba(255,255,255,0.7);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 10;\n    i { font-size: 2rem; color: #004a99; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorChecklistComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-checklist',
                templateUrl: './auditor-checklist.component.html',
                styleUrls: ['./auditor-checklist.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-checklist.component.js.map