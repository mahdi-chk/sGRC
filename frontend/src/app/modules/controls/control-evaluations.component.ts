import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserRole } from '../../core/models/user-role.enum';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import {
  ControlDeficiency,
  ControlEvaluationCampaign,
  ControlEvaluationComponentRef,
  ControlEvaluationLookupOption,
  ControlEvaluationsService,
  ControlPrincipleAssessment
} from './control-evaluations.service';

@Component({
  selector: 'app-control-evaluations',
  templateUrl: './control-evaluations.component.html',
  styleUrls: ['./control-evaluations.component.scss']
})
export class ControlEvaluationsComponent implements OnInit {
  readonly currentRole = getStoredControlsRole();
  readonly navItems = getControlsNavItems(this.currentRole);
  campaigns: ControlEvaluationCampaign[] = [];
  selectedCampaign: ControlEvaluationCampaign | null = null;
  referenceComponents: ControlEvaluationComponentRef[] = [];
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  statusOptions: ControlEvaluationLookupOption[] = [];
  objectiveOptions: ControlEvaluationLookupOption[] = [];
  scopeOptions: ControlEvaluationLookupOption[] = [];
  answerOptions: ControlEvaluationLookupOption[] = [];
  resultOptions: ControlEvaluationLookupOption[] = [];
  severityOptions: ControlEvaluationLookupOption[] = [];

  campaignForm = {
    title: '',
    objectiveType: 'combined',
    scopeType: 'entity',
    scopeLabel: '',
    dueDate: '',
    riskTolerance: ''
  };

  campaignEditForm = {
    title: '',
    objectiveType: 'combined',
    scopeType: 'entity',
    scopeLabel: '',
    dueDate: '',
    riskTolerance: '',
    status: 'draft'
  };

  deficiencyForm = {
    assessmentId: null as number | null,
    title: '',
    severity: 'medium',
    isMajor: false,
    impact: '',
    correctiveAction: '',
    dueDate: ''
  };

  evidenceForm = {
    assessmentId: null as number | null,
    deficiencyId: null as number | null,
    title: '',
    sourceType: 'manual',
    file: null as File | null
  };

  measureForm = {
    deficiencyId: null as number | null,
    title: '',
    description: '',
    status: 'proposed',
    dueDate: '',
    effectivenessNote: ''
  };

