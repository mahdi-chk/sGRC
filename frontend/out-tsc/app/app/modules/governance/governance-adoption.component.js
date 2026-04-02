import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMissionStatus } from '../../core/services/auditing.service';
import { RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../core/services/risk.service";
import * as i3 from "../../core/services/auditing.service";
import * as i4 from "@angular/common";
const _c0 = function () { return { exact: true }; };
function GovernanceAdoptionComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r1.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r1.label, " ");
} }
export class GovernanceAdoptionComponent {
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
    get assignedRisksRate() {
        if (!this.risks.length) {
            return 0;
        }
        const assigned = this.risks.filter(risk => !!risk.riskAgentId).length;
        return Math.round((assigned / this.risks.length) * 100);
    }
    get treatedRisksRate() {
        if (!this.risks.length) {
            return 0;
        }
        const treated = this.risks.filter(risk => this.isCompletedRiskStatus(risk.statutCode || risk.statut)).length;
        return Math.round((treated / this.risks.length) * 100);
    }
    get assignedMissionsRate() {
        if (!this.missions.length) {
            return 0;
        }
        const assigned = this.missions.filter(mission => !!mission.auditeurId).length;
        return Math.round((assigned / this.missions.length) * 100);
    }
    get reportedMissionsRate() {
        if (!this.missions.length) {
            return 0;
        }
        const reported = this.missions.filter(mission => !!mission.rapport || mission.statut === AuditMissionStatus.TERMINE).length;
        return Math.round((reported / this.missions.length) * 100);
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
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
GovernanceAdoptionComponent.ɵfac = function GovernanceAdoptionComponent_Factory(t) { return new (t || GovernanceAdoptionComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuditingService)); };
GovernanceAdoptionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceAdoptionComponent, selectors: [["app-governance-adoption"]], decls: 89, vars: 19, consts: [[1, "governance-standalone-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-user-check"], [1, "header-actions"], [1, "btn-secondary", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], [1, "progress-list"], [1, "progress-item"], [1, "progress-track"], [1, "progress-bar"], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"]], template: function GovernanceAdoptionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceAdoptionComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Adhesion et Application");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Taux d application reels mesures sur l assignation et l execution des risques et des missions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceAdoptionComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceAdoptionComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20, "Risques assignes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h3");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Couverture d assignation du portefeuille risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27, "Risques traites");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "h3");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p");
        i0.ɵɵtext(31, "Execution effective des actions sur les risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 12);
        i0.ɵɵelementStart(33, "span", 13);
        i0.ɵɵtext(34, "Missions assignees");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "h3");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "p");
        i0.ɵɵtext(38, "Missions confiees a un auditeur identifiable.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 12);
        i0.ɵɵelementStart(40, "span", 13);
        i0.ɵɵtext(41, "Rapports produits");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "h3");
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "p");
        i0.ɵɵtext(45, "Taux de missions avec rapport ou cloture.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 14);
        i0.ɵɵelementStart(47, "div", 15);
        i0.ɵɵelementStart(48, "div", 16);
        i0.ɵɵelementStart(49, "h2");
        i0.ɵɵtext(50, "Application sur les risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "p");
        i0.ɵɵtext(52, "Execution reelle sur le registre des risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "div", 17);
        i0.ɵɵelementStart(54, "div", 18);
        i0.ɵɵelementStart(55, "strong");
        i0.ɵɵtext(56, "Assignation du risk agent");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "div", 19);
        i0.ɵɵelement(58, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "span");
        i0.ɵɵtext(60);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "div", 18);
        i0.ɵɵelementStart(62, "strong");
        i0.ɵɵtext(63, "Traitement effectif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "div", 19);
        i0.ɵɵelement(65, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "span");
        i0.ɵɵtext(67);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "div", 15);
        i0.ɵɵelementStart(69, "div", 16);
        i0.ɵɵelementStart(70, "h2");
        i0.ɵɵtext(71, "Application sur les missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "p");
        i0.ɵɵtext(73, "Execution reelle sur le portefeuille d audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(74, "div", 17);
        i0.ɵɵelementStart(75, "div", 18);
        i0.ɵɵelementStart(76, "strong");
        i0.ɵɵtext(77, "Assignation des auditeurs");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "div", 19);
        i0.ɵɵelement(79, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "span");
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "div", 18);
        i0.ɵɵelementStart(83, "strong");
        i0.ɵɵtext(84, "Production des rapports");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(85, "div", 19);
        i0.ɵɵelement(86, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "span");
        i0.ɵɵtext(88);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate1("", ctx.assignedRisksRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.treatedRisksRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.assignedMissionsRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.reportedMissionsRate, "%");
        i0.ɵɵadvance(15);
        i0.ɵɵstyleProp("width", ctx.assignedRisksRate, "%");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.assignedRisksRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵstyleProp("width", ctx.treatedRisksRate, "%");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.treatedRisksRate, "%");
        i0.ɵɵadvance(12);
        i0.ɵɵstyleProp("width", ctx.assignedMissionsRate, "%");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.assignedMissionsRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵstyleProp("width", ctx.reportedMissionsRate, "%");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.reportedMissionsRate, "%");
    } }, directives: [i4.NgClass, i4.NgForOf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './governance-shared';\n\n.progress-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.progress-item[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 14px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n}\n\n.progress-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 10px;\n  color: #1e293b;\n}\n\n.progress-track[_ngcontent-%COMP%] {\n  height: 10px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  overflow: hidden;\n  margin-bottom: 8px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);\n}\n\n.progress-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n  font-weight: 700;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceAdoptionComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance-adoption',
                templateUrl: './governance-adoption.component.html',
                styleUrls: ['./governance-adoption.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.RiskService }, { type: i3.AuditingService }]; }, null); })();
//# sourceMappingURL=governance-adoption.component.js.map