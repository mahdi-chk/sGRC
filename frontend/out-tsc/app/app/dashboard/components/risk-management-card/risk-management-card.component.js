import { Component, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class RiskManagementCardComponent {
    constructor() {
        this.openRiskManagement = new EventEmitter();
    }
    onAccess() {
        this.openRiskManagement.emit();
    }
}
RiskManagementCardComponent.ɵfac = function RiskManagementCardComponent_Factory(t) { return new (t || RiskManagementCardComponent)(); };
RiskManagementCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskManagementCardComponent, selectors: [["app-risk-management-card"]], outputs: { openRiskManagement: "openRiskManagement" }, decls: 10, vars: 0, consts: [[1, "module-card", "premium", 2, "border-left", "5px solid #004a99", 3, "click"], [1, "card-icon"], [1, "fas", "fa-exclamation-triangle"], [1, "desc"], [1, "card-footer"], [1, "btn-primary"]], template: function RiskManagementCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function RiskManagementCardComponent_Template_div_click_0_listener() { return ctx.onAccess(); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4, "Gestion des Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 3);
        i0.ɵɵtext(6, "Identifier, \u00E9valuer et suivre le traitement des risques de l'organisation.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4);
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵtext(9, "Acc\u00E9der");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskManagementCardComponent, [{
        type: Component,
        args: [{
                selector: 'app-risk-management-card',
                templateUrl: './risk-management-card.component.html'
            }]
    }], null, { openRiskManagement: [{
            type: Output
        }] }); })();
//# sourceMappingURL=risk-management-card.component.js.map