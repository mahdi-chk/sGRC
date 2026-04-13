import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getStoredSupervisionRole, getSupervisionNavItems } from './supervision-navigation';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./supervision.service";
import * as i3 from "@angular/common";
function SupervisionComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "div", 13);
    i0.ɵɵtext(2, "Health score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 14);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 15);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 16);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r4 = ctx.ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(data_r4.summary.healthScore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(data_r4.summary.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Mis a jour le ", i0.ɵɵpipeBind2(9, 3, data_r4.generatedAt, "dd/MM/yyyy HH:mm"), "");
} }
function SupervisionComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵelementStart(2, "span", 19);
    i0.ɵɵtext(3, "Alertes actives");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7, "Prioritaires a surveiller");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 18);
    i0.ɵɵelementStart(9, "span", 19);
    i0.ɵɵtext(10, "Recommandations clefs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "small");
    i0.ɵɵtext(14, "Actions pretes a engager");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 18);
    i0.ɵɵelementStart(16, "span", 19);
    i0.ɵɵtext(17, "Domaines monitores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "small");
    i0.ɵɵtext(21, "Risque, audit, incidents, conformite, alertes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 18);
    i0.ɵɵelementStart(23, "span", 19);
    i0.ɵɵtext(24, "Rythme de revue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "small");
    i0.ɵɵtext(28, "Cadence de pilotage recommandee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r5 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(data_r5.summary.activeAlerts);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.keyRecommendations);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.monitoredDomains);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r5.summary.nextReview);
} }
function SupervisionComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r6.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.description);
} }
function SupervisionComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, " Chargement des donnees de supervision... ");
    i0.ɵɵelementEnd();
} }
export class SupervisionComponent {
    constructor(router, supervisionService) {
        this.router = router;
        this.supervisionService = supervisionService;
        this.navItems = getSupervisionNavItems(getStoredSupervisionRole());
        this.overview = null;
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadOverview();
    }
    loadOverview() {
        this.isLoading = true;
        this.supervisionService.getOverview().subscribe({
            next: overview => {
                this.overview = overview;
                this.isLoading = false;
            },
            error: () => {
                this.overview = null;
                this.isLoading = false;
            }
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
SupervisionComponent.ɵfac = function SupervisionComponent_Factory(t) { return new (t || SupervisionComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.SupervisionService)); };
SupervisionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionComponent, selectors: [["app-supervision"]], decls: 18, vars: 4, consts: [[1, "supervision-shell"], [1, "supervision-hero"], [1, "hero-copy"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "eyebrow"], ["class", "hero-score", 4, "ngIf"], ["class", "summary-grid", 4, "ngIf"], [1, "supervision-nav"], ["routerLinkActive", "is-active", "class", "nav-chip", 3, "routerLink", 4, "ngFor", "ngForOf"], ["class", "loading-state", 4, "ngIf"], [1, "supervision-content"], [1, "hero-score"], [1, "score-label"], [1, "score-value"], [1, "score-status"], [1, "score-meta"], [1, "summary-grid"], [1, "summary-card"], [1, "summary-label"], ["routerLinkActive", "is-active", 1, "nav-chip", 3, "routerLink"], [1, "loading-state"]], template: function SupervisionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function SupervisionComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 5);
        i0.ɵɵtext(6, "Pilotage transverse");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "h1");
        i0.ɵɵtext(8, "Supervision sGRC");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, " Un espace unique pour suivre la sante GRC, orienter les decisions et guider les remediations sur les modules risques, audits, incidents, conformite et actions. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, SupervisionComponent_div_11_Template, 10, 6, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(12, SupervisionComponent_div_12_Template, 29, 4, "div", 7);
        i0.ɵɵelementStart(13, "nav", 8);
        i0.ɵɵtemplate(14, SupervisionComponent_a_14_Template, 5, 3, "a", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, SupervisionComponent_div_15_Template, 2, 0, "div", 10);
        i0.ɵɵelementStart(16, "div", 11);
        i0.ɵɵelement(17, "router-outlet");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.overview);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, directives: [i3.NgIf, i3.NgForOf, i1.RouterOutlet, i1.RouterLinkWithHref, i1.RouterLinkActive], pipes: [i3.DatePipe], styles: [".supervision-shell[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(245, 188, 66, 0.18), transparent 34%),\n    linear-gradient(180deg, #f7f4eb 0%, #eef3f6 100%);\n  color: #173042;\n}\n\n.supervision-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.8fr);\n  gap: 20px;\n  align-items: stretch;\n  margin-bottom: 18px;\n}\n\n.hero-copy[_ngcontent-%COMP%], .hero-score[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%], .nav-chip[_ngcontent-%COMP%], .supervision-content[_ngcontent-%COMP%] {\n  border: 1px solid rgba(23, 48, 66, 0.1);\n  box-shadow: 0 18px 38px rgba(23, 48, 66, 0.08);\n}\n\n.hero-copy[_ngcontent-%COMP%], .hero-score[_ngcontent-%COMP%] {\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.88);\n}\n\n.hero-copy[_ngcontent-%COMP%] {\n  padding: 26px 28px;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 14px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(23, 48, 66, 0.08);\n  font-size: 12px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 36px;\n  line-height: 1.05;\n}\n\n.hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  max-width: 720px;\n  color: #496272;\n  line-height: 1.6;\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  margin-bottom: 20px;\n  border: none;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #173042, #21516e);\n  color: #fff;\n  cursor: pointer;\n}\n\n.hero-score[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 22px;\n  background: linear-gradient(160deg, #173042 0%, #245c7c 100%);\n  color: #f4f8fb;\n}\n\n.score-label[_ngcontent-%COMP%], .score-meta[_ngcontent-%COMP%] {\n  color: rgba(244, 248, 251, 0.72);\n}\n\n.score-value[_ngcontent-%COMP%] {\n  margin: 10px 0 4px;\n  font-size: 56px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.score-status[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: 16px;\n  margin-bottom: 18px;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 18px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.86);\n}\n\n.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 30px;\n  line-height: 1.1;\n}\n\n.summary-label[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #4e6877;\n}\n\n.supervision-nav[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n  margin-bottom: 18px;\n}\n\n.nav-chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 16px 18px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.82);\n  color: #173042;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.nav-chip[_ngcontent-%COMP%]:hover, .nav-chip.is-active[_ngcontent-%COMP%] {\n  transform: translateY(-2px);\n  border-color: rgba(245, 188, 66, 0.42);\n  box-shadow: 0 20px 40px rgba(23, 48, 66, 0.12);\n}\n\n.nav-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n\n.nav-chip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #5e7888;\n  line-height: 1.45;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  color: #496272;\n}\n\n.supervision-content[_ngcontent-%COMP%] {\n  padding: 22px;\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.9);\n}\n\n@media (max-width: 960px) {\n  .supervision-shell[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .supervision-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n\n  .score-value[_ngcontent-%COMP%] {\n    font-size: 46px;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision',
                templateUrl: './supervision.component.html',
                styleUrls: ['./supervision.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision.component.js.map