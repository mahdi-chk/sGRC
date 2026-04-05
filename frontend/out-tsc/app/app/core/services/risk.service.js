/**
 * @file risk.service.ts
 * @description Service de communication avec l'API pour la gestion des risques.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth.service";
/**
 * Enumerations synchronisees avec les lookups backend.
 * Les alias francais sont conserves pour eviter de casser le code existant.
 */
export var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "low";
    RiskLevel["LIMITED"] = "limited";
    RiskLevel["MEDIUM"] = "medium";
    RiskLevel["HIGH"] = "high";
    RiskLevel["CRITICAL"] = "critical";
    RiskLevel["FAIBLE"] = "low";
    RiskLevel["LIMITE"] = "limited";
    RiskLevel["LIMIT\u00C9"] = "limited";
    RiskLevel["MOYEN"] = "medium";
    RiskLevel["ELEVE"] = "high";
    RiskLevel["\u00C9LEV\u00C9"] = "high";
})(RiskLevel || (RiskLevel = {}));
export var RiskProbability;
(function (RiskProbability) {
    RiskProbability["RARE"] = "rare";
    RiskProbability["POSSIBLE"] = "possible";
    RiskProbability["PROBABLE"] = "probable";
    RiskProbability["PERMANENT"] = "permanent";
})(RiskProbability || (RiskProbability = {}));
export var RiskImpact;
(function (RiskImpact) {
    RiskImpact["LIMITED"] = "limited";
    RiskImpact["MEDIUM"] = "medium";
    RiskImpact["SIGNIFICANT"] = "significant";
    RiskImpact["CRITICAL"] = "critical";
    RiskImpact["LIMITE"] = "limited";
    RiskImpact["LIMIT\u00C9"] = "limited";
    RiskImpact["MOYEN"] = "medium";
    RiskImpact["SIGNIFICATIF"] = "significant";
    RiskImpact["CRITIQUE"] = "critical";
})(RiskImpact || (RiskImpact = {}));
export var MaitriseLevel;
(function (MaitriseLevel) {
    MaitriseLevel["FAIBLE"] = "faible";
    MaitriseLevel["LIMITED"] = "limited";
    MaitriseLevel["MEDIUM"] = "medium";
    MaitriseLevel["HIGH"] = "high";
    MaitriseLevel["LIMITE"] = "limited";
    MaitriseLevel["LIMIT\u00C9"] = "limited";
    MaitriseLevel["MOYEN"] = "medium";
    MaitriseLevel["ELEVE"] = "high";
    MaitriseLevel["\u00C9LEV\u00C9"] = "high";
})(MaitriseLevel || (MaitriseLevel = {}));
export var RiskStatus;
(function (RiskStatus) {
    RiskStatus["OPEN"] = "open";
    RiskStatus["IN_PROGRESS"] = "in_progress";
    RiskStatus["TREATED"] = "treated";
    RiskStatus["CLOSED"] = "closed";
    RiskStatus["OUVERT"] = "open";
    RiskStatus["EN_COURS"] = "in_progress";
    RiskStatus["TRAITE"] = "treated";
    RiskStatus["TRAIT\u00C9"] = "treated";
    RiskStatus["CLOTURE"] = "closed";
    RiskStatus["CL\u00D4TURE"] = "closed";
})(RiskStatus || (RiskStatus = {}));
export var PeriodicFrequency;
(function (PeriodicFrequency) {
    PeriodicFrequency["QUOTIDIEN"] = "quotidien";
    PeriodicFrequency["HEBDOMADAIRE"] = "hebdomadaire";
    PeriodicFrequency["BIMENSUEL"] = "bimensuel";
    PeriodicFrequency["MENSUEL"] = "mensuel";
    PeriodicFrequency["TRIMESTRIEL"] = "trimestriel";
    PeriodicFrequency["SEMESTRIEL"] = "semestriel";
    PeriodicFrequency["ANNUEL"] = "annuel";
    PeriodicFrequency["NONE"] = "none";
    PeriodicFrequency["AUCUN"] = "none";
})(PeriodicFrequency || (PeriodicFrequency = {}));
export const RISK_LEVEL_LABELS = {
    [RiskLevel.LOW]: 'Faible',
    [RiskLevel.LIMITED]: 'Limité',
    [RiskLevel.MEDIUM]: 'Moyen',
    [RiskLevel.HIGH]: 'Élevé',
    [RiskLevel.CRITICAL]: 'Critique',
};
export const RISK_STATUS_LABELS = {
    [RiskStatus.OPEN]: 'Ouvert',
    [RiskStatus.IN_PROGRESS]: 'En cours',
    [RiskStatus.TREATED]: 'Traité',
    [RiskStatus.CLOSED]: 'Clôturé',
};
export const RISK_PROBABILITY_LABELS = {
    [RiskProbability.RARE]: 'Rare',
    [RiskProbability.POSSIBLE]: 'Possible',
    [RiskProbability.PROBABLE]: 'Probable',
    [RiskProbability.PERMANENT]: 'Permanent',
};
export const RISK_IMPACT_LABELS = {
    [RiskImpact.LIMITED]: 'Limité',
    [RiskImpact.MEDIUM]: 'Moyen',
    [RiskImpact.SIGNIFICANT]: 'Significatif',
    [RiskImpact.CRITICAL]: 'Critique',
};
export const MAITRISE_LEVEL_LABELS = {
    [MaitriseLevel.FAIBLE]: 'Faible',
    [MaitriseLevel.LIMITED]: 'Limité',
    [MaitriseLevel.MEDIUM]: 'Moyen',
    [MaitriseLevel.HIGH]: 'Élevé',
};
export const PERIODIC_FREQUENCY_LABELS = {
    [PeriodicFrequency.QUOTIDIEN]: 'Quotidien',
    [PeriodicFrequency.HEBDOMADAIRE]: 'Hebdomadaire',
    [PeriodicFrequency.BIMENSUEL]: 'Bimensuel',
    [PeriodicFrequency.MENSUEL]: 'Mensuel',
    [PeriodicFrequency.TRIMESTRIEL]: 'Trimestriel',
    [PeriodicFrequency.SEMESTRIEL]: 'Semestriel',
    [PeriodicFrequency.ANNUEL]: 'Annuel',
    [PeriodicFrequency.NONE]: 'Aucun',
};
export const CANONICAL_RISK_LEVELS = [
    RiskLevel.LOW,
    RiskLevel.LIMITED,
    RiskLevel.MEDIUM,
    RiskLevel.HIGH,
    RiskLevel.CRITICAL,
];
export const CANONICAL_RISK_STATUSES = [
    RiskStatus.OPEN,
    RiskStatus.IN_PROGRESS,
    RiskStatus.TREATED,
    RiskStatus.CLOSED,
];
export const CANONICAL_RISK_PROBABILITIES = [
    RiskProbability.RARE,
    RiskProbability.POSSIBLE,
    RiskProbability.PROBABLE,
    RiskProbability.PERMANENT,
];
export const CANONICAL_RISK_IMPACTS = [
    RiskImpact.LIMITED,
    RiskImpact.MEDIUM,
    RiskImpact.SIGNIFICANT,
    RiskImpact.CRITICAL,
];
export const CANONICAL_MAITRISE_LEVELS = [
    MaitriseLevel.FAIBLE,
    MaitriseLevel.LIMITED,
    MaitriseLevel.MEDIUM,
    MaitriseLevel.HIGH,
];
export const CANONICAL_PERIODIC_FREQUENCIES = [
    PeriodicFrequency.QUOTIDIEN,
    PeriodicFrequency.HEBDOMADAIRE,
    PeriodicFrequency.BIMENSUEL,
    PeriodicFrequency.MENSUEL,
    PeriodicFrequency.TRIMESTRIEL,
    PeriodicFrequency.SEMESTRIEL,
    PeriodicFrequency.ANNUEL,
    PeriodicFrequency.NONE,
];
export const RISK_LEVEL_OPTIONS = CANONICAL_RISK_LEVELS.map((code) => ({
    code,
    label: RISK_LEVEL_LABELS[code],
}));
export const RISK_STATUS_OPTIONS = CANONICAL_RISK_STATUSES.map((code) => ({
    code,
    label: RISK_STATUS_LABELS[code],
}));
export class RiskService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = `${environment.apiUrl}/risk`;
    }
    trackLongRunningRequest(factory) {
        return defer(() => {
            this.authService.beginLongRunningTask();
            return factory().pipe(finalize(() => this.authService.endLongRunningTask()));
        });
    }
    getRisks() {
        return this.http.get(this.apiUrl);
    }
    createRisk(formData) {
        return this.http.post(this.apiUrl, formData);
    }
    assignRisk(riskId, riskAgentId) {
        return this.http.put(`${this.apiUrl}/${riskId}/assign`, { riskAgentId });
    }
    updateStatus(riskId, statut) {
        return this.http.put(`${this.apiUrl}/${riskId}/status`, { statut });
    }
    updateRisk(id, formData) {
        return this.http.put(`${this.apiUrl}/${id}`, formData);
    }
    addComment(riskId, formData) {
        return this.http.post(`${this.apiUrl}/${riskId}/comments`, formData);
    }
    getComments(riskId) {
        return this.http.get(`${this.apiUrl}/${riskId}/comments`);
    }
    generateRisks(situation) {
        return this.trackLongRunningRequest(() => this.http.post(`${environment.apiUrl}/assistant/generate-risks`, { situation }));
    }
    generateRisksFromFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.trackLongRunningRequest(() => this.http.post(`${environment.apiUrl}/assistant/generate-risks-file`, formData));
    }
    evaluateRisks(riskIds) {
        return this.http.post(`${this.apiUrl}/evaluate`, { riskIds });
    }
    static calculateMaturityIndex(risks) {
        if (!risks || risks.length === 0)
            return 0;
        const total = risks.length;
        const identifiedCount = risks.filter((risk) => risk.domaine && risk.departementId).length;
        const identificationScore = (identifiedCount / total) * 1.0;
        const treatedCount = risks.filter((risk) => RiskService.getRiskStatusCode(risk) === RiskStatus.TREATED || RiskService.getRiskStatusCode(risk) === RiskStatus.CLOSED).length;
        const treatmentScore = (treatedCount / total) * 2.0;
        const highSeverityUntreated = risks.filter((risk) => (RiskService.getRiskLevelCode(risk) === RiskLevel.CRITICAL || RiskService.getRiskLevelCode(risk) === RiskLevel.HIGH) &&
            RiskService.getRiskStatusCode(risk) !== RiskStatus.TREATED &&
            RiskService.getRiskStatusCode(risk) !== RiskStatus.CLOSED).length;
        const severityScore = Math.max(0, 1.0 - (highSeverityUntreated / total));
        const today = new Date();
        const onTimeCount = risks.filter((risk) => {
            if (RiskService.getRiskStatusCode(risk) === RiskStatus.TREATED || RiskService.getRiskStatusCode(risk) === RiskStatus.CLOSED) {
                return true;
            }
            return new Date(risk.dateEcheance) >= today;
        }).length;
        const timelinessScore = (onTimeCount / total) * 1.0;
        const totalMaturity = identificationScore + treatmentScore + severityScore + timelinessScore;
        return Number(Math.min(5.0, totalMaturity).toFixed(1));
    }
    static getRiskStatusCode(risk) {
        return RiskService.normalizeLookupValue(risk.statutCode || risk.statut);
    }
    static getRiskLevelCode(risk) {
        return RiskService.normalizeLookupValue(risk.niveauRisqueCode || risk.niveauRisque);
    }
    static normalizeLookupValue(value) {
        const stringValue = value == null ? '' : String(value);
        return stringValue
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
    sendNotification(riskId) {
        return this.http.post(`${this.apiUrl}/${riskId}/notify`, {});
    }
    deleteRisk(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    exportIncident(id) {
        return this.http.get(`${this.apiUrl}/${id}/export-incident`, { responseType: 'blob' });
    }
}
RiskService.ɵfac = function RiskService_Factory(t) { return new (t || RiskService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
RiskService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RiskService, factory: RiskService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=risk.service.js.map