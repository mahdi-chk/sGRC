import { Component } from '@angular/core';
import { IncidentService, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/incident.service";
import * as i2 from "../../../core/services/user.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
import * as i7 from "../../../shared/components/pagination/pagination.component";
import * as i8 from "../../../shared/modal/modal.component";
function IncidentWorkflowComponent_button_33_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_button_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.clearFilters(); });
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { exact: true }; };
function IncidentWorkflowComponent_nav_39_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r8.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r8.label, " ");
} }
function IncidentWorkflowComponent_nav_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 28);
    i0.ɵɵtemplate(1, IncidentWorkflowComponent_nav_39_a_1_Template, 2, 4, "a", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.navItems);
} }
function IncidentWorkflowComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementStart(2, "p", 33);
    i0.ɵɵtext(3, "Synchronisation du workflow...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_table_42_tr_20_option_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r16.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", user_r16.prenom, " ", user_r16.nom, " ");
} }
function IncidentWorkflowComponent_table_42_tr_20_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_table_42_tr_20_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r17 = i0.ɵɵnextContext(2); return ctx_r17.updateStatus(incident_r11, ctx_r17.IncidentStatus.EN_COURS); });
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_table_42_tr_20_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_table_42_tr_20_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.updateStatus(incident_r11, ctx_r20.IncidentStatus.TRAITE); });
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_table_42_tr_20_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_table_42_tr_20_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r25); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.updateStatus(incident_r11, ctx_r23.IncidentStatus.CLOS); });
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_table_42_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 37);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 38);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelementStart(13, "span", 38);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵelementStart(18, "select", 39);
    i0.ɵɵlistener("change", function IncidentWorkflowComponent_table_42_tr_20_Template_select_change_18_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r27); const incident_r11 = restoredCtx.$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.assignUser(incident_r11, $event.target.value); });
    i0.ɵɵelementStart(19, "option", 14);
    i0.ɵɵtext(20, "Non assign\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, IncidentWorkflowComponent_table_42_tr_20_option_21_Template, 2, 3, "option", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 41);
    i0.ɵɵelementStart(23, "div", 42);
    i0.ɵɵtemplate(24, IncidentWorkflowComponent_table_42_tr_20_button_24_Template, 2, 0, "button", 43);
    i0.ɵɵtemplate(25, IncidentWorkflowComponent_table_42_tr_20_button_25_Template, 2, 0, "button", 44);
    i0.ɵɵtemplate(26, IncidentWorkflowComponent_table_42_tr_20_button_26_Template, 2, 0, "button", 45);
    i0.ɵɵelementStart(27, "button", 46);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_table_42_tr_20_Template_button_click_27_listener() { const restoredCtx = i0.ɵɵrestoreView(_r27); const incident_r11 = restoredCtx.$implicit; const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.openDetailsModal(incident_r11); });
    i0.ɵɵelement(28, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r11 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(incident_r11.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(incident_r11.domaine || "Non d\u00E9fini");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r9.getImpactClass(incident_r11));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.levelLabelMap[incident_r11.niveauRisque] || incident_r11.niveauRisque || "-", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 15, incident_r11.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r9.getStatusClass(incident_r11));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.getIncidentStatusLabel(incident_r11), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", incident_r11.declareur == null ? null : incident_r11.declareur.prenom, " ", incident_r11.declareur == null ? null : incident_r11.declareur.nom, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", incident_r11.assigneeId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r9.users);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r9.getIncidentStatus(incident_r11) === ctx_r9.IncidentStatus.NOUVEAU);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.getIncidentStatus(incident_r11) === ctx_r9.IncidentStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.getIncidentStatus(incident_r11) === ctx_r9.IncidentStatus.TRAITE);
} }
function IncidentWorkflowComponent_table_42_tr_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 54);
    i0.ɵɵelement(2, "i", 55);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun incident \u00E0 traiter pour ces crit\u00E8res.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_table_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 34);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Date de survenance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "D\u00E9clarant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Assign\u00E9 \u00E0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, IncidentWorkflowComponent_table_42_tr_20_Template, 29, 18, "tr", 35);
    i0.ɵɵtemplate(21, IncidentWorkflowComponent_table_42_tr_21_Template, 5, 0, "tr", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r3.paginatedIncidents);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.filteredIncidents.length === 0);
} }
function IncidentWorkflowComponent_app_modal_44_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Assign\u00E9 \u00E0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r30.selectedIncident.assignee == null ? null : ctx_r30.selectedIncident.assignee.prenom, " ", ctx_r30.selectedIncident.assignee == null ? null : ctx_r30.selectedIncident.assignee.nom, "");
} }
function IncidentWorkflowComponent_app_modal_44_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "D\u00E9clarant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r31.selectedIncident.declareur == null ? null : ctx_r31.selectedIncident.declareur.prenom, " ", ctx_r31.selectedIncident.declareur == null ? null : ctx_r31.selectedIncident.declareur.nom, "");
} }
function IncidentWorkflowComponent_app_modal_44_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r32.selectedIncident.domaine);
} }
function IncidentWorkflowComponent_app_modal_44_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Niveau d'impact global");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵelementStart(4, "span", 38);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r33 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r33.getImpactClass(ctx_r33.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r33.levelLabelMap[ctx_r33.selectedIncident.niveauRisque] || ctx_r33.selectedIncident.niveauRisque, " ");
} }
function IncidentWorkflowComponent_app_modal_44_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Macro-processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r34 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r34.selectedIncident.macroProcessus);
} }
function IncidentWorkflowComponent_app_modal_44_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r35.selectedIncident.processus);
} }
function IncidentWorkflowComponent_app_modal_44_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Plan d'action / rem\u00E9diation initiale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 70);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r36 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r36.selectedIncident.planActionTraitement);
} }
function IncidentWorkflowComponent_app_modal_44_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Date limite du plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r37 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r37.selectedIncident.dateEcheance, "dd/MM/yyyy"));
} }
function IncidentWorkflowComponent_app_modal_44_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Pi\u00E8ce Jointe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 71);
    i0.ɵɵelement(4, "i", 72);
    i0.ɵɵtext(5, " T\u00E9l\u00E9charger le document ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", ctx_r38.environment.apiUrl + "/../" + ctx_r38.selectedIncident.pieceJointe, i0.ɵɵsanitizeUrl);
} }
function IncidentWorkflowComponent_app_modal_44_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 56);
    i0.ɵɵlistener("close", function IncidentWorkflowComponent_app_modal_44_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.closeDetailsModal(); });
    i0.ɵɵelementStart(1, "div", 57, 58);
    i0.ɵɵelementStart(3, "div", 59);
    i0.ɵɵelementStart(4, "div", 60);
    i0.ɵɵelementStart(5, "span", 61);
    i0.ɵɵtext(6, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 62);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 60);
    i0.ɵɵelementStart(10, "span", 61);
    i0.ɵɵtext(11, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 63);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 64);
    i0.ɵɵelementStart(15, "span", 61);
    i0.ɵɵtext(16, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 65);
    i0.ɵɵelementStart(18, "span", 38);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 64);
    i0.ɵɵelementStart(21, "span", 61);
    i0.ɵɵtext(22, "Date de survenance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p", 65);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(26, IncidentWorkflowComponent_app_modal_44_div_26_Template, 5, 2, "div", 66);
    i0.ɵɵtemplate(27, IncidentWorkflowComponent_app_modal_44_div_27_Template, 5, 2, "div", 66);
    i0.ɵɵtemplate(28, IncidentWorkflowComponent_app_modal_44_div_28_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(29, IncidentWorkflowComponent_app_modal_44_div_29_Template, 6, 2, "div", 66);
    i0.ɵɵtemplate(30, IncidentWorkflowComponent_app_modal_44_div_30_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(31, IncidentWorkflowComponent_app_modal_44_div_31_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(32, IncidentWorkflowComponent_app_modal_44_div_32_Template, 5, 1, "div", 67);
    i0.ɵɵtemplate(33, IncidentWorkflowComponent_app_modal_44_div_33_Template, 6, 4, "div", 66);
    i0.ɵɵtemplate(34, IncidentWorkflowComponent_app_modal_44_div_34_Template, 6, 1, "div", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 68);
    i0.ɵɵelementStart(36, "button", 69);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_app_modal_44_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r40); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.closeDetailsModal(); });
    i0.ɵɵtext(37, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r4.selectedIncident.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.selectedIncident.description);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r4.getStatusClass(ctx_r4.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.getIncidentStatusLabel(ctx_r4.selectedIncident), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 14, ctx_r4.selectedIncident.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.assignee);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.declareur);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.domaine);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.macroProcessus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.processus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.planActionTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.dateEcheance);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.selectedIncident.pieceJointe);
} }
export class IncidentWorkflowComponent {
    constructor(incidentService, userService, authService, router) {
        this.incidentService = incidentService;
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.currentUserRole = getStoredIncidentRole();
        this.currentUserId = null;
        this.currentUserRole_enum = null;
        this.incidents = [];
        this.users = [];
        this.filteredIncidents = [];
        this.selectedIncident = null;
        this.showDetailsModal = false;
        this.isLoading = false;
        this.searchTerm = '';
        this.statusFilter = '';
        this.onlyToProcess = false;
        // Pagination
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.environment = environment;
        this.IncidentStatus = IncidentStatus;
        this.IncidentNiveauRisque = IncidentNiveauRisque;
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
    }
    get navItems() {
        return getIncidentNavItems(this.currentUserRole);
    }
    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        this.currentUserId = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) || null;
        this.currentUserRole_enum = this.authService.getUserRole();
        this.loadIncidents();
        this.loadUsers();
    }
    loadIncidents() {
        this.isLoading = true;
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                try {
                    this.incidents = (data || []).map(incident => this.mapIncidentCodes(incident));
                    this.applyFilters();
                }
                catch (err) {
                    console.error('Erreur lors du mapping des incidents:', err);
                }
                finally {
                    this.isLoading = false;
                }
            },
            error: (err) => {
                console.error('Erreur chargement incidents:', err);
                this.isLoading = false;
            }
        });
    }
    loadUsers() {
        this.userService.getAssignableIncidentUsers().subscribe(users => this.users = users);
    }
    applyFilters() {
        const search = (this.searchTerm || '').toLowerCase();
        this.filteredIncidents = this.incidents.filter(i => {
            // 0. Filtre par visibilité utilisateur (sauf super admin)
            const isSuperAdmin = this.currentUserRole_enum === UserRole.SUPER_ADMIN;
            const isDeclarerByUser = i.userId === this.currentUserId;
            const isAssignedToUser = i.assigneeId === this.currentUserId;
            const matchUserAccess = isSuperAdmin || isDeclarerByUser || isAssignedToUser;
            // 1. Recherche
            const matchSearch = !search
                || (i.titre && i.titre.toLowerCase().includes(search))
                || (i.description && i.description.toLowerCase().includes(search));
            // 2. Filtre statut spécifique (Dropdown)
            const incidentStatut = this.getIncidentStatus(i);
            const filterStatut = this.normalizeStatus(this.statusFilter);
            const matchStatus = !filterStatut || incidentStatut === filterStatut;
            // 3. Filtre "À traiter" (Bouton rapide) - affiche seulement les incidents assignés à l'utilisateur actuel
            const isToProcess = incidentStatut === IncidentStatus.NOUVEAU || incidentStatut === IncidentStatus.EN_COURS;
            const isAssignedToCurrentUser = i.assigneeId === this.currentUserId;
            const matchToProcess = !this.onlyToProcess || (isToProcess && isAssignedToCurrentUser);
            return matchUserAccess && matchSearch && matchStatus && matchToProcess;
        });
        this.currentPage = 1;
    }
    onFilterChange() {
        this.applyFilters();
    }
    toggleToProcess() {
        this.onlyToProcess = !this.onlyToProcess;
        if (this.onlyToProcess) {
            this.statusFilter = ''; // On réinitialise le filtre par statut spécifique quand on active "À traiter" pour éviter les conflits
        }
        this.applyFilters();
    }
    clearFilters() {
        this.searchTerm = '';
        this.statusFilter = '';
        this.onlyToProcess = false;
        this.applyFilters();
    }
    get paginatedIncidents() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredIncidents.slice(startIndex, startIndex + this.itemsPerPage);
    }
    onPageChanged(event) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }
    updateStatus(incident, newStatus) {
        this.incidentService.updateIncident(incident.id, { statut: newStatus }).subscribe({
            next: (res) => {
                const updated = this.mapIncidentCodes(res);
                const idx = this.incidents.findIndex(i => i.id === updated.id);
                if (idx !== -1) {
                    this.incidents[idx] = updated;
                }
                this.applyFilters();
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la mise à jour du statut.');
            }
        });
    }
    assignUser(incident, userId) {
        const id = userId === 'null' ? null : Number(userId);
        this.incidentService.updateIncident(incident.id, { assigneeId: id }).subscribe({
            next: (res) => {
                const updated = this.mapIncidentCodes(res);
                const idx = this.incidents.findIndex(i => i.id === updated.id);
                if (idx !== -1) {
                    this.incidents[idx] = updated;
                }
                this.applyFilters();
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de l\'assignation.');
            }
        });
    }
    openDetailsModal(incident) {
        this.selectedIncident = incident;
        this.showDetailsModal = true;
    }
    closeDetailsModal() {
        this.showDetailsModal = false;
        this.selectedIncident = null;
    }
    getStatusClass(incident) {
        const status = this.getIncidentStatus(incident);
        switch (status) {
            case IncidentStatus.NOUVEAU: return 'bg-blue-100 text-blue-800';
            case IncidentStatus.EN_COURS: return 'bg-yellow-100 text-yellow-800';
            case IncidentStatus.TRAITE: return 'bg-green-100 text-green-800';
            case IncidentStatus.CLOS: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    getIncidentStatus(incident) {
        var _a;
        return this.normalizeStatus(((_a = incident) === null || _a === void 0 ? void 0 : _a.statutCode) || (incident === null || incident === void 0 ? void 0 : incident.statut));
    }
    getIncidentStatusLabel(incident) {
        const normalized = this.getIncidentStatus(incident);
        return incident.statutLabel || this.statusLabelMap[normalized] || incident.statut || '-';
    }
    getImpactClass(incident) {
        var _a;
        const level = this.normalizeLevel(((_a = incident) === null || _a === void 0 ? void 0 : _a.niveauRisqueCode) || (incident === null || incident === void 0 ? void 0 : incident.niveauRisque));
        if (!level)
            return 'bg-gray-100 text-gray-800';
        switch (level) {
            case IncidentNiveauRisque.CRITICAL: return 'badge-danger';
            case IncidentNiveauRisque.SIGNIFICANT:
            case IncidentNiveauRisque.HIGH: return 'badge-warning';
            case IncidentNiveauRisque.MEDIUM: return 'badge-info';
            case IncidentNiveauRisque.LOW:
            case IncidentNiveauRisque.LIMITED: return 'badge-success';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    mapIncidentCodes(incident) {
        var _a, _b;
        return Object.assign(Object.assign({}, incident), { statut: this.normalizeStatus(((_a = incident) === null || _a === void 0 ? void 0 : _a.statutCode) || (incident === null || incident === void 0 ? void 0 : incident.statut)), niveauRisque: this.normalizeLevel(((_b = incident) === null || _b === void 0 ? void 0 : _b.niveauRisqueCode) || (incident === null || incident === void 0 ? void 0 : incident.niveauRisque)) });
    }
    normalizeStatus(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    normalizeLevel(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
IncidentWorkflowComponent.ɵfac = function IncidentWorkflowComponent_Factory(t) { return new (t || IncidentWorkflowComponent)(i0.ɵɵdirectiveInject(i1.IncidentService), i0.ɵɵdirectiveInject(i2.UserService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.Router)); };
IncidentWorkflowComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentWorkflowComponent, selectors: [["app-incident-workflow"]], decls: 45, vars: 21, consts: [[1, "incident-page", "workflow-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "content-container"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["title", "Afficher les incidents \u00E0 traiter (Nouveau/En cours)", 1, "btn-quick-filter", 3, "click"], [1, "fas", "fa-filter"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], ["class", "incident-tabs", 4, "ngIf"], [1, "risks-card"], ["class", "loading-state p-5 text-center", 4, "ngIf"], ["class", "risks-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged"], ["title", "D\u00E9tails de l'incident", 3, "close", 4, "ngIf"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "incident-tabs"], ["routerLinkActive", "active", "class", "incident-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "incident-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loading-state", "p-5", "text-center"], [1, "fas", "fa-circle-notch", "fa-spin", "fa-2x"], [1, "mt-2"], [1, "risks-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "td-title"], [1, "badge", 3, "ngClass"], [1, "assignee-select", 3, "ngModel", "change"], [3, "value", 4, "ngFor", "ngForOf"], [1, "actions-cell"], [1, "workflow-actions"], ["class", "btn-sm-action start", "title", "Prendre en charge", 3, "click", 4, "ngIf"], ["class", "btn-sm-action resolve", "title", "Marquer comme Trait\u00E9", 3, "click", 4, "ngIf"], ["class", "btn-sm-action close", "title", "Cl\u00F4turer", 3, "click", 4, "ngIf"], ["title", "Voir d\u00E9tails", 1, "btn-sm-action", "view", 3, "click"], [1, "fas", "fa-eye"], ["title", "Prendre en charge", 1, "btn-sm-action", "start", 3, "click"], [1, "fas", "fa-play"], ["title", "Marquer comme Trait\u00E9", 1, "btn-sm-action", "resolve", 3, "click"], [1, "fas", "fa-check"], ["title", "Cl\u00F4turer", 1, "btn-sm-action", "close", 3, "click"], [1, "fas", "fa-lock"], ["colspan", "8", 1, "empty-state"], [1, "fas", "fa-clipboard-check"], ["title", "D\u00E9tails de l'incident", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "details-grid"], [1, "detail-block", "full"], [1, "detail-label"], [1, "detail-value", "title"], [1, "detail-value", "description-value"], [1, "detail-block"], [1, "detail-value"], ["class", "detail-block", 4, "ngIf"], ["class", "detail-block full", 4, "ngIf"], [1, "form-footer"], ["type", "button", 1, "btn-cancel", 3, "click"], [1, "detail-value", "description-value", "plan-box"], ["target", "_blank", 1, "doc-link", 3, "href"], [1, "fas", "fa-download"]], template: function IncidentWorkflowComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentWorkflowComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Workflow de Traitement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Suivez le cycle de vie des incidents, de la d\u00E9tection \u00E0 la cl\u00F4ture.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelement(15, "i", 10);
        i0.ɵɵelementStart(16, "input", 11);
        i0.ɵɵlistener("ngModelChange", function IncidentWorkflowComponent_Template_input_ngModelChange_16_listener($event) { return ctx.searchTerm = $event; })("ngModelChange", function IncidentWorkflowComponent_Template_input_ngModelChange_16_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 9);
        i0.ɵɵelement(18, "i", 5);
        i0.ɵɵelementStart(19, "select", 12);
        i0.ɵɵlistener("ngModelChange", function IncidentWorkflowComponent_Template_select_ngModelChange_19_listener($event) { return ctx.statusFilter = $event; })("change", function IncidentWorkflowComponent_Template_select_change_19_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(20, "option", 13);
        i0.ɵɵtext(21, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "option", 14);
        i0.ɵɵtext(23);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "option", 14);
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "option", 14);
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "option", 14);
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "button", 15);
        i0.ɵɵlistener("click", function IncidentWorkflowComponent_Template_button_click_30_listener() { return ctx.toggleToProcess(); });
        i0.ɵɵelement(31, "i", 16);
        i0.ɵɵtext(32, " \u00C0 traiter ");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(33, IncidentWorkflowComponent_button_33_Template, 3, 0, "button", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "div", 18);
        i0.ɵɵelementStart(35, "span", 19);
        i0.ɵɵelementStart(36, "strong");
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(38, " incident(s) trouv\u00E9(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(39, IncidentWorkflowComponent_nav_39_Template, 2, 1, "nav", 20);
        i0.ɵɵelementStart(40, "div", 21);
        i0.ɵɵtemplate(41, IncidentWorkflowComponent_div_41_Template, 4, 0, "div", 22);
        i0.ɵɵtemplate(42, IncidentWorkflowComponent_table_42_Template, 22, 2, "table", 23);
        i0.ɵɵelementStart(43, "app-pagination", 24);
        i0.ɵɵlistener("pageChanged", function IncidentWorkflowComponent_Template_app_pagination_pageChanged_43_listener($event) { return ctx.onPageChanged($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(44, IncidentWorkflowComponent_app_modal_44_Template, 38, 17, "app-modal", 25);
    } if (rf & 2) {
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("ngModel", ctx.searchTerm);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.statusFilter);
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
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("active", ctx.onlyToProcess);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.statusFilter || ctx.onlyToProcess);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredIncidents.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("totalItems", ctx.filteredIncidents.length)("currentPage", ctx.currentPage)("pageSize", ctx.itemsPerPage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal && ctx.selectedIncident);
    } }, directives: [i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i5.SelectControlValueAccessor, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i6.NgIf, i7.PaginationComponent, i6.NgForOf, i4.RouterLinkWithHref, i4.RouterLinkActive, i6.NgClass, i8.ModalComponent], pipes: [i6.DatePipe], styles: ["@import '../incident-shared';\n\n.workflow-view[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);\n    min-height: 100vh;\n    font-family: 'Outfit', 'Inter', sans-serif;\n}\n\n.page-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 25px;\n    background: rgba(255, 255, 255, 0.9);\n    backdrop-filter: blur(10px);\n    border-radius: 20px;\n    padding: 24px 32px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);\n    border: 1px solid rgba(255, 255, 255, 0.6);\n}\n\n.risks-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 18px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n    animation: fadeIn 0.4s ease-out forwards;\n}\n\n.risks-table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n\n    thead tr {\n        background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n        border-bottom: 2px solid #e2e8f0;\n    }\n\n    th {\n        padding: 14px 16px;\n        text-align: left;\n        font-size: 0.72rem;\n        font-weight: 700;\n        color: #64748b;\n        text-transform: uppercase;\n    }\n\n    tbody tr {\n        border-bottom: 1px solid #f1f5f9;\n        transition: background 0.15s;\n\n        &:hover {\n            background: #f8fafc;\n        }\n    }\n\n    td {\n        padding: 14px 16px;\n        font-size: 0.88rem;\n        color: #334155;\n        vertical-align: middle;\n    }\n}\n\n.td-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    color: #1e293b;\n    font-weight: 700;\n}\n\n\n.workflow-actions[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n}\n\n.btn-sm-action[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    border: none;\n    cursor: pointer;\n    font-size: 0.85rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 0.2s;\n    background: #f1f5f9;\n    color: #64748b;\n\n    &:hover {\n        transform: translateY(-2px);\n    }\n\n    &.start { background: #eff6ff; color: #3b82f6; &:hover { background: #dbeafe; } }\n    &.resolve { background: #f0fdf4; color: #16a34a; &:hover { background: #dcfce7; } }\n    &.close { background: #f1f5f9; color: #334155; &:hover { background: #e2e8f0; } }\n    &.view { background: #faf5ff; color: #9333ea; &:hover { background: #f3e8ff; } }\n}\n\n\n.assignee-select[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    border-radius: 8px;\n    border: 1.5px solid #e2e8f0;\n    font-size: 0.85rem;\n    color: #1e293b;\n    background: #f8fafc;\n    width: 100%;\n    max-width: 180px;\n    cursor: pointer;\n    transition: all 0.2s;\n    font-weight: 500;\n\n    &:focus {\n        border-color: #3b82f6;\n        background: white;\n        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n        outline: none;\n    }\n\n    &:hover {\n        border-color: #cbd5e1;\n    }\n}\n\n\n.badge[_ngcontent-%COMP%] {\n    padding: 5px 12px;\n    border-radius: 20px;\n    font-size: 0.73rem;\n    font-weight: 700;\n    white-space: nowrap;\n    display: inline-block;\n    border: 1px solid transparent;\n}\n\n.badge-danger[_ngcontent-%COMP%] { background: #fee2e2; color: #b91c1c; border-color: #fecaca; }\n.badge-warning[_ngcontent-%COMP%] { background: #fef3c7; color: #b45309; border-color: #fde68a; }\n.badge-info[_ngcontent-%COMP%] { background: #e0f2fe; color: #0369a1; border-color: #bae6fd; }\n.badge-success[_ngcontent-%COMP%] { background: #dcfce7; color: #15803d; border-color: #bbf7d0; }\n\n.bg-blue-100[_ngcontent-%COMP%] { background: #dbeafe; color: #1e40af; border-color: #bfdbfe; }\n.bg-yellow-100[_ngcontent-%COMP%] { background: #fef9c3; color: #854d0e; border-color: #fde047; }\n.bg-green-100[_ngcontent-%COMP%] { background: #dcfce7; color: #166534; border-color: #bbf7d0; }\n.bg-gray-100[_ngcontent-%COMP%] { background: #f3f4f6; color: #374151; border-color: #e5e7eb; }\n\n\n.details-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n}\n\n.detail-block[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    padding: 12px;\n    background: #f8fafc;\n    border-radius: 10px;\n}\n\n.detail-block.full[_ngcontent-%COMP%] {\n    grid-column: span 2;\n}\n\n.detail-label[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    color: #94a3b8;\n}\n\n.detail-value[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #1e293b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n}\n\n.detail-value.title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    font-weight: 700;\n}\n\n.description-value[_ngcontent-%COMP%] {\n    white-space: pre-wrap;\n}\n\n.plan-box[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    background: #fff;\n    border: 1px solid #dbeafe;\n    border-radius: 10px;\n}\n\n.doc-link[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    color: #004a99;\n    text-decoration: none;\n    font-size: 0.88rem;\n    font-weight: 600;\n    padding: 8px 14px;\n    background: #eff6ff;\n    border-radius: 8px;\n    margin-top: 4px;\n    transition: background 0.2s;\n}\n\n.doc-link[_ngcontent-%COMP%]:hover {\n    background: #dbeafe;\n}\n\n\n.btn-quick-filter[_ngcontent-%COMP%] {\n    padding: 10px 18px;\n    border-radius: 12px;\n    border: 1.5px solid #e2e8f0;\n    background: white;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.88rem;\n    cursor: pointer;\n    transition: all 0.2s;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n\n    i { color: #94a3b8; transition: color 0.2s; }\n\n    &:hover {\n        border-color: #3b82f6;\n        color: #3b82f6;\n        background: #eff6ff;\n        i { color: #3b82f6; }\n    }\n\n    &.active {\n        background: #3b82f6;\n        color: white;\n        border-color: #3b82f6;\n        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);\n        i { color: white; }\n    }\n}\n\n.btn-reset[_ngcontent-%COMP%] {\n    padding: 10px 18px;\n    border: none;\n    background: none;\n    color: #64748b;\n    font-weight: 700;\n    font-size: 0.88rem;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    transition: color 0.2s;\n\n    &:hover {\n        color: #ef4444;\n    }\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(10px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n@media (max-width: 1024px) {\n    .risks-table[_ngcontent-%COMP%] {\n        display: block;\n        overflow-x: auto;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentWorkflowComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-workflow',
                templateUrl: './incident-workflow.component.html',
                styleUrls: ['./incident-workflow.component.scss']
            }]
    }], function () { return [{ type: i1.IncidentService }, { type: i2.UserService }, { type: i3.AuthService }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=incident-workflow.component.js.map