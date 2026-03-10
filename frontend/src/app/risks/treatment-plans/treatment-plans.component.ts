import { Component, OnInit } from '@angular/core';
import { RiskService, Risk, RiskStatus } from '../../core/services/risk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatment-plans',
  templateUrl: './treatment-plans.component.html',
  styleUrls: ['./treatment-plans.component.scss']
})
export class TreatmentPlansComponent implements OnInit {

  plans: any[] = [];
  metrics = { total: 0, enCours: 0, enRetard: 0, termines: 0 };
  completionRate = 0;
  overdueRate = 0;

  // Detail panel
  selectedPlan: any = null;
  showDetailPanel = false;
  isEditing = false;

  constructor(private riskService: RiskService, private router: Router) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.riskService.getRisks().subscribe(risks => {
      const today = new Date();

      this.plans = risks.map(r => {
        let status = 'En cours';
        let progress = 0;

        if (r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED) {
          status = 'Terminé';
          progress = 100;
        } else if (new Date(r.dateEcheance) < today) {
          status = 'En retard';
          progress = 25;
        } else if (r.statut === RiskStatus.IN_PROGRESS) {
          status = 'En cours';
          progress = 50;
        } else {
          status = 'En cours';
          progress = 10;
        }

        const owner = r.responsableTraitement
          ? `${r.responsableTraitement.prenom} ${r.responsableTraitement.nom}`
          : 'Non assigné';

        return {
          id: r.id,
          name: r.planActionTraitement || `Traitement: ${r.titre}`,
          riskTitle: r.titre,
          description: (r as any).description,
          domaine: r.domaine,
          dateEcheance: r.dateEcheance,
          progress,
          status,
          owner,
          riskStatus: r.statut
        };
      });

      this.metrics.total = this.plans.length;
      this.metrics.enCours = this.plans.filter(p => p.status === 'En cours').length;
      this.metrics.enRetard = this.plans.filter(p => p.status === 'En retard').length;
      this.metrics.termines = this.plans.filter(p => p.status === 'Terminé').length;

      this.completionRate = this.metrics.total > 0
        ? Math.round((this.metrics.termines / this.metrics.total) * 100) : 0;
      this.overdueRate = this.metrics.total > 0
        ? Math.round((this.metrics.enRetard / this.metrics.total) * 100) : 0;
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
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  recalcMetrics() {
    this.metrics.enCours = this.plans.filter(p => p.status === 'En cours').length;
    this.metrics.enRetard = this.plans.filter(p => p.status === 'En retard').length;
    this.metrics.termines = this.plans.filter(p => p.status === 'Terminé').length;
    this.completionRate = this.metrics.total > 0
      ? Math.round((this.metrics.termines / this.metrics.total) * 100) : 0;
    this.overdueRate = this.metrics.total > 0
      ? Math.round((this.metrics.enRetard / this.metrics.total) * 100) : 0;
  }
}
