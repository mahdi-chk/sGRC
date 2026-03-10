import { Component, OnInit } from '@angular/core';
import { RiskService, RiskLevel, RiskStatus } from '../../core/services/risk.service';
import { Router } from '@angular/router';

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

  // Email confirmation modal
  showEmailModal = false;
  selectedAlert: any = null;
  emailSending = false;
  emailSuccess = false;
  emailError = '';

  constructor(private riskService: RiskService, private router: Router) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts() {
    this.riskService.getRisks().subscribe(risks => {
      const today = new Date();
      this.alerts = [];
      this.criticalCount = 0;
      this.warningCount = 0;
      this.overdueCount = 0;

      risks.forEach(r => {
        if (r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED) return;

        if (new Date(r.dateEcheance) < today) {
          this.overdueCount++;
          this.alerts.push({
            id: r.id,
            type: 'critical',
            message: `Retard critique: "${r.titre}" — Échéance dépassée`,
            time: this.formatTime(r.dateEcheance),
            riskTitle: r.titre
          });
        } else if (r.niveauRisque === RiskLevel.CRITICAL) {
          this.criticalCount++;
          this.alerts.push({
            id: r.id,
            type: 'critical',
            message: `Risque critique identifié: ${r.titre}`,
            time: this.formatTime(r.createdAt),
            riskTitle: r.titre
          });
        } else if (r.niveauRisque === RiskLevel.HIGH) {
          this.warningCount++;
          this.alerts.push({
            id: r.id,
            type: 'warning',
            message: `Risque élevé: ${r.titre} (Niveau: ${r.niveauRisque})`,
            time: this.formatTime(r.createdAt),
            riskTitle: r.titre
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
    this.riskService.updateStatus(alert.id, 'Traité' as any).subscribe({
      next: () => {
        this.alerts = this.alerts.filter(a => a.id !== alert.id);
        this.metrics.active = this.alerts.length;
      },
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  // Open email confirmation modal
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
      next: (res: any) => {
        this.emailSending = false;
        this.emailSuccess = true;
      },
      error: (err: any) => {
        this.emailSending = false;
        this.emailError = err.error?.message || 'Erreur lors de l\'envoi';
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
}
