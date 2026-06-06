import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPlan, AuditPlanMission, AuditPlanningRecordType, AuditPlanningService, LookupOption } from '../../core/services/audit-planning.service';
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
    const recordType = this.currentUserRole === UserRole.CONTROLLER
      ? AuditPlanningRecordType.PLAN_ACTION_AUDIT
      : null;

    this.auditPlanningService.getMissions(recordType).subscribe({
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

  get scopedWorkItemLabel(): string {
    return this.currentUserRole === UserRole.CONTROLLER ? 'Recommandations' : 'Missions';
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

  getPlanStatusClass(plan: AuditPlan): string {
    const status = this.normalizeStatus(plan.statusCode || plan.status);

    if (this.isDraftStatus(status)) {
      return 'status-chip status-draft';
    }
    if (status.includes('ferme') || status.includes('cloture')) {
      return 'status-chip status-closed';
    }
    if (this.isValidatedStatus(status)) {
      return 'status-chip status-valid';
    }
    if (status.includes('retard') || status.includes('rejete')) {
      return 'status-chip status-alert';
    }

    return 'status-chip status-pending';
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
    const visiblePlanIds = new Set(this.plans.map((plan) => Number(plan.id)));
    const visibleMissions = this.missions.filter((mission) =>
      mission.auditPlanId != null && visiblePlanIds.has(Number(mission.auditPlanId))
    );
    const inProgress = visibleMissions.filter((mission) => this.normalizeStatus(mission.statut) === 'en_cours').length;
    const completed = visibleMissions.filter((mission) => this.normalizeStatus(mission.statut) === 'ok').length;
    const overdue = visibleMissions.filter((mission) => {
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
      missions: this.totalMissionCount,
      inProgress,
      completed,
      pendingValidation,
      overdue
    };

  }

  private isDraftStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('brouillon')
      || normalized.includes('draft')
      || normalized.includes('prepare')
      || normalized === 'cree'
      || normalized === 'creation';
  }

  private isValidatedStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('valide') || normalized.includes('approved') || normalized.includes('cloture');
  }
}
