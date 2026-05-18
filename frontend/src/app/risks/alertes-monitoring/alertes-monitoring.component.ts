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
    infoCount = 0;

    searchText = '';
    typeFilter = '';
    selectedAlert: any = null;

    showEmailModal = false;
    emailSending = false;
    emailSuccess = false;
    emailError = '';
    currentUser: any = null;
    dismissedAlertKeys = new Set<string>();

    constructor(
        private riskService: RiskService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadDismissedAlerts();
        this.authService.currentUser$.subscribe((user) => {
            this.currentUser = user;
            this.loadAlerts();
        });
    }

    get filteredAlerts(): any[] {
        const search = this.normalize(this.searchText);
        return this.alerts.filter((alert) => {
            const matchesSearch = !search ||
                this.normalize(alert.message).includes(search) ||
                this.normalize(alert.riskTitle).includes(search) ||
                this.normalize(alert.owner).includes(search);
            const matchesType = !this.typeFilter || alert.type === this.typeFilter;
            return matchesSearch && matchesType;
        });
    }

    loadAlerts() {
        this.riskService.getRisks().subscribe((risks) => {
            const today = this.startOfDay(new Date());
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            const generatedAlerts: any[] = [];

            let filteredRisks = risks;
            if (this.currentUser?.role === UserRole.RISK_AGENT) {
                filteredRisks = risks.filter((risk) => risk.riskAgentId === this.currentUser.id);
            }

            filteredRisks.forEach((risk) => {
                const normalizedStatus = this.normalize((risk as any).statutCode || risk.statut);
                const normalizedLevel = this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque);
                const dueDate = this.startOfDay(new Date(risk.dateEcheance));
                const owner = risk.responsableTraitement
                    ? `${risk.responsableTraitement.prenom || ''} ${risk.responsableTraitement.nom || ''}`.trim()
                    : 'Non assigne';

                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED) return;

                if (dueDate < today) {
                    generatedAlerts.push(this.buildAlert(risk, 'critical', 'deadline', `Retard critique: "${risk.titre}" - echeance depassee`, risk.dateEcheance, owner, 100));
                } else if (dueDate <= nextWeek) {
                    generatedAlerts.push(this.buildAlert(risk, 'warning', 'deadline-soon', `Echeance proche: "${risk.titre}" arrive avant 7 jours`, risk.dateEcheance, owner, 75));
                }

                if (normalizedLevel === RiskLevel.CRITICAL) {
                    generatedAlerts.push(this.buildAlert(risk, 'critical', 'level-critical', `Risque critique identifie: ${risk.titre}`, risk.createdAt, owner, 95));
                } else if (normalizedLevel === RiskLevel.HIGH) {
                    generatedAlerts.push(this.buildAlert(risk, 'warning', 'level-high', `Risque eleve: ${risk.titre}`, risk.createdAt, owner, 70));
                }

                if (!risk.planActionTraitement) {
                    generatedAlerts.push(this.buildAlert(risk, 'info', 'missing-plan', `Plan de traitement manquant: ${risk.titre}`, risk.createdAt, owner, 45));
                }

                if (!risk.riskAgentId) {
                    generatedAlerts.push(this.buildAlert(risk, 'warning', 'missing-agent', `Aucun agent assigne au risque: ${risk.titre}`, risk.createdAt, owner, 60));
                }

                if (risk.prochaineEcheance && this.startOfDay(new Date(risk.prochaineEcheance)) < today) {
                    generatedAlerts.push(this.buildAlert(risk, 'warning', 'periodic-overdue', `Traitement periodique en retard: ${risk.titre}`, risk.prochaineEcheance, owner, 65));
                }
            });

            this.alerts = generatedAlerts
                .filter((alert) => !this.dismissedAlertKeys.has(alert.key))
                .sort((first, second) => second.priority - first.priority)
                .slice(0, 50);
            this.recalcMetrics();
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    canTreatAlert(alert: any): boolean {
        return this.currentUser?.role === UserRole.SUPER_ADMIN ||
            this.currentUser?.role === UserRole.RISK_MANAGER ||
            Number(alert?.riskAgentId) === Number(this.currentUser?.id);
    }

    markAsTreated(alert: any) {
        this.riskService.updateStatus(alert.id, RiskStatus.TREATED).subscribe({
            next: () => {
                this.alerts = this.alerts.filter((item) => item.id !== alert.id);
                this.recalcMetrics();
            },
            error: (error: any) => console.error('Erreur:', error)
        });
    }

    dismissAlert(alert: any) {
        this.dismissedAlertKeys.add(alert.key);
        sessionStorage.setItem('sgrc_dismissed_risk_alerts', JSON.stringify(Array.from(this.dismissedAlertKeys)));
        this.alerts = this.alerts.filter((item) => item.key !== alert.key);
        if (this.selectedAlert?.key === alert.key) {
            this.selectedAlert = null;
        }
        this.recalcMetrics();
    }

    clearDismissedAlerts() {
        this.dismissedAlertKeys.clear();
        sessionStorage.removeItem('sgrc_dismissed_risk_alerts');
        this.loadAlerts();
    }

    viewAlert(alert: any) {
        this.selectedAlert = alert;
    }

    closeAlertDetails() {
        this.selectedAlert = null;
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
        if (!dateStr) return 'Recemment';

        const date = new Date(dateStr);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 0) return 'Bientot';

        let interval = seconds / 86400;
        if (interval > 1) return `Il y a ${Math.floor(interval)} jour${Math.floor(interval) > 1 ? 's' : ''}`;

        interval = seconds / 3600;
        if (interval > 1) return `Il y a ${Math.floor(interval)} heure${Math.floor(interval) > 1 ? 's' : ''}`;

        interval = seconds / 60;
        if (interval > 1) return `Il y a ${Math.floor(interval)} min`;

        return 'A l instant';
    }

    private buildAlert(risk: any, type: 'critical' | 'warning' | 'info', category: string, message: string, date: any, owner: string, priority: number) {
        return {
            id: risk.id,
            key: `${risk.id}-${category}`,
            type,
            category,
            message,
            time: this.formatTime(date),
            date,
            riskTitle: risk.titre,
            owner,
            status: (risk as any).statutLabel || risk.statut,
            level: (risk as any).niveauRisqueLabel || risk.niveauRisque,
            domain: risk.domaine,
            riskAgentId: risk.riskAgentId,
            riskManagerId: risk.riskManagerId,
            priority
        };
    }

    private recalcMetrics() {
        this.metrics.active = this.alerts.length;
        this.criticalCount = this.alerts.filter((alert) => alert.type === 'critical').length;
        this.warningCount = this.alerts.filter((alert) => alert.type === 'warning').length;
        this.infoCount = this.alerts.filter((alert) => alert.type === 'info').length;
        this.overdueCount = this.alerts.filter((alert) => alert.category === 'deadline').length;
    }

    private loadDismissedAlerts() {
        try {
            const stored = JSON.parse(sessionStorage.getItem('sgrc_dismissed_risk_alerts') || '[]');
            this.dismissedAlertKeys = new Set(Array.isArray(stored) ? stored : []);
        } catch {
            this.dismissedAlertKeys = new Set<string>();
        }
    }

    private startOfDay(date: Date): Date {
        const copy = new Date(date);
        copy.setHours(0, 0, 0, 0);
        return copy;
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
