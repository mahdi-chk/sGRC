import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { UserRole } from '../core/models/user-role.enum';
import { Router } from '@angular/router';
import { DashboardService } from '../core/services/dashboard.service';
import * as i0 from "@angular/core";
import * as i1 from "../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../core/services/dashboard.service";
import * as i4 from "@angular/common";
import * as i5 from "./roles/risk-manager/risk-manager-dashboard.component";
import * as i6 from "./roles/risk-agent/risk-agent-dashboard.component";
import * as i7 from "./roles/audit-senior/audit-senior-dashboard.component";
import * as i8 from "./roles/auditeur/auditeur-dashboard.component";
import * as i9 from "./roles/admin-si/admin-si-dashboard.component";
import * as i10 from "./roles/super-admin/super-admin-dashboard.component";
import * as i11 from "./roles/top-management/top-management-dashboard.component";
function DashboardHomeComponent_app_risk_manager_dashboard_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-risk-manager-dashboard", 9);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_risk_manager_dashboard_1_Template_app_risk_manager_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.onOpenModule($event); })("openRiskManagement", function DashboardHomeComponent_app_risk_manager_dashboard_1_Template_app_risk_manager_dashboard_openRiskManagement_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.showRiskManagementView(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r0.filteredModules);
} }
function DashboardHomeComponent_app_risk_agent_dashboard_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-risk-agent-dashboard", 10);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_risk_agent_dashboard_2_Template_app_risk_agent_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.onOpenModule($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r1.filteredModules);
} }
function DashboardHomeComponent_app_audit_senior_dashboard_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-audit-senior-dashboard", 11);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_audit_senior_dashboard_3_Template_app_audit_senior_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.onOpenModule($event); })("toggleAssistant", function DashboardHomeComponent_app_audit_senior_dashboard_3_Template_app_audit_senior_dashboard_toggleAssistant_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.onToggleAiAssistant(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r2.filteredModules);
} }
function DashboardHomeComponent_app_auditeur_dashboard_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-auditeur-dashboard", 12);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_auditeur_dashboard_4_Template_app_auditeur_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.onOpenModule($event); })("toggleAssistant", function DashboardHomeComponent_app_auditeur_dashboard_4_Template_app_auditeur_dashboard_toggleAssistant_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.onToggleAiAssistant(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r3.filteredModules);
} }
function DashboardHomeComponent_app_admin_si_dashboard_5_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-admin-si-dashboard", 13);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_admin_si_dashboard_5_Template_app_admin_si_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onOpenModule($event); })("openUserManagement", function DashboardHomeComponent_app_admin_si_dashboard_5_Template_app_admin_si_dashboard_openUserManagement_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.showUserManagementView(); })("toggleAssistant", function DashboardHomeComponent_app_admin_si_dashboard_5_Template_app_admin_si_dashboard_toggleAssistant_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.onToggleAiAssistant(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r4.filteredModules);
} }
function DashboardHomeComponent_app_super_admin_dashboard_6_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-super-admin-dashboard", 14);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_super_admin_dashboard_6_Template_app_super_admin_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(); return ctx_r23.onOpenModule($event); })("openUserManagement", function DashboardHomeComponent_app_super_admin_dashboard_6_Template_app_super_admin_dashboard_openUserManagement_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.showUserManagementView(); })("toggleAssistant", function DashboardHomeComponent_app_super_admin_dashboard_6_Template_app_super_admin_dashboard_toggleAssistant_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r26 = i0.ɵɵnextContext(); return ctx_r26.onToggleAiAssistant(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r5.filteredModules);
} }
function DashboardHomeComponent_app_top_management_dashboard_7_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-top-management-dashboard", 15);
    i0.ɵɵlistener("openModule", function DashboardHomeComponent_app_top_management_dashboard_7_Template_app_top_management_dashboard_openModule_0_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r27 = i0.ɵɵnextContext(); return ctx_r27.onOpenModule($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("filteredModules", ctx_r6.filteredModules);
} }
function DashboardHomeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Chargement de votre espace personnalis\u00E9...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class DashboardHomeComponent {
    constructor(authService, router, dashboardService) {
        this.authService = authService;
        this.router = router;
        this.dashboardService = dashboardService;
        this.modules = [];
        this.currentUserRole = null;
        this.UserRole = UserRole;
        this.modules = this.dashboardService.getModules();
    }
    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUserRole = user === null || user === void 0 ? void 0 : user.role;
            if (this.currentUserRole) {
                this.redirectByRole(this.currentUserRole);
            }
        });
    }
    redirectByRole(role) {
        let targetPath = '';
        switch (role) {
            case UserRole.SUPER_ADMIN:
                targetPath = 'super-admin';
                break;
            case UserRole.ADMIN_SI:
                targetPath = 'admin-si';
                break;
            case UserRole.AUDITEUR:
                targetPath = 'auditeur';
                break;
            case UserRole.AUDIT_SENIOR:
                targetPath = 'audit-senior';
                break;
            case UserRole.RISK_MANAGER:
                targetPath = 'risk-manager';
                break;
            case UserRole.RISK_AGENT:
                targetPath = 'risk-agent';
                break;
            case UserRole.TOP_MANAGEMENT:
                targetPath = 'top-management';
                break;
        }
        if (targetPath && this.router.url === '/dashboard') {
            this.router.navigate(['/dashboard', targetPath]);
        }
    }
    get filteredModules() {
        return this.dashboardService.getFilteredModules(this.currentUserRole);
    }
    onOpenModule(event) {
        this.dashboardService.openSubmoduleModal(event.m, event.s);
    }
    showUserManagementView() {
        this.router.navigate(['/dashboard/users']);
    }
    showRiskManagementView() {
        this.router.navigate(['/dashboard/risks']);
    }
    onToggleAiAssistant() {
        this.dashboardService.toggleAiAssistant();
    }
}
DashboardHomeComponent.ɵfac = function DashboardHomeComponent_Factory(t) { return new (t || DashboardHomeComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.DashboardService)); };
DashboardHomeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardHomeComponent, selectors: [["app-dashboard-home"]], decls: 9, vars: 8, consts: [[1, "grid", 2, "margin-top", "20px", 3, "ngSwitch"], ["title", "Dashboard Risk Manager", 3, "filteredModules", "openModule", "openRiskManagement", 4, "ngSwitchCase"], ["title", "Dashboard Risk Agent", 3, "filteredModules", "openModule", 4, "ngSwitchCase"], ["title", "Dashboard Audit Senior", 3, "filteredModules", "openModule", "toggleAssistant", 4, "ngSwitchCase"], ["title", "Dashboard Auditeur", 3, "filteredModules", "openModule", "toggleAssistant", 4, "ngSwitchCase"], ["description", "G\u00E9rez les acc\u00E8s, supervisez la plateforme et assistez les utilisateurs.", 3, "filteredModules", "openModule", "openUserManagement", "toggleAssistant", 4, "ngSwitchCase"], ["title", "Dashboard Super Admin", "description", "Acc\u00E8s complet \u00E0 toutes les fonctionnalit\u00E9s et modules de la plateforme.", 3, "filteredModules", "openModule", "openUserManagement", "toggleAssistant", 4, "ngSwitchCase"], [3, "filteredModules", "openModule", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["title", "Dashboard Risk Manager", 3, "filteredModules", "openModule", "openRiskManagement"], ["title", "Dashboard Risk Agent", 3, "filteredModules", "openModule"], ["title", "Dashboard Audit Senior", 3, "filteredModules", "openModule", "toggleAssistant"], ["title", "Dashboard Auditeur", 3, "filteredModules", "openModule", "toggleAssistant"], ["description", "G\u00E9rez les acc\u00E8s, supervisez la plateforme et assistez les utilisateurs.", 3, "filteredModules", "openModule", "openUserManagement", "toggleAssistant"], ["title", "Dashboard Super Admin", "description", "Acc\u00E8s complet \u00E0 toutes les fonctionnalit\u00E9s et modules de la plateforme.", 3, "filteredModules", "openModule", "openUserManagement", "toggleAssistant"], [3, "filteredModules", "openModule"]], template: function DashboardHomeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, DashboardHomeComponent_app_risk_manager_dashboard_1_Template, 1, 1, "app-risk-manager-dashboard", 1);
        i0.ɵɵtemplate(2, DashboardHomeComponent_app_risk_agent_dashboard_2_Template, 1, 1, "app-risk-agent-dashboard", 2);
        i0.ɵɵtemplate(3, DashboardHomeComponent_app_audit_senior_dashboard_3_Template, 1, 1, "app-audit-senior-dashboard", 3);
        i0.ɵɵtemplate(4, DashboardHomeComponent_app_auditeur_dashboard_4_Template, 1, 1, "app-auditeur-dashboard", 4);
        i0.ɵɵtemplate(5, DashboardHomeComponent_app_admin_si_dashboard_5_Template, 1, 1, "app-admin-si-dashboard", 5);
        i0.ɵɵtemplate(6, DashboardHomeComponent_app_super_admin_dashboard_6_Template, 1, 1, "app-super-admin-dashboard", 6);
        i0.ɵɵtemplate(7, DashboardHomeComponent_app_top_management_dashboard_7_Template, 1, 1, "app-top-management-dashboard", 7);
        i0.ɵɵtemplate(8, DashboardHomeComponent_div_8_Template, 3, 0, "div", 8);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx.currentUserRole);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.RISK_MANAGER);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.RISK_AGENT);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.AUDIT_SENIOR);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.AUDITEUR);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.ADMIN_SI);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.SUPER_ADMIN);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.UserRole.TOP_MANAGEMENT);
    } }, directives: [i4.NgSwitch, i4.NgSwitchCase, i4.NgSwitchDefault, i5.RiskManagerDashboardComponent, i6.RiskAgentDashboardComponent, i7.AuditSeniorDashboardComponent, i8.AuditeurDashboardComponent, i9.AdminSiDashboardComponent, i10.SuperAdminDashboardComponent, i11.TopManagementDashboardComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardHomeComponent, [{
        type: Component,
        args: [{
                selector: 'app-dashboard-home',
                templateUrl: './dashboard-home.component.html'
            }]
    }], function () { return [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.DashboardService }]; }, null); })();
//# sourceMappingURL=dashboard-home.component.js.map