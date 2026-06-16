import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuditMission, AuditMissionStatus, AuditRecordType, AuditingService } from '../../core/services/auditing.service';
import { Incident, IncidentService, IncidentStatus } from '../../core/services/incident.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user-role.enum';

export interface ActionFilterState {
  q?: string;
  status?: string;
  source?: string;
  priority?: string;
  owner?: string;
}

export interface ActionsSummary {
  totalOpenActions: number;
  overdueActions: number;
  dueThisMonth: number;
  completionRate: number;
  activeAlerts: number;
  effectivenessScore: number;
  criticalActions: number;
  blockedActions: number;
  multiAssignedActions: number;
}

export interface ActionHistoryItem {
  at: string;
  event: string;
  actor: string;
  detail: string;
}

export interface ActionRegistryItem {
  id: string;
  reference: string;
  title: string;
  sourceModule: string;
  sourceReference: string;
  sourceRoute: string;
  priority: string;
  status: string;
  dueDate: string | null;
  owner: string;
  department: string;
  progress: number;
  dependencies: string[];
  displayActions: string[];
  lastUpdate: string;
  startDate?: string | null;
  assignees: string[];
  resources: string[];
  statusLabel: string;
  history: ActionHistoryItem[];
}

export interface ActionDeadlineItem {
  id: string;
  title: string;
  milestone: string;
  dueDate: string | null;
  status: string;
  progress: number;
  owner: string;
  blocker: string | null;
  forecast: string;
  startDate: string | null;
  dependencyCount: number;
  resourceLoad: string;
}

export interface ActionNotificationItem {
  id: string;
  title: string;
  channel: string;
  audience: string;
  trigger: string;
  nextSendAt: string | null;
  escalationLevel: string;
  status: string;
  detailLabel?: string;
  detailFilter?: ActionFilterState;
  rule: string;
  roleScope: string;
}

export interface ActionAssignableUser {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  poste?: string | null;
  roleId?: number | null;
}

export interface ActionOperationResponse {
  message: string;
  sentCount?: number;
  recipients?: Array<{ id: number; name: string }>;
  assignee?: { id: number; name: string };
}

export interface ActionIndicatorItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  target: number;
  trend: string;
  commentary: string;
}

export interface ActionTrackingUpdate {
  title?: string;
  dueDate?: string | null;
  status?: string;
  progress?: number;
}

export interface ActionTodoItem {
  id: string;
  title: string;
  detail: string;
  tone: string;
  sourceModule: string;
  owner: string;
  dueDate: string | null;
}

export interface ActionsOverview {
  generatedAt: string;
  summary: ActionsSummary;
  registry: ActionRegistryItem[];
  deadlines: ActionDeadlineItem[];
  notifications: ActionNotificationItem[];
  indicators: ActionIndicatorItem[];
  todoActions: ActionTodoItem[];
}

@Injectable({ providedIn: 'root' })
export class ActionsService {
  private apiUrl = `${environment.apiUrl}/actions`;

  constructor(
    private http: HttpClient,
    private riskService: RiskService,
    private incidentService: IncidentService,
    private auditingService: AuditingService,
    private authService: AuthService
  ) {}

  getOverview(): Observable<ActionsOverview> {
    return this.http.get<ActionsOverview>(`${this.apiUrl}/overview`).pipe(
      map(overview => this.applyAccessGuard(this.enrichOverview(overview))),
      catchError(() => this.getFallbackOverview())
    );
  }

  getAssignableUsers(actionId: string): Observable<ActionAssignableUser[]> {
    return this.http.get<ActionAssignableUser[]>(`${this.apiUrl}/${encodeURIComponent(actionId)}/assignable-users`);
  }

  sendReminder(actionId: string, note?: string): Observable<ActionOperationResponse> {
    return this.http.post<ActionOperationResponse>(`${this.apiUrl}/${encodeURIComponent(actionId)}/remind`, {
      note: note || ''
    });
  }

  assignAction(actionId: string, userId: number): Observable<ActionOperationResponse> {
    return this.http.put<ActionOperationResponse>(`${this.apiUrl}/${encodeURIComponent(actionId)}/assign`, {
      userId
    });
  }

