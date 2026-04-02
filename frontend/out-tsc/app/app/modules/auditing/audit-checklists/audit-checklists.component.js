import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuditingService } from '../../../core/services/auditing.service';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function AuditChecklistsComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function AuditChecklistsComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 13);
    i0.ɵɵtemplate(1, AuditChecklistsComponent_nav_15_a_1_Template, 2, 4, "a", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditChecklistsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1, "Chargement...");
    i0.ɵɵelementEnd();
} }
function AuditChecklistsComponent_div_17_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Aucun modele de checklist pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditChecklistsComponent_div_17_div_2_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(template_r8.description);
} }
function AuditChecklistsComponent_div_17_div_2_li_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r12.texte, " ");
} }
function AuditChecklistsComponent_div_17_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 23);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_17_div_2_Template_button_click_4_listener() { const restoredCtx = i0.ɵɵrestoreView(_r14); const template_r8 = restoredCtx.$implicit; const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.deleteTemplate(template_r8.id); });
    i0.ɵɵelement(5, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 25);
    i0.ɵɵtemplate(7, AuditChecklistsComponent_div_17_div_2_p_7_Template, 2, 1, "p", 26);
    i0.ɵɵelementStart(8, "ul", 27);
    i0.ɵɵtemplate(9, AuditChecklistsComponent_div_17_div_2_li_9_Template, 3, 1, "li", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r8 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(template_r8.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", template_r8.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", template_r8.items);
} }
function AuditChecklistsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtemplate(1, AuditChecklistsComponent_div_17_div_1_Template, 3, 0, "div", 18);
    i0.ɵɵtemplate(2, AuditChecklistsComponent_div_17_div_2_Template, 10, 3, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.templates.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.templates);
} }
function AuditChecklistsComponent_div_18_div_19_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_div_19_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const i_r17 = i0.ɵɵnextContext().index; const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.removeItem(i_r17); });
    i0.ɵɵelement(1, "i", 48);
    i0.ɵɵelementEnd();
} }
function AuditChecklistsComponent_div_18_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelementStart(1, "input", 45);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_18_div_19_Template_input_ngModelChange_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r23); const i_r17 = restoredCtx.index; const ctx_r22 = i0.ɵɵnextContext(2); return (ctx_r22.newTemplate.items[i_r17] = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, AuditChecklistsComponent_div_18_div_19_button_2_Template, 2, 0, "button", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r17 = ctx.index;
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r15.newTemplate.items[i_r17]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.newTemplate.items.length > 1);
} }
function AuditChecklistsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.showModal = false; });
    i0.ɵɵelementStart(1, "div", 32);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 33);
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "Creer un modele de checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 34);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r25); const ctx_r27 = i0.ɵɵnextContext(); return ctx_r27.showModal = false; });
    i0.ɵɵelement(6, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 36);
    i0.ɵɵelementStart(8, "div", 37);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Titre du modele");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 38);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_18_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r28 = i0.ɵɵnextContext(); return ctx_r28.newTemplate.titre = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 37);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "textarea", 39);
    i0.ɵɵlistener("ngModelChange", function AuditChecklistsComponent_div_18_Template_textarea_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r29 = i0.ɵɵnextContext(); return ctx_r29.newTemplate.description = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 37);
    i0.ɵɵelementStart(17, "label");
    i0.ɵɵtext(18, "Elements a verifier");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AuditChecklistsComponent_div_18_div_19_Template, 3, 2, "div", 40);
    i0.ɵɵelementStart(20, "button", 41);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r25); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.addItem(); });
    i0.ɵɵelement(21, "i", 8);
    i0.ɵɵtext(22, " Ajouter un point");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 42);
    i0.ɵɵelementStart(24, "button", 43);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r25); const ctx_r31 = i0.ɵɵnextContext(); return ctx_r31.showModal = false; });
    i0.ɵɵtext(25, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 7);
    i0.ɵɵlistener("click", function AuditChecklistsComponent_div_18_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r25); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.saveTemplate(); });
    i0.ɵɵtext(27, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngModel", ctx_r3.newTemplate.titre);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r3.newTemplate.description);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.newTemplate.items)("ngForTrackBy", ctx_r3.trackByFn);
} }
export class AuditChecklistsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.templates = [];
        this.isLoading = false;
        this.showModal = false;
        this.newTemplate = {
            titre: '',
            description: '',
            items: ['']
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadTemplates();
    }
    loadTemplates() {
        this.isLoading = true;
        this.auditingService.getChecklistTemplates().subscribe({
            next: data => {
                this.templates = data;
                this.isLoading = false;
            },
            error: err => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    openCreateModal() {
        this.newTemplate = { titre: '', description: '', items: [''] };
        this.showModal = true;
    }
    addItem() {
        this.newTemplate.items.push('');
    }
    removeItem(index) {
        if (this.newTemplate.items.length > 1) {
            this.newTemplate.items.splice(index, 1);
        }
    }
    trackByFn(index) {
        return index;
    }
    saveTemplate() {
        if (!this.newTemplate.titre)
            return;
        const validItems = this.newTemplate.items.filter(i => i.trim() !== '');
        if (validItems.length === 0) {
            alert('Veuillez ajouter au moins un element a la checklist.');
            return;
        }
        this.isLoading = true;
        this.auditingService.createChecklistTemplate({
            titre: this.newTemplate.titre,
            description: this.newTemplate.description,
            items: validItems
        }).subscribe({
            next: () => {
                this.showModal = false;
                this.loadTemplates();
            },
            error: err => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de la creation du modele.');
            }
        });
    }
    deleteTemplate(id) {
        if (!confirm('Etes-vous sur de vouloir supprimer ce modele ?'))
            return;
        this.isLoading = true;
        this.auditingService.deleteChecklistTemplate(id).subscribe({
            next: () => {
                this.loadTemplates();
            },
            error: err => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de la suppression.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
AuditChecklistsComponent.ɵfac = function AuditChecklistsComponent_Factory(t) { return new (t || AuditChecklistsComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditChecklistsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditChecklistsComponent, selectors: [["app-audit-checklists"]], decls: 19, vars: 4, consts: [[1, "audit-page", "senior-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-tasks"], [1, "header-actions"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-plus"], ["class", "audit-tabs", 4, "ngIf"], ["class", "loader", 4, "ngIf"], ["class", "templates-grid", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loader"], [1, "templates-grid"], ["class", "empty-state", 4, "ngIf"], ["class", "card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "card"], [1, "card-header"], ["title", "Supprimer", 1, "icon-btn", "delete", 3, "click"], [1, "fas", "fa-trash"], [1, "card-body"], ["class", "desc", 4, "ngIf"], [1, "items-list"], [4, "ngFor", "ngForOf"], [1, "desc"], [1, "far", "fa-square", 2, "color", "#004a99"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body", "form-container"], [1, "form-group"], ["type", "text", "placeholder", "Ex: Checklist Audit Informatique", 3, "ngModel", "ngModelChange"], ["rows", "2", "placeholder", "Description du modele...", 3, "ngModel", "ngModelChange"], ["class", "item-input-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "btn-secondary", 3, "click"], [1, "modal-footer"], [1, "btn-cancel", 3, "click"], [1, "item-input-row"], ["type", "text", "placeholder", "Point de controle...", 3, "ngModel", "ngModelChange"], ["class", "icon-btn remove", 3, "click", 4, "ngIf"], [1, "icon-btn", "remove", 3, "click"], [1, "fas", "fa-minus-circle"]], template: function AuditChecklistsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditChecklistsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Modeles de Check-Lists");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Parametrez les checklists utilisees dans les missions d'audit et centralisez leur maintenance.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function AuditChecklistsComponent_Template_button_click_12_listener() { return ctx.openCreateModal(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Nouveau Modele");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, AuditChecklistsComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, AuditChecklistsComponent_div_16_Template, 2, 0, "div", 10);
        i0.ɵɵtemplate(17, AuditChecklistsComponent_div_17_Template, 3, 2, "div", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(18, AuditChecklistsComponent_div_18_Template, 28, 4, "div", 12);
    } if (rf & 2) {
        i0.ɵɵadvance(15);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showModal);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel], styles: ["@import '../audit-shared';\n\n$primary-color[_ngcontent-%COMP%]:   #004a99[_ngcontent-%COMP%];\n$border-color[_ngcontent-%COMP%]:   #e0e6ed[_ngcontent-%COMP%];\n$text-color[_ngcontent-%COMP%]:   #333[_ngcontent-%COMP%];\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n    min-height: 100vh;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\n}\n\n.header-actions[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n\n    h1 {\n        color: $primary-color;\n        font-size: 1.8rem;\n        i { margin-right: 10px; }\n    }\n}\n\n.templates-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n    gap: 1.5rem;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    text-align: center;\n    padding: 3rem;\n    color: #666;\n    background: #f8fafc;\n    border-radius: 8px;\n    border: 1px dashed $border-color;\n}\n\n.card[_ngcontent-%COMP%] {\n    background: #fff;\n    border: 1px solid $border-color;\n    border-radius: 8px;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.05);\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 1rem 1.5rem;\n        border-bottom: 1px solid $border-color;\n        background: #f8fafc;\n\n        h3 { margin: 0; font-size: 1.1rem; color: $text-color; }\n        .icon-btn.delete { color: #dc3545; }\n    }\n\n    .card-body {\n        padding: 1.5rem;\n\n        .desc {\n            color: #666;\n            font-size: 0.9rem;\n            margin-bottom: 1rem;\n        }\n\n        .items-list {\n            list-style: none;\n            padding: 0;\n            margin: 0;\n\n            li {\n                padding: 8px 0;\n                border-bottom: 1px solid #f1f5f9;\n                font-size: 0.95rem;\n                display: flex;\n                align-items: center;\n                gap: 10px;\n\n                &:last-child { border-bottom: none; }\n            }\n        }\n    }\n}\n\n.modal-overlay[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: rgba(0,0,0,0.5);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n    background: #fff;\n    width: 500px;\n    max-width: 90%;\n    border-radius: 8px;\n    box-shadow: 0 10px 25px rgba(0,0,0,0.1);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    padding: 1rem 1.5rem;\n    border-bottom: 1px solid $border-color;\n    h2 { margin: 0; font-size: 1.2rem; }\n}\n\n.modal-body[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    max-height: 60vh;\n    overflow-y: auto;\n}\n\n.form-group[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n\n    label {\n        display: block;\n        margin-bottom: 0.5rem;\n        font-weight: bold;\n    }\n\n    input[type=\"text\"],\n    textarea {\n        width: 100%;\n        padding: 0.75rem;\n        border: 1px solid $border-color;\n        border-radius: 4px;\n        box-sizing: border-box;\n    }\n}\n\n.item-input-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    margin-bottom: 10px;\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    gap: 1rem;\n    padding: 1rem 1.5rem;\n    border-top: 1px solid $border-color;\n    background: #f8fafc;\n}\n\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%], .btn-cancel[_ngcontent-%COMP%] {\n    padding: 0.5rem 1rem;\n    border-radius: 4px;\n    cursor: pointer;\n    border: none;\n    font-weight: 500;\n}\n\n.btn-primary[_ngcontent-%COMP%] { background: $primary-color; color: #fff; }\n.btn-secondary[_ngcontent-%COMP%] { background: #e0e6ed; color: #333; font-size: 0.9rem; }\n.btn-cancel[_ngcontent-%COMP%] { background: transparent; color: #666; }\n\n.icon-btn[_ngcontent-%COMP%] {\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: #666;\n\n    &:hover { opacity: 0.8; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditChecklistsComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-checklists',
                templateUrl: './audit-checklists.component.html',
                styleUrls: ['./audit-checklists.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-checklists.component.js.map