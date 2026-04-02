import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AuditorMissionCardComponent {
    constructor(router) {
        this.router = router;
        this.access = new EventEmitter();
    }
    onAccess() {
        this.router.navigate(['/dashboard/auditor-missions']);
    }
}
AuditorMissionCardComponent.ɵfac = function AuditorMissionCardComponent_Factory(t) { return new (t || AuditorMissionCardComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
AuditorMissionCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditorMissionCardComponent, selectors: [["app-auditor-mission-card"]], outputs: { access: "access" }, decls: 10, vars: 0, consts: [[1, "module-card", "premium", 2, "border-left", "5px solid #10b981", 3, "click"], [1, "card-icon"], [1, "fas", "fa-file-signature"], [1, "desc"], [1, "card-footer"], [1, "btn-primary", 2, "background", "#10b981"]], template: function AuditorMissionCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function AuditorMissionCardComponent_Template_div_click_0_listener() { return ctx.onAccess(); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4, "Traitement des Audits");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 3);
        i0.ɵɵtext(6, "Acc\u00E9dez \u00E0 votre espace de travail pour r\u00E9diger vos rapports et recommandations.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4);
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵtext(9, "Traiter mes audits");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditorMissionCardComponent, [{
        type: Component,
        args: [{
                selector: 'app-auditor-mission-card',
                templateUrl: './auditor-mission-card.component.html',
                styleUrls: []
            }]
    }], function () { return [{ type: i1.Router }]; }, { access: [{
            type: Output
        }] }); })();
//# sourceMappingURL=auditor-mission-card.component.js.map