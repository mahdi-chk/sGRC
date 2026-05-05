import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPlan, AuditPlanMission, AuditPlanningService, LookupOption } from '../../core/services/audit-planning.service';
import { UserRole } from '../../core/models/user-role.enum';
import { getAuditPlanningNavItems, getStoredAuditRole } from './audit-navigation';

@Component({
  selector: 'app-audit-plans',
  templateUrl: './audit-plans.component.html',
  styleUrls: ['./audit-plans.component.scss']
})
export class AuditPlansComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  plans: AuditPlan[] = [];
  missions: AuditPlanMission[] = [];
  statusOptions: LookupOption[] = [];
  natureOptions: LookupOption[] = [];

  isLoading = false;
  isSaving = false;
  showCreateModal = false;
  editingPlanId: number | null = null;
  dashboardStats = {
    plans: 0,
    missions: 0,
    inProgress: 0,
    completed: 0,
    pendingValidation: 0,
    overdue: 0
  };
  spotlightItems: Array<{ title: string; subtitle: string; status: string }> = [];

  filters = {
    nom: '',
    nature: '',
    status: '',
    dateDebut: '',
    dateFin: ''
  };

  planForm: Partial<AuditPlan> = this.emptyPlan();
  planFormSubmitted = false;

  constructor(
    private auditPlanningService: AuditPlanningService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditPlanningNavItems(this.currentUserRole);
  }

  get totalPlans(): number {
    return this.plans.length;
  }

  get draftPlans(): number {
    return this.plans.filter((plan) => this.isDraftStatus(plan.statusCode || plan.status)).length;
  }

  get validatedPlans(): number {
    return this.plans.filter((plan) => this.isValidatedStatus(plan.statusCode || plan.status)).length;
  }

  get totalMissionCount(): number {
    return this.plans.reduce((total, plan) => total + Number(plan.missionCount || 0), 0);
  }

  get isScopedMissionView(): boolean {
    return this.currentUserRole === UserRole.CHEF_MISSION
      || this.currentUserRole === UserRole.AUDITEUR
      || this.currentUserRole === UserRole.CONTROLLER;
  }

  get scopeDescription(): string {
    switch (this.currentUserRole) {
      case UserRole.CHEF_MISSION:
        return 'Vous voyez uniquement les plans contenant les missions qui vous sont affectees.';
      case UserRole.AUDITEUR:
        return 'Vous voyez uniquement les plans contenant vos missions d audit assignees.';
      case UserRole.CONTROLLER:
        return 'Vous voyez uniquement les plans relies a votre perimetre de suivi et de recommandations.';
      default:
        return 'Le module unique centralise creation, validation, assignation, execution, verification et suivi des plans d audit.';
    }
  }

  get isManagementRole(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR || role === UserRole.AUDIT_RESPONSABLE || role === UserRole.SUPER_ADMIN;
  }

  get canOpenPlanningWorkspace(): boolean {
    return this.isManagementRole;
  }

  get isPlanFormValid(): boolean {
    const nom = String(this.planForm.nom || '').trim();
    const nature = String(this.planForm.natureCode || '').trim();
    return nom.length >= 3
      && nom.length <= 120
      && !!nature
      && !this.isPlanDateRangeInvalid
      && String(this.planForm.calendrier || '').length <= 120
      && String(this.planForm.description || '').length <= 500;
  }

  get isPlanDateRangeInvalid(): boolean {
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

    if (this.isPlanDateRangeInvalid) {
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

  get profileDashboardTitle(): string {
    switch (this.currentUserRole) {
      case UserRole.AUDIT_DIRECTEUR:
        return 'Pilotage de validation et d approbation';
      case UserRole.AUDIT_RESPONSABLE:
        return 'Pilotage operationnel des plans et missions';
      case UserRole.CHEF_MISSION:
        return 'Execution des missions et livrables';
      case UserRole.AUDITEUR:
        return 'Suivi de mes missions et preuves';
      case UserRole.CONTROLLER:
        return 'Suivi des recommandations et plans d action';
      case UserRole.TOP_MANAGEMENT:
        return 'Vue consolidee du portefeuille d audit';
      default:
        return 'Vue consolidee du module Plan d Audit';
    }
  }

  ngOnInit(): void {
    this.loadLookups();
    this.loadPlans();
    this.loadDashboardData();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  openPlanningWorkspace(): void {
    this.router.navigate(['/dashboard/audit-planning']);
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

  loadLookups(): void {
    this.auditPlanningService.getLookupOptions('auditPlan.status').subscribe(data => this.statusOptions = data);
    this.auditPlanningService.getLookupOptions('auditPlan.nature').subscribe(data => this.natureOptions = data);
  }

  loadPlans(): void {
    this.isLoading = true;
    this.auditPlanningService.getPlans(this.filters).subscribe({
      next: (plans) => {
        this.plans = plans;
        this.buildDashboard();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  loadDashboardData(): void {
    this.auditPlanningService.getMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
        this.buildDashboard();
      },
      error: (error) => {
        console.error(error);
        this.missions = [];
        this.buildDashboard();
      }
    });
  }

  resetFilters(): void {
    this.filters = {
      nom: '',
      nature: '',
      status: '',
      dateDebut: '',
      dateFin: ''
    };
    this.loadPlans();
  }

  openCreateModal(): void {
    this.editingPlanId = null;
    this.planForm = this.emptyPlan();
    this.planFormSubmitted = false;
    this.showCreateModal = true;
  }

  openEditModal(plan: AuditPlan): void {
    this.editingPlanId = plan.id;
    this.planForm = {
      nom: plan.nom,
      natureCode: plan.natureCode || '',
      calendrier: plan.calendrier || '',
      description: plan.description || '',
      dateDebut: plan.dateDebut ? new Date(plan.dateDebut).toISOString().split('T')[0] : '',
      dateFin: plan.dateFin ? new Date(plan.dateFin).toISOString().split('T')[0] : '',
      isTemplate: !!plan.isTemplate
    };
    this.planFormSubmitted = false;
    this.showCreateModal = true;
  }

  savePlan(): void {
    this.planFormSubmitted = true;

    if (!this.isPlanFormValid || this.isSaving) {
      if (this.planFormErrors.length > 0) {
        alert(this.planFormErrors[0]);
      }
      return;
    }

    this.isSaving = true;
    const payload = {
      nom: this.planForm.nom,
      nature: this.planForm.natureCode,
      calendrier: this.planForm.calendrier || null,
      description: this.planForm.description || null,
      dateDebut: this.planForm.dateDebut || null,
      dateFin: this.planForm.dateFin || null,
      isTemplate: !!this.planForm.isTemplate
    };

    const request = this.editingPlanId
      ? this.auditPlanningService.updatePlan(this.editingPlanId, payload)
      : this.auditPlanningService.createPlan(payload);

    request.subscribe({
      next: (plan) => {
        this.isSaving = false;
        this.showCreateModal = false;
        this.loadPlans();
        if (!this.editingPlanId && plan.id) {
          this.router.navigate(['/dashboard/audit-plans', plan.id]);
        }
      },
      error: (error) => {
        console.error(error);
        this.isSaving = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde du plan.');
      }
    });
  }

  deletePlan(plan: AuditPlan): void {
    if (!confirm(`Supprimer le plan ${plan.nom} ?`)) {
      return;
    }

    this.auditPlanningService.deletePlan(plan.id).subscribe({
      next: () => this.loadPlans(),
      error: (error) => {
        console.error(error);
        alert(error?.error?.message || 'Erreur lors de la suppression du plan.');
      }
    });
  }

  viewPlan(plan: AuditPlan): void {
    this.router.navigate(['/dashboard/audit-plans', plan.id]);
  }

  private normalizeStatus(value?: string | null): string {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }

  private buildDashboard(): void {
    const now = new Date().getTime();
    const inProgress = this.missions.filter((mission) => this.normalizeStatus(mission.statut) === 'en_cours').length;
    const completed = this.missions.filter((mission) => this.normalizeStatus(mission.statut) === 'ok').length;
    const overdue = this.missions.filter((mission) => {
      if (!mission.delai) {
        return false;
      }
      const due = new Date(mission.delai).getTime();
      return !Number.isNaN(due) && due < now && this.normalizeStatus(mission.statut) !== 'ok';
    }).length;
    const pendingValidation = this.plans.filter((plan) => {
      const status = this.normalizeStatus(plan.statusCode || plan.status);
      return status.includes('a_valider') || status.includes('valide_direction') || status.includes('valide_conseil');
    }).length;

    this.dashboardStats = {
      plans: this.plans.length,
      missions: this.missions.length,
      inProgress,
      completed,
      pendingValidation,
      overdue
    };

    this.spotlightItems = this.missions
      .slice()
      .sort((a, b) => {
        const aDate = a.delai ? new Date(a.delai).getTime() : Number.MAX_SAFE_INTEGER;
        const bDate = b.delai ? new Date(b.delai).getTime() : Number.MAX_SAFE_INTEGER;
        return aDate - bDate;
      })
      .slice(0, 4)
      .map((mission) => ({
        title: mission.titre,
        subtitle: mission.delai ? `Echeance ${new Date(mission.delai).toLocaleDateString('fr-FR')}` : 'Sans echeance',
        status: String(mission.statut || '-')
      }));
  }

  private isDraftStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('brouillon') || normalized.includes('draft') || normalized.includes('prepare');
  }

  private isValidatedStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('valide') || normalized.includes('approved') || normalized.includes('cloture');
  }
}
