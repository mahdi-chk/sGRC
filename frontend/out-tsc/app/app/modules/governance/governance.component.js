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
function GovernanceComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r2.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r2.label, " ");
} }
function GovernanceComponent_a_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const module_r3 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", module_r3.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r3.description);
} }
export class GovernanceComponent {
    constructor(router, riskService, auditingService) {
        this.router = router;
        this.riskService = riskService;
        this.auditingService = auditingService;
        this.navItems = GOVERNANCE_NAV_ITEMS;
        this.modules = [
            {
                title: 'Gestion Documentaire',
                route: '/dashboard/governance-documents',
                description: 'Acces et administration des ressources documentaires de gouvernance.'
            },
            {
                title: 'Tracabilite et Historique',
                route: '/dashboard/governance-history',
                description: 'Suivi des risques et des missions via leurs derniers statuts et mises a jour.'
            },
            {
                title: 'Workflows d Approbation',
                route: '/dashboard/governance-workflows',
                description: 'Files de traitement construites a partir des risques et missions en attente.'
            },
            {
                title: 'Indicateurs de Maturite',
                route: '/dashboard/governance-maturity',
                description: 'KPIs alignes sur les indicateurs utilises par le Top Management.'
            },
            {
                title: 'Adhesion et Application',
                route: '/dashboard/governance-adoption',
                description: 'Couverture d execution reelle sur les risques et les missions.'
            }
        ];
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
        this.router.navigate(['/dashboard']);
    }
    get maturityLevel() {
        return RiskService.calculateMaturityIndex(this.risks);
    }
    get treatmentRate() {
        if (!this.risks.length) {
            return 0;
        }
        const treated = this.risks.filter(risk => this.isCompletedRiskStatus(risk.statutCode || risk.statut)).length;
        return Math.round((treated / this.risks.length) * 100);
    }
    get criticalRisks() {
        return this.risks.filter(risk => this.normalize(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
    }
    get completionRate() {
        if (!this.missions.length) {
            return 0;
        }
        const completed = this.missions.filter(mission => mission.statut === AuditMissionStatus.TERMINE).length;
        return Math.round((completed / this.missions.length) * 100);
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
GovernanceComponent.ɵfac = function GovernanceComponent_Factory(t) { return new (t || GovernanceComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.RiskService), i0.ɵɵdirectiveInject(i3.AuditingService)); };
GovernanceComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GovernanceComponent, selectors: [["app-governance"]], decls: 77, vars: 10, consts: [[1, "governance-standalone-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-sitemap"], [1, "header-actions"], [1, "btn-secondary", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "governance-tabs"], ["routerLinkActive", "active", "class", "governance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "summary-grid"], [1, "summary-card"], [1, "eyebrow"], [1, "section-grid"], [1, "content-card"], [1, "card-head"], [1, "module-list"], ["class", "module-link", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "executive-notes"], [1, "note-item"], ["routerLinkActive", "active", 1, "governance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "module-link", 3, "routerLink"]], template: function GovernanceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function GovernanceComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Gouvernance");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Point d entree des sous-modules Gouvernance, alimentes a partir des risques, des missions et des ressources documentaires reelles.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function GovernanceComponent_Template_button_click_12_listener() { return ctx.loadData(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, GovernanceComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 11);
        i0.ɵɵelementStart(18, "div", 12);
        i0.ɵɵelementStart(19, "span", 13);
        i0.ɵɵtext(20, "Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "h3");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p");
        i0.ɵɵtext(24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 12);
        i0.ɵɵelementStart(26, "span", 13);
        i0.ɵɵtext(27, "Traitement");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "h3");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p");
        i0.ɵɵtext(31, "Taux de traitement calcule sur la meme logique que le Top Management.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 12);
        i0.ɵɵelementStart(33, "span", 13);
        i0.ɵɵtext(34, "Maturite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "h3");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "p");
        i0.ɵɵtext(38, "Indice de maturite risque reutilise depuis les indicateurs direction.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "div", 12);
        i0.ɵɵelementStart(40, "span", 13);
        i0.ɵɵtext(41, "Missions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "h3");
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "p");
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 14);
        i0.ɵɵelementStart(47, "div", 15);
        i0.ɵɵelementStart(48, "div", 16);
        i0.ɵɵelementStart(49, "h2");
        i0.ɵɵtext(50, "Sous-modules");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "p");
        i0.ɵɵtext(52, "Chaque interface est desormais separee et accessible directement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "div", 17);
        i0.ɵɵtemplate(54, GovernanceComponent_a_54_Template, 5, 3, "a", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "div", 15);
        i0.ɵɵelementStart(56, "div", 16);
        i0.ɵɵelementStart(57, "h2");
        i0.ɵɵtext(58, "Lecture executive");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "p");
        i0.ɵɵtext(60, "La gouvernance s appuie ici sur les objets metiers reels plutot que sur des donnees de demonstration.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "div", 19);
        i0.ɵɵelementStart(62, "div", 20);
        i0.ɵɵelementStart(63, "strong");
        i0.ɵɵtext(64, "Historique");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "p");
        i0.ɵɵtext(66, "Construit sur les risques et les missions, pas sur les documents.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "div", 20);
        i0.ɵɵelementStart(68, "strong");
        i0.ɵɵtext(69, "Maturite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "p");
        i0.ɵɵtext(71, "Basee sur les memes indicateurs risques et audit que le Top Management.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "div", 20);
        i0.ɵɵelementStart(73, "strong");
        i0.ɵɵtext(74, "Interfaces separees");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "p");
        i0.ɵɵtext(76, "Chaque sous-module s ouvre sur sa propre page autonome.");
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
        i0.ɵɵtextInterpolate(ctx.risks.length);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.criticalRisks, " critique(s) actuellement visibles.");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", ctx.treatmentRate, "%");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1("", ctx.maturityLevel, "/5");
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.missions.length);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.completionRate, "% de completion des missions d audit.");
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngForOf", ctx.modules);
    } }, directives: [i4.NgClass, i4.NgForOf, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './governance-shared';\n\n.module-list[_ngcontent-%COMP%], .executive-notes[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.module-link[_ngcontent-%COMP%], .note-item[_ngcontent-%COMP%] {\n  display: block;\n  text-decoration: none;\n  padding: 16px;\n  border-radius: 14px;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n}\n\n.module-link[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .note-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1e293b;\n}\n\n.module-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .note-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #64748b;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceComponent, [{
        type: Component,
        args: [{
                selector: 'app-governance',
                templateUrl: './governance.component.html',
                styleUrls: ['./governance.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.RiskService }, { type: i3.AuditingService }]; }, null); })();
//# sourceMappingURL=governance.component.js.map