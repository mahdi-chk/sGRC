import { Component } from '@angular/core';
import { SupervisionService } from './supervision.service';
import * as i0 from "@angular/core";
import * as i1 from "./supervision.service";
import * as i2 from "@angular/common";
function SupervisionAssistanceComponent_article_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 7);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵelementStart(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 10);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 10);
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "Action :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const channel_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(channel_r3.responseTime);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(channel_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(channel_r3.scope);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", channel_r3.actionLabel, "");
} }
function SupervisionAssistanceComponent_article_17_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const faq_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(faq_r4.answer);
} }
function SupervisionAssistanceComponent_article_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 11);
    i0.ɵɵelementStart(1, "div", 12);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 13);
    i0.ɵɵlistener("click", function SupervisionAssistanceComponent_article_17_Template_button_click_4_listener() { const restoredCtx = i0.ɵɵrestoreView(_r8); const faq_r4 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.toggleFaq(faq_r4.id); });
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, SupervisionAssistanceComponent_article_17_p_6_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const faq_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(faq_r4.question);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.openedFaqId === faq_r4.id ? "Masquer" : "Afficher", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.openedFaqId === faq_r4.id);
} }
function SupervisionAssistanceComponent_article_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 7);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵelementStart(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 15);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 10);
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "Resultat :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const playbook_r9 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(playbook_r9.duration);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(playbook_r9.linkedModule);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(playbook_r9.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", playbook_r9.outcome, "");
} }
export class SupervisionAssistanceComponent {
    constructor(supervisionService) {
        this.supervisionService = supervisionService;
        this.channels = [];
        this.faqs = [];
        this.playbooks = [];
        this.openedFaqId = null;
    }
    ngOnInit() {
        this.supervisionService.getOverview().subscribe(overview => {
            this.channels = overview.modules.assistance.channels;
            this.faqs = overview.modules.assistance.faqs;
            this.playbooks = overview.modules.assistance.playbooks;
            this.openedFaqId = this.faqs.length > 0 ? this.faqs[0].id : null;
        });
    }
    toggleFaq(id) {
        this.openedFaqId = this.openedFaqId === id ? null : id;
    }
}
SupervisionAssistanceComponent.ɵfac = function SupervisionAssistanceComponent_Factory(t) { return new (t || SupervisionAssistanceComponent)(i0.ɵɵdirectiveInject(i1.SupervisionService)); };
SupervisionAssistanceComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupervisionAssistanceComponent, selectors: [["app-supervision-assistance"]], decls: 26, vars: 3, consts: [[1, "section-header"], [1, "section-note"], [1, "card-grid"], ["class", "data-card", 4, "ngFor", "ngForOf"], [1, "section-header", 2, "margin-top", "24px"], [1, "list-stack"], ["class", "list-item", 4, "ngFor", "ngForOf"], [1, "data-card"], [1, "meta-line"], [1, "pill"], [1, "muted"], [1, "list-item"], [1, "item-topline"], ["type", "button", 1, "pill", 3, "click"], ["class", "muted", 4, "ngIf"], [1, "pill", "tone-good"]], template: function SupervisionAssistanceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵtext(3, "Assistance Experte");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p");
        i0.ɵɵtext(5, " Orientez rapidement les utilisateurs vers le bon canal de support, les questions frequentes et les playbooks de remediations les plus utiles. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 1);
        i0.ɵɵtext(7, " Utilisez ce volet pour accompagner l adoption et reduire le temps de resolution. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 2);
        i0.ɵɵtemplate(9, SupervisionAssistanceComponent_article_9_Template, 12, 4, "article", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 4);
        i0.ɵɵelementStart(11, "div");
        i0.ɵɵelementStart(12, "h2");
        i0.ɵɵtext(13, "FAQ contextuelle");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "p");
        i0.ɵɵtext(15, "Reponses rapides aux questions les plus frequentes sur la lecture du cockpit et les priorites.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 5);
        i0.ɵɵtemplate(17, SupervisionAssistanceComponent_article_17_Template, 7, 3, "article", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div", 4);
        i0.ɵɵelementStart(19, "div");
        i0.ɵɵelementStart(20, "h2");
        i0.ɵɵtext(21, "Playbooks");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "p");
        i0.ɵɵtext(23, "Parcours courts pour lancer une revue, debloquer un sujet ou realigner les acteurs.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 2);
        i0.ɵɵtemplate(25, SupervisionAssistanceComponent_article_25_Template, 12, 4, "article", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngForOf", ctx.channels);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.faqs);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.playbooks);
    } }, directives: [i2.NgForOf, i2.NgIf], styles: ["@import './supervision-shared';\n\nbutton.pill[_ngcontent-%COMP%] {\n  border: none;\n  cursor: pointer;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionAssistanceComponent, [{
        type: Component,
        args: [{
                selector: 'app-supervision-assistance',
                templateUrl: './supervision-assistance.component.html',
                styleUrls: ['./supervision-assistance.component.scss']
            }]
    }], function () { return [{ type: i1.SupervisionService }]; }, null); })();
//# sourceMappingURL=supervision-assistance.component.js.map