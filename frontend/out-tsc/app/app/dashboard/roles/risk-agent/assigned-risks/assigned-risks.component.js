import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, RiskStatus } from '../../../../core/services/risk.service';
import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../../core/services/auth.service";
import * as i4 from "@angular/common";
import * as i5 from "../../../../shared/modal/modal.component";
import * as i6 from "@angular/forms";
function AssignedRisksComponent_tr_61_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 29);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 30);
    i0.ɵɵelementStart(16, "button", 31);
    i0.ɵɵlistener("click", function AssignedRisksComponent_tr_61_Template_button_click_16_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const risk_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.openDetails(risk_r4); });
    i0.ɵɵelement(17, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 33);
    i0.ɵɵlistener("click", function AssignedRisksComponent_tr_61_Template_button_click_18_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const risk_r4 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.openTreatment(risk_r4); });
    i0.ɵɵelement(19, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r4.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge level-" + risk_r4.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(risk_r4.niveauRisque);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge status-" + risk_r4.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(risk_r4.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", risk_r4.responsableTraitement == null ? null : risk_r4.responsableTraitement.prenom, " ", risk_r4.responsableTraitement == null ? null : risk_r4.responsableTraitement.nom, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 10, risk_r4.dateEcheance, "dd/MM/yyyy"));
} }
function AssignedRisksComponent_tr_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 35);
    i0.ɵɵelement(2, "i", 36);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun risque assign\u00E9 pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AssignedRisksComponent_app_modal_63_div_44_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵelementStart(1, "a", 73);
    i0.ɵɵelement(2, "i", 74);
    i0.ɵɵtext(3, " Voir la preuve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", ctx_r13.environment.serverUrl + "/" + comment_r12.pieceJointe + ctx_r13.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function AssignedRisksComponent_app_modal_63_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelementStart(1, "div", 67);
    i0.ɵɵelementStart(2, "span", 68);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 69);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 70);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, AssignedRisksComponent_app_modal_63_div_44_div_9_Template, 4, 1, "div", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r12 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", comment_r12.user == null ? null : comment_r12.user.prenom, " ", comment_r12.user == null ? null : comment_r12.user.nom, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, comment_r12.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", comment_r12.content, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r12.pieceJointe);
} }
function AssignedRisksComponent_app_modal_63_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵtext(1, " Aucun commentaire pour le moment. ");
    i0.ɵɵelementEnd();
} }
function AssignedRisksComponent_app_modal_63_button_64_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 76);
    i0.ɵɵlistener("click", function AssignedRisksComponent_app_modal_63_button_64_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.markAsTreated(); });
    i0.ɵɵelement(1, "i", 77);
    i0.ɵɵtext(2, " Marquer comme Trait\u00E9 ");
    i0.ɵɵelementEnd();
} }
function AssignedRisksComponent_app_modal_63_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 37);
    i0.ɵɵlistener("close", function AssignedRisksComponent_app_modal_63_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.showTreatmentModal = false; });
    i0.ɵɵelementStart(1, "div", 38, 39);
    i0.ɵɵelementStart(3, "div", 40);
    i0.ɵɵelementStart(4, "div", 41);
    i0.ɵɵelementStart(5, "span", 42);
    i0.ɵɵtext(6, "Explication / Contexte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 43);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 44);
    i0.ɵɵelementStart(10, "span", 42);
    i0.ɵɵtext(11, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 43);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 44);
    i0.ɵɵelementStart(15, "span", 42);
    i0.ɵɵtext(16, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 43);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 41);
    i0.ɵɵelementStart(20, "span", 42);
    i0.ɵɵtext(21, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 43);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 44);
    i0.ɵɵelementStart(25, "span", 42);
    i0.ɵɵtext(26, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 44);
    i0.ɵɵelementStart(30, "span", 42);
    i0.ɵɵtext(31, "Risque Net");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 41);
    i0.ɵɵelementStart(35, "span", 42);
    i0.ɵɵtext(36, "Plan d'action pr\u00E9vu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "p", 43);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 45);
    i0.ɵɵelementStart(40, "h4", 46);
    i0.ɵɵelement(41, "i", 47);
    i0.ɵɵtext(42, " Historique du traitement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 48);
    i0.ɵɵtemplate(44, AssignedRisksComponent_app_modal_63_div_44_Template, 10, 8, "div", 49);
    i0.ɵɵtemplate(45, AssignedRisksComponent_app_modal_63_div_45_Template, 2, 0, "div", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 51);
    i0.ɵɵelementStart(47, "h5", 52);
    i0.ɵɵtext(48, "Ajouter une preuve / Commentaire ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 53);
    i0.ɵɵelementStart(50, "textarea", 54);
    i0.ɵɵlistener("ngModelChange", function AssignedRisksComponent_app_modal_63_Template_textarea_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.treatmentContent = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 55);
    i0.ɵɵelementStart(52, "div", 56);
    i0.ɵɵelementStart(53, "input", 57);
    i0.ɵɵlistener("change", function AssignedRisksComponent_app_modal_63_Template_input_change_53_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 58);
    i0.ɵɵelement(55, "i", 59);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 60);
    i0.ɵɵelementStart(58, "button", 61);
    i0.ɵɵlistener("click", function AssignedRisksComponent_app_modal_63_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r18); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.addTreatment(); });
    i0.ɵɵelement(59, "i", 62);
    i0.ɵɵtext(60, " Ajouter Commentaire ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "button", 63);
    i0.ɵɵlistener("click", function AssignedRisksComponent_app_modal_63_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r18); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.downloadIncident(); });
    i0.ɵɵelement(62, "i", 64);
    i0.ɵɵtext(63, " G\u00E9n\u00E9rer Fiche Incident ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(64, AssignedRisksComponent_app_modal_63_button_64_Template, 3, 0, "button", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", "Traitement du Risque: " + (ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.titre));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.explication);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.domaine);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.macroProcessus) || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.processus) || "\u2014");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge level-" + (ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.cotationRisqueBrut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.cotationRisqueBrut) || "\u2014");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge level-" + ((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.cotationRisqueNet) || (ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.niveauRisque)));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.cotationRisqueNet) || (ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.niveauRisque));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.planActionTraitement) || "\u2014");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.comments);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.comments.length === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r2.treatmentContent);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedFile ? ctx_r2.selectedFile.name : "Joindre un fichier", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.treatmentContent);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", (ctx_r2.selectedRisk == null ? null : ctx_r2.selectedRisk.statut) === "En cours");
} }
function AssignedRisksComponent_app_modal_64_div_1_small_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r25.selectedRisk.niveauCotationRisqueBrut, ")");
} }
function AssignedRisksComponent_app_modal_64_div_1_small_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r26.selectedRisk.niveauCotationRisqueNet, ")");
} }
function AssignedRisksComponent_app_modal_64_div_1_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelementStart(1, "span", 42);
    i0.ɵɵtext(2, "Justificatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 86);
    i0.ɵɵelement(4, "i", 87);
    i0.ɵɵtext(5, " Voir le document ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", ctx_r27.environment.serverUrl + "/" + ctx_r27.selectedRisk.pieceJustificative + ctx_r27.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function AssignedRisksComponent_app_modal_64_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38, 39);
    i0.ɵɵelementStart(2, "div", 80);
    i0.ɵɵelementStart(3, "div", 41);
    i0.ɵɵelementStart(4, "span", 42);
    i0.ɵɵtext(5, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 81);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 41);
    i0.ɵɵelementStart(9, "span", 42);
    i0.ɵɵtext(10, "Explication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 43);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 44);
    i0.ɵɵelementStart(14, "span", 42);
    i0.ɵɵtext(15, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 43);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 44);
    i0.ɵɵelementStart(19, "span", 42);
    i0.ɵɵtext(20, "Macro Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 43);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 41);
    i0.ɵɵelementStart(24, "span", 42);
    i0.ɵɵtext(25, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 43);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 44);
    i0.ɵɵelementStart(29, "span", 42);
    i0.ɵɵtext(30, "Probabilit\u00E9 / Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "p", 43);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 44);
    i0.ɵɵelementStart(34, "span", 42);
    i0.ɵɵtext(35, "Risque Brut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 82);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(39, AssignedRisksComponent_app_modal_64_div_1_small_39_Template, 2, 1, "small", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 41);
    i0.ɵɵelementStart(41, "span", 42);
    i0.ɵɵtext(42, "DMR Existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p", 43);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 44);
    i0.ɵɵelementStart(46, "span", 42);
    i0.ɵɵtext(47, "Ma\u00EEtrise (DMR)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p", 43);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 44);
    i0.ɵɵelementStart(51, "span", 42);
    i0.ɵɵtext(52, "Risque Net");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 82);
    i0.ɵɵelementStart(54, "span");
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, AssignedRisksComponent_app_modal_64_div_1_small_56_Template, 2, 1, "small", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 41);
    i0.ɵɵelementStart(58, "span", 42);
    i0.ɵɵtext(59, "Plan d'action de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p", 43);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 44);
    i0.ɵɵelementStart(63, "span", 42);
    i0.ɵɵtext(64, "D\u00E9partement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "p", 43);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "div", 44);
    i0.ɵɵelementStart(68, "span", 42);
    i0.ɵɵtext(69, "Date d'\u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "p", 43);
    i0.ɵɵtext(71);
    i0.ɵɵpipe(72, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "div", 44);
    i0.ɵɵelementStart(74, "span", 42);
    i0.ɵɵtext(75, "Responsable du d\u00E9partement \u00E0 risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "p", 43);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "div", 44);
    i0.ɵɵelementStart(79, "span", 42);
    i0.ɵɵtext(80, "Statut actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "span");
    i0.ɵɵtext(82);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(83, AssignedRisksComponent_app_modal_64_div_1_div_83_Template, 6, 1, "div", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 60);
    i0.ɵɵelementStart(85, "button", 76);
    i0.ɵɵlistener("click", function AssignedRisksComponent_app_modal_64_div_1_Template_button_click_85_listener() { i0.ɵɵrestoreView(_r29); const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.showDetailsModal = false; });
    i0.ɵɵtext(86, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.explication);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.domaine);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.macroProcessus || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.processus || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r23.selectedRisk.probabilite || "\u2014", " / ", ctx_r23.selectedRisk.impact || "\u2014", "");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap("badge level-" + ctx_r23.selectedRisk.cotationRisqueBrut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.cotationRisqueBrut || "\u2014");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.selectedRisk.niveauCotationRisqueBrut);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.dmrExistant || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.niveauMaitrise || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap("badge level-" + (ctx_r23.selectedRisk.cotationRisqueNet || ctx_r23.selectedRisk.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.cotationRisqueNet || ctx_r23.selectedRisk.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.selectedRisk.niveauCotationRisqueNet);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.planActionTraitement || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.departement == null ? null : ctx_r23.selectedRisk.departement.nom);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(72, 26, ctx_r23.selectedRisk.dateEcheance, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r23.selectedRisk.responsableTraitement == null ? null : ctx_r23.selectedRisk.responsableTraitement.prenom, " ", ctx_r23.selectedRisk.responsableTraitement == null ? null : ctx_r23.selectedRisk.responsableTraitement.nom, "");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge status-" + ctx_r23.selectedRisk.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r23.selectedRisk.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.selectedRisk.pieceJustificative);
} }
function AssignedRisksComponent_app_modal_64_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 78);
    i0.ɵɵlistener("close", function AssignedRisksComponent_app_modal_64_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r31); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.showDetailsModal = false; });
    i0.ɵɵtemplate(1, AssignedRisksComponent_app_modal_64_div_1_Template, 87, 29, "div", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedRisk);
} }
export class AssignedRisksComponent {
    constructor(riskService, router, authService) {
        this.riskService = riskService;
        this.router = router;
        this.authService = authService;
        this.environment = environment;
        this.assignedRisks = [];
        this.selectedRisk = null;
        this.showTreatmentModal = false;
        this.showDetailsModal = false;
        this.isAssigning = false;
        this.treatmentContent = '';
        this.selectedFile = null;
        this.comments = [];
        this.stats = {
            total: 0,
            unprocessed: 0,
            urgent: 0
        };
    }
    get authQueryToken() {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }
    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            this.loadAssignedRisks();
        });
    }
    loadAssignedRisks() {
        this.riskService.getRisks().subscribe(risks => {
            if (this.currentUser) {
                this.assignedRisks = risks.filter(r => r.riskAgentId === this.currentUser.id);
            }
            else {
                this.assignedRisks = risks;
            }
            this.calculateStats();
        });
    }
    calculateStats() {
        this.stats.total = this.assignedRisks.length;
        this.stats.unprocessed = this.assignedRisks.filter(r => this.isActiveRiskStatus(r.statutCode || r.statut)).length;
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);
        const urgentRisks = this.assignedRisks.filter(r => {
            if (this.isCompletedRiskStatus(r.statutCode || r.statut))
                return false;
            const dueDate = new Date(r.dateEcheance);
            return dueDate <= nextWeek;
        });
        this.stats.urgent = urgentRisks.length;
    }
    openTreatment(risk) {
        this.selectedRisk = risk;
        this.showTreatmentModal = true;
        this.loadComments(risk.id);
    }
    openDetails(risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
    }
    loadComments(riskId) {
        this.riskService.getComments(riskId).subscribe(comments => this.comments = comments);
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    addTreatment() {
        if (!this.selectedRisk)
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
    markAsTreated() {
        if (!this.selectedRisk)
            return;
        this.riskService.updateStatus(this.selectedRisk.id, RiskStatus.TREATED).subscribe(() => {
            this.showTreatmentModal = false;
            this.loadAssignedRisks();
        });
    }
    downloadIncident() {
        if (!this.selectedRisk)
            return;
        this.riskService.exportIncident(this.selectedRisk.id).subscribe((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fiche_Incident_${this.selectedRisk.id}.xlsm`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, error => {
            console.error('Erreur lors du téléchargement de la fiche incident:', error);
            alert('Erreur lors de la génération de la fiche incident');
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    isActiveRiskStatus(status) {
        const normalizedStatus = this.normalizeStatus(status);
        return normalizedStatus === RiskStatus.OPEN || normalizedStatus === RiskStatus.IN_PROGRESS;
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalizeStatus(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }
    normalizeStatus(status) {
        return (status || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
AssignedRisksComponent.ɵfac = function AssignedRisksComponent_Factory(t) { return new (t || AssignedRisksComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AuthService)); };
AssignedRisksComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssignedRisksComponent, selectors: [["app-assigned-risks"]], decls: 65, vars: 9, consts: [[1, "assigned-risks-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "content-container"], [1, "stats-card", "premium-stats", 2, "margin-bottom", "30px"], [1, "stats-header"], [1, "fas", "fa-chart-line"], [1, "badge", "premium"], [1, "stats-grid"], [1, "stat-item", "highlight"], [1, "stat-icon", "risks"], [1, "fas", "fa-clipboard-list"], [1, "stat-content"], [1, "value"], [1, "label"], [1, "stat-item", "info"], [1, "stat-icon", "maturity"], [1, "stat-item", "warn"], [1, "stat-icon", "critical"], [1, "fas", "fa-exclamation-triangle"], [1, "risks-card"], [1, "risks-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "title", "close", 4, "ngIf"], ["title", "D\u00E9tails du Risque", 3, "close", 4, "ngIf"], [1, "td-title"], [1, "actions-cell"], ["title", "Voir d\u00E9tails", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["title", "Traiter", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], ["colspan", "6", 1, "empty-state"], [1, "fas", "fa-inbox"], [3, "title", "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "details-grid", 2, "margin-bottom", "20px"], [1, "detail-block", "full"], [1, "detail-label"], [1, "detail-value"], [1, "detail-block"], [1, "treatment-history", 2, "margin-top", "25px", "border-top", "2px solid #edf2f7", "padding-top", "20px"], [2, "color", "#1e293b", "margin-bottom", "15px", "font-size", "1.1rem", "display", "flex", "align-items", "center", "gap", "8px"], [1, "fas", "fa-history", 2, "color", "#64748b"], [1, "comments-list", 2, "max-height", "250px", "overflow-y", "auto", "padding-right", "10px"], ["class", "comment-item", 4, "ngFor", "ngForOf"], ["style", "text-align: center; padding: 20px; color: #94a3b8; font-style: italic;", 4, "ngIf"], [1, "add-comment-form", 2, "margin-top", "25px", "background", "#f1f5f9", "padding", "15px", "border-radius", "12px", "border", "1px solid #e2e8f0"], [2, "margin", "0 0 12px 0", "font-size", "0.95rem", "color", "#1e293b"], [1, "form-group", 2, "margin-bottom", "12px"], ["rows", "3", "placeholder", "Description de l'action men\u00E9e...", 1, "finput", 3, "ngModel", "ngModelChange"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center", "gap", "15px"], [2, "position", "relative", "flex", "1"], ["type", "file", 2, "opacity", "0", "position", "absolute", "width", "100%", "height", "100%", "cursor", "pointer", 3, "change"], [2, "border", "1.5px dashed #cbd5e1", "padding", "8px", "border-radius", "8px", "font-size", "0.82rem", "text-align", "center", "color", "#64748b", "background", "white"], [1, "fas", "fa-upload"], [1, "form-footer"], [1, "btn-cancel", 3, "disabled", "click"], [1, "fas", "fa-comment-dots"], [1, "btn-export", 2, "background", "#6366f1", "color", "white", "border", "none", "padding", "10px 20px", "border-radius", "10px", "font-weight", "600", "cursor", "pointer", "display", "flex", "align-items", "center", "gap", "8px", "transition", "all 0.2s", 3, "click"], [1, "fas", "fa-file-excel"], ["class", "btn-save", 3, "click", 4, "ngIf"], [1, "comment-item"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "8px", "font-size", "0.85rem"], [2, "font-weight", "700", "color", "#334155"], [2, "color", "#94a3b8"], [2, "margin", "0", "color", "#475569", "font-size", "0.92rem", "line-height", "1.5"], ["style", "margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1;", 4, "ngIf"], [2, "margin-top", "10px", "padding-top", "8px", "border-top", "1px dashed #cbd5e1"], ["target", "_blank", 2, "color", "#004a99", "font-size", "0.85rem", "text-decoration", "none", "font-weight", "600", "display", "inline-flex", "align-items", "center", "gap", "5px", 3, "href"], [1, "fas", "fa-paperclip"], [2, "text-align", "center", "padding", "20px", "color", "#94a3b8", "font-style", "italic"], [1, "btn-save", 3, "click"], [1, "fas", "fa-check-circle"], ["title", "D\u00E9tails du Risque", 3, "close"], ["modal-body", "", "class", "modal-form", 4, "ngIf"], [1, "details-grid"], [1, "detail-value", "title"], [2, "margin-top", "5px"], ["style", "margin-left:5px; color:#64748b;", 4, "ngIf"], ["class", "detail-block full", 4, "ngIf"], [2, "margin-left", "5px", "color", "#64748b"], ["target", "_blank", 1, "doc-link", 3, "href"], [1, "fas", "fa-file-pdf"]], template: function AssignedRisksComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AssignedRisksComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Risques \u00E0 Traiter");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "G\u00E9rez vos risques assign\u00E9s, ajoutez des preuves de traitement et mettez \u00E0 jour l'avancement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "h3");
        i0.ɵɵelement(15, "i", 9);
        i0.ɵɵtext(16, " Vue d'ensemble de vos activit\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "span", 10);
        i0.ɵɵtext(18, "Temps R\u00E9el");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 11);
        i0.ɵɵelementStart(20, "div", 12);
        i0.ɵɵelementStart(21, "div", 13);
        i0.ɵɵelement(22, "i", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "div", 15);
        i0.ɵɵelementStart(24, "span", 16);
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "span", 17);
        i0.ɵɵtext(27, "Total Assign\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "div", 18);
        i0.ɵɵelementStart(29, "div", 19);
        i0.ɵɵelement(30, "i", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 15);
        i0.ɵɵelementStart(32, "span", 16);
        i0.ɵɵtext(33);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "span", 17);
        i0.ɵɵtext(35, "\u00C0 Traiter");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 20);
        i0.ɵɵelementStart(37, "div", 21);
        i0.ɵɵelement(38, "i", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 15);
        i0.ɵɵelementStart(40, "span", 16);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "span", 17);
        i0.ɵɵtext(43, "\u00C9ch\u00E9ance Proche");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "div", 23);
        i0.ɵɵelementStart(45, "table", 24);
        i0.ɵɵelementStart(46, "thead");
        i0.ɵɵelementStart(47, "tr");
        i0.ɵɵelementStart(48, "th");
        i0.ɵɵtext(49, "Titre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "th");
        i0.ɵɵtext(51, "Niveau");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "th");
        i0.ɵɵtext(53, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "th");
        i0.ɵɵtext(55, "Responsable du d\u00E9partement \u00E0 risque");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "th");
        i0.ɵɵtext(57, "\u00C9ch\u00E9ance");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "th");
        i0.ɵɵtext(59, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "tbody");
        i0.ɵɵtemplate(61, AssignedRisksComponent_tr_61_Template, 20, 13, "tr", 25);
        i0.ɵɵtemplate(62, AssignedRisksComponent_tr_62_Template, 5, 0, "tr", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(63, AssignedRisksComponent_app_modal_63_Template, 65, 18, "app-modal", 27);
        i0.ɵɵtemplate(64, AssignedRisksComponent_app_modal_64_Template, 2, 1, "app-modal", 28);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(25);
        i0.ɵɵtextInterpolate(ctx.stats.total);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.stats.unprocessed);
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("urgent-highlight", ctx.stats.urgent > 0);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.stats.urgent);
        i0.ɵɵadvance(20);
        i0.ɵɵproperty("ngForOf", ctx.assignedRisks);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.assignedRisks.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showTreatmentModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal);
    } }, directives: [i4.NgForOf, i4.NgIf, i5.ModalComponent, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel], pipes: [i4.DatePipe], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n\r\n      .logo-img {\r\n        height: 35px;\r\n        width: auto;\r\n        border-radius: 4px;\r\n      }\r\n\r\n      .logo {\r\n        font-family: 'Montserrat', sans-serif;\r\n        font-weight: 700;\r\n        font-size: 18px;\r\n        color: #004a99;\r\n        letter-spacing: 0.5px;\r\n        white-space: nowrap;\r\n      }\r\n    }\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\n    --p_low: 0;\n    --p_limited: 0;\n    --p_med: 0;\n    --p_high: 0;\n    --p_crit: 0;\n    width: 200px;\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.low .dot {\n        background: #3b82f6;\n      }\n\n      &.limited .dot {\n        background: #14b8a6;\n      }\n\n      &.med .dot {\n        background: #f59e0b;\n      }\n\r\n      &.high .dot {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.crit .dot {\r\n        background: #7f1d1d;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .bar-wrapper {\r\n    padding: 10px 0;\r\n  }\r\n\r\n  .bar-group {\r\n    margin-bottom: 20px;\r\n\r\n    .bar-label {\r\n      font-size: 0.9rem;\r\n      font-weight: 700;\r\n      color: #334155;\r\n      margin-bottom: 6px;\r\n    }\r\n\r\n    .bar-track {\r\n      height: 24px;\r\n      background: #f1f5f9;\r\n      border-radius: 12px;\r\n      overflow: hidden;\r\n    }\r\n\r\n    .bar-fill {\r\n      height: 100%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      padding-right: 12px;\r\n      border-radius: 12px;\r\n      transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\r\n      min-width: 30px;\r\n\r\n      .bar-value {\r\n        color: white;\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n      }\r\n\r\n      &.open,\n      &.ouvert {\n        background: #94a3b8;\n      }\n\n      &.in_progress,\n      &.en-cours {\n        background: #3b82f6;\n      }\n\n      &.treated,\n      &.traite {\n        background: #10b981; // Green\n      }\n\n      &.closed,\n      &.cloture {\n        background: #64748b; // Slate grey\n      }\n\r\n      // Audit specific statuses\r\n      &.a-venir {\r\n        background: #94a3b8;\r\n      }\r\n\r\n      &.termine {\r\n        background: #10b981;\r\n      }\r\n\r\n      &.en-retard {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.annule {\r\n        background: #64748b;\r\n      }\r\n\r\n      &.dept-fill {\r\n        background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  margin: 0 auto 2rem;\n  overflow: visible !important;\n  \n  .matrix-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 16px;\n    margin-bottom: 18px;\n    padding: 0 6px;\n\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\n  }\n\n  .matrix-subtitle {\n    margin: 6px 0 0;\n    color: #64748b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n  }\n\n  .matrix-legend {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n\n    .legend-chip {\n      font-size: 0.72rem;\n      font-weight: 700;\n      padding: 5px 10px;\n      border-radius: 999px;\n      text-transform: uppercase;\n      \n      &.green { background: #d1fae5; color: #065f46; }\n      &.yellow { background: #fef3c7; color: #92400e; }\n      &.orange { background: #ffedd5; color: #9a3412; }\n      &.red { background: #fee2e2; color: #991b1b; }\n    }\n  }\n\n  .matrix-insights {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 12px;\n    margin-bottom: 14px;\n  }\n\n  .insight-card {\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    border-radius: 14px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    min-height: 88px;\n\n    .insight-label {\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    strong {\n      font-size: 1.05rem;\n      color: #0f172a;\n      line-height: 1.3;\n    }\n\n    small {\n      color: #64748b;\n      font-size: 0.8rem;\n      line-height: 1.4;\n    }\n\n    &.highlight {\n      border-color: rgba(59, 130, 246, 0.22);\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\n    }\n\n    &.critical {\n      border-color: rgba(239, 68, 68, 0.18);\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\n    }\n  }\n\n  .matrix-footer {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n    margin-top: 12px;\n  }\n\n  .footer-note {\n    padding: 12px 14px;\n    border-radius: 12px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #475569;\n    font-size: 0.88rem;\n    line-height: 1.5;\n  }\n}\n\n.risk-matrix-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: auto auto auto;\n  gap: 10px;\n  background: white;\n  padding: 14px;\n  border-radius: 18px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\n}\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\n  grid-row: 1;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  writing-mode: initial;\n  rotate: 0deg;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n.risk-matrix-body[_ngcontent-%COMP%] {\n  grid-row: 2;\n  grid-column: 1;\n  overflow-x: auto;\n}\n\n.risk-matrix-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 780px;\n  table-layout: fixed;\n  border-spacing: 4px;\n  border-collapse: separate;\n\n  .col-axis {\n    width: 130px;\n  }\n\n  .col-impact {\n    width: calc((100% - 130px) / 4);\n  }\n\n  th, td {\n    padding: 0;\n    height: 66px;\n    border-radius: 8px;\n    vertical-align: middle;\n  }\n\n  .impact-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.85rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    padding: 8px 6px;\n    line-height: 1.2;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .prob-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.84rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    width: 130px;\n    padding: 8px 6px;\n    line-height: 1.25;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .axis-corner { border: none; background: transparent; width: 130px; }\n\n  .total-label,\n  .total-cell {\n    background: #eff6ff;\n    border: 1px solid #bfdbfe;\n    color: #1d4ed8;\n    text-align: center;\n    font-weight: 800;\n    font-size: 0.9rem;\n    padding: 8px 6px;\n  }\n\n  .total-label {\n    background: #e0f2fe;\n    border-color: #bae6fd;\n    color: #0f766e;\n  }\n\n  .cell {\n    text-align: center;\n    border: 2px solid transparent;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n    \n    &:hover {\n      transform: scale(1.03);\n      z-index: 10;\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\n      border-color: rgba(255,255,255,0.4);\n    }\n\n    &.is-clickable {\n      cursor: pointer;\n\n      &::after {\n        content: 'Voir';\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        font-size: 0.62rem;\n        font-weight: 800;\n        padding: 3px 6px;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.18);\n        color: rgba(255, 255, 255, 0.95);\n      }\n    }\n\n    .cell-content {\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 2px;\n      padding: 4px;\n    }\n\n    .cell-value {\n      font-size: 1.35rem;\n      font-weight: 900;\n      color: white;\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\n    }\n\n    .cell-meta {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.92);\n      letter-spacing: 0.03em;\n    }\n\n    \n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\n    &.cell-lightgreen .cell-meta,\n    &.cell-lightyellow .cell-meta {\n      color: #475569;\n    }\n  }\n\n  .totals-row {\n    th, td {\n      height: 46px;\n    }\n  }\n}\n\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.matrix-detail-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n  border-radius: 12px;\n\n  .summary-label {\n    display: block;\n    font-size: 0.72rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #64748b;\n    margin-bottom: 6px;\n  }\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.matrix-risk-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-height: 52vh;\n  overflow-y: auto;\n  padding-right: 4px;\n}\n\n.matrix-risk-item[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 16px;\n  background: white;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n}\n\n.risk-item-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n\n  h4 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.risk-level-badge[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 800;\n  white-space: nowrap;\n\n  &.critical {\n    background: #fee2e2;\n    color: #991b1b;\n  }\n\n  &.high {\n    background: #ffedd5;\n    color: #9a3412;\n  }\n\n  &.medium {\n    background: #fef3c7;\n    color: #92400e;\n  }\n\n  &.limited {\n    background: #ccfbf1;\n    color: #115e59;\n  }\n\n  &.low {\n    background: #d1fae5;\n    color: #065f46;\n  }\n\n  &.default {\n    background: #e2e8f0;\n    color: #475569;\n  }\n}\n\n.risk-item-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.risk-item-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px 14px;\n  color: #334155;\n  font-size: 0.88rem;\n}\n\n.empty-matrix-detail[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\n  grid-row: 3;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n@media (max-width: 1100px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    .matrix-insights {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n\n    .matrix-footer {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n\n    .matrix-header {\n      flex-direction: column;\n    }\n\n    .matrix-insights {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .risk-matrix-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    writing-mode: initial;\n    rotate: 0deg;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n\n  .risk-matrix-body[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}", ".assigned-risks-page[_ngcontent-%COMP%] {\n        padding: 30px;\n        background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);\n        min-height: 100vh;\n        font-family: 'Inter', sans-serif;\n    }\n\n    .page-header[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 30px;\n        background: rgba(255, 255, 255, 0.85);\n        backdrop-filter: blur(12px);\n        border-radius: 18px;\n        padding: 20px 28px;\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n        border: 1px solid rgba(255, 255, 255, 0.5);\n    }\n\n    .header-left[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n    }\n\n    .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 1.4rem;\n        font-weight: 700;\n        color: #1e293b;\n        margin: 0;\n    }\n\n    .header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        font-size: 0.85rem;\n        color: #64748b;\n        margin: 4px 0 0;\n    }\n\n    .back-btn[_ngcontent-%COMP%] {\n        width: 38px;\n        height: 38px;\n        border-radius: 10px;\n        border: 1px solid #e2e8f0;\n        background: white;\n        color: #475569;\n        cursor: pointer;\n        font-size: 1rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: all 0.2s;\n    }\n\n    .back-btn[_ngcontent-%COMP%]:hover {\n        background: #f1f5f9;\n        color: #0f172a;\n    }\n\n    \n    .risks-card[_ngcontent-%COMP%] {\n        background: white;\n        border-radius: 18px;\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n        overflow: hidden;\n    }\n\n    .risks-table[_ngcontent-%COMP%] {\n        width: 100%;\n        border-collapse: collapse;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n        border-bottom: 2px solid #e2e8f0;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        padding: 14px 16px;\n        text-align: left;\n        font-size: 0.72rem;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n        border-bottom: 1px solid #f1f5f9;\n        transition: background 0.15s;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n        background: #f8fafc;\n    }\n\n    .risks-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n        padding: 14px 16px;\n        font-size: 0.88rem;\n        color: #334155;\n        vertical-align: middle;\n    }\n\n    .td-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: #1e293b;\n    }\n\n    .empty-state[_ngcontent-%COMP%] {\n        text-align: center;\n        padding: 60px 20px;\n        color: #94a3b8;\n    }\n\n    .empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        font-size: 2.5rem;\n        margin-bottom: 10px;\n        display: block;\n    }\n\n    \n    .badge[_ngcontent-%COMP%] {\n        padding: 5px 12px;\n        border-radius: 20px;\n        font-size: 0.73rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        white-space: nowrap;\n        display: inline-block;\n    }\n\n    .level-Faible[_ngcontent-%COMP%] {\n        background: #dcfce7;\n        color: #166534;\n    }\n\n    .level-Moyen[_ngcontent-%COMP%] {\n        background: #fef9c3;\n        color: #854d0e;\n    }\n\n    .level-\u00C9lev\u00E9[_ngcontent-%COMP%] {\n        background: #ffedd5;\n        color: #9a3412;\n    }\n\n    .level-Critique[_ngcontent-%COMP%] {\n        background: #fee2e2;\n        color: #991b1b;\n    }\n\n\n    .status-Ouvert[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #64748b;\n    }\n\n    .status-En-cours[_ngcontent-%COMP%] {\n        background: #eff6ff;\n        color: #1d4ed8;\n    }\n\n    .status-Trait\u00E9[_ngcontent-%COMP%] {\n        background: #f5f3ff;\n        color: #5b21b6;\n    }\n\n    .status-Cl\u00F4tur\u00E9[_ngcontent-%COMP%] {\n        background: #f1f5f9;\n        color: #64748b;\n    }\n\n    \n    .actions-cell[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 6px;\n    }\n\n    .action-btn[_ngcontent-%COMP%] {\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        border: none;\n        cursor: pointer;\n        font-size: 0.8rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: all 0.2s;\n    }\n\n    .btn-view[_ngcontent-%COMP%] {\n        background: #eff6ff;\n        color: #1d4ed8;\n    }\n\n    .btn-view[_ngcontent-%COMP%]:hover {\n        background: #dbeafe;\n    }\n\n    .btn-edit[_ngcontent-%COMP%] {\n        background: #f0fdf4;\n        color: #15803d;\n    }\n\n    .btn-edit[_ngcontent-%COMP%]:hover {\n        background: #dcfce7;\n    }\n\n    \n    .modal-form[_ngcontent-%COMP%] {\n        padding: 4px 0;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n    }\n\n    .finput[_ngcontent-%COMP%] {\n        padding: 10px 12px;\n        border-radius: 10px;\n        border: 1.5px solid #e2e8f0;\n        font-size: 0.9rem;\n        color: #1e293b;\n        background: #f8fafc;\n        width: 100%;\n        box-sizing: border-box;\n        transition: border-color 0.2s, box-shadow 0.2s;\n    }\n\n    .finput[_ngcontent-%COMP%]:focus {\n        border-color: #004a99;\n        box-shadow: 0 0 0 3px rgba(0, 74, 153, 0.08);\n        outline: none;\n    }\n\n    .form-footer[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-end;\n        gap: 10px;\n        margin-top: 24px;\n        padding-top: 18px;\n        border-top: 1px solid #f1f5f9;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%] {\n        padding: 10px 20px;\n        border-radius: 10px;\n        border: 1.5px solid #e2e8f0;\n        background: white;\n        color: #64748b;\n        cursor: pointer;\n        font-weight: 600;\n        transition: all 0.2s;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%]:hover {\n        background: #f8fafc;\n    }\n\n    .btn-save[_ngcontent-%COMP%] {\n        padding: 10px 24px;\n        border-radius: 10px;\n        border: none;\n        background: linear-gradient(135deg, #004a99, #0066cc);\n        color: white;\n        cursor: pointer;\n        font-weight: 600;\n        font-size: 0.95rem;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        transition: all 0.2s;\n    }\n\n    .btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 12px rgba(0, 74, 153, 0.3);\n    }\n\n    .btn-save[_ngcontent-%COMP%]:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n    }\n\n    \n    .details-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 16px;\n    }\n\n    .detail-block[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        padding: 12px;\n        background: #f8fafc;\n        border-radius: 10px;\n    }\n\n    .detail-block.full[_ngcontent-%COMP%] {\n        grid-column: span 2;\n    }\n\n    .detail-label[_ngcontent-%COMP%] {\n        font-size: 0.72rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        color: #94a3b8;\n        letter-spacing: 0.5px;\n    }\n\n    .detail-value[_ngcontent-%COMP%] {\n        margin: 0;\n        color: #1e293b;\n        font-size: 0.92rem;\n        line-height: 1.5;\n    }\n\n    .detail-value.title[_ngcontent-%COMP%] {\n        font-size: 1.1rem;\n        font-weight: 700;\n    }\n\n    .doc-link[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        color: #004a99;\n        text-decoration: none;\n        font-size: 0.88rem;\n        font-weight: 600;\n        padding: 8px 14px;\n        background: #eff6ff;\n        border-radius: 8px;\n        margin-top: 4px;\n        transition: background 0.2s;\n    }\n\n    .doc-link[_ngcontent-%COMP%]:hover {\n        background: #dbeafe;\n    }\n\n    .comment-item[_ngcontent-%COMP%] {\n        background: #f8fafc;\n        border: 1px solid #e2e8f0;\n        border-radius: 10px;\n        padding: 15px;\n        margin-bottom: 15px;\n        transition: transform 0.2s;\n    }\n\n    .comment-item[_ngcontent-%COMP%]:hover {\n        transform: translateX(3px);\n        border-color: #004a99;\n    }\n\n    \n    .urgent-highlight[_ngcontent-%COMP%] {\n        border-color: #ef4444 !important;\n        background: #fffafa !important;\n        animation: pulse-border 2s infinite;\n    }\n\n    @keyframes pulse-border {\n        0% {\n            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);\n        }\n\n        70% {\n            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);\n        }\n\n        100% {\n            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);\n        }\n    }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssignedRisksComponent, [{
        type: Component,
        args: [{
                selector: 'app-assigned-risks',
                templateUrl: './assigned-risks.component.html',
                styleUrls: ['../../../dashboard.component.scss']
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }, { type: i3.AuthService }]; }, null); })();
//# sourceMappingURL=assigned-risks.component.js.map