  updateActionTracking(actionId: string, payload: ActionTrackingUpdate): Observable<ActionOperationResponse> {
    return this.http.put<ActionOperationResponse>(`${this.apiUrl}/${encodeURIComponent(actionId)}/tracking`, payload);
  }

  private getFallbackOverview(): Observable<ActionsOverview> {
    return combineLatest([
      this.riskService.getRisks().pipe(catchError(() => of([] as Risk[]))),
      this.incidentService.getIncidents().pipe(catchError(() => of([] as Incident[]))),
      this.auditingService.getMissions('all').pipe(catchError(() => of([] as AuditMission[])))
    ]).pipe(
      map(([risks, incidents, missions]) => {
        const role = this.authService.getUserRole();

        return this.enrichOverview(this.buildOverview(
          risks,
          role === UserRole.RISK_AGENT ? [] : incidents,
          role === UserRole.RISK_AGENT ? [] : missions
        ));
      }),
      map(overview => this.applyAccessGuard(overview))
    );
  }

  private buildOverview(risks: Risk[], incidents: Incident[], missions: AuditMission[]): ActionsOverview {
    const registry = [
      ...this.mapRisksToActions(risks),
      ...this.mapIncidentsToActions(incidents),
      ...this.mapAuditsToActions(missions)
    ].sort((left, right) => this.compareRegistryItems(left, right));

    return this.buildOverviewFromRegistry(registry);
  }

  private buildOverviewFromRegistry(registry: ActionRegistryItem[], generatedAt: string = new Date().toISOString()): ActionsOverview {
    const openRegistry = registry.filter(item => !this.isTerminalStatus(item.status));
    const closedRegistry = registry.filter(item => this.isTerminalStatus(item.status));
    const overdueActions = openRegistry.filter(item => this.isOverdue(item.dueDate)).length;
    const dueThisMonth = openRegistry.filter(item => this.isDueWithin(item.dueDate, 30)).length;
    const criticalActions = openRegistry.filter(item => this.isCriticalPriority(item.priority)).length;
    const blockedActions = openRegistry.filter(item => item.status === 'bloquee' || item.dependencies.length >= 2).length;
    const completionRate = registry.length > 0 ? Math.round((closedRegistry.length / registry.length) * 100) : 0;
    const overdueRate = openRegistry.length > 0 ? Math.round((overdueActions / openRegistry.length) * 100) : 0;
    const effectivenessScore = Math.max(0, Math.min(100, Math.round((completionRate * 0.6) + ((100 - overdueRate) * 0.4))));
    const multiAssignedActions = registry.filter(item => item.assignees.length > 1).length;

    const notifications = this.buildNotifications(openRegistry, overdueActions, dueThisMonth, criticalActions);
    const indicators = this.buildIndicators(registry, openRegistry, completionRate, effectivenessScore, criticalActions, overdueActions);

    return {
      generatedAt,
      summary: {
        totalOpenActions: openRegistry.length,
        overdueActions,
        dueThisMonth,
        completionRate,
        activeAlerts: notifications.filter(item => item.status === 'active').length,
        effectivenessScore,
        criticalActions,
        blockedActions,
        multiAssignedActions
      },
      registry,
      deadlines: this.buildDeadlines(openRegistry),
      notifications,
      indicators,
      todoActions: this.buildTodoActions(openRegistry)
    };
  }

  private applyAccessGuard(overview: ActionsOverview): ActionsOverview {
    const allowedSources = this.getAllowedSourcesForCurrentRole();

    if (!allowedSources) {
      return overview;
    }

    const registry = (overview.registry || [])
      .filter(item => allowedSources.includes(this.normalizeValue(item.sourceModule)))
      .sort((left, right) => this.compareRegistryItems(left, right));

    return this.buildOverviewFromRegistry(registry, overview.generatedAt);
  }

  private getAllowedSourcesForCurrentRole(): string[] | null {
    const role = this.authService.getUserRole();

    if (role === UserRole.RISK_AGENT) {
      return ['risques'];
    }

    return null;
  }

