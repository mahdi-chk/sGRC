import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../core/services/notification.service';
import { getActionsNavItems, getStoredActionsRole } from './actions-navigation';
import {
  ActionAssignableUser,
  ActionOperationResponse,
  ActionRegistryItem,
  ActionsOverview,
  ActionsService
} from './actions.service';

type FilterKey = 'q' | 'status' | 'source' | 'priority' | 'owner';

@Component({
  selector: 'app-actions-centralized',
  templateUrl: './actions-centralized.component.html',
  styleUrls: ['./actions-centralized.component.scss']
})
export class ActionsCentralizedComponent implements OnInit {
  readonly navItems = getActionsNavItems(getStoredActionsRole());
  overview: ActionsOverview | null = null;
  isLoading = false;
  assignmentItem: ActionRegistryItem | null = null;
  assignableUsers: ActionAssignableUser[] = [];
  selectedAssigneeId = '';
  isLoadingAssignableUsers = false;
  isSubmittingAssignment = false;
  activeActionKey = '';
  feedbackMessage = '';
  feedbackTone: 'success' | 'error' | '' = '';
  filters: Record<FilterKey, string> = {
    q: '',
    status: '',
    source: '',
    priority: '',
    owner: ''
  };

  readonly statusOptions = ['en_retard', 'bloquee', 'en_cours', 'a_demarrer', 'clos'];
  readonly priorityOptions = ['critique', 'elevee', 'moyenne', 'faible'];
  readonly ownerOptions = [
    { value: '', label: 'Tous' },
    { value: 'assigned', label: 'Assignes' },
    { value: 'non_assigne', label: 'Non assignes' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsService: ActionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filters = {
        q: params.get('q') || '',
        status: params.get('status') || '',
        source: params.get('source') || '',
        priority: params.get('priority') || '',
        owner: params.get('owner') || ''
      };
    });

    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.actionsService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/actions']);
  }

  onFilterChange(key: FilterKey, value: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters = { q: '', status: '', source: '', priority: '', owner: '' };
    this.applyFilters();
  }

  applyFilters(): void {
    const queryParams = Object.entries(this.filters).reduce((accumulator, [key, value]) => {
      if (value) {
        accumulator[key] = value;
      }
      return accumulator;
    }, {} as Record<string, string>);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  onActionClick(action: string, item: ActionRegistryItem): void {
    if (action === 'Voir source') {
      this.clearFeedback();
      this.router.navigate([item.sourceRoute]);
      return;
    }

    if (action === 'Suivre' || action === 'Planifier') {
      this.clearFeedback();
      this.router.navigate(['/dashboard/actions-deadlines'], {
        queryParams: { q: item.reference }
      });
      return;
    }

    if (action === 'Relancer') {
      this.sendReminder(item);
      return;
    }

    if (action === 'Escalader') {
      this.clearFeedback();
      this.router.navigate(['/dashboard/actions-notifications'], {
        queryParams: {
          status: 'active',
          q: item.reference,
          focus: action.toLowerCase()
        }
      });
      return;
    }

    if (action === 'Affecter') {
      this.openAssignmentPanel(item);
    }
  }

  openAssignmentPanel(item: ActionRegistryItem): void {
    this.assignmentItem = item;
    this.selectedAssigneeId = '';
    this.assignableUsers = [];
    this.clearFeedback();
    this.isLoadingAssignableUsers = true;
    this.activeActionKey = this.buildActionKey(item, 'Affecter');

    this.actionsService.getAssignableUsers(item.id).pipe(
      finalize(() => {
        this.isLoadingAssignableUsers = false;
        this.activeActionKey = '';
      })
    ).subscribe({
      next: users => {
        this.assignableUsers = users;
        if (!users.length) {
          this.setFeedback('Aucun responsable assignable n est disponible pour cette action.', 'error');
        }
      },
      error: error => {
        this.assignmentItem = null;
        this.setFeedback(this.getErrorMessage(error, 'Impossible d ouvrir le panneau d affectation.'), 'error');
      }
    });
  }

  closeAssignmentPanel(): void {
    this.assignmentItem = null;
    this.assignableUsers = [];
    this.selectedAssigneeId = '';
    this.isLoadingAssignableUsers = false;
    this.isSubmittingAssignment = false;
  }

  submitAssignment(): void {
    if (!this.assignmentItem || !this.selectedAssigneeId || this.isSubmittingAssignment) {
      return;
    }

    const targetItem = this.assignmentItem;
    this.clearFeedback();
    this.isSubmittingAssignment = true;
    this.activeActionKey = this.buildActionKey(targetItem, 'Affecter');

    this.actionsService.assignAction(targetItem.id, Number(this.selectedAssigneeId)).pipe(
      finalize(() => {
        this.isSubmittingAssignment = false;
        this.activeActionKey = '';
      })
    ).subscribe({
      next: response => {
        this.closeAssignmentPanel();
        this.notificationService.refresh();
        this.setFeedback(response.message || 'Affectation enregistree avec succes.', 'success');
        this.loadOverview();
      },
      error: error => {
        this.setFeedback(this.getErrorMessage(error, 'Impossible d affecter cette action.'), 'error');
      }
    });
  }

  sendReminder(item: ActionRegistryItem): void {
    this.clearFeedback();
    this.activeActionKey = this.buildActionKey(item, 'Relancer');

    this.actionsService.sendReminder(item.id).pipe(
      finalize(() => {
        this.activeActionKey = '';
      })
    ).subscribe({
      next: (response: ActionOperationResponse) => {
        this.notificationService.refresh();
        const recipientLabel = response.sentCount ? ` (${response.sentCount} destinataire${response.sentCount > 1 ? 's' : ''})` : '';
        this.setFeedback(`${response.message || 'Relance envoyee'}${recipientLabel}.`, 'success');
      },
      error: error => {
        this.setFeedback(this.getErrorMessage(error, 'Impossible de creer la relance.'), 'error');
      }
    });
  }

  get registry(): ActionRegistryItem[] {
    return this.overview?.registry || [];
  }

  get filteredRegistry(): ActionRegistryItem[] {
    return this.registry.filter(item => {
      const query = this.filters.q.trim().toLowerCase();
      const matchesQuery = !query || [
        item.reference,
        item.title,
        item.sourceModule,
        item.sourceReference,
        item.owner,
        item.department
      ].some(value => String(value || '').toLowerCase().includes(query));

      const matchesStatus = !this.filters.status || item.status === this.filters.status;
      const matchesSource = !this.filters.source || item.sourceModule === this.filters.source;
      const matchesPriority = !this.filters.priority || item.priority === this.filters.priority;
      const matchesOwner = !this.filters.owner ||
        (this.filters.owner === 'assigned' && item.owner !== 'Non assigne') ||
        (this.filters.owner === 'non_assigne' && item.owner === 'Non assigne');

      return matchesQuery && matchesStatus && matchesSource && matchesPriority && matchesOwner;
    });
  }

  get criticalCount(): number {
    return this.registry.filter(item => /critique|critical/i.test(item.priority || '')).length;
  }

  get linkedModulesCount(): number {
    return new Set(this.registry.map(item => item.sourceModule)).size;
  }

  get sourceOptions(): string[] {
    return Array.from(new Set(this.registry.map(item => item.sourceModule))).sort();
  }

  get canSubmitAssignment(): boolean {
    return Boolean(this.assignmentItem && this.selectedAssigneeId && !this.isSubmittingAssignment);
  }

  buildUserLabel(user: ActionAssignableUser): string {
    const name = `${user.prenom || ''} ${user.nom || ''}`.trim();
    const meta = [user.poste, user.mail].filter(Boolean).join(' | ');
    return meta ? `${name} - ${meta}` : name;
  }

  isActionBusy(action: string, item: ActionRegistryItem): boolean {
    return this.activeActionKey === this.buildActionKey(item, action);
  }

  getActionLabel(action: string, item: ActionRegistryItem): string {
    if (!this.isActionBusy(action, item)) {
      return action;
    }

    if (action === 'Relancer') {
      return 'Relance...';
    }

    if (action === 'Affecter') {
      return this.isSubmittingAssignment || this.isLoadingAssignableUsers ? 'Affectation...' : action;
    }

    return 'Chargement...';
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${String(value || '').replace(/_/g, '-')}`;
  }

  private buildActionKey(item: ActionRegistryItem, action: string): string {
    return `${item.id}:${action}`;
  }

  private setFeedback(message: string, tone: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackTone = tone;
  }

  private clearFeedback(): void {
    this.feedbackMessage = '';
    this.feedbackTone = '';
  }

  private getErrorMessage(error: any, fallback: string): string {
    return error?.error?.message || fallback;
  }
}
