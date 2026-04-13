import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../core/services/auditing.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { getAuditNavItems, getStoredAuditRole } from './audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../shared/modal/modal.component";
const _c0 = function () { return { exact: true }; };
function AuditorMissionsComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r9.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r9.label, " ");
} }
function AuditorMissionsComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 38);
    i0.ɵɵtemplate(1, AuditorMissionsComponent_nav_11_a_1_Template, 2, 4, "a", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorMissionsComponent_button_65_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_button_65_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.clearFilters(); });
    i0.ɵɵelement(1, "i", 42);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isSuperAdmin ? "Chargement des missions..." : "Chargement de vos missions...", " ");
} }
function AuditorMissionsComponent_table_73_tr_16_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r14.auditSenior.prenom, " ", mission_r14.auditSenior.nom, " ");
} }
function AuditorMissionsComponent_table_73_tr_16_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 61);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_73_tr_16_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const mission_r14 = i0.ɵɵnextContext().$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.openChecklistModal(mission_r14); });
    i0.ɵɵelement(1, "i", 5);
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_73_tr_16_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 62);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_73_tr_16_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r25); const mission_r14 = i0.ɵɵnextContext().$implicit; const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.openEvidenceModal(mission_r14); });
    i0.ɵɵelement(1, "i", 63);
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_73_tr_16_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 64);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_73_tr_16_button_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const mission_r14 = i0.ɵɵnextContext().$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.openReportModal(mission_r14); });
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_73_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "div", 48);
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
    i0.ɵɵtemplate(9, AuditorMissionsComponent_table_73_tr_16_div_9_Template, 3, 2, "div", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵelementStart(11, "div", 50);
    i0.ɵɵelementStart(12, "span", 51);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 52);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 53);
    i0.ɵɵelementStart(23, "button", 54);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_table_73_tr_16_Template_button_click_23_listener() { const restoredCtx = i0.ɵɵrestoreView(_r30); const mission_r14 = restoredCtx.$implicit; const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.openDetailModal(mission_r14); });
    i0.ɵɵelement(24, "i", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, AuditorMissionsComponent_table_73_tr_16_button_25_Template, 2, 0, "button", 56);
    i0.ɵɵtemplate(26, AuditorMissionsComponent_table_73_tr_16_button_26_Template, 2, 0, "button", 57);
    i0.ɵɵtemplate(27, AuditorMissionsComponent_table_73_tr_16_button_27_Template, 2, 0, "button", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r14 = ctx.$implicit;
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r14.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind3(7, 13, mission_r14.objectifs, 0, 60), "...");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", mission_r14.auditSenior);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", mission_r14.risk == null ? null : mission_r14.risk.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", mission_r14.riskId, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r14.risk == null ? null : mission_r14.risk.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 17, mission_r14.delai, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + mission_r14.statut.replace("_", "-"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r12.statusLabelMap[mission_r14.statut] || mission_r14.statut, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", mission_r14.statut === ctx_r12.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r14.statut === ctx_r12.AuditMissionStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r14.statut === ctx_r12.AuditMissionStatus.EN_COURS);
} }
function AuditorMissionsComponent_table_73_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 66);
    i0.ɵɵelement(2, "i", 67);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Vous n'avez aucune mission d'audit assign\u00E9e pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_table_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Engagement par");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Risque Associ\u00E9");
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
    i0.ɵɵtemplate(16, AuditorMissionsComponent_table_73_tr_16_Template, 28, 20, "tr", 46);
    i0.ɵɵtemplate(17, AuditorMissionsComponent_table_73_tr_17_Template, 5, 0, "tr", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.filteredMissions.length === 0);
} }
function AuditorMissionsComponent_app_modal_74_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 68);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_74_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r33); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.showReportModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 71);
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Rapport Final d'Audit ");
    i0.ɵɵelementStart(6, "span", 72);
    i0.ɵɵtext(7, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 73);
    i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_app_modal_74_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.reportData.rapport = $event; });
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
    i0.ɵɵlistener("ngModelChange", function AuditorMissionsComponent_app_modal_74_Template_textarea_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.reportData.recommandations = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 75);
    i0.ɵɵelementStart(16, "button", 76);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_74_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r33); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.showReportModal = false; });
    i0.ɵɵtext(17, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 77);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_74_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r33); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.submitReport(); });
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", ctx_r4.reportData.rapport);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r4.reportData.recommandations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r4.reportData.rapport || ctx_r4.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.isLoading ? "Envoi..." : "Soumettre le Rapport", " ");
} }
function AuditorMissionsComponent_app_modal_75_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_75_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun plan d actions associ\u00E9 \u00E0 cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_75_table_5_tr_14_Template(rf, ctx) { if (rf & 1) {
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
    const item_r43 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r43.regleDnssi);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r43.recommandations);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r43.responsableNom || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, item_r43.echeance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r43.etatAvancement);
} }
function AuditorMissionsComponent_app_modal_75_table_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45);
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
    i0.ɵɵtemplate(14, AuditorMissionsComponent_app_modal_75_table_5_tr_14_Template, 12, 8, "tr", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r41 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r41.currentChecklistItems);
} }
function AuditorMissionsComponent_app_modal_75_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 78);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_75_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r45); const ctx_r44 = i0.ɵɵnextContext(); return ctx_r44.showChecklistModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵtemplate(3, AuditorMissionsComponent_app_modal_75_div_3_Template, 3, 0, "div", 32);
    i0.ɵɵtemplate(4, AuditorMissionsComponent_app_modal_75_div_4_Template, 3, 0, "div", 79);
    i0.ɵɵtemplate(5, AuditorMissionsComponent_app_modal_75_table_5_Template, 15, 1, "table", 33);
    i0.ɵɵelementStart(6, "div", 75);
    i0.ɵɵelementStart(7, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_75_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r45); const ctx_r46 = i0.ɵɵnextContext(); return ctx_r46.showChecklistModal = false; });
    i0.ɵɵtext(8, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r5.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r5.isLoading && ctx_r5.currentChecklistItems.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r5.isLoading && ctx_r5.currentChecklistItems.length > 0);
} }
function AuditorMissionsComponent_app_modal_76_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2, " Chargement des preuves... ");
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_76_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucune preuve t\u00E9l\u00E9vers\u00E9e pour cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorMissionsComponent_app_modal_76_ul_10_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 92);
    i0.ɵɵelementStart(1, "div", 93);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_76_ul_10_li_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r54); const ev_r52 = restoredCtx.$implicit; const ctx_r53 = i0.ɵɵnextContext(3); return ctx_r53.downloadEvidence(ev_r52.path); });
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
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_76_ul_10_li_1_Template_button_click_8_listener() { const restoredCtx = i0.ɵɵrestoreView(_r54); const ev_r52 = restoredCtx.$implicit; const ctx_r55 = i0.ɵɵnextContext(3); return ctx_r55.deleteEvidence(ev_r52.id); });
    i0.ɵɵelement(9, "i", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r52 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ev_r52.filename);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 2, ev_r52.createdAt, "dd/MM/yyyy HH:mm"));
} }
function AuditorMissionsComponent_app_modal_76_ul_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 90);
    i0.ɵɵtemplate(1, AuditorMissionsComponent_app_modal_76_ul_10_li_1_Template, 10, 5, "li", 91);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r50 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r50.currentEvidences);
} }
function AuditorMissionsComponent_app_modal_76_Template(rf, ctx) { if (rf & 1) {
    const _r57 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 82);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_76_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r57); const ctx_r56 = i0.ɵɵnextContext(); return ctx_r56.showEvidenceModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 83);
    i0.ɵɵelementStart(4, "input", 84);
    i0.ɵɵlistener("change", function AuditorMissionsComponent_app_modal_76_Template_input_change_4_listener($event) { i0.ɵɵrestoreView(_r57); const ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 85);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_76_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r57); const ctx_r59 = i0.ɵɵnextContext(); return ctx_r59.uploadEvidence(); });
    i0.ɵɵelement(6, "i", 86);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AuditorMissionsComponent_app_modal_76_div_8_Template, 3, 0, "div", 32);
    i0.ɵɵtemplate(9, AuditorMissionsComponent_app_modal_76_div_9_Template, 3, 0, "div", 87);
    i0.ɵɵtemplate(10, AuditorMissionsComponent_app_modal_76_ul_10_Template, 2, 1, "ul", 88);
    i0.ɵɵelementStart(11, "div", 75);
    i0.ɵɵelementStart(12, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_76_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r57); const ctx_r60 = i0.ɵɵnextContext(); return ctx_r60.showEvidenceModal = false; });
    i0.ɵɵtext(13, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r6.selectedFile || ctx_r6.isUploading);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.isUploading ? "T\u00E9l\u00E9versement..." : "Ajouter Preuve", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isLoading && ctx_r6.currentEvidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isLoading && ctx_r6.currentEvidences.length > 0);
} }
function AuditorMissionsComponent_app_modal_77_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Votre Rapport");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 104);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r62 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r62.selectedMission == null ? null : ctx_r62.selectedMission.rapport);
} }
function AuditorMissionsComponent_app_modal_77_Template(rf, ctx) { if (rf & 1) {
    const _r64 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 99);
    i0.ɵɵlistener("close", function AuditorMissionsComponent_app_modal_77_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(); return ctx_r63.showDetailModal = false; });
    i0.ɵɵelementStart(1, "div", 69, 70);
    i0.ɵɵelementStart(3, "div", 100);
    i0.ɵɵelementStart(4, "div", 101);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 101);
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 102);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Objectifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 102);
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Responsabilit\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 101);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(30, AuditorMissionsComponent_app_modal_77_div_30_Template, 5, 1, "div", 103);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 75);
    i0.ɵɵelementStart(32, "button", 80);
    i0.ɵɵlistener("click", function AuditorMissionsComponent_app_modal_77_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r64); const ctx_r65 = i0.ɵɵnextContext(); return ctx_r65.showDetailModal = false; });
    i0.ɵɵtext(33, "Fermer");
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
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(29, 8, ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.delai, "dd/MM/yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r7.selectedMission == null ? null : ctx_r7.selectedMission.rapport);
} }
export class AuditorMissionsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        this.filteredMissions = [];
        this.isLoading = false;
        this.currentUserRole = getStoredAuditRole();
        // Stats
        this.totalAssigned = 0;
        this.pendingCount = 0;
        this.completedCount = 0;
        this.overdueCount = 0;
        // Filter properties
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
        this.auditingService.getMissions().subscribe({
            next: (data) => {
                this.missions = this.isSuperAdmin
                    ? data
                    : data.filter(m => Number(m.auditeurId) === userId);
                this.applyFilters();
                this.calculateStats();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    applyFilters() {
        this.filteredMissions = this.missions.filter(m => {
            const matchSearch = !this.filterSearch ||
                m.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                (m.auditSenior && `${m.auditSenior.prenom} ${m.auditSenior.nom}`.toLowerCase().includes(this.filterSearch.toLowerCase()));
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
    calculateStats() {
        const normalizedStatuses = this.missions.map((mission) => this.normalizeMissionStatus(mission.statutCode || mission.statut));
        this.totalAssigned = normalizedStatuses.filter((status) => status !== AuditMissionStatus.ANNULE).length;
        this.pendingCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.EN_COURS || status === AuditMissionStatus.A_VENIR).length;
        this.completedCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.TERMINE).length;
        this.overdueCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.EN_RETARD).length;
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
        this.auditingService.getMissionActionPlanItems(mission.id).subscribe({
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
    toggleChecklistItem(item, isFinished) {
        if (!this.selectedMission)
            return;
        this.auditingService.toggleMissionChecklistItem(this.selectedMission.id, item.id, isFinished).subscribe({
            next: (updatedItem) => {
                item.estFait = updatedItem.estFait;
            },
            error: (err) => {
                console.error(err);
                item.estFait = !isFinished; // revert UI change
                alert('Erreur lors de la mise à jour.');
            }
        });
    }
    // --- PREUVES (EVIDENCE) ---
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
        if (!this.selectedMission || !this.selectedFile)
            return;
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
                alert('Erreur lors de l\'upload du fichier.');
            }
        });
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
    downloadEvidence(path) {
        // Remove trailing slashes from backendUrl just in case
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        // The path stored in DB is like 'src\storage\evidence\file.pdf'
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
        // Get token for authorization (backend allows token in query string)
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        window.open(urlWithToken, '_blank');
    }
    submitReport() {
        if (!this.selectedMission)
            return;
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
AuditorMissionsComponent.ɵfac = function AuditorMissionsComponent_Factory(t) { return new (t || AuditorMissionsComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditorMissionsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorMissionsComponent, selectors: [["app-auditor-missions"]], decls: 78, vars: 26, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], ["class", "audit-tabs", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-clipboard-list"], [1, "stat-info"], [1, "label"], [1, "value"], [1, "stat-card", "pending"], [1, "fas", "fa-clock"], [1, "stat-card", "completed"], [1, "fas", "fa-check-double"], [1, "stat-card", "risks"], [1, "fas", "fa-hourglass-end"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], ["title", "Soumettre Rapport d'Audit", 3, "close", 4, "ngIf"], ["title", "Plan d actions de la Mission", 3, "close", 4, "ngIf"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close", 4, "ngIf"], ["title", "D\u00E9tails de la Mission", 3, "close", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "mission-info"], ["class", "senior-info", 4, "ngIf"], [1, "risk-info-cell", 3, "title"], [1, "risk-id"], [1, "risk-name"], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-checklist", "title", "Ouvrir Plan d actions", 3, "click", 4, "ngIf"], ["class", "action-btn btn-evidence", "title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "click", 4, "ngIf"], ["class", "action-btn btn-report", "title", "Soumettre Rapport", 3, "click", 4, "ngIf"], [1, "senior-info"], [1, "fas", "fa-user-tie"], ["title", "Ouvrir Plan d actions", 1, "action-btn", "btn-checklist", 3, "click"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 1, "action-btn", "btn-evidence", 3, "click"], [1, "fas", "fa-paperclip"], ["title", "Soumettre Rapport", 1, "action-btn", "btn-report", 3, "click"], [1, "fas", "fa-file-signature"], ["colspan", "5", 1, "empty-state"], [1, "fas", "fa-check-circle"], ["title", "Soumettre Rapport d'Audit", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-group", "full"], [1, "req"], ["rows", "6", "placeholder", "D\u00E9crivez les r\u00E9sultats de l'audit...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "4", "placeholder", "Actions correctives sugg\u00E9r\u00E9es...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], ["title", "Plan d actions de la Mission", 3, "close"], ["class", "empty-state", "style", "padding: 2rem; text-align: center;", 4, "ngIf"], [1, "btn-save", 3, "click"], [1, "empty-state", 2, "padding", "2rem", "text-align", "center"], ["title", "Tra\u00E7abilit\u00E9 des Preuves", 3, "close"], [1, "evidence-upload-section"], ["type", "file", "accept", ".pdf,.docx,.xlsx,.jpg,.jpeg,.png", 3, "change"], [1, "btn-primary", 3, "disabled", "click"], [1, "fas", "fa-upload"], ["class", "empty-state", 4, "ngIf"], ["class", "evidence-list", 4, "ngIf"], [1, "empty-state"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "ev-info", 3, "click"], [1, "fas", "fa-file-alt"], [1, "ev-name"], [1, "ev-date"], ["title", "Supprimer", 1, "icon-btn", "delete", 3, "click"], [1, "fas", "fa-trash-alt"], ["title", "D\u00E9tails de la Mission", 3, "close"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-item", "full"], ["class", "detail-item full", 4, "ngIf"], [1, "report-preview"]], template: function AuditorMissionsComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "Consultez vos missions et g\u00E9rez vos rapports en toute simplicit\u00E9.");
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
        i0.ɵɵtext(18, "Total Missions");
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
        i0.ɵɵtext(26, "Actives");
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
        i0.ɵɵtext(34, "Termin\u00E9es");
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
        i0.ɵɵtext(42, "En Retard");
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
        i0.ɵɵtext(54, "Tous les statuts");
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
        i0.ɵɵelementStart(61, "option", 27);
        i0.ɵɵtext(62);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "option", 27);
        i0.ɵɵtext(64);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(65, AuditorMissionsComponent_button_65_Template, 3, 0, "button", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div", 29);
        i0.ɵɵelementStart(67, "span", 30);
        i0.ɵɵelementStart(68, "strong");
        i0.ɵɵtext(69);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(70, " mission(s) trouv\u00E9e(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "div", 31);
        i0.ɵɵtemplate(72, AuditorMissionsComponent_div_72_Template, 3, 1, "div", 32);
        i0.ɵɵtemplate(73, AuditorMissionsComponent_table_73_Template, 18, 2, "table", 33);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(74, AuditorMissionsComponent_app_modal_74_Template, 20, 4, "app-modal", 34);
        i0.ɵɵtemplate(75, AuditorMissionsComponent_app_modal_75_Template, 9, 3, "app-modal", 35);
        i0.ɵɵtemplate(76, AuditorMissionsComponent_app_modal_76_Template, 14, 5, "app-modal", 36);
        i0.ɵɵtemplate(77, AuditorMissionsComponent_app_modal_77_Template, 34, 11, "app-modal", 37);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.isSuperAdmin ? "Pilotage des Missions d'Audit" : "Mon Espace d'Audit", "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.totalAssigned);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.pendingCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.completedCount);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.overdueCount);
        i0.ɵɵadvance(5);
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
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showReportModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showChecklistModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEvidenceModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailModal);
    } }, directives: [i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i5.ModalComponent], pipes: [i3.SlicePipe, i3.DatePipe], styles: ["@import 'auditing.component.scss';\r\n\r\n.auditor-view[_ngcontent-%COMP%] {\r\n    .stats-grid {\r\n        display: grid;\r\n        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\r\n        gap: 20px;\r\n        margin-bottom: 30px;\r\n    }\r\n\r\n    .stat-card {\r\n        background: white;\r\n        padding: 24px;\r\n        border-radius: 20px;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 20px;\r\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n        border: 1px solid rgba(255, 255, 255, 0.8);\r\n        transition: transform 0.3s ease;\r\n\r\n        &:hover {\r\n            transform: translateY(-5px);\r\n        }\r\n\r\n        .stat-icon {\r\n            width: 56px;\r\n            height: 56px;\r\n            border-radius: 16px;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            font-size: 1.5rem;\r\n        }\r\n\r\n        .stat-info {\r\n            .label {\r\n                display: block;\r\n                font-size: 0.85rem;\r\n                color: #64748b;\r\n                font-weight: 600;\r\n                margin-bottom: 4px;\r\n            }\r\n\r\n            .value {\r\n                font-size: 1.75rem;\r\n                font-weight: 800;\r\n                color: #0f172a;\r\n            }\r\n        }\r\n\r\n        &.total .stat-icon {\r\n            background: #eef2ff;\r\n            color: #6366f1;\r\n        }\r\n\r\n        &.pending .stat-icon {\r\n            background: #fffbe6;\r\n            color: #f59e0b;\r\n        }\r\n\r\n        &.completed .stat-icon {\r\n            background: #f0fdf4;\r\n            color: #10b981;\r\n        }\r\n\r\n        &.risks .stat-icon {\r\n            background: #f5f3ff;\r\n            color: #8b5cf6;\r\n        }\r\n    }\r\n\r\n    .senior-info {\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 8px;\r\n        font-weight: 600;\r\n        color: #475569;\r\n        font-size: 0.9rem;\r\n\r\n        i {\r\n            color: #6366f1;\r\n        }\r\n    }\r\n\r\n    .report-preview {\r\n        background: #f8fafc;\r\n        padding: 15px;\r\n        border-radius: 12px;\r\n        white-space: pre-wrap;\r\n        color: #334155;\r\n        border: 1px solid #e2e8f0;\r\n        margin-top: 10px;\r\n        font-size: 0.95rem;\r\n        line-height: 1.6;\r\n    }\r\n\r\n    \r\n    .checklist-items {\r\n        list-style: none;\r\n        padding: 0;\r\n        margin: 0;\r\n    }\r\n\r\n    .checklist-item {\r\n        padding: 12px 15px;\r\n        border-bottom: 1px solid #eee;\r\n        transition: background 0.2s;\r\n        \r\n        &:last-child {\r\n            border-bottom: none;\r\n        }\r\n        \r\n        &.completed {\r\n            background: #f8fafc;\r\n            .item-text {\r\n                color: #888;\r\n                text-decoration: line-through;\r\n            }\r\n        }\r\n    }\r\n\r\n    .checkbox-container {\r\n        display: flex;\r\n        align-items: center;\r\n        position: relative;\r\n        cursor: pointer;\r\n        font-size: 14px;\r\n        user-select: none;\r\n        \r\n        input {\r\n            position: absolute;\r\n            opacity: 0;\r\n            cursor: pointer;\r\n            height: 0;\r\n            width: 0;\r\n        }\r\n        \r\n        .checkmark {\r\n            display: inline-block;\r\n            height: 20px;\r\n            width: 20px;\r\n            background-color: #fff;\r\n            border: 2px solid #004a99;\r\n            border-radius: 4px;\r\n            margin-right: 15px;\r\n            position: relative;\r\n            transition: all 0.2s;\r\n            \r\n            &:after {\r\n                content: \"\";\r\n                position: absolute;\r\n                display: none;\r\n                left: 5px;\r\n                top: 1px;\r\n                width: 5px;\r\n                height: 10px;\r\n                border: solid white;\r\n                border-width: 0 2px 2px 0;\r\n                transform: rotate(45deg);\r\n            }\r\n        }\r\n        \r\n        input:checked ~ .checkmark {\r\n            background-color: #004a99;\r\n            border-color: #004a99;\r\n        }\r\n        \r\n        input:checked ~ .checkmark:after {\r\n            display: block;\r\n        }\r\n    }\r\n\r\n    \r\n    .evidence-upload-section {\r\n        display: flex;\r\n        gap: 15px;\r\n        align-items: center;\r\n        background: #f8fafc;\r\n        padding: 15px;\r\n        border-radius: 8px;\r\n        margin-bottom: 20px;\r\n        border: 1px dashed #cbd5e1;\r\n\r\n        input[type=\"file\"] {\r\n            flex-grow: 1;\r\n            font-size: 0.9rem;\r\n        }\r\n    }\r\n\r\n    .evidence-list {\r\n        list-style: none;\r\n        padding: 0;\r\n        margin: 0;\r\n    }\r\n\r\n    .evidence-item {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        padding: 12px 15px;\r\n        border-bottom: 1px solid #eee;\r\n\r\n        &:last-child {\r\n            border-bottom: none;\r\n        }\r\n\r\n        .ev-info {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 10px;\r\n            cursor: pointer;\r\n            flex-grow: 1;\r\n\r\n            i {\r\n                color: #004a99;\r\n                font-size: 1.2rem;\r\n            }\r\n\r\n            .ev-name {\r\n                font-weight: 500;\r\n                color: #334155;\r\n            }\r\n\r\n            .ev-date {\r\n                color: #94a3b8;\r\n            }\r\n\r\n            &:hover .ev-name {\r\n                color: #004a99;\r\n                text-decoration: underline;\r\n            }\r\n        }\r\n\r\n        .icon-btn.delete {\r\n            color: #ef4444;\r\n            background: none;\r\n            border: none;\r\n            cursor: pointer;\r\n            padding: 5px;\r\n\r\n            &:hover {\r\n                transform: scale(1.1);\r\n            }\r\n        }\r\n    }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorMissionsComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-missions',
                templateUrl: './auditor-missions.component.html',
                styleUrls: ['./auditor-missions.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-missions.component.js.map