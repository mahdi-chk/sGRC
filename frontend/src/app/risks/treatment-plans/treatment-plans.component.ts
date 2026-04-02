import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RiskService, RiskStatus } from '../../core/services/risk.service';

@Component({
    selector: 'app-treatment-plans',
    templateUrl: './treatment-plans.component.html',
    styleUrls: ['./treatment-plans.component.scss'],
})
export class TreatmentPlansComponent implements OnInit {
    plans: any[] = [];
    metrics = { total: 0, enCours: 0, enRetard: 0, termines: 0 };
    completionRate = 0;
    overdueRate = 0;

    selectedPlan: any = null;
    showDetailPanel = false;
    isEditing = false;

    constructor(private riskService: RiskService, private router: Router) {}

    ngOnInit(): void {
        this.loadPlans();
    }

    loadPlans() {
        this.riskService.getRisks().subscribe((risks) => {
            const today = new Date();

            this.plans = risks.map((risk) => {
                let status = 'En cours';
                let progress = 0;
                const normalizedStatus = this.normalizeRiskStatus((risk as any).statutCode || risk.statut);

                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED) {
                    status = 'Terminé';
                    progress = 100;
                } else if (new Date(risk.dateEcheance) < today) {
                    status = 'En retard';
                    progress = 25;
                } else if (normalizedStatus === RiskStatus.IN_PROGRESS) {
                    status = 'En cours';
                    progress = 50;
                } else {
                    status = 'En cours';
                    progress = 10;
                }

                const owner = risk.responsableTraitement
                    ? `${risk.responsableTraitement.prenom} ${risk.responsableTraitement.nom}`
                    : 'Non assigné';

                return {
                    id: risk.id,
                    name: risk.planActionTraitement || `Traitement: ${risk.titre}`,
                    riskTitle: risk.titre,
                    description: (risk as any).description,
                    domaine: risk.domaine,
                    dateEcheance: risk.dateEcheance,
                    progress,
                    status,
                    owner,
                    riskStatus: normalizedStatus,
                };
            });

            this.metrics.total = this.plans.length;
            this.metrics.enCours = this.plans.filter((plan) => plan.status === 'En cours').length;
            this.metrics.enRetard = this.plans.filter((plan) => plan.status === 'En retard').length;
            this.metrics.termines = this.plans.filter((plan) => plan.status === 'Terminé').length;

            this.completionRate = this.metrics.total > 0
                ? Math.round((this.metrics.termines / this.metrics.total) * 100)
                : 0;
            this.overdueRate = this.metrics.total > 0
                ? Math.round((this.metrics.enRetard / this.metrics.total) * 100)
                : 0;
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    viewDetails(plan: any) {
        this.selectedPlan = plan;
        this.showDetailPanel = true;
        this.isEditing = false;
    }

    editPlan(plan: any) {
        this.selectedPlan = plan;
        this.showDetailPanel = true;
        this.isEditing = true;
    }

    closePanel() {
        this.showDetailPanel = false;
        this.selectedPlan = null;
        this.isEditing = false;
    }

    markAsCompleted(plan: any) {
        this.riskService.updateStatus(plan.id, RiskStatus.TREATED).subscribe({
            next: () => {
                plan.status = 'Terminé';
                plan.progress = 100;
                this.recalcMetrics();
            },
            error: (error: any) => console.error('Erreur:', error),
        });
    }

    recalcMetrics() {
        this.metrics.enCours = this.plans.filter((plan) => plan.status === 'En cours').length;
        this.metrics.enRetard = this.plans.filter((plan) => plan.status === 'En retard').length;
        this.metrics.termines = this.plans.filter((plan) => plan.status === 'Terminé').length;
        this.completionRate = this.metrics.total > 0
            ? Math.round((this.metrics.termines / this.metrics.total) * 100)
            : 0;
        this.overdueRate = this.metrics.total > 0
            ? Math.round((this.metrics.enRetard / this.metrics.total) * 100)
            : 0;
    }

    private normalizeRiskStatus(status?: string | null): string {
        return (status || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
