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
function GovernanceWorkflowsComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function GovernanceWorkflowsComponent_table_39_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r9.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r8.getRiskBadgeClass(risk_r9));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(risk_r9.niveauRisque);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r9.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 6, risk_r9.dateEcheance, "shortDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r9.riskAgent ? risk_r9.riskAgent.prenom + " " + risk_r9.riskAgent.nom : "Non assigne");
} }
function GovernanceWorkflowsComponent_table_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 21);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Agent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, GovernanceWorkflowsComponent_table_39_tr_14_Template, 14, 9, "tr", 22);
    i0.ɵɵpipe(15, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(15, 1, ctx_r1.priorityRisks, 0, 10));
} }
function GovernanceWorkflowsComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Aucun risque prioritaire detecte.");
    i0.ɵɵelementEnd();
} }
function GovernanceWorkflowsComponent_table_48_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r11 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(mission_r11.titre);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r10.getMissionBadgeClass(mission_r11.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(mission_r11.statut);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 6, mission_r11.delai, "shortDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(mission_r11.auditeur ? mission_r11.auditeur.prenom + " " + mission_r11.auditeur.nom : "Non assignee");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((mission_r11.risk == null ? null : mission_r11.risk.titre) || "-");
} }
function GovernanceWorkflowsComponent_table_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 21);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Auditeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Risque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, GovernanceWorkflowsComponent_table_48_tr_14_Template, 14, 9, "tr", 22);
    i0.ɵɵpipe(15, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(15, 1, ctx_r4.priorityMissions, 0, 10));
} }
function GovernanceWorkflowsComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "Aucune mission prioritaire detectee.");
    i0.ɵɵelementEnd();
} }
export class GovernanceWorkflowsComponent {
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
                this.risks = risks;
                this.missions = missions;
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
    get priorityRisks() {
        return this.risks
            .filter(risk => this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL ||
            this.normalizeRiskStatus(risk.statutCode || risk.statut) === RiskStatus.OPEN ||
            !risk.riskAgentId)
            .slice()
            .sort((left, right) => new Date(left.dateEcheance).getTime() - new Date(right.dateEcheance).getTime());
    }
    get priorityMissions() {
        return this.missions
            .filter(mission => mission.statut === AuditMissionStatus.EN_RETARD ||
            mission.statut === AuditMissionStatus.EN_COURS ||
            !mission.auditeurId)
            .slice()
            .sort((left, right) => new Date(left.delai).getTime() - new Date(right.delai).getTime());
    }
    getRiskBadgeClass(risk) {
        if (this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL) {
            return 'danger';
        }
        if (this.isCompletedRiskStatus(risk.statutCode || risk.statut)) {
            return 'success';
        }
        return 'warning';
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
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalizeRiskStatus(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
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
GovernanceWorkflowsComponent.ɵfac = function GovernanceWorkflowsComponent_Factory(t) { return new (t || GovernanceWorkflowsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuditingService)); };
GovernanceWorkflowsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceWorkflowsComponent, selectors: [["app-governance-workflows"]], decls: 51, vars: 9, consts: [[1, "governance-standalone-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-diagram-project"], [1, "header-actions"], [1, "btn-secondary", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "section-grid"], [1, "table-card"], [1, "card-head"], ["class", "governance-table", 4, "ngIf", "ngIfElse"], ["emptyRisks", ""], ["emptyMissions", ""], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "governance-table"], [4, "ngFor", "ngForOf"], [1, "badge", 3, "ngClass"], [1, "empty-state"]], template: function GovernanceWorkflowsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceWorkflowsComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Workflows d Approbation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Vision des flux de traitement reels a partir des risques et des missions qui demandent une decision ou une action.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceWorkflowsComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceWorkflowsComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20, "Risques prioritaires");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h3");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Risques critiques, ouverts ou non assignes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27, "Missions prioritaires");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "h3");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p");
        i0.ɵɵtext(31, "Missions en retard, en cours ou sans auditeur.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 14);
        i0.ɵɵelementStart(33, "div", 15);
        i0.ɵɵelementStart(34, "div", 16);
        i0.ɵɵelementStart(35, "h3");
        i0.ɵɵtext(36, "File risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "p");
        i0.ɵɵtext(38, "Elements a arbitrer ou reassigner rapidement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(39, GovernanceWorkflowsComponent_table_39_Template, 16, 5, "table", 17);
        i0.ɵɵtemplate(40, GovernanceWorkflowsComponent_ng_template_40_Template, 2, 0, "ng-template", null, 18, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "div", 15);
        i0.ɵɵelementStart(43, "div", 16);
        i0.ɵɵelementStart(44, "h3");
        i0.ɵɵtext(45, "File missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "p");
        i0.ɵɵtext(47, "Suivi des missions d audit en attente de traitement gouvernance.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(48, GovernanceWorkflowsComponent_table_48_Template, 16, 5, "table", 17);
        i0.ɵɵtemplate(49, GovernanceWorkflowsComponent_ng_template_49_Template, 2, 0, "ng-template", null, 19, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(41);
        const _r5 = i0.ɵɵreference(50);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.priorityRisks.length);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.priorityMissions.length);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngIf", ctx.priorityRisks.length > 0)("ngIfElse", _r2);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngIf", ctx.priorityMissions.length > 0)("ngIfElse", _r5);
    } }, directives: [i4.NgClass, i4.NgForOf, i4.NgIf, i1.RouterLinkWithHref, i1.RouterLinkActive], pipes: [i4.SlicePipe, i4.DatePipe], styles: ["@import './governance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceWorkflowsComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance-workflows',
                templateUrl: './governance-workflows.component.html',
                styleUrls: ['./governance-workflows.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.RiskService }, { type: i3.AuditingService }]; }, null); })();
//# sourceMappingURL=governance-workflows.component.js.map