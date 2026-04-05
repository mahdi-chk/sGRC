import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "../../../core/services/dashboard.service";
import * as i3 from "@angular/common";
function TopManagementDashboardComponent_div_7_div_1_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 13);
    i0.ɵɵlistener("click", function TopManagementDashboardComponent_div_7_div_1_li_8_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const s_r6 = restoredCtx.$implicit; const m_r4 = i0.ɵɵnextContext().$implicit; const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.onOpenModule(m_r4, s_r6); });
    i0.ɵɵelement(1, "i", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r6.title, " ");
} }
function TopManagementDashboardComponent_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul", 11);
    i0.ɵɵtemplate(8, TopManagementDashboardComponent_div_7_div_1_li_8_Template, 3, 1, "li", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r4 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(m_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r4.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", m_r4.submodules);
} }
function TopManagementDashboardComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, TopManagementDashboardComponent_div_7_div_1_Template, 9, 3, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredModules);
} }
function TopManagementDashboardComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun module fonctionnel n'est assigne a votre role.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class TopManagementDashboardComponent {
    constructor(authService, dashboardService) {
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.filteredModules = [];
        this.title = 'Dashboard Top Management';
        this.openModule = new EventEmitter();
    }
    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && (user === null || user === void 0 ? void 0 : user.role)) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }
    onOpenModule(m, s) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }
}
TopManagementDashboardComponent.ɵfac = function TopManagementDashboardComponent_Factory(t) { return new (t || TopManagementDashboardComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.DashboardService)); };
TopManagementDashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TopManagementDashboardComponent, selectors: [["app-top-management-dashboard"]], inputs: { filteredModules: "filteredModules", title: "title" }, outputs: { openModule: "openModule" }, decls: 10, vars: 3, consts: [[1, "role-dashboard", "top-management"], [1, "welcome-banner"], [1, "fas", "fa-chart-line"], ["class", "dashboard-grid", 4, "ngIf", "ngIfElse"], ["noModules", ""], [1, "dashboard-grid"], ["class", "module-card premium", 4, "ngFor", "ngForOf"], [1, "module-card", "premium"], [1, "card-icon"], [1, "fas", "fa-eye"], [1, "desc"], [1, "submodules-list"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "fas", "fa-chevron-right"], [1, "empty-state"], [1, "fas", "fa-folder-open"]], template: function TopManagementDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵelement(3, "i", 2);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p");
        i0.ɵɵtext(6, "Vision strategique, indicateurs cles et aide a la decision.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, TopManagementDashboardComponent_div_7_Template, 2, 1, "div", 3);
        i0.ɵɵtemplate(8, TopManagementDashboardComponent_ng_template_8_Template, 4, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(9);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.title, "");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.filteredModules.length > 0)("ngIfElse", _r1);
    } }, directives: [i3.NgIf, i3.NgForOf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TopManagementDashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-top-management-dashboard',
                templateUrl: './top-management-dashboard.component.html'
            }]
    }], function () { return [{ type: i1.AuthService }, { type: i2.DashboardService }]; }, { filteredModules: [{
            type: Input
        }], title: [{
            type: Input
        }], openModule: [{
            type: Output
        }] }); })();
//# sourceMappingURL=top-management-dashboard.component.js.map