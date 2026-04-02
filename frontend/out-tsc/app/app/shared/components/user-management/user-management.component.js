import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserRole } from '../../../core/models/user-role.enum';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../modal/modal.component";
function UserManagementComponent_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵlistener("click", function UserManagementComponent_div_11_div_1_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const poste_r9 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); ctx_r10.filters.role = poste_r9.code; return ctx_r10.applyFilters(); });
    i0.ɵɵelementStart(1, "span", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 40);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const poste_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r8.filters.role === poste_r9.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r8.roleStats[poste_r9.code] || 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(poste_r9.label);
} }
function UserManagementComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtemplate(1, UserManagementComponent_div_11_div_1_Template, 5, 4, "div", 37);
    i0.ɵɵelementStart(2, "div", 38);
    i0.ɵɵlistener("click", function UserManagementComponent_div_11_Template_div_click_2_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); ctx_r12.filters.role = ""; return ctx_r12.applyFilters(); });
    i0.ɵɵelementStart(3, "span", 39);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 40);
    i0.ɵɵtext(6, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.postes);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.users.length);
} }
function UserManagementComponent_option_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r14.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(r_r14.label);
} }
function UserManagementComponent_option_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r15.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r15.nom);
} }
function UserManagementComponent_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function UserManagementComponent_button_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.resetFilters(); });
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function UserManagementComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵlistener("click", function UserManagementComponent_div_48_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r20); const user_r18 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.selectUser(user_r18); });
    i0.ɵɵelementStart(1, "div", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 47);
    i0.ɵɵelementStart(4, "span", 48);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 49);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵelement(10, "i", 50);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵelement(13, "i", 51);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 52);
    i0.ɵɵelementStart(16, "button", 53);
    i0.ɵɵlistener("click", function UserManagementComponent_div_48_Template_button_click_16_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r20); const user_r18 = restoredCtx.$implicit; const ctx_r21 = i0.ɵɵnextContext(); ctx_r21.openUserModal(user_r18); return $event.stopPropagation(); });
    i0.ɵɵelement(17, "i", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 55);
    i0.ɵɵlistener("click", function UserManagementComponent_div_48_Template_button_click_18_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r20); const user_r18 = restoredCtx.$implicit; const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.deleteUser($event, user_r18); });
    i0.ɵɵelement(19, "i", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r18 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", user_r18.prenom[0], "", user_r18.nom[0], "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", user_r18.role.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(user_r18.role.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", user_r18.prenom, " ", user_r18.nom, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", user_r18.mail, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", user_r18.telephone, "");
} }
function UserManagementComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵelement(1, "i", 58);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun utilisateur trouve correspondant a vos criteres.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function UserManagementComponent_app_modal_50_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r24.validationErrors.prenom);
} }
function UserManagementComponent_app_modal_50_span_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r25.validationErrors.nom);
} }
function UserManagementComponent_app_modal_50_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r26.validationErrors.mail);
} }
function UserManagementComponent_app_modal_50_span_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r27.validationErrors.telephone);
} }
function UserManagementComponent_app_modal_50_option_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r35 = ctx.$implicit;
    i0.ɵɵproperty("value", role_r35.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(role_r35.label);
} }
function UserManagementComponent_app_modal_50_span_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r29.validationErrors.role);
} }
function UserManagementComponent_app_modal_50_option_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r36 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r36.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r36.nom);
} }
function UserManagementComponent_app_modal_50_span_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r31.validationErrors.departementId);
} }
function UserManagementComponent_app_modal_50_span_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r32.validationErrors.password);
} }
function UserManagementComponent_app_modal_50_span_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r33 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r33.validationErrors.confirmPassword);
} }
function UserManagementComponent_app_modal_50_span_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 94);
    i0.ɵɵtext(1, "Laissez vide si vous ne souhaitez pas modifier le mot de passe.");
    i0.ɵɵelementEnd();
} }
function UserManagementComponent_app_modal_50_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 59);
    i0.ɵɵlistener("close", function UserManagementComponent_app_modal_50_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.closeUserModal(); });
    i0.ɵɵelementStart(1, "div", 60, 61);
    i0.ɵɵelementStart(3, "div", 62);
    i0.ɵɵelementStart(4, "div", 63);
    i0.ɵɵelement(5, "i", 64);
    i0.ɵɵtext(6, " Informations Personnelles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 65);
    i0.ɵɵelementStart(8, "div", 66);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Prenom ");
    i0.ɵɵelementStart(11, "span", 67);
    i0.ɵɵtext(12, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 68);
    i0.ɵɵelement(14, "i", 69);
    i0.ɵɵelementStart(15, "input", 70);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.userForm.prenom = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, UserManagementComponent_app_modal_50_span_16_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 66);
    i0.ɵɵelementStart(18, "label");
    i0.ɵɵtext(19, "Nom ");
    i0.ɵɵelementStart(20, "span", 67);
    i0.ɵɵtext(21, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 68);
    i0.ɵɵelement(23, "i", 72);
    i0.ɵɵelementStart(24, "input", 73);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.userForm.nom = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, UserManagementComponent_app_modal_50_span_25_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 66);
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Email ");
    i0.ɵɵelementStart(29, "span", 67);
    i0.ɵɵtext(30, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 68);
    i0.ɵɵelement(32, "i", 74);
    i0.ɵɵelementStart(33, "input", 75);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.userForm.mail = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(34, UserManagementComponent_app_modal_50_span_34_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 66);
    i0.ɵɵelementStart(36, "label");
    i0.ɵɵtext(37, "Telephone ");
    i0.ɵɵelementStart(38, "span", 67);
    i0.ɵɵtext(39, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 68);
    i0.ɵɵelement(41, "i", 76);
    i0.ɵɵelementStart(42, "input", 77);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_42_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r42 = i0.ɵɵnextContext(); return ctx_r42.userForm.telephone = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(43, UserManagementComponent_app_modal_50_span_43_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 62);
    i0.ɵɵelementStart(45, "div", 63);
    i0.ɵɵelement(46, "i", 78);
    i0.ɵɵtext(47, " Role et Affectation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 65);
    i0.ɵɵelementStart(49, "div", 66);
    i0.ɵɵelementStart(50, "label");
    i0.ɵɵtext(51, "Role ");
    i0.ɵɵelementStart(52, "span", 67);
    i0.ɵɵtext(53, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 68);
    i0.ɵɵelement(55, "i", 79);
    i0.ɵɵelementStart(56, "select", 16);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_select_ngModelChange_56_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r43 = i0.ɵɵnextContext(); return ctx_r43.userForm.role = $event; });
    i0.ɵɵelementStart(57, "option", 17);
    i0.ɵɵtext(58, "Selectionner un role");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(59, UserManagementComponent_app_modal_50_option_59_Template, 2, 2, "option", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(60, UserManagementComponent_app_modal_50_span_60_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 66);
    i0.ɵɵelementStart(62, "label");
    i0.ɵɵtext(63, "Departement ");
    i0.ɵɵelementStart(64, "span", 67);
    i0.ɵɵtext(65, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "div", 68);
    i0.ɵɵelement(67, "i", 80);
    i0.ɵɵelementStart(68, "select", 16);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_select_ngModelChange_68_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r44 = i0.ɵɵnextContext(); return ctx_r44.userForm.departementId = $event; });
    i0.ɵɵelementStart(69, "option", 20);
    i0.ɵɵtext(70, "Selectionner un departement");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(71, UserManagementComponent_app_modal_50_option_71_Template, 2, 2, "option", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(72, UserManagementComponent_app_modal_50_span_72_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "div", 62);
    i0.ɵɵelementStart(74, "div", 63);
    i0.ɵɵelement(75, "i", 81);
    i0.ɵɵtext(76, " Securite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "div", 65);
    i0.ɵɵelementStart(78, "div", 66);
    i0.ɵɵelementStart(79, "label");
    i0.ɵɵtext(80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "div", 82);
    i0.ɵɵelement(82, "i", 83);
    i0.ɵɵelementStart(83, "input", 84);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_83_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r45 = i0.ɵɵnextContext(); return ctx_r45.userForm.password = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "button", 85);
    i0.ɵɵlistener("click", function UserManagementComponent_app_modal_50_Template_button_click_84_listener() { i0.ɵɵrestoreView(_r38); const ctx_r46 = i0.ɵɵnextContext(); return ctx_r46.togglePasswordVisibility(); });
    i0.ɵɵelement(85, "i", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(86, UserManagementComponent_app_modal_50_span_86_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "div", 66);
    i0.ɵɵelementStart(88, "label");
    i0.ɵɵtext(89, "Confirmer le mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "div", 82);
    i0.ɵɵelement(91, "i", 87);
    i0.ɵɵelementStart(92, "input", 88);
    i0.ɵɵlistener("ngModelChange", function UserManagementComponent_app_modal_50_Template_input_ngModelChange_92_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r47 = i0.ɵɵnextContext(); return ctx_r47.userForm.confirmPassword = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "button", 85);
    i0.ɵɵlistener("click", function UserManagementComponent_app_modal_50_Template_button_click_93_listener() { i0.ɵɵrestoreView(_r38); const ctx_r48 = i0.ɵɵnextContext(); return ctx_r48.toggleConfirmPasswordVisibility(); });
    i0.ɵɵelement(94, "i", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(95, UserManagementComponent_app_modal_50_span_95_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(96, UserManagementComponent_app_modal_50_span_96_Template, 2, 0, "span", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(97, "div", 90);
    i0.ɵɵelementStart(98, "button", 91);
    i0.ɵɵlistener("click", function UserManagementComponent_app_modal_50_Template_button_click_98_listener() { i0.ɵɵrestoreView(_r38); const ctx_r49 = i0.ɵɵnextContext(); return ctx_r49.closeUserModal(); });
    i0.ɵɵtext(99, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "button", 92);
    i0.ɵɵlistener("click", function UserManagementComponent_app_modal_50_Template_button_click_100_listener() { i0.ɵɵrestoreView(_r38); const ctx_r50 = i0.ɵɵnextContext(); return ctx_r50.saveUser(); });
    i0.ɵɵtext(101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r6.editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur");
    i0.ɵɵadvance(15);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.prenom);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.prenom);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.prenom);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.nom);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.nom);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.nom);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.mail);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.mail);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.mail);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.telephone);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.telephone);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.telephone);
    i0.ɵɵadvance(13);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.role);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.role);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r6.postes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.role);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.departementId);
    i0.ɵɵproperty("ngModel", ctx_r6.userForm.departementId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r6.departements);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.departementId);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("Mot de passe ", ctx_r6.editingUser ? "(Optionnel)" : "*", "");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.password);
    i0.ɵɵproperty("type", ctx_r6.showPassword ? "text" : "password")("ngModel", ctx_r6.userForm.password);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-eye", !ctx_r6.showPassword)("fa-eye-slash", ctx_r6.showPassword);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.password);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("input-error", ctx_r6.validationErrors.confirmPassword);
    i0.ɵɵproperty("type", ctx_r6.showConfirmPassword ? "text" : "password")("ngModel", ctx_r6.userForm.confirmPassword);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-eye", !ctx_r6.showConfirmPassword)("fa-eye-slash", ctx_r6.showConfirmPassword);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.validationErrors.confirmPassword);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.editingUser);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r6.isSaving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r6.isSaving);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.isSaving ? "En cours..." : ctx_r6.editingUser ? "Mettre a jour" : "Creer l'utilisateur", " ");
} }
function UserManagementComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r52 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95);
    i0.ɵɵelementStart(1, "div", 96);
    i0.ɵɵelement(2, "i", 97);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 98);
    i0.ɵɵelementStart(4, "span", 99);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 100);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 101);
    i0.ɵɵlistener("click", function UserManagementComponent_div_51_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r52); const ctx_r51 = i0.ɵɵnextContext(); ctx_r51.status = null; return ctx_r51.messageType = null; });
    i0.ɵɵelement(9, "i", 102);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r7.messageType);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r7.messageType === "success" ? "fa-check-circle" : "fa-exclamation-circle");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r7.messageType === "success" ? "Succ\u00E8s" : "Erreur");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.status);
} }
export class UserManagementComponent {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.modalVisible = false;
        this.userSearchTerm = '';
        this.editingUser = null;
        this.userForm = this.emptyUser();
        this.users = [];
        this.validationErrors = {};
        this.status = null;
        this.messageType = null;
        this.showExportMenu = false;
        this.showPassword = false;
        this.showConfirmPassword = false;
        this.isSaving = false;
        this.roleStats = {};
        this.postes = [];
        this.departements = [];
        this.UserRole = UserRole;
        this.filters = {
            search: '',
            role: '',
            department: 0
        };
        this.filteredUsers = [];
    }
    ngOnInit() {
        this.loadUsers();
        this.loadDepartments();
        this.loadRoles();
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    extractErrorMessage(prefix, err) {
        var _a;
        const apiMessage = (_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message;
        return apiMessage ? `${prefix}: ${apiMessage}` : `${prefix}: ${err.status || err.message}`;
    }
    emptyUser() {
        return {
            nom: '',
            prenom: '',
            mail: '',
            telephone: '',
            role: { code: '', label: '' },
            departementId: 0,
            password: '',
            confirmPassword: ''
        };
    }
    loadUsers() {
        this.http.get(`${environment.apiUrl}/users`).subscribe((data) => {
            this.users = data.map(u => {
                var _a, _b;
                return (Object.assign(Object.assign({}, u), { role: {
                        code: u.roleCode || (typeof u.role === 'string' ? u.role : (_a = u.role) === null || _a === void 0 ? void 0 : _a.code) || 'unknown',
                        label: u.roleLabel || (typeof u.role === 'string' ? u.role : (_b = u.role) === null || _b === void 0 ? void 0 : _b.label) || 'Inconnu'
                    } }));
            });
            this.applyFilters();
        }, (err) => {
            this.status = 'Error loading users: ' + (err.status || err.message);
            this.messageType = 'error';
        });
    }
    calculateStats() {
        this.roleStats = {};
        this.filteredUsers.forEach(u => {
            var _a;
            const roleKey = ((_a = u.role) === null || _a === void 0 ? void 0 : _a.code) || 'unknown';
            this.roleStats[roleKey] = (this.roleStats[roleKey] || 0) + 1;
        });
    }
    loadDepartments() {
        this.http.get(`${environment.apiUrl}/departments`).subscribe((data) => this.departements = data, (err) => this.status = 'Error loading departments: ' + (err.status || err.message));
    }
    loadRoles() {
        this.http.get(`${environment.apiUrl}/users/roles`).subscribe((data) => this.postes = data, (err) => this.status = 'Error loading roles: ' + (err.status || err.message));
    }
    openUserModal(user) {
        var _a;
        this.modalVisible = true;
        this.isSaving = false;
        if (user) {
            this.editingUser = user;
            this.userForm = Object.assign(Object.assign({}, user), { role: (((_a = user.role) === null || _a === void 0 ? void 0 : _a.code) || ''), password: '', confirmPassword: '' });
        }
        else {
            this.editingUser = null;
            this.userForm = this.emptyUser();
            // Ensure role is a string for fresh forms if emptyUser doesn't set it nicely
            if (typeof this.userForm.role === 'object') {
                this.userForm.role = '';
            }
        }
        this.showPassword = false;
        this.showConfirmPassword = false;
    }
    closeUserModal() {
        this.modalVisible = false;
        this.isSaving = false;
        this.userSearchTerm = '';
        this.validationErrors = {};
    }
    validateUser() {
        var _a, _b, _c, _d;
        this.validationErrors = {};
        let isValid = true;
        const nom = (_a = this.userForm.nom) === null || _a === void 0 ? void 0 : _a.trim();
        const prenom = (_b = this.userForm.prenom) === null || _b === void 0 ? void 0 : _b.trim();
        const mail = (_c = this.userForm.mail) === null || _c === void 0 ? void 0 : _c.trim();
        const telephone = (_d = this.userForm.telephone) === null || _d === void 0 ? void 0 : _d.trim();
        if (!nom) {
            this.validationErrors.nom = 'Le nom est obligatoire';
            isValid = false;
        }
        if (!prenom) {
            this.validationErrors.prenom = 'Le prenom est obligatoire';
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mail) {
            this.validationErrors.mail = 'L\'email est obligatoire';
            isValid = false;
        }
        else if (!emailRegex.test(mail)) {
            this.validationErrors.mail = 'Format d\'email invalide';
            isValid = false;
        }
        const phoneRegex = /^[0-9+\s-]{8,}$/;
        if (!telephone) {
            this.validationErrors.telephone = 'Le telephone est obligatoire';
            isValid = false;
        }
        else if (!phoneRegex.test(telephone)) {
            this.validationErrors.telephone = 'Format de telephone invalide (min 8 chiffres)';
            isValid = false;
        }
        if (!this.editingUser && !this.userForm.password) {
            this.validationErrors.password = 'Le mot de passe est obligatoire pour un nouvel utilisateur';
            isValid = false;
        }
        else if (this.userForm.password && this.userForm.password.length < 6) {
            this.validationErrors.password = 'Le mot de passe doit faire au moins 6 caracteres';
            isValid = false;
        }
        if (this.userForm.password !== this.userForm.confirmPassword) {
            this.validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }
        if (!this.userForm.role) {
            this.validationErrors.role = 'Le role est obligatoire';
            isValid = false;
        }
        if (!this.userForm.departementId || Number(this.userForm.departementId) === 0) {
            this.validationErrors.departementId = 'Le departement est obligatoire';
            isValid = false;
        }
        return isValid;
    }
    saveUser() {
        var _a;
        if (this.isSaving)
            return;
        if (!this.validateUser())
            return;
        this.isSaving = true;
        const roleCode = typeof this.userForm.role === 'string' ? this.userForm.role : (_a = this.userForm.role) === null || _a === void 0 ? void 0 : _a.code;
        const payload = Object.assign(Object.assign({}, this.userForm), { nom: this.userForm.nom.trim(), prenom: this.userForm.prenom.trim(), mail: this.userForm.mail.trim().toLowerCase(), telephone: this.userForm.telephone.trim(), departementId: Number(this.userForm.departementId), role: roleCode, poste: (this.userForm.poste || roleCode || '').trim() });
        if (!payload.poste) {
            payload.poste = roleCode;
        }
        if (!payload.password) {
            delete payload.password;
        }
        delete payload.confirmPassword;
        if (this.editingUser) {
            this.http.put(`${environment.apiUrl}/users/${this.editingUser.id}`, payload).subscribe(() => {
                this.isSaving = false;
                this.status = 'Utilisateur modifié avec succès !';
                this.messageType = 'success';
                this.loadUsers();
                this.closeUserModal();
                setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
            }, (err) => {
                this.isSaving = false;
                this.status = this.extractErrorMessage('Erreur lors de la mise à jour', err);
                this.messageType = 'error';
            });
        }
        else {
            this.http.post(`${environment.apiUrl}/users`, payload).subscribe(() => {
                this.isSaving = false;
                this.status = 'Utilisateur créé avec succès !';
                this.messageType = 'success';
                this.loadUsers();
                this.closeUserModal();
                setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
            }, (err) => {
                this.isSaving = false;
                this.status = this.extractErrorMessage('Erreur lors de la création', err);
                this.messageType = 'error';
            });
        }
    }
    resetPassword(user) {
        this.openUserModal(user);
        this.status = 'Pour reinitialiser le mot de passe, modifiez l\'utilisateur et entrez un nouveau mot de passe.';
    }
    deleteUser(event, user) {
        event.stopPropagation();
        if (confirm(`Etes-vous sur de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
            this.http.delete(`${environment.apiUrl}/users/${user.id}`).subscribe(() => {
                this.status = 'Utilisateur supprimé avec succès !';
                this.messageType = 'success';
                this.loadUsers();
                setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
            }, (err) => {
                this.status = 'Error deleting user: ' + (err.status || err.message);
                this.messageType = 'error';
            });
        }
    }
    applyFilters() {
        this.filteredUsers = this.users.filter(u => {
            var _a;
            const normalizedSearch = (this.filters.search || '').toLowerCase().trim();
            const matchesSearch = !normalizedSearch ||
                `${u.nom} ${u.prenom} ${u.mail}`.toLowerCase().includes(normalizedSearch);
            const roleCode = (((_a = u.role) === null || _a === void 0 ? void 0 : _a.code) || '').toLowerCase().trim();
            const filterRole = (this.filters.role || '').toLowerCase().trim();
            const matchesRole = !filterRole || roleCode === filterRole;
            const matchesDept = !this.filters.department || Number(u.departementId) === Number(this.filters.department);
            return matchesSearch && matchesRole && matchesDept;
        });
        this.calculateStats();
    }
    resetFilters() {
        this.filters = {
            search: '',
            role: '',
            department: 0
        };
        this.applyFilters();
    }
    selectUser(user) {
        this.openUserModal(user);
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
    exportToXLSX() {
        const dataToExport = this.filteredUsers.map(u => {
            var _a, _b, _c;
            return ({
                'Nom': u.nom,
                'Prenom': u.prenom,
                'Email': u.mail,
                'Telephone': u.telephone,
                'Role': ((_a = u.role) === null || _a === void 0 ? void 0 : _a.label) || ((_b = u.role) === null || _b === void 0 ? void 0 : _b.code) || 'N/A',
                'Departement': ((_c = this.departements.find(d => d.id === u.departementId)) === null || _c === void 0 ? void 0 : _c.nom) || 'N/A'
            });
        });
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Utilisateurs');
        XLSX.writeFile(wb, `Export_Utilisateurs_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }
    exportToPDF() {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text('Rapport de Gestion des Utilisateurs', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Genere le : ${new Date().toLocaleString()}`, 14, 30);
        const columns = ['Nom', 'Prenom', 'Email', 'Telephone', 'Role', 'Departement'];
        const rows = this.filteredUsers.map(u => {
            var _a, _b, _c;
            return [
                u.nom,
                u.prenom,
                u.mail,
                u.telephone,
                ((_a = u.role) === null || _a === void 0 ? void 0 : _a.label) || ((_b = u.role) === null || _b === void 0 ? void 0 : _b.code) || 'N/A',
                ((_c = this.departements.find(d => d.id === u.departementId)) === null || _c === void 0 ? void 0 : _c.nom) || 'N/A'
            ];
        });
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });
        doc.save(`Export_Utilisateurs_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
UserManagementComponent.ɵfac = function UserManagementComponent_Factory(t) { return new (t || UserManagementComponent)(i0.ɵɵdirectiveInject(i1.HttpClient), i0.ɵɵdirectiveInject(i2.Router)); };
UserManagementComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserManagementComponent, selectors: [["app-user-management"]], decls: 52, vars: 14, consts: [[1, "user-management-container"], [1, "header-actions"], [1, "header-left"], ["type", "button", 1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-user-plus"], ["class", "stats-bar", 4, "ngIf"], [1, "filters-bar", "premium"], [1, "filter-controls"], [1, "filter-group-wrapper"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher un utilisateur...", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-user-tag"], [3, "ngModel", "ngModelChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "fas", "fa-building"], ["value", "0"], ["type", "button", "class", "btn btn-reset", 3, "click", 4, "ngIf"], [1, "export-actions"], [1, "export-dropdown"], ["type", "button", 1, "btn", "btn-export", 3, "click"], [1, "fas", "fa-download"], [1, "dropdown-menu"], ["type", "button", 3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], [1, "user-count", 2, "margin-left", "15px"], [1, "users-list"], ["class", "user-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "no-users", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], ["class", "status-message premium-toast", "style", "position: fixed; bottom: 30px; right: 30px; display: flex; align-items: center; gap: 12px; padding: 16px 24px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); z-index: 9999; min-width: 300px; transition: all 0.3s ease;", 3, "ngClass", 4, "ngIf"], [1, "stats-bar"], ["class", "stat-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "stat-item", "total", 3, "click"], [1, "stat-value"], [1, "stat-label"], [1, "stat-item", 3, "click"], [3, "value"], ["type", "button", 1, "btn", "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "user-card", 3, "click"], [1, "user-avatar"], [1, "user-info"], [1, "role-badge", 3, "ngClass"], [1, "contact-info"], [1, "fas", "fa-envelope"], [1, "fas", "fa-phone"], [1, "user-actions"], ["type", "button", "title", "Modifier", 1, "btn-icon", "edit-btn", 3, "click"], [1, "fas", "fa-edit"], ["type", "button", "title", "Supprimer", 1, "btn-icon", "delete-btn", 3, "click"], [1, "fas", "fa-trash-alt"], [1, "no-users"], [1, "fas", "fa-users-slash"], [3, "title", "close"], ["modal-body", "", 1, "modal-form"], ["projected", ""], [1, "form-section"], [1, "section-title"], [1, "fas", "fa-user-circle"], [1, "form-grid"], [1, "form-row"], [1, "required"], [1, "input-icon-wrapper"], [1, "fas", "fa-id-card", "icon"], ["type", "text", "placeholder", "Prenom", 3, "ngModel", "ngModelChange"], ["class", "error", 4, "ngIf"], [1, "fas", "fa-user", "icon"], ["type", "text", "placeholder", "Nom", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-envelope", "icon"], ["type", "email", "placeholder", "email@exemple.com", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-phone", "icon"], ["type", "text", "placeholder", "Telephone", 3, "ngModel", "ngModelChange"], [1, "fas", "fa-briefcase"], [1, "fas", "fa-user-tag", "icon"], [1, "fas", "fa-building", "icon"], [1, "fas", "fa-lock"], [1, "password-toggle-wrapper"], [1, "fas", "fa-key", "icon"], ["placeholder", "Mot de passe", 3, "type", "ngModel", "ngModelChange"], ["type", "button", 1, "btn-toggle", 3, "click"], [1, "fas"], [1, "fas", "fa-check-circle", "icon"], ["placeholder", "Confirmer", 3, "type", "ngModel", "ngModelChange"], ["class", "hint", 4, "ngIf"], [1, "modal-actions", 2, "display", "flex", "justify-content", "flex-end", "gap", "12px", "margin-top", "20px"], ["type", "button", 1, "btn-reset", 3, "disabled", "click"], ["type", "button", 1, "btn-primary", 3, "disabled", "click"], [1, "error"], [1, "hint"], [1, "status-message", "premium-toast", 2, "position", "fixed", "bottom", "30px", "right", "30px", "display", "flex", "align-items", "center", "gap", "12px", "padding", "16px 24px", "border-radius", "16px", "box-shadow", "0 10px 30px rgba(0,0,0,0.15)", "z-index", "9999", "min-width", "300px", "transition", "all 0.3s ease", 3, "ngClass"], [1, "toast-icon"], [1, "fas", 3, "ngClass"], [1, "toast-content", 2, "flex", "1"], [2, "display", "block", "font-weight", "600", "font-size", "0.95rem"], [2, "display", "block", "font-size", "0.85rem", "opacity", "0.9"], ["type", "button", 2, "background", "none", "border", "none", "color", "inherit", "cursor", "pointer", "padding", "4px", "opacity", "0.6", "transition", "opacity 0.2s", 3, "click"], [1, "fas", "fa-times"]], template: function UserManagementComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function UserManagementComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "h2");
        i0.ɵɵtext(6, "Gestion des Utilisateurs");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 5);
        i0.ɵɵelementStart(8, "button", 6);
        i0.ɵɵlistener("click", function UserManagementComponent_Template_button_click_8_listener() { return ctx.openUserModal(); });
        i0.ɵɵelement(9, "i", 7);
        i0.ɵɵtext(10, " Nouvel Utilisateur ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, UserManagementComponent_div_11_Template, 7, 2, "div", 8);
        i0.ɵɵelementStart(12, "div", 9);
        i0.ɵɵelementStart(13, "div", 10);
        i0.ɵɵelementStart(14, "div", 11);
        i0.ɵɵelementStart(15, "div", 12);
        i0.ɵɵelement(16, "i", 13);
        i0.ɵɵelementStart(17, "input", 14);
        i0.ɵɵlistener("ngModelChange", function UserManagementComponent_Template_input_ngModelChange_17_listener($event) { return ctx.filters.search = $event; })("ngModelChange", function UserManagementComponent_Template_input_ngModelChange_17_listener() { return ctx.applyFilters(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelement(19, "i", 15);
        i0.ɵɵelementStart(20, "select", 16);
        i0.ɵɵlistener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_20_listener($event) { return ctx.filters.role = $event; })("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_20_listener() { return ctx.applyFilters(); });
        i0.ɵɵelementStart(21, "option", 17);
        i0.ɵɵtext(22, "Tous les r\u00F4les");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(23, UserManagementComponent_option_23_Template, 2, 2, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 12);
        i0.ɵɵelement(25, "i", 19);
        i0.ɵɵelementStart(26, "select", 16);
        i0.ɵɵlistener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_26_listener($event) { return ctx.filters.department = $event; })("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_26_listener() { return ctx.applyFilters(); });
        i0.ɵɵelementStart(27, "option", 20);
        i0.ɵɵtext(28, "Tous les d\u00E9partements");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(29, UserManagementComponent_option_29_Template, 2, 2, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(30, UserManagementComponent_button_30_Template, 3, 0, "button", 21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 22);
        i0.ɵɵelementStart(32, "div", 23);
        i0.ɵɵelementStart(33, "button", 24);
        i0.ɵɵlistener("click", function UserManagementComponent_Template_button_click_33_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(34, "i", 25);
        i0.ɵɵtext(35, " Exporter ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 26);
        i0.ɵɵelementStart(37, "button", 27);
        i0.ɵɵlistener("click", function UserManagementComponent_Template_button_click_37_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(38, "i", 28);
        i0.ɵɵtext(39, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "button", 27);
        i0.ɵɵlistener("click", function UserManagementComponent_Template_button_click_40_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(41, "i", 29);
        i0.ɵɵtext(42, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "div", 30);
        i0.ɵɵelementStart(44, "strong");
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(46, " utilisateur(s) trouve(s) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "div", 31);
        i0.ɵɵtemplate(48, UserManagementComponent_div_48_Template, 20, 8, "div", 32);
        i0.ɵɵtemplate(49, UserManagementComponent_div_49_Template, 4, 0, "div", 33);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(50, UserManagementComponent_app_modal_50_Template, 102, 50, "app-modal", 34);
        i0.ɵɵtemplate(51, UserManagementComponent_div_51_Template, 10, 4, "div", 35);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.users.length > 0);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.filters.search);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filters.role);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.postes);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filters.department);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.departements);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filters.search || ctx.filters.role || ctx.filters.department !== 0);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.filteredUsers.length);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.filteredUsers);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredUsers.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.modalVisible);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.status);
    } }, directives: [i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i3.NgForOf, i3.NgClass, i5.ModalComponent], styles: [".user-management-container[_ngcontent-%COMP%] {\r\n  padding: 30px;\r\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n  min-height: 90vh;\r\n  border-radius: 20px;\r\n  font-family: 'Inter', sans-serif;\r\n  color: #1e293b;\r\n\r\n  .header-actions {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n    padding: 10px 0;\r\n\r\n    .header-left {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 20px;\r\n\r\n      h2 {\r\n        font-size: 1.8rem;\r\n        font-weight: 800;\r\n        color: #0f172a;\r\n        margin: 0;\r\n        letter-spacing: -0.02em;\r\n      }\r\n    }\r\n\r\n    .back-btn {\r\n      width: 44px;\r\n      height: 44px;\r\n      border-radius: 12px;\r\n      border: 1px solid #e2e8f0;\r\n      background: white;\r\n      color: #64748b;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      transition: all 0.2s ease;\r\n\r\n      &:hover {\r\n        background: #f8fafc;\r\n        color: #004a99;\r\n        border-color: #cbd5e1;\r\n        transform: translateX(-3px);\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .btn {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 10px;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 0.95rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    border: none;\r\n    outline: none;\r\n    white-space: nowrap;\r\n\r\n    i {\r\n      font-size: 1rem;\r\n    }\r\n\r\n    &:active {\r\n      transform: scale(0.98);\r\n    }\r\n\r\n    &:disabled {\r\n      opacity: 0.6;\r\n      cursor: not-allowed;\r\n    }\r\n\r\n    &.btn-primary {\r\n      background: linear-gradient(135deg, #004a99, #0ea5e9);\r\n      color: white;\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n\r\n      &:hover {\r\n        transform: translateY(-2px);\r\n        box-shadow: 0 8px 20px rgba(0, 74, 153, 0.3);\r\n        filter: brightness(1.1);\r\n      }\r\n    }\r\n\r\n    &.btn-reset {\r\n      background: #f1f5f9;\r\n      color: #475569;\r\n      border: 1px solid #e2e8f0;\r\n\r\n      &:hover {\r\n        background: #e2e8f0;\r\n        color: #0f172a;\r\n        transform: translateY(-2px);\r\n      }\r\n    }\r\n\r\n    &.btn-export {\r\n      background: white;\r\n      color: #004a99;\r\n      border: 1px solid #004a99;\r\n\r\n      &:hover {\r\n        background: #f0f7ff;\r\n        transform: translateY(-2px);\r\n        box-shadow: 0 4px 12px rgba(0, 74, 153, 0.1);\r\n      }\r\n    }\r\n\r\n    &.btn-icon {\r\n      width: 38px;\r\n      height: 38px;\r\n      padding: 0;\r\n      border-radius: 10px;\r\n      background: #f8fafc;\r\n      color: #64748b;\r\n      border: 1px solid #e2e8f0;\r\n\r\n      &:hover {\r\n        background: white;\r\n        color: #004a99;\r\n        border-color: #004a99;\r\n        transform: scale(1.1);\r\n      }\r\n\r\n      &.edit-btn:hover { color: #f59e0b; border-color: #f59e0b; }\r\n      &.delete-btn:hover { color: #ef4444; border-color: #ef4444; }\r\n    }\r\n  }\r\n\r\n  \r\n  .filters-bar {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    padding: 20px 25px;\r\n    background: rgba(255, 255, 255, 0.7);\r\n    backdrop-filter: blur(10px);\r\n    -webkit-backdrop-filter: blur(10px);\r\n    border-radius: 20px;\r\n    margin-bottom: 30px;\r\n    border: 1px solid rgba(255, 255, 255, 0.5);\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);\r\n\r\n    .filter-controls {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 20px;\r\n      flex-grow: 1;\r\n\r\n      .filter-group-wrapper {\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        flex-grow: 1;\r\n      }\r\n    }\r\n\r\n    .filter-group {\r\n      position: relative;\r\n      background: white;\r\n      border: 1px solid #e2e8f0;\r\n      border-radius: 12px;\r\n      padding: 0 16px;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      height: 48px;\r\n      transition: all 0.2s ease;\r\n      flex: 1;\r\n      max-width: 300px;\r\n\r\n      i {\r\n        color: #94a3b8;\r\n        font-size: 0.9rem;\r\n      }\r\n\r\n      input, select {\r\n        border: none;\r\n        background: transparent;\r\n        height: 100%;\r\n        width: 100%;\r\n        font-size: 0.9rem;\r\n        color: #1e293b;\r\n        font-weight: 500;\r\n        outline: none;\r\n\r\n        &::placeholder {\r\n          color: #94a3b8;\r\n        }\r\n      }\r\n\r\n      select {\r\n        cursor: pointer;\r\n        appearance: none;\r\n        background: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\") no-repeat right 0 center;\r\n      }\r\n\r\n      &:focus-within {\r\n        border-color: #004a99;\r\n        box-shadow: 0 0 0 4px rgba(0, 74, 153, 0.05);\r\n\r\n        i {\r\n          color: #004a99;\r\n        }\r\n      }\r\n    }\r\n\r\n    .export-actions {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      padding-left: 20px;\r\n      border-left: 1px solid #e2e8f0;\r\n\r\n      .user-count {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        white-space: nowrap;\r\n\r\n        strong {\r\n          color: #004a99;\r\n          font-weight: 800;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .stats-bar {\r\n    display: flex;\r\n    gap: 15px;\r\n    margin-bottom: 25px;\r\n    overflow-x: auto;\r\n    padding-bottom: 5px;\r\n\r\n    &::-webkit-scrollbar {\r\n      height: 4px;\r\n    }\r\n\r\n    &::-webkit-scrollbar-thumb {\r\n      background: #e2e8f0;\r\n      border-radius: 10px;\r\n    }\r\n\r\n    .stat-item {\r\n      flex: 1;\r\n      min-width: 140px;\r\n      background: white;\r\n      padding: 16px;\r\n      border-radius: 16px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      border: 1px solid #f1f5f9;\r\n      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);\r\n      transition: all 0.3s ease;\r\n\r\n      &:hover {\r\n        transform: translateY(-3px);\r\n        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);\r\n      }\r\n\r\n      .stat-value {\r\n        font-size: 1.5rem;\r\n        font-weight: 800;\r\n        color: #004a99;\r\n        line-height: 1;\r\n        margin-bottom: 6px;\r\n      }\r\n\r\n      .stat-label {\r\n        font-size: 0.7rem;\r\n        font-weight: 700;\r\n        color: #94a3b8;\r\n        text-transform: uppercase;\r\n        letter-spacing: 0.05em;\r\n        text-align: center;\r\n      }\r\n\r\n      &.total {\r\n        background: linear-gradient(135deg, #0f172a, #334155);\r\n        border: none;\r\n\r\n        .stat-value { color: white; }\r\n        .stat-label { color: rgba(255, 255, 255, 0.6); }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .users-list {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .user-card {\r\n    background: white;\r\n    border-radius: 20px;\r\n    padding: 24px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n    border: 1px solid #f1f5f9;\r\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    cursor: pointer;\r\n\r\n    &:hover {\r\n      transform: translateY(-5px) scale(1.02);\r\n      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);\r\n      border-color: rgba(0, 74, 153, 0.2);\r\n\r\n      .user-avatar {\r\n        transform: scale(1.1) rotate(5deg);\r\n        box-shadow: 0 8px 20px rgba(0, 74, 153, 0.2);\r\n      }\r\n\r\n      .user-actions {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    .user-avatar {\r\n      width: 64px;\r\n      height: 64px;\r\n      border-radius: 18px;\r\n      background: linear-gradient(135deg, #004a99, #0ea5e9);\r\n      color: white;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-weight: 800;\r\n      font-size: 1.5rem;\r\n      flex-shrink: 0;\r\n      transition: all 0.3s ease;\r\n    }\r\n\r\n    .user-info {\r\n      flex-grow: 1;\r\n      overflow: hidden;\r\n\r\n      h3 {\r\n        margin: 0 0 8px 0;\r\n        font-size: 1.2rem;\r\n        font-weight: 700;\r\n        color: #0f172a;\r\n      }\r\n\r\n      .role-badge {\r\n        display: inline-block;\r\n        padding: 4px 12px;\r\n        border-radius: 20px;\r\n        font-size: 0.65rem;\r\n        font-weight: 800;\r\n        text-transform: uppercase;\r\n        letter-spacing: 0.05em;\r\n        margin-bottom: 10px;\r\n        background: #f1f5f9;\r\n        color: #64748b;\r\n\r\n        &.super_admin { background: #fef3c7; color: #92400e; }\r\n        &.admin_si { background: #e0f2fe; color: #0369a1; }\r\n        &.risk_manager { background: #dcfce7; color: #166534; }\r\n        &.risk_agent { background: #fee2e2; color: #991b1b; }\r\n        &.auditeur { background: #f3e8ff; color: #6b21a8; }\r\n        &.audit_senior { background: #e0e7ff; color: #3730a3; }\r\n      }\r\n\r\n      .contact-info {\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 5px;\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n\r\n        span {\r\n          display: flex;\r\n          align-items: center;\r\n          gap: 8px;\r\n\r\n          i {\r\n            color: #94a3b8;\r\n            width: 14px;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .user-actions {\r\n      position: absolute;\r\n      top: 15px;\r\n      right: 15px;\r\n      display: flex;\r\n      gap: 6px;\r\n      opacity: 0;\r\n      transform: translateY(-5px);\r\n      transition: all 0.2s ease;\r\n\r\n      button {\r\n        width: 36px;\r\n        height: 36px;\r\n        border-radius: 10px;\r\n        border: none;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        cursor: pointer;\r\n        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\r\n        font-size: 0.9rem;\r\n        \r\n        &.edit-btn {\r\n          background: #f0fdf4;\r\n          color: #16a34a;\r\n          \r\n          &:hover {\r\n            background: #16a34a;\r\n            color: white;\r\n            transform: translateY(-2px);\r\n            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);\r\n          }\r\n        }\r\n        \r\n        &.delete-btn {\r\n          background: #fef2f2;\r\n          color: #dc2626;\r\n          \r\n          &:hover {\r\n            background: #dc2626;\r\n            color: white;\r\n            transform: translateY(-2px);\r\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .no-users {\r\n    grid-column: 1 / -1;\r\n    text-align: center;\r\n    padding: 100px 20px;\r\n    color: #94a3b8;\r\n\r\n    i {\r\n      font-size: 4rem;\r\n      margin-bottom: 20px;\r\n      opacity: 0.2;\r\n    }\r\n  }\r\n\r\n  \r\n  .modal-form {\r\n    padding: 15px 5px;\r\n\r\n    .form-section {\r\n      margin-bottom: 25px;\r\n\r\n      .section-title {\r\n        font-size: 1.1rem;\r\n        font-weight: 700;\r\n        color: #0f172a;\r\n        margin-bottom: 16px;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 8px;\r\n        border-bottom: 2px solid #f1f5f9;\r\n        padding-bottom: 8px;\r\n\r\n        i {\r\n          color: #004a99;\r\n        }\r\n      }\r\n    }\r\n\r\n    .form-grid {\r\n      display: grid;\r\n      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\r\n      gap: 16px 20px;\r\n    }\r\n\r\n    .form-row {\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 6px;\r\n\r\n      label {\r\n        font-size: 0.85rem;\r\n        font-weight: 600;\r\n        color: #475569;\r\n\r\n        .required {\r\n          color: #dc2626;\r\n          margin-left: 2px;\r\n        }\r\n      }\r\n\r\n      .input-icon-wrapper {\r\n        position: relative;\r\n        display: flex;\r\n        align-items: center;\r\n\r\n        .icon {\r\n          position: absolute;\r\n          left: 14px;\r\n          color: #94a3b8;\r\n          font-size: 0.95rem;\r\n          transition: color 0.2s;\r\n        }\r\n\r\n        input, select {\r\n          width: 100%;\r\n          height: 44px;\r\n          padding: 0 14px 0 38px;\r\n          border: 1px solid #e2e8f0;\r\n          border-radius: 12px;\r\n          font-size: 0.95rem;\r\n          color: #0f172a;\r\n          background: #f8fafc;\r\n          transition: all 0.2s;\r\n\r\n          &:focus {\r\n            background: white;\r\n            border-color: #004a99;\r\n            box-shadow: 0 0 0 4px rgba(0, 74, 153, 0.05);\r\n            outline: none;\r\n          }\r\n        }\r\n\r\n        select {\r\n          appearance: none;\r\n          cursor: pointer;\r\n          background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\");\r\n          background-repeat: no-repeat;\r\n          background-position: right 14px center;\r\n          padding-right: 36px;\r\n        }\r\n\r\n        &:focus-within .icon {\r\n          color: #004a99;\r\n        }\r\n      }\r\n\r\n      .password-toggle-wrapper {\r\n        position: relative;\r\n        display: flex;\r\n        align-items: center;\r\n\r\n        .icon {\r\n          position: absolute;\r\n          left: 14px;\r\n          color: #94a3b8;\r\n          font-size: 0.95rem;\r\n          transition: color 0.2s;\r\n        }\r\n\r\n        input {\r\n          width: 100%;\r\n          height: 44px;\r\n          padding: 0 44px 0 38px;\r\n          border: 1px solid #e2e8f0;\r\n          border-radius: 12px;\r\n          font-size: 0.95rem;\r\n          color: #0f172a;\r\n          background: #f8fafc;\r\n          transition: all 0.2s;\r\n\r\n          &:focus {\r\n            background: white;\r\n            border-color: #004a99;\r\n            box-shadow: 0 0 0 4px rgba(0, 74, 153, 0.05);\r\n            outline: none;\r\n          }\r\n        }\r\n\r\n        .btn-toggle {\r\n          position: absolute;\r\n          right: 12px;\r\n          background: none;\r\n          border: none;\r\n          cursor: pointer;\r\n          color: #94a3b8;\r\n          padding: 4px;\r\n          font-size: 0.95rem;\r\n          transition: color 0.2s;\r\n\r\n          &:hover {\r\n            color: #0f172a;\r\n          }\r\n        }\r\n\r\n        &:focus-within .icon {\r\n          color: #004a99;\r\n        }\r\n      }\r\n\r\n      .error {\r\n        font-size: 0.75rem;\r\n        color: #dc2626;\r\n        margin-top: 2px;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.premium-toast[_ngcontent-%COMP%] {\r\n  &.success {\r\n    background: linear-gradient(135deg, #065f46, #10b981);\r\n    color: white;\r\n  }\r\n  &.error {\r\n    background: linear-gradient(135deg, #991b1b, #ef4444);\r\n    color: white;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserManagementComponent, [{
        type: Component,
        args: [{
                selector: 'app-user-management',
                templateUrl: './user-management.component.html',
                styleUrls: ['./user-management.component.scss']
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=user-management.component.js.map