import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../core/services/auditing.service';
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
const _c0 = function () { return { exact: true }; };
function AuditingComponent_nav_24_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r12.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r12.label, " ");
} }
function AuditingComponent_nav_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 39);
    i0.ɵɵtemplate(1, AuditingComponent_nav_24_a_1_Template, 2, 4, "a", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditingComponent_button_46_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function AuditingComponent_button_46_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.clearFilters(); });
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Chargement des missions... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵelement(1, "i", 68);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r17.auditeur.prenom, " ", mission_r17.auditeur.nom, " ");
} }
function AuditingComponent_table_54_tr_16_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em", 69);
    i0.ɵɵtext(1, "Non assign\u00E9e");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.openAssignModal(mission_r17); });
    i0.ɵɵelement(1, "i", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("title", mission_r17.auditeur ? "R\u00E9assigner un auditeur" : "Assigner un auditeur");
} }
function AuditingComponent_table_54_tr_16_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 72);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r35); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.openAssignChecklistModal(mission_r17); });
    i0.ɵɵelement(1, "i", 73);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 74);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r38); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r36 = i0.ɵɵnextContext(2); return ctx_r36.openChecklistModal(mission_r17); });
    i0.ɵɵelement(1, "i", 75);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 76);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r41); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r39 = i0.ɵɵnextContext(2); return ctx_r39.openReportModal(mission_r17); });
    i0.ɵɵelement(1, "i", 77);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_31_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r44); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r42 = i0.ɵɵnextContext(2); return ctx_r42.openEditModal(mission_r17); });
    i0.ɵɵelement(1, "i", 79);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 80);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r47); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r45 = i0.ɵɵnextContext(2); return ctx_r45.resetMission(mission_r17.id); });
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 81);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_button_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r50); const mission_r17 = i0.ɵɵnextContext().$implicit; const ctx_r48 = i0.ɵɵnextContext(2); return ctx_r48.deleteMission(mission_r17.id); });
    i0.ɵɵelement(1, "i", 82);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r52 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "div", 49);
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵelementStart(9, "div", 50);
    i0.ɵɵelementStart(10, "span", 51);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 52);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtemplate(15, AuditingComponent_table_54_tr_16_div_15_Template, 3, 2, "div", 53);
    i0.ɵɵtemplate(16, AuditingComponent_table_54_tr_16_ng_template_16_Template, 2, 0, "ng-template", null, 54, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td");
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 55);
    i0.ɵɵelementStart(25, "button", 56);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_Template_button_click_25_listener() { const restoredCtx = i0.ɵɵrestoreView(_r52); const mission_r17 = restoredCtx.$implicit; const ctx_r51 = i0.ɵɵnextContext(2); return ctx_r51.openDetailModal(mission_r17); });
    i0.ɵɵelement(26, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, AuditingComponent_table_54_tr_16_button_27_Template, 2, 1, "button", 58);
    i0.ɵɵtemplate(28, AuditingComponent_table_54_tr_16_button_28_Template, 2, 0, "button", 59);
    i0.ɵɵtemplate(29, AuditingComponent_table_54_tr_16_button_29_Template, 2, 0, "button", 60);
    i0.ɵɵtemplate(30, AuditingComponent_table_54_tr_16_button_30_Template, 2, 0, "button", 61);
    i0.ɵɵtemplate(31, AuditingComponent_table_54_tr_16_button_31_Template, 2, 0, "button", 62);
    i0.ɵɵelementStart(32, "button", 63);
    i0.ɵɵlistener("click", function AuditingComponent_table_54_tr_16_Template_button_click_32_listener() { const restoredCtx = i0.ɵɵrestoreView(_r52); const mission_r17 = restoredCtx.$implicit; const ctx_r53 = i0.ɵɵnextContext(2); return ctx_r53.openEvidenceModal(mission_r17); });
    i0.ɵɵelement(33, "i", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(34, AuditingComponent_table_54_tr_16_button_34_Template, 2, 0, "button", 65);
    i0.ɵɵtemplate(35, AuditingComponent_table_54_tr_16_button_35_Template, 2, 0, "button", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r17 = ctx.$implicit;
    const _r19 = i0.ɵɵreference(17);
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r17.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind3(7, 18, mission_r17.objectifs, 0, 60), "...");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("title", mission_r17.risk == null ? null : mission_r17.risk.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", mission_r17.riskId, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((mission_r17.risk == null ? null : mission_r17.risk.titre) || "Chargement...");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mission_r17.auditeur)("ngIfElse", _r19);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 22, mission_r17.delai, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + mission_r17.statut.replace("_", "-"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r15.statusLabelMap[mission_r17.statut] || mission_r17.statut);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r15.canAssignAuditor(mission_r17));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isSeniorAuditor && mission_r17.statut !== ctx_r15.AuditMissionStatus.TERMINE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isSeniorAuditor && mission_r17.checklistTemplateId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isAuditor && mission_r17.statut === ctx_r15.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isSeniorAuditor);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r15.isSeniorAuditor && mission_r17.statut === ctx_r15.AuditMissionStatus.TERMINE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isSeniorAuditor);
} }
function AuditingComponent_table_54_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 83);
    i0.ɵɵelement(2, "i", 84);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucune mission d'audit enregistr\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Risque Associ\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, AuditingComponent_table_54_tr_16_Template, 36, 25, "tr", 47);
    i0.ɵɵtemplate(17, AuditingComponent_table_54_tr_17_Template, 5, 0, "tr", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.missions.length === 0);
} }
function AuditingComponent_app_modal_55_option_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r57 = ctx.$implicit;
    i0.ɵɵproperty("value", u_r57.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", u_r57.prenom, " ", u_r57.nom, "");
} }
function AuditingComponent_app_modal_55_p_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 95);
    i0.ɵɵtext(1, " Aucun auditeur assignable n'a ete charge pour le moment. ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_55_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 85);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_55_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.showAssignModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Assignez un auditeur qualifi\u00E9 pour la mission : ");
    i0.ɵɵelement(5, "br");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 88);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Choisir un Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 89);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_55_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r60 = i0.ɵɵnextContext(); return ctx_r60.selectedAuditorId = $event; });
    i0.ɵɵelementStart(12, "option", 24);
    i0.ɵɵtext(13, "S\u00E9lectionner...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, AuditingComponent_app_modal_55_option_14_Template, 2, 3, "option", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, AuditingComponent_app_modal_55_p_15_Template, 2, 0, "p", 91);
    i0.ɵɵelementStart(16, "div", 92);
    i0.ɵɵelementStart(17, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_55_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r59); const ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.showAssignModal = false; });
    i0.ɵɵtext(18, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 94);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_55_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r59); const ctx_r62 = i0.ɵɵnextContext(); return ctx_r62.assignMission(); });
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r4.getAssignAuditorModalTitle());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r4.selectedMission == null ? null : ctx_r4.selectedMission.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r4.selectedAuditorId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r4.auditors);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.auditors.length === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r4.selectedAuditorId || ctx_r4.isAssigning || ctx_r4.auditors.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.isAssigning ? "Assignation..." : ctx_r4.getAssignAuditorActionLabel(), " ");
} }
function AuditingComponent_app_modal_56_option_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r66 = ctx.$implicit;
    i0.ɵɵproperty("value", t_r66.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(t_r66.titre);
} }
function AuditingComponent_app_modal_56_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 96);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_56_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r68); const ctx_r67 = i0.ɵɵnextContext(); return ctx_r67.showAssignChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Choisissez un mod\u00E8le de checklist pour la mission : ");
    i0.ɵɵelement(5, "br");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 88);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Mod\u00E8le de Checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 97, 98);
    i0.ɵɵelementStart(13, "option", 24);
    i0.ɵɵtext(14, "S\u00E9lectionner un mod\u00E8le...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, AuditingComponent_app_modal_56_option_15_Template, 2, 2, "option", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 92);
    i0.ɵɵelementStart(17, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_56_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r68); const ctx_r69 = i0.ɵɵnextContext(); return ctx_r69.showAssignChecklistModal = false; });
    i0.ɵɵtext(18, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 94);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_56_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r68); const _r64 = i0.ɵɵreference(12); const ctx_r70 = i0.ɵɵnextContext(); return ctx_r70.assignChecklistToMission(_r64.value); });
    i0.ɵɵtext(20, " Assigner ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r64 = i0.ɵɵreference(12);
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r5.selectedMission == null ? null : ctx_r5.selectedMission.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r5.selectedMission == null ? null : ctx_r5.selectedMission.checklistTemplateId);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r5.checklistTemplates);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !_r64.value);
} }
function AuditingComponent_app_modal_57_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 99);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_57_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r73); const ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.showReportModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵelementStart(3, "div", 100);
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Rapport Final d'Audit ");
    i0.ɵɵelementStart(6, "span", 101);
    i0.ɵɵtext(7, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 102);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_57_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r73); const ctx_r74 = i0.ɵɵnextContext(); return ctx_r74.reportData.rapport = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 100);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Recommandations ");
    i0.ɵɵelementStart(12, "span", 101);
    i0.ɵɵtext(13, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "textarea", 103);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_57_Template_textarea_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r73); const ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 92);
    i0.ɵɵelementStart(16, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_57_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r73); const ctx_r76 = i0.ɵɵnextContext(); return ctx_r76.showReportModal = false; });
    i0.ɵɵtext(17, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 94);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_57_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r73); const ctx_r77 = i0.ɵɵnextContext(); return ctx_r77.submitReport(); });
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", ctx_r6.reportData.rapport);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r6.reportData.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r6.reportData.rapport || ctx_r6.isReporting);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.isReporting ? "Envoi..." : "Soumettre le Rapport", " ");
} }
function AuditingComponent_app_modal_58_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Rapport d'Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 110);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r79 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r79.selectedMission == null ? null : ctx_r79.selectedMission.rapport);
} }
function AuditingComponent_app_modal_58_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 110);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r80 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r80.selectedMission == null ? null : ctx_r80.selectedMission.recommandations);
} }
function AuditingComponent_app_modal_58_Template(rf, ctx) { if (rf & 1) {
    const _r82 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 104);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_58_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r82); const ctx_r81 = i0.ɵɵnextContext(); return ctx_r81.showDetailModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵelementStart(3, "div", 105);
    i0.ɵɵelementStart(4, "div", 106);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 106);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 107);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Objectifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 107);
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Responsabilit\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 106);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 106);
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, "Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(35, AuditingComponent_app_modal_58_div_35_Template, 5, 1, "div", 108);
    i0.ɵɵtemplate(36, AuditingComponent_app_modal_58_div_36_Template, 5, 1, "div", 108);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 92);
    i0.ɵɵelementStart(38, "button", 109);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_58_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r82); const ctx_r83 = i0.ɵɵnextContext(); return ctx_r83.showDetailModal = false; });
    i0.ɵɵtext(39, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge status-" + (ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.statut == null ? null : ctx_r7.selectedMission.statut.replace("_", "-")));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.statusLabelMap[ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.statut] || (ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.statut), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.objectifs);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.responsabilites);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(29, 10, ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.delai, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.auditeur) ? (ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.auditeur.prenom) + " " + (ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.auditeur.nom) : "Non assign\u00E9");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.rapport);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.recommandations);
} }
function AuditingComponent_app_modal_59_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Chargement des preuves... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_59_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 115);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune preuve t\u00E9l\u00E9vers\u00E9e pour cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_59_ul_5_li_1_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r93 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 124);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_59_ul_5_li_1_button_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r93); const ev_r89 = i0.ɵɵnextContext().$implicit; const ctx_r91 = i0.ɵɵnextContext(3); return ctx_r91.deleteEvidence(ev_r89.id); });
    i0.ɵɵelement(1, "i", 82);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_59_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r95 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 118);
    i0.ɵɵelementStart(1, "div", 119);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_59_ul_5_li_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r95); const ev_r89 = restoredCtx.$implicit; const ctx_r94 = i0.ɵɵnextContext(3); return ctx_r94.downloadEvidence(ev_r89.path); });
    i0.ɵɵelement(2, "i", 120);
    i0.ɵɵelementStart(3, "span", 121);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 122);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AuditingComponent_app_modal_59_ul_5_li_1_button_8_Template, 2, 0, "button", 123);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r89 = ctx.$implicit;
    const ctx_r88 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ev_r89.filename);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", i0.ɵɵpipeBind2(7, 5, ev_r89.createdAt, "dd/MM/yyyy HH:mm"), " par ", ev_r89.uploader == null ? null : ev_r89.uploader.prenom, " ", ev_r89.uploader == null ? null : ev_r89.uploader.nom, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r88.isSeniorAuditor);
} }
function AuditingComponent_app_modal_59_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 116);
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_59_ul_5_li_1_Template, 9, 8, "li", 117);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r87 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r87.currentEvidences);
} }
function AuditingComponent_app_modal_59_Template(rf, ctx) { if (rf & 1) {
    const _r97 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 111);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_59_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r97); const ctx_r96 = i0.ɵɵnextContext(); return ctx_r96.showEvidenceModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_59_div_3_Template, 3, 0, "div", 30);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_59_div_4_Template, 3, 0, "div", 112);
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_59_ul_5_Template, 2, 1, "ul", 113);
    i0.ɵɵelementStart(6, "div", 114);
    i0.ɵɵelementStart(7, "button", 109);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_59_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r97); const ctx_r98 = i0.ɵɵnextContext(); return ctx_r98.showEvidenceModal = false; });
    i0.ɵɵtext(8, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r8.isLoadingMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.isLoadingMissions && ctx_r8.currentEvidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.isLoadingMissions && ctx_r8.currentEvidences.length > 0);
} }
function AuditingComponent_app_modal_60_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_60_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 115);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun \u00E9l\u00E9ment dans cette checklist.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_60_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 129);
    i0.ɵɵelement(1, "i", 130);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r104 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("color", item_r104.estFait ? "#10b981" : "#94a3b8");
    i0.ɵɵproperty("ngClass", item_r104.estFait ? "fas fa-check-square" : "far fa-square");
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("text-decoration", item_r104.estFait ? "line-through" : "none")("color", item_r104.estFait ? "#64748b" : "#334155");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r104.texte);
} }
function AuditingComponent_app_modal_60_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 127);
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_60_ul_5_li_1_Template, 4, 8, "li", 128);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r102 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r102.currentChecklistItems);
} }
function AuditingComponent_app_modal_60_Template(rf, ctx) { if (rf & 1) {
    const _r106 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 125);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_60_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r106); const ctx_r105 = i0.ɵɵnextContext(); return ctx_r105.showChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 86, 87);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_60_div_3_Template, 3, 0, "div", 30);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_60_div_4_Template, 3, 0, "div", 112);
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_60_ul_5_Template, 2, 1, "ul", 126);
    i0.ɵɵelementStart(6, "div", 114);
    i0.ɵɵelementStart(7, "button", 109);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_60_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r106); const ctx_r107 = i0.ɵɵnextContext(); return ctx_r107.showChecklistModal = false; });
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
    i0.ɵɵproperty("ngIf", !ctx_r9.isLoadingMissions && ctx_r9.currentChecklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r9.isLoadingMissions && ctx_r9.currentChecklistItems.length > 0);
} }
function AuditingComponent_app_modal_61_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r111 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 86, 87);
    i0.ɵɵelementStart(2, "div", 100);
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵtext(4, "Titre de la Mission ");
    i0.ɵɵelementStart(5, "span", 101);
    i0.ɵɵtext(6, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 133);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_61_div_1_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r110 = i0.ɵɵnextContext(2); return ctx_r110.selectedMission.titre = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 100);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Objectifs ");
    i0.ɵɵelementStart(11, "span", 101);
    i0.ɵɵtext(12, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "textarea", 134);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_61_div_1_Template_textarea_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r112 = i0.ɵɵnextContext(2); return ctx_r112.selectedMission.objectifs = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 100);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Responsabilit\u00E9s ");
    i0.ɵɵelementStart(17, "span", 101);
    i0.ɵɵtext(18, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "textarea", 135);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_61_div_1_Template_textarea_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r113 = i0.ɵɵnextContext(2); return ctx_r113.selectedMission.responsabilites = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 105);
    i0.ɵɵelementStart(21, "div", 88);
    i0.ɵɵelementStart(22, "label");
    i0.ɵɵtext(23, "\u00C9ch\u00E9ance ");
    i0.ɵɵelementStart(24, "span", 101);
    i0.ɵɵtext(25, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 136);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_61_div_1_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r114 = i0.ɵɵnextContext(2); return ctx_r114.selectedMission.delai = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 88);
    i0.ɵɵelementStart(28, "label");
    i0.ɵɵtext(29, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 89);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_61_div_1_Template_select_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r115 = i0.ɵɵnextContext(2); return ctx_r115.selectedMission.statut = $event; });
    i0.ɵɵelementStart(31, "option", 25);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 25);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 25);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 25);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 25);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 92);
    i0.ɵɵelementStart(42, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_61_div_1_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r111); const ctx_r116 = i0.ɵɵnextContext(2); return ctx_r116.showEditModal = false; });
    i0.ɵɵtext(43, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 109);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_61_div_1_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r111); const ctx_r117 = i0.ɵɵnextContext(2); return ctx_r117.updateMission(); });
    i0.ɵɵtext(45, " Sauvegarder les modifications ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r108 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r108.selectedMission.titre);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r108.selectedMission.objectifs);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r108.selectedMission.responsabilites);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r108.selectedMission.delai);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r108.selectedMission.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r108.AuditMissionStatus.A_VENIR);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.statusLabelMap[ctx_r108.AuditMissionStatus.A_VENIR]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r108.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.statusLabelMap[ctx_r108.AuditMissionStatus.EN_COURS]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r108.AuditMissionStatus.TERMINE);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.statusLabelMap[ctx_r108.AuditMissionStatus.TERMINE]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r108.AuditMissionStatus.EN_RETARD);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.statusLabelMap[ctx_r108.AuditMissionStatus.EN_RETARD]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r108.AuditMissionStatus.ANNULE);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.statusLabelMap[ctx_r108.AuditMissionStatus.ANNULE]);
} }
function AuditingComponent_app_modal_61_Template(rf, ctx) { if (rf & 1) {
    const _r119 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 131);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_61_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r119); const ctx_r118 = i0.ɵɵnextContext(); return ctx_r118.showEditModal = false; });
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_61_div_1_Template, 46, 15, "div", 132);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.selectedMission);
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
        // Filter properties
        this.filterSearch = '';
        this.filterStatus = '';
        // UI States
        this.isLoadingMissions = false;
        this.isCreatingMissions = false;
        this.isAssigning = false;
        this.isReporting = false;
        // Modals
        this.showAssignModal = false;
        this.showAssignChecklistModal = false;
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
        // Report Form
        this.reportData = {
            rapport: '',
            recommandations: ''
        };
        // Expose Enum to template
        this.AuditMissionStatus = AuditMissionStatus;
        // Label mappings for UI
        this.statusLabelMap = {
            [AuditMissionStatus.A_VENIR]: 'À venir',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.TERMINE]: 'Terminé',
            [AuditMissionStatus.EN_RETARD]: 'En retard',
            [AuditMissionStatus.ANNULE]: 'Annulé'
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
        this.auditingService.getMissions().subscribe({
            next: (data) => {
                this.missions = data;
                this.applyFilters();
                this.isLoadingMissions = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoadingMissions = false;
            }
        });
    }
    applyFilters() {
        this.filteredMissions = this.missions.filter(m => {
            const matchSearch = !this.filterSearch ||
                m.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(this.filterSearch.toLowerCase()));
            const missionStatut = (m.statutCode || m.statut || '').toLowerCase();
            const filterStatut = (this.filterStatus || '').toLowerCase();
            const matchStatus = !filterStatut || missionStatut === filterStatut;
            return matchSearch && matchStatus;
        });
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }
    loadUsers() {
        this.http.get(`${environment.apiUrl}/users/assignable/auditors`).subscribe(users => {
            this.allUsers = users;
            this.auditors = [...users];
        });
    }
    openDetailModal(mission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }
    openAssignModal(mission) {
        this.selectedMission = mission;
        this.selectedAuditorId = mission.auditeurId ? mission.auditeurId.toString() : '';
        this.showAssignModal = true;
    }
    openEditModal(mission) {
        var _a;
        this.selectedMission = JSON.parse(JSON.stringify(mission));
        if ((_a = this.selectedMission) === null || _a === void 0 ? void 0 : _a.delai) {
            // Format date to YYYY-MM-DD for input type="date"
            this.selectedMission.delai = new Date(this.selectedMission.delai).toISOString().split('T')[0];
        }
        this.showEditModal = true;
    }
    updateMission() {
        if (!this.selectedMission)
            return;
        this.auditingService.updateMission(this.selectedMission.id, this.selectedMission).subscribe({
            next: () => {
                this.showEditModal = false;
                this.loadMissions();
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la modification.');
            }
        });
    }
    assignMission(auditeurId = this.selectedAuditorId) {
        if (!this.selectedMission || !auditeurId)
            return;
        this.isAssigning = true;
        this.auditingService.assignMission(this.selectedMission.id, parseInt(auditeurId)).subscribe({
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
    getAssignAuditorModalTitle() {
        var _a;
        return ((_a = this.selectedMission) === null || _a === void 0 ? void 0 : _a.auditeurId) ? 'Réassigner un auditeur' : 'Assigner un auditeur';
    }
    getAssignAuditorActionLabel() {
        var _a;
        return ((_a = this.selectedMission) === null || _a === void 0 ? void 0 : _a.auditeurId) ? 'Réassigner' : 'Assigner';
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
    // --- EVIDENCE MANAGEMENT ---
    openEvidenceModal(mission) {
        this.selectedMission = mission;
        this.isLoadingMissions = true; // Use this to show a loading state
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
        // Get token for authorization (backend allows token in query string)
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        window.open(urlWithToken, '_blank');
    }
    deleteEvidence(evidenceId) {
        if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?'))
            return;
        this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
            next: () => {
                this.currentEvidences = this.currentEvidences.filter(e => e.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    openAssignChecklistModal(mission) {
        this.selectedMission = mission;
        // To support automatic pre-selection in HTML, we will bind [value] or [(ngModel)] to selectedMission.checklistTemplateId
        this.showAssignChecklistModal = true;
    }
    assignChecklistToMission(templateIdStr) {
        const templateId = parseInt(templateIdStr, 10);
        if (!this.selectedMission || isNaN(templateId))
            return;
        this.auditingService.assignTemplateToMission(this.selectedMission.id, templateId).subscribe({
            next: () => {
                if (this.selectedMission)
                    this.selectedMission.checklistTemplateId = templateId; // Local update
                this.showAssignChecklistModal = false;
                alert('Checklist assignée avec succès');
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de l\'assignation de la checklist');
            }
        });
    }
    // --- VIEW CHECKLIST (SENIOR) ---
    openChecklistModal(mission) {
        this.selectedMission = mission;
        this.isLoadingMissions = true;
        this.auditingService.getMissionChecklistItems(mission.id).subscribe({
            next: (data) => {
                this.currentChecklistItems = data;
                this.isLoadingMissions = false;
                this.showChecklistModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoadingMissions = false;
                alert('Erreur lors du chargement de la checklist');
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
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette mission ?'))
            return;
        this.auditingService.deleteMission(id).subscribe({
            next: () => {
                this.loadMissions();
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    resetMission(id) {
        if (!confirm('Réinitialiser cette mission (effacer rapport et assignation) ?'))
            return;
        this.auditingService.resetMission(id).subscribe({
            next: () => {
                this.loadMissions();
            },
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
        const dataToExport = this.missions.map(m => {
            var _a;
            return ({
                'Mission': m.titre,
                'Objectifs': m.objectifs,
                'Risque Associé': ((_a = m.risk) === null || _a === void 0 ? void 0 : _a.titre) || `ID: ${m.riskId}`,
                'Auditeur': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
                'Échéance': new Date(m.delai).toLocaleDateString(),
                'Statut': this.statusLabelMap[m.statut] || m.statut
            });
        });
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Missions_Audit');
        XLSX.writeFile(wb, `Export_Audit_Missions_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }
    exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text('Rapport de Gestion des Audits', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);
        const columns = ['Mission', 'Risque Associé', 'Auditeur', 'Échéance', 'Statut'];
        const rows = this.missions.map(m => {
            var _a;
            return [
                m.titre,
                ((_a = m.risk) === null || _a === void 0 ? void 0 : _a.titre) || `ID: ${m.riskId}`,
                m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
                new Date(m.delai).toLocaleDateString(),
                this.statusLabelMap[m.statut] || m.statut
            ];
        });
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 4 },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });
        doc.save(`Export_Audit_Missions_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
AuditingComponent.ɵfac = function AuditingComponent_Factory(t) { return new (t || AuditingComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.HttpClient), i0.ɵɵdirectiveInject(i3.Router)); };
AuditingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditingComponent, selectors: [["app-auditing"]], decls: 62, vars: 26, consts: [[1, "audit-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-clipboard-check"], [1, "header-actions"], [1, "export-dropdown"], ["title", "T\u00E9l\u00E9charger le rapport", 1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], ["class", "audit-tabs", 4, "ngIf"], [1, "tab-content"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-tasks"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], ["title", "Assigner une Checklist", 3, "close", 4, "ngIf"], ["title", "Soumettre Rapport d'Audit", 3, "close", 4, "ngIf"], ["title", "D\u00E9tails de la Mission", 3, "close", 4, "ngIf"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close", 4, "ngIf"], ["title", "Avancement de la Checklist", 3, "close", 4, "ngIf"], ["title", "Modifier la Mission", 3, "close", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "mission-info"], [1, "risk-info-cell", 3, "title"], [1, "risk-id"], [1, "risk-name"], ["class", "auditor-chip", 4, "ngIf", "ngIfElse"], ["unassigned", ""], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-assign", 3, "title", "click", 4, "ngIf"], ["class", "action-btn btn-checklist", "title", "Assigner Checklist", 3, "click", 4, "ngIf"], ["class", "action-btn btn-checklist", "title", "Voir Checklist", 3, "click", 4, "ngIf"], ["class", "action-btn btn-report", "title", "Faire le rapport", 3, "click", 4, "ngIf"], ["class", "action-btn btn-edit", "title", "Modifier la mission", 3, "click", 4, "ngIf"], ["title", "Preuves", 1, "action-btn", "btn-evidence", 3, "click"], [1, "fas", "fa-paperclip"], ["class", "action-btn btn-reset", "title", "R\u00E9initialiser la mission", 3, "click", 4, "ngIf"], ["class", "action-btn btn-delete", "title", "Supprimer la mission", 3, "click", 4, "ngIf"], [1, "auditor-chip"], [1, "fas", "fa-user-tie"], [1, "text-muted"], [1, "action-btn", "btn-assign", 3, "title", "click"], [1, "fas", "fa-user-plus"], ["title", "Assigner Checklist", 1, "action-btn", "btn-checklist", 3, "click"], [1, "fas", "fa-tasks", 2, "color", "#004a99"], ["title", "Voir Checklist", 1, "action-btn", "btn-checklist", 3, "click"], [1, "fas", "fa-list-check", 2, "color", "#10b981"], ["title", "Faire le rapport", 1, "action-btn", "btn-report", 3, "click"], [1, "fas", "fa-file-signature"], ["title", "Modifier la mission", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], ["title", "R\u00E9initialiser la mission", 1, "action-btn", "btn-reset", 3, "click"], ["title", "Supprimer la mission", 1, "action-btn", "btn-delete", 3, "click"], [1, "fas", "fa-trash-alt"], ["colspan", "6", 1, "empty-state"], [1, "fas", "fa-folder-open"], [3, "title", "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-group"], [1, "finput", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "hint error", 4, "ngIf"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], [1, "hint", "error"], ["title", "Assigner une Checklist", 3, "close"], [1, "finput", 3, "ngModel"], ["checklistSelect", ""], ["title", "Soumettre Rapport d'Audit", 3, "close"], [1, "form-group", "full"], [1, "req"], ["rows", "6", "placeholder", "D\u00E9crivez les r\u00E9sultats de l'audit...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "4", "placeholder", "Actions correctives sugg\u00E9r\u00E9es...", 1, "finput", 3, "ngModel", "ngModelChange"], ["title", "D\u00E9tails de la Mission", 3, "close"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-item", "full"], ["class", "detail-item full", 4, "ngIf"], [1, "btn-save", 3, "click"], [1, "suggestion-box"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close"], ["class", "empty-state", 4, "ngIf"], ["class", "evidence-list", 4, "ngIf"], [1, "form-footer", 2, "margin-top", "20px"], [1, "empty-state"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "ev-info", 2, "cursor", "pointer", "display", "flex", "align-items", "center", "gap", "10px", "flex-grow", "1", 3, "click"], [1, "fas", "fa-file-alt", 2, "color", "#004a99", "font-size", "1.2rem"], [1, "ev-name", 2, "font-weight", "500", "color", "#334155"], [1, "ev-date", 2, "color", "#94a3b8"], ["class", "icon-btn delete", "title", "Supprimer", "style", "color: #ef4444; background: none; border: none; cursor: pointer; padding: 5px;", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "icon-btn", "delete", 2, "color", "#ef4444", "background", "none", "border", "none", "cursor", "pointer", "padding", "5px", 3, "click"], ["title", "Avancement de la Checklist", 3, "close"], ["class", "checklist-items", "style", "list-style: none; padding: 0;", 4, "ngIf"], [1, "checklist-items", 2, "list-style", "none", "padding", "0"], ["style", "padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;", 4, "ngFor", "ngForOf"], [2, "padding", "10px", "border-bottom", "1px solid #eee", "display", "flex", "align-items", "center", "gap", "10px"], [2, "font-size", "1.2rem", 3, "ngClass"], ["title", "Modifier la Mission", 3, "close"], ["modal-body", "", "class", "modal-form", 4, "ngIf"], ["type", "text", "placeholder", "Titre...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Objectifs...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "2", "placeholder", "Responsabilit\u00E9s...", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "date", 1, "finput", 3, "ngModel", "ngModelChange"]], template: function AuditingComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "Planifiez vos missions annuelles et suivez les rapports d'audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "button", 8);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_13_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(14, "i", 9);
        i0.ɵɵtext(15, " Exporter rapport ");
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "button", 12);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_18_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(19, "i", 13);
        i0.ɵɵtext(20, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "button", 12);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_21_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(22, "i", 14);
        i0.ɵɵtext(23, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, AuditingComponent_nav_24_Template, 2, 1, "nav", 15);
        i0.ɵɵelementStart(25, "div", 16);
        i0.ɵɵelementStart(26, "div", 17);
        i0.ɵɵelementStart(27, "div", 18);
        i0.ɵɵelementStart(28, "div", 19);
        i0.ɵɵelement(29, "i", 20);
        i0.ɵɵelementStart(30, "input", 21);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_input_ngModelChange_30_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function AuditingComponent_Template_input_ngModelChange_30_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 19);
        i0.ɵɵelement(32, "i", 22);
        i0.ɵɵelementStart(33, "select", 23);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_select_ngModelChange_33_listener($event) { return ctx.filterStatus = $event; })("change", function AuditingComponent_Template_select_change_33_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(34, "option", 24);
        i0.ɵɵtext(35, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "option", 25);
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "option", 25);
        i0.ɵɵtext(39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "option", 25);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "option", 25);
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "option", 25);
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(46, AuditingComponent_button_46_Template, 3, 0, "button", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "div", 27);
        i0.ɵɵelementStart(48, "span", 28);
        i0.ɵɵelementStart(49, "strong");
        i0.ɵɵtext(50);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(51, " mission(s) trouv\u00E9e(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "div", 29);
        i0.ɵɵtemplate(53, AuditingComponent_div_53_Template, 3, 0, "div", 30);
        i0.ɵɵtemplate(54, AuditingComponent_table_54_Template, 18, 2, "table", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(55, AuditingComponent_app_modal_55_Template, 21, 7, "app-modal", 32);
        i0.ɵɵtemplate(56, AuditingComponent_app_modal_56_Template, 21, 4, "app-modal", 33);
        i0.ɵɵtemplate(57, AuditingComponent_app_modal_57_Template, 20, 4, "app-modal", 34);
        i0.ɵɵtemplate(58, AuditingComponent_app_modal_58_Template, 40, 13, "app-modal", 35);
        i0.ɵɵtemplate(59, AuditingComponent_app_modal_59_Template, 9, 3, "app-modal", 36);
        i0.ɵɵtemplate(60, AuditingComponent_app_modal_60_Template, 9, 3, "app-modal", 37);
        i0.ɵɵtemplate(61, AuditingComponent_app_modal_61_Template, 2, 1, "app-modal", 38);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(17);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.filterSearch);
        i0.ɵɵadvance(3);
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
        i0.ɵɵproperty("ngIf", ctx.filterSearch || ctx.filterStatus);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredMissions.length);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAssignModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAssignChecklistModal);
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
    } }, directives: [i4.NgIf, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i5.SelectControlValueAccessor, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i4.NgForOf, i3.RouterLinkWithHref, i3.RouterLinkActive, i6.ModalComponent, i4.NgClass], pipes: [i4.SlicePipe, i4.DatePipe], styles: ["@import './audit-shared';\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    min-height: 100vh;\r\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\r\n}\r\n\r\n\r\n\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 28px;\r\n    border-radius: 14px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.95rem;\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);\r\n    filter: brightness(1.1);\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n    filter: grayscale(0.5);\r\n}\r\n\r\n\r\n.tabs-nav[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 12px;\r\n    margin-bottom: 25px;\r\n    padding: 6px;\r\n    background: rgba(226, 232, 240, 0.5);\r\n    border-radius: 16px;\r\n    width: fit-content;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    background: transparent;\r\n    border: none;\r\n    padding: 10px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\r\n    background: white;\r\n    color: #0f172a;\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n\r\n.missions-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 24px;\r\n    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    overflow: hidden;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    background: #f8fafc;\r\n    padding: 20px;\r\n    text-align: left;\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    text-transform: uppercase;\r\n    font-weight: 700;\r\n    letter-spacing: 0.05em;\r\n    border-bottom: 2px solid #f1f5f9;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n    border-bottom: 1px solid #f8fafc;\r\n    font-size: 0.95rem;\r\n    color: #334155;\r\n    vertical-align: middle;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\r\n    background: #fcfdfe;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n    display: block;\r\n    color: #1e293b;\r\n    font-size: 1rem;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\r\n    color: #94a3b8;\r\n    font-size: 0.8rem;\r\n    display: block;\r\n    max-width: 300px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.auditor-chip[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    padding: 6px 14px;\r\n    border-radius: 100px;\r\n    font-size: 0.85rem;\r\n    color: #475569;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    font-weight: 500;\r\n    border: 1px solid #e2e8f0;\r\n}\r\n\r\n.risk-info-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    max-width: 250px;\r\n\r\n    .risk-id {\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n        color: #6366f1;\r\n        background: #eef2ff;\r\n        padding: 2px 8px;\r\n        border-radius: 6px;\r\n        width: fit-content;\r\n    }\r\n\r\n    .risk-name {\r\n        font-weight: 600;\r\n        color: #334155;\r\n        font-size: 0.9rem;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n    padding: 6px 14px;\r\n    border-radius: 100px;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.02em;\r\n}\r\n\r\n.status-\u00E0-venir[_ngcontent-%COMP%] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\r\n    border: 1px solid #bae6fd;\r\n}\r\n\r\n.status-en-cours[_ngcontent-%COMP%] {\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n    border: 1px solid #fde68a;\r\n}\r\n\r\n.status-termin\u00E9[_ngcontent-%COMP%] {\r\n    background: #dcfce7;\r\n    color: #166534;\r\n    border: 1px solid #bbf7d0;\r\n}\r\n\r\n.status-en-retard[_ngcontent-%COMP%] {\r\n    background: #fee2e2;\r\n    color: #b91c1c;\r\n    border: 1px solid #fecaca;\r\n}\r\n\r\n\r\n.actions-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 8px;\r\n}\r\n\r\n.action-btn[_ngcontent-%COMP%] {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%]:hover {\r\n    background: #eef2ff;\r\n    border-color: #c7d2fe;\r\n}\r\n\r\n.btn-assign[_ngcontent-%COMP%]:hover {\r\n    background: #ecfdf5;\r\n    border-color: #a7f3d0;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%] {\r\n    color: #3b82f6;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%]:hover {\r\n    background: #eff6ff;\r\n    border-color: #bfdbfe;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%] {\r\n    color: #f59e0b;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%]:hover {\r\n    background: #fffbeb;\r\n    border-color: #fde68a;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n    color: #64748b;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%]:hover {\r\n    background: #fef2f2;\r\n    border-color: #fecaca;\r\n}\r\n\r\n\r\n.suggested-plan-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\r\n    gap: 25px;\r\n    margin-top: 25px;\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    border: 1px solid #e2e8f0;\r\n    display: flex;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.suggestion-card.selected[_ngcontent-%COMP%] {\r\n    border-color: #6366f1;\r\n    background: #fbfbfe;\r\n}\r\n\r\n.card-check[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    background: #f8fafc;\r\n    border-right: 1px solid #e2e8f0;\r\n    cursor: pointer;\r\n    color: #cbd5e1;\r\n    font-size: 1.4rem;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.selected[_ngcontent-%COMP%]   .card-check[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n    background: #eef2ff;\r\n    border-right-color: #c7d2fe;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    flex: 1;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 1.1rem;\r\n    color: #0f172a;\r\n    font-weight: 700;\r\n    line-height: 1.3;\r\n}\r\n\r\n.obj[_ngcontent-%COMP%], .resp[_ngcontent-%COMP%] {\r\n    font-size: 0.9rem;\r\n    color: #475569;\r\n    margin: 10px 0;\r\n    line-height: 1.5;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n    margin-top: 20px;\r\n    font-size: 0.8rem;\r\n    color: #94a3b8;\r\n    border-top: 1px solid #f1f5f9;\r\n    padding-top: 15px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n\r\n.modal-form[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 24px;\r\n    padding: 10px 5px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    color: #334155;\r\n}\r\n\r\n.req[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    padding: 12px 16px;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\r\n    font-family: inherit;\r\n    font-size: 0.95rem;\r\n    transition: all 0.2s;\r\n    background: #f8fafc;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%]:focus {\r\n    outline: none;\r\n    border-color: #6366f1;\r\n    background: white;\r\n    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);\r\n}\r\n\r\n.form-footer[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 12px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    color: #475569;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-save[_ngcontent-%COMP%] {\r\n    background: #0f172a;\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 20px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%] {\r\n    padding: 15px;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    font-size: 0.75rem;\r\n    text-transform: uppercase;\r\n    color: #94a3b8;\r\n    margin-bottom: 5px;\r\n    font-weight: 700;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: #1e293b;\r\n    font-weight: 600;\r\n}\r\n\r\n.detail-item.full[_ngcontent-%COMP%] {\r\n    grid-column: 1 / -1;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditingComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditing',
                templateUrl: './auditing.component.html',
                styleUrls: ['./auditing.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.HttpClient }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=auditing.component.js.map