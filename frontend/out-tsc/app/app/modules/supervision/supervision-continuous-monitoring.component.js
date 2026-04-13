import { Component } from '@angular/core';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "./supervision.service";
import * as i2 from "@angular/common";
const _c0 = function (a0, a1, a2) { return { "tone-critical": a0, "tone-high": a1, "tone-good": a2 }; };
function SupervisionContinuousMonitoringComponent_article_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 12);
    i0.ɵɵelementStart(1, "div", 13);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 14);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 4);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 15);
    i0.ɵɵelementStart(10, "span", 16);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 16);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r4.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(8, _c0, alert_r4.severity === "critique", alert_r4.severity === "haute", alert_r4.severity !== "critique" && alert_r4.severity !== "haute"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, alert_r4.severity));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r4.detail);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r4.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r4.route);
} }
function SupervisionContinuousMonitoringComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 13);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 18);
    i0.ɵɵelement(7, "div", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const point_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(point_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", point_r5.score, "/100");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", point_r5.score, "%");
} }
function SupervisionContinuousMonitoringComponent_article_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20);
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵelementStart(4, "span", 16);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 16);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 18);
    i0.ɵɵelement(9, "div", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.label);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", item_r6.score, "/100");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Cible ", item_r6.target, "/100");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r6.score, "%");
} }
function SupervisionContinuousMonitoringComponent_article_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20);
    i0.ɵɵelementStart(1, "div", 15);
    i0.ɵɵelementStart(2, "span", 14);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 4);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(4, _c0, item_r7.tone === "alert", item_r7.tone === "watch", item_r7.tone === "good"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r7.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.detail);
} }
export class SupervisionContinuousMonitoringComponent {
    constructor(supervisionService) {
        this.supervisionService = supervisionService;
        this.status = '';
        this.focus = '';
        this.alerts = [];
        this.trend = [];
        this.breakdown = [];
        this.watchlist = [];
    }
    ngOnInit() {
        this.supervisionService.getOverview().subscribe(overview => {
            const monitoring = overview.modules.continuousMonitoring;
            this.status = monitoring.status;
            this.focus = monitoring.focus;
            this.alerts = monitoring.alerts;
            this.trend = monitoring.healthTrend;
            this.breakdown = monitoring.breakdown;
            this.watchlist = monitoring.watchlist;
        });
    }
}
SupervisionContinuousMonitoringComponent.ɵfac = function SupervisionContinuousMonitoringComponent_Factory(t) { return new (t || SupervisionContinuousMonitoringComponent)(i0.ɵɵdirectiveInject(i1.SupervisionService)); };
SupervisionContinuousMonitoringComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionContinuousMonitoringComponent, selectors: [["app-supervision-continuous-monitoring"]], decls: 64, vars: 9, consts: [[1, "section-header"], [1, "section-note"], [1, "metric-grid"], [1, "metric-card"], [1, "muted"], [1, "section-header", 2, "margin-top", "24px"], [1, "list-stack"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "bar-list"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "card-grid"], ["class", "data-card", 4, "ngFor", "ngForOf"], [1, "list-item"], [1, "item-topline"], [1, "pill", 3, "ngClass"], [1, "meta-line"], [1, "pill"], [1, "bar-row"], [1, "bar-track"], [1, "bar-fill"], [1, "data-card"]], template: function SupervisionContinuousMonitoringComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵtext(3, "Supervision Continue");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p");
        i0.ɵɵtext(5, " Le cockpit concentre les signaux de sante GRC les plus sensibles pour guider les arbitrages, prevenir la degradation et prioriser les revues de gouvernance. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 1);
        i0.ɵɵtext(7);
        i0.ɵɵelement(8, "br");
        i0.ɵɵtext(9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 2);
        i0.ɵɵelementStart(11, "article", 3);
        i0.ɵɵelementStart(12, "div", 4);
        i0.ɵɵtext(13, "Alertes prioritaires");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "strong");
        i0.ɵɵtext(15);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "p", 4);
        i0.ɵɵtext(17, "Elements a traiter ou escalader rapidement.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "article", 3);
        i0.ɵɵelementStart(19, "div", 4);
        i0.ɵɵtext(20, "Tendance sante");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "strong");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p", 4);
        i0.ɵɵtext(24, "Score le plus recent sur la fenetre observee.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "article", 3);
        i0.ɵɵelementStart(26, "div", 4);
        i0.ɵɵtext(27, "Zones suivies");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "strong");
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "p", 4);
        i0.ɵɵtext(31, "Piliers consolides dans le cockpit de supervision.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "div", 5);
        i0.ɵɵelementStart(33, "div");
        i0.ɵɵelementStart(34, "h2");
        i0.ɵɵtext(35, "Alertes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "p");
        i0.ɵɵtext(37, "Vue courte des signaux faibles ou forts qui meritent une action immediate.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 6);
        i0.ɵɵtemplate(39, SupervisionContinuousMonitoringComponent_article_39_Template, 14, 12, "article", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "div", 5);
        i0.ɵɵelementStart(41, "div");
        i0.ɵɵelementStart(42, "h2");
        i0.ɵɵtext(43, "Evolution du health score");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "p");
        i0.ɵɵtext(45, "Lecture rapide de la dynamique recente pour verifier si le dispositif se stabilise.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "div", 8);
        i0.ɵɵtemplate(47, SupervisionContinuousMonitoringComponent_div_47_Template, 8, 4, "div", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(48, "div", 5);
        i0.ɵɵelementStart(49, "div");
        i0.ɵɵelementStart(50, "h2");
        i0.ɵɵtext(51, "Breakdown par domaine");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "p");
        i0.ɵɵtext(53, "Comparaison du niveau observe avec la cible attendue pour chaque pilier.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "div", 10);
        i0.ɵɵtemplate(55, SupervisionContinuousMonitoringComponent_article_55_Template, 10, 5, "article", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "div", 5);
        i0.ɵɵelementStart(57, "div");
        i0.ɵɵelementStart(58, "h2");
        i0.ɵɵtext(59, "Watchlist");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "p");
        i0.ɵɵtext(61, "Points de controle a verifier dans la prochaine revue ou avant escalation.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "div", 10);
        i0.ɵɵtemplate(63, SupervisionContinuousMonitoringComponent_article_63_Template, 8, 8, "article", 11);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1(" ", ctx.status, "");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.focus, " ");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.alerts.length);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.trend.length > 0 ? ctx.trend[ctx.trend.length - 1].score : 0);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.breakdown.length);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngForOf", ctx.alerts);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.trend);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.breakdown);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.watchlist);
    } }, directives: [i2.NgForOf, i2.NgClass], pipes: [i2.TitleCasePipe], styles: ["@import './supervision-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionContinuousMonitoringComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision-continuous-monitoring',
                templateUrl: './supervision-continuous-monitoring.component.html',
                styleUrls: ['./supervision-continuous-monitoring.component.scss']
            }]
    }], function () { return [{ type: i1.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision-continuous-monitoring.component.js.map