  private mapRisksToActions(risks: Risk[]): ActionRegistryItem[] {
    return risks.map(risk => {
      const normalizedStatus = RiskService.getRiskStatusCode(risk);
      const priority = this.normalizePriority(RiskService.getRiskLevelCode(risk));
      const owner = this.buildDisplayName((risk as any).responsableTraitement) ||
        this.buildDisplayName((risk as any).riskAgent) ||
        'Non assigne';
      const dueDate = this.toIsoString((risk as any).dateEcheance || (risk as any).prochaineEcheance);
      const status = this.deriveActionStatus(normalizedStatus, dueDate, owner);
      const title = this.cleanText(risk.planActionTraitement) || `Traitement du risque: ${risk.titre}`;
      const assignees = this.buildAssignees([
        owner,
        this.buildDisplayName((risk as any).riskManager)
      ]);
      const resources = this.buildResources('Risques', risk.departement?.nom || risk.domaine, assignees);

      return {
        id: `risk-${risk.id}`,
        reference: `PA-RSK-${risk.id}`,
        title,
        sourceModule: 'Risques',
        sourceReference: `RSK-${risk.id}`,
        sourceRoute: '/dashboard/treatment-plans',
        priority,
        status,
        dueDate,
        owner,
        department: risk.departement?.nom || risk.domaine || 'Non rattache',
        progress: this.deriveProgress(status, normalizedStatus),
        dependencies: this.buildDependencies({
          owner,
          dueDate,
          hasActionPlan: Boolean(this.cleanText(risk.planActionTraitement)),
          hasEvidence: Boolean(risk.pieceJustificative)
        }),
        displayActions: this.buildDisplayActions(status, priority, owner),
        lastUpdate: this.toIsoString(risk.updatedAt) || new Date().toISOString(),
        startDate: this.toIsoString((risk as any).createdAt),
        assignees,
        resources,
        statusLabel: this.getStatusLabel(status),
        history: this.buildHistory({
          sourceModule: 'Risques',
          createdAt: this.toIsoString((risk as any).createdAt),
          updatedAt: this.toIsoString(risk.updatedAt),
          owner,
          status,
          title
        })
      };
    });
  }

  private mapIncidentsToActions(incidents: Incident[]): ActionRegistryItem[] {
    return incidents
      .filter(incident => Boolean(this.cleanText(incident.planActionTraitement)) || this.normalizeValue(incident.statut) !== IncidentStatus.CLOS)
      .map(incident => {
        const normalizedStatus = this.normalizeValue(incident.statut);
        const priority = this.normalizePriority(incident.niveauRisque);
        const owner = this.buildDisplayName(incident.declareur) || 'Non assigne';
        const dueDate = this.toIsoString(incident.dateEcheance);
        const status = this.deriveActionStatus(normalizedStatus, dueDate, owner);
        const assignees = this.buildAssignees([owner]);
        const resources = this.buildResources('Incidents', incident.domaine, assignees);

        return {
          id: `incident-${incident.id}`,
          reference: `PA-INC-${incident.id}`,
          title: this.cleanText(incident.planActionTraitement) || `Traitement incident: ${incident.titre}`,
          sourceModule: 'Incidents',
          sourceReference: `INC-${incident.id}`,
          sourceRoute: '/dashboard/incident-workflow',
          priority,
          status,
          dueDate,
          owner,
          department: incident.domaine || 'Non rattache',
          progress: this.deriveProgress(status, normalizedStatus),
          dependencies: this.buildDependencies({
            owner,
            dueDate,
            hasActionPlan: Boolean(this.cleanText(incident.planActionTraitement)),
            hasEvidence: Boolean(incident.pieceJointe)
          }),
          displayActions: this.buildDisplayActions(status, priority, owner),
          lastUpdate: this.toIsoString(incident.updatedAt) || new Date().toISOString(),
          startDate: this.toIsoString((incident as any).createdAt || (incident as any).dateSurvenance),
          assignees,
          resources,
          statusLabel: this.getStatusLabel(status),
          history: this.buildHistory({
            sourceModule: 'Incidents',
            createdAt: this.toIsoString((incident as any).createdAt),
            updatedAt: this.toIsoString(incident.updatedAt),
            owner,
            status,
            title: this.cleanText(incident.planActionTraitement) || incident.titre
          })
        };
      });
  }

