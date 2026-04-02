import { Component } from '@angular/core';
import { OrganigrammeService } from '../../../core/services/organigramme.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/organigramme.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
function OrganigrammeManagementComponent_tr_56_input_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 41);
    i0.ɵɵlistener("ngModelChange", function OrganigrammeManagementComponent_tr_56_input_4_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.editNom = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngModel", ctx_r3.editNom);
} }
function OrganigrammeManagementComponent_tr_56_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r2.nom);
} }
function OrganigrammeManagementComponent_tr_56_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function OrganigrammeManagementComponent_tr_56_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const item_r2 = i0.ɵɵnextContext().$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.startEdit(item_r2); });
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵelementEnd();
} }
function OrganigrammeManagementComponent_tr_56_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function OrganigrammeManagementComponent_tr_56_button_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return ctx_r14.saveEdit(); });
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵelementEnd();
} }
function OrganigrammeManagementComponent_tr_56_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function OrganigrammeManagementComponent_tr_56_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.cancelEdit(); });
    i0.ɵɵelement(1, "i", 47);
    i0.ɵɵelementEnd();
} }
function OrganigrammeManagementComponent_tr_56_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 33);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, OrganigrammeManagementComponent_tr_56_input_4_Template, 1, 1, "input", 34);
    i0.ɵɵtemplate(5, OrganigrammeManagementComponent_tr_56_span_5_Template, 2, 1, "span", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 35);
    i0.ɵɵtemplate(7, OrganigrammeManagementComponent_tr_56_button_7_Template, 2, 0, "button", 36);
    i0.ɵɵtemplate(8, OrganigrammeManagementComponent_tr_56_button_8_Template, 2, 0, "button", 37);
    i0.ɵɵtemplate(9, OrganigrammeManagementComponent_tr_56_button_9_Template, 2, 0, "button", 38);
    i0.ɵɵelementStart(10, "button", 39);
    i0.ɵɵlistener("click", function OrganigrammeManagementComponent_tr_56_Template_button_click_10_listener() { const restoredCtx = i0.ɵɵrestoreView(_r19); const item_r2 = restoredCtx.$implicit; const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.deleteEntry(item_r2.id); });
    i0.ɵɵelement(11, "i", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", item_r2.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.editingId === item_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.editingId !== item_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.editingId !== item_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.editingId === item_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.editingId === item_r2.id);
} }
function OrganigrammeManagementComponent_tr_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 48);
    i0.ɵɵelement(2, "i", 49);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun \u00E9l\u00E9ment dans l'organigramme.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class OrganigrammeManagementComponent {
    constructor(organigrammeService, router) {
        this.organigrammeService = organigrammeService;
        this.router = router;
        this.items = [];
        this.newNom = '';
        this.selectedFile = null;
        this.editingId = null;
        this.editNom = '';
        this.showExportMenu = false;
    }
    ngOnInit() {
        this.refreshList();
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    refreshList() {
        this.organigrammeService.getAll().subscribe(data => {
            this.items = data;
        });
    }
    addEntry() {
        if (!this.newNom)
            return;
        this.organigrammeService.create(this.newNom).subscribe(() => {
            this.newNom = '';
            this.refreshList();
            alert('Élément ajouté avec succès');
        }, err => alert(err.error.message || 'Erreur lors de l\'ajout'));
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    importExcel() {
        if (!this.selectedFile)
            return;
        this.organigrammeService.importExcel(this.selectedFile).subscribe(res => {
            alert(res.message);
            this.selectedFile = null;
            this.refreshList();
        }, err => alert(err.error.message || 'Erreur lors de l\'import'));
    }
    deleteEntry(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?'))
            return;
        this.organigrammeService.delete(id).subscribe(() => {
            this.refreshList();
        });
    }
    startEdit(item) {
        this.editingId = item.id;
        this.editNom = item.nom;
    }
    saveEdit() {
        if (!this.editingId || !this.editNom)
            return;
        this.organigrammeService.update(this.editingId, this.editNom).subscribe(() => {
            this.editingId = null;
            this.refreshList();
        });
    }
    cancelEdit() {
        this.editingId = null;
    }
    exportToXLSX() {
        const dataToExport = this.items.map(item => ({
            'ID': item.id,
            'Intitulé / Nom': item.nom
        }));
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Organigramme');
        XLSX.writeFile(wb, `Export_Organigramme_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }
    exportToPDF() {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text("Rapport de l'Organigramme", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);
        const columns = ['ID', 'Intitulé / Nom'];
        const rows = this.items.map(item => [
            `#${item.id}`,
            item.nom
        ]);
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 4 },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });
        doc.save(`Export_Organigramme_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
OrganigrammeManagementComponent.ɵfac = function OrganigrammeManagementComponent_Factory(t) { return new (t || OrganigrammeManagementComponent)(i0.ɵɵdirectiveInject(i1.OrganigrammeService), i0.ɵɵdirectiveInject(i2.Router)); };
OrganigrammeManagementComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OrganigrammeManagementComponent, selectors: [["app-organigramme-management"]], decls: 58, vars: 8, consts: [[1, "organigramme-management"], [1, "header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-sitemap"], [1, "header-right"], [1, "export-dropdown"], ["title", "T\u00E9l\u00E9charger le rapport", 1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], [1, "actions-row"], [1, "form-card"], [1, "fas", "fa-plus"], [1, "input-group"], ["type", "text", "placeholder", "Ex: DSI, Direction G\u00E9n\u00E9rale...", 1, "premium-input", 3, "ngModel", "ngModelChange"], [1, "premium-button", 3, "disabled", "click"], [1, "import-card"], [1, "fas", "fa-file-excel"], [1, "file-upload"], ["type", "file", "accept", ".xlsx, .xls", "id", "excelFile", 1, "hidden-input", 3, "change"], ["for", "excelFile", 1, "upload-label"], [1, "fas", "fa-cloud-upload-alt"], [1, "premium-button", "secondary", 3, "disabled", "click"], [1, "list-section"], [1, "table-container"], [1, "premium-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "id-cell"], ["type", "text", "class", "edit-input", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "actions-cell"], ["class", "action-btn edit", "title", "Modifier", 3, "click", 4, "ngIf"], ["class", "action-btn save", "title", "Enregistrer", 3, "click", 4, "ngIf"], ["class", "action-btn cancel", "title", "Annuler", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "action-btn", "delete", 3, "click"], [1, "fas", "fa-trash"], ["type", "text", 1, "edit-input", 3, "ngModel", "ngModelChange"], ["title", "Modifier", 1, "action-btn", "edit", 3, "click"], [1, "fas", "fa-edit"], ["title", "Enregistrer", 1, "action-btn", "save", 3, "click"], [1, "fas", "fa-check"], ["title", "Annuler", 1, "action-btn", "cancel", 3, "click"], [1, "fas", "fa-times"], ["colspan", "3", 1, "empty-msg"], [1, "fas", "fa-folder-open"]], template: function OrganigrammeManagementComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h2");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gestion de l'Organigramme");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "G\u00E9rez les intitul\u00E9s des d\u00E9partements et postes pour la gestion des risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "button", 8);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_13_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(14, "i", 9);
        i0.ɵɵtext(15, " Exporter rapport ");
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "button", 12);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_18_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(19, "i", 13);
        i0.ɵɵtext(20, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "button", 12);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_21_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(22, "i", 14);
        i0.ɵɵtext(23, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 15);
        i0.ɵɵelementStart(25, "div", 16);
        i0.ɵɵelementStart(26, "h3");
        i0.ɵɵelement(27, "i", 17);
        i0.ɵɵtext(28, " Ajouter un intitul\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "div", 18);
        i0.ɵɵelementStart(30, "input", 19);
        i0.ɵɵlistener("ngModelChange", function OrganigrammeManagementComponent_Template_input_ngModelChange_30_listener($event) { return ctx.newNom = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "button", 20);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_31_listener() { return ctx.addEntry(); });
        i0.ɵɵtext(32, "Ajouter");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "div", 21);
        i0.ɵɵelementStart(34, "h3");
        i0.ɵɵelement(35, "i", 22);
        i0.ɵɵtext(36, " Import Excel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 23);
        i0.ɵɵelementStart(38, "input", 24);
        i0.ɵɵlistener("change", function OrganigrammeManagementComponent_Template_input_change_38_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "label", 25);
        i0.ɵɵelement(40, "i", 26);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "button", 27);
        i0.ɵɵlistener("click", function OrganigrammeManagementComponent_Template_button_click_42_listener() { return ctx.importExcel(); });
        i0.ɵɵtext(43, "Importer");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "div", 28);
        i0.ɵɵelementStart(45, "div", 29);
        i0.ɵɵelementStart(46, "table", 30);
        i0.ɵɵelementStart(47, "thead");
        i0.ɵɵelementStart(48, "tr");
        i0.ɵɵelementStart(49, "th");
        i0.ɵɵtext(50, "ID");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "th");
        i0.ɵɵtext(52, "Intitul\u00E9 / Nom");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "th");
        i0.ɵɵtext(54, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "tbody");
        i0.ɵɵtemplate(56, OrganigrammeManagementComponent_tr_56_Template, 12, 6, "tr", 31);
        i0.ɵɵtemplate(57, OrganigrammeManagementComponent_tr_57_Template, 5, 0, "tr", 32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(17);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(13);
        i0.ɵɵproperty("ngModel", ctx.newNom);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.newNom);
        i0.ɵɵadvance(10);
        i0.ɵɵtextInterpolate1(" ", ctx.selectedFile ? ctx.selectedFile.name : "Choisir un fichier", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.selectedFile);
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngForOf", ctx.items);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.items.length === 0);
    } }, directives: [i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i4.NgForOf, i4.NgIf], styles: [".organigramme-management[_ngcontent-%COMP%] {\r\n    padding: 30px;\r\n    background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);\r\n    min-height: 90vh;\r\n    border-radius: 20px;\r\n    font-family: 'Inter', sans-serif;\r\n    color: #1e293b;\r\n\r\n    .header {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 30px;\r\n        background: rgba(255, 255, 255, 0.85);\r\n        backdrop-filter: blur(12px);\r\n        border-radius: 18px;\r\n        padding: 20px 28px;\r\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n        border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n        .header-left {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 20px;\r\n        }\r\n\r\n        .back-btn {\r\n            width: 42px;\r\n            height: 42px;\r\n            border-radius: 12px;\r\n            border: 1px solid #e2e8f0;\r\n            background: white;\r\n            color: #475569;\r\n            cursor: pointer;\r\n            font-size: 1.1rem;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\r\n\r\n            &:hover {\r\n                background: #f8fafc;\r\n                color: #004a99;\r\n                border-color: #004a99;\r\n                transform: translateX(-3px);\r\n                box-shadow: 0 4px 12px rgba(0, 74, 153, 0.1);\r\n            }\r\n        }\r\n\r\n        h2 {\r\n            font-size: 1.6rem;\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            margin: 0;\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 12px;\r\n\r\n            i {\r\n                background: linear-gradient(135deg, #004a99, #0ea5e9);\r\n                -webkit-background-clip: text;\r\n                background-clip: text;\r\n                -webkit-text-fill-color: transparent;\r\n            }\r\n        }\r\n\r\n        p {\r\n            font-size: 0.85rem;\r\n            color: #64748b;\r\n            margin: 4px 0 0;\r\n        }\r\n    }\r\n\r\n    .actions-row {\r\n        display: grid;\r\n        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\r\n        gap: 24px;\r\n        margin-bottom: 30px;\r\n\r\n        .form-card,\r\n        .import-card {\r\n            background: rgba(255, 255, 255, 0.9);\r\n            padding: 24px;\r\n            border-radius: 16px;\r\n            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n            border: 1px solid rgba(255, 255, 255, 0.8);\r\n            transition: transform 0.3s;\r\n\r\n            &:hover {\r\n                transform: translateY(-4px);\r\n            }\r\n\r\n            h3 {\r\n                font-size: 1.1rem;\r\n                font-weight: 700;\r\n                color: #334155;\r\n                margin-bottom: 20px;\r\n                display: flex;\r\n                align-items: center;\r\n                gap: 10px;\r\n\r\n                i {\r\n                    color: #0ea5e9;\r\n                }\r\n            }\r\n        }\r\n\r\n        .input-group {\r\n            display: flex;\r\n            gap: 12px;\r\n        }\r\n\r\n        .premium-input {\r\n            flex: 1;\r\n            background: #f8fafc;\r\n            border: 2px solid #e2e8f0;\r\n            padding: 10px 16px;\r\n            border-radius: 10px;\r\n            color: #1e293b;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s;\r\n            outline: none;\r\n\r\n            &:focus {\r\n                border-color: #0ea5e9;\r\n                background: #fff;\r\n                box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);\r\n            }\r\n        }\r\n\r\n        .file-upload {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 12px;\r\n\r\n            .hidden-input {\r\n                display: none;\r\n            }\r\n\r\n            .upload-label {\r\n                flex: 1;\r\n                background: #f1f5f9;\r\n                border: 2px dashed #cbd5e1;\r\n                padding: 10px;\r\n                border-radius: 10px;\r\n                color: #64748b;\r\n                font-size: 0.85rem;\r\n                text-align: center;\r\n                cursor: pointer;\r\n                transition: all 0.2s;\r\n\r\n                &:hover {\r\n                    border-color: #0ea5e9;\r\n                    background: #f8fafc;\r\n                    color: #0ea5e9;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    .premium-button {\r\n        background: linear-gradient(135deg, #004a99, #0066cc);\r\n        color: white;\r\n        border: none;\r\n        padding: 10px 20px;\r\n        border-radius: 10px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        font-size: 0.9rem;\r\n        transition: all 0.3s;\r\n        box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n\r\n        &:hover:not(:disabled) {\r\n            transform: translateY(-2px);\r\n            box-shadow: 0 6px 16px rgba(0, 74, 153, 0.3);\r\n        }\r\n\r\n        &:disabled {\r\n            background: #94a3b8;\r\n            cursor: not-allowed;\r\n            box-shadow: none;\r\n        }\r\n\r\n        &.secondary {\r\n            background: white;\r\n            color: #004a99;\r\n            border: 2px solid #004a99;\r\n            box-shadow: none;\r\n\r\n            &:hover:not(:disabled) {\r\n                background: #004a99;\r\n                color: white;\r\n            }\r\n        }\r\n    }\r\n\r\n    .list-section {\r\n        .table-container {\r\n            background: rgba(255, 255, 255, 0.9);\r\n            border-radius: 18px;\r\n            overflow: hidden;\r\n            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n            border: 1px solid rgba(255, 255, 255, 0.8);\r\n        }\r\n\r\n        .premium-table {\r\n            width: 100%;\r\n            border-collapse: collapse;\r\n\r\n            thead {\r\n                background: #f8fafc;\r\n\r\n                th {\r\n                    padding: 16px 20px;\r\n                    text-align: left;\r\n                    font-size: 0.85rem;\r\n                    color: #64748b;\r\n                    text-transform: uppercase;\r\n                    letter-spacing: 0.05em;\r\n                    font-weight: 600;\r\n                    border-bottom: 2px solid #f1f5f9;\r\n                }\r\n            }\r\n\r\n            tbody {\r\n                tr {\r\n                    border-bottom: 1px solid #f1f5f9;\r\n                    transition: all 0.2s;\r\n\r\n                    &:last-child {\r\n                        border-bottom: none;\r\n                    }\r\n\r\n                    &:hover {\r\n                        background: rgba(241, 245, 249, 0.5);\r\n                    }\r\n                }\r\n\r\n                td {\r\n                    padding: 14px 20px;\r\n                    font-size: 0.9rem;\r\n                    color: #475569;\r\n\r\n                    &.id-cell {\r\n                        font-weight: 700;\r\n                        color: #94a3b8;\r\n                    }\r\n                }\r\n            }\r\n\r\n            .edit-input {\r\n                background: white;\r\n                border: 2px solid #0ea5e9;\r\n                padding: 6px 12px;\r\n                border-radius: 8px;\r\n                color: #1e293b;\r\n                width: 100%;\r\n                outline: none;\r\n            }\r\n\r\n            .actions-cell {\r\n                display: flex;\r\n                gap: 10px;\r\n\r\n                .action-btn {\r\n                    width: 34px;\r\n                    height: 34px;\r\n                    border-radius: 8px;\r\n                    display: flex;\r\n                    align-items: center;\r\n                    justify-content: center;\r\n                    background: #f8fafc;\r\n                    border: 1px solid #e2e8f0;\r\n                    cursor: pointer;\r\n                    transition: all 0.2s;\r\n\r\n                    &:hover {\r\n                        background: #fff;\r\n                        transform: scale(1.1);\r\n                    }\r\n\r\n                    &.edit {\r\n                        color: #f59e0b;\r\n\r\n                        &:hover {\r\n                            border-color: #f59e0b;\r\n                        }\r\n                    }\r\n\r\n                    &.save {\r\n                        color: #10b981;\r\n\r\n                        &:hover {\r\n                            border-color: #10b981;\r\n                        }\r\n                    }\r\n\r\n                    &.cancel {\r\n                        color: #64748b;\r\n\r\n                        &:hover {\r\n                            border-color: #64748b;\r\n                        }\r\n                    }\r\n\r\n                    &.delete {\r\n                        color: #ef4444;\r\n\r\n                        &:hover {\r\n                            border-color: #ef4444;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n\r\n            .empty-msg {\r\n                text-align: center;\r\n                padding: 50px 20px;\r\n                color: #94a3b8;\r\n\r\n                i {\r\n                    font-size: 2.5rem;\r\n                    margin-bottom: 15px;\r\n                    display: block;\r\n                    opacity: 0.5;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrganigrammeManagementComponent, [{
        type: Component,
        args: [{
                selector: 'app-organigramme-management',
                templateUrl: './organigramme-management.component.html',
                styleUrls: ['./organigramme-management.component.scss']
            }]
    }], function () { return [{ type: i1.OrganigrammeService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=organigramme-management.component.js.map