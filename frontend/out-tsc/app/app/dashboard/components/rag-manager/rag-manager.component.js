import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SettingsService } from '../../../core/services/settings.service';
import { AIService } from '../../../core/services/ai.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/settings.service";
import * as i2 from "../../../core/services/ai.service";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
function RagManagerComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("error", ctx_r0.saveMessage.includes("Erreur"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.saveMessage, " ");
} }
function RagManagerComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtext(1, "Glissez-deposez ici ou parcourez vos fichiers");
    i0.ɵɵelementEnd();
} }
function RagManagerComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtext(1, "Transfert et analyse RAG en cours...");
    i0.ɵɵelementEnd();
} }
function RagManagerComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1, " Support : PDF, DOCX - Max 15 MB / fichier ");
    i0.ɵɵelementEnd();
} }
function RagManagerComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "div", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("width", ctx_r5.uploadProgress, "%");
} }
function RagManagerComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r6.uploadProgress, "% effectue");
} }
function RagManagerComponent_span_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r7.documents.length, " indexes");
} }
function RagManagerComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "Chargement du repertoire... ");
    i0.ɵɵelementEnd();
} }
function RagManagerComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "Aucun document trouve dans ce repertoire.");
    i0.ɵɵelement(4, "br");
    i0.ɵɵelementStart(5, "span", 39);
    i0.ɵɵtext(6, "Commencez par en importer un.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function RagManagerComponent_div_43_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelementStart(1, "div", 43);
    i0.ɵɵelement(2, "i", 44);
    i0.ɵɵelementStart(3, "div", 45);
    i0.ɵɵelementStart(4, "span", 46);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 47);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " \u2022 ");
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 48);
    i0.ɵɵelementStart(14, "button", 49);
    i0.ɵɵlistener("click", function RagManagerComponent_div_43_div_1_Template_button_click_14_listener() { const restoredCtx = i0.ɵɵrestoreView(_r14); const doc_r12 = restoredCtx.$implicit; const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.deleteDocument(doc_r12); });
    i0.ɵɵelement(15, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const doc_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("fa-file-pdf", doc_r12.name.toLowerCase().endsWith(".pdf"))("pdf", doc_r12.name.toLowerCase().endsWith(".pdf"))("fa-file-word", doc_r12.name.toLowerCase().endsWith(".docx"))("docx", doc_r12.name.toLowerCase().endsWith(".docx"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", doc_r12.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(doc_r12.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r11.formatSize(doc_r12.size));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 12, doc_r12.uploadedAt, "mediumDate"));
} }
function RagManagerComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, RagManagerComponent_div_43_div_1_Template, 16, 15, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.documents);
} }
export class RagManagerComponent {
    constructor(settingsService, aiService) {
        this.settingsService = settingsService;
        this.aiService = aiService;
        this.docsPath = '';
        this.isSaving = false;
        this.isIndexing = false;
        this.saveMessage = '';
        this.documents = [];
        this.isLoadingDocs = false;
        this.isDragging = false;
        this.isUploading = false;
        this.uploadProgress = 0;
    }
    ngOnInit() {
        this.loadSettings();
    }
    loadSettings() {
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.docsPath = settings['DOCS_PATH'] || 'G:\\Telechargement\\sGRC\\normes';
                this.loadDocuments();
            },
            error: (err) => {
                console.error('Erreur chargement parametres:', err);
            }
        });
    }
    saveDocsPath() {
        this.isSaving = true;
        this.saveMessage = '';
        this.settingsService.updateSetting('DOCS_PATH', this.docsPath).subscribe({
            next: () => {
                this.isSaving = false;
                this.saveMessage = 'Chemin applique et sauvegarde.';
                setTimeout(() => this.saveMessage = '', 5000);
            },
            error: (err) => {
                this.isSaving = false;
                this.saveMessage = 'Erreur lors de la mise a jour.';
                console.error(err);
            }
        });
    }
    startIndexing() {
        this.isIndexing = true;
        this.saveMessage = 'Indexation complete en cours...';
        this.aiService.indexNormes().subscribe({
            next: (response) => {
                this.isIndexing = false;
                const summary = this.buildIndexingBreakdown(response);
                const ocrNote = response.ocrUsedFiles > 0 ? ' OCR applique uniquement aux documents scannes detectes.' : '';
                this.saveMessage = response.failedFiles > 0
                    ? `Indexation terminee : ${response.count} fragments indexes, ${response.failedFiles} fichier(s) non exploitable(s). ${summary}${ocrNote}`
                    : `Indexation reussie : ${response.count} fragments indexes. ${summary}${ocrNote}`;
                setTimeout(() => this.saveMessage = '', 7000);
            },
            error: (err) => {
                this.isIndexing = false;
                this.saveMessage = "Erreur pendant l'indexation.";
                console.error(err);
            }
        });
    }
    loadDocuments() {
        this.isLoadingDocs = true;
        this.aiService.getRagDocuments().subscribe({
            next: (docs) => {
                this.documents = docs;
                this.isLoadingDocs = false;
            },
            error: (err) => {
                this.isLoadingDocs = false;
                console.error('Error loading docs:', err);
            }
        });
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isUploading) {
            this.isDragging = true;
        }
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }
    onDrop(event) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
        if (this.isUploading) {
            return;
        }
        const files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
        if (files && files.length > 0) {
            this.handleSelectedFile(files[0]);
        }
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.handleSelectedFile(file);
        }
        event.target.value = '';
    }
    handleSelectedFile(file) {
        var _a;
        const extension = (_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (extension !== 'pdf' && extension !== 'docx') {
            this.saveMessage = 'Erreur : seuls les fichiers PDF et DOCX sont autorises.';
            setTimeout(() => this.saveMessage = '', 5000);
            return;
        }
        if (file.size > 15 * 1024 * 1024) {
            this.saveMessage = 'Erreur : le fichier depasse 15 Mo.';
            setTimeout(() => this.saveMessage = '', 5000);
            return;
        }
        this.uploadFile(file);
    }
    uploadFile(file) {
        this.isUploading = true;
        this.uploadProgress = 0;
        this.saveMessage = '';
        this.aiService.uploadRagDocument(file).subscribe({
            next: (event) => {
                var _a;
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(100 * event.loaded / event.total);
                    return;
                }
                if (event instanceof HttpResponse) {
                    this.isUploading = false;
                    this.uploadProgress = 100;
                    const indexing = (_a = event.body) === null || _a === void 0 ? void 0 : _a.indexing;
                    const failedFiles = (indexing === null || indexing === void 0 ? void 0 : indexing.failedFiles) || 0;
                    const summary = indexing ? this.buildIndexingBreakdown(indexing) : '';
                    const ocrNote = indexing && indexing.ocrUsedFiles > 0 ? ' OCR applique uniquement aux documents scannes detectes.' : '';
                    this.saveMessage = failedFiles > 0
                        ? `${file.name} charge, mais ${failedFiles} fichier(s) restent non exploitables dans l'index. ${summary}${ocrNote}`
                        : `${file.name} uploade et indexe avec succes. ${summary}${ocrNote}`;
                    setTimeout(() => {
                        this.uploadProgress = 0;
                        this.saveMessage = '';
                    }, 5000);
                    this.loadDocuments();
                }
            },
            error: (err) => {
                var _a;
                this.isUploading = false;
                this.uploadProgress = 0;
                this.saveMessage = 'Erreur lors de l upload : ' + (((_a = err.error) === null || _a === void 0 ? void 0 : _a.error) || 'Erreur inconnue');
                setTimeout(() => this.saveMessage = '', 5000);
            }
        });
    }
    deleteDocument(doc) {
        if (confirm(`Etes-vous sur de vouloir supprimer '${doc.name}' et de le retirer de l'index RAG ?`)) {
            this.saveMessage = 'Suppression et reindexation en cours...';
            this.aiService.deleteRagDocument(doc.relativePath || doc.name).subscribe({
                next: (response) => {
                    const indexing = response === null || response === void 0 ? void 0 : response.indexing;
                    const failedFiles = (indexing === null || indexing === void 0 ? void 0 : indexing.failedFiles) || 0;
                    const summary = indexing ? this.buildIndexingBreakdown(indexing) : '';
                    const ocrNote = indexing && indexing.ocrUsedFiles > 0 ? ' OCR applique uniquement aux documents scannes detectes.' : '';
                    this.saveMessage = failedFiles > 0
                        ? `Document supprime. Reindexation terminee avec ${failedFiles} fichier(s) non exploitable(s). ${summary}${ocrNote}`
                        : `Document supprime et index mis a jour. ${summary}${ocrNote}`;
                    setTimeout(() => this.saveMessage = '', 5000);
                    this.loadDocuments();
                },
                error: (err) => {
                    this.saveMessage = 'Erreur lors de la suppression.';
                    setTimeout(() => this.saveMessage = '', 5000);
                    console.error('Delete error', err);
                }
            });
        }
    }
    formatSize(bytes) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    buildIndexingBreakdown(result) {
        return `${result.files} fichiers, ${result.ocrUsedFiles} OCR, ${result.nativeFiles} natifs${result.scannedPdfLikelyFiles > result.ocrUsedFiles ? `, ${result.scannedPdfLikelyFiles} scannes detectes` : ''}`;
    }
}
RagManagerComponent.ɵfac = function RagManagerComponent_Factory(t) { return new (t || RagManagerComponent)(i0.ɵɵdirectiveInject(i1.SettingsService), i0.ɵɵdirectiveInject(i2.AIService)); };
RagManagerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RagManagerComponent, selectors: [["app-rag-manager"]], decls: 44, vars: 33, consts: [[1, "rag-manager-container"], [1, "header-section"], [1, "header-content"], [1, "header-icon"], [1, "fas", "fa-brain"], [1, "controls-section"], [1, "form-group"], ["type", "text", "placeholder", "D:\\LocalDocs\\normes", 1, "path-input", 3, "ngModel", "ngModelChange"], [1, "settings-actions"], [1, "btn-apply", 3, "disabled", "click"], [1, "fas"], ["title", "Forcer une reindexation complete de la base RAG", 1, "btn-reindex", 3, "disabled", "click"], ["class", "save-feedback", 3, "error", 4, "ngIf"], [1, "main-content"], [1, "upload-card"], [1, "fas", "fa-cloud-upload-alt"], [1, "dropzone", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "accept", ".pdf,.docx", 1, "file-input", 3, "change"], ["fileInput", ""], [1, "main-icon", "fas"], ["class", "dropzone-text", 4, "ngIf"], ["class", "dropzone-subtext", 4, "ngIf"], ["class", "progress-bar-container", 4, "ngIf"], ["class", "progress-text", 4, "ngIf"], [1, "list-card"], [1, "fas", "fa-folder-open"], ["class", "badge", 4, "ngIf"], ["class", "empty-docs", 4, "ngIf"], ["class", "docs-container", 4, "ngIf"], [1, "save-feedback"], [1, "dropzone-text"], [1, "dropzone-subtext"], [1, "progress-bar-container"], [1, "progress-bar"], [1, "progress-text"], [1, "badge"], [1, "empty-docs"], [1, "fas", "fa-spinner", "fa-spin", "fa-2x", 2, "margin-bottom", "1rem", "color", "#6366f1"], [1, "far", "fa-folder", "fa-3x", 2, "margin-bottom", "1rem", "color", "#cbd5e1"], [2, "font-size", "0.85rem"], [1, "docs-container"], ["class", "doc-item", 4, "ngFor", "ngForOf"], [1, "doc-item"], [1, "doc-info"], [1, "doc-icon", "fas"], [1, "doc-details"], [1, "doc-name", 3, "title"], [1, "doc-meta"], [1, "doc-actions"], ["title", "Supprimer definitivement le fichier et mettre l index a jour", 1, "btn-icon", 3, "click"], [1, "far", "fa-trash-alt"]], template: function RagManagerComponent_Template(rf, ctx) { if (rf & 1) {
        const _r15 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "h2");
        i0.ɵɵtext(4, "Gestionnaire de Base de Connaissances RAG");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p");
        i0.ɵɵtext(6, "Importez, gerez et reindexez les documents source utilises par l assistant sGRC.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 3);
        i0.ɵɵelement(8, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 5);
        i0.ɵɵelementStart(10, "div", 6);
        i0.ɵɵelementStart(11, "label");
        i0.ɵɵtext(12, "Chemin de stockage des normes (DOCS_PATH)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "input", 7);
        i0.ɵɵlistener("ngModelChange", function RagManagerComponent_Template_input_ngModelChange_13_listener($event) { return ctx.docsPath = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "div", 8);
        i0.ɵɵelementStart(15, "button", 9);
        i0.ɵɵlistener("click", function RagManagerComponent_Template_button_click_15_listener() { return ctx.saveDocsPath(); });
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵtext(17, " Appliquer chemin ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "button", 11);
        i0.ɵɵlistener("click", function RagManagerComponent_Template_button_click_18_listener() { return ctx.startIndexing(); });
        i0.ɵɵelement(19, "i", 10);
        i0.ɵɵtext(20, " Reindexer tout ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(21, RagManagerComponent_div_21_Template, 2, 3, "div", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "div", 13);
        i0.ɵɵelementStart(23, "div", 14);
        i0.ɵɵelementStart(24, "h3");
        i0.ɵɵelement(25, "i", 15);
        i0.ɵɵtext(26, " Importer un document");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 16);
        i0.ɵɵlistener("dragover", function RagManagerComponent_Template_div_dragover_27_listener($event) { return ctx.onDragOver($event); })("dragleave", function RagManagerComponent_Template_div_dragleave_27_listener($event) { return ctx.onDragLeave($event); })("drop", function RagManagerComponent_Template_div_drop_27_listener($event) { return ctx.onDrop($event); })("click", function RagManagerComponent_Template_div_click_27_listener() { i0.ɵɵrestoreView(_r15); const _r1 = i0.ɵɵreference(29); return !ctx.isUploading && _r1.click(); });
        i0.ɵɵelementStart(28, "input", 17, 18);
        i0.ɵɵlistener("change", function RagManagerComponent_Template_input_change_28_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(30, "i", 19);
        i0.ɵɵtemplate(31, RagManagerComponent_div_31_Template, 2, 0, "div", 20);
        i0.ɵɵtemplate(32, RagManagerComponent_div_32_Template, 2, 0, "div", 20);
        i0.ɵɵtemplate(33, RagManagerComponent_div_33_Template, 2, 0, "div", 21);
        i0.ɵɵtemplate(34, RagManagerComponent_div_34_Template, 2, 2, "div", 22);
        i0.ɵɵtemplate(35, RagManagerComponent_div_35_Template, 2, 1, "div", 23);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 24);
        i0.ɵɵelementStart(37, "h3");
        i0.ɵɵelement(38, "i", 25);
        i0.ɵɵtext(39, " Registre documentaire ");
        i0.ɵɵtemplate(40, RagManagerComponent_span_40_Template, 2, 1, "span", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(41, RagManagerComponent_div_41_Template, 4, 0, "div", 27);
        i0.ɵɵtemplate(42, RagManagerComponent_div_42_Template, 7, 0, "div", 27);
        i0.ɵɵtemplate(43, RagManagerComponent_div_43_Template, 2, 1, "div", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(13);
        i0.ɵɵproperty("ngModel", ctx.docsPath);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving || ctx.isUploading || ctx.isIndexing);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-save", !ctx.isSaving)("fa-spinner", ctx.isSaving)("fa-spin", ctx.isSaving);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isIndexing || ctx.isUploading);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("fa-sync-alt", !ctx.isIndexing)("fa-spinner", ctx.isIndexing)("fa-spin", ctx.isIndexing);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.saveMessage);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("drag-over", ctx.isDragging);
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("fa-file-upload", !ctx.isUploading)("fa-circle-notch", ctx.isUploading)("fa-spin", ctx.isUploading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isUploading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isUploading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isUploading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isUploading && ctx.uploadProgress > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isUploading && ctx.uploadProgress > 0);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.documents.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoadingDocs);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingDocs && ctx.documents.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoadingDocs && ctx.documents.length > 0);
    } }, directives: [i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i4.NgIf, i4.NgForOf], pipes: [i4.DatePipe], styles: [".rag-manager-container[_ngcontent-%COMP%] {\n            padding: 2rem;\n            max-width: 1200px;\n            margin: 0 auto;\n            display: flex;\n            flex-direction: column;\n            gap: 2rem;\n        }\n        .header-section[_ngcontent-%COMP%] {\n            background: linear-gradient(135deg, #6366f1, #4f46e5);\n            padding: 2rem;\n            border-radius: 16px;\n            color: white;\n            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }\n        .header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n            margin: 0 0 0.5rem 0;\n            font-size: 2rem;\n            font-weight: 700;\n        }\n        .header-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n            margin: 0;\n            opacity: 0.9;\n            font-size: 1rem;\n        }\n        .header-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n            font-size: 4rem;\n            opacity: 0.8;\n        }\n        .controls-section[_ngcontent-%COMP%] {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 1.5rem;\n            background: white;\n            padding: 1.5rem;\n            border-radius: 12px;\n            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);\n            border: 1px solid #e2e8f0;\n        }\n        .form-group[_ngcontent-%COMP%] {\n            flex: 1;\n            min-width: 300px;\n            display: flex;\n            flex-direction: column;\n            gap: 8px;\n        }\n        label[_ngcontent-%COMP%] {\n            font-size: 0.85rem;\n            font-weight: 600;\n            color: #64748b;\n        }\n        .path-input[_ngcontent-%COMP%] {\n            padding: 12px 16px;\n            border: 1.5px solid #e2e8f0;\n            border-radius: 8px;\n            font-family: inherit;\n            font-size: 0.95rem;\n            transition: all 0.2s ease;\n            width: 100%;\n        }\n        .path-input[_ngcontent-%COMP%]:focus {\n            outline: none;\n            border-color: #6366f1;\n            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n        }\n        .settings-actions[_ngcontent-%COMP%] {\n            display: flex;\n            gap: 15px;\n            align-items: flex-end;\n        }\n        .settings-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n            padding: 12px 24px;\n            border-radius: 8px;\n            font-weight: 600;\n            transition: all 0.2s ease;\n            border: none;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            font-size: 0.95rem;\n        }\n        .btn-apply[_ngcontent-%COMP%] {\n            background: #6366f1;\n            color: white;\n        }\n        .btn-apply[_ngcontent-%COMP%]:hover:not(:disabled) {\n            background: #4f46e5;\n            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);\n            transform: translateY(-1px);\n        }\n        .btn-reindex[_ngcontent-%COMP%] {\n            background: #f1f5f9;\n            color: #475569;\n            border: 1px solid #cbd5e1;\n        }\n        .btn-reindex[_ngcontent-%COMP%]:hover:not(:disabled) {\n            background: #e2e8f0;\n            color: #334155;\n        }\n        .save-feedback[_ngcontent-%COMP%] {\n            width: 100%;\n            font-size: 0.9rem;\n            color: #10b981;\n            font-weight: 600;\n            margin-top: -0.5rem;\n        }\n        .save-feedback.error[_ngcontent-%COMP%] {\n            color: #ef4444;\n        }\n        .main-content[_ngcontent-%COMP%] {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            gap: 2rem;\n        }\n        @media (max-width: 900px) {\n            .main-content[_ngcontent-%COMP%] {\n                grid-template-columns: 1fr;\n            }\n            .settings-actions[_ngcontent-%COMP%] {\n                width: 100%;\n                flex-wrap: wrap;\n            }\n            .settings-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n                flex: 1;\n                justify-content: center;\n            }\n        }\n        .upload-card[_ngcontent-%COMP%], .list-card[_ngcontent-%COMP%] {\n            background: white;\n            border-radius: 12px;\n            padding: 1.5rem;\n            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);\n            border: 1px solid #e2e8f0;\n            display: flex;\n            flex-direction: column;\n        }\n        h3[_ngcontent-%COMP%] {\n            margin: 0 0 1.5rem 0;\n            font-size: 1.25rem;\n            color: #1e293b;\n            display: flex;\n            align-items: center;\n            gap: 10px;\n        }\n        h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n            color: #6366f1;\n        }\n        .dropzone[_ngcontent-%COMP%] {\n            flex: 1;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            padding: 3rem 2rem;\n            border: 2px dashed #a5b4fc;\n            border-radius: 12px;\n            background: rgba(238, 242, 255, 0.5);\n            cursor: pointer;\n            transition: all 0.3s ease;\n            text-align: center;\n            min-height: 250px;\n        }\n        .dropzone[_ngcontent-%COMP%]:hover, .dropzone.drag-over[_ngcontent-%COMP%] {\n            border-color: #6366f1;\n            background: #eef2ff;\n            transform: translateY(-2px);\n        }\n        .dropzone[_ngcontent-%COMP%]   i.main-icon[_ngcontent-%COMP%] {\n            font-size: 3.5rem;\n            color: #818cf8;\n            margin-bottom: 1rem;\n            transition: transform 0.3s ease;\n        }\n        .dropzone[_ngcontent-%COMP%]:hover   i.main-icon[_ngcontent-%COMP%], .dropzone.drag-over[_ngcontent-%COMP%]   i.main-icon[_ngcontent-%COMP%] {\n            transform: scale(1.1);\n            color: #6366f1;\n        }\n        .dropzone-text[_ngcontent-%COMP%] {\n            font-size: 1.1rem;\n            font-weight: 600;\n            color: #334155;\n            margin-bottom: 0.5rem;\n        }\n        .dropzone-subtext[_ngcontent-%COMP%] {\n            font-size: 0.85rem;\n            color: #64748b;\n        }\n        .file-input[_ngcontent-%COMP%] {\n            display: none;\n        }\n        .progress-bar-container[_ngcontent-%COMP%] {\n            width: 100%;\n            height: 8px;\n            background: #e2e8f0;\n            border-radius: 4px;\n            margin-top: 2rem;\n            overflow: hidden;\n        }\n        .progress-bar[_ngcontent-%COMP%] {\n            height: 100%;\n            background: linear-gradient(90deg, #818cf8, #4f46e5);\n            transition: width 0.3s ease;\n        }\n        .progress-text[_ngcontent-%COMP%] {\n            font-size: 0.85rem;\n            color: #4f46e5;\n            font-weight: 600;\n            margin-top: 0.75rem;\n        }\n        .docs-container[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n            max-height: 500px;\n            overflow-y: auto;\n            padding-right: 5px;\n        }\n        .doc-item[_ngcontent-%COMP%] {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            padding: 1.25rem;\n            background: #f8fafc;\n            border: 1px solid #e2e8f0;\n            border-radius: 10px;\n            transition: all 0.2s ease;\n        }\n        .doc-item[_ngcontent-%COMP%]:hover {\n            background: white;\n            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);\n            border-color: #cbd5e1;\n            transform: translateX(2px);\n        }\n        .doc-info[_ngcontent-%COMP%] {\n            display: flex;\n            align-items: center;\n            gap: 15px;\n            overflow: hidden;\n        }\n        .doc-icon[_ngcontent-%COMP%] {\n            font-size: 2rem;\n        }\n        .doc-icon.pdf[_ngcontent-%COMP%] { color: #ef4444; }\n        .doc-icon.docx[_ngcontent-%COMP%] { color: #2563eb; }\n        .doc-details[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            overflow: hidden;\n        }\n        .doc-name[_ngcontent-%COMP%] {\n            font-weight: 600;\n            font-size: 1rem;\n            color: #334155;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            max-width: 250px;\n        }\n        .doc-meta[_ngcontent-%COMP%] {\n            font-size: 0.8rem;\n            color: #64748b;\n            display: flex;\n            gap: 10px;\n            margin-top: 4px;\n        }\n        .btn-icon[_ngcontent-%COMP%] {\n            background: none;\n            border: none;\n            color: #94a3b8;\n            cursor: pointer;\n            padding: 8px;\n            border-radius: 6px;\n            transition: all 0.2s ease;\n            font-size: 1.1rem;\n        }\n        .btn-icon[_ngcontent-%COMP%]:hover {\n            color: #ef4444;\n            background: #fee2e2;\n        }\n        .empty-docs[_ngcontent-%COMP%] {\n            text-align: center;\n            padding: 3rem;\n            color: #94a3b8;\n            font-size: 1rem;\n            background: #f8fafc;\n            border-radius: 10px;\n            border: 2px dashed #e2e8f0;\n            margin: auto 0;\n        }\n        .badge[_ngcontent-%COMP%] {\n            background: #e0e7ff;\n            color: #4f46e5;\n            padding: 2px 10px;\n            border-radius: 12px;\n            font-size: 0.8rem;\n            font-weight: 700;\n            margin-left: auto;\n        }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RagManagerComponent, [{
        type: Component,
        args: [{
                selector: 'app-rag-manager',
                templateUrl: './rag-manager.component.html',
                styles: [`
        .rag-manager-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .header-section {
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            padding: 2rem;
            border-radius: 16px;
            color: white;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-content h2 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
            font-weight: 700;
        }
        .header-content p {
            margin: 0;
            opacity: 0.9;
            font-size: 1rem;
        }
        .header-icon i {
            font-size: 4rem;
            opacity: 0.8;
        }
        .controls-section {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        .form-group {
            flex: 1;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
        }
        .path-input {
            padding: 12px 16px;
            border: 1.5px solid #e2e8f0;
            border-radius: 8px;
            font-family: inherit;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            width: 100%;
        }
        .path-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .settings-actions {
            display: flex;
            gap: 15px;
            align-items: flex-end;
        }
        .settings-actions button {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
        }
        .btn-apply {
            background: #6366f1;
            color: white;
        }
        .btn-apply:hover:not(:disabled) {
            background: #4f46e5;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
            transform: translateY(-1px);
        }
        .btn-reindex {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #cbd5e1;
        }
        .btn-reindex:hover:not(:disabled) {
            background: #e2e8f0;
            color: #334155;
        }
        .save-feedback {
            width: 100%;
            font-size: 0.9rem;
            color: #10b981;
            font-weight: 600;
            margin-top: -0.5rem;
        }
        .save-feedback.error {
            color: #ef4444;
        }
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        @media (max-width: 900px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            .settings-actions {
                width: 100%;
                flex-wrap: wrap;
            }
            .settings-actions button {
                flex: 1;
                justify-content: center;
            }
        }
        .upload-card, .list-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
        }
        h3 {
            margin: 0 0 1.5rem 0;
            font-size: 1.25rem;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        h3 i {
            color: #6366f1;
        }
        .dropzone {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 2rem;
            border: 2px dashed #a5b4fc;
            border-radius: 12px;
            background: rgba(238, 242, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            min-height: 250px;
        }
        .dropzone:hover, .dropzone.drag-over {
            border-color: #6366f1;
            background: #eef2ff;
            transform: translateY(-2px);
        }
        .dropzone i.main-icon {
            font-size: 3.5rem;
            color: #818cf8;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }
        .dropzone:hover i.main-icon, .dropzone.drag-over i.main-icon {
            transform: scale(1.1);
            color: #6366f1;
        }
        .dropzone-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: #334155;
            margin-bottom: 0.5rem;
        }
        .dropzone-subtext {
            font-size: 0.85rem;
            color: #64748b;
        }
        .file-input {
            display: none;
        }
        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            margin-top: 2rem;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #818cf8, #4f46e5);
            transition: width 0.3s ease;
        }
        .progress-text {
            font-size: 0.85rem;
            color: #4f46e5;
            font-weight: 600;
            margin-top: 0.75rem;
        }
        .docs-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-height: 500px;
            overflow-y: auto;
            padding-right: 5px;
        }
        .doc-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            transition: all 0.2s ease;
        }
        .doc-item:hover {
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border-color: #cbd5e1;
            transform: translateX(2px);
        }
        .doc-info {
            display: flex;
            align-items: center;
            gap: 15px;
            overflow: hidden;
        }
        .doc-icon {
            font-size: 2rem;
        }
        .doc-icon.pdf { color: #ef4444; }
        .doc-icon.docx { color: #2563eb; }
        .doc-details {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .doc-name {
            font-weight: 600;
            font-size: 1rem;
            color: #334155;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 250px;
        }
        .doc-meta {
            font-size: 0.8rem;
            color: #64748b;
            display: flex;
            gap: 10px;
            margin-top: 4px;
        }
        .btn-icon {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: all 0.2s ease;
            font-size: 1.1rem;
        }
        .btn-icon:hover {
            color: #ef4444;
            background: #fee2e2;
        }
        .empty-docs {
            text-align: center;
            padding: 3rem;
            color: #94a3b8;
            font-size: 1rem;
            background: #f8fafc;
            border-radius: 10px;
            border: 2px dashed #e2e8f0;
            margin: auto 0;
        }
        .badge {
            background: #e0e7ff;
            color: #4f46e5;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 700;
            margin-left: auto;
        }
    `]
            }]
    }], function () { return [{ type: i1.SettingsService }, { type: i2.AIService }]; }, null); })();
//# sourceMappingURL=rag-manager.component.js.map