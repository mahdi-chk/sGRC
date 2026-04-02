import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user-role.enum';
import { RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';

@Component({
    selector: 'app-alertes-monitoring',
    templateUrl: './alertes-monitoring.component.html',
    styleUrls: ['./alertes-monitoring.component.scss']
})
export class AlertesMonitoringComponent implements OnInit {
    alerts: any[] = [];
    metrics = { active: 0 };
    criticalCount = 0;
    warningCount = 0;
    overdueCount = 0;

    showEmailModal = false;
    selectedAlert: any = null;
    emailSending = false;
    emailSuccess = false;
    emailError = '';
    currentUser: any = null;

    constructor(
        private riskService: RiskService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe((user) => {
            this.currentUser = user;
            this.loadAlerts();
        });
    }

    loadAlerts() {
        this.riskService.getRisks().subscribe((risks) => {
            const today = new Date();
            this.alerts = [];
            this.criticalCount = 0;
            this.warningCount = 0;
            this.overdueCount = 0;

            let filteredRisks = risks;
            if (this.currentUser?.role === UserRole.RISK_AGENT) {
                filteredRisks = risks.filter((risk) => risk.riskAgentId === this.currentUser.id);
            }

            filteredRisks.forEach((risk) => {
                const normalizedStatus = this.normalize((risk as any).statutCode || risk.statut);
                const normalizedLevel = this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque);

                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED) return;

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

    markAsTreated(alert: any) {
        this.riskService.updateStatus(alert.id, RiskStatus.TREATED).subscribe({
            next: () => {
                this.alerts = this.alerts.filter((item) => item.id !== alert.id);
                this.metrics.active = this.alerts.length;
            },
            error: (error: any) => console.error('Erreur:', error)
        });
    }

    openEmailModal(alert: any) {
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
        if (!this.selectedAlert) return;

        this.emailSending = true;
        this.emailError = '';

        this.riskService.sendNotification(this.selectedAlert.id).subscribe({
            next: () => {
                this.emailSending = false;
                this.emailSuccess = true;
            },
            error: (error: any) => {
                this.emailSending = false;
                this.emailError = error.error?.message || 'Erreur lors de l\'envoi';
            }
        });
    }

    formatTime(dateStr: any): string {
        if (!dateStr) return 'Récemment';

        const date = new Date(dateStr);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 0) return 'Bientôt';

        let interval = seconds / 86400;
        if (interval > 1) return `Il y a ${Math.floor(interval)} jour${Math.floor(interval) > 1 ? 's' : ''}`;

        interval = seconds / 3600;
        if (interval > 1) return `Il y a ${Math.floor(interval)} heure${Math.floor(interval) > 1 ? 's' : ''}`;

        interval = seconds / 60;
        if (interval > 1) return `Il y a ${Math.floor(interval)} min`;

        return 'À l\'instant';
    }
    private normalize(value?: string | null): string {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
