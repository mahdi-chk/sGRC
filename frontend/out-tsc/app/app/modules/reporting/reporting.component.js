import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
function ReportingComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵelement(1, "i", 4);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", tab_r1.route);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", tab_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r1.label);
} }
export class ReportingComponent {
    constructor() {
        this.tabs = [
            { label: 'Vue Detaillee', route: '/dashboard/reporting/dashboard', icon: 'fa-chart-line' },
            { label: 'KPI', route: '/dashboard/reporting/kpis', icon: 'fa-gauge-high' },
            { label: 'Matrice de Risque', route: '/dashboard/reporting/risk-matrix', icon: 'fa-table-cells-large' },
            { label: 'Vision Multi-Entites', route: '/dashboard/reporting/multi-entity', icon: 'fa-building' },
            { label: 'Exports', route: '/dashboard/reporting/exports', icon: 'fa-file-export' },
        ];
    }
}
ReportingComponent.ɵfac = function ReportingComponent_Factory(t) { return new (t || ReportingComponent)(); };
ReportingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportingComponent, selectors: [["app-reporting"]], decls: 4, vars: 1, consts: [[1, "reporting-shell"], [1, "reporting-tabs"], ["routerLinkActive", "active", "class", "reporting-tab", 3, "routerLink", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "reporting-tab", 3, "routerLink"], [1, "fas", 3, "ngClass"]], template: function ReportingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "nav", 1);
        i0.ɵɵtemplate(2, ReportingComponent_a_2_Template, 4, 3, "a", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(3, "router-outlet");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.tabs);
    } }, directives: [i1.NgForOf, i2.RouterOutlet, i2.RouterLinkWithHref, i2.RouterLinkActive, i1.NgClass], styles: [".reporting-shell[_ngcontent-%COMP%] {\n  --reporting-ink: #17324d;\n  --reporting-muted: #61758a;\n  --reporting-line: rgba(201, 214, 226, 0.92);\n  --reporting-tab-bg: rgba(255, 255, 255, 0.9);\n  padding: 18px 20px 0;\n  background:\n    radial-gradient(circle at top right, rgba(11, 116, 222, 0.08), transparent 26%),\n    linear-gradient(180deg, #f6f9fc 0%, #eef3f8 100%);\n}\n\n.reporting-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 18px;\n  padding: 10px;\n  border: 1px solid var(--reporting-line);\n  border-radius: 18px;\n  background: rgba(236, 243, 250, 0.9);\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);\n}\n\n.reporting-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 11px 16px;\n  border-radius: 14px;\n  text-decoration: none;\n  color: var(--reporting-muted);\n  background: transparent;\n  font-weight: 700;\n  transition: all 0.2s ease;\n}\n\n.reporting-tab[_ngcontent-%COMP%]:hover {\n  color: var(--reporting-ink);\n  background: rgba(255, 255, 255, 0.72);\n}\n\n.reporting-tab.active[_ngcontent-%COMP%] {\n  color: var(--reporting-ink);\n  background: var(--reporting-tab-bg);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);\n}\n\n@media (max-width: 768px) {\n  .reporting-shell[_ngcontent-%COMP%] {\n    padding: 14px 14px 0;\n  }\n\n  .reporting-tabs[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 8px;\n  }\n\n  .reporting-tab[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportingComponent, [{
        type: Component,
        args: [{
                selector: 'app-reporting',
                templateUrl: './reporting.component.html',
                styleUrls: ['./reporting.component.scss']
            }]
    }], null, null); })();
//# sourceMappingURL=reporting.component.js.map