import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GovernanceApprovalWorkflow, GovernanceService } from './governance.service';
import { getGovernanceNavItems, getStoredGovernanceRole } from './governance-navigation';

@Component({
  selector: 'app-governance-workflows',
  templateUrl: './governance-workflows.component.html',
  styleUrls: ['./governance-workflows.component.scss']
})
export class GovernanceWorkflowsComponent implements OnInit {
  readonly navItems = getGovernanceNavItems(getStoredGovernanceRole());
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

  constructor(
    private router: Router,
    private governanceService: GovernanceService
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
