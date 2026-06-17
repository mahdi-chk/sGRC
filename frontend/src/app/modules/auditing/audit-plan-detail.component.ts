import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  AuditChecklistTemplate,
  AuditEvidence,
  AuditMissionActionPlanItem,
  AuditMissionActionPlanPayload,
  AuditMissionChecklistItem,
  AuditMissionWorkflowEvent,
  AuditMissionWorkspace,
  AuditPlan,
  AuditPlanMission,
  AuditPlanMissionResource,
  AuditPlanTransitionPayload,
  AuditPlanningService,
  AuditResponsibilityMatrixResponse,
  AuditRoleResponsibility,
  LookupOption
} from '../../core/services/audit-planning.service';
import { UserService } from '../../core/services/user.service';
import { UserRole } from '../../core/models/user-role.enum';
import { getAuditPlanningNavItems, getStoredAuditRole } from './audit-navigation';
import { buildBackendFileUrl } from '../../core/utils/url.utils';

type AuditDetailTabId = 'informations' | 'workflow' | 'missions' | 'planning' | 'resources' | 'recommendations';

type AuditDetailTab = {
  id: AuditDetailTabId;
  label: string;
  description: string;
  icon: string;
};

type AuditMissionPanelId = 'overview' | 'assign' | 'process' | 'validate' | 'actions' | 'evidence';

type AuditMissionPanel = {
  id: AuditMissionPanelId;
  label: string;
  description: string;
  icon: string;
};