  private mapAuditsToActions(missions: AuditMission[]): ActionRegistryItem[] {
    return missions
      .filter(mission => this.normalizeValue(mission.statut) !== AuditMissionStatus.ANNULE)
      .map(mission => {
        const normalizedStatus = this.normalizeValue(mission.statut);
        const priority = this.normalizePriority((mission as any).risk?.niveauRisqueCode || (mission as any).risk?.niveauRisque);
        const owner = this.buildDisplayName((mission as any).auditeur) ||
          this.buildDisplayName((mission as any).auditSenior) ||
          'Non assigne';
        const dueDate = this.toIsoString(mission.delai);
        const status = this.deriveActionStatus(normalizedStatus, dueDate, owner);
        const isPlanAction = mission.type === AuditRecordType.PLAN_ACTION_AUDIT;
        const recommendations = this.cleanText(mission.recommandations || mission.objectifs);
        const title = isPlanAction
          ? recommendations || this.cleanText(mission.regleDnssi) || this.cleanText(mission.titre)
          : recommendations || `Suivi des recommandations: ${mission.titre}`;
        const assignees = this.buildAssignees([
          owner,
          this.buildDisplayName((mission as any).auditSenior)
        ]);
        const resources = this.buildResources(isPlanAction ? 'Plan action audit' : 'Audit', (mission as any).risk?.departement?.nom || (mission as any).risk?.domaine, assignees);
        const progress = typeof (mission as any).progressPercent === 'number'
          ? Math.max(0, Math.min(100, (mission as any).progressPercent))
          : this.deriveProgress(status, normalizedStatus);

        return {
          id: `audit-${mission.id}`,
          reference: `${isPlanAction ? 'PA-AUD' : 'AUD'}-${mission.code || mission.id}`,
          title,
          sourceModule: isPlanAction ? 'Plan action audit' : 'Audit',
          sourceReference: `AUD-${mission.id}`,
          sourceRoute: isPlanAction ? '/dashboard/audit-checklists' : '/dashboard/audit-report-review',
          priority,
          status,
          dueDate,
          owner,
          department: (mission as any).risk?.departement?.nom || (mission as any).risk?.domaine || 'Non rattache',
          progress,
          dependencies: this.buildDependencies({
            owner,
            dueDate,
            hasActionPlan: Boolean(recommendations),
            hasEvidence: isPlanAction ? true : Boolean(mission.rapport)
          }),
          displayActions: this.buildDisplayActions(status, priority, owner),
          lastUpdate: this.toIsoString(mission.updatedAt) || new Date().toISOString(),
          startDate: this.toIsoString((mission as any).dateReelleDebut || (mission as any).datePrevueDebut || (mission as any).createdAt),
          assignees,
          resources,
          statusLabel: this.getStatusLabel(status),
          history: this.buildHistory({
            sourceModule: isPlanAction ? 'Plan action audit' : 'Audit',
            createdAt: this.toIsoString((mission as any).createdAt),
            updatedAt: this.toIsoString(mission.updatedAt),
            owner,
            status,
            title
          })
        };
      });
  }

  private buildDeadlines(items: ActionRegistryItem[]): ActionDeadlineItem[] {
    return items
      .filter(item => Boolean(item.dueDate))
      .slice()
      .sort((left, right) => this.compareDueDates(left.dueDate, right.dueDate))
      .slice(0, 10)
      .map(item => ({
        id: item.id,
        title: item.title,
        milestone: `Livrable ${item.reference} | ${item.sourceModule}`,
        dueDate: item.dueDate,
        status: this.deriveDeadlineStatus(item),
        progress: item.progress,
        owner: item.owner,
        blocker: item.dependencies.length > 0 ? item.dependencies[0] : null,
        forecast: this.buildForecast(item),
        startDate: item.history[0]?.at || item.lastUpdate,
        dependencyCount: item.dependencies.length,
        resourceLoad: this.buildResourceLoad(item)
      }));
  }

