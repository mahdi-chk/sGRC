import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserRole } from '../../core/models/user-role.enum';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import {
  ControlPlanningItem,
  ControlRegistryItem,
  ControlTestExecutionItem,
  ControlsLookupOption,
  ControlsOverview,
  ControlsService
} from './controls.service';

interface ControlTestHistoryItem extends ControlTestExecutionItem {
  controlId: number;
  controlCode: string;
  controlTitle: string;
  department: string;
  owner: string;
}

@Component({
  selector: 'app-controls-planning',
  templateUrl: './controls-planning.component.html',
  styleUrls: ['./controls-planning.component.scss']
})
export class ControlsPlanningComponent implements OnInit {
  readonly currentRole = getStoredControlsRole();
  readonly navItems = getControlsNavItems(this.currentRole);
  overview: ControlsOverview | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  cadenceFilter: 'all' | 'periodique' | 'ponctuel' = 'all';
  testMethods: ControlsLookupOption[] = [];
  testResults: ControlsLookupOption[] = [];
  editingTestId: number | null = null;

  testForm = {
    controlId: null as number | null,
    title: '',
    testMethod: 'manual_review',
    result: 'planned',
    plannedDate: '',
    executedAt: '',
    score: 0,
    notes: '',
    evidenceSummary: ''
  };

  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private router: Router,
    private controlsService: ControlsService
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
      lookups: this.controlsService.getLookups()
    }).subscribe({
      next: data => {
        this.overview = data.overview;
        this.testMethods = data.lookups.testMethods;
        this.testResults = data.lookups.testResults;
        if (!this.testForm.controlId && this.overview.registry.length > 0) {
          this.testForm.controlId = this.overview.registry[0].id;
        }
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement de la planification.';
        this.overview = null;
        this.isLoading = false;
      }
    });

    this.currentPage = 1;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get planning(): ControlPlanningItem[] {
    const items = this.overview?.planning || [];

    if (this.cadenceFilter === 'all') {
      return items;
    }

    return items.filter(item => item.cadence === this.cadenceFilter);
  }

  get controls(): ControlRegistryItem[] {
    return this.overview?.registry || [];
  }

  get testHistory(): ControlTestHistoryItem[] {
    return this.controls
      .reduce<ControlTestHistoryItem[]>((items, control) => items.concat((control.tests || []).map(test => ({
        ...test,
        controlId: control.id,
        controlCode: control.code,
        controlTitle: control.title,
        department: control.department,
        owner: control.owner
      }))), [])
      .sort((first, second) => {
        const firstDate = first.executedAt || first.plannedDate || '';
        const secondDate = second.executedAt || second.plannedDate || '';
        return new Date(secondDate).getTime() - new Date(firstDate).getTime();
      });
  }

  get paginatedPlanning(): ControlPlanningItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.planning.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
  }

  setCadenceFilter(value: 'all' | 'periodique' | 'ponctuel'): void {
    this.cadenceFilter = value;
    this.currentPage = 1;
  }

  createTest(): void {
    if (!this.canWrite || !this.testForm.controlId) {
      this.errorMessage = 'Sélectionnez un contrôle à tester.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    const payload = {
      ...this.testForm,
      title: this.testForm.title || 'Test d efficacité du contrôle',
      plannedDate: this.testForm.plannedDate || null,
      executedAt: this.testForm.executedAt || null
    };
    const request = this.editingTestId
      ? this.controlsService.updateControlTest(this.editingTestId, payload)
      : this.controlsService.createControlTest(this.testForm.controlId, payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.resetTestForm(this.testForm.controlId);
        this.loadOverview();
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la sauvegarde du test.';
        this.isSaving = false;
      }
    });
  }

  editTest(test: ControlTestHistoryItem): void {
    if (!this.canWrite) {
      return;
    }

    this.editingTestId = test.id;
    this.testForm = {
      controlId: test.controlId,
      title: test.title || '',
      testMethod: test.testMethod || 'manual_review',
      result: test.result || 'planned',
      plannedDate: test.plannedDate ? test.plannedDate.substring(0, 10) : '',
      executedAt: test.executedAt ? test.executedAt.substring(0, 10) : '',
      score: test.score || 0,
      notes: test.notes || '',
      evidenceSummary: test.evidenceSummary || ''
    };
  }

  cancelTestEdit(): void {
    this.resetTestForm(this.testForm.controlId);
  }

  deleteTest(test: ControlTestHistoryItem): void {
    if (!this.canWrite || !window.confirm(`Supprimer le test "${test.title}" ?`)) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.controlsService.deleteControlTest(test.id).subscribe({
      next: () => {
        this.isSaving = false;
        if (this.editingTestId === test.id) {
          this.resetTestForm(test.controlId);
        }
        this.loadOverview();
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la suppression du test.';
        this.isSaving = false;
      }
    });
  }

  get auditCount(): number {
    return (this.overview?.planning || []).filter(item => item.scheduleType === 'audit').length;
  }

  get controlCount(): number {
    return (this.overview?.planning || []).filter(item => item.scheduleType === 'controle').length;
  }

  get periodicCount(): number {
    return (this.overview?.planning || []).filter(item => item.cadence === 'periodique').length;
  }

  get ponctualCount(): number {
    return (this.overview?.planning || []).filter(item => item.cadence === 'ponctuel').length;
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifié';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
  }

  getTestMethodLabel(value: string | null | undefined): string {
    return this.testMethods.find(item => item.code === value)?.label || value || 'Non renseignée';
  }

  getTestResultLabel(value: string | null | undefined): string {
    return this.testResults.find(item => item.code === value)?.label || value || 'Non renseigné';
  }

  getTestResultClass(value: string | null | undefined): string {
    if (value === 'effective') {
      return 'state-maitrise';
    }

    if (value === 'ineffective') {
      return 'state-en-retard';
    }

    if (value === 'partially_effective') {
      return 'state-medium';
    }

    return 'state-a-revoir';
  }

  private resetTestForm(controlId: number | null): void {
    this.editingTestId = null;
    this.testForm = {
      controlId,
      title: '',
      testMethod: 'manual_review',
      result: 'planned',
      plannedDate: '',
      executedAt: '',
      score: 0,
      notes: '',
      evidenceSummary: ''
    };
  }
}
