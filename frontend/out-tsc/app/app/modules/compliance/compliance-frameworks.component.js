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
    i0.ɵɵelementStart(0, "a", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r15 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r15.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r15.label, " ");
} }
function ComplianceFrameworksComponent_div_17_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r16.feedback);
} }
function ComplianceFrameworksComponent_div_17_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r17.error);
} }
function ComplianceFrameworksComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, ComplianceFrameworksComponent_div_17_p_1_Template, 2, 1, "p", 55);
    i0.ɵɵtemplate(2, ComplianceFrameworksComponent_div_17_p_2_Template, 2, 1, "p", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.feedback);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.error);
} }
function ComplianceFrameworksComponent_p_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Selectionnez un referentiel puis structurez ses exigences une par une.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_ng_template_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Ajoutez d abord un referentiel pour commencer a decrire ses exigences.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_option_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r18 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", framework_r18.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3(" ", framework_r18.code, " - ", framework_r18.name, " v", framework_r18.version, " ");
} }
function ComplianceFrameworksComponent_section_140_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 61);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_140_tr_20_Template_td_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const framework_r20 = restoredCtx.$implicit; const ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.selectFramework(framework_r20.id); });
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
    i0.ɵɵelementStart(17, "span", 62);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 63);
    i0.ɵɵelementStart(20, "button", 64);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_140_tr_20_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const framework_r20 = restoredCtx.$implicit; const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.editFramework(framework_r20); });
    i0.ɵɵtext(21, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 65);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_section_140_tr_20_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const framework_r20 = restoredCtx.$implicit; const ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.deleteFramework(framework_r20); });
    i0.ɵɵtext(23, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r20 = ctx.$implicit;
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row-selected", framework_r20.id === ctx_r19.selectedFrameworkId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(framework_r20.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", framework_r20.code, " - version ", framework_r20.version, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(framework_r20.jurisdiction || "Non renseignee");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(framework_r20.entityKey || "Aucun entity key");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Effet: ", ctx_r19.formatDate(framework_r20.effectiveDate), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Revue: ", ctx_r19.formatDate(framework_r20.reviewDate), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r19.getStatusClass(framework_r20.statusCode || framework_r20.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(framework_r20.statusLabel || framework_r20.status);
} }
function ComplianceFrameworksComponent_section_140_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 48);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Cadres suivis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Selectionnez un referentiel pour afficher et gerer ses exigences.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "table", 59);
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
    i0.ɵɵtemplate(20, ComplianceFrameworksComponent_section_140_tr_20_Template, 24, 11, "tr", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r6.frameworks);
} }
function ComplianceFrameworksComponent_p_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Les exigences sont rattachees au referentiel actif pour alimenter campagnes et mappings.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_ng_template_146_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Choisissez un referentiel pour voir ses exigences.");
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_div_148_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelement(1, "i", 67);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucune exigence pour ce referentiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Commencez par saisir les clauses et controles attendus pour rendre le cadre exploitable.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function ComplianceFrameworksComponent_table_149_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementStart(12, "span", 62);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵelementStart(15, "span", 62);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 63);
    i0.ɵɵelementStart(18, "button", 64);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_table_149_tr_14_Template_button_click_18_listener() { const restoredCtx = i0.ɵɵrestoreView(_r28); const requirement_r26 = restoredCtx.$implicit; const ctx_r27 = i0.ɵɵnextContext(2); return ctx_r27.editRequirement(requirement_r26); });
    i0.ɵɵtext(19, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 65);
    i0.ɵɵlistener("click", function ComplianceFrameworksComponent_table_149_tr_14_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r28); const requirement_r26 = restoredCtx.$implicit; const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.deleteRequirement(requirement_r26); });
    i0.ɵɵtext(21, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const requirement_r26 = ctx.$implicit;
    const ctx_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(requirement_r26.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(requirement_r26.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(requirement_r26.chapter || "Sans chapitre");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Ordre ", requirement_r26.orderIndex, " - poids ", requirement_r26.weight, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r25.getStatusClass(requirement_r26.applicabilityCode || requirement_r26.applicability));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(requirement_r26.applicabilityLabel || requirement_r26.applicability);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r25.getStatusClass(requirement_r26.statusCode || requirement_r26.status));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(requirement_r26.statusLabel || requirement_r26.status);
} }
function ComplianceFrameworksComponent_table_149_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 59);
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
    i0.ɵɵtemplate(14, ComplianceFrameworksComponent_table_149_tr_14_Template, 22, 9, "tr", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r11.paginatedRequirements);
} }
function ComplianceFrameworksComponent_app_pagination_150_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 69);
    i0.ɵɵlistener("pageChanged", function ComplianceFrameworksComponent_app_pagination_150_Template_app_pagination_pageChanged_0_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.onReqPageChanged($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalItems", ctx_r12.requirements.length)("currentPage", ctx_r12.reqCurrentPage)("pageSize", ctx_r12.reqItemsPerPage);
} }
function ComplianceFrameworksComponent_ng_template_151_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 71);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucun referentiel charge");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Creez votre premier referentiel pour commencer a structurer le module conformite.");
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
        this.isSavingFramework = false;
        this.isSavingRequirement = false;
        this.reqCurrentPage = 1;
        this.reqItemsPerPage = 10;
        this.selectedFrameworkId = null;
        this.frameworkEditingId = null;
        this.requirementEditingId = null;
        this.feedback = '';
        this.error = '';
        this.frameworkForm = this.createEmptyFrameworkForm();
        this.requirementForm = this.createEmptyRequirementForm();
    }
    ngOnInit() {
        this.loadFrameworks();
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
        this.feedback = `Edition du referentiel ${item.code}.`;
        this.error = '';
    }
    saveFramework() {
        var _a, _b, _c;
        if (!((_a = this.frameworkForm.code) === null || _a === void 0 ? void 0 : _a.trim()) || !((_b = this.frameworkForm.name) === null || _b === void 0 ? void 0 : _b.trim()) || !((_c = this.frameworkForm.version) === null || _c === void 0 ? void 0 : _c.trim())) {
            this.error = 'Le code, le nom et la version du referentiel sont obligatoires.';
            return;
        }
        this.isSavingFramework = true;
        this.error = '';
        this.feedback = '';
        const payload = Object.assign(Object.assign({}, this.frameworkForm), { code: this.frameworkForm.code.trim(), name: this.frameworkForm.name.trim(), version: this.frameworkForm.version.trim(), jurisdiction: this.normalizeOptional(this.frameworkForm.jurisdiction), description: this.normalizeOptional(this.frameworkForm.description), entityKey: this.normalizeOptional(this.frameworkForm.entityKey), effectiveDate: this.normalizeOptional(this.frameworkForm.effectiveDate), reviewDate: this.normalizeOptional(this.frameworkForm.reviewDate), status: this.frameworkForm.status || 'draft' });
        const request$ = this.frameworkEditingId
            ? this.complianceService.updateFramework(this.frameworkEditingId, payload)
            : this.complianceService.createFramework(payload);
        request$.subscribe({
            next: () => {
                this.feedback = this.frameworkEditingId ? 'Referentiel mis a jour.' : 'Referentiel cree.';
                this.resetFrameworkForm();
                this.loadFrameworks();
                this.isSavingFramework = false;
            },
            error: err => {
                var _a;
                this.isSavingFramework = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible d enregistrer le referentiel.';
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
                if (this.frameworkEditingId === item.id) {
                    this.resetFrameworkForm();
                }
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
        if (!this.selectedFrameworkId) {
            this.error = 'Selectionnez d abord un referentiel.';
            return;
        }
        if (!((_a = this.requirementForm.code) === null || _a === void 0 ? void 0 : _a.trim()) || !((_b = this.requirementForm.title) === null || _b === void 0 ? void 0 : _b.trim())) {
            this.error = 'Le code et le titre de l exigence sont obligatoires.';
            return;
        }
        this.isSavingRequirement = true;
        this.error = '';
        this.feedback = '';
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
        const request$ = this.requirementEditingId
            ? this.complianceService.updateRequirement(this.requirementEditingId, payload)
            : this.complianceService.createRequirement(payload);
        request$.subscribe({
            next: () => {
                this.feedback = this.requirementEditingId ? 'Exigence mise a jour.' : 'Exigence creee.';
                this.resetRequirementForm();
                this.loadRequirements();
                this.loadFrameworks();
                this.isSavingRequirement = false;
            },
            error: err => {
                var _a;
                this.isSavingRequirement = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible d enregistrer l exigence.';
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
                if (this.requirementEditingId === item.id) {
                    this.resetRequirementForm();
                }
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
            jurisdiction: 'Maroc',
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
ComplianceFrameworksComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceFrameworksComponent, selectors: [["app-compliance-frameworks"]], decls: 153, vars: 48, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-book-open"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], [1, "section-grid", "section-grid-wide"], [1, "content-card"], [1, "card-head"], [1, "form-grid"], [1, "filter-field"], ["placeholder", "ISO-27001", 3, "ngModel", "ngModelChange"], ["placeholder", "ISO 27001", 3, "ngModel", "ngModelChange"], ["placeholder", "2022", 3, "ngModel", "ngModelChange"], ["placeholder", "Maroc", 3, "ngModel", "ngModelChange"], ["placeholder", "filiale-casa", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange"], ["value", "draft"], ["value", "active"], ["value", "review_required"], ["value", "archived"], ["type", "date", 3, "ngModel", "ngModelChange"], [1, "filter-field", "field-span-2"], ["rows", "3", "placeholder", "Perimetre, objectifs, criticite et liens avec les audits.", 3, "ngModel", "ngModelChange"], [1, "form-actions"], ["type", "button", 1, "back-btn", 3, "click"], [4, "ngIf", "ngIfElse"], ["chooseFrameworkHint", ""], [3, "ngModel", "disabled", "ngModelChange"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["placeholder", "A.5.1", 3, "ngModel", "disabled", "ngModelChange"], ["placeholder", "Politique de securite de l information", 3, "ngModel", "disabled", "ngModelChange"], ["placeholder", "Annexe A", 3, "ngModel", "disabled", "ngModelChange"], ["type", "number", 3, "ngModel", "disabled", "ngModelChange"], ["value", "applicable"], ["value", "partially_applicable"], ["value", "not_applicable"], ["value", "retired"], ["type", "number", "step", "0.1", 3, "ngModel", "disabled", "ngModelChange"], ["rows", "3", "placeholder", "Texte de l exigence, interpretation et points de controle attendus.", 3, "ngModel", "disabled", "ngModelChange"], ["class", "table-card", 4, "ngIf", "ngIfElse"], [1, "table-card"], ["noSelectedFramework", ""], ["class", "empty-state compact", 4, "ngIf"], ["class", "compliance-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged", 4, "ngIf"], ["emptyState", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], ["class", "feedback-message success", 4, "ngIf"], ["class", "feedback-message error", 4, "ngIf"], [1, "feedback-message", "success"], [1, "feedback-message", "error"], [1, "compliance-table"], [3, "row-selected", 4, "ngFor", "ngForOf"], [3, "click"], [1, "badge", 3, "ngClass"], [1, "action-cell"], ["type", "button", 1, "table-action", 3, "click"], ["type", "button", 1, "table-action", "danger", 3, "click"], [1, "empty-state", "compact"], [1, "fas", "fa-list-check"], [4, "ngFor", "ngForOf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged"], [1, "empty-state"], [1, "fas", "fa-book"]], template: function ComplianceFrameworksComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Chaque referentiel devient une source officielle de pilotage et de preuve pour le module.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 15);
        i0.ɵɵelementStart(26, "label", 16);
        i0.ɵɵelementStart(27, "span");
        i0.ɵɵtext(28, "Code");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "input", 17);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_29_listener($event) { return ctx.frameworkForm.code = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "label", 16);
        i0.ɵɵelementStart(31, "span");
        i0.ɵɵtext(32, "Nom");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "input", 18);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_33_listener($event) { return ctx.frameworkForm.name = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "label", 16);
        i0.ɵɵelementStart(35, "span");
        i0.ɵɵtext(36, "Version");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "input", 19);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_37_listener($event) { return ctx.frameworkForm.version = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "label", 16);
        i0.ɵɵelementStart(39, "span");
        i0.ɵɵtext(40, "Juridiction");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "input", 20);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_41_listener($event) { return ctx.frameworkForm.jurisdiction = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "label", 16);
        i0.ɵɵelementStart(43, "span");
        i0.ɵɵtext(44, "Entity Key");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "input", 21);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_45_listener($event) { return ctx.frameworkForm.entityKey = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "label", 16);
        i0.ɵɵelementStart(47, "span");
        i0.ɵɵtext(48, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "select", 22);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_select_ngModelChange_49_listener($event) { return ctx.frameworkForm.status = $event; });
        i0.ɵɵelementStart(50, "option", 23);
        i0.ɵɵtext(51, "Brouillon");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "option", 24);
        i0.ɵɵtext(53, "Actif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "option", 25);
        i0.ɵɵtext(55, "Revue requise");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "option", 26);
        i0.ɵɵtext(57, "Archive");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "label", 16);
        i0.ɵɵelementStart(59, "span");
        i0.ɵɵtext(60, "Date d effet");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "input", 27);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_61_listener($event) { return ctx.frameworkForm.effectiveDate = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "label", 16);
        i0.ɵɵelementStart(63, "span");
        i0.ɵɵtext(64, "Date de revue");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "input", 27);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_65_listener($event) { return ctx.frameworkForm.reviewDate = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "label", 28);
        i0.ɵɵelementStart(67, "span");
        i0.ɵɵtext(68, "Description");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "textarea", 29);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_textarea_ngModelChange_69_listener($event) { return ctx.frameworkForm.description = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "div", 30);
        i0.ɵɵelementStart(71, "button", 7);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_71_listener() { return ctx.saveFramework(); });
        i0.ɵɵtext(72);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "button", 31);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_73_listener() { return ctx.resetFrameworkForm(); });
        i0.ɵɵtext(74, "Reinitialiser");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "section", 13);
        i0.ɵɵelementStart(76, "div", 14);
        i0.ɵɵelementStart(77, "h2");
        i0.ɵɵtext(78);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(79, ComplianceFrameworksComponent_p_79_Template, 2, 0, "p", 32);
        i0.ɵɵtemplate(80, ComplianceFrameworksComponent_ng_template_80_Template, 2, 0, "ng-template", null, 33, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "div", 16);
        i0.ɵɵelementStart(83, "label");
        i0.ɵɵtext(84, "Referentiel actif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(85, "select", 34);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_select_ngModelChange_85_listener($event) { return ctx.selectFramework($event); });
        i0.ɵɵelementStart(86, "option", 35);
        i0.ɵɵtext(87, "Choisir un referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(88, ComplianceFrameworksComponent_option_88_Template, 2, 4, "option", 36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(89, "div", 15);
        i0.ɵɵelementStart(90, "label", 16);
        i0.ɵɵelementStart(91, "span");
        i0.ɵɵtext(92, "Code exigence");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(93, "input", 37);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_93_listener($event) { return ctx.requirementForm.code = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(94, "label", 28);
        i0.ɵɵelementStart(95, "span");
        i0.ɵɵtext(96, "Titre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(97, "input", 38);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_97_listener($event) { return ctx.requirementForm.title = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(98, "label", 16);
        i0.ɵɵelementStart(99, "span");
        i0.ɵɵtext(100, "Chapitre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(101, "input", 39);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_101_listener($event) { return ctx.requirementForm.chapter = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "label", 16);
        i0.ɵɵelementStart(103, "span");
        i0.ɵɵtext(104, "Ordre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(105, "input", 40);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_105_listener($event) { return ctx.requirementForm.orderIndex = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(106, "label", 16);
        i0.ɵɵelementStart(107, "span");
        i0.ɵɵtext(108, "Applicabilite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(109, "select", 34);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_select_ngModelChange_109_listener($event) { return ctx.requirementForm.applicability = $event; });
        i0.ɵɵelementStart(110, "option", 41);
        i0.ɵɵtext(111, "Applicable");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(112, "option", 42);
        i0.ɵɵtext(113, "Partiellement applicable");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(114, "option", 43);
        i0.ɵɵtext(115, "Non applicable");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(116, "label", 16);
        i0.ɵɵelementStart(117, "span");
        i0.ɵɵtext(118, "Statut");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(119, "select", 34);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_select_ngModelChange_119_listener($event) { return ctx.requirementForm.status = $event; });
        i0.ɵɵelementStart(120, "option", 24);
        i0.ɵɵtext(121, "Active");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(122, "option", 23);
        i0.ɵɵtext(123, "Brouillon");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(124, "option", 44);
        i0.ɵɵtext(125, "Retiree");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(126, "label", 16);
        i0.ɵɵelementStart(127, "span");
        i0.ɵɵtext(128, "Poids");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(129, "input", 45);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_input_ngModelChange_129_listener($event) { return ctx.requirementForm.weight = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(130, "label", 28);
        i0.ɵɵelementStart(131, "span");
        i0.ɵɵtext(132, "Description");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(133, "textarea", 46);
        i0.ɵɵlistener("ngModelChange", function ComplianceFrameworksComponent_Template_textarea_ngModelChange_133_listener($event) { return ctx.requirementForm.description = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(134, "div", 30);
        i0.ɵɵelementStart(135, "button", 7);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_135_listener() { return ctx.saveRequirement(); });
        i0.ɵɵtext(136);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(137, "button", 31);
        i0.ɵɵlistener("click", function ComplianceFrameworksComponent_Template_button_click_137_listener() { return ctx.resetRequirementForm(); });
        i0.ɵɵtext(138, "Reinitialiser");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(139, "div", 12);
        i0.ɵɵtemplate(140, ComplianceFrameworksComponent_section_140_Template, 21, 1, "section", 47);
        i0.ɵɵelementStart(141, "section", 48);
        i0.ɵɵelementStart(142, "div", 14);
        i0.ɵɵelementStart(143, "h2");
        i0.ɵɵtext(144, "Exigences du referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(145, ComplianceFrameworksComponent_p_145_Template, 2, 0, "p", 32);
        i0.ɵɵtemplate(146, ComplianceFrameworksComponent_ng_template_146_Template, 2, 0, "ng-template", null, 49, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(148, ComplianceFrameworksComponent_div_148_Template, 6, 0, "div", 50);
        i0.ɵɵtemplate(149, ComplianceFrameworksComponent_table_149_Template, 15, 1, "table", 51);
        i0.ɵɵtemplate(150, ComplianceFrameworksComponent_app_pagination_150_Template, 1, 3, "app-pagination", 52);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(151, ComplianceFrameworksComponent_ng_template_151_Template, 6, 0, "ng-template", null, 53, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(81);
        const _r8 = i0.ɵɵreference(147);
        const _r13 = i0.ɵɵreference(152);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedback || ctx.error);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.frameworkEditingId ? "Modifier un referentiel" : "Nouveau referentiel");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.code);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.name);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.version);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.jurisdiction);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.entityKey);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.status);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.effectiveDate);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.reviewDate);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.frameworkForm.description);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSavingFramework);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.frameworkEditingId ? "Mettre a jour" : "Creer le referentiel", " ");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.requirementEditingId ? "Modifier une exigence" : "Nouvelle exigence");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId)("ngIfElse", _r3);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.selectedFrameworkId)("disabled", ctx.frameworks.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.frameworks);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.code)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.title)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.chapter)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.orderIndex)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.applicability)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.status)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.weight)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.requirementForm.description)("disabled", !ctx.selectedFrameworkId);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSavingRequirement || !ctx.selectedFrameworkId);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.requirementEditingId ? "Mettre a jour" : "Creer l exigence", " ");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.frameworks.length > 0)("ngIfElse", _r13);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId)("ngIfElse", _r8);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId && ctx.requirements.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.requirements.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.requirements.length > 0);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.NumberValueAccessor, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceFrameworksComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-frameworks',
                templateUrl: './compliance-frameworks.component.html',
                styleUrls: ['./compliance-frameworks.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-frameworks.component.js.map