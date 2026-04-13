import { Component } from '@angular/core';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "./supervision.service";
import * as i2 from "@angular/common";
function SupervisionBenchmarksComponent_article_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 7);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 8);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 8);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 8);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const indicator_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(indicator_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", indicator_r2.organizationValue, "", indicator_r2.unit, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Benchmark : ", indicator_r2.benchmarkValue, "", indicator_r2.unit, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("Gap : ", indicator_r2.gap > 0 ? "+" : "", "", indicator_r2.gap, "", indicator_r2.unit, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(indicator_r2.interpretation);
} }
function SupervisionBenchmarksComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelementStart(1, "div", 10);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 8);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 11);
    i0.ɵɵelement(7, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 8);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.domain);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r3.organizationScore, " / ", item_r3.benchmarkScore, "");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r3.organizationScore, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Repere secteur : ", item_r3.benchmarkScore, "/100");
} }
export class SupervisionBenchmarksComponent {
    constructor(supervisionService) {
        this.supervisionService = supervisionService;
        this.sector = '';
        this.indicators = [];
        this.maturity = [];
    }
    ngOnInit() {
        this.supervisionService.getOverview().subscribe(overview => {
            this.sector = overview.modules.benchmarks.sector;
            this.indicators = overview.modules.benchmarks.indicators;
            this.maturity = overview.modules.benchmarks.maturity;
        });
    }
}
SupervisionBenchmarksComponent.ɵfac = function SupervisionBenchmarksComponent_Factory(t) { return new (t || SupervisionBenchmarksComponent)(i0.ɵɵdirectiveInject(i1.SupervisionService)); };
SupervisionBenchmarksComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionBenchmarksComponent, selectors: [["app-supervision-benchmarks"]], decls: 18, vars: 3, consts: [[1, "section-header"], [1, "section-note"], [1, "metric-grid"], ["class", "metric-card", 4, "ngFor", "ngForOf"], [1, "section-header", 2, "margin-top", "24px"], [1, "bar-list"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "metric-card"], [1, "muted"], [1, "bar-row"], [1, "item-topline"], [1, "bar-track"], [1, "bar-fill"]], template: function SupervisionBenchmarksComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵtext(3, "Benchmarks Sectoriels");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p");
        i0.ɵɵtext(5, " Comparez la posture actuelle du dispositif sGRC avec des reperes sectoriels afin de calibrer l effort de remediations et les arbitrages de gouvernance. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 1);
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 2);
        i0.ɵɵtemplate(9, SupervisionBenchmarksComponent_article_9_Template, 11, 9, "article", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 4);
        i0.ɵɵelementStart(11, "div");
        i0.ɵɵelementStart(12, "h2");
        i0.ɵɵtext(13, "Maturite relative");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "p");
        i0.ɵɵtext(15, "Vue simplifiee des domaines ou l organisation est en ligne, en retrait ou en avance.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 5);
        i0.ɵɵtemplate(17, SupervisionBenchmarksComponent_div_17_Template, 10, 6, "div", 6);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1(" Referentiel observe : ", ctx.sector, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.indicators);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.maturity);
    } }, directives: [i2.NgForOf], styles: ["@import './supervision-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionBenchmarksComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision-benchmarks',
                templateUrl: './supervision-benchmarks.component.html',
                styleUrls: ['./supervision-benchmarks.component.scss']
            }]
    }], function () { return [{ type: i1.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision-benchmarks.component.js.map