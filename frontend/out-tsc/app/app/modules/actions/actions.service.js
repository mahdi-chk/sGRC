import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuditMissionStatus, AuditingService } from '../../core/services/auditing.service';
import { IncidentService, IncidentStatus } from '../../core/services/incident.service';
import { RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core/services/risk.service";
import * as i3 from "../../core/services/incident.service";
import * as i4 from "../../core/services/auditing.service";
export class ActionsService {
    constructor(http, riskService, incidentService, auditingService) {
        this.http = http;
        this.riskService = riskService;
        this.incidentService = incidentService;
        this.auditingService = auditingService;
        this.apiUrl = `${environment.apiUrl}/actions`;
    }
    getOverview() {
        return this.http.get(`${this.apiUrl}/overview`).pipe(catchError(() => this.getFallbackOverview()));
    }
    getAssignableUsers(actionId) {
        return this.http.get(`${this.apiUrl}/${encodeURIComponent(actionId)}/assignable-users`);
    }
    sendReminder(actionId, note) {
        return this.http.post(`${this.apiUrl}/${encodeURIComponent(actionId)}/remind`, {
            note: note || ''
        });
    }
    assignAction(actionId, userId) {
        return this.http.put(`${this.apiUrl}/${encodeURIComponent(actionId)}/assign`, {
            userId
        });
    }
    getFallbackOverview() {
        return combineLatest([
            this.riskService.getRisks().pipe(catchError(() => of([]))),
            this.incidentService.getIncidents().pipe(catchError(() => of([]))),
            this.auditingService.getMissions().pipe(catchError(() => of([])))
        ]).pipe(map(([risks, incidents, missions]) => this.buildOverview(risks, incidents, missions)));
    }
    buildOverview(risks, incidents, missions) {
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
    mapRisksToActions(risks) {
        return risks.map(risk => {
            var _a;
            const normalizedStatus = RiskService.getRiskStatusCode(risk);
            const priority = this.normalizePriority(RiskService.getRiskLevelCode(risk));
            const owner = this.buildDisplayName(risk.responsableTraitement) ||
                this.buildDisplayName(risk.riskAgent) ||
                'Non assigne';
            const dueDate = this.toIsoString(risk.dateEcheance || risk.prochaineEcheance);
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
                department: ((_a = risk.departement) === null || _a === void 0 ? void 0 : _a.nom) || risk.domaine || 'Non rattache',
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
    mapIncidentsToActions(incidents) {
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
    mapAuditsToActions(missions) {
        return missions
            .filter(mission => this.normalizeValue(mission.statut) !== AuditMissionStatus.ANNULE)
            .map(mission => {
            var _a, _b, _c, _d, _e;
            const normalizedStatus = this.normalizeValue(mission.statut);
            const priority = this.normalizePriority(((_a = mission.risk) === null || _a === void 0 ? void 0 : _a.niveauRisqueCode) || ((_b = mission.risk) === null || _b === void 0 ? void 0 : _b.niveauRisque));
            const owner = this.buildDisplayName(mission.auditeur) ||
                this.buildDisplayName(mission.auditSenior) ||
                'Non assigne';
            const dueDate = this.toIsoString(mission.delai);
            const status = this.deriveActionStatus(normalizedStatus, dueDate, owner);
            const recommendations = this.cleanText(mission.recommandations);
            return {
                id: `audit-${mission.id}`,
                reference: `PA-AUD-${mission.id}`,
                title: recommendations || `Suivi des recommandations: ${mission.titre}`,
                sourceModule: 'Audit',
                sourceReference: `AUD-${mission.id}`,
                sourceRoute: '/dashboard/audit-report-review',
                priority,
                status,
                dueDate,
                owner,
                department: ((_d = (_c = mission.risk) === null || _c === void 0 ? void 0 : _c.departement) === null || _d === void 0 ? void 0 : _d.nom) || ((_e = mission.risk) === null || _e === void 0 ? void 0 : _e.domaine) || 'Non rattache',
                progress: this.deriveProgress(status, normalizedStatus),
                dependencies: this.buildDependencies({
                    owner,
                    dueDate,
                    hasActionPlan: Boolean(recommendations),
                    hasEvidence: Boolean(mission.rapport)
                }),
                displayActions: this.buildDisplayActions(status, priority, owner),
                lastUpdate: this.toIsoString(mission.updatedAt) || new Date().toISOString()
            };
        });
    }
    buildDeadlines(items) {
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
    buildNotifications(items, overdueCount, dueThisMonth, criticalCount) {
        const now = new Date();
        const notifications = [];
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
    buildIndicators(registry, openRegistry, completionRate, effectivenessScore, criticalCount, overdueCount) {
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
    buildTodoActions(items) {
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
    buildDependencies(context) {
        const dependencies = [];
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
    buildDisplayActions(status, priority, owner) {
        const actions = ['Voir source'];
        if (owner === 'Non assigne') {
            actions.push('Affecter');
        }
        if (status === 'en_retard') {
            actions.push('Relancer');
        }
        else if (status === 'a_demarrer') {
            actions.push('Planifier');
        }
        else {
            actions.push('Suivre');
        }
        if (this.isCriticalPriority(priority)) {
            actions.push('Escalader');
        }
        return actions.slice(0, 3);
    }
    deriveActionStatus(rawStatus, dueDate, owner) {
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
    deriveDeadlineStatus(item) {
        if (item.status === 'en_retard' || item.status === 'bloquee') {
            return 'a_risque';
        }
        if (item.progress >= 80) {
            return 'maitrise';
        }
        return item.status;
    }
    deriveProgress(status, rawStatus) {
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
    buildForecast(item) {
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
    buildTodoLabel(item) {
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
    buildTodoTone(item) {
        if (item.status === 'en_retard' || item.status === 'bloquee') {
            return 'alert';
        }
        if (this.isCriticalPriority(item.priority)) {
            return 'watch';
        }
        return 'good';
    }
    buildDisplayName(user) {
        if (!user) {
            return '';
        }
        const fullName = [user.prenom, user.nom].filter(Boolean).join(' ').trim();
        return fullName || user.name || '';
    }
    cleanText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }
    normalizeValue(value) {
        return String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    normalizePriority(value) {
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
    isCriticalPriority(priority) {
        return priority === 'critique' || priority === 'elevee';
    }
    isTerminalStatus(status) {
        return status === 'clos';
    }
    isOverdue(value) {
        return Boolean(value) && new Date(value).getTime() < Date.now();
    }
    isDueWithin(value, days) {
        if (!value) {
            return false;
        }
        const now = Date.now();
        const dueAt = new Date(value).getTime();
        return dueAt >= now && dueAt <= now + days * 24 * 60 * 60 * 1000;
    }
    toIsoString(value) {
        if (!value) {
            return null;
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date.toISOString();
    }
    compareRegistryItems(left, right) {
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
    compareDueDates(left, right) {
        const leftTime = left ? new Date(left).getTime() : Number.MAX_SAFE_INTEGER;
        const rightTime = right ? new Date(right).getTime() : Number.MAX_SAFE_INTEGER;
        return leftTime - rightTime;
    }
    statusRank(status) {
        var _a;
        const ranks = {
            en_retard: 0,
            bloquee: 1,
            en_cours: 2,
            a_demarrer: 3,
            clos: 4
        };
        return (_a = ranks[status]) !== null && _a !== void 0 ? _a : 5;
    }
    priorityRank(priority) {
        var _a;
        const ranks = {
            critique: 0,
            elevee: 1,
            moyenne: 2,
            faible: 3
        };
        return (_a = ranks[priority]) !== null && _a !== void 0 ? _a : 4;
    }
    getNextMondayMorning(date) {
        const next = new Date(date);
        const daysUntilMonday = (8 - next.getDay()) % 7 || 7;
        next.setDate(next.getDate() + daysUntilMonday);
        next.setHours(8, 0, 0, 0);
        return next;
    }
}
ActionsService.ɵfac = function ActionsService_Factory(t) { return new (t || ActionsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.RiskService), i0.ɵɵinject(i3.IncidentService), i0.ɵɵinject(i4.AuditingService)); };
ActionsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ActionsService, factory: ActionsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.RiskService }, { type: i3.IncidentService }, { type: i4.AuditingService }]; }, null); })();
//# sourceMappingURL=actions.service.js.map