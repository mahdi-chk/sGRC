import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus, AuditRecordType } from '../../core/services/auditing.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAuditNavItems, getStoredAuditRole } from './audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/auditing.service";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "../../shared/modal/modal.component";
function AuditingComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 53);
    i0.ɵɵlistener("click", function AuditingComponent_button_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.openCreateModal(ctx_r12.AuditRecordType.PLAN_ACTION_AUDIT); });
    i0.ɵɵelement(1, "i", 54);
    i0.ɵɵtext(2, " Nouveau plan ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 53);
    i0.ɵɵlistener("click", function AuditingComponent_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.openCreateModal(ctx_r14.AuditRecordType.MISSION_AUDIT); });
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵtext(2, " Nouvelle mission ");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { exact: true }; };
function AuditingComponent_nav_26_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r17.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r17.label, " ");
} }
function AuditingComponent_nav_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 56);
    i0.ɵɵtemplate(1, AuditingComponent_nav_26_a_1_Template, 2, 4, "a", 57);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.navItems);
} }
function AuditingComponent_button_90_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 59);
    i0.ɵɵlistener("click", function AuditingComponent_button_90_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.clearFilters(); });
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_div_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵelement(1, "i", 80);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r22.auditeur.prenom, " ", mission_r22.auditeur.nom, " ");
} }
function AuditingComponent_table_98_tr_18_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em", 81);
    i0.ɵɵtext(1, "Non assign\u00E9");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 82);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r36); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r34 = i0.ɵɵnextContext(2); return ctx_r34.openAssignModal(mission_r22); });
    i0.ɵɵelement(1, "i", 83);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 84);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r39); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r37 = i0.ɵɵnextContext(2); return ctx_r37.openChecklistModal(mission_r22); });
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r42); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r40 = i0.ɵɵnextContext(2); return ctx_r40.openReportModal(mission_r22); });
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 88);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r45); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r43 = i0.ɵɵnextContext(2); return ctx_r43.openEditModal(mission_r22); });
    i0.ɵɵelement(1, "i", 89);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 90);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r48); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r46 = i0.ɵɵnextContext(2); return ctx_r46.openEvidenceModal(mission_r22); });
    i0.ɵɵelement(1, "i", 91);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 92);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r51); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r49 = i0.ɵɵnextContext(2); return ctx_r49.resetMission(mission_r22.id); });
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_button_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r54); const mission_r22 = i0.ɵɵnextContext().$implicit; const ctx_r52 = i0.ɵɵnextContext(2); return ctx_r52.deleteMission(mission_r22.id); });
    i0.ɵɵelement(1, "i", 94);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_tr_18_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵelementStart(6, "div", 66);
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtemplate(12, AuditingComponent_table_98_tr_18_div_12_Template, 3, 2, "div", 67);
    i0.ɵɵtemplate(13, AuditingComponent_table_98_tr_18_ng_template_13_Template, 2, 0, "ng-template", null, 68, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 69);
    i0.ɵɵelementStart(22, "button", 70);
    i0.ɵɵlistener("click", function AuditingComponent_table_98_tr_18_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const mission_r22 = restoredCtx.$implicit; const ctx_r55 = i0.ɵɵnextContext(2); return ctx_r55.openDetailModal(mission_r22); });
    i0.ɵɵelement(23, "i", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, AuditingComponent_table_98_tr_18_button_24_Template, 2, 0, "button", 72);
    i0.ɵɵtemplate(25, AuditingComponent_table_98_tr_18_button_25_Template, 2, 0, "button", 73);
    i0.ɵɵtemplate(26, AuditingComponent_table_98_tr_18_button_26_Template, 2, 0, "button", 74);
    i0.ɵɵtemplate(27, AuditingComponent_table_98_tr_18_button_27_Template, 2, 0, "button", 75);
    i0.ɵɵtemplate(28, AuditingComponent_table_98_tr_18_button_28_Template, 2, 0, "button", 76);
    i0.ɵɵtemplate(29, AuditingComponent_table_98_tr_18_button_29_Template, 2, 0, "button", 77);
    i0.ɵɵtemplate(30, AuditingComponent_table_98_tr_18_button_30_Template, 2, 0, "button", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r22 = ctx.$implicit;
    const _r24 = i0.ɵɵreference(14);
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r20.typeLabelMap[mission_r22.type] || mission_r22.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r22.code || mission_r22.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r22.regleDnssi || mission_r22.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r22.recommandations || mission_r22.objectifs);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mission_r22.auditeur)("ngIfElse", _r24);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r22.delai ? i0.ɵɵpipeBind2(17, 17, mission_r22.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + mission_r22.statut.toString().replace("_", "-"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r20.statusLabelMap[mission_r22.statut.toString()] || mission_r22.statut);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r20.canAssignAuditor(mission_r22));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.isSeniorAuditor && mission_r22.type === ctx_r20.AuditRecordType.MISSION_AUDIT);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.isAuditor && mission_r22.type === ctx_r20.AuditRecordType.MISSION_AUDIT && mission_r22.statut === ctx_r20.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.isSeniorAuditor);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r22.type === ctx_r20.AuditRecordType.MISSION_AUDIT);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.isSeniorAuditor && mission_r22.type === ctx_r20.AuditRecordType.MISSION_AUDIT && mission_r22.statut === ctx_r20.AuditMissionStatus.TERMINE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.isSeniorAuditor);
} }
function AuditingComponent_table_98_tr_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 95);
    i0.ɵɵelement(2, "i", 96);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun enregistrement trouv\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 63);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Libell\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵtemplate(18, AuditingComponent_table_98_tr_18_Template, 31, 20, "tr", 64);
    i0.ɵɵtemplate(19, AuditingComponent_table_98_tr_19_Template, 5, 0, "tr", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r5.filteredMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.filteredMissions.length === 0);
} }
function AuditingComponent_app_modal_99_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r59 = ctx.$implicit;
    i0.ɵɵproperty("value", u_r59.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", u_r59.prenom, " ", u_r59.nom, "");
} }
function AuditingComponent_app_modal_99_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 97);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_99_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(); return ctx_r60.showAssignModal = false; });
    i0.ɵɵelementStart(1, "div", 98, 99);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "S\u00E9lectionnez l'auditeur responsable pour ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 100);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 101);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_99_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r61); const ctx_r62 = i0.ɵɵnextContext(); return ctx_r62.selectedAuditorId = $event; });
    i0.ɵɵelementStart(11, "option", 38);
    i0.ɵɵtext(12, "S\u00E9lectionner...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, AuditingComponent_app_modal_99_option_13_Template, 2, 3, "option", 102);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 103);
    i0.ɵɵelementStart(15, "button", 104);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_99_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r61); const ctx_r63 = i0.ɵɵnextContext(); return ctx_r63.showAssignModal = false; });
    i0.ɵɵtext(16, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 105);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_99_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r61); const ctx_r64 = i0.ɵɵnextContext(); return ctx_r64.assignMission(); });
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((ctx_r6.selectedMission == null ? null : ctx_r6.selectedMission.regleDnssi) || (ctx_r6.selectedMission == null ? null : ctx_r6.selectedMission.titre));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r6.selectedAuditorId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r6.auditors);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r6.selectedAuditorId || ctx_r6.isAssigning);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.isAssigning ? "Affectation..." : "Affecter", " ");
} }
function AuditingComponent_app_modal_100_Template(rf, ctx) { if (rf & 1) {
    const _r67 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 106);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_100_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r67); const ctx_r66 = i0.ɵɵnextContext(); return ctx_r66.showReportModal = false; });
    i0.ɵɵelementStart(1, "div", 98, 99);
    i0.ɵɵelementStart(3, "div", 107);
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Rapport Final d'Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "textarea", 108);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_100_Template_textarea_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r68 = i0.ɵɵnextContext(); return ctx_r68.reportData.rapport = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 107);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "textarea", 109);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_100_Template_textarea_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r69 = i0.ɵɵnextContext(); return ctx_r69.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 103);
    i0.ɵɵelementStart(12, "button", 104);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_100_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r67); const ctx_r70 = i0.ɵɵnextContext(); return ctx_r70.showReportModal = false; });
    i0.ɵɵtext(13, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 105);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_100_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r67); const ctx_r71 = i0.ɵɵnextContext(); return ctx_r71.submitReport(); });
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r7.reportData.rapport);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.reportData.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r7.reportData.rapport || ctx_r7.isReporting);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.isReporting ? "Envoi..." : "Soumettre le Rapport", " ");
} }
function AuditingComponent_app_modal_101_Template(rf, ctx) { if (rf & 1) {
    const _r74 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 110);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_101_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r74); const ctx_r73 = i0.ɵɵnextContext(); return ctx_r73.showDetailModal = false; });
    i0.ɵɵelementStart(1, "div", 98, 99);
    i0.ɵɵelementStart(3, "div", 111);
    i0.ɵɵelementStart(4, "div", 112);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 112);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 113);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Libell\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 113);
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 112);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 112);
    i0.ɵɵelementStart(30, "label");
    i0.ɵɵtext(31, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 103);
    i0.ɵɵelementStart(36, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_101_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r74); const ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.showDetailModal = false; });
    i0.ɵɵtext(37, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r8.typeLabelMap[(ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.type) || ""]);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.code) || (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.id));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.regleDnssi) || (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.titre));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.recommandations) || (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.objectifs));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.auditeur) ? (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.auditeur.prenom) + " " + (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.auditeur.nom) : (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.responsabilites) || "Non assign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.delai) ? i0.ɵɵpipeBind2(34, 6, ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.delai, "dd/MM/yyyy") : "-");
} }
function AuditingComponent_app_modal_102_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵtext(2, " Chargement des preuves... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_102_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune preuve t\u00E9l\u00E9vers\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_102_ul_5_li_1_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 127);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_102_ul_5_li_1_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r85); const ev_r81 = i0.ɵɵnextContext().$implicit; const ctx_r83 = i0.ɵɵnextContext(3); return ctx_r83.deleteEvidence(ev_r81.id); });
    i0.ɵɵelement(1, "i", 94);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_102_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 122);
    i0.ɵɵelementStart(1, "div", 123);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_102_ul_5_li_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r87); const ev_r81 = restoredCtx.$implicit; const ctx_r86 = i0.ɵɵnextContext(3); return ctx_r86.downloadEvidence(ev_r81.path); });
    i0.ɵɵelement(2, "i", 124);
    i0.ɵɵelementStart(3, "span", 125);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_102_ul_5_li_1_button_5_Template, 2, 0, "button", 126);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r81 = ctx.$implicit;
    const ctx_r80 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ev_r81.filename);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r80.isSeniorAuditor);
} }
function AuditingComponent_app_modal_102_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 120);
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_102_ul_5_li_1_Template, 6, 2, "li", 121);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r79 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r79.currentEvidences);
} }
function AuditingComponent_app_modal_102_Template(rf, ctx) { if (rf & 1) {
    const _r89 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 115);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_102_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r89); const ctx_r88 = i0.ɵɵnextContext(); return ctx_r88.showEvidenceModal = false; });
    i0.ɵɵelementStart(1, "div", 98, 99);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_102_div_3_Template, 3, 0, "div", 45);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_102_div_4_Template, 3, 0, "div", 116);
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_102_ul_5_Template, 2, 1, "ul", 117);
    i0.ɵɵelementStart(6, "div", 118);
    i0.ɵɵelementStart(7, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_102_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r89); const ctx_r90 = i0.ɵɵnextContext(); return ctx_r90.showEvidenceModal = false; });
    i0.ɵɵtext(8, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r9.isLoadingMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r9.isLoadingMissions && ctx_r9.currentEvidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r9.isLoadingMissions && ctx_r9.currentEvidences.length > 0);
} }
function AuditingComponent_app_modal_103_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun plan li\u00E9 \u00E0 cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_103_table_4_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r95 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r95.regleDnssi);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r95.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r95.responsableNom || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, item_r95.echeance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r95.etatAvancement);
} }
function AuditingComponent_app_modal_103_table_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 63);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "R\u00E8gle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, AuditingComponent_app_modal_103_table_4_tr_14_Template, 12, 8, "tr", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r93 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r93.currentChecklistItems);
} }
function AuditingComponent_app_modal_103_Template(rf, ctx) { if (rf & 1) {
    const _r97 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 128);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_103_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r97); const ctx_r96 = i0.ɵɵnextContext(); return ctx_r96.showChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 98, 99);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_103_div_3_Template, 3, 0, "div", 116);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_103_table_4_Template, 15, 1, "table", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r10.isLoadingMissions && ctx_r10.currentChecklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.currentChecklistItems.length > 0);
} }
function AuditingComponent_app_modal_104_div_1_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r106 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 137);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_div_10_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r106); const ctx_r105 = i0.ɵɵnextContext(3); return ctx_r105.selectedMission.code = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r100 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r100.selectedMission.code);
} }
function AuditingComponent_app_modal_104_div_1_input_14_Template(rf, ctx) { if (rf & 1) {
    const _r108 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 137);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_input_14_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r108); const ctx_r107 = i0.ɵɵnextContext(3); return ctx_r107.selectedMission.titre = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r101 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngModel", ctx_r101.selectedMission.titre);
} }
function AuditingComponent_app_modal_104_div_1_input_15_Template(rf, ctx) { if (rf & 1) {
    const _r110 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 137);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_input_15_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r109 = i0.ɵɵnextContext(3); return ctx_r109.selectedMission.regleDnssi = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r102 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngModel", ctx_r102.selectedMission.regleDnssi);
} }
function AuditingComponent_app_modal_104_div_1_textarea_19_Template(rf, ctx) { if (rf & 1) {
    const _r112 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 138);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_textarea_19_Template_textarea_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r112); const ctx_r111 = i0.ɵɵnextContext(3); return ctx_r111.selectedMission.objectifs = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r103 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngModel", ctx_r103.selectedMission.objectifs);
} }
function AuditingComponent_app_modal_104_div_1_textarea_20_Template(rf, ctx) { if (rf & 1) {
    const _r114 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 138);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_textarea_20_Template_textarea_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r114); const ctx_r113 = i0.ɵɵnextContext(3); return ctx_r113.selectedMission.recommandations = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r104 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngModel", ctx_r104.selectedMission.recommandations);
} }
function AuditingComponent_app_modal_104_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r116 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 98, 99);
    i0.ɵɵelementStart(2, "div", 100);
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "select", 131);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_Template_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r116); const ctx_r115 = i0.ɵɵnextContext(2); return ctx_r115.selectedMission.type = $event; });
    i0.ɵɵelementStart(6, "option", 39);
    i0.ɵɵtext(7, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "option", 39);
    i0.ɵɵtext(9, "Plan d action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, AuditingComponent_app_modal_104_div_1_div_10_Template, 4, 1, "div", 132);
    i0.ɵɵelementStart(11, "div", 107);
    i0.ɵɵelementStart(12, "label");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, AuditingComponent_app_modal_104_div_1_input_14_Template, 1, 1, "input", 133);
    i0.ɵɵtemplate(15, AuditingComponent_app_modal_104_div_1_input_15_Template, 1, 1, "input", 133);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 107);
    i0.ɵɵelementStart(17, "label");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AuditingComponent_app_modal_104_div_1_textarea_19_Template, 1, 1, "textarea", 134);
    i0.ɵɵtemplate(20, AuditingComponent_app_modal_104_div_1_textarea_20_Template, 1, 1, "textarea", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 107);
    i0.ɵɵelementStart(22, "label");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "textarea", 135);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_Template_textarea_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r116); const ctx_r117 = i0.ɵɵnextContext(2); return ctx_r117.selectedMission.responsabilites = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 111);
    i0.ɵɵelementStart(26, "div", 100);
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 136);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r116); const ctx_r118 = i0.ɵɵnextContext(2); return ctx_r118.selectedMission.delai = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 100);
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "select", 101);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_104_div_1_Template_select_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r116); const ctx_r119 = i0.ɵɵnextContext(2); return ctx_r119.selectedMission.statut = $event; });
    i0.ɵɵelementStart(34, "option", 39);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 39);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 39);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "option", 39);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "option", 39);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 103);
    i0.ɵɵelementStart(45, "button", 104);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_104_div_1_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r116); const ctx_r120 = i0.ɵɵnextContext(2); return ctx_r120.showEditModal = false; });
    i0.ɵɵtext(46, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "button", 105);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_104_div_1_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r116); const ctx_r121 = i0.ɵɵnextContext(2); return ctx_r121.saveRecord(); });
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r98 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r98.selectedMission.type)("disabled", !ctx_r98.isCreateMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditRecordType.MISSION_AUDIT);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT ? "R\u00E8gle DNSSI" : "Titre");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.MISSION_AUDIT);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT ? "Recommandations" : "Objectifs");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.MISSION_AUDIT);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r98.selectedMission.type === ctx_r98.AuditRecordType.PLAN_ACTION_AUDIT ? "Responsable" : "Responsabilit\u00E9s");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r98.selectedMission.responsabilites);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r98.selectedMission.delai);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r98.selectedMission.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditMissionStatus.A_VENIR);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.statusLabelMap[ctx_r98.AuditMissionStatus.A_VENIR]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.statusLabelMap[ctx_r98.AuditMissionStatus.EN_COURS]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditMissionStatus.TERMINE);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.statusLabelMap[ctx_r98.AuditMissionStatus.TERMINE]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditMissionStatus.EN_RETARD);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.statusLabelMap[ctx_r98.AuditMissionStatus.EN_RETARD]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r98.AuditMissionStatus.ANNULE);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.statusLabelMap[ctx_r98.AuditMissionStatus.ANNULE]);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r98.isSaving);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r98.isSaving ? "Sauvegarde..." : "Sauvegarder", " ");
} }
function AuditingComponent_app_modal_104_Template(rf, ctx) { if (rf & 1) {
    const _r123 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 129);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_104_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r123); const ctx_r122 = i0.ɵɵnextContext(); return ctx_r122.showEditModal = false; });
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_104_div_1_Template, 49, 27, "div", 130);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r11.isCreateMode ? "Cr\u00E9er un enregistrement audit" : "Modifier l enregistrement");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.selectedMission);
} }
export class AuditingComponent {
    constructor(auditingService, http, router) {
        this.auditingService = auditingService;
        this.http = http;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.missions = [];
        this.allUsers = [];
        this.auditors = [];
        this.checklistTemplates = [];
        this.filteredMissions = [];
        this.showExportMenu = false;
        this.filterSearch = '';
        this.filterStatus = '';
        this.filterType = '';
        this.totalMissions = 0;
        this.inProgressCount = 0;
        this.completedCount = 0;
        this.unassignedCount = 0;
        this.isLoadingMissions = false;
        this.isAssigning = false;
        this.isReporting = false;
        this.isSaving = false;
        this.isCreateMode = false;
        this.showAssignModal = false;
        this.showReportModal = false;
        this.showDetailModal = false;
        this.showEvidenceModal = false;
        this.showChecklistModal = false;
        this.showEditModal = false;
        this.selectedMission = null;
        this.selectedAuditorId = '';
        this.currentEvidences = [];
        this.currentChecklistItems = [];
        this.backendUrl = environment.apiUrl.replace('/api', '');
        this.reportData = {
            rapport: '',
            recommandations: ''
        };
        this.AuditMissionStatus = AuditMissionStatus;
        this.AuditRecordType = AuditRecordType;
        this.statusLabelMap = {
            [AuditMissionStatus.A_VENIR]: 'A venir',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.TERMINE]: 'Terminé',
            [AuditMissionStatus.EN_RETARD]: 'En retard',
            [AuditMissionStatus.ANNULE]: 'Annulé'
        };
        this.typeLabelMap = {
            [AuditRecordType.MISSION_AUDIT]: 'Mission',
            [AuditRecordType.PLAN_ACTION_AUDIT]: 'Plan d action'
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        if (this.isAuditor && !this.isSeniorAuditor) {
            this.router.navigate(['/dashboard/auditor-missions']);
            return;
        }
        this.loadMissions();
        this.loadUsers();
        this.loadTemplates();
    }
    loadTemplates() {
        this.auditingService.getChecklistTemplates().subscribe({
            next: (data) => this.checklistTemplates = data,
            error: (err) => console.error(err)
        });
    }
    get isSeniorAuditor() {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role === UserRole.AUDIT_SENIOR || user.role === UserRole.SUPER_ADMIN;
    }
    get isAuditor() {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role === UserRole.AUDITEUR || user.role === UserRole.SUPER_ADMIN;
    }
    loadMissions() {
        this.isLoadingMissions = true;
        this.auditingService.getMissions('all').subscribe({
            next: (data) => {
                this.missions = data;
                this.applyFilters();
                this.calculateStats();
                this.isLoadingMissions = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoadingMissions = false;
            }
        });
    }
    applyFilters() {
        this.filteredMissions = this.missions.filter((m) => {
            const q = this.filterSearch.toLowerCase();
            const matchSearch = !this.filterSearch
                || (m.titre || '').toLowerCase().includes(q)
                || (m.code || '').toLowerCase().includes(q)
                || (m.regleDnssi || '').toLowerCase().includes(q)
                || (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(q));
            const missionStatut = (m.statutCode || m.statut || '').toLowerCase();
            const filterStatut = (this.filterStatus || '').toLowerCase();
            const matchStatus = !filterStatut || missionStatut === filterStatut;
            const matchType = !this.filterType || m.type === this.filterType;
            return matchSearch && matchStatus && matchType;
        });
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.filterType = '';
        this.applyFilters();
    }
    calculateStats() {
        this.totalMissions = this.missions.length;
        this.inProgressCount = this.missions.filter((m) => this.normalizeMissionStatus(m.statutCode || m.statut) === AuditMissionStatus.EN_COURS).length;
        this.completedCount = this.missions.filter((m) => this.normalizeMissionStatus(m.statutCode || m.statut) === AuditMissionStatus.TERMINE).length;
        this.unassignedCount = this.missions.filter((m) => !m.auditeurId).length;
    }
    loadUsers() {
        this.http.get(`${environment.apiUrl}/users/assignable/auditors`).subscribe((users) => {
            this.allUsers = users;
            this.auditors = [...users];
        });
    }
    openDetailModal(mission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }
    openCreateModal(type = AuditRecordType.PLAN_ACTION_AUDIT) {
        this.isCreateMode = true;
        this.selectedMission = {
            id: 0,
            type,
            titre: '',
            objectifs: '',
            responsabilites: '',
            statut: AuditMissionStatus.A_VENIR,
            riskId: null,
            auditSeniorId: 0,
            auditeurId: null,
            delai: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            regleDnssi: '',
            recommandations: '',
            ordre: 0,
            horizon: 'court_terme',
            priorite: 1
        };
        this.showEditModal = true;
    }
    openAssignModal(mission) {
        this.selectedMission = mission;
        this.selectedAuditorId = mission.auditeurId ? mission.auditeurId.toString() : '';
        this.showAssignModal = true;
    }
    openEditModal(mission) {
        var _a;
        this.isCreateMode = false;
        this.selectedMission = JSON.parse(JSON.stringify(mission));
        if ((_a = this.selectedMission) === null || _a === void 0 ? void 0 : _a.delai) {
            this.selectedMission.delai = new Date(this.selectedMission.delai).toISOString().split('T')[0];
        }
        this.showEditModal = true;
    }
    saveRecord() {
        if (!this.selectedMission)
            return;
        this.isSaving = true;
        const payload = Object.assign({}, this.selectedMission);
        const request = this.isCreateMode
            ? this.auditingService.createMission(payload)
            : this.auditingService.updateMission(this.selectedMission.id, payload);
        request.subscribe({
            next: () => {
                this.isSaving = false;
                this.showEditModal = false;
                this.loadMissions();
            },
            error: (err) => {
                console.error(err);
                this.isSaving = false;
                alert('Erreur lors de la sauvegarde.');
            }
        });
    }
    assignMission(auditeurId = this.selectedAuditorId) {
        if (!this.selectedMission || !auditeurId)
            return;
        this.isAssigning = true;
        this.auditingService.assignMission(this.selectedMission.id, parseInt(auditeurId, 10)).subscribe({
            next: () => {
                this.isAssigning = false;
                this.showAssignModal = false;
                this.selectedAuditorId = '';
                this.loadMissions();
            },
            error: (err) => {
                console.error(err);
                this.isAssigning = false;
            }
        });
    }
    canAssignAuditor(mission) {
        const missionStatus = this.normalizeMissionStatus(mission.statutCode || mission.statut);
        return this.isSeniorAuditor && missionStatus !== AuditMissionStatus.TERMINE && missionStatus !== AuditMissionStatus.ANNULE;
    }
    normalizeMissionStatus(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    openEvidenceModal(mission) {
        this.selectedMission = mission;
        this.isLoadingMissions = true;
        this.auditingService.getMissionEvidence(mission.id).subscribe({
            next: (data) => {
                this.currentEvidences = data;
                this.isLoadingMissions = false;
                this.showEvidenceModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoadingMissions = false;
            }
        });
    }
    downloadEvidence(path) {
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        window.open(urlWithToken, '_blank');
    }
    deleteEvidence(evidenceId) {
        if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?'))
            return;
        this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
            next: () => {
                this.currentEvidences = this.currentEvidences.filter((e) => e.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    openChecklistModal(mission) {
        this.selectedMission = mission;
        this.isLoadingMissions = true;
        this.auditingService.getMissionActionPlanItems(mission.id).subscribe({
            next: (data) => {
                this.currentChecklistItems = data;
                this.isLoadingMissions = false;
                this.showChecklistModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoadingMissions = false;
                alert('Erreur lors du chargement du plan d actions');
            }
        });
    }
    openReportModal(mission) {
        this.selectedMission = mission;
        this.reportData = {
            rapport: mission.rapport || '',
            recommandations: mission.recommandations || ''
        };
        this.showReportModal = true;
    }
    submitReport() {
        if (!this.selectedMission)
            return;
        this.isReporting = true;
        this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
            next: () => {
                this.isReporting = false;
                this.showReportModal = false;
                this.loadMissions();
            },
            error: (err) => {
                console.error(err);
                this.isReporting = false;
            }
        });
    }
    deleteMission(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?'))
            return;
        this.auditingService.deleteMission(id).subscribe({
            next: () => this.loadMissions(),
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    resetMission(id) {
        if (!confirm('Réinitialiser cette mission ?'))
            return;
        this.auditingService.resetMission(id).subscribe({
            next: () => this.loadMissions(),
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la réinitialisation.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    exportToXLSX() {
        const dataToExport = this.filteredMissions.map((m) => ({
            'Type': this.typeLabelMap[m.type] || m.type,
            'Code': m.code || m.id,
            'Titre': m.regleDnssi || m.titre,
            'Description': m.recommandations || m.objectifs || '',
            'Auditeur/Responsable': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
            'Échéance': m.delai ? new Date(m.delai).toLocaleDateString() : '',
            'Statut': this.statusLabelMap[String(m.statut)] || m.statut
        }));
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Audit');
        XLSX.writeFile(wb, `Export_Audit_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }
    exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text('Rapport de Gestion des Audits', 14, 22);
        const columns = ['Type', 'Code', 'Titre', 'Responsable', 'Échéance', 'Statut'];
        const rows = this.filteredMissions.map((m) => [
            this.typeLabelMap[m.type] || m.type,
            m.code || String(m.id),
            m.regleDnssi || m.titre,
            m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
            m.delai ? new Date(m.delai).toLocaleDateString() : '',
            this.statusLabelMap[String(m.statut)] || m.statut
        ]);
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 4 }
        });
        doc.save(`Export_Audit_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
AuditingComponent.ɵfac = function AuditingComponent_Factory(t) { return new (t || AuditingComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.HttpClient), i0.ɵɵdirectiveInject(i3.Router)); };
AuditingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditingComponent, selectors: [["app-auditing"]], decls: 105, vars: 34, consts: [[1, "audit-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-clipboard-check"], [1, "header-actions"], ["class", "btn-ai-plan", 3, "click", 4, "ngIf"], [1, "export-dropdown"], [1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], ["class", "audit-tabs", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-layer-group"], [1, "stat-info"], [1, "label"], [1, "value"], [1, "stat-card", "pending"], [1, "fas", "fa-play-circle"], [1, "stat-card", "completed"], [1, "fas", "fa-check-double"], [1, "stat-card", "risks"], [1, "fas", "fa-user-clock"], [1, "tab-content"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-clone"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], [1, "fas", "fa-tasks"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], ["title", "Affecter un responsable", 3, "close", 4, "ngIf"], ["title", "Soumettre Rapport d'Audit", 3, "close", 4, "ngIf"], ["title", "D\u00E9tails", 3, "close", 4, "ngIf"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close", 4, "ngIf"], ["title", "Plans li\u00E9s historiquement \u00E0 la mission", 3, "close", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], [1, "btn-ai-plan", 3, "click"], [1, "fas", "fa-plus"], [1, "fas", "fa-briefcase"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "mission-info"], ["class", "auditor-chip", 4, "ngIf", "ngIfElse"], ["unassigned", ""], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-assign", "title", "Assigner", 3, "click", 4, "ngIf"], ["class", "action-btn btn-checklist", "title", "Historique plan li\u00E9", 3, "click", 4, "ngIf"], ["class", "action-btn btn-report", "title", "Faire le rapport", 3, "click", 4, "ngIf"], ["class", "action-btn btn-edit", "title", "Modifier", 3, "click", 4, "ngIf"], ["class", "action-btn btn-evidence", "title", "Preuves", 3, "click", 4, "ngIf"], ["class", "action-btn btn-reset", "title", "R\u00E9initialiser", 3, "click", 4, "ngIf"], ["class", "action-btn btn-delete", "title", "Supprimer", 3, "click", 4, "ngIf"], [1, "auditor-chip"], [1, "fas", "fa-user-tie"], [1, "text-muted"], ["title", "Assigner", 1, "action-btn", "btn-assign", 3, "click"], [1, "fas", "fa-user-plus"], ["title", "Historique plan li\u00E9", 1, "action-btn", "btn-checklist", 3, "click"], [1, "fas", "fa-list-check", 2, "color", "#10b981"], ["title", "Faire le rapport", 1, "action-btn", "btn-report", 3, "click"], [1, "fas", "fa-file-signature"], ["title", "Modifier", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], ["title", "Preuves", 1, "action-btn", "btn-evidence", 3, "click"], [1, "fas", "fa-paperclip"], ["title", "R\u00E9initialiser", 1, "action-btn", "btn-reset", 3, "click"], ["title", "Supprimer", 1, "action-btn", "btn-delete", 3, "click"], [1, "fas", "fa-trash-alt"], ["colspan", "7", 1, "empty-state"], [1, "fas", "fa-folder-open"], ["title", "Affecter un responsable", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-group"], [1, "finput", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], ["title", "Soumettre Rapport d'Audit", 3, "close"], [1, "form-group", "full"], ["rows", "6", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "4", 1, "finput", 3, "ngModel", "ngModelChange"], ["title", "D\u00E9tails", 3, "close"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-item", "full"], [1, "btn-save", 3, "click"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close"], ["class", "empty-state", 4, "ngIf"], ["class", "evidence-list", 4, "ngIf"], [1, "form-footer", 2, "margin-top", "20px"], [1, "empty-state"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "ev-info", 2, "cursor", "pointer", "display", "flex", "align-items", "center", "gap", "10px", "flex-grow", "1", 3, "click"], [1, "fas", "fa-file-alt", 2, "color", "#004a99", "font-size", "1.2rem"], [1, "ev-name"], ["class", "icon-btn delete", "title", "Supprimer", "style", "color:#ef4444; background:none; border:none; cursor:pointer; padding:5px;", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "icon-btn", "delete", 2, "color", "#ef4444", "background", "none", "border", "none", "cursor", "pointer", "padding", "5px", 3, "click"], ["title", "Plans li\u00E9s historiquement \u00E0 la mission", 3, "close"], [3, "title", "close"], ["modal-body", "", "class", "modal-form", 4, "ngIf"], [1, "finput", 3, "ngModel", "disabled", "ngModelChange"], ["class", "form-group", 4, "ngIf"], ["type", "text", "class", "finput", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "finput", "rows", "3", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["rows", "2", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "date", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "text", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "3", 1, "finput", 3, "ngModel", "ngModelChange"]], template: function AuditingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gestion des Audits");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Pilotez les missions d'audit et les plans d'actions d'audit autonomes depuis un seul \u00E9cran.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵtemplate(12, AuditingComponent_button_12_Template, 3, 0, "button", 7);
        i0.ɵɵtemplate(13, AuditingComponent_button_13_Template, 3, 0, "button", 7);
        i0.ɵɵelementStart(14, "div", 8);
        i0.ɵɵelementStart(15, "button", 9);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_15_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵtext(17, " Exporter ");
        i0.ɵɵelement(18, "i", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 12);
        i0.ɵɵelementStart(20, "button", 13);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_20_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(21, "i", 14);
        i0.ɵɵtext(22, " Excel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "button", 13);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_23_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(24, "i", 15);
        i0.ɵɵtext(25, " PDF");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(26, AuditingComponent_nav_26_Template, 2, 1, "nav", 16);
        i0.ɵɵelementStart(27, "div", 17);
        i0.ɵɵelementStart(28, "div", 18);
        i0.ɵɵelementStart(29, "div", 19);
        i0.ɵɵelement(30, "i", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 21);
        i0.ɵɵelementStart(32, "span", 22);
        i0.ɵɵtext(33, "Total");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "span", 23);
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 24);
        i0.ɵɵelementStart(37, "div", 19);
        i0.ɵɵelement(38, "i", 25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 21);
        i0.ɵɵelementStart(40, "span", 22);
        i0.ɵɵtext(41, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "span", 23);
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "div", 26);
        i0.ɵɵelementStart(45, "div", 19);
        i0.ɵɵelement(46, "i", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "div", 21);
        i0.ɵɵelementStart(48, "span", 22);
        i0.ɵɵtext(49, "Termin\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "span", 23);
        i0.ɵɵtext(51);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "div", 28);
        i0.ɵɵelementStart(53, "div", 19);
        i0.ɵɵelement(54, "i", 29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "div", 21);
        i0.ɵɵelementStart(56, "span", 22);
        i0.ɵɵtext(57, "Non assign\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "span", 23);
        i0.ɵɵtext(59);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 30);
        i0.ɵɵelementStart(61, "div", 31);
        i0.ɵɵelementStart(62, "div", 32);
        i0.ɵɵelementStart(63, "div", 33);
        i0.ɵɵelement(64, "i", 34);
        i0.ɵɵelementStart(65, "input", 35);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_input_ngModelChange_65_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function AuditingComponent_Template_input_ngModelChange_65_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div", 33);
        i0.ɵɵelement(67, "i", 36);
        i0.ɵɵelementStart(68, "select", 37);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_select_ngModelChange_68_listener($event) { return ctx.filterType = $event; })("change", function AuditingComponent_Template_select_change_68_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(69, "option", 38);
        i0.ɵɵtext(70, "Tous les types");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "option", 39);
        i0.ɵɵtext(72, "Mission");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "option", 39);
        i0.ɵɵtext(74, "Plan d action");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "div", 33);
        i0.ɵɵelement(76, "i", 40);
        i0.ɵɵelementStart(77, "select", 37);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_select_ngModelChange_77_listener($event) { return ctx.filterStatus = $event; })("change", function AuditingComponent_Template_select_change_77_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(78, "option", 38);
        i0.ɵɵtext(79, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "option", 39);
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "option", 39);
        i0.ɵɵtext(83);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(84, "option", 39);
        i0.ɵɵtext(85);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(86, "option", 39);
        i0.ɵɵtext(87);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(88, "option", 39);
        i0.ɵɵtext(89);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(90, AuditingComponent_button_90_Template, 3, 0, "button", 41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(91, "div", 42);
        i0.ɵɵelementStart(92, "span", 43);
        i0.ɵɵelementStart(93, "strong");
        i0.ɵɵtext(94);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(95, " enregistrement(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(96, "div", 44);
        i0.ɵɵtemplate(97, AuditingComponent_div_97_Template, 3, 0, "div", 45);
        i0.ɵɵtemplate(98, AuditingComponent_table_98_Template, 20, 2, "table", 46);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(99, AuditingComponent_app_modal_99_Template, 19, 5, "app-modal", 47);
        i0.ɵɵtemplate(100, AuditingComponent_app_modal_100_Template, 16, 4, "app-modal", 48);
        i0.ɵɵtemplate(101, AuditingComponent_app_modal_101_Template, 38, 9, "app-modal", 49);
        i0.ɵɵtemplate(102, AuditingComponent_app_modal_102_Template, 9, 3, "app-modal", 50);
        i0.ɵɵtemplate(103, AuditingComponent_app_modal_103_Template, 5, 2, "app-modal", 51);
        i0.ɵɵtemplate(104, AuditingComponent_app_modal_104_Template, 2, 2, "app-modal", 52);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngIf", ctx.isSeniorAuditor);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSeniorAuditor);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.totalMissions);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.inProgressCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.completedCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.unassignedCount);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.filterSearch);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filterType);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.AuditRecordType.MISSION_AUDIT);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("value", ctx.AuditRecordType.PLAN_ACTION_AUDIT);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.filterStatus);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.A_VENIR);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.A_VENIR]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.EN_COURS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.EN_COURS]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.TERMINE);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.TERMINE]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.EN_RETARD);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.EN_RETARD]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.ANNULE);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.ANNULE]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filterSearch || ctx.filterStatus || ctx.filterType);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredMissions.length);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAssignModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showReportModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEvidenceModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showChecklistModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEditModal);
    } }, directives: [i4.NgIf, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i5.SelectControlValueAccessor, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i4.NgForOf, i3.RouterLinkWithHref, i3.RouterLinkActive, i6.ModalComponent], pipes: [i4.DatePipe], styles: ["@import './audit-shared';\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n    min-height: 100vh;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 20px;\n    margin-bottom: 26px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 24px;\n    border-radius: 20px;\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.8);\n    transition: transform 0.3s ease;\n}\n\n.stat-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-4px);\n}\n\n.stat-icon[_ngcontent-%COMP%] {\n    width: 56px;\n    height: 56px;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.5rem;\n}\n\n.stat-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 0.85rem;\n    color: #64748b;\n    font-weight: 600;\n    margin-bottom: 4px;\n}\n\n.stat-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n    font-weight: 800;\n    color: #0f172a;\n}\n\n.stat-card.total[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #eef2ff;\n    color: #6366f1;\n}\n\n.stat-card.pending[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fffbe6;\n    color: #f59e0b;\n}\n\n.stat-card.completed[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #f0fdf4;\n    color: #10b981;\n}\n\n.stat-card.risks[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fff1f2;\n    color: #e11d48;\n}\n\r\n\r\n\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 28px;\r\n    border-radius: 14px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.95rem;\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);\r\n    filter: brightness(1.1);\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n    filter: grayscale(0.5);\r\n}\r\n\r\n\r\n.tabs-nav[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 12px;\r\n    margin-bottom: 25px;\r\n    padding: 6px;\r\n    background: rgba(226, 232, 240, 0.5);\r\n    border-radius: 16px;\r\n    width: fit-content;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    background: transparent;\r\n    border: none;\r\n    padding: 10px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\r\n    background: white;\r\n    color: #0f172a;\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n\r\n.missions-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 24px;\r\n    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    overflow: hidden;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    background: #f8fafc;\r\n    padding: 20px;\r\n    text-align: left;\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    text-transform: uppercase;\r\n    font-weight: 700;\r\n    letter-spacing: 0.05em;\r\n    border-bottom: 2px solid #f1f5f9;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n    border-bottom: 1px solid #f8fafc;\r\n    font-size: 0.95rem;\r\n    color: #334155;\r\n    vertical-align: middle;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\r\n    background: #fcfdfe;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n    display: block;\r\n    color: #1e293b;\r\n    font-size: 1rem;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\r\n    color: #94a3b8;\r\n    font-size: 0.8rem;\r\n    display: block;\r\n    max-width: 300px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.auditor-chip[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    padding: 6px 14px;\r\n    border-radius: 100px;\r\n    font-size: 0.85rem;\r\n    color: #475569;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    font-weight: 500;\r\n    border: 1px solid #e2e8f0;\r\n}\r\n\r\n.risk-info-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    max-width: 250px;\r\n\r\n    .risk-id {\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n        color: #6366f1;\r\n        background: #eef2ff;\r\n        padding: 2px 8px;\r\n        border-radius: 6px;\r\n        width: fit-content;\r\n    }\r\n\r\n    .risk-name {\r\n        font-weight: 600;\r\n        color: #334155;\r\n        font-size: 0.9rem;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n    padding: 6px 14px;\r\n    border-radius: 100px;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.02em;\r\n}\r\n\r\n.status-\u00E0-venir[_ngcontent-%COMP%] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\r\n    border: 1px solid #bae6fd;\r\n}\r\n\r\n.status-en-cours[_ngcontent-%COMP%] {\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n    border: 1px solid #fde68a;\r\n}\r\n\r\n.status-termin\u00E9[_ngcontent-%COMP%] {\r\n    background: #dcfce7;\r\n    color: #166534;\r\n    border: 1px solid #bbf7d0;\r\n}\r\n\r\n.status-en-retard[_ngcontent-%COMP%] {\r\n    background: #fee2e2;\r\n    color: #b91c1c;\r\n    border: 1px solid #fecaca;\r\n}\r\n\r\n\r\n.actions-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 8px;\r\n}\r\n\r\n.action-btn[_ngcontent-%COMP%] {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%]:hover {\r\n    background: #eef2ff;\r\n    border-color: #c7d2fe;\r\n}\r\n\r\n.btn-assign[_ngcontent-%COMP%]:hover {\r\n    background: #ecfdf5;\r\n    border-color: #a7f3d0;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%] {\r\n    color: #3b82f6;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%]:hover {\r\n    background: #eff6ff;\r\n    border-color: #bfdbfe;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%] {\r\n    color: #f59e0b;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%]:hover {\r\n    background: #fffbeb;\r\n    border-color: #fde68a;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n    color: #64748b;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%]:hover {\r\n    background: #fef2f2;\r\n    border-color: #fecaca;\r\n}\r\n\r\n\r\n.suggested-plan-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\r\n    gap: 25px;\r\n    margin-top: 25px;\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    border: 1px solid #e2e8f0;\r\n    display: flex;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.suggestion-card.selected[_ngcontent-%COMP%] {\r\n    border-color: #6366f1;\r\n    background: #fbfbfe;\r\n}\r\n\r\n.card-check[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    background: #f8fafc;\r\n    border-right: 1px solid #e2e8f0;\r\n    cursor: pointer;\r\n    color: #cbd5e1;\r\n    font-size: 1.4rem;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.selected[_ngcontent-%COMP%]   .card-check[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n    background: #eef2ff;\r\n    border-right-color: #c7d2fe;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    flex: 1;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 1.1rem;\r\n    color: #0f172a;\r\n    font-weight: 700;\r\n    line-height: 1.3;\r\n}\r\n\r\n.obj[_ngcontent-%COMP%], .resp[_ngcontent-%COMP%] {\r\n    font-size: 0.9rem;\r\n    color: #475569;\r\n    margin: 10px 0;\r\n    line-height: 1.5;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n    margin-top: 20px;\r\n    font-size: 0.8rem;\r\n    color: #94a3b8;\r\n    border-top: 1px solid #f1f5f9;\r\n    padding-top: 15px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n\r\n.modal-form[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 24px;\r\n    padding: 10px 5px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    color: #334155;\r\n}\r\n\r\n.req[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    padding: 12px 16px;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\r\n    font-family: inherit;\r\n    font-size: 0.95rem;\r\n    transition: all 0.2s;\r\n    background: #f8fafc;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%]:focus {\r\n    outline: none;\r\n    border-color: #6366f1;\r\n    background: white;\r\n    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);\r\n}\r\n\r\n.form-footer[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 12px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    color: #475569;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-save[_ngcontent-%COMP%] {\r\n    background: #0f172a;\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 20px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%] {\r\n    padding: 15px;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    font-size: 0.75rem;\r\n    text-transform: uppercase;\r\n    color: #94a3b8;\r\n    margin-bottom: 5px;\r\n    font-weight: 700;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: #1e293b;\r\n    font-weight: 600;\r\n}\r\n\r\n.detail-item.full[_ngcontent-%COMP%] {\r\n    grid-column: 1 / -1;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditingComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditing',
                templateUrl: './auditing.component.html',
                styleUrls: ['./auditing.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.HttpClient }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=auditing.component.js.map