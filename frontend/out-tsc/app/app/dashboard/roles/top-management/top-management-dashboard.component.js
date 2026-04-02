import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RiskService, RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "../../../core/services/dashboard.service";
import * as i5 from "@angular/common";
function TopManagementDashboardComponent_div_30_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 18);
    i0.ɵɵlistener("click", function TopManagementDashboardComponent_div_30_li_8_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r8); const s_r5 = restoredCtx.$implicit; const m_r3 = i0.ɵɵnextContext().$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.onOpenModule(m_r3, s_r5); });
    i0.ɵɵelement(1, "i", 19);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r5.title, " ");
} }
function TopManagementDashboardComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelement(2, "i", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul", 16);
    i0.ɵɵtemplate(8, TopManagementDashboardComponent_div_30_li_8_Template, 3, 1, "li", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(m_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r3.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", m_r3.submodules);
} }
function TopManagementDashboardComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun module fonctionnel n'est assign\u00E9 \u00E0 votre r\u00F4le.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class TopManagementDashboardComponent {
    constructor(riskService, router, authService, dashboardService) {
        this.riskService = riskService;
        this.router = router;
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.filteredModules = [];
        this.title = 'Dashboard Top Management';
        this.openModule = new EventEmitter();
        this.risks = [];
        this.totalRisks = 0;
        this.criticalRisks = 0;
        this.maturityLevel = 0;
        this.treatmentRate = 0;
    }
    ngOnInit() {
        this.loadStatistics();
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && (user === null || user === void 0 ? void 0 : user.role)) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }
    loadStatistics() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.totalRisks = risks.length;
            this.criticalRisks = risks.filter(r => this.normalizeRiskLevel(r.niveauRisqueCode || r.niveauRisque) === RiskLevel.CRITICAL).length;
            const treatedCount = risks.filter(r => this.isCompletedRiskStatus(r.statutCode || r.statut)).length;
            this.treatmentRate = this.totalRisks > 0 ? Math.round((treatedCount / this.totalRisks) * 100) : 0;
            this.maturityLevel = RiskService.calculateMaturityIndex(this.risks);
        });
    }
    onOpenModule(m, s) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }
    goToStatistics() {
        this.router.navigate(['/dashboard/statistics']);
    }
    goToAuditStatistics() {
        this.router.navigate(['/dashboard/audit-statistics']);
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
TopManagementDashboardComponent.ɵfac = function TopManagementDashboardComponent_Factory(t) { return new (t || TopManagementDashboardComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.DashboardService)); };
TopManagementDashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TopManagementDashboardComponent, selectors: [["app-top-management-dashboard"]], inputs: { filteredModules: "filteredModules", title: "title" }, outputs: { openModule: "openModule" }, decls: 33, vars: 2, consts: [[1, "role-dashboard", "top-management"], [1, "welcome-banner"], [1, "fas", "fa-chart-line"], [1, "dashboard-grid"], [1, "module-card", "premium", "special-admin"], [1, "card-icon"], [1, "fas", "fa-chart-bar"], [1, "desc"], [1, "card-footer"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-external-link-alt"], [1, "fas", "fa-clipboard-check"], ["class", "module-card premium", 4, "ngFor", "ngForOf"], ["noModules", ""], [1, "module-card", "premium"], [1, "fas", "fa-eye"], [1, "submodules-list"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "fas", "fa-chevron-right"], [1, "empty-state"], [1, "fas", "fa-folder-open"]], template: function TopManagementDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵelement(3, "i", 2);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p");
        i0.ɵɵtext(6, "Vision strat\u00E9gique, indicateurs cl\u00E9s et aide \u00E0 la d\u00E9cision.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 3);
        i0.ɵɵelementStart(8, "div", 4);
        i0.ɵɵelementStart(9, "div", 5);
        i0.ɵɵelement(10, "i", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "h3");
        i0.ɵɵtext(12, "Analytics Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "p", 7);
        i0.ɵɵtext(14, "Suivez l'\u00E9volution du paysage des risques, les taux de traitement et l'indice de maturit\u00E9 GRC pour un pilotage strat\u00E9gique.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 8);
        i0.ɵɵelementStart(16, "button", 9);
        i0.ɵɵlistener("click", function TopManagementDashboardComponent_Template_button_click_16_listener() { return ctx.goToStatistics(); });
        i0.ɵɵelement(17, "i", 10);
        i0.ɵɵtext(18, " Voir les d\u00E9tails ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 4);
        i0.ɵɵelementStart(20, "div", 5);
        i0.ɵɵelement(21, "i", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "h3");
        i0.ɵɵtext(23, "Analytics Audit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "p", 7);
        i0.ɵɵtext(25, "Suivez la performance des audits, les missions en cours et les taux de compl\u00E9tion pour une vue d'ensemble du contr\u00F4le interne.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "div", 8);
        i0.ɵɵelementStart(27, "button", 9);
        i0.ɵɵlistener("click", function TopManagementDashboardComponent_Template_button_click_27_listener() { return ctx.goToAuditStatistics(); });
        i0.ɵɵelement(28, "i", 10);
        i0.ɵɵtext(29, " Voir les d\u00E9tails ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(30, TopManagementDashboardComponent_div_30_Template, 9, 3, "div", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(31, TopManagementDashboardComponent_ng_template_31_Template, 4, 0, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.title, "");
        i0.ɵɵadvance(26);
        i0.ɵɵproperty("ngForOf", ctx.filteredModules);
    } }, directives: [i5.NgForOf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TopManagementDashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-top-management-dashboard',
                templateUrl: './top-management-dashboard.component.html'
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }, { type: i3.AuthService }, { type: i4.DashboardService }]; }, { filteredModules: [{
            type: Input
        }], title: [{
            type: Input
        }], openModule: [{
            type: Output
        }] }); })();
//# sourceMappingURL=top-management-dashboard.component.js.map