  private buildNotifications(items: ActionRegistryItem[], overdueCount: number, dueThisMonth: number, criticalCount: number): ActionNotificationItem[] {
    const now = new Date();
    const notifications: ActionNotificationItem[] = [];

    if (overdueCount > 0) {
      notifications.push({
        id: 'notif-overdue',
        title: `${overdueCount} action(s) en retard a relancer`,
        channel: 'in_app',
        audience: 'Owners et managers',
        trigger: 'Retard detecte sur une echeance',
        nextSendAt: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        escalationLevel: criticalCount > 0 ? 'niveau_3' : 'niveau_2',
        status: 'active',
        detailLabel: 'Voir les retards',
        detailFilter: { status: 'en_retard' },
        rule: 'Escalade automatique sur retard detecte',
        roleScope: 'Responsables et managers'
      });
    }

    if (dueThisMonth > 0) {
      const dueSoonSendAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

      notifications.push({
        id: 'notif-due-soon',
        title: `${dueThisMonth} action(s) a suivre sous 30 jours`,
        channel: 'email',
        audience: 'Responsables de traitement',
        trigger: 'Echeance proche',
        nextSendAt: dueSoonSendAt,
        escalationLevel: 'niveau_1',
        status: 'active',
        rule: 'Rappel deadline J-30',
        roleScope: 'Responsables de traitement'
      });

      notifications.push({
        id: 'notif-due-soon-app',
        title: `${dueThisMonth} rappel(s) app pour echeances proches`,
        channel: 'in_app',
        audience: 'Responsables assignes',
        trigger: 'Echeance proche',
        nextSendAt: dueSoonSendAt,
        escalationLevel: 'niveau_1',
        status: 'active',
        rule: 'Alerte in-app deadline J-30',
        roleScope: 'Responsables assignes'
      });
    }

    if (items.length > 0) {
      const weeklySendAt = this.getNextMondayMorning(now).toISOString();

      notifications.push({
        id: 'notif-weekly-summary',
        title: 'Synthese hebdomadaire du portefeuille actions',
        channel: 'email',
        audience: 'Top management et pilotage GRC',
        trigger: 'Revue hebdomadaire programmee',
        nextSendAt: weeklySendAt,
        escalationLevel: 'niveau_1',
        status: 'planifiee',
        rule: 'Resume periodique hebdomadaire',
        roleScope: 'Pilotage GRC'
      });

      notifications.push({
        id: 'notif-weekly-summary-app',
        title: 'Resume app hebdomadaire du portefeuille actions',
        channel: 'in_app',
        audience: 'Top management et pilotage GRC',
        trigger: 'Revue hebdomadaire programmee',
        nextSendAt: weeklySendAt,
        escalationLevel: 'niveau_1',
        status: 'planifiee',
        rule: 'Resume in-app hebdomadaire',
        roleScope: 'Pilotage GRC'
      });
    }

    return notifications;
  }

  private buildIndicators(
    registry: ActionRegistryItem[],
    openRegistry: ActionRegistryItem[],
    completionRate: number,
    effectivenessScore: number,
    criticalCount: number,
    overdueCount: number
  ): ActionIndicatorItem[] {
    const itemsWithDueDate = registry.filter(item => Boolean(item.dueDate));
    const closedOnTimeCount = registry.filter(item => {
      if (!this.isTerminalStatus(item.status) || !item.dueDate) {
        return false;
      }

      return new Date(item.lastUpdate).getTime() <= new Date(item.dueDate).getTime();
    }).length;
    const closedWithDueDate = registry.filter(item => this.isTerminalStatus(item.status) && Boolean(item.dueDate)).length;
    const onTimeRate = closedWithDueDate > 0 ? Math.round((closedOnTimeCount / closedWithDueDate) * 100) : completionRate;
    const pressureRate = openRegistry.length > 0 ? Math.round(((criticalCount + overdueCount) / openRegistry.length) * 100) : 0;

    return [
      {
        id: 'kpi-on-time',
        label: 'Cloture a echeance',
        value: onTimeRate,
        unit: '%',
        target: 85,
        trend: onTimeRate >= 85 ? 'en_hausse' : onTimeRate >= 65 ? 'stable' : 'en_baisse',
        commentary: closedWithDueDate > 0
          ? `${closedOnTimeCount} action(s) cloturee(s) dans les delais sur ${closedWithDueDate}.`
          : 'Aucune cloture exploitable a date pour mesurer le respect des delais.'
      },
      {
        id: 'kpi-open-critical',
        label: 'Actions critiques ouvertes',
        value: criticalCount,
        unit: '',
        target: 0,
        trend: criticalCount === 0 ? 'en_hausse' : criticalCount <= 3 ? 'stable' : 'en_baisse',
        commentary: `${criticalCount} action(s) prioritaire(s) restent ouvertes sur ${openRegistry.length} action(s) actives.`
      },
      {
        id: 'kpi-effectiveness',
        label: 'Efficacite globale',
        value: effectivenessScore,
        unit: '%',
        target: 80,
        trend: effectivenessScore >= 80 ? 'en_hausse' : effectivenessScore >= 60 ? 'stable' : 'en_baisse',
        commentary: `${itemsWithDueDate.length} action(s) avec echeance alimentent le score de performance global.`
      },
      {
        id: 'kpi-pressure',
        label: 'Tension du portefeuille',
        value: pressureRate,
        unit: '%',
        target: 20,
        trend: pressureRate <= 20 ? 'en_hausse' : pressureRate <= 40 ? 'stable' : 'en_baisse',
        commentary: 'Mesure combinee des actions critiques et des actions en retard encore ouvertes.'
      }
    ];
  }

