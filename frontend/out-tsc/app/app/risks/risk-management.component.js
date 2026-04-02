import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CANONICAL_MAITRISE_LEVELS, CANONICAL_PERIODIC_FREQUENCIES, CANONICAL_RISK_IMPACTS, CANONICAL_RISK_LEVELS, CANONICAL_RISK_PROBABILITIES, MAITRISE_LEVEL_LABELS, MaitriseLevel, PERIODIC_FREQUENCY_LABELS, PeriodicFrequency, RiskImpact, RiskLevel, RiskProbability, RiskService, RiskStatus, RISK_IMPACT_LABELS, RISK_LEVEL_LABELS, RISK_LEVEL_OPTIONS, RISK_PROBABILITY_LABELS, RISK_STATUS_LABELS, RISK_STATUS_OPTIONS, } from '../core/services/risk.service';
import { UserRole } from '../core/models/user-role.enum';
import { OrganigrammeService } from '../core/services/organigramme.service';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../core/services/risk.service";
import * as i2 from "../core/services/organigramme.service";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "../shared/modal/modal.component";
function RiskManagementComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function RiskManagementComponent_button_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.showAiModal = true; });
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵtext(2, " G\u00E9n\u00E9rer par IA ");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function RiskManagementComponent_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.evaluateRisksWithAi(); });
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " \u00C9valuer via IA ");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function RiskManagementComponent_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.openCreateModal(); });
    i0.ɵɵelement(1, "i", 47);
    i0.ɵɵtext(2, " Nouveau Risque ");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_option_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r18 = ctx.$implicit;
    i0.ɵɵproperty("value", opt_r18.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(opt_r18.label);
} }
function RiskManagementComponent_option_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", opt_r19.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(opt_r19.label);
} }
function RiskManagementComponent_tr_88_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", risk_r20.riskAgent.prenom, " ", risk_r20.riskAgent.nom, " ");
} }
function RiskManagementComponent_tr_88_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em", 66);
    i0.ɵɵtext(1, "Non assign\u00E9");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_tr_88_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r25 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r25.getFrequencyLabel(risk_r20.frequenceTraitement), " ");
} }
function RiskManagementComponent_tr_88_small_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 68);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Prochain : ", i0.ɵɵpipeBind2(2, 1, risk_r20.prochaineEcheance, "dd/MM/yyyy"), "");
} }
function RiskManagementComponent_tr_88_button_32_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 69);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_button_32_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r37); const risk_r20 = i0.ɵɵnextContext().$implicit; const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.onEditRisk(risk_r20); });
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_tr_88_button_33_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 71);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_button_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r40); const risk_r20 = i0.ɵɵnextContext().$implicit; const ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.openAssignModal(risk_r20); });
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r28 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r28.getAssignButtonTitle(risk_r20));
} }
function RiskManagementComponent_tr_88_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 73);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_button_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r44); const risk_r20 = i0.ɵɵnextContext().$implicit; const ctx_r42 = i0.ɵɵnextContext(); return ctx_r42.revertToInProgress(risk_r20.id); });
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_tr_88_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 75);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_button_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r47); const risk_r20 = i0.ɵɵnextContext().$implicit; const ctx_r45 = i0.ɵɵnextContext(); return ctx_r45.closeRisk(risk_r20.id); });
    i0.ɵɵelement(1, "i", 76);
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_tr_88_button_36_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 77);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_button_36_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r50); const risk_r20 = i0.ɵɵnextContext().$implicit; const ctx_r48 = i0.ɵɵnextContext(); return ctx_r48.deleteRisk(risk_r20.id); });
    i0.ɵɵelement(1, "i", 78);
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_tr_88_Template(rf, ctx) { if (rf & 1) {
    const _r52 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 50);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 51);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtemplate(18, RiskManagementComponent_tr_88_span_18_Template, 2, 2, "span", 52);
    i0.ɵɵtemplate(19, RiskManagementComponent_tr_88_ng_template_19_Template, 2, 0, "ng-template", null, 53, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td");
    i0.ɵɵtemplate(22, RiskManagementComponent_tr_88_span_22_Template, 2, 1, "span", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td");
    i0.ɵɵelementStart(24, "div", 55);
    i0.ɵɵelementStart(25, "span", 56);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, RiskManagementComponent_tr_88_small_28_Template, 3, 4, "small", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 58);
    i0.ɵɵelementStart(30, "button", 59);
    i0.ɵɵlistener("click", function RiskManagementComponent_tr_88_Template_button_click_30_listener() { const restoredCtx = i0.ɵɵrestoreView(_r52); const risk_r20 = restoredCtx.$implicit; const ctx_r51 = i0.ɵɵnextContext(); return ctx_r51.onViewDetails(risk_r20); });
    i0.ɵɵelement(31, "i", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, RiskManagementComponent_tr_88_button_32_Template, 2, 0, "button", 61);
    i0.ɵɵtemplate(33, RiskManagementComponent_tr_88_button_33_Template, 2, 1, "button", 62);
    i0.ɵɵtemplate(34, RiskManagementComponent_tr_88_button_34_Template, 2, 0, "button", 63);
    i0.ɵɵtemplate(35, RiskManagementComponent_tr_88_button_35_Template, 2, 0, "button", 64);
    i0.ɵɵtemplate(36, RiskManagementComponent_tr_88_button_36_Template, 2, 0, "button", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r20 = ctx.$implicit;
    const i_r21 = ctx.index;
    const _r23 = i0.ɵɵreference(20);
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r21 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r20.titre);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r20.domaine);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r5.getNiveauClass(risk_r20));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r5.getNiveauLabel(risk_r20));
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r5.getStatusClass(risk_r20));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r5.getStatusLabel(risk_r20));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r20.responsableTraitement == null ? null : risk_r20.responsableTraitement.nom);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", risk_r20.riskAgent)("ngIfElse", _r23);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r5.normalize(risk_r20.frequenceTraitement) !== ctx_r5.PeriodicFrequency.NONE);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(27, 20, risk_r20.dateEcheance, "dd/MM/yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", risk_r20.prochaineEcheance);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r5.isRiskManager);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isRiskManager && !ctx_r5.isCompletedRiskStatus(risk_r20.statutCode || risk_r20.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isRiskManager && ctx_r5.normalize(risk_r20.statutCode || risk_r20.statut) === ctx_r5.RiskStatus.TREATED);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isRiskManager && ctx_r5.normalize(risk_r20.statutCode || risk_r20.statut) === ctx_r5.RiskStatus.TREATED);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isRiskManager);
} }
function RiskManagementComponent_tr_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 79);
    i0.ɵɵelement(2, "i", 80);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun risque trouv\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_90_option_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dept_r65 = ctx.$implicit;
    i0.ɵɵproperty("value", dept_r65.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(dept_r65.nom);
} }
function RiskManagementComponent_app_modal_90_option_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r66 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r66.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r66.nom);
} }
function RiskManagementComponent_app_modal_90_option_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r67 = ctx.$implicit;
    const ctx_r56 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", p_r67);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r56.getProbabilityLabel(p_r67));
} }
function RiskManagementComponent_app_modal_90_option_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r68 = ctx.$implicit;
    const ctx_r57 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", i_r68);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r57.getImpactLabel(i_r68));
} }
const _c0 = function (a0) { return { niveauRisque: a0 }; };
function RiskManagementComponent_app_modal_90_span_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r58 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap("badge level-" + ctx_r58.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r58.getNiveauLabel(i0.ɵɵpureFunction1(3, _c0, ctx_r58.newRisk.cotationRisqueBrut)));
} }
function RiskManagementComponent_app_modal_90_span_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 113);
    i0.ɵɵtext(1, "Non \u00E9valu\u00E9");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_90_small_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 114);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r60 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(Score: ", ctx_r60.newRisk.niveauCotationRisqueBrut, "/512)");
} }
function RiskManagementComponent_app_modal_90_option_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r69 = ctx.$implicit;
    const ctx_r61 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", m_r69);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r61.getMaitriseLabel(m_r69));
} }
function RiskManagementComponent_app_modal_90_small_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 114);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r62 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(Score: ", ctx_r62.newRisk.niveauCotationRisqueNet, "/2048)");
} }
function RiskManagementComponent_app_modal_90_option_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const freq_r70 = ctx.$implicit;
    const ctx_r63 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", freq_r70);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r63.getFrequencyLabel(freq_r70));
} }
function RiskManagementComponent_app_modal_90_div_110_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Prochaine \u00E9ch\u00E9ance p\u00E9riodique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 104);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_div_110_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r71 = i0.ɵɵnextContext(2); return ctx_r71.newRisk.prochaineEcheance = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r64 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r64.newRisk.prochaineEcheance)("min", ctx_r64.today);
} }
function RiskManagementComponent_app_modal_90_Template(rf, ctx) { if (rf & 1) {
    const _r74 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 81);
    i0.ɵɵlistener("close", function RiskManagementComponent_app_modal_90_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r74); const ctx_r73 = i0.ɵɵnextContext(); return ctx_r73.showCreateModal = false; });
    i0.ɵɵelementStart(1, "div", 82, 83);
    i0.ɵɵelementStart(3, "div", 84);
    i0.ɵɵelementStart(4, "div", 85);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Titre du Risque ");
    i0.ɵɵelementStart(7, "span", 86);
    i0.ɵɵtext(8, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 87);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.newRisk.titre = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 85);
    i0.ɵɵelementStart(11, "label");
    i0.ɵɵtext(12, "Explication d\u00E9taill\u00E9e ");
    i0.ɵɵelementStart(13, "span", 86);
    i0.ɵɵtext(14, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "textarea", 88);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_textarea_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r76 = i0.ɵɵnextContext(); return ctx_r76.newRisk.explication = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 89);
    i0.ɵɵelementStart(17, "label");
    i0.ɵɵtext(18, "Domaine ");
    i0.ɵɵelementStart(19, "span", 86);
    i0.ɵɵtext(20, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 90);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r77 = i0.ɵɵnextContext(); return ctx_r77.newRisk.domaine = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 89);
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 91);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.newRisk.macroProcessus = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 85);
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 92);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r79 = i0.ɵɵnextContext(); return ctx_r79.newRisk.processus = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 89);
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, "D\u00E9partement ");
    i0.ɵɵelementStart(33, "span", 86);
    i0.ɵɵtext(34, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "select", 93);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_35_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r80 = i0.ɵɵnextContext(); return ctx_r80.newRisk.departementId = $event; })("change", function RiskManagementComponent_app_modal_90_Template_select_change_35_listener() { i0.ɵɵrestoreView(_r74); const ctx_r81 = i0.ɵɵnextContext(); return ctx_r81.onDepartmentChange(); });
    i0.ɵɵelementStart(36, "option", 30);
    i0.ɵɵtext(37, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, RiskManagementComponent_app_modal_90_option_38_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 89);
    i0.ɵɵelementStart(40, "label");
    i0.ɵɵtext(41, "Resp. D\u00E9partement ");
    i0.ɵɵelementStart(42, "span", 86);
    i0.ɵɵtext(43, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "select", 94);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r82 = i0.ɵɵnextContext(); return ctx_r82.newRisk.responsableTraitementId = $event; });
    i0.ɵɵelementStart(45, "option", 30);
    i0.ɵɵtext(46, "S\u00E9lectionner un responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(47, RiskManagementComponent_app_modal_90_option_47_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 95);
    i0.ɵɵelementStart(49, "h5", 96);
    i0.ɵɵtext(50, "Cotation du Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 89);
    i0.ɵɵelementStart(52, "label");
    i0.ɵɵtext(53, "Probabilit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "select", 93);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_54_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r83 = i0.ɵɵnextContext(); return ctx_r83.newRisk.probabilite = $event; })("change", function RiskManagementComponent_app_modal_90_Template_select_change_54_listener() { i0.ɵɵrestoreView(_r74); const ctx_r84 = i0.ɵɵnextContext(); return ctx_r84.calculateScores(); });
    i0.ɵɵelementStart(55, "option", 97);
    i0.ɵɵtext(56, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(57, RiskManagementComponent_app_modal_90_option_57_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 89);
    i0.ɵɵelementStart(59, "label");
    i0.ɵɵtext(60, "Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "select", 93);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_61_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r85 = i0.ɵɵnextContext(); return ctx_r85.newRisk.impact = $event; })("change", function RiskManagementComponent_app_modal_90_Template_select_change_61_listener() { i0.ɵɵrestoreView(_r74); const ctx_r86 = i0.ɵɵnextContext(); return ctx_r86.calculateScores(); });
    i0.ɵɵelementStart(62, "option", 97);
    i0.ɵɵtext(63, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(64, RiskManagementComponent_app_modal_90_option_64_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 85);
    i0.ɵɵelementStart(66, "label");
    i0.ɵɵtext(67, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 98);
    i0.ɵɵtemplate(69, RiskManagementComponent_app_modal_90_span_69_Template, 2, 5, "span", 99);
    i0.ɵɵtemplate(70, RiskManagementComponent_app_modal_90_span_70_Template, 2, 0, "span", 100);
    i0.ɵɵtemplate(71, RiskManagementComponent_app_modal_90_small_71_Template, 2, 1, "small", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 85);
    i0.ɵɵelementStart(73, "label");
    i0.ɵɵtext(74, "DMR Existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "textarea", 102);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_textarea_ngModelChange_75_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r87 = i0.ɵɵnextContext(); return ctx_r87.newRisk.dmrExistant = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "div", 89);
    i0.ɵɵelementStart(77, "label");
    i0.ɵɵtext(78, "Niveau de ma\u00EEtrise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "select", 93);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_79_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r88 = i0.ɵɵnextContext(); return ctx_r88.newRisk.niveauMaitrise = $event; })("change", function RiskManagementComponent_app_modal_90_Template_select_change_79_listener() { i0.ɵɵrestoreView(_r74); const ctx_r89 = i0.ɵɵnextContext(); return ctx_r89.calculateScores(); });
    i0.ɵɵelementStart(80, "option", 97);
    i0.ɵɵtext(81, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(82, RiskManagementComponent_app_modal_90_option_82_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "div", 89);
    i0.ɵɵelementStart(84, "label");
    i0.ɵɵtext(85, "Risque Net ");
    i0.ɵɵelementStart(86, "span", 86);
    i0.ɵɵtext(87, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 98);
    i0.ɵɵelementStart(89, "span");
    i0.ɵɵtext(90);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(91, RiskManagementComponent_app_modal_90_small_91_Template, 2, 1, "small", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 85);
    i0.ɵɵelementStart(93, "label");
    i0.ɵɵtext(94, "Plan d'action de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "textarea", 103);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_textarea_ngModelChange_95_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r90 = i0.ɵɵnextContext(); return ctx_r90.newRisk.planActionTraitement = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(96, "div", 95);
    i0.ɵɵelementStart(97, "h5", 96);
    i0.ɵɵtext(98, "Planification et Suivi");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(99, "div", 89);
    i0.ɵɵelementStart(100, "label");
    i0.ɵɵtext(101, "Date d'\u00E9ch\u00E9ance ");
    i0.ɵɵelementStart(102, "span", 86);
    i0.ɵɵtext(103, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "input", 104);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_input_ngModelChange_104_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r91 = i0.ɵɵnextContext(); return ctx_r91.newRisk.dateEcheance = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "div", 89);
    i0.ɵɵelementStart(106, "label");
    i0.ɵɵtext(107, "Fr\u00E9quence de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(108, "select", 94);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_90_Template_select_ngModelChange_108_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r92 = i0.ɵɵnextContext(); return ctx_r92.newRisk.frequenceTraitement = $event; });
    i0.ɵɵtemplate(109, RiskManagementComponent_app_modal_90_option_109_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(110, RiskManagementComponent_app_modal_90_div_110_Template, 4, 2, "div", 105);
    i0.ɵɵelementStart(111, "div", 85);
    i0.ɵɵelementStart(112, "label");
    i0.ɵɵtext(113, "Pi\u00E8ce justificative (PDF/Image)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(114, "div", 106);
    i0.ɵɵelementStart(115, "input", 107);
    i0.ɵɵlistener("change", function RiskManagementComponent_app_modal_90_Template_input_change_115_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r93 = i0.ɵɵnextContext(); return ctx_r93.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(116, "i", 108);
    i0.ɵɵelementStart(117, "span");
    i0.ɵɵtext(118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(119, "div", 109);
    i0.ɵɵelementStart(120, "button", 110);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_90_Template_button_click_120_listener() { i0.ɵɵrestoreView(_r74); const ctx_r94 = i0.ɵɵnextContext(); return ctx_r94.showCreateModal = false; });
    i0.ɵɵtext(121, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(122, "button", 111);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_90_Template_button_click_122_listener() { i0.ɵɵrestoreView(_r74); const ctx_r95 = i0.ɵɵnextContext(); return ctx_r95.saveRisk(); });
    i0.ɵɵelement(123, "i", 112);
    i0.ɵɵtext(124);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r7.isEditing ? "Modifier le risque" : "Cr\u00E9er un nouveau risque");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.titre);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.explication);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.domaine);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.macroProcessus);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.processus);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.departementId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r7.departments);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.responsableTraitementId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r7.organigrammeItems);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.probabilite);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r7.riskProbabilities);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.impact);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r7.riskImpacts);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r7.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.newRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.newRisk.niveauCotationRisqueBrut);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.dmrExistant);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.niveauMaitrise);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r7.maitriseLevels);
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("badge level-" + (ctx_r7.newRisk.cotationRisqueNet || ctx_r7.newRisk.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.getNiveauLabel(i0.ɵɵpureFunction1(38, _c0, ctx_r7.newRisk.cotationRisqueNet || ctx_r7.newRisk.niveauRisque)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.newRisk.niveauCotationRisqueNet);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.planActionTraitement);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.dateEcheance)("min", ctx_r7.today);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r7.newRisk.frequenceTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r7.periodicFrequencies);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.normalize(ctx_r7.newRisk.frequenceTraitement) !== ctx_r7.PeriodicFrequency.NONE);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("has-file", ctx_r7.selectedFile);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r7.selectedFile ? ctx_r7.selectedFile.name : "Cliquez ou glissez un fichier ici");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r7.isFormValid());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.isEditing ? "Enregistrer" : "Cr\u00E9er le risque", " ");
} }
function RiskManagementComponent_app_modal_91_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 121);
    i0.ɵɵtext(1, " Affectation actuelle : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r97 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r97.selectedRisk == null ? null : ctx_r97.selectedRisk.riskAgent == null ? null : ctx_r97.selectedRisk.riskAgent.prenom, " ", ctx_r97.selectedRisk == null ? null : ctx_r97.selectedRisk.riskAgent == null ? null : ctx_r97.selectedRisk.riskAgent.nom, "");
} }
function RiskManagementComponent_app_modal_91_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r102 = ctx.$implicit;
    const ctx_r98 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", u_r102.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r98.getAgentDisplayLabel(u_r102));
} }
function RiskManagementComponent_app_modal_91_p_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 122);
    i0.ɵɵtext(1, " Agents propos\u00E9s en priorit\u00E9 pour le d\u00E9partement : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r99 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r99.selectedRisk == null ? null : ctx_r99.selectedRisk.departement == null ? null : ctx_r99.selectedRisk.departement.nom);
} }
function RiskManagementComponent_app_modal_91_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 123);
    i0.ɵɵtext(1, " Aucun agent de traitement disponible pour cette affectation. ");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_91_i_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 124);
} }
function RiskManagementComponent_app_modal_91_Template(rf, ctx) { if (rf & 1) {
    const _r104 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 81);
    i0.ɵɵlistener("close", function RiskManagementComponent_app_modal_91_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r104); const ctx_r103 = i0.ɵɵnextContext(); return ctx_r103.showAssignModal = false; });
    i0.ɵɵelementStart(1, "div", 82, 83);
    i0.ɵɵelementStart(3, "p", 115);
    i0.ɵɵtext(4, " Choisissez un ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "Agent de traitement du risque");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " pour le risque : ");
    i0.ɵɵelement(8, "br");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, RiskManagementComponent_app_modal_91_p_11_Template, 4, 2, "p", 116);
    i0.ɵɵelementStart(12, "div", 89);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Agent de traitement du risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 94);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_91_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r104); const ctx_r105 = i0.ɵɵnextContext(); return ctx_r105.selectedAgentId = $event; });
    i0.ɵɵelementStart(16, "option", 30);
    i0.ɵɵtext(17, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, RiskManagementComponent_app_modal_91_option_18_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, RiskManagementComponent_app_modal_91_p_19_Template, 4, 1, "p", 117);
    i0.ɵɵtemplate(20, RiskManagementComponent_app_modal_91_p_20_Template, 2, 0, "p", 118);
    i0.ɵɵelementStart(21, "div", 109);
    i0.ɵɵelementStart(22, "button", 119);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_91_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r104); const ctx_r106 = i0.ɵɵnextContext(); return ctx_r106.showAssignModal = false; });
    i0.ɵɵtext(23, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 111);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_91_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r104); const ctx_r107 = i0.ɵɵnextContext(); return ctx_r107.assignRisk(); });
    i0.ɵɵtemplate(25, RiskManagementComponent_app_modal_91_i_25_Template, 1, 0, "i", 120);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r8.getAssignRiskModalTitle());
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r8.selectedRisk == null ? null : ctx_r8.selectedRisk.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedRisk == null ? null : ctx_r8.selectedRisk.riskAgent);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r8.selectedAgentId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r8.filteredAgents);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.selectedRisk == null ? null : ctx_r8.selectedRisk.departement == null ? null : ctx_r8.selectedRisk.departement.nom);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.hasAssignableAgents());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r8.isAssigning);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r8.selectedAgentId || ctx_r8.isAssigning || !ctx_r8.hasAssignableAgents());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.isAssigning);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.isAssigning ? "Assignation..." : ctx_r8.getAssignRiskActionLabel(), " ");
} }
function RiskManagementComponent_app_modal_92_div_1_small_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 153);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r110 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r110.selectedRisk.niveauCotationRisqueBrut, ")");
} }
function RiskManagementComponent_app_modal_92_div_1_small_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 153);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r111 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r111.selectedRisk.niveauCotationRisqueNet, ")");
} }
function RiskManagementComponent_app_modal_92_div_1_span_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r112 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r112.getFrequencyLabel(ctx_r112.selectedRisk.frequenceTraitement));
} }
function RiskManagementComponent_app_modal_92_div_1_span_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Aucun");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_92_div_1_div_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 133);
    i0.ɵɵelementStart(1, "span", 130);
    i0.ɵɵtext(2, "Prochaine \u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 154);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r114 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r114.selectedRisk.prochaineEcheance, "dd/MM/yyyy"));
} }
function RiskManagementComponent_app_modal_92_div_1_div_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 133);
    i0.ɵɵelementStart(1, "span", 130);
    i0.ɵɵtext(2, "Justificatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 155);
    i0.ɵɵelement(4, "i", 156);
    i0.ɵɵtext(5, " Voir le document ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r115 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", ctx_r115.environment.serverUrl + "/" + ctx_r115.selectedRisk.pieceJustificative + ctx_r115.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function RiskManagementComponent_app_modal_92_div_1_div_105_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 163);
    i0.ɵɵelementStart(1, "a", 164);
    i0.ɵɵelement(2, "i", 165);
    i0.ɵɵtext(3, " Voir la preuve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r118 = i0.ɵɵnextContext().$implicit;
    const ctx_r119 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", ctx_r119.environment.serverUrl + "/" + comment_r118.pieceJointe + ctx_r119.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function RiskManagementComponent_app_modal_92_div_1_div_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 157);
    i0.ɵɵelementStart(1, "div", 158);
    i0.ɵɵelementStart(2, "span", 159);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 160);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 161);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, RiskManagementComponent_app_modal_92_div_1_div_105_div_9_Template, 4, 1, "div", 162);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r118 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", comment_r118.user == null ? null : comment_r118.user.prenom, " ", comment_r118.user == null ? null : comment_r118.user.nom, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, comment_r118.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", comment_r118.content, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r118.pieceJointe);
} }
function RiskManagementComponent_app_modal_92_div_1_div_106_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 166);
    i0.ɵɵtext(1, " Aucun commentaire pour le moment. ");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_92_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r122 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 127, 83);
    i0.ɵɵelementStart(2, "div", 128);
    i0.ɵɵelementStart(3, "div", 129);
    i0.ɵɵelementStart(4, "span", 130);
    i0.ɵɵtext(5, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 131);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 129);
    i0.ɵɵelementStart(9, "span", 130);
    i0.ɵɵtext(10, "Explication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 132);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 133);
    i0.ɵɵelementStart(14, "span", 130);
    i0.ɵɵtext(15, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 132);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 133);
    i0.ɵɵelementStart(19, "span", 130);
    i0.ɵɵtext(20, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 132);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 129);
    i0.ɵɵelementStart(24, "span", 130);
    i0.ɵɵtext(25, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 132);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 133);
    i0.ɵɵelementStart(29, "span", 130);
    i0.ɵɵtext(30, "Probabilit\u00E9 / Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "p", 132);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 133);
    i0.ɵɵelementStart(34, "span", 130);
    i0.ɵɵtext(35, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, RiskManagementComponent_app_modal_92_div_1_small_38_Template, 2, 1, "small", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 129);
    i0.ɵɵelementStart(40, "span", 130);
    i0.ɵɵtext(41, "DMR Existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "p", 132);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 133);
    i0.ɵɵelementStart(45, "span", 130);
    i0.ɵɵtext(46, "Ma\u00EEtrise (DMR)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "p", 132);
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 133);
    i0.ɵɵelementStart(50, "span", 130);
    i0.ɵɵtext(51, "Risque Net");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "span");
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(54, RiskManagementComponent_app_modal_92_div_1_small_54_Template, 2, 1, "small", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 129);
    i0.ɵɵelementStart(56, "span", 130);
    i0.ɵɵtext(57, "Plan d'action de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "p", 132);
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div", 133);
    i0.ɵɵelementStart(61, "span", 130);
    i0.ɵɵtext(62, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span");
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 133);
    i0.ɵɵelementStart(66, "span", 130);
    i0.ɵɵtext(67, "D\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "p", 132);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 133);
    i0.ɵɵelementStart(71, "span", 130);
    i0.ɵɵtext(72, "Responsable du d\u00E9partement \u00E0 risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "p", 132);
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "div", 133);
    i0.ɵɵelementStart(76, "span", 130);
    i0.ɵɵtext(77, "Agent de traitement du risque assign\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "p", 132);
    i0.ɵɵtext(79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "div", 133);
    i0.ɵɵelementStart(81, "span", 130);
    i0.ɵɵtext(82, "Date d'\u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "p", 132);
    i0.ɵɵtext(84);
    i0.ɵɵpipe(85, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "div", 133);
    i0.ɵɵelementStart(87, "span", 130);
    i0.ɵɵtext(88, "Fr\u00E9quence de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "p", 132);
    i0.ɵɵtemplate(90, RiskManagementComponent_app_modal_92_div_1_span_90_Template, 2, 1, "span", 54);
    i0.ɵɵtemplate(91, RiskManagementComponent_app_modal_92_div_1_span_91_Template, 2, 0, "span", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(92, RiskManagementComponent_app_modal_92_div_1_div_92_Template, 6, 4, "div", 135);
    i0.ɵɵelementStart(93, "div", 133);
    i0.ɵɵelementStart(94, "span", 130);
    i0.ɵɵtext(95, "Date de cr\u00E9ation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(96, "p", 132);
    i0.ɵɵtext(97);
    i0.ɵɵpipe(98, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(99, RiskManagementComponent_app_modal_92_div_1_div_99_Template, 6, 1, "div", 135);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "div", 136);
    i0.ɵɵelementStart(101, "h4", 137);
    i0.ɵɵelement(102, "i", 138);
    i0.ɵɵtext(103, " Historique du traitement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "div", 139);
    i0.ɵɵtemplate(105, RiskManagementComponent_app_modal_92_div_1_div_105_Template, 10, 8, "div", 140);
    i0.ɵɵtemplate(106, RiskManagementComponent_app_modal_92_div_1_div_106_Template, 2, 0, "div", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(107, "div", 142);
    i0.ɵɵelementStart(108, "h5", 143);
    i0.ɵɵtext(109, "Ajouter un commentaire / Preuve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "div", 144);
    i0.ɵɵelementStart(111, "textarea", 145);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_92_div_1_Template_textarea_ngModelChange_111_listener($event) { i0.ɵɵrestoreView(_r122); const ctx_r121 = i0.ɵɵnextContext(2); return ctx_r121.treatmentContent = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "div", 146);
    i0.ɵɵelementStart(113, "div", 147);
    i0.ɵɵelementStart(114, "input", 148);
    i0.ɵɵlistener("change", function RiskManagementComponent_app_modal_92_div_1_Template_input_change_114_listener($event) { i0.ɵɵrestoreView(_r122); const ctx_r123 = i0.ɵɵnextContext(2); return ctx_r123.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(115, "div", 149);
    i0.ɵɵelement(116, "i", 150);
    i0.ɵɵtext(117);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(118, "button", 151);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_92_div_1_Template_button_click_118_listener() { i0.ɵɵrestoreView(_r122); const ctx_r124 = i0.ɵɵnextContext(2); return ctx_r124.addComment(); });
    i0.ɵɵtext(119, " Envoyer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(120, "div", 109);
    i0.ɵɵelementStart(121, "button", 152);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_92_div_1_Template_button_click_121_listener() { i0.ɵɵrestoreView(_r122); const ctx_r125 = i0.ɵɵnextContext(2); return ctx_r125.showDetailsModal = false; });
    i0.ɵɵtext(122, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r108 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.explication);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.domaine);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.macroProcessus || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.processus || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r108.getProbabilityLabel(ctx_r108.selectedRisk.probabilite) || "-", " / ", ctx_r108.getImpactLabel(ctx_r108.selectedRisk.impact) || "-", "");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge level-" + ctx_r108.selectedRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.cotationRisqueBrut ? ctx_r108.getNiveauLabel(i0.ɵɵpureFunction1(41, _c0, ctx_r108.selectedRisk.cotationRisqueBrut)) : "-");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r108.selectedRisk.niveauCotationRisqueBrut);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.dmrExistant || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.getMaitriseLabel(ctx_r108.selectedRisk.niveauMaitrise) || "-");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge level-" + (ctx_r108.selectedRisk.cotationRisqueNet || ctx_r108.selectedRisk.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.getNiveauLabel(i0.ɵɵpureFunction1(43, _c0, ctx_r108.selectedRisk.cotationRisqueNet || ctx_r108.selectedRisk.niveauRisque)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r108.selectedRisk.niveauCotationRisqueNet);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.planActionTraitement || "-");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(ctx_r108.getStatusClass(ctx_r108.selectedRisk));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.getStatusLabel(ctx_r108.selectedRisk));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.departement == null ? null : ctx_r108.selectedRisk.departement.nom);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.responsableTraitement == null ? null : ctx_r108.selectedRisk.responsableTraitement.nom);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r108.selectedRisk.riskAgent ? ctx_r108.selectedRisk.riskAgent.prenom + " " + ctx_r108.selectedRisk.riskAgent.nom : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(85, 35, ctx_r108.selectedRisk.dateEcheance, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r108.normalize(ctx_r108.selectedRisk.frequenceTraitement) !== ctx_r108.PeriodicFrequency.NONE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r108.normalize(ctx_r108.selectedRisk.frequenceTraitement) === ctx_r108.PeriodicFrequency.NONE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r108.normalize(ctx_r108.selectedRisk.frequenceTraitement) !== ctx_r108.PeriodicFrequency.NONE);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(98, 38, ctx_r108.selectedRisk.createdAt, "dd/MM/yyyy \u00E0 HH:mm"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r108.selectedRisk.pieceJustificative);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r108.comments);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r108.comments.length === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r108.treatmentContent);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r108.selectedFile ? ctx_r108.selectedFile.name : "Joindre un fichier", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r108.treatmentContent);
} }
function RiskManagementComponent_app_modal_92_Template(rf, ctx) { if (rf & 1) {
    const _r127 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 125);
    i0.ɵɵlistener("close", function RiskManagementComponent_app_modal_92_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r127); const ctx_r126 = i0.ɵɵnextContext(); return ctx_r126.showDetailsModal = false; });
    i0.ɵɵtemplate(1, RiskManagementComponent_app_modal_92_div_1_Template, 123, 45, "div", 126);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.selectedRisk);
} }
function RiskManagementComponent_app_modal_93_div_3_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r134 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "D\u00E9crivez une situation ou un contexte ");
    i0.ɵɵelementStart(3, "span", 86);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "textarea", 180);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_93_div_3_div_8_Template_textarea_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r134); const ctx_r133 = i0.ɵɵnextContext(3); return ctx_r133.situationText = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r131 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r131.situationText);
} }
function RiskManagementComponent_app_modal_93_div_3_div_9_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "PDF, DOCX ou Image (Max 5Mo)");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_93_div_3_div_9_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 186);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r136 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", ctx_r136.aiFile.name, " (", (ctx_r136.aiFile.size / 1024 / 1024).toFixed(2), " Mo)");
} }
function RiskManagementComponent_app_modal_93_div_3_div_9_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 187);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r137 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r137.aiFileError);
} }
function RiskManagementComponent_app_modal_93_div_3_div_9_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 188);
    i0.ɵɵtext(1, "L'IA analysera le contenu du fichier pour en extraire les risques.");
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_93_div_3_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r140 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 181);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "T\u00E9l\u00E9chargez un document pour analyse ");
    i0.ɵɵelementStart(3, "span", 86);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 106);
    i0.ɵɵelementStart(6, "input", 182);
    i0.ɵɵlistener("change", function RiskManagementComponent_app_modal_93_div_3_div_9_Template_input_change_6_listener($event) { i0.ɵɵrestoreView(_r140); const ctx_r139 = i0.ɵɵnextContext(3); return ctx_r139.onAiFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "i", 179);
    i0.ɵɵtemplate(8, RiskManagementComponent_app_modal_93_div_3_div_9_span_8_Template, 2, 0, "span", 37);
    i0.ɵɵtemplate(9, RiskManagementComponent_app_modal_93_div_3_div_9_span_9_Template, 2, 2, "span", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, RiskManagementComponent_app_modal_93_div_3_div_9_p_10_Template, 2, 1, "p", 184);
    i0.ɵɵtemplate(11, RiskManagementComponent_app_modal_93_div_3_div_9_p_11_Template, 2, 0, "p", 185);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r132 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("has-file", ctx_r132.aiFile)("error", ctx_r132.aiFileError);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-file-alt", !ctx_r132.aiFile)("fa-file-check", ctx_r132.aiFile);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r132.aiFile);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r132.aiFile);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r132.aiFileError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r132.aiFileError);
} }
function RiskManagementComponent_app_modal_93_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r142 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 171);
    i0.ɵɵelementStart(1, "div", 172);
    i0.ɵɵelementStart(2, "button", 173);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_3_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r142); const ctx_r141 = i0.ɵɵnextContext(2); return ctx_r141.aiMode = "text"; });
    i0.ɵɵelement(3, "i", 174);
    i0.ɵɵtext(4, " Texte ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 173);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r142); const ctx_r143 = i0.ɵɵnextContext(2); return ctx_r143.aiMode = "file"; });
    i0.ɵɵelement(6, "i", 175);
    i0.ɵɵtext(7, " Fichier (PDF, Word, OCR) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, RiskManagementComponent_app_modal_93_div_3_div_8_Template, 6, 1, "div", 37);
    i0.ɵɵtemplate(9, RiskManagementComponent_app_modal_93_div_3_div_9_Template, 12, 12, "div", 176);
    i0.ɵɵelementStart(10, "div", 177);
    i0.ɵɵelementStart(11, "button", 178);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r142); const ctx_r144 = i0.ɵɵnextContext(2); return ctx_r144.generateWithAi(); });
    i0.ɵɵelement(12, "i", 179);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r129 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r129.aiMode === "text");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r129.aiMode === "file");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r129.aiMode === "text");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r129.aiMode === "file");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", (ctx_r129.aiMode === "text" ? !ctx_r129.situationText : !ctx_r129.aiFile) || ctx_r129.isGenerating);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("fa-robot", !ctx_r129.isGenerating)("fa-spinner", ctx_r129.isGenerating)("fa-spin", ctx_r129.isGenerating);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r129.isGenerating ? "Analyse en cours..." : "G\u00E9n\u00E9rer les risques", " ");
} }
function RiskManagementComponent_app_modal_93_div_4_div_8_span_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 209);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r146 = i0.ɵɵnextContext().$implicit;
    const ctx_r147 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Ma\u00EEtrise: ", ctx_r147.getMaitriseLabel(risk_r146.niveauMaitrise), "");
} }
function RiskManagementComponent_app_modal_93_div_4_div_8_option_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r152 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r152.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r152.nom, " ");
} }
function RiskManagementComponent_app_modal_93_div_4_div_8_small_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 122);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r146 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Sugg\u00E9r\u00E9 : ", risk_r146.responsableSuggestion, "");
} }
function RiskManagementComponent_app_modal_93_div_4_div_8_option_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const freq_r154 = ctx.$implicit;
    const ctx_r150 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", freq_r154);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r150.getFrequencyLabel(freq_r154), " ");
} }
function RiskManagementComponent_app_modal_93_div_4_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 196);
    i0.ɵɵelementStart(1, "div", 197);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_4_div_8_Template_div_click_1_listener() { const risk_r146 = ctx.$implicit; return risk_r146.selected = !risk_r146.selected; });
    i0.ɵɵelement(2, "i", 179);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 198);
    i0.ɵɵelementStart(4, "div", 199);
    i0.ɵɵelementStart(5, "h5");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 200);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 201);
    i0.ɵɵelementStart(12, "div", 202);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 202);
    i0.ɵɵelementStart(18, "label");
    i0.ɵɵtext(19, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 203);
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24, "Probabilit\u00E9 & Impact (IA)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 202);
    i0.ɵɵelementStart(28, "label");
    i0.ɵɵtext(29, "D\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span", 204);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 203);
    i0.ɵɵelementStart(33, "label");
    i0.ɵɵtext(34, "DMR sugg\u00E9r\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 205);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(37, RiskManagementComponent_app_modal_93_div_4_div_8_span_37_Template, 2, 1, "span", 206);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 203);
    i0.ɵɵelementStart(39, "label");
    i0.ɵɵtext(40, "Plan d'action pr\u00E9vu (IA)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "p", 205);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 202);
    i0.ɵɵelementStart(44, "label");
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "input", 207);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_93_div_4_div_8_Template_input_ngModelChange_46_listener($event) { const risk_r146 = ctx.$implicit; return risk_r146.suggestedDate = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 203);
    i0.ɵɵelementStart(48, "label");
    i0.ɵɵtext(49, "Responsable du d\u00E9partement \u00E0 risque ");
    i0.ɵɵelementStart(50, "span", 86);
    i0.ɵɵtext(51, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "select", 208);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_93_div_4_div_8_Template_select_ngModelChange_52_listener($event) { const risk_r146 = ctx.$implicit; return risk_r146.manualResponsableId = $event; });
    i0.ɵɵelementStart(53, "option", 30);
    i0.ɵɵtext(54, "S\u00E9lectionner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(55, RiskManagementComponent_app_modal_93_div_4_div_8_option_55_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, RiskManagementComponent_app_modal_93_div_4_div_8_small_56_Template, 2, 1, "small", 117);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 202);
    i0.ɵɵelementStart(58, "label");
    i0.ɵɵtext(59, "Fr\u00E9quence sugg\u00E9r\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "select", 208);
    i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_app_modal_93_div_4_div_8_Template_select_ngModelChange_60_listener($event) { const risk_r146 = ctx.$implicit; return risk_r146.frequenceTraitement = $event; });
    i0.ɵɵtemplate(61, RiskManagementComponent_app_modal_93_div_4_div_8_option_61_Template, 2, 2, "option", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r146 = ctx.$implicit;
    const ctx_r145 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", risk_r146.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-check-circle", risk_r146.selected)("fa-circle", !risk_r146.selected);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(risk_r146.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r145.getNiveauClass(risk_r146));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r145.getNiveauLabel(risk_r146));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r146.explication);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(risk_r146.domaine);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(risk_r146.macroProcessus || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r145.getProbabilityLabel(risk_r146.probabilite) || "Non \u00E9valu\u00E9", " / ", ctx_r145.getImpactLabel(risk_r146.impact) || "Non \u00E9valu\u00E9", "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(risk_r146.departement);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(risk_r146.dmrExistant || "-");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", risk_r146.niveauMaitrise);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(risk_r146.planActionTraitement || "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u00C9ch\u00E9ance (", risk_r146.delaiSuggestion, " jrs)");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", risk_r146.suggestedDate);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", risk_r146.manualResponsableId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r145.organigrammeItems);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", risk_r146.responsableSuggestion);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", risk_r146.frequenceTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r145.periodicFrequencies);
} }
function RiskManagementComponent_app_modal_93_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r160 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 189);
    i0.ɵɵelementStart(1, "div", 190);
    i0.ɵɵelementStart(2, "h4");
    i0.ɵɵtext(3, "Risques sugg\u00E9r\u00E9s par l'IA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 191);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_4_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r160); const ctx_r159 = i0.ɵɵnextContext(2); ctx_r159.suggestedRisks = []; return ctx_r159.situationText = ""; });
    i0.ɵɵelement(5, "i", 192);
    i0.ɵɵtext(6, " Recommencer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 193);
    i0.ɵɵtemplate(8, RiskManagementComponent_app_modal_93_div_4_div_8_Template, 62, 26, "div", 194);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 109);
    i0.ɵɵelementStart(10, "button", 110);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_4_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r160); const ctx_r161 = i0.ɵɵnextContext(2); return ctx_r161.showAiModal = false; });
    i0.ɵɵtext(11, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 111);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_93_div_4_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r160); const ctx_r162 = i0.ɵɵnextContext(2); return ctx_r162.addSelectedRisks(); });
    i0.ɵɵelement(13, "i", 195);
    i0.ɵɵtext(14, " Ajouter les risques s\u00E9lectionn\u00E9s ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r130 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r130.suggestedRisks);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r130.isAiFormValid());
} }
function RiskManagementComponent_app_modal_93_Template(rf, ctx) { if (rf & 1) {
    const _r164 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 167);
    i0.ɵɵlistener("close", function RiskManagementComponent_app_modal_93_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r164); const ctx_r163 = i0.ɵɵnextContext(); return ctx_r163.showAiModal = false; });
    i0.ɵɵelementStart(1, "div", 168, 83);
    i0.ɵɵtemplate(3, RiskManagementComponent_app_modal_93_div_3_Template, 14, 14, "div", 169);
    i0.ɵɵtemplate(4, RiskManagementComponent_app_modal_93_div_4_Template, 15, 2, "div", 170);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r10.suggestedRisks.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.suggestedRisks.length > 0);
} }
function RiskManagementComponent_app_modal_94_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 124);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "L'IA analyse les risques...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function RiskManagementComponent_app_modal_94_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 216);
    i0.ɵɵelementStart(1, "div", 217);
    i0.ɵɵelementStart(2, "span", 218);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 219);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 220);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 221);
    i0.ɵɵelementStart(10, "div", 222);
    i0.ɵɵelement(11, "i", 223);
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13, "Impact :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 222);
    i0.ɵɵelement(16, "i", 45);
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18, "Tendance :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 224);
    i0.ɵɵelement(21, "i", 225);
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const res_r169 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("#", res_r169.riskId, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", res_r169.priorite, "/10");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", res_r169.impact, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", res_r169.tendance, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(res_r169.suggestion);
} }
function RiskManagementComponent_app_modal_94_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 214);
    i0.ɵɵtemplate(1, RiskManagementComponent_app_modal_94_div_4_div_1_Template, 24, 5, "div", 215);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r167 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r167.aiEvaluationResults);
} }
function RiskManagementComponent_app_modal_94_Template(rf, ctx) { if (rf & 1) {
    const _r171 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 210);
    i0.ɵɵlistener("close", function RiskManagementComponent_app_modal_94_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r171); const ctx_r170 = i0.ɵɵnextContext(); return ctx_r170.showEvaluationModal = false; });
    i0.ɵɵelementStart(1, "div", 82, 83);
    i0.ɵɵtemplate(3, RiskManagementComponent_app_modal_94_div_3_Template, 4, 0, "div", 211);
    i0.ɵɵtemplate(4, RiskManagementComponent_app_modal_94_div_4_Template, 2, 1, "div", 212);
    i0.ɵɵelementStart(5, "div", 109);
    i0.ɵɵelementStart(6, "button", 152);
    i0.ɵɵlistener("click", function RiskManagementComponent_app_modal_94_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r171); const ctx_r172 = i0.ɵɵnextContext(); return ctx_r172.showEvaluationModal = false; });
    i0.ɵɵtext(7, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r11.isEvaluating);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r11.isEvaluating);
} }
export class RiskManagementComponent {
    constructor(riskService, organigrammeService, http, router) {
        this.riskService = riskService;
        this.organigrammeService = organigrammeService;
        this.http = http;
        this.router = router;
        this.environment = environment;
        this.PeriodicFrequency = PeriodicFrequency;
        this.RiskLevel = RiskLevel;
        this.RiskStatus = RiskStatus;
        this.risks = [];
        this.departments = [];
        this.allUsers = [];
        this.organigrammeItems = [];
        this.riskAgents = [];
        this.filteredAgents = [];
        this.selectedAgentId = '';
        this.comments = [];
        this.treatmentContent = '';
        this.selectedFile = null;
        this.isAssigning = false;
        this.showCreateModal = false;
        this.showAssignModal = false;
        this.showDetailsModal = false;
        this.isEditing = false;
        this.selectedRisk = null;
        this.editRiskId = null;
        this.showExportMenu = false;
        this.showAiModal = false;
        this.situationText = '';
        this.isGenerating = false;
        this.suggestedRisks = [];
        this.aiMode = 'text';
        this.aiFile = null;
        this.aiFileError = '';
        this.showEvaluationModal = false;
        this.isEvaluating = false;
        this.aiEvaluationResults = [];
        this.newRisk = this.buildDefaultRisk();
        this.riskLevels = CANONICAL_RISK_LEVELS;
        this.riskStatuses = RISK_STATUS_OPTIONS.map((option) => option.code);
        this.periodicFrequencies = CANONICAL_PERIODIC_FREQUENCIES;
        this.riskProbabilities = CANONICAL_RISK_PROBABILITIES;
        this.riskImpacts = CANONICAL_RISK_IMPACTS;
        this.maitriseLevels = CANONICAL_MAITRISE_LEVELS;
        this.levelLabelMap = RISK_LEVEL_LABELS;
        this.statusLabelMap = RISK_STATUS_LABELS;
        this.levelOptions = RISK_LEVEL_OPTIONS;
        this.statusOptions = RISK_STATUS_OPTIONS;
        this.today = new Date().toISOString().split('T')[0];
        this.filterStatut = '';
        this.filterNiveau = '';
        this.searchText = '';
    }
    ngOnInit() {
        this.loadRisks();
        this.loadInitialData();
    }
    get currentUserRole() {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role || null;
    }
    get isSeniorAuditor() {
        return this.currentUserRole === UserRole.AUDIT_SENIOR || this.currentUserRole === UserRole.SUPER_ADMIN;
    }
    get isRiskManager() {
        return this.currentUserRole === UserRole.RISK_MANAGER || this.currentUserRole === UserRole.SUPER_ADMIN;
    }
    get authQueryToken() {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? `?token=${token}` : '';
    }
    get filteredRisks() {
        return this.risks.filter((risk) => {
            const search = this.normalize(this.searchText);
            const titre = this.normalize(risk.titre);
            const domaine = this.normalize(risk.domaine);
            const matchSearch = !search || titre.includes(search) || domaine.includes(search);
            const riskLevel = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
            const filterLevel = this.normalize(this.filterNiveau);
            const matchLevel = !filterLevel || riskLevel === filterLevel;
            const riskStatut = this.normalize(risk.statutCode || risk.statut);
            const filterStatut = this.normalize(this.filterStatut);
            const matchStatus = !filterStatut || riskStatut === filterStatut;
            return matchSearch && matchLevel && matchStatus;
        });
    }
    loadRisks() {
        this.riskService.getRisks().subscribe((risks) => {
            this.risks = risks;
        });
    }
    loadInitialData() {
        this.http.get(`${environment.apiUrl}/departments`).subscribe((data) => this.departments = data);
        this.organigrammeService.getAll().subscribe((data) => this.organigrammeItems = data);
        if (!this.isRiskManager) {
            return;
        }
        this.http.get(`${environment.apiUrl}/users/assignable/risk-agents`).subscribe((users) => {
            this.allUsers = users;
            this.riskAgents = [...users];
            this.updateFilteredAgents();
        });
    }
    buildDefaultRisk() {
        return {
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
            responsableTraitementId: '',
            frequenceTraitement: PeriodicFrequency.NONE,
            prochaineEcheance: ''
        };
    }
    onDepartmentChange() {
        this.newRisk.responsableTraitementId = '';
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
    openCreateModal() {
        if (!this.isRiskManager)
            return;
        this.isEditing = false;
        this.resetForm();
        this.showCreateModal = true;
    }
    calculateScores() {
        let probabilityScore = 0;
        switch (this.newRisk.probabilite) {
            case RiskProbability.RARE:
                probabilityScore = 1;
                break;
            case RiskProbability.POSSIBLE:
                probabilityScore = 2;
                break;
            case RiskProbability.PROBABLE:
                probabilityScore = 4;
                break;
            case RiskProbability.PERMANENT:
                probabilityScore = 8;
                break;
        }
        let impactScore = 0;
        switch (this.newRisk.impact) {
            case RiskImpact.LIMITED:
                impactScore = 1;
                break;
            case RiskImpact.MEDIUM:
                impactScore = 4;
                break;
            case RiskImpact.SIGNIFICANT:
                impactScore = 16;
                break;
            case RiskImpact.CRITICAL:
                impactScore = 64;
                break;
        }
        if (probabilityScore && impactScore) {
            const grossRisk = probabilityScore * impactScore;
            this.newRisk.niveauCotationRisqueBrut = grossRisk;
            if (grossRisk <= 8)
                this.newRisk.cotationRisqueBrut = RiskLevel.LOW;
            else if (grossRisk <= 32)
                this.newRisk.cotationRisqueBrut = RiskLevel.LIMITED;
            else if (grossRisk <= 128)
                this.newRisk.cotationRisqueBrut = RiskLevel.MEDIUM;
            else
                this.newRisk.cotationRisqueBrut = RiskLevel.HIGH;
        }
        else {
            this.newRisk.niveauCotationRisqueBrut = null;
            this.newRisk.cotationRisqueBrut = null;
        }
        let dmrScore = 0;
        switch (this.newRisk.niveauMaitrise) {
            case MaitriseLevel.FAIBLE:
                dmrScore = 4;
                break;
            case MaitriseLevel.LIMITED:
                dmrScore = 3;
                break;
            case MaitriseLevel.MEDIUM:
                dmrScore = 2;
                break;
            case MaitriseLevel.HIGH:
                dmrScore = 1;
                break;
        }
        if (this.newRisk.niveauCotationRisqueBrut && dmrScore) {
            const netRisk = this.newRisk.niveauCotationRisqueBrut * dmrScore;
            this.newRisk.niveauCotationRisqueNet = netRisk;
            if (netRisk <= 32)
                this.newRisk.cotationRisqueNet = RiskLevel.LOW;
            else if (netRisk <= 128)
                this.newRisk.cotationRisqueNet = RiskLevel.LIMITED;
            else if (netRisk <= 512)
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
    onEditRisk(risk) {
        if (!this.isRiskManager)
            return;
        this.isEditing = true;
        this.editRiskId = risk.id;
        this.newRisk = Object.assign(Object.assign({}, risk), { departementId: risk.departementId.toString(), dateEcheance: new Date(risk.dateEcheance).toISOString().split('T')[0], responsableTraitementId: risk.responsableTraitementId.toString(), frequenceTraitement: risk.frequenceTraitement || PeriodicFrequency.NONE, prochaineEcheance: risk.prochaineEcheance ? new Date(risk.prochaineEcheance).toISOString().split('T')[0] : '' });
        this.calculateScores();
        this.updateFilteredAgents();
        this.showCreateModal = true;
    }
    onViewDetails(risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
        this.loadComments(risk.id);
    }
    loadComments(riskId) {
        this.riskService.getComments(riskId).subscribe((comments) => this.comments = comments);
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    saveRisk() {
        if (!this.isRiskManager || !this.isFormValid())
            return;
        const formData = new FormData();
        Object.keys(this.newRisk).forEach((key) => {
            formData.append(key, this.newRisk[key]);
        });
        if (this.selectedFile) {
            formData.append('pieceJustificative', this.selectedFile);
        }
        if (this.isEditing && this.editRiskId) {
            this.riskService.updateRisk(this.editRiskId, formData).subscribe(() => this.finalizeSave());
            return;
        }
        this.riskService.createRisk(formData).subscribe(() => this.finalizeSave());
    }
    finalizeSave() {
        this.showCreateModal = false;
        this.loadRisks();
        this.resetForm();
    }
    openAssignModal(risk) {
        if (!this.isRiskManager)
            return;
        this.selectedRisk = risk;
        this.selectedAgentId = risk.riskAgentId ? risk.riskAgentId.toString() : '';
        this.filteredAgents = this.getAssignableAgentsForRisk(risk);
        this.showAssignModal = true;
    }
    assignRisk(agentId = this.selectedAgentId) {
        if (!this.isRiskManager || !this.selectedRisk || !agentId)
            return;
        this.isAssigning = true;
        this.riskService.assignRisk(this.selectedRisk.id, parseInt(agentId, 10)).subscribe({
            next: () => {
                this.isAssigning = false;
                this.showAssignModal = false;
                this.loadRisks();
                this.selectedAgentId = '';
                this.selectedRisk = null;
            },
            error: (error) => {
                this.isAssigning = false;
                console.error('Error assigning risk:', error);
                alert('Erreur lors de l\'assignation du risque. Veuillez réessayer.');
            }
        });
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
    closeRisk(riskId) {
        if (!this.isRiskManager)
            return;
        if (confirm('Êtes-vous sûr de vouloir clôturer ce risque ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.CLOSED).subscribe(() => this.loadRisks());
        }
    }
    evaluateRisksWithAi() {
        const riskIds = this.filteredRisks.map((risk) => risk.id);
        if (riskIds.length === 0)
            return;
        this.isEvaluating = true;
        this.showEvaluationModal = true;
        this.aiEvaluationResults = [];
        this.riskService.evaluateRisks(riskIds).subscribe({
            next: (results) => {
                this.aiEvaluationResults = results;
                this.isEvaluating = false;
            },
            error: (error) => {
                console.error(error);
                this.isEvaluating = false;
                alert('Erreur lors de l\'évaluation des risques.');
            }
        });
    }
    revertToInProgress(riskId) {
        if (!this.isRiskManager)
            return;
        if (confirm('Voulez-vous vraiment remettre ce risque en cours de traitement ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.IN_PROGRESS).subscribe(() => this.loadRisks());
        }
    }
    deleteRisk(riskId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce risque ? Cette action est irréversible.')) {
            this.riskService.deleteRisk(riskId).subscribe({
                next: () => this.loadRisks(),
                error: (error) => {
                    console.error('Error deleting risk:', error);
                    alert('Erreur lors de la suppression du risque.');
                }
            });
        }
    }
    onAiFileSelected(event) {
        var _a;
        const file = event.target.files[0];
        if (!file)
            return;
        this.aiFileError = '';
        const extension = (_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png'].includes(extension || '');
        if (isImage && file.size > 4 * 1024 * 1024) {
            this.aiFileError = 'Les images pour l\'OCR sont limitées à 4 Mo.';
            this.aiFile = null;
        }
        else if (file.size > 5 * 1024 * 1024) {
            this.aiFileError = 'Le fichier est trop volumineux (max 5 Mo).';
            this.aiFile = null;
        }
        else {
            this.aiFile = file;
        }
    }
    generateWithAi() {
        if (this.aiMode === 'text' && !this.situationText)
            return;
        if (this.aiMode === 'file' && !this.aiFile)
            return;
        this.isGenerating = true;
        this.suggestedRisks = [];
        const request$ = this.aiMode === 'text'
            ? this.riskService.generateRisks(this.situationText)
            : this.riskService.generateRisksFromFile(this.aiFile);
        request$.subscribe({
            next: (risks) => {
                this.suggestedRisks = risks
                    .filter((risk) => risk && risk.titre)
                    .map((risk) => {
                    const departmentName = risk.departement || '';
                    const department = departmentName
                        ? this.departments.find((item) => item.nom.toLowerCase().includes(departmentName.toLowerCase()))
                        : null;
                    const departmentId = department ? department.id : null;
                    let suggestedDate = '';
                    if (risk.delaiSuggestion) {
                        const date = new Date();
                        date.setDate(date.getDate() + risk.delaiSuggestion);
                        suggestedDate = date.toISOString().split('T')[0];
                    }
                    let matchedUserId = '';
                    const suggestedResponsible = (risk.responsableSuggestion || '').toLowerCase();
                    if (suggestedResponsible) {
                        const matchedUser = this.allUsers.find((user) => (departmentId ? user.departementId === departmentId : true) &&
                            ((user.prenom || '').toLowerCase().includes(suggestedResponsible) ||
                                (user.nom || '').toLowerCase().includes(suggestedResponsible) ||
                                (user.role || '').toLowerCase().includes(suggestedResponsible)));
                        if (matchedUser) {
                            matchedUserId = matchedUser.id.toString();
                        }
                    }
                    return Object.assign(Object.assign({}, risk), { selected: true, deptId: departmentId, suggestedDate, manualResponsableId: matchedUserId, probabilite: risk.probabilite || null, impact: risk.impact || null, niveauMaitrise: risk.niveauMaitrise || null });
                });
                this.isGenerating = false;
            },
            error: (error) => {
                var _a;
                console.error(error);
                this.isGenerating = false;
                const message = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.error) || 'Erreur lors de la génération des risques.';
                alert(message);
            }
        });
    }
    toggleAiRiskSelection(risk) {
        risk.selected = !risk.selected;
    }
    isAiFormValid() {
        const selectedRisks = this.suggestedRisks.filter((risk) => risk.selected);
        if (selectedRisks.length === 0)
            return false;
        return selectedRisks.every((risk) => !!risk.manualResponsableId && !!risk.deptId);
    }
    addSelectedRisks() {
        const selectedRisks = this.suggestedRisks.filter((risk) => risk.selected);
        if (selectedRisks.length === 0)
            return;
        let completed = 0;
        selectedRisks.forEach((risk) => {
            const formData = new FormData();
            formData.append('titre', risk.titre);
            formData.append('explication', risk.explication || '');
            formData.append('domaine', risk.domaine || '');
            if (risk.macroProcessus)
                formData.append('macroProcessus', risk.macroProcessus);
            if (risk.processus)
                formData.append('processus', risk.processus);
            if (risk.probabilite)
                formData.append('probabilite', risk.probabilite);
            if (risk.impact)
                formData.append('impact', risk.impact);
            if (risk.niveauMaitrise)
                formData.append('niveauMaitrise', risk.niveauMaitrise);
            if (risk.dmrExistant)
                formData.append('dmrExistant', risk.dmrExistant);
            if (risk.planActionTraitement)
                formData.append('planActionTraitement', risk.planActionTraitement);
            formData.append('niveauRisque', risk.niveauRisque || RiskLevel.MEDIUM);
            formData.append('departementId', risk.deptId.toString());
            formData.append('dateEcheance', risk.suggestedDate || this.today);
            formData.append('responsableTraitementId', risk.manualResponsableId);
            let frequency = risk.frequenceTraitement;
            if (!CANONICAL_PERIODIC_FREQUENCIES.includes(frequency)) {
                frequency = PeriodicFrequency.NONE;
            }
            formData.append('frequenceTraitement', frequency);
            this.riskService.createRisk(formData).subscribe(() => {
                completed += 1;
                if (completed === selectedRisks.length) {
                    this.showAiModal = false;
                    this.loadRisks();
                    this.situationText = '';
                    this.suggestedRisks = [];
                }
            });
        });
    }
    resetForm() {
        this.isEditing = false;
        this.editRiskId = null;
        this.newRisk = this.buildDefaultRisk();
        this.selectedFile = null;
        this.aiFile = null;
        this.aiFileError = '';
        this.aiMode = 'text';
        this.filteredAgents = [];
        this.selectedAgentId = '';
    }
    normalize(value) {
        if (value === null || value === undefined)
            return '';
        if (typeof value === 'object')
            return (value.code || value.id || '').toString().toLowerCase().trim();
        return value.toString().toLowerCase().trim();
    }
    getStatusCount(status) {
        const target = this.normalize(status);
        return this.filteredRisks.filter((risk) => this.normalize(risk.statutCode || risk.statut) === target).length;
    }
    getLevelCount(level) {
        const target = this.normalize(level);
        return this.filteredRisks.filter((risk) => this.normalize(risk.niveauRisqueCode || risk.niveauRisque) === target).length;
    }
    downloadReport() {
        // Kept for template compatibility.
    }
    exportToXLSX() {
        this.showExportMenu = false;
        const rows = this.risks.map((risk) => {
            var _a, _b;
            return ({
                'Titre': risk.titre,
                'Domaine': risk.domaine,
                'Niveau': this.getNiveauLabel(risk),
                'Statut': this.getStatusLabel(risk),
                'Responsable': `${((_a = risk.responsableTraitement) === null || _a === void 0 ? void 0 : _a.prenom) || ''} ${((_b = risk.responsableTraitement) === null || _b === void 0 ? void 0 : _b.nom) || ''}`.trim(),
                'Agent': risk.riskAgent ? `${risk.riskAgent.prenom} ${risk.riskAgent.nom}` : 'Non assigné',
                'Date Échéance': new Date(risk.dateEcheance).toLocaleDateString('fr-FR'),
                'Date Création': new Date(risk.createdAt).toLocaleDateString('fr-FR')
            });
        });
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Risques');
        XLSX.writeFile(workbook, `rapport-risques-${new Date().toISOString().split('T')[0]}.xlsx`);
    }
    exportToPDF() {
        this.showExportMenu = false;
        const document = new jsPDF('l', 'mm', 'a4');
        document.setFontSize(18);
        document.text('Rapport des risques', 14, 22);
        document.setFontSize(11);
        document.setTextColor(100);
        document.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
        const head = [['Titre', 'Domaine', 'Niveau', 'Statut', 'Responsable', 'Agent', 'Échéance']];
        const rows = this.risks.map((risk) => {
            var _a, _b;
            return [
                risk.titre,
                risk.domaine,
                this.getNiveauLabel(risk),
                this.getStatusLabel(risk),
                `${((_a = risk.responsableTraitement) === null || _a === void 0 ? void 0 : _a.prenom) || ''} ${((_b = risk.responsableTraitement) === null || _b === void 0 ? void 0 : _b.nom) || ''}`.trim(),
                risk.riskAgent ? `${risk.riskAgent.prenom} ${risk.riskAgent.nom}` : 'Non assigné',
                new Date(risk.dateEcheance).toLocaleDateString('fr-FR')
            ];
        });
        autoTable(document, {
            startY: 35,
            head,
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });
        document.save(`rapport-risques-${new Date().toISOString().split('T')[0]}.pdf`);
    }
    getStatusClass(risk) {
        if (!risk)
            return 'badge';
        const status = this.normalize(risk.statutCode || risk.statut);
        return `badge status-${status}`;
    }
    getNiveauClass(risk) {
        if (!risk)
            return 'badge';
        const level = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
        return `badge level-${level}`;
    }
    getNiveauLabel(risk) {
        if (!risk)
            return '';
        const level = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
        return this.levelLabelMap[level] || risk.niveauRisqueLabel || (typeof risk.niveauRisque === 'string' ? risk.niveauRisque : '');
    }
    getStatusLabel(risk) {
        if (!risk)
            return '';
        const status = this.normalize(risk.statutCode || risk.statut);
        return this.statusLabelMap[status] || risk.statutLabel || (typeof risk.statut === 'string' ? risk.statut : '');
    }
    getProbabilityLabel(value) {
        const normalized = this.normalize(value);
        return RISK_PROBABILITY_LABELS[normalized] || value || '';
    }
    getImpactLabel(value) {
        const normalized = this.normalize(value);
        return RISK_IMPACT_LABELS[normalized] || value || '';
    }
    getMaitriseLabel(value) {
        const normalized = this.normalize(value);
        return MAITRISE_LEVEL_LABELS[normalized] || value || '';
    }
    getFrequencyLabel(value) {
        const normalized = this.normalize(value);
        return PERIODIC_FREQUENCY_LABELS[normalized] || value || '';
    }
    getAssignRiskModalTitle() {
        var _a;
        return ((_a = this.selectedRisk) === null || _a === void 0 ? void 0 : _a.riskAgentId) ? 'Réassigner le risque' : 'Assigner le risque';
    }
    getAssignRiskActionLabel() {
        var _a;
        return ((_a = this.selectedRisk) === null || _a === void 0 ? void 0 : _a.riskAgentId) ? 'Réassigner' : 'Assigner';
    }
    getAssignButtonTitle(risk) {
        return risk.riskAgentId ? 'Réassigner' : 'Assigner';
    }
    getAssignableAgentsForRisk(risk) {
        if (!risk) {
            return [...this.riskAgents];
        }
        const departmentId = Number(risk.departementId);
        const departmentAgents = this.riskAgents.filter((user) => Number(user.departementId) === departmentId);
        return departmentAgents.length > 0 ? departmentAgents : [...this.riskAgents];
    }
    hasAssignableAgents() {
        return this.filteredAgents.length > 0;
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }
    getAgentDisplayLabel(user) {
        var _a;
        if (!user)
            return '';
        const fullName = `${user.prenom || ''} ${user.nom || ''}`.trim();
        const department = ((_a = user.departement) === null || _a === void 0 ? void 0 : _a.nom) || user.departementNom || '';
        return department ? `${fullName} - ${department}` : fullName;
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
RiskManagementComponent.ɵfac = function RiskManagementComponent_Factory(t) { return new (t || RiskManagementComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.OrganigrammeService), i0.ɵɵdirectiveInject(i3.HttpClient), i0.ɵɵdirectiveInject(i4.Router)); };
RiskManagementComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskManagementComponent, selectors: [["app-risk-management"]], decls: 95, vars: 21, consts: [[1, "risk-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-exclamation-triangle"], [1, "header-actions"], ["class", "btn-ai", "title", "G\u00E9n\u00E9rer par IA", 3, "click", 4, "ngIf"], ["class", "btn-ai-eval", "title", "\u00C9valuer les risques", 3, "click", 4, "ngIf"], [1, "export-dropdown"], ["title", "T\u00E9l\u00E9charger le rapport", 1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], ["class", "btn-create", 3, "click", 4, "ngIf"], [1, "kpi-row"], [1, "kpi-card", "kpi-total"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-closed"], [1, "kpi-card", "kpi-progress"], [1, "kpi-card", "kpi-critical"], [1, "filters-bar"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher par titre ou domaine...", 3, "ngModel", "ngModelChange"], [1, "filter-select", 3, "ngModel", "ngModelChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn-clear", 3, "click"], [1, "fas", "fa-times"], [1, "risks-card"], [1, "risks-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "title", "close", 4, "ngIf"], ["title", "D\u00E9tails du risque", 3, "close", 4, "ngIf"], ["title", "G\u00E9n\u00E9ration de risques par IA", 3, "close", 4, "ngIf"], ["title", "\u00C9valuation strat\u00E9gique par IA", 3, "close", 4, "ngIf"], ["title", "G\u00E9n\u00E9rer par IA", 1, "btn-ai", 3, "click"], [1, "fas", "fa-robot"], ["title", "\u00C9valuer les risques", 1, "btn-ai-eval", 3, "click"], [1, "fas", "fa-chart-line"], [1, "btn-create", 3, "click"], [1, "fas", "fa-plus"], [3, "value"], [1, "td-id"], [1, "td-title"], [1, "domain-tag"], [4, "ngIf", "ngIfElse"], ["noAgent", ""], ["class", "freq-tag", 4, "ngIf"], [1, "deadline-box"], [1, "main-date"], ["class", "next-date", 4, "ngIf"], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-edit", "title", "Modifier", 3, "click", 4, "ngIf"], ["class", "action-btn btn-assign", 3, "title", "click", 4, "ngIf"], ["class", "action-btn btn-revert", "title", "Remettre en cours", 3, "click", 4, "ngIf"], ["class", "action-btn btn-close", "title", "Cl\u00F4turer", 3, "click", 4, "ngIf"], ["class", "action-btn btn-delete", "title", "Supprimer", 3, "click", 4, "ngIf"], [1, "text-muted"], [1, "freq-tag"], [1, "next-date"], ["title", "Modifier", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], [1, "action-btn", "btn-assign", 3, "title", "click"], [1, "fas", "fa-user-plus"], ["title", "Remettre en cours", 1, "action-btn", "btn-revert", 3, "click"], [1, "fas", "fa-undo"], ["title", "Cl\u00F4turer", 1, "action-btn", "btn-close", 3, "click"], [1, "fas", "fa-check-double"], ["title", "Supprimer", 1, "action-btn", "btn-delete", 3, "click"], [1, "fas", "fa-trash-alt"], ["colspan", "9", 1, "empty-state"], [1, "fas", "fa-inbox"], [3, "title", "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-grid"], [1, "form-group", "full"], [1, "req"], ["type", "text", "placeholder", "Ex: Fuite de donn\u00E9es clients", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Description du risque...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "form-group"], ["type", "text", "placeholder", "Ex: Cybers\u00E9curit\u00E9", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Ex: Capital Humain", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Ex: Gestion de la tr\u00E9sorerie", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "finput", 3, "ngModel", "ngModelChange", "change"], [1, "finput", 3, "ngModel", "ngModelChange"], [1, "section-divider", "full", 2, "margin", "10px 0"], [2, "border-bottom", "2px solid #e2e8f0", "padding-bottom", "5px", "color", "#475569"], [3, "ngValue"], [2, "padding", "10px", "border-radius", "8px", "border", "1px solid #e2e8f0", "background", "#f8fafc", "font-weight", "600"], [3, "class", 4, "ngIf"], ["style", "color:#64748b;", 4, "ngIf"], ["style", "margin-left: 10px; color:#64748b;", 4, "ngIf"], ["rows", "2", "placeholder", "Dispositif de ma\u00EEtrise des risques...", 1, "finput", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Plan pour traiter ce risque...", 1, "finput", 3, "ngModel", "ngModelChange"], ["type", "date", 1, "finput", 3, "ngModel", "min", "ngModelChange"], ["class", "form-group", 4, "ngIf"], [1, "file-zone"], ["type", "file", 2, "opacity", "0", "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], [1, "fas", "fa-cloud-upload-alt"], [1, "form-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "disabled", "click"], [1, "fas", "fa-save"], [2, "color", "#64748b"], [2, "margin-left", "10px", "color", "#64748b"], [2, "color", "#475569", "margin-bottom", "20px"], ["style", "color:#64748b; margin:-10px 0 20px;", 4, "ngIf"], ["class", "hint", 4, "ngIf"], ["class", "hint error", 4, "ngIf"], [1, "btn-cancel", 3, "disabled", "click"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [2, "color", "#64748b", "margin", "-10px 0 20px"], [1, "hint"], [1, "hint", "error"], [1, "fas", "fa-spinner", "fa-spin"], ["title", "D\u00E9tails du risque", 3, "close"], ["modal-body", "", 4, "ngIf"], ["modal-body", ""], [1, "details-grid"], [1, "detail-block", "full"], [1, "detail-label"], [1, "detail-value", "title"], [1, "detail-value"], [1, "detail-block"], ["style", "margin-left:5px; color:#64748b;", 4, "ngIf"], ["class", "detail-block", 4, "ngIf"], [1, "treatment-history", 2, "margin-top", "30px", "border-top", "2px solid #edf2f7", "padding-top", "20px"], [2, "color", "#1e293b", "margin-bottom", "15px", "font-size", "1.1rem", "display", "flex", "align-items", "center", "gap", "8px"], [1, "fas", "fa-history", 2, "color", "#64748b"], [1, "comments-list", 2, "max-height", "250px", "overflow-y", "auto", "padding-right", "10px"], ["class", "comment-item", "style", "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px; margin-bottom: 15px;", 4, "ngFor", "ngForOf"], ["style", "text-align: center; padding: 20px; color: #94a3b8; font-style: italic;", 4, "ngIf"], [1, "add-comment-form", 2, "margin-top", "25px", "background", "#f1f5f9", "padding", "15px", "border-radius", "12px", "border", "1px solid #e2e8f0"], [2, "margin", "0 0 12px 0", "font-size", "0.95rem", "color", "#1e293b"], [1, "form-group", 2, "margin-bottom", "12px"], ["rows", "3", "placeholder", "Ajouter une observation ou instruction...", 1, "finput", 3, "ngModel", "ngModelChange"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center", "gap", "15px"], [2, "position", "relative", "flex", "1"], ["type", "file", 2, "opacity", "0", "position", "absolute", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], [2, "border", "1.5px dashed #cbd5e1", "padding", "8px", "border-radius", "8px", "font-size", "0.82rem", "text-align", "center", "color", "#64748b", "background", "white"], [1, "fas", "fa-upload"], [1, "btn-save", 2, "padding", "10px 20px", "border-radius", "8px", 3, "disabled", "click"], [1, "btn-save", 3, "click"], [2, "margin-left", "5px", "color", "#64748b"], [1, "detail-value", 2, "color", "#0ea5e9", "font-weight", "700"], ["target", "_blank", 1, "doc-link", 3, "href"], [1, "fas", "fa-file-pdf"], [1, "comment-item", 2, "background", "#f8fafc", "border", "1px solid #e2e8f0", "border-radius", "10px", "padding", "15px", "margin-bottom", "15px"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "8px", "font-size", "0.85rem"], [2, "font-weight", "700", "color", "#334155"], [2, "color", "#94a3b8"], [2, "margin", "0", "color", "#475569", "font-size", "0.92rem", "line-height", "1.5"], ["style", "margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1;", 4, "ngIf"], [2, "margin-top", "10px", "padding-top", "8px", "border-top", "1px dashed #cbd5e1"], ["target", "_blank", 2, "color", "#004a99", "font-size", "0.85rem", "text-decoration", "none", "font-weight", "600", "display", "inline-flex", "align-items", "center", "gap", "5px", 3, "href"], [1, "fas", "fa-paperclip"], [2, "text-align", "center", "padding", "20px", "color", "#94a3b8", "font-style", "italic"], ["title", "G\u00E9n\u00E9ration de risques par IA", 3, "close"], ["modal-body", "", 1, "modal-form", "ai-modal"], ["class", "ai-input-zone", 4, "ngIf"], ["class", "ai-results-zone", 4, "ngIf"], [1, "ai-input-zone"], [1, "ai-tabs"], [1, "tab-btn", 3, "click"], [1, "fas", "fa-align-left"], [1, "fas", "fa-file-upload"], ["class", "ai-file-upload", 4, "ngIf"], [1, "ai-actions"], [1, "btn-ai-generate", 3, "disabled", "click"], [1, "fas"], ["rows", "4", "placeholder", "Ex: Mise en \u0153uvre d'un syst\u00E8me de t\u00E9l\u00E9travail pour 500 employ\u00E9s, incluant l'acc\u00E8s distant aux donn\u00E9es sensibles...", 1, "finput", 3, "ngModel", "ngModelChange"], [1, "ai-file-upload"], ["type", "file", "accept", ".pdf,.docx,.jpg,.jpeg,.png", 2, "opacity", "0", "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], ["class", "file-name", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], ["class", "hint-msg", 4, "ngIf"], [1, "file-name"], [1, "error-msg"], [1, "hint-msg"], [1, "ai-results-zone"], [1, "results-header"], [1, "btn-text-only", 3, "click"], [1, "fas", "fa-redo"], [1, "suggested-risks-list"], ["class", "suggested-risk-card", 3, "selected", 4, "ngFor", "ngForOf"], [1, "fas", "fa-plus-circle"], [1, "suggested-risk-card"], [1, "risk-selection-check", 3, "click"], [1, "risk-info"], [1, "risk-top-header"], [1, "risk-desc"], [1, "risk-details-grid"], [1, "mini-detail"], [1, "mini-detail", "full"], [1, "dept-tag"], [2, "font-size", "0.8rem", "margin", "0", "color", "#475569"], ["class", "badge", 4, "ngIf"], ["type", "date", 1, "mini-input", 3, "ngModel", "ngModelChange"], [1, "mini-input", 3, "ngModel", "ngModelChange"], [1, "badge"], ["title", "\u00C9valuation strat\u00E9gique par IA", 3, "close"], ["class", "ai-loading", 4, "ngIf"], ["class", "eval-results", 4, "ngIf"], [1, "ai-loading"], [1, "eval-results"], ["class", "eval-card", 4, "ngFor", "ngForOf"], [1, "eval-card"], [1, "eval-header"], [1, "eval-risk-id"], [1, "eval-priority"], [1, "prio-value"], [1, "eval-meta"], [1, "meta-item"], [1, "fas", "fa-bolt"], [1, "eval-suggestion"], [1, "fas", "fa-lightbulb"]], template: function RiskManagementComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function RiskManagementComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gestion des Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Cr\u00E9ez, suivez et traitez tous les risques identifi\u00E9s.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵtemplate(12, RiskManagementComponent_button_12_Template, 3, 0, "button", 7);
        i0.ɵɵtemplate(13, RiskManagementComponent_button_13_Template, 3, 0, "button", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "button", 10);
        i0.ɵɵlistener("click", function RiskManagementComponent_Template_button_click_15_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(16, "i", 11);
        i0.ɵɵtext(17, " Exporter rapport ");
        i0.ɵɵelement(18, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "button", 14);
        i0.ɵɵlistener("click", function RiskManagementComponent_Template_button_click_20_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(21, "i", 15);
        i0.ɵɵtext(22, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "button", 14);
        i0.ɵɵlistener("click", function RiskManagementComponent_Template_button_click_23_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(24, "i", 16);
        i0.ɵɵtext(25, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(26, RiskManagementComponent_button_26_Template, 3, 0, "button", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 18);
        i0.ɵɵelementStart(28, "div", 19);
        i0.ɵɵelementStart(29, "span", 20);
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "span", 21);
        i0.ɵɵtext(32, "Total Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "div", 22);
        i0.ɵɵelementStart(34, "span", 20);
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "span", 21);
        i0.ɵɵtext(37, "Cl\u00F4tur\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 23);
        i0.ɵɵelementStart(39, "span", 20);
        i0.ɵɵtext(40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "span", 21);
        i0.ɵɵtext(42, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "div", 24);
        i0.ɵɵelementStart(44, "span", 20);
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "span", 21);
        i0.ɵɵtext(47, "Critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(48, "div", 25);
        i0.ɵɵelementStart(49, "div", 26);
        i0.ɵɵelement(50, "i", 27);
        i0.ɵɵelementStart(51, "input", 28);
        i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_Template_input_ngModelChange_51_listener($event) { return ctx.searchText = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "select", 29);
        i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_Template_select_ngModelChange_52_listener($event) { return ctx.filterStatut = $event; });
        i0.ɵɵelementStart(53, "option", 30);
        i0.ɵɵtext(54, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(55, RiskManagementComponent_option_55_Template, 2, 2, "option", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "select", 29);
        i0.ɵɵlistener("ngModelChange", function RiskManagementComponent_Template_select_ngModelChange_56_listener($event) { return ctx.filterNiveau = $event; });
        i0.ɵɵelementStart(57, "option", 30);
        i0.ɵɵtext(58, "Tous les niveaux");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(59, RiskManagementComponent_option_59_Template, 2, 2, "option", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "button", 32);
        i0.ɵɵlistener("click", function RiskManagementComponent_Template_button_click_60_listener() { ctx.filterStatut = ""; ctx.filterNiveau = ""; return ctx.searchText = ""; });
        i0.ɵɵelement(61, "i", 33);
        i0.ɵɵtext(62, " R\u00E9initialiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "div", 34);
        i0.ɵɵelementStart(64, "table", 35);
        i0.ɵɵelementStart(65, "thead");
        i0.ɵɵelementStart(66, "tr");
        i0.ɵɵelementStart(67, "th");
        i0.ɵɵtext(68, "#");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "th");
        i0.ɵɵtext(70, "Titre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "th");
        i0.ɵɵtext(72, "Domaine");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "th");
        i0.ɵɵtext(74, "Niveau");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "th");
        i0.ɵɵtext(76, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "th");
        i0.ɵɵtext(78, "Responsable du d\u00E9partement \u00E0 risque");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(79, "th");
        i0.ɵɵtext(80, "Agent de traitement du risque");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(81, "th");
        i0.ɵɵtext(82, "Fr\u00E9quence");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "th");
        i0.ɵɵtext(84, "\u00C9ch\u00E9ance");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(85, "th");
        i0.ɵɵtext(86, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "tbody");
        i0.ɵɵtemplate(88, RiskManagementComponent_tr_88_Template, 37, 23, "tr", 36);
        i0.ɵɵtemplate(89, RiskManagementComponent_tr_89_Template, 5, 0, "tr", 37);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(90, RiskManagementComponent_app_modal_90_Template, 125, 40, "app-modal", 38);
        i0.ɵɵtemplate(91, RiskManagementComponent_app_modal_91_Template, 27, 11, "app-modal", 38);
        i0.ɵɵtemplate(92, RiskManagementComponent_app_modal_92_Template, 2, 1, "app-modal", 39);
        i0.ɵɵtemplate(93, RiskManagementComponent_app_modal_93_Template, 5, 2, "app-modal", 40);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(94, RiskManagementComponent_app_modal_94_Template, 8, 2, "app-modal", 41);
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngIf", ctx.isRiskManager);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSeniorAuditor);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.isRiskManager);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredRisks.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.getStatusCount(ctx.RiskStatus.CLOSED));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.getStatusCount(ctx.RiskStatus.IN_PROGRESS));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.getLevelCount(ctx.RiskLevel.CRITICAL));
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.searchText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterStatut);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.statusOptions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterNiveau);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.levelOptions);
        i0.ɵɵadvance(29);
        i0.ɵɵproperty("ngForOf", ctx.filteredRisks);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredRisks.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showCreateModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAssignModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAiModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEvaluationModal);
    } }, directives: [i5.NgIf, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel, i6.SelectControlValueAccessor, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i5.NgForOf, i7.ModalComponent], pipes: [i5.DatePipe], styles: [".risk-page[_ngcontent-%COMP%] {\n        padding: 30px;\n        background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);\n        min-height: 100vh;\n        font-family: 'Inter', sans-serif;\n    }\n\n    .btn-ai-eval[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #0284c7, #0ea5e9);\n        color: white;\n        border: none;\n        padding: 12px 24px;\n        border-radius: 14px;\n        font-weight: 700;\n        cursor: pointer;\n        font-size: 0.93rem;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.25);\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        border: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .btn-ai-eval[_ngcontent-%COMP%]:hover {\n        transform: translateY(-2px) scale(1.02);\n        box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);\n        filter: brightness(1.1);\n    }\n\n    .freq-tag[_ngcontent-%COMP%] {\n        background: #e0f2fe;\n        color: #0369a1;\n        padding: 4px 10px;\n        border-radius: 6px;\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n    }\n\n    .deadline-box[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n    }\n\n    .main-date[_ngcontent-%COMP%] {\n        font-weight: 600;\n        color: #1e293b;\n    }\n\n    .next-date[_ngcontent-%COMP%] {\n        font-size: 0.72rem;\n        color: #0ea5e9;\n        font-weight: 500;\n    }\n\n    \n    .ai-loading[_ngcontent-%COMP%] {\n        text-align: center;\n        padding: 40px;\n        color: #64748b;\n    }\n\n    .ai-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        font-size: 2.5rem;\n        margin-bottom: 15px;\n    }\n\n    .eval-results[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 16px;\n        max-height: 500px;\n        overflow-y: auto;\n        padding: 10px;\n    }\n\n    .eval-card[_ngcontent-%COMP%] {\n        background: #f8fafc;\n        border: 1px solid #e2e8f0;\n        border-radius: 12px;\n        padding: 16px;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        transition: transform 0.2s;\n    }\n\n    .eval-card[_ngcontent-%COMP%]:hover {\n        transform: scale(1.02);\n    }\n\n    .eval-header[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n\n    .prio-value[_ngcontent-%COMP%] {\n        background: #1e293b;\n        color: white;\n        padding: 4px 10px;\n        border-radius: 8px;\n        font-weight: 800;\n        font-size: 0.9rem;\n    }\n\n    .eval-meta[_ngcontent-%COMP%] {\n        background: white;\n        padding: 10px;\n        border-radius: 8px;\n        font-size: 0.82rem;\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n    }\n\n    .meta-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        width: 18px;\n        color: #64748b;\n    }\n\n    .eval-suggestion[_ngcontent-%COMP%] {\n        font-size: 0.85rem;\n        line-height: 1.5;\n        color: #475569;\n        display: flex;\n        gap: 8px;\n    }\n\n    .eval-suggestion[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        color: #f59e0b;\n        margin-top: 3px;\n    }\n\n    \n\n    .btn-create[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #004a99, #0066cc);\n        color: white;\n        border: none;\n        padding: 12px 26px;\n        border-radius: 14px;\n        font-weight: 700;\n        cursor: pointer;\n        font-size: 0.95rem;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        box-shadow: 0 4px 15px rgba(0, 74, 153, 0.3);\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        border: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .btn-create[_ngcontent-%COMP%]:hover {\n        transform: translateY(-2px) scale(1.02);\n        box-shadow: 0 8px 25px rgba(0, 74, 153, 0.45);\n        filter: brightness(1.1);\n    }\n\n    .header-actions[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 12px;\n        align-items: center;\n    }\n\n    .btn-export[_ngcontent-%COMP%] {\n        background: rgba(255, 255, 255, 0.7);\n        backdrop-filter: blur(8px);\n        color: #004a99;\n        border: 2px solid rgba(0, 74, 153, 0.2);\n        padding: 12px 22px;\n        border-radius: 14px;\n        font-weight: 700;\n        cursor: pointer;\n        font-size: 0.93rem;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .btn-export[_ngcontent-%COMP%]:hover {\n        background: #004a99;\n        color: white;\n        border-color: #004a99;\n        box-shadow: 0 6px 20px rgba(0, 74, 153, 0.2);\n        transform: translateY(-2px);\n    }\n\n\n\n    .btn-ai[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #7c3aed, #8b5cf6);\n        color: white;\n        border: none;\n        padding: 12px 24px;\n        border-radius: 14px;\n        font-weight: 700;\n        cursor: pointer;\n        font-size: 0.93rem;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        border: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .btn-ai[_ngcontent-%COMP%]:hover {\n        transform: translateY(-2px) scale(1.02);\n        box-shadow: 0 8px 25px rgba(124, 58, 237, 0.45);\n        filter: brightness(1.1);\n    }\n\n    .kpi-row[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(4, 1fr);\n        gap: 16px;\n        margin-bottom: 24px;\n    }\n\n    .kpi-card[_ngcontent-%COMP%] {\n        background: white;\n        border-radius: 16px;\n        padding: 20px 24px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n        border-left: 4px solid transparent;\n        transition: transform 0.2s;\n    }\n\n    .kpi-card[_ngcontent-%COMP%]:hover {\n        transform: translateY(-3px);\n    }\n\n    .kpi-value[_ngcontent-%COMP%] {\n        font-size: 2.2rem;\n        font-weight: 800;\n        line-height: 1;\n    }\n\n    .kpi-label[_ngcontent-%COMP%] {\n        font-size: 0.8rem;\n        color: #94a3b8;\n        text-transform: uppercase;\n        font-weight: 600;\n    }\n\n    .kpi-total[_ngcontent-%COMP%] {\n        border-color: #6366f1;\n    }\n\n    .kpi-total[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n        color: #6366f1;\n    }\n\n    .kpi-open[_ngcontent-%COMP%] {\n        border-color: #10b981;\n    }\n\n    .kpi-open[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n        color: #10b981;\n    }\n\n    .kpi-progress[_ngcontent-%COMP%] {\n        border-color: #f59e0b;\n    }\n\n    .kpi-progress[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n        color: #f59e0b;\n    }\n\n    .kpi-critical[_ngcontent-%COMP%] {\n        border-color: #ef4444;\n    }\n\n    .kpi-critical[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n        color: #ef4444;\n    }\n\n    .kpi-closed[_ngcontent-%COMP%] {\n        border-color: #94a3b8;\n    }\n\n    .kpi-closed[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n        color: #64748b;\n    }\n\n    \n    .filters-bar[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 12px;\n        align-items: center;\n        background: white;\n        padding: 14px 20px;\n        border-radius: 14px;\n        margin-bottom: 20px;\n        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);\n    }\n\n    .search-box[_ngcontent-%COMP%] {\n        flex: 1;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        background: #f8fafc;\n        border-radius: 10px;\n        padding: 8px 14px;\n        border: 1.5px solid #e2e8f0;\n    }\n\n    .search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        color: #94a3b8;\n    }\n\n    .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        border: none;\n        outline: none;\n        background: transparent;\n        width: 100%;\n        font-size: 0.9rem;\n        color: #1e293b;\n    }\n\n    .filter-select[_ngcontent-%COMP%] {\n        padding: 9px 14px;\n        border-radius: 10px;\n        border: 1.5px solid #e2e8f0;\n        background: #f8fafc;\n        font-size: 0.9rem;\n        color: #475569;\n        cursor: pointer;\n    }\n\n    .btn-clear[_ngcontent-%COMP%] {\n        padding: 9px 14px;\n        border-radius: 10px;\n        border: 1.5px solid #fee2e2;\n        background: #fff5f5;\n        color: #dc2626;\n        cursor: pointer;\n        font-size: 0.85rem;\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        transition: all 0.2s;\n    }\n\n    .btn-clear[_ngcontent-%COMP%]:hover {\n        background: #fee2e2;\n    }\n\n    \n    .risks-card[_ngcontent-%COMP%] {\n        background: white;\n        border-radius: 18px;\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n        overflow: hidden;\n    }\n\n    .risks-table[_ngcontent-%COMP%] {\n        width: 100%;\n        border-collapse: collapse;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n        border-bottom: 2px solid #e2e8f0;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        padding: 14px 16px;\n        text-align: left;\n        font-size: 0.72rem;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        border-bottom: 1px solid #f1f5f9;\n        transition: background 0.15s;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n        background: #f8fafc;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n        padding: 14px 16px;\n        font-size: 0.88rem;\n        color: #334155;\n        vertical-align: middle;\n    }\n\n    .td-id[_ngcontent-%COMP%] {\n        color: #94a3b8;\n        font-weight: 600;\n        width: 40px;\n    }\n\n    .td-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: #1e293b;\n    }\n\n    .domain-tag[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #475569;\n        padding: 4px 10px;\n        border-radius: 6px;\n        font-size: 0.78rem;\n        font-weight: 600;\n    }\n\n    .text-muted[_ngcontent-%COMP%] {\n        color: #94a3b8;\n        font-style: italic;\n        font-size: 0.82rem;\n    }\n\n    .empty-state[_ngcontent-%COMP%] {\n        text-align: center;\n        padding: 60px 20px;\n        color: #94a3b8;\n    }\n\n    .empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        font-size: 2.5rem;\n        margin-bottom: 10px;\n        display: block;\n    }\n\n    \n    .badge[_ngcontent-%COMP%] {\n        padding: 5px 12px;\n        border-radius: 20px;\n        font-size: 0.73rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        white-space: nowrap;\n    }\n\n    .level-low[_ngcontent-%COMP%] {\n        background: #dcfce7;\n        color: #166534;\n    }\n\n    .level-limited[_ngcontent-%COMP%], .level-medium[_ngcontent-%COMP%] {\n        background: #fef9c3;\n        color: #854d0e;\n    }\n\n    .level-high[_ngcontent-%COMP%] {\n        background: #ffedd5;\n        color: #9a3412;\n    }\n\n    .level-critical[_ngcontent-%COMP%] {\n        background: #fee2e2;\n        color: #991b1b;\n    }\n\n    .status-open[_ngcontent-%COMP%] {\n        background: #ecfdf5;\n        color: #047857;\n    }\n\n    .status-in_progress[_ngcontent-%COMP%] {\n        background: #eff6ff;\n        color: #1d4ed8;\n    }\n\n    .status-treated[_ngcontent-%COMP%] {\n        background: #f5f3ff;\n        color: #5b21b6;\n    }\n\n    .status-closed[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #64748b;\n    }\n\n    \n    .actions-cell[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 6px;\n    }\n\n    .action-btn[_ngcontent-%COMP%] {\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        border: none;\n        cursor: pointer;\n        font-size: 0.8rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: all 0.2s;\n    }\n\n    .btn-view[_ngcontent-%COMP%] {\n        background: #eff6ff;\n        color: #1d4ed8;\n    }\n\n    .btn-view[_ngcontent-%COMP%]:hover {\n        background: #dbeafe;\n    }\n\n    .btn-edit[_ngcontent-%COMP%] {\n        background: #f0fdf4;\n        color: #15803d;\n    }\n\n    .btn-edit[_ngcontent-%COMP%]:hover {\n        background: #dcfce7;\n    }\n\n    .btn-assign[_ngcontent-%COMP%] {\n        background: #fffbeb;\n        color: #d97706;\n        border: 1px solid #fde68a;\n    }\n\n    .btn-assign[_ngcontent-%COMP%]:hover {\n        background: #fef3c7;\n        color: #b45309;\n        transform: scale(1.05);\n    }\n\n    .btn-close[_ngcontent-%COMP%] {\n        background: #f5f3ff;\n        color: #6d28d9;\n    }\n\n    .btn-close[_ngcontent-%COMP%]:hover {\n        background: #ede9fe;\n    }\n\n    .btn-revert[_ngcontent-%COMP%] {\n        background: #fff7ed;\n        color: #ea580c;\n    }\n\n    .btn-revert[_ngcontent-%COMP%]:hover {\n        background: #ffedd5;\n    }\n\n    .btn-delete[_ngcontent-%COMP%] {\n        background: #fee2e2;\n        color: #dc2626;\n    }\n\n    .btn-delete[_ngcontent-%COMP%]:hover {\n        background: #fecaca;\n    }\n\n    \n    .modal-form[_ngcontent-%COMP%] {\n        padding: 4px 0;\n    }\n\n    .form-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 16px;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n    }\n\n    \n    .ai-tabs[_ngcontent-%COMP%] {\n        display: flex;\n        background: #f1f5f9;\n        padding: 4px;\n        border-radius: 12px;\n        margin-bottom: 25px;\n        gap: 4px;\n        border: 1px solid #e2e8f0;\n    }\n\n    .tab-btn[_ngcontent-%COMP%] {\n        flex: 1;\n        background: transparent;\n        border: none;\n        padding: 10px 15px;\n        font-weight: 700;\n        color: #64748b;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n        border-radius: 10px;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        font-size: 0.9rem;\n    }\n\n    .tab-btn[_ngcontent-%COMP%]:hover:not(.active) {\n        background: rgba(255, 255, 255, 0.5);\n        color: #1e293b;\n    }\n\n    .tab-btn.active[_ngcontent-%COMP%] {\n        background: white;\n        color: #004a99;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n    }\n\n    .ai-actions[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-end;\n        margin-top: 15px;\n    }\n\n    .btn-ai-generate[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #6d28d9, #7c3aed);\n        color: white;\n        border: none;\n        padding: 14px 28px;\n        border-radius: 14px;\n        font-weight: 700;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        box-shadow: 0 4px 15px rgba(109, 40, 217, 0.25);\n        font-size: 1rem;\n    }\n\n    .btn-ai-generate[_ngcontent-%COMP%]:hover:not(:disabled) {\n        transform: translateY(-2px) scale(1.02);\n        box-shadow: 0 8px 25px rgba(109, 40, 217, 0.4);\n        filter: brightness(1.1);\n    }\n\n    .btn-ai-generate[_ngcontent-%COMP%]:disabled {\n        opacity: 0.7;\n        cursor: not-allowed;\n    }\n\n    .results-header[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 15px;\n    }\n\n    .results-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n        margin: 0;\n        color: #1e293b;\n    }\n\n    .btn-text-only[_ngcontent-%COMP%] {\n        background: none;\n        border: none;\n        color: #6366f1;\n        font-weight: 600;\n        cursor: pointer;\n        font-size: 0.85rem;\n        display: flex;\n        align-items: center;\n        gap: 5px;\n    }\n\n    .suggested-risks-list[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        max-height: 400px;\n        overflow-y: auto;\n        padding-right: 5px;\n        margin-bottom: 20px;\n    }\n\n    .suggested-risk-card[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 15px;\n        padding: 20px;\n        background: white;\n        border: 2px solid #e2e8f0;\n        border-radius: 16px;\n        transition: all 0.2s;\n        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n    }\n\n    .suggested-risk-card.selected[_ngcontent-%COMP%] {\n        border-color: #8b5cf6;\n        box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.1);\n    }\n\n    .risk-selection-check[_ngcontent-%COMP%] {\n        color: #94a3b8;\n        font-size: 1.4rem;\n        cursor: pointer;\n    }\n\n    .suggested-risk-card.selected[_ngcontent-%COMP%]   .risk-selection-check[_ngcontent-%COMP%] {\n        color: #8b5cf6;\n    }\n\n    .risk-info[_ngcontent-%COMP%] {\n        flex: 1;\n    }\n\n    .risk-top-header[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 8px;\n    }\n\n    .risk-top-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n        margin: 0;\n        font-size: 1.1rem;\n        font-weight: 700;\n        color: #0f172a;\n    }\n\n    .risk-desc[_ngcontent-%COMP%] {\n        color: #475569;\n        font-size: 0.9rem;\n        line-height: 1.5;\n        margin-bottom: 16px;\n    }\n\n    .risk-details-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 12px;\n        padding-top: 16px;\n        border-top: 1px solid #f1f5f9;\n    }\n\n    .mini-detail[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n    }\n\n    .mini-detail.full[_ngcontent-%COMP%] {\n        grid-column: span 3;\n    }\n\n    .mini-detail[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        font-size: 0.75rem;\n        font-weight: 600;\n        color: #64748b;\n        text-transform: uppercase;\n    }\n\n    .mini-detail[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: #334155;\n    }\n\n    .dept-tag[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        padding: 2px 8px;\n        border-radius: 4px;\n        display: inline-block;\n    }\n\n    .mini-input[_ngcontent-%COMP%] {\n        padding: 6px 10px;\n        border: 1px solid #e2e8f0;\n        border-radius: 6px;\n        font-size: 0.85rem;\n        color: #1e293b;\n        background: #f8fafc;\n    }\n\n    .mini-input[_ngcontent-%COMP%]:focus {\n        border-color: #8b5cf6;\n        outline: none;\n    }\n\n    .hint[_ngcontent-%COMP%] {\n        font-size: 0.75rem;\n        color: #94a3b8;\n        margin-top: 2px;\n    }\n\n    .ai-domain[_ngcontent-%COMP%] {\n        font-size: 0.75rem;\n        font-weight: 700;\n        color: #64748b;\n        background: #f1f5f9;\n        padding: 3px 8px;\n        border-radius: 4px;\n        text-transform: uppercase;\n    }\n\n    .form-group.full[_ngcontent-%COMP%] {\n        grid-column: span 2;\n    }\n\n    .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #475569;\n    }\n\n    .req[_ngcontent-%COMP%] {\n        color: #ef4444;\n    }\n\n    .finput[_ngcontent-%COMP%] {\n        padding: 10px 12px;\n        border-radius: 10px;\n        border: 1.5px solid #e2e8f0;\n        font-size: 0.9rem;\n        color: #1e293b;\n        background: #f8fafc;\n        width: 100%;\n        box-sizing: border-box;\n        transition: border-color 0.2s, box-shadow 0.2s;\n    }\n\n    .finput[_ngcontent-%COMP%]:focus {\n        border-color: #004a99;\n        box-shadow: 0 0 0 3px rgba(0, 74, 153, 0.08);\n        outline: none;\n    }\n\n    .finput[_ngcontent-%COMP%]:disabled {\n        background: #f1f5f9;\n        cursor: not-allowed;\n        color: #94a3b8;\n    }\n\n    .hint[_ngcontent-%COMP%] {\n        font-size: 0.75rem;\n        color: #94a3b8;\n    }\n\n    .hint.error[_ngcontent-%COMP%] {\n        color: #dc2626;\n    }\n\n    .file-zone[_ngcontent-%COMP%] {\n        position: relative;\n        border: 2px dashed #cbd5e1;\n        border-radius: 10px;\n        padding: 20px;\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.2s;\n        color: #94a3b8;\n        font-size: 0.88rem;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 6px;\n    }\n\n    .file-zone[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        font-size: 1.8rem;\n        color: #004a99;\n    }\n\n    .file-zone[_ngcontent-%COMP%]:hover, .file-zone.has-file[_ngcontent-%COMP%] {\n        border-color: #004a99;\n        background: #f0f7ff;\n        color: #004a99;\n    }\n\n    .form-footer[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-end;\n        gap: 10px;\n        margin-top: 24px;\n        padding-top: 18px;\n        border-top: 1px solid #f1f5f9;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%] {\n        padding: 10px 22px;\n        border-radius: 12px;\n        border: 1.5px solid #e2e8f0;\n        background: rgba(255, 255, 255, 0.8);\n        color: #64748b;\n        cursor: pointer;\n        font-weight: 700;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        font-size: 0.92rem;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%]:hover {\n        background: #f1f5f9;\n        color: #1e293b;\n        border-color: #cbd5e1;\n        transform: translateY(-1px);\n    }\n\n    .btn-save[_ngcontent-%COMP%] {\n        padding: 12px 26px;\n        border-radius: 14px;\n        border: none;\n        background: linear-gradient(135deg, #004a99, #0066cc);\n        color: white;\n        cursor: pointer;\n        font-weight: 700;\n        font-size: 0.95rem;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        box-shadow: 0 4px 15px rgba(0, 74, 153, 0.25);\n    }\n\n    .btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n        transform: translateY(-2px) scale(1.02);\n        box-shadow: 0 8px 25px rgba(0, 74, 153, 0.4);\n        filter: brightness(1.1);\n    }\n\n    .btn-save[_ngcontent-%COMP%]:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n        filter: grayscale(0.5);\n    }\n\n    \n    .details-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 16px;\n    }\n\n    .detail-block[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        padding: 12px;\n        background: #f8fafc;\n        border-radius: 10px;\n    }\n\n    .detail-block.full[_ngcontent-%COMP%] {\n        grid-column: span 2;\n    }\n\n    .detail-label[_ngcontent-%COMP%] {\n        font-size: 0.72rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        color: #94a3b8;\n        letter-spacing: 0.5px;\n    }\n\n    .detail-value[_ngcontent-%COMP%] {\n        margin: 0;\n        color: #1e293b;\n        font-size: 0.92rem;\n        line-height: 1.5;\n    }\n\n    .detail-value.title[_ngcontent-%COMP%] {\n        font-size: 1.1rem;\n        font-weight: 700;\n    }\n\n    .doc-link[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        color: #004a99;\n        text-decoration: none;\n        font-size: 0.88rem;\n        font-weight: 600;\n        padding: 8px 14px;\n        background: #eff6ff;\n        border-radius: 8px;\n        margin-top: 4px;\n        transition: background 0.2s;\n    }\n\n    .doc-link[_ngcontent-%COMP%]:hover {\n        background: #dbeafe;\n    }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskManagementComponent, [{
        type: Component,
        args: [{
                selector: 'app-risk-management',
                templateUrl: './risk-management.component.html',
                styleUrls: []
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.OrganigrammeService }, { type: i3.HttpClient }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=risk-management.component.js.map