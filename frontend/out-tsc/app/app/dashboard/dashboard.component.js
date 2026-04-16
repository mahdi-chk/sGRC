import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';
import { NotificationService } from '../core/services/notification.service';
import { NotificationType } from '../core/models/notification.model';
import { UserRole } from '../core/models/user-role.enum';
import { RiskService, RiskStatus } from '../core/services/risk.service';
import { CPS_MODULES } from '../shared/data/cps-data';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../core/services/auth.service";
import * as i3 from "../core/services/dashboard.service";
import * as i4 from "../core/services/notification.service";
import * as i5 from "../core/services/risk.service";
import * as i6 from "@angular/router";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "../shared/components/ai-assistant/ai-assistant.component";
import * as i10 from "../shared/modal/modal.component";
const _c0 = ["notifContainer"];
function DashboardComponent_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.unreadCount);
} }
function DashboardComponent_div_19_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function DashboardComponent_div_19_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.markAllAsRead(); });
    i0.ɵɵtext(1, "Marquer tout comme lu");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_div_19_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtext(1, " Aucune notification ");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_div_19_div_7_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 46);
} }
function DashboardComponent_div_19_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵlistener("click", function DashboardComponent_div_19_div_7_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r14); const n_r11 = restoredCtx.$implicit; const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.markAsRead(n_r11); });
    i0.ɵɵelementStart(1, "div", 42);
    i0.ɵɵelement(2, "i", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 44);
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DashboardComponent_div_19_div_7_div_9_Template, 1, 0, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const n_r11 = ctx.$implicit;
    i0.ɵɵclassProp("unread", !n_r11.isRead);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(n_r11.content);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 5, n_r11.createdAt, "short"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !n_r11.isRead);
} }
function DashboardComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelementStart(1, "div", 34);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, DashboardComponent_div_19_button_4_Template, 2, 0, "button", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 36);
    i0.ɵɵtemplate(6, DashboardComponent_div_19_div_6_Template, 2, 0, "div", 37);
    i0.ɵɵtemplate(7, DashboardComponent_div_19_div_7_Template, 10, 8, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r2.unreadCount > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.notifications.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.notifications);
} }
function DashboardComponent_ng_container_44_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", item_r15.route);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r15.label, " ");
} }
function DashboardComponent_ng_container_44_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r15.label);
} }
function DashboardComponent_ng_container_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DashboardComponent_ng_container_44_a_1_Template, 2, 2, "a", 47);
    i0.ɵɵtemplate(2, DashboardComponent_ng_container_44_ng_template_2_Template, 2, 1, "ng-template", null, 48, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r15 = ctx.$implicit;
    const _r17 = i0.ɵɵreference(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r15.route)("ngIfElse", _r17);
} }
function DashboardComponent_app_modal_48_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 51);
    i0.ɵɵlistener("close", function DashboardComponent_app_modal_48_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.closeModal(); });
    i0.ɵɵelement(1, "div", 52);
    i0.ɵɵelementStart(2, "div", 53);
    i0.ɵɵelementStart(3, "button", 39);
    i0.ɵɵlistener("click", function DashboardComponent_app_modal_48_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r23); const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.startCreate(); });
    i0.ɵɵtext(4, "Cr\u00E9er");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "div", 54, 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r4.modalTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r4.modalBody, i0.ɵɵsanitizeHtml);
} }
function DashboardComponent_app_modal_49_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-modal", 51);
    i0.ɵɵlistener("close", function DashboardComponent_app_modal_49_Template_app_modal_close_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r26 = i0.ɵɵnextContext(); return ctx_r26.closeModal(); });
    i0.ɵɵelementStart(1, "div", 56);
    i0.ɵɵelementStart(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 57);
    i0.ɵɵelementStart(5, "label");
    i0.ɵɵtext(6, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 58);
    i0.ɵɵlistener("ngModelChange", function DashboardComponent_app_modal_49_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r28 = i0.ɵɵnextContext(); return ctx_r28.form.name = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 57);
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "textarea", 59);
    i0.ɵɵlistener("ngModelChange", function DashboardComponent_app_modal_49_Template_textarea_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r29 = i0.ɵɵnextContext(); return ctx_r29.form.description = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 57);
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Configuration (JSON)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "textarea", 60);
    i0.ɵɵlistener("ngModelChange", function DashboardComponent_app_modal_49_Template_textarea_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.form.config = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 53);
    i0.ɵɵelementStart(17, "button", 39);
    i0.ɵɵlistener("click", function DashboardComponent_app_modal_49_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r27); const ctx_r31 = i0.ɵɵnextContext(); return ctx_r31.submitForm(); });
    i0.ɵɵtext(18, "Cr\u00E9er");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 39);
    i0.ɵɵlistener("click", function DashboardComponent_app_modal_49_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r27); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.closeModal(); });
    i0.ɵɵtext(20, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "div", 54, 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r5.modalTitle);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Cr\u00E9er une configuration \u2014 ", ctx_r5.currentSubmoduleTitle, "");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r5.form.name);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r5.form.description);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r5.form.config);
} }
export class DashboardComponent {
    constructor(http, authService, dashboardService, notificationService, riskService, router) {
        this.http = http;
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.notificationService = notificationService;
        this.riskService = riskService;
        this.router = router;
        this.expanded = new Set();
        this.status = null;
        // Modal state
        this.modalVisible = false;
        this.modalTitle = '';
        this.modalBody = '';
        this.creating = false;
        this.currentModuleKey = '';
        this.currentSubmoduleTitle = '';
        this.currentUserRole = null;
        this.currentUserName = '';
        this.dashboardTitle = '';
        this.dashboardDesc = '';
        this.UserRole = UserRole; // Make enum available to template
        this.subNavItems = [
            {
                label: 'Organisation',
                route: '/dashboard/organigramme',
                roles: [UserRole.ADMIN_SI, UserRole.SUPER_ADMIN]
            },
            { label: 'Ressource', route: '/dashboard/resources' },
            {
                label: 'Risque',
                route: '/dashboard/risks',
                roles: [
                    UserRole.SUPER_ADMIN,
                    UserRole.RISK_MANAGER,
                    UserRole.RISK_AGENT,
                    UserRole.AUDIT_SENIOR,
                    UserRole.TOP_MANAGEMENT
                ]
            },
            {
                label: 'Incident',
                route: '/dashboard/incidents',
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
            },
            {
                label: 'Controle',
                route: '/dashboard/controls-referential',
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.RISK_AGENT, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
            },
            {
                label: 'Conformite',
                route: '/dashboard/compliance',
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR, UserRole.TOP_MANAGEMENT]
            },
            {
                label: 'Action',
                route: '/dashboard/actions',
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.RISK_AGENT, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
            }
        ];
        this.form = { name: '', description: '', config: '{}' };
        this.risks = [];
        this.allNotifications = [];
        this.notifications = [];
        this.unreadCount = 0;
        this.showNotifDropdown = false;
        this.authService.currentUser$.subscribe(user => {
            this.currentUserRole = user === null || user === void 0 ? void 0 : user.role;
            this.currentUserName = (user === null || user === void 0 ? void 0 : user.prenom) && (user === null || user === void 0 ? void 0 : user.nom) ? `${user.prenom} ${user.nom}` : 'Utilisateur';
            this.setDashboardInfo();
            if (user && this.canLoadRiskData(user.role)) {
                this.loadRisks();
            }
            else {
                this.risks = [];
                this.notifications = this.getVisibleNotifications(this.allNotifications);
                this.unreadCount = this.notifications.filter(n => !n.isRead).length;
            }
        });
        this.dashboardService.openModal$.subscribe(data => {
            this.openSubmoduleModal(data.m, data.s);
        });
        this.notificationService.notifications$.subscribe(notifs => {
            this.allNotifications = notifs;
            this.notifications = this.getVisibleNotifications(notifs);
            this.unreadCount = this.notifications.filter(n => !n.isRead).length;
        });
    }
    toggleNotifDropdown() {
        this.showNotifDropdown = !this.showNotifDropdown;
    }
    onDocumentClick(event) {
        if (!this.showNotifDropdown || !this.notifContainer) {
            return;
        }
        const target = event.target;
        if (target && !this.notifContainer.nativeElement.contains(target)) {
            this.showNotifDropdown = false;
        }
    }
    markAsRead(n) {
        if (!n.isRead) {
            this.notificationService.markAsRead(n.id).subscribe();
        }
    }
    markAllAsRead() {
        const visibleUnreadIds = this.notifications
            .filter(n => !n.isRead)
            .map(n => n.id);
        if (visibleUnreadIds.length === 0) {
            return;
        }
        if (this.currentUserRole === UserRole.RISK_AGENT) {
            this.notificationService.markManyAsRead(visibleUnreadIds).subscribe();
            return;
        }
        this.notificationService.markAllAsRead().subscribe();
    }
    getVisibleNotifications(notifs) {
        const filteredNotifications = notifs.filter(n => this.isNotificationVisibleForRisk(n));
        if (this.currentUserRole === UserRole.RISK_AGENT) {
            return filteredNotifications.filter(n => {
                const notificationType = this.getNotificationType(n);
                return notificationType === NotificationType.RISK_ASSIGNED ||
                    notificationType === NotificationType.STATUS_CHANGED ||
                    notificationType === NotificationType.COMMENT_ADDED ||
                    notificationType === NotificationType.REMINDER;
            });
        }
        return filteredNotifications;
    }
    loadRisks() {
        this.riskService.getRisks().subscribe({
            next: risks => {
                this.risks = risks;
                this.notifications = this.getVisibleNotifications(this.allNotifications);
                this.unreadCount = this.notifications.filter(n => !n.isRead).length;
            },
            error: () => {
                this.risks = [];
                this.notifications = this.getVisibleNotifications(this.allNotifications);
                this.unreadCount = this.notifications.filter(n => !n.isRead).length;
            }
        });
    }
    canLoadRiskData(role) {
        return role === UserRole.SUPER_ADMIN ||
            role === UserRole.RISK_MANAGER ||
            role === UserRole.RISK_AGENT ||
            role === UserRole.AUDIT_SENIOR ||
            role === UserRole.TOP_MANAGEMENT;
    }
    isNotificationVisibleForRisk(notification) {
        if (!notification.riskId) {
            return true;
        }
        const risk = this.risks.find(item => item.id === notification.riskId);
        if (!risk) {
            return true;
        }
        return !this.isCompletedRiskStatus(risk.statutCode || risk.statut);
    }
    isCompletedRiskStatus(status) {
        const normalizedStatus = this.normalizeRiskStatus(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }
    normalizeRiskStatus(status) {
        return (status || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    getNotificationType(notification) {
        return (notification.typeCode || notification.type || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    get visibleSubNavItems() {
        return this.subNavItems.filter(item => this.canAccess(item.roles));
    }
    canAccess(roles) {
        if (!roles || roles.length === 0) {
            return true;
        }
        return !!this.currentUserRole && roles.includes(this.currentUserRole);
    }
    setDashboardInfo() {
        switch (this.currentUserRole) {
            case UserRole.ADMIN_SI:
                this.dashboardTitle = 'Dashboard Admin SI';
                this.dashboardDesc = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
                break;
            case UserRole.SUPER_ADMIN:
                this.dashboardTitle = 'Dashboard Super Admin';
                this.dashboardDesc = 'Accès complet à toutes les fonctionnalités et modules de la plateforme.';
                break;
            case UserRole.RISK_MANAGER:
                this.dashboardTitle = 'Dashboard Risk Manager';
                this.dashboardDesc = 'Gérez les risques, évaluez les impacts et suivez les plans de traitement.';
                break;
            case UserRole.RISK_AGENT:
                this.dashboardTitle = 'Dashboard Risk Agent';
                this.dashboardDesc = 'Gérez les risques, évaluez les impacts et suivez les plans de traitement.';
                break;
            case UserRole.AUDIT_SENIOR:
                this.dashboardTitle = 'Dashboard Audit Senior';
                this.dashboardDesc = 'Planifiez les missions, supervisez les audits et validez les recommandations.';
                break;
            case UserRole.AUDITEUR:
                this.dashboardTitle = 'Dashboard Auditeur';
                this.dashboardDesc = 'Planifiez les missions, supervisez les audits et validez les recommandations.';
                break;
            case UserRole.TOP_MANAGEMENT:
                this.dashboardTitle = 'Dashboard Top Management';
                this.dashboardDesc = 'Vision stratégique, indicateurs clés et aide à la décision.';
                break;
            default:
                this.dashboardTitle = 'Dashboard';
                this.dashboardDesc = 'Bienvenue sur votre plateforme GRC.';
        }
    }
    toggleAiAssistant() {
        this.dashboardService.toggleAiAssistant();
    }
    logout() {
        this.authService.logout();
    }
    resetToHome() {
        this.modalVisible = false;
        this.creating = false;
    }
    toggleModule(key) {
        if (this.expanded.has(key))
            this.expanded.delete(key);
        else
            this.expanded.add(key);
    }
    isExpanded(key) {
        return this.expanded.has(key);
    }
    checkBackend() {
        this.status = 'Checking...';
        this.http.get(`${environment.apiUrl}/governance`).subscribe(() => this.status = 'Backend reachable (GET /api/governance)', (err) => this.status = 'Backend unreachable: ' + (err.status || err.message));
    }
    openSubmoduleModal(m, s) {
        this.modalTitle = `${m.title} — ${s.title}`;
        this.currentModuleKey = m.key;
        this.currentSubmoduleTitle = s.title;
        // Fetch CPS data for this specific submodule
        const cpsModule = CPS_MODULES[this.currentModuleKey];
        const cpsSubmodule = this.resolveCpsSubmodule(cpsModule, m, s);
        if (cpsSubmodule) {
            const featuresHtml = cpsSubmodule.features.map(f => `<li>${f}</li>`).join('');
            const requirementsHtml = cpsSubmodule.requirements.map(r => `<li>${r}</li>`).join('');
            const objectivesHtml = cpsSubmodule.objectives.map(o => `<li>${o}</li>`).join('');
            const integrationsHtml = cpsSubmodule.integrations ? cpsSubmodule.integrations.map(i => `<li>${i}</li>`).join('') : '';
            const details = `
        <p><strong>Description:</strong> ${cpsSubmodule.description}</p>
        
        <h5>Objectifs</h5>
        <ul>${objectivesHtml}</ul>
        
        <h5>Fonctionnalités attendues</h5>
        <ul>${featuresHtml}</ul>
        
        <h5>Exigences techniques</h5>
        <ul>${requirementsHtml}</ul>
        
        ${integrationsHtml ? `<h5>Intégrations requises</h5><ul>${integrationsHtml}</ul>` : ''}
      `;
            this.modalBody = details;
        }
        else {
            this.modalBody = '<p>Pas de détails CPS disponibles pour ce sous-module.</p>';
        }
        this.modalVisible = true;
        this.creating = false;
    }
    resolveCpsSubmodule(moduleDetail, moduleItem, submodule) {
        if (!(moduleDetail === null || moduleDetail === void 0 ? void 0 : moduleDetail.submodules)) {
            return undefined;
        }
        if (moduleDetail.submodules[submodule.title]) {
            return moduleDetail.submodules[submodule.title];
        }
        const details = Object.values(moduleDetail.submodules);
        const normalizedTitle = this.normalizeSubmoduleTitle(submodule.title);
        const directMatch = details.find(detail => this.normalizeSubmoduleTitle(detail.title) === normalizedTitle);
        if (directMatch) {
            return directMatch;
        }
        const submoduleIndex = moduleItem.submodules.findIndex(item => item.title === submodule.title);
        return submoduleIndex >= 0 ? details[submoduleIndex] : undefined;
    }
    normalizeSubmoduleTitle(value) {
        return (value || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '');
    }
    closeModal() {
        this.modalVisible = false;
        this.modalTitle = '';
        this.modalBody = '';
        this.creating = false;
    }
    startCreate() {
        this.creating = true;
        this.form = { name: this.currentSubmoduleTitle || '', description: '', config: '{}' };
    }
    submitForm() {
        // validate JSON
        let parsed = null;
        try {
            parsed = JSON.parse(this.form.config || '{}');
        }
        catch (e) {
            this.status = 'Configuration JSON invalide';
            return;
        }
        const record = {
            module: this.currentModuleKey,
            submodule: this.currentSubmoduleTitle,
            name: this.form.name,
            description: this.form.description,
            config: parsed,
            createdAt: new Date().toISOString()
        };
        const key = 'sgrc_submodule_configs';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(record);
        localStorage.setItem(key, JSON.stringify(existing));
        this.status = 'Configuration créée localement';
        this.creating = false;
        setTimeout(() => this.closeModal(), 900);
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(i0.ɵɵdirectiveInject(i1.HttpClient), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.DashboardService), i0.ɵɵdirectiveInject(i4.NotificationService), i0.ɵɵdirectiveInject(i5.RiskService), i0.ɵɵdirectiveInject(i6.Router)); };
DashboardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["app-dashboard"]], viewQuery: function DashboardComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.notifContainer = _t.first);
    } }, hostBindings: function DashboardComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function DashboardComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } }, decls: 51, vars: 6, consts: [[1, "dashboard-wrapper"], [1, "main-header"], [1, "header-left"], [1, "logo-container"], ["src", "assets/icon.jpeg", "alt", "Logo", 1, "logo-img"], [1, "logo"], [1, "divider"], ["routerLink", "/dashboard/planning", "title", "Planning", 1, "icon-btn"], [1, "fas", "fa-calendar-alt"], ["routerLink", "/dashboard", "title", "Home", 1, "icon-btn"], [1, "fas", "fa-home"], ["title", "Assistant GRC", 1, "icon-btn", 3, "click"], [1, "fas", "fa-robot"], [1, "notif-container"], ["notifContainer", ""], ["title", "Notifications", 1, "icon-btn", "notif-btn", 3, "click"], [1, "fas", "fa-bell"], ["class", "notif-dot", 4, "ngIf"], ["class", "notifications-dropdown", 4, "ngIf"], [1, "header-right"], [1, "search-box"], ["type", "text", "placeholder", "Saisir un texte"], [1, "fas", "fa-search"], [1, "user-info"], [1, "fas", "fa-user-circle"], ["title", "D\u00E9connexion", 1, "logout-btn", 3, "click"], [1, "fas", "fa-power-off"], [1, "sub-nav"], [4, "ngFor", "ngForOf"], [1, "content-area"], [1, "dashboard-content"], [3, "title", "close", 4, "ngIf"], [1, "notif-dot"], [1, "notifications-dropdown"], [1, "dropdown-header"], [3, "click", 4, "ngIf"], [1, "dropdown-body"], ["class", "empty-notif", 4, "ngIf"], ["class", "notif-item", 3, "unread", "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "empty-notif"], [1, "notif-item", 3, "click"], [1, "notif-icon"], [1, "fas", "fa-info-circle", "text-primary"], [1, "notif-content"], ["class", "unread-indicator", 4, "ngIf"], [1, "unread-indicator"], ["routerLinkActive", "active", 3, "routerLink", 4, "ngIf", "ngIfElse"], ["staticNavItem", ""], ["routerLinkActive", "active", 3, "routerLink"], ["href", "javascript:void(0)"], [3, "title", "close"], ["modal-body", "", 3, "innerHTML"], ["modal-footer", ""], [2, "display", "none"], ["projected", ""], ["modal-body", ""], [1, "form-row"], [3, "ngModel", "ngModelChange"], ["rows", "3", 3, "ngModel", "ngModelChange"], ["rows", "8", 3, "ngModel", "ngModelChange"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "header", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelement(4, "img", 4);
        i0.ɵɵelementStart(5, "div", 5);
        i0.ɵɵtext(6, "MICEPP");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(7, "div", 6);
        i0.ɵɵelementStart(8, "button", 7);
        i0.ɵɵelement(9, "i", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "button", 9);
        i0.ɵɵelement(11, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "button", 11);
        i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_12_listener() { return ctx.toggleAiAssistant(); });
        i0.ɵɵelement(13, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "div", 13, 14);
        i0.ɵɵelementStart(16, "button", 15);
        i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_16_listener() { return ctx.toggleNotifDropdown(); });
        i0.ɵɵelement(17, "i", 16);
        i0.ɵɵtemplate(18, DashboardComponent_span_18_Template, 2, 1, "span", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(19, DashboardComponent_div_19_Template, 8, 3, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 19);
        i0.ɵɵelementStart(21, "div", 20);
        i0.ɵɵelementStart(22, "select");
        i0.ɵɵelementStart(23, "option");
        i0.ɵɵtext(24, "Organisations");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "option");
        i0.ɵɵtext(26, "Ressources");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "option");
        i0.ɵɵtext(28, "Risques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "option");
        i0.ɵɵtext(30, "Incidents");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "option");
        i0.ɵɵtext(32, "Contr\u00F4les");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "option");
        i0.ɵɵtext(34, "Actions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(35, "input", 21);
        i0.ɵɵelement(36, "i", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 23);
        i0.ɵɵelement(38, "i", 24);
        i0.ɵɵelementStart(39, "span");
        i0.ɵɵtext(40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "button", 25);
        i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_41_listener() { return ctx.logout(); });
        i0.ɵɵelement(42, "i", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "nav", 27);
        i0.ɵɵtemplate(44, DashboardComponent_ng_container_44_Template, 4, 2, "ng-container", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "main", 29);
        i0.ɵɵelementStart(46, "div", 30);
        i0.ɵɵelement(47, "router-outlet");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(48, DashboardComponent_app_modal_48_Template, 7, 2, "app-modal", 31);
        i0.ɵɵtemplate(49, DashboardComponent_app_modal_49_Template, 23, 5, "app-modal", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(50, "app-ai-assistant");
    } if (rf & 2) {
        i0.ɵɵadvance(18);
        i0.ɵɵproperty("ngIf", ctx.unreadCount > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showNotifDropdown);
        i0.ɵɵadvance(21);
        i0.ɵɵtextInterpolate(ctx.currentUserName);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngForOf", ctx.visibleSubNavItems);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.modalVisible && !ctx.creating);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.modalVisible && ctx.creating);
    } }, directives: [i6.RouterLink, i7.NgIf, i8.NgSelectOption, i8.ɵNgSelectMultipleOption, i7.NgForOf, i6.RouterOutlet, i9.AiAssistantComponent, i6.RouterLinkWithHref, i6.RouterLinkActive, i10.ModalComponent, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgModel], pipes: [i7.DatePipe], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #f4f7f9;\r\n  font-family: 'Open Sans', sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.main-header[_ngcontent-%COMP%] {\r\n  height: 60px;\r\n  background: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 0 20px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  z-index: 100;\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .logo-container {\r\n      display: flex;\r\n      align-items: center;\r\n     gap: 12px;\r\n\r\n    .logo-img {\r\n      height: 48px;          // taille plus \u00E9quilibr\u00E9e pour navbar\r\n      max-height: 65px;      // limite haute\r\n      width: auto;\r\n      object-fit: contain;   // \u00E9vite la d\u00E9formation\r\n      display: block;\r\n   }\r\n\r\n  .logo {\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    font-size: 18px;\r\n    color: #004a99;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    line-height: 1;        // meilleur alignement vertical\r\n  }\r\n}\r\n\r\n    .divider {\r\n      width: 1px;\r\n      height: 24px;\r\n      background: #ddd;\r\n    }\r\n\r\n    .icon-btn {\r\n      background: none;\r\n      border: none;\r\n      font-size: 18px;\r\n      color: #004a99;\r\n      cursor: pointer;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: #003366;\r\n      }\r\n    }\r\n\r\n    .notif-container {\r\n      position: relative;\r\n      display: flex;\r\n      align-items: center;\r\n\r\n      .notif-btn {\r\n        position: relative;\r\n\r\n        .notif-dot {\r\n          position: absolute;\r\n          top: -5px;\r\n          right: -8px;\r\n          background: #ef4444;\r\n          color: white;\r\n          font-size: 10px;\r\n          font-weight: bold;\r\n          min-width: 16px;\r\n          height: 16px;\r\n          border-radius: 10px;\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: center;\r\n          padding: 0 4px;\r\n          border: 2px solid white;\r\n          animation: pulse-dot 2s ease-in-out infinite;\r\n        }\r\n\r\n        &:hover {\r\n          color: #003366;\r\n        }\r\n      }\r\n\r\n      \r\n      .notifications-dropdown {\r\n        position: absolute;\r\n        top: 40px;\r\n        left: -150px;\r\n        \r\n        width: 320px;\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\r\n        border: 1px solid #eef2f6;\r\n        z-index: 1000;\r\n        overflow: hidden;\r\n        animation: slideInDown 0.3s ease-out;\r\n\r\n        .dropdown-header {\r\n          padding: 12px 15px;\r\n          background: #f8fafc;\r\n          border-bottom: 1px solid #edf2f7;\r\n          display: flex;\r\n          justify-content: space-between;\r\n          align-items: center;\r\n\r\n          span {\r\n            font-weight: 700;\r\n            color: #1e293b;\r\n            font-size: 14px;\r\n          }\r\n\r\n          button {\r\n            background: none;\r\n            border: none;\r\n            color: #004a99;\r\n            font-size: 12px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            padding: 0;\r\n\r\n            &:hover {\r\n              text-decoration: underline;\r\n            }\r\n          }\r\n        }\r\n\r\n        .dropdown-body {\r\n          max-height: 400px;\r\n          overflow-y: auto;\r\n\r\n          .empty-notif {\r\n            padding: 30px;\r\n            text-align: center;\r\n            color: #94a3b8;\r\n            font-size: 14px;\r\n          }\r\n\r\n          .notif-item {\r\n            padding: 12px 15px;\r\n            display: flex;\r\n            gap: 12px;\r\n            cursor: pointer;\r\n            transition: background 0.2s;\r\n            border-bottom: 1px solid #f1f5f9;\r\n            position: relative;\r\n\r\n            &:last-child {\r\n              border-bottom: none;\r\n            }\r\n\r\n            &:hover {\r\n              background: #f1f5f9;\r\n            }\r\n\r\n            &.unread {\r\n              background: rgba(0, 74, 153, 0.03);\r\n\r\n              &:hover {\r\n                background: rgba(0, 74, 153, 0.06);\r\n              }\r\n            }\r\n\r\n            .notif-icon {\r\n              width: 32px;\r\n              height: 32px;\r\n              background: rgba(0, 74, 153, 0.1);\r\n              border-radius: 50%;\r\n              display: flex;\r\n              align-items: center;\r\n              justify-content: center;\r\n              flex-shrink: 0;\r\n\r\n              i {\r\n                font-size: 14px;\r\n                color: #004a99;\r\n              }\r\n            }\r\n\r\n            .notif-content {\r\n              flex: 1;\r\n\r\n              p {\r\n                margin: 0 0 4px 0;\r\n                font-size: 13px;\r\n                color: #334155;\r\n                line-height: 1.4;\r\n              }\r\n\r\n              small {\r\n                font-size: 11px;\r\n                color: #94a3b8;\r\n              }\r\n            }\r\n\r\n            .unread-indicator {\r\n              width: 8px;\r\n              height: 8px;\r\n              background: #004a99;\r\n              border-radius: 50%;\r\n              position: absolute;\r\n              right: 15px;\r\n              top: 50%;\r\n              transform: translateY(-50%);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes slideInDown {\r\n      from {\r\n        opacity: 0;\r\n        transform: translateY(-10px);\r\n      }\r\n\r\n      to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n      }\r\n    }\r\n\r\n    @keyframes pulse-dot {\r\n\r\n      0%,\r\n      100% {\r\n        transform: scale(1);\r\n        opacity: 1;\r\n      }\r\n\r\n      50% {\r\n        transform: scale(1.25);\r\n        opacity: 0.8;\r\n      }\r\n    }\r\n  }\r\n\r\n  .header-right {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 20px;\r\n\r\n    .search-box {\r\n      display: flex;\r\n      align-items: center;\r\n      background: #f1f3f4;\r\n      border-radius: 20px;\r\n      padding: 5px 15px;\r\n      border: 1px solid #e0e0e0;\r\n\r\n      select {\r\n        background: none;\r\n        border: none;\r\n        font-size: 12px;\r\n        font-weight: bold;\r\n        color: #666;\r\n        margin-right: 10px;\r\n        cursor: pointer;\r\n        outline: none;\r\n      }\r\n\r\n      input {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        font-size: 13px;\r\n        width: 150px;\r\n      }\r\n\r\n      i {\r\n        color: #999;\r\n        font-size: 14px;\r\n      }\r\n    }\r\n\r\n    .user-info {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      font-size: 14px;\r\n      color: #333;\r\n\r\n      i {\r\n        font-size: 20px;\r\n        color: #004a99;\r\n      }\r\n    }\r\n\r\n    .logout-btn {\r\n      background: none;\r\n      border: none;\r\n      color: #dc2626;\r\n      cursor: pointer;\r\n      font-size: 18px;\r\n      transition: transform 0.2s;\r\n      margin-left: 10px;\r\n\r\n      &:hover {\r\n        transform: scale(1.1);\r\n      }\r\n    }\r\n\r\n  }\r\n}\r\n\r\n\r\n.sub-nav[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-top: 1px solid #eee;\r\n  padding: 0 20px;\r\n  display: flex;\r\n  gap: 30px;\r\n  height: 45px;\r\n  align-items: center;\r\n\r\n  a {\r\n    text-decoration: none;\r\n    color: #666;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    position: relative;\r\n    padding: 10px 0;\r\n    transition: color 0.2s;\r\n\r\n    &:hover,\r\n    &.active {\r\n      color: #004a99;\r\n    }\r\n\r\n    &.active::after {\r\n      content: '';\r\n      position: absolute;\r\n      bottom: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 2px;\r\n      background: #004a99;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.content-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px;\r\n  max-width: 1400px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n\r\n  .page-header {\r\n    margin-bottom: 30px;\r\n    padding-bottom: 20px;\r\n    border-bottom: 1px solid #e0e0e0;\r\n\r\n    h1 {\r\n      margin: 0;\r\n      color: #004a99;\r\n      font-size: 24px;\r\n      font-family: 'Montserrat', sans-serif;\r\n      font-weight: 700;\r\n    }\r\n\r\n    p {\r\n      margin: 8px 0 0 0;\r\n      color: #666;\r\n      font-size: 14px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n  {\r\n\r\n  \r\n  .welcome-banner {\r\n    background: linear-gradient(135deg, var(--micepp-blue-dark, #003366) 0%, var(--micepp-blue, #004a99) 100%);\r\n    padding: 35px 50px;\r\n    border-radius: 16px;\r\n    margin-bottom: 40px;\r\n    color: white;\r\n    box-shadow: 0 10px 30px rgba(0, 74, 153, 0.15);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -50%;\r\n      right: -10%;\r\n      width: 400px;\r\n      height: 400px;\r\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\r\n      border-radius: 50%;\r\n    }\r\n\r\n    h2 {\r\n      color: white !important;\r\n      margin: 0 0 12px 0;\r\n      font-size: 2rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 15px;\r\n      font-weight: 700;\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    p {\r\n      margin: 0;\r\n      color: rgba(255, 255, 255, 0.9) !important;\r\n      font-size: 1.1rem !important;\r\n      max-width: 600px;\r\n      line-height: 1.5;\r\n    }\r\n  }\r\n\r\n  .section-subtitle {\r\n    color: #004a99;\r\n    font-size: 1.4rem;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    margin: 30px 0 20px 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-bottom: 2px solid #e0e0e0;\r\n    padding-bottom: 10px;\r\n\r\n    i {\r\n      color: var(--micepp-gold, #c5a059);\r\n    }\r\n  }\r\n\r\n  .admin-tools-section {\r\n    margin-bottom: 50px;\r\n  }\r\n\r\n  .single-card {\r\n    grid-template-columns: minmax(360px, 450px) !important;\r\n  }\r\n\r\n  \r\n  .dashboard-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\r\n    gap: 30px;\r\n    padding-bottom: 40px;\r\n  }\r\n\r\n  \r\n  .role-dashboard {\r\n    animation: fadeIn 0.5s ease-out;\r\n  }\r\n\r\n  \r\n  .module-card.premium {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 16px;\r\n    border: 1px solid rgba(0, 0, 0, 0.04);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);\r\n    height: 100%;\r\n\r\n    &:hover {\r\n      transform: translateY(-8px);\r\n      box-shadow: 0 20px 40px rgba(0, 74, 153, 0.1);\r\n      border-color: rgba(0, 74, 153, 0.1);\r\n\r\n      .card-icon {\r\n        background: var(--micepp-blue, #004a99);\r\n        color: white;\r\n        transform: scale(1.1) rotate(5deg);\r\n      }\r\n    }\r\n\r\n    .card-icon {\r\n      width: 60px;\r\n      height: 60px;\r\n      background: rgba(0, 74, 153, 0.06);\r\n      color: var(--micepp-blue, #004a99);\r\n      border-radius: 14px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.8rem;\r\n      margin-bottom: 15px;\r\n      transition: all 0.3s;\r\n    }\r\n\r\n    h3 {\r\n      margin: 0 0 12px 0;\r\n      color: #1a1a1a;\r\n      font-size: 1.35rem;\r\n      font-weight: 700;\r\n    }\r\n\r\n    .desc {\r\n      font-size: 0.95rem;\r\n      color: #666;\r\n      line-height: 1.6;\r\n      margin-bottom: 15px !important;\r\n      flex-grow: 1;\r\n    }\r\n\r\n    \r\n    .submodules-list {\r\n      list-style: none;\r\n      padding: 0;\r\n      margin: 0 0 15px 0;\r\n\r\n      li {\r\n        padding: 10px 14px;\r\n        margin-bottom: 6px;\r\n        border-radius: 8px;\r\n        font-size: 0.9rem;\r\n        color: #444;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 12px;\r\n        background: #f8f9fa;\r\n\r\n        i {\r\n          font-size: 0.75rem;\r\n          color: var(--micepp-gold, #c5a059);\r\n          opacity: 0.7;\r\n          transition: transform 0.2s;\r\n        }\r\n\r\n        &:hover {\r\n          background: rgba(0, 74, 153, 0.08);\r\n          color: var(--micepp-blue, #004a99);\r\n\r\n          i {\r\n            opacity: 1;\r\n            transform: translateX(4px);\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .card-footer {\r\n      margin-top: auto;\r\n      padding-top: 15px;\r\n      border-top: 1px solid #f0f0f0;\r\n      display: flex;\r\n      justify-content: flex-start;\r\n      gap: 10px;\r\n\r\n      button {\r\n        padding: 10px 20px;\r\n        font-size: 0.85rem;\r\n        border-radius: 8px;\r\n        font-weight: 600;\r\n        cursor: pointer;\r\n        transition: all 0.2s;\r\n        border: none;\r\n\r\n        &.btn-primary {\r\n          background: #004a99;\r\n          color: white;\r\n\r\n          &:hover {\r\n            background: #003366;\r\n            box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n          }\r\n        }\r\n\r\n        &.btn-secondary {\r\n          background: #f8f9fa;\r\n          color: #444;\r\n          border: 1px solid #ddd;\r\n\r\n          &:hover {\r\n            background: #e9ecef;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    \r\n    &.special-admin {\r\n      background: linear-gradient(to bottom, #ffffff, #f0f7ff);\r\n      border-left: 5px solid var(--micepp-blue, #004a99);\r\n    }\r\n\r\n    \r\n    &.config-card {\r\n      border-left: 5px solid #6366f1;\r\n      background: linear-gradient(to bottom, #ffffff, #f5f3ff);\r\n\r\n      .config-form {\r\n        margin: 1rem 0;\r\n\r\n        .form-group {\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 8px;\r\n\r\n          label {\r\n            font-size: 0.85rem;\r\n            font-weight: 600;\r\n            color: #64748b;\r\n          }\r\n\r\n          .path-input {\r\n            padding: 10px 14px;\r\n            border: 1.5px solid #e2e8f0;\r\n            border-radius: 8px;\r\n            font-family: inherit;\r\n            font-size: 0.9rem;\r\n            transition: all 0.2s ease;\r\n            background: rgba(255, 255, 255, 0.8);\r\n            width: 100%;\r\n\r\n            &:focus {\r\n              outline: none;\r\n              border-color: #6366f1;\r\n              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\r\n              background: white;\r\n            }\r\n          }\r\n        }\r\n\r\n        .save-feedback {\r\n          margin-top: 10px;\r\n          font-size: 0.85rem;\r\n          color: #10b981;\r\n          font-weight: 600;\r\n          height: 1.2rem;\r\n\r\n          &.error {\r\n            color: #ef4444;\r\n          }\r\n        }\r\n      }\r\n\r\n      .settings-actions {\r\n        display: flex;\r\n        gap: 15px;\r\n        flex-wrap: wrap;\r\n\r\n        button {\r\n          flex: 1;\r\n          min-width: 160px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .full-width-module {\r\n    grid-column: 1 / -1;\r\n    animation: slideDown 0.4s ease-out;\r\n  }\r\n}\r\n\r\n\r\n.stats-card[_ngcontent-%COMP%] {\r\n  background: white;\r\n  padding: 25px !important;\r\n  margin-bottom: 30px;\r\n\r\n  .stats-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 25px;\r\n\r\n    h3 {\r\n      margin: 0;\r\n      font-size: 1.4rem;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      color: var(--micepp-blue-dark, #003366);\r\n\r\n      i {\r\n        color: var(--micepp-gold, #c5a059);\r\n      }\r\n    }\r\n\r\n    .badge {\r\n      padding: 6px 14px;\r\n      border-radius: 20px;\r\n      font-size: 0.8rem;\r\n      font-weight: 700;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n\r\n      &.premium {\r\n        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n        color: white;\r\n        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);\r\n      }\r\n    }\r\n  }\r\n\r\n  .stats-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  .stat-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 15px;\r\n    padding: 20px;\r\n    border-radius: 14px;\r\n    background: #f8fafc;\r\n    transition: all 0.3s;\r\n    border: 1px solid transparent;\r\n\r\n    &:hover {\r\n      transform: translateY(-4px);\r\n      background: white;\r\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);\r\n\r\n      &.highlight {\r\n        border-color: #3b82f6;\r\n      }\r\n\r\n      &.warn {\r\n        border-color: #ef4444;\r\n      }\r\n\r\n      &.info {\r\n        border-color: #6366f1;\r\n      }\r\n\r\n      &.success {\r\n        border-color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-icon {\r\n      width: 50px;\r\n      height: 50px;\r\n      border-radius: 12px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 1.4rem;\r\n\r\n      &.risks {\r\n        background: rgba(59, 130, 246, 0.1);\r\n        color: #3b82f6;\r\n      }\r\n\r\n      &.critical {\r\n        background: rgba(239, 68, 68, 0.1);\r\n        color: #ef4444;\r\n      }\r\n\r\n      &.maturity {\r\n        background: rgba(99, 102, 241, 0.1);\r\n        color: #6366f1;\r\n      }\r\n\r\n      &.kpi {\r\n        background: rgba(16, 185, 129, 0.1);\r\n        color: #10b981;\r\n      }\r\n    }\r\n\r\n    .stat-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n\r\n      .value {\r\n        font-size: 1.6rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n        line-height: 1.2;\r\n      }\r\n\r\n      .label {\r\n        font-size: 0.85rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 30px;\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(12px);\r\n  border-radius: 18px;\r\n  padding: 20px 28px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n  .header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 16px;\r\n\r\n    h1 {\r\n      font-size: 1.4rem;\r\n      font-weight: 700;\r\n      color: #1e293b;\r\n      margin: 0;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.85rem;\r\n      color: #64748b;\r\n      margin: 4px 0 0;\r\n    }\r\n  }\r\n\r\n  .back-btn {\r\n    width: 38px;\r\n    height: 38px;\r\n    border-radius: 10px;\r\n    border: 1px solid #e2e8f0;\r\n    background: white;\r\n    color: #475569;\r\n    cursor: pointer;\r\n    font-size: 1rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: all 0.2s;\r\n\r\n    &:hover {\r\n      background: #f1f5f9;\r\n      color: #0f172a;\r\n      transform: translateX(-2px);\r\n    }\r\n  }\r\n\r\n  .btn-export {\r\n    padding: 10px 20px;\r\n    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-size: 0.9rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);\r\n    transition: all 0.3s;\r\n\r\n    i {\r\n      font-size: 0.95rem;\r\n    }\r\n\r\n    &:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 6px 15px rgba(30, 41, 59, 0.3);\r\n      filter: brightness(1.1);\r\n    }\r\n\r\n    &:active {\r\n      transform: translateY(0);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.statistics-page[_ngcontent-%COMP%] {\r\n  .chart-card {\r\n    padding: 30px !important;\r\n\r\n    h3 {\r\n      margin-bottom: 25px !important;\r\n      border-bottom: 1px solid #f1f5f9;\r\n      padding-bottom: 15px;\r\n    }\r\n  }\r\n\r\n  \r\n  .donut-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n  }\r\n\r\n  .donut-chart {\r\n    --p_low: 0;\r\n    --p_limited: 0;\r\n    --p_med: 0;\r\n    --p_high: 0;\r\n    --p_crit: 0;\r\n    width: 200px;\r\n    height: 200px;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    background: conic-gradient(#3b82f6 0% calc(var(--p_low) * 1%),\r\n        #14b8a6 calc(var(--p_low) * 1%) calc((var(--p_low) + var(--p_limited)) * 1%),\r\n        #f59e0b calc((var(--p_low) + var(--p_limited)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%),\r\n        #ef4444 calc((var(--p_low) + var(--p_limited) + var(--p_med)) * 1%) calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%),\r\n        #7f1d1d calc((var(--p_low) + var(--p_limited) + var(--p_med) + var(--p_high)) * 1%) 100%);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\r\n\r\n    .donut-inner {\r\n      width: 150px;\r\n      height: 150px;\r\n      background: white;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);\r\n\r\n      .total {\r\n        font-size: 2.2rem;\r\n        font-weight: 800;\r\n        color: #1e293b;\r\n      }\r\n\r\n      .sub {\r\n        font-size: 0.9rem;\r\n        color: #64748b;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n  }\r\n\r\n  .chart-legend {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n    gap: 12px;\r\n    width: 100%;\r\n\r\n    .legend-item {\r\n      font-size: 0.85rem;\r\n      font-weight: 600;\r\n      color: #475569;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n\r\n      .dot {\r\n        width: 10px;\r\n        height: 10px;\r\n        border-radius: 50%;\r\n      }\r\n\r\n      &.ok .dot {\r\n        background: #22c55e;\r\n      }\r\n\r\n      &.progress .dot {\r\n        background: #facc15;\r\n      }\r\n\r\n      &.nok .dot {\r\n        background: #ef4444;\r\n      }\r\n    }\r\n  }\r\n\r\n  .donut-chart.audit-status {\r\n    background: conic-gradient(\r\n      #22c55e 0 calc(var(--ok) * 1%),\r\n      #facc15 calc(var(--ok) * 1%) calc((var(--ok) + var(--progress)) * 1%),\r\n      #ef4444 calc((var(--ok) + var(--progress)) * 1%) 100%\r\n    );\r\n  }\r\n\r\n  \r\n  .progress-circles {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    padding: 20px 0;\r\n  }\r\n\r\n  .circle-item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 15px;\r\n\r\n    .circle-label {\r\n      font-size: 1rem;\r\n    }\r\n  }\r\n\r\n  .premium-circle {\r\n    --p: 0;\r\n    width: 120px;\r\n    height: 120px;\r\n    border-radius: 50%;\r\n    background:\r\n      radial-gradient(closest-side, white 85%, transparent 0%),\r\n      conic-gradient(var(--c, #3b82f6) calc(var(--p) * 1%), #f1f5f9 0);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    transition: --p 1s;\r\n\r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 130px;\r\n      height: 130px;\r\n      border: 1px solid #f1f5f9;\r\n      border-radius: 50%;\r\n      z-index: -1;\r\n    }\r\n\r\n    .percent {\r\n      font-size: 1.5rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    &.treatment {\r\n      --c: #10b981;\r\n    }\r\n\r\n    &.maturity {\r\n      --c: #6366f1;\r\n    }\r\n\r\n    &.critical {\r\n      --c: #ef4444;\r\n    }\r\n  }\r\n\r\n  \r\n  .domain-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n\r\n    .domain-item {\r\n      .domain-info {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        margin-bottom: 5px;\r\n\r\n        .name {\r\n          font-weight: 600;\r\n          color: #334155;\r\n          font-size: 0.9rem;\r\n        }\r\n\r\n        .count {\r\n          font-weight: 700;\r\n          color: #64748b;\r\n          font-size: 0.85rem;\r\n          background: #f1f5f9;\r\n          padding: 2px 8px;\r\n          border-radius: 6px;\r\n        }\r\n      }\r\n\r\n      .progress-lite {\r\n        height: 6px;\r\n        background: #f1f5f9;\r\n        border-radius: 3px;\r\n        overflow: hidden;\r\n\r\n        .fill {\r\n          height: 100%;\r\n          background: linear-gradient(to right, #6366f1, #3b82f6);\r\n          border-radius: 3px;\r\n          transition: width 1s;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .progress-circles.small {\r\n    gap: 20px;\r\n\r\n    .premium-circle {\r\n      width: 100px;\r\n      height: 100px;\r\n\r\n      &::before {\r\n        width: 110px;\r\n        height: 110px;\r\n      }\r\n\r\n      .percent {\r\n        font-size: 1.2rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  \r\n  .kpi-row {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n    gap: 20px;\r\n    margin-bottom: 30px;\r\n  }\r\n\r\n  .kpi-card {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px;\r\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\r\n    border-left: 4px solid #3b82f6;\r\n\r\n    .kpi-value {\r\n      font-size: 1.8rem;\r\n      font-weight: 800;\r\n      color: #1e293b;\r\n    }\r\n\r\n    .kpi-label {\r\n      font-size: 0.9rem;\r\n      color: #64748b;\r\n      font-weight: 600;\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.5px;\r\n    }\r\n\r\n    &.kpi-open {\r\n      border-left-color: #64748b;\r\n\r\n      .kpi-value {\r\n        color: #64748b;\r\n      }\r\n    }\r\n\r\n    &.kpi-total {\r\n      border-left-color: #3b82f6;\r\n\r\n      .kpi-value {\r\n        color: #3b82f6;\r\n      }\r\n    }\r\n\r\n    &.kpi-progress {\r\n      border-left-color: #f59e0b;\r\n\r\n      .kpi-value {\r\n        color: #f59e0b;\r\n      }\r\n    }\r\n\r\n    &.kpi-closed {\r\n      border-left-color: #10b981;\r\n\r\n      .kpi-value {\r\n        color: #10b981;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.mb-4[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n\r\n.export-dropdown[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n\r\n  .btn-export {\r\n    background: rgba(0, 74, 153, 0.05);\r\n    color: #004a99;\r\n    border: 1.5px solid rgba(0, 74, 153, 0.2);\r\n    padding: 10px 20px;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    transition: all 0.3s;\r\n\r\n    &:hover {\r\n      background: #004a99;\r\n      color: white;\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 12px rgba(0, 74, 153, 0.2);\r\n    }\r\n  }\r\n\r\n  .dropdown-menu {\r\n    position: absolute;\r\n    top: calc(100% + 4px);\r\n    right: 0;\r\n    background: white;\r\n    border-radius: 12px;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e2e8f0;\r\n    min-width: 180px;\r\n    z-index: 1000;\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    transform: translateY(10px);\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    overflow: visible;\r\n    \r\n\r\n    \r\n    &::before {\r\n      content: '';\r\n      position: absolute;\r\n      top: -15px;\r\n      left: -20px;\r\n      right: -20px;\r\n      height: 25px;\r\n      background: transparent;\r\n    }\r\n\r\n    &.show {\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    button {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 12px;\r\n      width: 100%;\r\n      padding: 12px 16px;\r\n      border: none;\r\n      background: none !important;\r\n      color: #1e293b !important;\r\n      font-weight: 600;\r\n      font-size: 0.9rem;\r\n      cursor: pointer;\r\n      text-align: left;\r\n      transition: background 0.2s;\r\n\r\n      &:hover {\r\n        background: #f1f5f9 !important;\r\n        color: #004a99 !important;\r\n      }\r\n\r\n      i {\r\n        font-size: 1.1rem;\r\n        width: 20px;\r\n        text-align: center;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.risk-matrix-card[_ngcontent-%COMP%] {\r\n  max-width: 1120px;\r\n  margin: 0 auto 2rem;\r\n  overflow: visible !important;\r\n  \r\n  .matrix-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\r\n    gap: 16px;\r\n    margin-bottom: 18px;\r\n    padding: 0 6px;\r\n\r\n    h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b; }\r\n  }\r\n\r\n  .matrix-subtitle {\r\n    margin: 6px 0 0;\r\n    color: #64748b;\r\n    font-size: 0.92rem;\r\n    line-height: 1.5;\r\n  }\r\n\r\n  .matrix-legend {\r\n    display: flex;\r\n    gap: 8px;\r\n    flex-wrap: wrap;\r\n\r\n    .legend-chip {\r\n      font-size: 0.72rem;\r\n      font-weight: 700;\r\n      padding: 5px 10px;\r\n      border-radius: 999px;\r\n      text-transform: uppercase;\r\n      \r\n      &.green { background: #d1fae5; color: #065f46; }\r\n      &.yellow { background: #fef3c7; color: #92400e; }\r\n      &.orange { background: #ffedd5; color: #9a3412; }\r\n      &.red { background: #fee2e2; color: #991b1b; }\r\n    }\r\n  }\r\n\r\n  .matrix-insights {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, minmax(0, 1fr));\r\n    gap: 12px;\r\n    margin-bottom: 14px;\r\n  }\r\n\r\n  .insight-card {\r\n    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\r\n    border: 1px solid #e2e8f0;\r\n    border-radius: 14px;\r\n    padding: 14px 16px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    min-height: 88px;\r\n\r\n    .insight-label {\r\n      font-size: 0.72rem;\r\n      font-weight: 800;\r\n      letter-spacing: 0.08em;\r\n      text-transform: uppercase;\r\n      color: #64748b;\r\n    }\r\n\r\n    strong {\r\n      font-size: 1.05rem;\r\n      color: #0f172a;\r\n      line-height: 1.3;\r\n    }\r\n\r\n    small {\r\n      color: #64748b;\r\n      font-size: 0.8rem;\r\n      line-height: 1.4;\r\n    }\r\n\r\n    &.highlight {\r\n      border-color: rgba(59, 130, 246, 0.22);\r\n      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);\r\n    }\r\n\r\n    &.critical {\r\n      border-color: rgba(239, 68, 68, 0.18);\r\n      box-shadow: 0 10px 22px rgba(239, 68, 68, 0.08);\r\n    }\r\n  }\r\n\r\n  .matrix-footer {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, minmax(0, 1fr));\r\n    gap: 10px;\r\n    margin-top: 12px;\r\n  }\r\n\r\n  .footer-note {\r\n    padding: 12px 14px;\r\n    border-radius: 12px;\r\n    background: #f8fafc;\r\n    border: 1px solid #e2e8f0;\r\n    color: #475569;\r\n    font-size: 0.88rem;\r\n    line-height: 1.5;\r\n  }\r\n}\r\n\r\n.risk-matrix-container[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  grid-template-rows: auto auto auto;\r\n  gap: 10px;\r\n  background: white;\r\n  padding: 14px;\r\n  border-radius: 18px;\r\n  border: 1px solid #e2e8f0;\r\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);\r\n}\r\n\r\n.risk-matrix-y-axis[_ngcontent-%COMP%] {\r\n  grid-row: 1;\r\n  grid-column: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  writing-mode: initial;\r\n  rotate: 0deg;\r\n  font-size: 0.82rem;\r\n  font-weight: 800;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1px;\r\n  white-space: nowrap;\r\n  \r\n  i { margin-right: 6px; color: #3b82f6; }\r\n}\r\n\r\n.risk-matrix-body[_ngcontent-%COMP%] {\r\n  grid-row: 2;\r\n  grid-column: 1;\r\n  overflow-x: auto;\r\n}\r\n\r\n.risk-matrix-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  min-width: 780px;\r\n  table-layout: fixed;\r\n  border-spacing: 4px;\r\n  border-collapse: separate;\r\n\r\n  .col-axis {\r\n    width: 130px;\r\n  }\r\n\r\n  .col-impact {\r\n    width: calc((100% - 130px) / 4);\r\n  }\r\n\r\n  th, td {\r\n    padding: 0;\r\n    height: 66px;\r\n    border-radius: 8px;\r\n    vertical-align: middle;\r\n  }\r\n\r\n  .impact-label {\r\n    background: #f8fafc;\r\n    color: #475569;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    text-align: center;\r\n    border: 1px solid #e2e8f0;\r\n    padding: 8px 6px;\r\n    line-height: 1.2;\r\n    \r\n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\r\n  }\r\n\r\n  .prob-label {\r\n    background: #f8fafc;\r\n    color: #475569;\r\n    font-weight: 700;\r\n    font-size: 0.84rem;\r\n    text-align: center;\r\n    border: 1px solid #e2e8f0;\r\n    width: 130px;\r\n    padding: 8px 6px;\r\n    line-height: 1.25;\r\n    \r\n    .score { display: block; font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }\r\n  }\r\n\r\n  .axis-corner { border: none; background: transparent; width: 130px; }\r\n\r\n  .total-label,\r\n  .total-cell {\r\n    background: #eff6ff;\r\n    border: 1px solid #bfdbfe;\r\n    color: #1d4ed8;\r\n    text-align: center;\r\n    font-weight: 800;\r\n    font-size: 0.9rem;\r\n    padding: 8px 6px;\r\n  }\r\n\r\n  .total-label {\r\n    background: #e0f2fe;\r\n    border-color: #bae6fd;\r\n    color: #0f766e;\r\n  }\r\n\r\n  .cell {\r\n    text-align: center;\r\n    border: 2px solid transparent;\r\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n    position: relative;\r\n    overflow: hidden;\r\n    \r\n    &:hover {\r\n      transform: scale(1.03);\r\n      z-index: 10;\r\n      box-shadow: 0 10px 18px rgba(0,0,0,0.15);\r\n      border-color: rgba(255,255,255,0.4);\r\n    }\r\n\r\n    &.is-clickable {\r\n      cursor: pointer;\r\n\r\n      &::after {\r\n        content: 'Voir';\r\n        position: absolute;\r\n        top: 8px;\r\n        right: 8px;\r\n        font-size: 0.62rem;\r\n        font-weight: 800;\r\n        padding: 3px 6px;\r\n        border-radius: 999px;\r\n        background: rgba(255, 255, 255, 0.18);\r\n        color: rgba(255, 255, 255, 0.95);\r\n      }\r\n    }\r\n\r\n    .cell-content {\r\n      height: 100%;\r\n      width: 100%;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      gap: 2px;\r\n      padding: 4px;\r\n    }\r\n\r\n    .cell-value {\r\n      font-size: 1.35rem;\r\n      font-weight: 900;\r\n      color: white;\r\n      text-shadow: 0 1px 2px rgba(0,0,0,0.2);\r\n    }\r\n\r\n    .cell-meta {\r\n      font-size: 0.68rem;\r\n      font-weight: 700;\r\n      color: rgba(255, 255, 255, 0.92);\r\n      letter-spacing: 0.03em;\r\n    }\r\n\r\n    \r\n    &.cell-lightgreen { background-color: #ecfdf5; border-color: #d1fae5; .cell-value { color: #10b981; } }\r\n    &.cell-green { background-color: #10b981; .cell-value { color: white; } }\r\n    &.cell-lightyellow { background-color: #fffbeb; border-color: #fef3c7; .cell-value { color: #f59e0b; } }\r\n    &.cell-yellow { background-color: #fbbf24; .cell-value { color: white; } }\r\n    &.cell-orange { background-color: #f97316; .cell-value { color: white; } }\r\n    &.cell-red { background-color: #ef4444; .cell-value { color: white; } }\r\n    &.cell-darkred { background-color: #b91c1c; .cell-value { color: white; } }\r\n    &.cell-lightgreen .cell-meta,\r\n    &.cell-lightyellow .cell-meta {\r\n      color: #475569;\r\n    }\r\n  }\r\n\r\n  .totals-row {\r\n    th, td {\r\n      height: 46px;\r\n    }\r\n  }\r\n}\r\n\r\n.matrix-risk-modal-body[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 18px;\r\n}\r\n\r\n.matrix-detail-summary[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 12px;\r\n}\r\n\r\n.summary-item[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  border: 1px solid #e2e8f0;\r\n  background: #f8fafc;\r\n  border-radius: 12px;\r\n\r\n  .summary-label {\r\n    display: block;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.08em;\r\n    color: #64748b;\r\n    margin-bottom: 6px;\r\n  }\r\n\r\n  strong {\r\n    font-size: 1rem;\r\n    color: #0f172a;\r\n  }\r\n}\r\n\r\n.matrix-risk-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n  max-height: 52vh;\r\n  overflow-y: auto;\r\n  padding-right: 4px;\r\n}\r\n\r\n.matrix-risk-item[_ngcontent-%COMP%] {\r\n  border: 1px solid #e2e8f0;\r\n  border-radius: 14px;\r\n  padding: 16px;\r\n  background: white;\r\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\r\n}\r\n\r\n.risk-item-head[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  margin-bottom: 10px;\r\n\r\n  h4 {\r\n    margin: 0;\r\n    font-size: 1rem;\r\n    color: #0f172a;\r\n  }\r\n}\r\n\r\n.risk-level-badge[_ngcontent-%COMP%] {\r\n  padding: 5px 10px;\r\n  border-radius: 999px;\r\n  font-size: 0.75rem;\r\n  font-weight: 800;\r\n  white-space: nowrap;\r\n\r\n  &.critical {\r\n    background: #fee2e2;\r\n    color: #991b1b;\r\n  }\r\n\r\n  &.high {\r\n    background: #ffedd5;\r\n    color: #9a3412;\r\n  }\r\n\r\n  &.medium {\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n  }\r\n\r\n  &.limited {\r\n    background: #ccfbf1;\r\n    color: #115e59;\r\n  }\r\n\r\n  &.low {\r\n    background: #d1fae5;\r\n    color: #065f46;\r\n  }\r\n\r\n  &.default {\r\n    background: #e2e8f0;\r\n    color: #475569;\r\n  }\r\n}\r\n\r\n.risk-item-desc[_ngcontent-%COMP%] {\r\n  margin: 0 0 12px;\r\n  color: #475569;\r\n  line-height: 1.6;\r\n}\r\n\r\n.risk-item-meta[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 8px 14px;\r\n  color: #334155;\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.empty-matrix-detail[_ngcontent-%COMP%] {\r\n  padding: 20px;\r\n  border: 1px dashed #cbd5e1;\r\n  border-radius: 12px;\r\n  background: #f8fafc;\r\n  color: #64748b;\r\n  text-align: center;\r\n}\r\n\r\n.risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n  grid-row: 3;\r\n  grid-column: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  font-size: 0.82rem;\r\n  font-weight: 800;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1px;\r\n  \r\n  i { margin-right: 6px; color: #3b82f6; }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .risk-matrix-card[_ngcontent-%COMP%] {\r\n    .matrix-insights {\r\n      grid-template-columns: repeat(2, minmax(0, 1fr));\r\n    }\r\n\r\n    .matrix-footer {\r\n      grid-template-columns: 1fr;\r\n    }\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .risk-matrix-card[_ngcontent-%COMP%] {\r\n    max-width: 100%;\r\n\r\n    .matrix-header {\r\n      flex-direction: column;\r\n    }\r\n\r\n    .matrix-insights {\r\n      grid-template-columns: 1fr;\r\n    }\r\n  }\r\n\r\n  .risk-matrix-container[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n    grid-template-rows: auto auto auto;\r\n  }\r\n\r\n  .risk-matrix-y-axis[_ngcontent-%COMP%], .risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n    writing-mode: initial;\r\n    rotate: 0deg;\r\n  }\r\n\r\n  .risk-matrix-y-axis[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 1;\r\n  }\r\n\r\n  .risk-matrix-body[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 2;\r\n  }\r\n\r\n  .risk-matrix-x-axis[_ngcontent-%COMP%] {\r\n    grid-column: 1;\r\n    grid-row: 3;\r\n  }\r\n\r\n  .matrix-detail-summary[_ngcontent-%COMP%], .risk-item-meta[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{
                selector: 'app-dashboard',
                templateUrl: './dashboard.component.html',
                styleUrls: ['./dashboard.component.scss']
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }, { type: i3.DashboardService }, { type: i4.NotificationService }, { type: i5.RiskService }, { type: i6.Router }]; }, { notifContainer: [{
            type: ViewChild,
            args: ['notifContainer']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
//# sourceMappingURL=dashboard.component.js.map