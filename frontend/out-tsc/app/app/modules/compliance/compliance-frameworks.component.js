import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import { ComplianceService } from './compliance.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./compliance.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function ComplianceFrameworksComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r15 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r15.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r15.label, " ");
} }
function ComplianceFrameworksComponent_div_17_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r16.feedback);
} }
function ComplianceFrameworksComponent_div_17_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r17.error);
} }
function ComplianceFrameworksComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtemplate(1, ComplianceFrameworksComponent_div_17_p_1_Template, 2, 1, "p", 36);
    i0.ɵɵtemplate(2, ComplianceFrameworksComponent_div_17_p_2_Template, 2, 1, "p", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.feedback);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.error);
} }
function ComplianceFrameworksComponent_div_42_div_29_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r20 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r20.code || "Sans code");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" - ", item_r20.reason, " ");
} }
function ComplianceFrameworksComponent_div_42_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2, "Elements ignores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 45);
    i0.ɵɵtemplate(4, ComplianceFrameworksComponent_div_42_div_29_li_4_Template, 4, 2, "li", 46);
    i0.ɵɵpipe(5, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(5, 1, ctx_r18.importResult.skipped, 0, 5));
} }
function ComplianceFrameworksComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵelementStart(1, "div", 41);
    i0.ɵɵelementStart(2, "div", 42);
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "Exigences detectees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 42);
    i0.ɵɵelementStart(10, "span", 17);
    i0.ɵɵtext(11, "Cadre cree");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "h3");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 42);
    i0.ɵɵelementStart(17, "span", 17);
    i0.ɵɵtext(18, "Exigences creees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "h3");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 43);
    i0.ɵɵelementStart(24, "div");
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26, "Apercu du texte lu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, ComplianceFrameworksComponent_div_42_div_29_Template, 6, 5, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r3.importResult.detectedRequirements);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.importResult.sourceFile);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r3.importResult.framework == null ? null : ctx_r3.importResult.framework.code) || ctx_r3.importResult.frameworkId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((ctx_r3.importResult.framework == null ? null : ctx_r3.importResult.framework.name) || "Nouveau cadre importe");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.importResult.createdRequirements);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r3.importResult.skippedRequirements, " ignoree(s)");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r3.importResult.previewText || "Aucun extrait disponible.");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.importResult.skipped.length > 0);
} }
function ComplianceFrameworksComponent_div_43_section_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 35);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Modifier le cadre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Mettez a jour les informations du cadre selectionne sans recreer un nouveau referentiel.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 47);
    i0.ɵɵelementStart(7, "label", 48);
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 49);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.frameworkForm.code = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "label", 48);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 50);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.frameworkForm.name = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "label", 48);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Version");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 51);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.frameworkForm.version = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 48);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Juridiction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 52);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r27 = i0.ɵɵnextContext(2); return ctx_r27.frameworkForm.jurisdiction = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 48);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Entity Key");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 53);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.frameworkForm.entityKey = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "label", 48);
    i0.ɵɵelementStart(28, "span");
    i0.ɵɵtext(29, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 54);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_select_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.frameworkForm.status = $event; });
    i0.ɵɵelementStart(31, "option", 55);
    i0.ɵɵtext(32, "Brouillon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 56);
    i0.ɵɵtext(34, "Actif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 57);
    i0.ɵɵtext(36, "Revue requise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 58);
    i0.ɵɵtext(38, "Archive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "label", 48);
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Date d effet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "input", 59);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_42_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r30 = i0.ɵɵnextContext(2); return ctx_r30.frameworkForm.effectiveDate = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "label", 48);
    i0.ɵɵelementStart(44, "span");
    i0.ɵɵtext(45, "Date de revue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "input", 59);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_input_ngModelChange_46_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r31 = i0.ɵɵnextContext(2); return ctx_r31.frameworkForm.reviewDate = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "label", 60);
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "textarea", 61);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_1_Template_textarea_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r32 = i0.ɵɵnextContext(2); return ctx_r32.frameworkForm.description = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 21);
    i0.ɵɵelementStart(52, "button", 62);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_div_43_section_1_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r24); const ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.saveFramework(); });
    i0.ɵɵtext(53, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "button", 63);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_div_43_section_1_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r24); const ctx_r34 = i0.ɵɵnextContext(2); return ctx_r34.resetFrameworkForm(); });
    i0.ɵɵtext(55, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.code);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.name);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.version);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.jurisdiction);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.entityKey);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.status);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.effectiveDate);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.reviewDate);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r21.frameworkForm.description);
} }
function ComplianceFrameworksComponent_div_43_section_2_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 35);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Modifier l exigence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Ajustez le code, le chapitre, la description ou le poids de l exigence selectionnee.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 47);
    i0.ɵɵelementStart(7, "label", 48);
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Code exigence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 64);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r35 = i0.ɵɵnextContext(2); return ctx_r35.requirementForm.code = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "label", 60);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 65);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r37 = i0.ɵɵnextContext(2); return ctx_r37.requirementForm.title = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "label", 48);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Chapitre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 66);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r38 = i0.ɵɵnextContext(2); return ctx_r38.requirementForm.chapter = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 48);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Ordre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 67);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_input_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r39 = i0.ɵɵnextContext(2); return ctx_r39.requirementForm.orderIndex = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 48);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Applicabilite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "select", 54);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_select_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r40 = i0.ɵɵnextContext(2); return ctx_r40.requirementForm.applicability = $event; });
    i0.ɵɵelementStart(27, "option", 68);
    i0.ɵɵtext(28, "Applicable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 69);
    i0.ɵɵtext(30, "Partiellement applicable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "option", 70);
    i0.ɵɵtext(32, "Non applicable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "label", 48);
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "select", 54);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_select_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r41 = i0.ɵɵnextContext(2); return ctx_r41.requirementForm.status = $event; });
    i0.ɵɵelementStart(37, "option", 56);
    i0.ɵɵtext(38, "Active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 55);
    i0.ɵɵtext(40, "Brouillon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 71);
    i0.ɵɵtext(42, "Retiree");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "label", 48);
    i0.ɵɵelementStart(44, "span");
    i0.ɵɵtext(45, "Poids");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "input", 72);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_input_ngModelChange_46_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r42 = i0.ɵɵnextContext(2); return ctx_r42.requirementForm.weight = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "label", 60);
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "textarea", 73);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_43_section_2_Template_textarea_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r43 = i0.ɵɵnextContext(2); return ctx_r43.requirementForm.description = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 21);
    i0.ɵɵelementStart(52, "button", 62);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_div_43_section_2_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r36); const ctx_r44 = i0.ɵɵnextContext(2); return ctx_r44.saveRequirement(); });
    i0.ɵɵtext(53, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "button", 63);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_div_43_section_2_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r36); const ctx_r45 = i0.ɵɵnextContext(2); return ctx_r45.resetRequirementForm(); });
    i0.ɵɵtext(55, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.code);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.title);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.chapter);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.orderIndex);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.applicability);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.status);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.weight);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r22.requirementForm.description);
} }
function ComplianceFrameworksComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtemplate(1, ComplianceFrameworksComponent_div_43_section_1_Template, 56, 9, "section", 11);
    i0.ɵɵtemplate(2, ComplianceFrameworksComponent_div_43_section_2_Template, 56, 8, "section", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.frameworkEditingId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.requirementEditingId);
} }
function ComplianceFrameworksComponent_section_45_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 76);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_45_tr_20_Template_td_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r49); const framework_r47 = restoredCtx.$implicit; const ctx_r48 = i0.ɵɵnextContext(2); return ctx_r48.selectFramework(framework_r47.id); });
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "small");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵelementStart(17, "span", 77);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 78);
    i0.ɵɵelementStart(20, "button", 79);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_45_tr_20_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r49); const framework_r47 = restoredCtx.$implicit; const ctx_r50 = i0.ɵɵnextContext(2); return ctx_r50.editFramework(framework_r47); });
    i0.ɵɵtext(21, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 80);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_45_tr_20_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r49); const framework_r47 = restoredCtx.$implicit; const ctx_r51 = i0.ɵɵnextContext(2); return ctx_r51.deleteFramework(framework_r47); });
    i0.ɵɵtext(23, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r47 = ctx.$implicit;
    const ctx_r46 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row-selected", framework_r47.id === ctx_r46.selectedFrameworkId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(framework_r47.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", framework_r47.code, " - version ", framework_r47.version, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(framework_r47.jurisdiction || "Non renseignee");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(framework_r47.entityKey || "Aucun entity key");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Effet: ", ctx_r46.formatDate(framework_r47.effectiveDate), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Revue: ", ctx_r46.formatDate(framework_r47.reviewDate), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r46.getStatusClass(framework_r47.statusCode || framework_r47.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(framework_r47.statusLabel || framework_r47.status);
} }
function ComplianceFrameworksComponent_section_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 26);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Cadres suivis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Selectionnez un referentiel pour afficher ses exigences et lancer l import automatique.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "table", 74);
    i0.ɵɵelementStart(7, "thead");
    i0.ɵɵelementStart(8, "tr");
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Portee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Dates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, ComplianceFrameworksComponent_section_45_tr_20_Template, 24, 11, "tr", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r5.frameworks);
} }
function ComplianceFrameworksComponent_p_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Les exigences sont rattachees au referentiel actif pour alimenter campagnes et mappings.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_ng_template_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Choisissez un referentiel pour voir ses exigences.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_div_53_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r53 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", framework_r53.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3(" ", framework_r53.code, " - ", framework_r53.name, " v", framework_r53.version, " ");
} }
function ComplianceFrameworksComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Choisir un cadre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 54);
    i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_div_53_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r55); const ctx_r54 = i0.ɵɵnextContext(); return ctx_r54.selectFramework($event); });
    i0.ɵɵelementStart(4, "option", 81);
    i0.ɵɵtext(5, "Choisir un referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ComplianceFrameworksComponent_div_53_option_6_Template, 2, 4, "option", 82);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r9.selectedFrameworkId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r9.frameworks);
} }
function ComplianceFrameworksComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵelement(1, "i", 84);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucune exigence pour ce referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Importez un document pour alimenter automatiquement ce referentiel.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_table_55_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelementStart(12, "span", 77);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵelementStart(15, "span", 77);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 78);
    i0.ɵɵelementStart(18, "button", 79);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_table_55_tr_14_Template_button_click_18_listener() { const restoredCtx = i0.ɵɵrestoreView(_r59); const requirement_r57 = restoredCtx.$implicit; const ctx_r58 = i0.ɵɵnextContext(2); return ctx_r58.editRequirement(requirement_r57); });
    i0.ɵɵtext(19, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 80);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_table_55_tr_14_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r59); const requirement_r57 = restoredCtx.$implicit; const ctx_r60 = i0.ɵɵnextContext(2); return ctx_r60.deleteRequirement(requirement_r57); });
    i0.ɵɵtext(21, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const requirement_r57 = ctx.$implicit;
    const ctx_r56 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(requirement_r57.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(requirement_r57.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(requirement_r57.chapter || "Sans chapitre");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Ordre ", requirement_r57.orderIndex, " - poids ", requirement_r57.weight, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r56.getStatusClass(requirement_r57.applicabilityCode || requirement_r57.applicability));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(requirement_r57.applicabilityLabel || requirement_r57.applicability);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r56.getStatusClass(requirement_r57.statusCode || requirement_r57.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(requirement_r57.statusLabel || requirement_r57.status);
} }
function ComplianceFrameworksComponent_table_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 74);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Exigence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Structure");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Applicabilite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, ComplianceFrameworksComponent_table_55_tr_14_Template, 22, 9, "tr", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r11.paginatedRequirements);
} }
function ComplianceFrameworksComponent_app_pagination_56_Template(rf, ctx) { if (rf & 1) {
    const _r62 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 85);
    i0.ɵɵlistener("pageChanged", function ComplianceFrameworksComponent_app_pagination_56_Template_app_pagination_pageChanged_0_listener($event) { i0.ɵɵrestoreView(_r62); const ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.onReqPageChanged($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalItems", ctx_r12.requirements.length)("currentPage", ctx_r12.reqCurrentPage)("pageSize", ctx_r12.reqItemsPerPage);
} }
function ComplianceFrameworksComponent_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucun referentiel charge");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Chargez vos referentiels existants puis utilisez l import de document pour extraire automatiquement les exigences.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ComplianceFrameworksComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.navItems = getComplianceNavItems(getStoredComplianceRole());
        this.frameworks = [];
        this.requirements = [];
        this.isLoading = false;
        this.isImporting = false;
        this.reqCurrentPage = 1;
        this.reqItemsPerPage = 10;
        this.selectedFrameworkId = null;
        this.frameworkEditingId = null;
        this.requirementEditingId = null;
        this.importFileName = '';
        this.importResult = null;
        this.feedback = '';
        this.error = '';
        this.frameworkForm = this.createEmptyFrameworkForm();
        this.requirementForm = this.createEmptyRequirementForm();
    }
    ngOnInit() {
        this.loadFrameworks();
    }
    get selectedFramework() {
        return this.frameworks.find(item => item.id === this.selectedFrameworkId) || null;
    }
    loadFrameworks() {
        this.isLoading = true;
        this.error = '';
        this.complianceService.getFrameworks().subscribe({
            next: frameworks => {
                this.frameworks = frameworks;
                if (this.selectedFrameworkId && !frameworks.some(item => item.id === this.selectedFrameworkId)) {
                    this.selectedFrameworkId = null;
                }
                if (!this.selectedFrameworkId && frameworks.length > 0) {
                    this.selectedFrameworkId = frameworks[0].id;
                }
                this.loadRequirements();
                this.isLoading = false;
            },
            error: err => {
                var _a;
                this.frameworks = [];
                this.requirements = [];
                this.isLoading = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les referentiels.';
            }
        });
    }
    loadRequirements() {
        if (!this.selectedFrameworkId) {
            this.requirements = [];
            this.importResult = null;
            return;
        }
        this.complianceService.getRequirements(this.selectedFrameworkId).subscribe({
            next: items => {
                this.requirements = items;
                this.reqCurrentPage = 1;
            },
            error: err => {
                var _a;
                this.requirements = [];
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les exigences.';
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard/compliance']);
    }
    get paginatedRequirements() {
        const startIndex = (this.reqCurrentPage - 1) * this.reqItemsPerPage;
        return this.requirements.slice(startIndex, startIndex + this.reqItemsPerPage);
    }
    onReqPageChanged(event) {
        this.reqCurrentPage = event.page;
        this.reqItemsPerPage = event.pageSize;
    }
    selectFramework(frameworkId) {
        this.selectedFrameworkId = frameworkId;
        this.importResult = null;
        this.importFileName = '';
        this.resetFrameworkForm();
        this.resetRequirementForm();
        this.loadRequirements();
    }
    editFramework(item) {
        this.frameworkEditingId = item.id;
        this.frameworkForm = {
            code: item.code,
            name: item.name,
            version: item.version,
            jurisdiction: item.jurisdiction,
            description: item.description,
            entityKey: item.entityKey,
            status: item.statusCode || item.status,
            effectiveDate: this.toInputDate(item.effectiveDate),
            reviewDate: this.toInputDate(item.reviewDate)
        };
        this.feedback = `Edition du cadre ${item.code}.`;
        this.error = '';
    }
    saveFramework() {
        var _a, _b, _c;
        if (!this.frameworkEditingId) {
            this.error = 'Selectionnez un cadre a modifier.';
            return;
        }
        if (!((_a = this.frameworkForm.code) === null || _a === void 0 ? void 0 : _a.trim()) || !((_b = this.frameworkForm.name) === null || _b === void 0 ? void 0 : _b.trim()) || !((_c = this.frameworkForm.version) === null || _c === void 0 ? void 0 : _c.trim())) {
            this.error = 'Le code, le nom et la version du cadre sont obligatoires.';
            return;
        }
        const payload = {
            code: this.frameworkForm.code.trim(),
            name: this.frameworkForm.name.trim(),
            version: this.frameworkForm.version.trim(),
            jurisdiction: this.normalizeOptional(this.frameworkForm.jurisdiction),
            description: this.normalizeOptional(this.frameworkForm.description),
            entityKey: this.normalizeOptional(this.frameworkForm.entityKey),
            effectiveDate: this.normalizeOptional(this.frameworkForm.effectiveDate),
            reviewDate: this.normalizeOptional(this.frameworkForm.reviewDate),
            status: this.frameworkForm.status || 'draft'
        };
        this.error = '';
        this.feedback = '';
        this.complianceService.updateFramework(this.frameworkEditingId, payload).subscribe({
            next: () => {
                this.feedback = 'Cadre mis a jour.';
                this.resetFrameworkForm();
                this.loadFrameworks();
            },
            error: err => {
                var _a;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de mettre a jour le cadre.';
            }
        });
    }
    deleteFramework(item) {
        if (!window.confirm(`Supprimer le referentiel ${item.code} et ses exigences ?`)) {
            return;
        }
        this.complianceService.deleteFramework(item.id).subscribe({
            next: () => {
                this.feedback = 'Referentiel supprime.';
                this.loadFrameworks();
            },
            error: err => {
                var _a;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de supprimer le referentiel.';
            }
        });
    }
    editRequirement(item) {
        this.requirementEditingId = item.id;
        this.requirementForm = {
            frameworkId: item.frameworkId,
            code: item.code,
            title: item.title,
            description: item.description,
            chapter: item.chapter,
            orderIndex: item.orderIndex,
            applicability: item.applicabilityCode || item.applicability,
            status: item.statusCode || item.status,
            weight: item.weight
        };
        this.feedback = `Edition de l exigence ${item.code}.`;
        this.error = '';
    }
    saveRequirement() {
        var _a, _b;
        if (!this.requirementEditingId || !this.selectedFrameworkId) {
            this.error = 'Selectionnez une exigence a modifier.';
            return;
        }
        if (!((_a = this.requirementForm.code) === null || _a === void 0 ? void 0 : _a.trim()) || !((_b = this.requirementForm.title) === null || _b === void 0 ? void 0 : _b.trim())) {
            this.error = 'Le code et le titre de l exigence sont obligatoires.';
            return;
        }
        const payload = {
            frameworkId: this.selectedFrameworkId,
            code: this.requirementForm.code.trim(),
            title: this.requirementForm.title.trim(),
            description: this.normalizeOptional(this.requirementForm.description),
            chapter: this.normalizeOptional(this.requirementForm.chapter),
            orderIndex: Number(this.requirementForm.orderIndex || 0),
            applicability: this.requirementForm.applicability || 'applicable',
            status: this.requirementForm.status || 'active',
            weight: Number(this.requirementForm.weight || 1)
        };
        this.error = '';
        this.feedback = '';
        this.complianceService.updateRequirement(this.requirementEditingId, payload).subscribe({
            next: () => {
                this.feedback = 'Exigence mise a jour.';
                this.resetRequirementForm();
                this.loadRequirements();
            },
            error: err => {
                var _a;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de mettre a jour l exigence.';
            }
        });
    }
    deleteRequirement(item) {
        if (!window.confirm(`Supprimer l exigence ${item.code} ?`)) {
            return;
        }
        this.complianceService.deleteRequirement(item.id).subscribe({
            next: () => {
                this.feedback = 'Exigence supprimee.';
                this.loadRequirements();
                this.loadFrameworks();
            },
            error: err => {
                var _a;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de supprimer l exigence.';
            }
        });
    }
    resetFrameworkForm() {
        this.frameworkEditingId = null;
        this.frameworkForm = this.createEmptyFrameworkForm();
    }
    resetRequirementForm() {
        this.requirementEditingId = null;
        this.requirementForm = this.createEmptyRequirementForm();
    }
    onImportFileSelected(event) {
        var _a;
        const input = event.target;
        const file = ((_a = input === null || input === void 0 ? void 0 : input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        this.importFileName = (file === null || file === void 0 ? void 0 : file.name) || '';
        this.importResult = null;
        this.error = '';
    }
    importRequirements(input) {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            this.error = 'Selectionnez un document a importer.';
            return;
        }
        this.isImporting = true;
        this.error = '';
        this.feedback = '';
        this.importResult = null;
        this.complianceService.importRequirements(file).subscribe({
            next: result => {
                this.isImporting = false;
                this.importResult = result;
                this.selectedFrameworkId = result.frameworkId;
                this.feedback = result.message || 'Import termine.';
                input.value = '';
                this.importFileName = '';
                this.loadFrameworks();
            },
            error: err => {
                var _a;
                this.isImporting = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible d importer le document.';
            }
        });
    }
    formatDate(value) {
        return value ? new Date(value).toLocaleDateString('fr-FR') : 'Non planifie';
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
    }
    createEmptyFrameworkForm() {
        return {
            code: '',
            name: '',
            version: '',
            jurisdiction: '',
            description: '',
            entityKey: '',
            status: 'draft',
            effectiveDate: '',
            reviewDate: ''
        };
    }
    createEmptyRequirementForm() {
        return {
            frameworkId: 0,
            code: '',
            title: '',
            description: '',
            chapter: '',
            orderIndex: 0,
            applicability: 'applicable',
            status: 'active',
            weight: 1
        };
    }
    normalizeOptional(value) {
        return value && value.trim() ? value.trim() : null;
    }
    toInputDate(value) {
        return value ? new Date(value).toISOString().slice(0, 10) : null;
    }
}
ComplianceFrameworksComponent.ɵfac = function ComplianceFrameworksComponent_Factory(t) { return new (t || ComplianceFrameworksComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceFrameworksComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceFrameworksComponent, selectors: [["app-compliance-frameworks"]], decls: 59, vars: 20, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-book-open"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], [1, "section-grid", "section-grid-wide"], [1, "content-card", "import-card"], [1, "card-head"], [1, "import-dropzone"], [1, "import-copy"], [1, "eyebrow"], [1, "upload-field"], ["type", "file", "accept", ".pdf,.docx,.txt", 3, "disabled", "change"], ["importInput", ""], [1, "form-actions"], ["type", "button", 1, "btn-refresh", 3, "disabled", "click"], ["class", "import-results", 4, "ngIf"], ["class", "section-grid section-grid-wide", 4, "ngIf"], ["class", "table-card", 4, "ngIf", "ngIfElse"], [1, "table-card"], [4, "ngIf", "ngIfElse"], ["noSelectedFramework", ""], ["class", "filter-field", 4, "ngIf"], ["class", "empty-state compact", 4, "ngIf"], ["class", "compliance-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged", 4, "ngIf"], ["emptyState", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "content-card"], ["class", "feedback-message success", 4, "ngIf"], ["class", "feedback-message error", 4, "ngIf"], [1, "feedback-message", "success"], [1, "feedback-message", "error"], [1, "import-results"], [1, "import-kpis"], [1, "metric-card"], [1, "import-preview"], [4, "ngIf"], [1, "import-skipped-list"], [4, "ngFor", "ngForOf"], [1, "form-grid"], [1, "filter-field"], ["placeholder", "ISO-27001", 3, "ngModel", "ngModelChange"], ["placeholder", "ISO 27001", 3, "ngModel", "ngModelChange"], ["placeholder", "2022", 3, "ngModel", "ngModelChange"], ["placeholder", "Maroc", 3, "ngModel", "ngModelChange"], ["placeholder", "filiale-casa", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange"], ["value", "draft"], ["value", "active"], ["value", "review_required"], ["value", "archived"], ["type", "date", 3, "ngModel", "ngModelChange"], [1, "filter-field", "field-span-2"], ["rows", "3", "placeholder", "Perimetre et description du cadre.", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "btn-refresh", 3, "click"], ["type", "button", 1, "back-btn", 3, "click"], ["placeholder", "A.5.1", 3, "ngModel", "ngModelChange"], ["placeholder", "Titre de l exigence", 3, "ngModel", "ngModelChange"], ["placeholder", "Chapitre ou article", 3, "ngModel", "ngModelChange"], ["type", "number", 3, "ngModel", "ngModelChange"], ["value", "applicable"], ["value", "partially_applicable"], ["value", "not_applicable"], ["value", "retired"], ["type", "number", "step", "0.1", 3, "ngModel", "ngModelChange"], ["rows", "4", "placeholder", "Description detaillee de l exigence.", 3, "ngModel", "ngModelChange"], [1, "compliance-table"], [3, "row-selected", 4, "ngFor", "ngForOf"], [3, "click"], [1, "badge", 3, "ngClass"], [1, "action-cell"], ["type", "button", 1, "table-action", 3, "click"], ["type", "button", 1, "table-action", "danger", 3, "click"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "empty-state", "compact"], [1, "fas", "fa-list-check"], [3, "totalItems", "currentPage", "pageSize", "pageChanged"], [1, "empty-state"], [1, "fas", "fa-book"]], template: function ComplianceFrameworksComponent_Template(rf, ctx) { if (rf & 1) {
        const _r63 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Referentiels integres");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Administrez les cadres de conformite, leurs exigences et la structure de travail utilisee dans les campagnes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_12_listener() { return ctx.loadFrameworks(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceFrameworksComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ComplianceFrameworksComponent_div_17_Template, 3, 2, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "section", 13);
        i0.ɵɵelementStart(20, "div", 14);
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22, "Import intelligent d un cadre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Chargez un document `.docx`, `.pdf` ou `.txt` pour creer automatiquement un nouveau cadre de conformite. Le document devient le cadre, et son contenu est transforme en exigences.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 15);
        i0.ɵɵelementStart(26, "div", 16);
        i0.ɵɵelementStart(27, "span", 17);
        i0.ɵɵtext(28, "Creation automatique");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "h3");
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "p");
        i0.ɵɵtext(32, "Le moteur lit le document, cree un nouveau cadre a partir du fichier importe, puis ajoute les exigences detectees dans ce cadre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "label", 18);
        i0.ɵɵelementStart(34, "input", 19, 20);
        i0.ɵɵlistener("change", function ComplianceFrameworksComponent_Template_input_change_34_listener($event) { return ctx.onImportFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "span");
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 21);
        i0.ɵɵelementStart(39, "button", 22);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r63); const _r2 = i0.ɵɵreference(35); return ctx.importRequirements(_r2); });
        i0.ɵɵelement(40, "i", 8);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(42, ComplianceFrameworksComponent_div_42_Template, 30, 8, "div", 23);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(43, ComplianceFrameworksComponent_div_43_Template, 3, 2, "div", 24);
        i0.ɵɵelementStart(44, "div", 12);
        i0.ɵɵtemplate(45, ComplianceFrameworksComponent_section_45_Template, 21, 1, "section", 25);
        i0.ɵɵelementStart(46, "section", 26);
        i0.ɵɵelementStart(47, "div", 14);
        i0.ɵɵelementStart(48, "h2");
        i0.ɵɵtext(49, "Exigences du referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(50, ComplianceFrameworksComponent_p_50_Template, 2, 0, "p", 27);
        i0.ɵɵtemplate(51, ComplianceFrameworksComponent_ng_template_51_Template, 2, 0, "ng-template", null, 28, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(53, ComplianceFrameworksComponent_div_53_Template, 7, 3, "div", 29);
        i0.ɵɵtemplate(54, ComplianceFrameworksComponent_div_54_Template, 6, 0, "div", 30);
        i0.ɵɵtemplate(55, ComplianceFrameworksComponent_table_55_Template, 15, 1, "table", 31);
        i0.ɵɵtemplate(56, ComplianceFrameworksComponent_app_pagination_56_Template, 1, 3, "app-pagination", 32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(57, ComplianceFrameworksComponent_ng_template_57_Template, 6, 0, "ng-template", null, 33, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r7 = i0.ɵɵreference(52);
        const _r13 = i0.ɵɵreference(58);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedback || ctx.error);
        i0.ɵɵadvance(13);
        i0.ɵɵtextInterpolate(ctx.importFileName || "Aucun document selectionne");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", ctx.isImporting);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.importFileName || "Choisir un document");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", !ctx.importFileName || ctx.isImporting);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isImporting ? "fa-circle-notch fa-spin" : "fa-file-import");
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isImporting ? "Import en cours..." : "Importer le cadre", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.importResult);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.frameworkEditingId || ctx.requirementEditingId);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.frameworks.length > 0)("ngIfElse", _r13);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId)("ngIfElse", _r7);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.frameworks.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId && ctx.requirements.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.requirements.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.requirements.length > 0);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.NumberValueAccessor], pipes: [i3.SlicePipe], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceFrameworksComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-frameworks',
                templateUrl: './compliance-frameworks.component.html',
                styleUrls: ['./compliance-frameworks.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-frameworks.component.js.map