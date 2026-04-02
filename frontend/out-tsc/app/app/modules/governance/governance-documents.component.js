import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GovernanceService } from './governance.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./governance.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function GovernanceDocumentsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function GovernanceDocumentsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "span", 20);
    i0.ɵɵtext(3, "Role connecte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 19);
    i0.ɵɵelementStart(9, "span", 20);
    i0.ɵɵtext(10, "Dossier attribue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Chaque role consulte son propre espace documentaire.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 19);
    i0.ɵɵelementStart(16, "span", 20);
    i0.ɵɵtext(17, "Documents visibles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Disponibles depuis le bouton Ressource et le sous-module Gestion Documentaire.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.currentRole || "Utilisateur");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.canEdit ? "Acces gestion complet" : "Acces consultation uniquement");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.assignedFolderKey || "Aucun");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.totalDocuments);
} }
function GovernanceDocumentsComponent_div_18_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const folder_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", folder_r10.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(folder_r10.label);
} }
function GovernanceDocumentsComponent_div_18_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r9.feedbackType);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.feedbackMessage);
} }
function GovernanceDocumentsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Gestion des dossiers par role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Le Super Admin peut ajouter ou supprimer des documents dans n'importe quel dossier.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 23);
    i0.ɵɵelementStart(7, "div", 24);
    i0.ɵɵelementStart(8, "label", 25);
    i0.ɵɵtext(9, "Dossier cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 26);
    i0.ɵɵlistener("ngModelChange", function GovernanceDocumentsComponent_div_18_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.selectedRoleKey = $event; });
    i0.ɵɵtemplate(11, GovernanceDocumentsComponent_div_18_option_11_Template, 2, 2, "option", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 24);
    i0.ɵɵelementStart(13, "label", 28);
    i0.ɵɵtext(14, "Document");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 29);
    i0.ɵɵlistener("change", function GovernanceDocumentsComponent_div_18_Template_input_change_15_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 30);
    i0.ɵɵlistener("click", function GovernanceDocumentsComponent_div_18_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r12); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.uploadDocument(); });
    i0.ɵɵelement(17, "i", 8);
    i0.ɵɵtext(18, " Ajouter ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 31);
    i0.ɵɵtext(20, "Formats acceptes : PDF, Office, images, texte, archives ZIP.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, GovernanceDocumentsComponent_div_18_p_21_Template, 2, 2, "p", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedRoleKey);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.getUploadTargets());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r2.isUploading || !ctx_r2.selectedRoleKey || !ctx_r2.selectedFile);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r2.isUploading ? "fa-circle-notch fa-spin" : "fa-upload");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r2.feedbackMessage && !ctx_r2.isLoading);
} }
function GovernanceDocumentsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r3.feedbackType);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.feedbackMessage);
} }
function GovernanceDocumentsComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Chargement impossible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.feedbackMessage);
} }
function GovernanceDocumentsComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Chargement des ressources");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Preparation des dossiers documentaires par role.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 58);
    i0.ɵɵlistener("click", function GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_button_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r25); const document_r21 = i0.ɵɵnextContext().$implicit; const ctx_r23 = i0.ɵɵnextContext(4); return ctx_r23.deleteDocument(document_r21); });
    i0.ɵɵelement(1, "i", 59);
    i0.ɵɵtext(2, " Supprimer ");
    i0.ɵɵelementEnd();
} }
function GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 47);
    i0.ɵɵelementStart(1, "div", 48);
    i0.ɵɵelementStart(2, "div", 49);
    i0.ɵɵelement(3, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 51);
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 52);
    i0.ɵɵelementStart(13, "button", 53);
    i0.ɵɵlistener("click", function GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_Template_button_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r27); const document_r21 = restoredCtx.$implicit; const ctx_r26 = i0.ɵɵnextContext(4); return ctx_r26.openDocument(document_r21); });
    i0.ɵɵelement(14, "i", 54);
    i0.ɵɵtext(15, " Voir ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 55);
    i0.ɵɵlistener("click", function GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_Template_button_click_16_listener() { const restoredCtx = i0.ɵɵrestoreView(_r27); const document_r21 = restoredCtx.$implicit; const ctx_r28 = i0.ɵɵnextContext(4); return ctx_r28.downloadDocument(document_r21); });
    i0.ɵɵelement(17, "i", 56);
    i0.ɵɵtext(18, " Telecharger ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_button_19_Template, 3, 0, "button", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r21 = ctx.$implicit;
    const ctx_r20 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(document_r21.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r20.formatSize(document_r21.size));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Mis a jour le ", i0.ɵɵpipeBind2(11, 4, document_r21.lastModified, "short"), "");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngIf", ctx_r20.canEdit);
} }
function GovernanceDocumentsComponent_div_22_section_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtemplate(1, GovernanceDocumentsComponent_div_22_section_1_div_9_article_1_Template, 20, 7, "article", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const folder_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", folder_r16.documents);
} }
function GovernanceDocumentsComponent_div_22_section_1_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 5);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Dossier vide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Aucun document n'est encore disponible dans ce dossier.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function GovernanceDocumentsComponent_div_22_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 40);
    i0.ɵɵelementStart(1, "div", 41);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 42);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, GovernanceDocumentsComponent_div_22_section_1_div_9_Template, 2, 1, "div", 43);
    i0.ɵɵtemplate(10, GovernanceDocumentsComponent_div_22_section_1_ng_template_10_Template, 6, 0, "ng-template", null, 44, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const folder_r16 = ctx.$implicit;
    const _r18 = i0.ɵɵreference(11);
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(folder_r16.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r15.getFolderDocumentCount(folder_r16), " dans ", folder_r16.relativePath, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(folder_r16.key);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", folder_r16.documents.length > 0)("ngIfElse", _r18);
} }
function GovernanceDocumentsComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, GovernanceDocumentsComponent_div_22_section_1_Template, 12, 6, "section", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r6.folders);
} }
export class GovernanceDocumentsComponent {
    constructor(router, governanceService) {
        this.router = router;
        this.governanceService = governanceService;
        this.navItems = GOVERNANCE_NAV_ITEMS;
        this.folders = [];
        this.currentRole = '';
        this.canEdit = false;
        this.assignedFolderKey = null;
        this.selectedRoleKey = '';
        this.selectedFile = null;
        this.isLoading = false;
        this.isUploading = false;
        this.feedbackMessage = null;
        this.feedbackType = null;
    }
    ngOnInit() {
        this.loadDocuments();
    }
    get visibleNavItems() {
        return this.canEdit ? this.navItems : this.navItems.slice(0, 1);
    }
    get totalDocuments() {
        return this.folders.reduce((total, folder) => total + folder.documents.length, 0);
    }
    loadDocuments() {
        this.isLoading = true;
        this.feedbackMessage = null;
        this.feedbackType = null;
        this.governanceService.getDocuments().subscribe({
            next: response => {
                var _a;
                this.folders = response.folders;
                this.currentRole = response.role;
                this.canEdit = response.canEdit;
                this.assignedFolderKey = response.assignedFolderKey;
                this.selectedRoleKey = response.assignedFolderKey || ((_a = response.folders[0]) === null || _a === void 0 ? void 0 : _a.key) || '';
                this.isLoading = false;
            },
            error: err => {
                var _a;
                this.feedbackMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les documents.';
                this.feedbackType = 'error';
                this.isLoading = false;
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    onFileSelected(event) {
        const input = event.target;
        this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
    }
    uploadDocument() {
        if (!this.canEdit || !this.selectedRoleKey || !this.selectedFile) {
            this.feedbackMessage = 'Selectionnez un dossier et un document.';
            this.feedbackType = 'error';
            return;
        }
        this.isUploading = true;
        this.feedbackMessage = null;
        this.feedbackType = null;
        this.governanceService.uploadDocument(this.selectedRoleKey, this.selectedFile).subscribe({
            next: () => {
                this.feedbackMessage = 'Document ajoute avec succes.';
                this.feedbackType = 'success';
                this.selectedFile = null;
                this.isUploading = false;
                this.loadDocuments();
            },
            error: err => {
                var _a;
                this.feedbackMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Echec de l\'ajout du document.';
                this.feedbackType = 'error';
                this.isUploading = false;
            }
        });
    }
    openDocument(document) {
        if (document.viewUrl) {
            window.open(document.viewUrl, '_blank', 'noopener');
        }
    }
    downloadDocument(document) {
        if (document.downloadUrl) {
            window.open(document.downloadUrl, '_blank', 'noopener');
        }
    }
    deleteDocument(document) {
        if (!this.canEdit) {
            return;
        }
        const confirmed = window.confirm(`Supprimer le document "${document.name}" ?`);
        if (!confirmed) {
            return;
        }
        this.governanceService.deleteDocument(document.folderKey, document.name).subscribe({
            next: () => {
                this.feedbackMessage = 'Document supprime avec succes.';
                this.feedbackType = 'success';
                this.loadDocuments();
            },
            error: err => {
                var _a;
                this.feedbackMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Echec de la suppression du document.';
                this.feedbackType = 'error';
            }
        });
    }
    formatSize(size) {
        if (size < 1024) {
            return `${size} o`;
        }
        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} Ko`;
        }
        return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
    }
    getFolderDocumentCount(folder) {
        const count = folder.documents.length;
        return count <= 1 ? `${count} document` : `${count} documents`;
    }
    getUploadTargets() {
        return this.folders;
    }
}
GovernanceDocumentsComponent.ɵfac = function GovernanceDocumentsComponent_Factory(t) { return new (t || GovernanceDocumentsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.GovernanceService)); };
GovernanceDocumentsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceDocumentsComponent, selectors: [["app-governance-documents"]], decls: 23, vars: 9, consts: [[1, "governance-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-folder-open"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "summary-grid", 4, "ngIf"], ["class", "editor-panel", 4, "ngIf"], ["class", "status-line", 3, "ngClass", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "folders-grid", 4, "ngIf"], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "editor-panel"], [1, "editor-head"], [1, "editor-form"], [1, "field"], ["for", "role-folder"], ["id", "role-folder", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "document-upload"], ["id", "document-upload", "type", "file", 3, "change"], [1, "btn-premium", 3, "disabled", "click"], [1, "field-note"], [3, "value"], [1, "status-line", 3, "ngClass"], [1, "error-state"], [1, "fas", "fa-triangle-exclamation"], [1, "empty-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "folders-grid"], ["class", "folder-section", 4, "ngFor", "ngForOf"], [1, "folder-section"], [1, "folder-header"], [1, "folder-badge"], ["class", "documents-grid", 4, "ngIf", "ngIfElse"], ["emptyFolder", ""], [1, "documents-grid"], ["class", "doc-card", 4, "ngFor", "ngForOf"], [1, "doc-card"], [1, "doc-meta"], [1, "doc-icon"], [1, "fas", "fa-file-alt"], [1, "doc-info"], [1, "doc-actions"], [1, "action-btn", "view-btn", 3, "click"], [1, "fas", "fa-eye"], [1, "action-btn", "download-btn", 3, "click"], [1, "fas", "fa-download"], ["class", "action-btn delete-btn", 3, "click", 4, "ngIf"], [1, "action-btn", "delete-btn", 3, "click"], [1, "fas", "fa-trash"]], template: function GovernanceDocumentsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceDocumentsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Ressources documentaires");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Accedez aux documents de gouvernance par role. Le Super Admin peut gerer tous les dossiers, les autres profils ont un acces consultation uniquement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceDocumentsComponent_Template_button_click_12_listener() { return ctx.loadDocuments(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceDocumentsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, GovernanceDocumentsComponent_div_17_Template, 22, 4, "div", 11);
        i0.ɵɵtemplate(18, GovernanceDocumentsComponent_div_18_Template, 22, 5, "div", 12);
        i0.ɵɵtemplate(19, GovernanceDocumentsComponent_div_19_Template, 2, 2, "div", 13);
        i0.ɵɵtemplate(20, GovernanceDocumentsComponent_div_20_Template, 6, 1, "div", 14);
        i0.ɵɵtemplate(21, GovernanceDocumentsComponent_div_21_Template, 6, 0, "div", 15);
        i0.ɵɵtemplate(22, GovernanceDocumentsComponent_div_22_Template, 2, 1, "div", 16);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.visibleNavItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.canEdit);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedbackMessage && !ctx.canEdit && !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.feedbackType === "error" && !ctx.isLoading && ctx.folders.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.folders.length > 0);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, i4.NgSelectOption, i4.ɵNgSelectMultipleOption], pipes: [i3.DatePipe], styles: ["@import './governance-shared';\n\n.governance-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.governance-tabs[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  margin-top: -8px;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 1.5rem;\n  color: #0f172a;\n}\n\n.header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n}\n\n.back-btn[_ngcontent-%COMP%], .btn-refresh[_ngcontent-%COMP%], .btn-premium[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  font-weight: 700;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.back-btn[_ngcontent-%COMP%], .btn-refresh[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: #ffffff;\n  border: 1px solid #dbe3ee;\n  color: #0f172a;\n}\n\n.btn-premium[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  background: linear-gradient(135deg, #0f766e 0%, #0f172a 100%);\n  color: #ffffff;\n}\n\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.summary-card[_ngcontent-%COMP%], .editor-panel[_ngcontent-%COMP%], .folder-section[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 18px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n\n.summary-card[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 10px;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #0f766e;\n}\n\n.summary-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 1.55rem;\n  color: #0f172a;\n}\n\n.summary-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n}\n\n.editor-panel[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.editor-head[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n}\n\n.editor-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 1.15rem;\n}\n\n.editor-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n}\n\n.editor-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(220px, 280px) 1fr auto;\n  gap: 14px;\n  align-items: end;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   input[type=\"file\"][_ngcontent-%COMP%] {\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n  padding: 12px 14px;\n  background: #f8fafc;\n  color: #0f172a;\n}\n\n.field-note[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  color: #64748b;\n  font-size: 0.92rem;\n}\n\n.status-line[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-weight: 600;\n}\n\n.status-line.error[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.status-line.success[_ngcontent-%COMP%] {\n  color: #0f766e;\n}\n\n.folders-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n\n.folder-section[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n\n.folder-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 14px;\n  margin-bottom: 18px;\n}\n\n.folder-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 1.15rem;\n}\n\n.folder-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n}\n\n.folder-badge[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 999px;\n  background: #eff6ff;\n  color: #1d4ed8;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.documents-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n.doc-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  padding: 18px;\n  border-radius: 16px;\n  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n  border: 1px solid #e2e8f0;\n}\n\n.doc-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  align-items: flex-start;\n}\n\n.doc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0f766e 0%, #0f172a 100%);\n  color: #ffffff;\n  font-size: 1.2rem;\n}\n\n.doc-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.doc-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 1rem;\n  line-height: 1.4;\n  color: #0f172a;\n  word-break: break-word;\n}\n\n.doc-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: #64748b;\n  font-size: 0.9rem;\n}\n\n.doc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n}\n\n.back-btn[_ngcontent-%COMP%]:hover, .btn-refresh[_ngcontent-%COMP%]:hover, .btn-premium[_ngcontent-%COMP%]:hover, .action-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);\n}\n\n.view-btn[_ngcontent-%COMP%] {\n  background: #0f172a;\n  color: #ffffff;\n}\n\n.download-btn[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n\n.delete-btn[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.empty-state[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%] {\n  padding: 36px 24px;\n  text-align: center;\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px dashed #cbd5e1;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #64748b;\n  margin-bottom: 10px;\n}\n\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n}\n\n@media (max-width: 900px) {\n  .page-header[_ngcontent-%COMP%], .header-left[_ngcontent-%COMP%], .folder-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .editor-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceDocumentsComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance-documents',
                templateUrl: './governance-documents.component.html',
                styleUrls: ['./governance-documents.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.GovernanceService }]; }, null); })();
//# sourceMappingURL=governance-documents.component.js.map