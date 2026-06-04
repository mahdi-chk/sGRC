import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Department, DepartmentService } from '../../core/services/department.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Risk, RiskService } from '../../core/services/risk.service';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlRegistryItem, ControlsLookupOption, ControlsOverview, ControlsService } from './controls.service';

@Component({
  selector: 'app-controls-referential',
  templateUrl: './controls-referential.component.html',
  styleUrls: ['./controls-referential.component.scss']
})
export class ControlsReferentialComponent implements OnInit {
  readonly currentRole = getStoredControlsRole();
  readonly navItems = getControlsNavItems(this.currentRole);
  overview: ControlsOverview | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  selectedControl: ControlRegistryItem | null = null;
  controlTypes: ControlsLookupOption[] = [];
  frequencies: ControlsLookupOption[] = [];
  statuses: ControlsLookupOption[] = [];
  departments: Department[] = [];
  risks: Risk[] = [];

  readonly maturityOptions = [
    { value: 1, label: '1 - Initial' },
    { value: 2, label: '2 - Informel' },
    { value: 3, label: '3 - Défini' },
    { value: 4, label: '4 - Maîtrisé' },
    { value: 5, label: '5 - Optimisé' }
  ];

  controlForm = {
    code: '',
    title: '',
    description: '',
    controlType: 'preventive',
    frequency: 'quarterly',
    status: 'active',
    maturity: 3,
    departmentId: null as number | null,
    riskIds: [] as number[],
    nextReview: ''
  };

  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private router: Router,
    private controlsService: ControlsService,
    private departmentService: DepartmentService,
    private riskService: RiskService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  get canWrite(): boolean {
    return this.currentRole === UserRole.SUPER_ADMIN || this.currentRole === UserRole.CONTROLLER;
  }

  loadOverview(): void {
    this.isLoading = true;
    forkJoin({
      overview: this.controlsService.getOverview(),
      lookups: this.controlsService.getLookups(),
      departments: this.departmentService.getAll().pipe(catchError(() => of([] as Department[]))),
      risks: this.riskService.getRisks().pipe(catchError(() => of([] as Risk[])))
    }).subscribe({
      next: data => {
        this.overview = data.overview;
        this.controlTypes = data.lookups.controlTypes;
        this.frequencies = data.lookups.frequencies;
        this.statuses = data.lookups.statuses;
        this.departments = data.departments;
        this.risks = data.risks;
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement du référentiel.';
        this.overview = null;
        this.isLoading = false;
      }
    });
    this.currentPage = 1;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get registry(): ControlRegistryItem[] {
    return this.overview?.registry || [];
  }

  get paginatedRegistry(): ControlRegistryItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.registry.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
  }

  get departmentCount(): number {
    return new Set(this.registry.map(item => item.department)).size;
  }

  editControl(control: ControlRegistryItem): void {
    this.selectedControl = control;
    this.controlForm = {
      code: control.code || '',
      title: control.title || '',
      description: control.description || '',
      controlType: control.controlType || 'preventive',
      frequency: control.frequency || 'quarterly',
      status: control.status || 'active',
      maturity: control.maturity || 3,
      departmentId: control.departmentId || null,
      riskIds: control.riskIds || [],
      nextReview: control.nextReview ? control.nextReview.substring(0, 10) : ''
    };
  }

  resetForm(): void {
    this.selectedControl = null;
    this.controlForm = {
      code: '',
      title: '',
      description: '',
      controlType: 'preventive',
      frequency: 'quarterly',
      status: 'active',
      maturity: 3,
      departmentId: null,
      riskIds: [],
      nextReview: ''
    };
  }

  saveControl(): void {
    if (!this.canWrite || !this.controlForm.title.trim()) {
      this.errorMessage = 'Le titre du contrôle est obligatoire.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    const payload = {
      ...this.controlForm,
      code: this.controlForm.code.trim() || undefined,
      departmentId: this.controlForm.departmentId || null,
      riskIds: this.controlForm.riskIds.map(id => Number(id)).filter(Boolean),
      nextReview: this.controlForm.nextReview || null
    };
    const request = this.selectedControl
      ? this.controlsService.updateControl(this.selectedControl.id, payload)
      : this.controlsService.createControl(payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.resetForm();
        this.loadOverview();
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la sauvegarde du contrôle.';
        this.isSaving = false;
      }
    });
  }

  deleteControl(control: ControlRegistryItem): void {
    if (!this.canWrite || !window.confirm(`Supprimer le contrôle "${control.title}" ?`)) {
      return;
    }

    this.isSaving = true;
    this.controlsService.deleteControl(control.id).subscribe({
      next: () => {
        this.isSaving = false;
        this.loadOverview();
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la suppression du contrôle.';
        this.isSaving = false;
      }
    });
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
  }

  getRiskLabel(risk: Risk): string {
    return `${risk.titre}${risk.departement?.nom ? ' - ' + risk.departement.nom : ''}`;
  }
}
