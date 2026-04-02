import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { RiskService, RiskStatus, RiskLevel } from '../../core/services/risk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
function StrategicEvaluationComponent_button_48_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function StrategicEvaluationComponent_button_48_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.clearFilters(); });
    i0.ɵɵelement(1, "i", 42);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function StrategicEvaluationComponent_tr_99_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵelementStart(1, "p", 56);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 57);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵelement(6, "i", 58);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 59);
    i0.ɵɵelement(9, "i", 60);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind3(3, 3, risk_r6.treatments[risk_r6.treatments.length - 1].content, 0, 100), "...");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", risk_r6.treatments[risk_r6.treatments.length - 1].user == null ? null : risk_r6.treatments[risk_r6.treatments.length - 1].user.prenom, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", risk_r6.treatments.length > 1 ? "+" + (risk_r6.treatments.length - 1) + " autres" : "D\u00E9tails", " ");
} }
function StrategicEvaluationComponent_tr_99_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵtext(2, " Aucun traitement. ");
    i0.ɵɵelementEnd();
} }
function StrategicEvaluationComponent_tr_99_div_18_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ai_r14 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00C9valu\u00E9 le ", i0.ɵɵpipeBind2(2, 1, ai_r14.date, "dd/MM/yyyy"), "");
} }
function StrategicEvaluationComponent_tr_99_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "span", 63);
    i0.ɵɵelement(2, "i", 64);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 65);
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7, "Impact:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11, "Tendance:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 66);
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15, "Conseil IA:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, StrategicEvaluationComponent_tr_99_div_18_span_17_Template, 3, 4, "span", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ai_r14 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("prio-high", ai_r14.priorite >= 7)("prio-med", ai_r14.priorite >= 4 && ai_r14.priorite < 7)("prio-low", ai_r14.priorite < 4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Score IA: ", ai_r14.priorite, "/10 ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ai_r14.impact, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ai_r14.tendance, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ai_r14.suggestion, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ai_r14.date);
} }
function StrategicEvaluationComponent_tr_99_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 69);
    i0.ɵɵtext(1, " En attente d'\u00E9valuation... ");
    i0.ɵɵelementEnd();
} }
function StrategicEvaluationComponent_tr_99_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 43);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 44);
    i0.ɵɵelement(5, "i", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelementStart(8, "div", 46);
    i0.ɵɵelementStart(9, "span", 47);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 48);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 49);
    i0.ɵɵlistener("click", function StrategicEvaluationComponent_tr_99_Template_td_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r18); const risk_r6 = restoredCtx.$implicit; const ctx_r17 = i0.ɵɵnextContext(); return risk_r6.treatments && risk_r6.treatments.length > 0 ? ctx_r17.openHistory(risk_r6) : null; });
    i0.ɵɵtemplate(14, StrategicEvaluationComponent_tr_99_div_14_Template, 11, 7, "div", 50);
    i0.ɵɵtemplate(15, StrategicEvaluationComponent_tr_99_ng_template_15_Template, 3, 0, "ng-template", null, 51, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 52);
    i0.ɵɵtemplate(18, StrategicEvaluationComponent_tr_99_div_18_Template, 18, 11, "div", 53);
    i0.ɵɵtemplate(19, StrategicEvaluationComponent_tr_99_ng_template_19_Template, 2, 0, "ng-template", null, 54, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r6 = ctx.$implicit;
    const _r8 = i0.ɵɵreference(16);
    const _r11 = i0.ɵɵreference(20);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r6.titre);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (risk_r6.departement == null ? null : risk_r6.departement.nom) || "N/A", "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", "status-" + (risk_r6.statut == null ? null : risk_r6.statut.toLowerCase()));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.statusLabelMap[risk_r6.statut] || risk_r6.statut);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", "level-" + (risk_r6.niveauRisque == null ? null : risk_r6.niveauRisque.toLowerCase()));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.levelLabelMap[risk_r6.niveauRisque] || risk_r6.niveauRisque);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("clickable", risk_r6.treatments && risk_r6.treatments.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", risk_r6.treatments && risk_r6.treatments.length > 0)("ngIfElse", _r8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.getAiResult(risk_r6.id))("ngIfElse", _r11);
} }
function StrategicEvaluationComponent_div_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 12);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucun r\u00E9sultat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Aucun risque ne correspond \u00E0 vos crit\u00E8res de recherche.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function StrategicEvaluationComponent_div_101_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 44);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r19.selectedRiskForHistory.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r19.selectedRiskForHistory.departement == null ? null : ctx_r19.selectedRiskForHistory.departement.nom);
} }
function StrategicEvaluationComponent_div_101_div_10_div_1_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87);
    i0.ɵɵelementStart(1, "a", 88);
    i0.ɵɵelement(2, "i", 89);
    i0.ɵɵtext(3, " Voir la pi\u00E8ce jointe ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const treatment_r22 = i0.ɵɵnextContext().$implicit;
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", ctx_r23.environment.serverUrl + "/" + treatment_r22.pieceJointe + ctx_r23.authQueryToken, i0.ɵɵsanitizeUrl);
} }
function StrategicEvaluationComponent_div_101_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "div", 82);
    i0.ɵɵelementStart(2, "span", 83);
    i0.ɵɵelement(3, "i", 58);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 84);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 85);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, StrategicEvaluationComponent_div_101_div_10_div_1_div_10_Template, 4, 1, "div", 86);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const treatment_r22 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", treatment_r22.user == null ? null : treatment_r22.user.prenom, " ", treatment_r22.user == null ? null : treatment_r22.user.nom, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 5, treatment_r22.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", treatment_r22.content, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", treatment_r22.pieceJointe);
} }
function StrategicEvaluationComponent_div_101_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵtemplate(1, StrategicEvaluationComponent_div_101_div_10_div_1_Template, 11, 8, "div", 80);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    let tmp_0_0;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r20.selectedRiskForHistory == null ? null : ctx_r20.selectedRiskForHistory.treatments == null ? null : (tmp_0_0 = ctx_r20.selectedRiskForHistory.treatments.slice()) == null ? null : tmp_0_0.reverse());
} }
function StrategicEvaluationComponent_div_101_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵlistener("click", function StrategicEvaluationComponent_div_101_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.closeHistory(); });
    i0.ɵɵelementStart(1, "div", 72);
    i0.ɵɵlistener("click", function StrategicEvaluationComponent_div_101_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 73);
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵelement(4, "i", 60);
    i0.ɵɵtext(5, " Historique des Traitements");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 74);
    i0.ɵɵlistener("click", function StrategicEvaluationComponent_div_101_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r26); const ctx_r28 = i0.ɵɵnextContext(); return ctx_r28.closeHistory(); });
    i0.ɵɵtext(7, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 75);
    i0.ɵɵtemplate(9, StrategicEvaluationComponent_div_101_div_9_Template, 5, 2, "div", 76);
    i0.ɵɵtemplate(10, StrategicEvaluationComponent_div_101_div_10_Template, 2, 1, "div", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedRiskForHistory);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedRiskForHistory == null ? null : ctx_r3.selectedRiskForHistory.treatments);
} }
export class StrategicEvaluationComponent {
    constructor(riskService, router) {
        this.riskService = riskService;
        this.router = router;
        this.environment = environment;
        this.showExportMenu = false;
        this.risks = [];
        this.filteredRisks = [];
        this.isEvaluating = false;
        this.aiResults = [];
        // Filtres
        this.searchTerm = '';
        this.statusFilter = '';
        this.levelFilter = '';
        // Modal Historique
        this.showHistoryModal = false;
        this.selectedRiskForHistory = null;
        this.today = new Date().toISOString().split('T')[0];
        // Expose Enums to templates
        this.RiskStatus = RiskStatus;
        this.RiskLevel = RiskLevel;
        // Label mappings for UI
        this.statusLabelMap = {
            [RiskStatus.OPEN]: 'Ouvert',
            [RiskStatus.IN_PROGRESS]: 'En cours',
            [RiskStatus.TREATED]: 'Traité',
            [RiskStatus.CLOSED]: 'Clôturé'
        };
        this.levelLabelMap = {
            [RiskLevel.LOW]: 'Faible',
            [RiskLevel.LIMITED]: 'Limité',
            [RiskLevel.MEDIUM]: 'Moyen',
            [RiskLevel.HIGH]: 'Élevé',
            [RiskLevel.CRITICAL]: 'Critique'
        };
    }
    get authQueryToken() {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }
    ngOnInit() {
        this.loadRisks();
    }
    loadRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.applyFilters();
            this.loadTreatments();
        });
    }
    loadTreatments() {
        const commentRequests = this.risks.map(risk => this.riskService.getComments(risk.id).pipe(catchError(() => of([]))));
        if (commentRequests.length === 0)
            return;
        forkJoin(commentRequests).subscribe((results) => {
            this.risks = this.risks.map((risk, index) => (Object.assign(Object.assign({}, risk), { treatments: results[index] || [] })));
            this.applyFilters();
        });
    }
    applyFilters() {
        this.filteredRisks = this.risks.filter(risk => {
            var _a;
            const matchesSearch = !this.searchTerm ||
                risk.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (((_a = risk.departement) === null || _a === void 0 ? void 0 : _a.nom) && risk.departement.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
            const riskStatut = (risk.statutCode || risk.statut || '').toLowerCase();
            const filterStatut = (this.statusFilter || '').toLowerCase();
            const matchesStatus = !filterStatut || riskStatut === filterStatut;
            const riskLevel = (risk.niveauRisqueCode || risk.niveauRisque || '').toLowerCase();
            const filterLevel = (this.levelFilter || '').toLowerCase();
            const matchesLevel = !filterLevel || riskLevel === filterLevel;
            return matchesSearch && matchesStatus && matchesLevel;
        });
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.searchTerm = '';
        this.statusFilter = '';
        this.levelFilter = '';
        this.applyFilters();
    }
    openHistory(risk) {
        this.selectedRiskForHistory = risk;
        this.showHistoryModal = true;
    }
    closeHistory() {
        this.showHistoryModal = false;
        this.selectedRiskForHistory = null;
    }
    evaluateRisks() {
        const ids = this.risks.map(r => r.id);
        if (ids.length === 0)
            return;
        this.isEvaluating = true;
        this.riskService.evaluateRisks(ids).subscribe({
            next: (results) => {
                this.aiResults = results;
                this.isEvaluating = false;
            },
            error: (err) => {
                console.error(err);
                this.isEvaluating = false;
                alert("Erreur lors de l'analyse IA.");
            }
        });
    }
    getAiResult(riskId) {
        // First check in recent AI results
        const recent = this.aiResults.find(r => r.riskId === riskId);
        if (recent)
            return recent;
        // Otherwise check in saved risk data
        const risk = this.risks.find(r => r.id === riskId);
        if (risk && risk.aiAnalysisScore !== undefined && risk.aiAnalysisScore !== null) {
            return {
                priorite: risk.aiAnalysisScore,
                impact: risk.aiAnalysisImpact,
                tendance: risk.aiAnalysisTendance,
                suggestion: risk.aiAnalysisSuggestion,
                date: risk.aiAnalysisDate
            };
        }
        return null;
    }
    getHighPriorityCount() {
        return this.aiResults.filter(r => r.priorite >= 7).length;
    }
    getTreatedCount() {
        return this.risks.filter(r => this.isCompletedRiskStatus(r.statutCode || r.statut)).length;
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    exportToXLSX() {
        const dataToExport = this.filteredRisks.map(r => {
            var _a;
            const ai = this.getAiResult(r.id);
            const lastTreatment = r.treatments && r.treatments.length > 0
                ? r.treatments[r.treatments.length - 1].content
                : 'N/A';
            return {
                'Risque': r.titre,
                'Département': ((_a = r.departement) === null || _a === void 0 ? void 0 : _a.nom) || 'N/A',
                'Statut': this.statusLabelMap[r.statut] || r.statut,
                'Sévérité': this.levelLabelMap[r.niveauRisque] || r.niveauRisque,
                'Dernier Traitement': lastTreatment,
                'Score IA': (ai === null || ai === void 0 ? void 0 : ai.priorite) ? `${ai.priorite}/10` : 'N/A',
                'Impact IA': (ai === null || ai === void 0 ? void 0 : ai.impact) || 'N/A',
                'Tendance IA': (ai === null || ai === void 0 ? void 0 : ai.tendance) || 'N/A',
                'Suggestion IA': (ai === null || ai === void 0 ? void 0 : ai.suggestion) || 'N/A'
            };
        });
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Evaluation_Strategique');
        XLSX.writeFile(wb, `Export_Evaluation_Strategique_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }
    exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4'); // Landscape for more space
        const datePipe = new DatePipe('en-US');
        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text("Rapport d'Évaluation Stratégique IA", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);
        const columns = ['Risque', 'Département', 'Statut', 'Sévérité', 'Score IA', 'Analyse & Suggestion IA'];
        const rows = this.filteredRisks.map(r => {
            var _a;
            const ai = this.getAiResult(r.id);
            const aiText = ai ? `Impact: ${ai.impact}\nTendance: ${ai.tendance}\nSuggestion: ${ai.suggestion}` : 'N/A';
            return [
                r.titre,
                ((_a = r.departement) === null || _a === void 0 ? void 0 : _a.nom) || 'N/A',
                this.statusLabelMap[r.statut] || r.statut || 'N/A',
                this.levelLabelMap[r.niveauRisque] || r.niveauRisque || 'N/A',
                (ai === null || ai === void 0 ? void 0 : ai.priorite) ? `${ai.priorite}/10` : 'N/A',
                aiText
            ];
        });
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            columnStyles: {
                5: { cellWidth: 80 } // Increase width for AI analysis
            },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });
        doc.save(`Export_Evaluation_Strategique_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
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
}
StrategicEvaluationComponent.ɵfac = function StrategicEvaluationComponent_Factory(t) { return new (t || StrategicEvaluationComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router)); };
StrategicEvaluationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StrategicEvaluationComponent, selectors: [["app-strategic-evaluation"]], decls: 102, vars: 41, consts: [[1, "evaluation-page"], [1, "page-header"], [1, "header-left"], ["title", "Retour au Dashboard", 1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chess-knight"], [1, "strategic-controls", 2, "display", "flex", "gap", "10px", "align-items", "center", "position", "relative", "z-index", "1000"], [1, "btn-ai-eval", 3, "disabled", "click"], [1, "fas"], [1, "filter-bar", "premium"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Chercher par nom, d\u00E9partement...", 3, "ngModel", "ngModelChange", "input"], [1, "fas", "fa-tasks"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], [1, "fas", "fa-layer-group"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "summary-grid"], [1, "summary-card", "total"], [1, "icon-box"], [1, "fas", "fa-shield-alt"], [1, "card-info"], [1, "count"], [1, "summary-card", "high"], [1, "fas", "fa-exclamation-triangle"], [1, "summary-card", "treated"], [1, "fas", "fa-check-double"], [1, "risks-container"], [1, "section-header"], [1, "filter-status"], [1, "badge-status", "status-ouvert"], [1, "table-wrapper"], [1, "risks-table"], [4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "risk-cell"], [1, "dept"], [1, "fas", "fa-building"], [2, "margin-bottom", "8px"], [1, "badge-status", 3, "ngClass"], [1, "level-badge", 3, "ngClass"], [1, "treatment-cell", 3, "click"], ["class", "last-action-preview", 4, "ngIf", "ngIfElse"], ["noAction", ""], [1, "ai-eval-cell"], [4, "ngIf", "ngIfElse"], ["pendingAi", ""], [1, "last-action-preview"], [1, "content"], [1, "meta"], [1, "far", "fa-user"], [1, "view-history-link"], [1, "fas", "fa-history"], [1, "no-treatment"], [1, "fas", "fa-hourglass-start"], [1, "eval-badge"], [1, "fas", "fa-brain"], [1, "ai-details"], [1, "suggestion"], ["class", "ai-date", 4, "ngIf"], [1, "ai-date"], [1, "text-muted", 2, "font-size", "0.85rem", "font-style", "italic"], [1, "empty-state"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], ["class", "risk-info-summary", 4, "ngIf"], ["class", "full-history-list", 4, "ngIf"], [1, "risk-info-summary"], [1, "full-history-list"], ["class", "history-card", 4, "ngFor", "ngForOf"], [1, "history-card"], [1, "card-header"], [1, "user"], [1, "date"], [1, "card-body"], ["class", "card-footer", 4, "ngIf"], [1, "card-footer"], ["target", "_blank", 1, "attachment-link", 3, "href"], [1, "fas", "fa-paperclip"]], template: function StrategicEvaluationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function StrategicEvaluationComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " \u00C9valuation Strat\u00E9gique IA");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Analyse globale des risques et suivi des traitements assist\u00E9 par l'intelligence artificielle.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function StrategicEvaluationComponent_Template_button_click_12_listener() { return ctx.evaluateRisks(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 9);
        i0.ɵɵelementStart(16, "div", 10);
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelement(18, "i", 12);
        i0.ɵɵelementStart(19, "input", 13);
        i0.ɵɵlistener("ngModelChange", function StrategicEvaluationComponent_Template_input_ngModelChange_19_listener($event) { return ctx.searchTerm = $event; })("input", function StrategicEvaluationComponent_Template_input_input_19_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 11);
        i0.ɵɵelement(21, "i", 14);
        i0.ɵɵelementStart(22, "select", 15);
        i0.ɵɵlistener("ngModelChange", function StrategicEvaluationComponent_Template_select_ngModelChange_22_listener($event) { return ctx.statusFilter = $event; })("change", function StrategicEvaluationComponent_Template_select_change_22_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(23, "option", 16);
        i0.ɵɵtext(24, "Tous les statuts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "option", 17);
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "option", 17);
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "option", 17);
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "option", 17);
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "div", 11);
        i0.ɵɵelement(34, "i", 18);
        i0.ɵɵelementStart(35, "select", 15);
        i0.ɵɵlistener("ngModelChange", function StrategicEvaluationComponent_Template_select_ngModelChange_35_listener($event) { return ctx.levelFilter = $event; })("change", function StrategicEvaluationComponent_Template_select_change_35_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(36, "option", 16);
        i0.ɵɵtext(37, "Tous les niveaux");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "option", 17);
        i0.ɵɵtext(39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "option", 17);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "option", 17);
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "option", 17);
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "option", 17);
        i0.ɵɵtext(47);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(48, StrategicEvaluationComponent_button_48_Template, 3, 0, "button", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "div", 20);
        i0.ɵɵelementStart(50, "span", 21);
        i0.ɵɵelementStart(51, "strong");
        i0.ɵɵtext(52);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(53, " risque(s) trouv\u00E9(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "div", 22);
        i0.ɵɵelementStart(55, "div", 23);
        i0.ɵɵelementStart(56, "div", 24);
        i0.ɵɵelement(57, "i", 25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "div", 26);
        i0.ɵɵelementStart(59, "h3");
        i0.ɵɵtext(60, "Total Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "span", 27);
        i0.ɵɵtext(62);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "div", 28);
        i0.ɵɵelementStart(64, "div", 24);
        i0.ɵɵelement(65, "i", 29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div", 26);
        i0.ɵɵelementStart(67, "h3");
        i0.ɵɵtext(68, "Priorit\u00E9 Haute");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "span", 27);
        i0.ɵɵtext(70);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "div", 30);
        i0.ɵɵelementStart(72, "div", 24);
        i0.ɵɵelement(73, "i", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(74, "div", 26);
        i0.ɵɵelementStart(75, "h3");
        i0.ɵɵtext(76, "Trait\u00E9s / Cl\u00F4tur\u00E9s");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "span", 27);
        i0.ɵɵtext(78);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(79, "div", 32);
        i0.ɵɵelementStart(80, "div", 33);
        i0.ɵɵelementStart(81, "h2");
        i0.ɵɵtext(82, "Liste des Risques & \u00C9tat des Traitements");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "div", 34);
        i0.ɵɵelementStart(84, "span", 35);
        i0.ɵɵtext(85);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(86, "div", 36);
        i0.ɵɵelementStart(87, "table", 37);
        i0.ɵɵelementStart(88, "thead");
        i0.ɵɵelementStart(89, "tr");
        i0.ɵɵelementStart(90, "th");
        i0.ɵɵtext(91, "Risque & D\u00E9partement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(92, "th");
        i0.ɵɵtext(93, "Statut & S\u00E9v\u00E9rit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(94, "th");
        i0.ɵɵtext(95, "Traitement effectif (Historique)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(96, "th");
        i0.ɵɵtext(97, "Analyse & Recommandation IA");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(98, "tbody");
        i0.ɵɵtemplate(99, StrategicEvaluationComponent_tr_99_Template, 21, 12, "tr", 38);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(100, StrategicEvaluationComponent_div_100_Template, 6, 0, "div", 39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(101, StrategicEvaluationComponent_div_101_Template, 11, 2, "div", 40);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵclassProp("evaluating-pulse", ctx.isEvaluating);
        i0.ɵɵproperty("disabled", ctx.isEvaluating);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-robot", !ctx.isEvaluating)("fa-spinner", ctx.isEvaluating)("fa-spin", ctx.isEvaluating);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isEvaluating ? "Analyse IA en cours..." : "Lancer \u00C9valuation Strat\u00E9gique", " ");
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngModel", ctx.searchTerm);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.statusFilter);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.RiskStatus.OPEN);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.RiskStatus.OPEN]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskStatus.IN_PROGRESS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.RiskStatus.IN_PROGRESS]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskStatus.TREATED);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.RiskStatus.TREATED]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskStatus.CLOSED);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.RiskStatus.CLOSED]);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.levelFilter);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.RiskLevel.LOW);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.RiskLevel.LOW]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskLevel.LIMITED);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.RiskLevel.LIMITED]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskLevel.MEDIUM);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.RiskLevel.MEDIUM]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskLevel.HIGH);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.RiskLevel.HIGH]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.RiskLevel.CRITICAL);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.levelLabelMap[ctx.RiskLevel.CRITICAL]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.statusFilter || ctx.levelFilter);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredRisks.length);
        i0.ɵɵadvance(10);
        i0.ɵɵtextInterpolate(ctx.risks.length);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.getHighPriorityCount());
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.getTreatedCount());
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate2("", ctx.filteredRisks.length, " Risques affich\u00E9s / ", ctx.risks.length, " au total");
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngForOf", ctx.filteredRisks);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredRisks.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showHistoryModal);
    } }, directives: [i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i3.SelectControlValueAccessor, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i4.NgIf, i4.NgForOf, i4.NgClass], pipes: [i4.SlicePipe, i4.DatePipe], styles: [".evaluation-page[_ngcontent-%COMP%] {\r\n    padding: 30px;\r\n    background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);\r\n    min-height: 100vh;\r\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.filter-bar[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 20px;\r\n    margin-bottom: 25px;\r\n    background: white;\r\n    padding: 15px 30px;\r\n    border-radius: 18px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    border: 1px solid #f1f5f9;\r\n    align-items: center;\r\n\r\n    .filter-group {\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 10px;\r\n        flex: 1;\r\n        position: relative;\r\n\r\n        i {\r\n            color: #94a3b8;\r\n            font-size: 0.9rem;\r\n        }\r\n\r\n        input,\r\n        select {\r\n            width: 100%;\r\n            padding: 10px 12px;\r\n            border-radius: 10px;\r\n            border: 1px solid #e2e8f0;\r\n            font-size: 0.9rem;\r\n            color: #1e293b;\r\n            font-weight: 500;\r\n            transition: all 0.2s;\r\n            outline: none;\r\n            background: #f8fafc;\r\n\r\n            &:focus {\r\n                border-color: #7c3aed;\r\n                background: white;\r\n                box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);\r\n            }\r\n        }\r\n\r\n        input {\r\n            flex: 2;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n.strategic-controls[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 15px;\r\n}\r\n\r\n.btn-ai-eval[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 14px 32px;\r\n    border-radius: 16px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\r\n    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    font-size: 1rem;\r\n    letter-spacing: 0.01em;\r\n\r\n    &:hover:not(:disabled) {\r\n        transform: translateY(-3px) scale(1.02);\r\n        box-shadow: 0 12px 35px rgba(124, 58, 237, 0.4);\r\n        filter: brightness(1.1);\r\n    }\r\n\r\n    &:disabled {\r\n        opacity: 0.6;\r\n        cursor: not-allowed;\r\n        filter: grayscale(0.4);\r\n    }\r\n}\r\n\r\n\r\n.summary-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\r\n    gap: 25px;\r\n    margin-bottom: 35px;\r\n}\r\n\r\n.summary-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    padding: 24px;\r\n    border-radius: 20px;\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n    transition: transform 0.3s ease;\r\n\r\n    &:hover {\r\n        transform: translateY(-5px);\r\n    }\r\n\r\n    .icon-box {\r\n        width: 56px;\r\n        height: 56px;\r\n        border-radius: 14px;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        font-size: 1.5rem;\r\n    }\r\n\r\n    &.total .icon-box {\r\n        background: #eef2ff;\r\n        color: #4f46e5;\r\n    }\r\n\r\n    &.high .icon-box {\r\n        background: #fff1f2;\r\n        color: #f43f5e;\r\n    }\r\n\r\n    &.treated .icon-box {\r\n        background: #f0fdf4;\r\n        color: #22c55e;\r\n    }\r\n\r\n    .card-info {\r\n        h3 {\r\n            margin: 0;\r\n            font-size: 0.9rem;\r\n            color: #64748b;\r\n            text-transform: uppercase;\r\n            font-weight: 700;\r\n            letter-spacing: 0.05em;\r\n        }\r\n\r\n        .count {\r\n            display: block;\r\n            font-size: 1.75rem;\r\n            font-weight: 800;\r\n            color: #1e293b;\r\n            margin-top: 2px;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n.risks-container[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 28px;\r\n    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.04);\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    overflow: hidden;\r\n}\r\n\r\n.section-header[_ngcontent-%COMP%] {\r\n    padding: 24px 35px;\r\n    border-bottom: 1px solid #f1f5f9;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    background: #fafbfc;\r\n\r\n    h2 {\r\n        margin: 0;\r\n        font-size: 1.25rem;\r\n        font-weight: 800;\r\n        color: #334155;\r\n    }\r\n}\r\n\r\n.table-wrapper[_ngcontent-%COMP%] {\r\n    overflow-x: auto;\r\n}\r\n\r\n.risks-table[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    min-width: 1000px;\r\n}\r\n\r\n.risks-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    background: #f8fafc;\r\n    padding: 20px 24px;\r\n    text-align: left;\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    text-transform: uppercase;\r\n    font-weight: 800;\r\n    letter-spacing: 0.05em;\r\n    border-bottom: 2px solid #f1f5f9;\r\n}\r\n\r\n.risks-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    padding: 20px 24px;\r\n    border-bottom: 1px solid #f8fafc;\r\n    font-size: 0.95rem;\r\n    color: #334155;\r\n    vertical-align: top;\r\n}\r\n\r\n.risks-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\r\n    background: #fcfdfe;\r\n}\r\n\r\n\r\n.risk-cell[_ngcontent-%COMP%] {\r\n    max-width: 300px;\r\n\r\n    strong {\r\n        display: block;\r\n        color: #1e293b;\r\n        font-size: 1rem;\r\n        margin-bottom: 6px;\r\n    }\r\n\r\n    .dept {\r\n        font-size: 0.75rem;\r\n        background: #f1f5f9;\r\n        padding: 4px 10px;\r\n        border-radius: 8px;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n    }\r\n}\r\n\r\n\r\n.treatment-cell[_ngcontent-%COMP%] {\r\n    max-width: 350px;\r\n\r\n    .last-action {\r\n        font-size: 0.9rem;\r\n        color: #475569;\r\n        line-height: 1.5;\r\n        font-style: italic;\r\n        position: relative;\r\n        padding-left: 15px;\r\n\r\n        &::before {\r\n            content: '\u201C';\r\n            position: absolute;\r\n            left: 0;\r\n            top: -5px;\r\n            font-size: 1.5rem;\r\n            color: #cbd5e1;\r\n        }\r\n    }\r\n\r\n    .no-treatment {\r\n        color: #94a3b8;\r\n        font-size: 0.85rem;\r\n        font-style: italic;\r\n    }\r\n\r\n    &.clickable {\r\n        cursor: pointer;\r\n        transition: background 0.2s;\r\n\r\n        &:hover {\r\n            background: #f1f5f9 !important;\r\n        }\r\n    }\r\n\r\n    .last-action-preview {\r\n        .content {\r\n            margin: 0 0 8px;\r\n            font-size: 0.85rem;\r\n            color: #475569;\r\n            line-height: 1.4;\r\n            display: -webkit-box;\r\n            -webkit-line-clamp: 2;\r\n            line-clamp: 2;\r\n            -webkit-box-orient: vertical;\r\n            overflow: hidden;\r\n        }\r\n\r\n        .meta {\r\n            display: flex;\r\n            justify-content: space-between;\r\n            align-items: center;\r\n            font-size: 0.7rem;\r\n            color: #94a3b8;\r\n            font-weight: 600;\r\n\r\n            .view-history-link {\r\n                color: #7c3aed;\r\n                display: flex;\r\n                align-items: center;\r\n                gap: 5px;\r\n                background: #f5f3ff;\r\n                padding: 4px 8px;\r\n                border-radius: 6px;\r\n                transition: all 0.2s;\r\n\r\n                &:hover {\r\n                    background: #ede9fe;\r\n                    transform: translateX(3px);\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    .treatment-history {\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 12px;\r\n        max-height: 250px;\r\n        overflow-y: auto;\r\n        padding-right: 8px;\r\n\r\n        &::-webkit-scrollbar {\r\n            width: 4px;\r\n        }\r\n\r\n        &::-webkit-scrollbar-thumb {\r\n            background: #e2e8f0;\r\n            border-radius: 10px;\r\n        }\r\n\r\n        .history-item {\r\n            padding: 12px;\r\n            background: #f8fafc;\r\n            border-radius: 12px;\r\n            border-left: 3px solid #cbd5e1;\r\n\r\n            .content {\r\n                margin: 0 0 6px;\r\n                font-size: 0.85rem;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n            }\r\n\r\n            .meta {\r\n                display: flex;\r\n                gap: 10px;\r\n                font-size: 0.7rem;\r\n                color: #94a3b8;\r\n                font-weight: 600;\r\n\r\n                i {\r\n                    color: #cbd5e1;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\n.ai-eval-cell[_ngcontent-%COMP%] {\r\n    .eval-badge {\r\n        display: inline-flex;\r\n        align-items: center;\r\n        gap: 8px;\r\n        padding: 8px 14px;\r\n        border-radius: 12px;\r\n        font-weight: 700;\r\n        font-size: 0.85rem;\r\n        margin-bottom: 8px;\r\n\r\n        &.prio-high {\r\n            background: #fff1f2;\r\n            color: #e11d48;\r\n            box-shadow: 0 4px 12px rgba(225, 29, 72, 0.1);\r\n        }\r\n\r\n        &.prio-med {\r\n            background: #fffbeb;\r\n            color: #d97706;\r\n            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);\r\n        }\r\n\r\n        &.prio-low {\r\n            background: #f0fdf4;\r\n            color: #16a34a;\r\n            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.1);\r\n        }\r\n    }\r\n\r\n    .suggestion {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        line-height: 1.4;\r\n        display: block;\r\n    }\r\n\r\n    .ai-details {\r\n        margin-top: 10px;\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 6px;\r\n\r\n        p {\r\n            margin: 0;\r\n            font-size: 0.82rem;\r\n            color: #475569;\r\n            line-height: 1.4;\r\n\r\n            strong {\r\n                color: #1e293b;\r\n                font-weight: 700;\r\n            }\r\n        }\r\n\r\n        .suggestion {\r\n            background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);\r\n            padding: 10px 14px;\r\n            border-radius: 12px;\r\n            border-left: 4px solid #7c3aed;\r\n            color: #5b21b6;\r\n            margin-top: 8px;\r\n            font-size: 0.8rem;\r\n            line-height: 1.5;\r\n            box-shadow: 0 2px 10px rgba(124, 58, 237, 0.08);\r\n            max-height: 80px;\r\n            overflow-y: auto;\r\n\r\n            &::-webkit-scrollbar {\r\n                width: 3px;\r\n            }\r\n\r\n            &::-webkit-scrollbar-thumb {\r\n                background: #c7d2fe;\r\n                border-radius: 10px;\r\n            }\r\n\r\n            strong {\r\n                color: #7c3aed;\r\n                font-weight: 800;\r\n                display: block;\r\n                margin-bottom: 2px;\r\n            }\r\n        }\r\n\r\n        .ai-date {\r\n            font-size: 0.65rem;\r\n            color: #94a3b8;\r\n            margin-top: 4px;\r\n            font-style: italic;\r\n            align-self: flex-end;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n.badge-status[_ngcontent-%COMP%] {\r\n    padding: 6px 14px;\r\n    border-radius: 100px;\r\n    font-size: 0.75rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.02em;\r\n    display: inline-block;\r\n\r\n    &.status-ouvert {\r\n        background: #e0f2fe;\r\n        color: #0369a1;\r\n    }\r\n\r\n    &.status-en-cours {\r\n        background: #fef3c7;\r\n        color: #92400e;\r\n    }\r\n\r\n    &.status-trait\u00E9 {\r\n        background: #dcfce7;\r\n        color: #166534;\r\n    }\r\n\r\n    &.status-cl\u00F4tur\u00E9 {\r\n        background: #f1f5f9;\r\n        color: #475569;\r\n    }\r\n}\r\n\r\n.level-badge[_ngcontent-%COMP%] {\r\n    padding: 4px 8px;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    font-size: 0.7rem;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.level-critique[_ngcontent-%COMP%] {\r\n    background: #450a0a;\r\n    color: white;\r\n}\r\n\r\n.level-\u00E9lev\u00E9[_ngcontent-%COMP%] {\r\n    background: #fee2e2;\r\n    color: #991b1b;\r\n}\r\n\r\n.level-moyen[_ngcontent-%COMP%] {\r\n    background: #ffedd5;\r\n    color: #9a3412;\r\n}\r\n\r\n.level-faible[_ngcontent-%COMP%] {\r\n    background: #f0fdf4;\r\n    color: #166534;\r\n}\r\n\r\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n    padding: 80px 40px;\r\n    text-align: center;\r\n    color: #94a3b8;\r\n\r\n    i {\r\n        font-size: 4rem;\r\n        margin-bottom: 25px;\r\n        background: linear-gradient(135deg, #e2e8f0, #cbd5e1);\r\n        -webkit-background-clip: text;\r\n        -webkit-text-fill-color: transparent;\r\n    }\r\n\r\n    h3 {\r\n        color: #475569;\r\n        font-size: 1.5rem;\r\n        margin-bottom: 10px;\r\n        font-weight: 700;\r\n    }\r\n\r\n    p {\r\n        max-width: 400px;\r\n        margin: 0 auto;\r\n        font-size: 1rem;\r\n    }\r\n}\r\n\r\n@keyframes pulse {\r\n    0% {\r\n        transform: scale(1);\r\n    }\r\n\r\n    50% {\r\n        transform: scale(1.05);\r\n    }\r\n\r\n    100% {\r\n        transform: scale(1);\r\n    }\r\n}\r\n\r\n.evaluating-pulse[_ngcontent-%COMP%] {\r\n    animation: pulse 2s infinite;\r\n}\r\n\r\n\r\n.modal-overlay[_ngcontent-%COMP%] {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(15, 23, 42, 0.6);\r\n    backdrop-filter: blur(8px);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    z-index: 1000;\r\n    animation: fadeIn 0.3s ease-out;\r\n}\r\n\r\n.modal-content[_ngcontent-%COMP%] {\r\n    background: white;\r\n    width: 90%;\r\n    max-width: 700px;\r\n    max-height: 85vh;\r\n    border-radius: 30px;\r\n    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\r\n    display: flex;\r\n    flex-direction: column;\r\n    overflow: hidden;\r\n    animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%] {\r\n    padding: 24px 35px;\r\n    background: #f8fafc;\r\n    border-bottom: 1px solid #e2e8f0;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n\r\n    h3 {\r\n        margin: 0;\r\n        font-size: 1.4rem;\r\n        color: #1e293b;\r\n        font-weight: 850;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n\r\n        i {\r\n            color: #7c3aed;\r\n        }\r\n    }\r\n\r\n    .close-btn {\r\n        background: #f1f5f9;\r\n        border: none;\r\n        width: 36px;\r\n        height: 36px;\r\n        border-radius: 50%;\r\n        font-size: 1.5rem;\r\n        color: #64748b;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n\r\n        &:hover {\r\n            background: #e2e8f0;\r\n            color: #1e293b;\r\n            transform: rotate(90deg);\r\n        }\r\n    }\r\n}\r\n\r\n.modal-body[_ngcontent-%COMP%] {\r\n    padding: 30px 35px;\r\n    overflow-y: auto;\r\n    background: #ffffff;\r\n\r\n    .risk-info-summary {\r\n        margin-bottom: 30px;\r\n        padding-bottom: 20px;\r\n        border-bottom: 1px dashed #e2e8f0;\r\n\r\n        h4 {\r\n            margin: 0 0 6px;\r\n            font-size: 1.2rem;\r\n            color: #0f172a;\r\n            font-weight: 700;\r\n        }\r\n\r\n        .dept {\r\n            font-size: 0.85rem;\r\n            color: #64748b;\r\n            background: #f1f5f9;\r\n            padding: 4px 12px;\r\n            border-radius: 8px;\r\n            font-weight: 600;\r\n        }\r\n    }\r\n}\r\n\r\n.full-history-list[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 20px;\r\n}\r\n\r\n.history-card[_ngcontent-%COMP%] {\r\n    background: #f8fafc;\r\n    border-radius: 20px;\r\n    padding: 20px;\r\n    border: 1px solid #f1f5f9;\r\n    transition: transform 0.2s;\r\n\r\n    &:hover {\r\n        transform: scale(1.01);\r\n        border-color: #e2e8f0;\r\n    }\r\n\r\n    .card-header {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        margin-bottom: 12px;\r\n        font-size: 0.85rem;\r\n\r\n        .user {\r\n            font-weight: 800;\r\n            color: #334155;\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 8px;\r\n\r\n            i {\r\n                color: #7c3aed;\r\n                opacity: 0.6;\r\n            }\r\n        }\r\n\r\n        .date {\r\n            color: #94a3b8;\r\n            font-weight: 500;\r\n        }\r\n    }\r\n\r\n    .card-body {\r\n        font-size: 0.95rem;\r\n        line-height: 1.6;\r\n        color: #475569;\r\n        white-space: pre-wrap;\r\n    }\r\n\r\n    .card-footer {\r\n        margin-top: 15px;\r\n        padding-top: 15px;\r\n        border-top: 1px solid #e2e8f0;\r\n\r\n        .attachment-link {\r\n            color: #4f46e5;\r\n            font-size: 0.85rem;\r\n            font-weight: 700;\r\n            text-decoration: none;\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 8px;\r\n\r\n            &:hover {\r\n                text-decoration: underline;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n@keyframes fadeIn {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@keyframes slideUp {\r\n    from {\r\n        transform: translateY(30px);\r\n        opacity: 0;\r\n    }\r\n\r\n    to {\r\n        transform: translateY(0);\r\n        opacity: 1;\r\n    }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StrategicEvaluationComponent, [{
        type: Component,
        args: [{
                selector: 'app-strategic-evaluation',
                templateUrl: './strategic-evaluation.component.html',
                styleUrls: ['./strategic-evaluation.component.scss']
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=strategic-evaluation.component.js.map