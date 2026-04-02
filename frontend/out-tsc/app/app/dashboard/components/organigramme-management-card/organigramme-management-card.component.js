import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class OrganigrammeManagementCardComponent {
    constructor() {
        this.openOrganigramme = new EventEmitter();
    }
    onClick() {
        this.openOrganigramme.emit();
    }
}
OrganigrammeManagementCardComponent.ɵfac = function OrganigrammeManagementCardComponent_Factory(t) { return new (t || OrganigrammeManagementCardComponent)(); };
OrganigrammeManagementCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OrganigrammeManagementCardComponent, selectors: [["app-organigramme-management-card"]], outputs: { openOrganigramme: "openOrganigramme" }, decls: 11, vars: 0, consts: [[1, "module-card", "premium", 3, "click"], [1, "card-icon"], [1, "fas", "fa-sitemap"], [1, "desc"], [1, "card-action"], [1, "fas", "fa-arrow-right"]], template: function OrganigrammeManagementCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function OrganigrammeManagementCardComponent_Template_div_click_0_listener() { return ctx.onClick(); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4, "Organigramme");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 3);
        i0.ɵɵtext(6, "G\u00E9rer la structure organisationnelle pour les risques.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4);
        i0.ɵɵelementStart(8, "span");
        i0.ɵɵtext(9, "G\u00E9rer ");
        i0.ɵɵelement(10, "i", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, styles: [".module-card[_ngcontent-%COMP%] {\r\n    &.premium {\r\n        cursor: pointer;\r\n        transition: all 0.3s ease;\r\n\r\n        &:hover {\r\n            transform: translateY(-5px);\r\n            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\r\n        }\r\n    }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrganigrammeManagementCardComponent, [{
        type: Component,
        args: [{
                selector: 'app-organigramme-management-card',
                templateUrl: './organigramme-management-card.component.html',
                styleUrls: ['./organigramme-management-card.component.scss']
            }]
    }], null, { openOrganigramme: [{
            type: Output
        }] }); })();
//# sourceMappingURL=organigramme-management-card.component.js.map