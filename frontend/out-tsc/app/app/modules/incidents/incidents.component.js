import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { IncidentService, IncidentStatus, IncidentNiveauRisque } from '../../core/services/incident.service';
import { DepartmentService } from '../../core/services/department.service';
import { RiskService } from '../../core/services/risk.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { UserRole } from '../../core/models/user-role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/incident.service";
import * as i3 from "../../core/services/department.service";
import * as i4 from "../../core/services/risk.service";
import * as i5 from "../../core/services/auth.service";
import * as i6 from "@angular/common";
import * as i7 from "../../shared/modal/modal.component";
function IncidentsComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function IncidentsComponent_button_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.openCreateModal(); });
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2, " Declarer un Incident ");
    i0.ɵɵelementEnd();
} }
function IncidentsComponent_button_49_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function IncidentsComponent_button_49_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.clearFilters(); });
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function IncidentsComponent_tr_74_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function IncidentsComponent_tr_74_button_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.openEditModal(incident_r11); });
    i0.ɵɵelement(1, "i", 40);
    i0.ɵɵelementEnd();
} }
function IncidentsComponent_tr_74_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 33);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 34);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelementStart(13, "span", 34);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 35);
    i0.ɵɵelementStart(18, "button", 36);
    i0.ɵɵlistener("click", function IncidentsComponent_tr_74_Template_button_click_18_listener() { const restoredCtx = i0.ɵɵrestoreView(_r17); const incident_r11 = restoredCtx.$implicit; const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.openDetailsModal(incident_r11); });
    i0.ɵɵelement(19, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, IncidentsComponent_tr_74_button_20_Template, 2, 0, "button", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(incident_r11.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(incident_r11.domaine || "Non defini");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.getNiveauClass(incident_r11));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", incident_r11.niveauRisqueLabel || ctx_r2.levelLabelMap[incident_r11.niveauRisque] || incident_r11.niveauRisque || "-", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 10, incident_r11.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r2.getStatusClass(incident_r11));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(incident_r11.statutLabel || ctx_r2.statusLabelMap[incident_r11.statut] || incident_r11.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", incident_r11.declareur == null ? null : incident_r11.declareur.prenom, " ", incident_r11.declareur == null ? null : incident_r11.declareur.nom, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !ctx_r2.isReadOnlyRole);
} }
function IncidentsComponent_tr_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 41);
    i0.ɵɵelement(2, "i", 42);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun incident n'est enregistre pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentsComponent_app_modal_76_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 77);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r19.importMessage);
} }
function IncidentsComponent_app_modal_76_div_22_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r27 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(warning_r27);
} }
function IncidentsComponent_app_modal_76_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵtemplate(1, IncidentsComponent_app_modal_76_div_22_p_1_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r20.importWarnings);
} }
function IncidentsComponent_app_modal_76_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2, "Apercu OCR");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r21.importPreview);
} }
function IncidentsComponent_app_modal_76_option_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r28 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r28.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r28.nom);
} }
function IncidentsComponent_app_modal_76_option_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r29 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r29.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", r_r29.titre, " (", r_r29.niveauRisque, ")");
} }
function IncidentsComponent_app_modal_76_i_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function IncidentsComponent_app_modal_76_i_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 81);
} }
function IncidentsComponent_app_modal_76_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 43);
    i0.ɵɵlistener("close", function IncidentsComponent_app_modal_76_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r31); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.showCreateModal = false; });
    i0.ɵɵelementStart(1, "div", 44, 45);
    i0.ɵɵelementStart(3, "form", 46);
    i0.ɵɵlistener("ngSubmit", function IncidentsComponent_app_modal_76_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r31); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.submitIncident(); });
    i0.ɵɵelementStart(4, "div", 47);
    i0.ɵɵelementStart(5, "div", 48);
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7, "Creer depuis un document");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Importez un Excel, PDF ou une image. Pour une fiche manuscrite, utilisez le scan photo pour un OCR plus prudent.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 49);
    i0.ɵɵelementStart(11, "input", 50);
    i0.ɵɵlistener("change", function IncidentsComponent_app_modal_76_Template_input_change_11_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.onImportFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 51);
    i0.ɵɵlistener("change", function IncidentsComponent_app_modal_76_Template_input_change_12_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.onImportFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label", 52);
    i0.ɵɵelement(14, "i", 53);
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "label", 54);
    i0.ɵɵelement(18, "i", 53);
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, IncidentsComponent_app_modal_76_p_21_Template, 2, 1, "p", 55);
    i0.ɵɵtemplate(22, IncidentsComponent_app_modal_76_div_22_Template, 2, 1, "div", 56);
    i0.ɵɵtemplate(23, IncidentsComponent_app_modal_76_div_23_Template, 5, 1, "div", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 58);
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "Titre de l'incident ");
    i0.ɵɵelementStart(27, "span", 59);
    i0.ɵɵtext(28, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 58);
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, "Description ");
    i0.ɵɵelementStart(33, "span", 59);
    i0.ɵɵtext(34, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "textarea", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 58);
    i0.ɵɵelementStart(37, "label");
    i0.ɵɵtext(38, "Domaine (Optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 58);
    i0.ɵɵelementStart(41, "label");
    i0.ɵɵtext(42, "Departement concerne (Optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "select", 63);
    i0.ɵɵelementStart(44, "option", 17);
    i0.ɵɵtext(45, "Selectionnez un departement...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(46, IncidentsComponent_app_modal_76_option_46_Template, 2, 2, "option", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 58);
    i0.ɵɵelementStart(48, "label");
    i0.ɵɵtext(49, "Niveau (Optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "select", 65);
    i0.ɵɵelementStart(51, "option", 16);
    i0.ɵɵtext(52, "Selectionnez un niveau...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "option", 17);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "option", 17);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "option", 17);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "option", 17);
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "option", 17);
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "option", 17);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 58);
    i0.ɵɵelementStart(66, "label");
    i0.ɵɵtext(67, "Date de survenance ");
    i0.ɵɵelementStart(68, "span", 59);
    i0.ɵɵtext(69, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(70, "input", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "div", 58);
    i0.ɵɵelementStart(72, "label");
    i0.ɵɵtext(73, "Lien avec un Risque (Optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "select", 67);
    i0.ɵɵelementStart(75, "option", 17);
    i0.ɵɵtext(76, "Aucun lien direct");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(77, IncidentsComponent_app_modal_76_option_77_Template, 2, 3, "option", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "div", 58);
    i0.ɵɵelementStart(79, "label");
    i0.ɵɵtext(80, "Piece jointe (Optionnelle)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "div", 68);
    i0.ɵɵelementStart(82, "input", 69);
    i0.ɵɵlistener("change", function IncidentsComponent_app_modal_76_Template_input_change_82_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "div", 70);
    i0.ɵɵelement(84, "i", 71);
    i0.ɵɵtext(85);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "div", 72);
    i0.ɵɵelementStart(87, "button", 73);
    i0.ɵɵlistener("click", function IncidentsComponent_app_modal_76_Template_button_click_87_listener() { i0.ɵɵrestoreView(_r31); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.showCreateModal = false; });
    i0.ɵɵtext(88, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "button", 74);
    i0.ɵɵtemplate(90, IncidentsComponent_app_modal_76_i_90_Template, 1, 0, "i", 75);
    i0.ɵɵtemplate(91, IncidentsComponent_app_modal_76_i_91_Template, 1, 0, "i", 76);
    i0.ɵɵtext(92, " Enregistrer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r4.incidentForm);
    i0.ɵɵadvance(10);
    i0.ɵɵclassProp("loading", ctx_r4.isImporting);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("fa-file-import", !ctx_r4.isImporting)("fa-circle-notch", ctx_r4.isImporting)("fa-spin", ctx_r4.isImporting);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.isImporting ? "Analyse..." : "Importer un document");
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("loading", ctx_r4.isImporting);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("fa-camera", !ctx_r4.isImporting)("fa-circle-notch", ctx_r4.isImporting)("fa-spin", ctx_r4.isImporting);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.isImporting ? "Analyse..." : "Scanner une fiche manuscrite");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.importMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.importWarnings.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.importPreview);
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.departments);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.LOW);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.LOW]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.LIMITED);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.LIMITED]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.MEDIUM);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.MEDIUM]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.HIGH);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.HIGH]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.SIGNIFICANT);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.SIGNIFICANT]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r4.IncidentNiveauRisque.CRITICAL);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.levelLabelMap[ctx_r4.IncidentNiveauRisque.CRITICAL]);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.risks);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.selectedFile ? ctx_r4.selectedFile.name : "Choisir un fichier (Excel, PDF, Word, Images)", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r4.incidentForm.invalid || ctx_r4.isSubmitting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r4.isSubmitting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.isSubmitting);
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 90);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r41 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r41.selectedIncident.domaine);
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Niveau d'Impact Global");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 90);
    i0.ɵɵelementStart(4, "span", 34);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r42 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r42.getNiveauClass(ctx_r42.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r42.selectedIncident.niveauRisqueLabel || ctx_r42.levelLabelMap[ctx_r42.selectedIncident.niveauRisque] || ctx_r42.selectedIncident.niveauRisque, " ");
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Macro-Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 90);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r43 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r43.selectedIncident.macroProcessus);
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 90);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r44 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r44.selectedIncident.processus);
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Plan d'Action / Remediation Initiale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r45 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r45.selectedIncident.planActionTraitement);
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Date limite du plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 90);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r46 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r46.selectedIncident.dateEcheance, "dd/MM/yyyy"));
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Risque Associe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 96);
    i0.ɵɵelement(4, "i", 97);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r47 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r47.getRiskTitle(ctx_r47.selectedIncident.riskId), " ");
} }
function IncidentsComponent_app_modal_77_div_1_ng_container_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "div", 93);
    i0.ɵɵtemplate(2, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_2_Template, 5, 1, "div", 94);
    i0.ɵɵtemplate(3, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_3_Template, 6, 2, "div", 94);
    i0.ɵɵtemplate(4, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_4_Template, 5, 1, "div", 94);
    i0.ɵɵtemplate(5, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_5_Template, 5, 1, "div", 94);
    i0.ɵɵtemplate(6, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_6_Template, 5, 1, "div", 91);
    i0.ɵɵtemplate(7, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_7_Template, 6, 4, "div", 94);
    i0.ɵɵtemplate(8, IncidentsComponent_app_modal_77_div_1_ng_container_25_div_8_Template, 6, 1, "div", 91);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r39 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.domaine);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.macroProcessus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.processus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.planActionTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.dateEcheance);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r39.selectedIncident.riskId);
} }
function IncidentsComponent_app_modal_77_div_1_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵelementStart(1, "span", 86);
    i0.ɵɵtext(2, "Piece Jointe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 98);
    i0.ɵɵelement(4, "i", 99);
    i0.ɵɵtext(5, " Telecharger le document ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r40 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", ctx_r40.environment.serverUrl + "/" + ctx_r40.selectedIncident.pieceJointe + ctx_r40.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function IncidentsComponent_app_modal_77_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44, 45);
    i0.ɵɵelementStart(2, "div", 84);
    i0.ɵɵelementStart(3, "div", 85);
    i0.ɵɵelementStart(4, "span", 86);
    i0.ɵɵtext(5, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 87);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 85);
    i0.ɵɵelementStart(9, "span", 86);
    i0.ɵɵtext(10, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 88);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 89);
    i0.ɵɵelementStart(14, "span", 86);
    i0.ɵɵtext(15, "Date de survenance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 90);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 89);
    i0.ɵɵelementStart(20, "span", 86);
    i0.ɵɵtext(21, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 90);
    i0.ɵɵelementStart(23, "span", 34);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, IncidentsComponent_app_modal_77_div_1_ng_container_25_Template, 9, 7, "ng-container", 25);
    i0.ɵɵtemplate(26, IncidentsComponent_app_modal_77_div_1_div_26_Template, 6, 1, "div", 91);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 72);
    i0.ɵɵelementStart(28, "button", 92);
    i0.ɵɵlistener("click", function IncidentsComponent_app_modal_77_div_1_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r49); const ctx_r48 = i0.ɵɵnextContext(2); return ctx_r48.showDetailsModal = false; });
    i0.ɵɵtext(29, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r37 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r37.selectedIncident.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r37.selectedIncident.description);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 7, ctx_r37.selectedIncident.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngClass", ctx_r37.getStatusClass(ctx_r37.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r37.selectedIncident.statutLabel || ctx_r37.statusLabelMap[ctx_r37.selectedIncident.statut] || ctx_r37.selectedIncident.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.selectedIncident.domaine || ctx_r37.selectedIncident.niveauRisque || ctx_r37.selectedIncident.planActionTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.selectedIncident.pieceJointe);
} }
function IncidentsComponent_app_modal_77_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 82);
    i0.ɵɵlistener("close", function IncidentsComponent_app_modal_77_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(); return ctx_r50.showDetailsModal = false; });
    i0.ɵɵtemplate(1, IncidentsComponent_app_modal_77_div_1_Template, 30, 10, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident);
} }
function IncidentsComponent_app_modal_78_option_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r57 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r57.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r57.nom);
} }
function IncidentsComponent_app_modal_78_option_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r58 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r58.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", r_r58.titre, " (", r_r58.niveauRisque, ")");
} }
function IncidentsComponent_app_modal_78_i_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function IncidentsComponent_app_modal_78_i_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 81);
} }
function IncidentsComponent_app_modal_78_Template(rf, ctx) { if (rf & 1) {
    const _r60 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 100);
    i0.ɵɵlistener("close", function IncidentsComponent_app_modal_78_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r60); const ctx_r59 = i0.ɵɵnextContext(); return ctx_r59.showEditModal = false; });
    i0.ɵɵelementStart(1, "div", 44, 45);
    i0.ɵɵelementStart(3, "form", 46);
    i0.ɵɵlistener("ngSubmit", function IncidentsComponent_app_modal_78_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r60); const ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.updateIncident(); });
    i0.ɵɵelementStart(4, "div", 58);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Titre de l'incident ");
    i0.ɵɵelementStart(7, "span", 59);
    i0.ɵɵtext(8, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "input", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 58);
    i0.ɵɵelementStart(11, "label");
    i0.ɵɵtext(12, "Description ");
    i0.ɵɵelementStart(13, "span", 59);
    i0.ɵɵtext(14, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "textarea", 102);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 58);
    i0.ɵɵelementStart(17, "label");
    i0.ɵɵtext(18, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 103);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 58);
    i0.ɵɵelementStart(21, "label");
    i0.ɵɵtext(22, "Departement concerne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "select", 63);
    i0.ɵɵelementStart(24, "option", 17);
    i0.ɵɵtext(25, "Selectionnez un departement...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(26, IncidentsComponent_app_modal_78_option_26_Template, 2, 2, "option", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 58);
    i0.ɵɵelementStart(28, "label");
    i0.ɵɵtext(29, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 65);
    i0.ɵɵelementStart(31, "option", 16);
    i0.ɵɵtext(32, "Selectionnez un niveau...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 17);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 17);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 17);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 17);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 17);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 17);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 58);
    i0.ɵɵelementStart(46, "label");
    i0.ɵɵtext(47, "Date de survenance ");
    i0.ɵɵelementStart(48, "span", 59);
    i0.ɵɵtext(49, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(50, "input", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 58);
    i0.ɵɵelementStart(52, "label");
    i0.ɵɵtext(53, "Lien avec un Risque (Optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "select", 67);
    i0.ɵɵelementStart(55, "option", 17);
    i0.ɵɵtext(56, "Aucun lien direct");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(57, IncidentsComponent_app_modal_78_option_57_Template, 2, 3, "option", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 58);
    i0.ɵɵelementStart(59, "label");
    i0.ɵɵtext(60, "Statut ");
    i0.ɵɵelementStart(61, "span", 59);
    i0.ɵɵtext(62, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "select", 104);
    i0.ɵɵelementStart(64, "option", 17);
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "option", 17);
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "option", 17);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "option", 17);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 72);
    i0.ɵɵelementStart(73, "button", 73);
    i0.ɵɵlistener("click", function IncidentsComponent_app_modal_78_Template_button_click_73_listener() { i0.ɵɵrestoreView(_r60); const ctx_r62 = i0.ɵɵnextContext(); return ctx_r62.showEditModal = false; });
    i0.ɵɵtext(74, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "button", 74);
    i0.ɵɵtemplate(76, IncidentsComponent_app_modal_78_i_76_Template, 1, 0, "i", 75);
    i0.ɵɵtemplate(77, IncidentsComponent_app_modal_78_i_77_Template, 1, 0, "i", 76);
    i0.ɵɵtext(78, " Mettre a jour ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r6.incidentForm);
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r6.departments);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.LOW);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.LOW]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.LIMITED);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.LIMITED]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.MEDIUM);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.MEDIUM]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.HIGH);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.HIGH]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.SIGNIFICANT);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.SIGNIFICANT]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentNiveauRisque.CRITICAL);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.levelLabelMap[ctx_r6.IncidentNiveauRisque.CRITICAL]);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r6.risks);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r6.IncidentStatus.NOUVEAU);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.statusLabelMap[ctx_r6.IncidentStatus.NOUVEAU]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.statusLabelMap[ctx_r6.IncidentStatus.EN_COURS]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentStatus.TRAITE);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.statusLabelMap[ctx_r6.IncidentStatus.TRAITE]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.IncidentStatus.CLOS);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.statusLabelMap[ctx_r6.IncidentStatus.CLOS]);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r6.incidentForm.invalid || ctx_r6.isSubmitting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isSubmitting);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.isSubmitting);
} }
export class IncidentsComponent {
    constructor(fb, incidentService, departmentService, riskService, authService, location) {
        this.fb = fb;
        this.incidentService = incidentService;
        this.departmentService = departmentService;
        this.riskService = riskService;
        this.authService = authService;
        this.location = location;
        this.incidents = [];
        this.departments = [];
        this.risks = [];
        this.filteredIncidents = [];
        this.environment = environment;
        // Filter properties
        this.filterSearch = '';
        this.filterStatus = '';
        this.filterLevel = '';
        // Modals state
        this.showCreateModal = false;
        this.showDetailsModal = false;
        this.showEditModal = false;
        this.selectedFile = null;
        this.isSubmitting = false;
        this.isImporting = false;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        // Selected state
        this.selectedIncident = null;
        // Expose Enums to templates
        this.IncidentStatus = IncidentStatus;
        this.IncidentNiveauRisque = IncidentNiveauRisque;
        // Label mappings for UI 
        this.statusLabelMap = {
            [IncidentStatus.NOUVEAU]: 'Nouveau',
            [IncidentStatus.EN_COURS]: 'En cours',
            [IncidentStatus.TRAITE]: 'Traité',
            [IncidentStatus.CLOS]: 'Clos'
        };
        this.levelLabelMap = {
            [IncidentNiveauRisque.LOW]: 'Faible',
            [IncidentNiveauRisque.LIMITED]: 'Limité',
            [IncidentNiveauRisque.MEDIUM]: 'Moyen',
            [IncidentNiveauRisque.SIGNIFICANT]: 'Significatif',
            [IncidentNiveauRisque.HIGH]: 'Élevé',
            [IncidentNiveauRisque.CRITICAL]: 'Critique'
        };
        this.incidentForm = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            domaine: ['', []],
            niveauRisque: [''],
            departementId: [null, []],
            dateSurvenance: ['', Validators.required],
            statut: [IncidentStatus.NOUVEAU, Validators.required],
            riskId: [null]
        });
    }
    get authQueryToken() {
        const token = this.authService.getToken();
        return token ? `?token=${token}` : '';
    }
    get currentUserRole() {
        return this.authService.getUserRole();
    }
    get isReadOnlyRole() {
        return this.currentUserRole === UserRole.TOP_MANAGEMENT;
    }
    ngOnInit() {
        this.loadIncidents();
        this.loadDepartments();
        this.loadRisks();
    }
    loadIncidents() {
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                this.incidents = data;
                this.applyFilters();
            },
            error: (err) => console.error('Erreur chargement incidents:', err)
        });
    }
    applyFilters() {
        this.filteredIncidents = this.incidents.filter(incident => {
            const matchSearch = !this.filterSearch ||
                incident.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                incident.description.toLowerCase().includes(this.filterSearch.toLowerCase());
            const incidentStatut = (incident.statutCode || incident.statut || '').toLowerCase();
            const filterStatut = (this.filterStatus || '').toLowerCase();
            const matchStatus = !filterStatut || incidentStatut === filterStatut;
            const incidentLevel = (incident.niveauRisqueCode || incident.niveauRisque || '').toLowerCase();
            const filterLevel = (this.filterLevel || '').toLowerCase();
            const matchLevel = !filterLevel || incidentLevel === filterLevel;
            return matchSearch && matchStatus && matchLevel;
        });
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.filterLevel = '';
        this.applyFilters();
    }
    loadDepartments() {
        this.departmentService.getAll().subscribe(d => this.departments = d);
    }
    loadRisks() {
        this.riskService.getRisks().subscribe(r => this.risks = r);
    }
    goBack() {
        this.location.back();
    }
    openCreateModal() {
        if (this.isReadOnlyRole) {
            return;
        }
        this.incidentForm.reset({ statut: IncidentStatus.NOUVEAU });
        this.selectedFile = null;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        this.showCreateModal = true;
    }
    openDetailsModal(incident) {
        this.selectedIncident = incident;
        this.showDetailsModal = true;
    }
    onFileSelected(event) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
        }
    }
    onImportFileSelected(event) {
        var _a, _b;
        const file = (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (!file) {
            return;
        }
        this.isImporting = true;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        this.incidentService.importIncidentDraft(file).subscribe({
            next: (draft) => {
                this.applyImportedDraft(draft);
                this.selectedFile = file;
                this.isImporting = false;
                this.importWarnings = draft.warnings || [];
                this.importPreview = draft.extractedTextPreview || '';
                this.importMessage = this.buildImportMessage(draft);
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.isImporting = false;
                this.importMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Import impossible pour ce fichier.';
            }
        });
        event.target.value = '';
    }
    applyImportedDraft(draft) {
        const patch = {};
        if (draft.titre)
            patch['titre'] = draft.titre;
        if (draft.description)
            patch['description'] = draft.description;
        if (draft.domaine)
            patch['domaine'] = draft.domaine;
        if (draft.niveauRisque)
            patch['niveauRisque'] = this.normalizeLevel(draft.niveauRisque);
        if (draft.departementId !== undefined && draft.departementId !== null)
            patch['departementId'] = draft.departementId;
        if (draft.dateSurvenance)
            patch['dateSurvenance'] = draft.dateSurvenance;
        this.incidentForm.patchValue(patch);
    }
    buildImportMessage(draft) {
        if (draft.sourceType === 'image-scan') {
            return draft.importReliability === 'low'
                ? 'Scan manuscrit analyse. Les champs peu fiables ont ete laisses vides pour verification.'
                : 'Scan manuscrit analyse et formulaire prerempli avec les champs reconnus.';
        }
        if (draft.importReliability === 'low') {
            return 'Document analyse avec prudence. Verifiez les champs proposes avant validation.';
        }
        return draft.departementId
            ? 'Le formulaire a ete prerempli a partir du document importe.'
            : `Le formulaire a ete prerempli. Departement a confirmer${draft.departementNom ? `: ${draft.departementNom}` : ''}.`;
    }
    normalizeLevel(level) {
        if (!level)
            return '';
        const normalized = level.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (normalized.includes('critique'))
            return IncidentNiveauRisque.CRITICAL;
        if (normalized.includes('significatif'))
            return IncidentNiveauRisque.SIGNIFICANT;
        if (normalized.includes('eleve'))
            return IncidentNiveauRisque.HIGH;
        if (normalized.includes('moyen'))
            return IncidentNiveauRisque.MEDIUM;
        if (normalized.includes('limit'))
            return IncidentNiveauRisque.LIMITED;
        if (normalized.includes('faible'))
            return IncidentNiveauRisque.LOW;
        return level;
    }
    submitIncident() {
        if (this.isReadOnlyRole || this.incidentForm.invalid)
            return;
        this.isSubmitting = true;
        const formData = new FormData();
        const rawValues = this.incidentForm.getRawValue();
        Object.keys(rawValues).forEach(key => {
            if (rawValues[key] !== null && rawValues[key] !== undefined) {
                formData.append(key, rawValues[key]);
            }
        });
        if (this.selectedFile) {
            formData.append('pieceJointe', this.selectedFile);
        }
        this.incidentService.createIncident(formData).subscribe({
            next: (res) => {
                this.incidents.unshift(res);
                this.isSubmitting = false;
                this.showCreateModal = false;
            },
            error: (err) => {
                console.error('Erreur création', err);
                this.isSubmitting = false;
            }
        });
    }
    openEditModal(incident) {
        if (this.isReadOnlyRole) {
            return;
        }
        this.selectedIncident = incident;
        const formattedDate = typeof incident.dateSurvenance === 'string'
            ? incident.dateSurvenance.split('T')[0]
            : new Date(incident.dateSurvenance).toISOString().split('T')[0];
        this.incidentForm.reset({
            titre: incident.titre,
            description: incident.description,
            domaine: incident.domaine || '',
            niveauRisque: this.normalizeLevel(incident.niveauRisque),
            departementId: incident.departementId || null,
            dateSurvenance: formattedDate,
            statut: incident.statut,
            riskId: incident.riskId || null
        });
        this.showEditModal = true;
    }
    updateIncident() {
        if (this.isReadOnlyRole || this.incidentForm.invalid || !this.selectedIncident)
            return;
        this.isSubmitting = true;
        const data = this.incidentForm.getRawValue();
        this.incidentService.updateIncident(this.selectedIncident.id, data).subscribe({
            next: (res) => {
                // Remplacer l'incident dans la liste
                const index = this.incidents.findIndex(i => i.id === res.id);
                if (index !== -1) {
                    this.incidents[index] = res;
                }
                this.isSubmitting = false;
                this.showEditModal = false;
            },
            error: (err) => {
                console.error('Erreur modification incident', err);
                this.isSubmitting = false;
            }
        });
    }
    getStatusClass(incident) {
        const status = (incident === null || incident === void 0 ? void 0 : incident.statutCode) || (incident === null || incident === void 0 ? void 0 : incident.statut);
        switch (status) {
            case IncidentStatus.NOUVEAU: return 'bg-blue-100 text-blue-800';
            case IncidentStatus.EN_COURS: return 'bg-yellow-100 text-yellow-800';
            case IncidentStatus.TRAITE: return 'bg-green-100 text-green-800';
            case IncidentStatus.CLOS: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    getNiveauClass(incident) {
        const niveau = (incident === null || incident === void 0 ? void 0 : incident.niveauRisqueCode) || (incident === null || incident === void 0 ? void 0 : incident.niveauRisque);
        switch (niveau) {
            case IncidentNiveauRisque.CRITICAL: return 'badge-danger';
            case IncidentNiveauRisque.SIGNIFICANT:
            case IncidentNiveauRisque.HIGH: return 'badge-warning';
            case IncidentNiveauRisque.MEDIUM: return 'badge-info';
            case IncidentNiveauRisque.LOW:
            case IncidentNiveauRisque.LIMITED: return 'badge-success';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    getRiskTitle(riskId) {
        if (!riskId)
            return 'Non défini';
        const risk = this.risks.find(r => r.id === riskId);
        return risk ? risk.titre : `Risque #${riskId}`;
    }
}
IncidentsComponent.ɵfac = function IncidentsComponent_Factory(t) { return new (t || IncidentsComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.IncidentService), i0.ɵɵdirectiveInject(i3.DepartmentService), i0.ɵɵdirectiveInject(i4.RiskService), i0.ɵɵdirectiveInject(i5.AuthService), i0.ɵɵdirectiveInject(i6.Location)); };
IncidentsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentsComponent, selectors: [["app-incidents"]], decls: 79, vars: 31, consts: [[1, "incidents-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-exclamation-triangle"], [1, "header-actions"], ["class", "btn-primary", 3, "click", 4, "ngIf"], [1, "content-container"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-tasks"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], [1, "fas", "fa-layer-group"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "risks-card"], [1, "risks-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["title", "Declarer un Nouvel Incident", 3, "close", 4, "ngIf"], ["title", "Details de l'incident", 3, "close", 4, "ngIf"], ["title", "Editer l'incident", 3, "close", 4, "ngIf"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-plus"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "td-title"], [1, "badge", 3, "ngClass"], [1, "actions-cell"], ["title", "Voir details", 1, "action-btn", "btn-view", 3, "click"], [1, "fas", "fa-eye"], ["class", "action-btn btn-edit", "title", "Editer l'incident", 3, "click", 4, "ngIf"], ["title", "Editer l'incident", 1, "action-btn", "btn-edit", 3, "click"], [1, "fas", "fa-edit"], ["colspan", "5", 1, "empty-state"], [1, "fas", "fa-inbox"], ["title", "Declarer un Nouvel Incident", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [3, "formGroup", "ngSubmit"], [1, "import-box", "mb-3"], [1, "import-box-copy"], [1, "import-box-actions"], ["type", "file", "id", "incidentCreateImportInput", "hidden", "", "accept", ".xls,.xlsx,.xlsm,.pdf,.jpg,.jpeg,.png", 3, "change"], ["type", "file", "id", "incidentCreateScanInput", "hidden", "", "accept", "image/*", "capture", "environment", 3, "change"], ["for", "incidentCreateImportInput", 1, "btn-secondary", "import-trigger"], [1, "fas"], ["for", "incidentCreateScanInput", 1, "btn-secondary", "import-trigger", "scan-trigger"], ["class", "import-feedback", 4, "ngIf"], ["class", "import-warning-list", 4, "ngIf"], ["class", "import-preview", 4, "ngIf"], [1, "form-group", "mb-3"], [1, "text-danger"], ["type", "text", "formControlName", "titre", "placeholder", "Ex: Panne de serveur principal", 1, "finput"], ["formControlName", "description", "rows", "4", "placeholder", "Details de l'incident...", 1, "finput"], ["type", "text", "formControlName", "domaine", "placeholder", "Ex: Informatique, Ressources Humaines...", 1, "finput"], ["formControlName", "departementId", 1, "finput"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "niveauRisque", 1, "finput"], ["type", "date", "formControlName", "dateSurvenance", 1, "finput"], ["formControlName", "riskId", 1, "finput"], [1, "file-upload-box"], ["type", "file", "accept", ".xls,.xlsx,.xlsm,.pdf,.docx,.jpg,.jpeg,.png", 1, "file-input", 3, "change"], [1, "file-upload-label"], [1, "fas", "fa-upload"], [1, "form-footer"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-save", 3, "disabled"], ["class", "fas fa-save", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "import-feedback"], [1, "import-warning-list"], [1, "import-preview"], [1, "fas", "fa-save"], [1, "fas", "fa-spinner", "fa-spin"], ["title", "Details de l'incident", 3, "close"], ["modal-body", "", "class", "modal-form", 4, "ngIf"], [1, "details-grid"], [1, "detail-block", "full"], [1, "detail-label"], [1, "detail-value", "title"], [1, "detail-value", 2, "white-space", "pre-wrap"], [1, "detail-block"], [1, "detail-value"], ["class", "detail-block full", 4, "ngIf"], [1, "btn-cancel", 3, "click"], [1, "detail-block", "full", "hr-divider"], ["class", "detail-block", 4, "ngIf"], [1, "detail-value", 2, "white-space", "pre-wrap", "background", "#f9fbfc", "padding", "10px", "border-radius", "6px", "border", "1px solid #e1e8ed"], [1, "detail-value", "text-primary", "font-weight-bold"], [1, "fas", "fa-link", "mr-2"], ["target", "_blank", 1, "doc-link", 3, "href"], [1, "fas", "fa-download"], ["title", "Editer l'incident", 3, "close"], ["type", "text", "formControlName", "titre", 1, "finput"], ["formControlName", "description", "rows", "4", 1, "finput"], ["type", "text", "formControlName", "domaine", 1, "finput"], ["formControlName", "statut", 1, "finput"]], template: function IncidentsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gestion des Incidents");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Declarer de nouveaux incidents et suivre leur statut d'avancement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵtemplate(12, IncidentsComponent_button_12_Template, 3, 0, "button", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "div", 10);
        i0.ɵɵelementStart(16, "div", 11);
        i0.ɵɵelement(17, "i", 12);
        i0.ɵɵelementStart(18, "input", 13);
        i0.ɵɵlistener("ngModelChange", function IncidentsComponent_Template_input_ngModelChange_18_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function IncidentsComponent_Template_input_ngModelChange_18_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 11);
        i0.ɵɵelement(20, "i", 14);
        i0.ɵɵelementStart(21, "select", 15);
        i0.ɵɵlistener("ngModelChange", function IncidentsComponent_Template_select_ngModelChange_21_listener($event) { return ctx.filterStatus = $event; })("change", function IncidentsComponent_Template_select_change_21_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(22, "option", 16);
        i0.ɵɵtext(23, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "option", 17);
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "option", 17);
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "option", 17);
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "option", 17);
        i0.ɵɵtext(31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 11);
        i0.ɵɵelement(33, "i", 18);
        i0.ɵɵelementStart(34, "select", 15);
        i0.ɵɵlistener("ngModelChange", function IncidentsComponent_Template_select_ngModelChange_34_listener($event) { return ctx.filterLevel = $event; })("change", function IncidentsComponent_Template_select_change_34_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(35, "option", 16);
        i0.ɵɵtext(36, "Tous les niveaux");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "option", 17);
        i0.ɵɵtext(38);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "option", 17);
        i0.ɵɵtext(40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "option", 17);
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "option", 17);
        i0.ɵɵtext(44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "option", 17);
        i0.ɵɵtext(46);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "option", 17);
        i0.ɵɵtext(48);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(49, IncidentsComponent_button_49_Template, 3, 0, "button", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "div", 20);
        i0.ɵɵelementStart(51, "span", 21);
        i0.ɵɵelementStart(52, "strong");
        i0.ɵɵtext(53);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(54, " incident(s) trouv\u00E9(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "div", 22);
        i0.ɵɵelementStart(56, "table", 23);
        i0.ɵɵelementStart(57, "thead");
        i0.ɵɵelementStart(58, "tr");
        i0.ɵɵelementStart(59, "th");
        i0.ɵɵtext(60, "Titre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "th");
        i0.ɵɵtext(62, "Domaine");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "th");
        i0.ɵɵtext(64, "Niveau");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "th");
        i0.ɵɵtext(66, "Date de survenance");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "th");
        i0.ɵɵtext(68, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "th");
        i0.ɵɵtext(70, "Declare par");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "th");
        i0.ɵɵtext(72, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "tbody");
        i0.ɵɵtemplate(74, IncidentsComponent_tr_74_Template, 21, 13, "tr", 24);
        i0.ɵɵtemplate(75, IncidentsComponent_tr_75_Template, 5, 0, "tr", 25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(76, IncidentsComponent_app_modal_76_Template, 93, 42, "app-modal", 26);
        i0.ɵɵtemplate(77, IncidentsComponent_app_modal_77_Template, 2, 1, "app-modal", 27);
        i0.ɵɵtemplate(78, IncidentsComponent_app_modal_78_Template, 79, 28, "app-modal", 28);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngIf", !ctx.isReadOnlyRole);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.filterSearch);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filterStatus);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.IncidentStatus.NOUVEAU);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.IncidentStatus.NOUVEAU]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentStatus.EN_COURS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.IncidentStatus.EN_COURS]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentStatus.TRAITE);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.IncidentStatus.TRAITE]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentStatus.CLOS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.IncidentStatus.CLOS]);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filterLevel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.LOW);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.LOW]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.LIMITED);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.LIMITED]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.MEDIUM);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.MEDIUM]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.SIGNIFICANT);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.SIGNIFICANT]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.HIGH);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.HIGH]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.IncidentNiveauRisque.CRITICAL);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.IncidentNiveauRisque.CRITICAL]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filterSearch || ctx.filterStatus || ctx.filterLevel);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredIncidents.length);
        i0.ɵɵadvance(21);
        i0.ɵɵproperty("ngForOf", ctx.filteredIncidents);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredIncidents.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showCreateModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEditModal);
    } }, directives: [i6.NgIf, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, i1.SelectControlValueAccessor, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i6.NgForOf, i6.NgClass, i7.ModalComponent, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], pipes: [i6.DatePipe], styles: [".incidents-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);\n    min-height: 100vh;\n    font-family: 'Outfit', 'Inter', sans-serif;\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(10px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in[_ngcontent-%COMP%] {\n    animation: fadeIn 0.4s ease-out forwards;\n}\n\n.page-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 30px;\n    background: rgba(255, 255, 255, 0.9);\n    backdrop-filter: blur(10px);\n    border-radius: 20px;\n    padding: 24px 32px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n    border: 1px solid rgba(255, 255, 255, 0.6);\n}\n\n.header-left[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n}\n\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n    font-weight: 700;\n    color: #1e293b;\n    margin: 0;\n}\n\n.header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    color: #64748b;\n    margin: 4px 0 0;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n    background: #f1f5f9;\n    color: #475569;\n    border: 1px solid #cbd5e1;\n    padding: 10px 16px;\n    border-radius: 10px;\n    font-weight: 600;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    transition: all 0.2s;\n    text-decoration: none;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n    background: #e2e8f0;\n    color: #1e293b;\n    transform: translateY(-1px);\n}\n\n.mr-3[_ngcontent-%COMP%] {\n    margin-right: 16px;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #1e40af, #3b82f6);\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 12px;\n    font-weight: 700;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 74, 153, 0.3);\n}\n\n\n.risks-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 18px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n}\n\n.risks-table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n}\n\n.risks-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n    border-bottom: 2px solid #e2e8f0;\n}\n\n.risks-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    text-align: left;\n    font-size: 0.72rem;\n    font-weight: 700;\n    color: #64748b;\n    text-transform: uppercase;\n}\n\n.risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-bottom: 1px solid #f1f5f9;\n    transition: background 0.15s;\n}\n\n.risks-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    background: #f8fafc;\n}\n\n.risks-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    font-size: 0.88rem;\n    color: #334155;\n    vertical-align: middle;\n}\n\n.td-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    color: #1e293b;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: 60px 20px;\n    color: #94a3b8;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n    margin-bottom: 10px;\n    display: block;\n}\n\n\n.actions-cell[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 6px;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    border: none;\n    cursor: pointer;\n    font-size: 0.8rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 0.2s;\n}\n\n.btn-view[_ngcontent-%COMP%] {\n    background: #eff6ff;\n    color: #1d4ed8;\n}\n\n.btn-view[_ngcontent-%COMP%]:hover {\n    background: #dbeafe;\n}\n\n.btn-ai[_ngcontent-%COMP%] {\n    background: #fdf4ff;\n    color: #a21caf;\n    border: 1px solid #f5d0fe;\n}\n\n.btn-ai[_ngcontent-%COMP%]:hover {\n    background: #fae8ff;\n    box-shadow: 0 0 8px rgba(162, 28, 175, 0.2);\n}\n\n\n.badge[_ngcontent-%COMP%] {\n    padding: 5px 12px;\n    border-radius: 20px;\n    font-size: 0.73rem;\n    font-weight: 700;\n    white-space: nowrap;\n    display: inline-block;\n    border: 1px solid transparent;\n}\n\n.text-blue-800[_ngcontent-%COMP%] { color: #1e40af; }\n.bg-blue-100[_ngcontent-%COMP%] { background: #dbeafe; border-color: #bfdbfe; }\n.text-yellow-800[_ngcontent-%COMP%] { color: #854d0e; }\n.bg-yellow-100[_ngcontent-%COMP%] { background: #fef9c3; border-color: #fde047; }\n.text-green-800[_ngcontent-%COMP%] { color: #166534; }\n.bg-green-100[_ngcontent-%COMP%] { background: #dcfce7; border-color: #bbf7d0; }\n.text-gray-800[_ngcontent-%COMP%] { color: #374151; }\n.bg-gray-100[_ngcontent-%COMP%] { background: #f3f4f6; border-color: #e5e7eb; }\n\n\n.modal-form[_ngcontent-%COMP%] {\n    padding: 4px 0;\n}\n\n.form-group[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    margin-bottom: 15px;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    font-weight: 600;\n    color: #475569;\n}\n\n.import-box[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1.5fr auto;\n    gap: 14px;\n    padding: 14px 16px;\n    border: 1px solid #dbeafe;\n    border-radius: 12px;\n    background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);\n}\n\n.import-box-copy[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.import-box-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    color: #0f172a;\n}\n\n.import-box-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 0.84rem;\n    color: #64748b;\n}\n\n.import-box-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 10px;\n    flex-wrap: wrap;\n}\n\n.import-trigger.loading[_ngcontent-%COMP%] {\n    opacity: 0.8;\n    cursor: wait;\n}\n\n.scan-trigger[_ngcontent-%COMP%] {\n    background: #0f172a;\n    color: #fff;\n    border-color: #0f172a;\n}\n\n.scan-trigger[_ngcontent-%COMP%]:hover {\n    background: #1e293b;\n    border-color: #1e293b;\n    color: #fff;\n}\n\n.import-feedback[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    margin: 0;\n    font-size: 0.84rem;\n    color: #0f766e;\n    font-weight: 600;\n}\n\n.import-warning-list[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    border-radius: 10px;\n    padding: 12px 14px;\n}\n\n.import-warning-list[_ngcontent-%COMP%] {\n    background: #fff7ed;\n    border: 1px solid #fdba74;\n    color: #9a3412;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    font-size: 0.84rem;\n    line-height: 1.5;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n    margin-top: 6px;\n}\n\n.import-preview[_ngcontent-%COMP%] {\n    background: #fff;\n    border: 1px solid #dbeafe;\n}\n\n.import-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 6px;\n    color: #0f172a;\n}\n\n.text-danger[_ngcontent-%COMP%] {\n    color: #ef4444;\n}\n\n.finput[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    border-radius: 8px;\n    border: 1.5px solid #cbd5e1;\n    font-size: 0.9rem;\n    color: #1e293b;\n    background: white;\n    width: 100%;\n    box-sizing: border-box;\n    transition: border-color 0.2s, box-shadow 0.2s;\n}\n\n.finput[_ngcontent-%COMP%]:focus {\n    border-color: #004a99;\n    box-shadow: 0 0 0 3px rgba(0, 74, 153, 0.08);\n    outline: none;\n}\n\n.file-upload-box[_ngcontent-%COMP%] {\n    position: relative;\n    width: 100%;\n}\n\n.file-input[_ngcontent-%COMP%] {\n    opacity: 0;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n    z-index: 2;\n}\n\n.file-upload-label[_ngcontent-%COMP%] {\n    border: 1.5px dashed #94a3b8;\n    padding: 12px;\n    border-radius: 8px;\n    font-size: 0.85rem;\n    text-align: center;\n    color: #64748b;\n    background: #f8fafc;\n    transition: all 0.2s;\n}\n\n.file-input[_ngcontent-%COMP%]:hover    + .file-upload-label[_ngcontent-%COMP%] {\n    background: #f1f5f9;\n    border-color: #004a99;\n}\n\n.form-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    gap: 10px;\n    margin-top: 24px;\n    padding-top: 18px;\n    border-top: 1px solid #f1f5f9;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n    padding: 10px 20px;\n    border-radius: 8px;\n    border: 1px solid #cbd5e1;\n    background: white;\n    color: #475569;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.2s;\n}\n\n.btn-cancel[_ngcontent-%COMP%]:hover {\n    background: #f8fafc;\n}\n\n.btn-save[_ngcontent-%COMP%] {\n    padding: 10px 24px;\n    border-radius: 8px;\n    border: none;\n    background: #004a99;\n    color: white;\n    font-weight: 600;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    transition: all 0.2s;\n}\n\n.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: #003d80;\n    box-shadow: 0 4px 12px rgba(0, 74, 153, 0.3);\n}\n\n.btn-save[_ngcontent-%COMP%]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n\n.ai-button[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #a21caf, #d946ef);\n}\n\n.ai-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: linear-gradient(135deg, #86198f, #c026d3);\n    box-shadow: 0 4px 12px rgba(162, 28, 175, 0.3);\n}\n\n\n.details-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n}\n\n.detail-block[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    padding: 12px;\n    background: #f8fafc;\n    border-radius: 10px;\n}\n\n.detail-block.full[_ngcontent-%COMP%] {\n    grid-column: span 2;\n}\n\n.detail-label[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    color: #94a3b8;\n}\n\n.detail-value[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #1e293b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n}\n\n.detail-value.title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    font-weight: 700;\n}\n\n.doc-link[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    color: #004a99;\n    text-decoration: none;\n    font-size: 0.88rem;\n    font-weight: 600;\n    padding: 8px 14px;\n    background: #eff6ff;\n    border-radius: 8px;\n    margin-top: 4px;\n    transition: background 0.2s;\n}\n\n.doc-link[_ngcontent-%COMP%]:hover {\n    background: #dbeafe;\n}\n\n\n.loading-state[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: 40px 20px;\n}\n\n.loading-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    margin: 15px 0 5px;\n    color: #1e293b;\n    font-size: 1.2rem;\n}\n\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: #64748b;\n    font-size: 0.9rem;\n    margin-bottom: 25px;\n}\n\n.spinner-container[_ngcontent-%COMP%] {\n    color: #3b82f6;\n}\n\n.scanning-animation[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n    margin: 0 auto 20px;\n    border-radius: 50%;\n    border: 3px solid #e2e8f0;\n    border-top-color: #a21caf;\n    animation: spin 1.5s linear infinite;\n    position: relative;\n}\n\n.scanning-animation[_ngcontent-%COMP%]::after {\n    content: '\\f542'; \n    font-family: 'Font Awesome 5 Free';\n    font-weight: 900;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    font-size: 2rem;\n    color: #a21caf;\n    animation: counter-spin 1.5s linear infinite;\n}\n\n@keyframes spin { 100% { transform: rotate(360deg); } }\n@keyframes counter-spin { 100% { transform: translate(-50%, -50%) rotate(-360deg); } }\n\n\n.ai-risks-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n    max-height: 500px;\n    overflow-y: auto;\n    padding-right: 10px;\n}\n\n.ai-risk-card[_ngcontent-%COMP%] {\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    overflow: hidden;\n    transition: all 0.2s;\n    background: white;\n}\n\n.ai-risk-card.selected[_ngcontent-%COMP%] {\n    border-color: #a21caf;\n    box-shadow: 0 0 0 1px #a21caf;\n}\n\n.risk-card-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 15px;\n    padding: 15px;\n    background: #f8fafc;\n    cursor: pointer;\n}\n\n.ai-risk-card.selected[_ngcontent-%COMP%]   .risk-card-header[_ngcontent-%COMP%] {\n    background: #fdf4ff;\n}\n\n.checkbox-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n    accent-color: #a21caf;\n    cursor: pointer;\n    margin-top: 3px;\n}\n\n.risk-title-wrapper[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    margin: 0 0 5px 0;\n    color: #1e293b;\n    font-size: 1.05rem;\n}\n\n.alert-info[_ngcontent-%COMP%] {\n    background-color: #eff6ff;\n    color: #1e40af;\n    padding: 12px 16px;\n    border-radius: 8px;\n    border-left: 4px solid #3b82f6;\n    font-size: 0.9rem;\n}\n\n.risk-card-body[_ngcontent-%COMP%] {\n    padding: 15px 15px 15px 48px;\n    border-top: 1px solid #e2e8f0;\n}\n\n.risk-card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0 0 8px 0;\n    font-size: 0.88rem;\n    color: #475569;\n}\n\n.risk-card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n}\n\n@media (max-width: 768px) {\n    .import-box[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .import-trigger[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentsComponent, [{
        type: Component,
        args: [{
                selector: 'app-incidents',
                templateUrl: './incidents.component.html',
                styleUrls: ['./incidents.component.css']
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.IncidentService }, { type: i3.DepartmentService }, { type: i4.RiskService }, { type: i5.AuthService }, { type: i6.Location }]; }, null); })();
//# sourceMappingURL=incidents.component.js.map