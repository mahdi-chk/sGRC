import { Component } from '@angular/core';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "./supervision.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
const _c0 = function (a0, a1, a2) { return { "tone-critical": a0, "tone-high": a1, "tone-good": a2 }; };
function SupervisionRecommendationsComponent_div_18_article_1_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementStart(7, "p", 15);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 16);
    i0.ɵɵelementStart(10, "span", 17);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 17);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 17);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 15);
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18, "Impact attendu :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 15);
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22, "Route cible :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const recommendation_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(recommendation_r4.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(11, _c0, recommendation_r4.priority === "critique", recommendation_r4.priority === "haute", recommendation_r4.priority === "moyenne"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 9, recommendation_r4.priority));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(recommendation_r4.rationale);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(recommendation_r4.sourceModule);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(recommendation_r4.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(recommendation_r4.status);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", recommendation_r4.expectedImpact, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", recommendation_r4.route, "");
} }
function SupervisionRecommendationsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtemplate(1, SupervisionRecommendationsComponent_div_18_article_1_Template, 24, 15, "article", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredRecommendations);
} }
function SupervisionRecommendationsComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "Aucune recommandation n est disponible pour ce filtre.");
    i0.ɵɵelementEnd();
} }
export class SupervisionRecommendationsComponent {
    constructor(supervisionService) {
        this.supervisionService = supervisionService;
        this.recommendations = [];
        this.priorityFilter = 'all';
    }
    ngOnInit() {
        this.supervisionService.getOverview().subscribe(overview => {
            this.recommendations = overview.modules.recommendations;
        });
    }
    get filteredRecommendations() {
        if (this.priorityFilter === 'all') {
            return this.recommendations;
        }
        return this.recommendations.filter(item => item.priority === this.priorityFilter);
    }
}
SupervisionRecommendationsComponent.ɵfac = function SupervisionRecommendationsComponent_Factory(t) { return new (t || SupervisionRecommendationsComponent)(i0.ɵɵdirectiveInject(i1.SupervisionService)); };
SupervisionRecommendationsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionRecommendationsComponent, selectors: [["app-supervision-recommendations"]], decls: 21, vars: 3, consts: [[1, "section-header"], [1, "section-note"], [1, "toolbar"], [3, "ngModel", "ngModelChange"], ["value", "all"], ["value", "critique"], ["value", "haute"], ["value", "moyenne"], ["class", "list-stack", 4, "ngIf", "ngIfElse"], ["noRecommendations", ""], [1, "list-stack"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "list-item"], [1, "item-topline"], [1, "pill", 3, "ngClass"], [1, "muted"], [1, "meta-line"], [1, "pill"], [1, "empty-copy"]], template: function SupervisionRecommendationsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵtext(3, "Recommandations Contextualisees");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p");
        i0.ɵɵtext(5, " Ces recommandations sont prioritisees a partir des signaux de risque, des retards d execution, des audits ouverts et des ecarts de conformite encore actifs. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 1);
        i0.ɵɵtext(7, " Commencez par les recommandations critiques avec impact transversal sur plusieurs modules. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 2);
        i0.ɵɵelementStart(9, "select", 3);
        i0.ɵɵlistener("ngModelChange", function SupervisionRecommendationsComponent_Template_select_ngModelChange_9_listener($event) { return ctx.priorityFilter = $event; });
        i0.ɵɵelementStart(10, "option", 4);
        i0.ɵɵtext(11, "Toutes les priorites");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "option", 5);
        i0.ɵɵtext(13, "Critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "option", 6);
        i0.ɵɵtext(15, "Hautes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "option", 7);
        i0.ɵɵtext(17, "Moyennes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(18, SupervisionRecommendationsComponent_div_18_Template, 2, 1, "div", 8);
        i0.ɵɵtemplate(19, SupervisionRecommendationsComponent_ng_template_19_Template, 2, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(20);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngModel", ctx.priorityFilter);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngIf", ctx.filteredRecommendations.length > 0)("ngIfElse", _r1);
    } }, directives: [i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i3.NgIf, i3.NgForOf, i3.NgClass], pipes: [i3.TitleCasePipe], styles: ["@import './supervision-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionRecommendationsComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision-recommendations',
                templateUrl: './supervision-recommendations.component.html',
                styleUrls: ['./supervision-recommendations.component.scss']
            }]
    }], function () { return [{ type: i1.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision-recommendations.component.js.map