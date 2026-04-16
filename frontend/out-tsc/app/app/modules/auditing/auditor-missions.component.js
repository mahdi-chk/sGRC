import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus, AuditMissionHorizon, AuditRecordType } from '../../core/services/auditing.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { getAuditNavItems, getStoredAuditRole } from './audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../shared/components/pagination/pagination.component";
import * as i6 from "../../shared/modal/modal.component";
const _c0 = function () { return { exact: true }; };
function AuditorMissionsComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r10.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r10.label, " ");
} }
function AuditorMissionsComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 39);
    i0.ɵɵtemplate(1, AuditorMissionsComponent_nav_11_a_1_Template, 2, 4, "a", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorMissionsComponent_button_61_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_button_61_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.clearFilters(); });
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵtext(2, " Reinitialiser ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_div_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isSuperAdmin ? "Chargement des enregistrements..." : "Chargement de vos enregistrements...", " ");
} }
function AuditorMissionsComponent_table_69_tr_16_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵelement(1, "i", 59);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r15.auditSenior.prenom, " ", mission_r15.auditSenior.nom, " ");
} }
function AuditorMissionsComponent_table_69_tr_16_div_11_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r15 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r15.risk == null ? null : mission_r15.risk.titre);
} }
function AuditorMissionsComponent_table_69_tr_16_div_11_small_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r15 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Source: ", mission_r15.sourceMission == null ? null : mission_r15.sourceMission.titre, "");
} }
function AuditorMissionsComponent_table_69_tr_16_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtemplate(1, AuditorMissionsComponent_table_69_tr_16_div_11_span_1_Template, 2, 1, "span", 61);
    i0.ɵɵtemplate(2, AuditorMissionsComponent_table_69_tr_16_div_11_small_2_Template, 2, 1, "small", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r15.risk == null ? null : mission_r15.risk.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r15.sourceMission == null ? null : mission_r15.sourceMission.titre);
} }
function AuditorMissionsComponent_table_69_tr_16_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_69_tr_16_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_69_tr_16_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const mission_r15 = i0.ɵɵnextContext().$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.openReportModal(mission_r15); });
    i0.ɵɵelement(1, "i", 64);
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_69_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵtemplate(9, AuditorMissionsComponent_table_69_tr_16_div_9_Template, 3, 2, "div", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtemplate(11, AuditorMissionsComponent_table_69_tr_16_div_11_Template, 3, 2, "div", 51);
    i0.ɵɵtemplate(12, AuditorMissionsComponent_table_69_tr_16_span_12_Template, 2, 0, "span", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 52);
    i0.ɵɵelementStart(20, "button", 53);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_69_tr_16_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r30); const mission_r15 = restoredCtx.$implicit; const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.openDetailModal(mission_r15); });
    i0.ɵɵelement(21, "i", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 55);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_69_tr_16_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r30); const mission_r15 = restoredCtx.$implicit; const ctx_r31 = i0.ɵɵnextContext(2); return ctx_r31.openEvidenceModal(mission_r15); });
    i0.ɵɵelement(23, "i", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, AuditorMissionsComponent_table_69_tr_16_button_24_Template, 2, 0, "button", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r15 = ctx.$implicit;
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r13.getDisplayTitle(mission_r15));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind3(7, 11, ctx_r13.getDisplayDescription(mission_r15), 0, 90), "", ctx_r13.getDisplayDescription(mission_r15).length > 90 ? "..." : "", "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", mission_r15.auditSenior);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mission_r15.risk || mission_r15.sourceMission);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !mission_r15.risk && !mission_r15.sourceMission);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r15.delai ? i0.ɵɵpipeBind2(15, 15, mission_r15.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + ctx_r13.getNormalizedStatus(mission_r15));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r13.getStatusLabel(mission_r15.statut), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r13.getNormalizedStatus(mission_r15) === ctx_r13.AuditMissionStatus.EN_COURS);
} }
function AuditorMissionsComponent_table_69_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 65);
    i0.ɵɵelement(2, "i", 66);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun enregistrement d audit assigne pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Senior Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Risque / Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Echeance");
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
    i0.ɵɵtemplate(16, AuditorMissionsComponent_table_69_tr_16_Template, 25, 18, "tr", 47);
    i0.ɵɵtemplate(17, AuditorMissionsComponent_table_69_tr_17_Template, 5, 0, "tr", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r3.pagedMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.filteredMissions.length === 0);
} }
function AuditorMissionsComponent_app_pagination_70_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 67);
    i0.ɵɵlistener("pageChanged", function AuditorMissionsComponent_app_pagination_70_Template_app_pagination_pageChanged_0_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.onPaginationChange($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalItems", ctx_r4.filteredMissions.length)("currentPage", ctx_r4.currentPage)("pageSize", ctx_r4.pageSize)("pageSizeOptions", ctx_r4.pageSizeOptions);
} }
function AuditorMissionsComponent_app_modal_71_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 68);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_71_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r36); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.showReportModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 71);
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Rapport Final d Audit ");
    i0.ɵɵelementStart(6, "span", 72);
    i0.ɵɵtext(7, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 73);
    i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_app_modal_71_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.reportData.rapport = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 71);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Recommandations ");
    i0.ɵɵelementStart(12, "span", 72);
    i0.ɵɵtext(13, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "textarea", 74);
    i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_app_modal_71_Template_textarea_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 75);
    i0.ɵɵelementStart(16, "button", 76);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_71_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r36); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.showReportModal = false; });
    i0.ɵɵtext(17, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 77);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_71_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r36); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.submitReport(); });
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", ctx_r5.reportData.rapport);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r5.reportData.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r5.reportData.rapport || ctx_r5.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.isLoading ? "Envoi..." : "Soumettre le Rapport", " ");
} }
function AuditorMissionsComponent_app_modal_72_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_72_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun plan d action associe a cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_72_table_5_tr_14_Template(rf, ctx) { if (rf & 1) {
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
    const item_r46 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r46.regleDnssi);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r46.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r46.responsableNom || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, item_r46.echeance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r46.etatAvancement);
} }
function AuditorMissionsComponent_app_modal_72_table_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Regle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, AuditorMissionsComponent_app_modal_72_table_5_tr_14_Template, 12, 8, "tr", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r44 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r44.currentChecklistItems);
} }
function AuditorMissionsComponent_app_modal_72_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 78);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_72_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r48); const ctx_r47 = i0.ɵɵnextContext(); return ctx_r47.showChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵtemplate(3, AuditorMissionsComponent_app_modal_72_div_3_Template, 3, 0, "div", 32);
    i0.ɵɵtemplate(4, AuditorMissionsComponent_app_modal_72_div_4_Template, 3, 0, "div", 79);
    i0.ɵɵtemplate(5, AuditorMissionsComponent_app_modal_72_table_5_Template, 15, 1, "table", 33);
    i0.ɵɵelementStart(6, "div", 75);
    i0.ɵɵelementStart(7, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_72_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r48); const ctx_r49 = i0.ɵɵnextContext(); return ctx_r49.showChecklistModal = false; });
    i0.ɵɵtext(8, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r6.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isLoading && ctx_r6.currentChecklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isLoading && ctx_r6.currentChecklistItems.length > 0);
} }
function AuditorMissionsComponent_app_modal_73_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Chargement des preuves... ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_73_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune preuve televersee pour cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_73_ul_10_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r57 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 92);
    i0.ɵɵelementStart(1, "div", 93);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_73_ul_10_li_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r57); const ev_r55 = restoredCtx.$implicit; const ctx_r56 = i0.ɵɵnextContext(3); return ctx_r56.downloadEvidence(ev_r55.path); });
    i0.ɵɵelement(2, "i", 94);
    i0.ɵɵelementStart(3, "span", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 96);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 97);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_73_ul_10_li_1_Template_button_click_8_listener() { const restoredCtx = i0.ɵɵrestoreView(_r57); const ev_r55 = restoredCtx.$implicit; const ctx_r58 = i0.ɵɵnextContext(3); return ctx_r58.deleteEvidence(ev_r55.id); });
    i0.ɵɵelement(9, "i", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r55 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ev_r55.filename);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 2, ev_r55.createdAt, "dd/MM/yyyy HH:mm"));
} }
function AuditorMissionsComponent_app_modal_73_ul_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 90);
    i0.ɵɵtemplate(1, AuditorMissionsComponent_app_modal_73_ul_10_li_1_Template, 10, 5, "li", 91);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r53 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r53.currentEvidences);
} }
function AuditorMissionsComponent_app_modal_73_Template(rf, ctx) { if (rf & 1) {
    const _r60 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 82);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_73_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r60); const ctx_r59 = i0.ɵɵnextContext(); return ctx_r59.showEvidenceModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 83);
    i0.ɵɵelementStart(4, "input", 84);
    i0.ɵɵlistener("change", function AuditorMissionsComponent_app_modal_73_Template_input_change_4_listener($event) { i0.ɵɵrestoreView(_r60); const ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 85);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_73_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r60); const ctx_r62 = i0.ɵɵnextContext(); return ctx_r62.uploadEvidence(); });
    i0.ɵɵelement(6, "i", 86);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AuditorMissionsComponent_app_modal_73_div_8_Template, 3, 0, "div", 32);
    i0.ɵɵtemplate(9, AuditorMissionsComponent_app_modal_73_div_9_Template, 3, 0, "div", 87);
    i0.ɵɵtemplate(10, AuditorMissionsComponent_app_modal_73_ul_10_Template, 2, 1, "ul", 88);
    i0.ɵɵelementStart(11, "div", 75);
    i0.ɵɵelementStart(12, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_73_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r60); const ctx_r63 = i0.ɵɵnextContext(); return ctx_r63.showEvidenceModal = false; });
    i0.ɵɵtext(13, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r7.selectedFile || ctx_r7.isUploading);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.isUploading ? "Televersement..." : "Ajouter Preuve", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.isLoading && ctx_r7.currentEvidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.isLoading && ctx_r7.currentEvidences.length > 0);
} }
function AuditorMissionsComponent_app_modal_74_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Horizon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r65 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r65.horizonLabelMap[(ctx_r65.selectedMission == null ? null : ctx_r65.selectedMission.horizon) || ""] || "-");
} }
function AuditorMissionsComponent_app_modal_74_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Priorite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r66 = i0.ɵɵnextContext(2);
    let tmp_0_0;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_0_0 = ctx_r66.selectedMission == null ? null : ctx_r66.selectedMission.priorite) !== null && tmp_0_0 !== undefined ? tmp_0_0 : "-");
} }
function AuditorMissionsComponent_app_modal_74_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r67 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r67.selectedMission == null ? null : ctx_r67.selectedMission.risk == null ? null : ctx_r67.selectedMission.risk.titre);
} }
function AuditorMissionsComponent_app_modal_74_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Mission source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r68 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r68.selectedMission == null ? null : ctx_r68.selectedMission.sourceMission == null ? null : ctx_r68.selectedMission.sourceMission.titre);
} }
function AuditorMissionsComponent_app_modal_74_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Rapport");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 105);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r69 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r69.selectedMission == null ? null : ctx_r69.selectedMission.rapport);
} }
function AuditorMissionsComponent_app_modal_74_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 99);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_74_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r71); const ctx_r70 = i0.ɵɵnextContext(); return ctx_r70.showDetailModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 100);
    i0.ɵɵelementStart(4, "div", 101);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 102);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Titre / Regle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 102);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AuditorMissionsComponent_app_modal_74_div_19_Template, 5, 1, "div", 103);
    i0.ɵɵtemplate(20, AuditorMissionsComponent_app_modal_74_div_20_Template, 5, 1, "div", 103);
    i0.ɵɵelementStart(21, "div", 102);
    i0.ɵɵelementStart(22, "label");
    i0.ɵɵtext(23, "Responsabilites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "p");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 101);
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, AuditorMissionsComponent_app_modal_74_div_32_Template, 5, 1, "div", 103);
    i0.ɵɵtemplate(33, AuditorMissionsComponent_app_modal_74_div_33_Template, 5, 1, "div", 104);
    i0.ɵɵtemplate(34, AuditorMissionsComponent_app_modal_74_div_34_Template, 5, 1, "div", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 75);
    i0.ɵɵelementStart(36, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_74_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r71); const ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.showDetailModal = false; });
    i0.ɵɵtext(37, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r8.getRecordTypeLabel(ctx_r8.selectedMission) + " - Details");
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("badge status-" + ctx_r8.getNormalizedStatus(ctx_r8.selectedMission));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.getStatusLabel(ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.statut), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r8.getDisplayTitle(ctx_r8.selectedMission));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r8.getDisplayDescription(ctx_r8.selectedMission));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.isActionPlanRecord(ctx_r8.selectedMission));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.isActionPlanRecord(ctx_r8.selectedMission));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.responsabilites) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.delai) ? i0.ɵɵpipeBind2(31, 13, ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.risk == null ? null : ctx_r8.selectedMission.risk.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.sourceMission == null ? null : ctx_r8.selectedMission.sourceMission.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedMission == null ? null : ctx_r8.selectedMission.rapport);
} }
export class AuditorMissionsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        this.filteredMissions = [];
        this.pagedMissions = [];
        this.isLoading = false;
        this.currentUserRole = getStoredAuditRole();
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 50, 100];
        this.totalAssigned = 0;
        this.inProgressCount = 0;
        this.pendingCount = 0;
        this.completedCount = 0;
        this.filterSearch = '';
        this.filterStatus = '';
        this.showReportModal = false;
        this.showDetailModal = false;
        this.showChecklistModal = false;
        this.showEvidenceModal = false;
        this.selectedMission = null;
        this.currentChecklistItems = [];
        this.currentEvidences = [];
        this.selectedFile = null;
        this.isUploading = false;
        this.backendUrl = environment.apiUrl.replace('/api', '');
        this.reportData = {
            rapport: '',
            recommandations: ''
        };
        this.AuditMissionStatus = AuditMissionStatus;
        this.AuditMissionHorizon = AuditMissionHorizon;
        this.AuditRecordType = AuditRecordType;
        this.statusLabelMap = {
            [AuditMissionStatus.NOK]: 'NOK',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.OK]: 'OK'
        };
        this.horizonLabelMap = {
            [AuditMissionHorizon.COURT_TERME]: 'A court terme',
            [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
        };
        this.recordTypeLabelMap = {
            [AuditRecordType.MISSION_AUDIT]: 'Mission',
            [AuditRecordType.PLAN_ACTION_AUDIT]: 'Plan d action'
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadMyMissions();
    }
    loadMyMissions() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.isLoading = false;
            return;
        }
        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);
        this.currentUserRole = currentUser.role || null;
        this.auditingService.getMissions('all').subscribe({
            next: (data) => {
                this.missions = this.isSuperAdmin
                    ? data
                    : data.filter((mission) => Number(mission.auditeurId) === userId);
                this.applyFilters();
                this.calculateStats();
                this.updatePagedMissions();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    applyFilters() {
        this.filteredMissions = this.missions.filter((mission) => {
            var _a, _b;
            const q = this.filterSearch.toLowerCase();
            const matchSearch = !this.filterSearch
                || String(mission.id).includes(q)
                || (mission.titre || '').toLowerCase().includes(q)
                || (mission.regleDnssi || '').toLowerCase().includes(q)
                || (mission.recommandations || mission.objectifs || '').toLowerCase().includes(q)
                || (mission.responsabilites || '').toLowerCase().includes(q)
                || (((_a = mission.risk) === null || _a === void 0 ? void 0 : _a.titre) || '').toLowerCase().includes(q)
                || (((_b = mission.sourceMission) === null || _b === void 0 ? void 0 : _b.titre) || '').toLowerCase().includes(q)
                || (mission.auditSenior && `${mission.auditSenior.prenom} ${mission.auditSenior.nom}`.toLowerCase().includes(q));
            const missionStatut = this.normalizeMissionStatus(mission.statutCode || mission.statut);
            const filterStatut = this.normalizeMissionStatus(this.filterStatus);
            const matchStatus = !filterStatut || missionStatut === filterStatut;
            return matchSearch && matchStatus;
        });
        this.currentPage = 1;
        this.updatePagedMissions();
    }
    onPaginationChange(event) {
        this.currentPage = event.page;
        this.pageSize = event.pageSize;
        this.updatePagedMissions();
    }
    updatePagedMissions() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedMissions = this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }
    calculateStats() {
        const normalizedStatuses = this.missions.map((mission) => this.normalizeMissionStatus(mission.statutCode || mission.statut));
        this.totalAssigned = this.missions.length;
        this.inProgressCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.EN_COURS).length;
        this.pendingCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.NOK).length;
        this.completedCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.OK).length;
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
    getNormalizedStatus(mission) {
        var _a;
        return this.normalizeMissionStatus(((_a = mission) === null || _a === void 0 ? void 0 : _a.statutCode) || (mission === null || mission === void 0 ? void 0 : mission.statut));
    }
    isMissionRecord(mission) {
        return ((mission === null || mission === void 0 ? void 0 : mission.type) || AuditRecordType.MISSION_AUDIT) === AuditRecordType.MISSION_AUDIT;
    }
    isActionPlanRecord(mission) {
        return (mission === null || mission === void 0 ? void 0 : mission.type) === AuditRecordType.PLAN_ACTION_AUDIT;
    }
    getRecordTypeLabel(mission) {
        const type = (mission === null || mission === void 0 ? void 0 : mission.type) || AuditRecordType.MISSION_AUDIT;
        return this.recordTypeLabelMap[type] || 'Enregistrement';
    }
    getDisplayTitle(mission) {
        if (!mission) {
            return '-';
        }
        return mission.regleDnssi || mission.titre || `Enregistrement #${mission.id}`;
    }
    getDisplayDescription(mission) {
        if (!mission) {
            return '-';
        }
        return mission.recommandations || mission.objectifs || mission.responsabilites || '-';
    }
    getStatusLabel(value) {
        const normalized = this.normalizeMissionStatus(value);
        return this.statusLabelMap[normalized] || value || '-';
    }
    openDetailModal(mission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }
    openReportModal(mission) {
        this.selectedMission = mission;
        this.reportData = {
            rapport: mission.rapport || '',
            recommandations: mission.recommandations || ''
        };
        this.showReportModal = true;
    }
    openChecklistModal(mission) {
        this.selectedMission = mission;
        this.isLoading = true;
        const targetMissionId = mission.sourceMissionId || mission.id;
        this.auditingService.getMissionActionPlanItems(targetMissionId).subscribe({
            next: (items) => {
                this.currentChecklistItems = items;
                this.isLoading = false;
                this.showChecklistModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors du chargement du plan d actions.');
            }
        });
    }
    openEvidenceModal(mission) {
        this.selectedMission = mission;
        this.loadEvidences(mission.id);
        this.showEvidenceModal = true;
    }
    loadEvidences(missionId) {
        this.isLoading = true;
        this.auditingService.getMissionEvidence(missionId).subscribe({
            next: (data) => {
                this.currentEvidences = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }
    uploadEvidence() {
        if (!this.selectedMission || !this.selectedFile) {
            return;
        }
        this.isUploading = true;
        this.auditingService.addMissionEvidence(this.selectedMission.id, this.selectedFile).subscribe({
            next: (newEvidence) => {
                this.currentEvidences.unshift(newEvidence);
                this.selectedFile = null;
                this.isUploading = false;
            },
            error: (err) => {
                console.error(err);
                this.isUploading = false;
                alert('Erreur lors de l upload du fichier.');
            }
        });
    }
    deleteEvidence(evidenceId) {
        if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?')) {
            return;
        }
        this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
            next: () => {
                this.currentEvidences = this.currentEvidences.filter((evidence) => evidence.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    downloadEvidence(path) {
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        window.open(urlWithToken, '_blank');
    }
    submitReport() {
        if (!this.selectedMission) {
            return;
        }
        this.isLoading = true;
        this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
            next: () => {
                this.isLoading = false;
                this.showReportModal = false;
                this.loadMyMissions();
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de l envoi du rapport.');
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
AuditorMissionsComponent.ɵfac = function AuditorMissionsComponent_Factory(t) { return new (t || AuditorMissionsComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditorMissionsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorMissionsComponent, selectors: [["app-auditor-missions"]], decls: 75, vars: 23, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], ["class", "audit-tabs", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-layer-group"], [1, "stat-info"], [1, "label"], [1, "value"], [1, "stat-card", "pending"], [1, "fas", "fa-clipboard-list"], [1, "stat-card", "risks"], [1, "fas", "fa-list-check"], [1, "stat-card", "completed"], [1, "fas", "fa-check-double"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher par ID, titre, regle, recommandation...", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged", 4, "ngIf"], ["title", "Soumettre Rapport d Audit", 3, "close", 4, "ngIf"], ["title", "Plan d action de la mission", 3, "close", 4, "ngIf"], ["title", "Tracabilite des preuves", 3, "close", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "mission-info"], ["class", "senior-info", 4, "ngIf"], ["class", "risk-info-cell", 4, "ngIf"], [1, "actions-cell"], ["title", "Voir details", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["title", "Tra\u00E7abilite des preuves", 1, "action-btn", "btn-evidence", 3, "click"], [1, "fas", "fa-paperclip"], ["class", "action-btn btn-report", "title", "Soumettre rapport", 3, "click", 4, "ngIf"], [1, "senior-info"], [1, "fas", "fa-user-tie"], [1, "risk-info-cell"], ["class", "risk-name", 4, "ngIf"], [1, "risk-name"], ["title", "Soumettre rapport", 1, "action-btn", "btn-report", 3, "click"], [1, "fas", "fa-file-signature"], ["colspan", "6", 1, "empty-state"], [1, "fas", "fa-check-circle"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged"], ["title", "Soumettre Rapport d Audit", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-group", "full"], [1, "req"], ["rows", "6", "placeholder", "Decrivez les resultats de l audit...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "4", "placeholder", "Actions correctives suggerees...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], ["title", "Plan d action de la mission", 3, "close"], ["class", "empty-state", "style", "padding: 2rem; text-align: center;", 4, "ngIf"], [1, "btn-save", 3, "click"], [1, "empty-state", 2, "padding", "2rem", "text-align", "center"], ["title", "Tracabilite des preuves", 3, "close"], [1, "evidence-upload-section"], ["type", "file", "accept", ".pdf,.docx,.xlsx,.jpg,.jpeg,.png", 3, "change"], [1, "btn-primary", 3, "disabled", "click"], [1, "fas", "fa-upload"], ["class", "empty-state", 4, "ngIf"], ["class", "evidence-list", 4, "ngIf"], [1, "empty-state"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "ev-info", 3, "click"], [1, "fas", "fa-file-alt"], [1, "ev-name"], [1, "ev-date"], ["title", "Supprimer", 1, "icon-btn", "delete", 3, "click"], [1, "fas", "fa-trash-alt"], [3, "title", "close"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-item", "full"], ["class", "detail-item", 4, "ngIf"], ["class", "detail-item full", 4, "ngIf"], [1, "report-preview"]], template: function AuditorMissionsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditorMissionsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vue mixte de vos missions d audit et des plans d action qui vous sont affectes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditorMissionsComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelement(15, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 11);
        i0.ɵɵelementStart(17, "span", 12);
        i0.ɵɵtext(18, "Total");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 14);
        i0.ɵɵelementStart(22, "div", 9);
        i0.ɵɵelement(23, "i", 15);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 11);
        i0.ɵɵelementStart(25, "span", 12);
        i0.ɵɵtext(26, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "span", 13);
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "div", 16);
        i0.ɵɵelementStart(30, "div", 9);
        i0.ɵɵelement(31, "i", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 11);
        i0.ɵɵelementStart(33, "span", 12);
        i0.ɵɵtext(34, "A traiter");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "span", 13);
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 18);
        i0.ɵɵelementStart(38, "div", 9);
        i0.ɵɵelement(39, "i", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "div", 11);
        i0.ɵɵelementStart(41, "span", 12);
        i0.ɵɵtext(42, "Clotures");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "span", 13);
        i0.ɵɵtext(44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 20);
        i0.ɵɵelementStart(46, "div", 21);
        i0.ɵɵelementStart(47, "div", 22);
        i0.ɵɵelement(48, "i", 23);
        i0.ɵɵelementStart(49, "input", 24);
        i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_Template_input_ngModelChange_49_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function AuditorMissionsComponent_Template_input_ngModelChange_49_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "div", 22);
        i0.ɵɵelement(51, "i", 5);
        i0.ɵɵelementStart(52, "select", 25);
        i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_Template_select_ngModelChange_52_listener($event) { return ctx.filterStatus = $event; })("change", function AuditorMissionsComponent_Template_select_change_52_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(53, "option", 26);
        i0.ɵɵtext(54, "Tous les etats");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "option", 27);
        i0.ɵɵtext(56);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "option", 27);
        i0.ɵɵtext(58);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "option", 27);
        i0.ɵɵtext(60);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(61, AuditorMissionsComponent_button_61_Template, 3, 0, "button", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "div", 29);
        i0.ɵɵelementStart(63, "span", 30);
        i0.ɵɵelementStart(64, "strong");
        i0.ɵɵtext(65);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(66, " enregistrement(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "div", 31);
        i0.ɵɵtemplate(68, AuditorMissionsComponent_div_68_Template, 3, 1, "div", 32);
        i0.ɵɵtemplate(69, AuditorMissionsComponent_table_69_Template, 18, 2, "table", 33);
        i0.ɵɵtemplate(70, AuditorMissionsComponent_app_pagination_70_Template, 1, 4, "app-pagination", 34);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(71, AuditorMissionsComponent_app_modal_71_Template, 20, 4, "app-modal", 35);
        i0.ɵɵtemplate(72, AuditorMissionsComponent_app_modal_72_Template, 9, 3, "app-modal", 36);
        i0.ɵɵtemplate(73, AuditorMissionsComponent_app_modal_73_Template, 14, 5, "app-modal", 37);
        i0.ɵɵtemplate(74, AuditorMissionsComponent_app_modal_74_Template, 38, 16, "app-modal", 38);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.isSuperAdmin ? "Pilotage Audit" : "Mon Espace Audit", "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.totalAssigned);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.inProgressCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.pendingCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.completedCount);
        i0.ɵɵadvance(5);
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
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredMissions.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showReportModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showChecklistModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEvidenceModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailModal);
    } }, directives: [i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i5.PaginationComponent, i6.ModalComponent], pipes: [i3.SlicePipe, i3.DatePipe], styles: ["@import 'auditing.component.scss';\r\n\r\n.auditor-view[_ngcontent-%COMP%] {\r\n    .stats-grid {\r\n        display: grid;\r\n        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\r\n        gap: 20px;\r\n        margin-bottom: 30px;\r\n    }\r\n\r\n    .stat-card {\r\n        background: white;\r\n        padding: 24px;\r\n        border-radius: 20px;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 20px;\r\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n        border: 1px solid rgba(255, 255, 255, 0.8);\r\n        transition: transform 0.3s ease;\r\n\r\n        &:hover {\r\n            transform: translateY(-5px);\r\n        }\r\n\r\n        .stat-icon {\r\n            width: 56px;\r\n            height: 56px;\r\n            border-radius: 16px;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            font-size: 1.5rem;\r\n        }\r\n\r\n        .stat-info {\r\n            .label {\r\n                display: block;\r\n                font-size: 0.85rem;\r\n                color: #64748b;\r\n                font-weight: 600;\r\n                margin-bottom: 4px;\r\n            }\r\n\r\n            .value {\r\n                font-size: 1.75rem;\r\n                font-weight: 800;\r\n                color: #0f172a;\r\n            }\r\n        }\r\n\r\n        &.total .stat-icon {\r\n            background: #eef2ff;\r\n            color: #6366f1;\r\n        }\r\n\r\n        &.pending .stat-icon {\r\n            background: #fffbe6;\r\n            color: #f59e0b;\r\n        }\r\n\r\n        &.completed .stat-icon {\r\n            background: #f0fdf4;\r\n            color: #10b981;\r\n        }\r\n\r\n        &.risks .stat-icon {\r\n            background: #f5f3ff;\r\n            color: #8b5cf6;\r\n        }\r\n    }\r\n\r\n    .senior-info {\n        display: flex;\n        align-items: center;\n        gap: 8px;\r\n        font-weight: 600;\r\n        color: #475569;\r\n        font-size: 0.9rem;\r\n\r\n        i {\r\n            color: #6366f1;\r\n        }\n    }\n\n    .record-type-badge {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        min-width: 110px;\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: #e0f2fe;\n        color: #0f4c81;\n        font-size: 0.78rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.04em;\n\n        &.plan {\n            background: #ecfccb;\n            color: #3f6212;\n        }\n    }\n\r\n    .report-preview {\r\n        background: #f8fafc;\r\n        padding: 15px;\r\n        border-radius: 12px;\r\n        white-space: pre-wrap;\r\n        color: #334155;\r\n        border: 1px solid #e2e8f0;\r\n        margin-top: 10px;\r\n        font-size: 0.95rem;\r\n        line-height: 1.6;\r\n    }\r\n\r\n    \r\n    .checklist-items {\r\n        list-style: none;\r\n        padding: 0;\r\n        margin: 0;\r\n    }\r\n\r\n    .checklist-item {\r\n        padding: 12px 15px;\r\n        border-bottom: 1px solid #eee;\r\n        transition: background 0.2s;\r\n        \r\n        &:last-child {\r\n            border-bottom: none;\r\n        }\r\n        \r\n        &.completed {\r\n            background: #f8fafc;\r\n            .item-text {\r\n                color: #888;\r\n                text-decoration: line-through;\r\n            }\r\n        }\r\n    }\r\n\r\n    .checkbox-container {\r\n        display: flex;\r\n        align-items: center;\r\n        position: relative;\r\n        cursor: pointer;\r\n        font-size: 14px;\r\n        user-select: none;\r\n        \r\n        input {\r\n            position: absolute;\r\n            opacity: 0;\r\n            cursor: pointer;\r\n            height: 0;\r\n            width: 0;\r\n        }\r\n        \r\n        .checkmark {\r\n            display: inline-block;\r\n            height: 20px;\r\n            width: 20px;\r\n            background-color: #fff;\r\n            border: 2px solid #004a99;\r\n            border-radius: 4px;\r\n            margin-right: 15px;\r\n            position: relative;\r\n            transition: all 0.2s;\r\n            \r\n            &:after {\r\n                content: \"\";\r\n                position: absolute;\r\n                display: none;\r\n                left: 5px;\r\n                top: 1px;\r\n                width: 5px;\r\n                height: 10px;\r\n                border: solid white;\r\n                border-width: 0 2px 2px 0;\r\n                transform: rotate(45deg);\r\n            }\r\n        }\r\n        \r\n        input:checked ~ .checkmark {\r\n            background-color: #004a99;\r\n            border-color: #004a99;\r\n        }\r\n        \r\n        input:checked ~ .checkmark:after {\r\n            display: block;\r\n        }\r\n    }\r\n\r\n    \r\n    .evidence-upload-section {\r\n        display: flex;\r\n        gap: 15px;\r\n        align-items: center;\r\n        background: #f8fafc;\r\n        padding: 15px;\r\n        border-radius: 8px;\r\n        margin-bottom: 20px;\r\n        border: 1px dashed #cbd5e1;\r\n\r\n        input[type=\"file\"] {\r\n            flex-grow: 1;\r\n            font-size: 0.9rem;\r\n        }\r\n    }\r\n\r\n    .evidence-list {\r\n        list-style: none;\r\n        padding: 0;\r\n        margin: 0;\r\n    }\r\n\r\n    .evidence-item {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        padding: 12px 15px;\r\n        border-bottom: 1px solid #eee;\r\n\r\n        &:last-child {\r\n            border-bottom: none;\r\n        }\r\n\r\n        .ev-info {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 10px;\r\n            cursor: pointer;\r\n            flex-grow: 1;\r\n\r\n            i {\r\n                color: #004a99;\r\n                font-size: 1.2rem;\r\n            }\r\n\r\n            .ev-name {\r\n                font-weight: 500;\r\n                color: #334155;\r\n            }\r\n\r\n            .ev-date {\r\n                color: #94a3b8;\r\n            }\r\n\r\n            &:hover .ev-name {\r\n                color: #004a99;\r\n                text-decoration: underline;\r\n            }\r\n        }\r\n\r\n        .icon-btn.delete {\r\n            color: #ef4444;\r\n            background: none;\r\n            border: none;\r\n            cursor: pointer;\r\n            padding: 5px;\r\n\r\n            &:hover {\r\n                transform: scale(1.1);\r\n            }\r\n        }\r\n    }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorMissionsComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-missions',
                templateUrl: './auditor-missions.component.html',
                styleUrls: ['./auditor-missions.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-missions.component.js.map