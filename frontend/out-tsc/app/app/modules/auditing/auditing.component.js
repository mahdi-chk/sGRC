import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus, AuditMissionHorizon, AuditRecordType } from '../../core/services/auditing.service';
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
import * as i6 from "../../shared/components/pagination/pagination.component";
import * as i7 from "../../shared/modal/modal.component";
function AuditingComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function AuditingComponent_button_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.openCreateModal(); });
    i0.ɵɵelement(1, "i", 56);
    i0.ɵɵtext(2, " Nouvel audit ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 57);
    i0.ɵɵlistener("click", function AuditingComponent_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.openImportModal(); });
    i0.ɵɵelement(1, "i", 58);
    i0.ɵɵtext(2, " Import Excel ");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { exact: true }; };
function AuditingComponent_nav_26_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 61);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r19 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r19.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r19.label, " ");
} }
function AuditingComponent_nav_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 59);
    i0.ɵɵtemplate(1, AuditingComponent_nav_26_a_1_Template, 2, 4, "a", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.navItems);
} }
function AuditingComponent_button_77_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 62);
    i0.ɵɵlistener("click", function AuditingComponent_button_77_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.clearFilters(); });
    i0.ɵɵelement(1, "i", 63);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 90);
    i0.ɵɵelement(1, "i", 91);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r24.auditeur.prenom, " ", mission_r24.auditeur.nom, " ");
} }
function AuditingComponent_table_85_tr_22_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em", 92);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r24.responsabilites || "Non assign\u00E9");
} }
function AuditingComponent_table_85_tr_22_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r37); const mission_r24 = i0.ɵɵnextContext().$implicit; const ctx_r35 = i0.ɵɵnextContext(2); return ctx_r35.openAssignModal(mission_r24); });
    i0.ɵɵelement(1, "i", 94);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 95);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r40); const mission_r24 = i0.ɵɵnextContext().$implicit; const ctx_r38 = i0.ɵɵnextContext(2); return ctx_r38.openReportModal(mission_r24); });
    i0.ɵɵelement(1, "i", 96);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 97);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_button_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r43); const mission_r24 = i0.ɵɵnextContext().$implicit; const ctx_r41 = i0.ɵɵnextContext(2); return ctx_r41.openEditModal(mission_r24); });
    i0.ɵɵelement(1, "i", 98);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 99);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_button_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r46); const mission_r24 = i0.ɵɵnextContext().$implicit; const ctx_r44 = i0.ɵɵnextContext(2); return ctx_r44.resetMission(mission_r24.id); });
    i0.ɵɵelement(1, "i", 63);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_button_31_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r49); const mission_r24 = i0.ɵɵnextContext().$implicit; const ctx_r47 = i0.ɵɵnextContext(2); return ctx_r47.deleteMission(mission_r24.id); });
    i0.ɵɵelement(1, "i", 101);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_tr_22_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 67);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 72);
    i0.ɵɵelementStart(6, "span", 73);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 74);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 68);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 75);
    i0.ɵɵtemplate(13, AuditingComponent_table_85_tr_22_div_13_Template, 3, 2, "div", 76);
    i0.ɵɵtemplate(14, AuditingComponent_table_85_tr_22_ng_template_14_Template, 2, 1, "ng-template", null, 77, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 78);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 79);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 80);
    i0.ɵɵelementStart(23, "button", 81);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_Template_button_click_23_listener() { const restoredCtx = i0.ɵɵrestoreView(_r51); const mission_r24 = restoredCtx.$implicit; const ctx_r50 = i0.ɵɵnextContext(2); return ctx_r50.openDetailModal(mission_r24); });
    i0.ɵɵelement(24, "i", 82);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, AuditingComponent_table_85_tr_22_button_25_Template, 2, 0, "button", 83);
    i0.ɵɵtemplate(26, AuditingComponent_table_85_tr_22_button_26_Template, 2, 0, "button", 84);
    i0.ɵɵtemplate(27, AuditingComponent_table_85_tr_22_button_27_Template, 2, 0, "button", 85);
    i0.ɵɵelementStart(28, "button", 86);
    i0.ɵɵlistener("click", function AuditingComponent_table_85_tr_22_Template_button_click_28_listener() { const restoredCtx = i0.ɵɵrestoreView(_r51); const mission_r24 = restoredCtx.$implicit; const ctx_r52 = i0.ɵɵnextContext(2); return ctx_r52.openEvidenceModal(mission_r24); });
    i0.ɵɵelement(29, "i", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(30, AuditingComponent_table_85_tr_22_button_30_Template, 2, 0, "button", 88);
    i0.ɵɵtemplate(31, AuditingComponent_table_85_tr_22_button_31_Template, 2, 0, "button", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r24 = ctx.$implicit;
    const _r26 = i0.ɵɵreference(15);
    const ctx_r22 = i0.ɵɵnextContext(2);
    let tmp_5_0;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r24.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r24.regleDnssi || mission_r24.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", mission_r24.recommandations || mission_r24.objectifs || "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r22.getRecommendationPreview(mission_r24.recommandations || mission_r24.objectifs, 10), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r22.horizonLabelMap[mission_r24.horizon || ""] || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_5_0 = mission_r24.priorite) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "-");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mission_r24.auditeur)("ngIfElse", _r26);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r24.delai ? i0.ɵɵpipeBind2(18, 17, mission_r24.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + (mission_r24.statut || "").toString().replace("_", "-"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r22.statusLabelMap[(mission_r24.statut || "").toString()] || (mission_r24.statut || "").toString());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r22.canAssignAuditor(mission_r24));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r22.isAuditor && mission_r24.statut === ctx_r22.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r22.isSeniorAuditor);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r22.isSeniorAuditor && mission_r24.statut === ctx_r22.AuditMissionStatus.OK);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r22.isSeniorAuditor);
} }
function AuditingComponent_table_85_tr_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 102);
    i0.ɵɵelement(2, "i", 103);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun enregistrement trouv\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_table_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 66);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th", 67);
    i0.ɵɵtext(4, "ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "R\u00E8gle DNSSI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Horizon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 68);
    i0.ɵɵtext(12, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Etat d'avancement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵtemplate(22, AuditingComponent_table_85_tr_22_Template, 32, 20, "tr", 69);
    i0.ɵɵtemplate(23, AuditingComponent_table_85_tr_23_Template, 5, 0, "tr", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("ngForOf", ctx_r5.pagedMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.filteredMissions.length === 0);
} }
function AuditingComponent_app_pagination_86_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 104);
    i0.ɵɵlistener("pageChanged", function AuditingComponent_app_pagination_86_Template_app_pagination_pageChanged_0_listener($event) { i0.ɵɵrestoreView(_r54); const ctx_r53 = i0.ɵɵnextContext(); return ctx_r53.onPaginationChange($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalItems", ctx_r6.filteredMissions.length)("currentPage", ctx_r6.currentPage)("pageSize", ctx_r6.pageSize)("pageSizeOptions", ctx_r6.pageSizeOptions);
} }
function AuditingComponent_app_modal_87_div_5_select_3_option_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 117);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r60 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", risk_r60.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(risk_r60.titre);
} }
function AuditingComponent_app_modal_87_div_5_select_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "select", 116);
    i0.ɵɵelementStart(1, "option", 117);
    i0.ɵɵtext(2, "S\u00C3\u00A9lectionner un risque");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_87_div_5_select_3_option_3_Template, 2, 2, "option", 118);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r58 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r58.risks);
} }
function AuditingComponent_app_modal_87_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 109);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Risque de rattachement");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_87_div_5_select_3_Template, 4, 2, "select", 115);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", false);
} }
function AuditingComponent_app_modal_87_small_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 119);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r57 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r57.importFile.name);
} }
function AuditingComponent_app_modal_87_Template(rf, ctx) { if (rf & 1) {
    const _r62 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 105);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_87_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r62); const ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.showImportModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Importez un fichier Excel pour cr\u00C3\u00A9er des missions d'audit \u00C3\u00A0 partir du plan.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_87_div_5_Template, 4, 1, "div", 108);
    i0.ɵɵelementStart(6, "div", 109);
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Fichier Excel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 110);
    i0.ɵɵlistener("change", function AuditingComponent_app_modal_87_Template_input_change_9_listener($event) { i0.ɵɵrestoreView(_r62); const ctx_r63 = i0.ɵɵnextContext(); return ctx_r63.onImportFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, AuditingComponent_app_modal_87_small_10_Template, 2, 1, "small", 111);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 112);
    i0.ɵɵelementStart(12, "button", 113);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_87_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r62); const ctx_r64 = i0.ɵɵnextContext(); return ctx_r64.showImportModal = false; });
    i0.ɵɵtext(13, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_87_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r62); const ctx_r65 = i0.ɵɵnextContext(); return ctx_r65.importFromExcel(); });
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", false);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r7.importFile);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r7.importFile || ctx_r7.isImporting);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.isImporting ? "Import..." : "Importer", " ");
} }
function AuditingComponent_app_modal_88_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r68 = ctx.$implicit;
    i0.ɵɵproperty("value", u_r68.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", u_r68.prenom, " ", u_r68.nom, "");
} }
function AuditingComponent_app_modal_88_Template(rf, ctx) { if (rf & 1) {
    const _r70 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 120);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_88_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r70); const ctx_r69 = i0.ɵɵnextContext(); return ctx_r69.showAssignModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "S\u00E9lectionnez le responsable pour ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 121);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 122);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_88_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r70); const ctx_r71 = i0.ɵɵnextContext(); return ctx_r71.selectedAuditorId = $event; });
    i0.ɵɵelementStart(11, "option", 39);
    i0.ɵɵtext(12, "S\u00E9lectionner...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, AuditingComponent_app_modal_88_option_13_Template, 2, 3, "option", 123);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 112);
    i0.ɵɵelementStart(15, "button", 113);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_88_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r70); const ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.showAssignModal = false; });
    i0.ɵɵtext(16, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_88_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r70); const ctx_r73 = i0.ɵɵnextContext(); return ctx_r73.assignMission(); });
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.regleDnssi) || (ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.titre));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r8.selectedAuditorId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r8.auditors);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r8.selectedAuditorId || ctx_r8.isAssigning);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.isAssigning ? "Affectation..." : "Affecter", " ");
} }
function AuditingComponent_app_modal_89_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 124);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_89_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r76); const ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.showReportModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵelementStart(3, "div", 109);
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Rapport Final d'Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "textarea", 125);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_89_Template_textarea_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r76); const ctx_r77 = i0.ɵɵnextContext(); return ctx_r77.reportData.rapport = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 109);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "textarea", 126);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_89_Template_textarea_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r76); const ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 112);
    i0.ɵɵelementStart(12, "button", 113);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_89_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r76); const ctx_r79 = i0.ɵɵnextContext(); return ctx_r79.showReportModal = false; });
    i0.ɵɵtext(13, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_89_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r76); const ctx_r80 = i0.ɵɵnextContext(); return ctx_r80.submitReport(); });
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r9.reportData.rapport);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r9.reportData.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r9.reportData.rapport || ctx_r9.isReporting);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.isReporting ? "Envoi..." : "Soumettre le Rapport", " ");
} }
function AuditingComponent_app_modal_90_Template(rf, ctx) { if (rf & 1) {
    const _r83 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 127);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_90_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r83); const ctx_r82 = i0.ɵɵnextContext(); return ctx_r82.showDetailModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵelementStart(3, "div", 128);
    i0.ɵɵelementStart(4, "div", 129);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 129);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 130);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "R\u00E8gle DNSSI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 130);
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 129);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "Horizon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 129);
    i0.ɵɵelementStart(30, "label");
    i0.ɵɵtext(31, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 129);
    i0.ɵɵelementStart(35, "label");
    i0.ɵɵtext(36, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 129);
    i0.ɵɵelementStart(41, "label");
    i0.ɵɵtext(42, "Etat d'avancement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 112);
    i0.ɵɵelementStart(46, "button", 131);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_90_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r83); const ctx_r84 = i0.ɵɵnextContext(); return ctx_r84.showDetailModal = false; });
    i0.ɵɵtext(47, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    let tmp_1_0;
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.priorite) !== null && tmp_1_0 !== undefined ? tmp_1_0 : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.regleDnssi) || (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.titre));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.recommandations) || (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.objectifs) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r10.horizonLabelMap[(ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.horizon) || ""] || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.auditeur) ? (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.auditeur.prenom) + " " + (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.auditeur.nom) : (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.responsabilites) || "Non assign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.delai) ? i0.ɵɵpipeBind2(39, 8, ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r10.statusLabelMap[((ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.statut) || "").toString()] || (ctx_r10.selectedMission == null ? null : ctx_r10.selectedMission.statut));
} }
function AuditingComponent_app_modal_91_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵtext(2, " Chargement des preuves... ");
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_91_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune preuve t\u00E9l\u00E9vers\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_91_ul_5_li_1_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r94 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 144);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_91_ul_5_li_1_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r94); const ev_r90 = i0.ɵɵnextContext().$implicit; const ctx_r92 = i0.ɵɵnextContext(3); return ctx_r92.deleteEvidence(ev_r90.id); });
    i0.ɵɵelement(1, "i", 101);
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_91_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r96 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 139);
    i0.ɵɵelementStart(1, "div", 140);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_91_ul_5_li_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r96); const ev_r90 = restoredCtx.$implicit; const ctx_r95 = i0.ɵɵnextContext(3); return ctx_r95.downloadEvidence(ev_r90.path); });
    i0.ɵɵelement(2, "i", 141);
    i0.ɵɵelementStart(3, "span", 142);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_91_ul_5_li_1_button_5_Template, 2, 0, "button", 143);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r90 = ctx.$implicit;
    const ctx_r89 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ev_r90.filename);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r89.isSeniorAuditor);
} }
function AuditingComponent_app_modal_91_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 137);
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_91_ul_5_li_1_Template, 6, 2, "li", 138);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r88 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r88.currentEvidences);
} }
function AuditingComponent_app_modal_91_Template(rf, ctx) { if (rf & 1) {
    const _r98 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 132);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_91_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r98); const ctx_r97 = i0.ɵɵnextContext(); return ctx_r97.showEvidenceModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_91_div_3_Template, 3, 0, "div", 45);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_91_div_4_Template, 3, 0, "div", 133);
    i0.ɵɵtemplate(5, AuditingComponent_app_modal_91_ul_5_Template, 2, 1, "ul", 134);
    i0.ɵɵelementStart(6, "div", 135);
    i0.ɵɵelementStart(7, "button", 131);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_91_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r98); const ctx_r99 = i0.ɵɵnextContext(); return ctx_r99.showEvidenceModal = false; });
    i0.ɵɵtext(8, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r11.isLoadingMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r11.isLoadingMissions && ctx_r11.currentEvidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r11.isLoadingMissions && ctx_r11.currentEvidences.length > 0);
} }
function AuditingComponent_app_modal_92_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun plan li\u00E9 \u00E0 cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditingComponent_app_modal_92_table_4_tr_14_Template(rf, ctx) { if (rf & 1) {
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
    const item_r104 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r104.regleDnssi);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r104.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r104.responsableNom || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, item_r104.echeance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r104.etatAvancement);
} }
function AuditingComponent_app_modal_92_table_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 66);
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
    i0.ɵɵtemplate(14, AuditingComponent_app_modal_92_table_4_tr_14_Template, 12, 8, "tr", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r102 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r102.currentChecklistItems);
} }
function AuditingComponent_app_modal_92_Template(rf, ctx) { if (rf & 1) {
    const _r106 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 145);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_92_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r106); const ctx_r105 = i0.ɵɵnextContext(); return ctx_r105.showChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 106, 107);
    i0.ɵɵtemplate(3, AuditingComponent_app_modal_92_div_3_Template, 3, 0, "div", 133);
    i0.ɵɵtemplate(4, AuditingComponent_app_modal_92_table_4_Template, 15, 1, "table", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r12.isLoadingMissions && ctx_r12.currentChecklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.currentChecklistItems.length > 0);
} }
function AuditingComponent_app_modal_93_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r110 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106, 107);
    i0.ɵɵelementStart(2, "div", 109);
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵtext(4, "R\u00E8gle DNSSI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 148);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_input_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r109 = i0.ɵɵnextContext(2); return ctx_r109.selectedMission.regleDnssi = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 109);
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "textarea", 149);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_textarea_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r111 = i0.ɵɵnextContext(2); return ctx_r111.selectedMission.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 109);
    i0.ɵɵelementStart(11, "label");
    i0.ɵɵtext(12, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "textarea", 150);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_textarea_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r112 = i0.ɵɵnextContext(2); return ctx_r112.selectedMission.responsabilites = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 128);
    i0.ɵɵelementStart(15, "div", 121);
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17, "Horizon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "select", 122);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r113 = i0.ɵɵnextContext(2); return ctx_r113.selectedMission.horizon = $event; });
    i0.ɵɵelementStart(19, "option", 40);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "option", 40);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 121);
    i0.ɵɵelementStart(24, "label");
    i0.ɵɵtext(25, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "select", 122);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_select_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r114 = i0.ɵɵnextContext(2); return ctx_r114.selectedMission.priorite = $event; });
    i0.ɵɵelementStart(27, "option", 117);
    i0.ɵɵtext(28, "1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 117);
    i0.ɵɵtext(30, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "option", 117);
    i0.ɵɵtext(32, "3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 121);
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "input", 151);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_input_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r115 = i0.ɵɵnextContext(2); return ctx_r115.selectedMission.delai = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 121);
    i0.ɵɵelementStart(38, "label");
    i0.ɵɵtext(39, "Etat d'avancement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "select", 122);
    i0.ɵɵlistener("ngModelChange", function AuditingComponent_app_modal_93_div_1_Template_select_ngModelChange_40_listener($event) { i0.ɵɵrestoreView(_r110); const ctx_r116 = i0.ɵɵnextContext(2); return ctx_r116.selectedMission.statut = $event; });
    i0.ɵɵelementStart(41, "option", 40);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 40);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "option", 40);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 112);
    i0.ɵɵelementStart(48, "button", 113);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_93_div_1_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r110); const ctx_r117 = i0.ɵɵnextContext(2); return ctx_r117.showEditModal = false; });
    i0.ɵɵtext(49, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "button", 114);
    i0.ɵɵlistener("click", function AuditingComponent_app_modal_93_div_1_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r110); const ctx_r118 = i0.ɵɵnextContext(2); return ctx_r118.saveRecord(); });
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r107 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.regleDnssi);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.responsabilites);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.horizon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r107.AuditMissionHorizon.COURT_TERME);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r107.horizonLabelMap[ctx_r107.AuditMissionHorizon.COURT_TERME]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r107.AuditMissionHorizon.MOYEN_TERME);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r107.horizonLabelMap[ctx_r107.AuditMissionHorizon.MOYEN_TERME]);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.priorite);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngValue", 2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngValue", 3);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.delai);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r107.selectedMission.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r107.AuditMissionStatus.NOK);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r107.statusLabelMap[ctx_r107.AuditMissionStatus.NOK]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r107.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r107.statusLabelMap[ctx_r107.AuditMissionStatus.EN_COURS]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r107.AuditMissionStatus.OK);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r107.statusLabelMap[ctx_r107.AuditMissionStatus.OK]);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r107.isSaving);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r107.isSaving ? "Sauvegarde..." : "Sauvegarder", " ");
} }
function AuditingComponent_app_modal_93_Template(rf, ctx) { if (rf & 1) {
    const _r120 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 146);
    i0.ɵɵlistener("close", function AuditingComponent_app_modal_93_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r120); const ctx_r119 = i0.ɵɵnextContext(); return ctx_r119.showEditModal = false; });
    i0.ɵɵtemplate(1, AuditingComponent_app_modal_93_div_1_Template, 52, 22, "div", 147);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r13.isCreateMode ? "Cr\u00E9er un audit" : "Modifier l audit");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r13.selectedMission);
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
        this.pagedMissions = [];
        this.showExportMenu = false;
        this.filterSearch = '';
        this.filterStatus = '';
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 50, 100];
        this.totalMissions = 0;
        this.inProgressCount = 0;
        this.completedCount = 0;
        this.unassignedCount = 0;
        this.isLoadingMissions = false;
        this.isAssigning = false;
        this.isReporting = false;
        this.isSaving = false;
        this.isImporting = false;
        this.isCreateMode = false;
        this.showAssignModal = false;
        this.showReportModal = false;
        this.showDetailModal = false;
        this.showEvidenceModal = false;
        this.showChecklistModal = false;
        this.showEditModal = false;
        this.showImportModal = false;
        this.selectedMission = null;
        this.selectedAuditorId = '';
        this.currentEvidences = [];
        this.currentChecklistItems = [];
        this.backendUrl = environment.apiUrl.replace('/api', '');
        this.importFile = null;
        this.risks = [];
        this.reportData = {
            rapport: '',
            recommandations: ''
        };
        this.AuditMissionStatus = AuditMissionStatus;
        this.AuditMissionHorizon = AuditMissionHorizon;
        this.statusLabelMap = {
            [AuditMissionStatus.NOK]: 'NOK',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.OK]: 'OK'
        };
        this.horizonLabelMap = {
            [AuditMissionHorizon.COURT_TERME]: 'A court terme',
            [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
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
        this.loadRisks();
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
                || String(m.id).includes(q)
                || (m.titre || '').toLowerCase().includes(q)
                || (m.regleDnssi || '').toLowerCase().includes(q)
                || (m.recommandations || m.objectifs || '').toLowerCase().includes(q)
                || (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(q))
                || (m.responsabilites || '').toLowerCase().includes(q);
            const missionStatut = this.normalizeMissionStatus(m.statutCode || m.statut);
            const filterStatut = this.normalizeMissionStatus(this.filterStatus);
            const matchStatus = !filterStatut || missionStatut === filterStatut;
            return matchSearch && matchStatus;
        });
        this.currentPage = 1;
        this.updatePagedMissions();
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }
    onPaginationChange(event) {
        this.currentPage = event.page;
        this.pageSize = event.pageSize;
        this.updatePagedMissions();
    }
    getRecommendationPreview(value, maxWords = 10) {
        const text = (value || '').trim();
        if (!text) {
            return '-';
        }
        const words = text.split(/\s+/);
        if (words.length <= maxWords) {
            return text;
        }
        return `${words.slice(0, maxWords).join(' ')}...`;
    }
    calculateStats() {
        this.totalMissions = this.missions.length;
        this.inProgressCount = this.missions.filter((m) => this.normalizeMissionStatus(m.statutCode || m.statut) === AuditMissionStatus.EN_COURS).length;
        this.completedCount = this.missions.filter((m) => this.normalizeMissionStatus(m.statutCode || m.statut) === AuditMissionStatus.OK).length;
        this.unassignedCount = this.missions.filter((m) => !m.auditeurId).length;
    }
    updatePagedMissions() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedMissions = this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
    }
    loadUsers() {
        this.http.get(`${environment.apiUrl}/users/assignable/auditors`).subscribe((users) => {
            this.allUsers = users;
            this.auditors = [...users];
        });
    }
    loadRisks() {
        this.http.get(`${environment.apiUrl}/risk`).subscribe({
            next: (risks) => {
                this.risks = risks;
            },
            error: (err) => console.error(err)
        });
    }
    openDetailModal(mission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }
    openCreateModal() {
        this.isCreateMode = true;
        this.selectedMission = {
            id: 0,
            type: AuditRecordType.PLAN_ACTION_AUDIT,
            titre: '',
            objectifs: '',
            responsabilites: '',
            statut: AuditMissionStatus.NOK,
            riskId: null,
            auditSeniorId: 0,
            auditeurId: null,
            delai: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            regleDnssi: '',
            recommandations: '',
            ordre: 0,
            horizon: AuditMissionHorizon.COURT_TERME,
            priorite: 1
        };
        this.showEditModal = true;
    }
    openImportModal() {
        this.importFile = null;
        this.showImportModal = true;
    }
    onImportFileSelected(event) {
        var _a;
        const input = event.target;
        this.importFile = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    }
    importFromExcel() {
        if (!this.importFile) {
            alert('Veuillez sélectionner un fichier Excel.');
            return;
        }
        if (false) {
            alert('Veuillez sÃ©lectionner un risque avant l import.');
            return;
        }
        this.isImporting = true;
        this.auditingService.importMissions(this.importFile).subscribe({
            next: () => {
                this.isImporting = false;
                this.showImportModal = false;
                this.importFile = null;
                this.loadMissions();
            },
            error: (err) => {
                var _a, _b;
                console.error(err);
                this.isImporting = false;
                alert(((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.error) || ((_b = err === null || err === void 0 ? void 0 : err.error) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de l import Excel.');
            }
        });
    }
    openAssignModal(mission) {
        this.selectedMission = mission;
        this.selectedAuditorId = mission.auditeurId ? mission.auditeurId.toString() : '';
        this.showAssignModal = true;
    }
    openEditModal(mission) {
        var _a, _b;
        this.isCreateMode = false;
        this.selectedMission = JSON.parse(JSON.stringify(mission));
        if ((_a = this.selectedMission) === null || _a === void 0 ? void 0 : _a.delai) {
            this.selectedMission.delai = new Date(this.selectedMission.delai).toISOString().split('T')[0];
        }
        if (!((_b = this.selectedMission) === null || _b === void 0 ? void 0 : _b.type)) {
            this.selectedMission.type = AuditRecordType.PLAN_ACTION_AUDIT;
        }
        this.showEditModal = true;
    }
    saveRecord() {
        if (!this.selectedMission)
            return;
        this.isSaving = true;
        const payload = Object.assign(Object.assign({}, this.selectedMission), { type: this.selectedMission.type || AuditRecordType.PLAN_ACTION_AUDIT, titre: this.selectedMission.regleDnssi || this.selectedMission.titre || '', objectifs: this.selectedMission.recommandations || this.selectedMission.objectifs || '', recommandations: this.selectedMission.recommandations || this.selectedMission.objectifs || '' });
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
        return this.isSeniorAuditor && missionStatus !== AuditMissionStatus.OK;
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
        if (!confirm('Etes-vous sur de vouloir supprimer cet enregistrement ?'))
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
        if (!confirm('Reinitialiser cette mission ?'))
            return;
        this.auditingService.resetMission(id).subscribe({
            next: () => this.loadMissions(),
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la reinitialisation.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    exportToXLSX() {
        const dataToExport = this.filteredMissions.map((m) => {
            var _a;
            return ({
                'ID': m.id,
                'Règle DNSSI': m.regleDnssi || m.titre,
                'Recommandations': m.recommandations || m.objectifs || '',
                'Horizon': this.horizonLabelMap[String(m.horizon || '')] || '',
                'Priorité': (_a = m.priorite) !== null && _a !== void 0 ? _a : '',
                'Responsable': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : (m.responsabilites || 'Non assigne'),
                'Echéance': m.delai ? new Date(m.delai).toLocaleDateString() : '',
                'Etat d\'avancement': this.statusLabelMap[this.normalizeMissionStatus(m.statutCode || m.statut)] || m.statut
            });
        });
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
        const columns = ['ID', 'Règle DNSSI', 'Recommandations', 'Horizon', 'Priorité', 'Responsable', 'Échéance', 'Etat d\'avancement'];
        const rows = this.filteredMissions.map((m) => {
            var _a;
            return [
                String(m.id),
                m.regleDnssi || m.titre,
                m.recommandations || m.objectifs || '',
                this.horizonLabelMap[String(m.horizon || '')] || '',
                (_a = m.priorite) !== null && _a !== void 0 ? _a : '',
                m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : (m.responsabilites || 'Non assigne'),
                m.delai ? new Date(m.delai).toLocaleDateString() : '',
                this.statusLabelMap[this.normalizeMissionStatus(m.statutCode || m.statut)] || m.statut
            ];
        });
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
AuditingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditingComponent, selectors: [["app-auditing"]], decls: 94, vars: 29, consts: [[1, "audit-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-clipboard-check"], [1, "header-actions"], ["class", "btn-ai-plan", 3, "click", 4, "ngIf"], ["class", "btn-ai-plan btn-import", 3, "click", 4, "ngIf"], [1, "export-dropdown"], [1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], ["class", "audit-tabs", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-layer-group"], [1, "stat-info"], [1, "label"], [1, "value"], [1, "stat-card", "pending"], [1, "fas", "fa-play-circle"], [1, "stat-card", "completed"], [1, "fas", "fa-check-double"], [1, "stat-card", "risks"], [1, "fas", "fa-user-clock"], [1, "tab-content"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher par ID, r\u00E8gle, recommandation ou responsable...", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-tasks"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged", 4, "ngIf"], ["title", "Importer des audits via Excel", 3, "close", 4, "ngIf"], ["title", "Affecter un responsable", 3, "close", 4, "ngIf"], ["title", "Soumettre Rapport d'Audit", 3, "close", 4, "ngIf"], ["title", "D\u00E9tails", 3, "close", 4, "ngIf"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close", 4, "ngIf"], ["title", "Plans li\u00E9s historiquement \u00E0 la mission", 3, "close", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], [1, "btn-ai-plan", 3, "click"], [1, "fas", "fa-plus"], [1, "btn-ai-plan", "btn-import", 3, "click"], [1, "fas", "fa-file-import"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [1, "cell-id"], [1, "cell-priority"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "cell-rule"], [1, "cell-recommendation"], [1, "recommendation-preview", 3, "title"], [1, "cell-horizon"], [1, "cell-owner"], ["class", "auditor-chip", 4, "ngIf", "ngIfElse"], ["responsibleText", ""], [1, "cell-date"], [1, "cell-status"], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-assign", "title", "Assigner", 3, "click", 4, "ngIf"], ["class", "action-btn btn-report", "title", "Faire le rapport", 3, "click", 4, "ngIf"], ["class", "action-btn btn-edit", "title", "Modifier", 3, "click", 4, "ngIf"], ["title", "Preuves", 1, "action-btn", "btn-evidence", 3, "click"], [1, "fas", "fa-paperclip"], ["class", "action-btn btn-reset", "title", "R\u00E9initialiser", 3, "click", 4, "ngIf"], ["class", "action-btn btn-delete", "title", "Supprimer", 3, "click", 4, "ngIf"], [1, "auditor-chip"], [1, "fas", "fa-user-tie"], [1, "text-muted", "responsible-text"], ["title", "Assigner", 1, "action-btn", "btn-assign", 3, "click"], [1, "fas", "fa-user-plus"], ["title", "Faire le rapport", 1, "action-btn", "btn-report", 3, "click"], [1, "fas", "fa-file-signature"], ["title", "Modifier", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], ["title", "R\u00E9initialiser", 1, "action-btn", "btn-reset", 3, "click"], ["title", "Supprimer", 1, "action-btn", "btn-delete", 3, "click"], [1, "fas", "fa-trash-alt"], ["colspan", "9", 1, "empty-state"], [1, "fas", "fa-folder-open"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged"], ["title", "Importer des audits via Excel", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], ["class", "form-group full", 4, "ngIf"], [1, "form-group", "full"], ["type", "file", "accept", ".xlsx,.xls", 1, "finput", 3, "change"], ["class", "field-hint", 4, "ngIf"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], ["class", "finput", 4, "ngIf"], [1, "finput"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "field-hint"], ["title", "Affecter un responsable", 3, "close"], [1, "form-group"], [1, "finput", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["title", "Soumettre Rapport d'Audit", 3, "close"], ["rows", "6", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "4", 1, "finput", 3, "ngModel", "ngModelChange"], ["title", "D\u00E9tails", 3, "close"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-item", "full"], [1, "btn-save", 3, "click"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close"], ["class", "empty-state", 4, "ngIf"], ["class", "evidence-list", 4, "ngIf"], [1, "form-footer", 2, "margin-top", "20px"], [1, "empty-state"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "ev-info", 2, "cursor", "pointer", "display", "flex", "align-items", "center", "gap", "10px", "flex-grow", "1", 3, "click"], [1, "fas", "fa-file-alt", 2, "color", "#004a99", "font-size", "1.2rem"], [1, "ev-name"], ["class", "icon-btn delete", "title", "Supprimer", "style", "color:#ef4444; background:none; border:none; cursor:pointer; padding:5px;", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "icon-btn", "delete", 2, "color", "#ef4444", "background", "none", "border", "none", "cursor", "pointer", "padding", "5px", 3, "click"], ["title", "Plans li\u00E9s historiquement \u00E0 la mission", 3, "close"], [3, "title", "close"], ["modal-body", "", "class", "modal-form", 4, "ngIf"], ["type", "text", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "3", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "2", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "date", 1, "finput", 3, "ngModel", "ngModelChange"]], template: function AuditingComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "Vue unique des audits avec r\u00E8gle DNSSI, recommandations, horizon, priorit\u00E9, responsable, \u00E9ch\u00E9ance et \u00E9tat d'avancement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵtemplate(12, AuditingComponent_button_12_Template, 3, 0, "button", 7);
        i0.ɵɵtemplate(13, AuditingComponent_button_13_Template, 3, 0, "button", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "button", 10);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_15_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(16, "i", 11);
        i0.ɵɵtext(17, " Exporter ");
        i0.ɵɵelement(18, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "button", 14);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_20_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(21, "i", 15);
        i0.ɵɵtext(22, " Excel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "button", 14);
        i0.ɵɵlistener("click", function AuditingComponent_Template_button_click_23_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(24, "i", 16);
        i0.ɵɵtext(25, " PDF");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(26, AuditingComponent_nav_26_Template, 2, 1, "nav", 17);
        i0.ɵɵelementStart(27, "div", 18);
        i0.ɵɵelementStart(28, "div", 19);
        i0.ɵɵelementStart(29, "div", 20);
        i0.ɵɵelement(30, "i", 21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 22);
        i0.ɵɵelementStart(32, "span", 23);
        i0.ɵɵtext(33, "Total");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "span", 24);
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 25);
        i0.ɵɵelementStart(37, "div", 20);
        i0.ɵɵelement(38, "i", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 22);
        i0.ɵɵelementStart(40, "span", 23);
        i0.ɵɵtext(41, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "span", 24);
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "div", 27);
        i0.ɵɵelementStart(45, "div", 20);
        i0.ɵɵelement(46, "i", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "div", 22);
        i0.ɵɵelementStart(48, "span", 23);
        i0.ɵɵtext(49, "OK");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "span", 24);
        i0.ɵɵtext(51);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "div", 29);
        i0.ɵɵelementStart(53, "div", 20);
        i0.ɵɵelement(54, "i", 30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "div", 22);
        i0.ɵɵelementStart(56, "span", 23);
        i0.ɵɵtext(57, "Non assign\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "span", 24);
        i0.ɵɵtext(59);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 31);
        i0.ɵɵelementStart(61, "div", 32);
        i0.ɵɵelementStart(62, "div", 33);
        i0.ɵɵelementStart(63, "div", 34);
        i0.ɵɵelement(64, "i", 35);
        i0.ɵɵelementStart(65, "input", 36);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_input_ngModelChange_65_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function AuditingComponent_Template_input_ngModelChange_65_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div", 34);
        i0.ɵɵelement(67, "i", 37);
        i0.ɵɵelementStart(68, "select", 38);
        i0.ɵɵlistener("ngModelChange", function AuditingComponent_Template_select_ngModelChange_68_listener($event) { return ctx.filterStatus = $event; })("change", function AuditingComponent_Template_select_change_68_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(69, "option", 39);
        i0.ɵɵtext(70, "Tous les \u00E9tats");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "option", 40);
        i0.ɵɵtext(72);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "option", 40);
        i0.ɵɵtext(74);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "option", 40);
        i0.ɵɵtext(76);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(77, AuditingComponent_button_77_Template, 3, 0, "button", 41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "div", 42);
        i0.ɵɵelementStart(79, "span", 43);
        i0.ɵɵelementStart(80, "strong");
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(82, " enregistrement(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "div", 44);
        i0.ɵɵtemplate(84, AuditingComponent_div_84_Template, 3, 0, "div", 45);
        i0.ɵɵtemplate(85, AuditingComponent_table_85_Template, 24, 2, "table", 46);
        i0.ɵɵtemplate(86, AuditingComponent_app_pagination_86_Template, 1, 4, "app-pagination", 47);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(87, AuditingComponent_app_modal_87_Template, 16, 4, "app-modal", 48);
        i0.ɵɵtemplate(88, AuditingComponent_app_modal_88_Template, 19, 5, "app-modal", 49);
        i0.ɵɵtemplate(89, AuditingComponent_app_modal_89_Template, 16, 4, "app-modal", 50);
        i0.ɵɵtemplate(90, AuditingComponent_app_modal_90_Template, 48, 11, "app-modal", 51);
        i0.ɵɵtemplate(91, AuditingComponent_app_modal_91_Template, 9, 3, "app-modal", 52);
        i0.ɵɵtemplate(92, AuditingComponent_app_modal_92_Template, 5, 2, "app-modal", 53);
        i0.ɵɵtemplate(93, AuditingComponent_app_modal_93_Template, 2, 2, "app-modal", 54);
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
        i0.ɵɵproperty("ngModel", ctx.filterStatus);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.NOK);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.NOK]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.EN_COURS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.EN_COURS]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.OK);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.OK]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filterSearch || ctx.filterStatus);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredMissions.length);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingMissions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingMissions && ctx.filteredMissions.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showImportModal);
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
    } }, directives: [i4.NgIf, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i5.SelectControlValueAccessor, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i4.NgForOf, i3.RouterLinkWithHref, i3.RouterLinkActive, i6.PaginationComponent, i7.ModalComponent], pipes: [i4.DatePipe], styles: ["@import './audit-shared';\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n    min-height: 100vh;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 20px;\n    margin-bottom: 26px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 24px;\n    border-radius: 20px;\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.8);\n    transition: transform 0.3s ease;\n}\n\n.stat-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-4px);\n}\n\n.stat-icon[_ngcontent-%COMP%] {\n    width: 56px;\n    height: 56px;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.5rem;\n}\n\n.stat-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 0.85rem;\n    color: #64748b;\n    font-weight: 600;\n    margin-bottom: 4px;\n}\n\n.stat-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n    font-weight: 800;\n    color: #0f172a;\n}\n\n.stat-card.total[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #eef2ff;\n    color: #6366f1;\n}\n\n.stat-card.pending[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fffbe6;\n    color: #f59e0b;\n}\n\n.stat-card.completed[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #f0fdf4;\n    color: #10b981;\n}\n\n.stat-card.risks[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fff1f2;\n    color: #e11d48;\n}\n\r\n\r\n\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 28px;\r\n    border-radius: 14px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.95rem;\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);\n    filter: brightness(1.1);\n}\n\n.btn-import[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #0f766e 0%, #0f9f93 100%);\n    box-shadow: 0 4px 15px rgba(15, 118, 110, 0.28);\n}\n\n.btn-import[_ngcontent-%COMP%]:hover:not(:disabled) {\n    box-shadow: 0 8px 25px rgba(15, 118, 110, 0.35);\n}\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n    filter: grayscale(0.5);\r\n}\r\n\r\n\r\n.tabs-nav[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 12px;\r\n    margin-bottom: 25px;\r\n    padding: 6px;\r\n    background: rgba(226, 232, 240, 0.5);\r\n    border-radius: 16px;\r\n    width: fit-content;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    background: transparent;\r\n    border: none;\r\n    padding: 10px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\r\n    background: white;\r\n    color: #0f172a;\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n\r\n.missions-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 24px;\r\n    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    overflow: hidden;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n    table-layout: fixed;\n}\n\r\n.audit-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    background: #f8fafc;\n    padding: 18px 16px;\n    text-align: left;\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    text-transform: uppercase;\r\n    font-weight: 700;\r\n    letter-spacing: 0.05em;\r\n    border-bottom: 2px solid #f1f5f9;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    border-bottom: 1px solid #f8fafc;\n    font-size: 0.92rem;\n    color: #334155;\n    vertical-align: top;\n}\n\n.audit-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    height: auto;\n}\n\n.cell-id[_ngcontent-%COMP%] {\n    width: 85px;\n    white-space: nowrap;\n    text-align: center !important;\n}\n\n.cell-priority[_ngcontent-%COMP%] {\n    width: 115px;\n    white-space: nowrap;\n    text-align: center !important;\n}\n\n.cell-rule[_ngcontent-%COMP%] {\n    font-weight: 600;\n    color: #1e293b;\n}\n\n.cell-recommendation[_ngcontent-%COMP%] {\n    color: #475569;\n}\n\n.cell-horizon[_ngcontent-%COMP%], .cell-date[_ngcontent-%COMP%], .cell-status[_ngcontent-%COMP%] {\n    white-space: nowrap;\n}\n\n.cell-owner[_ngcontent-%COMP%] {\n    min-width: 180px;\n}\n\r\n.audit-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\r\n    background: #fcfdfe;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n    display: block;\r\n    color: #1e293b;\r\n    font-size: 1rem;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    color: #94a3b8;\n    font-size: 0.8rem;\n    display: block;\n    max-width: 300px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\n}\n\n.recommendation-preview[_ngcontent-%COMP%] {\n    display: -webkit-box;\n    max-width: 100%;\n    color: #475569;\n    line-height: 1.4;\n    overflow: hidden;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    word-break: break-word;\n}\n\n.responsible-text[_ngcontent-%COMP%] {\n    display: -webkit-box;\n    line-height: 1.4;\n    overflow: hidden;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n}\n\n.auditor-chip[_ngcontent-%COMP%] {\n    background: #f1f5f9;\n    padding: 6px 12px;\n    border-radius: 100px;\r\n    font-size: 0.85rem;\r\n    color: #475569;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    font-weight: 500;\r\n    border: 1px solid #e2e8f0;\r\n}\r\n\r\n.risk-info-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    max-width: 250px;\r\n\r\n    .risk-id {\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n        color: #6366f1;\r\n        background: #eef2ff;\r\n        padding: 2px 8px;\r\n        border-radius: 6px;\r\n        width: fit-content;\r\n    }\r\n\r\n    .risk-name {\r\n        font-weight: 600;\r\n        color: #334155;\r\n        font-size: 0.9rem;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n\r\n\r\n.badge[_ngcontent-%COMP%] {\n    padding: 7px 12px;\n    border-radius: 100px;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.02em;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 88px;\n}\n\r\n.status-\u00E0-venir[_ngcontent-%COMP%] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\r\n    border: 1px solid #bae6fd;\r\n}\r\n\r\n.status-en-cours[_ngcontent-%COMP%] {\n    background: #fef3c7;\n    color: #92400e;\n    border: 1px solid #fde68a;\n}\n\n.status-nok[_ngcontent-%COMP%] {\n    background: #fee2e2;\n    color: #b91c1c;\n    border: 1px solid #fecaca;\n}\n\n.status-ok[_ngcontent-%COMP%] {\n    background: #dcfce7;\n    color: #166534;\n    border: 1px solid #bbf7d0;\n}\n\r\n.status-termin\u00E9[_ngcontent-%COMP%] {\r\n    background: #dcfce7;\r\n    color: #166534;\r\n    border: 1px solid #bbf7d0;\r\n}\r\n\r\n.status-en-retard[_ngcontent-%COMP%] {\r\n    background: #fee2e2;\r\n    color: #b91c1c;\r\n    border: 1px solid #fecaca;\r\n}\r\n\r\n\r\n.actions-cell[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(3, 38px);\n    gap: 8px;\n    justify-content: end;\n    min-width: 138px;\n}\n\r\n.action-btn[_ngcontent-%COMP%] {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%]:hover {\r\n    background: #eef2ff;\r\n    border-color: #c7d2fe;\r\n}\r\n\r\n.btn-assign[_ngcontent-%COMP%]:hover {\r\n    background: #ecfdf5;\r\n    border-color: #a7f3d0;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%] {\r\n    color: #3b82f6;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%]:hover {\r\n    background: #eff6ff;\r\n    border-color: #bfdbfe;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%] {\r\n    color: #f59e0b;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%]:hover {\r\n    background: #fffbeb;\r\n    border-color: #fde68a;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n    color: #64748b;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%]:hover {\r\n    background: #fef2f2;\r\n    border-color: #fecaca;\r\n}\r\n\r\n\r\n.suggested-plan-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\r\n    gap: 25px;\r\n    margin-top: 25px;\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    border: 1px solid #e2e8f0;\r\n    display: flex;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.suggestion-card.selected[_ngcontent-%COMP%] {\r\n    border-color: #6366f1;\r\n    background: #fbfbfe;\r\n}\r\n\r\n.card-check[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    background: #f8fafc;\r\n    border-right: 1px solid #e2e8f0;\r\n    cursor: pointer;\r\n    color: #cbd5e1;\r\n    font-size: 1.4rem;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.selected[_ngcontent-%COMP%]   .card-check[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n    background: #eef2ff;\r\n    border-right-color: #c7d2fe;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    flex: 1;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 1.1rem;\r\n    color: #0f172a;\r\n    font-weight: 700;\r\n    line-height: 1.3;\r\n}\r\n\r\n.obj[_ngcontent-%COMP%], .resp[_ngcontent-%COMP%] {\r\n    font-size: 0.9rem;\r\n    color: #475569;\r\n    margin: 10px 0;\r\n    line-height: 1.5;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n    margin-top: 20px;\r\n    font-size: 0.8rem;\r\n    color: #94a3b8;\r\n    border-top: 1px solid #f1f5f9;\r\n    padding-top: 15px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n\r\n.modal-form[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 24px;\r\n    padding: 10px 5px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    color: #334155;\r\n}\r\n\r\n.req[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    padding: 12px 16px;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\r\n    font-family: inherit;\r\n    font-size: 0.95rem;\r\n    transition: all 0.2s;\r\n    background: #f8fafc;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%]:focus {\n    outline: none;\n    border-color: #6366f1;\n    background: white;\n    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);\n}\n\n.field-hint[_ngcontent-%COMP%] {\n    font-size: 0.82rem;\n    color: #64748b;\n}\n\r\n.form-footer[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 12px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    color: #475569;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-save[_ngcontent-%COMP%] {\r\n    background: #0f172a;\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 20px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%] {\r\n    padding: 15px;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    font-size: 0.75rem;\r\n    text-transform: uppercase;\r\n    color: #94a3b8;\r\n    margin-bottom: 5px;\r\n    font-weight: 700;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: #1e293b;\r\n    font-weight: 600;\r\n}\r\n\r\n.detail-item.full[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n}\n\n@media (max-width: 1200px) {\n    .missions-card[_ngcontent-%COMP%] {\n        overflow-x: auto;\n    }\n\n    .audit-table[_ngcontent-%COMP%] {\n        min-width: 1220px;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditingComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditing',
                templateUrl: './auditing.component.html',
                styleUrls: ['./auditing.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.HttpClient }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=auditing.component.js.map