  constructor(
    private router: Router,
    private evaluationsService: ControlEvaluationsService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  get canWrite(): boolean {
    return this.currentRole === UserRole.CONTROLLER || this.currentRole === UserRole.SUPER_ADMIN;
  }

  get canContribute(): boolean {
    return this.canWrite || this.currentRole === UserRole.RISK_MANAGER;
  }

  get canValidate(): boolean {
    return this.currentRole === UserRole.TOP_MANAGEMENT || this.currentRole === UserRole.SUPER_ADMIN;
  }

  get assessments(): ControlPrincipleAssessment[] {
    return (this.selectedCampaign?.assessments || []).slice().sort((a, b) => {
      const componentDelta = (a.component?.orderIndex || 0) - (b.component?.orderIndex || 0);
      return componentDelta !== 0 ? componentDelta : (a.principle?.orderIndex || 0) - (b.principle?.orderIndex || 0);
    });
  }

  get deficiencies(): ControlDeficiency[] {
    return this.selectedCampaign?.deficiencies || [];
  }

  get evidenceCount(): number {
    return this.selectedCampaign?.evidence?.length || 0;
  }

  get componentCount(): number {
    return this.referenceComponents.length;
  }

  get principleCount(): number {
    return this.referenceComponents.reduce((total, component) => total + (component.principles?.length || 0), 0);
  }

  loadInitialData(): void {
    this.isLoading = true;
    forkJoin({
      campaigns: this.evaluationsService.getCampaigns(),
      reference: this.evaluationsService.getReference(),
      status: this.evaluationsService.getLookup('controlEvaluationCampaign.status'),
      objectives: this.evaluationsService.getLookup('controlEvaluationCampaign.objectiveType'),
      scopes: this.evaluationsService.getLookup('controlEvaluationCampaign.scopeType'),
      answers: this.evaluationsService.getLookup('controlPrincipleAssessment.implementationAnswer'),
      results: this.evaluationsService.getLookup('controlPrincipleAssessment.result'),
      severities: this.evaluationsService.getLookup('controlDeficiency.severity')
    }).subscribe({
      next: data => {
        this.campaigns = data.campaigns;
        this.referenceComponents = data.reference.components || [];
        this.statusOptions = data.status;
        this.objectiveOptions = data.objectives;
        this.scopeOptions = data.scopes;
        this.answerOptions = data.answers;
        this.resultOptions = data.results;
        this.severityOptions = data.severities;
        this.isLoading = false;
        if (this.campaigns.length > 0) {
          this.selectCampaign(this.campaigns[0]);
        }
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement des evaluations.';
        this.isLoading = false;
      }
    });
  }

  selectCampaign(campaign: ControlEvaluationCampaign): void {
    this.isLoading = true;
    this.evaluationsService.getCampaign(campaign.id).subscribe({
      next: detail => {
        this.selectedCampaign = this.normalizeCampaign(detail);
        this.fillCampaignEditForm(this.selectedCampaign);
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement de la campagne.';
        this.isLoading = false;
      }
    });
  }

  createCampaign(): void {
    if (!this.campaignForm.title.trim()) {
      this.errorMessage = 'Le titre est obligatoire.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.evaluationsService.createCampaign(this.campaignForm).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.campaigns = [normalized, ...this.campaigns.filter(item => item.id !== campaign.id)];
        this.selectedCampaign = normalized;
        this.fillCampaignEditForm(normalized);
        this.campaignForm = {
          title: '',
          objectiveType: 'combined',
          scopeType: 'entity',
          scopeLabel: '',
          dueDate: '',
          riskTolerance: ''
        };
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la creation.';
        this.isSaving = false;
      }
    });
  }

  updateCampaign(): void {
    if (!this.selectedCampaign || !this.campaignEditForm.title.trim()) {
      this.errorMessage = 'Le titre de la campagne est obligatoire.';
      return;
    }

    this.isSaving = true;
    this.evaluationsService.updateCampaign(this.selectedCampaign.id, this.campaignEditForm).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.fillCampaignEditForm(normalized);
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la modification de la campagne.';
        this.isSaving = false;
      }
    });
  }

  deleteCampaign(campaign: ControlEvaluationCampaign): void {
    if (!this.canWrite || !window.confirm(`Supprimer la campagne "${campaign.title}" ?`)) {
      return;
    }

    this.isSaving = true;
    this.evaluationsService.deleteCampaign(campaign.id).subscribe({
      next: () => {
        this.campaigns = this.campaigns.filter(item => item.id !== campaign.id);
        this.selectedCampaign = this.campaigns.length > 0 ? this.campaigns[0] : null;
        if (this.selectedCampaign) {
          this.selectCampaign(this.selectedCampaign);
        }
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la suppression de la campagne.';
        this.isSaving = false;
      }
    });
  }

  syncAssessments(): void {
    if (!this.selectedCampaign || !this.canWrite) {
      return;
    }

    this.isSaving = true;
    this.evaluationsService.syncAssessments(this.selectedCampaign.id).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la synchronisation des critères.';
        this.isSaving = false;
      }
    });
  }

  saveAssessment(assessment: ControlPrincipleAssessment): void {
    if (!this.canWrite) {
      return;
    }

    this.isSaving = true;
    this.evaluationsService.updateAssessment(assessment.id, {
      implementationAnswer: assessment.implementationAnswerCode || 'not_applicable',
      operatingAnswer: assessment.operatingAnswerCode || 'not_applicable',
      result: assessment.resultCode || 'not_assessed',
      score: assessment.score,
      justification: assessment.justification
    }).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la sauvegarde.';
        this.isSaving = false;
      }
    });
  }

  openDeficiencyForm(assessment: ControlPrincipleAssessment): void {
    this.deficiencyForm.assessmentId = assessment.id;
    this.deficiencyForm.title = `${assessment.principle?.code || ''} - deficience a qualifier`.trim();
  }

  createDeficiency(): void {
    if (!this.selectedCampaign || !this.canContribute || !this.deficiencyForm.title.trim()) {
      this.errorMessage = 'La deficience doit avoir un titre.';
      return;
    }

    this.isSaving = true;
    this.evaluationsService.createDeficiency({
      campaignId: this.selectedCampaign.id,
      ...this.deficiencyForm
    }).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.deficiencyForm = {
          assessmentId: null,
          title: '',
          severity: 'medium',
          isMajor: false,
          impact: '',
          correctiveAction: '',
          dueDate: ''
        };
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la creation de la deficience.';
        this.isSaving = false;
      }
    });
  }

  onEvidenceFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.evidenceForm.file = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  createEvidence(): void {
    if (!this.selectedCampaign || !this.canContribute) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.evidenceForm.title || this.evidenceForm.file?.name || 'Preuve de contrôle interne');
    formData.append('sourceType', this.evidenceForm.sourceType || 'manual');
    if (this.evidenceForm.assessmentId) {
      formData.append('assessmentId', String(this.evidenceForm.assessmentId));
    }
    if (this.evidenceForm.deficiencyId) {
      formData.append('deficiencyId', String(this.evidenceForm.deficiencyId));
    }
    if (this.evidenceForm.file) {
      formData.append('evidenceFile', this.evidenceForm.file);
    }

    this.isSaving = true;
    this.evaluationsService.createEvidence(this.selectedCampaign.id, formData).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.evidenceForm = { assessmentId: null, deficiencyId: null, title: '', sourceType: 'manual', file: null };
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de l ajout de la preuve.';
        this.isSaving = false;
      }
    });
  }

  openMeasureForm(deficiency: ControlDeficiency): void {
    this.measureForm.deficiencyId = deficiency.id;
    this.measureForm.title = `Mesure compensatoire - ${deficiency.title}`;
  }

  createMeasure(): void {
    if (!this.measureForm.deficiencyId || !this.canContribute || !this.measureForm.title.trim()) {
      this.errorMessage = 'La mesure compensatoire doit avoir un titre.';
      return;
    }

    this.isSaving = true;
    this.evaluationsService.createCompensatingMeasure(this.measureForm.deficiencyId, this.measureForm).subscribe({
      next: campaign => {
        const normalized = this.normalizeCampaign(campaign);
        this.selectedCampaign = normalized;
        this.refreshCampaignInList(normalized);
        this.measureForm = { deficiencyId: null, title: '', description: '', status: 'proposed', dueDate: '', effectivenessNote: '' };
        this.isSaving = false;
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors de la création de la mesure compensatoire.';
        this.isSaving = false;
      }
    });
  }

  validateConclusion(): void {
    if (!this.selectedCampaign || !this.canValidate) {
      return;
    }

    this.isSaving = true;
    this.evaluationsService.previewConclusion(this.selectedCampaign.id).subscribe({
      next: preview => {
        this.evaluationsService.validateConclusion(this.selectedCampaign!.id, {
          result: preview.result,
          score: preview.score,
          summary: preview.summary,
          justification: 'Conclusion validee depuis le module Evaluation d efficacite.'
        }).subscribe({
          next: campaign => {
            const normalized = this.normalizeCampaign(campaign);
            this.selectedCampaign = normalized;
            this.refreshCampaignInList(normalized);
            this.isSaving = false;
          },
          error: error => {
            this.errorMessage = error?.error?.message || 'Erreur lors de la validation.';
            this.isSaving = false;
          }
        });
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Erreur lors du calcul de la conclusion.';
        this.isSaving = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getToneClass(score: number): string {
    if (score >= 85) {
      return 'tone-strong';
    }

    if (score >= 60) {
      return 'tone-watch';
    }

    return 'tone-alert';
  }

  private refreshCampaignInList(campaign: ControlEvaluationCampaign): void {
    this.campaigns = this.campaigns.map(item => item.id === campaign.id ? campaign : item);
  }

  private fillCampaignEditForm(campaign: ControlEvaluationCampaign): void {
    this.campaignEditForm = {
      title: campaign.title || '',
      objectiveType: campaign.objectiveTypeCode || 'combined',
      scopeType: campaign.scopeTypeCode || 'entity',
      scopeLabel: campaign.scopeLabel || '',
      dueDate: campaign.dueDate ? campaign.dueDate.substring(0, 10) : '',
      riskTolerance: campaign.riskTolerance || '',
      status: campaign.statusCode || 'draft'
    };
  }

  private normalizeCampaign(campaign: ControlEvaluationCampaign): ControlEvaluationCampaign {
    const assessments = (campaign.assessments || []).map(assessment => ({
      ...assessment,
      implementationAnswerCode: this.resolveOptionCode(this.answerOptions, assessment.implementationAnswerCode, assessment.implementationAnswer, (assessment as any).implementationAnswerId, 'not_applicable'),
      operatingAnswerCode: this.resolveOptionCode(this.answerOptions, assessment.operatingAnswerCode, assessment.operatingAnswer, (assessment as any).operatingAnswerId, 'not_applicable'),
      resultCode: this.resolveOptionCode(this.resultOptions, assessment.resultCode, assessment.result, (assessment as any).resultId, 'not_assessed'),
      justification: assessment.justification || ''
    }));

    return {
      ...campaign,
      statusCode: this.resolveOptionCode(this.statusOptions, campaign.statusCode, campaign.status, (campaign as any).statusId, 'draft'),
      objectiveTypeCode: this.resolveOptionCode(this.objectiveOptions, campaign.objectiveTypeCode, campaign.objectiveType, (campaign as any).objectiveTypeId, 'combined'),
      scopeTypeCode: this.resolveOptionCode(this.scopeOptions, campaign.scopeTypeCode, campaign.scopeType, (campaign as any).scopeTypeId, 'entity'),
      assessments
    };
  }

  private resolveOptionCode(options: ControlEvaluationLookupOption[], code: string | null | undefined, label: string | null | undefined, id: number | null | undefined, fallback: string): string {
    if (code && options.some(option => option.code === code)) {
      return code;
    }

    const byId = options.find(option => option.id === id);
    if (byId) {
      return byId.code;
    }

    const normalizedLabel = String(label || '').trim().toLowerCase();
    const byLabel = options.find(option =>
      option.label.toLowerCase() === normalizedLabel || option.code.toLowerCase() === normalizedLabel
    );

    return byLabel?.code || fallback;
  }
}
