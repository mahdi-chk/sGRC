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
  AuditMissionWorkspace,
  AuditPlan,
  AuditPlanMission,
  AuditPlanMissionResource,
  AuditPlanTransitionPayload,
  AuditPlanningService,
  AuditResponsibilityMatrixResponse,
  AuditRoleResponsibility,
  AuditSkill,
  LookupOption
} from '../../core/services/audit-planning.service';
import { UserService } from '../../core/services/user.service';
import { UserRole } from '../../core/models/user-role.enum';
import { getAuditPlanningNavItems, getStoredAuditRole } from './audit-navigation';
import { environment } from '../../../environments/environment';

type AuditDetailTabId = 'informations' | 'workflow' | 'missions' | 'planning' | 'resources' | 'recommendations' | 'competences';

type AuditDetailTab = {
  id: AuditDetailTabId;
  label: string;
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
  isSavingUserSkills = false;
  isLoadingMissionWorkspace = false;
  isSavingMissionOrder = false;
  isSavingWorkProgram = false;
  isApplyingWorkProgramTransition = false;
  isSavingReport = false;
  isApplyingReportTransition = false;
  isSavingActionPlan = false;

  statusOptions: LookupOption[] = [];
  natureOptions: LookupOption[] = [];
  categoryOptions: LookupOption[] = [];
  quarterOptions: LookupOption[] = [];
  assignmentRoleOptions: LookupOption[] = [];

  users: any[] = [];
  skills: AuditSkill[] = [];
  workProgramTemplates: AuditChecklistTemplate[] = [];

  showMissionModal = false;
  showMissionEditModal = false;
  showActionPlanModal = false;
  selectedMissionId: number | null = null;
  deletedMissions: AuditPlanMission[] = [];
  missionResources: AuditPlanMissionResource[] = [];
  selectedRequiredSkillIds: number[] = [];
  selectedUserSkillIds: number[] = [];
  selectedUserForSkillsId: number | null = null;
  selectedWorkProgramTemplateId: number | null = null;
  workProgramItems: Partial<AuditMissionChecklistItem>[] = [];
  missionEvidence: AuditEvidence[] = [];
  selectedEvidenceFile: File | null = null;
  isUploadingEvidence = false;
  isDeletingEvidence = false;
  isSavingMissionUpdate = false;
  isDeletingMission = false;
  isRestoringMission = false;
  backendUrl = environment.serverUrl;

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

  missionForm: Partial<AuditPlanMission> = this.emptyMission();
  missionEditForm: Partial<AuditPlanMission> = this.emptyMission();

  readonly actionPlanStatuses = ['NOK', 'En cours', 'OK'];
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
      description: 'Affecter les ressources et les competences.',
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
    return role === UserRole.AUDIT_DIRECTEUR || role === UserRole.AUDIT_RESPONSABLE || role === UserRole.CHEF_MISSION || role === UserRole.SUPER_ADMIN;
  }

  get canViewResourcesTab(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR
      || role === UserRole.AUDIT_RESPONSABLE
      || role === UserRole.CHEF_MISSION
      || role === UserRole.AUDITEUR
      || role === UserRole.SUPER_ADMIN;
  }

  get canViewSkillsTab(): boolean {
    const role = this.currentUserRole;
    return role === UserRole.AUDIT_DIRECTEUR
      || role === UserRole.AUDIT_RESPONSABLE
      || role === UserRole.CHEF_MISSION
      || role === UserRole.SUPER_ADMIN;
  }

  get visibleTabs(): AuditDetailTab[] {
    const tabs: AuditDetailTab[] = [
      { id: 'informations', label: 'Informations' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'missions', label: this.planScopeLabel },
      { id: 'planning', label: 'Planning' },
    ];

    if (this.canViewResourcesTab) {
      tabs.push({ id: 'resources', label: 'Ressources' });
    }

    tabs.push({ id: 'recommendations', label: 'Recommandations' });

    if (this.canViewSkillsTab) {
      tabs.push({ id: 'competences', label: 'Competences' });
    }

    return tabs;
  }

  get selectedMission(): AuditPlanMission | null {
    return this.plan?.missions?.find((mission) => mission.id === this.selectedMissionId) || null;
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

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLookups();
    this.loadUsers();
    this.loadSkills();
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
    this.auditPlanningService.getLookupOptions('auditMissionResource.assignmentRole').subscribe(data => this.assignmentRoleOptions = data);
  }

  loadUsers(): void {
    this.userService.getAssignableIncidentUsers().subscribe(data => this.users = data);
  }

  loadSkills(): void {
    this.auditPlanningService.getSkills().subscribe(data => this.skills = data);
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
        alert(error?.error?.message || 'Erreur lors de la transition du plan.');
      }
    });
  }

  openMissionModal(): void {
    this.missionForm = this.emptyMission();
    this.showMissionModal = true;
  }

  saveMission(): void {
    if (!this.plan || !this.missionForm.titre || !this.missionForm.objectifs) {
      return;
    }

    this.isSavingMission = true;
    this.auditPlanningService.createPlanMission(this.plan.id, {
      titre: this.missionForm.titre,
      objectifs: this.missionForm.objectifs,
      responsabilites: this.missionForm.responsabilites || null,
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
        alert(error?.error?.message || 'Erreur lors de la creation de la mission.');
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
    if (!this.plan || !this.selectedMission || !this.missionEditForm.titre || !this.missionEditForm.objectifs) {
      return;
    }

    this.isSavingMissionUpdate = true;
    this.auditPlanningService.updatePlanMission(this.plan.id, this.selectedMission.id, {
      titre: this.missionEditForm.titre,
      objectifs: this.missionEditForm.objectifs,
      responsabilites: this.missionEditForm.responsabilites || null,
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
        alert(error?.error?.message || 'Erreur lors de la mise a jour de la mission.');
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
        assignmentRoleCode: this.assignmentRoleOptions[0]?.code || 'auditeur',
        allocationPercent: 100
      }
    ];
  }

  removeResourceRow(index: number): void {
    this.missionResources = this.missionResources.filter((_, currentIndex) => currentIndex !== index);
  }

  saveResources(): void {
    if (!this.selectedMissionId) {
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
    const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
    const normalizedPath = path.replace(/\\/g, '/');
    const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
    const token = sessionStorage.getItem('sgrc_token');
    const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
    window.open(urlWithToken, '_blank');
  }

  loadUserSkills(): void {
    if (!this.selectedUserForSkillsId) {
      this.selectedUserSkillIds = [];
      return;
    }

    this.userService.getUserAuditSkills(this.selectedUserForSkillsId).subscribe({
      next: (items) => {
        this.selectedUserSkillIds = items.map((item: any) => item.skillId);
      },
      error: (error) => console.error(error)
    });
  }

  saveUserSkills(): void {
    if (!this.selectedUserForSkillsId) {
      return;
    }

    this.isSavingUserSkills = true;
    this.userService.updateUserAuditSkills(this.selectedUserForSkillsId, this.selectedUserSkillIds).subscribe({
      next: () => {
        this.isSavingUserSkills = false;
        this.loadPlan();
      },
      error: (error) => {
        console.error(error);
        this.isSavingUserSkills = false;
        alert(error?.error?.message || 'Erreur lors de la sauvegarde des competences utilisateur.');
      }
    });
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
    if (!this.selectedMissionId) {
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
    if (!this.selectedMissionId || !this.workProgramTransitionForm.transition) {
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
    if (!this.selectedMissionId) {
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
        alert(error?.error?.message || 'Erreur lors de l envoi de l ordre de mission.');
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
    if (!this.selectedMissionId || !this.reportTransitionForm.transition) {
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

  saveActionPlan(): void {
    if (!this.selectedMissionId || !this.actionPlanForm.regleDnssi || !this.actionPlanForm.recommandations) {
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

  formatSkillLabels(skills: AuditSkill[] | null | undefined): string {
    const labels = (skills || []).map((skill) => skill.label).filter(Boolean);
    return labels.length > 0 ? labels.join(', ') : '-';
  }

  formatResponsibilities(definition: AuditRoleResponsibility | null): string {
    return definition?.responsibilities?.join(' • ') || '-';
  }
}
