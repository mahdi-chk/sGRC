import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPlan, AuditPlanningService, LookupOption } from '../../core/services/audit-planning.service';
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
  statusOptions: LookupOption[] = [];
  natureOptions: LookupOption[] = [];

  isLoading = false;
  isSaving = false;
  showCreateModal = false;
  editingPlanId: number | null = null;

  filters = {
    nom: '',
    nature: '',
    status: '',
    dateDebut: '',
    dateFin: ''
  };

  planForm: Partial<AuditPlan> = this.emptyPlan();

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

  get isManagementRole(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR || role === UserRole.AUDIT_RESPONSABLE || role === UserRole.CHEF_MISSION || role === UserRole.SUPER_ADMIN;
  }

  ngOnInit(): void {
    this.loadLookups();
    this.loadPlans();
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
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
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
    this.showCreateModal = true;
  }

  savePlan(): void {
    if (!this.planForm.nom || !this.planForm.natureCode || this.isSaving) {
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

  private isDraftStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('brouillon') || normalized.includes('draft') || normalized.includes('prepare');
  }

  private isValidatedStatus(value?: string | null): boolean {
    const normalized = this.normalizeStatus(value);
    return normalized.includes('valide') || normalized.includes('approved') || normalized.includes('cloture');
  }
}
