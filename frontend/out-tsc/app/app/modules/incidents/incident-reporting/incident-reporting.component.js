import { Component } from '@angular/core';
import { IncidentService, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/incident.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function IncidentReportingComponent_nav_15_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r5.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.label, " ");
} }
function IncidentReportingComponent_nav_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 12);
    i0.ɵɵtemplate(1, IncidentReportingComponent_nav_15_a_1_Template, 2, 4, "a", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.navItems);
} }
function IncidentReportingComponent_div_16_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun domaine disponible pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentReportingComponent_div_16_div_63_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵelementStart(1, "div", 55);
    i0.ɵɵelementStart(2, "span", 56);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 57);
    i0.ɵɵelement(7, "div", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r12.count);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r11.getBarWidth(item_r12.count, ctx_r11.domainDistribution[0].count), "%");
} }
function IncidentReportingComponent_div_16_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵtemplate(1, IncidentReportingComponent_div_16_div_63_div_1_Template, 8, 4, "div", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r7.domainDistribution);
} }
function IncidentReportingComponent_div_16_div_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵelementStart(1, "div", 60);
    i0.ɵɵelement(2, "span", 61);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r13 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", status_r13.cssClass);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r13.count);
} }
function IncidentReportingComponent_div_16_div_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun incident enregistre.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function IncidentReportingComponent_div_16_div_95_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵelementStart(1, "div", 66);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 67);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const incident_r15 = ctx.$implicit;
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(incident_r15.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", incident_r15.domaine || "Non renseigne", " \u2022 Maj ", i0.ɵɵpipeBind2(6, 5, incident_r15.updatedAt || incident_r15.createdAt, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r14.getStatusClass(incident_r15.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", incident_r15.statutLabel || ctx_r14.getStatusLabel(incident_r15.statut), " ");
} }
function IncidentReportingComponent_div_16_div_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtemplate(1, IncidentReportingComponent_div_16_div_95_div_1_Template, 9, 8, "div", 64);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.recentIncidents);
} }
function IncidentReportingComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "section", 16);
    i0.ɵɵelementStart(2, "div", 17);
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵtext(4, "Pilotage temps reel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6, "Vue consolidee basee sur les incidents reels enregistres dans la plateforme.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "Les KPI, delais et repartitions ci-dessous sont calcules dynamiquement a partir des declarations, des mises a jour de statut et des domaines renseignes.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 19);
    i0.ɵɵelementStart(10, "div", 20);
    i0.ɵɵelementStart(11, "span", 21);
    i0.ɵɵtext(12, "Resolution moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 20);
    i0.ɵɵelementStart(16, "span", 21);
    i0.ɵɵtext(17, "Age moyen des incidents ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 22);
    i0.ɵɵelementStart(21, "div", 23);
    i0.ɵɵelementStart(22, "div", 24);
    i0.ɵɵelement(23, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 26);
    i0.ɵɵelementStart(25, "span", 27);
    i0.ɵɵtext(26, "Total Incidents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 28);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 29);
    i0.ɵɵelementStart(30, "div", 24);
    i0.ɵɵelement(31, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 26);
    i0.ɵɵelementStart(33, "span", 27);
    i0.ɵɵtext(34, "En cours / Ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 28);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "small");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 31);
    i0.ɵɵelementStart(40, "div", 24);
    i0.ɵɵelement(41, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 26);
    i0.ɵɵelementStart(43, "span", 27);
    i0.ɵɵtext(44, "Taux de Resolution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 28);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "small");
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 33);
    i0.ɵɵelementStart(50, "div", 24);
    i0.ɵɵelement(51, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 26);
    i0.ɵɵelementStart(53, "span", 27);
    i0.ɵɵtext(54, "Incidents Critiques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span", 28);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 35);
    i0.ɵɵelementStart(58, "div", 36);
    i0.ɵɵelementStart(59, "h3");
    i0.ɵɵelement(60, "i", 37);
    i0.ɵɵtext(61, " Volume par Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(62, IncidentReportingComponent_div_16_div_62_Template, 4, 0, "div", 38);
    i0.ɵɵtemplate(63, IncidentReportingComponent_div_16_div_63_Template, 2, 1, "div", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "div", 36);
    i0.ɵɵelementStart(65, "h3");
    i0.ɵɵelement(66, "i", 40);
    i0.ɵɵtext(67, " Repartition par Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 41);
    i0.ɵɵtemplate(69, IncidentReportingComponent_div_16_div_69_Template, 7, 3, "div", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 43);
    i0.ɵɵelementStart(71, "div", 36);
    i0.ɵɵelementStart(72, "h3");
    i0.ɵɵelement(73, "i", 44);
    i0.ɵɵtext(74, " Delais de Traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "div", 45);
    i0.ɵɵelementStart(76, "div", 46);
    i0.ɵɵelementStart(77, "span", 47);
    i0.ɵɵtext(78, "Temps moyen de resolution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "strong");
    i0.ɵɵtext(80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "p");
    i0.ɵɵtext(82, "Calcule sur les incidents traites ou clos a partir de `createdAt` et `updatedAt`.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "div", 46);
    i0.ɵɵelementStart(84, "span", 47);
    i0.ɵɵtext(85, "Vieillissement des dossiers ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "strong");
    i0.ɵɵtext(87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "p");
    i0.ɵɵtext(89, "Mesure l anciennete moyenne des incidents qui necessitent encore un suivi.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "div", 36);
    i0.ɵɵelementStart(91, "h3");
    i0.ɵɵelement(92, "i", 48);
    i0.ɵɵtext(93, " Dernieres Activites");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(94, IncidentReportingComponent_div_16_div_94_Template, 4, 0, "div", 38);
    i0.ɵɵtemplate(95, IncidentReportingComponent_div_16_div_95_Template, 2, 1, "div", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r1.formatDays(ctx_r1.averageResolutionDays));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatDays(ctx_r1.averageOpenAgeDays));
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.totalIncidents);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.openIncidents);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.getPercent(ctx_r1.openIncidents), "% du volume total");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r1.getPercent(ctx_r1.resolvedIncidents), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.resolvedIncidents, " incidents traites");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.criticalIncidents);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.domainDistribution.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.domainDistribution.length > 0);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.statusDistribution);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.formatDays(ctx_r1.averageResolutionDays));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.formatDays(ctx_r1.averageOpenAgeDays));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r1.recentIncidents.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.recentIncidents.length > 0);
} }
function IncidentReportingComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement du reporting des incidents...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class IncidentReportingComponent {
    constructor(incidentService, router) {
        this.incidentService = incidentService;
        this.router = router;
        this.currentUserRole = getStoredIncidentRole();
        this.incidents = [];
        this.isLoading = false;
        this.totalIncidents = 0;
        this.openIncidents = 0;
        this.resolvedIncidents = 0;
        this.criticalIncidents = 0;
        this.averageResolutionDays = 0;
        this.averageOpenAgeDays = 0;
        this.statusDistribution = [];
        this.domainDistribution = [];
        this.recentIncidents = [];
        this.statusMeta = {
            [IncidentStatus.NOUVEAU]: { label: 'Nouveaux', cssClass: 'status-new' },
            [IncidentStatus.EN_COURS]: { label: 'En cours', cssClass: 'status-progress' },
            [IncidentStatus.TRAITE]: { label: 'Traites', cssClass: 'status-resolved' },
            [IncidentStatus.CLOS]: { label: 'Clos', cssClass: 'status-closed' }
        };
    }
    get navItems() {
        return getIncidentNavItems(this.currentUserRole);
    }
    ngOnInit() {
        this.loadStats();
    }
    loadStats() {
        this.isLoading = true;
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                this.incidents = data.map(incident => this.mapIncidentCodes(incident));
                this.totalIncidents = this.incidents.length;
                this.openIncidents = this.incidents.filter(i => this.getNormalizedStatus(i) !== IncidentStatus.CLOS).length;
                this.resolvedIncidents = this.incidents.filter(i => {
                    const status = this.getNormalizedStatus(i);
                    return status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS;
                }).length;
                this.criticalIncidents = this.incidents.filter(i => this.getNormalizedLevel(i) === IncidentNiveauRisque.CRITICAL).length;
                this.averageResolutionDays = this.calculateAverageResolutionDays(this.incidents);
                this.averageOpenAgeDays = this.calculateAverageOpenAgeDays(this.incidents);
                this.statusDistribution = this.buildStatusDistribution(this.incidents);
                this.domainDistribution = this.buildDomainDistribution(this.incidents);
                this.recentIncidents = [...this.incidents]
                    .sort((a, b) => this.toTimestamp(b.updatedAt || b.createdAt) - this.toTimestamp(a.updatedAt || a.createdAt))
                    .slice(0, 5);
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }
    exportReport() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            alert('Rapport annuel exporte avec succes (format PDF).');
        }, 1500);
    }
    getPercent(count) {
        return this.totalIncidents > 0 ? Math.round((count / this.totalIncidents) * 100) : 0;
    }
    getBarWidth(count, maxCount) {
        if (!maxCount)
            return 0;
        return Math.round((count / maxCount) * 100);
    }
    getStatusClass(status) {
        switch (this.normalizeStatus(status)) {
            case IncidentStatus.NOUVEAU: return 'status-new';
            case IncidentStatus.EN_COURS: return 'status-progress';
            case IncidentStatus.TRAITE: return 'status-resolved';
            case IncidentStatus.CLOS: return 'status-closed';
            default: return 'status-default';
        }
    }
    getStatusLabel(status) {
        var _a;
        if (!status)
            return 'Non defini';
        const normalized = this.normalizeStatus(status);
        return ((_a = this.statusMeta[normalized]) === null || _a === void 0 ? void 0 : _a.label) || status;
    }
    formatDays(value) {
        if (!value)
            return '0 j';
        return `${value.toFixed(1)} j`;
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    buildStatusDistribution(data) {
        return Object.entries(this.statusMeta).map(([status, meta]) => ({
            label: meta.label,
            count: data.filter(incident => this.getNormalizedStatus(incident) === status).length,
            cssClass: meta.cssClass
        }));
    }
    buildDomainDistribution(data) {
        const grouped = new Map();
        data.forEach((incident) => {
            const key = (incident.domaine || 'Non renseigne').trim() || 'Non renseigne';
            grouped.set(key, (grouped.get(key) || 0) + 1);
        });
        return [...grouped.entries()]
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);
    }
    calculateAverageResolutionDays(data) {
        const resolvedIncidents = data.filter(incident => (this.getNormalizedStatus(incident) === IncidentStatus.TRAITE || this.getNormalizedStatus(incident) === IncidentStatus.CLOS)
            && incident.createdAt && incident.updatedAt);
        if (resolvedIncidents.length === 0)
            return 0;
        const totalDays = resolvedIncidents.reduce((sum, incident) => {
            const diff = this.toTimestamp(incident.updatedAt) - this.toTimestamp(incident.createdAt);
            return sum + Math.max(diff, 0) / (1000 * 60 * 60 * 24);
        }, 0);
        return Number((totalDays / resolvedIncidents.length).toFixed(1));
    }
    calculateAverageOpenAgeDays(data) {
        const openIncidents = data.filter(incident => this.getNormalizedStatus(incident) !== IncidentStatus.CLOS && incident.createdAt);
        if (openIncidents.length === 0)
            return 0;
        const now = Date.now();
        const totalDays = openIncidents.reduce((sum, incident) => {
            const diff = now - this.toTimestamp(incident.createdAt);
            return sum + Math.max(diff, 0) / (1000 * 60 * 60 * 24);
        }, 0);
        return Number((totalDays / openIncidents.length).toFixed(1));
    }
    toTimestamp(value) {
        if (!value)
            return 0;
        const parsed = new Date(value).getTime();
        return Number.isNaN(parsed) ? 0 : parsed;
    }
    mapIncidentCodes(incident) {
        var _a, _b;
        return Object.assign(Object.assign({}, incident), { statut: this.normalizeStatus(((_a = incident) === null || _a === void 0 ? void 0 : _a.statutCode) || (incident === null || incident === void 0 ? void 0 : incident.statut)), niveauRisque: this.normalizeLevel(((_b = incident) === null || _b === void 0 ? void 0 : _b.niveauRisqueCode) || (incident === null || incident === void 0 ? void 0 : incident.niveauRisque)) });
    }
    getNormalizedStatus(incident) {
        var _a;
        return this.normalizeStatus(((_a = incident) === null || _a === void 0 ? void 0 : _a.statutCode) || (incident === null || incident === void 0 ? void 0 : incident.statut));
    }
    getNormalizedLevel(incident) {
        var _a;
        return this.normalizeLevel(((_a = incident) === null || _a === void 0 ? void 0 : _a.niveauRisqueCode) || (incident === null || incident === void 0 ? void 0 : incident.niveauRisque));
    }
    normalizeStatus(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    normalizeLevel(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
IncidentReportingComponent.ɵfac = function IncidentReportingComponent_Factory(t) { return new (t || IncidentReportingComponent)(i0.ɵɵdirectiveInject(i1.IncidentService), i0.ɵɵdirectiveInject(i2.Router)); };
IncidentReportingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IncidentReportingComponent, selectors: [["app-incident-reporting"]], decls: 19, vars: 3, consts: [[1, "incident-page", "reporting-view"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-pie"], [1, "header-actions"], [1, "btn-premium", 3, "click"], [1, "fas", "fa-file-export"], ["class", "incident-tabs", 4, "ngIf"], ["class", "reporting-container", 4, "ngIf", "ngIfElse"], ["loadingState", ""], [1, "incident-tabs"], ["routerLinkActive", "active", "class", "incident-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "incident-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "reporting-container"], [1, "insight-hero"], [1, "hero-copy"], [1, "eyebrow"], [1, "hero-metrics"], [1, "metric-pill"], [1, "metric-label"], [1, "kpi-grid"], [1, "kpi-card", "shadow-sm", "blue"], [1, "kpi-icon"], [1, "fas", "fa-list-ul"], [1, "kpi-info"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "shadow-sm", "yellow"], [1, "fas", "fa-hourglass-half"], [1, "kpi-card", "shadow-sm", "green"], [1, "fas", "fa-check-double"], [1, "kpi-card", "shadow-sm", "red"], [1, "fas", "fa-exclamation-circle"], [1, "charts-grid"], [1, "chart-card", "card", "shadow-sm"], [1, "fas", "fa-chart-bar"], ["class", "empty-panel", 4, "ngIf"], ["class", "bar-chart", 4, "ngIf"], [1, "fas", "fa-tasks"], [1, "status-list"], ["class", "status-row", 4, "ngFor", "ngForOf"], [1, "bottom-grid"], [1, "fas", "fa-history"], [1, "timing-grid"], [1, "timing-card"], [1, "timing-label"], [1, "fas", "fa-stream"], ["class", "incident-feed", 4, "ngIf"], [1, "empty-panel"], [1, "fas", "fa-inbox"], [1, "bar-chart"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "bar-row"], [1, "bar-meta"], [1, "label"], [1, "bar-container"], [1, "bar"], [1, "status-row"], [1, "status-copy"], [1, "status-dot", 3, "ngClass"], [1, "fas", "fa-clipboard"], [1, "incident-feed"], ["class", "incident-feed-item", 4, "ngFor", "ngForOf"], [1, "incident-feed-item"], [1, "incident-feed-copy"], [1, "status-chip", 3, "ngClass"], [1, "loading-panel"], [1, "fas", "fa-circle-notch", "fa-spin"]], template: function IncidentReportingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function IncidentReportingComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Reporting Consolide");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Visualisez les indicateurs reels de performance et l evolution des incidents de maniere dynamique.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function IncidentReportingComponent_Template_button_click_12_listener() { return ctx.exportReport(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Exporter Rapport Annuel ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, IncidentReportingComponent_nav_15_Template, 2, 1, "nav", 9);
        i0.ɵɵtemplate(16, IncidentReportingComponent_div_16_Template, 96, 15, "div", 10);
        i0.ɵɵtemplate(17, IncidentReportingComponent_ng_template_17_Template, 4, 0, "ng-template", null, 11, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(18);
        i0.ɵɵadvance(15);
        i0.ɵɵproperty("ngIf", ctx.navItems.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading)("ngIfElse", _r2);
    } }, directives: [i3.NgIf, i3.NgForOf, i2.RouterLinkWithHref, i2.RouterLinkActive, i3.NgClass], pipes: [i3.DatePipe], styles: ["@import '../incident-shared';\n\n.reporting-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 24px;\n}\n\n.insight-hero[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);\n    gap: 20px;\n    padding: 28px 30px;\n    border-radius: 24px;\n    background:\n        radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 28%),\n        linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #38bdf8 100%);\n    color: #fff;\n    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);\n}\n\n.hero-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin: 8px 0 10px;\n    font-size: 1.9rem;\n    line-height: 1.2;\n}\n\n.hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    max-width: 700px;\n    color: rgba(255, 255, 255, 0.82);\n    line-height: 1.6;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    padding: 8px 12px;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.14);\n    font-size: 0.74rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n}\n\n.hero-metrics[_ngcontent-%COMP%] {\n    display: grid;\n    gap: 14px;\n    align-content: center;\n}\n\n.metric-pill[_ngcontent-%COMP%] {\n    padding: 18px 20px;\n    border-radius: 18px;\n    background: rgba(255, 255, 255, 0.12);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    backdrop-filter: blur(8px);\n}\n\n.metric-pill[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 6px;\n    font-size: 1.8rem;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n    color: rgba(255, 255, 255, 0.76);\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.kpi-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 20px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 25px;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    border-left: 5px solid #e2e8f0;\n    transition: all 0.3s;\n\n    &:hover {\n        transform: translateY(-3px);\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);\n    }\n\n    .kpi-icon {\n        width: 50px;\n        height: 50px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 1.5rem;\n    }\n\n    .kpi-info {\n        display: flex;\n        flex-direction: column;\n\n        .kpi-label {\n            font-size: 0.85rem;\n            color: #64748b;\n            font-weight: 600;\n        }\n\n        .kpi-value {\n            font-size: 1.8rem;\n            font-weight: 800;\n            color: #1e293b;\n        }\n\n        small {\n            font-size: 0.75rem;\n            color: #94a3b8;\n        }\n    }\n\n    &.blue { border-color: #3b82f6; .kpi-icon { background: #eff6ff; color: #3b82f6; } }\n    &.yellow { border-color: #eab308; .kpi-icon { background: #fefce8; color: #eab308; } }\n    &.green { border-color: #10b981; .kpi-icon { background: #ecfdf5; color: #10b981; } }\n    &.red { border-color: #ef4444; .kpi-icon { background: #fef2f2; color: #ef4444; } }\n}\n\n.charts-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1.6fr 1fr;\n    gap: 25px;\n}\n\n.bottom-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1.2fr 1fr;\n    gap: 25px;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n    padding: 25px;\n    background: white;\n    border-radius: 16px;\n\n    h3 {\n        font-size: 1.1rem;\n        color: #1e293b;\n        font-weight: 700;\n        margin-bottom: 25px;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    }\n}\n\n.bar-chart[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n}\n\n.bar-row[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n.bar-meta[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    gap: 12px;\n    align-items: center;\n    font-size: 0.9rem;\n}\n\n.label[_ngcontent-%COMP%] {\n    color: #475569;\n    font-weight: 700;\n}\n\n.bar-container[_ngcontent-%COMP%] {\n    flex-grow: 1;\n    height: 12px;\n    background: #e2e8f0;\n    border-radius: 999px;\n    overflow: hidden;\n}\n\n.bar[_ngcontent-%COMP%] {\n    height: 100%;\n    min-width: 6%;\n    background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 100%);\n    border-radius: 999px;\n}\n\n.status-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n}\n\n.status-row[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 14px 16px;\n    border-radius: 14px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n}\n\n.status-copy[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    color: #334155;\n    font-weight: 700;\n}\n\n.status-dot[_ngcontent-%COMP%] {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    display: inline-block;\n}\n\n.status-new[_ngcontent-%COMP%] {\n    background: #3b82f6;\n    color: #1d4ed8;\n}\n\n.status-progress[_ngcontent-%COMP%] {\n    background: #f59e0b;\n    color: #b45309;\n}\n\n.status-resolved[_ngcontent-%COMP%] {\n    background: #10b981;\n    color: #047857;\n}\n\n.status-closed[_ngcontent-%COMP%] {\n    background: #64748b;\n    color: #334155;\n}\n\n.status-default[_ngcontent-%COMP%] {\n    background: #cbd5e1;\n    color: #475569;\n}\n\n.timing-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 16px;\n}\n\n.timing-card[_ngcontent-%COMP%] {\n    padding: 20px;\n    border-radius: 16px;\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n}\n\n.timing-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    display: block;\n    margin: 10px 0;\n    font-size: 2rem;\n    color: #0f172a;\n}\n\n.timing-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #64748b;\n    line-height: 1.5;\n}\n\n.timing-label[_ngcontent-%COMP%] {\n    color: #475569;\n    font-size: 0.82rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n}\n\n.incident-feed[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n}\n\n.incident-feed-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 14px;\n    padding: 16px 18px;\n    border-radius: 16px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n}\n\n.incident-feed-copy[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n}\n\n.incident-feed-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    color: #0f172a;\n}\n\n.incident-feed-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    color: #64748b;\n    font-size: 0.86rem;\n}\n\n.status-chip[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    border-radius: 999px;\n    font-size: 0.78rem;\n    font-weight: 800;\n    background: #e2e8f0;\n}\n\n.status-chip.status-new[_ngcontent-%COMP%] {\n    background: #dbeafe;\n    color: #1d4ed8;\n}\n\n.status-chip.status-progress[_ngcontent-%COMP%] {\n    background: #fef3c7;\n    color: #b45309;\n}\n\n.status-chip.status-resolved[_ngcontent-%COMP%] {\n    background: #dcfce7;\n    color: #047857;\n}\n\n.status-chip.status-closed[_ngcontent-%COMP%], .status-chip.status-default[_ngcontent-%COMP%] {\n    background: #e2e8f0;\n    color: #334155;\n}\n\n.empty-panel[_ngcontent-%COMP%], .loading-panel[_ngcontent-%COMP%] {\n    min-height: 180px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    color: #94a3b8;\n    text-align: center;\n}\n\n.empty-panel[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .loading-panel[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2rem;\n}\n\n@media (max-width: 1100px) {\n    .kpi-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .charts-grid[_ngcontent-%COMP%], .bottom-grid[_ngcontent-%COMP%], .insight-hero[_ngcontent-%COMP%], .timing-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 720px) {\n    .kpi-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n\n    .incident-feed-item[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: flex-start;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentReportingComponent, [{
        type: Component,
        args: [{
                selector: 'app-incident-reporting',
                templateUrl: './incident-reporting.component.html',
                styleUrls: ['./incident-reporting.component.scss']
            }]
    }], function () { return [{ type: i1.IncidentService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=incident-reporting.component.js.map