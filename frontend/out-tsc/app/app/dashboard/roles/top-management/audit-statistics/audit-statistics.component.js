import { Component } from '@angular/core';
import { AuditingService } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/auditing.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
function AuditStatisticsComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵelementStart(1, "div", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 47);
    i0.ɵɵelementStart(4, "div", 48);
    i0.ɵɵelementStart(5, "span", 49);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r1.key);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", entry_r1.value / ctx_r0.totalMissions * 100 || 0, "%");
    i0.ɵɵproperty("ngClass", entry_r1.key.toLowerCase().replace("\u00E0", "a").replace(" ", "-").replace("\u00E9", "e"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r1.value);
} }
export class AuditStatisticsComponent {
    constructor(auditingService, router) {
        this.auditingService = auditingService;
        this.router = router;
        this.missions = [];
        // Stats for Charts
        this.statusStats = {};
        this.totalMissions = 0;
        this.completionRate = 0;
        this.delayedRate = 0;
        this.onTimeRate = 0;
        this.showExportMenu = false;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.auditingService.getMissions().subscribe(missions => {
            this.missions = missions;
            this.totalMissions = missions.length;
            this.calculateStats();
        });
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
AuditStatisticsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditStatisticsComponent, selectors: [["app-audit-statistics"]], decls: 92, vars: 21, consts: [[1, "role-dashboard", "top-management", "statistics-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-clipboard-check"], [1, "header-right"], [1, "export-dropdown"], ["title", "T\u00E9l\u00E9charger le rapport", 1, "btn-export", 3, "click"], [1, "fas", "fa-file-download"], [1, "fas", "fa-chevron-down"], [1, "dropdown-menu"], [3, "click"], [1, "fas", "fa-file-excel", 2, "color", "#16a34a"], [1, "fas", "fa-file-pdf", 2, "color", "#ef4444"], [1, "kpi-row", "mb-4"], [1, "kpi-card", "kpi-total"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-progress"], [1, "kpi-card", "kpi-closed"], [1, "kpi-card", "kpi-open"], [1, "dashboard-grid"], [1, "module-card", "premium", "chart-card", "full-width-module"], [1, "fas", "fa-tasks"], [1, "chart-container", "bar-wrapper"], [1, "bar-chart"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "module-card", "premium", "chart-card"], [1, "fas", "fa-tachometer-alt"], [1, "progress-circles"], [1, "circle-item"], [1, "premium-circle", "treatment"], [1, "percent"], [1, "circle-label"], [1, "premium-circle", "maturity"], [1, "fas", "fa-info-circle"], [1, "domain-list"], [1, "domain-item"], [1, "domain-info"], [1, "name"], [1, "count"], [1, "progress-lite"], [1, "fill", 2, "background", "#ef4444"], [1, "fill", 2, "background", "#3b82f6"], [1, "bar-group"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill", 3, "ngClass"], [1, "bar-value"]], template: function AuditStatisticsComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(8, " Analytics Audit");
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
        i0.ɵɵtext(15, " Exporter rapport ");
        i0.ɵɵelement(16, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "button", 12);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_18_listener() { return ctx.exportToXLSX(); });
        i0.ɵɵelement(19, "i", 13);
        i0.ɵɵtext(20, " Excel (.xlsx) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "button", 12);
        i0.ɵɵlistener("click", function AuditStatisticsComponent_Template_button_click_21_listener() { return ctx.exportToPDF(); });
        i0.ɵɵelement(22, "i", 14);
        i0.ɵɵtext(23, " PDF (.pdf) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 15);
        i0.ɵɵelementStart(25, "div", 16);
        i0.ɵɵelementStart(26, "span", 17);
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "span", 18);
        i0.ɵɵtext(29, "Missions Totales");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "div", 19);
        i0.ɵɵelementStart(31, "span", 17);
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "span", 18);
        i0.ɵɵtext(34, "En cours");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "div", 20);
        i0.ɵɵelementStart(36, "span", 17);
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "span", 18);
        i0.ɵɵtext(39, "Termin\u00E9es");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "div", 21);
        i0.ɵɵelementStart(41, "span", 17);
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "span", 18);
        i0.ɵɵtext(44, "En retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 22);
        i0.ɵɵelementStart(46, "div", 23);
        i0.ɵɵelementStart(47, "h3");
        i0.ɵɵelement(48, "i", 24);
        i0.ɵɵtext(49, " \u00C9tat d'Avancement des Missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "div", 25);
        i0.ɵɵelementStart(51, "div", 26);
        i0.ɵɵtemplate(52, AuditStatisticsComponent_div_52_Template, 7, 5, "div", 27);
        i0.ɵɵpipe(53, "keyvalue");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "div", 28);
        i0.ɵɵelementStart(55, "h3");
        i0.ɵɵelement(56, "i", 29);
        i0.ɵɵtext(57, " Performance Op\u00E9rationnelle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "div", 30);
        i0.ɵɵelementStart(59, "div", 31);
        i0.ɵɵelementStart(60, "div", 32);
        i0.ɵɵelementStart(61, "span", 33);
        i0.ɵɵtext(62);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "span", 34);
        i0.ɵɵtext(64, "Taux de Compl\u00E9tion");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "div", 31);
        i0.ɵɵelementStart(66, "div", 35);
        i0.ɵɵelementStart(67, "span", 33);
        i0.ɵɵtext(68);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "span", 34);
        i0.ɵɵtext(70, "Taux de Ponctualit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "div", 28);
        i0.ɵɵelementStart(72, "h3");
        i0.ɵɵelement(73, "i", 36);
        i0.ɵɵtext(74, " Synth\u00E8se d'Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "div", 37);
        i0.ɵɵelementStart(76, "div", 38);
        i0.ɵɵelementStart(77, "div", 39);
        i0.ɵɵelementStart(78, "span", 40);
        i0.ɵɵtext(79, "Missions Critiques (Retard)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "span", 41);
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "div", 42);
        i0.ɵɵelement(83, "div", 43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(84, "div", 38);
        i0.ɵɵelementStart(85, "div", 39);
        i0.ɵɵelementStart(86, "span", 40);
        i0.ɵɵtext(87, "Missions \u00E0 venir");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(88, "span", 41);
        i0.ɵɵtext(89);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(90, "div", 42);
        i0.ɵɵelement(91, "div", 44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(17);
        i0.ɵɵclassProp("show", ctx.showExportMenu);
        i0.ɵɵadvance(10);
        i0.ɵɵtextInterpolate(ctx.totalMissions);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.statusStats["En cours"] || 0);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.statusStats["Termin\u00E9"] || 0);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.statusStats["En retard"] || 0);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(53, 19, ctx.statusStats));
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
    } }, directives: [i3.NgForOf, i3.NgClass], pipes: [i3.KeyValuePipe], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n\r\n      .logo-img {\r\n        height: 35px;\r\n        width: auto;\r\n        border-radius: 4px;\r\n      }\r\n\r\n      .logo {\r\n        font-family: 'Montserrat', sans-serif;\r\n        font-weight: 700;\r\n        font-size: 18px;\r\n        color: #004a99;\r\n        letter-spacing: 0.5px;\r\n        white-space: nowrap;\r\n      }\r\n    }\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\n    --p_low: 0;\n    --p_limited: 0;\n    --p_med: 0;\n    --p_high: 0;\n    --p_crit: 0;\n    width: 200px;\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.low .dot {\n        background: #3b82f6;\n      }\n\n      &.limited .dot {\n        background: #14b8a6;\n      }\n\n      &.med .dot {\n        background: #f59e0b;\n      }\n\r\n      &.high .dot {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.crit .dot {\r\n        background: #7f1d1d;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .bar-wrapper {\r\n    padding: 10px 0;\r\n  }\r\n\r\n  .bar-group {\r\n    margin-bottom: 20px;\r\n\r\n    .bar-label {\r\n      font-size: 0.9rem;\r\n      font-weight: 700;\r\n      color: #334155;\r\n      margin-bottom: 6px;\r\n    }\r\n\r\n    .bar-track {\r\n      height: 24px;\r\n      background: #f1f5f9;\r\n      border-radius: 12px;\r\n      overflow: hidden;\r\n    }\r\n\r\n    .bar-fill {\r\n      height: 100%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      padding-right: 12px;\r\n      border-radius: 12px;\r\n      transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);\r\n      min-width: 30px;\r\n\r\n      .bar-value {\r\n        color: white;\r\n        font-size: 0.75rem;\r\n        font-weight: 800;\r\n      }\r\n\r\n      &.open,\n      &.ouvert {\n        background: #94a3b8;\n      }\n\n      &.in_progress,\n      &.en-cours {\n        background: #3b82f6;\n      }\n\n      &.treated,\n      &.traite {\n        background: #10b981; // Green\n      }\n\n      &.closed,\n      &.cloture {\n        background: #64748b; // Slate grey\n      }\n\r\n      // Audit specific statuses\r\n      &.a-venir {\r\n        background: #94a3b8;\r\n      }\r\n\r\n      &.termine {\r\n        background: #10b981;\r\n      }\r\n\r\n      &.en-retard {\r\n        background: #ef4444;\r\n      }\r\n\r\n      &.annule {\r\n        background: #64748b;\r\n      }\r\n\r\n      &.dept-fill {\r\n        background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  margin: 0 auto 2rem;\n  overflow: visible !important;\n  \n  .matrix-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 16px;\n    margin-bottom: 18px;\n    padding: 0 6px;\n\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\n  }\n\n  .matrix-subtitle {\n    margin: 6px 0 0;\n    color: #64748b;\n    font-size: 0.92rem;\n    line-height: 1.5;\n  }\n\n  .matrix-legend {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n\n    .legend-chip {\n      font-size: 0.72rem;\n      font-weight: 700;\n      padding: 5px 10px;\n      border-radius: 999px;\n      text-transform: uppercase;\n      \n      &.green { background: #d1fae5; color: #065f46; }\n      &.yellow { background: #fef3c7; color: #92400e; }\n      &.orange { background: #ffedd5; color: #9a3412; }\n      &.red { background: #fee2e2; color: #991b1b; }\n    }\n  }\n\n  .matrix-insights {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 12px;\n    margin-bottom: 14px;\n  }\n\n  .insight-card {\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    border-radius: 14px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    min-height: 88px;\n\n    .insight-label {\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    strong {\n      font-size: 1.05rem;\n      color: #0f172a;\n      line-height: 1.3;\n    }\n\n    small {\n      color: #64748b;\n      font-size: 0.8rem;\n      line-height: 1.4;\n    }\n\n    &.highlight {\n      border-color: rgba(59, 130, 246, 0.22);\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\n    }\n\n    &.critical {\n      border-color: rgba(239, 68, 68, 0.18);\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\n    }\n  }\n\n  .matrix-footer {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n    margin-top: 12px;\n  }\n\n  .footer-note {\n    padding: 12px 14px;\n    border-radius: 12px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #475569;\n    font-size: 0.88rem;\n    line-height: 1.5;\n  }\n}\n\n.risk-matrix-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: auto auto auto;\n  gap: 10px;\n  background: white;\n  padding: 14px;\n  border-radius: 18px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\n}\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\n  grid-row: 1;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  writing-mode: initial;\n  rotate: 0deg;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n.risk-matrix-body[_ngcontent-%COMP%] {\n  grid-row: 2;\n  grid-column: 1;\n  overflow-x: auto;\n}\n\n.risk-matrix-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 780px;\n  table-layout: fixed;\n  border-spacing: 4px;\n  border-collapse: separate;\n\n  .col-axis {\n    width: 130px;\n  }\n\n  .col-impact {\n    width: calc((100% - 130px) / 4);\n  }\n\n  th, td {\n    padding: 0;\n    height: 66px;\n    border-radius: 8px;\n    vertical-align: middle;\n  }\n\n  .impact-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.85rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    padding: 8px 6px;\n    line-height: 1.2;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .prob-label {\n    background: #f8fafc;\n    color: #475569;\n    font-weight: 700;\n    font-size: 0.84rem;\n    text-align: center;\n    border: 1px solid #e2e8f0;\n    width: 130px;\n    padding: 8px 6px;\n    line-height: 1.25;\n    \n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\n  }\n\n  .axis-corner { border: none; background: transparent; width: 130px; }\n\n  .total-label,\n  .total-cell {\n    background: #eff6ff;\n    border: 1px solid #bfdbfe;\n    color: #1d4ed8;\n    text-align: center;\n    font-weight: 800;\n    font-size: 0.9rem;\n    padding: 8px 6px;\n  }\n\n  .total-label {\n    background: #e0f2fe;\n    border-color: #bae6fd;\n    color: #0f766e;\n  }\n\n  .cell {\n    text-align: center;\n    border: 2px solid transparent;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n    \n    &:hover {\n      transform: scale(1.03);\n      z-index: 10;\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\n      border-color: rgba(255,255,255,0.4);\n    }\n\n    &.is-clickable {\n      cursor: pointer;\n\n      &::after {\n        content: 'Voir';\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        font-size: 0.62rem;\n        font-weight: 800;\n        padding: 3px 6px;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.18);\n        color: rgba(255, 255, 255, 0.95);\n      }\n    }\n\n    .cell-content {\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 2px;\n      padding: 4px;\n    }\n\n    .cell-value {\n      font-size: 1.35rem;\n      font-weight: 900;\n      color: white;\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\n    }\n\n    .cell-meta {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.92);\n      letter-spacing: 0.03em;\n    }\n\n    \n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\n    &.cell-lightgreen .cell-meta,\n    &.cell-lightyellow .cell-meta {\n      color: #475569;\n    }\n  }\n\n  .totals-row {\n    th, td {\n      height: 46px;\n    }\n  }\n}\n\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.matrix-detail-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n  border-radius: 12px;\n\n  .summary-label {\n    display: block;\n    font-size: 0.72rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #64748b;\n    margin-bottom: 6px;\n  }\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.matrix-risk-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-height: 52vh;\n  overflow-y: auto;\n  padding-right: 4px;\n}\n\n.matrix-risk-item[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 16px;\n  background: white;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n}\n\n.risk-item-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n\n  h4 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n}\n\n.risk-level-badge[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 800;\n  white-space: nowrap;\n\n  &.critical {\n    background: #fee2e2;\n    color: #991b1b;\n  }\n\n  &.high {\n    background: #ffedd5;\n    color: #9a3412;\n  }\n\n  &.medium {\n    background: #fef3c7;\n    color: #92400e;\n  }\n\n  &.limited {\n    background: #ccfbf1;\n    color: #115e59;\n  }\n\n  &.low {\n    background: #d1fae5;\n    color: #065f46;\n  }\n\n  &.default {\n    background: #e2e8f0;\n    color: #475569;\n  }\n}\n\n.risk-item-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.risk-item-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px 14px;\n  color: #334155;\n  font-size: 0.88rem;\n}\n\n.empty-matrix-detail[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\n  grid-row: 3;\n  grid-column: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  \n  i { margin-right: 6px; color: #3b82f6; }\n}\n\n@media (max-width: 1100px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    .matrix-insights {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n\n    .matrix-footer {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .risk-matrix-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n\n    .matrix-header {\n      flex-direction: column;\n    }\n\n    .matrix-insights {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .risk-matrix-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    writing-mode: initial;\n    rotate: 0deg;\n  }\n\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n\n  .risk-matrix-body[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditStatisticsComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-statistics',
                templateUrl: './audit-statistics.component.html',
                styleUrls: ['../../../dashboard.component.scss']
            }]
    }], function () { return [{ type: i1.AuditingService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=audit-statistics.component.js.map