  private enrichOverview(overview: ActionsOverview): ActionsOverview {
    const registry = (overview.registry || []).map(item => this.enrichRegistryItem(item));
    const summary = overview.summary || {} as ActionsSummary;

    return {
      ...overview,
      summary: {
        ...summary,
        multiAssignedActions: summary.multiAssignedActions ?? registry.filter(item => item.assignees.length > 1).length
      },
      registry,
      deadlines: (overview.deadlines || []).map(item => this.enrichDeadlineItem(item, registry)),
      notifications: (overview.notifications || []).map(item => this.enrichNotificationItem(item)),
      indicators: (overview.indicators || []).map(item => this.enrichIndicatorItem(item)),
      todoActions: overview.todoActions || []
    };
  }

  private enrichRegistryItem(item: ActionRegistryItem): ActionRegistryItem {
    const assignees = item.assignees?.length ? item.assignees : this.buildAssignees([item.owner]);
    const resources = item.resources?.length ? item.resources : this.buildResources(item.sourceModule, item.department, assignees);
    const history = item.history?.length ? item.history : this.buildHistory({
      sourceModule: item.sourceModule,
      createdAt: item.lastUpdate,
      updatedAt: item.lastUpdate,
      owner: item.owner,
      status: item.status,
      title: item.title
    });

    return {
      ...item,
      assignees,
      resources,
      statusLabel: item.statusLabel || this.getStatusLabel(item.status),
      history
    };
  }

  private enrichDeadlineItem(item: ActionDeadlineItem, registry: ActionRegistryItem[]): ActionDeadlineItem {
    const source = registry.find(registryItem => registryItem.id === item.id);

    return {
      ...item,
      startDate: item.startDate || source?.history[0]?.at || source?.lastUpdate || item.dueDate,
      dependencyCount: item.dependencyCount ?? source?.dependencies?.length ?? 0,
      resourceLoad: item.resourceLoad || (source ? this.buildResourceLoad(source) : 'Charge a confirmer')
    };
  }

  private enrichNotificationItem(item: ActionNotificationItem): ActionNotificationItem {
    return {
      ...item,
      rule: item.rule || this.buildNotificationRule(item),
      roleScope: item.roleScope || item.audience || 'Roles concernes'
    };
  }

  private enrichIndicatorItem(item: ActionIndicatorItem): ActionIndicatorItem {
    return item;
  }

  private buildTodoActions(items: ActionRegistryItem[]): ActionTodoItem[] {
    return items
      .slice()
      .sort((left, right) => this.compareRegistryItems(left, right))
      .slice(0, 6)
      .map(item => ({
        id: `todo-${item.id}`,
        title: this.buildTodoLabel(item),
        detail: `${item.sourceModule} | ${item.reference}${item.dueDate ? ` | echeance ${new Date(item.dueDate).toLocaleDateString('fr-FR')}` : ''}`,
        tone: this.buildTodoTone(item),
        sourceModule: item.sourceModule,
        owner: item.owner,
        dueDate: item.dueDate
      }));
  }

  private buildDependencies(context: { owner: string; dueDate: string | null; hasActionPlan: boolean; hasEvidence: boolean }): string[] {
    const dependencies: string[] = [];

    if (context.owner === 'Non assigne') {
      dependencies.push('Responsable a confirmer');
    }

    if (!context.dueDate) {
      dependencies.push('Echeance a definir');
    }

    if (!context.hasActionPlan) {
      dependencies.push('Action a formaliser');
    }

    if (!context.hasEvidence) {
      dependencies.push('Justificatif indisponible');
    }

    return dependencies;
  }

