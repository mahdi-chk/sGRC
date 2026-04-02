import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMissionStatus } from '../../core/services/auditing.service';
import { RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../core/services/risk.service";
import * as i3 from "../../core/services/auditing.service";
import * as i4 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function GovernanceHistoryComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function GovernanceHistoryComponent_table_53_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵelementStart(9, "span", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r9.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r9.domaine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r9.niveauRisque);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r8.getRiskBadgeClass(risk_r9.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(risk_r9.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 6, risk_r9.updatedAt, "short"));
} }
function GovernanceHistoryComponent_table_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 21);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Domaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Mise a jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, GovernanceHistoryComponent_table_53_tr_14_Template, 14, 9, "tr", 22);
    i0.ɵɵpipe(15, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(15, 1, ctx_r1.risks, 0, 8));
} }
function GovernanceHistoryComponent_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Aucun risque disponible.");
    i0.ɵɵelementEnd();
} }
function GovernanceHistoryComponent_table_62_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵelementStart(7, "span", 23);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r11 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(mission_r11.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mission_r11.auditeur ? mission_r11.auditeur.prenom + " " + mission_r11.auditeur.nom : "Non assignee");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r10.getMissionBadgeClass(mission_r11.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r11.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 6, mission_r11.delai, "shortDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 9, mission_r11.updatedAt, "short"));
} }
function GovernanceHistoryComponent_table_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 21);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Mise a jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, GovernanceHistoryComponent_table_62_tr_14_Template, 15, 12, "tr", 22);
    i0.ɵɵpipe(15, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(15, 1, ctx_r4.missions, 0, 8));
} }
function GovernanceHistoryComponent_ng_template_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Aucune mission disponible.");
    i0.ɵɵelementEnd();
} }
export class GovernanceHistoryComponent {
    constructor(router, riskService, auditingService) {
        this.router = router;
        this.riskService = riskService;
        this.auditingService = auditingService;
        this.navItems = GOVERNANCE_NAV_ITEMS;
        this.risks = [];
        this.missions = [];
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        forkJoin({
            risks: this.riskService.getRisks(),
            missions: this.auditingService.getMissions()
        }).subscribe({
            next: ({ risks, missions }) => {
                this.risks = risks
                    .slice()
                    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
                this.missions = missions
                    .slice()
                    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
                this.isLoading = false;
            },
            error: () => {
                this.risks = [];
                this.missions = [];
                this.isLoading = false;
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard/governance']);
    }
    get openRisks() {
        return this.risks.filter(risk => this.isOpenRiskStatus(risk.statutCode || risk.statut)).length;
    }
    get criticalRisks() {
        return this.risks.filter(risk => this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
    }
    get activeMissions() {
        return this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_COURS).length;
    }
    get lateMissions() {
        return this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
    }
    getRiskBadgeClass(status) {
        switch (this.normalizeRiskStatus(status)) {
            case RiskStatus.TREATED:
            case RiskStatus.CLOSED:
                return 'success';
            case RiskStatus.IN_PROGRESS:
                return 'info';
            default:
                return 'warning';
        }
    }
    getMissionBadgeClass(status) {
        switch (status) {
            case AuditMissionStatus.TERMINE:
                return 'success';
            case AuditMissionStatus.EN_RETARD:
                return 'danger';
            case AuditMissionStatus.EN_COURS:
                return 'info';
            default:
                return 'warning';
        }
    }
    isOpenRiskStatus(status) {
        const normalizedStatus = this.normalizeRiskStatus(status);
        return normalizedStatus === RiskStatus.OPEN || normalizedStatus === RiskStatus.IN_PROGRESS;
    }
    normalizeRiskStatus(status) {
        return this.normalize(status);
    }
    normalizeRiskLevel(level) {
        return this.normalize(level);
    }
    normalize(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
GovernanceHistoryComponent.ɵfac = function GovernanceHistoryComponent_Factory(t) { return new (t || GovernanceHistoryComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuditingService)); };
GovernanceHistoryComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceHistoryComponent, selectors: [["app-governance-history"]], decls: 65, vars: 11, consts: [[1, "governance-standalone-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-clock-rotate-left"], [1, "header-actions"], [1, "btn-secondary", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "section-grid"], [1, "table-card"], [1, "card-head"], ["class", "governance-table", 4, "ngIf", "ngIfElse"], ["emptyRisks", ""], ["emptyMissions", ""], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "governance-table"], [4, "ngFor", "ngForOf"], [1, "badge", 3, "ngClass"], [1, "empty-state"]], template: function GovernanceHistoryComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceHistoryComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Tracabilite et Historique");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Historique de gestion des risques et des missions d audit, sans passer par la couche documentaire.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceHistoryComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceHistoryComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20, "Risques ouverts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h3");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Risques encore dans le cycle de traitement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27, "Risques critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "h3");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p");
        i0.ɵɵtext(31, "Elements a forte exposition visibles dans le registre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 12);
        i0.ɵɵelementStart(33, "span", 13);
        i0.ɵɵtext(34, "Missions actives");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "h3");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "p");
        i0.ɵɵtext(38, "Missions actuellement en execution.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 12);
        i0.ɵɵelementStart(40, "span", 13);
        i0.ɵɵtext(41, "Missions en retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "h3");
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "p");
        i0.ɵɵtext(45, "Dossiers audit a escalader.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 14);
        i0.ɵɵelementStart(47, "div", 15);
        i0.ɵɵelementStart(48, "div", 16);
        i0.ɵɵelementStart(49, "h3");
        i0.ɵɵtext(50, "Historique risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "p");
        i0.ɵɵtext(52, "Trie par derniere mise a jour du registre des risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(53, GovernanceHistoryComponent_table_53_Template, 16, 5, "table", 17);
        i0.ɵɵtemplate(54, GovernanceHistoryComponent_ng_template_54_Template, 2, 0, "ng-template", null, 18, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "div", 15);
        i0.ɵɵelementStart(57, "div", 16);
        i0.ɵɵelementStart(58, "h3");
        i0.ɵɵtext(59, "Historique missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "p");
        i0.ɵɵtext(61, "Trie par derniere mise a jour des missions d audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(62, GovernanceHistoryComponent_table_62_Template, 16, 5, "table", 17);
        i0.ɵɵtemplate(63, GovernanceHistoryComponent_ng_template_63_Template, 2, 0, "ng-template", null, 19, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(55);
        const _r5 = i0.ɵɵreference(64);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.openRisks);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.criticalRisks);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.activeMissions);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.lateMissions);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngIf", ctx.risks.length > 0)("ngIfElse", _r2);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngIf", ctx.missions.length > 0)("ngIfElse", _r5);
    } }, directives: [i4.NgClass, i4.NgForOf, i4.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], pipes: [i4.SlicePipe, i4.DatePipe], styles: ["@import './governance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceHistoryComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance-history',
                templateUrl: './governance-history.component.html',
                styleUrls: ['./governance-history.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.RiskService }, { type: i3.AuditingService }]; }, null); })();
//# sourceMappingURL=governance-history.component.js.map