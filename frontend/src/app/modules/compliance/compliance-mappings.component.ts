import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import {
  ComplianceFrameworkRecord,
  ComplianceLinkableOption,
  ComplianceLinkableSources,
  ComplianceMappingPayload,
  ComplianceMappingRecord,
  ComplianceRequirementRecord,
  ComplianceService
} from './compliance.service';

type SourceType = 'risk' | 'audit' | 'incident';

@Component({
  selector: 'app-compliance-mappings',
  templateUrl: './compliance-mappings.component.html',
  styleUrls: ['./compliance-mappings.component.scss']
})
export class ComplianceMappingsComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  readonly sourceTypes: SourceType[] = ['risk', 'audit', 'incident'];

  frameworks: ComplianceFrameworkRecord[] = [];
  requirements: ComplianceRequirementRecord[] = [];
  mappings: ComplianceMappingRecord[] = [];
  linkableSources: ComplianceLinkableSources = { risk: [], audit: [], incident: [] };

  isLoading = false;
  isSaving = false;
  selectedFrameworkId: number | null = null;
  mappingEditingId: number | null = null;
  feedback = '';
  error = '';

  mappingForm: ComplianceMappingPayload = this.createEmptyMappingForm();

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';

    this.complianceService.getFrameworks().subscribe({
      next: frameworks => {
        this.frameworks = frameworks;
        if (!this.selectedFrameworkId && frameworks.length > 0) {
          this.selectedFrameworkId = frameworks[0].id;
          this.mappingForm.requirementId = 0;
        }

        this.loadRequirements();
        this.loadMappings();
        this.loadLinkableSources();
        this.isLoading = false;
      },
      error: err => {
        this.frameworks = [];
        this.requirements = [];
        this.mappings = [];
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les donnees de mapping.';
      }
    });
  }

  loadRequirements(): void {
    if (!this.selectedFrameworkId) {
      this.requirements = [];
      return;
    }

    this.complianceService.getRequirements(this.selectedFrameworkId).subscribe({
      next: items => {
        this.requirements = items;
        if (!items.some(item => item.id === this.mappingForm.requirementId)) {
          this.mappingForm.requirementId = 0;
        }
      },
      error: err => {
        this.requirements = [];
        this.error = err?.error?.message || 'Impossible de charger les exigences.';
      }
    });
  }

  loadMappings(): void {
    this.complianceService.getMappings().subscribe({
      next: items => {
        this.mappings = items;
      },
      error: err => {
        this.mappings = [];
        this.error = err?.error?.message || 'Impossible de charger les mappings.';
      }
    });
  }

  loadLinkableSources(): void {
    this.complianceService.getLinkableSources().subscribe({
      next: items => {
        this.linkableSources = items;
      },
      error: err => {
        this.linkableSources = { risk: [], audit: [], incident: [] };
        this.error = err?.error?.message || 'Impossible de charger les sources reelles.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/compliance']);
  }

  onFrameworkChange(): void {
    this.mappingForm.requirementId = 0;
    this.loadRequirements();
  }

  onSourceTypeChange(): void {
    this.mappingForm.sourceId = null;
  }

  saveMapping(): void {
    if (!this.mappingForm.requirementId) {
      this.error = 'Selectionnez une exigence a couvrir.';
      return;
    }

    if (!this.mappingForm.sourceType || !this.mappingForm.sourceId) {
      this.error = 'Selectionnez une source reelle a lier.';
      return;
    }

    this.isSaving = true;
    this.error = '';
    this.feedback = '';

    const payload: ComplianceMappingPayload = {
      requirementId: Number(this.mappingForm.requirementId),
      sourceType: this.mappingForm.sourceType,
      sourceId: this.mappingForm.sourceId ? Number(this.mappingForm.sourceId) : null,
      relatedEntityKey: this.normalizeOptional(this.mappingForm.relatedEntityKey),
      coverageLevel: this.mappingForm.coverageLevel || 'partial',
      rationale: this.normalizeOptional(this.mappingForm.rationale),
      entityKey: this.normalizeOptional(this.mappingForm.entityKey)
    };

    const request$ = this.mappingEditingId
      ? this.complianceService.updateMapping(this.mappingEditingId, payload)
      : this.complianceService.createMapping(payload);

    request$.subscribe({
      next: () => {
        this.feedback = this.mappingEditingId ? 'Mapping mis a jour.' : 'Mapping cree.';
        this.resetForm();
        this.loadMappings();
        this.isSaving = false;
      },
      error: err => {
        this.isSaving = false;
        this.error = err?.error?.message || 'Impossible d enregistrer le mapping.';
      }
    });
  }

  editMapping(item: ComplianceMappingRecord): void {
    const requirement = item.requirement;
    if (requirement?.frameworkId) {
      this.selectedFrameworkId = requirement.frameworkId;
      this.loadRequirements();
    }

    this.mappingEditingId = item.id;
    this.mappingForm = {
      requirementId: item.requirementId,
      sourceType: item.sourceTypeCode || item.sourceType,
      sourceId: item.sourceId,
      relatedEntityKey: item.relatedEntityKey,
      coverageLevel: item.coverageLevelCode || item.coverageLevel,
      rationale: item.rationale,
      entityKey: item.entityKey
    };
    this.feedback = `Edition du mapping #${item.id}.`;
    this.error = '';
  }

  deleteMapping(item: ComplianceMappingRecord): void {
    if (!window.confirm(`Supprimer le mapping #${item.id} ?`)) {
      return;
    }

    this.complianceService.deleteMapping(item.id).subscribe({
      next: () => {
        this.feedback = 'Mapping supprime.';
        if (this.mappingEditingId === item.id) {
          this.resetForm();
        }
        this.loadMappings();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer le mapping.';
      }
    });
  }

  resetForm(): void {
    this.mappingEditingId = null;
    this.mappingForm = this.createEmptyMappingForm();
  }

  getSourceOptions(type: string | undefined): ComplianceLinkableOption[] {
    if (!type) {
      return [];
    }

    return this.linkableSources[type as SourceType] || [];
  }

  getSourceLabel(item: ComplianceMappingRecord): string {
    const option = this.getSourceOptions(item.sourceType).find(source => source.id === item.sourceId);
    if (!option && item.sourceTypeCode) {
      const fallback = this.getSourceOptions(item.sourceTypeCode).find(source => source.id === item.sourceId);
      return fallback?.label || `Element #${item.sourceId || 'n/a'}`;
    }
    return option?.label || `Element #${item.sourceId || 'n/a'}`;
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }

  private createEmptyMappingForm(): ComplianceMappingPayload {
    return {
      requirementId: 0,
      sourceType: 'risk',
      sourceId: null,
      relatedEntityKey: '',
      coverageLevel: 'partial',
      rationale: '',
      entityKey: ''
    };
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    return value && value.trim() ? value.trim() : null;
  }
}
