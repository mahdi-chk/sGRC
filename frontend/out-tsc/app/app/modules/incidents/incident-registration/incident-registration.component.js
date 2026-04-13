import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncidentService, IncidentStatus } from '../../../core/services/incident.service';
import { DepartmentService } from '../../../core/services/department.service';
import { RiskService } from '../../../core/services/risk.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/incident.service";
import * as i3 from "../../../core/services/department.service";
import * as i4 from "../../../core/services/risk.service";
import * as i5 from "@angular/router";
import * as i6 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function IncidentRegistrationComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r16.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r16.label, " ");
} }
function IncidentRegistrationComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 74);
    i0.ɵɵtemplate(1, IncidentRegistrationComponent_nav_11_a_1_Template, 2, 4, "a", 75);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function IncidentRegistrationComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵelement(2, "i", 77);
    i0.ɵɵtext(3, " Piece prete");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedFile.name);
} }
function IncidentRegistrationComponent_p_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.importMessage);
} }
function IncidentRegistrationComponent_div_80_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r18 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(warning_r18);
} }
function IncidentRegistrationComponent_div_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵtemplate(1, IncidentRegistrationComponent_div_80_p_1_Template, 2, 1, "p", 80);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.importWarnings);
} }
function IncidentRegistrationComponent_div_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2, "Apercu OCR");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.importPreview);
} }
function IncidentRegistrationComponent_small_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 82);
    i0.ɵɵtext(1, "Le titre est requis (min 5 caracteres).");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 63);
    i0.ɵɵtext(1, "Soyez concis et explicite.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 82);
    i0.ɵɵtext(1, "Une description detaillee est requise (min 10 caracteres).");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_small_125_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 82);
    i0.ɵɵtext(1, "Le domaine est requis.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_option_134_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r19.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(d_r19.nom);
} }
function IncidentRegistrationComponent_small_135_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 82);
    i0.ɵɵtext(1, "Le departement est requis.");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_option_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r20.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", r_r20.titre, " (Criticite: ", r_r20.niveauRisque, ")");
} }
function IncidentRegistrationComponent_button_188_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function IncidentRegistrationComponent_button_188_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.selectedFile = null; });
    i0.ɵɵelement(1, "i", 84);
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_span_195_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵelement(1, "i", 86);
    i0.ɵɵtext(2, " Confirmer la Declaration ");
    i0.ɵɵelementEnd();
} }
function IncidentRegistrationComponent_span_196_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵelement(1, "i", 87);
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
        this.currentUserRole = getStoredIncidentRole();
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
    get navItems() {
        return getIncidentNavItems(this.currentUserRole);
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
IncidentRegistrationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentRegistrationComponent, selectors: [["app-incident-registration"]], decls: 197, vars: 55, consts: [[1, "incident-page", "registration-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-plus-circle"], ["class", "incident-tabs", 4, "ngIf"], [1, "registration-hero", "animate-fade-in"], [1, "hero-main"], [1, "hero-badge"], [1, "hero-aside"], [1, "hero-stat"], [1, "hero-stat", "accent"], [1, "registration-shell", "animate-fade-in"], [1, "registration-sidebar"], [1, "sidebar-card", "highlight"], [1, "fas", "fa-file-import"], [1, "sidebar-card", "compact"], [1, "fas", "fa-lightbulb"], [1, "sidebar-list"], ["class", "sidebar-card compact", 4, "ngIf"], [1, "registration-container", "card", "shadow-premium"], [1, "import-panel"], [1, "import-copy"], [1, "fas", "fa-magic"], [1, "import-actions"], ["type", "file", "id", "incidentImportInput", "hidden", "", "accept", ".xls,.xlsx,.xlsm,.pdf,.jpg,.jpeg,.png", 3, "change"], ["type", "file", "id", "incidentScanInput", "hidden", "", "accept", "image/*", "capture", "environment", 3, "change"], ["for", "incidentImportInput", 1, "btn-import"], [1, "fas"], ["for", "incidentScanInput", 1, "btn-import", "btn-scan"], ["class", "import-message", 4, "ngIf"], ["class", "import-warning-list", 4, "ngIf"], ["class", "import-preview", 4, "ngIf"], [1, "premium-form", 3, "formGroup", "ngSubmit"], [1, "form-grid"], [1, "form-section", "full", "surface-tone"], [1, "section-header"], [1, "section-step"], [1, "section-title"], [1, "fas", "fa-info-circle"], [1, "field"], [1, "required"], ["type", "text", "formControlName", "titre", "placeholder", "Ex: Panne de climatisation salle serveur", 1, "premium-input"], ["class", "error-msg", 4, "ngIf"], ["class", "hint", 4, "ngIf"], ["formControlName", "description", "rows", "6", "placeholder", "Decrivez les faits, les premiers impacts constates...", 1, "premium-input"], [1, "form-section", "surface-soft"], [1, "fas", "fa-map-marker-alt"], ["type", "text", "formControlName", "domaine", "placeholder", "Ex: Informatique, Logistique, Juridique...", 1, "premium-input"], ["formControlName", "departementId", 1, "premium-input"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "niveauRisque", 1, "premium-input"], ["value", ""], ["value", "Faible"], ["value", "Moyen"], ["value", "\u00C3\u2030lev\u00C3\u00A9"], ["value", "Critique"], ["value", "Significatif"], ["value", "Limit\u00C3\u00A9"], [1, "field", "mt-3"], ["formControlName", "riskId", 1, "premium-input"], [1, "hint"], [1, "fas", "fa-calendar-alt"], ["type", "date", "formControlName", "dateSurvenance", 1, "premium-input"], [1, "premium-file-upload"], ["type", "file", "id", "fileInput", "hidden", "", "accept", ".xls,.xlsx,.xlsm,.pdf,.jpg,.jpeg,.png,.docx", 3, "change"], ["for", "fileInput"], ["type", "button", "class", "clear-file", 3, "click", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-outline", 3, "click"], ["type", "submit", 1, "btn-primary"], ["class", "btn-content", 4, "ngIf"], [1, "incident-tabs"], ["routerLinkActive", "active", "class", "incident-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "incident-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "fas", "fa-paperclip"], [1, "import-message"], [1, "import-warning-list"], [4, "ngFor", "ngForOf"], [1, "import-preview"], [1, "error-msg"], ["type", "button", 1, "clear-file", 3, "click"], [1, "fas", "fa-times"], [1, "btn-content"], [1, "fas", "fa-check-circle"], [1, "fas", "fa-circle-notch", "fa-spin"]], template: function IncidentRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtemplate(11, IncidentRegistrationComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "section", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "span", 9);
        i0.ɵɵtext(15, "Declaration guidee");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "h2");
        i0.ɵɵtext(17, "Capturez les incidents rapidement avec un parcours plus clair et plus visuel.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "p");
        i0.ɵɵtext(19, "Le formulaire conserve les memes champs, mais l experience met maintenant en avant les points critiques: contexte, niveau, preuves et rattachement au risque.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 10);
        i0.ɵɵelementStart(21, "div", 11);
        i0.ɵɵelementStart(22, "span");
        i0.ɵɵtext(23, "Departements disponibles");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "strong");
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "div", 11);
        i0.ɵɵelementStart(27, "span");
        i0.ɵɵtext(28, "Risques exploitables");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "strong");
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 12);
        i0.ɵɵelementStart(32, "span");
        i0.ɵɵtext(33, "Mode de saisie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "strong");
        i0.ɵɵtext(35, "Formulaire + OCR");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 13);
        i0.ɵɵelementStart(37, "aside", 14);
        i0.ɵɵelementStart(38, "div", 15);
        i0.ɵɵelementStart(39, "h3");
        i0.ɵɵelement(40, "i", 16);
        i0.ɵɵtext(41, " Import intelligent");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "p");
        i0.ɵɵtext(43, "Importez une fiche incident Excel, PDF ou image pour preremplir le formulaire. Les scans manuscrits restent traites avec prudence.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "small");
        i0.ɵɵtext(45, "Formats acceptes: `.xls`, `.xlsx`, `.xlsm`, `.pdf`, `.jpg`, `.jpeg`, `.png`.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 17);
        i0.ɵɵelementStart(47, "h3");
        i0.ɵɵelement(48, "i", 18);
        i0.ɵɵtext(49, " Bonnes pratiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "ul", 19);
        i0.ɵɵelementStart(51, "li");
        i0.ɵɵtext(52, "Donnez un titre court, precis et facilement searchable.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "li");
        i0.ɵɵtext(54, "Decrivez les faits constates avant les hypotheses.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "li");
        i0.ɵɵtext(56, "Ajoutez une preuve ou un document source si possible.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "li");
        i0.ɵɵtext(58, "Liez l incident a un risque existant pour enrichir l analyse.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(59, IncidentRegistrationComponent_div_59_Template, 6, 1, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 21);
        i0.ɵɵelementStart(61, "div", 22);
        i0.ɵɵelementStart(62, "div", 23);
        i0.ɵɵelementStart(63, "h3");
        i0.ɵɵelement(64, "i", 24);
        i0.ɵɵtext(65, " Creer depuis un document");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "p");
        i0.ɵɵtext(67, "Importez une fiche existante pour accelerer la declaration et limiter les ressaisies manuelles.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "div", 25);
        i0.ɵɵelementStart(69, "input", 26);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_69_listener($event) { return ctx.onImportFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "input", 27);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_70_listener($event) { return ctx.onImportFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "label", 28);
        i0.ɵɵelement(72, "i", 29);
        i0.ɵɵelementStart(73, "span");
        i0.ɵɵtext(74);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "label", 30);
        i0.ɵɵelement(76, "i", 29);
        i0.ɵɵelementStart(77, "span");
        i0.ɵɵtext(78);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(79, IncidentRegistrationComponent_p_79_Template, 2, 1, "p", 31);
        i0.ɵɵtemplate(80, IncidentRegistrationComponent_div_80_Template, 2, 1, "div", 32);
        i0.ɵɵtemplate(81, IncidentRegistrationComponent_div_81_Template, 5, 1, "div", 33);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "form", 34);
        i0.ɵɵlistener("ngSubmit", function IncidentRegistrationComponent_Template_form_ngSubmit_82_listener() { return ctx.submitIncident(); });
        i0.ɵɵelementStart(83, "div", 35);
        i0.ɵɵelementStart(84, "div", 36);
        i0.ɵɵelementStart(85, "div", 37);
        i0.ɵɵelementStart(86, "span", 38);
        i0.ɵɵtext(87, "01");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(88, "div");
        i0.ɵɵelementStart(89, "h3", 39);
        i0.ɵɵelement(90, "i", 40);
        i0.ɵɵtext(91, " Informations Generales");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(92, "p");
        i0.ɵɵtext(93, "Posez le contexte de l incident avec un titre clair et une description exploitable.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(94, "div", 41);
        i0.ɵɵelementStart(95, "label");
        i0.ɵɵtext(96, "Titre de l'incident ");
        i0.ɵɵelementStart(97, "span", 42);
        i0.ɵɵtext(98, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(99, "input", 43);
        i0.ɵɵtemplate(100, IncidentRegistrationComponent_small_100_Template, 2, 0, "small", 44);
        i0.ɵɵtemplate(101, IncidentRegistrationComponent_small_101_Template, 2, 0, "small", 45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "div", 41);
        i0.ɵɵelementStart(103, "label");
        i0.ɵɵtext(104, "Description Detaillee ");
        i0.ɵɵelementStart(105, "span", 42);
        i0.ɵɵtext(106, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(107, "textarea", 46);
        i0.ɵɵtemplate(108, IncidentRegistrationComponent_small_108_Template, 2, 0, "small", 44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(109, "div", 47);
        i0.ɵɵelementStart(110, "div", 37);
        i0.ɵɵelementStart(111, "span", 38);
        i0.ɵɵtext(112, "02");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(113, "div");
        i0.ɵɵelementStart(114, "h3", 39);
        i0.ɵɵelement(115, "i", 48);
        i0.ɵɵtext(116, " Contexte & Localisation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(117, "p");
        i0.ɵɵtext(118, "Identifiez le domaine, le departement et le niveau de criticite observe.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(119, "div", 41);
        i0.ɵɵelementStart(120, "label");
        i0.ɵɵtext(121, "Domaine / Nature ");
        i0.ɵɵelementStart(122, "span", 42);
        i0.ɵɵtext(123, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(124, "input", 49);
        i0.ɵɵtemplate(125, IncidentRegistrationComponent_small_125_Template, 2, 0, "small", 44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(126, "div", 41);
        i0.ɵɵelementStart(127, "label");
        i0.ɵɵtext(128, "Departement Concerne ");
        i0.ɵɵelementStart(129, "span", 42);
        i0.ɵɵtext(130, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(131, "select", 50);
        i0.ɵɵelementStart(132, "option", 51);
        i0.ɵɵtext(133, "Selectionnez un departement...");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(134, IncidentRegistrationComponent_option_134_Template, 2, 2, "option", 52);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(135, IncidentRegistrationComponent_small_135_Template, 2, 0, "small", 44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(136, "div", 41);
        i0.ɵɵelementStart(137, "label");
        i0.ɵɵtext(138, "Niveau (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(139, "select", 53);
        i0.ɵɵelementStart(140, "option", 54);
        i0.ɵɵtext(141, "Selectionnez un niveau...");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(142, "option", 55);
        i0.ɵɵtext(143, "Faible");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(144, "option", 56);
        i0.ɵɵtext(145, "Moyen");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(146, "option", 57);
        i0.ɵɵtext(147, "\u00C3\u2030lev\u00C3\u00A9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(148, "option", 58);
        i0.ɵɵtext(149, "Critique");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(150, "option", 59);
        i0.ɵɵtext(151, "Significatif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(152, "option", 60);
        i0.ɵɵtext(153, "Limit\u00C3\u00A9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(154, "div", 61);
        i0.ɵɵelementStart(155, "label");
        i0.ɵɵtext(156, "Lien avec un Risque (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(157, "select", 62);
        i0.ɵɵelementStart(158, "option", 51);
        i0.ɵɵtext(159, "Aucun lien direct");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(160, IncidentRegistrationComponent_option_160_Template, 2, 3, "option", 52);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(161, "small", 63);
        i0.ɵɵtext(162, "Associer l'incident a un risque de la cartographie pour une meilleure analyse.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(163, "div", 47);
        i0.ɵɵelementStart(164, "div", 37);
        i0.ɵɵelementStart(165, "span", 38);
        i0.ɵɵtext(166, "03");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(167, "div");
        i0.ɵɵelementStart(168, "h3", 39);
        i0.ɵɵelement(169, "i", 64);
        i0.ɵɵtext(170, " Temporalite & Preuves");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(171, "p");
        i0.ɵɵtext(172, "Documentez la date de survenance et joignez les elements justificatifs disponibles.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(173, "div", 41);
        i0.ɵɵelementStart(174, "label");
        i0.ɵɵtext(175, "Date de survenance ");
        i0.ɵɵelementStart(176, "span", 42);
        i0.ɵɵtext(177, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(178, "input", 65);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(179, "div", 41);
        i0.ɵɵelementStart(180, "label");
        i0.ɵɵtext(181, "Piece Jointe / Photo (Optionnel)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(182, "div", 66);
        i0.ɵɵelementStart(183, "input", 67);
        i0.ɵɵlistener("change", function IncidentRegistrationComponent_Template_input_change_183_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(184, "label", 68);
        i0.ɵɵelement(185, "i", 29);
        i0.ɵɵelementStart(186, "span");
        i0.ɵɵtext(187);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(188, IncidentRegistrationComponent_button_188_Template, 2, 0, "button", 69);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(189, "small", 63);
        i0.ɵɵtext(190, "Le fichier importe est conserve comme piece jointe si vous confirmez la declaration.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(191, "div", 70);
        i0.ɵɵelementStart(192, "button", 71);
        i0.ɵɵlistener("click", function IncidentRegistrationComponent_Template_button_click_192_listener() { return ctx.goBack(); });
        i0.ɵɵtext(193, "Annuler");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(194, "button", 72);
        i0.ɵɵtemplate(195, IncidentRegistrationComponent_span_195_Template, 3, 0, "span", 73);
        i0.ɵɵtemplate(196, IncidentRegistrationComponent_span_196_Template, 3, 0, "span", 73);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        let tmp_18_0;
        let tmp_19_0;
        let tmp_20_0;
        let tmp_21_0;
        let tmp_22_0;
        let tmp_23_0;
        let tmp_24_0;
        let tmp_25_0;
        let tmp_28_0;
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(14);
        i0.ɵɵtextInterpolate(ctx.departments.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.risks.length);
        i0.ɵɵadvance(29);
        i0.ɵɵproperty("ngIf", ctx.selectedFile);
        i0.ɵɵadvance(12);
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
        i0.ɵɵadvance(17);
        i0.ɵɵclassProp("error", ((tmp_18_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_18_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_19_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_19_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !((tmp_20_0 = ctx.incidentForm.get("titre")) == null ? null : tmp_20_0.touched));
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("error", ((tmp_21_0 = ctx.incidentForm.get("description")) == null ? null : tmp_21_0.invalid) && ((tmp_21_0 = ctx.incidentForm.get("description")) == null ? null : tmp_21_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_22_0 = ctx.incidentForm.get("description")) == null ? null : tmp_22_0.invalid) && ((tmp_22_0 = ctx.incidentForm.get("description")) == null ? null : tmp_22_0.touched));
        i0.ɵɵadvance(16);
        i0.ɵɵclassProp("error", ((tmp_23_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_23_0.invalid) && ((tmp_23_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_23_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_24_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_24_0.invalid) && ((tmp_24_0 = ctx.incidentForm.get("domaine")) == null ? null : tmp_24_0.touched));
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("error", ((tmp_25_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_25_0.invalid) && ((tmp_25_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_25_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.departments);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_28_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_28_0.invalid) && ((tmp_28_0 = ctx.incidentForm.get("departementId")) == null ? null : tmp_28_0.touched));
        i0.ɵɵadvance(23);
        i0.ɵɵproperty("value", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.risks);
        i0.ɵɵadvance(22);
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
    } }, directives: [i6.NgIf, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i1.SelectControlValueAccessor, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i6.NgForOf, i5.RouterLinkWithHref, i5.RouterLinkActive], styles: ["@import '../incident-shared';\n\n.registration-hero[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);\n    gap: 20px;\n    margin: 0 auto 24px;\n    max-width: 1320px;\n    padding: 28px 30px;\n    border-radius: 26px;\n    background:\n        radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 30%),\n        linear-gradient(135deg, #082f49 0%, #0f766e 45%, #22c55e 100%);\n    color: #fff;\n    box-shadow: 0 20px 45px rgba(8, 47, 73, 0.18);\n}\n\n.hero-main[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin: 10px 0 12px;\n    font-size: 2rem;\n    line-height: 1.15;\n}\n\n.hero-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    max-width: 720px;\n    color: rgba(255, 255, 255, 0.84);\n    line-height: 1.6;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    padding: 8px 12px;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.14);\n    font-size: 0.74rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n}\n\n.hero-aside[_ngcontent-%COMP%] {\n    display: grid;\n    gap: 12px;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n    padding: 18px 20px;\n    border-radius: 18px;\n    background: rgba(255, 255, 255, 0.12);\n    border: 1px solid rgba(255, 255, 255, 0.18);\n    backdrop-filter: blur(10px);\n}\n\n.hero-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: block;\n    color: rgba(255, 255, 255, 0.72);\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.hero-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 6px;\n    font-size: 1.7rem;\n}\n\n.hero-stat.accent[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.15rem;\n}\n\n.registration-shell[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 300px minmax(0, 1fr);\n    gap: 24px;\n    align-items: start;\n    max-width: 1320px;\n    margin: 0 auto;\n}\n\n.registration-sidebar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 18px;\n    position: sticky;\n    top: 24px;\n}\n\n.sidebar-card[_ngcontent-%COMP%] {\n    padding: 22px 20px;\n    border-radius: 20px;\n    background: #fff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);\n}\n\n.sidebar-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    margin: 0 0 10px;\n    color: #0f172a;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.sidebar-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .sidebar-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    color: #64748b;\n}\n\n.sidebar-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    line-height: 1.6;\n}\n\n.sidebar-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 10px;\n}\n\n.sidebar-card.highlight[_ngcontent-%COMP%] {\n    background:\n        radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 34%),\n        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n}\n\n.sidebar-list[_ngcontent-%COMP%] {\n    margin: 0;\n    padding-left: 18px;\n    color: #475569;\n    display: grid;\n    gap: 10px;\n}\n\n.registration-container[_ngcontent-%COMP%] {\n    max-width: none;\n    margin: 0;\n    padding: 40px;\n    border-radius: 26px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, #f8fafc 100%);\n    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);\n}\n\n.import-panel[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1.8fr auto;\n    gap: 20px;\n    margin-bottom: 32px;\n    padding: 22px 24px;\n    border: 1px solid #dbeafe;\n    border-radius: 18px;\n    background:\n        radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 35%),\n        linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);\n}\n\n.import-copy[_ngcontent-%COMP%] {\n    h3 {\n        margin: 0 0 8px;\n        color: #0f172a;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    }\n\n    p,\n    small {\n        display: block;\n        margin: 0;\n        color: #475569;\n    }\n\n    small {\n        margin-top: 8px;\n        color: #64748b;\n    }\n}\n\n.import-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 12px;\n    flex-wrap: wrap;\n}\n\n.btn-import[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    padding: 13px 18px;\n    border-radius: 12px;\n    background: #0f172a;\n    color: #fff;\n    font-weight: 700;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 12px 25px rgba(15, 23, 42, 0.18);\n    }\n\n    &.loading {\n        cursor: wait;\n        opacity: 0.85;\n        transform: none;\n    }\n}\n\n.btn-scan[_ngcontent-%COMP%] {\n    background: #0f172a;\n}\n\n.import-message[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    margin: -4px 0 0;\n    font-size: 0.88rem;\n    color: #0f766e;\n    font-weight: 600;\n}\n\n.import-warning-list[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    border-radius: 14px;\n    padding: 14px 16px;\n}\n\n.import-warning-list[_ngcontent-%COMP%] {\n    margin-top: -4px;\n    background: #fff7ed;\n    border: 1px solid #fdba74;\n    color: #9a3412;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .import-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    line-height: 1.5;\n    font-size: 0.88rem;\n}\n\n.import-warning-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n    margin-top: 6px;\n}\n\n.import-preview[_ngcontent-%COMP%] {\n    background: rgba(255, 255, 255, 0.95);\n    border: 1px solid #bfdbfe;\n}\n\n.import-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 8px;\n    color: #0f172a;\n}\n\n.premium-form[_ngcontent-%COMP%] {\n    .form-grid {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 40px;\n    }\n\n    .form-section.full {\n        grid-column: span 2;\n    }\n\n    .form-section {\n        padding: 26px;\n        border-radius: 22px;\n        border: 1px solid #e2e8f0;\n        background: #fff;\n    }\n\n    .surface-tone {\n        background:\n            radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 32%),\n            linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);\n    }\n\n    .surface-soft {\n        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    }\n\n    .section-header {\n        display: flex;\n        align-items: flex-start;\n        gap: 14px;\n        margin-bottom: 22px;\n\n        p {\n            margin: 6px 0 0;\n            color: #64748b;\n            line-height: 1.5;\n            font-size: 0.9rem;\n        }\n    }\n\n    .section-step {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 40px;\n        height: 40px;\n        min-width: 40px;\n        border-radius: 14px;\n        background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);\n        color: #fff;\n        font-weight: 800;\n        box-shadow: 0 10px 20px rgba(20, 184, 166, 0.24);\n    }\n\n    .section-title {\n        font-size: 1.1rem;\n        color: #1e293b;\n        margin: 0;\n        font-weight: 700;\n        display: flex;\n        align-items: center;\n        gap: 12px;\n\n        i {\n            color: #004a99;\n        }\n    }\n\n    .field {\n        margin-bottom: 25px;\n\n        label {\n            display: block;\n            margin-bottom: 8px;\n            font-weight: 600;\n            color: #475569;\n            font-size: 0.9rem;\n        }\n\n        .required {\n            color: #ef4444;\n            margin-left: 2px;\n        }\n\n        .hint {\n            display: block;\n            margin-top: 6px;\n            color: #94a3b8;\n            font-size: 0.8rem;\n        }\n    }\n}\n\n.premium-input[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 14px 18px;\n    border-radius: 14px;\n    border: 1.5px solid #e2e8f0;\n    font-size: 0.95rem;\n    color: #1e293b;\n    background: #fff;\n    transition: all 0.3s ease;\n\n    &:focus {\n        border-color: #3b82f6;\n        box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.1);\n        outline: none;\n        background: #fff;\n    }\n\n    &.error {\n        border-color: #ef4444;\n        background: #fffcfc;\n\n        &:focus {\n            box-shadow: 0 0 0 5px rgba(239, 68, 68, 0.1);\n        }\n    }\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(15px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in[_ngcontent-%COMP%] {\n    animation: fadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;\n}\n\n.error-msg[_ngcontent-%COMP%] {\n    color: #ef4444;\n    font-size: 0.75rem;\n    font-weight: 600;\n    margin-top: 5px;\n    display: block;\n}\n\n.premium-file-upload[_ngcontent-%COMP%] {\n    border: 2px dashed #e2e8f0;\n    border-radius: 12px;\n    padding: 20px;\n    text-align: center;\n    cursor: pointer;\n    transition: all 0.2s;\n    background: #f8fafc;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 15px;\n    position: relative;\n\n    label {\n        margin: 0;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        color: #64748b;\n        font-weight: 600;\n    }\n\n    &:hover {\n        border-color: #004a99;\n        background: #f0f7ff;\n    }\n\n    &.has-file {\n        border-color: #10b981;\n        background: #ecfdf5;\n\n        label {\n            color: #065f46;\n        }\n    }\n}\n\n.clear-file[_ngcontent-%COMP%] {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    background: none;\n    border: none;\n    color: #ef4444;\n    font-size: 1.1rem;\n    cursor: pointer;\n    padding: 5px;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n    margin-top: 40px;\n    padding-top: 30px;\n    border-top: 1px solid #f1f5f9;\n    display: flex;\n    justify-content: flex-end;\n    gap: 15px;\n\n    button {\n        padding: 12px 30px;\n        border-radius: 10px;\n        font-weight: 700;\n        font-size: 1rem;\n        cursor: pointer;\n        transition: all 0.2s;\n        border: none;\n    }\n\n    .btn-outline {\n        background: white;\n        border: 1px solid #e2e8f0;\n        color: #64748b;\n\n        &:hover {\n            background: #f8fafc;\n        }\n    }\n\n    .btn-primary {\n        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);\n        color: white;\n        box-shadow: 0 8px 20px rgba(30, 64, 175, 0.25);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        min-width: 250px;\n\n        &:hover {\n            transform: translateY(-3px);\n            box-shadow: 0 12px 25px rgba(30, 64, 175, 0.35);\n        }\n\n        &:active {\n            transform: translateY(-1px);\n        }\n\n        &.loading {\n            opacity: 0.8;\n            cursor: wait;\n            transform: none;\n            box-shadow: none;\n        }\n\n        .btn-content {\n            display: flex;\n            align-items: center;\n            gap: 10px;\n        }\n    }\n}\n\n@media (max-width: 960px) {\n    .registration-hero[_ngcontent-%COMP%], .registration-shell[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .registration-sidebar[_ngcontent-%COMP%] {\n        position: static;\n    }\n}\n\n@media (max-width: 768px) {\n    .registration-container[_ngcontent-%COMP%] {\n        padding: 24px;\n    }\n\n    .import-panel[_ngcontent-%COMP%], .premium-form[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .premium-form[_ngcontent-%COMP%]   .form-section.full[_ngcontent-%COMP%] {\n        grid-column: span 1;\n    }\n\n    .btn-import[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n    }\n\n    .premium-form[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%] {\n        padding: 22px;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentRegistrationComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-registration',
                templateUrl: './incident-registration.component.html',
                styleUrls: ['./incident-registration.component.scss']
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.IncidentService }, { type: i3.DepartmentService }, { type: i4.RiskService }, { type: i5.Router }]; }, null); })();
//# sourceMappingURL=incident-registration.component.js.map