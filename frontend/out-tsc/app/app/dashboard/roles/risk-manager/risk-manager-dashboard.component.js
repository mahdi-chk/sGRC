import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RiskService, RiskLevel, RiskStatus, RiskProbability, RiskImpact, MaitriseLevel } from '../../../core/services/risk.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/risk.service";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/router";
import * as i4 from "../../../core/services/auth.service";
import * as i5 from "../../../core/services/dashboard.service";
import * as i6 from "@angular/common";
import * as i7 from "../../../shared/modal/modal.component";
import * as i8 from "@angular/forms";
function RiskManagerDashboardComponent_div_57_div_5_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 38);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_div_57_div_5_li_8_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r10); const s_r7 = restoredCtx.$implicit; const m_r5 = i0.ɵɵnextContext().$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onOpenModule(m_r5, s_r7); });
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r7.title, " ");
} }
function RiskManagerDashboardComponent_div_57_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 6);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul", 36);
    i0.ɵɵtemplate(8, RiskManagerDashboardComponent_div_57_div_5_li_8_Template, 3, 1, "li", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r5 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(m_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r5.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", m_r5.submodules);
} }
function RiskManagerDashboardComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelementStart(1, "h3", 30);
    i0.ɵɵelement(2, "i", 31);
    i0.ɵɵtext(3, " Acc\u00E8s Rapide aux Modules ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 32);
    i0.ɵɵtemplate(5, RiskManagerDashboardComponent_div_57_div_5_Template, 9, 3, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredModules);
} }
function RiskManagerDashboardComponent_app_modal_58_option_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dept_r24 = ctx.$implicit;
    i0.ɵɵproperty("value", dept_r24.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(dept_r24.nom);
} }
function RiskManagerDashboardComponent_app_modal_58_option_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r25 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r25.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3("", user_r25.prenom, " ", user_r25.nom, " (", user_r25.role, ")");
} }
function RiskManagerDashboardComponent_app_modal_58_small_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 77);
    i0.ɵɵtext(1, "S\u00E9lectionnez d'abord un d\u00E9partement");
    i0.ɵɵelementEnd();
} }
function RiskManagerDashboardComponent_app_modal_58_small_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 78);
    i0.ɵɵtext(1, "Aucun utilisateur dans ce d\u00E9partement");
    i0.ɵɵelementEnd();
} }
function RiskManagerDashboardComponent_app_modal_58_option_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r26 = ctx.$implicit;
    i0.ɵɵproperty("value", p_r26);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(p_r26);
} }
function RiskManagerDashboardComponent_app_modal_58_option_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r27 = ctx.$implicit;
    i0.ɵɵproperty("value", i_r27);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i_r27);
} }
function RiskManagerDashboardComponent_app_modal_58_span_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap("badge level-" + ctx_r18.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r18.newRisk.cotationRisqueBrut);
} }
function RiskManagerDashboardComponent_app_modal_58_span_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "Non \u00E9valu\u00E9");
    i0.ɵɵelementEnd();
} }
function RiskManagerDashboardComponent_app_modal_58_small_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(Score: ", ctx_r20.newRisk.niveauCotationRisqueBrut, "/512)");
} }
function RiskManagerDashboardComponent_app_modal_58_option_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r28 = ctx.$implicit;
    i0.ɵɵproperty("value", m_r28);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(m_r28);
} }
function RiskManagerDashboardComponent_app_modal_58_small_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(Score: ", ctx_r22.newRisk.niveauCotationRisqueNet, "/2048)");
} }
function RiskManagerDashboardComponent_app_modal_58_small_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 78);
    i0.ɵɵtext(1, "La date doit \u00EAtre aujourd'hui ou dans le futur");
    i0.ɵɵelementEnd();
} }
function RiskManagerDashboardComponent_app_modal_58_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 40);
    i0.ɵɵlistener("close", function RiskManagerDashboardComponent_app_modal_58_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r29 = i0.ɵɵnextContext(); return ctx_r29.showCreateModal = false; });
    i0.ɵɵelementStart(1, "div", 41, 42);
    i0.ɵɵelementStart(3, "div", 43);
    i0.ɵɵelementStart(4, "div", 44);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Titre du Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 45);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r31 = i0.ɵɵnextContext(); return ctx_r31.newRisk.titre = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 44);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Explication D\u00E9taill\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "textarea", 46);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_textarea_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.newRisk.explication = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 47);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 48);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.newRisk.domaine = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 47);
    i0.ɵɵelementStart(17, "label");
    i0.ɵɵtext(18, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "input", 49);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_input_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.newRisk.macroProcessus = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 44);
    i0.ɵɵelementStart(21, "label");
    i0.ɵɵtext(22, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "input", 50);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_input_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.newRisk.processus = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 47);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "D\u00E9partement \u00E0 Risque ");
    i0.ɵɵelementStart(27, "span", 51);
    i0.ɵɵtext(28, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "select", 52);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_select_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.newRisk.departementId = $event; })("change", function RiskManagerDashboardComponent_app_modal_58_Template_select_change_29_listener() { i0.ɵɵrestoreView(_r30); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.onDepartmentChange(); });
    i0.ɵɵelementStart(30, "option", 53);
    i0.ɵɵtext(31, "S\u00E9lectionner un d\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, RiskManagerDashboardComponent_app_modal_58_option_32_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 47);
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "Responsable du d\u00E9partement \u00E0 risque ");
    i0.ɵɵelementStart(36, "span", 51);
    i0.ɵɵtext(37, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "select", 55);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_select_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.newRisk.responsableTraitementId = $event; });
    i0.ɵɵelementStart(39, "option", 53);
    i0.ɵɵtext(40, "S\u00E9lectionner un collaborateur");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(41, RiskManagerDashboardComponent_app_modal_58_option_41_Template, 2, 4, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(42, RiskManagerDashboardComponent_app_modal_58_small_42_Template, 2, 0, "small", 56);
    i0.ɵɵtemplate(43, RiskManagerDashboardComponent_app_modal_58_small_43_Template, 2, 0, "small", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 58);
    i0.ɵɵelementStart(45, "h5", 59);
    i0.ɵɵtext(46, "Cotation du Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 47);
    i0.ɵɵelementStart(48, "label");
    i0.ɵɵtext(49, "Probabilit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "select", 52);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_select_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.newRisk.probabilite = $event; })("change", function RiskManagerDashboardComponent_app_modal_58_Template_select_change_50_listener() { i0.ɵɵrestoreView(_r30); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.calculateScores(); });
    i0.ɵɵelementStart(51, "option", 60);
    i0.ɵɵtext(52, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(53, RiskManagerDashboardComponent_app_modal_58_option_53_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 47);
    i0.ɵɵelementStart(55, "label");
    i0.ɵɵtext(56, "Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "select", 52);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_select_ngModelChange_57_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.newRisk.impact = $event; })("change", function RiskManagerDashboardComponent_app_modal_58_Template_select_change_57_listener() { i0.ɵɵrestoreView(_r30); const ctx_r42 = i0.ɵɵnextContext(); return ctx_r42.calculateScores(); });
    i0.ɵɵelementStart(58, "option", 60);
    i0.ɵɵtext(59, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(60, RiskManagerDashboardComponent_app_modal_58_option_60_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 44);
    i0.ɵɵelementStart(62, "label");
    i0.ɵɵtext(63, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "div", 61);
    i0.ɵɵtemplate(65, RiskManagerDashboardComponent_app_modal_58_span_65_Template, 2, 3, "span", 62);
    i0.ɵɵtemplate(66, RiskManagerDashboardComponent_app_modal_58_span_66_Template, 2, 0, "span", 63);
    i0.ɵɵtemplate(67, RiskManagerDashboardComponent_app_modal_58_small_67_Template, 2, 1, "small", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 44);
    i0.ɵɵelementStart(69, "label");
    i0.ɵɵtext(70, "DMR Existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "textarea", 65);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_textarea_ngModelChange_71_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r43 = i0.ɵɵnextContext(); return ctx_r43.newRisk.dmrExistant = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 47);
    i0.ɵɵelementStart(73, "label");
    i0.ɵɵtext(74, "Niveau de Ma\u00EEtrise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "select", 52);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_select_ngModelChange_75_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r44 = i0.ɵɵnextContext(); return ctx_r44.newRisk.niveauMaitrise = $event; })("change", function RiskManagerDashboardComponent_app_modal_58_Template_select_change_75_listener() { i0.ɵɵrestoreView(_r30); const ctx_r45 = i0.ɵɵnextContext(); return ctx_r45.calculateScores(); });
    i0.ɵɵelementStart(76, "option", 60);
    i0.ɵɵtext(77, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(78, RiskManagerDashboardComponent_app_modal_58_option_78_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "div", 47);
    i0.ɵɵelementStart(80, "label");
    i0.ɵɵtext(81, "Risque Net ");
    i0.ɵɵelementStart(82, "span", 51);
    i0.ɵɵtext(83, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 61);
    i0.ɵɵelementStart(85, "span");
    i0.ɵɵtext(86);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(87, RiskManagerDashboardComponent_app_modal_58_small_87_Template, 2, 1, "small", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 44);
    i0.ɵɵelementStart(89, "label");
    i0.ɵɵtext(90, "Plan d'action de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "textarea", 66);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_textarea_ngModelChange_91_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r46 = i0.ɵɵnextContext(); return ctx_r46.newRisk.planActionTraitement = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 58);
    i0.ɵɵelementStart(93, "h5", 59);
    i0.ɵɵtext(94, "Planification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "div", 47);
    i0.ɵɵelementStart(96, "label");
    i0.ɵɵtext(97, "Date d'\u00E9ch\u00E9ance ");
    i0.ɵɵelementStart(98, "span", 51);
    i0.ɵɵtext(99, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "input", 67);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_58_Template_input_ngModelChange_100_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r47 = i0.ɵɵnextContext(); return ctx_r47.newRisk.dateEcheance = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(101, RiskManagerDashboardComponent_app_modal_58_small_101_Template, 2, 0, "small", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "div", 44);
    i0.ɵɵelementStart(103, "label");
    i0.ɵɵtext(104, "Pi\u00E8ce Justificative (PDF/Image)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "div", 68);
    i0.ɵɵelementStart(106, "input", 69);
    i0.ɵɵlistener("change", function RiskManagerDashboardComponent_app_modal_58_Template_input_change_106_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r48 = i0.ɵɵnextContext(); return ctx_r48.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(107, "i", 70);
    i0.ɵɵelementStart(108, "span", 71);
    i0.ɵɵtext(109);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "div", 72);
    i0.ɵɵelementStart(111, "button", 73);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_58_Template_button_click_111_listener() { i0.ɵɵrestoreView(_r30); const ctx_r49 = i0.ɵɵnextContext(); return ctx_r49.showCreateModal = false; });
    i0.ɵɵtext(112, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(113, "button", 74);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_58_Template_button_click_113_listener() { i0.ɵɵrestoreView(_r30); const ctx_r50 = i0.ɵɵnextContext(); return ctx_r50.saveRisk(); });
    i0.ɵɵelement(114, "i", 75);
    i0.ɵɵtext(115);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r1.isEditing ? "Modifier le Risque" : "Cr\u00E9er un Nouveau Risque");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.explication);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.domaine);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.macroProcessus);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.processus);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.departementId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.departments);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.responsableTraitementId)("disabled", !ctx_r1.newRisk.departementId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredAgents);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.newRisk.departementId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.newRisk.departementId && ctx_r1.filteredAgents.length === 0);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.probabilite);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.riskProbabilities);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.impact);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.riskImpacts);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.newRisk.niveauCotationRisqueBrut);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.dmrExistant);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.niveauMaitrise);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.maitriseLevels);
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("badge level-" + (ctx_r1.newRisk.cotationRisqueNet || ctx_r1.newRisk.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.newRisk.cotationRisqueNet || ctx_r1.newRisk.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.newRisk.niveauCotationRisqueNet);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.planActionTraitement);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r1.newRisk.dateEcheance)("min", ctx_r1.today);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.newRisk.dateEcheance && ctx_r1.newRisk.dateEcheance < ctx_r1.today);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.selectedFile ? ctx_r1.selectedFile.name : "Cliquez ou glissez un fichier ici");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.isFormValid())("title", !ctx_r1.isFormValid() ? "Veuillez remplir tous les champs obligatoires" : "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isEditing ? "Enregistrer les modifications" : "Cr\u00E9er le Risque", " ");
} }
function RiskManagerDashboardComponent_app_modal_59_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r54 = ctx.$implicit;
    const ctx_r52 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", user_r54.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r52.getAgentDisplayLabel(user_r54), " ");
} }
function RiskManagerDashboardComponent_app_modal_59_i_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 88);
} }
function RiskManagerDashboardComponent_app_modal_59_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 40);
    i0.ɵɵlistener("close", function RiskManagerDashboardComponent_app_modal_59_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r56); const ctx_r55 = i0.ɵɵnextContext(); return ctx_r55.showAssignModal = false; });
    i0.ɵɵelementStart(1, "div", 81, 42);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Choisissez un Risk Agent pour traiter le risque : ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 82);
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Agent de traitement du risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 83);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_59_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r56); const ctx_r57 = i0.ɵɵnextContext(); return ctx_r57.selectedAgentId = $event; });
    i0.ɵɵelementStart(11, "option", 53);
    i0.ɵɵtext(12, "S\u00E9lectionner un collaborateur");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, RiskManagerDashboardComponent_app_modal_59_option_13_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 84);
    i0.ɵɵelementStart(15, "button", 85);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_59_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r56); const ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.showAssignModal = false; });
    i0.ɵɵtext(16, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 86);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_59_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r56); const ctx_r59 = i0.ɵɵnextContext(); return ctx_r59.assignRisk(); });
    i0.ɵɵtemplate(18, RiskManagerDashboardComponent_app_modal_59_i_18_Template, 1, 0, "i", 87);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r2.getAssignRiskModalTitle());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedAgentId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredAgents);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.isAssigning);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.selectedAgentId || ctx_r2.isAssigning);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isAssigning);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isAssigning ? "Assignation..." : ctx_r2.getAssignRiskActionLabel(), " ");
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_small_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 119);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r62 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r62.selectedRisk.niveauCotationRisqueBrut, ")");
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_small_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 119);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r63 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r63.selectedRisk.niveauCotationRisqueNet, ")");
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120);
    i0.ɵɵelementStart(1, "a", 121);
    i0.ɵɵelement(2, "i", 122);
    i0.ɵɵtext(3, " Voir le justificatif ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r64 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", ctx_r64.environment.serverUrl + "/" + ctx_r64.selectedRisk.pieceJustificative + ctx_r64.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_div_90_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 129);
    i0.ɵɵelementStart(1, "a", 130);
    i0.ɵɵelement(2, "i", 131);
    i0.ɵɵtext(3, " Voir la preuve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r67 = i0.ɵɵnextContext().$implicit;
    const ctx_r68 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", ctx_r68.environment.serverUrl + "/" + comment_r67.pieceJointe + ctx_r68.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_div_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 123);
    i0.ɵɵelementStart(1, "div", 124);
    i0.ɵɵelementStart(2, "span", 125);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 126);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 127);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, RiskManagerDashboardComponent_app_modal_60_div_1_div_90_div_9_Template, 4, 1, "div", 128);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r67 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", comment_r67.user == null ? null : comment_r67.user.prenom, " ", comment_r67.user == null ? null : comment_r67.user.nom, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, comment_r67.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(comment_r67.content);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r67.pieceJointe);
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 132);
    i0.ɵɵtext(1, " Aucun commentaire pour le moment. ");
    i0.ɵɵelementEnd();
} }
function RiskManagerDashboardComponent_app_modal_60_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41, 42);
    i0.ɵɵelementStart(2, "div", 91);
    i0.ɵɵelementStart(3, "div", 92);
    i0.ɵɵelementStart(4, "label", 93);
    i0.ɵɵtext(5, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 94);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 92);
    i0.ɵɵelementStart(9, "label", 93);
    i0.ɵɵtext(10, "Explication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 95);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 96);
    i0.ɵɵelementStart(14, "label", 93);
    i0.ɵɵtext(15, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 97);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 96);
    i0.ɵɵelementStart(19, "label", 93);
    i0.ɵɵtext(20, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 97);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 92);
    i0.ɵɵelementStart(24, "label", 93);
    i0.ɵɵtext(25, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 97);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 96);
    i0.ɵɵelementStart(29, "label", 93);
    i0.ɵɵtext(30, "Probabilit\u00E9 / Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "p", 97);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 96);
    i0.ɵɵelementStart(34, "label", 93);
    i0.ɵɵtext(35, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 98);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(39, RiskManagerDashboardComponent_app_modal_60_div_1_small_39_Template, 2, 1, "small", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 92);
    i0.ɵɵelementStart(41, "label", 93);
    i0.ɵɵtext(42, "DMR Existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p", 97);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 96);
    i0.ɵɵelementStart(46, "label", 93);
    i0.ɵɵtext(47, "Ma\u00EEtrise (DMR)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p", 97);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 96);
    i0.ɵɵelementStart(51, "label", 93);
    i0.ɵɵtext(52, "Risque Net");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 98);
    i0.ɵɵelementStart(54, "span");
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, RiskManagerDashboardComponent_app_modal_60_div_1_small_56_Template, 2, 1, "small", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 92);
    i0.ɵɵelementStart(58, "label", 93);
    i0.ɵɵtext(59, "Plan d'action de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p", 97);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 96);
    i0.ɵɵelementStart(63, "label", 93);
    i0.ɵɵtext(64, "D\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "p", 97);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "div", 96);
    i0.ɵɵelementStart(68, "label", 93);
    i0.ɵɵtext(69, "Date d'\u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "p", 97);
    i0.ɵɵtext(71);
    i0.ɵɵpipe(72, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "div", 96);
    i0.ɵɵelementStart(74, "label", 93);
    i0.ɵɵtext(75, "Responsable du d\u00E9partement \u00E0 risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "p", 97);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "div", 96);
    i0.ɵɵelementStart(79, "label", 93);
    i0.ɵɵtext(80, "Statut actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "div", 98);
    i0.ɵɵelementStart(82, "span");
    i0.ɵɵtext(83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(84, RiskManagerDashboardComponent_app_modal_60_div_1_div_84_Template, 4, 1, "div", 100);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "div", 101);
    i0.ɵɵelementStart(86, "h4", 102);
    i0.ɵɵelement(87, "i", 103);
    i0.ɵɵtext(88, " Historique du traitement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "div", 104);
    i0.ɵɵtemplate(90, RiskManagerDashboardComponent_app_modal_60_div_1_div_90_Template, 10, 8, "div", 105);
    i0.ɵɵtemplate(91, RiskManagerDashboardComponent_app_modal_60_div_1_div_91_Template, 2, 0, "div", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 107);
    i0.ɵɵelementStart(93, "h5", 108);
    i0.ɵɵtext(94, "Ajouter un commentaire / Preuve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "div", 109);
    i0.ɵɵelementStart(96, "textarea", 110);
    i0.ɵɵlistener("ngModelChange", function RiskManagerDashboardComponent_app_modal_60_div_1_Template_textarea_ngModelChange_96_listener($event) { i0.ɵɵrestoreView(_r71); const ctx_r70 = i0.ɵɵnextContext(2); return ctx_r70.treatmentContent = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(97, "div", 111);
    i0.ɵɵelementStart(98, "div", 112);
    i0.ɵɵelementStart(99, "input", 113);
    i0.ɵɵlistener("change", function RiskManagerDashboardComponent_app_modal_60_div_1_Template_input_change_99_listener($event) { i0.ɵɵrestoreView(_r71); const ctx_r72 = i0.ɵɵnextContext(2); return ctx_r72.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "div", 114);
    i0.ɵɵelement(101, "i", 115);
    i0.ɵɵtext(102);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "button", 116);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_60_div_1_Template_button_click_103_listener() { i0.ɵɵrestoreView(_r71); const ctx_r73 = i0.ɵɵnextContext(2); return ctx_r73.addComment(); });
    i0.ɵɵtext(104, " Envoyer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "div", 117);
    i0.ɵɵelementStart(106, "button", 118);
    i0.ɵɵlistener("click", function RiskManagerDashboardComponent_app_modal_60_div_1_Template_button_click_106_listener() { i0.ɵɵrestoreView(_r71); const ctx_r74 = i0.ɵɵnextContext(2); return ctx_r74.showDetailsModal = false; });
    i0.ɵɵtext(107, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r60 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.explication);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.domaine);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.macroProcessus || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.processus || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r60.selectedRisk.probabilite || "\u2014", " / ", ctx_r60.selectedRisk.impact || "\u2014", "");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap("badge level-" + ctx_r60.selectedRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.cotationRisqueBrut || "\u2014");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r60.selectedRisk.niveauCotationRisqueBrut);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.dmrExistant || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.niveauMaitrise || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap("badge level-" + (ctx_r60.selectedRisk.cotationRisqueNet || ctx_r60.selectedRisk.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.cotationRisqueNet || ctx_r60.selectedRisk.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r60.selectedRisk.niveauCotationRisqueNet);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.planActionTraitement || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.departement == null ? null : ctx_r60.selectedRisk.departement.nom);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(72, 31, ctx_r60.selectedRisk.dateEcheance, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r60.selectedRisk.responsableTraitement == null ? null : ctx_r60.selectedRisk.responsableTraitement.prenom, " ", ctx_r60.selectedRisk.responsableTraitement == null ? null : ctx_r60.selectedRisk.responsableTraitement.nom, "");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap("badge status-" + ctx_r60.selectedRisk.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r60.selectedRisk.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r60.selectedRisk.pieceJustificative);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r60.comments);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r60.comments.length === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r60.treatmentContent);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r60.selectedFile ? ctx_r60.selectedFile.name : "Joindre un fichier", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r60.treatmentContent);
} }
function RiskManagerDashboardComponent_app_modal_60_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 89);
    i0.ɵɵlistener("close", function RiskManagerDashboardComponent_app_modal_60_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r76); const ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.showDetailsModal = false; });
    i0.ɵɵtemplate(1, RiskManagerDashboardComponent_app_modal_60_div_1_Template, 108, 34, "div", 90);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedRisk);
} }
export class RiskManagerDashboardComponent {
    constructor(riskService, http, router, authService, dashboardService) {
        this.riskService = riskService;
        this.http = http;
        this.router = router;
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.filteredModules = [];
        this.title = 'Dashboard Risk Manager';
        this.openModule = new EventEmitter();
        this.openRiskManagement = new EventEmitter();
        this.environment = environment;
        this.risks = [];
        this.departments = [];
        this.allUsers = [];
        this.filteredAgents = [];
        this.selectedAgentId = '';
        this.comments = [];
        this.treatmentContent = '';
        this.selectedFile = null;
        this.isAssigning = false;
        // Statistics
        this.stats = {
            total: 0,
            treatmentRate: 0,
            avgMaturity: 0,
            criticalCount: 0
        };
        this.showCreateModal = false;
        this.showAssignModal = false;
        this.showDetailsModal = false;
        this.isEditing = false;
        this.selectedRisk = null;
        this.editRiskId = null;
        this.newRisk = {
            titre: '',
            explication: '',
            domaine: '',
            macroProcessus: null,
            processus: null,
            departementId: '',
            dateEcheance: '',
            niveauRisque: RiskLevel.MEDIUM,
            probabilite: null,
            impact: null,
            niveauMaitrise: null,
            dmrExistant: '',
            planActionTraitement: '',
            cotationRisqueBrut: null,
            niveauCotationRisqueBrut: null,
            cotationRisqueNet: null,
            niveauCotationRisqueNet: null,
            responsableTraitementId: ''
        };
        this.riskLevels = Object.values(RiskLevel);
        this.riskProbabilities = Object.values(RiskProbability);
        this.riskImpacts = Object.values(RiskImpact);
        this.maitriseLevels = Object.values(MaitriseLevel);
        this.today = new Date().toISOString().split('T')[0];
        this.filterStatut = '';
        this.filterNiveau = '';
        this.searchText = '';
    }
    get authQueryToken() {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }
    ngOnInit() {
        this.loadRisks();
        this.loadInitialData();
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && (user === null || user === void 0 ? void 0 : user.role)) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }
    loadRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.calculateStats();
        });
    }
    calculateStats() {
        if (!this.risks || this.risks.length === 0) {
            this.stats = { total: 0, treatmentRate: 0, avgMaturity: 0, criticalCount: 0 };
            return;
        }
        const total = this.risks.length;
        const treated = this.risks.filter(r => this.isCompletedRiskStatus(r.statutCode || r.statut)).length;
        const critical = this.risks.filter(r => this.normalizeValue(r.niveauRisqueCode || r.niveauRisque) === RiskLevel.CRITICAL).length;
        const treatmentRate = Math.round((treated / total) * 100);
        const criticalRate = Math.round((critical / total) * 100);
        const avgMaturity = RiskService.calculateMaturityIndex(this.risks);
        this.stats = {
            total,
            treatmentRate,
            avgMaturity,
            criticalCount: critical
        };
    }
    loadInitialData() {
        this.http.get(`${environment.apiUrl}/departments`).subscribe(data => this.departments = data);
        this.http.get(`${environment.apiUrl}/users/assignable/risk-agents`).subscribe(users => {
            this.allUsers = users;
            this.filteredAgents = [...users];
        });
    }
    onDepartmentChange() {
        this.newRisk.responsableTraitementId = ''; // Reset selection on dept change
        this.updateFilteredAgents();
    }
    updateFilteredAgents() {
        const departmentId = Number(this.newRisk.departementId || 0);
        const departmentAgents = this.allUsers.filter((user) => {
            return !departmentId || Number(user.departementId) === departmentId;
        });
        this.filteredAgents = departmentAgents.length > 0 ? departmentAgents : [...this.allUsers];
    }
    isFormValid() {
        const isDateValid = this.newRisk.dateEcheance >= this.today;
        return !!(this.newRisk.titre &&
            this.newRisk.explication &&
            this.newRisk.domaine &&
            this.newRisk.departementId &&
            this.newRisk.dateEcheance &&
            isDateValid &&
            this.newRisk.responsableTraitementId);
    }
    onOpenModule(m, s) {
        if (s.title === 'Nouveau Risque') {
            this.showCreateModal = true;
        }
        else if (s.title === 'Mes Risques') {
            this.loadRisks();
        }
        else {
            this.dashboardService.openSubmoduleModal(m, s);
            this.openModule.emit({ m, s });
        }
    }
    onOpenRiskManagement() {
        this.router.navigate(['/dashboard/risks']);
        this.openRiskManagement.emit();
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    onEditRisk(risk) {
        this.isEditing = true;
        this.editRiskId = risk.id;
        this.newRisk = Object.assign(Object.assign({}, risk), { departementId: risk.departementId.toString(), dateEcheance: new Date(risk.dateEcheance).toISOString().split('T')[0], responsableTraitementId: risk.responsableTraitementId.toString() });
        this.calculateScores();
        this.updateFilteredAgents();
        this.showCreateModal = true;
    }
    calculateScores() {
        let probaVal = 0;
        switch (this.newRisk.probabilite) {
            case RiskProbability.RARE:
                probaVal = 1;
                break;
            case RiskProbability.POSSIBLE:
                probaVal = 2;
                break;
            case RiskProbability.PROBABLE:
                probaVal = 4;
                break;
            case RiskProbability.PERMANENT:
                probaVal = 8;
                break;
        }
        let impactVal = 0;
        switch (this.newRisk.impact) {
            case RiskImpact.LIMITÉ:
                impactVal = 1;
                break;
            case RiskImpact.MOYEN:
                impactVal = 4;
                break;
            case RiskImpact.SIGNIFICATIF:
                impactVal = 16;
                break;
            case RiskImpact.CRITIQUE:
                impactVal = 64;
                break;
        }
        if (probaVal && impactVal) {
            const brut = probaVal * impactVal;
            this.newRisk.niveauCotationRisqueBrut = brut;
            if (brut <= 8)
                this.newRisk.cotationRisqueBrut = RiskLevel.LOW;
            else if (brut <= 32)
                this.newRisk.cotationRisqueBrut = RiskLevel.LIMITED;
            else if (brut <= 128)
                this.newRisk.cotationRisqueBrut = RiskLevel.MEDIUM;
            else
                this.newRisk.cotationRisqueBrut = RiskLevel.HIGH;
        }
        else {
            this.newRisk.niveauCotationRisqueBrut = null;
            this.newRisk.cotationRisqueBrut = null;
        }
        let dmrVal = 0;
        switch (this.newRisk.niveauMaitrise) {
            case MaitriseLevel.FAIBLE:
                dmrVal = 4;
                break;
            case MaitriseLevel.LIMITÉ:
                dmrVal = 3;
                break;
            case MaitriseLevel.MOYEN:
                dmrVal = 2;
                break;
            case MaitriseLevel.ÉLEVÉ:
                dmrVal = 1;
                break;
        }
        if (this.newRisk.niveauCotationRisqueBrut && dmrVal) {
            const net = this.newRisk.niveauCotationRisqueBrut * dmrVal;
            this.newRisk.niveauCotationRisqueNet = net;
            if (net <= 32)
                this.newRisk.cotationRisqueNet = RiskLevel.LOW;
            else if (net <= 128)
                this.newRisk.cotationRisqueNet = RiskLevel.LIMITED;
            else if (net <= 512)
                this.newRisk.cotationRisqueNet = RiskLevel.MEDIUM;
            else
                this.newRisk.cotationRisqueNet = RiskLevel.HIGH;
            this.newRisk.niveauRisque = this.newRisk.cotationRisqueNet;
        }
        else {
            this.newRisk.niveauCotationRisqueNet = null;
            this.newRisk.cotationRisqueNet = null;
        }
    }
    saveRisk() {
        if (!this.isFormValid())
            return;
        const formData = new FormData();
        Object.keys(this.newRisk).forEach(key => {
            formData.append(key, this.newRisk[key]);
        });
        if (this.selectedFile) {
            formData.append('pieceJustificative', this.selectedFile);
        }
        if (this.isEditing && this.editRiskId) {
            this.riskService.updateRisk(this.editRiskId, formData).subscribe(() => {
                this.finalizeSave();
            });
        }
        else {
            this.riskService.createRisk(formData).subscribe(() => {
                this.finalizeSave();
            });
        }
    }
    finalizeSave() {
        this.showCreateModal = false;
        this.loadRisks();
        this.resetForm();
    }
    openAssign(risk) {
        this.selectedRisk = risk;
        this.selectedAgentId = risk.riskAgentId ? risk.riskAgentId.toString() : '';
        this.showAssignModal = true;
        this.filteredAgents = this.getAssignableAgentsForRisk(risk);
    }
    onViewDetails(risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
        this.loadComments(risk.id);
    }
    loadComments(riskId) {
        this.riskService.getComments(riskId).subscribe(comments => this.comments = comments);
    }
    addComment() {
        if (!this.selectedRisk || !this.treatmentContent)
            return;
        const formData = new FormData();
        formData.append('content', this.treatmentContent);
        if (this.selectedFile) {
            formData.append('pieceJointe', this.selectedFile);
        }
        this.riskService.addComment(this.selectedRisk.id, formData).subscribe(() => {
            this.treatmentContent = '';
            this.selectedFile = null;
            this.loadComments(this.selectedRisk.id);
        });
    }
    assignRisk(agentId = this.selectedAgentId) {
        if (this.selectedRisk && agentId) {
            this.isAssigning = true;
            this.riskService.assignRisk(this.selectedRisk.id, parseInt(agentId)).subscribe({
                next: () => {
                    this.isAssigning = false;
                    this.showAssignModal = false;
                    this.selectedAgentId = '';
                    this.loadRisks();
                    this.selectedRisk = null;
                },
                error: (err) => {
                    this.isAssigning = false;
                    console.error('Error assigning risk:', err);
                    alert('Erreur lors de l\'assignation du risque. Veuillez réessayer.');
                }
            });
        }
    }
    closeRisk(riskId) {
        this.riskService.updateStatus(riskId, RiskStatus.CLOSED).subscribe(() => {
            this.loadRisks();
        });
    }
    resetForm() {
        this.isEditing = false;
        this.editRiskId = null;
        this.newRisk = {
            titre: '',
            explication: '',
            domaine: '',
            macroProcessus: null,
            processus: null,
            departementId: '',
            dateEcheance: '',
            niveauRisque: RiskLevel.MEDIUM,
            probabilite: null,
            impact: null,
            niveauMaitrise: null,
            dmrExistant: '',
            planActionTraitement: '',
            cotationRisqueBrut: null,
            niveauCotationRisqueBrut: null,
            cotationRisqueNet: null,
            niveauCotationRisqueNet: null,
            responsableTraitementId: ''
        };
        this.selectedFile = null;
    }
    getAssignRiskModalTitle() {
        var _a;
        return ((_a = this.selectedRisk) === null || _a === void 0 ? void 0 : _a.riskAgentId) ? 'Réassigner le risque' : 'Assigner le risque';
    }
    getAssignRiskActionLabel() {
        var _a;
        return ((_a = this.selectedRisk) === null || _a === void 0 ? void 0 : _a.riskAgentId) ? 'Réassigner maintenant' : 'Assigner maintenant';
    }
    getAssignableAgentsForRisk(risk) {
        const riskAgents = [...this.allUsers];
        if (!risk) {
            return riskAgents;
        }
        const departmentId = Number(risk.departementId);
        const departmentAgents = riskAgents.filter((user) => Number(user.departementId) === departmentId);
        return departmentAgents.length > 0 ? departmentAgents : riskAgents;
    }
    getAgentDisplayLabel(user) {
        var _a;
        const fullName = `${(user === null || user === void 0 ? void 0 : user.prenom) || ''} ${(user === null || user === void 0 ? void 0 : user.nom) || ''}`.trim();
        const department = ((_a = user === null || user === void 0 ? void 0 : user.departement) === null || _a === void 0 ? void 0 : _a.nom) || (user === null || user === void 0 ? void 0 : user.departementNom) || '';
        return department ? `${fullName} - ${department}` : fullName;
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalizeValue(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }
    normalizeValue(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
RiskManagerDashboardComponent.ɵfac = function RiskManagerDashboardComponent_Factory(t) { return new (t || RiskManagerDashboardComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.HttpClient), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.AuthService), i0.ɵɵdirectiveInject(i5.DashboardService)); };
RiskManagerDashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskManagerDashboardComponent, selectors: [["app-risk-manager-dashboard"]], inputs: { filteredModules: "filteredModules", title: "title" }, outputs: { openModule: "openModule", openRiskManagement: "openRiskManagement" }, decls: 61, vars: 11, consts: [[1, "role-dashboard", "risk-manager"], [1, "welcome-banner", "blue-banner"], [1, "fas", "fa-exclamation-triangle"], [1, "dashboard-grid", "stats-wrapper", 2, "display", "flex", "gap", "30px", "align-items", "stretch", "margin-bottom", "30px"], [1, "module-card", "premium", "special-admin", 2, "flex", "1", "margin", "0"], [1, "card-icon"], [1, "desc"], [1, "card-footer"], [1, "btn-primary", 2, "display", "inline-flex", "align-items", "center", "gap", "8px", "text-decoration", "none", "border", "none", "cursor", "pointer", 3, "click"], [1, "fas", "fa-arrow-right"], [1, "module-card", "premium", "stats-overview-card", 2, "flex", "1.5", "margin", "0", "padding", "25px"], [1, "stats-header", 2, "display", "flex", "justify-content", "space-between", "align-items", "center", "margin-bottom", "20px"], [2, "margin", "0", "font-size", "1.25rem"], [1, "fas", "fa-chart-line", 2, "color", "#c5a059", "margin-right", "10px"], [1, "badge", "premium", 2, "background", "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", "color", "white", "border", "none"], [1, "stats-indicators", 2, "display", "grid", "grid-template-columns", "repeat(3, 1fr)", "gap", "15px"], [1, "stat-mini-item", 2, "background", "#f8fafc", "padding", "15px", "border-radius", "12px", "border", "1px solid #edf2f7"], [2, "display", "block", "font-size", "0.8rem", "color", "#64748b", "font-weight", "600", "margin-bottom", "5px"], [2, "display", "flex", "align-items", "baseline", "gap", "5px"], [2, "font-size", "1.5rem", "font-weight", "800", "color", "#1e293b"], [2, "font-size", "0.9rem", "font-weight", "600", "color", "#64748b"], [2, "font-size", "1.5rem", "font-weight", "800", "color", "#d32f2f"], [1, "progress-container", 2, "margin-top", "20px"], [2, "display", "flex", "justify-content", "space-between", "font-size", "0.8rem", "margin-bottom", "6px", "font-weight", "600", "color", "#475569"], [1, "progress-bar-bg", 2, "height", "8px", "background", "#e2e8f0", "border-radius", "10px", "overflow", "hidden"], [1, "progress-bar-fill", 2, "height", "100%", "background", "linear-gradient(90deg, #004a99 0%, #00c6ff 100%)", "transition", "width 1s ease-in-out"], ["class", "functional-modules-section", "style", "margin-bottom: 30px;", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], ["title", "D\u00E9tails du Risque", 3, "close", 4, "ngIf"], [1, "functional-modules-section", 2, "margin-bottom", "30px"], [1, "section-subtitle", 2, "margin-bottom", "20px", "font-size", "1.25rem", "color", "#1e293b", "font-weight", "700"], [1, "fas", "fa-layer-group", 2, "color", "#004a99", "margin-right", "10px"], [1, "dashboard-grid", 2, "display", "grid", "grid-template-columns", "repeat(auto-fill, minmax(300px, 1fr))", "gap", "25px"], ["class", "module-card premium", 4, "ngFor", "ngForOf"], [1, "module-card", "premium"], [1, "fas", "fa-cog"], [1, "submodules-list"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "fas", "fa-chevron-right"], [3, "title", "close"], ["modal-body", "", 1, "modal-body-content"], ["projected", ""], [1, "form-grid", 2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "20px"], [1, "form-group", 2, "grid-column", "span 2"], ["type", "text", "placeholder", "Ex: Fuite de donn\u00E9es clients", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Description du risque...", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], [1, "form-group"], ["type", "text", "placeholder", "Ex: Cybers\u00E9curit\u00E9", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Ex: Finance", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Ex: Gestion Tr\u00E9sorerie", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], [1, "required"], [1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "disabled", "ngModelChange"], ["style", "color: #666; font-size: 0.75rem;", 4, "ngIf"], ["style", "color: #d32f2f; font-size: 0.75rem;", 4, "ngIf"], [2, "grid-column", "span 2", "margin", "10px 0", "border-bottom", "2px solid #e2e8f0", "padding-bottom", "5px"], [2, "color", "#475569", "margin", "0"], [3, "ngValue"], [2, "padding", "10px", "border-radius", "6px", "border", "1px solid #ddd", "background", "#f9f9f9"], [3, "class", 4, "ngIf"], ["style", "color:#666;", 4, "ngIf"], ["style", "margin-left: 10px; color:#666;", 4, "ngIf"], ["rows", "2", "placeholder", "Dispositifs existants...", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Plan pour traiter ce risque...", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], ["type", "date", 1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "min", "ngModelChange"], [1, "file-upload-box", 2, "border", "2px dashed #ddd", "padding", "15px", "border-radius", "8px", "text-align", "center", "cursor", "pointer", "transition", "all 0.3s", "position", "relative"], ["type", "file", 2, "opacity", "0", "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], [1, "fas", "fa-cloud-upload-alt", 2, "font-size", "1.5rem", "color", "#004a99", "margin-bottom", "5px", "display", "block"], [2, "font-size", "0.9rem", "color", "#666"], [2, "margin-top", "30px", "display", "flex", "justify-content", "flex-end", "gap", "10px", "border-top", "1px solid #eee", "padding-top", "20px"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "disabled", "title", "click"], [1, "fas", "fa-save"], [3, "value"], [2, "color", "#666", "font-size", "0.75rem"], [2, "color", "#d32f2f", "font-size", "0.75rem"], [2, "color", "#666"], [2, "margin-left", "10px", "color", "#666"], ["modal-body", ""], [1, "form-group", 2, "margin", "20px 0"], [1, "premium-input", 2, "width", "100%", "padding", "10px", "border", "1px solid #ddd", "border-radius", "6px", 3, "ngModel", "ngModelChange"], [2, "display", "flex", "justify-content", "flex-end", "gap", "10px"], [1, "btn-secondary", 3, "disabled", "click"], [1, "btn-primary", 3, "disabled", "click"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "fas", "fa-spinner", "fa-spin"], ["title", "D\u00E9tails du Risque", 3, "close"], ["modal-body", "", "class", "modal-body-content", 4, "ngIf"], [1, "details-grid", 2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "15px", "background", "#fff", "padding", "20px", "border-radius", "12px", "border", "1px solid #edf2f7"], [1, "detail-item", 2, "grid-column", "span 2"], [2, "color", "#64748b", "font-size", "0.8rem", "text-transform", "uppercase", "font-weight", "700"], [2, "font-size", "1.1rem", "font-weight", "600", "color", "#1e293b", "margin", "5px 0 0"], [2, "color", "#475569", "line-height", "1.5", "margin", "5px 0 0"], [1, "detail-item"], [2, "margin", "5px 0 0"], [2, "margin-top", "5px"], ["style", "margin-left:5px; color:#64748b;", 4, "ngIf"], ["class", "detail-item", "style", "grid-column: span 2; margin-top: 10px; padding-top: 15px; border-top: 1px dashed #e2e8f0;", 4, "ngIf"], [1, "treatment-history", 2, "margin-top", "25px", "border-top", "1px solid #edf2f7", "padding-top", "20px"], [2, "color", "#1e293b", "margin-bottom", "15px", "font-size", "1.05rem", "display", "flex", "align-items", "center", "gap", "8px"], [1, "fas", "fa-history", 2, "color", "#64748b"], [1, "comments-list", 2, "max-height", "200px", "overflow-y", "auto", "padding-right", "8px"], ["class", "comment-item", "style", "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 12px;", 4, "ngFor", "ngForOf"], ["style", "text-align: center; padding: 15px; color: #94a3b8; font-style: italic; font-size: 0.85rem;", 4, "ngIf"], [1, "add-comment-form", 2, "margin-top", "20px", "background", "#f8fafc", "padding", "12px", "border-radius", "10px", "border", "1px solid #e2e8f0"], [2, "margin", "0 0 10px 0", "font-size", "0.9rem", "color", "#1e293b"], [1, "form-group", 2, "margin-bottom", "10px"], ["rows", "2", "placeholder", "Ajouter une observation...", 1, "premium-input", 2, "width", "100%", "padding", "8px", "border", "1px solid #ddd", "border-radius", "6px", "font-size", "0.9rem", 3, "ngModel", "ngModelChange"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center", "gap", "10px"], [2, "position", "relative", "flex", "1"], ["type", "file", 2, "opacity", "0", "position", "absolute", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], [2, "border", "1px dashed #cbd5e1", "padding", "6px", "border-radius", "6px", "font-size", "0.75rem", "text-align", "center", "color", "#64748b", "background", "white"], [1, "fas", "fa-upload"], [1, "btn-primary", 2, "padding", "8px 15px", "font-size", "0.85rem", 3, "disabled", "click"], [2, "margin-top", "25px", "display", "flex", "justify-content", "flex-end"], [1, "btn-primary", 3, "click"], [2, "margin-left", "5px", "color", "#64748b"], [1, "detail-item", 2, "grid-column", "span 2", "margin-top", "10px", "padding-top", "15px", "border-top", "1px dashed #e2e8f0"], ["target", "_blank", 1, "btn-secondary", 2, "display", "inline-flex", "align-items", "center", "gap", "8px", "text-decoration", "none", "padding", "10px 15px", "border-radius", "8px", "font-size", "0.9rem", 3, "href"], [1, "fas", "fa-file-pdf"], [1, "comment-item", 2, "background", "#f8fafc", "border", "1px solid #e2e8f0", "border-radius", "10px", "padding", "12px", "margin-bottom", "12px"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "6px", "font-size", "0.8rem"], [2, "font-weight", "700", "color", "#334155"], [2, "color", "#94a3b8"], [2, "margin", "0", "color", "#475569", "font-size", "0.88rem", "line-height", "1.4"], ["style", "margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1;", 4, "ngIf"], [2, "margin-top", "8px", "padding-top", "6px", "border-top", "1px dashed #cbd5e1"], ["target", "_blank", 2, "color", "#004a99", "font-size", "0.8rem", "text-decoration", "none", "font-weight", "600", "display", "inline-flex", "align-items", "center", "gap", "4px", 3, "href"], [1, "fas", "fa-paperclip"], [2, "text-align", "center", "padding", "15px", "color", "#94a3b8", "font-style", "italic", "font-size", "0.85rem"]], template: function RiskManagerDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵelement(3, "i", 2);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p");
        i0.ɵɵtext(6, "G\u00E9rez les risques, \u00E9valuez les impacts et suivez les plans de traitement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 3);
        i0.ɵɵelementStart(8, "div", 4);
        i0.ɵɵelementStart(9, "div", 5);
        i0.ɵɵelement(10, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "h3");
        i0.ɵɵtext(12, "Gestion des Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "p", 6);
        i0.ɵɵtext(14, "Cr\u00E9ez, modifiez, assignez et suivez tous les risques depuis la page d\u00E9di\u00E9e.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 7);
        i0.ɵɵelementStart(16, "button", 8);
        i0.ɵɵlistener("click", function RiskManagerDashboardComponent_Template_button_click_16_listener() { return ctx.onOpenRiskManagement(); });
        i0.ɵɵelement(17, "i", 9);
        i0.ɵɵtext(18, " Ouvrir la gestion des risques ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 10);
        i0.ɵɵelementStart(20, "div", 11);
        i0.ɵɵelementStart(21, "h3", 12);
        i0.ɵɵelement(22, "i", 13);
        i0.ɵɵtext(23, " Performance des Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "span", 14);
        i0.ɵɵtext(25, "Temps R\u00E9el");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "div", 15);
        i0.ɵɵelementStart(27, "div", 16);
        i0.ɵɵelementStart(28, "span", 17);
        i0.ɵɵtext(29, "TRAITEMENT");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "div", 18);
        i0.ɵɵelementStart(31, "span", 19);
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "span", 20);
        i0.ɵɵtext(34, "%");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "div", 16);
        i0.ɵɵelementStart(36, "span", 17);
        i0.ɵɵtext(37, "MATURIT\u00C9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 18);
        i0.ɵɵelementStart(39, "span", 19);
        i0.ɵɵtext(40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "span", 20);
        i0.ɵɵtext(42, "/5");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "div", 16);
        i0.ɵɵelementStart(44, "span", 17);
        i0.ɵɵtext(45, "CRITIQUES");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 18);
        i0.ɵɵelementStart(47, "span", 21);
        i0.ɵɵtext(48);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "div", 22);
        i0.ɵɵelementStart(50, "div", 23);
        i0.ɵɵelementStart(51, "span");
        i0.ɵɵtext(52, "Progression Globale");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "span");
        i0.ɵɵtext(54);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "div", 24);
        i0.ɵɵelement(56, "div", 25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(57, RiskManagerDashboardComponent_div_57_Template, 6, 1, "div", 26);
        i0.ɵɵtemplate(58, RiskManagerDashboardComponent_app_modal_58_Template, 116, 38, "app-modal", 27);
        i0.ɵɵtemplate(59, RiskManagerDashboardComponent_app_modal_59_Template, 20, 8, "app-modal", 27);
        i0.ɵɵtemplate(60, RiskManagerDashboardComponent_app_modal_60_Template, 2, 1, "app-modal", 28);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.title, "");
        i0.ɵɵadvance(28);
        i0.ɵɵtextInterpolate(ctx.stats.treatmentRate);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.stats.avgMaturity);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.stats.criticalCount);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate1("", ctx.stats.treatmentRate, "%");
        i0.ɵɵadvance(2);
        i0.ɵɵstyleProp("width", ctx.stats.treatmentRate, "%");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredModules.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showCreateModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAssignModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal);
    } }, directives: [i6.NgIf, i6.NgForOf, i7.ModalComponent, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgModel, i8.SelectControlValueAccessor, i8.NgSelectOption, i8.ɵNgSelectMultipleOption], pipes: [i6.DatePipe], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n\r\n      .logo-img {\r\n        height: 35px;\r\n        width: auto;\r\n        border-radius: 4px;\r\n      }\r\n\r\n      .logo {\r\n        font-family: 'Montserrat', sans-serif;\r\n        font-weight: 700;\r\n        font-size: 18px;\r\n        color: #004a99;\r\n        letter-spacing: 0.5px;\r\n        white-space: nowrap;\r\n      }\r\n    }\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\n    --p_low: 0;\n    --p_limited: 0;\n    --p_med: 0;\n    --p_high: 0;\n    --p_crit: 0;\n    width: 200px;\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.low .dot {\n        background: #3b82f6;\n      }\n\n      &.limited .dot {\n        background: #14b8a6;\n      }\n\n      &.med .dot {\n        background: #f59e0b;\n      }\n\r\n      &.high .dot {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.crit .dot {\r\n        background: #7f1d1d;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .bar-wrapper {\r\n    padding: 10px 0;\r\n  }\r\n\r\n  .bar-group {\r\n    margin-bottom: 20px;\r\n\r\n    .bar-label {\r\n      font-size: 0.9rem;\r\n      font-weight: 700;\r\n      color: #334155;\r\n      margin-bottom: 6px;\r\n    }\r\n\r\n    .bar-track {\r\n      height: 24px;\r\n      background: #f1f5f9;\r\n      border-radius: 12px;\r\n      overflow: hidden;\r\n    }\r\n\r\n    .bar-fill {\r\n      height: 100%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      padding-right: 12px;\r\n      border-radius: 12px;\r\n      transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\r\n      min-width: 30px;\r\n\r\n      .bar-value {\r\n        color: white;\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n      }\r\n\r\n      &.open,\n      &.ouvert {\n        background: #94a3b8;\n      }\n\n      &.in_progress,\n      &.en-cours {\n        background: #3b82f6;\n      }\n\n      &.treated,\n      &.traite {\n        background: #10b981; // Green\n      }\n\n      &.closed,\n      &.cloture {\n        background: #64748b; // Slate grey\n      }\n\r\n      // Audit specific statuses\r\n      &.a-venir {\r\n        background: #94a3b8;\r\n      }\r\n\r\n      &.termine {\r\n        background: #10b981;\r\n      }\r\n\r\n      &.en-retard {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.annule {\r\n        background: #64748b;\r\n      }\r\n\r\n      &.dept-fill {\r\n        background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  margin: 0 auto 2rem;\n  overflow: visible !important;\n  \n  .matrix-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 16px;\n    margin-bottom: 18px;\n    padding: 0 6px;\n\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\n  }\n\n  .matrix-subtitle {\n    margin: 6px 0 0;\n    color: #64748b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n  }\n\n  .matrix-legend {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n\n    .legend-chip {\n      font-size: 0.72rem;\n      font-weight: 700;\n      padding: 5px 10px;\n      border-radius: 999px;\n      text-transform: uppercase;\n      \n      &.green { background: #d1fae5; color: #065f46; }\n      &.yellow { background: #fef3c7; color: #92400e; }\n      &.orange { background: #ffedd5; color: #9a3412; }\n      &.red { background: #fee2e2; color: #991b1b; }\n    }\n  }\n\n  .matrix-insights {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 12px;\n    margin-bottom: 14px;\n  }\n\n  .insight-card {\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    border-radius: 14px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    min-height: 88px;\n\n    .insight-label {\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    strong {\n      font-size: 1.05rem;\n      color: #0f172a;\n      line-height: 1.3;\n    }\n\n    small {\n      color: #64748b;\n      font-size: 0.8rem;\n      line-height: 1.4;\n    }\n\n    &.highlight {\n      border-color: rgba(59, 130, 246, 0.22);\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\n    }\n\n    &.critical {\n      border-color: rgba(239, 68, 68, 0.18);\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\n    }\n  }\n\n  .matrix-footer {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n    margin-top: 12px;\n  }\n\n  .footer-note {\n    padding: 12px 14px;\n    border-radius: 12px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #475569;\n    font-size: 0.88rem;\n    line-height: 1.5;\n  }\n}\n\n.risk-matrix-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: auto auto auto;\n  gap: 10px;\n  background: white;\n  padding: 14px;\n  border-radius: 18px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\n}\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\n  grid-row: 1;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  writing-mode: initial;\n  rotate: 0deg;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n.risk-matrix-body[_ngcontent-%COMP%] {\n  grid-row: 2;\n  grid-column: 1;\n  overflow-x: auto;\n}\n\n.risk-matrix-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 780px;\n  table-layout: fixed;\n  border-spacing: 4px;\n  border-collapse: separate;\n\n  .col-axis {\n    width: 130px;\n  }\n\n  .col-impact {\n    width: calc((100% - 130px) / 4);\n  }\n\n  th, td {\n    padding: 0;\n    height: 66px;\n    border-radius: 8px;\n    vertical-align: middle;\n  }\n\n  .impact-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.85rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    padding: 8px 6px;\n    line-height: 1.2;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .prob-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.84rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    width: 130px;\n    padding: 8px 6px;\n    line-height: 1.25;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .axis-corner { border: none; background: transparent; width: 130px; }\n\n  .total-label,\n  .total-cell {\n    background: #eff6ff;\n    border: 1px solid #bfdbfe;\n    color: #1d4ed8;\n    text-align: center;\n    font-weight: 800;\n    font-size: 0.9rem;\n    padding: 8px 6px;\n  }\n\n  .total-label {\n    background: #e0f2fe;\n    border-color: #bae6fd;\n    color: #0f766e;\n  }\n\n  .cell {\n    text-align: center;\n    border: 2px solid transparent;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n    \n    &:hover {\n      transform: scale(1.03);\n      z-index: 10;\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\n      border-color: rgba(255,255,255,0.4);\n    }\n\n    &.is-clickable {\n      cursor: pointer;\n\n      &::after {\n        content: 'Voir';\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        font-size: 0.62rem;\n        font-weight: 800;\n        padding: 3px 6px;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.18);\n        color: rgba(255, 255, 255, 0.95);\n      }\n    }\n\n    .cell-content {\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 2px;\n      padding: 4px;\n    }\n\n    .cell-value {\n      font-size: 1.35rem;\n      font-weight: 900;\n      color: white;\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\n    }\n\n    .cell-meta {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.92);\n      letter-spacing: 0.03em;\n    }\n\n    \n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\n    &.cell-lightgreen .cell-meta,\n    &.cell-lightyellow .cell-meta {\n      color: #475569;\n    }\n  }\n\n  .totals-row {\n    th, td {\n      height: 46px;\n    }\n  }\n}\n\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.matrix-detail-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n  border-radius: 12px;\n\n  .summary-label {\n    display: block;\n    font-size: 0.72rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #64748b;\n    margin-bottom: 6px;\n  }\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.matrix-risk-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-height: 52vh;\n  overflow-y: auto;\n  padding-right: 4px;\n}\n\n.matrix-risk-item[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 16px;\n  background: white;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n}\n\n.risk-item-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n\n  h4 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.risk-level-badge[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 800;\n  white-space: nowrap;\n\n  &.critical {\n    background: #fee2e2;\n    color: #991b1b;\n  }\n\n  &.high {\n    background: #ffedd5;\n    color: #9a3412;\n  }\n\n  &.medium {\n    background: #fef3c7;\n    color: #92400e;\n  }\n\n  &.limited {\n    background: #ccfbf1;\n    color: #115e59;\n  }\n\n  &.low {\n    background: #d1fae5;\n    color: #065f46;\n  }\n\n  &.default {\n    background: #e2e8f0;\n    color: #475569;\n  }\n}\n\n.risk-item-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.risk-item-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px 14px;\n  color: #334155;\n  font-size: 0.88rem;\n}\n\n.empty-matrix-detail[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\n  grid-row: 3;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n@media (max-width: 1100px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    .matrix-insights {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n\n    .matrix-footer {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n\n    .matrix-header {\n      flex-direction: column;\n    }\n\n    .matrix-insights {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .risk-matrix-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    writing-mode: initial;\n    rotate: 0deg;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n\n  .risk-matrix-body[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}", ".required[_ngcontent-%COMP%] {\n        color: #d32f2f;\n        margin-left: 2px;\n    }\n\n    .premium-input[_ngcontent-%COMP%] {\n        transition: all 0.3s ease;\n        background: #fff;\n    }\n\n    .premium-input[_ngcontent-%COMP%]:focus {\n        border-color: #004a99 !important;\n        box-shadow: 0 0 0 3px rgba(0, 74, 153, 0.1);\n        outline: none;\n    }\n\n    .premium-input[_ngcontent-%COMP%]:disabled {\n        background: #f1f1f1;\n        cursor: not-allowed;\n    }\n\n    .file-upload-box[_ngcontent-%COMP%]:hover {\n        border-color: #004a99 !important;\n        background: #f0f7ff;\n    }\n\n    .badge[_ngcontent-%COMP%] {\n        padding: 6px 10px;\n        border-radius: 20px;\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        display: inline-block;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    }\n\n    .level-Faible[_ngcontent-%COMP%] {\n        background: #e3f2fd;\n        color: #1976d2;\n        border: 1px solid #bbdefb;\n    }\n\n    .level-Moyen[_ngcontent-%COMP%] {\n        background: #fff8e1;\n        color: #fbc02d;\n        border: 1px solid #ffecb3;\n    }\n\n    .level-\u00C9lev\u00E9[_ngcontent-%COMP%] {\n        background: #fff3e0;\n        color: #fb8c00;\n        border: 1px solid #ffe0b2;\n    }\n\n    .level-Critique[_ngcontent-%COMP%] {\n        background: #ffebee;\n        color: #d32f2f;\n        border: 1px solid #ffcdd2;\n    }\n\n\n    .status-Ouvert[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #475569;\n        border: 1px solid #e2e8f0;\n    }\n\n    .status-En\\ cours[_ngcontent-%COMP%] {\n        background: #e3f2fd;\n        color: #1976d2;\n        border: 1px solid #bbdefb;\n    }\n\n    .status-Trait\u00E9[_ngcontent-%COMP%] {\n        background: #f3e5f5;\n        color: #7b1fa2;\n        border: 1px solid #e1bee7;\n    }\n\n    .status-Cl\u00F4tur\u00E9[_ngcontent-%COMP%] {\n        background: #eeeeee;\n        color: #616161;\n        border: 1px solid #e0e0e0;\n    }\n\n    .btn-sm[_ngcontent-%COMP%] {\n        padding: 8px 14px;\n        font-size: 0.75rem;\n        border-radius: 6px;\n        transition: all 0.2s;\n    }\n\n    .btn-sm[_ngcontent-%COMP%]:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);\n    }\n\n    .risks-table-wrapper[_ngcontent-%COMP%] {\n        border-radius: 12px;\n        overflow: hidden;\n        border: 1px solid #eee;\n    }\n\n    .premium-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        background: #fcfcfc !important;\n    }\n\n    .premium-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n        background: #f9f9f9;\n    }\n\n    .modal-body-content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        display: block;\n        margin-bottom: 8px;\n        font-weight: 600;\n        color: #444;\n        font-size: 0.9rem;\n    }", ".role-dashboard[_ngcontent-%COMP%] {\n        padding: 30px;\n        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n        min-height: 100%;\n    }\n\n    .welcome-banner[_ngcontent-%COMP%] {\n        background: rgba(255, 255, 255, 0.7);\n        backdrop-filter: blur(10px);\n        border: 1px solid rgba(255, 255, 255, 0.3);\n        padding: 25px;\n        border-radius: 16px;\n        margin-bottom: 30px;\n        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.07);\n    }\n\n    .blue-banner[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #003366 0%, #004a99 100%) !important;\n        backdrop-filter: none;\n        border: none;\n        color: white;\n        box-shadow: 0 10px 30px rgba(0, 74, 153, 0.2) !important;\n    }\n\n    .blue-banner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .blue-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        color: white !important;\n    }\n\n    .module-card.premium[_ngcontent-%COMP%] {\n        background: rgba(255, 255, 255, 0.85);\n        backdrop-filter: blur(8px);\n        border: 1px solid rgba(255, 255, 255, 0.4);\n        border-radius: 20px;\n        padding: 25px;\n        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n    }\n\n    .module-card.premium[_ngcontent-%COMP%]:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.06);\n    }\n\n    .risks-table-wrapper[_ngcontent-%COMP%] {\n        background: white;\n        border-radius: 16px;\n        padding: 10px;\n        margin-top: 20px;\n    }\n\n    .premium-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        background: #f8fafc !important;\n    }\n\n    .premium-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        font-weight: 700;\n        color: #1e293b;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n        font-size: 0.75rem;\n    }\n\n    .badge[_ngcontent-%COMP%] {\n        padding: 8px 14px;\n        border-radius: 30px;\n        font-weight: 700;\n        transition: all 0.2s;\n    }\n\n    .btn-secondary.btn-sm[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #475569;\n        border: 1px solid #e2e8f0;\n    }\n\n    .btn-secondary.btn-sm[_ngcontent-%COMP%]:hover {\n        background: #e2e8f0;\n        color: #0f172a;\n    }\n\n    .modal-body-content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        font-size: 0.85rem;\n        color: #64748b;\n        margin-bottom: 6px;\n    }\n\n    .premium-input[_ngcontent-%COMP%] {\n        border: 1.5px solid #e2e8f0 !important;\n        font-size: 0.95rem;\n    }\n\n    \n    .required[_ngcontent-%COMP%] {\n        color: #d32f2f;\n        margin-left: 2px;\n    }\n\n    .level-Faible[_ngcontent-%COMP%] {\n        background: #dcfce7;\n        color: #166534;\n        border: 1px solid #bbf7d0;\n    }\n\n    .level-Moyen[_ngcontent-%COMP%] {\n        background: #fef9c3;\n        color: #854d0e;\n        border: 1px solid #fef08a;\n    }\n\n    .level-\u00C9lev\u00E9[_ngcontent-%COMP%] {\n        background: #ffedd5;\n        color: #9a3412;\n        border: 1px solid #fed7aa;\n    }\n\n    .level-Critique[_ngcontent-%COMP%] {\n        background: #fee2e2;\n        color: #991b1b;\n        border: 1px solid #fecaca;\n    }\n\n\n    .status-Ouvert[_ngcontent-%COMP%] {\n        background: #f8fafc;\n        color: #64748b;\n        border: 1px solid #f1f5f9;\n    }\n\n    .status-En-cours[_ngcontent-%COMP%] {\n        background: #e0f2fe;\n        color: #075985;\n        border: 1px solid #bae6fd;\n    }\n\n    .status-Trait\u00E9[_ngcontent-%COMP%] {\n        background: #f5f3ff;\n        color: #5b21b6;\n        border: 1px solid #ddd6fe;\n    }\n\n    .status-Cl\u00F4tur\u00E9[_ngcontent-%COMP%] {\n        background: #f8fafc;\n        color: #94a3b8;\n        border: 1px solid #f1f5f9;\n    }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskManagerDashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-risk-manager-dashboard',
                templateUrl: './risk-manager-dashboard.component.html',
                styleUrls: ['../../dashboard.component.scss']
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.HttpClient }, { type: i3.Router }, { type: i4.AuthService }, { type: i5.DashboardService }]; }, { filteredModules: [{
            type: Input
        }], title: [{
            type: Input
        }], openModule: [{
            type: Output
        }], openRiskManagement: [{
            type: Output
        }] }); })();
//# sourceMappingURL=risk-manager-dashboard.component.js.map