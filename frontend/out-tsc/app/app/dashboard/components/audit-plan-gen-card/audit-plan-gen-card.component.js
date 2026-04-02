import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AuditPlanGenCardComponent {
    constructor(router) {
        this.router = router;
    }
    onLaunch() {
        this.router.navigate(['/dashboard/auditing'], { queryParams: { action: 'plan' } });
    }
}
AuditPlanGenCardComponent.ɵfac = function AuditPlanGenCardComponent_Factory(t) { return new (t || AuditPlanGenCardComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
AuditPlanGenCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditPlanGenCardComponent, selectors: [["app-audit-plan-gen-card"]], decls: 12, vars: 0, consts: [[1, "action-card", "audit-card"], [1, "card-header"], [1, "card-icon"], [1, "fas", "fa-calendar-alt"], [1, "desc"], [1, "card-footer"], [1, "btn-audit-action", 3, "click"], [1, "fas", "fa-magic"]], template: function AuditPlanGenCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelement(3, "i", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "h3");
        i0.ɵɵtext(5, "Planification Annuelle IA");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "p", 4);
        i0.ɵɵtext(7, "G\u00E9n\u00E9rez automatiquement un plan d'audit annuel bas\u00E9 sur la criticit\u00E9 des risques et les objectifs strat\u00E9giques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 5);
        i0.ɵɵelementStart(9, "button", 6);
        i0.ɵɵlistener("click", function AuditPlanGenCardComponent_Template_button_click_9_listener() { return ctx.onLaunch(); });
        i0.ɵɵtext(10, " Programmer le plan ");
        i0.ɵɵelement(11, "i", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, styles: [".action-card[_ngcontent-%COMP%] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 24px;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n    border: 1px solid rgba(0, 0, 0, 0.05);\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n    transition: transform 0.2s;\r\n}\r\n\r\n.action-card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-4px);\r\n    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.audit-card[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);\r\n    border-left: 5px solid #10b981;\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n}\r\n\r\n.card-icon[_ngcontent-%COMP%] {\r\n    width: 45px;\r\n    height: 45px;\r\n    background: #10b981;\r\n    color: white;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.2rem;\r\n}\r\n\r\nh3[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 1.15rem;\r\n    color: #1e293b;\r\n    font-weight: 700;\r\n}\r\n\r\n.desc[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    line-height: 1.5;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.btn-audit-action[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    background: #10b981;\r\n    color: white;\r\n    border: none;\r\n    padding: 12px;\r\n    border-radius: 10px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 10px;\r\n    transition: background 0.2s;\r\n}\r\n\r\n.btn-audit-action[_ngcontent-%COMP%]:hover {\r\n    background: #059669;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditPlanGenCardComponent, [{
        type: Component,
        args: [{
                selector: 'app-audit-plan-gen-card',
                templateUrl: './audit-plan-gen-card.component.html',
                styleUrls: ['./audit-plan-gen-card.component.scss']
            }]
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=audit-plan-gen-card.component.js.map