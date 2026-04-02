import { Component } from '@angular/core';
import { AuditingService } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function AuditEvidenceExplorerComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function AuditEvidenceExplorerComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 19);
    i0.ɵɵtemplate(1, AuditEvidenceExplorerComponent_nav_15_a_1_Template, 2, 4, "a", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditEvidenceExplorerComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵtext(2, " Chargement de la base documentaire... ");
    i0.ɵɵelementEnd();
} }
function AuditEvidenceExplorerComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "i", 25);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune preuve ne correspond \u00E0 votre recherche.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditEvidenceExplorerComponent_table_30_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "div", 28);
    i0.ɵɵlistener("click", function AuditEvidenceExplorerComponent_table_30_tr_14_Template_div_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const ev_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.downloadEvidence(ev_r7.path); });
    i0.ɵɵelement(3, "i", 29);
    i0.ɵɵelementStart(4, "span", 30);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 31);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelementStart(10, "div", 32);
    i0.ɵɵelement(11, "i", 33);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 34);
    i0.ɵɵelementStart(17, "button", 35);
    i0.ɵɵlistener("click", function AuditEvidenceExplorerComponent_table_30_tr_14_Template_button_click_17_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const ev_r7 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.downloadEvidence(ev_r7.path); });
    i0.ɵɵelement(18, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 37);
    i0.ɵɵlistener("click", function AuditEvidenceExplorerComponent_table_30_tr_14_Template_button_click_19_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const ev_r7 = restoredCtx.$implicit; const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.deleteEvidence(ev_r7); });
    i0.ɵɵelement(20, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r7 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ev_r7.filename);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((ev_r7.mission == null ? null : ev_r7.mission.titre) || "Mission #" + ev_r7.missionId);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", ev_r7.uploader == null ? null : ev_r7.uploader.prenom, " ", ev_r7.uploader == null ? null : ev_r7.uploader.nom, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 5, ev_r7.createdAt, "dd/MM/yyyy HH:mm"));
} }
function AuditEvidenceExplorerComponent_table_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 26);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Fichier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Mission d'Audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "D\u00E9pos\u00E9 par");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Date de d\u00E9p\u00F4t");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, AuditEvidenceExplorerComponent_table_30_tr_14_Template, 21, 8, "tr", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredEvidences);
} }
export class AuditEvidenceExplorerComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.allEvidences = [];
        this.filteredEvidences = [];
        this.isLoading = false;
        this.searchTerm = '';
        this.backendUrl = environment.apiUrl.replace('/api', '');
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadAllEvidence();
    }
    loadAllEvidence() {
        this.isLoading = true;
        this.auditingService.getAllEvidence().subscribe({
            next: (data) => {
                this.allEvidences = data;
                this.filteredEvidences = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    onSearch() {
        const term = this.searchTerm.toLowerCase().trim();
        if (!term) {
            this.filteredEvidences = this.allEvidences;
            return;
        }
        this.filteredEvidences = this.allEvidences.filter(ev => {
            var _a, _b, _c, _d, _e, _f;
            return ev.filename.toLowerCase().includes(term) ||
                ((_b = (_a = ev.mission) === null || _a === void 0 ? void 0 : _a.titre) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(term)) ||
                ((_d = (_c = ev.uploader) === null || _c === void 0 ? void 0 : _c.prenom) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(term)) ||
                ((_f = (_e = ev.uploader) === null || _e === void 0 ? void 0 : _e.nom) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes(term));
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
    deleteEvidence(ev) {
        if (!confirm(`Voulez-vous vraiment supprimer la preuve "${ev.filename}" ?`))
            return;
        this.auditingService.deleteMissionEvidence(ev.missionId, ev.id).subscribe({
            next: () => {
                this.allEvidences = this.allEvidences.filter(e => e.id !== ev.id);
                this.onSearch();
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
AuditEvidenceExplorerComponent.ɵfac = function AuditEvidenceExplorerComponent_Factory(t) { return new (t || AuditEvidenceExplorerComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditEvidenceExplorerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditEvidenceExplorerComponent, selectors: [["app-audit-evidence-explorer"]], decls: 31, vars: 7, consts: [[1, "audit-page", "senior-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-search-plus"], [1, "header-actions"], [1, "search-bar", "premium"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher par fichier, mission, auditeur...", 3, "ngModel", "ngModelChange", "input"], ["class", "audit-tabs", 4, "ngIf"], [1, "evidence-stats-row"], [1, "stat-mini-card"], [1, "label"], [1, "value"], [1, "explorer-card", "card"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-explorer", 4, "ngIf"], ["class", "premium-table", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "loading-state"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "empty-explorer"], [1, "fas", "fa-folder-open"], [1, "premium-table"], [4, "ngFor", "ngForOf"], [1, "file-info", 3, "click"], [1, "fas", "fa-file-alt", "file-icon"], [1, "file-name"], [1, "mission-tag"], [1, "uploader-info"], [1, "fas", "fa-user-circle"], [1, "actions-cell"], ["title", "T\u00E9l\u00E9charger", 1, "action-btn", "download", 3, "click"], [1, "fas", "fa-download"], ["title", "Supprimer", 1, "action-btn", "delete", 3, "click"], [1, "fas", "fa-trash-alt"]], template: function AuditEvidenceExplorerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditEvidenceExplorerComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Explorateur de Preuves");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Consultez et g\u00E9rez l'ensemble des preuves d\u00E9pos\u00E9es par les auditeurs.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵelementStart(14, "input", 9);
        i0.ɵɵlistener("ngModelChange", function AuditEvidenceExplorerComponent_Template_input_ngModelChange_14_listener($event) { return ctx.searchTerm = $event; })("input", function AuditEvidenceExplorerComponent_Template_input_input_14_listener() { return ctx.onSearch(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, AuditEvidenceExplorerComponent_nav_15_Template, 2, 1, "nav", 10);
        i0.ɵɵelementStart(16, "div", 11);
        i0.ɵɵelementStart(17, "div", 12);
        i0.ɵɵelementStart(18, "span", 13);
        i0.ɵɵtext(19, "Total Preuves");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "span", 14);
        i0.ɵɵtext(21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "div", 12);
        i0.ɵɵelementStart(23, "span", 13);
        i0.ɵɵtext(24, "Filtres actifs");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "span", 14);
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 15);
        i0.ɵɵtemplate(28, AuditEvidenceExplorerComponent_div_28_Template, 3, 0, "div", 16);
        i0.ɵɵtemplate(29, AuditEvidenceExplorerComponent_div_29_Template, 4, 0, "div", 17);
        i0.ɵɵtemplate(30, AuditEvidenceExplorerComponent_table_30_Template, 15, 1, "table", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngModel", ctx.searchTerm);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.allEvidences.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.filteredEvidences.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredEvidences.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredEvidences.length > 0);
    } }, directives: [i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i4.NgIf, i4.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive], pipes: [i4.DatePipe], styles: ["@import '../audit-shared';\n\n.evidence-stats-row[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 20px;\n    margin: 20px 0;\n}\n\n.stat-mini-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 15px 25px;\n    border-radius: 12px;\n    box-shadow: 0 4px 10px rgba(0,0,0,0.03);\n    border: 1px solid #edf2f7;\n    display: flex;\n    flex-direction: column;\n    .label { font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase; }\n    .value { font-size: 1.5rem; font-weight: 800; color: #004a99; }\n}\n\n.search-bar.premium[_ngcontent-%COMP%] {\n    background: #f1f5f9;\n    padding: 10px 20px;\n    border-radius: 30px;\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    width: 400px;\n    border: 1px solid transparent;\n    transition: all 0.2s;\n    &:focus-within { background: white; border-color: #004a99; box-shadow: 0 0 0 4px rgba(0,74,153,0.1); }\n    input { border: none; background: none; width: 100%; outline: none; font-size: 0.95rem; color: #1e293b; }\n    i { color: #94a3b8; }\n}\n\n.explorer-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 16px;\n    padding: 20px;\n    box-shadow: 0 10px 25px rgba(0,0,0,0.05);\n}\n\n.premium-table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n    th { text-align: left; padding: 15px; border-bottom: 2px solid #f1f5f9; color: #64748b; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; }\n    td { padding: 15px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    tr:hover td { background: #f8fafc; }\n}\n\n.file-info[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    cursor: pointer;\n    .file-icon { color: #004a99; font-size: 1.2rem; }\n    .file-name { font-weight: 700; color: #334155; &:hover { color: #004a99; text-decoration: underline; } }\n}\n\n.mission-tag[_ngcontent-%COMP%] {\n    background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;\n}\n\n.uploader-info[_ngcontent-%COMP%] {\n    display: flex; align-items: center; gap: 8px; color: #475569; font-weight: 500;\n    i { color: #94a3b8; }\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 10px;\n    .action-btn {\n        width: 36px; height: 36px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;\n        &.download { background: #f0f7ff; color: #004a99; &:hover { background: #004a99; color: white; } }\n        &.delete { background: #fff1f2; color: #ef4444; &:hover { background: #ef4444; color: white; } }\n    }\n}\n\n.loading-state[_ngcontent-%COMP%], .empty-explorer[_ngcontent-%COMP%] {\n    text-align: center; padding: 60px; color: #94a3b8;\n    i { font-size: 3rem; margin-bottom: 20px; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditEvidenceExplorerComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-evidence-explorer',
                templateUrl: './audit-evidence-explorer.component.html',
                styleUrls: ['./audit-evidence-explorer.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-evidence-explorer.component.js.map