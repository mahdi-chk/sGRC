import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from '../../../core/services/incident.service';
import { RiskService } from '../../../core/services/risk.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/incident.service";
import * as i2 from "../../../core/services/risk.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function IncidentAnalysisComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function IncidentAnalysisComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 15);
    i0.ɵɵtemplate(1, IncidentAnalysisComponent_nav_11_a_1_Template, 2, 4, "a", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function IncidentAnalysisComponent_li_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 18);
    i0.ɵɵlistener("click", function IncidentAnalysisComponent_li_18_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const i_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.selectIncident(i_r7); });
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelement(2, "i", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 21);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r1.selectedIncident == null ? null : ctx_r1.selectedIncident.id) === i_r7.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i_r7.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(8, 5, i_r7.dateSurvenance, "shortDate"), " | ", i_r7.statut, "");
} }
function IncidentAnalysisComponent_div_20_option_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r13 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", r_r13.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", r_r13.titre + " (Score: " + (r_r13.niveauRisque || r_r13.cotationRisqueNet || "-") + ")", " ");
} }
function IncidentAnalysisComponent_div_20_div_49_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵelementStart(1, "span", 48);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 49);
    i0.ɵɵlistener("ngModelChange", function IncidentAnalysisComponent_div_20_div_49_Template_input_ngModelChange_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r16); const n_r14 = restoredCtx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return (ctx_r15.rootCauses[n_r14 - 1] = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const n_r14 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(n_r14);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("placeholder", "Pourquoi ? (Etape " + n_r14 + ")")("ngModel", ctx_r11.rootCauses[n_r14 - 1])("disabled", ctx_r11.isReadOnlyRole);
} }
function IncidentAnalysisComponent_div_20_button_51_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function IncidentAnalysisComponent_div_20_button_51_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(2); return ctx_r17.saveFullAnalysis(); });
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Sauvegarder l'Analyse Complete ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r12.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("fa-save", !ctx_r12.isLoading)("fa-circle-notch", ctx_r12.isLoading)("fa-spin", ctx_r12.isLoading);
} }
const _c1 = function () { return [1, 2, 3, 4, 5]; };
function IncidentAnalysisComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 24);
    i0.ɵɵelementStart(7, "div", 25);
    i0.ɵɵelementStart(8, "h3");
    i0.ɵɵelement(9, "i", 26);
    i0.ɵɵtext(10, " Correlation avec les Risques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12, "Lier cet incident a un risque existant pour enrichir la cartographie.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "select", 27);
    i0.ɵɵlistener("ngModelChange", function IncidentAnalysisComponent_div_20_Template_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onRiskSelectionChange($event); });
    i0.ɵɵelementStart(14, "option", 28);
    i0.ɵɵtext(15, "Selectionner un risque...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, IncidentAnalysisComponent_div_20_option_16_Template, 2, 2, "option", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 25);
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵelement(19, "i", 30);
    i0.ɵɵtext(20, " Impact Financier & Operationnel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 31);
    i0.ɵɵelementStart(22, "div", 32);
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24, "Cout estime (MAD)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 33);
    i0.ɵɵlistener("ngModelChange", function IncidentAnalysisComponent_div_20_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.estimatedCost = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 32);
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Gravite Constatee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "select", 27);
    i0.ɵɵlistener("ngModelChange", function IncidentAnalysisComponent_div_20_Template_select_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.observedSeverity = $event; });
    i0.ɵɵelementStart(30, "option", 34);
    i0.ɵɵtext(31, "Selectionner...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "option", 35);
    i0.ɵɵtext(33, "Faible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "option", 36);
    i0.ɵɵtext(35, "Moyen");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 37);
    i0.ɵɵtext(37, "Eleve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 38);
    i0.ɵɵtext(39, "Critique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "option", 39);
    i0.ɵɵtext(41, "Significatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "option", 40);
    i0.ɵɵtext(43, "Limite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 41);
    i0.ɵɵelementStart(45, "h3");
    i0.ɵɵelement(46, "i", 42);
    i0.ɵɵtext(47, " Analyse des Causes Profondes (5 Pourquoi)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 43);
    i0.ɵɵtemplate(49, IncidentAnalysisComponent_div_20_div_49_Template, 4, 4, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 45);
    i0.ɵɵtemplate(51, IncidentAnalysisComponent_div_20_button_51_Template, 3, 7, "button", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Analyse de l'Incident : ", ctx_r2.selectedIncident.titre, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.selectedIncident.description);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedRiskId)("disabled", ctx_r2.isReadOnlyRole || ctx_r2.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.risks);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r2.estimatedCost)("disabled", ctx_r2.isReadOnlyRole);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.observedSeverity)("disabled", ctx_r2.isReadOnlyRole);
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(12, _c1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.isReadOnlyRole);
} }
function IncidentAnalysisComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵelement(1, "i", 42);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Veuillez selectionner un incident pour approfondir l'analyse.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class IncidentAnalysisComponent {
    constructor(incidentService, riskService, authService, router) {
        this.incidentService = incidentService;
        this.riskService = riskService;
        this.authService = authService;
        this.router = router;
        this.currentUserRole = getStoredIncidentRole();
        this.incidents = [];
        this.risks = [];
        this.selectedIncident = null;
        this.isLoading = false;
        this.selectedRiskId = null;
        this.estimatedCost = null;
        this.observedSeverity = '';
        this.rootCauses = Array.from({ length: 5 }, () => '');
    }
    get navItems() {
        return getIncidentNavItems(this.currentUserRole);
    }
    get isReadOnlyRole() {
        return this.authService.getUserRole() === UserRole.TOP_MANAGEMENT;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                this.incidents = data;
                if (this.incidents.length > 0) {
                    this.selectIncident(this.incidents[0]);
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Impossible de charger les incidents.');
            }
        });
        this.riskService.getRisks().subscribe({
            next: (data) => {
                this.risks = data;
            },
            error: (err) => {
                console.error(err);
                alert('Impossible de charger les risques.');
            }
        });
    }
    selectIncident(incident) {
        var _a;
        this.selectedIncident = incident;
        this.selectedRiskId = (_a = incident.riskId) !== null && _a !== void 0 ? _a : null;
        this.observedSeverity = incident.niveauRisque || '';
        const parsedAnalysis = this.parseStoredAnalysis(incident.planActionTraitement);
        this.estimatedCost = parsedAnalysis.estimatedCost;
        this.rootCauses = parsedAnalysis.rootCauses;
    }
    onRiskSelectionChange(riskId) {
        if (this.isReadOnlyRole) {
            return;
        }
        this.selectedRiskId = riskId;
        this.linkToRisk(riskId);
    }
    linkToRisk(riskId) {
        if (!this.selectedIncident)
            return;
        this.isLoading = true;
        this.incidentService.updateIncident(this.selectedIncident.id, { riskId }).subscribe({
            next: (updatedIncident) => {
                var _a;
                this.selectedIncident = updatedIncident;
                this.selectedRiskId = (_a = updatedIncident.riskId) !== null && _a !== void 0 ? _a : null;
                this.updateIncidentInList(updatedIncident);
                this.isLoading = false;
                alert('Lien avec le risque etabli.');
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de la mise a jour du lien avec le risque.');
            }
        });
    }
    saveFullAnalysis() {
        if (!this.selectedIncident || this.isReadOnlyRole)
            return;
        this.isLoading = true;
        const payload = {
            riskId: this.selectedRiskId,
            niveauRisque: this.observedSeverity || null,
            planActionTraitement: this.buildAnalysisSummary()
        };
        this.incidentService.updateIncident(this.selectedIncident.id, payload).subscribe({
            next: (updatedIncident) => {
                this.selectedIncident = updatedIncident;
                this.updateIncidentInList(updatedIncident);
                this.isLoading = false;
                alert('Analyse complete sauvegardee avec succes.');
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de la sauvegarde de l analyse.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    updateIncidentInList(updatedIncident) {
        const index = this.incidents.findIndex(incident => incident.id === updatedIncident.id);
        if (index !== -1) {
            this.incidents[index] = updatedIncident;
        }
    }
    parseStoredAnalysis(rawValue) {
        var _a;
        const rootCauses = Array.from({ length: 5 }, () => '');
        if (!rawValue) {
            return { estimatedCost: null, rootCauses };
        }
        const costMatch = rawValue.match(/Cout estime \(dirham \(MAD\)\)\s*:\s*([0-9]+(?:[.,][0-9]+)?)/i)
            || rawValue.match(/Cout estime \(EUR\)\s*:\s*([0-9]+(?:[.,][0-9]+)?)/i);
        const estimatedCost = costMatch ? Number(costMatch[1].replace(',', '.')) : null;
        for (let index = 0; index < 5; index += 1) {
            const whyMatch = rawValue.match(new RegExp(`Pourquoi ${index + 1}\\s*:\\s*(.+)`, 'i'));
            rootCauses[index] = ((_a = whyMatch === null || whyMatch === void 0 ? void 0 : whyMatch[1]) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        }
        return { estimatedCost, rootCauses };
    }
    buildAnalysisSummary() {
        var _a;
        const existingPlan = this.extractNonAnalysisPlan((_a = this.selectedIncident) === null || _a === void 0 ? void 0 : _a.planActionTraitement);
        const rootCauseLines = this.rootCauses
            .map((value, index) => value.trim() ? `Pourquoi ${index + 1}: ${value.trim()}` : '')
            .filter(Boolean);
        const analysisLines = [
            'Analyse incident',
            this.estimatedCost !== null && this.estimatedCost !== undefined ? `Cout estime (dirham (MAD)): ${this.estimatedCost}` : '',
            this.observedSeverity ? `Gravite constatee: ${this.observedSeverity}` : '',
            ...rootCauseLines
        ].filter(Boolean);
        return [existingPlan, analysisLines.join('\n')].filter(Boolean).join('\n\n');
    }
    extractNonAnalysisPlan(rawValue) {
        if (!rawValue) {
            return '';
        }
        const marker = rawValue.indexOf('Analyse incident');
        return marker >= 0 ? rawValue.slice(0, marker).trim() : rawValue.trim();
    }
}
IncidentAnalysisComponent.ɵfac = function IncidentAnalysisComponent_Factory(t) { return new (t || IncidentAnalysisComponent)(i0.ɵɵdirectiveInject(i1.IncidentService), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.Router)); };
IncidentAnalysisComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentAnalysisComponent, selectors: [["app-incident-analysis"]], decls: 23, vars: 4, consts: [[1, "incident-page", "analysis-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-microscope"], ["class", "incident-tabs", 4, "ngIf"], [1, "dual-layout"], [1, "sidebar", "card"], [1, "sidebar-header"], [1, "item-list"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "main-content", "card"], [4, "ngIf", "ngIfElse"], ["selectPrompt", ""], [1, "incident-tabs"], ["routerLinkActive", "active", "class", "incident-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "incident-tab", 3, "routerLink", "routerLinkActiveOptions"], [3, "click"], [1, "item-icon"], [1, "fas", "fa-exclamation-circle"], [1, "item-info"], [1, "analysis-section"], [1, "description"], [1, "analysis-grid"], [1, "analysis-card", "shadow-sm"], [1, "fas", "fa-link"], [1, "premium-select", 3, "ngModel", "disabled", "ngModelChange"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "fas", "fa-chart-line"], [1, "impact-fields"], [1, "i-field"], ["type", "number", "placeholder", "0.00", 1, "premium-input", 3, "ngModel", "disabled", "ngModelChange"], ["value", ""], ["value", "Faible"], ["value", "Moyen"], ["value", "Eleve"], ["value", "Critique"], ["value", "Significatif"], ["value", "Limite"], [1, "root-cause-section", "mt-4"], [1, "fas", "fa-search"], [1, "why-list"], ["class", "why-item", 4, "ngFor", "ngForOf"], [1, "analysis-actions"], ["class", "btn-save-analysis", 3, "disabled", "click", 4, "ngIf"], [1, "why-item"], [1, "num"], ["type", "text", 1, "premium-input", 3, "placeholder", "ngModel", "disabled", "ngModelChange"], [1, "btn-save-analysis", 3, "disabled", "click"], [1, "fas"], [1, "select-prompt"]], template: function IncidentAnalysisComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentAnalysisComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Liens et Analyse");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Analysez les causes profondes et liez les incidents aux risques identifies dans la cartographie.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, IncidentAnalysisComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "h3");
        i0.ɵɵtext(16, "Files d'Incidents");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "ul", 10);
        i0.ɵɵtemplate(18, IncidentAnalysisComponent_li_18_Template, 9, 8, "li", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 12);
        i0.ɵɵtemplate(20, IncidentAnalysisComponent_div_20_Template, 52, 13, "div", 13);
        i0.ɵɵtemplate(21, IncidentAnalysisComponent_ng_template_21_Template, 4, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(22);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.incidents);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedIncident)("ngIfElse", _r3);
    } }, directives: [i5.NgIf, i5.NgForOf, i4.RouterLinkWithHref, i4.RouterLinkActive, i6.SelectControlValueAccessor, i6.NgControlStatus, i6.NgModel, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i6.NumberValueAccessor, i6.DefaultValueAccessor], pipes: [i5.DatePipe], styles: ["@import '../incident-shared';\n\n.dual-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 320px 1fr;\n    gap: 25px;\n    height: calc(100vh - 200px);\n    margin-top: 20px;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n    background: white; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;\n    .sidebar-header { padding: 20px; border-bottom: 2px solid #f1f5f9; h3 { margin: 0; font-size: 1rem; color: #1e293b; font-weight: 700; } }\n    .item-list {\n        list-style: none; padding: 0; margin: 0; overflow-y: auto;\n        li {\n            padding: 15px 20px; cursor: pointer; border-bottom: 1px solid #f8fafc; display: flex; gap: 15px; align-items: center; transition: all 0.2s;\n            &:hover { background: #f8fafc; }\n            &.active { background: #eff6ff; border-left: 5px solid #004a99; .item-icon i { color: #004a99; } }\n            .item-icon i { color: #94a3b8; font-size: 1.1rem; }\n            .item-info { display: flex; flex-direction: column; strong { font-size: 0.9rem; color: #1e293b; } small { font-size: 0.75rem; color: #64748b; } }\n        }\n    }\n}\n\n.main-content[_ngcontent-%COMP%] {\n    padding: 30px; overflow-y: auto; background: white; border-radius: 16px;\n    h2 { font-size: 1.5rem; color: #004a99; margin-bottom: 10px; font-weight: 800; border-left: 6px solid #004a99; padding-left: 20px; }\n    .description { color: #64748b; line-height: 1.6; margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; font-style: italic; }\n}\n\n.analysis-grid[_ngcontent-%COMP%] {\n    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;\n    .analysis-card {\n        padding: 25px; border-radius: 16px; border: 1px solid #edf2f7; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.03);\n        h3 { font-size: 1.1rem; color: #1e293b; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 12px; i { color: #004a99; } }\n        p { font-size: 0.85rem; color: #64748b; margin-bottom: 20px; }\n    }\n}\n\n.premium-select[_ngcontent-%COMP%], .premium-input[_ngcontent-%COMP%] {\n    width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; color: #1e293b; background: #f8fafc; transition: all 0.2s; font-weight: 600;\n    &:focus { border-color: #004a99; box-shadow: 0 0 0 4px rgba(0,74,153,0.1); outline: none; background: white; }\n}\n\n.impact-fields[_ngcontent-%COMP%] {\n    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;\n    .i-field label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px; letter-spacing: 0.5px; }\n}\n\n.why-list[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; gap: 15px; margin-top: 25px;\n    .why-item {\n        display: flex; align-items: center; gap: 20px;\n        .num { \n            background: linear-gradient(135deg, #004a99 0%, #003366 100%); \n            color: white; width: 34px; height: 34px; min-width: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;\n            box-shadow: 0 4px 8px rgba(0,74,153,0.2);\n        }\n    }\n}\n\n.root-cause-section[_ngcontent-%COMP%] {\n    margin-top: 40px; padding: 30px; background: #f1f5f9; border-radius: 20px;\n    h3 { display: flex; align-items: center; gap: 12px; color: #1e293b; font-size: 1.2rem; font-weight: 800; }\n}\n\n.btn-save-analysis[_ngcontent-%COMP%] {\n    margin-top: 30px; padding: 14px 40px; border-radius: 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s; width: 100%;\n    box-shadow: 0 6px 20px rgba(16,185,129,0.3);\n    &:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16,185,129,0.4); }\n    &:active { transform: translateY(0); }\n}\n\n.select-prompt[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8; i { font-size: 4rem; color: #e2e8f0; margin-bottom: 25px; } p { font-size: 1.2rem; } }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentAnalysisComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-analysis',
                templateUrl: './incident-analysis.component.html',
                styleUrls: ['./incident-analysis.component.scss']
            }]
    }], function () { return [{ type: i1.IncidentService }, { type: i2.RiskService }, { type: i3.AuthService }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=incident-analysis.component.js.map