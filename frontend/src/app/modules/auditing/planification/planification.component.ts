import { Component, OnInit } from '@angular/core';
import { AuditPlan, AuditPlanningRecordType, AuditPlanningService } from '../../../core/services/audit-planning.service';
import { UserRole } from '../../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { getAuditPlanningNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss']
})
export class PlanificationComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  availablePlans: AuditPlan[] = [];
  suggestedPlan: any[] = [];
  selectedPlanId: number | null = null;
  planMode: 'existing' | 'new' = 'existing';
  planForm: Partial<AuditPlan> = this.emptyPlan();
  planFormSubmitted = false;
  isLoadingPlans = false;
  isGeneratingPlan = false;
  isCreatingMissions = false;
  isCreatingPlan = false;

  constructor(
    private auditPlanningService: AuditPlanningService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditPlanningNavItems(this.currentUserRole);
  }

  get selectedSuggestionsCount(): number {
    return this.suggestedPlan.filter((item) => item.selected).length;
  }

  get selectedPlan(): AuditPlan | undefined {
    return this.availablePlans.find((plan) => Number(plan.id) === Number(this.selectedPlanId));
  }

  get canGenerateSuggestions(): boolean {
    if (this.isGeneratingPlan || this.isCreatingPlan) {
      return false;
    }

    return this.planMode === 'existing'
      ? !!this.selectedPlanId
      : this.isPlanFormValid;
  }

  get isPlanFormValid(): boolean {
    const nom = String(this.planForm.nom || '').trim();
    const nature = String(this.planForm.natureCode || '').trim();
    return nom.length >= 3
      && nom.length <= 120
      && !!nature
      && !!this.planForm.dateDebut
      && !!this.planForm.dateFin
      && !this.isDateRangeInvalid;
  }

  get isDateRangeInvalid(): boolean {
    if (!this.planForm.dateDebut || !this.planForm.dateFin) {
      return false;
    }

    return new Date(this.planForm.dateFin).getTime() < new Date(this.planForm.dateDebut).getTime();
  }

  get planFormErrors(): string[] {
    const errors: string[] = [];
    const nom = String(this.planForm.nom || '').trim();

    if (nom.length === 0) {
      errors.push('Le nom du plan est obligatoire.');
    } else if (nom.length < 3) {
      errors.push('Le nom doit contenir au moins 3 caracteres.');
    } else if (nom.length > 120) {
      errors.push('Le nom ne doit pas depasser 120 caracteres.');
    }

    if (!String(this.planForm.natureCode || '').trim()) {
      errors.push('La nature du plan est obligatoire.');
    }

    if (!this.planForm.dateDebut) {
      errors.push('La date de debut est obligatoire.');
    }

    if (!this.planForm.dateFin) {
      errors.push('La date de fin est obligatoire.');
    }

    if (this.isDateRangeInvalid) {
      errors.push('La date de fin doit etre posterieure ou egale a la date de debut.');
    }

    if (String(this.planForm.calendrier || '').length > 120) {
      errors.push('Le calendrier ne doit pas depasser 120 caracteres.');
    }

    if (String(this.planForm.description || '').length > 500) {
      errors.push('La description ne doit pas depasser 500 caracteres.');
    }

    return errors;
  }

  ngOnInit(): void {
    if (!this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/audit-plans']);
      return;
    }

    this.loadPlans();
  }

  get isSeniorAuditor(): boolean {
    const userString = sessionStorage.getItem('sgrc_user');
    const userAddress = userString ? JSON.parse(userString) : null;
    return userAddress?.role === UserRole.AUDIT_DIRECTEUR
      || userAddress?.role === UserRole.AUDIT_RESPONSABLE
      || userAddress?.role === UserRole.SUPER_ADMIN;
  }

  private emptyPlan(): Partial<AuditPlan> {
    return {
      nom: '',
      natureCode: 'annuel',
      calendrier: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      isTemplate: false
    };
  }

  loadPlans(): void {
    this.isLoadingPlans = true;
    this.auditPlanningService.getPlans().subscribe({
      next: (plans) => {
        this.availablePlans = plans.filter((plan) => this.isSuggestionEligibleStatus(plan.statusCode || plan.status));
        if (!this.selectedPlanId && this.availablePlans.length > 0) {
          this.selectedPlanId = this.availablePlans[0].id;
        }
        if (this.selectedPlanId && !this.availablePlans.some((plan) => Number(plan.id) === Number(this.selectedPlanId))) {
          this.selectedPlanId = this.availablePlans[0]?.id || null;
        }
        this.isLoadingPlans = false;
      },
      error: (err) => {
        console.error(err);
        this.availablePlans = [];
        this.selectedPlanId = null;
        this.isLoadingPlans = false;
      }
    });
  }

  setPlanMode(mode: 'existing' | 'new'): void {
    this.planMode = mode;
    this.suggestedPlan = [];
    this.planFormSubmitted = false;
    if (mode === 'existing' && !this.selectedPlanId && this.availablePlans.length > 0) {
      this.selectedPlanId = this.availablePlans[0].id;
    }
  }

  selectPlan(plan: AuditPlan): void {
    this.selectedPlanId = plan.id;
    this.suggestedPlan = [];
  }

  getPlanPeriod(plan: AuditPlan): string {
    const start = plan.dateDebut ? new Date(plan.dateDebut).toLocaleDateString('fr-FR') : '-';
    const end = plan.dateFin ? new Date(plan.dateFin).toLocaleDateString('fr-FR') : '-';
    return `${start} - ${end}`;
  }

  private isSuggestionEligibleStatus(value?: string | null): boolean {
    const normalized = String(value || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');

    return ['cree', 'a_valider', 'valide_direction', 'valide_conseil', 'valide_comite'].includes(normalized);
  }

  private buildPlanPayload(): Partial<AuditPlan> {
    return {
      nom: String(this.planForm.nom || '').trim(),
      nature: this.planForm.natureCode || 'annuel',
      calendrier: this.planForm.calendrier || null,
      description: this.planForm.description || null,
      dateDebut: this.planForm.dateDebut || null,
      dateFin: this.planForm.dateFin || null,
      isTemplate: false
    };
  }

  private ensureTargetPlan(onReady: (planId: number) => void): void {
    if (this.planMode === 'existing') {
      if (!this.selectedPlanId) {
        alert('Selectionnez un plan en creation avant de continuer.');
        return;
      }
      onReady(Number(this.selectedPlanId));
      return;
    }

    this.planFormSubmitted = true;

    if (!this.isPlanFormValid) {
      alert(this.planFormErrors[0] || 'Le formulaire du nouveau plan est invalide.');
      return;
    }

    this.isCreatingPlan = true;
    this.auditPlanningService.createPlan(this.buildPlanPayload()).subscribe({
      next: (plan) => {
        this.isCreatingPlan = false;
        this.availablePlans = [plan, ...this.availablePlans];
        this.selectedPlanId = plan.id;
        this.planMode = 'existing';
        this.planForm = this.emptyPlan();
        onReady(plan.id);
      },
      error: (err) => {
        console.error(err);
        this.isCreatingPlan = false;
        alert(err?.error?.message || 'Erreur lors de la creation du plan.');
      }
    });
  }

  generatePlan() {
    this.ensureTargetPlan((planId) => {
      this.isGeneratingPlan = true;
      this.suggestedPlan = [];
      this.auditPlanningService.suggestPlan(AuditPlanningRecordType.MISSION_AUDIT, planId).subscribe({
        next: (plan) => {
          this.suggestedPlan = plan.map((item) => ({ ...item, selected: true }));
          this.isGeneratingPlan = false;
        },
        error: (err) => {
          console.error(err);
          this.isGeneratingPlan = false;
          alert('Erreur lors de la suggestion des missions.');
        }
      });
    });
  }

  createMissions() {
    const selected = this.suggestedPlan.filter((item) => item.selected);
    if (selected.length === 0) {
      return;
    }

    this.ensureTargetPlan((planId) => {
      this.isCreatingMissions = true;
      this.auditPlanningService.createSuggestedMissionsInPlan(planId, selected).subscribe({
        next: () => {
          this.isCreatingMissions = false;
          this.suggestedPlan = [];
          alert('Missions ajoutees au plan avec succes.');
          this.router.navigate(['/dashboard/audit-plans', planId]);
        },
        error: (err) => {
          console.error(err);
          this.isCreatingMissions = false;
          alert(err?.error?.message || 'Erreur lors de la creation des missions.');
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/audit-plans']);
  }

  goToPlans() {
    this.router.navigate(['/dashboard/audit-plans']);
  }

  goToAudits() {
    this.router.navigate(['/dashboard/audit-plans']);
  }
}
