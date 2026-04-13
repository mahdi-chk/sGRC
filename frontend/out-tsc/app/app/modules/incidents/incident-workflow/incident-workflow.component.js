import { Component } from '@angular/core';
import { IncidentService, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/incident.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
import * as i5 from "../../../shared/modal/modal.component";
function IncidentWorkflowComponent_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_button_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.clearFilters(); });
    i0.ɵɵelement(1, "i", 24);
    i0.ɵɵtext(2, " Reinitialiser ");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { exact: true }; };
function IncidentWorkflowComponent_nav_35_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r9.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r9.label, " ");
} }
function IncidentWorkflowComponent_nav_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 25);
    i0.ɵɵtemplate(1, IncidentWorkflowComponent_nav_35_a_1_Template, 2, 4, "a", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.navItems);
} }
function IncidentWorkflowComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵelement(1, "i", 29);
    i0.ɵɵtext(2, " Synchronisation du workflow... ");
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_div_38_div_1_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_div_38_div_1_button_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.updateStatus(incident_r11, ctx_r15.IncidentStatus.EN_COURS); });
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵtext(2, " Prise en charge ");
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_div_38_div_1_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_div_38_div_1_button_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r20); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.updateStatus(incident_r11, ctx_r18.IncidentStatus.TRAITE); });
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Marquer comme Traite ");
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_div_38_div_1_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_div_38_div_1_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r23); const incident_r11 = i0.ɵɵnextContext().$implicit; const ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.updateStatus(incident_r11, ctx_r21.IncidentStatus.CLOS); });
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵtext(2, " Cloturer ");
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_div_38_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelementStart(1, "div", 33);
    i0.ɵɵelementStart(2, "span", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 35);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 36);
    i0.ɵɵelementStart(8, "h3");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 37);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 38);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵelement(15, "i", 39);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵelement(18, "i", 40);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 41);
    i0.ɵɵelementStart(21, "div", 42);
    i0.ɵɵtemplate(22, IncidentWorkflowComponent_div_38_div_1_button_22_Template, 3, 0, "button", 43);
    i0.ɵɵtemplate(23, IncidentWorkflowComponent_div_38_div_1_button_23_Template, 3, 0, "button", 44);
    i0.ɵɵtemplate(24, IncidentWorkflowComponent_div_38_div_1_button_24_Template, 3, 0, "button", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 46);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_div_38_div_1_Template_button_click_25_listener() { const restoredCtx = i0.ɵɵrestoreView(_r25); const incident_r11 = restoredCtx.$implicit; const ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.openDetailsModal(incident_r11); });
    i0.ɵɵelement(26, "i", 47);
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28, "Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r11 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r10.getStatusClass(incident_r11));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r10.getIncidentStatusLabel(incident_r11));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 12, incident_r11.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(incident_r11.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind3(12, 15, incident_r11.description, 0, 100), "", incident_r11.description.length > 100 ? "..." : "", "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", (incident_r11.departement == null ? null : incident_r11.departement.nom) || "Non specifie", "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", incident_r11.declareur == null ? null : incident_r11.declareur.prenom, " ", incident_r11.declareur == null ? null : incident_r11.declareur.nom, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r10.getIncidentStatus(incident_r11) === ctx_r10.IncidentStatus.NOUVEAU);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.getIncidentStatus(incident_r11) === ctx_r10.IncidentStatus.EN_COURS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.getIncidentStatus(incident_r11) === ctx_r10.IncidentStatus.TRAITE);
} }
function IncidentWorkflowComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtemplate(1, IncidentWorkflowComponent_div_38_div_1_Template, 29, 19, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredIncidents);
} }
function IncidentWorkflowComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun incident a traiter pour ces criteres.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentWorkflowComponent_app_modal_40_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Departement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r27.selectedIncident.departement == null ? null : ctx_r27.selectedIncident.departement.nom);
} }
function IncidentWorkflowComponent_app_modal_40_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Declarant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r28.selectedIncident.declareur == null ? null : ctx_r28.selectedIncident.declareur.prenom, " ", ctx_r28.selectedIncident.declareur == null ? null : ctx_r28.selectedIncident.declareur.nom, "");
} }
function IncidentWorkflowComponent_app_modal_40_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r29.selectedIncident.domaine);
} }
function IncidentWorkflowComponent_app_modal_40_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Niveau d'impact global");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵelementStart(4, "span", 70);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r30.getImpactClass(ctx_r30.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r30.levelLabelMap[ctx_r30.selectedIncident.niveauRisque] || ctx_r30.selectedIncident.niveauRisque, " ");
} }
function IncidentWorkflowComponent_app_modal_40_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Macro-processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r31.selectedIncident.macroProcessus);
} }
function IncidentWorkflowComponent_app_modal_40_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Processus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r32.selectedIncident.processus);
} }
function IncidentWorkflowComponent_app_modal_40_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Plan d'action / remediation initiale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r33 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r33.selectedIncident.planActionTraitement);
} }
function IncidentWorkflowComponent_app_modal_40_div_33_Template(rf, ctx) { if (rf & 1) {
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
    const ctx_r34 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r34.selectedIncident.dateEcheance, "dd/MM/yyyy"));
} }
function IncidentWorkflowComponent_app_modal_40_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2, "Cree le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r35.selectedIncident.createdAt, "dd/MM/yyyy \u00E0 HH:mm"));
} }
function IncidentWorkflowComponent_app_modal_40_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 56);
    i0.ɵɵlistener("close", function IncidentWorkflowComponent_app_modal_40_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r37); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.closeDetailsModal(); });
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
    i0.ɵɵelementStart(18, "span", 34);
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
    i0.ɵɵtemplate(26, IncidentWorkflowComponent_app_modal_40_div_26_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(27, IncidentWorkflowComponent_app_modal_40_div_27_Template, 5, 2, "div", 66);
    i0.ɵɵtemplate(28, IncidentWorkflowComponent_app_modal_40_div_28_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(29, IncidentWorkflowComponent_app_modal_40_div_29_Template, 6, 2, "div", 66);
    i0.ɵɵtemplate(30, IncidentWorkflowComponent_app_modal_40_div_30_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(31, IncidentWorkflowComponent_app_modal_40_div_31_Template, 5, 1, "div", 66);
    i0.ɵɵtemplate(32, IncidentWorkflowComponent_app_modal_40_div_32_Template, 5, 1, "div", 67);
    i0.ɵɵtemplate(33, IncidentWorkflowComponent_app_modal_40_div_33_Template, 6, 4, "div", 66);
    i0.ɵɵtemplate(34, IncidentWorkflowComponent_app_modal_40_div_34_Template, 6, 4, "div", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 68);
    i0.ɵɵelementStart(36, "button", 69);
    i0.ɵɵlistener("click", function IncidentWorkflowComponent_app_modal_40_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r37); const ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.closeDetailsModal(); });
    i0.ɵɵtext(37, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r5.selectedIncident.titre);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r5.selectedIncident.description);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r5.getStatusClass(ctx_r5.selectedIncident));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.getIncidentStatusLabel(ctx_r5.selectedIncident), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 14, ctx_r5.selectedIncident.dateSurvenance, "dd/MM/yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.departement == null ? null : ctx_r5.selectedIncident.departement.nom);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.declareur);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.domaine);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.macroProcessus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.processus);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.planActionTraitement);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.dateEcheance);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.selectedIncident.createdAt);
} }
export class IncidentWorkflowComponent {
    constructor(incidentService, router) {
        this.incidentService = incidentService;
        this.router = router;
        this.currentUserRole = getStoredIncidentRole();
        this.incidents = [];
        this.filteredIncidents = [];
        this.selectedIncident = null;
        this.showDetailsModal = false;
        this.isLoading = false;
        this.searchTerm = '';
        this.statusFilter = '';
        this.IncidentStatus = IncidentStatus;
        this.IncidentNiveauRisque = IncidentNiveauRisque;
        this.statusLabelMap = {
            [IncidentStatus.NOUVEAU]: 'Nouveau',
            [IncidentStatus.EN_COURS]: 'En cours',
            [IncidentStatus.TRAITE]: 'Traite',
            [IncidentStatus.CLOS]: 'Clos'
        };
        this.levelLabelMap = {
            [IncidentNiveauRisque.LOW]: 'Faible',
            [IncidentNiveauRisque.LIMITED]: 'Limite',
            [IncidentNiveauRisque.MEDIUM]: 'Moyen',
            [IncidentNiveauRisque.SIGNIFICANT]: 'Significatif',
            [IncidentNiveauRisque.HIGH]: 'Eleve',
            [IncidentNiveauRisque.CRITICAL]: 'Critique'
        };
    }
    get navItems() {
        return getIncidentNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadIncidents();
    }
    loadIncidents() {
        this.isLoading = true;
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                this.incidents = data.map(incident => this.mapIncidentCodes(incident));
                this.applyFilters();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    applyFilters() {
        this.filteredIncidents = this.incidents.filter(i => {
            const matchSearch = !this.searchTerm
                || i.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
                || i.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            const incidentStatut = this.getIncidentStatus(i);
            const filterStatut = this.normalizeStatus(this.statusFilter);
            const matchStatus = !filterStatut || incidentStatut === filterStatut;
            return matchSearch && matchStatus;
        });
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.searchTerm = '';
        this.statusFilter = '';
        this.applyFilters();
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
                alert(`Statut mis a jour : ${this.statusLabelMap[newStatus] || newStatus}`);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la mise a jour du statut.');
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
        switch (this.getIncidentStatus(incident)) {
            case IncidentStatus.NOUVEAU: return 'status-new';
            case IncidentStatus.EN_COURS: return 'status-progress';
            case IncidentStatus.TRAITE: return 'status-resolved';
            case IncidentStatus.CLOS: return 'status-closed';
            default: return '';
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
            return '';
        switch (level) {
            case IncidentNiveauRisque.CRITICAL: return 'impact-critical';
            case IncidentNiveauRisque.SIGNIFICANT:
            case IncidentNiveauRisque.HIGH: return 'impact-high';
            case IncidentNiveauRisque.MEDIUM: return 'impact-medium';
            case IncidentNiveauRisque.LOW:
            case IncidentNiveauRisque.LIMITED: return 'impact-low';
            default: return '';
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
IncidentWorkflowComponent.ɵfac = function IncidentWorkflowComponent_Factory(t) { return new (t || IncidentWorkflowComponent)(i0.ɵɵdirectiveInject(i1.IncidentService), i0.ɵɵdirectiveInject(i2.Router)); };
IncidentWorkflowComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentWorkflowComponent, selectors: [["app-incident-workflow"]], decls: 41, vars: 17, consts: [[1, "incident-page", "workflow-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher...", 3, "ngModel", "ngModelChange", "input"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], ["class", "incident-tabs", 4, "ngIf"], [1, "workflow-container"], ["class", "loading-state", 4, "ngIf"], ["class", "incident-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["title", "Details de l'incident", 3, "close", 4, "ngIf"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "incident-tabs"], ["routerLinkActive", "active", "class", "incident-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "incident-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loading-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "incident-grid"], ["class", "incident-card card shadow-sm", 4, "ngFor", "ngForOf"], [1, "incident-card", "card", "shadow-sm"], [1, "card-header"], [1, "status-badge", 3, "ngClass"], [1, "date"], [1, "card-body"], [1, "description"], [1, "meta"], [1, "fas", "fa-building"], [1, "fas", "fa-user-edit"], [1, "card-footer"], [1, "status-actions"], ["class", "btn-action start", 3, "click", 4, "ngIf"], ["class", "btn-action resolve", 3, "click", 4, "ngIf"], ["class", "btn-action close", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-details", 3, "click"], [1, "fas", "fa-eye"], [1, "btn-action", "start", 3, "click"], [1, "fas", "fa-play"], [1, "btn-action", "resolve", 3, "click"], [1, "fas", "fa-check"], [1, "btn-action", "close", 3, "click"], [1, "fas", "fa-lock"], [1, "empty-state"], [1, "fas", "fa-clipboard-check"], ["title", "Details de l'incident", 3, "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "details-grid"], [1, "detail-block", "full"], [1, "detail-label"], [1, "detail-value", "title"], [1, "detail-value", "description-value"], [1, "detail-block"], [1, "detail-value"], ["class", "detail-block", 4, "ngIf"], ["class", "detail-block full", 4, "ngIf"], [1, "form-footer"], ["type", "button", 1, "btn-close-modal", 3, "click"], [1, "impact-badge", 3, "ngClass"], [1, "detail-value", "description-value", "plan-box"]], template: function IncidentWorkflowComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, "Suivez le cycle de vie des incidents, de la detection a la cloture.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelement(14, "i", 9);
        i0.ɵɵelementStart(15, "input", 10);
        i0.ɵɵlistener("ngModelChange", function IncidentWorkflowComponent_Template_input_ngModelChange_15_listener($event) { return ctx.searchTerm = $event; })("input", function IncidentWorkflowComponent_Template_input_input_15_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 8);
        i0.ɵɵelement(17, "i", 5);
        i0.ɵɵelementStart(18, "select", 11);
        i0.ɵɵlistener("ngModelChange", function IncidentWorkflowComponent_Template_select_ngModelChange_18_listener($event) { return ctx.statusFilter = $event; })("change", function IncidentWorkflowComponent_Template_select_change_18_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(19, "option", 12);
        i0.ɵɵtext(20, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "option", 13);
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "option", 13);
        i0.ɵɵtext(24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "option", 13);
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "option", 13);
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(29, IncidentWorkflowComponent_button_29_Template, 3, 0, "button", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "div", 15);
        i0.ɵɵelementStart(31, "span", 16);
        i0.ɵɵelementStart(32, "strong");
        i0.ɵɵtext(33);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(34, " incident(s) trouve(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(35, IncidentWorkflowComponent_nav_35_Template, 2, 1, "nav", 17);
        i0.ɵɵelementStart(36, "div", 18);
        i0.ɵɵtemplate(37, IncidentWorkflowComponent_div_37_Template, 3, 0, "div", 19);
        i0.ɵɵtemplate(38, IncidentWorkflowComponent_div_38_Template, 2, 1, "div", 20);
        i0.ɵɵtemplate(39, IncidentWorkflowComponent_div_39_Template, 4, 0, "div", 21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(40, IncidentWorkflowComponent_app_modal_40_Template, 38, 17, "app-modal", 22);
    } if (rf & 2) {
        i0.ɵɵadvance(15);
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
        i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.statusFilter);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredIncidents.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredIncidents.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDetailsModal && ctx.selectedIncident);
    } }, directives: [i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i3.SelectControlValueAccessor, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i4.NgIf, i4.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i4.NgClass, i5.ModalComponent], pipes: [i4.DatePipe, i4.SlicePipe], styles: ["@import '../incident-shared';\n\n.incident-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n    gap: 25px;\n    margin-top: 20px;\n}\n\n.incident-card[_ngcontent-%COMP%] {\n    background: white; border-radius: 16px; display: flex; flex-direction: column; transition: all 0.3s;\n    &:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }\n    \n    .card-header {\n        padding: 15px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;\n        .date { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }\n    }\n\n    .card-body {\n        padding: 20px; flex-grow: 1;\n        h3 { margin: 0 0 12px 0; font-size: 1.1rem; color: #1e293b; font-weight: 700; line-height: 1.4; }\n        .description { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; line-height: 1.5; }\n        .meta { display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: #475569; i { width: 20px; color: #94a3b8; } }\n    }\n\n    .card-footer {\n        padding: 15px 20px; border-top: 1px solid #f1f5f9; background: #fafafa; display: flex; justify-content: space-between; align-items: center;\n        border-radius: 0 0 16px 16px;\n    }\n}\n\n.status-badge[_ngcontent-%COMP%] {\n    padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;\n    &.status-new { background: #eff6ff; color: #3b82f6; }\n    &.status-progress { background: #fefce8; color: #ca8a04; }\n    &.status-resolved { background: #f0fdf4; color: #16a34a; }\n    &.status-closed { background: #f1f5f9; color: #64748b; }\n}\n\n.btn-action[_ngcontent-%COMP%] {\n    padding: 10px 18px; border-radius: 12px; border: none; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s;\n    box-shadow: 0 4px 10px rgba(0,0,0,0.1);\n    \n    &.start { \n        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; \n        &:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(59,130,246,0.3); }\n    }\n    &.resolve { \n        background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; \n        &:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(16,185,129,0.3); }\n    }\n    &.close { \n        background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: white; \n        &:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(100,116,139,0.3); }\n    }\n    &:active { transform: translateY(0); }\n}\n\n.btn-details[_ngcontent-%COMP%] {\n    min-width: 110px; height: 40px; padding: 0 14px; border-radius: 12px; border: 1px solid #cbd5e1; background: white; color: #334155; cursor: pointer; transition: all 0.2s;\n    display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;\n    &:hover { background: #eff6ff; color: #004a99; border-color: #004a99; transform: translateY(-1px); }\n}\n\n.search-box[_ngcontent-%COMP%], .filter-box[_ngcontent-%COMP%] {\n    background: white; border: 1px solid #e2e8f0; padding: 10px 18px; border-radius: 12px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);\n    input, select { background: none; border: none; outline: none; font-size: 0.95rem; color: #1e293b; font-weight: 600; }\n    i { color: #004a99; }\n}\n\n.details-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 16px;\n}\n\n.detail-block[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    padding: 14px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n}\n\n.detail-block.full[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n}\n\n.detail-label[_ngcontent-%COMP%] {\n    font-size: 0.74rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    color: #94a3b8;\n}\n\n.detail-value[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #1e293b;\n    font-size: 0.95rem;\n    line-height: 1.5;\n}\n\n.detail-value.title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    font-weight: 700;\n}\n\n.description-value[_ngcontent-%COMP%] {\n    white-space: pre-wrap;\n}\n\n.plan-box[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    background: #fff;\n    border: 1px solid #dbeafe;\n    border-radius: 10px;\n}\n\n.impact-badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    padding: 5px 10px;\n    border-radius: 999px;\n    font-size: 0.78rem;\n    font-weight: 700;\n}\n\n.impact-critical[_ngcontent-%COMP%] {\n    background: #fee2e2;\n    color: #b91c1c;\n}\n\n.impact-high[_ngcontent-%COMP%] {\n    background: #fef3c7;\n    color: #b45309;\n}\n\n.impact-medium[_ngcontent-%COMP%] {\n    background: #dbeafe;\n    color: #1d4ed8;\n}\n\n.impact-low[_ngcontent-%COMP%] {\n    background: #dcfce7;\n    color: #15803d;\n}\n\n.form-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: 20px;\n}\n\n.btn-close-modal[_ngcontent-%COMP%] {\n    padding: 10px 18px;\n    border: none;\n    border-radius: 10px;\n    background: #004a99;\n    color: white;\n    font-weight: 700;\n    cursor: pointer;\n}\n\n@media (max-width: 768px) {\n    .incident-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .card-footer[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: stretch;\n        gap: 12px;\n    }\n\n    .btn-details[_ngcontent-%COMP%] {\n        width: 100%;\n    }\n\n    .details-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .detail-block.full[_ngcontent-%COMP%] {\n        grid-column: auto;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentWorkflowComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-workflow',
                templateUrl: './incident-workflow.component.html',
                styleUrls: ['./incident-workflow.component.scss']
            }]
    }], function () { return [{ type: i1.IncidentService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=incident-workflow.component.js.map