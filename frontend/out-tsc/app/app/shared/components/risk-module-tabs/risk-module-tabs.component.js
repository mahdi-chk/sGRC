import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
function RiskModuleTabsComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵelement(1, "i", 3);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r0.isActive(tab_r1.route));
    i0.ɵɵproperty("routerLink", tab_r1.route);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", tab_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r1.label);
} }
export class RiskModuleTabsComponent {
    constructor(router) {
        this.router = router;
        this.tabs = [
            { label: 'Registre des Risques', route: '/dashboard/risks', icon: 'fa-exclamation-triangle' },
            { label: 'Evaluation Parametrable', route: '/dashboard/strategic-evaluation', icon: 'fa-sliders-h' },
            { label: 'Cartographie Dynamique', route: '/dashboard/statistics', icon: 'fa-table-cells-large' },
            { label: 'Plans de Traitement', route: '/dashboard/treatment-plans', icon: 'fa-tasks' },
            { label: 'Alertes et Monitoring', route: '/dashboard/alertes-monitoring', icon: 'fa-shield-alt' }
        ];
    }
    isActive(route) {
        return this.router.url.startsWith(route);
    }
}
RiskModuleTabsComponent.ɵfac = function RiskModuleTabsComponent_Factory(t) { return new (t || RiskModuleTabsComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
RiskModuleTabsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskModuleTabsComponent, selectors: [["app-risk-module-tabs"]], decls: 2, vars: 1, consts: [["aria-label", "Navigation des sous-modules risques", 1, "risk-subnav"], ["class", "risk-subnav-tab", 3, "routerLink", "active", 4, "ngFor", "ngForOf"], [1, "risk-subnav-tab", 3, "routerLink"], [1, "fas", 3, "ngClass"]], template: function RiskModuleTabsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "nav", 0);
        i0.ɵɵtemplate(1, RiskModuleTabsComponent_a_1_Template, 4, 5, "a", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.tabs);
    } }, directives: [i2.NgForOf, i1.RouterLinkWithHref, i2.NgClass], styles: [".risk-subnav[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 10px;\r\n  flex-wrap: wrap;\r\n  padding: 10px;\r\n  margin-bottom: 24px;\r\n  border-radius: 18px;\r\n  background: linear-gradient(135deg, rgba(0, 74, 153, 0.08), rgba(59, 130, 246, 0.04));\r\n  border: 1px solid rgba(0, 74, 153, 0.12);\r\n}\r\n\r\n.risk-subnav-tab[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  padding: 12px 18px;\r\n  border-radius: 14px;\r\n  text-decoration: none;\r\n  color: #475569;\r\n  font-weight: 700;\r\n  background: rgba(255, 255, 255, 0.82);\r\n  border: 1px solid transparent;\r\n  transition: all 0.25s ease;\r\n}\r\n\r\n.risk-subnav-tab[_ngcontent-%COMP%]:hover {\r\n  color: #004a99;\r\n  border-color: rgba(0, 74, 153, 0.18);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.risk-subnav-tab.active[_ngcontent-%COMP%] {\r\n  color: white;\r\n  background: linear-gradient(135deg, #004a99, #0066cc);\r\n  box-shadow: 0 10px 24px rgba(0, 74, 153, 0.22);\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .risk-subnav[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .risk-subnav-tab[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskModuleTabsComponent, [{
        type: Component,
        args: [{
                selector: 'app-risk-module-tabs',
                templateUrl: './risk-module-tabs.component.html',
                styleUrls: ['./risk-module-tabs.component.scss']
            }]
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=risk-module-tabs.component.js.map