@Component({
  selector: 'app-audit-plan-detail',
  templateUrl: './audit-plan-detail.component.html',
  styleUrls: ['./audit-plan-detail.component.scss']
})
export class AuditPlanDetailComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  planId = 0;
  plan: AuditPlan | null = null;
  missionWorkspace: AuditMissionWorkspace | null = null;
  responsibilityMatrix: AuditResponsibilityMatrixResponse | null = null;
  activeTab: AuditDetailTabId = 'informations';
  activeMissionPanel: AuditMissionPanelId = 'overview';
  isLoading = false;
  isTransitioning = false;
  isSavingMission = false;
  isSavingResources = false;
  isLoadingMissionWorkspace = false;
  isSavingMissionOrder = false;
  isSavingWorkProgram = false;
  isApplyingWorkProgramTransition = false;
  isSavingReport = false;
  isApplyingReportTransition = false;
  isSavingActionPlan = false;
  isApplyingRecommendationTransition = false;

  statusOptions: LookupOption[] = [];
  natureOptions: LookupOption[] = [];
  categoryOptions: LookupOption[] = [];
  quarterOptions: LookupOption[] = [];
  assignmentRoleOptions: LookupOption[] = [];

  users: any[] = [];
  workProgramTemplates: AuditChecklistTemplate[] = [];

  showMissionModal = false;
  showMissionEditModal = false;
  showActionPlanModal = false;
  showRecommendationWorkflowModal = false;
  showWorkProgramTemplateModal = false;
  selectedMissionId: number | null = null;
  deletedMissions: AuditPlanMission[] = [];
  missionResources: AuditPlanMissionResource[] = [];
  selectedRequiredSkillIds: number[] = [];
  selectedWorkProgramTemplateId: number | null = null;
  editingWorkProgramTemplateId: number | null = null;
  workProgramItems: Partial<AuditMissionChecklistItem>[] = [];
  workProgramTemplateForm: { titre: string; description: string; itemsText: string } = {
    titre: '',
    description: '',
    itemsText: ''
  };
  missionEvidence: AuditEvidence[] = [];
  selectedEvidenceFile: File | null = null;
  isUploadingEvidence = false;
  isDeletingEvidence = false;
  isSavingWorkProgramTemplate = false;
  isDeletingWorkProgramTemplate = false;
  isSavingMissionUpdate = false;
  isDeletingMission = false;
  isRestoringMission = false;

  transitionForm: AuditPlanTransitionPayload = {
    transition: '',
    comment: ''
  };

  workProgramTransitionForm: AuditPlanTransitionPayload = {
    transition: '',
    comment: ''
  };

  reportTransitionForm: AuditPlanTransitionPayload = {
    transition: '',
    comment: ''
  };

  missionOrderForm: { reference: string; comment: string } = {
    reference: '',
    comment: ''
  };

  reportForm: { rapport: string; recommandations: string } = {
    rapport: '',
    recommandations: ''
  };

  actionPlanForm: Partial<AuditMissionActionPlanItem> = this.emptyActionPlan();
  selectedRecommendation: AuditMissionActionPlanItem | null = null;
  recommendationWorkflowHistory: AuditMissionWorkflowEvent[] = [];
  isLoadingRecommendationWorkflowHistory = false;
  recommendationTransitionForm: {
    transition: string;
    comment: string;
    planAction: string;
    tauxAvancement: number | null;
    evaluationAvancement: string;
  } = {
    transition: '',
    comment: '',
    planAction: '',
    tauxAvancement: null,
    evaluationAvancement: ''
  };

  missionForm: Partial<AuditPlanMission> = this.emptyMission();
  missionEditForm: Partial<AuditPlanMission> = this.emptyMission();

  readonly actionPlanStatuses = ['NOK', 'En cours', 'OK'];
  readonly recommendationEvaluationOptions = [
    { code: 'dans_les_temps', label: 'Dans les temps' },
    { code: 'en_retard', label: 'En retard' }
  ];
  readonly recommendationTransitionLabels: Record<string, string> = {
    envoyer_recommandation: 'Envoyer la recommandation',
    soumettre_plan_action: 'Soumettre le plan d action',
    demander_validation_plan_action: 'Demander validation du plan',
    demander_revue_plan_action: 'Demander de revoir le plan d action',
    demander_revue_validation_plan_action: 'Demander une revue du plan',
    valider_plan_action: 'Valider le plan d action',
    demander_mise_a_jour_avancement: 'Demander la mise a jour du taux',
    soumettre_taux_avancement: 'Soumettre le taux d avancement',
    demander_revue_taux_avancement: 'Demander de revoir le taux',
    demander_validation_avancement_100: 'Demander validation 100%',
    demander_revoir_100: 'Demander de revoir le 100%',
    valider_avancement_100: 'Valider avancement 100%',
    fermer_recommandation: 'Fermer la recommandation',
    reouvrir: 'Reouvrir',
    fermer_definitivement: 'Fermer definitivement'
  };
  readonly planTransitionLabels: Record<string, string> = {
    demander_validation: 'Demander validation',
    valider_direction: 'Valider Direction',
    demander_revue: 'Demander une revue',
    valider_conseil: 'Valider Conseil',
    valider_comite: 'Valider Comite',
    fermer: 'Fermer le plan',
    reouvrir: 'Reouvrir le plan',
    fermer_definitivement: 'Fermer definitivement',
    definir_modele: 'Definir comme modele'
  };
  readonly missionPanels: AuditMissionPanel[] = [
    {
      id: 'overview',
      label: 'Vue',
      description: 'Lire le statut, les dates et les prochaines actions.',
      icon: 'fas fa-gauge-high'
    },
    {
      id: 'assign',
      label: 'Assigner',
      description: 'Affecter les ressources et les roles.',
      icon: 'fas fa-user-plus'
    },
    {
      id: 'process',
      label: 'Traiter',
      description: 'Envoyer l ordre, preparer le programme et rediger.',
      icon: 'fas fa-list-check'
    },
    {
      id: 'validate',
      label: 'Valider',
      description: 'Soumettre, valider, approuver ou demander une reprise.',
      icon: 'fas fa-circle-check'
    },
    {
      id: 'actions',
      label: 'Actions',
      description: 'Piloter les plans d action et recommandations.',
      icon: 'fas fa-clipboard-list'
    },
    {
      id: 'evidence',
      label: 'Preuves',
      description: 'Joindre et consulter les justificatifs.',
      icon: 'fas fa-paperclip'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auditPlanningService: AuditPlanningService,
    private userService: UserService
  ) { }

  get navItems() {
    return getAuditPlanningNavItems(this.currentUserRole);
  }

  get missionCount(): number {
    return this.plan?.summary?.missionCount || this.plan?.missions?.length || 0;
  }

  get planScopeLabel(): string {
    switch (this.currentUserRole) {
      case UserRole.CHEF_MISSION:
        return 'Mes missions';
      case UserRole.AUDITEUR:
        return 'Mes missions assignees';
      case UserRole.CONTROLLER:
        return 'Mon perimetre de suivi';
      default:
        return 'Toutes les missions du plan';
    }
  }

  get recommendationCount(): number {
    return this.plan?.summary?.recommendationCount || this.plan?.recommendations?.length || 0;
  }

  get availableTransitionCount(): number {
    return this.plan?.availableTransitions?.length || 0;
  }

  get isManagementRole(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR || role === UserRole.AUDIT_RESPONSABLE || role === UserRole.SUPER_ADMIN;
  }

  get canViewResourcesTab(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR
      || role === UserRole.AUDIT_RESPONSABLE
      || role === UserRole.CHEF_MISSION
      || role === UserRole.AUDITEUR
      || role === UserRole.SUPER_ADMIN;
  }

  get visibleTabs(): AuditDetailTab[] {
    const tabs: AuditDetailTab[] = [
      {
        id: 'informations',
        label: 'Informations',
        description: 'Fiche plan',
        icon: 'fas fa-circle-info'
      },
      {
        id: 'workflow',
        label: 'Workflow',
        description: `${this.availableTransitionCount} transition(s)`,
        icon: 'fas fa-code-branch'
      },
      {
        id: 'missions',
        label: this.planScopeLabel,
        description: `${this.missionCount} mission(s)`,
        icon: 'fas fa-diagram-project'
      },
      {
        id: 'planning',
        label: 'Planning',
        description: 'Calendrier',
        icon: 'fas fa-calendar-days'
      },
    ];

    if (this.canViewResourcesTab) {
      tabs.push({
        id: 'resources',
        label: 'Ressources',
        description: 'Equipe et roles',
        icon: 'fas fa-users-gear'
      });
    }

    tabs.push({
      id: 'recommendations',
      label: 'Recommandations',
      description: `${this.recommendationCount} element(s)`,
      icon: 'fas fa-clipboard-list'
    });

    return tabs;
  }

  get activeTabInfo(): AuditDetailTab | null {
    return this.visibleTabs.find((tab) => tab.id === this.activeTab) || null;
  }

  get planTransitionOptions(): string[] {
    return this.plan?.availableTransitions || [];
  }

  get canApplyPlanTransition(): boolean {
    return this.planTransitionOptions.length > 0;
  }

  get selectedPlanTransitionRequiresComment(): boolean {
    return this.transitionForm.transition === 'demander_revue';
  }

  get canSubmitPlanTransition(): boolean {
    return Boolean(
      this.transitionForm.transition
      && !this.isTransitioning
      && (!this.selectedPlanTransitionRequiresComment || String(this.transitionForm.comment || '').trim())
    );
  }

  get noPlanTransitionMessage(): string {
    const status = String(this.plan?.statusCode || this.plan?.status || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
    const role = this.currentUserRole;

    if (status === 'cree') {
      if (role === UserRole.AUDIT_DIRECTEUR) {
        return 'Le plan est encore en creation. Le Superviseur d audit doit d abord demander la validation.';
      }
      return 'Aucune transition disponible pour ce profil tant que le plan reste en creation. Le Superviseur d audit peut demander la validation ou definir ce plan comme modele.';
    }

    if (status === 'a_valider') {
      return role === UserRole.AUDIT_DIRECTEUR
        ? 'Aucune transition disponible pour ce plan. Actualisez la page si le statut vient de changer.'
        : 'Le plan attend la validation de l Audit Directeur.';
    }

    if (status === 'valide_direction') {
      return role === UserRole.AUDIT_RESPONSABLE
        ? 'Aucune transition disponible pour ce plan. Actualisez la page si le statut vient de changer.'
        : 'Le plan attend la mise a jour de validation Conseil par le Superviseur d audit.';
    }

    if (status === 'valide_conseil') {
      return role === UserRole.AUDIT_RESPONSABLE
        ? 'Aucune transition disponible pour ce plan. Actualisez la page si le statut vient de changer.'
        : 'Le plan attend la mise a jour de validation Comite par le Superviseur d audit.';
    }

    if (status === 'valide_comite') {
      return 'Le plan est valide par le Comite. Le Superviseur d audit peut le fermer ou demander une revue.';
    }

    if (status === 'ferme') {
      return 'Le plan est ferme. Le Superviseur d audit peut le rouvrir ou le fermer definitivement.';
    }

    if (status === 'ferme_definitivement') {
      return 'Le plan est ferme definitivement. Aucune transition n est possible.';
    }

    return 'Aucune transition disponible pour votre profil et le statut actuel du plan.';
  }

  formatPlanTransitionLabel(transition?: string | null): string {
    return this.planTransitionLabels[String(transition || '')] || String(transition || '-');
  }

  get selectedMission(): AuditPlanMission | null {
    return this.plan?.missions?.find((mission) => mission.id === this.selectedMissionId) || null;
  }

  get missionFormIsValid(): boolean {
    return this.hasRequiredMissionFields(this.missionForm) && !this.isMissionDateRangeInvalid(this.missionForm);
  }

  get missionEditFormIsValid(): boolean {
    return this.hasRequiredMissionFields(this.missionEditForm)
      && !this.isMissionDateRangeInvalid(this.missionEditForm)
      && !this.isMissionRealDateRangeInvalid(this.missionEditForm);
  }

  get missionFormDateRangeInvalid(): boolean {
    return this.isMissionDateRangeInvalid(this.missionForm);
  }

  get missionEditFormDateRangeInvalid(): boolean {
    return this.isMissionDateRangeInvalid(this.missionEditForm);
  }

  get missionEditRealDateRangeInvalid(): boolean {
    return this.isMissionRealDateRangeInvalid(this.missionEditForm);
  }

  get resourcesFormIsValid(): boolean {
    return this.missionResources.every((item) => Boolean(
      Number(item.userId || 0) > 0
      && String(item.assignmentRoleCode || item.assignmentRole || '').trim()
    ));
  }

  get hasChefMissionAssignment(): boolean {
    const mission = this.missionWorkspace?.mission || this.selectedMission;
    return Boolean(mission?.chefMissionId || this.missionResources.some((item) =>
      Number(item.userId || 0) > 0
      && String(item.assignmentRoleCode || item.assignmentRole || '') === 'chef_mission'
    ));
  }

  get hasAuditeurAssignment(): boolean {
    const mission = this.missionWorkspace?.mission || this.selectedMission;
    return Boolean(mission?.auditeurId || this.missionResources.some((item) =>
      Number(item.userId || 0) > 0
      && String(item.assignmentRoleCode || item.assignmentRole || '') === 'auditeur'
    ));
  }

  get missingMissionAssignmentsLabel(): string {
    const missingRoles = [
      !this.hasChefMissionAssignment ? 'un chef de mission' : '',
      !this.hasAuditeurAssignment ? 'un auditeur' : '',
    ].filter(Boolean);

    return missingRoles.join(' et ');
  }

  get missionHasRequiredAssignments(): boolean {
    return this.hasChefMissionAssignment && this.hasAuditeurAssignment;
  }

  get missionOrderFormIsValid(): boolean {
    return String(this.missionOrderForm.reference || '').length <= 80
      && String(this.missionOrderForm.comment || '').length <= 500;
  }

  get workProgramFormIsValid(): boolean {
    return this.workProgramItems.length > 0 && this.workProgramItems.every((item) => {
      const text = String(item.texte || '').trim();
      return text.length >= 3 && text.length <= 300;
    });
  }

  get workProgramTemplateFormIsValid(): boolean {
    const titre = String(this.workProgramTemplateForm.titre || '').trim();
    const description = String(this.workProgramTemplateForm.description || '');
    const items = this.parseWorkProgramTemplateItems();
    return titre.length >= 3
      && titre.length <= 120
      && description.length <= 500
      && items.length > 0
      && items.every((item) => item.length >= 3 && item.length <= 300);
  }

  get workProgramTemplateSubmitLabel(): string {
    return this.editingWorkProgramTemplateId ? 'Enregistrer les modifications' : 'Creer le modele';
  }

  get selectedRecommendationTransitionRequiresComment(): boolean {
    return [
      'demander_revue_plan_action',
      'demander_revue_validation_plan_action',
      'soumettre_taux_avancement',
      'demander_revue_taux_avancement',
      'demander_revoir_100'
    ].includes(this.recommendationTransitionForm.transition);
  }

  get selectedRecommendationTransitionRequiresPlanAction(): boolean {
    return this.recommendationTransitionForm.transition === 'soumettre_plan_action';
  }

  get selectedRecommendationTransitionRequiresProgress(): boolean {
    return this.recommendationTransitionForm.transition === 'soumettre_taux_avancement';
  }

  get selectedRecommendationTransitionRequiresEvaluation(): boolean {
    return this.recommendationTransitionForm.transition === 'soumettre_taux_avancement';
  }

  get canSubmitRecommendationTransition(): boolean {
    const progress = Number(this.recommendationTransitionForm.tauxAvancement);
    return Boolean(
      this.selectedRecommendation
      && this.recommendationTransitionForm.transition
      && !this.isApplyingRecommendationTransition
      && String(this.recommendationTransitionForm.comment || '').length <= 500
      && (!this.selectedRecommendationTransitionRequiresComment || String(this.recommendationTransitionForm.comment || '').trim())
      && (!this.selectedRecommendationTransitionRequiresPlanAction || String(this.recommendationTransitionForm.planAction || '').trim())
      && (!this.selectedRecommendationTransitionRequiresProgress || (Number.isFinite(progress) && progress >= 0 && progress <= 100))
      && (!this.selectedRecommendationTransitionRequiresEvaluation || String(this.recommendationTransitionForm.evaluationAvancement || '').trim())
    );
  }

  get reportFormIsValid(): boolean {
    return String(this.reportForm.rapport || '').trim().length >= 10
      && String(this.reportForm.rapport || '').length <= 5000
      && String(this.reportForm.recommandations || '').length <= 3000;
  }

  get actionPlanFormIsValid(): boolean {
    const priorite = Number(this.actionPlanForm.priorite || 0);
    return Boolean(
      String(this.actionPlanForm.regleDnssi || '').trim()
      && String(this.actionPlanForm.regleDnssi || '').length <= 1000
      && String(this.actionPlanForm.recommandations || '').trim()
      && String(this.actionPlanForm.recommandations || '').length <= 2000
      && (!this.actionPlanForm.planActionType || String(this.actionPlanForm.planActionType).length <= 80)
      && (!this.actionPlanForm.responsableNom || String(this.actionPlanForm.responsableNom).length <= 120)
      && (!this.actionPlanForm.horizon || String(this.actionPlanForm.horizon).length <= 80)
      && (!this.actionPlanForm.priorite || (Number.isFinite(priorite) && priorite >= 1 && priorite <= 3))
    );
  }

  get currentRoleDefinition(): AuditRoleResponsibility | null {
    return this.responsibilityMatrix?.roles?.find((item) => item.role === this.currentUserRole) || null;
  }

  get workProgramTransitions(): string[] {
    const permissions = this.missionWorkspace?.permissions;
    const status = this.missionWorkspace?.workProgram?.status;
    if (!permissions || !status) {
      return [];
    }

    const transitions: string[] = [];
    if (permissions.canSubmitWorkProgram) {
      transitions.push('submit');
    }
    if (permissions.canValidateWorkProgram) {
      transitions.push('validate', 'request_rework');
    }
    if (permissions.canApproveWorkProgram) {
      transitions.push('approve', 'request_rework');
    }
    return Array.from(new Set(transitions));
  }

  get reportTransitions(): string[] {
    const permissions = this.missionWorkspace?.permissions;
    const status = this.missionWorkspace?.report?.status;
    if (!permissions || !status) {
      return [];
    }

    const transitions: string[] = [];
    if (permissions.canSubmitReport) {
      transitions.push('submit');
    }
    if (permissions.canValidateReport) {
      transitions.push('validate', 'request_rework');
    }
    if (permissions.canApproveReport) {
      transitions.push('approve', 'request_rework');
    }
    return Array.from(new Set(transitions));
  }

  get selectedWorkProgramTransitionRequiresComment(): boolean {
    return this.workProgramTransitionForm.transition === 'request_rework';
  }

  get canSubmitWorkProgramTransition(): boolean {
    return Boolean(
      this.workProgramTransitionForm.transition
      && !this.isApplyingWorkProgramTransition
      && String(this.workProgramTransitionForm.comment || '').length <= 500
      && (!this.selectedWorkProgramTransitionRequiresComment || String(this.workProgramTransitionForm.comment || '').trim())
    );
  }

  get selectedReportTransitionRequiresComment(): boolean {
    return this.reportTransitionForm.transition === 'request_rework';
  }

  get canSubmitReportTransition(): boolean {
    return Boolean(
      this.reportTransitionForm.transition
      && !this.isApplyingReportTransition
      && String(this.reportTransitionForm.comment || '').length <= 500
      && (!this.selectedReportTransitionRequiresComment || String(this.reportTransitionForm.comment || '').trim())
    );
  }

  get isMissionOrderSent(): boolean {
    return this.missionWorkspace?.missionOrder?.status === 'sent';
  }

  get isWorkProgramValidated(): boolean {
    return ['validated', 'approved'].includes(this.missionWorkspace?.workProgram?.status || '');
  }

  get isWorkProgramApproved(): boolean {
    return this.missionWorkspace?.workProgram?.status === 'approved';
  }

  get isChecklistComplete(): boolean {
    const items = this.missionWorkspace?.workProgram?.items || [];
    return items.length > 0 && items.every((item) => Boolean(item.estFait));
  }

  get isReportStarted(): boolean {
    const report = this.missionWorkspace?.report;
    return Boolean(
      report
      && (
        report.status !== 'draft'
        || String(report.rapport || '').trim()
        || String(report.recommandations || '').trim()
      )
    );
  }

  get workProgramPrerequisiteMessage(): string {
    return this.isMissionOrderSent
      ? ''
      : 'Envoyez d abord l ordre de mission pour preparer et soumettre le programme de travail.';
  }

  get checklistPrerequisiteMessage(): string {
    if (!this.isMissionOrderSent) {
      return 'La checklist sera executable apres l envoi de l ordre de mission.';
    }
    if (!this.isWorkProgramValidated) {
      return 'Le programme de travail doit etre valide avant l execution de la checklist.';
    }
    return '';
  }

  get reportPrerequisiteMessage(): string {
    if (!this.isWorkProgramApproved) {
      return 'Le programme de travail doit etre approuve avant la redaction du rapport.';
    }
    if (!this.isChecklistComplete) {
      return 'Tous les points de la checklist doivent etre executes avant la redaction du rapport.';
    }
    return '';
  }

  get allowedActionLabels(): string[] {
    const permissions = this.missionWorkspace?.permissions;
    if (!permissions) {
      return [];
    }

    const labels: string[] = [];

    if (permissions.canManageResources) {
      labels.push('gerer les affectations');
    }
    if (permissions.canSendMissionOrder) {
      labels.push('envoyer l ordre de mission');
    }
    if (permissions.canEditWorkProgram) {
      labels.push('preparer le programme de travail');
    }
    if (permissions.canExecuteWorkProgram) {
      labels.push('executer la checklist');
    }
    if (permissions.canValidateWorkProgram) {
      labels.push('valider le programme');
    }
    if (permissions.canApproveWorkProgram) {
      labels.push('approuver le programme');
    }
    if (permissions.canEditReport) {
      labels.push('rediger le rapport');
    }
    if (permissions.canValidateReport) {
      labels.push('valider le rapport');
    }
    if (permissions.canApproveReport) {
      labels.push('approuver le rapport');
    }
    if (permissions.canCreateActionPlan) {
      labels.push('creer des plans d action');
    }
    if (permissions.canFollowActionPlan) {
      labels.push('suivre les plans d action');
    }

    return labels;
  }

  getEmailStatusClass(status?: string | null): string {
    switch ((status || '').toLowerCase()) {
      case 'sent':
        return 'email-status success';
      case 'failed':
        return 'email-status danger';
      default:
        return 'email-status muted';
    }
  }

  formatWorkflowTransition(item: any): string {
    return this.formatPlanTransitionLabel(item?.transitionCode || item?.transition || '');
  }

  formatMissionWorkflowTransition(transition?: string | null): string {
    const labels: Record<string, string> = {
      submit: 'Soumettre',
      validate: 'Valider',
      approve: 'Approuver',
      request_rework: 'Demander correction',
      send: 'Envoyer',
      ...this.recommendationTransitionLabels
    };
    return labels[String(transition || '')] || String(transition || '-');
  }

  formatRecommendationTransition(transition?: string | null): string {
    return this.recommendationTransitionLabels[String(transition || '')] || String(transition || '-');
  }

  formatRecommendationEvaluation(value?: string | null): string {
    const option = this.recommendationEvaluationOptions.find((item) => item.code === value);
    return option?.label || String(value || '-');
  }

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLookups();
    this.loadUsers();
    this.loadResponsibilityMatrix();
    this.loadWorkProgramTemplates();
    this.loadPlan();
  }

  setActiveTab(tabId: AuditDetailTabId): void {
    this.activeTab = tabId;
  }

  setMissionPanel(panelId: AuditMissionPanelId): void {
    this.activeMissionPanel = panelId;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/audit-plans']);
  }

  openPlanningWorkspace(): void {
    this.router.navigate(['/dashboard/audit-planning']);
  }

  private emptyMission(): Partial<AuditPlanMission> {
    return {
      titre: '',
      objectifs: '',
      responsabilites: '',
      statut: 'nok',
      categoryCode: '',
      quarterCode: '',
      axe: '',
      evaluation: '',
      datePrevueDebut: '',
      datePrevueFin: '',
      dateReelleDebut: '',
      dateReelleFin: ''
    };
  }

  private emptyActionPlan(): Partial<AuditMissionActionPlanItem> {
    return {
      ordre: 0,
      regleDnssi: '',
      recommandations: '',
      planActionType: '',
      horizon: '',
      priorite: 2,
      responsableId: null,
      responsableNom: '',
      echeance: '',
      etatAvancement: 'NOK'
    };
  }

  private toDateInputValue(value?: string | Date | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  }

  private hasRequiredMissionFields(form: Partial<AuditPlanMission>): boolean {
    return Boolean(
      String(form.titre || '').trim().length >= 3
      && String(form.titre || '').length <= 160
      && String(form.objectifs || '').trim().length >= 10
      && String(form.objectifs || '').length <= 2000
      && String(form.responsabilites || '').trim().length >= 3
      && String(form.responsabilites || '').length <= 1000
      && String(form.datePrevueFin || '').trim()
      && String(form.axe || '').length <= 120
      && String(form.evaluation || '').length <= 120
    );
  }

  private isMissionDateRangeInvalid(form: Partial<AuditPlanMission>): boolean {
    if (!form.datePrevueDebut || !form.datePrevueFin) {
      return false;
    }

    return new Date(form.datePrevueFin).getTime() < new Date(form.datePrevueDebut).getTime();
  }

  private isMissionRealDateRangeInvalid(form: Partial<AuditPlanMission>): boolean {
    if (!form.dateReelleDebut || !form.dateReelleFin) {
      return false;
    }

    return new Date(form.dateReelleFin).getTime() < new Date(form.dateReelleDebut).getTime();
  }

  private getBackendErrorMessage(error: any, fallback: string): string {
    const payload = error?.error;
    if (payload?.error) {
      return `${payload.message || fallback}: ${payload.error}`;
    }

    return payload?.message || fallback;
  }

  private updateMissionInPlan(updatedMission: AuditPlanMission): void {
    if (!this.plan?.missions) {
      return;
    }

    this.plan = {
      ...this.plan,
      missions: this.plan.missions.map((mission) => mission.id === updatedMission.id ? updatedMission : mission)
    };
  }

  private applyMissionWorkspace(workspace: AuditMissionWorkspace): void {
    this.missionWorkspace = workspace;
    this.selectedWorkProgramTemplateId = workspace.workProgram?.checklistTemplateId || null;
    this.workProgramItems = (workspace.workProgram?.items || []).map((item) => ({
      id: item.id,
      texte: item.texte,
      estFait: item.estFait
    }));
    this.reportForm = {
      rapport: workspace.report?.rapport || '',
      recommandations: workspace.report?.recommandations || ''
    };
    this.missionOrderForm = {
      reference: workspace.missionOrder?.reference || '',
      comment: ''
    };
    this.updateMissionInPlan(workspace.mission);
    this.loadMissionEvidence();
  }

  loadLookups(): void {
    this.auditPlanningService.getLookupOptions('auditPlan.status').subscribe(data => this.statusOptions = data);
    this.auditPlanningService.getLookupOptions('auditPlan.nature').subscribe(data => this.natureOptions = data);
    this.auditPlanningService.getLookupOptions('auditMission.category').subscribe(data => this.categoryOptions = data);
    this.auditPlanningService.getLookupOptions('auditMission.quarter').subscribe(data => this.quarterOptions = data);
    this.auditPlanningService.getLookupOptions('auditMissionResource.assignmentRole').subscribe(data => {
      this.assignmentRoleOptions = data.filter(option => option.code === 'chef_mission' || option.code === 'auditeur');
    });
  }

  loadUsers(): void {
    this.userService.getAssignableIncidentUsers().subscribe(data => this.users = data);
  }

  loadResponsibilityMatrix(): void {
    this.auditPlanningService.getResponsibilityMatrix().subscribe({
      next: (data) => this.responsibilityMatrix = data,
      error: (error) => console.error(error)
    });
  }

  loadWorkProgramTemplates(): void {
    this.auditPlanningService.getWorkProgramTemplates().subscribe({
      next: (data) => this.workProgramTemplates = data,
      error: (error) => console.error(error)
    });
  }

  loadPlan(): void {
    if (!this.planId) {
      return;
    }

    this.isLoading = true;
    this.auditPlanningService.getPlan(this.planId).subscribe({
      next: (plan) => {
        this.plan = plan;
        this.loadDeletedMissions();
        this.isLoading = false;
        if (this.plan?.missions?.length) {
          const missionId = this.selectedMissionId || this.plan.missions[0].id;
          this.selectMission(missionId);
        } else {
          this.selectedMissionId = null;
          this.missionWorkspace = null;
        }
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  applyTransition(): void {
    if (!this.plan || !this.transitionForm.transition) {
      return;
    }

    this.isTransitioning = true;
    this.auditPlanningService.applyPlanTransition(this.plan.id, this.transitionForm).subscribe({
      next: (plan) => {
        this.plan = plan;
        this.transitionForm = { transition: '', comment: '' };
        this.isTransitioning = false;
      },
      error: (error) => {
        console.error(error);
        this.isTransitioning = false;
        alert(this.getBackendErrorMessage(error, 'Erreur lors de la transition du plan.'));
        this.loadPlan();
      }
    });
  }

  openMissionModal(): void {
    this.missionForm = this.emptyMission();
    this.showMissionModal = true;
  }

  saveMission(): void {
    if (!this.plan || !this.missionFormIsValid) {
      return;
    }

    this.isSavingMission = true;
    this.auditPlanningService.createPlanMission(this.plan.id, {
      titre: String(this.missionForm.titre || '').trim(),
      objectifs: String(this.missionForm.objectifs || '').trim(),
      responsabilites: String(this.missionForm.responsabilites || '').trim(),
      statut: this.missionForm.statut || 'nok',
      category: this.missionForm.categoryCode || null,
      quarter: this.missionForm.quarterCode || null,
      axe: this.missionForm.axe || null,
      evaluation: this.missionForm.evaluation || null,
      datePrevueDebut: this.missionForm.datePrevueDebut || null,
      datePrevueFin: this.missionForm.datePrevueFin || null,
      dateReelleDebut: this.missionForm.dateReelleDebut || null,
      dateReelleFin: this.missionForm.dateReelleFin || null,
      delai: this.missionForm.datePrevueFin || null
    }).subscribe({
      next: () => {
        this.isSavingMission = false;
        this.showMissionModal = false;
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isSavingMission = false;
        alert(this.getBackendErrorMessage(error, 'Erreur lors de la creation de la mission.'));
      }
    });
  }

  selectMission(missionId: number): void {
    this.selectedMissionId = missionId;
    this.loadMissionResources();
    this.loadMissionWorkspace();
  }

  loadMissionWorkspace(): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.isLoadingMissionWorkspace = true;
    this.auditPlanningService.getMissionWorkspace(this.selectedMissionId).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.isLoadingMissionWorkspace = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoadingMissionWorkspace = false;
      }
    });
  }

  loadMissionEvidence(): void {
    if (!this.selectedMissionId) {
      this.missionEvidence = [];
      return;
    }

    this.auditPlanningService.getMissionEvidence(this.selectedMissionId).subscribe({
      next: (data) => {
        this.missionEvidence = data;
      },
      error: (error) => console.error(error)
    });
  }

  loadDeletedMissions(): void {
    if (!this.planId || !this.isManagementRole) {
      this.deletedMissions = [];
      return;
    }

    this.auditPlanningService.getDeletedPlanMissions(this.planId).subscribe({
      next: (missions) => {
        this.deletedMissions = missions;
      },
      error: (error) => console.error(error)
    });
  }

  loadMissionResources(): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.auditPlanningService.getMissionResources(this.selectedMissionId).subscribe({
      next: (data) => {
        this.missionResources = data.resources.length > 0 ? data.resources : [];
        this.selectedRequiredSkillIds = data.requiredSkills.map((item) => item.skillId);
      },
      error: (error) => console.error(error)
    });
  }

  openEditMissionModal(): void {
    if (!this.selectedMission) {
      return;
    }

    this.missionEditForm = {
      ...this.selectedMission,
      datePrevueDebut: this.toDateInputValue(this.selectedMission.datePrevueDebut),
      datePrevueFin: this.toDateInputValue(this.selectedMission.datePrevueFin),
      dateReelleDebut: this.toDateInputValue(this.selectedMission.dateReelleDebut),
      dateReelleFin: this.toDateInputValue(this.selectedMission.dateReelleFin)
    };
    this.showMissionEditModal = true;
  }

  saveMissionEdits(): void {
    if (!this.plan || !this.selectedMission || !this.missionEditFormIsValid) {
      return;
    }

    this.isSavingMissionUpdate = true;
    this.auditPlanningService.updatePlanMission(this.plan.id, this.selectedMission.id, {
      titre: String(this.missionEditForm.titre || '').trim(),
      objectifs: String(this.missionEditForm.objectifs || '').trim(),
      responsabilites: String(this.missionEditForm.responsabilites || '').trim(),
      statut: this.missionEditForm.statut || 'nok',
      category: this.missionEditForm.categoryCode || this.missionEditForm.category || null,
      quarter: this.missionEditForm.quarterCode || this.missionEditForm.quarter || null,
      axe: this.missionEditForm.axe || null,
      evaluation: this.missionEditForm.evaluation || null,
      datePrevueDebut: this.missionEditForm.datePrevueDebut || null,
      datePrevueFin: this.missionEditForm.datePrevueFin || null,
      dateReelleDebut: this.missionEditForm.dateReelleDebut || null,
      dateReelleFin: this.missionEditForm.dateReelleFin || null,
      delai: this.missionEditForm.datePrevueFin || null
    }).subscribe({
      next: (mission) => {
        this.updateMissionInPlan(mission);
        this.showMissionEditModal = false;
        this.isSavingMissionUpdate = false;
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isSavingMissionUpdate = false;
        alert(this.getBackendErrorMessage(error, 'Erreur lors de la mise a jour de la mission.'));
      }
    });
  }

  deleteSelectedMission(): void {
    if (!this.plan || !this.selectedMission || !confirm(`Supprimer la mission ${this.selectedMission.titre} ?`)) {
      return;
    }

    this.isDeletingMission = true;
    this.auditPlanningService.deletePlanMission(this.plan.id, this.selectedMission.id).subscribe({
      next: () => {
        this.isDeletingMission = false;
        this.selectedMissionId = null;
        this.missionWorkspace = null;
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isDeletingMission = false;
        alert(error?.error?.message || 'Erreur lors de la suppression de la mission.');
      }
    });
  }

  restoreMission(missionId: number): void {
    if (!this.plan) {
      return;
    }

    this.isRestoringMission = true;
    this.auditPlanningService.restorePlanMission(this.plan.id, missionId).subscribe({
      next: () => {
        this.isRestoringMission = false;
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isRestoringMission = false;
        alert(error?.error?.message || 'Erreur lors de la restauration de la mission.');
      }
    });
  }

  addResourceRow(): void {
    this.missionResources = [
      ...this.missionResources,
      {
        userId: 0,
        assignmentRoleCode: 'auditeur',
        allocationPercent: 100
      }
    ];
  }

  getAssignableUsers(resource: AuditPlanMissionResource): any[] {
    const assignmentRole = String(resource.assignmentRoleCode || resource.assignmentRole || '').trim();
    if (!assignmentRole) {
      return [];
    }

    return this.users.filter((user) => this.getUserAuditRole(user) === assignmentRole);
  }

  onAssignmentRoleChange(resource: AuditPlanMissionResource): void {
    const selectedUserId = Number(resource.userId || 0);
    if (!selectedUserId) {
      return;
    }

    const userIsCompatible = this.getAssignableUsers(resource)
      .some((user) => Number(user.id) === selectedUserId);

    if (!userIsCompatible) {
      resource.userId = 0;
    }
  }

  removeResourceRow(index: number): void {
    this.missionResources = this.missionResources.filter((_, currentIndex) => currentIndex !== index);
  }

  saveResources(): void {
    if (!this.selectedMissionId || !this.resourcesFormIsValid) {
      return;
    }

    const resources = this.missionResources
      .filter((item) => !!item.userId)
      .map((item) => ({
        userId: Number(item.userId),
        assignmentRole: item.assignmentRoleCode || item.assignmentRole,
        allocationPercent: Number(item.allocationPercent || 100)
      }));

    this.isSavingResources = true;
    this.auditPlanningService.updateMissionResources(this.selectedMissionId, {
      resources,
      requiredSkillIds: this.selectedRequiredSkillIds
    }).subscribe({
      next: () => {
        this.isSavingResources = false;
        this.loadPlan();
        this.loadMissionResources();
        this.loadMissionWorkspace();
      },
      error: (error) => {
        console.error(error);
        this.isSavingResources = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde des ressources.');
      }
    });
  }

  onEvidenceFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedEvidenceFile = input.files?.[0] || null;
  }

  uploadEvidence(): void {
    if (!this.selectedMissionId || !this.selectedEvidenceFile) {
      return;
    }

    this.isUploadingEvidence = true;
    this.auditPlanningService.addMissionEvidence(this.selectedMissionId, this.selectedEvidenceFile).subscribe({
      next: () => {
        this.selectedEvidenceFile = null;
        this.isUploadingEvidence = false;
        this.loadMissionEvidence();
      },
      error: (error) => {
        console.error(error);
        this.isUploadingEvidence = false;
        alert(error?.error?.message || 'Erreur lors du televersement de la preuve.');
      }
    });
  }

  deleteEvidence(evidenceId: number): void {
    if (!this.selectedMissionId || !confirm('Supprimer cette preuve ?')) {
      return;
    }

    this.isDeletingEvidence = true;
    this.auditPlanningService.deleteMissionEvidence(this.selectedMissionId, evidenceId).subscribe({
      next: () => {
        this.isDeletingEvidence = false;
        this.loadMissionEvidence();
      },
      error: (error) => {
        console.error(error);
        this.isDeletingEvidence = false;
        alert(error?.error?.message || 'Erreur lors de la suppression de la preuve.');
      }
    });
  }

  downloadEvidence(path: string): void {
    const token = sessionStorage.getItem('sgrc_token');
    window.open(buildBackendFileUrl(path, { token }), '_blank');
  }

  loadSelectedTemplate(): void {
    const template = this.workProgramTemplates.find((item) => item.id === this.selectedWorkProgramTemplateId);
    if (!template) {
      return;
    }

    this.workProgramItems = (template.items || []).map((item) => ({
      texte: item.texte,
      estFait: false
    }));
  }

  openWorkProgramTemplateManager(): void {
    this.resetWorkProgramTemplateForm();
    this.showWorkProgramTemplateModal = true;
    this.loadWorkProgramTemplates();
  }

  resetWorkProgramTemplateForm(prefillFromProgram = false): void {
    this.editingWorkProgramTemplateId = null;
    this.workProgramTemplateForm = {
      titre: '',
      description: '',
      itemsText: prefillFromProgram
        ? this.workProgramItems
          .map((item) => String(item.texte || '').trim())
          .filter((item) => !!item)
          .join('\n')
        : ''
    };
  }

  editWorkProgramTemplate(template: AuditChecklistTemplate): void {
    this.editingWorkProgramTemplateId = template.id;
    this.workProgramTemplateForm = {
      titre: template.titre || '',
      description: template.description || '',
      itemsText: (template.items || []).map((item) => item.texte).join('\n')
    };
  }

  useWorkProgramTemplate(template: AuditChecklistTemplate): void {
    this.selectedWorkProgramTemplateId = template.id;
    this.loadSelectedTemplate();
    this.showWorkProgramTemplateModal = false;
  }

  private parseWorkProgramTemplateItems(): string[] {
    return String(this.workProgramTemplateForm.itemsText || '')
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter((item) => !!item);
  }

  private getUserAuditRole(user: any): string {
    const role = String(user?.roleCode || user?.role || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');

    if (role.includes('chef') && role.includes('mission')) {
      return 'chef_mission';
    }
    if (role.includes('auditeur')) {
      return 'auditeur';
    }

    return role;
  }

  saveWorkProgramTemplate(): void {
    if (!this.workProgramTemplateFormIsValid) {
      return;
    }

    const payload = {
      titre: String(this.workProgramTemplateForm.titre || '').trim(),
      description: String(this.workProgramTemplateForm.description || '').trim() || null,
      items: this.parseWorkProgramTemplateItems()
    };
    const request = this.editingWorkProgramTemplateId
      ? this.auditPlanningService.updateWorkProgramTemplate(this.editingWorkProgramTemplateId, payload)
      : this.auditPlanningService.createWorkProgramTemplate(payload);

    this.isSavingWorkProgramTemplate = true;
    request.subscribe({
      next: (template) => {
        const existingIndex = this.workProgramTemplates.findIndex((item) => item.id === template.id);
        this.workProgramTemplates = existingIndex >= 0
          ? this.workProgramTemplates.map((item) => item.id === template.id ? template : item)
          : [template, ...this.workProgramTemplates];
        this.selectedWorkProgramTemplateId = template.id;
        this.workProgramItems = (template.items || []).map((item) => ({
          texte: item.texte,
          estFait: false
        }));
        this.resetWorkProgramTemplateForm();
        this.isSavingWorkProgramTemplate = false;
      },
      error: (error) => {
        console.error(error);
        this.isSavingWorkProgramTemplate = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde du modele de programme de travail.');
      }
    });
  }

  deleteWorkProgramTemplate(template: AuditChecklistTemplate): void {
    if (!confirm(`Supprimer le modele "${template.titre}" ?`)) {
      return;
    }

    this.isDeletingWorkProgramTemplate = true;
    this.auditPlanningService.deleteWorkProgramTemplate(template.id).subscribe({
      next: () => {
        this.workProgramTemplates = this.workProgramTemplates.filter((item) => item.id !== template.id);
        if (this.selectedWorkProgramTemplateId === template.id) {
          this.selectedWorkProgramTemplateId = null;
        }
        if (this.editingWorkProgramTemplateId === template.id) {
          this.resetWorkProgramTemplateForm();
        }
        this.isDeletingWorkProgramTemplate = false;
      },
      error: (error) => {
        console.error(error);
        this.isDeletingWorkProgramTemplate = false;
        alert(error?.error?.message || 'Erreur lors de la suppression du modele de programme de travail.');
      }
    });
  }

  addWorkProgramItem(): void {
    this.workProgramItems = [
      ...this.workProgramItems,
      {
        texte: '',
        estFait: false
      }
    ];
  }

  removeWorkProgramItem(index: number): void {
    this.workProgramItems = this.workProgramItems.filter((_, currentIndex) => currentIndex !== index);
  }

  saveWorkProgram(): void {
    if (!this.selectedMissionId || !this.workProgramFormIsValid) {
      return;
    }

    this.isSavingWorkProgram = true;
    this.auditPlanningService.saveMissionWorkProgram(this.selectedMissionId, {
      checklistTemplateId: this.selectedWorkProgramTemplateId,
      items: this.workProgramItems
    }).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.isSavingWorkProgram = false;
      },
      error: (error) => {
        console.error(error);
        this.isSavingWorkProgram = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde du programme de travail.');
      }
    });
  }

  toggleChecklistItem(item: AuditMissionChecklistItem): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.auditPlanningService.toggleMissionWorkProgramItem(this.selectedMissionId, item.id, !item.estFait).subscribe({
      next: (workspace) => this.applyMissionWorkspace(workspace),
      error: (error) => {
        console.error(error);
        alert(error?.error?.message || 'Erreur lors de la mise a jour du point de controle.');
      }
    });
  }

  applyWorkProgramTransition(): void {
    if (!this.selectedMissionId || !this.canSubmitWorkProgramTransition) {
      return;
    }

    this.isApplyingWorkProgramTransition = true;
    this.auditPlanningService.applyMissionWorkProgramTransition(this.selectedMissionId, this.workProgramTransitionForm).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.workProgramTransitionForm = { transition: '', comment: '' };
        this.isApplyingWorkProgramTransition = false;
      },
      error: (error) => {
        console.error(error);
        this.isApplyingWorkProgramTransition = false;
        alert(error?.error?.message || 'Erreur lors de la transition du programme de travail.');
      }
    });
  }

  saveMissionOrder(): void {
    if (!this.selectedMissionId || !this.missionOrderFormIsValid || !this.missionHasRequiredAssignments) {
      return;
    }

    this.isSavingMissionOrder = true;
    this.auditPlanningService.sendMissionOrder(this.selectedMissionId, this.missionOrderForm).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.missionOrderForm.comment = '';
        this.isSavingMissionOrder = false;
      },
      error: (error) => {
        console.error(error);
        this.isSavingMissionOrder = false;
        alert(this.getBackendErrorMessage(error, 'Erreur lors de l envoi de l ordre de mission.'));
      }
    });
  }

  saveReport(): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.isSavingReport = true;
    this.auditPlanningService.saveMissionReport(this.selectedMissionId, this.reportForm).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.isSavingReport = false;
      },
      error: (error) => {
        console.error(error);
        this.isSavingReport = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde du rapport.');
      }
    });
  }

  applyReportTransition(): void {
    if (!this.selectedMissionId || !this.canSubmitReportTransition) {
      return;
    }

    this.isApplyingReportTransition = true;
    this.auditPlanningService.applyMissionReportTransition(this.selectedMissionId, this.reportTransitionForm).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.reportTransitionForm = { transition: '', comment: '' };
        this.isApplyingReportTransition = false;
      },
      error: (error) => {
        console.error(error);
        this.isApplyingReportTransition = false;
        alert(error?.error?.message || 'Erreur lors de la transition du rapport.');
      }
    });
  }

  openActionPlanModal(item?: AuditMissionActionPlanItem): void {
    if (item) {
      this.actionPlanForm = { ...item };
    } else {
      this.actionPlanForm = this.emptyActionPlan();
    }
    this.showActionPlanModal = true;
  }

  openRecommendationWorkflowModal(item: AuditMissionActionPlanItem, transition?: string): void {
    this.selectedRecommendation = item;
    this.recommendationWorkflowHistory = [];
    this.recommendationTransitionForm = {
      transition: transition || '',
      comment: '',
      planAction: item.planAction || '',
      tauxAvancement: item.tauxAvancement ?? 0,
      evaluationAvancement: item.evaluationAvancement || ''
    };
    this.showRecommendationWorkflowModal = true;
    this.loadRecommendationWorkflowHistory(item.id);
  }

  loadRecommendationWorkflowHistory(itemId: number): void {
    if (!this.selectedMissionId || !itemId) {
      this.recommendationWorkflowHistory = [];
      return;
    }

    this.isLoadingRecommendationWorkflowHistory = true;
    this.auditPlanningService.getRecommendationWorkflowEvents(this.selectedMissionId, itemId).subscribe({
      next: (events) => {
        this.recommendationWorkflowHistory = events;
        this.isLoadingRecommendationWorkflowHistory = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoadingRecommendationWorkflowHistory = false;
      }
    });
  }

  applyRecommendationTransition(): void {
    if (!this.selectedMissionId || !this.selectedRecommendation || !this.canSubmitRecommendationTransition) {
      return;
    }

    this.isApplyingRecommendationTransition = true;
    this.auditPlanningService.applyRecommendationTransition(this.selectedMissionId, this.selectedRecommendation.id, {
      transition: this.recommendationTransitionForm.transition,
      comment: String(this.recommendationTransitionForm.comment || '').trim() || null,
      planAction: String(this.recommendationTransitionForm.planAction || '').trim() || null,
      tauxAvancement: this.recommendationTransitionForm.tauxAvancement,
      evaluationAvancement: String(this.recommendationTransitionForm.evaluationAvancement || '').trim() || null
    }).subscribe({
      next: (workspace) => {
        this.applyMissionWorkspace(workspace);
        this.isApplyingRecommendationTransition = false;
        this.showRecommendationWorkflowModal = false;
        this.selectedRecommendation = null;
        this.recommendationWorkflowHistory = [];
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isApplyingRecommendationTransition = false;
        alert(error?.error?.message || 'Erreur lors de la transition de la recommandation.');
      }
    });
  }

  saveActionPlan(): void {
    if (!this.selectedMissionId || !this.actionPlanFormIsValid) {
      return;
    }

    const payload: AuditMissionActionPlanPayload = {
      ordre: Number(this.actionPlanForm.ordre || 0),
      regleDnssi: String(this.actionPlanForm.regleDnssi || ''),
      recommandations: String(this.actionPlanForm.recommandations || ''),
      planActionType: String(this.actionPlanForm.planActionType || '').trim() || null,
      horizon: String(this.actionPlanForm.horizon || '').trim() || null,
      priorite: this.actionPlanForm.priorite ? Number(this.actionPlanForm.priorite) : null,
      responsableId: this.actionPlanForm.responsableId ? Number(this.actionPlanForm.responsableId) : null,
      responsableNom: String(this.actionPlanForm.responsableNom || '').trim() || null,
      echeance: String(this.actionPlanForm.echeance || '').trim() || null,
      etatAvancement: String(this.actionPlanForm.etatAvancement || 'NOK')
    };

    this.isSavingActionPlan = true;
    const request = this.actionPlanForm.id
      ? this.auditPlanningService.updateMissionActionPlan(this.selectedMissionId, this.actionPlanForm.id, payload)
      : this.auditPlanningService.createMissionActionPlan(this.selectedMissionId, payload);

    request.subscribe({
      next: () => {
        this.isSavingActionPlan = false;
        this.showActionPlanModal = false;
        this.loadMissionWorkspace();
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isSavingActionPlan = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde du plan d action.');
      }
    });
  }

  deleteActionPlan(item: AuditMissionActionPlanItem): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.auditPlanningService.deleteMissionActionPlan(this.selectedMissionId, item.id).subscribe({
      next: () => {
        this.loadMissionWorkspace();
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        alert(error?.error?.message || 'Erreur lors de la suppression du plan d action.');
      }
    });
  }

  exportExcel(): void {
    if (!this.plan) {
      return;
    }

    const workbook = XLSX.utils.book_new();
    const summarySheet = XLSX.utils.json_to_sheet([
      {
        Nom: this.plan.nom,
        Nature: this.plan.nature || '',
        Statut: this.plan.status || '',
        Debut: this.plan.dateDebut ? new Date(this.plan.dateDebut).toLocaleDateString() : '',
        Fin: this.plan.dateFin ? new Date(this.plan.dateFin).toLocaleDateString() : '',
        Missions: this.plan.summary?.missionCount || 0,
        Recommandations: this.plan.summary?.recommendationCount || 0
      }
    ]);

    const missionSheet = XLSX.utils.json_to_sheet((this.plan.missions || []).map((mission) => ({
      Code: mission.code || mission.id,
      Mission: mission.titre,
      Categorie: mission.category || '',
      Trimestre: mission.quarter || '',
      DebutPrevu: mission.datePrevueDebut ? new Date(mission.datePrevueDebut).toLocaleDateString() : '',
      FinPrevue: mission.datePrevueFin ? new Date(mission.datePrevueFin).toLocaleDateString() : '',
      Statut: mission.statut,
      ProgrammeTravail: mission.workProgramStatusLabel || '',
      Rapport: mission.reportStatusLabel || '',
      Avancement: mission.progressPercent || 0
    })));

    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Plan');
    XLSX.utils.book_append_sheet(workbook, missionSheet, 'Missions');
    XLSX.writeFile(workbook, `Plan_Audit_${this.plan.id}.xlsx`);
  }

  exportPdf(): void {
    if (!this.plan) {
      return;
    }

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text(`Plan d'audit - ${this.plan.nom}`, 14, 18);
    doc.setFontSize(10);
    doc.text(`Statut: ${this.plan.status || '-'} | Nature: ${this.plan.nature || '-'}`, 14, 26);

    autoTable(doc, {
      startY: 34,
      head: [['Code', 'Mission', 'Categorie', 'Trimestre', 'Programme', 'Rapport', 'Avancement']],
      body: (this.plan.missions || []).map((mission) => [
        String(mission.code || mission.id),
        mission.titre,
        mission.category || '',
        mission.quarter || '',
        String(mission.workProgramStatusLabel || ''),
        String(mission.reportStatusLabel || ''),
        `${mission.progressPercent || 0}%`
      ]),
      theme: 'striped'
    });

    doc.save(`Plan_Audit_${this.plan.id}.pdf`);
  }

  formatResponsibilities(definition: AuditRoleResponsibility | null): string {
    return definition?.responsibilities?.join(' • ') || '-';
  }
}
