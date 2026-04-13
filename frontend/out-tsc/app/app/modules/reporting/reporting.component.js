import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class ReportingComponent {
}
ReportingComponent.ɵfac = function ReportingComponent_Factory(t) { return new (t || ReportingComponent)(); };
ReportingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportingComponent, selectors: [["app-reporting"]], decls: 2, vars: 0, consts: [[1, "reporting-shell"]], template: function ReportingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "router-outlet");
        i0.ɵɵelementEnd();
    } }, directives: [i1.RouterOutlet], styles: [".reporting-shell[_ngcontent-%COMP%] {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  .reporting-shell[_ngcontent-%COMP%] {\n    display: block;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportingComponent, [{
        type: Component,
        args: [{
                selector: 'app-reporting',
                templateUrl: './reporting.component.html',
                styleUrls: ['./reporting.component.scss']
            }]
    }], null, null); })();
//# sourceMappingURL=reporting.component.js.map