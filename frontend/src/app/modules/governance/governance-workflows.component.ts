import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  GovernanceApprovalStage,
  GovernanceApprovalWorkflow,
  GovernanceService,
  GovernanceWorkflowAccessRule,
  GovernanceWorkflowModule,
  GovernanceWorkflowTemplate
} from './governance.service';
import { getGovernanceNavItems, getStoredGovernanceRole } from './governance-navigation';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-governance-workflows',
  templateUrl: './governance-workflows.component.html',
  styleUrls: ['./governance-workflows.component.scss']
})
export class GovernanceWorkflowsComponent implements OnInit {
  readonly currentRole = getStoredGovernanceRole();
  readonly navItems = getGovernanceNavItems(this.currentRole);
  readonly canManageWorkflowConfig = this.currentRole === 'super_admin' || this.currentRole === 'admin_si';
  readonly configurableModules: GovernanceWorkflowModule[] = ['Risques', 'Audit', 'Incidents'];
  readonly workflowViews: Array<{ value: 'tracking' | 'configuration' | 'access'; label: string }> = this.canManageWorkflowConfig
    ? [
      { value: 'tracking', label: 'Suivi' },
      { value: 'configuration', label: 'Configuration' },
      { value: 'access', label: 'Acces' }
    ]
    : [{ value: 'tracking', label: 'Suivi' }];
  readonly statusOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'en_retard', label: 'En retard' },
    { value: 'a_initialiser', label: 'A initialiser' },
    { value: 'approuve', label: 'Approuves' },
    { value: 'rejete', label: 'Rejetes / corrections' }
  ];

  workflows: GovernanceApprovalWorkflow[] = [];
  selectedWorkflow: GovernanceApprovalWorkflow | null = null;
  searchTerm = '';
  statusFilter = 'all';
  moduleFilter = 'all';
  decisionComment = '';
  processingWorkflowId: string | null = null;
  isLoading = false;
  activeView: 'tracking' | 'configuration' | 'access' = 'tracking';
  templates: GovernanceWorkflowTemplate[] = [];
  selectedTemplate: GovernanceWorkflowTemplate = this.emptyTemplate();
  accessRules: GovernanceWorkflowAccessRule[] = [];
  users: Array<{ id: number; nom: string; prenom: string; mail: string }> = [];
  roles: Array<{ code: string; label: string }> = [];
  templateStatus: string | null = null;
  accessStatus: string | null = null;
  instanceStatus: string | null = null;
  instanceEditStages: GovernanceApprovalStage[] = [];
  isEditingInstance = false;

  constructor(
    private router: Router,
    private governanceService: GovernanceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.governanceService.getApprovalWorkflows().subscribe({
      next: workflows => {
        this.workflows = workflows;
        this.selectedWorkflow = this.resolveSelectedWorkflow(workflows);
        this.isLoading = false;
      },
      error: () => {
        this.workflows = [];
        this.selectedWorkflow = null;
        this.isLoading = false;
      }
    });

    this.loadConfigurationData();
  }

  loadConfigurationData(): void {
    if (!this.canManageWorkflowConfig) {
      return;
    }

    this.governanceService.getWorkflowTemplates().subscribe({
      next: templates => {
        this.templates = templates;
        if (!this.selectedTemplate.id && templates.length > 0) {
          this.selectedTemplate = this.cloneTemplate(templates[0]);
        }
      },
      error: () => this.templates = []
    });

    this.governanceService.getWorkflowAccessRules().subscribe({
      next: rules => this.accessRules = rules,
      error: () => this.accessRules = []
    });

    this.http.get<any[]>(`${environment.apiUrl}/users/roles`).subscribe({
      next: roles => this.roles = roles,
      error: () => this.roles = []
    });

    this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe({
      next: users => this.users = users,
      error: () => this.users = []
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/governance']);
  }

  get totalDocuments(): number {
    return this.workflows.reduce((sum, workflow) => sum + workflow.totalDocuments, 0);
  }

  get moduleOptions(): string[] {
    return Array.from(new Set(this.workflows.map(workflow => workflow.module || workflow.channel).filter(Boolean) as string[])).sort();
  }

  get moduleSummaries(): Array<{ module: string; total: number; late: number; progress: number }> {
    return this.moduleOptions.map(module => {
      const items = this.workflows.filter(workflow => (workflow.module || workflow.channel) === module);
      const progress = items.length
        ? Math.round(items.reduce((sum, workflow) => sum + this.getProgress(workflow), 0) / items.length)
        : 0;

      return {
        module,
        total: items.length,
        late: items.filter(workflow => workflow.status === 'en_retard').length,
        progress
      };
    });
  }

  get recentDocuments(): number {
    return this.workflows.reduce((sum, workflow) => sum + workflow.recentDocuments, 0);
  }

  get totalPending(): number {
    return this.workflows.reduce((sum, workflow) => sum + workflow.pending, 0);
  }

  get filteredWorkflows(): GovernanceApprovalWorkflow[] {
    const search = this.normalize(this.searchTerm);

    return this.workflows
      .filter(workflow => this.statusFilter === 'all' || workflow.status === this.statusFilter)
      .filter(workflow => this.moduleFilter === 'all' || (workflow.module || workflow.channel) === this.moduleFilter)
      .filter(workflow => {
        if (!search) {
          return true;
        }

        return [
          workflow.name,
          workflow.scope,
          workflow.channel,
          workflow.module,
          workflow.process,
          workflow.macroProcess,
          workflow.sourceType,
          workflow.sourceId,
          workflow.owner,
          workflow.assignedTo,
          workflow.priority,
          workflow.status,
          workflow.nextAction
        ].some(value => this.normalize(value).includes(search));
      })
      .sort((left, right) => {
        const priorityScore = (workflow: GovernanceApprovalWorkflow) =>
          workflow.status === 'en_retard' ? 0 : workflow.status === 'en_cours' ? 1 : workflow.status === 'a_initialiser' ? 2 : 3;
        return priorityScore(left) - priorityScore(right);
      });
  }

  get approvalRate(): number {
    const required = this.workflows.reduce((sum, workflow) => sum + (workflow.requiredApprovals || 0), 0);
    const completed = this.workflows.reduce((sum, workflow) => sum + (workflow.completedApprovals || 0), 0);
    return required > 0 ? Math.round((completed / required) * 100) : 0;
  }

  get lateWorkflows(): number {
    return this.workflows.filter(workflow => workflow.status === 'en_retard').length;
  }

  selectWorkflow(workflow: GovernanceApprovalWorkflow): void {
    this.selectedWorkflow = workflow;
    this.decisionComment = '';
  }

  getWorkflowBadgeClass(workflow: GovernanceApprovalWorkflow): string {
    return workflow.alertClass || 'success';
  }

  getStatusLabel(workflow: GovernanceApprovalWorkflow): string {
    switch (workflow.status) {
      case 'en_retard':
        return 'En retard';
      case 'a_initialiser':
        return 'A initialiser';
      case 'approuve':
        return 'Approuve';
      case 'en_cours':
        return 'En cours';
      case 'rejete':
        return 'Rejete / correction';
      default:
        return workflow.alert;
    }
  }

  getStatusClass(workflow: GovernanceApprovalWorkflow): string {
    switch (workflow.status) {
      case 'en_retard':
        return 'warning';
      case 'a_initialiser':
        return 'info';
      case 'approuve':
        return 'success';
      case 'rejete':
        return 'danger';
      default:
        return this.getWorkflowBadgeClass(workflow);
    }
  }

  getStageClass(status?: string): string {
    return status || 'todo';
  }

  getProgress(workflow: GovernanceApprovalWorkflow | null): number {
    if (!workflow) {
      return 0;
    }

    return Math.max(0, Math.min(100, workflow.progress || 0));
  }

  isSelected(workflow: GovernanceApprovalWorkflow): boolean {
    return this.selectedWorkflow?.id === workflow.id || this.selectedWorkflow?.name === workflow.name;
  }

  canAct(workflow: GovernanceApprovalWorkflow | null): boolean {
    return !!workflow && workflow.actionable !== false && workflow.status !== 'approuve' && workflow.status !== 'rejete' && this.processingWorkflowId !== workflow.id;
  }

  approveSelectedWorkflow(): void {
    this.submitWorkflowAction('approve');
  }

  requestChangesForSelectedWorkflow(): void {
    this.submitWorkflowAction('request_changes');
  }

  rejectSelectedWorkflow(): void {
    this.submitWorkflowAction('reject');
  }

  restartSelectedWorkflow(): void {
    this.submitWorkflowAction('restart');
  }

  switchView(view: 'tracking' | 'configuration' | 'access'): void {
    this.activeView = view;
  }

  createTemplate(): void {
    this.selectedTemplate = this.emptyTemplate();
    this.templateStatus = null;
  }

  editTemplate(template: GovernanceWorkflowTemplate): void {
    this.selectedTemplate = this.cloneTemplate(template);
    this.templateStatus = null;
  }

  addTemplateStage(): void {
    this.selectedTemplate.stages.push({ role: '', owner: '', rule: '', slaDays: null, escalationTo: '', escalationRule: '' });
  }

  removeTemplateStage(index: number): void {
    if (this.selectedTemplate.stages.length <= 1) {
      return;
    }
    this.selectedTemplate.stages.splice(index, 1);
  }

  saveTemplate(): void {
    if (!this.selectedTemplate.title.trim() || this.selectedTemplate.stages.some(stage => !stage.role.trim() || !stage.rule.trim())) {
      this.templateStatus = 'Le titre, les roles et les regles des etapes sont obligatoires.';
      return;
    }

    this.governanceService.saveWorkflowTemplate(this.selectedTemplate).subscribe({
      next: template => {
        this.templateStatus = 'Modele workflow enregistre.';
        const index = this.templates.findIndex(item => item.id === template.id);
        if (index >= 0) {
          this.templates[index] = template;
        } else {
          this.templates = [template, ...this.templates];
        }
        this.selectedTemplate = this.cloneTemplate(template);
        this.loadData();
      },
      error: err => this.templateStatus = err?.error?.message || 'Erreur lors de la sauvegarde du modele.'
    });
  }

  startInstanceEdit(workflow: GovernanceApprovalWorkflow): void {
    if (!workflow.id || workflow.sourceType === 'document') {
      return;
    }

    this.selectedWorkflow = workflow;
    this.instanceEditStages = workflow.stages.map(stage => ({ ...stage }));
    this.isEditingInstance = true;
    this.instanceStatus = null;
  }

  addInstanceStage(): void {
    this.instanceEditStages.push({ role: '', owner: '', rule: '', slaDays: null, escalationTo: '', escalationRule: '' });
  }

  removeInstanceStage(index: number): void {
    if (this.instanceEditStages.length <= 1) {
      return;
    }
    this.instanceEditStages.splice(index, 1);
  }

  saveInstanceConfig(): void {
    if (!this.selectedWorkflow || !this.instanceEditStages.length) {
      return;
    }

    if (this.instanceEditStages.some(stage => !stage.role.trim() || !stage.rule.trim())) {
      this.instanceStatus = 'Les roles et regles des etapes sont obligatoires.';
      return;
    }

    this.governanceService.saveWorkflowInstanceConfig(this.selectedWorkflow, this.instanceEditStages, this.selectedWorkflow.scope).subscribe({
      next: () => {
        this.instanceStatus = 'Processus de cette instance modifie.';
        this.isEditingInstance = false;
        this.loadData();
      },
      error: err => this.instanceStatus = err?.error?.message || 'Erreur lors de la modification du processus.'
    });
  }

  resetInstanceConfig(workflow: GovernanceApprovalWorkflow): void {
    if (!workflow.id) {
      return;
    }

    this.governanceService.resetWorkflowInstanceConfig(workflow.id).subscribe({
      next: () => {
        this.instanceStatus = 'Surcharge supprimee. Le modele global sera applique.';
        this.isEditingInstance = false;
        this.loadData();
      },
      error: err => this.instanceStatus = err?.error?.message || 'Erreur lors de la reinitialisation.'
    });
  }

  addAccessRule(): void {
    this.accessRules = [
      ...this.accessRules,
      {
        module: 'Risques',
        process: null,
        principalType: 'role',
        principalRole: this.roles[0]?.code || 'risk_manager',
        principalUserId: null,
        canView: true,
        canEdit: false,
        canApprove: false,
        canAdmin: false
      }
    ];
  }

  removeAccessRule(index: number): void {
    this.accessRules.splice(index, 1);
    this.accessRules = [...this.accessRules];
  }

  saveAccessRules(): void {
    this.governanceService.saveWorkflowAccessRules(this.accessRules).subscribe({
      next: rules => {
        this.accessRules = rules;
        this.accessStatus = 'Regles d acces enregistrees.';
        this.loadData();
      },
      error: err => this.accessStatus = err?.error?.message || 'Erreur lors de la sauvegarde des acces.'
    });
  }

  onPrincipalTypeChange(rule: GovernanceWorkflowAccessRule): void {
    if (rule.principalType === 'role') {
      rule.principalRole = this.roles[0]?.code || 'risk_manager';
      rule.principalUserId = null;
    } else {
      rule.principalRole = null;
      rule.principalUserId = this.users[0]?.id || null;
    }
  }

  exportWorkflows(): void {
    const rows = [
      ['Module', 'Workflow', 'Processus', 'Statut', 'Priorite', 'Progression', 'Objets', 'En attente', 'Echeance', 'Prochaine action'],
      ...this.filteredWorkflows.map(workflow => [
        workflow.module || workflow.channel,
        workflow.name,
        workflow.process || workflow.scope,
        this.getStatusLabel(workflow),
        workflow.priority || '',
        `${this.getProgress(workflow)}%`,
        `${workflow.totalDocuments}`,
        `${workflow.pending}`,
        workflow.dueDate || '',
        workflow.nextAction || ''
      ])
    ];
    const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `workflows_approbation_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  getUserLabel(userId?: number | null): string {
    const user = this.users.find(item => item.id === Number(userId));
    return user ? `${user.prenom} ${user.nom}` : 'Utilisateur';
  }

  private emptyTemplate(): GovernanceWorkflowTemplate {
    return {
      module: 'Risques',
      process: null,
      title: '',
      description: '',
      isActive: true,
      stages: [
        {
          role: 'Responsable metier',
          owner: '',
          rule: 'Verifier et qualifier le dossier.',
          slaDays: 5,
          escalationTo: 'Manager',
          escalationRule: 'Escalader si le SLA est depasse sans decision.'
        },
        {
          role: 'Validation gouvernance',
          owner: '',
          rule: 'Valider la coherence et tracer la decision.',
          slaDays: 5,
          escalationTo: 'Top Management',
          escalationRule: 'Escalader les blocages critiques ou retards repetes.'
        }
      ]
    };
  }

  private cloneTemplate(template: GovernanceWorkflowTemplate): GovernanceWorkflowTemplate {
    return {
      ...template,
      stages: template.stages.map(stage => ({ ...stage }))
    };
  }

  private resolveSelectedWorkflow(workflows: GovernanceApprovalWorkflow[]): GovernanceApprovalWorkflow | null {
    if (!workflows.length) {
      return null;
    }

    const currentId = this.selectedWorkflow?.id;
    return workflows.find(workflow => workflow.id === currentId) || workflows[0];
  }

  private submitWorkflowAction(action: 'approve' | 'reject' | 'request_changes' | 'restart'): void {
    if (!this.selectedWorkflow?.id) {
      return;
    }

    const workflowId = this.selectedWorkflow.id;
    this.processingWorkflowId = workflowId;
    this.governanceService.actOnApprovalWorkflow(workflowId, action, this.decisionComment).subscribe({
      next: updatedWorkflow => {
        this.workflows = this.workflows.map(workflow =>
          workflow.id === updatedWorkflow.id ? updatedWorkflow : workflow
        );
        this.selectedWorkflow = updatedWorkflow;
        this.decisionComment = '';
        this.processingWorkflowId = null;
      },
      error: () => {
        this.processingWorkflowId = null;
      }
    });
  }

  private normalize(value?: unknown): string {
    return (value == null ? '' : String(value))
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