  private buildAssignees(values: string[]): string[] {
    const assignees = Array.from(new Set(values.map(value => this.cleanText(value)).filter(value => value && value !== 'Non assigne')));
    return assignees.length ? assignees : ['Non assigne'];
  }

  private buildResources(sourceModule: string, department: string | undefined, assignees: string[]): string[] {
    return Array.from(new Set([
      this.cleanText(department),
      sourceModule,
      ...assignees.filter(value => value !== 'Non assigne')
    ].filter(Boolean)));
  }

  private buildHistory(context: { sourceModule: string; createdAt: string | null; updatedAt: string | null; owner: string; status: string; title: string }): ActionHistoryItem[] {
    const createdAt = context.createdAt || context.updatedAt || new Date().toISOString();
    const updatedAt = context.updatedAt || createdAt;

    return [
      {
        at: createdAt,
        event: 'Creation',
        actor: context.sourceModule,
        detail: `Action formalisee depuis ${context.sourceModule}: ${context.title}`
      },
      {
        at: updatedAt,
        event: 'Affectation',
        actor: context.owner,
        detail: context.owner === 'Non assigne' ? 'Affectation a completer' : `Responsable courant: ${context.owner}`
      },
      {
        at: updatedAt,
        event: 'Statut',
        actor: 'Systeme sGRC',
        detail: `Statut courant: ${this.getStatusLabel(context.status)}`
      }
    ];
  }

  private buildResourceLoad(item: ActionRegistryItem): string {
    if (item.status === 'bloquee' || item.dependencies.length >= 2) {
      return 'Charge forte';
    }

    if (this.isCriticalPriority(item.priority) || item.assignees.length > 1) {
      return 'Charge moyenne';
    }

    return 'Charge normale';
  }

  private buildNotificationRule(item: ActionNotificationItem): string {
    if (item.escalationLevel === 'niveau_3') {
      return 'Escalade automatique critique';
    }

    if (item.trigger?.toLowerCase().includes('echeance')) {
      return 'Rappel deadline parametre';
    }

    return 'Regle de notification periodique';
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      en_retard: 'En retard',
      bloquee: 'Bloquee',
      en_cours: 'En cours',
      a_demarrer: 'A demarrer',
      clos: 'Clos'
    };

