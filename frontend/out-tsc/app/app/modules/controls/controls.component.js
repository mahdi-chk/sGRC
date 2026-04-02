import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlsService } from './controls.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./controls.service";
import * as i3 from "@angular/common";
function ControlsComponent_article_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 23);
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const capability_r14 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(capability_r14.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(capability_r14.description);
} }
function ControlsComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "i", 25);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Chargement de la synthese des controles...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ControlsComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.errorMessage);
} }
function ControlsComponent_ng_container_29_div_54_tr_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵelementStart(9, "span", 43);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelementStart(12, "span", 44);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵelementStart(19, "span", 45);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const control_r22 = ctx.$implicit;
    const ctx_r21 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r22.code);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r22.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r22.linkedRisk);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r22.controlType);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(control_r22.executionType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r22.department);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(control_r22.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r21.getStatusClass(control_r22.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r21.formatDate(control_r22.nextReview));
} }
function ControlsComponent_ng_container_29_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelementStart(1, "table");
    i0.ɵɵelementStart(2, "thead");
    i0.ɵɵelementStart(3, "tr");
    i0.ɵɵelementStart(4, "th");
    i0.ɵɵtext(5, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Controle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Execution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Departement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Prochaine revue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "tbody");
    i0.ɵɵtemplate(19, ControlsComponent_ng_container_29_div_54_tr_19_Template, 21, 9, "tr", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngForOf", ctx_r16.registryPreview);
} }
function ControlsComponent_ng_container_29_div_64_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 48);
    i0.ɵɵelementStart(1, "div", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 50);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 51);
    i0.ɵɵelementStart(9, "span", 43);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 44);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 45);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r24 = ctx.$implicit;
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r23.formatDate(item_r24.dueDate));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r24.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r24.department, " | ", item_r24.owner, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r24.scheduleType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r24.cadence);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r23.getStatusClass(item_r24.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r24.linkLabel);
} }
function ControlsComponent_ng_container_29_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtemplate(1, ControlsComponent_ng_container_29_div_64_article_1_Template, 15, 8, "article", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r17.planningPreview);
} }
function ControlsComponent_ng_container_29_div_75_article_1_small_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const evidence_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Audit lie : ", evidence_r26.linkedAudit, "");
} }
function ControlsComponent_ng_container_29_div_75_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 54);
    i0.ɵɵelementStart(1, "div", 55);
    i0.ɵɵelement(2, "i", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 57);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 58);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, ControlsComponent_ng_container_29_div_75_article_1_small_15_Template, 2, 1, "small", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 43);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const evidence_r26 = ctx.$implicit;
    const ctx_r25 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(evidence_r26.filename);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(evidence_r26.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(evidence_r26.author);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(evidence_r26.department);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r25.formatDate(evidence_r26.uploadedAt));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", evidence_r26.linkedAudit);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(evidence_r26.sourceType);
} }
function ControlsComponent_ng_container_29_div_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵtemplate(1, ControlsComponent_ng_container_29_div_75_article_1_Template, 18, 7, "article", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r18.evidencePreview);
} }
function ControlsComponent_ng_container_29_div_85_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 61);
    i0.ɵɵelementStart(1, "div", 62);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 63);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 64);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 45);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r30 = ctx.$implicit;
    const ctx_r29 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r30.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r29.getStatusClass(item_r30.severity));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r30.severity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r30.department, " | Source : ", item_r30.source, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r30.owner || "Sans proprietaire");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r29.formatDate(item_r30.dueDate));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r29.getStatusClass(item_r30.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r30.status);
} }
function ControlsComponent_ng_container_29_div_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, ControlsComponent_ng_container_29_div_85_article_1_Template, 15, 9, "article", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r19.nonConformityPreview);
} }
function ControlsComponent_ng_container_29_div_95_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 67);
    i0.ɵɵelementStart(1, "div", 68);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "span", 30);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 69);
    i0.ɵɵelementStart(12, "div");
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Avant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div");
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Apres");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div");
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "Tendance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong", 45);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r32 = ctx.$implicit;
    const ctx_r31 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", ctx_r31.getToneClass(item_r32.score));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r32.controlCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r32.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r32.score, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Mise en oeuvre : ", ctx_r31.formatDate(item_r32.implementationDate), "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r32.incidentsBefore);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r32.incidentsAfter);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r31.getTrendClass(item_r32.recurrenceTrend));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r31.getTrendLabel(item_r32.recurrenceTrend));
} }
function ControlsComponent_ng_container_29_div_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtemplate(1, ControlsComponent_ng_container_29_div_95_article_1_Template, 27, 9, "article", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r20.effectivenessPreview);
} }
function ControlsComponent_ng_container_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 28);
    i0.ɵɵelementStart(2, "div", 29);
    i0.ɵɵelementStart(3, "span", 30);
    i0.ɵɵtext(4, "Controles suivis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 29);
    i0.ɵɵelementStart(10, "span", 30);
    i0.ɵɵtext(11, "Actions a venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p");
    i0.ɵɵtext(15, "Elements planifies sur les 30 prochains jours.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 29);
    i0.ɵɵelementStart(17, "span", 30);
    i0.ɵɵtext(18, "Actions en retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p");
    i0.ɵɵtext(22, "Points a replanifier ou a escalader rapidement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 29);
    i0.ɵɵelementStart(24, "span", 30);
    i0.ɵɵtext(25, "Preuves centralisees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p");
    i0.ɵɵtext(29, "Justificatifs audit, risques et incidents confondus.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 29);
    i0.ɵɵelementStart(31, "span", 30);
    i0.ɵɵtext(32, "Score d efficacite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p");
    i0.ɵɵtext(36, "Base sur la recurrence des incidents observes.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 29);
    i0.ɵɵelementStart(38, "span", 30);
    i0.ɵɵtext(39, "Non-conformites ouvertes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "strong");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "p");
    i0.ɵɵtext(43, "Ecarts encore actifs dans le cycle de controle.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 31);
    i0.ɵɵelementStart(45, "section", 32);
    i0.ɵɵelementStart(46, "div", 33);
    i0.ɵɵelementStart(47, "div");
    i0.ɵɵelementStart(48, "span", 5);
    i0.ɵɵtext(49, "Referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "h2");
    i0.ɵɵtext(51, "Referentiel des controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "span", 34);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(54, ControlsComponent_ng_container_29_div_54_Template, 20, 1, "div", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "section", 36);
    i0.ɵɵelementStart(56, "div", 33);
    i0.ɵɵelementStart(57, "div");
    i0.ɵɵelementStart(58, "span", 5);
    i0.ɵɵtext(59, "Planification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "h2");
    i0.ɵɵtext(61, "Audits et controles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span", 34);
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(64, ControlsComponent_ng_container_29_div_64_Template, 2, 1, "div", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 31);
    i0.ɵɵelementStart(66, "section", 36);
    i0.ɵɵelementStart(67, "div", 33);
    i0.ɵɵelementStart(68, "div");
    i0.ɵɵelementStart(69, "span", 5);
    i0.ɵɵtext(70, "Preuves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "h2");
    i0.ɵɵtext(72, "Collecte et rattachement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span", 34);
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(75, ControlsComponent_ng_container_29_div_75_Template, 2, 1, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "section", 36);
    i0.ɵɵelementStart(77, "div", 33);
    i0.ɵɵelementStart(78, "div");
    i0.ɵɵelementStart(79, "span", 5);
    i0.ɵɵtext(80, "Ecarts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "h2");
    i0.ɵɵtext(82, "Suivi des non-conformites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "span", 34);
    i0.ɵɵtext(84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(85, ControlsComponent_ng_container_29_div_85_Template, 2, 1, "div", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "section", 36);
    i0.ɵɵelementStart(87, "div", 33);
    i0.ɵɵelementStart(88, "div");
    i0.ɵɵelementStart(89, "span", 5);
    i0.ɵɵtext(90, "Efficacite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "h2");
    i0.ɵɵtext(92, "Lecture de la recurrence des incidents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "span", 34);
    i0.ɵɵtext(94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(95, ControlsComponent_ng_container_29_div_95_Template, 2, 1, "div", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const data_r15 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    const _r4 = i0.ɵɵreference(31);
    const _r6 = i0.ɵɵreference(33);
    const _r8 = i0.ɵɵreference(35);
    const _r10 = i0.ɵɵreference(37);
    const _r12 = i0.ɵɵreference(39);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(data_r15.summary.totalControls);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", data_r15.summary.periodicControls, " periodiques et ", data_r15.summary.ponctualControls, " ponctuels.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r15.summary.upcomingActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r15.summary.overdueActions);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r15.summary.evidenceCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", data_r15.summary.effectivenessScore, "%");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r15.summary.openNonConformities);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate1("", data_r15.registry.length, " controles");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.registryPreview.length > 0)("ngIfElse", _r4);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", data_r15.planning.length, " lignes");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.planningPreview.length > 0)("ngIfElse", _r6);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(data_r15.evidence.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.evidencePreview.length > 0)("ngIfElse", _r8);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(data_r15.nonConformities.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.nonConformityPreview.length > 0)("ngIfElse", _r10);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", data_r15.effectiveness.length, " controles evalues");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.effectivenessPreview.length > 0)("ngIfElse", _r12);
} }
function ControlsComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 71);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun controle rattache a votre perimetre.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ControlsComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune ligne de planification disponible.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ControlsComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 73);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune preuve centralisee pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ControlsComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune non-conformite ouverte dans le perimetre courant.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ControlsComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 75);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Pas assez de donnees pour evaluer l efficacite.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ControlsComponent {
    constructor(router, controlsService) {
        this.router = router;
        this.controlsService = controlsService;
        this.overview = null;
        this.isLoading = false;
        this.errorMessage = '';
        this.capabilities = [
            {
                title: 'Referentiel des controles',
                description: 'Catalogue des controles relies aux risques, aux responsables et au niveau de maturite.'
            },
            {
                title: 'Planification integree',
                description: 'Pilotage commun des audits et des controles, ponctuels comme periodiques.'
            },
            {
                title: 'Collecte de preuves',
                description: 'Centralisation des justificatifs avec auteur du depot et rattachement audit ou departement.'
            },
            {
                title: 'Evaluation d efficacite',
                description: 'Lecture de la recurrence des incidents apres mise en oeuvre du controle.'
            },
            {
                title: 'Suivi des non-conformites',
                description: 'Controle continu des ecarts detectes et des actions encore ouvertes.'
            }
        ];
    }
    ngOnInit() {
        this.loadOverview();
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    loadOverview() {
        this.isLoading = true;
        this.errorMessage = '';
        this.controlsService.getOverview().subscribe({
            next: overview => {
                this.overview = overview;
                this.isLoading = false;
            },
            error: () => {
                this.overview = null;
                this.errorMessage = 'Impossible de charger la vue des controles internes pour le moment.';
                this.isLoading = false;
            }
        });
    }
    get registryPreview() {
        var _a;
        return (((_a = this.overview) === null || _a === void 0 ? void 0 : _a.registry) || []).slice(0, 8);
    }
    get planningPreview() {
        var _a;
        return (((_a = this.overview) === null || _a === void 0 ? void 0 : _a.planning) || []).slice(0, 8);
    }
    get evidencePreview() {
        var _a;
        return (((_a = this.overview) === null || _a === void 0 ? void 0 : _a.evidence) || []).slice(0, 6);
    }
    get effectivenessPreview() {
        var _a;
        return (((_a = this.overview) === null || _a === void 0 ? void 0 : _a.effectiveness) || []).slice(0, 6);
    }
    get nonConformityPreview() {
        var _a;
        return (((_a = this.overview) === null || _a === void 0 ? void 0 : _a.nonConformities) || []).slice(0, 6);
    }
    formatDate(value) {
        if (!value) {
            return 'Non planifie';
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return 'Date indisponible';
        }
        return parsed.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    getStatusClass(value) {
        return `state-${this.slugify(value)}`;
    }
    getToneClass(score) {
        if (score >= 80) {
            return 'tone-strong';
        }
        if (score >= 60) {
            return 'tone-watch';
        }
        return 'tone-alert';
    }
    getTrendLabel(value) {
        if (value === 'en_baisse') {
            return 'En baisse';
        }
        if (value === 'en_hausse') {
            return 'En hausse';
        }
        return 'Stable';
    }
    getTrendClass(value) {
        return `trend-${this.slugify(value)}`;
    }
    slugify(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
ControlsComponent.ɵfac = function ControlsComponent_Factory(t) { return new (t || ControlsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ControlsService)); };
ControlsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ControlsComponent, selectors: [["app-controls"]], decls: 40, vars: 6, consts: [[1, "controls-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "eyebrow"], [1, "fas", "fa-user-check"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "hero-panel"], [1, "hero-copy"], [1, "hero-label"], [1, "capability-grid"], ["class", "capability-card", 4, "ngFor", "ngForOf"], ["class", "feedback-state", 4, "ngIf"], ["class", "feedback-state error", 4, "ngIf"], [4, "ngIf"], ["emptyRegistry", ""], ["emptyPlanning", ""], ["emptyEvidence", ""], ["emptyNonConformities", ""], ["emptyEffectiveness", ""], [1, "capability-card"], [1, "feedback-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "feedback-state", "error"], [1, "fas", "fa-triangle-exclamation"], [1, "summary-grid"], [1, "summary-card"], [1, "metric-label"], [1, "content-grid"], [1, "panel", "panel-wide"], [1, "panel-head"], [1, "panel-badge"], ["class", "table-shell", 4, "ngIf", "ngIfElse"], [1, "panel"], ["class", "agenda-list", 4, "ngIf", "ngIfElse"], ["class", "evidence-list", 4, "ngIf", "ngIfElse"], ["class", "nonconformity-list", 4, "ngIf", "ngIfElse"], ["class", "effectiveness-grid", 4, "ngIf", "ngIfElse"], [1, "table-shell"], [4, "ngFor", "ngForOf"], [1, "tag"], [1, "tag", "subtle"], [3, "ngClass"], [1, "agenda-list"], ["class", "agenda-item", 4, "ngFor", "ngForOf"], [1, "agenda-item"], [1, "agenda-date"], [1, "agenda-copy"], [1, "agenda-meta"], [1, "evidence-list"], ["class", "evidence-item", 4, "ngFor", "ngForOf"], [1, "evidence-item"], [1, "evidence-icon"], [1, "fas", "fa-file-shield"], [1, "evidence-copy"], [1, "evidence-meta"], [1, "nonconformity-list"], ["class", "nonconformity-item", 4, "ngFor", "ngForOf"], [1, "nonconformity-item"], [1, "nonconformity-head"], [1, "tag", 3, "ngClass"], [1, "nonconformity-meta"], [1, "effectiveness-grid"], ["class", "effectiveness-card", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "effectiveness-card", 3, "ngClass"], [1, "effectiveness-head"], [1, "effectiveness-metrics"], [1, "empty-state"], [1, "fas", "fa-folder-open"], [1, "fas", "fa-calendar-day"], [1, "fas", "fa-paperclip"], [1, "fas", "fa-shield-check"], [1, "fas", "fa-chart-line"]], template: function ControlsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ControlsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "span", 5);
        i0.ɵɵtext(7, "Module transverse");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "h1");
        i0.ɵɵelement(9, "i", 6);
        i0.ɵɵtext(10, " Contr\u00F4les Internes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "p");
        i0.ɵɵtext(12, "Le module rassemble le r\u00E9f\u00E9rentiel, la planification, les preuves, l'efficacit\u00E9 et le suivi des \u00E9carts sur une m\u00EAme vue de pilotage.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 7);
        i0.ɵɵelementStart(14, "button", 8);
        i0.ɵɵlistener("click", function ControlsComponent_Template_button_click_14_listener() { return ctx.loadOverview(); });
        i0.ɵɵelement(15, "i", 9);
        i0.ɵɵtext(16, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 10);
        i0.ɵɵelementStart(18, "div", 11);
        i0.ɵɵelementStart(19, "span", 12);
        i0.ɵɵtext(20, "Pilotage du dispositif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22, "Du contr\u00F4le con\u00E7u au contr\u00F4le ex\u00E9cut\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "La vue ci-dessous consolide les donn\u00E9es r\u00E9elles des risques, des audits et des incidents pour donner une lecture op\u00E9rationnelle du contr\u00F4le interne.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 13);
        i0.ɵɵtemplate(26, ControlsComponent_article_26_Template, 5, 2, "article", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(27, ControlsComponent_div_27_Template, 4, 0, "div", 15);
        i0.ɵɵtemplate(28, ControlsComponent_div_28_Template, 4, 1, "div", 16);
        i0.ɵɵtemplate(29, ControlsComponent_ng_container_29_Template, 96, 23, "ng-container", 17);
        i0.ɵɵtemplate(30, ControlsComponent_ng_template_30_Template, 4, 0, "ng-template", null, 18, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(32, ControlsComponent_ng_template_32_Template, 4, 0, "ng-template", null, 19, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(34, ControlsComponent_ng_template_34_Template, 4, 0, "ng-template", null, 20, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(36, ControlsComponent_ng_template_36_Template, 4, 0, "ng-template", null, 21, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(38, ControlsComponent_ng_template_38_Template, 4, 0, "ng-template", null, 22, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngForOf", ctx.capabilities);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.errorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.overview);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf], styles: [".controls-workspace[_ngcontent-%COMP%] {\n    --controls-ink: #17324d;\n    --controls-muted: #61758a;\n    --controls-line: #d9e2ea;\n    --controls-paper: rgba(255, 255, 255, 0.88);\n    --controls-surface: linear-gradient(160deg, #f3f7fb 0%, #eef4f7 52%, #fcfbf7 100%);\n    --controls-accent: #0f4c81;\n    --controls-accent-soft: #d9ecfb;\n    --controls-warm: #b67d1a;\n    --controls-good: #1f7a5a;\n    --controls-watch: #a56b00;\n    --controls-alert: #9e3a31;\n    padding: 32px;\n    min-height: 100%;\n    background:\n        radial-gradient(circle at top right, rgba(182, 125, 26, 0.12), transparent 26%),\n        radial-gradient(circle at left center, rgba(15, 76, 129, 0.1), transparent 30%),\n        var(--controls-surface);\n    color: var(--controls-ink);\n    font-family: \"Trebuchet MS\", \"Segoe UI\", sans-serif;\n}\n\n.page-header[_ngcontent-%COMP%], .hero-panel[_ngcontent-%COMP%], .panel[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%], .feedback-state[_ngcontent-%COMP%] {\n    border-radius: 22px;\n    border: 1px solid rgba(217, 226, 234, 0.9);\n    background: var(--controls-paper);\n    box-shadow: 0 18px 40px rgba(17, 44, 72, 0.06);\n    backdrop-filter: blur(10px);\n}\n\n.page-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    gap: 24px;\n    align-items: flex-start;\n    padding: 24px 28px;\n}\n\n.header-left[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 18px;\n    align-items: flex-start;\n}\n\n.back-btn[_ngcontent-%COMP%], .btn-refresh[_ngcontent-%COMP%] {\n    border: 0;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.back-btn[_ngcontent-%COMP%] {\n    width: 46px;\n    height: 46px;\n    border-radius: 14px;\n    background: var(--controls-accent);\n    color: #fff;\n    box-shadow: 0 10px 22px rgba(15, 76, 129, 0.22);\n}\n\n.back-btn[_ngcontent-%COMP%]:hover, .btn-refresh[_ngcontent-%COMP%]:hover:not(:disabled) {\n    transform: translateY(-1px);\n}\n\n.eyebrow[_ngcontent-%COMP%], .hero-label[_ngcontent-%COMP%], .metric-label[_ngcontent-%COMP%] {\n    display: inline-block;\n    text-transform: uppercase;\n    letter-spacing: 0.12em;\n    font-size: 0.73rem;\n    font-weight: 700;\n    color: var(--controls-muted);\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .hero-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin: 6px 0 10px;\n    font-family: Georgia, \"Times New Roman\", serif;\n    letter-spacing: -0.03em;\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n}\n\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .hero-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .feedback-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin: 0;\n    color: var(--controls-muted);\n    line-height: 1.6;\n}\n\n.btn-refresh[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    padding: 12px 16px;\n    border-radius: 999px;\n    background: #fff;\n    color: var(--controls-ink);\n    border: 1px solid var(--controls-line);\n    font-weight: 700;\n}\n\n.btn-refresh[_ngcontent-%COMP%]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n\n.hero-panel[_ngcontent-%COMP%] {\n    margin-top: 24px;\n    padding: 28px;\n    display: grid;\n    grid-template-columns: minmax(280px, 1.1fr) 1.4fr;\n    gap: 26px;\n}\n\n.hero-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.85rem;\n}\n\n.capability-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n}\n\n.capability-card[_ngcontent-%COMP%] {\n    padding: 18px;\n    border-radius: 18px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 246, 249, 0.94));\n    border: 1px solid rgba(217, 226, 234, 0.9);\n}\n\n.capability-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .agenda-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .evidence-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .nonconformity-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .effectiveness-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    margin: 0 0 8px;\n    font-size: 1rem;\n}\n\n.summary-grid[_ngcontent-%COMP%], .content-grid[_ngcontent-%COMP%], .effectiveness-grid[_ngcontent-%COMP%] {\n    margin-top: 24px;\n    display: grid;\n    gap: 18px;\n}\n\n.summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n}\n\n.summary-card[_ngcontent-%COMP%] {\n    padding: 20px;\n}\n\n.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin: 10px 0 8px;\n    font-size: 2rem;\n    font-family: Georgia, \"Times New Roman\", serif;\n}\n\n.content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1.35fr 1fr;\n}\n\n.panel[_ngcontent-%COMP%] {\n    padding: 24px;\n}\n\n.panel-wide[_ngcontent-%COMP%] {\n    min-width: 0;\n}\n\n.panel-head[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 16px;\n    margin-bottom: 18px;\n}\n\n.panel-badge[_ngcontent-%COMP%], .tag[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 999px;\n    padding: 6px 12px;\n    font-size: 0.76rem;\n    font-weight: 700;\n}\n\n.panel-badge[_ngcontent-%COMP%] {\n    background: var(--controls-accent-soft);\n    color: var(--controls-accent);\n}\n\n.table-shell[_ngcontent-%COMP%] {\n    overflow-x: auto;\n}\n\ntable[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    padding: 14px 10px;\n    border-bottom: 1px solid rgba(217, 226, 234, 0.8);\n    vertical-align: top;\n    text-align: left;\n}\n\nth[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: var(--controls-muted);\n}\n\ntd[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: block;\n}\n\ntd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    margin-top: 4px;\n    color: var(--controls-muted);\n}\n\n.tag[_ngcontent-%COMP%] {\n    background: rgba(15, 76, 129, 0.08);\n    color: var(--controls-accent);\n}\n\n.tag.subtle[_ngcontent-%COMP%] {\n    background: rgba(182, 125, 26, 0.12);\n    color: #7a5514;\n}\n\n.agenda-list[_ngcontent-%COMP%], .evidence-list[_ngcontent-%COMP%], .nonconformity-list[_ngcontent-%COMP%] {\n    display: grid;\n    gap: 12px;\n}\n\n.agenda-item[_ngcontent-%COMP%], .evidence-item[_ngcontent-%COMP%], .nonconformity-item[_ngcontent-%COMP%], .effectiveness-card[_ngcontent-%COMP%] {\n    border: 1px solid rgba(217, 226, 234, 0.8);\n    border-radius: 18px;\n    background: rgba(255, 255, 255, 0.78);\n}\n\n.agenda-item[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 110px 1fr;\n    gap: 16px;\n    padding: 16px;\n}\n\n.agenda-date[_ngcontent-%COMP%] {\n    border-radius: 14px;\n    background: linear-gradient(180deg, #eff6fd, #deedf9);\n    color: var(--controls-accent);\n    font-weight: 700;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    padding: 14px;\n    min-height: 72px;\n}\n\n.agenda-meta[_ngcontent-%COMP%], .nonconformity-meta[_ngcontent-%COMP%], .evidence-meta[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px 12px;\n    margin-top: 10px;\n    color: var(--controls-muted);\n    font-size: 0.86rem;\n}\n\n.evidence-item[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 54px 1fr auto;\n    gap: 14px;\n    align-items: flex-start;\n    padding: 16px;\n}\n\n.evidence-icon[_ngcontent-%COMP%] {\n    width: 54px;\n    height: 54px;\n    border-radius: 16px;\n    background: linear-gradient(180deg, #f6efe2, #fbeed4);\n    color: var(--controls-warm);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.2rem;\n}\n\n.evidence-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 10px;\n    color: var(--controls-muted);\n}\n\n.nonconformity-item[_ngcontent-%COMP%] {\n    padding: 16px;\n}\n\n.nonconformity-head[_ngcontent-%COMP%], .effectiveness-head[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    gap: 12px;\n    align-items: flex-start;\n}\n\n.effectiveness-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.effectiveness-card[_ngcontent-%COMP%] {\n    padding: 18px;\n}\n\n.effectiveness-head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    font-family: Georgia, \"Times New Roman\", serif;\n}\n\n.effectiveness-metrics[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n    gap: 12px;\n    margin-top: 14px;\n}\n\n.effectiveness-metrics[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    border-radius: 14px;\n    padding: 12px;\n    background: rgba(15, 76, 129, 0.05);\n}\n\n.effectiveness-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 0.78rem;\n    color: var(--controls-muted);\n    margin-bottom: 6px;\n}\n\n.effectiveness-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1rem;\n}\n\n.tone-strong[_ngcontent-%COMP%] {\n    border-color: rgba(31, 122, 90, 0.28);\n    box-shadow: inset 0 0 0 1px rgba(31, 122, 90, 0.08);\n}\n\n.tone-watch[_ngcontent-%COMP%] {\n    border-color: rgba(165, 107, 0, 0.28);\n    box-shadow: inset 0 0 0 1px rgba(165, 107, 0, 0.08);\n}\n\n.tone-alert[_ngcontent-%COMP%] {\n    border-color: rgba(158, 58, 49, 0.26);\n    box-shadow: inset 0 0 0 1px rgba(158, 58, 49, 0.08);\n}\n\n.feedback-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n    margin-top: 24px;\n    padding: 22px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    text-align: center;\n}\n\n.feedback-state.error[_ngcontent-%COMP%] {\n    color: var(--controls-alert);\n}\n\n.state-maitrise[_ngcontent-%COMP%], .state-treated[_ngcontent-%COMP%], .state-clos[_ngcontent-%COMP%], .state-closed[_ngcontent-%COMP%], .trend-en-baisse[_ngcontent-%COMP%] {\n    color: var(--controls-good);\n}\n\n.state-a-revoir[_ngcontent-%COMP%], .state-en-retard[_ngcontent-%COMP%], .state-high[_ngcontent-%COMP%], .state-critical[_ngcontent-%COMP%], .trend-en-hausse[_ngcontent-%COMP%] {\n    color: var(--controls-alert);\n}\n\n.state-medium[_ngcontent-%COMP%], .state-significant[_ngcontent-%COMP%], .trend-stable[_ngcontent-%COMP%] {\n    color: var(--controls-watch);\n}\n\n@media (max-width: 1280px) {\n    .summary-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n\n    .effectiveness-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n}\n\n@media (max-width: 980px) {\n    .controls-workspace[_ngcontent-%COMP%] {\n        padding: 20px;\n    }\n\n    .page-header[_ngcontent-%COMP%], .hero-panel[_ngcontent-%COMP%], .content-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .page-header[_ngcontent-%COMP%] {\n        flex-direction: column;\n    }\n\n    .capability-grid[_ngcontent-%COMP%], .summary-grid[_ngcontent-%COMP%], .effectiveness-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 640px) {\n    .agenda-item[_ngcontent-%COMP%], .evidence-item[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .effectiveness-metrics[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsComponent, [{
        type: Component,
        args: [{
                selector: 'app-controls',
                templateUrl: './controls.component.html',
                styleUrls: ['./controls.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ControlsService }]; }, null); })();
//# sourceMappingURL=controls.component.js.map