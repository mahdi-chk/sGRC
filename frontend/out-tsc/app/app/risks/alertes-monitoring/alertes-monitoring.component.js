import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user-role.enum';
import { RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/risk.service";
import * as i2 from "@angular/router";
import * as i3 from "../../core/services/auth.service";
import * as i4 from "../../shared/components/risk-module-tabs/risk-module-tabs.component";
import * as i5 from "@angular/common";
function AlertesMonitoringComponent_div_53_div_1_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function AlertesMonitoringComponent_div_53_div_1_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 16);
} }
function AlertesMonitoringComponent_div_53_div_1_i_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 46);
} }
const _c0 = function (a0, a1, a2) { return { "alert-critical": a0, "alert-warning": a1, "alert-info": a2 }; };
function AlertesMonitoringComponent_div_53_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelementStart(1, "div", 33);
    i0.ɵɵtemplate(2, AlertesMonitoringComponent_div_53_div_1_i_2_Template, 1, 0, "i", 34);
    i0.ɵɵtemplate(3, AlertesMonitoringComponent_div_53_div_1_i_3_Template, 1, 0, "i", 35);
    i0.ɵɵtemplate(4, AlertesMonitoringComponent_div_53_div_1_i_4_Template, 1, 0, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 37);
    i0.ɵɵelementStart(6, "p", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 39);
    i0.ɵɵelement(9, "i", 40);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 41);
    i0.ɵɵelementStart(12, "button", 42);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_53_div_1_Template_button_click_12_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const alert_r4 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.markAsTreated(alert_r4); });
    i0.ɵɵelement(13, "i", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 44);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_53_div_1_Template_button_click_14_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const alert_r4 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.openEmailModal(alert_r4); });
    i0.ɵɵelement(15, "i", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(6, _c0, alert_r4.type === "critical", alert_r4.type === "warning", alert_r4.type === "info"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", alert_r4.type === "critical");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", alert_r4.type === "warning");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", alert_r4.type === "info");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r4.message);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", alert_r4.time, "");
} }
function AlertesMonitoringComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtemplate(1, AlertesMonitoringComponent_div_53_div_1_Template, 16, 10, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.alerts);
} }
function AlertesMonitoringComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵelement(1, "i", 48);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune alerte active. Tout est sous contr\u00F4le.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AlertesMonitoringComponent_div_55_div_2_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r13.emailError, " ");
} }
function AlertesMonitoringComponent_div_55_div_2_i_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 66);
} }
function AlertesMonitoringComponent_div_55_div_2_i_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 45);
} }
function AlertesMonitoringComponent_div_55_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 53);
    i0.ɵɵelement(2, "i", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Confirmer l'envoi de notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 55);
    i0.ɵɵtext(6, " Envoyer une notification email \u00E0 toutes les parties prenantes concern\u00E9es par le risque : ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 56);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 57);
    i0.ɵɵelement(10, "i", 46);
    i0.ɵɵtext(11, " L'email sera envoy\u00E9 \u00E0 l'agent assign\u00E9, au responsable de traitement et au risk manager. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, AlertesMonitoringComponent_div_55_div_2_div_12_Template, 3, 1, "div", 58);
    i0.ɵɵelementStart(13, "div", 59);
    i0.ɵɵelementStart(14, "button", 60);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_55_div_2_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.closeEmailModal(); });
    i0.ɵɵtext(15, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 61);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_55_div_2_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.confirmSendEmail(); });
    i0.ɵɵtemplate(17, AlertesMonitoringComponent_div_55_div_2_i_17_Template, 1, 0, "i", 62);
    i0.ɵɵtemplate(18, AlertesMonitoringComponent_div_55_div_2_i_18_Template, 1, 0, "i", 63);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" \u00AB ", ctx_r11.selectedAlert == null ? null : ctx_r11.selectedAlert.riskTitle, " \u00BB ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r11.emailError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r11.emailSending);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r11.emailSending);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.emailSending);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r11.emailSending);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r11.emailSending ? "Envoi en cours..." : "Confirmer l'envoi", " ");
} }
function AlertesMonitoringComponent_div_55_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵelementStart(1, "div", 68);
    i0.ɵɵelement(2, "i", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Notification envoy\u00E9e !");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 55);
    i0.ɵɵtext(6, "Les parties prenantes ont \u00E9t\u00E9 notifi\u00E9es par email avec succ\u00E8s.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 59);
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_55_div_3_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.closeEmailModal(); });
    i0.ɵɵtext(9, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AlertesMonitoringComponent_div_55_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_55_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.closeEmailModal(); });
    i0.ɵɵelementStart(1, "div", 50);
    i0.ɵɵlistener("click", function AlertesMonitoringComponent_div_55_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵtemplate(2, AlertesMonitoringComponent_div_55_div_2_Template, 20, 7, "div", 51);
    i0.ɵɵtemplate(3, AlertesMonitoringComponent_div_55_div_3_Template, 10, 0, "div", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.emailSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.emailSuccess);
} }
export class AlertesMonitoringComponent {
    constructor(riskService, router, authService) {
        this.riskService = riskService;
        this.router = router;
        this.authService = authService;
        this.alerts = [];
        this.metrics = { active: 0 };
        this.criticalCount = 0;
        this.warningCount = 0;
        this.overdueCount = 0;
        this.showEmailModal = false;
        this.selectedAlert = null;
        this.emailSending = false;
        this.emailSuccess = false;
        this.emailError = '';
        this.currentUser = null;
    }
    ngOnInit() {
        this.authService.currentUser$.subscribe((user) => {
            this.currentUser = user;
            this.loadAlerts();
        });
    }
    loadAlerts() {
        this.riskService.getRisks().subscribe((risks) => {
            var _a;
            const today = new Date();
            this.alerts = [];
            this.criticalCount = 0;
            this.warningCount = 0;
            this.overdueCount = 0;
            let filteredRisks = risks;
            if (((_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.role) === UserRole.RISK_AGENT) {
                filteredRisks = risks.filter((risk) => risk.riskAgentId === this.currentUser.id);
            }
            filteredRisks.forEach((risk) => {
                const normalizedStatus = this.normalize(risk.statutCode || risk.statut);
                const normalizedLevel = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED)
                    return;
                if (new Date(risk.dateEcheance) < today) {
                    this.overdueCount += 1;
                    this.alerts.push({
                        id: risk.id,
                        type: 'critical',
                        message: `Retard critique: "${risk.titre}" - échéance dépassée`,
                        time: this.formatTime(risk.dateEcheance),
                        riskTitle: risk.titre
                    });
                    return;
                }
                if (normalizedLevel === RiskLevel.CRITICAL) {
                    this.criticalCount += 1;
                    this.alerts.push({
                        id: risk.id,
                        type: 'critical',
                        message: `Risque critique identifié: ${risk.titre}`,
                        time: this.formatTime(risk.createdAt),
                        riskTitle: risk.titre
                    });
                    return;
                }
                if (normalizedLevel === RiskLevel.HIGH) {
                    this.warningCount += 1;
                    this.alerts.push({
                        id: risk.id,
                        type: 'warning',
                        message: `Risque élevé: ${risk.titre}`,
                        time: this.formatTime(risk.createdAt),
                        riskTitle: risk.titre
                    });
                }
            });
            this.alerts = this.alerts.slice(0, 20);
            this.metrics.active = this.alerts.length;
        });
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    markAsTreated(alert) {
        this.riskService.updateStatus(alert.id, RiskStatus.TREATED).subscribe({
            next: () => {
                this.alerts = this.alerts.filter((item) => item.id !== alert.id);
                this.metrics.active = this.alerts.length;
            },
            error: (error) => console.error('Erreur:', error)
        });
    }
    openEmailModal(alert) {
        this.selectedAlert = alert;
        this.showEmailModal = true;
        this.emailSending = false;
        this.emailSuccess = false;
        this.emailError = '';
    }
    closeEmailModal() {
        this.showEmailModal = false;
        this.selectedAlert = null;
        this.emailSending = false;
        this.emailSuccess = false;
        this.emailError = '';
    }
    confirmSendEmail() {
        if (!this.selectedAlert)
            return;
        this.emailSending = true;
        this.emailError = '';
        this.riskService.sendNotification(this.selectedAlert.id).subscribe({
            next: () => {
                this.emailSending = false;
                this.emailSuccess = true;
            },
            error: (error) => {
                var _a;
                this.emailSending = false;
                this.emailError = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de l\'envoi';
            }
        });
    }
    formatTime(dateStr) {
        if (!dateStr)
            return 'Récemment';
        const date = new Date(dateStr);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 0)
            return 'Bientôt';
        let interval = seconds / 86400;
        if (interval > 1)
            return `Il y a ${Math.floor(interval)} jour${Math.floor(interval) > 1 ? 's' : ''}`;
        interval = seconds / 3600;
        if (interval > 1)
            return `Il y a ${Math.floor(interval)} heure${Math.floor(interval) > 1 ? 's' : ''}`;
        interval = seconds / 60;
        if (interval > 1)
            return `Il y a ${Math.floor(interval)} min`;
        return 'À l\'instant';
    }
    normalize(value) {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
AlertesMonitoringComponent.ɵfac = function AlertesMonitoringComponent_Factory(t) { return new (t || AlertesMonitoringComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AuthService)); };
AlertesMonitoringComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AlertesMonitoringComponent, selectors: [["app-alertes-monitoring"]], decls: 56, vars: 7, consts: [[1, "role-dashboard", "alertes-monitoring-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-shield-alt"], [1, "header-right"], [1, "btn-action", "primary", 3, "click"], [1, "fas", "fa-sync-alt"], [1, "kpi-row", "mb-4"], [1, "kpi-card", "kpi-danger"], [1, "kpi-icon"], [1, "fas", "fa-bell"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "kpi-total"], [1, "fas", "fa-exclamation-triangle"], [1, "kpi-card", "kpi-progress"], [1, "fas", "fa-exclamation-circle"], [1, "kpi-card", "kpi-closed"], [1, "fas", "fa-clock"], [1, "module-card", "premium", "full-width-card"], [1, "card-header-bar"], [1, "fas", "fa-stream"], [1, "live-dot"], [1, "ping"], [1, "dot"], ["class", "alerts-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "alerts-list"], ["class", "alert-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "alert-item", 3, "ngClass"], [1, "alert-icon-container"], ["class", "fas fa-exclamation-circle", 4, "ngIf"], ["class", "fas fa-exclamation-triangle", 4, "ngIf"], ["class", "fas fa-info-circle", 4, "ngIf"], [1, "alert-body"], [1, "alert-message"], [1, "alert-time"], [1, "far", "fa-clock"], [1, "alert-actions"], ["title", "Marquer comme trait\u00E9", 1, "action-btn", "success", 3, "click"], [1, "fas", "fa-check"], ["title", "Envoyer un email", 1, "action-btn", "info", 3, "click"], [1, "fas", "fa-paper-plane"], [1, "fas", "fa-info-circle"], [1, "empty-state"], [1, "fas", "fa-check-circle"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [4, "ngIf"], ["class", "success-state", 4, "ngIf"], [1, "modal-icon"], [1, "fas", "fa-envelope"], [1, "modal-desc"], [1, "modal-risk-name"], [1, "modal-note"], ["class", "modal-error", 4, "ngIf"], [1, "modal-actions"], [1, "btn-action", "secondary", 3, "disabled", "click"], [1, "btn-action", "primary", 3, "disabled", "click"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], ["class", "fas fa-paper-plane", 4, "ngIf"], [1, "modal-error"], [1, "fas", "fa-times-circle"], [1, "fas", "fa-spinner", "fa-spin"], [1, "success-state"], [1, "modal-icon", "success"]], template: function AlertesMonitoringComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function AlertesMonitoringComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Alertes et monitoring");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Surveillance en temps r\u00E9el des risques et notifications automatiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function AlertesMonitoringComponent_Template_button_click_12_listener() { return ctx.loadAlerts(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Rafra\u00EEchir ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(15, "app-risk-module-tabs");
        i0.ɵɵelementStart(16, "div", 9);
        i0.ɵɵelementStart(17, "div", 10);
        i0.ɵɵelementStart(18, "div", 11);
        i0.ɵɵelement(19, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "span", 13);
        i0.ɵɵtext(21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "span", 14);
        i0.ɵɵtext(23, "Alertes actives");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 15);
        i0.ɵɵelementStart(25, "div", 11);
        i0.ɵɵelement(26, "i", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "span", 13);
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "span", 14);
        i0.ɵɵtext(30, "Critiques");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 17);
        i0.ɵɵelementStart(32, "div", 11);
        i0.ɵɵelement(33, "i", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "span", 13);
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "span", 14);
        i0.ɵɵtext(37, "Avertissements");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "div", 19);
        i0.ɵɵelementStart(39, "div", 11);
        i0.ɵɵelement(40, "i", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(41, "span", 13);
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "span", 14);
        i0.ɵɵtext(44, "En retard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 21);
        i0.ɵɵelementStart(46, "div", 22);
        i0.ɵɵelementStart(47, "h3");
        i0.ɵɵelement(48, "i", 23);
        i0.ɵɵtext(49, " Flux d'alertes en temps r\u00E9el");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "span", 24);
        i0.ɵɵelement(51, "span", 25);
        i0.ɵɵelement(52, "span", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(53, AlertesMonitoringComponent_div_53_Template, 2, 1, "div", 27);
        i0.ɵɵtemplate(54, AlertesMonitoringComponent_div_54_Template, 4, 0, "div", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(55, AlertesMonitoringComponent_div_55_Template, 4, 2, "div", 29);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(21);
        i0.ɵɵtextInterpolate(ctx.metrics.active);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.criticalCount);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.warningCount);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.overdueCount);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngIf", ctx.alerts.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.alerts.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showEmailModal);
    } }, directives: [i4.RiskModuleTabsComponent, i5.NgIf, i5.NgForOf, i5.NgClass], styles: [".alertes-monitoring-page[_ngcontent-%COMP%] {\n  animation: fadeIn 0.5s ease-out;\n}\n\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e0e0e0;\n\n  .header-left {\n    display: flex;\n    align-items: center;\n    gap: 15px;\n\n    h1 {\n      margin: 0;\n      color: #004a99;\n      font-size: 24px;\n      font-family: 'Montserrat', sans-serif;\n      font-weight: 700;\n      i { color: #ef4444; margin-right: 8px; }\n    }\n    p { margin: 5px 0 0 0; color: #666; font-size: 14px; }\n  }\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  width: 38px; height: 38px;\n  border-radius: 50%;\n  border: 1px solid #e0e0e0;\n  background: white;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  color: #004a99;\n  transition: all 0.2s;\n  &:hover { background: #004a99; color: white; border-color: #004a99; }\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 10px 22px;\n  border-radius: 10px;\n  font-weight: 600;\n  font-size: 14px;\n  border: none;\n  cursor: pointer;\n  display: flex; align-items: center; gap: 8px;\n  transition: all 0.2s;\n  &.primary {\n    background: #004a99; color: white;\n    &:hover { background: #003366; box-shadow: 0 4px 12px rgba(0,74,153,0.2); }\n  }\n}\n\n\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n  margin-bottom: 30px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 22px;\n  text-align: center;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.03);\n  border: 1px solid rgba(0,0,0,0.04);\n  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n\n  &:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }\n\n  .kpi-icon {\n    width: 50px; height: 50px;\n    border-radius: 14px;\n    display: flex; align-items: center; justify-content: center;\n    font-size: 1.4rem;\n    margin-bottom: 4px;\n  }\n\n  .kpi-value { font-size: 2rem; font-weight: 800; color: #1e293b; }\n  .kpi-label { font-size: 0.85rem; color: #666; font-weight: 500; }\n\n  &.kpi-danger {\n    .kpi-icon { background: rgba(239,68,68,0.1); color: #ef4444; }\n    border-top: 3px solid #ef4444;\n  }\n  &.kpi-total {\n    .kpi-icon { background: rgba(249,115,22,0.1); color: #f97316; }\n    border-top: 3px solid #f97316;\n  }\n  &.kpi-progress {\n    .kpi-icon { background: rgba(234,179,8,0.1); color: #eab308; }\n    border-top: 3px solid #eab308;\n  }\n  &.kpi-closed {\n    .kpi-icon { background: rgba(59,130,246,0.1); color: #3b82f6; }\n    border-top: 3px solid #3b82f6;\n  }\n}\n\n\n.full-width-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 0;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.03);\n  border: 1px solid rgba(0,0,0,0.04);\n  overflow: hidden;\n}\n\n.card-header-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 25px;\n  background: #f8fafc;\n  border-bottom: 1px solid #edf2f7;\n\n  h3 {\n    margin: 0; font-size: 1.1rem; font-weight: 700; color: #1a1a1a;\n    i { color: #c5a059; margin-right: 10px; }\n  }\n}\n\n.live-dot[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex; align-items: center; justify-content: center;\n  width: 12px; height: 12px;\n\n  .ping {\n    position: absolute;\n    width: 12px; height: 12px;\n    border-radius: 50%;\n    background: rgba(239,68,68,0.5);\n    animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;\n  }\n  .dot {\n    position: relative;\n    width: 8px; height: 8px;\n    border-radius: 50%;\n    background: #ef4444;\n  }\n}\n\n@keyframes ping {\n  75%, 100% { transform: scale(2); opacity: 0; }\n}\n\n\n.alerts-list[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n\n.alert-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 20px;\n  margin: 6px 0;\n  border-radius: 12px;\n  transition: all 0.25s ease;\n  border-left: 4px solid transparent;\n  background: #fdfdfd;\n\n  &:hover {\n    background: #f8fafc;\n    transform: translateX(4px);\n    box-shadow: 0 4px 10px rgba(0,0,0,0.04);\n\n    .alert-actions { opacity: 1; }\n  }\n\n  &.alert-critical {\n    border-left-color: #ef4444;\n    .alert-icon-container { background: rgba(239,68,68,0.1); color: #ef4444; }\n  }\n  &.alert-warning {\n    border-left-color: #f59e0b;\n    .alert-icon-container { background: rgba(245,158,11,0.1); color: #f59e0b; }\n  }\n  &.alert-info {\n    border-left-color: #3b82f6;\n    .alert-icon-container { background: rgba(59,130,246,0.1); color: #3b82f6; }\n  }\n}\n\n.alert-icon-container[_ngcontent-%COMP%] {\n  width: 42px; height: 42px;\n  border-radius: 12px;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1.2rem;\n  flex-shrink: 0;\n}\n\n.alert-body[_ngcontent-%COMP%] {\n  flex: 1;\n  .alert-message { margin: 0; font-size: 0.95rem; font-weight: 600; color: #334155; }\n  .alert-time { font-size: 0.8rem; color: #94a3b8; i { margin-right: 4px; } }\n}\n\n.alert-actions[_ngcontent-%COMP%] {\n  display: flex; gap: 8px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px; height: 34px;\n  border-radius: 10px;\n  border: none;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n\n  &.success { background: rgba(16,185,129,0.1); color: #10b981; &:hover { background: #10b981; color: white; } }\n  &.info { background: rgba(59,130,246,0.1); color: #3b82f6; &:hover { background: #3b82f6; color: white; } }\n}\n\n\n.empty-state[_ngcontent-%COMP%] {\n  padding: 60px 20px;\n  text-align: center;\n  color: #94a3b8;\n  i { font-size: 3rem; color: #10b981; margin-bottom: 15px; }\n  p { font-size: 1rem; }\n}\n\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n\n@media (max-width: 768px) {\n  .kpi-row[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n  .page-header[_ngcontent-%COMP%] { flex-direction: column; align-items: flex-start; gap: 15px; }\n}\n\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.5);\n  display: flex; align-items: center; justify-content: center;\n  z-index: 1000;\n  animation: fadeIn 0.2s ease-out;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 40px;\n  max-width: 480px;\n  width: 90%;\n  text-align: center;\n  box-shadow: 0 25px 50px rgba(0,0,0,0.15);\n  animation: slideUp 0.3s ease-out;\n\n  h3 { margin: 15px 0 10px; font-size: 1.3rem; color: #1e293b; font-weight: 700; }\n}\n\n.modal-icon[_ngcontent-%COMP%] {\n  width: 70px; height: 70px;\n  border-radius: 50%;\n  background: rgba(59,130,246,0.1);\n  color: #3b82f6;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 2rem;\n  margin: 0 auto;\n\n  &.success { background: rgba(16,185,129,0.1); color: #10b981; }\n}\n\n.modal-desc[_ngcontent-%COMP%] { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 10px 0; }\n\n.modal-risk-name[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  padding: 12px 20px;\n  font-weight: 700;\n  color: #1e293b;\n  font-size: 1rem;\n  margin: 15px 0;\n}\n\n.modal-note[_ngcontent-%COMP%] {\n  font-size: 0.82rem; color: #94a3b8;\n  i { color: #3b82f6; margin-right: 6px; }\n}\n\n.modal-error[_ngcontent-%COMP%] {\n  background: rgba(239,68,68,0.1);\n  color: #ef4444;\n  padding: 10px 15px;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  margin: 10px 0;\n  i { margin-right: 6px; }\n}\n\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex; gap: 12px; justify-content: center; margin-top: 25px;\n\n  .btn-action {\n    padding: 12px 28px;\n    &.secondary {\n      background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;\n      &:hover { background: #e2e8f0; }\n      &:disabled { opacity: 0.5; cursor: not-allowed; }\n    }\n    &.primary:disabled { opacity: 0.6; cursor: not-allowed; }\n  }\n}\n\n.success-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { color: #10b981; }\n\n@keyframes slideUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertesMonitoringComponent, [{
        type: Component,
        args: [{
                selector: 'app-alertes-monitoring',
                templateUrl: './alertes-monitoring.component.html',
                styleUrls: ['./alertes-monitoring.component.scss']
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.Router }, { type: i3.AuthService }]; }, null); })();
//# sourceMappingURL=alertes-monitoring.component.js.map