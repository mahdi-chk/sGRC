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
function GovernanceMaturityComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r1.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r1.label, " ");
} }
export class GovernanceMaturityComponent {
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
    get totalRisks() {
        return this.risks.length;
    }
    get criticalRate() {
        if (!this.risks.length) {
            return 0;
        }
        const critical = this.risks.filter(risk => this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
        return Math.round((critical / this.risks.length) * 100);
    }
    get treatmentRate() {
        if (!this.risks.length) {
            return 0;
        }
        const treated = this.risks.filter(risk => this.isCompletedRiskStatus(risk.statutCode || risk.statut)).length;
        return Math.round((treated / this.risks.length) * 100);
    }
    get maturityLevel() {
        return RiskService.calculateMaturityIndex(this.risks);
    }
    get totalMissions() {
        return this.missions.length;
    }
    get completionRate() {
        if (!this.missions.length) {
            return 0;
        }
        const completed = this.missions.filter(mission => mission.statut === AuditMissionStatus.TERMINE).length;
        return Math.round((completed / this.missions.length) * 100);
    }
    get delayedRate() {
        if (!this.missions.length) {
            return 0;
        }
        const delayed = this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
        return Math.round((delayed / this.missions.length) * 100);
    }
    get onTimeRate() {
        if (!this.missions.length) {
            return 0;
        }
        const delayed = this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
        const cancelled = this.missions.filter(mission => mission.statut === AuditMissionStatus.ANNULE).length;
        const onTime = this.missions.length - delayed - cancelled;
        return Math.round((onTime / this.missions.length) * 100);
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
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
GovernanceMaturityComponent.ɵfac = function GovernanceMaturityComponent_Factory(t) { return new (t || GovernanceMaturityComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuditingService)); };
GovernanceMaturityComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceMaturityComponent, selectors: [["app-governance-maturity"]], decls: 101, vars: 15, consts: [[1, "governance-standalone-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-actions"], [1, "btn-secondary", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], [1, "kpi-list"], [1, "kpi-item"], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"]], template: function GovernanceMaturityComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceMaturityComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Indicateurs de Maturite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Reprise des indicateurs reels utilises dans les vues Top Management pour les risques et les missions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceMaturityComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceMaturityComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20, "Maturite risque");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h3");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24, "Calcul identique a celui du dashboard Top Management.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27, "Traitement risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "h3");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p");
        i0.ɵɵtext(31, "Risques traites ou clotures sur le total visible.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 12);
        i0.ɵɵelementStart(33, "span", 13);
        i0.ɵɵtext(34, "Completion audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "h3");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "p");
        i0.ɵɵtext(38, "Missions terminees sur l ensemble des missions.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 12);
        i0.ɵɵelementStart(40, "span", 13);
        i0.ɵɵtext(41, "Missions a temps");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "h3");
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "p");
        i0.ɵɵtext(45, "Mesure reelle de tenue du portefeuille d audit.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 14);
        i0.ɵɵelementStart(47, "div", 15);
        i0.ɵɵelementStart(48, "div", 16);
        i0.ɵɵelementStart(49, "h2");
        i0.ɵɵtext(50, "KPIs Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "p");
        i0.ɵɵtext(52, "Memes leviers que la vue direction risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "div", 17);
        i0.ɵɵelementStart(54, "div", 18);
        i0.ɵɵelementStart(55, "strong");
        i0.ɵɵtext(56, "Total risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(57, "span");
        i0.ɵɵtext(58);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "div", 18);
        i0.ɵɵelementStart(60, "strong");
        i0.ɵɵtext(61, "Taux critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "span");
        i0.ɵɵtext(63);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "div", 18);
        i0.ɵɵelementStart(65, "strong");
        i0.ɵɵtext(66, "Taux de traitement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "span");
        i0.ɵɵtext(68);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "div", 18);
        i0.ɵɵelementStart(70, "strong");
        i0.ɵɵtext(71, "Indice de maturite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "span");
        i0.ɵɵtext(73);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(74, "div", 15);
        i0.ɵɵelementStart(75, "div", 16);
        i0.ɵɵelementStart(76, "h2");
        i0.ɵɵtext(77, "KPIs Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "p");
        i0.ɵɵtext(79, "Memes indicateurs que l analytics audit du Top Management.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "div", 17);
        i0.ɵɵelementStart(81, "div", 18);
        i0.ɵɵelementStart(82, "strong");
        i0.ɵɵtext(83, "Total missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(84, "span");
        i0.ɵɵtext(85);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(86, "div", 18);
        i0.ɵɵelementStart(87, "strong");
        i0.ɵɵtext(88, "Completion");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(89, "span");
        i0.ɵɵtext(90);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(91, "div", 18);
        i0.ɵɵelementStart(92, "strong");
        i0.ɵɵtext(93, "Retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(94, "span");
        i0.ɵɵtext(95);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(96, "div", 18);
        i0.ɵɵelementStart(97, "strong");
        i0.ɵɵtext(98, "A temps");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(99, "span");
        i0.ɵɵtext(100);
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
        i0.ɵɵtextInterpolate1("", ctx.maturityLevel, "/5");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.treatmentRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.completionRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.onTimeRate, "%");
        i0.ɵɵadvance(15);
        i0.ɵɵtextInterpolate(ctx.totalRisks);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.criticalRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.treatmentRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.maturityLevel, "/5");
        i0.ɵɵadvance(12);
        i0.ɵɵtextInterpolate(ctx.totalMissions);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.completionRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.delayedRate, "%");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.onTimeRate, "%");
    } }, directives: [i4.NgClass, i4.NgForOf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './governance-shared';\n\n.summary-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border-color: rgba(37, 99, 235, 0.12);\n  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);\n}\n\n.summary-card[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: auto 0 0 0;\n  height: 4px;\n  background: linear-gradient(90deg, #0f766e 0%, #2563eb 60%, #0f172a 100%);\n}\n\n.summary-card[_ngcontent-%COMP%]:nth-child(2)::after, .summary-card[_ngcontent-%COMP%]:nth-child(4)::after {\n  background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 100%);\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 24px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.07);\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 5px;\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]:first-child::before {\n  background: linear-gradient(180deg, #0f766e 0%, #14b8a6 100%);\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]:last-child::before {\n  background: linear-gradient(180deg, #1d4ed8 0%, #60a5fa 100%);\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]:first-child   .card-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0f766e;\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]:last-child   .card-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n\n.kpi-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.kpi-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px solid #dbe7f3;\n  background: #ffffff;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n}\n\n.kpi-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.96rem;\n  line-height: 1.45;\n  color: #1e293b;\n}\n\n.kpi-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 84px;\n  padding: 10px 14px;\n  border-radius: 999px;\n  background: #e8f1ff;\n  color: #1d4ed8;\n  font-size: 1rem;\n  font-weight: 700;\n}\n\n.section-grid[_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%]:first-child   .kpi-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #dff7f2;\n  color: #0f766e;\n}\n\n@media (max-width: 640px) {\n  .kpi-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .kpi-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    width: fit-content;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceMaturityComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance-maturity',
                templateUrl: './governance-maturity.component.html',
                styleUrls: ['./governance-maturity.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.RiskService }, { type: i3.AuditingService }]; }, null); })();
//# sourceMappingURL=governance-maturity.component.js.map