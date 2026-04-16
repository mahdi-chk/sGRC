import { Component } from '@angular/core';
import { AuditingService, AuditMissionStatus, AuditMissionHorizon } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAuditNavItems, getStoredAuditRole } from '../../../../modules/auditing/audit-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../../../shared/components/pagination/pagination.component";
const _c0 = function () { return { exact: true }; };
function AuditStatisticsComponent_nav_24_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function AuditStatisticsComponent_nav_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 78);
    i0.ɵɵtemplate(1, AuditStatisticsComponent_nav_24_a_1_Template, 2, 4, "a", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function AuditStatisticsComponent_div_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelementStart(1, "div", 82);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 83);
    i0.ɵɵelementStart(4, "div", 84);
    i0.ɵɵelementStart(5, "span", 85);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r8.key);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", entry_r8.value / ctx_r1.totalMissions * 100 || 0, "%");
    i0.ɵɵproperty("ngClass", entry_r8.key.toLowerCase().replace("\u00E0", "a").replace(" ", "-").replace("\u00E9", "e"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r8.value);
} }
function AuditStatisticsComponent_button_146_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function AuditStatisticsComponent_button_146_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.clearFilters(); });
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵtext(2, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function AuditStatisticsComponent_div_153_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88);
    i0.ɵɵelement(1, "i", 89);
    i0.ɵɵtext(2, " Chargement... ");
    i0.ɵɵelementEnd();
} }
function AuditStatisticsComponent_table_154_tr_20_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104);
    i0.ɵɵelement(1, "i", 105);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", mission_r13.auditeur.prenom, " ", mission_r13.auditeur.nom, " ");
} }
function AuditStatisticsComponent_table_154_tr_20_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em", 106);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r13.responsabilites || "Non assign\u00E9");
} }
function AuditStatisticsComponent_table_154_tr_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 91);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 96);
    i0.ɵɵelementStart(6, "span", 97);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 98);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 92);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 99);
    i0.ɵɵtemplate(13, AuditStatisticsComponent_table_154_tr_20_div_13_Template, 3, 2, "div", 100);
    i0.ɵɵtemplate(14, AuditStatisticsComponent_table_154_tr_20_ng_template_14_Template, 2, 1, "ng-template", null, 101, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 102);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 103);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r13 = ctx.$implicit;
    const _r15 = i0.ɵɵreference(15);
    const ctx_r11 = i0.ɵɵnextContext(2);
    let tmp_5_0;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r13.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r13.regleDnssi || mission_r13.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", mission_r13.recommandations || mission_r13.objectifs || "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r11.getRecommendationPreview(mission_r13.recommandations || mission_r13.objectifs, 10), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r11.horizonLabelMap[mission_r13.horizon || ""] || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_5_0 = mission_r13.priorite) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "-");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mission_r13.auditeur)("ngIfElse", _r15);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r13.delai ? i0.ɵɵpipeBind2(18, 12, mission_r13.delai, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge status-" + (mission_r13.statut || "").toString().replace("_", "-"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r11.statusLabelMap[(mission_r13.statut || "").toString()] || (mission_r13.statut || "").toString());
} }
function AuditStatisticsComponent_table_154_tr_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 107);
    i0.ɵɵelement(2, "i", 108);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun enregistrement trouv\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AuditStatisticsComponent_table_154_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 90);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th", 91);
    i0.ɵɵtext(4, "ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "R\u00E8gle DNSSI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Horizon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 92);
    i0.ɵɵtext(12, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Ech\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Etat d'avancement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, AuditStatisticsComponent_table_154_tr_20_Template, 22, 15, "tr", 93);
    i0.ɵɵtemplate(21, AuditStatisticsComponent_table_154_tr_21_Template, 5, 0, "tr", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r4.pagedMissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.filteredMissions.length === 0);
} }
function AuditStatisticsComponent_app_pagination_155_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 109);
    i0.ɵɵlistener("pageChanged", function AuditStatisticsComponent_app_pagination_155_Template_app_pagination_pageChanged_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onPaginationChange($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalItems", ctx_r5.filteredMissions.length)("currentPage", ctx_r5.currentPage)("pageSize", ctx_r5.pageSize)("pageSizeOptions", ctx_r5.pageSizeOptions);
} }
export class AuditStatisticsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.currentUserRole = getStoredAuditRole();
        this.missions = [];
        this.filteredMissions = [];
        this.pagedMissions = [];
        // Stats for Charts
        this.statusStats = {};
        this.statusSummary = { OK: 0, 'En cours': 0, NOK: 0 };
        this.statusSummaryPercentages = [];
        this.totalMissions = 0;
        this.completionRate = 0;
        this.delayedRate = 0;
        this.onTimeRate = 0;
        this.showExportMenu = false;
        // Table pagination
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 50, 100];
        this.filterSearch = '';
        this.filterStatus = '';
        this.AuditMissionStatus = AuditMissionStatus;
        this.statusLabelMap = {
            [AuditMissionStatus.NOK]: 'NOK',
            [AuditMissionStatus.EN_COURS]: 'En cours',
            [AuditMissionStatus.OK]: 'OK'
        };
        this.horizonLabelMap = {
            [AuditMissionHorizon.COURT_TERME]: 'A court terme',
            [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
        };
    }
    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.auditingService.getMissions().subscribe(missions => {
            this.missions = missions;
            this.totalMissions = missions.length;
            this.applyFilters();
            this.calculateStats();
        });
    }
    applyFilters() {
        this.filteredMissions = this.missions.filter((m) => {
            const q = this.filterSearch.toLowerCase();
            const matchSearch = !this.filterSearch
                || String(m.id).includes(q)
                || (m.titre || '').toLowerCase().includes(q)
                || (m.regleDnssi || '').toLowerCase().includes(q)
                || (m.recommandations || m.objectifs || '').toLowerCase().includes(q)
                || (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(q))
                || (m.responsabilites || '').toLowerCase().includes(q);
            const missionStatut = this.normalizeMissionStatus(m.statutCode || m.statut);
            const filterStatut = this.normalizeMissionStatus(this.filterStatus);
            const matchStatus = !filterStatut || missionStatut === filterStatut;
            return matchSearch && matchStatus;
        });
        this.currentPage = 1;
        this.updatePagedMissions();
    }
    onFilterChange() {
        this.applyFilters();
    }
    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }
    onPaginationChange(event) {
        this.currentPage = event.page;
        this.pageSize = event.pageSize;
        this.updatePagedMissions();
    }
    updatePagedMissions() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedMissions = this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
    }
    normalizeMissionStatus(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    getRecommendationPreview(value, maxWords = 10) {
        const text = (value || '').trim();
        if (!text) {
            return '-';
        }
        const words = text.split(/\s+/);
        if (words.length <= maxWords) {
            return text;
        }
        return `${words.slice(0, maxWords).join(' ')}...`;
    }
    calculateStats() {
        this.statusStats = {
            'À venir': 0,
            'En cours': 0,
            'Terminé': 0,
            'En retard': 0,
            'Annulé': 0
        };
        this.missions.forEach(m => {
            if (this.statusStats[m.statut] !== undefined) {
                this.statusStats[m.statut]++;
            }
        });
        const completedCount = this.statusStats['Terminé'] || 0;
        this.completionRate = this.totalMissions > 0 ? Math.round((completedCount / this.totalMissions) * 100) : 0;
        const delayedCount = this.statusStats['En retard'] || 0;
        this.delayedRate = this.totalMissions > 0 ? Math.round((delayedCount / this.totalMissions) * 100) : 0;
        // On time rate = (Total - Late - Canceled) / Total
        const onTimeCount = this.totalMissions - delayedCount - (this.statusStats['Annulé'] || 0);
        this.onTimeRate = this.totalMissions > 0 ? Math.round((onTimeCount / this.totalMissions) * 100) : 0;
        this.statusSummary = { OK: 0, 'En cours': 0, NOK: 0 };
        this.missions.forEach(m => {
            const status = (m.statut || '').toString().trim();
            if (status.toLowerCase() === 'ok') {
                this.statusSummary.OK++;
            }
            else if (status.toLowerCase() === 'nok') {
                this.statusSummary.NOK++;
            }
            else {
                this.statusSummary['En cours']++;
            }
        });
        const summaryTotal = this.totalMissions;
        this.statusSummaryPercentages = [
            { label: 'OK', count: this.statusSummary.OK, percent: summaryTotal ? Math.round((this.statusSummary.OK / summaryTotal) * 100) : 0, class: 'ok' },
            { label: 'En cours', count: this.statusSummary['En cours'], percent: summaryTotal ? Math.round((this.statusSummary['En cours'] / summaryTotal) * 100) : 0, class: 'progress' },
            { label: 'NOK', count: this.statusSummary.NOK, percent: summaryTotal ? Math.round((this.statusSummary.NOK / summaryTotal) * 100) : 0, class: 'nok' }
        ];
        this.updatePagedMissions();
    }
    // Helper for CSS Pie Charts
    getRotation(value, total) {
        return total > 0 ? (value / total) * 360 : 0;
    }
    exportCSV() {
        // Replaced by XLSX and PDF
    }
    exportToXLSX() {
        this.showExportMenu = false;
        const rows = [
            ['Catégorie', 'Métrique', 'Valeur'],
            ['Vue d\'ensemble', 'Total Missions', this.totalMissions],
            ['Vue d\'ensemble', 'Taux de Complétion', this.completionRate + '%'],
            ['Vue d\'ensemble', 'Taux de Retard', this.delayedRate + '%'],
            ['Vue d\'ensemble', 'Taux à Temps', this.onTimeRate + '%'],
            [''],
            ['État d\'Avancement des Missions', '', ''],
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v])
        ];
        const ws = XLSX.utils.aoa_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Statistiques Audit');
        XLSX.writeFile(wb, `statistiques_audit_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
    exportToPDF() {
        this.showExportMenu = false;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Statistiques d\'Audit', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
        const overviewData = [
            ['Missions Totales', this.totalMissions.toString()],
            ['Taux de Complétion', this.completionRate + '%'],
            ['Taux de Retard', this.delayedRate + '%'],
            ['Taux à Temps', this.onTimeRate + '%']
        ];
        autoTable(doc, {
            startY: 40,
            head: [['Métrique', 'Valeur']],
            body: overviewData,
            theme: 'grid',
            headStyles: { fillColor: [0, 74, 153] }
        });
        const statusData = Object.entries(this.statusStats).map(([k, v]) => [k, v.toString()]);
        doc.setFontSize(14);
        doc.text('État d\'Avancement', 14, doc.lastAutoTable.finalY + 15);
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [['Statut', 'Nombre']],
            body: statusData,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });
        doc.save(`statistiques_audit_${new Date().toISOString().split('T')[0]}.pdf`);
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
AuditStatisticsComponent.ɵfac = function AuditStatisticsComponent_Factory(t) { return new (t || AuditStatisticsComponent)(i0.ɵɵdirectiveInject(i1.AuditingService), i0.ɵɵdirectiveInject(i2.Router)); };
AuditStatisticsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditStatisticsComponent, selectors: [["app-audit-statistics"]], decls: 156, vars: 45, consts: [[1, "audit-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-pie"], [1, "header-actions"], [1, "export-dropdown"], [1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], ["class", "audit-tabs", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-layer-group"], [1, "stat-info"], [1, "label"], [1, "value"], [1, "stat-card", "pending"], [1, "fas", "fa-play-circle"], [1, "stat-card", "completed"], [1, "fas", "fa-check-double"], [1, "stat-card", "risks"], [1, "fas", "fa-user-clock"], [1, "dashboard-grid"], [1, "module-card", "premium", "chart-card"], [1, "chart-container", "donut-wrapper"], [1, "donut-chart", "audit-status"], [1, "donut-inner"], [1, "total"], [1, "sub"], [1, "chart-legend"], [1, "legend-item", "ok"], [1, "dot"], [1, "legend-item", "progress"], [1, "legend-item", "nok"], [1, "module-card", "premium", "chart-card", "full-width-module"], [1, "fas", "fa-tasks"], [1, "chart-container", "bar-wrapper"], [1, "bar-chart"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "fas", "fa-tachometer-alt"], [1, "progress-circles"], [1, "circle-item"], [1, "premium-circle", "treatment"], [1, "percent"], [1, "circle-label"], [1, "premium-circle", "maturity"], [1, "fas", "fa-info-circle"], [1, "domain-list"], [1, "domain-item"], [1, "domain-info"], [1, "name"], [1, "count"], [1, "progress-lite"], [1, "fill", 2, "background", "#ef4444"], [1, "fill", 2, "background", "#3b82f6"], [1, "tab-content"], [1, "filters-bar", "premium", "mb-4"], [1, "filter-controls"], [1, "filter-group"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Rechercher par ID, r\u00E8gle, recommandation ou responsable...", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value"], ["class", "btn-reset", 3, "click", 4, "ngIf"], [1, "results-info"], [1, "count-tag"], [1, "missions-card"], ["class", "table-loading", 4, "ngIf"], ["class", "audit-table", 4, "ngIf"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged", 4, "ngIf"], [1, "audit-tabs"], ["routerLinkActive", "active", "class", "audit-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "audit-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "bar-group"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill", 3, "ngClass"], [1, "bar-value"], [1, "btn-reset", 3, "click"], [1, "fas", "fa-undo"], [1, "table-loading"], [1, "fas", "fa-circle-notch", "fa-spin"], [1, "audit-table"], [1, "cell-id"], [1, "cell-priority"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "cell-rule"], [1, "cell-recommendation"], [1, "recommendation-preview", 3, "title"], [1, "cell-horizon"], [1, "cell-owner"], ["class", "auditor-chip", 4, "ngIf", "ngIfElse"], ["responsibleText", ""], [1, "cell-date"], [1, "cell-status"], [1, "auditor-chip"], [1, "fas", "fa-user-tie"], [1, "text-muted", "responsible-text"], ["colspan", "8", 1, "empty-state"], [1, "fas", "fa-folder-open"], [3, "totalItems", "currentPage", "pageSize", "pageSizeOptions", "pageChanged"]], template: function AuditStatisticsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Statistiques d'Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Analyse de la performance des processus d'audit, suivi des missions et taux de compl\u00E9tion.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "button", 8);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_13_listener() { return ctx.showExportMenu = !ctx.showExportMenu; });
        i0.ɵɵelement(14, "i", 9);
        i0.ɵɵtext(15, " Exporter ");
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "button", 12);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_18_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(19, "i", 13);
        i0.ɵɵtext(20, " Excel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "button", 12);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_21_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(22, "i", 14);
        i0.ɵɵtext(23, " PDF");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, AuditStatisticsComponent_nav_24_Template, 2, 1, "nav", 15);
        i0.ɵɵelementStart(25, "div", 16);
        i0.ɵɵelementStart(26, "div", 17);
        i0.ɵɵelementStart(27, "div", 18);
        i0.ɵɵelement(28, "i", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "div", 20);
        i0.ɵɵelementStart(30, "span", 21);
        i0.ɵɵtext(31, "Total");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "span", 22);
        i0.ɵɵtext(33);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "div", 23);
        i0.ɵɵelementStart(35, "div", 18);
        i0.ɵɵelement(36, "i", 24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 20);
        i0.ɵɵelementStart(38, "span", 21);
        i0.ɵɵtext(39, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "span", 22);
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "div", 25);
        i0.ɵɵelementStart(43, "div", 18);
        i0.ɵɵelement(44, "i", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 20);
        i0.ɵɵelementStart(46, "span", 21);
        i0.ɵɵtext(47, "OK");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(48, "span", 22);
        i0.ɵɵtext(49);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "div", 27);
        i0.ɵɵelementStart(51, "div", 18);
        i0.ɵɵelement(52, "i", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "div", 20);
        i0.ɵɵelementStart(54, "span", 21);
        i0.ɵɵtext(55, "En retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "span", 22);
        i0.ɵɵtext(57);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "div", 29);
        i0.ɵɵelementStart(59, "div", 30);
        i0.ɵɵelementStart(60, "h3");
        i0.ɵɵelement(61, "i", 5);
        i0.ɵɵtext(62, " Statuts Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "div", 31);
        i0.ɵɵelementStart(64, "div", 32);
        i0.ɵɵelementStart(65, "div", 33);
        i0.ɵɵelementStart(66, "div", 34);
        i0.ɵɵtext(67);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "div", 35);
        i0.ɵɵtext(69, "Missions totales");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "div", 36);
        i0.ɵɵelementStart(71, "div", 37);
        i0.ɵɵelement(72, "span", 38);
        i0.ɵɵelementStart(73, "span");
        i0.ɵɵtext(74);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "div", 39);
        i0.ɵɵelement(76, "span", 38);
        i0.ɵɵelementStart(77, "span");
        i0.ɵɵtext(78);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(79, "div", 40);
        i0.ɵɵelement(80, "span", 38);
        i0.ɵɵelementStart(81, "span");
        i0.ɵɵtext(82);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "div", 41);
        i0.ɵɵelementStart(84, "h3");
        i0.ɵɵelement(85, "i", 42);
        i0.ɵɵtext(86, " \u00C9tat d'Avancement des Missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "div", 43);
        i0.ɵɵelementStart(88, "div", 44);
        i0.ɵɵtemplate(89, AuditStatisticsComponent_div_89_Template, 7, 5, "div", 45);
        i0.ɵɵpipe(90, "keyvalue");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(91, "div", 30);
        i0.ɵɵelementStart(92, "h3");
        i0.ɵɵelement(93, "i", 46);
        i0.ɵɵtext(94, " Performance Op\u00E9rationnelle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(95, "div", 47);
        i0.ɵɵelementStart(96, "div", 48);
        i0.ɵɵelementStart(97, "div", 49);
        i0.ɵɵelementStart(98, "span", 50);
        i0.ɵɵtext(99);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(100, "span", 51);
        i0.ɵɵtext(101, "Taux de Compl\u00E9tion");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "div", 48);
        i0.ɵɵelementStart(103, "div", 52);
        i0.ɵɵelementStart(104, "span", 50);
        i0.ɵɵtext(105);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(106, "span", 51);
        i0.ɵɵtext(107, "Taux de Ponctualit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(108, "div", 30);
        i0.ɵɵelementStart(109, "h3");
        i0.ɵɵelement(110, "i", 53);
        i0.ɵɵtext(111, " Synth\u00E8se d'Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(112, "div", 54);
        i0.ɵɵelementStart(113, "div", 55);
        i0.ɵɵelementStart(114, "div", 56);
        i0.ɵɵelementStart(115, "span", 57);
        i0.ɵɵtext(116, "Missions Critiques (Retard)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(117, "span", 58);
        i0.ɵɵtext(118);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(119, "div", 59);
        i0.ɵɵelement(120, "div", 60);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(121, "div", 55);
        i0.ɵɵelementStart(122, "div", 56);
        i0.ɵɵelementStart(123, "span", 57);
        i0.ɵɵtext(124, "Missions \u00E0 venir");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(125, "span", 58);
        i0.ɵɵtext(126);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(127, "div", 59);
        i0.ɵɵelement(128, "div", 61);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(129, "div", 62);
        i0.ɵɵelementStart(130, "div", 63);
        i0.ɵɵelementStart(131, "div", 64);
        i0.ɵɵelementStart(132, "div", 65);
        i0.ɵɵelement(133, "i", 66);
        i0.ɵɵelementStart(134, "input", 67);
        i0.ɵɵlistener("ngModelChange", function AuditStatisticsComponent_Template_input_ngModelChange_134_listener($event) { return ctx.filterSearch = $event; })("ngModelChange", function AuditStatisticsComponent_Template_input_ngModelChange_134_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(135, "div", 65);
        i0.ɵɵelement(136, "i", 42);
        i0.ɵɵelementStart(137, "select", 68);
        i0.ɵɵlistener("ngModelChange", function AuditStatisticsComponent_Template_select_ngModelChange_137_listener($event) { return ctx.filterStatus = $event; })("change", function AuditStatisticsComponent_Template_select_change_137_listener() { return ctx.onFilterChange(); });
        i0.ɵɵelementStart(138, "option", 69);
        i0.ɵɵtext(139, "Tous les \u00E9tats");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(140, "option", 70);
        i0.ɵɵtext(141);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(142, "option", 70);
        i0.ɵɵtext(143);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(144, "option", 70);
        i0.ɵɵtext(145);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(146, AuditStatisticsComponent_button_146_Template, 3, 0, "button", 71);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(147, "div", 72);
        i0.ɵɵelementStart(148, "span", 73);
        i0.ɵɵelementStart(149, "strong");
        i0.ɵɵtext(150);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(151, " enregistrement(s)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(152, "div", 74);
        i0.ɵɵtemplate(153, AuditStatisticsComponent_div_153_Template, 3, 0, "div", 75);
        i0.ɵɵtemplate(154, AuditStatisticsComponent_table_154_Template, 22, 2, "table", 76);
        i0.ɵɵtemplate(155, AuditStatisticsComponent_app_pagination_155_Template, 1, 4, "app-pagination", 77);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(17);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.totalMissions);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.statusStats["En cours"] || 0);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.statusStats["Termin\u00E9"] || 0);
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(ctx.statusStats["En retard"] || 0);
        i0.ɵɵadvance(7);
        i0.ɵɵstyleProp("--ok", ctx.statusSummaryPercentages[0] == null ? null : ctx.statusSummaryPercentages[0].percent)("--progress", ctx.statusSummaryPercentages[1] == null ? null : ctx.statusSummaryPercentages[1].percent)("--nok", ctx.statusSummaryPercentages[2] == null ? null : ctx.statusSummaryPercentages[2].percent);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.totalMissions);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("OK: ", ctx.statusSummary.OK, "");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1("En cours: ", ctx.statusSummary["En cours"], "");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1("NOK: ", ctx.statusSummary.NOK, "");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(90, 43, ctx.statusStats));
        i0.ɵɵadvance(8);
        i0.ɵɵstyleProp("--p", ctx.completionRate);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.completionRate, "%");
        i0.ɵɵadvance(4);
        i0.ɵɵstyleProp("--p", ctx.onTimeRate);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.onTimeRate, "%");
        i0.ɵɵadvance(13);
        i0.ɵɵtextInterpolate(ctx.statusStats["En retard"] || 0);
        i0.ɵɵadvance(2);
        i0.ɵɵstyleProp("width", ctx.delayedRate, "%");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.statusStats["\u00C0 venir"] || 0);
        i0.ɵɵadvance(2);
        i0.ɵɵstyleProp("width", ctx.statusStats["\u00C0 venir"] / ctx.totalMissions * 100 || 0, "%");
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.filterSearch);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.filterStatus);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.NOK);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.NOK]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.EN_COURS);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.EN_COURS]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("value", ctx.AuditMissionStatus.OK);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.statusLabelMap[ctx.AuditMissionStatus.OK]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filterSearch || ctx.filterStatus);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.filteredMissions.length);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", !ctx.missions.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.missions.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredMissions.length > 0);
    } }, directives: [i3.NgIf, i3.NgForOf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i4.SelectControlValueAccessor, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i2.RouterLinkWithHref, i2.RouterLinkActive, i3.NgClass, i5.PaginationComponent], pipes: [i3.KeyValuePipe, i3.DatePipe], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n     gap: 12px;\r\n\r\n    .logo-img {\r\n      height: 48px;          // taille plus \u00E9quilibr\u00E9e pour navbar\r\n      max-height: 65px;      // limite haute\r\n      width: auto;\r\n      object-fit: contain;   // \u00E9vite la d\u00E9formation\r\n      display: block;\r\n   }\r\n\r\n  .logo {\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    font-size: 18px;\r\n    color: #004a99;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    line-height: 1;        // meilleur alignement vertical\r\n  }\r\n}\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\r\n    --p_low: 0;\r\n    --p_limited: 0;\r\n    --p_med: 0;\r\n    --p_high: 0;\r\n    --p_crit: 0;\r\n    width: 200px;\r\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\r\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\r\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\r\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\r\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.ok .dot {\r\n        background: #22c55e;\r\n      }\r\n\r\n      &.progress .dot {\r\n        background: #facc15;\r\n      }\r\n\r\n      &.nok .dot {\r\n        background: #ef4444;\r\n      }\r\n    }\r\n  }\r\n\r\n  .donut-chart.audit-status {\r\n    background: conic-gradient(\r\n      #22c55e 0 calc(var(--ok) * 1%),\r\n      #facc15 calc(var(--ok) * 1%) calc((var(--ok) + var(--progress)) * 1%),\r\n      #ef4444 calc((var(--ok) + var(--progress)) * 1%) 100%\r\n    );\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\r\n  max-width: 1120px;\r\n  margin: 0 auto 2rem;\r\n  overflow: visible !important;\r\n  \r\n  .matrix-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    gap: 16px;\r\n    margin-bottom: 18px;\r\n    padding: 0 6px;\r\n\r\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\r\n  }\r\n\r\n  .matrix-subtitle {\r\n    margin: 6px 0 0;\r\n    color: #64748b;\r\n    font-size: 0.92rem;\r\n    line-height: 1.5;\r\n  }\r\n\r\n  .matrix-legend {\r\n    display: flex;\r\n    gap: 8px;\r\n    flex-wrap: wrap;\r\n\r\n    .legend-chip {\r\n      font-size: 0.72rem;\r\n      font-weight: 700;\r\n      padding: 5px 10px;\r\n      border-radius: 999px;\r\n      text-transform: uppercase;\r\n      \r\n      &.green { background: #d1fae5; color: #065f46; }\r\n      &.yellow { background: #fef3c7; color: #92400e; }\r\n      &.orange { background: #ffedd5; color: #9a3412; }\r\n      &.red { background: #fee2e2; color: #991b1b; }\r\n    }\r\n  }\r\n\r\n  .matrix-insights {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, minmax(0, 1fr));\r\n    gap: 12px;\r\n    margin-bottom: 14px;\r\n  }\r\n\r\n  .insight-card {\r\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\r\n    border: 1px solid #e2e8f0;\r\n    border-radius: 14px;\r\n    padding: 14px 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    min-height: 88px;\r\n\r\n    .insight-label {\r\n      font-size: 0.72rem;\r\n      font-weight: 800;\r\n      letter-spacing: 0.08em;\r\n      text-transform: uppercase;\r\n      color: #64748b;\r\n    }\r\n\r\n    strong {\r\n      font-size: 1.05rem;\r\n      color: #0f172a;\r\n      line-height: 1.3;\r\n    }\r\n\r\n    small {\r\n      color: #64748b;\r\n      font-size: 0.8rem;\r\n      line-height: 1.4;\r\n    }\r\n\r\n    &.highlight {\r\n      border-color: rgba(59, 130, 246, 0.22);\r\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\r\n    }\r\n\r\n    &.critical {\r\n      border-color: rgba(239, 68, 68, 0.18);\r\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\r\n    }\r\n  }\r\n\r\n  .matrix-footer {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, minmax(0, 1fr));\r\n    gap: 10px;\r\n    margin-top: 12px;\r\n  }\r\n\r\n  .footer-note {\r\n    padding: 12px 14px;\r\n    border-radius: 12px;\r\n    background: #f8fafc;\r\n    border: 1px solid #e2e8f0;\r\n    color: #475569;\r\n    font-size: 0.88rem;\r\n    line-height: 1.5;\r\n  }\r\n}\r\n\r\n.risk-matrix-container[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  grid-template-rows: auto auto auto;\r\n  gap: 10px;\r\n  background: white;\r\n  padding: 14px;\r\n  border-radius: 18px;\r\n  border: 1px solid #e2e8f0;\r\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\r\n}\r\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\r\n  grid-row: 1;\r\n  grid-column: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  writing-mode: initial;\r\n  rotate: 0deg;\r\n  font-size: 0.82rem;\r\n  font-weight: 800;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1px;\r\n  white-space: nowrap;\r\n  \r\n  i { margin-right: 6px; color: #3b82f6; }\r\n}\r\n\r\n.risk-matrix-body[_ngcontent-%COMP%] {\r\n  grid-row: 2;\r\n  grid-column: 1;\r\n  overflow-x: auto;\r\n}\r\n\r\n.risk-matrix-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  min-width: 780px;\r\n  table-layout: fixed;\r\n  border-spacing: 4px;\r\n  border-collapse: separate;\r\n\r\n  .col-axis {\r\n    width: 130px;\r\n  }\r\n\r\n  .col-impact {\r\n    width: calc((100% - 130px) / 4);\r\n  }\r\n\r\n  th, td {\r\n    padding: 0;\r\n    height: 66px;\r\n    border-radius: 8px;\r\n    vertical-align: middle;\r\n  }\r\n\r\n  .impact-label {\r\n    background: #f8fafc;\r\n    color: #475569;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    text-align: center;\r\n    border: 1px solid #e2e8f0;\r\n    padding: 8px 6px;\r\n    line-height: 1.2;\r\n    \r\n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\r\n  }\r\n\r\n  .prob-label {\r\n    background: #f8fafc;\r\n    color: #475569;\r\n    font-weight: 700;\r\n    font-size: 0.84rem;\r\n    text-align: center;\r\n    border: 1px solid #e2e8f0;\r\n    width: 130px;\r\n    padding: 8px 6px;\r\n    line-height: 1.25;\r\n    \r\n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\r\n  }\r\n\r\n  .axis-corner { border: none; background: transparent; width: 130px; }\r\n\r\n  .total-label,\r\n  .total-cell {\r\n    background: #eff6ff;\r\n    border: 1px solid #bfdbfe;\r\n    color: #1d4ed8;\r\n    text-align: center;\r\n    font-weight: 800;\r\n    font-size: 0.9rem;\r\n    padding: 8px 6px;\r\n  }\r\n\r\n  .total-label {\r\n    background: #e0f2fe;\r\n    border-color: #bae6fd;\r\n    color: #0f766e;\r\n  }\r\n\r\n  .cell {\r\n    text-align: center;\r\n    border: 2px solid transparent;\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    overflow: hidden;\r\n    \r\n    &:hover {\r\n      transform: scale(1.03);\r\n      z-index: 10;\r\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\r\n      border-color: rgba(255,255,255,0.4);\r\n    }\r\n\r\n    &.is-clickable {\r\n      cursor: pointer;\r\n\r\n      &::after {\r\n        content: 'Voir';\r\n        position: absolute;\r\n        top: 8px;\r\n        right: 8px;\r\n        font-size: 0.62rem;\r\n        font-weight: 800;\r\n        padding: 3px 6px;\r\n        border-radius: 999px;\r\n        background: rgba(255, 255, 255, 0.18);\r\n        color: rgba(255, 255, 255, 0.95);\r\n      }\r\n    }\r\n\r\n    .cell-content {\r\n      height: 100%;\r\n      width: 100%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      gap: 2px;\r\n      padding: 4px;\r\n    }\r\n\r\n    .cell-value {\r\n      font-size: 1.35rem;\r\n      font-weight: 900;\r\n      color: white;\r\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\r\n    }\r\n\r\n    .cell-meta {\r\n      font-size: 0.68rem;\r\n      font-weight: 700;\r\n      color: rgba(255, 255, 255, 0.92);\r\n      letter-spacing: 0.03em;\r\n    }\r\n\r\n    \r\n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\r\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\r\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\r\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\r\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\r\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\r\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\r\n    &.cell-lightgreen .cell-meta,\r\n    &.cell-lightyellow .cell-meta {\r\n      color: #475569;\r\n    }\r\n  }\r\n\r\n  .totals-row {\r\n    th, td {\r\n      height: 46px;\r\n    }\r\n  }\r\n}\r\n\r\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 18px;\r\n}\r\n\r\n.matrix-detail-summary[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 12px;\r\n}\r\n\r\n.summary-item[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  border: 1px solid #e2e8f0;\r\n  background: #f8fafc;\r\n  border-radius: 12px;\r\n\r\n  .summary-label {\r\n    display: block;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.08em;\r\n    color: #64748b;\r\n    margin-bottom: 6px;\r\n  }\r\n\r\n  strong {\r\n    font-size: 1rem;\r\n    color: #0f172a;\r\n  }\r\n}\r\n\r\n.matrix-risk-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n  max-height: 52vh;\r\n  overflow-y: auto;\r\n  padding-right: 4px;\r\n}\r\n\r\n.matrix-risk-item[_ngcontent-%COMP%] {\r\n  border: 1px solid #e2e8f0;\r\n  border-radius: 14px;\r\n  padding: 16px;\r\n  background: white;\r\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\r\n}\r\n\r\n.risk-item-head[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  margin-bottom: 10px;\r\n\r\n  h4 {\r\n    margin: 0;\r\n    font-size: 1rem;\r\n    color: #0f172a;\r\n  }\r\n}\r\n\r\n.risk-level-badge[_ngcontent-%COMP%] {\r\n  padding: 5px 10px;\r\n  border-radius: 999px;\r\n  font-size: 0.75rem;\r\n  font-weight: 800;\r\n  white-space: nowrap;\r\n\r\n  &.critical {\r\n    background: #fee2e2;\r\n    color: #991b1b;\r\n  }\r\n\r\n  &.high {\r\n    background: #ffedd5;\r\n    color: #9a3412;\r\n  }\r\n\r\n  &.medium {\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n  }\r\n\r\n  &.limited {\r\n    background: #ccfbf1;\r\n    color: #115e59;\r\n  }\r\n\r\n  &.low {\r\n    background: #d1fae5;\r\n    color: #065f46;\r\n  }\r\n\r\n  &.default {\r\n    background: #e2e8f0;\r\n    color: #475569;\r\n  }\r\n}\r\n\r\n.risk-item-desc[_ngcontent-%COMP%] {\r\n  margin: 0 0 12px;\r\n  color: #475569;\r\n  line-height: 1.6;\r\n}\r\n\r\n.risk-item-meta[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 8px 14px;\r\n  color: #334155;\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.empty-matrix-detail[_ngcontent-%COMP%] {\r\n  padding: 20px;\r\n  border: 1px dashed #cbd5e1;\r\n  border-radius: 12px;\r\n  background: #f8fafc;\r\n  color: #64748b;\r\n  text-align: center;\r\n}\r\n\r\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n  grid-row: 3;\r\n  grid-column: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  font-size: 0.82rem;\r\n  font-weight: 800;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1px;\r\n  \r\n  i { margin-right: 6px; color: #3b82f6; }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .risk-matrix-card[_ngcontent-%COMP%] {\r\n    .matrix-insights {\r\n      grid-template-columns: repeat(2, minmax(0, 1fr));\r\n    }\r\n\r\n    .matrix-footer {\r\n      grid-template-columns: 1fr;\r\n    }\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .risk-matrix-card[_ngcontent-%COMP%] {\r\n    max-width: 100%;\r\n\r\n    .matrix-header {\r\n      flex-direction: column;\r\n    }\r\n\r\n    .matrix-insights {\r\n      grid-template-columns: 1fr;\r\n    }\r\n  }\r\n\r\n  .risk-matrix-container[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n    grid-template-rows: auto auto auto;\r\n  }\r\n\r\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n    writing-mode: initial;\r\n    rotate: 0deg;\r\n  }\r\n\r\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 1;\r\n  }\r\n\r\n  .risk-matrix-body[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 2;\r\n  }\r\n\r\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 3;\r\n  }\r\n\r\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}", "@import './audit-shared';\n\n.audit-page[_ngcontent-%COMP%] {\n    padding: 30px;\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n    min-height: 100vh;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 20px;\n    margin-bottom: 26px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 24px;\n    border-radius: 20px;\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.8);\n    transition: transform 0.3s ease;\n}\n\n.stat-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-4px);\n}\n\n.stat-icon[_ngcontent-%COMP%] {\n    width: 56px;\n    height: 56px;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.5rem;\n}\n\n.stat-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 0.85rem;\n    color: #64748b;\n    font-weight: 600;\n    margin-bottom: 4px;\n}\n\n.stat-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n    font-weight: 800;\n    color: #0f172a;\n}\n\n.stat-card.total[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #eef2ff;\n    color: #6366f1;\n}\n\n.stat-card.pending[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fffbe6;\n    color: #f59e0b;\n}\n\n.stat-card.completed[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #f0fdf4;\n    color: #10b981;\n}\n\n.stat-card.risks[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    background: #fff1f2;\n    color: #e11d48;\n}\n\r\n\r\n\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 28px;\r\n    border-radius: 14px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.95rem;\r\n}\r\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);\n    filter: brightness(1.1);\n}\n\n.btn-import[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #0f766e 0%, #0f9f93 100%);\n    box-shadow: 0 4px 15px rgba(15, 118, 110, 0.28);\n}\n\n.btn-import[_ngcontent-%COMP%]:hover:not(:disabled) {\n    box-shadow: 0 8px 25px rgba(15, 118, 110, 0.35);\n}\n\r\n.btn-ai-plan[_ngcontent-%COMP%]:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n    filter: grayscale(0.5);\r\n}\r\n\r\n\r\n.tabs-nav[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 12px;\r\n    margin-bottom: 25px;\r\n    padding: 6px;\r\n    background: rgba(226, 232, 240, 0.5);\r\n    border-radius: 16px;\r\n    width: fit-content;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    background: transparent;\r\n    border: none;\r\n    padding: 10px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\r\n    background: white;\r\n    color: #0f172a;\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n\r\n.missions-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 24px;\r\n    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);\r\n    border: 1px solid rgba(241, 245, 249, 1);\r\n    overflow: hidden;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n    table-layout: fixed;\n}\n\r\n.audit-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    background: #f8fafc;\n    padding: 18px 16px;\n    text-align: left;\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    text-transform: uppercase;\r\n    font-weight: 700;\r\n    letter-spacing: 0.05em;\r\n    border-bottom: 2px solid #f1f5f9;\r\n}\r\n\r\n.audit-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    border-bottom: 1px solid #f8fafc;\n    font-size: 0.92rem;\n    color: #334155;\n    vertical-align: top;\n}\n\n.audit-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    height: auto;\n}\n\n.cell-id[_ngcontent-%COMP%] {\n    width: 85px;\n    white-space: nowrap;\n    text-align: center !important;\n}\n\n.cell-priority[_ngcontent-%COMP%] {\n    width: 115px;\n    white-space: nowrap;\n    text-align: center !important;\n}\n\n.cell-rule[_ngcontent-%COMP%] {\n    font-weight: 600;\n    color: #1e293b;\n}\n\n.cell-recommendation[_ngcontent-%COMP%] {\n    color: #475569;\n}\n\n.cell-horizon[_ngcontent-%COMP%], .cell-date[_ngcontent-%COMP%], .cell-status[_ngcontent-%COMP%] {\n    white-space: nowrap;\n}\n\n.cell-owner[_ngcontent-%COMP%] {\n    min-width: 180px;\n}\n\r\n.audit-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\r\n    background: #fcfdfe;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n    display: block;\r\n    color: #1e293b;\r\n    font-size: 1rem;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.mission-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    color: #94a3b8;\n    font-size: 0.8rem;\n    display: block;\n    max-width: 300px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\n}\n\n.recommendation-preview[_ngcontent-%COMP%] {\n    display: -webkit-box;\n    max-width: 100%;\n    color: #475569;\n    line-height: 1.4;\n    overflow: hidden;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    word-break: break-word;\n}\n\n.responsible-text[_ngcontent-%COMP%] {\n    display: -webkit-box;\n    line-height: 1.4;\n    overflow: hidden;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n}\n\n.auditor-chip[_ngcontent-%COMP%] {\n    background: #f1f5f9;\n    padding: 6px 12px;\n    border-radius: 100px;\r\n    font-size: 0.85rem;\r\n    color: #475569;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    font-weight: 500;\r\n    border: 1px solid #e2e8f0;\r\n}\r\n\r\n.risk-info-cell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    max-width: 250px;\r\n\r\n    .risk-id {\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n        color: #6366f1;\r\n        background: #eef2ff;\r\n        padding: 2px 8px;\r\n        border-radius: 6px;\r\n        width: fit-content;\r\n    }\r\n\r\n    .risk-name {\r\n        font-weight: 600;\r\n        color: #334155;\r\n        font-size: 0.9rem;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n\r\n\r\n.badge[_ngcontent-%COMP%] {\n    padding: 7px 12px;\n    border-radius: 100px;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.02em;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 88px;\n}\n\r\n.status-\u00E0-venir[_ngcontent-%COMP%] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\r\n    border: 1px solid #bae6fd;\r\n}\r\n\r\n.status-en-cours[_ngcontent-%COMP%] {\n    background: #fef3c7;\n    color: #92400e;\n    border: 1px solid #fde68a;\n}\n\n.status-nok[_ngcontent-%COMP%] {\n    background: #fee2e2;\n    color: #b91c1c;\n    border: 1px solid #fecaca;\n}\n\n.status-ok[_ngcontent-%COMP%] {\n    background: #dcfce7;\n    color: #166534;\n    border: 1px solid #bbf7d0;\n}\n\r\n.status-termin\u00E9[_ngcontent-%COMP%] {\r\n    background: #dcfce7;\r\n    color: #166534;\r\n    border: 1px solid #bbf7d0;\r\n}\r\n\r\n.status-en-retard[_ngcontent-%COMP%] {\r\n    background: #fee2e2;\r\n    color: #b91c1c;\r\n    border: 1px solid #fecaca;\r\n}\r\n\r\n\r\n.actions-cell[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(3, 38px);\n    gap: 8px;\n    justify-content: end;\n    min-width: 138px;\n}\n\r\n.action-btn[_ngcontent-%COMP%] {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n}\r\n\r\n.btn-view[_ngcontent-%COMP%]:hover {\r\n    background: #eef2ff;\r\n    border-color: #c7d2fe;\r\n}\r\n\r\n.btn-assign[_ngcontent-%COMP%]:hover {\r\n    background: #ecfdf5;\r\n    border-color: #a7f3d0;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%] {\r\n    color: #3b82f6;\r\n}\r\n\r\n.btn-edit[_ngcontent-%COMP%]:hover {\r\n    background: #eff6ff;\r\n    border-color: #bfdbfe;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%] {\r\n    color: #f59e0b;\r\n}\r\n\r\n.btn-report[_ngcontent-%COMP%]:hover {\r\n    background: #fffbeb;\r\n    border-color: #fde68a;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n    color: #64748b;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.btn-delete[_ngcontent-%COMP%]:hover {\r\n    background: #fef2f2;\r\n    border-color: #fecaca;\r\n}\r\n\r\n\r\n.suggested-plan-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\r\n    gap: 25px;\r\n    margin-top: 25px;\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    border: 1px solid #e2e8f0;\r\n    display: flex;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n.suggestion-card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.suggestion-card.selected[_ngcontent-%COMP%] {\r\n    border-color: #6366f1;\r\n    background: #fbfbfe;\r\n}\r\n\r\n.card-check[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    background: #f8fafc;\r\n    border-right: 1px solid #e2e8f0;\r\n    cursor: pointer;\r\n    color: #cbd5e1;\r\n    font-size: 1.4rem;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.selected[_ngcontent-%COMP%]   .card-check[_ngcontent-%COMP%] {\r\n    color: #6366f1;\r\n    background: #eef2ff;\r\n    border-right-color: #c7d2fe;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    padding: 24px;\r\n    flex: 1;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.card-top[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 1.1rem;\r\n    color: #0f172a;\r\n    font-weight: 700;\r\n    line-height: 1.3;\r\n}\r\n\r\n.obj[_ngcontent-%COMP%], .resp[_ngcontent-%COMP%] {\r\n    font-size: 0.9rem;\r\n    color: #475569;\r\n    margin: 10px 0;\r\n    line-height: 1.5;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n    margin-top: 20px;\r\n    font-size: 0.8rem;\r\n    color: #94a3b8;\r\n    border-top: 1px solid #f1f5f9;\r\n    padding-top: 15px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n\r\n.modal-form[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 24px;\r\n    padding: 10px 5px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    color: #334155;\r\n}\r\n\r\n.req[_ngcontent-%COMP%] {\r\n    color: #ef4444;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    padding: 12px 16px;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\r\n    font-family: inherit;\r\n    font-size: 0.95rem;\r\n    transition: all 0.2s;\r\n    background: #f8fafc;\r\n}\r\n\r\n.finput[_ngcontent-%COMP%]:focus {\n    outline: none;\n    border-color: #6366f1;\n    background: white;\n    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);\n}\n\n.field-hint[_ngcontent-%COMP%] {\n    font-size: 0.82rem;\n    color: #64748b;\n}\n\r\n.form-footer[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 12px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%] {\r\n    background: #f1f5f9;\r\n    color: #475569;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-save[_ngcontent-%COMP%] {\r\n    background: #0f172a;\r\n    color: white;\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 20px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%] {\r\n    padding: 15px;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n    display: block;\r\n    font-size: 0.75rem;\r\n    text-transform: uppercase;\r\n    color: #94a3b8;\r\n    margin-bottom: 5px;\r\n    font-weight: 700;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: #1e293b;\r\n    font-weight: 600;\r\n}\r\n\r\n.detail-item.full[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n}\n\n@media (max-width: 1200px) {\n    .missions-card[_ngcontent-%COMP%] {\n        overflow-x: auto;\n    }\n\n    .audit-table[_ngcontent-%COMP%] {\n        min-width: 1220px;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditStatisticsComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-statistics',
                templateUrl: './audit-statistics.component.html',
                styleUrls: ['../../../dashboard.component.scss', '../../../../modules/auditing/auditing.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-statistics.component.js.map