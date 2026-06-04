import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import {
  ComplianceEvidencePayload,
  ComplianceEvidenceRecord,
  ComplianceFrameworkRecord,
  ComplianceOverview,
  CompliancePermissions,
  ComplianceRequirementRecord,
  ComplianceService,
  ComplianceUpdateItem
} from './compliance.service';

@Component({
  selector: 'app-compliance-updates',
  templateUrl: './compliance-updates.component.html',
  styleUrls: ['./compliance-updates.component.scss']
})
export class ComplianceUpdatesComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  readonly sourceTypeOptions = [
    { code: 'document', label: 'Document' },
    { code: 'audit', label: 'Audit' },
    { code: 'incident', label: 'Incident' },
    { code: 'risk', label: 'Risque' },
    { code: 'manual', label: 'Manuel' },
    { code: 'system_export', label: 'Export systeme' }
  ];

  overview: ComplianceOverview | null = null;
  frameworks: ComplianceFrameworkRecord[] = [];
  requirements: ComplianceRequirementRecord[] = [];
  evidence: ComplianceEvidenceRecord[] = [];
  permissions: CompliancePermissions | null = null;
  selectedFrameworkId: number | null = null;
  selectedEvidence: ComplianceEvidenceRecord | null = null;
  editingId: number | null = null;
  isLoading = false;
  feedback = '';
  error = '';
  form: ComplianceEvidencePayload = this.createEmptyForm();

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

  get updates(): ComplianceUpdateItem[] {
    return this.overview?.updates || [];
  }

  get visibleRequirements(): ComplianceRequirementRecord[] {
    return this.selectedFrameworkId
      ? this.requirements.filter(item => item.frameworkId === this.selectedFrameworkId)
      : this.requirements;
  }

  get filteredEvidence(): ComplianceEvidenceRecord[] {
    if (!this.selectedFrameworkId) {
      return this.evidence;
    }
    return this.evidence.filter(item => item.requirement?.frameworkId === this.selectedFrameworkId);
  }

  get highImpactUpdates(): number {
    return this.updates.filter(item => ['eleve', 'critical', 'high'].includes(String(item.impactLevel || '').toLowerCase())).length;
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';

    forkJoin({
      overview: this.complianceService.getOverview(),
      frameworks: this.complianceService.getFrameworks(),
      requirements: this.complianceService.getRequirements(),
      evidence: this.complianceService.getEvidence(),
      permissions: this.complianceService.getPermissions()
    }).subscribe({
      next: data => {
        this.overview = data.overview;
        this.frameworks = data.frameworks;
        this.requirements = data.requirements;
        this.evidence = data.evidence;
        this.permissions = data.permissions;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les mises a jour et preuves.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onFrameworkChange(): void {
    this.selectedEvidence = null;
    if (!this.visibleRequirements.some(item => item.id === this.form.requirementId)) {
      this.form.requirementId = null;
    }
  }

  selectEvidence(item: ComplianceEvidenceRecord): void {
    this.selectedEvidence = item;
  }

  editEvidence(item: ComplianceEvidenceRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de modifier les preuves.';
      return;
    }

    this.editingId = item.id;
    this.selectedEvidence = item;
    this.selectedFrameworkId = item.requirement?.frameworkId || null;
    this.form = {
      requirementId: item.requirementId,
      title: item.title,
      sourceType: item.sourceTypeCode || item.sourceType,
      sourceId: item.sourceId,
      filename: item.filename,
      filePath: item.filePath,
      mimeType: item.mimeType,
      capturedAt: this.toInputDate(item.capturedAt || item.createdAt),
      entityKey: item.entityKey
    };
    this.feedback = `Edition de la preuve ${item.title}.`;
    this.error = '';
  }

  saveEvidence(): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas d enregistrer les preuves.';
      return;
    }

    if (!this.form.title?.trim()) {
      this.error = 'Le titre de la preuve est obligatoire.';
      return;
    }

    const payload: ComplianceEvidencePayload = {
      requirementId: this.form.requirementId || null,
      title: this.form.title.trim(),
      sourceType: this.form.sourceType || 'document',
      sourceId: this.form.sourceId || null,
      filename: this.normalizeOptional(this.form.filename),
      filePath: this.normalizeOptional(this.form.filePath),
      mimeType: this.normalizeOptional(this.form.mimeType),
      capturedAt: this.normalizeOptional(this.form.capturedAt),
      entityKey: this.normalizeOptional(this.form.entityKey)
    };

    const request = this.editingId
      ? this.complianceService.updateEvidence(this.editingId, payload)
      : this.complianceService.createEvidence(payload);

    request.subscribe({
      next: () => {
        this.feedback = this.editingId ? 'Preuve mise a jour.' : 'Preuve creee.';
        this.resetForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible d enregistrer la preuve.';
      }
    });
  }

  deleteEvidence(item: ComplianceEvidenceRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de supprimer les preuves.';
      return;
    }

    if (!window.confirm(`Supprimer la preuve ${item.title} ?`)) {
      return;
    }

    this.complianceService.deleteEvidence(item.id).subscribe({
      next: () => {
        this.feedback = 'Preuve supprimee.';
        this.selectedEvidence = null;
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer la preuve.';
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.createEmptyForm();
  }

  getEvidenceFrameworkLabel(item: ComplianceEvidenceRecord): string {
    return item.requirement?.framework
      ? `${item.requirement.framework.code} - ${item.requirement.framework.name}`
      : 'Referentiel non rattache';
  }

  getEvidenceRequirementLabel(item: ComplianceEvidenceRecord): string {
    return item.requirement ? `${item.requirement.code} - ${item.requirement.title}` : 'Non rattachee';
  }

  getOwnerLabel(item: ComplianceEvidenceRecord): string {
    return item.owner ? `${item.owner.prenom || ''} ${item.owner.nom || ''}`.trim() : 'Non assigne';
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Date indisponible';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }

  private createEmptyForm(): ComplianceEvidencePayload {
    return {
      requirementId: null,
      title: '',
      sourceType: 'document',
      sourceId: null,
      filename: '',
      filePath: '',
      mimeType: '',
      capturedAt: '',
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
