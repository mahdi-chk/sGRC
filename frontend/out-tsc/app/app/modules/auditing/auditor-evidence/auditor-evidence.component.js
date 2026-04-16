import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function AuditorEvidenceComponent_nav_11_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.label, " ");
} }
function AuditorEvidenceComponent_nav_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 15);
    i0.ɵɵtemplate(1, AuditorEvidenceComponent_nav_11_a_1_Template, 2, 4, "a", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditorEvidenceComponent_li_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 18);
    i0.ɵɵlistener("click", function AuditorEvidenceComponent_li_18_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const mission_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.selectMission(mission_r7); });
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelement(2, "i", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 21);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 22);
    i0.ɵɵelementStart(7, "span", 23);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r1.selectedMission == null ? null : ctx_r1.selectedMission.id) === mission_r7.id);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(mission_r7.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(mission_r7.statut.toLowerCase());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r7.statut);
} }
function AuditorEvidenceComponent_div_20_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementEnd();
} }
function AuditorEvidenceComponent_div_20_div_12_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune preuve t\u00E9l\u00E9vers\u00E9e pour cette mission.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 56);
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 57);
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 58);
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 59);
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 60);
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelementStart(1, "div", 42);
    i0.ɵɵlistener("click", function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const ev_r15 = restoredCtx.$implicit; const ctx_r21 = i0.ɵɵnextContext(4); return ctx_r21.downloadEvidence(ev_r15.path); });
    i0.ɵɵtemplate(2, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_2_Template, 1, 0, "i", 43);
    i0.ɵɵtemplate(3, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_3_Template, 1, 0, "i", 44);
    i0.ɵɵtemplate(4, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_4_Template, 1, 0, "i", 45);
    i0.ɵɵtemplate(5, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_5_Template, 1, 0, "i", 46);
    i0.ɵɵtemplate(6, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_i_6_Template, 1, 0, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 48);
    i0.ɵɵelementStart(8, "span", 49);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 50);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 51);
    i0.ɵɵelementStart(14, "button", 52);
    i0.ɵɵlistener("click", function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_Template_button_click_14_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const ev_r15 = restoredCtx.$implicit; const ctx_r23 = i0.ɵɵnextContext(4); return ctx_r23.downloadEvidence(ev_r15.path); });
    i0.ɵɵelement(15, "i", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 54);
    i0.ɵɵlistener("click", function AuditorEvidenceComponent_div_20_div_12_div_2_div_1_Template_button_click_16_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const ev_r15 = restoredCtx.$implicit; const ctx_r24 = i0.ɵɵnextContext(4); return ctx_r24.deleteEvidence(ev_r15.id); });
    i0.ɵɵelement(17, "i", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ev_r15.filename.endsWith(".pdf"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ev_r15.filename.endsWith(".xlsx"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ev_r15.filename.endsWith(".docx"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ev_r15.filename.match(".(jpg|jpeg|png)$"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ev_r15.filename.match(".(pdf|xlsx|docx|jpg|jpeg|png)$"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", ev_r15.filename);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ev_r15.filename);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 8, ev_r15.createdAt, "dd/MM/yyyy"));
} }
function AuditorEvidenceComponent_div_20_div_12_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtemplate(1, AuditorEvidenceComponent_div_20_div_12_div_2_div_1_Template, 18, 11, "div", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r13.evidences);
} }
function AuditorEvidenceComponent_div_20_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtemplate(1, AuditorEvidenceComponent_div_20_div_12_div_1_Template, 4, 0, "div", 35);
    i0.ɵɵtemplate(2, AuditorEvidenceComponent_div_20_div_12_div_2_Template, 2, 1, "div", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.evidences.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.evidences.length > 0);
} }
function AuditorEvidenceComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 24);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 25);
    i0.ɵɵelementStart(5, "label", 26);
    i0.ɵɵelementStart(6, "input", 27);
    i0.ɵɵlistener("change", function AuditorEvidenceComponent_div_20_Template_input_change_6_listener($event) { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.onFileSelected($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "i", 28);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 29);
    i0.ɵɵlistener("click", function AuditorEvidenceComponent_div_20_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r26); const ctx_r27 = i0.ɵɵnextContext(); return ctx_r27.uploadEvidence(); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, AuditorEvidenceComponent_div_20_div_11_Template, 2, 0, "div", 30);
    i0.ɵɵtemplate(12, AuditorEvidenceComponent_div_20_div_12_Template, 3, 2, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Preuves : ", ctx_r2.selectedMission.titre, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedFile ? ctx_r2.selectedFile.name : "Choisir un fichier...", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r2.selectedFile || ctx_r2.isUploading);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isUploading ? "Envoi..." : "Ajouter la Preuve", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.isLoading);
} }
function AuditorEvidenceComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "S\u00E9lectionnez un enregistrement pour g\u00E9rer ses preuves.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class AuditorEvidenceComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        this.selectedMission = null;
        this.evidences = [];
        this.isLoading = false;
        this.isUploading = false;
        this.selectedFile = null;
        this.backendUrl = environment.apiUrl.replace('/api', '');
        this.currentUserRole = getStoredAuditRole();
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadMissions();
    }
    loadMissions() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.router.navigate(['/login']);
            return;
        }
        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);
        this.currentUserRole = currentUser.role || null;
        this.auditingService.getMissions('all').subscribe({
            next: (data) => {
                this.missions = data.filter(m => Number(m.auditeurId) === userId && m.statut !== AuditMissionStatus.ANNULE);
                if (this.isSuperAdmin) {
                    this.missions = data.filter(m => m.statut !== AuditMissionStatus.ANNULE);
                }
                this.isLoading = false;
                if (this.missions.length > 0) {
                    this.selectMission(this.missions[0]);
                }
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    selectMission(mission) {
        this.selectedMission = mission;
        this.loadEvidences(mission.id);
    }
    loadEvidences(missionId) {
        this.isLoading = true;
        this.auditingService.getMissionEvidence(missionId).subscribe({
            next: (data) => {
                this.evidences = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }
    uploadEvidence() {
        if (!this.selectedMission || !this.selectedFile)
            return;
        this.isUploading = true;
        this.auditingService.addMissionEvidence(this.selectedMission.id, this.selectedFile).subscribe({
            next: (newEvidence) => {
                this.evidences.unshift(newEvidence);
                this.selectedFile = null;
                this.isUploading = false;
                // Reset file input if possible
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput)
                    fileInput.value = '';
            },
            error: (err) => {
                console.error(err);
                this.isUploading = false;
                alert('Erreur lors de l\'upload du fichier.');
            }
        });
    }
    deleteEvidence(evidenceId) {
        if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?'))
            return;
        this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
            next: () => {
                this.evidences = this.evidences.filter(e => e.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    downloadEvidence(path) {
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
        window.open(urlWithToken, '_blank');
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    get isSuperAdmin() {
        return this.currentUserRole === UserRole.SUPER_ADMIN;
    }
}
AuditorEvidenceComponent.ɵfac = function AuditorEvidenceComponent_Factory(t) { return new (t || AuditorEvidenceComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditorEvidenceComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorEvidenceComponent, selectors: [["app-auditor-evidence"]], decls: 23, vars: 5, consts: [[1, "audit-page", "auditor-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-paperclip"], ["class", "audit-tabs", 4, "ngIf"], [1, "dual-layout"], [1, "sidebar-list", "card"], [1, "list-header"], [1, "item-list"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "main-content", "card"], [4, "ngIf", "ngIfElse"], ["selectPrompt", ""], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [3, "click"], [1, "item-icon"], [1, "fas", "fa-file-contract"], [1, "item-info"], [1, "meta-tags"], [1, "status-tag"], [1, "content-header"], [1, "upload-zone"], [1, "custom-file-upload"], ["type", "file", "accept", ".pdf,.docx,.xlsx,.jpg,.jpeg,.png", 3, "change"], [1, "fas", "fa-cloud-upload-alt"], [1, "btn-primary", 3, "disabled", "click"], ["class", "loading-overlay", 4, "ngIf"], ["class", "evidence-container", 4, "ngIf"], [1, "loading-overlay"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "evidence-container"], ["class", "empty-evidence", 4, "ngIf"], ["class", "evidence-grid", 4, "ngIf"], [1, "empty-evidence"], [1, "fas", "fa-folder-open"], [1, "evidence-grid"], ["class", "evidence-card", 4, "ngFor", "ngForOf"], [1, "evidence-card"], [1, "ev-preview", 3, "click"], ["class", "fas fa-file-pdf", 4, "ngIf"], ["class", "fas fa-file-excel", 4, "ngIf"], ["class", "fas fa-file-word", 4, "ngIf"], ["class", "fas fa-file-image", 4, "ngIf"], ["class", "fas fa-file-alt", 4, "ngIf"], [1, "ev-details"], [1, "ev-name", 3, "title"], [1, "ev-date"], [1, "ev-actions"], ["title", "T\u00E9l\u00E9charger", 1, "icon-btn", "download", 3, "click"], [1, "fas", "fa-download"], ["title", "Supprimer", 1, "icon-btn", "delete", 3, "click"], [1, "fas", "fa-trash-alt"], [1, "fas", "fa-file-pdf"], [1, "fas", "fa-file-excel"], [1, "fas", "fa-file-word"], [1, "fas", "fa-file-image"], [1, "fas", "fa-file-alt"], [1, "select-prompt"]], template: function AuditorEvidenceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditorEvidenceComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "G\u00E9rez les documents de preuve pour vos missions d'audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AuditorEvidenceComponent_nav_11_Template, 2, 1, "nav", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "h3");
        i0.ɵɵtext(16, "Missions et Plan d'actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "ul", 10);
        i0.ɵɵtemplate(18, AuditorEvidenceComponent_li_18_Template, 9, 6, "li", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 12);
        i0.ɵɵtemplate(20, AuditorEvidenceComponent_div_20_Template, 13, 6, "div", 13);
        i0.ɵɵtemplate(21, AuditorEvidenceComponent_ng_template_21_Template, 4, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(22);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.isSuperAdmin ? "Preuves d Audit" : "Mes Preuves", "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.missions);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedMission)("ngIfElse", _r3);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], pipes: [i3.DatePipe], styles: ["@import '../audit-shared';\n\n\n.dual-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 350px 1fr;\n    gap: 25px;\n    height: calc(100vh - 200px);\n    margin-top: 20px;\n}\n\n.card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.05);\n    border: 1px solid #edf2f7;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n}\n\n.sidebar-list[_ngcontent-%COMP%] {\n    overflow-y: auto;\n    .item-list {\n        list-style: none;\n        padding: 0;\n        margin: 0;\n        li {\n            padding: 15px 20px;\n            cursor: pointer;\n            border-bottom: 1px solid #f8fafc;\n            &.active { background: #f0f7ff; border-left: 4px solid #004a99; }\n            .item-info { display: flex; flex-direction: column; .status-tag { font-size: 0.75rem; font-weight: 700; &.en-cours { color: #3b82f6; } } }\n        }\n    }\n}\n\n.main-content[_ngcontent-%COMP%] {\n    padding: 30px;\n    position: relative;\n    overflow-y: auto;\n    .content-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 30px;\n        padding-bottom: 20px;\n        border-bottom: 1px solid #f1f5f9;\n        h2 { margin: 0; font-size: 1.4rem; color: #1e293b; }\n    }\n}\n\n.upload-zone[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 15px;\n    align-items: center;\n\n    .custom-file-upload {\n        border: 2px dashed #cbd5e1;\n        display: inline-block;\n        padding: 10px 20px;\n        cursor: pointer;\n        border-radius: 8px;\n        color: #64748b;\n        font-weight: 500;\n        transition: all 0.2s;\n        &:hover { background: #f8fafc; border-color: #004a99; color: #004a99; }\n        input { display: none; }\n        i { margin-right: 10px; }\n    }\n}\n\n.evidence-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n    gap: 20px;\n}\n\n.evidence-card[_ngcontent-%COMP%] {\n    border: 1px solid #edf2f7;\n    border-radius: 12px;\n    overflow: hidden;\n    transition: all 0.2s;\n    &:hover { transform: translateY(-3px); box-shadow: 0 10px 15px rgba(0,0,0,0.05); }\n\n    .ev-preview {\n        height: 120px;\n        background: #f1f5f9;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        i { font-size: 3rem; color: #94a3b8; }\n        &:hover i { color: #004a99; }\n    }\n\n    .ev-details {\n        padding: 12px;\n        display: flex;\n        flex-direction: column;\n        gap: 5px;\n        .ev-name { font-weight: 600; font-size: 0.9rem; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n        .ev-date { font-size: 0.75rem; color: #94a3b8; }\n    }\n\n    .ev-actions {\n        display: flex;\n        gap: 10px;\n        margin-top: 10px;\n        .icon-btn {\n            background: none; border: none; cursor: pointer; color: #94a3b8; transition: color 0.2s;\n            &:hover.download { color: #004a99; }\n            &:hover.delete { color: #ef4444; }\n        }\n    }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: rgba(255,255,255,0.7);\n    display: flex; align-items: center; justify-content: center; z-index: 10;\n    i { font-size: 2rem; color: #004a99; }\n}\n\n.select-prompt[_ngcontent-%COMP%] {\n    display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8;\n    i { font-size: 3rem; margin-bottom: 20px; color: #e2e8f0; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorEvidenceComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-evidence',
                templateUrl: './auditor-evidence.component.html',
                styleUrls: ['./auditor-evidence.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auditor-evidence.component.js.map