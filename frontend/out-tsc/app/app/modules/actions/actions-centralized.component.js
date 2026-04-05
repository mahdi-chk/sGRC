import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../core/services/notification.service';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import { ActionsService } from './actions.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./actions.service";
import * as i3 from "../../core/services/notification.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function ActionsCentralizedComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function ActionsCentralizedComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "Actions visibles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Portefeuille consolide sur la vue centrale.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10, "Prioritaires");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Actions critiques a arbitrer en priorite.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16);
    i0.ɵɵelementStart(16, "span", 17);
    i0.ɵɵtext(17, "Modules sources");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Origines actuellement alimentees dans le dispositif.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16);
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24, "Bloquees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Actions en attente de levee de dependances.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.registry.length);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.criticalCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.linkedModulesCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r6.summary.blockedActions);
} }
function ActionsCentralizedComponent_div_18_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r7.feedbackTone === "error" ? "tone-error" : "tone-success");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.feedbackMessage, " ");
} }
function ActionsCentralizedComponent_div_18_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r14);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(status_r14);
} }
function ActionsCentralizedComponent_div_18_option_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const source_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", source_r15);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(source_r15);
} }
function ActionsCentralizedComponent_div_18_option_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const priority_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", priority_r16);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(priority_r16);
} }
function ActionsCentralizedComponent_div_18_option_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r17.value);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(option_r17.label);
} }
function ActionsCentralizedComponent_div_18_div_42_div_11_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r23 = ctx.$implicit;
    const ctx_r22 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", user_r23.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r22.buildUserLabel(user_r23));
} }
function ActionsCentralizedComponent_div_18_div_42_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelementStart(1, "label", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Responsable a designer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 24);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_div_42_div_11_Template_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(3); return ctx_r24.selectedAssigneeId = $event; });
    i0.ɵɵelementStart(5, "option", 25);
    i0.ɵɵtext(6, "Selectionner un responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ActionsCentralizedComponent_div_18_div_42_div_11_option_7_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 39);
    i0.ɵɵelementStart(9, "button", 40);
    i0.ɵɵlistener("click", function ActionsCentralizedComponent_div_18_div_42_div_11_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r25); const ctx_r26 = i0.ɵɵnextContext(3); return ctx_r26.submitAssignment(); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 41);
    i0.ɵɵlistener("click", function ActionsCentralizedComponent_div_18_div_42_div_11_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r25); const ctx_r27 = i0.ɵɵnextContext(3); return ctx_r27.closeAssignmentPanel(); });
    i0.ɵɵtext(12, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r19.selectedAssigneeId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r19.assignableUsers);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r19.canSubmitAssignment);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r19.isSubmittingAssignment ? "Affectation en cours..." : "Confirmer l affectation", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r19.isSubmittingAssignment);
} }
function ActionsCentralizedComponent_div_18_div_42_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1, "Chargement des responsables disponibles...");
    i0.ɵɵelementEnd();
} }
function ActionsCentralizedComponent_div_18_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelementStart(1, "div", 35);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "Affectation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 27);
    i0.ɵɵlistener("click", function ActionsCentralizedComponent_div_18_div_42_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r29); const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.closeAssignmentPanel(); });
    i0.ɵɵtext(10, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ActionsCentralizedComponent_div_18_div_42_div_11_Template, 13, 5, "div", 36);
    i0.ɵɵtemplate(12, ActionsCentralizedComponent_div_18_div_42_ng_template_12_Template, 2, 0, "ng-template", null, 37, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selected_r18 = ctx.ngIf;
    const _r20 = i0.ɵɵreference(13);
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(selected_r18.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", selected_r18.title, " | ", selected_r18.sourceModule, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r12.isLoadingAssignableUsers)("ngIfElse", _r20);
} }
function ActionsCentralizedComponent_div_18_tr_61_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function ActionsCentralizedComponent_div_18_tr_61_button_31_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r35); const action_r32 = restoredCtx.$implicit; const item_r30 = i0.ɵɵnextContext().$implicit; const ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.onActionClick(action_r32, item_r30); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r32 = ctx.$implicit;
    const item_r30 = i0.ɵɵnextContext().$implicit;
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r31.isActionBusy(action_r32, item_r30));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r31.getActionLabel(action_r32, item_r30), " ");
} }
function ActionsCentralizedComponent_div_18_tr_61_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "small");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵelementStart(17, "div", 43);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 44);
    i0.ɵɵelement(21, "div", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "small");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td");
    i0.ɵɵelementStart(27, "span", 46);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td");
    i0.ɵɵelementStart(30, "div", 47);
    i0.ɵɵtemplate(31, ActionsCentralizedComponent_div_18_tr_61_button_31_Template, 2, 2, "button", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r30 = ctx.$implicit;
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r30.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r30.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r30.sourceModule);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r30.sourceReference, " | ", item_r30.department, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r30.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Mise a jour: ", ctx_r13.formatDate(item_r30.lastUpdate), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", item_r30.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r30.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r30.dependencies.join(" | "));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r13.formatDate(item_r30.dueDate));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r13.getStatusClass(item_r30.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r30.status);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", item_r30.displayActions);
} }
function ActionsCentralizedComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Registre des actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Chaque ligne conserve la source, les dependances, l avancement et les actions de pilotage proposees.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ActionsCentralizedComponent_div_18_div_6_Template, 2, 2, "div", 20);
    i0.ɵɵelementStart(7, "div", 21);
    i0.ɵɵelementStart(8, "label", 22);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Recherche");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 23);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.onFilterChange("q", $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "label", 22);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 24);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.onFilterChange("status", $event); });
    i0.ɵɵelementStart(16, "option", 25);
    i0.ɵɵtext(17, "Tous");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ActionsCentralizedComponent_div_18_option_18_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 22);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "select", 24);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_Template_select_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.onFilterChange("source", $event); });
    i0.ɵɵelementStart(23, "option", 25);
    i0.ɵɵtext(24, "Toutes");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, ActionsCentralizedComponent_div_18_option_25_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 22);
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28, "Priorite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "select", 24);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_Template_select_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.onFilterChange("priority", $event); });
    i0.ɵɵelementStart(30, "option", 25);
    i0.ɵɵtext(31, "Toutes");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, ActionsCentralizedComponent_div_18_option_32_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "label", 22);
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Affectation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "select", 24);
    i0.ɵɵlistener("ngModelChange", function ActionsCentralizedComponent_div_18_Template_select_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r42 = i0.ɵɵnextContext(); return ctx_r42.onFilterChange("owner", $event); });
    i0.ɵɵtemplate(37, ActionsCentralizedComponent_div_18_option_37_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 27);
    i0.ɵɵlistener("click", function ActionsCentralizedComponent_div_18_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r38); const ctx_r43 = i0.ɵɵnextContext(); return ctx_r43.clearFilters(); });
    i0.ɵɵtext(39, "Reinitialiser");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "p", 28);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(42, ActionsCentralizedComponent_div_18_div_42_Template, 14, 5, "div", 29);
    i0.ɵɵelementStart(43, "table", 30);
    i0.ɵɵelementStart(44, "thead");
    i0.ɵɵelementStart(45, "tr");
    i0.ɵɵelementStart(46, "th");
    i0.ɵɵtext(47, "Reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "th");
    i0.ɵɵtext(49, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "th");
    i0.ɵɵtext(51, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "th");
    i0.ɵɵtext(53, "Avancement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵtext(55, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th");
    i0.ɵɵtext(59, "Actions a faire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "tbody");
    i0.ɵɵtemplate(61, ActionsCentralizedComponent_div_18_tr_61_Template, 32, 15, "tr", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.feedbackMessage);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r2.filters.q);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.filters.status);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.statusOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.filters.source);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.sourceOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.filters.priority);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.priorityOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.filters.owner);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.ownerOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r2.filteredRegistry.length, " action(s) affichee(s) sur ", ctx_r2.registry.length, ".");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.assignmentItem);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredRegistry);
} }
function ActionsCentralizedComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1, "Aucune action centralisee disponible.");
    i0.ɵɵelementEnd();
} }
export class ActionsCentralizedComponent {
    constructor(router, route, actionsService, notificationService) {
        this.router = router;
        this.route = route;
        this.actionsService = actionsService;
        this.notificationService = notificationService;
        this.navItems = getActionsNavItems(getStoredActionsRole());
        this.overview = null;
        this.isLoading = false;
        this.assignmentItem = null;
        this.assignableUsers = [];
        this.selectedAssigneeId = '';
        this.isLoadingAssignableUsers = false;
        this.isSubmittingAssignment = false;
        this.activeActionKey = '';
        this.feedbackMessage = '';
        this.feedbackTone = '';
        this.filters = {
            q: '',
            status: '',
            source: '',
            priority: '',
            owner: ''
        };
        this.statusOptions = ['en_retard', 'bloquee', 'en_cours', 'a_demarrer', 'clos'];
        this.priorityOptions = ['critique', 'elevee', 'moyenne', 'faible'];
        this.ownerOptions = [
            { value: '', label: 'Tous' },
            { value: 'assigned', label: 'Assignes' },
            { value: 'non_assigne', label: 'Non assignes' }
        ];
    }
    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.filters = {
                q: params.get('q') || '',
                status: params.get('status') || '',
                source: params.get('source') || '',
                priority: params.get('priority') || '',
                owner: params.get('owner') || ''
            };
        });
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.actionsService.getOverview().subscribe({
            next: overview => {
                this.overview = overview;
                this.isLoading = false;
            },
            error: () => {
                this.overview = null;
                this.isLoading = false;
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard/actions']);
    }
    onFilterChange(key, value) {
        this.filters = Object.assign(Object.assign({}, this.filters), { [key]: value });
        this.applyFilters();
    }
    clearFilters() {
        this.filters = { q: '', status: '', source: '', priority: '', owner: '' };
        this.applyFilters();
    }
    applyFilters() {
        const queryParams = Object.entries(this.filters).reduce((accumulator, [key, value]) => {
            if (value) {
                accumulator[key] = value;
            }
            return accumulator;
        }, {});
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            replaceUrl: true
        });
    }
    onActionClick(action, item) {
        if (action === 'Voir source') {
            this.clearFeedback();
            this.router.navigate([item.sourceRoute]);
            return;
        }
        if (action === 'Suivre' || action === 'Planifier') {
            this.clearFeedback();
            this.router.navigate(['/dashboard/actions-deadlines'], {
                queryParams: { q: item.reference }
            });
            return;
        }
        if (action === 'Relancer') {
            this.sendReminder(item);
            return;
        }
        if (action === 'Escalader') {
            this.clearFeedback();
            this.router.navigate(['/dashboard/actions-notifications'], {
                queryParams: {
                    status: 'active',
                    q: item.reference,
                    focus: action.toLowerCase()
                }
            });
            return;
        }
        if (action === 'Affecter') {
            this.openAssignmentPanel(item);
        }
    }
    openAssignmentPanel(item) {
        this.assignmentItem = item;
        this.selectedAssigneeId = '';
        this.assignableUsers = [];
        this.clearFeedback();
        this.isLoadingAssignableUsers = true;
        this.activeActionKey = this.buildActionKey(item, 'Affecter');
        this.actionsService.getAssignableUsers(item.id).pipe(finalize(() => {
            this.isLoadingAssignableUsers = false;
            this.activeActionKey = '';
        })).subscribe({
            next: users => {
                this.assignableUsers = users;
                if (!users.length) {
                    this.setFeedback('Aucun responsable assignable n est disponible pour cette action.', 'error');
                }
            },
            error: error => {
                this.assignmentItem = null;
                this.setFeedback(this.getErrorMessage(error, 'Impossible d ouvrir le panneau d affectation.'), 'error');
            }
        });
    }
    closeAssignmentPanel() {
        this.assignmentItem = null;
        this.assignableUsers = [];
        this.selectedAssigneeId = '';
        this.isLoadingAssignableUsers = false;
        this.isSubmittingAssignment = false;
    }
    submitAssignment() {
        if (!this.assignmentItem || !this.selectedAssigneeId || this.isSubmittingAssignment) {
            return;
        }
        const targetItem = this.assignmentItem;
        this.clearFeedback();
        this.isSubmittingAssignment = true;
        this.activeActionKey = this.buildActionKey(targetItem, 'Affecter');
        this.actionsService.assignAction(targetItem.id, Number(this.selectedAssigneeId)).pipe(finalize(() => {
            this.isSubmittingAssignment = false;
            this.activeActionKey = '';
        })).subscribe({
            next: response => {
                this.closeAssignmentPanel();
                this.notificationService.refresh();
                this.setFeedback(response.message || 'Affectation enregistree avec succes.', 'success');
                this.loadOverview();
            },
            error: error => {
                this.setFeedback(this.getErrorMessage(error, 'Impossible d affecter cette action.'), 'error');
            }
        });
    }
    sendReminder(item) {
        this.clearFeedback();
        this.activeActionKey = this.buildActionKey(item, 'Relancer');
        this.actionsService.sendReminder(item.id).pipe(finalize(() => {
            this.activeActionKey = '';
        })).subscribe({
            next: (response) => {
                this.notificationService.refresh();
                const recipientLabel = response.sentCount ? ` (${response.sentCount} destinataire${response.sentCount > 1 ? 's' : ''})` : '';
                this.setFeedback(`${response.message || 'Relance envoyee'}${recipientLabel}.`, 'success');
            },
            error: error => {
                this.setFeedback(this.getErrorMessage(error, 'Impossible de creer la relance.'), 'error');
            }
        });
    }
    get registry() {
        var _a;
        return ((_a = this.overview) === null || _a === void 0 ? void 0 : _a.registry) || [];
    }
    get filteredRegistry() {
        return this.registry.filter(item => {
            const query = this.filters.q.trim().toLowerCase();
            const matchesQuery = !query || [
                item.reference,
                item.title,
                item.sourceModule,
                item.sourceReference,
                item.owner,
                item.department
            ].some(value => String(value || '').toLowerCase().includes(query));
            const matchesStatus = !this.filters.status || item.status === this.filters.status;
            const matchesSource = !this.filters.source || item.sourceModule === this.filters.source;
            const matchesPriority = !this.filters.priority || item.priority === this.filters.priority;
            const matchesOwner = !this.filters.owner ||
                (this.filters.owner === 'assigned' && item.owner !== 'Non assigne') ||
                (this.filters.owner === 'non_assigne' && item.owner === 'Non assigne');
            return matchesQuery && matchesStatus && matchesSource && matchesPriority && matchesOwner;
        });
    }
    get criticalCount() {
        return this.registry.filter(item => /critique|critical/i.test(item.priority || '')).length;
    }
    get linkedModulesCount() {
        return new Set(this.registry.map(item => item.sourceModule)).size;
    }
    get sourceOptions() {
        return Array.from(new Set(this.registry.map(item => item.sourceModule))).sort();
    }
    get canSubmitAssignment() {
        return Boolean(this.assignmentItem && this.selectedAssigneeId && !this.isSubmittingAssignment);
    }
    buildUserLabel(user) {
        const name = `${user.prenom || ''} ${user.nom || ''}`.trim();
        const meta = [user.poste, user.mail].filter(Boolean).join(' | ');
        return meta ? `${name} - ${meta}` : name;
    }
    isActionBusy(action, item) {
        return this.activeActionKey === this.buildActionKey(item, action);
    }
    getActionLabel(action, item) {
        if (!this.isActionBusy(action, item)) {
            return action;
        }
        if (action === 'Relancer') {
            return 'Relance...';
        }
        if (action === 'Affecter') {
            return this.isSubmittingAssignment || this.isLoadingAssignableUsers ? 'Affectation...' : action;
        }
        return 'Chargement...';
    }
    formatDate(value) {
        if (!value) {
            return 'Non planifie';
        }
        return new Date(value).toLocaleDateString('fr-FR');
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/_/g, '-')}`;
    }
    buildActionKey(item, action) {
        return `${item.id}:${action}`;
    }
    setFeedback(message, tone) {
        this.feedbackMessage = message;
        this.feedbackTone = tone;
    }
    clearFeedback() {
        this.feedbackMessage = '';
        this.feedbackTone = '';
    }
    getErrorMessage(error, fallback) {
        var _a;
        return ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) || fallback;
    }
}
ActionsCentralizedComponent.ɵfac = function ActionsCentralizedComponent_Factory(t) { return new (t || ActionsCentralizedComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ActionsService), i0.ɵɵdirectiveInject(i3.NotificationService)); };
ActionsCentralizedComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionsCentralizedComponent, selectors: [["app-actions-centralized"]], decls: 21, vars: 6, consts: [[1, "actions-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-list-check"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "actions-tabs"], ["routerLinkActive", "active", "class", "actions-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "table-card", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "actions-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "table-card"], [1, "card-head"], ["class", "feedback-banner", 3, "ngClass", 4, "ngIf"], [1, "filter-bar"], [1, "filter-field"], ["type", "text", "placeholder", "Reference, titre, owner...", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn-refresh", "btn-clear", 3, "click"], [1, "results-caption"], ["class", "assignment-panel", 4, "ngIf"], [1, "actions-table"], [4, "ngFor", "ngForOf"], [1, "feedback-banner", 3, "ngClass"], [3, "value"], [1, "assignment-panel"], [1, "assignment-head"], ["class", "assignment-body", 4, "ngIf", "ngIfElse"], ["assignmentLoading", ""], [1, "assignment-body"], [1, "assignment-actions"], ["type", "button", 1, "btn-refresh", 3, "disabled", "click"], ["type", "button", 1, "btn-refresh", "btn-clear", 3, "disabled", "click"], [1, "status-line"], [1, "progress-line"], [1, "progress-track"], [1, "progress-fill"], [1, "badge", 3, "ngClass"], [1, "mini-actions"], ["type", "button", "class", "action-btn", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "action-btn", 3, "disabled", "click"], [1, "empty-state"]], template: function ActionsCentralizedComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ActionsCentralizedComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gestion Centralisee");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Referentiel consolide des actions issues des audits, incidents et risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ActionsCentralizedComponent_Template_button_click_12_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ActionsCentralizedComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ActionsCentralizedComponent_div_17_Template, 29, 4, "div", 11);
        i0.ɵɵtemplate(18, ActionsCentralizedComponent_div_18_Template, 62, 14, "div", 12);
        i0.ɵɵtemplate(19, ActionsCentralizedComponent_ng_template_19_Template, 2, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(20);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.registry.length > 0)("ngIfElse", _r3);
    } }, directives: [i4.NgClass, i4.NgForOf, i4.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i5.SelectControlValueAccessor, i5.NgSelectOption, i5.ɵNgSelectMultipleOption], styles: ["@import './actions-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsCentralizedComponent, [{
        type: Component,
        args: [{
                selector: 'app-actions-centralized',
                templateUrl: './actions-centralized.component.html',
                styleUrls: ['./actions-centralized.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.ActionsService }, { type: i3.NotificationService }]; }, null); })();
//# sourceMappingURL=actions-centralized.component.js.map