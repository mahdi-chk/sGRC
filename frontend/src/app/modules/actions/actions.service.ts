import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuditMission, AuditMissionStatus, AuditRecordType, AuditingService } from '../../core/services/auditing.service';
import { Incident, IncidentService, IncidentStatus } from '../../core/services/incident.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { environment } from '../../../environments/environment';

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
    private auditingService: AuditingService
  ) {}

  getOverview(): Observable<ActionsOverview> {
    return this.http.get<ActionsOverview>(`${this.apiUrl}/overview`).pipe(
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

  private getFallbackOverview(): Observable<ActionsOverview> {
    return combineLatest([
      this.riskService.getRisks().pipe(catchError(() => of([] as Risk[]))),
      this.incidentService.getIncidents().pipe(catchError(() => of([] as Incident[]))),
      this.auditingService.getMissions('all').pipe(catchError(() => of([] as AuditMission[])))
    ]).pipe(
      map(([risks, incidents, missions]) => this.buildOverview(risks, incidents, missions))
    );
  }

  private buildOverview(risks: Risk[], incidents: Incident[], missions: AuditMission[]): ActionsOverview {
    const registry = [
      ...this.mapRisksToActions(risks),
      ...this.mapIncidentsToActions(incidents),
      ...this.mapAuditsToActions(missions)
    ].sort((left, right) => this.compareRegistryItems(left, right));

    const openRegistry = registry.filter(item => !this.isTerminalStatus(item.status));
    const closedRegistry = registry.filter(item => this.isTerminalStatus(item.status));
    const overdueActions = openRegistry.filter(item => this.isOverdue(item.dueDate)).length;
    const dueThisMonth = openRegistry.filter(item => this.isDueWithin(item.dueDate, 30)).length;
    const criticalActions = openRegistry.filter(item => this.isCriticalPriority(item.priority)).length;
    const blockedActions = openRegistry.filter(item => item.status === 'bloquee' || item.dependencies.length >= 2).length;
    const completionRate = registry.length > 0 ? Math.round((closedRegistry.length / registry.length) * 100) : 0;
    const overdueRate = openRegistry.length > 0 ? Math.round((overdueActions / openRegistry.length) * 100) : 0;
    const effectivenessScore = Math.max(0, Math.min(100, Math.round((completionRate * 0.6) + ((100 - overdueRate) * 0.4))));

    const notifications = this.buildNotifications(openRegistry, overdueActions, dueThisMonth, criticalActions);
    const indicators = this.buildIndicators(registry, openRegistry, completionRate, effectivenessScore, criticalActions, overdueActions);

    return {
      generatedAt: new Date().toISOString(),
      summary: {
        totalOpenActions: openRegistry.length,
        overdueActions,
        dueThisMonth,
        completionRate,
        activeAlerts: notifications.filter(item => item.status === 'active').length,
        effectivenessScore,
        criticalActions,
        blockedActions
      },
      registry,
      deadlines: this.buildDeadlines(openRegistry),
      notifications,
      indicators,
      todoActions: this.buildTodoActions(openRegistry)
    };
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
        lastUpdate: this.toIsoString(risk.updatedAt) || new Date().toISOString()
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
          lastUpdate: this.toIsoString(incident.updatedAt) || new Date().toISOString()
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
          progress: this.deriveProgress(status, normalizedStatus),
          dependencies: this.buildDependencies({
            owner,
            dueDate,
            hasActionPlan: Boolean(recommendations),
            hasEvidence: isPlanAction ? true : Boolean(mission.rapport)
          }),
          displayActions: this.buildDisplayActions(status, priority, owner),
          lastUpdate: this.toIsoString(mission.updatedAt) || new Date().toISOString()
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
        forecast: this.buildForecast(item)
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
        detailFilter: { status: 'en_retard' }
      });
    }

    if (dueThisMonth > 0) {
      notifications.push({
        id: 'notif-due-soon',
        title: `${dueThisMonth} action(s) a suivre sous 30 jours`,
        channel: 'email',
        audience: 'Responsables de traitement',
        trigger: 'Echeance proche',
        nextSendAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        escalationLevel: 'niveau_1',
        status: 'active'
      });
    }

    if (items.length > 0) {
      notifications.push({
        id: 'notif-weekly-summary',
        title: 'Synthese hebdomadaire du portefeuille actions',
        channel: 'email',
        audience: 'Top management et pilotage GRC',
        trigger: 'Revue hebdomadaire programmee',
        nextSendAt: this.getNextMondayMorning(now).toISOString(),
        escalationLevel: 'niveau_1',
        status: 'planifiee'
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
