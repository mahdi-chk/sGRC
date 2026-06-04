import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import {
  ComplianceFrameworkRecord,
  ComplianceGapPayload,
  ComplianceGapRecord,
  CompliancePermissions,
  ComplianceRequirementRecord,
  ComplianceService
} from './compliance.service';

@Component({
  selector: 'app-compliance-gaps',
  templateUrl: './compliance-gaps.component.html',
  styleUrls: ['./compliance-gaps.component.scss']
})
export class ComplianceGapsComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  readonly severityOptions = [
    { code: 'low', label: 'Faible' },
    { code: 'medium', label: 'Moyen' },
    { code: 'high', label: 'Eleve' },
    { code: 'critical', label: 'Critique' }
  ];
  readonly statusOptions = [
    { code: 'open', label: 'Ouvert' },
    { code: 'in_progress', label: 'En cours' },
    { code: 'mitigated', label: 'Mitige' },
    { code: 'closed', label: 'Clos' }
  ];
  readonly sourceTypeOptions = [
    { code: 'assessment', label: 'Evaluation' },
    { code: 'audit', label: 'Audit' },
    { code: 'incident', label: 'Incident' },
    { code: 'manual', label: 'Manuel' }
  ];

  frameworks: ComplianceFrameworkRecord[] = [];
  requirements: ComplianceRequirementRecord[] = [];
  gaps: ComplianceGapRecord[] = [];
  permissions: CompliancePermissions | null = null;
  selectedFrameworkId: number | null = null;
  selectedGap: ComplianceGapRecord | null = null;
  editingId: number | null = null;
  isLoading = false;
  feedback = '';
  error = '';
  form: ComplianceGapPayload = this.createEmptyForm();

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get canManage(): boolean {
    return !!this.permissions?.canManageMappings;
  }

  get visibleRequirements(): ComplianceRequirementRecord[] {
    return this.selectedFrameworkId
      ? this.requirements.filter(item => item.frameworkId === this.selectedFrameworkId)
      : this.requirements;
  }

  get filteredGaps(): ComplianceGapRecord[] {
    if (!this.selectedFrameworkId) {
      return this.gaps;
    }
    return this.gaps.filter(item => item.requirement?.frameworkId === this.selectedFrameworkId);
  }

  get openCount(): number {
    return this.filteredGaps.filter(item => (item.statusCode || item.status) !== 'closed').length;
  }

  get criticalCount(): number {
    return this.filteredGaps.filter(item => ['critical', 'high'].includes(item.severityCode || item.severity)).length;
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';

    forkJoin({
      frameworks: this.complianceService.getFrameworks(),
      requirements: this.complianceService.getRequirements(),
      gaps: this.complianceService.getGaps(),
      permissions: this.complianceService.getPermissions()
    }).subscribe({
      next: data => {
        this.frameworks = data.frameworks;
        this.requirements = data.requirements;
        this.gaps = data.gaps;
        this.permissions = data.permissions;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les ecarts.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onFrameworkChange(): void {
    this.selectedGap = null;
    if (!this.visibleRequirements.some(item => item.id === this.form.requirementId)) {
      this.form.requirementId = null;
    }
  }

  selectGap(item: ComplianceGapRecord): void {
    this.selectedGap = item;
  }

  editGap(item: ComplianceGapRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de modifier les ecarts.';
      return;
    }

    this.editingId = item.id;
    this.selectedGap = item;
    this.selectedFrameworkId = item.requirement?.frameworkId || null;
    this.form = {
      requirementId: item.requirementId,
      title: item.title,
      description: item.description,
      severity: item.severityCode || item.severity,
      status: item.statusCode || item.status,
      sourceType: item.sourceTypeCode || item.sourceType,
      sourceId: item.sourceId,
      dueDate: this.toInputDate(item.dueDate),
      remediationActionId: item.remediationActionId,
      entityKey: item.entityKey
    };
    this.feedback = `Edition de l ecart ${item.title}.`;
    this.error = '';
  }

  saveGap(): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas d enregistrer les ecarts.';
      return;
    }

    if (!this.form.title?.trim()) {
      this.error = 'Le titre de l ecart est obligatoire.';
      return;
    }

    const payload: ComplianceGapPayload = {
      requirementId: this.form.requirementId || null,
      title: this.form.title.trim(),
      description: this.normalizeOptional(this.form.description),
      severity: this.form.severity || 'medium',
      status: this.form.status || 'open',
      sourceType: this.form.sourceType || 'manual',
      sourceId: this.form.sourceId || null,
      dueDate: this.normalizeOptional(this.form.dueDate),
      remediationActionId: this.normalizeOptional(this.form.remediationActionId),
      entityKey: this.normalizeOptional(this.form.entityKey)
    };

    const request = this.editingId
      ? this.complianceService.updateGap(this.editingId, payload)
      : this.complianceService.createGap(payload);

    request.subscribe({
      next: () => {
        this.feedback = this.editingId ? 'Ecart mis a jour.' : 'Ecart cree.';
        this.resetForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible d enregistrer l ecart.';
      }
    });
  }

  deleteGap(item: ComplianceGapRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de supprimer les ecarts.';
      return;
    }

    if (!window.confirm(`Supprimer l ecart ${item.title} ?`)) {
      return;
    }

    this.complianceService.deleteGap(item.id).subscribe({
      next: () => {
        this.feedback = 'Ecart supprime.';
        this.selectedGap = null;
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer l ecart.';
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.createEmptyForm();
  }

  getRequirementLabel(item: ComplianceGapRecord): string {
    return item.requirement ? `${item.requirement.code} - ${item.requirement.title}` : 'Non rattache';
  }

  getFrameworkLabel(item: ComplianceGapRecord): string {
    return item.requirement?.framework
      ? `${item.requirement.framework.code} - ${item.requirement.framework.name}`
      : 'Referentiel non rattache';
  }

  getOwnerLabel(item: ComplianceGapRecord): string {
    return item.owner ? `${item.owner.prenom || ''} ${item.owner.nom || ''}`.trim() : 'Non assigne';
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Sans echeance';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }

  private createEmptyForm(): ComplianceGapPayload {
    return {
      requirementId: null,
      title: '',
      description: '',
      severity: 'medium',
      status: 'open',
      sourceType: 'manual',
      sourceId: null,
      dueDate: '',
      remediationActionId: '',
      entityKey: ''
    };
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    return value && value.trim() ? value.trim() : null;
  }

  private toInputDate(value: string | null | undefined): string | null {
    return value ? new Date(value).toISOString().slice(0, 10) : null;
  }
}
