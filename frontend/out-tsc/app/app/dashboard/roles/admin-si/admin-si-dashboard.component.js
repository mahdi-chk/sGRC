import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/dashboard.service";
import * as i4 from "../../components/user-management-card/user-management-card.component";
import * as i5 from "../../components/organigramme-management-card/organigramme-management-card.component";
import * as i6 from "../../components/rag-config/rag-config.component";
import * as i7 from "@angular/common";
function AdminSiDashboardComponent_div_15_div_5_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 21);
    i0.ɵɵlistener("click", function AdminSiDashboardComponent_div_15_div_5_li_8_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const s_r4 = restoredCtx.$implicit; const m_r2 = i0.ɵɵnextContext().$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.onOpenModule(m_r2, s_r4); });
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r4.title, " ");
} }
function AdminSiDashboardComponent_div_15_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelement(2, "i", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 16);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul", 17);
    i0.ɵɵtemplate(8, AdminSiDashboardComponent_div_15_div_5_li_8_Template, 3, 1, "li", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 19);
    i0.ɵɵelementStart(10, "button", 20);
    i0.ɵɵlistener("click", function AdminSiDashboardComponent_div_15_div_5_Template_button_click_10_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const m_r2 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onOpenModule(m_r2, m_r2.submodules[0]); });
    i0.ɵɵtext(11, "Param\u00E8tres");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(m_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r2.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", m_r2.submodules);
} }
function AdminSiDashboardComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelementStart(1, "h3", 4);
    i0.ɵɵelement(2, "i", 11);
    i0.ɵɵtext(3, " Modules Fonctionnels");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵtemplate(5, AdminSiDashboardComponent_div_15_div_5_Template, 12, 3, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredModules);
} }
export class AdminSiDashboardComponent {
    constructor(router, authService, dashboardService) {
        this.router = router;
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.title = 'Dashboard Admin SI';
        this.description = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
        this.filteredModules = [];
        this.openModule = new EventEmitter();
        this.openUserManagement = new EventEmitter();
        this.toggleAssistant = new EventEmitter();
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
    onOpenUserManagement() {
        this.router.navigate(['/dashboard/users']);
        this.openUserManagement.emit();
    }
    onOpenOrganigramme() {
        this.router.navigate(['/dashboard/organigramme']);
    }
    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
AdminSiDashboardComponent.ɵfac = function AdminSiDashboardComponent_Factory(t) { return new (t || AdminSiDashboardComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.DashboardService)); };
AdminSiDashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminSiDashboardComponent, selectors: [["app-admin-si-dashboard"]], inputs: { title: "title", description: "description", filteredModules: "filteredModules" }, outputs: { openModule: "openModule", openUserManagement: "openUserManagement", toggleAssistant: "toggleAssistant" }, decls: 16, vars: 3, consts: [[1, "role-dashboard", "admin-si"], [1, "welcome-banner"], [1, "fas", "fa-user-shield"], [1, "admin-tools-section"], [1, "section-subtitle"], [1, "fas", "fa-tools"], [1, "dashboard-grid"], [3, "openUserManagement"], [3, "openOrganigramme"], ["class", "functional-modules-section", 4, "ngIf"], [1, "functional-modules-section"], [1, "fas", "fa-layer-group"], ["class", "module-card premium", 4, "ngFor", "ngForOf"], [1, "module-card", "premium"], [1, "card-icon"], [1, "fas", "fa-cog"], [1, "desc"], [1, "submodules-list"], [3, "click", 4, "ngFor", "ngForOf"], [1, "card-footer"], [1, "btn-secondary", 3, "click"], [3, "click"], [1, "fas", "fa-chevron-right"]], template: function AdminSiDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "h2");
        i0.ɵɵelement(3, "i", 2);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p");
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 3);
        i0.ɵɵelementStart(8, "h3", 4);
        i0.ɵɵelement(9, "i", 5);
        i0.ɵɵtext(10, " Administration");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "app-user-management-card", 7);
        i0.ɵɵlistener("openUserManagement", function AdminSiDashboardComponent_Template_app_user_management_card_openUserManagement_12_listener() { return ctx.onOpenUserManagement(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "app-organigramme-management-card", 8);
        i0.ɵɵlistener("openOrganigramme", function AdminSiDashboardComponent_Template_app_organigramme_management_card_openOrganigramme_13_listener() { return ctx.onOpenOrganigramme(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(14, "app-rag-config");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, AdminSiDashboardComponent_div_15_Template, 6, 1, "div", 9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.title, "");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.description);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngIf", ctx.filteredModules.length > 0);
    } }, directives: [i4.UserManagementCardComponent, i5.OrganigrammeManagementCardComponent, i6.RagConfigComponent, i7.NgIf, i7.NgForOf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminSiDashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-admin-si-dashboard',
                templateUrl: './admin-si-dashboard.component.html'
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.AuthService }, { type: i3.DashboardService }]; }, { title: [{
            type: Input
        }], description: [{
            type: Input
        }], filteredModules: [{
            type: Input
        }], openModule: [{
            type: Output
        }], openUserManagement: [{
            type: Output
        }], toggleAssistant: [{
            type: Output
        }] }); })();
//# sourceMappingURL=admin-si-dashboard.component.js.map