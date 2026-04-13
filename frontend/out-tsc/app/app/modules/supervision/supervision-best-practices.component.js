import { Component } from '@angular/core';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "./supervision.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
function SupervisionBestPracticesComponent_div_10_article_1_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r6 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(tag_r6);
} }
const _c0 = function (a0, a1) { return { "tone-critical": a0, "tone-good": a1 }; };
function SupervisionBestPracticesComponent_div_10_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 8);
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 12);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 12);
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12, "Applicabilite :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 12);
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16, "Module rattache :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 13);
    i0.ɵɵtemplate(19, SupervisionBestPracticesComponent_div_10_article_1_span_19_Template, 2, 1, "span", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const practice_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(practice_r4.framework);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0, practice_r4.priority === "haute", practice_r4.priority !== "haute"));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(practice_r4.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(practice_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(practice_r4.summary);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", practice_r4.applicability, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", practice_r4.linkedModule, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", practice_r4.tags);
} }
function SupervisionBestPracticesComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, SupervisionBestPracticesComponent_div_10_article_1_Template, 20, 11, "article", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredPractices);
} }
function SupervisionBestPracticesComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "Aucune bonne pratique ne correspond a votre recherche.");
    i0.ɵɵelementEnd();
} }
export class SupervisionBestPracticesComponent {
    constructor(supervisionService) {
        this.supervisionService = supervisionService;
        this.practices = [];
        this.query = '';
    }
    ngOnInit() {
        this.supervisionService.getOverview().subscribe(overview => {
            this.practices = overview.modules.bestPractices;
        });
    }
    get filteredPractices() {
        const query = this.query.trim().toLowerCase();
        if (!query) {
            return this.practices;
        }
        return this.practices.filter(practice => [
            practice.title,
            practice.framework,
            practice.category,
            practice.summary,
            practice.linkedModule,
            ...(practice.tags || [])
        ].join(' ').toLowerCase().includes(query));
    }
}
SupervisionBestPracticesComponent.ɵfac = function SupervisionBestPracticesComponent_Factory(t) { return new (t || SupervisionBestPracticesComponent)(i0.ɵɵdirectiveInject(i1.SupervisionService)); };
SupervisionBestPracticesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionBestPracticesComponent, selectors: [["app-supervision-best-practices"]], decls: 13, vars: 3, consts: [[1, "section-header"], [1, "section-note"], [1, "toolbar"], ["type", "text", "placeholder", "Rechercher une pratique, un referentiel ou un tag", 3, "ngModel", "ngModelChange"], ["class", "card-grid", 4, "ngIf", "ngIfElse"], ["noPractices", ""], [1, "card-grid"], ["class", "data-card", 4, "ngFor", "ngForOf"], [1, "data-card"], [1, "meta-line"], [1, "pill"], [1, "pill", 3, "ngClass"], [1, "muted"], [1, "tag-list"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "tag"], [1, "empty-copy"]], template: function SupervisionBestPracticesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵtext(3, "Bibliotheque de Bonnes Pratiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p");
        i0.ɵɵtext(5, " Centralisez les cadres ISO, NIST, COBIT et les modeles d execution qui aident les equipes a normaliser les decisions et accelerer les plans de remediations. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 1);
        i0.ɵɵtext(7, " Priorisez d abord les pratiques rattachees aux risques critiques et aux audits en retard. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 2);
        i0.ɵɵelementStart(9, "input", 3);
        i0.ɵɵlistener("ngModelChange", function SupervisionBestPracticesComponent_Template_input_ngModelChange_9_listener($event) { return ctx.query = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, SupervisionBestPracticesComponent_div_10_Template, 2, 1, "div", 4);
        i0.ɵɵtemplate(11, SupervisionBestPracticesComponent_ng_template_11_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(12);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngModel", ctx.query);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredPractices.length > 0)("ngIfElse", _r1);
    } }, directives: [i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, i3.NgIf, i3.NgForOf, i3.NgClass], styles: ["@import './supervision-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionBestPracticesComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision-best-practices',
                templateUrl: './supervision-best-practices.component.html',
                styleUrls: ['./supervision-best-practices.component.scss']
            }]
    }], function () { return [{ type: i1.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision-best-practices.component.js.map