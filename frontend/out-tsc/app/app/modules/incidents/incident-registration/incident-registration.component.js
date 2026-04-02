import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncidentService, IncidentStatus } from '../../../core/services/incident.service';
import { DepartmentService } from '../../../core/services/department.service';
import { RiskService } from '../../../core/services/risk.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/incident.service";
import * as i3 from "../../../core/services/department.service";
import * as i4 from "../../../core/services/risk.service";
import * as i5 from "@angular/router";
import * as i6 from "@angular/common";
function IncidentRegistrationComponent_p_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.importMessage);
} }
function IncidentRegistrationComponent_div_33_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r14 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(warning_r14);
} }
function IncidentRegistrationComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtemplate(1, IncidentRegistrationComponent_div_33_p_1_Template, 2, 1, "p", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.importWarnings);
} }
function IncidentRegistrationComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2, "Apercu OCR");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.importPreview);
} }
function IncidentRegistrationComponent_small_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 61);
    i0.ɵɵtext(1, "Le titre est requis (min 5 caracteres).");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Soyez concis et explicite.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 61);
    i0.ɵɵtext(1, "Une description detaillee est requise (min 10 caracteres).");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 61);
    i0.ɵɵtext(1, "Le domaine est requis.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_option_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r15.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r15.nom);
} }
function IncidentRegistrationComponent_small_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 61);
    i0.ɵɵtext(1, "Le departement est requis.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_option_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r16.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", r_r16.titre, " (Criticite: ", r_r16.niveauRisque, ")");
} }
function IncidentRegistrationComponent_button_123_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 62);
    i0.ɵɵlistener("click", function IncidentRegistrationComponent_button_123_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.selectedFile = null; });
    i0.ɵɵelement(1, "i", 63);
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_span_130_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵtext(2, " Confirmer la Declaration ");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_span_131_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵelement(1, "i", 66);
    i0.ɵɵtext(2, " Traitement en cours... ");
    i0.ɵɵelementEnd();
} }
export class IncidentRegistrationComponent {
    constructor(fb, incidentService, departmentService, riskService, router) {
        this.fb = fb;
        this.incidentService = incidentService;
        this.departmentService = departmentService;
        this.riskService = riskService;
        this.router = router;
        this.departments = [];
        this.risks = [];
        this.selectedFile = null;
        this.isSubmitting = false;
        this.isImporting = false;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        this.incidentForm = this.fb.group({
            titre: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            domaine: ['', Validators.required],
            niveauRisque: [''],
            departementId: [null, Validators.required],
            dateSurvenance: [new Date().toISOString().split('T')[0], Validators.required],
            statut: [IncidentStatus.NOUVEAU],
            riskId: [null]
        });
    }
    ngOnInit() {
        this.loadDepartments();
        this.loadRisks();
    }
    loadDepartments() {
        this.departmentService.getAll().subscribe(d => this.departments = d);
    }
    loadRisks() {
        this.riskService.getRisks().subscribe(r => this.risks = r);
    }
    onFileSelected(event) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
        }
    }
    onImportFileSelected(event) {
        var _a, _b;
        const file = (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (!file) {
            return;
        }
        this.isImporting = true;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        this.incidentService.importIncidentDraft(file).subscribe({
            next: (draft) => {
                this.applyImportedDraft(draft);
                this.selectedFile = file;
                this.isImporting = false;
                this.importWarnings = draft.warnings || [];
                this.importPreview = draft.extractedTextPreview || '';
                this.importMessage = this.buildImportMessage(draft);
            },
            error: (err) => {
                var _a;
                console.error(err);
                this.isImporting = false;
                this.importMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Import impossible pour ce fichier.';
            }
        });
        event.target.value = '';
    }
    applyImportedDraft(draft) {
        const patch = {};
        if (draft.titre)
            patch['titre'] = draft.titre;
        if (draft.description)
            patch['description'] = draft.description;
        if (draft.domaine)
            patch['domaine'] = draft.domaine;
        if (draft.niveauRisque)
            patch['niveauRisque'] = this.normalizeLevel(draft.niveauRisque);
        if (draft.departementId !== undefined && draft.departementId !== null)
            patch['departementId'] = draft.departementId;
        if (draft.dateSurvenance)
            patch['dateSurvenance'] = draft.dateSurvenance;
        this.incidentForm.patchValue(patch);
        this.incidentForm.markAsDirty();
        this.incidentForm.markAllAsTouched();
    }
    normalizeLevel(level) {
        if (!level)
            return '';
        const normalized = level.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (normalized.includes('critique'))
            return 'Critique';
        if (normalized.includes('significatif'))
            return 'Significatif';
        if (normalized.includes('eleve'))
            return 'Ã‰levÃ©';
        if (normalized.includes('moyen'))
            return 'Moyen';
        if (normalized.includes('limit'))
            return 'LimitÃ©';
        if (normalized.includes('faible'))
            return 'Faible';
        return level;
    }
    buildImportMessage(draft) {
        if (draft.sourceType === 'image-scan') {
            return draft.importReliability === 'low'
                ? 'Scan manuscrit analyse. Les champs peu fiables ont ete laisses vides pour verification.'
                : 'Scan manuscrit analyse et formulaire prerempli avec les champs reconnus.';
        }
        if (draft.importReliability === 'low') {
            return 'Document analyse avec prudence. Verifiez les champs proposes avant validation.';
        }
        return draft.departementId
            ? 'Le formulaire a ete prerempli a partir du document importe.'
            : `Le formulaire a ete prerempli. Departement a confirmer${draft.departementNom ? `: ${draft.departementNom}` : ''}.`;
    }
    submitIncident() {
        if (this.incidentForm.invalid) {
            this.incidentForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        const formData = new FormData();
        const rawValues = this.incidentForm.getRawValue();
        Object.keys(rawValues).forEach(key => {
            if (rawValues[key] !== null && rawValues[key] !== undefined) {
                formData.append(key, rawValues[key]);
            }
        });
        if (this.selectedFile) {
            formData.append('pieceJointe', this.selectedFile);
        }
        this.incidentService.createIncident(formData).subscribe({
            next: () => {
                this.isSubmitting = false;
                alert('Incident declare avec succes !');
                this.router.navigate(['/dashboard/incident-workflow']);
            },
            error: (err) => {
                console.error(err);
                this.isSubmitting = false;
                alert('Erreur lors de la declaration.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
IncidentRegistrationComponent.ɵfac = function IncidentRegistrationComponent_Factory(t) { return new (t || IncidentRegistrationComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.IncidentService), i0.ɵɵdirectiveInject(i3.DepartmentService), i0.ɵɵdirectiveInject(i4.RiskService), i0.ɵɵdirectiveInject(i5.Router)); };
IncidentRegistrationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentRegistrationComponent, selectors: [["app-incident-registration"]], decls: 132, vars: 51, consts: [[1, "incident-page", "registration-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-plus-circle"], [1, "registration-container", "card", "shadow-premium", "animate-fade-in"], [1, "import-panel"], [1, "import-copy"], [1, "fas", "fa-file-import"], [1, "import-actions"], ["type", "file", "id", "incidentImportInput", "hidden", "", "accept", ".xls,.xlsx,.xlsm,.pdf,.jpg,.jpeg,.png", 3, "change"], ["type", "file", "id", "incidentScanInput", "hidden", "", "accept", "image/*", "capture", "environment", 3, "change"], ["for", "incidentImportInput", 1, "btn-import"], [1, "fas"], ["for", "incidentScanInput", 1, "btn-import", "btn-scan"], ["class", "import-message", 4, "ngIf"], ["class", "import-warning-list", 4, "ngIf"], ["class", "import-preview", 4, "ngIf"], [1, "premium-form", 3, "formGroup", "ngSubmit"], [1, "form-grid"], [1, "form-section", "full"], [1, "section-title"], [1, "fas", "fa-info-circle"], [1, "field"], [1, "required"], ["type", "text", "formControlName", "titre", "placeholder", "Ex: Panne de climatisation salle serveur", 1, "premium-input"], ["class", "error-msg", 4, "ngIf"], ["class", "hint", 4, "ngIf"], ["formControlName", "description", "rows", "5", "placeholder", "Decrivez les faits, les premiers impacts constates...", 1, "premium-input"], [1, "form-section"], [1, "fas", "fa-map-marker-alt"], ["type", "text", "formControlName", "domaine", "placeholder", "Ex: Informatique, Logistique, Juridique...", 1, "premium-input"], ["formControlName", "departementId", 1, "premium-input"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "niveauRisque", 1, "premium-input"], ["value", ""], ["value", "Faible"], ["value", "Moyen"], ["value", "\u00C9lev\u00E9"], ["value", "Critique"], ["value", "Significatif"], ["value", "Limit\u00E9"], [1, "field", "mt-3"], ["formControlName", "riskId", 1, "premium-input"], [1, "hint"], [1, "fas", "fa-calendar-alt"], ["type", "date", "formControlName", "dateSurvenance", 1, "premium-input"], [1, "premium-file-upload"], ["type", "file", "id", "fileInput", "hidden", "", "accept", ".xls,.xlsx,.xlsm,.pdf,.jpg,.jpeg,.png,.docx", 3, "change"], ["for", "fileInput"], ["type", "button", "class", "clear-file", 3, "click", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-outline", 3, "click"], ["type", "submit", 1, "btn-primary"], ["class", "btn-content", 4, "ngIf"], [1, "import-message"], [1, "import-warning-list"], [4, "ngFor", "ngForOf"], [1, "import-preview"], [1, "error-msg"], ["type", "button", 1, "clear-file", 3, "click"], [1, "fas", "fa-times"], [1, "btn-content"], [1, "fas", "fa-check-circle"], [1, "fas", "fa-circle-notch", "fa-spin"]], template: function IncidentRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentRegistrationComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Declaration d'Incident");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Enregistrez un nouvel incident de maniere structuree pour assurer son traitement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "h3");
        i0.ɵɵelement(15, "i", 9);
        i0.ɵɵtext(16, " Creer depuis un document");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "p");
        i0.ɵɵtext(18, "Importez une fiche incident Excel, un PDF ou une image. Pour une fiche manuscrite, utilisez le scan photo pour un OCR plus prudent.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "small");
        i0.ɵɵtext(20, "Formats acceptes: `.xls`, `.xlsx`, `.xlsm`, `.pdf`, `.jpg`, `.jpeg`, `.png`.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 10);
        i0.ɵɵelementStart(22, "input", 11);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_22_listener($event) { return ctx.onImportFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "input", 12);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_23_listener($event) { return ctx.onImportFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "label", 13);
        i0.ɵɵelement(25, "i", 14);
        i0.ɵɵelementStart(26, "span");
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "label", 15);
        i0.ɵɵelement(29, "i", 14);
        i0.ɵɵelementStart(30, "span");
        i0.ɵɵtext(31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(32, IncidentRegistrationComponent_p_32_Template, 2, 1, "p", 16);
        i0.ɵɵtemplate(33, IncidentRegistrationComponent_div_33_Template, 2, 1, "div", 17);
        i0.ɵɵtemplate(34, IncidentRegistrationComponent_div_34_Template, 5, 1, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "form", 19);
        i0.ɵɵlistener("ngSubmit", function IncidentRegistrationComponent_Template_form_ngSubmit_35_listener() { return ctx.submitIncident(); });
        i0.ɵɵelementStart(36, "div", 20);
        i0.ɵɵelementStart(37, "div", 21);
        i0.ɵɵelementStart(38, "h3", 22);
        i0.ɵɵelement(39, "i", 23);
        i0.ɵɵtext(40, " Informations Generales");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "div", 24);
        i0.ɵɵelementStart(42, "label");
        i0.ɵɵtext(43, "Titre de l'incident ");
        i0.ɵɵelementStart(44, "span", 25);
        i0.ɵɵtext(45, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(46, "input", 26);
        i0.ɵɵtemplate(47, IncidentRegistrationComponent_small_47_Template, 2, 0, "small", 27);
        i0.ɵɵtemplate(48, IncidentRegistrationComponent_small_48_Template, 2, 0, "small", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "div", 24);
        i0.ɵɵelementStart(50, "label");
        i0.ɵɵtext(51, "Description Detaillee ");
        i0.ɵɵelementStart(52, "span", 25);
        i0.ɵɵtext(53, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(54, "textarea", 29);
        i0.ɵɵtemplate(55, IncidentRegistrationComponent_small_55_Template, 2, 0, "small", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "div", 30);
        i0.ɵɵelementStart(57, "h3", 22);
        i0.ɵɵelement(58, "i", 31);
        i0.ɵɵtext(59, " Contexte & Localisation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 24);
        i0.ɵɵelementStart(61, "label");
        i0.ɵɵtext(62, "Domaine / Nature ");
        i0.ɵɵelementStart(63, "span", 25);
        i0.ɵɵtext(64, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(65, "input", 32);
        i0.ɵɵtemplate(66, IncidentRegistrationComponent_small_66_Template, 2, 0, "small", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "div", 24);
        i0.ɵɵelementStart(68, "label");
        i0.ɵɵtext(69, "Departement Concerne ");
        i0.ɵɵelementStart(70, "span", 25);
        i0.ɵɵtext(71, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "select", 33);
        i0.ɵɵelementStart(73, "option", 34);
        i0.ɵɵtext(74, "Selectionnez un departement...");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(75, IncidentRegistrationComponent_option_75_Template, 2, 2, "option", 35);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(76, IncidentRegistrationComponent_small_76_Template, 2, 0, "small", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "div", 24);
        i0.ɵɵelementStart(78, "label");
        i0.ɵɵtext(79, "Niveau (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "select", 36);
        i0.ɵɵelementStart(81, "option", 37);
        i0.ɵɵtext(82, "Selectionnez un niveau...");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "option", 38);
        i0.ɵɵtext(84, "Faible");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(85, "option", 39);
        i0.ɵɵtext(86, "Moyen");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "option", 40);
        i0.ɵɵtext(88, "\u00C9lev\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(89, "option", 41);
        i0.ɵɵtext(90, "Critique");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(91, "option", 42);
        i0.ɵɵtext(92, "Significatif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(93, "option", 43);
        i0.ɵɵtext(94, "Limit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(95, "div", 44);
        i0.ɵɵelementStart(96, "label");
        i0.ɵɵtext(97, "Lien avec un Risque (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(98, "select", 45);
        i0.ɵɵelementStart(99, "option", 34);
        i0.ɵɵtext(100, "Aucun lien direct");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(101, IncidentRegistrationComponent_option_101_Template, 2, 3, "option", 35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "small", 46);
        i0.ɵɵtext(103, "Associer l'incident a un risque de la cartographie pour une meilleure analyse.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(104, "div", 30);
        i0.ɵɵelementStart(105, "h3", 22);
        i0.ɵɵelement(106, "i", 47);
        i0.ɵɵtext(107, " Temporalite & Preuves");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(108, "div", 24);
        i0.ɵɵelementStart(109, "label");
        i0.ɵɵtext(110, "Date de survenance ");
        i0.ɵɵelementStart(111, "span", 25);
        i0.ɵɵtext(112, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(113, "input", 48);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(114, "div", 24);
        i0.ɵɵelementStart(115, "label");
        i0.ɵɵtext(116, "Piece Jointe / Photo (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(117, "div", 49);
        i0.ɵɵelementStart(118, "input", 50);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_118_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(119, "label", 51);
        i0.ɵɵelement(120, "i", 14);
        i0.ɵɵelementStart(121, "span");
        i0.ɵɵtext(122);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(123, IncidentRegistrationComponent_button_123_Template, 2, 0, "button", 52);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(124, "small", 46);
        i0.ɵɵtext(125, "Le fichier importe est conserve comme piece jointe si vous confirmez la declaration.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(126, "div", 53);
        i0.ɵɵelementStart(127, "button", 54);
        i0.ɵɵlistener("click", function IncidentRegistrationComponent_Template_button_click_127_listener() { return ctx.goBack(); });
        i0.ɵɵtext(128, "Annuler");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(129, "button", 55);
        i0.ɵɵtemplate(130, IncidentRegistrationComponent_span_130_Template, 3, 0, "span", 56);
        i0.ɵɵtemplate(131, IncidentRegistrationComponent_span_131_Template, 3, 0, "span", 56);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        let tmp_14_0;
        let tmp_15_0;
        let tmp_16_0;
        let tmp_17_0;
        let tmp_18_0;
        let tmp_19_0;
        let tmp_20_0;
        let tmp_21_0;
        let tmp_24_0;
        i0.ɵɵadvance(24);
        i0.ɵɵclassProp("loading", ctx.isImporting);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-file-import", !ctx.isImporting)("fa-circle-notch", ctx.isImporting)("fa-spin", ctx.isImporting);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.isImporting ? "Analyse en cours..." : "Importer un document");
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("loading", ctx.isImporting);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-camera", !ctx.isImporting)("fa-circle-notch", ctx.isImporting)("fa-spin", ctx.isImporting);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.isImporting ? "Analyse en cours..." : "Scanner une fiche manuscrite");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.importMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.importWarnings.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.importPreview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formGroup", ctx.incidentForm);
        i0.ɵɵadvance(11);
        i0.ɵɵclassProp("error", ((tmp_14_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_14_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_15_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_15_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !((tmp_16_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_16_0.touched));
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("error", ((tmp_17_0 = ctx.incidentForm.get("description")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx.incidentForm.get("description")) == null ? null : tmp_17_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_18_0 = ctx.incidentForm.get("description")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx.incidentForm.get("description")) == null ? null : tmp_18_0.touched));
        i0.ɵɵadvance(10);
        i0.ɵɵclassProp("error", ((tmp_19_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_19_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_20_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_20_0.invalid) && ((tmp_20_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_20_0.touched));
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("error", ((tmp_21_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_21_0.invalid) && ((tmp_21_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_21_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.departments);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_24_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_24_0.invalid) && ((tmp_24_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_24_0.touched));
        i0.ɵɵadvance(23);
        i0.ɵɵproperty("value", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.risks);
        i0.ɵɵadvance(16);
        i0.ɵɵclassProp("has-file", ctx.selectedFile);
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("fa-file-upload", !ctx.selectedFile)("fa-file-check", ctx.selectedFile);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedFile ? ctx.selectedFile.name : "Cliquez pour ajouter un document");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedFile);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("loading", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSubmitting);
    } }, directives: [i6.NgIf, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i1.SelectControlValueAccessor, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i6.NgForOf], styles: [".registration-container[_ngcontent-%COMP%] {\n    max-width: 900px;\n    margin: 20px auto;\n    padding: 40px;\n}\n\n.import-panel[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1.8fr auto;\n    gap: 20px;\n    margin-bottom: 32px;\n    padding: 22px 24px;\n    border: 1px solid #dbeafe;\n    border-radius: 18px;\n    background:\n        radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 35%),\n        linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);\n}\n\n.import-copy[_ngcontent-%COMP%] {\n    h3 {\n        margin: 0 0 8px;\n        color: #0f172a;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    }\n\n    p, small {\n        display: block;\n        margin: 0;\n        color: #475569;\n    }\n\n    small {\n        margin-top: 8px;\n        color: #64748b;\n    }\n}\n\n.import-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 12px;\n    flex-wrap: wrap;\n}\n\n.btn-import[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    padding: 13px 18px;\n    border-radius: 12px;\n    background: #0f172a;\n    color: #fff;\n    font-weight: 700;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 12px 25px rgba(15, 23, 42, 0.18);\n    }\n\n    &.loading {\n        cursor: wait;\n        opacity: 0.85;\n        transform: none;\n    }\n}\n\n.btn-scan[_ngcontent-%COMP%] {\n    background: #0f172a;\n}\n\n.import-message[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    margin: -4px 0 0;\n    font-size: 0.88rem;\n    color: #0f766e;\n    font-weight: 600;\n}\n\n.import-warning-list[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    border-radius: 14px;\n    padding: 14px 16px;\n}\n\n.import-warning-list[_ngcontent-%COMP%] {\n    margin-top: -4px;\n    background: #fff7ed;\n    border: 1px solid #fdba74;\n    color: #9a3412;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    line-height: 1.5;\n    font-size: 0.88rem;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n    margin-top: 6px;\n}\n\n.import-preview[_ngcontent-%COMP%] {\n    background: rgba(255, 255, 255, 0.95);\n    border: 1px solid #bfdbfe;\n}\n\n.import-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 8px;\n    color: #0f172a;\n}\n\n.premium-form[_ngcontent-%COMP%] {\n    .form-grid {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 40px;\n    }\n    .form-section.full { grid-column: span 2; }\n    \n    .section-title {\n        font-size: 1.1rem; color: #1e293b; margin-bottom: 25px; font-weight: 700; display: flex; align-items: center; gap: 12px;\n        i { color: #004a99; }\n    }\n\n    .field {\n        margin-bottom: 25px;\n        label { display: block; margin-bottom: 8px; font-weight: 600; color: #475569; font-size: 0.9rem; }\n        .required { color: #ef4444; margin-left: 2px; }\n        .hint { display: block; margin-top: 6px; color: #94a3b8; font-size: 0.8rem; }\n    }\n}\n\n.premium-input[_ngcontent-%COMP%] {\n    width: 100%; padding: 14px 18px; border-radius: 14px; border: 1.5px solid #e2e8f0; font-size: 0.95rem; color: #1e293b; background: #fff; transition: all 0.3s ease;\n    &:focus { border-color: #3b82f6; box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.1); outline: none; background: #fff; }\n    &.error { border-color: #ef4444; background: #fffcfc; &:focus { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0.1); } }\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(15px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in[_ngcontent-%COMP%] {\n    animation: fadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;\n}\n\n.error-msg[_ngcontent-%COMP%] { color: #ef4444; font-size: 0.75rem; font-weight: 600; margin-top: 5px; display: block; }\n\n.premium-file-upload[_ngcontent-%COMP%] {\n    border: 2px dashed #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: #f8fafc; display: flex; align-items: center; justify-content: center; gap: 15px; position: relative;\n    label { margin: 0; cursor: pointer; display: flex; align-items: center; gap: 10px; color: #64748b; font-weight: 600; }\n    &:hover { border-color: #004a99; background: #f0f7ff; }\n    &.has-file { border-color: #10b981; background: #ecfdf5; label { color: #065f46; } }\n}\n\n.clear-file[_ngcontent-%COMP%] {\n    position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer; padding: 5px;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n    margin-top: 40px; padding-top: 30px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 15px;\n    button { padding: 12px 30px; border-radius: 10px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; border: none; }\n    .btn-outline { background: white; border: 1px solid #e2e8f0; color: #64748b; &:hover { background: #f8fafc; } }\n    .btn-primary { \n        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); \n        color: white; \n        box-shadow: 0 8px 20px rgba(30, 64, 175, 0.25);\n        display: flex; align-items: center; justify-content: center; min-width: 250px;\n        &:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(30, 64, 175, 0.35); }\n        &:active { transform: translateY(-1px); }\n        &.loading { opacity: 0.8; cursor: wait; transform: none; box-shadow: none; }\n        .btn-content { display: flex; align-items: center; gap: 10px; }\n    }\n}\n\n@media (max-width: 768px) {\n    .registration-container[_ngcontent-%COMP%] {\n        padding: 24px;\n    }\n\n    .import-panel[_ngcontent-%COMP%], .premium-form[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .premium-form[_ngcontent-%COMP%]   .form-section.full[_ngcontent-%COMP%] {\n        grid-column: span 1;\n    }\n\n    .btn-import[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentRegistrationComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-registration',
                templateUrl: './incident-registration.component.html',
                styleUrls: ['./incident-registration.component.scss']
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.IncidentService }, { type: i3.DepartmentService }, { type: i4.RiskService }, { type: i5.Router }]; }, null); })();
//# sourceMappingURL=incident-registration.component.js.map