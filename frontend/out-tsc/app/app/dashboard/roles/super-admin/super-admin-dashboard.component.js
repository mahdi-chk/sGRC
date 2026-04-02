import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../core/services/dashboard.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "../../components/user-management-card/user-management-card.component";
import * as i5 from "../../components/organigramme-management-card/organigramme-management-card.component";
import * as i6 from "../../components/rag-config/rag-config.component";
import * as i7 from "@angular/common";
function SuperAdminDashboardComponent_div_15_div_5_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 19);
    i0.ɵɵlistener("click", function SuperAdminDashboardComponent_div_15_div_5_li_8_Template_li_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const s_r4 = restoredCtx.$implicit; const m_r2 = i0.ɵɵnextContext().$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.onOpenModule(m_r2, s_r4); });
    i0.ɵɵelement(1, "i", 20);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r4.title, " ");
} }
function SuperAdminDashboardComponent_div_15_div_5_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵtemplate(8, SuperAdminDashboardComponent_div_15_div_5_li_8_Template, 3, 1, "li", 18);
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
function SuperAdminDashboardComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelementStart(1, "h3", 4);
    i0.ɵɵelement(2, "i", 11);
    i0.ɵɵtext(3, " Tous les Modules");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵtemplate(5, SuperAdminDashboardComponent_div_15_div_5_Template, 9, 3, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r0.visibleModules);
} }
export class SuperAdminDashboardComponent {
    constructor(router, dashboardService, authService) {
        this.router = router;
        this.dashboardService = dashboardService;
        this.authService = authService;
        this.title = 'Dashboard Super Admin';
        this.description = 'Accès complet à toutes les fonctionnalités et modules de la plateforme.';
        this.filteredModules = [];
        this.openModule = new EventEmitter();
        this.openUserManagement = new EventEmitter();
        this.toggleAssistant = new EventEmitter();
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && (user === null || user === void 0 ? void 0 : user.role)) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }
    get visibleModules() {
        return this.filteredModules.filter(module => module.key !== 'audit-auditeur');
    }
    onOpenOrganigramme() {
        this.router.navigate(['/dashboard/organigramme']);
    }
    onOpenModule(m, s) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }
    onOpenUserManagement() {
        this.router.navigate(['/dashboard/users']);
        this.openUserManagement.emit();
    }
    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
SuperAdminDashboardComponent.ɵfac = function SuperAdminDashboardComponent_Factory(t) { return new (t || SuperAdminDashboardComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.DashboardService), i0.ɵɵdirectiveInject(i3.AuthService)); };
SuperAdminDashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SuperAdminDashboardComponent, selectors: [["app-super-admin-dashboard"]], inputs: { title: "title", description: "description", filteredModules: "filteredModules" }, outputs: { openModule: "openModule", openUserManagement: "openUserManagement", toggleAssistant: "toggleAssistant" }, decls: 16, vars: 3, consts: [[1, "role-dashboard", "super-admin"], [1, "welcome-banner"], [1, "fas", "fa-user-crown"], [1, "admin-tools-section"], [1, "section-subtitle"], [1, "fas", "fa-shield-alt"], [1, "dashboard-grid"], [3, "openUserManagement"], [3, "openOrganigramme"], ["class", "functional-modules-section", 4, "ngIf"], [1, "functional-modules-section"], [1, "fas", "fa-layer-group"], ["class", "module-card premium", 4, "ngFor", "ngForOf"], [1, "module-card", "premium"], [1, "card-icon"], [1, "fas", "fa-cog"], [1, "desc"], [1, "submodules-list"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "fas", "fa-chevron-right"]], template: function SuperAdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtext(10, " Administration Globale");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "app-user-management-card", 7);
        i0.ɵɵlistener("openUserManagement", function SuperAdminDashboardComponent_Template_app_user_management_card_openUserManagement_12_listener() { return ctx.onOpenUserManagement(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "app-organigramme-management-card", 8);
        i0.ɵɵlistener("openOrganigramme", function SuperAdminDashboardComponent_Template_app_organigramme_management_card_openOrganigramme_13_listener() { return ctx.onOpenOrganigramme(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(14, "app-rag-config");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, SuperAdminDashboardComponent_div_15_Template, 6, 1, "div", 9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.title, "");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.description);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngIf", ctx.visibleModules.length > 0);
    } }, directives: [i4.UserManagementCardComponent, i5.OrganigrammeManagementCardComponent, i6.RagConfigComponent, i7.NgIf, i7.NgForOf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SuperAdminDashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-super-admin-dashboard',
                templateUrl: './super-admin-dashboard.component.html'
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.DashboardService }, { type: i3.AuthService }]; }, { title: [{
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
//# sourceMappingURL=super-admin-dashboard.component.js.map