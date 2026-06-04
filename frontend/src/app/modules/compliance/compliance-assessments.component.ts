import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import {
  ComplianceCampaignPayload,
  ComplianceCampaignRecord,
  ComplianceFrameworkRecord,
  CompliancePermissions,
  ComplianceService
} from './compliance.service';

@Component({
  selector: 'app-compliance-assessments',
  templateUrl: './compliance-assessments.component.html',
  styleUrls: ['./compliance-assessments.component.scss']
})
export class ComplianceAssessmentsComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  readonly statusOptions = [
    { code: 'draft', label: 'Brouillon' },
    { code: 'in_progress', label: 'En cours' },
    { code: 'completed', label: 'Terminee' },
    { code: 'cancelled', label: 'Annulee' }
  ];

  frameworks: ComplianceFrameworkRecord[] = [];
  campaigns: ComplianceCampaignRecord[] = [];
  permissions: CompliancePermissions | null = null;
  selectedFrameworkId: number | null = null;
  editingId: number | null = null;
  isLoading = false;
  feedback = '';
  error = '';
  currentPage = 1;
  itemsPerPage = 10;
  form: ComplianceCampaignPayload = this.createEmptyForm();

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

  get filteredCampaigns(): ComplianceCampaignRecord[] {
    return this.selectedFrameworkId
      ? this.campaigns.filter(item => item.frameworkId === this.selectedFrameworkId)
      : this.campaigns;
  }

  get paginatedCampaigns(): ComplianceCampaignRecord[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCampaigns.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get selectedFramework(): ComplianceFrameworkRecord | null {
    return this.frameworks.find(item => item.id === this.selectedFrameworkId) || null;
  }

  get inProgressCount(): number {
    return this.filteredCampaigns.filter(item => (item.statusCode || item.status) === 'in_progress').length;
  }

  get completedCount(): number {
    return this.filteredCampaigns.filter(item => (item.statusCode || item.status) === 'completed').length;
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';

    forkJoin({
      frameworks: this.complianceService.getFrameworks(),
      campaigns: this.complianceService.getCampaigns(),
      permissions: this.complianceService.getPermissions()
    }).subscribe({
      next: data => {
        this.frameworks = data.frameworks;
        this.campaigns = data.campaigns;
        this.permissions = data.permissions;
        if (!this.selectedFrameworkId && this.frameworks.length > 0) {
          this.selectedFrameworkId = this.frameworks[0].id;
          this.form.frameworkId = this.selectedFrameworkId;
        }
        this.currentPage = 1;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les auto-evaluations.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onFrameworkChange(): void {
    this.currentPage = 1;
    if (!this.editingId) {
      this.form.frameworkId = this.selectedFrameworkId || 0;
    }
  }

  editCampaign(item: ComplianceCampaignRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de modifier les campagnes.';
      return;
    }

    this.editingId = item.id;
    this.form = {
      frameworkId: item.frameworkId,
      title: item.title,
      status: item.statusCode || item.status,
      assignedUserId: item.assignedUserId,
      dueDate: this.toInputDate(item.dueDate),
      startedAt: this.toInputDate(item.startedAt),
      completedAt: this.toInputDate(item.completedAt),
      entityKey: item.entityKey
    };
    this.selectedFrameworkId = item.frameworkId;
    this.feedback = `Edition de la campagne ${item.title}.`;
    this.error = '';
  }

  saveCampaign(): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas d enregistrer une campagne.';
      return;
    }

    if (!this.form.frameworkId || !this.form.title?.trim()) {
      this.error = 'Le referentiel et le titre sont obligatoires.';
      return;
    }

    const payload: ComplianceCampaignPayload = {
      frameworkId: Number(this.form.frameworkId),
      title: this.form.title.trim(),
      status: this.form.status || 'draft',
      assignedUserId: this.form.assignedUserId || null,
      dueDate: this.normalizeOptional(this.form.dueDate),
      startedAt: this.normalizeOptional(this.form.startedAt),
      completedAt: this.normalizeOptional(this.form.completedAt),
      entityKey: this.normalizeOptional(this.form.entityKey)
    };

    const request = this.editingId
      ? this.complianceService.updateCampaign(this.editingId, payload)
      : this.complianceService.createCampaign(payload);

    request.subscribe({
      next: () => {
        this.feedback = this.editingId ? 'Campagne mise a jour.' : 'Campagne creee.';
        this.resetForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible d enregistrer la campagne.';
      }
    });
  }

  deleteCampaign(item: ComplianceCampaignRecord): void {
    if (!this.canManage) {
      this.error = 'Votre profil ne permet pas de supprimer les campagnes.';
      return;
    }

    if (!window.confirm(`Supprimer la campagne ${item.title} ?`)) {
      return;
    }

    this.complianceService.deleteCampaign(item.id).subscribe({
      next: () => {
        this.feedback = 'Campagne supprimee.';
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message || 'Impossible de supprimer la campagne.';
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.createEmptyForm();
    this.form.frameworkId = this.selectedFrameworkId || 0;
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
  }

  getFrameworkLabel(item: ComplianceCampaignRecord): string {
    return item.framework ? `${item.framework.code} - ${item.framework.name}` : 'Referentiel non rattache';
  }

  getOwnerLabel(item: ComplianceCampaignRecord): string {
    return this.personLabel(item.owner) || 'Non assigne';
  }

  getAssigneeLabel(item: ComplianceCampaignRecord): string {
    return this.personLabel(item.assignee) || 'Non assigne';
  }

  getCompletion(item: ComplianceCampaignRecord): number {
    const status = item.statusCode || item.status;
    if (status === 'completed') {
      return 100;
    }
    if (status === 'in_progress') {
      return 60;
    }
    if (status === 'cancelled') {
      return 0;
    }
    return 10;
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toLocaleDateString('fr-FR') : 'Sans echeance';
  }

  getStatusClass(value: string): string {
    return `state-${String(value || '').replace(/[\s-]+/g, '_')}`;
  }

  private createEmptyForm(): ComplianceCampaignPayload {
    return {
      frameworkId: this.selectedFrameworkId || 0,
      title: '',
      status: 'draft',
      assignedUserId: null,
      dueDate: '',
      startedAt: '',
      completedAt: '',
      entityKey: ''
    };
  }

  private personLabel(person?: { prenom?: string; nom?: string } | null): string {
    return person ? `${person.prenom || ''} ${person.nom || ''}`.trim() : '';
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    return value && value.trim() ? value.trim() : null;
  }

  private toInputDate(value: string | null | undefined): string | null {
    return value ? new Date(value).toISOString().slice(0, 10) : null;
  }
}
