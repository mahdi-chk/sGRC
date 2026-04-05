import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RiskImpact, RiskLevel, RiskProbability, RiskService, RiskStatus, } from '../../../core/services/risk.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/modal/modal.component";
function RiskMatrixComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "div", 14);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement de la matrice...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function RiskMatrixComponent_div_16_span_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.riskMatrix[0][0]);
} }
function RiskMatrixComponent_div_16_span_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r5.getMatrixShare(ctx_r5.riskMatrix[0][0]), "%");
} }
function RiskMatrixComponent_div_16_span_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.riskMatrix[0][1]);
} }
function RiskMatrixComponent_div_16_span_112_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r7.getMatrixShare(ctx_r7.riskMatrix[0][1]), "%");
} }
function RiskMatrixComponent_div_16_span_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r8.riskMatrix[0][2]);
} }
function RiskMatrixComponent_div_16_span_116_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r9.getMatrixShare(ctx_r9.riskMatrix[0][2]), "%");
} }
function RiskMatrixComponent_div_16_span_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r10.riskMatrix[0][3]);
} }
function RiskMatrixComponent_div_16_span_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r11.getMatrixShare(ctx_r11.riskMatrix[0][3]), "%");
} }
function RiskMatrixComponent_div_16_span_128_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r12.riskMatrix[1][0]);
} }
function RiskMatrixComponent_div_16_span_129_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r13.getMatrixShare(ctx_r13.riskMatrix[1][0]), "%");
} }
function RiskMatrixComponent_div_16_span_132_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r14.riskMatrix[1][1]);
} }
function RiskMatrixComponent_div_16_span_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r15.getMatrixShare(ctx_r15.riskMatrix[1][1]), "%");
} }
function RiskMatrixComponent_div_16_span_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r16.riskMatrix[1][2]);
} }
function RiskMatrixComponent_div_16_span_137_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r17.getMatrixShare(ctx_r17.riskMatrix[1][2]), "%");
} }
function RiskMatrixComponent_div_16_span_140_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r18.riskMatrix[1][3]);
} }
function RiskMatrixComponent_div_16_span_141_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r19.getMatrixShare(ctx_r19.riskMatrix[1][3]), "%");
} }
function RiskMatrixComponent_div_16_span_149_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r20.riskMatrix[2][0]);
} }
function RiskMatrixComponent_div_16_span_150_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r21.getMatrixShare(ctx_r21.riskMatrix[2][0]), "%");
} }
function RiskMatrixComponent_div_16_span_153_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r22.riskMatrix[2][1]);
} }
function RiskMatrixComponent_div_16_span_154_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r23.getMatrixShare(ctx_r23.riskMatrix[2][1]), "%");
} }
function RiskMatrixComponent_div_16_span_157_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r24.riskMatrix[2][2]);
} }
function RiskMatrixComponent_div_16_span_158_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r25.getMatrixShare(ctx_r25.riskMatrix[2][2]), "%");
} }
function RiskMatrixComponent_div_16_span_161_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r26.riskMatrix[2][3]);
} }
function RiskMatrixComponent_div_16_span_162_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r27.getMatrixShare(ctx_r27.riskMatrix[2][3]), "%");
} }
function RiskMatrixComponent_div_16_span_170_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r28.riskMatrix[3][0]);
} }
function RiskMatrixComponent_div_16_span_171_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r29.getMatrixShare(ctx_r29.riskMatrix[3][0]), "%");
} }
function RiskMatrixComponent_div_16_span_174_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r30.riskMatrix[3][1]);
} }
function RiskMatrixComponent_div_16_span_175_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r31.getMatrixShare(ctx_r31.riskMatrix[3][1]), "%");
} }
function RiskMatrixComponent_div_16_span_178_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r32.riskMatrix[3][2]);
} }
function RiskMatrixComponent_div_16_span_179_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r33 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r33.getMatrixShare(ctx_r33.riskMatrix[3][2]), "%");
} }
function RiskMatrixComponent_div_16_span_182_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r34 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r34.riskMatrix[3][3]);
} }
function RiskMatrixComponent_div_16_span_183_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r35.getMatrixShare(ctx_r35.riskMatrix[3][3]), "%");
} }
function RiskMatrixComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 15);
    i0.ɵɵelementStart(2, "div", 16);
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 18);
    i0.ɵɵtext(6, "Ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 19);
    i0.ɵɵelementStart(8, "span", 17);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 18);
    i0.ɵɵtext(11, "Risques totaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 20);
    i0.ɵɵelementStart(13, "span", 17);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 18);
    i0.ɵɵtext(16, "En traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 21);
    i0.ɵɵelementStart(18, "span", 17);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 18);
    i0.ɵɵtext(21, "Clotures / Traites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 22);
    i0.ɵɵelementStart(23, "div", 23);
    i0.ɵɵelementStart(24, "div");
    i0.ɵɵelementStart(25, "h3");
    i0.ɵɵelement(26, "i", 24);
    i0.ɵɵtext(27, " Matrice des risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 25);
    i0.ɵɵtext(29, "Lecture croisee de la probabilite et de l'impact avec zones dominantes et totaux par axe.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 26);
    i0.ɵɵelementStart(31, "span", 27);
    i0.ɵɵtext(32, "Faible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 28);
    i0.ɵɵtext(34, "Modere");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 29);
    i0.ɵɵtext(36, "Eleve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 30);
    i0.ɵɵtext(38, "Critique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 31);
    i0.ɵɵelementStart(40, "div", 32);
    i0.ɵɵelementStart(41, "span", 33);
    i0.ɵɵtext(42, "Zone dominante");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "strong");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "small");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 34);
    i0.ɵɵelementStart(48, "span", 33);
    i0.ɵɵtext(49, "Exposition critique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "strong");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "small");
    i0.ɵɵtext(53, "risque(s) en zone sensible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 35);
    i0.ɵɵelementStart(55, "span", 33);
    i0.ɵɵtext(56, "Probabilite dominante");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "strong");
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "small");
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 35);
    i0.ɵɵelementStart(62, "span", 33);
    i0.ɵɵtext(63, "Impact dominant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "strong");
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "small");
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 36);
    i0.ɵɵelementStart(69, "div", 37);
    i0.ɵɵelement(70, "i", 38);
    i0.ɵɵtext(71, " Probabilite ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 39);
    i0.ɵɵelementStart(73, "table", 40);
    i0.ɵɵelementStart(74, "colgroup");
    i0.ɵɵelement(75, "col", 41);
    i0.ɵɵelement(76, "col", 42);
    i0.ɵɵelement(77, "col", 42);
    i0.ɵɵelement(78, "col", 42);
    i0.ɵɵelement(79, "col", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "thead");
    i0.ɵɵelementStart(81, "tr");
    i0.ɵɵelement(82, "th", 43);
    i0.ɵɵelementStart(83, "th", 44);
    i0.ɵɵtext(84, "Limite ");
    i0.ɵɵelementStart(85, "span", 45);
    i0.ɵɵtext(86, "(1)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "th", 44);
    i0.ɵɵtext(88, "Moyen ");
    i0.ɵɵelementStart(89, "span", 45);
    i0.ɵɵtext(90, "(4)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "th", 44);
    i0.ɵɵtext(92, "Significatif ");
    i0.ɵɵelementStart(93, "span", 45);
    i0.ɵɵtext(94, "(16)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "th", 44);
    i0.ɵɵtext(96, "Critique ");
    i0.ɵɵelementStart(97, "span", 45);
    i0.ɵɵtext(98, "(64)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(99, "tbody");
    i0.ɵɵelementStart(100, "tr");
    i0.ɵɵelementStart(101, "th", 46);
    i0.ɵɵtext(102, "Permanent ");
    i0.ɵɵelementStart(103, "span", 45);
    i0.ɵɵtext(104, "(8)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "td", 47);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_105_listener() { i0.ɵɵrestoreView(_r37); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.riskMatrix[0][0] > 0 && ctx_r36.openMatrixCellDetails(0, 0); });
    i0.ɵɵelementStart(106, "div", 48);
    i0.ɵɵtemplate(107, RiskMatrixComponent_div_16_span_107_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(108, RiskMatrixComponent_div_16_span_108_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(109, "td", 51);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_109_listener() { i0.ɵɵrestoreView(_r37); const ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.riskMatrix[0][1] > 0 && ctx_r38.openMatrixCellDetails(0, 1); });
    i0.ɵɵelementStart(110, "div", 48);
    i0.ɵɵtemplate(111, RiskMatrixComponent_div_16_span_111_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(112, RiskMatrixComponent_div_16_span_112_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(113, "td", 52);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_113_listener() { i0.ɵɵrestoreView(_r37); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.riskMatrix[0][2] > 0 && ctx_r39.openMatrixCellDetails(0, 2); });
    i0.ɵɵelementStart(114, "div", 48);
    i0.ɵɵtemplate(115, RiskMatrixComponent_div_16_span_115_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(116, RiskMatrixComponent_div_16_span_116_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(117, "td", 53);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_117_listener() { i0.ɵɵrestoreView(_r37); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.riskMatrix[0][3] > 0 && ctx_r40.openMatrixCellDetails(0, 3); });
    i0.ɵɵelementStart(118, "div", 48);
    i0.ɵɵtemplate(119, RiskMatrixComponent_div_16_span_119_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(120, RiskMatrixComponent_div_16_span_120_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(121, "tr");
    i0.ɵɵelementStart(122, "th", 46);
    i0.ɵɵtext(123, "Probable ");
    i0.ɵɵelementStart(124, "span", 45);
    i0.ɵɵtext(125, "(4)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(126, "td", 54);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_126_listener() { i0.ɵɵrestoreView(_r37); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.riskMatrix[1][0] > 0 && ctx_r41.openMatrixCellDetails(1, 0); });
    i0.ɵɵelementStart(127, "div", 48);
    i0.ɵɵtemplate(128, RiskMatrixComponent_div_16_span_128_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(129, RiskMatrixComponent_div_16_span_129_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(130, "td", 47);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_130_listener() { i0.ɵɵrestoreView(_r37); const ctx_r42 = i0.ɵɵnextContext(); return ctx_r42.riskMatrix[1][1] > 0 && ctx_r42.openMatrixCellDetails(1, 1); });
    i0.ɵɵelementStart(131, "div", 48);
    i0.ɵɵtemplate(132, RiskMatrixComponent_div_16_span_132_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(133, RiskMatrixComponent_div_16_span_133_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(134, "td", 51);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_134_listener() { i0.ɵɵrestoreView(_r37); const ctx_r43 = i0.ɵɵnextContext(); return ctx_r43.riskMatrix[1][2] > 0 && ctx_r43.openMatrixCellDetails(1, 2); });
    i0.ɵɵelementStart(135, "div", 48);
    i0.ɵɵtemplate(136, RiskMatrixComponent_div_16_span_136_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(137, RiskMatrixComponent_div_16_span_137_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(138, "td", 52);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_138_listener() { i0.ɵɵrestoreView(_r37); const ctx_r44 = i0.ɵɵnextContext(); return ctx_r44.riskMatrix[1][3] > 0 && ctx_r44.openMatrixCellDetails(1, 3); });
    i0.ɵɵelementStart(139, "div", 48);
    i0.ɵɵtemplate(140, RiskMatrixComponent_div_16_span_140_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(141, RiskMatrixComponent_div_16_span_141_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(142, "tr");
    i0.ɵɵelementStart(143, "th", 46);
    i0.ɵɵtext(144, "Possible ");
    i0.ɵɵelementStart(145, "span", 45);
    i0.ɵɵtext(146, "(2)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(147, "td", 55);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_147_listener() { i0.ɵɵrestoreView(_r37); const ctx_r45 = i0.ɵɵnextContext(); return ctx_r45.riskMatrix[2][0] > 0 && ctx_r45.openMatrixCellDetails(2, 0); });
    i0.ɵɵelementStart(148, "div", 48);
    i0.ɵɵtemplate(149, RiskMatrixComponent_div_16_span_149_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(150, RiskMatrixComponent_div_16_span_150_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(151, "td", 54);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_151_listener() { i0.ɵɵrestoreView(_r37); const ctx_r46 = i0.ɵɵnextContext(); return ctx_r46.riskMatrix[2][1] > 0 && ctx_r46.openMatrixCellDetails(2, 1); });
    i0.ɵɵelementStart(152, "div", 48);
    i0.ɵɵtemplate(153, RiskMatrixComponent_div_16_span_153_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(154, RiskMatrixComponent_div_16_span_154_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(155, "td", 47);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_155_listener() { i0.ɵɵrestoreView(_r37); const ctx_r47 = i0.ɵɵnextContext(); return ctx_r47.riskMatrix[2][2] > 0 && ctx_r47.openMatrixCellDetails(2, 2); });
    i0.ɵɵelementStart(156, "div", 48);
    i0.ɵɵtemplate(157, RiskMatrixComponent_div_16_span_157_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(158, RiskMatrixComponent_div_16_span_158_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(159, "td", 51);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_159_listener() { i0.ɵɵrestoreView(_r37); const ctx_r48 = i0.ɵɵnextContext(); return ctx_r48.riskMatrix[2][3] > 0 && ctx_r48.openMatrixCellDetails(2, 3); });
    i0.ɵɵelementStart(160, "div", 48);
    i0.ɵɵtemplate(161, RiskMatrixComponent_div_16_span_161_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(162, RiskMatrixComponent_div_16_span_162_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(163, "tr");
    i0.ɵɵelementStart(164, "th", 46);
    i0.ɵɵtext(165, "Rare ");
    i0.ɵɵelementStart(166, "span", 45);
    i0.ɵɵtext(167, "(1)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(168, "td", 56);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_168_listener() { i0.ɵɵrestoreView(_r37); const ctx_r49 = i0.ɵɵnextContext(); return ctx_r49.riskMatrix[3][0] > 0 && ctx_r49.openMatrixCellDetails(3, 0); });
    i0.ɵɵelementStart(169, "div", 48);
    i0.ɵɵtemplate(170, RiskMatrixComponent_div_16_span_170_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(171, RiskMatrixComponent_div_16_span_171_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(172, "td", 55);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_172_listener() { i0.ɵɵrestoreView(_r37); const ctx_r50 = i0.ɵɵnextContext(); return ctx_r50.riskMatrix[3][1] > 0 && ctx_r50.openMatrixCellDetails(3, 1); });
    i0.ɵɵelementStart(173, "div", 48);
    i0.ɵɵtemplate(174, RiskMatrixComponent_div_16_span_174_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(175, RiskMatrixComponent_div_16_span_175_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(176, "td", 54);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_176_listener() { i0.ɵɵrestoreView(_r37); const ctx_r51 = i0.ɵɵnextContext(); return ctx_r51.riskMatrix[3][2] > 0 && ctx_r51.openMatrixCellDetails(3, 2); });
    i0.ɵɵelementStart(177, "div", 48);
    i0.ɵɵtemplate(178, RiskMatrixComponent_div_16_span_178_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(179, RiskMatrixComponent_div_16_span_179_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(180, "td", 47);
    i0.ɵɵlistener("click", function RiskMatrixComponent_div_16_Template_td_click_180_listener() { i0.ɵɵrestoreView(_r37); const ctx_r52 = i0.ɵɵnextContext(); return ctx_r52.riskMatrix[3][3] > 0 && ctx_r52.openMatrixCellDetails(3, 3); });
    i0.ɵɵelementStart(181, "div", 48);
    i0.ɵɵtemplate(182, RiskMatrixComponent_div_16_span_182_Template, 2, 1, "span", 49);
    i0.ɵɵtemplate(183, RiskMatrixComponent_div_16_span_183_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(184, "tr", 57);
    i0.ɵɵelementStart(185, "th", 58);
    i0.ɵɵtext(186, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(187, "td", 59);
    i0.ɵɵtext(188);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(189, "td", 59);
    i0.ɵɵtext(190);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(191, "td", 59);
    i0.ɵɵtext(192);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(193, "td", 59);
    i0.ɵɵtext(194);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(195, "div", 60);
    i0.ɵɵelement(196, "i", 61);
    i0.ɵɵtext(197, " Impact ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(198, "div", 62);
    i0.ɵɵelementStart(199, "div", 63);
    i0.ɵɵelementStart(200, "strong");
    i0.ɵɵtext(201, "Lecture rapide :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(202, " les zones orange et rouges concentrent les risques a traiter en priorite. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(203, "div", 63);
    i0.ɵɵelementStart(204, "strong");
    i0.ɵɵtext(205, "Structure :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(206, " chaque cellule affiche le nombre de risques et leur poids dans le portefeuille. Cliquez sur une case pour voir le detail. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.risksOpenCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.totalRisks);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.risksInProgressCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.risksManagedCount);
    i0.ɵɵadvance(25);
    i0.ɵɵtextInterpolate(ctx_r1.topZoneLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.topZoneCount, " risque(s) - ", ctx_r1.topZoneShare, "%");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.criticalExposureCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.dominantProbabilityLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.matrixRowTotals[ctx_r1.getMaxIndex(ctx_r1.matrixRowTotals)] || 0, " risque(s)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.dominantImpactLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.matrixColTotals[ctx_r1.getMaxIndex(ctx_r1.matrixColTotals)] || 0, " risque(s)");
    i0.ɵɵadvance(38);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[0][0] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[0][1] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[0][2] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[0][3] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][3]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[0][3]);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[1][0] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[1][1] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[1][2] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[1][3] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][3]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[1][3]);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[2][0] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[2][1] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[2][2] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[2][3] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][3]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[2][3]);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[3][0] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][0]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[3][1] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][1]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[3][2] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][2]);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("is-clickable", ctx_r1.riskMatrix[3][3] > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][3]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.riskMatrix[3][3]);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.matrixColTotals[0]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.matrixColTotals[1]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.matrixColTotals[2]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.matrixColTotals[3]);
} }
function RiskMatrixComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelement(1, "i", 67);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.loadError);
} }
function RiskMatrixComponent_app_modal_18_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵelementStart(1, "div", 80);
    i0.ɵɵelementStart(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 81);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 82);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 83);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11, "Domaine :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15, "Departement :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19, "Statut :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23, "Traitement :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r57 = ctx.$implicit;
    const ctx_r56 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r57.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r56.getRiskLevelClass(risk_r57.niveauRisqueCode || risk_r57.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r56.getRiskLevelLabel(risk_r57.niveauRisqueCode || risk_r57.niveauRisque), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r57.explication || "Aucune description disponible.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", risk_r57.domaine || "General", "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", (risk_r57.departement == null ? null : risk_r57.departement.nom) || "Non specifie", "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r56.getRiskStatusLabel(risk_r57.statutCode || risk_r57.statut), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", risk_r57.planActionTraitement || "Non defini", "");
} }
function RiskMatrixComponent_app_modal_18_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵtemplate(1, RiskMatrixComponent_app_modal_18_div_18_div_1_Template, 25, 8, "div", 78);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r53 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r53.selectedMatrixRisks);
} }
function RiskMatrixComponent_app_modal_18_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵtext(1, " Aucun risque detaille dans cette zone. ");
    i0.ɵɵelementEnd();
} }
function RiskMatrixComponent_app_modal_18_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 68);
    i0.ɵɵlistener("close", function RiskMatrixComponent_app_modal_18_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.closeMatrixDetails(); });
    i0.ɵɵelementStart(1, "div", 69);
    i0.ɵɵelementStart(2, "div", 70);
    i0.ɵɵelementStart(3, "div", 71);
    i0.ɵɵelementStart(4, "span", 72);
    i0.ɵɵtext(5, "Probabilite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 71);
    i0.ɵɵelementStart(9, "span", 72);
    i0.ɵɵtext(10, "Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 71);
    i0.ɵɵelementStart(14, "span", 72);
    i0.ɵɵtext(15, "Nombre de risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, RiskMatrixComponent_app_modal_18_div_18_Template, 2, 1, "div", 73);
    i0.ɵɵtemplate(19, RiskMatrixComponent_app_modal_18_ng_template_19_Template, 2, 0, "ng-template", null, 74, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 75);
    i0.ɵɵelementStart(22, "button", 76);
    i0.ɵɵlistener("click", function RiskMatrixComponent_app_modal_18_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r59); const ctx_r60 = i0.ɵɵnextContext(); return ctx_r60.closeMatrixDetails(); });
    i0.ɵɵtext(23, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r54 = i0.ɵɵreference(20);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", "Zone : " + ctx_r3.getSelectedMatrixTitle());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.selectedMatrixRow >= 0 ? ctx_r3.getProbabilityLabel(ctx_r3.probabilityOrder[ctx_r3.selectedMatrixRow]) : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.selectedMatrixCol >= 0 ? ctx_r3.getImpactLabel(ctx_r3.impactOrder[ctx_r3.selectedMatrixCol]) : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.selectedMatrixRisks.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedMatrixRisks.length > 0)("ngIfElse", _r54);
} }
export class RiskMatrixComponent {
    constructor(riskService, router) {
        this.riskService = riskService;
        this.router = router;
        this.risks = [];
        this.isLoading = true;
        this.loadError = '';
        this.matrixRowTotals = [0, 0, 0, 0];
        this.matrixColTotals = [0, 0, 0, 0];
        this.criticalExposureCount = 0;
        this.dominantProbabilityLabel = '-';
        this.dominantImpactLabel = '-';
        this.topZoneLabel = '-';
        this.topZoneCount = 0;
        this.topZoneShare = 0;
        this.showMatrixDetailsModal = false;
        this.selectedMatrixRow = -1;
        this.selectedMatrixCol = -1;
        this.selectedMatrixRisks = [];
        this.riskMatrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.probabilityOrder = [
            RiskProbability.PERMANENT,
            RiskProbability.PROBABLE,
            RiskProbability.POSSIBLE,
            RiskProbability.RARE,
        ];
        this.impactOrder = [
            RiskImpact.LIMITED,
            RiskImpact.MEDIUM,
            RiskImpact.SIGNIFICANT,
            RiskImpact.CRITICAL,
        ];
        this.probabilityLabels = {
            [RiskProbability.PERMANENT]: 'Permanent',
            [RiskProbability.PROBABLE]: 'Probable',
            [RiskProbability.POSSIBLE]: 'Possible',
            [RiskProbability.RARE]: 'Rare',
        };
        this.impactLabels = {
            [RiskImpact.LIMITED]: 'Limite',
            [RiskImpact.MEDIUM]: 'Moyen',
            [RiskImpact.SIGNIFICANT]: 'Significatif',
            [RiskImpact.CRITICAL]: 'Critique',
        };
        this.riskLevelLabels = {
            [RiskLevel.LOW]: 'Faible',
            [RiskLevel.LIMITED]: 'Limite',
            [RiskLevel.MEDIUM]: 'Moyen',
            [RiskLevel.HIGH]: 'Eleve',
            [RiskLevel.CRITICAL]: 'Critique',
        };
        this.riskStatusLabels = {
            [RiskStatus.OPEN]: 'Ouvert',
            [RiskStatus.IN_PROGRESS]: 'En cours',
            [RiskStatus.TREATED]: 'Traite',
            [RiskStatus.CLOSED]: 'Cloture',
        };
        this.riskLevelAliases = {
            low: RiskLevel.LOW,
            faible: RiskLevel.LOW,
            limited: RiskLevel.LIMITED,
            limite: RiskLevel.LIMITED,
            medium: RiskLevel.MEDIUM,
            moyen: RiskLevel.MEDIUM,
            high: RiskLevel.HIGH,
            eleve: RiskLevel.HIGH,
            critical: RiskLevel.CRITICAL,
            critique: RiskLevel.CRITICAL,
        };
        this.riskStatusAliases = {
            open: RiskStatus.OPEN,
            ouvert: RiskStatus.OPEN,
            in_progress: RiskStatus.IN_PROGRESS,
            encours: RiskStatus.IN_PROGRESS,
            en_cours: RiskStatus.IN_PROGRESS,
            treated: RiskStatus.TREATED,
            traite: RiskStatus.TREATED,
            closed: RiskStatus.CLOSED,
            cloture: RiskStatus.CLOSED,
            clos: RiskStatus.CLOSED,
        };
        this.probabilityAliases = {
            permanent: RiskProbability.PERMANENT,
            probable: RiskProbability.PROBABLE,
            possible: RiskProbability.POSSIBLE,
            rare: RiskProbability.RARE,
        };
        this.impactAliases = {
            limited: RiskImpact.LIMITED,
            limite: RiskImpact.LIMITED,
            medium: RiskImpact.MEDIUM,
            moyen: RiskImpact.MEDIUM,
            significant: RiskImpact.SIGNIFICANT,
            significatif: RiskImpact.SIGNIFICANT,
            critical: RiskImpact.CRITICAL,
            critique: RiskImpact.CRITICAL,
        };
    }
    ngOnInit() {
        this.loadRisks();
    }
    loadRisks() {
        this.isLoading = true;
        this.loadError = '';
        this.riskService.getRisks().subscribe({
            next: (risks) => {
                this.risks = risks;
                this.buildMatrix();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading risk matrix data', error);
                this.loadError = 'Impossible de charger la matrice de risque.';
                this.isLoading = false;
            },
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    get totalRisks() {
        return this.risks.length;
    }
    get risksOpenCount() {
        return this.risks.filter((risk) => this.resolveRiskStatus(risk.statutCode || risk.statut) === RiskStatus.OPEN).length;
    }
    get risksInProgressCount() {
        return this.risks.filter((risk) => this.resolveRiskStatus(risk.statutCode || risk.statut) === RiskStatus.IN_PROGRESS).length;
    }
    get risksManagedCount() {
        return this.risks.filter((risk) => {
            const status = this.resolveRiskStatus(risk.statutCode || risk.statut);
            return status === RiskStatus.TREATED || status === RiskStatus.CLOSED;
        }).length;
    }
    getMaxIndex(values) {
        if (!values.length || values.every((value) => value === 0)) {
            return -1;
        }
        return values.reduce((maxIndex, value, index, array) => (value > array[maxIndex] ? index : maxIndex), 0);
    }
    getMatrixShare(count) {
        return this.totalRisks > 0 ? Math.round((count / this.totalRisks) * 100) : 0;
    }
    openMatrixCellDetails(row, col) {
        this.selectedMatrixRow = row;
        this.selectedMatrixCol = col;
        this.selectedMatrixRisks = this.risks.filter((risk) => this.getMatrixRowIndex(risk) === row && this.getMatrixColIndex(risk) === col);
        this.showMatrixDetailsModal = true;
    }
    closeMatrixDetails() {
        this.showMatrixDetailsModal = false;
        this.selectedMatrixRow = -1;
        this.selectedMatrixCol = -1;
        this.selectedMatrixRisks = [];
    }
    getSelectedMatrixTitle() {
        if (this.selectedMatrixRow === -1 || this.selectedMatrixCol === -1) {
            return 'Details de la zone';
        }
        return `${this.getProbabilityLabel(this.probabilityOrder[this.selectedMatrixRow])} x ${this.getImpactLabel(this.impactOrder[this.selectedMatrixCol])}`;
    }
    getMatrixRowIndex(risk) {
        const probability = this.resolveProbability(risk.probabilite);
        return probability ? this.probabilityOrder.indexOf(probability) : -1;
    }
    getMatrixColIndex(risk) {
        const impact = this.resolveImpact(risk.impact);
        return impact ? this.impactOrder.indexOf(impact) : -1;
    }
    getRiskLevelClass(level) {
        return this.resolveRiskLevel(level) || 'default';
    }
    getStatusClass(status) {
        return this.resolveRiskStatus(status) || 'default';
    }
    getRiskLevelLabel(level) {
        const resolved = this.resolveRiskLevel(level);
        return resolved ? this.riskLevelLabels[resolved] : 'Non defini';
    }
    getRiskStatusLabel(status) {
        const resolved = this.resolveRiskStatus(status);
        return resolved ? this.riskStatusLabels[resolved] : 'Non defini';
    }
    getProbabilityLabel(probability) {
        const resolved = this.resolveProbability(probability);
        return resolved ? this.probabilityLabels[resolved] : 'Non defini';
    }
    getImpactLabel(impact) {
        const resolved = this.resolveImpact(impact);
        return resolved ? this.impactLabels[resolved] : 'Non defini';
    }
    normalize(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    buildMatrix() {
        this.riskMatrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.matrixRowTotals = [0, 0, 0, 0];
        this.matrixColTotals = [0, 0, 0, 0];
        this.criticalExposureCount = 0;
        this.dominantProbabilityLabel = '-';
        this.dominantImpactLabel = '-';
        this.topZoneLabel = '-';
        this.topZoneCount = 0;
        this.topZoneShare = 0;
        this.risks.forEach((risk) => {
            const row = this.getMatrixRowIndex(risk);
            const col = this.getMatrixColIndex(risk);
            if (row === -1 || col === -1) {
                return;
            }
            this.riskMatrix[row][col]++;
            this.matrixRowTotals[row]++;
            this.matrixColTotals[col]++;
            if ((row <= 1 && col >= 2) || (row === 0 && col === 1)) {
                this.criticalExposureCount++;
            }
        });
        this.computeMatrixHighlights();
    }
    computeMatrixHighlights() {
        const topRowIndex = this.getMaxIndex(this.matrixRowTotals);
        const topColIndex = this.getMaxIndex(this.matrixColTotals);
        const topCell = this.getTopMatrixCell();
        this.dominantProbabilityLabel = topRowIndex === -1
            ? '-'
            : this.getProbabilityLabel(this.probabilityOrder[topRowIndex]);
        this.dominantImpactLabel = topColIndex === -1
            ? '-'
            : this.getImpactLabel(this.impactOrder[topColIndex]);
        if (!topCell) {
            return;
        }
        this.topZoneLabel = `${this.getProbabilityLabel(this.probabilityOrder[topCell.row])} x ${this.getImpactLabel(this.impactOrder[topCell.col])}`;
        this.topZoneCount = topCell.count;
        this.topZoneShare = this.getMatrixShare(topCell.count);
    }
    getTopMatrixCell() {
        let bestRow = -1;
        let bestCol = -1;
        let bestCount = 0;
        this.riskMatrix.forEach((matrixRow, rowIndex) => {
            matrixRow.forEach((count, colIndex) => {
                if (count > bestCount) {
                    bestCount = count;
                    bestRow = rowIndex;
                    bestCol = colIndex;
                }
            });
        });
        return bestCount > 0 ? { row: bestRow, col: bestCol, count: bestCount } : null;
    }
    resolveRiskLevel(level) {
        return this.riskLevelAliases[this.normalize(level)] || null;
    }
    resolveRiskStatus(status) {
        return this.riskStatusAliases[this.normalize(status)] || null;
    }
    resolveProbability(probability) {
        return this.probabilityAliases[this.normalize(probability)] || null;
    }
    resolveImpact(impact) {
        return this.impactAliases[this.normalize(impact)] || null;
    }
}
RiskMatrixComponent.ɵfac = function RiskMatrixComponent_Factory(t) { return new (t || RiskMatrixComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router)); };
RiskMatrixComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskMatrixComponent, selectors: [["app-risk-matrix"]], decls: 19, vars: 7, consts: [[1, "role-dashboard", "reporting-dashboard", "risk-matrix-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-table-cells-large"], [1, "header-right"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", "fa-sync-alt"], ["class", "loading-overlay", 4, "ngIf"], [4, "ngIf"], ["class", "status-panel error", 4, "ngIf"], [3, "title", "close", 4, "ngIf"], [1, "loading-overlay"], [1, "spinner"], [1, "kpi-row", "mb-4"], [1, "kpi-card", "kpi-open"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-total"], [1, "kpi-card", "kpi-progress"], [1, "kpi-card", "kpi-closed"], [1, "module-card", "premium", "risk-matrix-card"], [1, "matrix-header"], [1, "fas", "fa-th"], [1, "matrix-subtitle"], [1, "matrix-legend"], [1, "legend-chip", "green"], [1, "legend-chip", "yellow"], [1, "legend-chip", "orange"], [1, "legend-chip", "red"], [1, "matrix-insights"], [1, "insight-card", "highlight"], [1, "insight-label"], [1, "insight-card", "critical"], [1, "insight-card"], [1, "risk-matrix-container"], [1, "risk-matrix-y-axis"], [1, "fas", "fa-arrow-up"], [1, "risk-matrix-body"], [1, "risk-matrix-table"], [1, "col-axis"], [1, "col-impact"], [1, "axis-corner"], [1, "impact-label"], [1, "score"], [1, "prob-label"], [1, "cell", "cell-yellow", 3, "click"], [1, "cell-content"], ["class", "cell-value", 4, "ngIf"], ["class", "cell-meta", 4, "ngIf"], [1, "cell", "cell-orange", 3, "click"], [1, "cell", "cell-red", 3, "click"], [1, "cell", "cell-darkred", 3, "click"], [1, "cell", "cell-lightyellow", 3, "click"], [1, "cell", "cell-green", 3, "click"], [1, "cell", "cell-lightgreen", 3, "click"], [1, "totals-row"], [1, "total-label"], [1, "total-cell"], [1, "risk-matrix-x-axis"], [1, "fas", "fa-arrow-right"], [1, "matrix-footer"], [1, "footer-note"], [1, "cell-value"], [1, "cell-meta"], [1, "status-panel", "error"], [1, "fas", "fa-circle-exclamation"], [3, "title", "close"], ["modal-body", "", 1, "matrix-risk-modal-body"], [1, "matrix-detail-summary"], [1, "summary-item"], [1, "summary-label"], ["class", "matrix-risk-list", 4, "ngIf", "ngIfElse"], ["emptyMatrixDetail", ""], ["modal-footer", ""], ["type", "button", 1, "btn-export", 3, "click"], [1, "matrix-risk-list"], ["class", "matrix-risk-item", 4, "ngFor", "ngForOf"], [1, "matrix-risk-item"], [1, "risk-item-head"], [1, "risk-level-badge", 3, "ngClass"], [1, "risk-item-desc"], [1, "risk-item-meta"], [1, "empty-matrix-detail"]], template: function RiskMatrixComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function RiskMatrixComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Matrice de Risque");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vue matricielle alignee sur l'analyse detaillee des risques, avec zones dominantes et acces au detail par case.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function RiskMatrixComponent_Template_button_click_12_listener() { return ctx.loadRisks(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, RiskMatrixComponent_div_15_Template, 4, 0, "div", 9);
        i0.ɵɵtemplate(16, RiskMatrixComponent_div_16_Template, 207, 80, "div", 10);
        i0.ɵɵtemplate(17, RiskMatrixComponent_div_17_Template, 4, 1, "div", 11);
        i0.ɵɵtemplate(18, RiskMatrixComponent_app_modal_18_Template, 24, 6, "app-modal", 12);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-spin", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.loadError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.loadError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showMatrixDetailsModal);
    } }, directives: [i3.NgIf, i4.ModalComponent, i3.NgForOf, i3.NgClass], styles: [".risk-matrix-page[_ngcontent-%COMP%] {\n  padding: 20px;\n\n  .risk-matrix-card {\n    overflow: hidden;\n  }\n\n  .loading-overlay {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: 300px;\n    color: #64748b;\n  }\n\n  .spinner {\n    width: 42px;\n    height: 42px;\n    border-radius: 50%;\n    border: 4px solid #e2e8f0;\n    border-top-color: #0f4c81;\n    animation: spin 1s linear infinite;\n    margin-bottom: 14px;\n  }\n\n  .status-panel {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 18px;\n    border-radius: 16px;\n    font-weight: 600;\n\n    &.error {\n      color: #991b1b;\n      background: #fee2e2;\n      border: 1px solid #fecaca;\n    }\n  }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n@media (max-width: 768px) {\n  .risk-matrix-page[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n}", ".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n\r\n      .logo-img {\r\n        height: 35px;\r\n        width: auto;\r\n        border-radius: 4px;\r\n      }\r\n\r\n      .logo {\r\n        font-family: 'Montserrat', sans-serif;\r\n        font-weight: 700;\r\n        font-size: 18px;\r\n        color: #004a99;\r\n        letter-spacing: 0.5px;\r\n        white-space: nowrap;\r\n      }\r\n    }\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\n    --p_low: 0;\n    --p_limited: 0;\n    --p_med: 0;\n    --p_high: 0;\n    --p_crit: 0;\n    width: 200px;\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.low .dot {\n        background: #3b82f6;\n      }\n\n      &.limited .dot {\n        background: #14b8a6;\n      }\n\n      &.med .dot {\n        background: #f59e0b;\n      }\n\r\n      &.high .dot {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.crit .dot {\r\n        background: #7f1d1d;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .bar-wrapper {\r\n    padding: 10px 0;\r\n  }\r\n\r\n  .bar-group {\r\n    margin-bottom: 20px;\r\n\r\n    .bar-label {\r\n      font-size: 0.9rem;\r\n      font-weight: 700;\r\n      color: #334155;\r\n      margin-bottom: 6px;\r\n    }\r\n\r\n    .bar-track {\r\n      height: 24px;\r\n      background: #f1f5f9;\r\n      border-radius: 12px;\r\n      overflow: hidden;\r\n    }\r\n\r\n    .bar-fill {\r\n      height: 100%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      padding-right: 12px;\r\n      border-radius: 12px;\r\n      transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\r\n      min-width: 30px;\r\n\r\n      .bar-value {\r\n        color: white;\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n      }\r\n\r\n      &.open,\n      &.ouvert {\n        background: #94a3b8;\n      }\n\n      &.in_progress,\n      &.en-cours {\n        background: #3b82f6;\n      }\n\n      &.treated,\n      &.traite {\n        background: #10b981; // Green\n      }\n\n      &.closed,\n      &.cloture {\n        background: #64748b; // Slate grey\n      }\n\r\n      // Audit specific statuses\r\n      &.a-venir {\r\n        background: #94a3b8;\r\n      }\r\n\r\n      &.termine {\r\n        background: #10b981;\r\n      }\r\n\r\n      &.en-retard {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.annule {\r\n        background: #64748b;\r\n      }\r\n\r\n      &.dept-fill {\r\n        background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  margin: 0 auto 2rem;\n  overflow: visible !important;\n  \n  .matrix-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 16px;\n    margin-bottom: 18px;\n    padding: 0 6px;\n\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\n  }\n\n  .matrix-subtitle {\n    margin: 6px 0 0;\n    color: #64748b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n  }\n\n  .matrix-legend {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n\n    .legend-chip {\n      font-size: 0.72rem;\n      font-weight: 700;\n      padding: 5px 10px;\n      border-radius: 999px;\n      text-transform: uppercase;\n      \n      &.green { background: #d1fae5; color: #065f46; }\n      &.yellow { background: #fef3c7; color: #92400e; }\n      &.orange { background: #ffedd5; color: #9a3412; }\n      &.red { background: #fee2e2; color: #991b1b; }\n    }\n  }\n\n  .matrix-insights {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 12px;\n    margin-bottom: 14px;\n  }\n\n  .insight-card {\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    border-radius: 14px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    min-height: 88px;\n\n    .insight-label {\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    strong {\n      font-size: 1.05rem;\n      color: #0f172a;\n      line-height: 1.3;\n    }\n\n    small {\n      color: #64748b;\n      font-size: 0.8rem;\n      line-height: 1.4;\n    }\n\n    &.highlight {\n      border-color: rgba(59, 130, 246, 0.22);\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\n    }\n\n    &.critical {\n      border-color: rgba(239, 68, 68, 0.18);\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\n    }\n  }\n\n  .matrix-footer {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n    margin-top: 12px;\n  }\n\n  .footer-note {\n    padding: 12px 14px;\n    border-radius: 12px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #475569;\n    font-size: 0.88rem;\n    line-height: 1.5;\n  }\n}\n\n.risk-matrix-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: auto auto auto;\n  gap: 10px;\n  background: white;\n  padding: 14px;\n  border-radius: 18px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\n}\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\n  grid-row: 1;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  writing-mode: initial;\n  rotate: 0deg;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n.risk-matrix-body[_ngcontent-%COMP%] {\n  grid-row: 2;\n  grid-column: 1;\n  overflow-x: auto;\n}\n\n.risk-matrix-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 780px;\n  table-layout: fixed;\n  border-spacing: 4px;\n  border-collapse: separate;\n\n  .col-axis {\n    width: 130px;\n  }\n\n  .col-impact {\n    width: calc((100% - 130px) / 4);\n  }\n\n  th, td {\n    padding: 0;\n    height: 66px;\n    border-radius: 8px;\n    vertical-align: middle;\n  }\n\n  .impact-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.85rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    padding: 8px 6px;\n    line-height: 1.2;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .prob-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.84rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    width: 130px;\n    padding: 8px 6px;\n    line-height: 1.25;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .axis-corner { border: none; background: transparent; width: 130px; }\n\n  .total-label,\n  .total-cell {\n    background: #eff6ff;\n    border: 1px solid #bfdbfe;\n    color: #1d4ed8;\n    text-align: center;\n    font-weight: 800;\n    font-size: 0.9rem;\n    padding: 8px 6px;\n  }\n\n  .total-label {\n    background: #e0f2fe;\n    border-color: #bae6fd;\n    color: #0f766e;\n  }\n\n  .cell {\n    text-align: center;\n    border: 2px solid transparent;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n    \n    &:hover {\n      transform: scale(1.03);\n      z-index: 10;\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\n      border-color: rgba(255,255,255,0.4);\n    }\n\n    &.is-clickable {\n      cursor: pointer;\n\n      &::after {\n        content: 'Voir';\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        font-size: 0.62rem;\n        font-weight: 800;\n        padding: 3px 6px;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.18);\n        color: rgba(255, 255, 255, 0.95);\n      }\n    }\n\n    .cell-content {\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 2px;\n      padding: 4px;\n    }\n\n    .cell-value {\n      font-size: 1.35rem;\n      font-weight: 900;\n      color: white;\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\n    }\n\n    .cell-meta {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.92);\n      letter-spacing: 0.03em;\n    }\n\n    \n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\n    &.cell-lightgreen .cell-meta,\n    &.cell-lightyellow .cell-meta {\n      color: #475569;\n    }\n  }\n\n  .totals-row {\n    th, td {\n      height: 46px;\n    }\n  }\n}\n\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.matrix-detail-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n  border-radius: 12px;\n\n  .summary-label {\n    display: block;\n    font-size: 0.72rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #64748b;\n    margin-bottom: 6px;\n  }\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.matrix-risk-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-height: 52vh;\n  overflow-y: auto;\n  padding-right: 4px;\n}\n\n.matrix-risk-item[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 16px;\n  background: white;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n}\n\n.risk-item-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n\n  h4 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.risk-level-badge[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 800;\n  white-space: nowrap;\n\n  &.critical {\n    background: #fee2e2;\n    color: #991b1b;\n  }\n\n  &.high {\n    background: #ffedd5;\n    color: #9a3412;\n  }\n\n  &.medium {\n    background: #fef3c7;\n    color: #92400e;\n  }\n\n  &.limited {\n    background: #ccfbf1;\n    color: #115e59;\n  }\n\n  &.low {\n    background: #d1fae5;\n    color: #065f46;\n  }\n\n  &.default {\n    background: #e2e8f0;\n    color: #475569;\n  }\n}\n\n.risk-item-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.risk-item-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px 14px;\n  color: #334155;\n  font-size: 0.88rem;\n}\n\n.empty-matrix-detail[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\n  grid-row: 3;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n@media (max-width: 1100px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    .matrix-insights {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n\n    .matrix-footer {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n\n    .matrix-header {\n      flex-direction: column;\n    }\n\n    .matrix-insights {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .risk-matrix-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    writing-mode: initial;\n    rotate: 0deg;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n\n  .risk-matrix-body[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskMatrixComponent, [{
        type: Component,
        args: [{
                selector: 'app-risk-matrix',
                templateUrl: './risk-matrix.component.html',
                styleUrls: [
                    './risk-matrix.component.scss',
                    '../../../dashboard/dashboard.component.scss',
                ]
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=risk-matrix.component.js.map