    return labels[status] || status;
  }

  private buildDisplayActions(status: string, priority: string, owner: string): string[] {
    const actions: string[] = ['Voir source'];

    if (owner === 'Non assigne') {
      actions.push('Affecter');
    }

    if (status === 'en_retard') {
      actions.push('Relancer');
    } else if (status === 'a_demarrer') {
      actions.push('Planifier');
    } else {
      actions.push('Suivre');
    }

    if (this.isCriticalPriority(priority)) {
      actions.push('Escalader');
    }

    return actions.slice(0, 3);
  }

  private deriveActionStatus(rawStatus: string, dueDate: string | null, owner: string): string {
    if (rawStatus === RiskStatus.CLOSED || rawStatus === RiskStatus.TREATED || rawStatus === IncidentStatus.CLOS || rawStatus === IncidentStatus.TRAITE || rawStatus === AuditMissionStatus.TERMINE) {
      return 'clos';
    }

    if (owner === 'Non assigne' && !dueDate) {
      return 'bloquee';
    }

    if (this.isOverdue(dueDate)) {
      return 'en_retard';
    }

    if (rawStatus === RiskStatus.IN_PROGRESS || rawStatus === IncidentStatus.EN_COURS || rawStatus === AuditMissionStatus.EN_COURS) {
      return 'en_cours';
    }

    return 'a_demarrer';
  }

  private deriveDeadlineStatus(item: ActionRegistryItem): string {
    if (item.status === 'en_retard' || item.status === 'bloquee') {
      return 'a_risque';
    }

    if (item.progress >= 80) {
      return 'maitrise';
    }

    return item.status;
  }

  private deriveProgress(status: string, rawStatus: string): number {
    if (status === 'clos') {
      return 100;
    }

    if (status === 'en_retard') {
      return rawStatus === AuditMissionStatus.EN_RETARD ? 45 : 35;
    }

    if (status === 'bloquee') {
      return 20;
    }

    if (status === 'en_cours') {
      return 60;
    }

    return 15;
  }

  private buildForecast(item: ActionRegistryItem): string {
    if (!item.dueDate) {
      return 'Date cible a confirmer';
    }

    if (item.status === 'en_retard') {
      return 'Replanification requise';
    }

    if (item.status === 'bloquee') {
      return 'Arbitrage necessaire';
    }

    if (this.isDueWithin(item.dueDate, 7)) {
      return 'Point de passage proche';
    }

    return 'Trajectoire maintenue';
  }

  private buildTodoLabel(item: ActionRegistryItem): string {
    if (item.owner === 'Non assigne') {
      return `Affecter un responsable pour ${item.reference}`;
    }

    if (item.status === 'en_retard') {
      return `Relancer ${item.owner} sur ${item.reference}`;
    }

    if (this.isCriticalPriority(item.priority)) {
      return `Escalader ${item.reference} au sponsor`;
    }

    return `Suivre l avancement de ${item.reference}`;
  }

  private buildTodoTone(item: ActionRegistryItem): string {
    if (item.status === 'en_retard' || item.status === 'bloquee') {
      return 'alert';
    }

    if (this.isCriticalPriority(item.priority)) {
      return 'watch';
    }

    return 'good';
  }

  private buildDisplayName(user: any): string {
    if (!user) {
      return '';
    }

    const fullName = [user.prenom, user.nom].filter(Boolean).join(' ').trim();
    return fullName || user.name || '';
  }

  private cleanText(value: unknown): string {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  private normalizeValue(value: unknown): string {
    return String(value || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }

  private normalizePriority(value: unknown): string {
    const normalized = this.normalizeValue(value);

    if (normalized === RiskLevel.CRITICAL || normalized === 'critical' || normalized === 'critique') {
      return 'critique';
    }

    if (normalized === RiskLevel.HIGH || normalized === 'high' || normalized === 'eleve' || normalized === 'significant') {
      return 'elevee';
    }

    if (normalized === RiskLevel.MEDIUM || normalized === 'medium' || normalized === 'moyen') {
      return 'moyenne';
    }

    return 'faible';
  }

  private isCriticalPriority(priority: string): boolean {
    return priority === 'critique' || priority === 'elevee';
  }

  private isTerminalStatus(status: string): boolean {
    return status === 'clos';
  }

  private isOverdue(value: string | null): boolean {
    return Boolean(value) && new Date(value as string).getTime() < Date.now();
  }

  private isDueWithin(value: string | null, days: number): boolean {
    if (!value) {
      return false;
    }

    const now = Date.now();
    const dueAt = new Date(value).getTime();
    return dueAt >= now && dueAt <= now + days * 24 * 60 * 60 * 1000;
  }

  private toIsoString(value: unknown): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value as any);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  private compareRegistryItems(left: ActionRegistryItem, right: ActionRegistryItem): number {
    const statusDelta = this.statusRank(left.status) - this.statusRank(right.status);
    if (statusDelta !== 0) {
      return statusDelta;
    }

    const priorityDelta = this.priorityRank(left.priority) - this.priorityRank(right.priority);
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return this.compareDueDates(left.dueDate, right.dueDate);
  }

  private compareDueDates(left: string | null, right: string | null): number {
    const leftTime = left ? new Date(left).getTime() : Number.MAX_SAFE_INTEGER;
    const rightTime = right ? new Date(right).getTime() : Number.MAX_SAFE_INTEGER;
    return leftTime - rightTime;
  }

  private statusRank(status: string): number {
    const ranks: Record<string, number> = {
      en_retard: 0,
      bloquee: 1,
      en_cours: 2,
      a_demarrer: 3,
      clos: 4
    };

    return ranks[status] ?? 5;
  }

  private priorityRank(priority: string): number {
    const ranks: Record<string, number> = {
      critique: 0,
      elevee: 1,
      moyenne: 2,
      faible: 3
    };

    return ranks[priority] ?? 4;
  }

  private getNextMondayMorning(date: Date): Date {
    const next = new Date(date);
    const daysUntilMonday = (8 - next.getDay()) % 7 || 7;
    next.setDate(next.getDate() + daysUntilMonday);
    next.setHours(8, 0, 0, 0);
    return next;
  }
}
