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
function ComplianceMappingsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r9.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r9.label, " ");
} }
function ComplianceMappingsComponent_div_17_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r10.feedback);
} }
function ComplianceMappingsComponent_div_17_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r11.error);
} }
function ComplianceMappingsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtemplate(1, ComplianceMappingsComponent_div_17_p_1_Template, 2, 1, "p", 33);
    i0.ɵɵtemplate(2, ComplianceMappingsComponent_div_17_p_2_Template, 2, 1, "p", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.feedback);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.error);
} }
function ComplianceMappingsComponent_option_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r12 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", framework_r12.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", framework_r12.code, " - ", framework_r12.name, " ");
} }
function ComplianceMappingsComponent_option_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const requirement_r13 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", requirement_r13.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", requirement_r13.code, " - ", requirement_r13.title, " ");
} }
function ComplianceMappingsComponent_option_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r14 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r14);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(type_r14);
} }
function ComplianceMappingsComponent_option_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r15 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", option_r15.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", option_r15.label, " ");
} }
function ComplianceMappingsComponent_section_78_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementStart(12, "span", 41);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "small");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 42);
    i0.ɵɵelementStart(20, "button", 43);
    i0.ɵɵlistener("click", function ComplianceMappingsComponent_section_78_tr_20_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r19); const item_r17 = restoredCtx.$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.editMapping(item_r17); });
    i0.ɵɵtext(21, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 44);
    i0.ɵɵlistener("click", function ComplianceMappingsComponent_section_78_tr_20_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r19); const item_r17 = restoredCtx.$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.deleteMapping(item_r17); });
    i0.ɵɵtext(23, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((item_r17.requirement == null ? null : item_r17.requirement.code) || "REQ-" + item_r17.requirementId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((item_r17.requirement == null ? null : item_r17.requirement.title) || "Exigence chargee sans detail");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r17.sourceTypeLabel || item_r17.sourceType, " - ", ctx_r16.getSourceLabel(item_r17), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r17.relatedEntityKey || "Aucune cle secondaire");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r16.getStatusClass(item_r17.coverageLevelCode || item_r17.coverageLevel));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r17.coverageLevelLabel || item_r17.coverageLevel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r17.entityKey || "Global");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r17.owner == null ? null : item_r17.owner.prenom, " ", item_r17.owner == null ? null : item_r17.owner.nom, "");
} }
function ComplianceMappingsComponent_section_78_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 37);
    i0.ɵɵelementStart(1, "div", 13);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Matrice de couverture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Chaque ligne represente un lien persiste entre une exigence et un element reel du systeme.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "table", 38);
    i0.ɵɵelementStart(7, "thead");
    i0.ɵɵelementStart(8, "tr");
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Exigence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Couverture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Portee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, ComplianceMappingsComponent_section_78_tr_20_Template, 24, 10, "tr", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "app-pagination", 40);
    i0.ɵɵlistener("pageChanged", function ComplianceMappingsComponent_section_78_Template_app_pagination_pageChanged_21_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.onPageChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r6.paginatedMappings);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("totalItems", ctx_r6.mappings.length)("currentPage", ctx_r6.currentPage)("pageSize", ctx_r6.itemsPerPage);
} }
function ComplianceMappingsComponent_ng_template_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵelement(1, "i", 46);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Aucun mapping visible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Creez les premieres liaisons pour relier exigences et sources reelles du SI.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ComplianceMappingsComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.navItems = getComplianceNavItems(getStoredComplianceRole());
        this.sourceTypes = ['risk', 'audit', 'incident'];
        this.frameworks = [];
        this.requirements = [];
        this.mappings = [];
        this.linkableSources = { risk: [], audit: [], incident: [] };
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.isLoading = false;
        this.isSaving = false;
        this.selectedFrameworkId = null;
        this.mappingEditingId = null;
        this.feedback = '';
        this.error = '';
        this.mappingForm = this.createEmptyMappingForm();
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        this.error = '';
        this.complianceService.getFrameworks().subscribe({
            next: frameworks => {
                this.frameworks = frameworks;
                if (!this.selectedFrameworkId && frameworks.length > 0) {
                    this.selectedFrameworkId = frameworks[0].id;
                    this.mappingForm.requirementId = 0;
                }
                this.loadRequirements();
                this.loadMappings();
                this.loadLinkableSources();
                this.isLoading = false;
            },
            error: err => {
                var _a;
                this.frameworks = [];
                this.requirements = [];
                this.mappings = [];
                this.isLoading = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les donnees de mapping.';
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
                if (!items.some(item => item.id === this.mappingForm.requirementId)) {
                    this.mappingForm.requirementId = 0;
                }
            },
            error: err => {
                var _a;
                this.requirements = [];
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les exigences.';
            }
        });
    }
    loadMappings() {
        this.complianceService.getMappings().subscribe({
            next: items => {
                this.mappings = items;
                this.currentPage = 1;
            },
            error: err => {
                var _a;
                this.mappings = [];
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les mappings.';
            }
        });
    }
    get paginatedMappings() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.mappings.slice(startIndex, startIndex + this.itemsPerPage);
    }
    onPageChanged(event) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }
    loadLinkableSources() {
        this.complianceService.getLinkableSources().subscribe({
            next: items => {
                this.linkableSources = items;
            },
            error: err => {
                var _a;
                this.linkableSources = { risk: [], audit: [], incident: [] };
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les sources reelles.';
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard/compliance']);
    }
    onFrameworkChange() {
        this.mappingForm.requirementId = 0;
        this.loadRequirements();
    }
    onSourceTypeChange() {
        this.mappingForm.sourceId = null;
    }
    saveMapping() {
        if (!this.mappingForm.requirementId) {
            this.error = 'Selectionnez une exigence a couvrir.';
            return;
        }
        if (!this.mappingForm.sourceType || !this.mappingForm.sourceId) {
            this.error = 'Selectionnez une source reelle a lier.';
            return;
        }
        this.isSaving = true;
        this.error = '';
        this.feedback = '';
        const payload = {
            requirementId: Number(this.mappingForm.requirementId),
            sourceType: this.mappingForm.sourceType,
            sourceId: this.mappingForm.sourceId ? Number(this.mappingForm.sourceId) : null,
            relatedEntityKey: this.normalizeOptional(this.mappingForm.relatedEntityKey),
            coverageLevel: this.mappingForm.coverageLevel || 'partial',
            rationale: this.normalizeOptional(this.mappingForm.rationale),
            entityKey: this.normalizeOptional(this.mappingForm.entityKey)
        };
        const request$ = this.mappingEditingId
            ? this.complianceService.updateMapping(this.mappingEditingId, payload)
            : this.complianceService.createMapping(payload);
        request$.subscribe({
            next: () => {
                this.feedback = this.mappingEditingId ? 'Mapping mis a jour.' : 'Mapping cree.';
                this.resetForm();
                this.loadMappings();
                this.isSaving = false;
            },
            error: err => {
                var _a;
                this.isSaving = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible d enregistrer le mapping.';
            }
        });
    }
    editMapping(item) {
        const requirement = item.requirement;
        if (requirement === null || requirement === void 0 ? void 0 : requirement.frameworkId) {
            this.selectedFrameworkId = requirement.frameworkId;
            this.loadRequirements();
        }
        this.mappingEditingId = item.id;
        this.mappingForm = {
            requirementId: item.requirementId,
            sourceType: item.sourceTypeCode || item.sourceType,
            sourceId: item.sourceId,
            relatedEntityKey: item.relatedEntityKey,
            coverageLevel: item.coverageLevelCode || item.coverageLevel,
            rationale: item.rationale,
            entityKey: item.entityKey
        };
        this.feedback = `Edition du mapping #${item.id}.`;
        this.error = '';
    }
    deleteMapping(item) {
        if (!window.confirm(`Supprimer le mapping #${item.id} ?`)) {
            return;
        }
        this.complianceService.deleteMapping(item.id).subscribe({
            next: () => {
                this.feedback = 'Mapping supprime.';
                if (this.mappingEditingId === item.id) {
                    this.resetForm();
                }
                this.loadMappings();
            },
            error: err => {
                var _a;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de supprimer le mapping.';
            }
        });
    }
    resetForm() {
        this.mappingEditingId = null;
        this.mappingForm = this.createEmptyMappingForm();
    }
    getSourceOptions(type) {
        if (!type) {
            return [];
        }
        return this.linkableSources[type] || [];
    }
    getSourceLabel(item) {
        const option = this.getSourceOptions(item.sourceType).find(source => source.id === item.sourceId);
        if (!option && item.sourceTypeCode) {
            const fallback = this.getSourceOptions(item.sourceTypeCode).find(source => source.id === item.sourceId);
            return (fallback === null || fallback === void 0 ? void 0 : fallback.label) || `Element #${item.sourceId || 'n/a'}`;
        }
        return (option === null || option === void 0 ? void 0 : option.label) || `Element #${item.sourceId || 'n/a'}`;
    }
    getStatusClass(value) {
        return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
    }
    createEmptyMappingForm() {
        return {
            requirementId: 0,
            sourceType: 'risk',
            sourceId: null,
            relatedEntityKey: '',
            coverageLevel: 'partial',
            rationale: '',
            entityKey: ''
        };
    }
    normalizeOptional(value) {
        return value && value.trim() ? value.trim() : null;
    }
}
ComplianceMappingsComponent.ɵfac = function ComplianceMappingsComponent_Factory(t) { return new (t || ComplianceMappingsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceMappingsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceMappingsComponent, selectors: [["app-compliance-mappings"]], decls: 81, vars: 25, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-diagram-project"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], [1, "content-card"], [1, "card-head"], [1, "form-grid"], [1, "filter-field"], [3, "ngModel", "ngModelChange"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "filter-field", "field-span-2"], [3, "ngModel", "disabled", "ngModelChange"], ["value", "partial"], ["value", "covered"], ["value", "uncovered"], ["placeholder", "filiale-casa", 3, "ngModel", "ngModelChange"], ["placeholder", "risk:12 / audit:4 / maroc-si", 3, "ngModel", "ngModelChange"], [1, "filter-field", "field-span-3"], ["rows", "3", "placeholder", "Pourquoi cette source couvre l exigence et quel est le niveau de preuve attendu.", 3, "ngModel", "ngModelChange"], [1, "form-actions"], ["type", "button", 1, "back-btn", 3, "click"], ["class", "table-card", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], ["class", "feedback-message success", 4, "ngIf"], ["class", "feedback-message error", 4, "ngIf"], [1, "feedback-message", "success"], [1, "feedback-message", "error"], [1, "table-card"], [1, "compliance-table"], [4, "ngFor", "ngForOf"], [3, "totalItems", "currentPage", "pageSize", "pageChanged"], [1, "badge", 3, "ngClass"], [1, "action-cell"], ["type", "button", 1, "table-action", 3, "click"], ["type", "button", 1, "table-action", "danger", 3, "click"], [1, "empty-state"], [1, "fas", "fa-link"]], template: function ComplianceMappingsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceMappingsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Mapping et liens");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Creez des liaisons reelles entre exigences, risques, audits et incidents pour mesurer une couverture exploitable.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceMappingsComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceMappingsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ComplianceMappingsComponent_div_17_Template, 3, 2, "div", 11);
        i0.ɵɵelementStart(18, "section", 12);
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "h2");
        i0.ɵɵtext(21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "p");
        i0.ɵɵtext(23, "Le mapping relie une exigence a une source metier existante pour rendre le score et l audit trail fiables.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 14);
        i0.ɵɵelementStart(25, "label", 15);
        i0.ɵɵelementStart(26, "span");
        i0.ɵɵtext(27, "Referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "select", 16);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_28_listener($event) { return ctx.selectedFrameworkId = $event; })("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_28_listener() { return ctx.onFrameworkChange(); });
        i0.ɵɵelementStart(29, "option", 17);
        i0.ɵɵtext(30, "Choisir un referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(31, ComplianceMappingsComponent_option_31_Template, 2, 3, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "label", 19);
        i0.ɵɵelementStart(33, "span");
        i0.ɵɵtext(34, "Exigence");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "select", 20);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_35_listener($event) { return ctx.mappingForm.requirementId = $event; });
        i0.ɵɵelementStart(36, "option", 17);
        i0.ɵɵtext(37, "Choisir une exigence");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(38, ComplianceMappingsComponent_option_38_Template, 2, 3, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "label", 15);
        i0.ɵɵelementStart(40, "span");
        i0.ɵɵtext(41, "Type de source");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "select", 16);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_42_listener($event) { return ctx.mappingForm.sourceType = $event; })("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_42_listener() { return ctx.onSourceTypeChange(); });
        i0.ɵɵtemplate(43, ComplianceMappingsComponent_option_43_Template, 2, 2, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "label", 19);
        i0.ɵɵelementStart(45, "span");
        i0.ɵɵtext(46, "Source liee");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "select", 16);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_47_listener($event) { return ctx.mappingForm.sourceId = $event; });
        i0.ɵɵelementStart(48, "option", 17);
        i0.ɵɵtext(49, "Choisir un element existant");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(50, ComplianceMappingsComponent_option_50_Template, 2, 2, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "label", 15);
        i0.ɵɵelementStart(52, "span");
        i0.ɵɵtext(53, "Niveau de couverture");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "select", 16);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_select_ngModelChange_54_listener($event) { return ctx.mappingForm.coverageLevel = $event; });
        i0.ɵɵelementStart(55, "option", 21);
        i0.ɵɵtext(56, "Partielle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "option", 22);
        i0.ɵɵtext(58, "Couverte");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "option", 23);
        i0.ɵɵtext(60, "Non couverte");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "label", 15);
        i0.ɵɵelementStart(62, "span");
        i0.ɵɵtext(63, "Entity Key");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "input", 24);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_input_ngModelChange_64_listener($event) { return ctx.mappingForm.entityKey = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "label", 19);
        i0.ɵɵelementStart(66, "span");
        i0.ɵɵtext(67, "Cle relationnelle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "input", 25);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_input_ngModelChange_68_listener($event) { return ctx.mappingForm.relatedEntityKey = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "label", 26);
        i0.ɵɵelementStart(70, "span");
        i0.ɵɵtext(71, "Justification");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "textarea", 27);
        i0.ɵɵlistener("ngModelChange", function ComplianceMappingsComponent_Template_textarea_ngModelChange_72_listener($event) { return ctx.mappingForm.rationale = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "div", 28);
        i0.ɵɵelementStart(74, "button", 7);
        i0.ɵɵlistener("click", function ComplianceMappingsComponent_Template_button_click_74_listener() { return ctx.saveMapping(); });
        i0.ɵɵtext(75);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(76, "button", 29);
        i0.ɵɵlistener("click", function ComplianceMappingsComponent_Template_button_click_76_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(77, "Reinitialiser");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(78, ComplianceMappingsComponent_section_78_Template, 22, 4, "section", 30);
        i0.ɵɵtemplate(79, ComplianceMappingsComponent_ng_template_79_Template, 6, 0, "ng-template", null, 31, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r7 = i0.ɵɵreference(80);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedback || ctx.error);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.mappingEditingId ? "Modifier un mapping" : "Nouveau mapping");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.selectedFrameworkId);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.frameworks);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.requirementId)("disabled", ctx.requirements.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.requirements);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.sourceType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.sourceTypes);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.sourceId);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.getSourceOptions(ctx.mappingForm.sourceType));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.coverageLevel);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.entityKey);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.relatedEntityKey);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mappingForm.rationale);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.mappingEditingId ? "Mettre a jour" : "Creer le mapping", " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.mappings.length > 0)("ngIfElse", _r7);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceMappingsComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-mappings',
                templateUrl: './compliance-mappings.component.html',
                styleUrls: ['./compliance-mappings.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-mappings.component.js.map