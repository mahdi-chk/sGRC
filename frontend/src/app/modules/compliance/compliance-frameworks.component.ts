import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import {
  ComplianceFrameworkPayload,
  ComplianceFrameworkRecord,
  ComplianceRequirementImportResult,
  ComplianceRequirementPayload,
  ComplianceRequirementRecord,
  ComplianceService
} from './compliance.service';

@Component({
  selector: 'app-compliance-frameworks',
  templateUrl: './compliance-frameworks.component.html',
  styleUrls: ['./compliance-frameworks.component.scss']
})
export class ComplianceFrameworksComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());

  frameworks: ComplianceFrameworkRecord[] = [];
  requirements: ComplianceRequirementRecord[] = [];
  isLoading = false;
  isImporting = false;

  reqCurrentPage = 1;
  reqItemsPerPage = 10;

  selectedFrameworkId: number | null = null;
  frameworkEditingId: number | null = null;
  requirementEditingId: number | null = null;
  importFileName = '';
  importResult: ComplianceRequirementImportResult | null = null;
  feedback = '';
  error = '';
  frameworkForm: ComplianceFrameworkPayload = this.createEmptyFrameworkForm();
  requirementForm: ComplianceRequirementPayload = this.createEmptyRequirementForm();

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadFrameworks();
  }

  get selectedFramework(): ComplianceFrameworkRecord | null {
    return this.frameworks.find(item => item.id === this.selectedFrameworkId) || null;
  }

  loadFrameworks(): void {
    this.isLoading = true;
    this.error = '';

    this.complianceService.getFrameworks().subscribe({
      next: frameworks => {
        this.frameworks = frameworks;

        if (this.selectedFrameworkId && !frameworks.some(item => item.id === this.selectedFrameworkId)) {
          this.selectedFrameworkId = null;
        }

        if (!this.selectedFrameworkId && frameworks.length > 0) {
          this.selectedFrameworkId = frameworks[0].id;
        }

        this.loadRequirements();
        this.isLoading = false;
      },
      error: err => {
        this.frameworks = [];
        this.requirements = [];
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les referentiels.';
      }
    });
  }

  loadRequirements(): void {
    if (!this.selectedFrameworkId) {
      this.requirements = [];
      this.importResult = null;
      return;
    }

    this.complianceService.getRequirements(this.selectedFrameworkId).subscribe({
      next: items => {
        this.requirements = items;
        this.reqCurrentPage = 1;
      },
      error: err => {
        this.requirements = [];
        this.error = err?.error?.message || 'Impossible de charger les exigences.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/compliance']);
  }

  get paginatedRequirements(): ComplianceRequirementRecord[] {
    const startIndex = (this.reqCurrentPage - 1) * this.reqItemsPerPage;
    return this.requirements.slice(startIndex, startIndex + this.reqItemsPerPage);
  }

  onReqPageChanged(event: {page: number, pageSize: number}) {
    this.reqCurrentPage = event.page;
    this.reqItemsPerPage = event.pageSize;
  }

  selectFramework(frameworkId: number | null): void {
    this.selectedFrameworkId = frameworkId;
    this.importResult = null;
    this.importFileName = '';
    this.resetFrameworkForm();
    this.resetRequirementForm();
    this.loadRequirements();
  }

  editFramework(item: ComplianceFrameworkRecord): void {
    this.frameworkEditingId = item.id;
    this.frameworkForm = {
      code: item.code,
      name: item.name,
      version: item.version,
      jurisdiction: item.jurisdiction,
      description: item.description,
      entityKey: item.entityKey,
      status: item.statusCode || item.status,
      effectiveDate: this.toInputDate(item.effectiveDate),
      reviewDate: this.toInputDate(item.reviewDate)
    };
    this.feedback = `Edition du cadre ${item.code}.`;
    this.error = '';
  }

  saveFramework(): void {
    if (!this.frameworkEditingId) {
      this.error = 'Selectionnez un cadre a modifier.';
      return;
    }

    if (!this.frameworkForm.code?.trim() || !this.frameworkForm.name?.trim() || !this.frameworkForm.version?.trim()) {
      this.error = 'Le code, le nom et la version du cadre sont obligatoires.';
      return;
    }

    const payload: ComplianceFrameworkPayload = {
      code: this.frameworkForm.code.trim(),
      name: this.frameworkForm.name.trim(),
      version: this.frameworkForm.version.trim(),
      jurisdiction: this.normalizeOptional(this.frameworkForm.jurisdiction),
      description: this.normalizeOptional(this.frameworkForm.description),
      entityKey: this.normalizeOptional(this.frameworkForm.entityKey),
      effectiveDate: this.normalizeOptional(this.frameworkForm.effectiveDate),
      reviewDate: this.normalizeOptional(this.frameworkForm.reviewDate),
      status: this.frameworkForm.status || 'draft'
    };

    this.error = '';
    this.feedback = '';

    this.complianceService.updateFramework(this.frameworkEditingId, payload).subscribe({
      next: () => {
        this.feedback = 'Cadre mis a jour.';
        this.resetFrameworkForm();
        this.loadFrameworks();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de mettre a jour le cadre.';
      }
    });
  }

  deleteFramework(item: ComplianceFrameworkRecord): void {
    if (!window.confirm(`Supprimer le referentiel ${item.code} et ses exigences ?`)) {
      return;
    }

    this.complianceService.deleteFramework(item.id).subscribe({
      next: () => {
        this.feedback = 'Referentiel supprime.';
        this.loadFrameworks();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer le referentiel.';
      }
    });
  }

  editRequirement(item: ComplianceRequirementRecord): void {
    this.requirementEditingId = item.id;
    this.requirementForm = {
      frameworkId: item.frameworkId,
      code: item.code,
      title: item.title,
      description: item.description,
      chapter: item.chapter,
      orderIndex: item.orderIndex,
      applicability: item.applicabilityCode || item.applicability,
      status: item.statusCode || item.status,
      weight: item.weight
    };
    this.feedback = `Edition de l exigence ${item.code}.`;
    this.error = '';
  }

  saveRequirement(): void {
    if (!this.requirementEditingId || !this.selectedFrameworkId) {
      this.error = 'Selectionnez une exigence a modifier.';
      return;
    }

    if (!this.requirementForm.code?.trim() || !this.requirementForm.title?.trim()) {
      this.error = 'Le code et le titre de l exigence sont obligatoires.';
      return;
    }

    const payload: ComplianceRequirementPayload = {
      frameworkId: this.selectedFrameworkId,
      code: this.requirementForm.code.trim(),
      title: this.requirementForm.title.trim(),
      description: this.normalizeOptional(this.requirementForm.description),
      chapter: this.normalizeOptional(this.requirementForm.chapter),
      orderIndex: Number(this.requirementForm.orderIndex || 0),
      applicability: this.requirementForm.applicability || 'applicable',
      status: this.requirementForm.status || 'active',
      weight: Number(this.requirementForm.weight || 1)
    };

    this.error = '';
    this.feedback = '';

    this.complianceService.updateRequirement(this.requirementEditingId, payload).subscribe({
      next: () => {
        this.feedback = 'Exigence mise a jour.';
        this.resetRequirementForm();
        this.loadRequirements();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de mettre a jour l exigence.';
      }
    });
  }

  deleteRequirement(item: ComplianceRequirementRecord): void {
    if (!window.confirm(`Supprimer l exigence ${item.code} ?`)) {
      return;
    }

    this.complianceService.deleteRequirement(item.id).subscribe({
      next: () => {
        this.feedback = 'Exigence supprimee.';
        this.loadRequirements();
        this.loadFrameworks();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer l exigence.';
      }
    });
  }

  resetFrameworkForm(): void {
    this.frameworkEditingId = null;
    this.frameworkForm = this.createEmptyFrameworkForm();
  }

  resetRequirementForm(): void {
    this.requirementEditingId = null;
    this.requirementForm = this.createEmptyRequirementForm();
  }

  onImportFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0] || null;
    this.importFileName = file?.name || '';
    this.importResult = null;
    this.error = '';
  }

  importRequirements(input: HTMLInputElement): void {
    const file = input.files?.[0];
    if (!file) {
      this.error = 'Selectionnez un document a importer.';
      return;
    }

    this.isImporting = true;
    this.error = '';
    this.feedback = '';
    this.importResult = null;

    this.complianceService.importRequirements(file).subscribe({
      next: result => {
        this.isImporting = false;
        this.importResult = result;
        this.selectedFrameworkId = result.frameworkId;
        this.feedback = result.message || 'Import termine.';
        input.value = '';
        this.importFileName = '';
        this.loadFrameworks();
      },
      error: err => {
        this.isImporting = false;
        this.error = err?.error?.message || 'Impossible d importer le document.';
      }
    });
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Non planifie';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }

  private createEmptyFrameworkForm(): ComplianceFrameworkPayload {
    return {
      code: '',
      name: '',
      version: '',
      jurisdiction: '',
      description: '',
      entityKey: '',
      status: 'draft',
      effectiveDate: '',
      reviewDate: ''
    };
  }

  private createEmptyRequirementForm(): ComplianceRequirementPayload {
    return {
      frameworkId: 0,
      code: '',
      title: '',
      description: '',
      chapter: '',
      orderIndex: 0,
      applicability: 'applicable',
      status: 'active',
      weight: 1
    };
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    return value && value.trim() ? value.trim() : null;
  }

  private toInputDate(value: string | null | undefined): string | null {
    return value ? new Date(value).toISOString().slice(0, 10) : null;
  }
}
