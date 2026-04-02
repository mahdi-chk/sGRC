/**
 * @file risk.service.ts
 * @description Service de communication avec l'API pour la gestion des risques.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Enumerations synchronisees avec les lookups backend.
 * Les alias francais sont conserves pour eviter de casser le code existant.
 */
export enum RiskLevel {
    LOW = 'low',
    LIMITED = 'limited',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
    FAIBLE = 'low',
    LIMITE = 'limited',
    LIMITÉ = 'limited',
    MOYEN = 'medium',
    ELEVE = 'high',
    ÉLEVÉ = 'high',
}

export enum RiskProbability {
    RARE = 'rare',
    POSSIBLE = 'possible',
    PROBABLE = 'probable',
    PERMANENT = 'permanent',
}

export enum RiskImpact {
    LIMITED = 'limited',
    MEDIUM = 'medium',
    SIGNIFICANT = 'significant',
    CRITICAL = 'critical',
    LIMITE = 'limited',
    LIMITÉ = 'limited',
    MOYEN = 'medium',
    SIGNIFICATIF = 'significant',
    CRITIQUE = 'critical',
}

export enum MaitriseLevel {
    FAIBLE = 'faible',
    LIMITED = 'limited',
    MEDIUM = 'medium',
    HIGH = 'high',
    LIMITE = 'limited',
    LIMITÉ = 'limited',
    MOYEN = 'medium',
    ELEVE = 'high',
    ÉLEVÉ = 'high',
}

export enum RiskStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    TREATED = 'treated',
    CLOSED = 'closed',
    OUVERT = 'open',
    EN_COURS = 'in_progress',
    TRAITE = 'treated',
    TRAITÉ = 'treated',
    CLOTURE = 'closed',
    CLÔTURE = 'closed',
}

export enum PeriodicFrequency {
    QUOTIDIEN = 'quotidien',
    HEBDOMADAIRE = 'hebdomadaire',
    BIMENSUEL = 'bimensuel',
    MENSUEL = 'mensuel',
    TRIMESTRIEL = 'trimestriel',
    SEMESTRIEL = 'semestriel',
    ANNUEL = 'annuel',
    NONE = 'none',
    AUCUN = 'none',
}

export const RISK_LEVEL_LABELS: Record<string, string> = {
    [RiskLevel.LOW]: 'Faible',
    [RiskLevel.LIMITED]: 'Limité',
    [RiskLevel.MEDIUM]: 'Moyen',
    [RiskLevel.HIGH]: 'Élevé',
    [RiskLevel.CRITICAL]: 'Critique',
};

export const RISK_STATUS_LABELS: Record<string, string> = {
    [RiskStatus.OPEN]: 'Ouvert',
    [RiskStatus.IN_PROGRESS]: 'En cours',
    [RiskStatus.TREATED]: 'Traité',
    [RiskStatus.CLOSED]: 'Clôturé',
};

export const RISK_PROBABILITY_LABELS: Record<string, string> = {
    [RiskProbability.RARE]: 'Rare',
    [RiskProbability.POSSIBLE]: 'Possible',
    [RiskProbability.PROBABLE]: 'Probable',
    [RiskProbability.PERMANENT]: 'Permanent',
};

export const RISK_IMPACT_LABELS: Record<string, string> = {
    [RiskImpact.LIMITED]: 'Limité',
    [RiskImpact.MEDIUM]: 'Moyen',
    [RiskImpact.SIGNIFICANT]: 'Significatif',
    [RiskImpact.CRITICAL]: 'Critique',
};

export const MAITRISE_LEVEL_LABELS: Record<string, string> = {
    [MaitriseLevel.FAIBLE]: 'Faible',
    [MaitriseLevel.LIMITED]: 'Limité',
    [MaitriseLevel.MEDIUM]: 'Moyen',
    [MaitriseLevel.HIGH]: 'Élevé',
};

export const PERIODIC_FREQUENCY_LABELS: Record<string, string> = {
    [PeriodicFrequency.QUOTIDIEN]: 'Quotidien',
    [PeriodicFrequency.HEBDOMADAIRE]: 'Hebdomadaire',
    [PeriodicFrequency.BIMENSUEL]: 'Bimensuel',
    [PeriodicFrequency.MENSUEL]: 'Mensuel',
    [PeriodicFrequency.TRIMESTRIEL]: 'Trimestriel',
    [PeriodicFrequency.SEMESTRIEL]: 'Semestriel',
    [PeriodicFrequency.ANNUEL]: 'Annuel',
    [PeriodicFrequency.NONE]: 'Aucun',
};

export const CANONICAL_RISK_LEVELS: RiskLevel[] = [
    RiskLevel.LOW,
    RiskLevel.LIMITED,
    RiskLevel.MEDIUM,
    RiskLevel.HIGH,
    RiskLevel.CRITICAL,
];

export const CANONICAL_RISK_STATUSES: RiskStatus[] = [
    RiskStatus.OPEN,
    RiskStatus.IN_PROGRESS,
    RiskStatus.TREATED,
    RiskStatus.CLOSED,
];

export const CANONICAL_RISK_PROBABILITIES: RiskProbability[] = [
    RiskProbability.RARE,
    RiskProbability.POSSIBLE,
    RiskProbability.PROBABLE,
    RiskProbability.PERMANENT,
];

export const CANONICAL_RISK_IMPACTS: RiskImpact[] = [
    RiskImpact.LIMITED,
    RiskImpact.MEDIUM,
    RiskImpact.SIGNIFICANT,
    RiskImpact.CRITICAL,
];

export const CANONICAL_MAITRISE_LEVELS: MaitriseLevel[] = [
    MaitriseLevel.FAIBLE,
    MaitriseLevel.LIMITED,
    MaitriseLevel.MEDIUM,
    MaitriseLevel.HIGH,
];

export const CANONICAL_PERIODIC_FREQUENCIES: PeriodicFrequency[] = [
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

export interface Risk {
    id: number;
    titre: string;
    explication: string;
    domaine: string;
    macroProcessus?: string | null;
    processus?: string | null;

    cotationProbabilite?: number | null;
    cotationImpact?: number | null;
    niveauCotationRisqueBrut?: number | null;
    dmrExistant?: string | null;
    cotationDmr?: number | null;
    niveauCotationRisqueNet?: number | null;
    planActionTraitement?: string | null;

    departementId: number;
    dateEcheance: Date;
    niveauRisque: RiskLevel;
    niveauRisqueCode?: string;
    niveauRisqueLabel?: string;
    responsableTraitementId: number;
    riskManagerId: number;
    riskAgentId: number | null;
    statut: RiskStatus;
    statutCode?: string;
    statutLabel?: string;
    pieceJustificative: string | null;
    frequenceTraitement: PeriodicFrequency;
    frequenceTraitementLabel?: string;
    prochaineEcheance: Date | null;
    dernierTraitement: Date | null;

    probabilite?: RiskProbability | null;
    probabiliteLabel?: string;
    impact?: RiskImpact | null;
    impactLabel?: string;

    cotationRisqueBrut?: RiskLevel | null;
    cotationRisqueBrutLabel?: string;
    niveauMaitrise?: MaitriseLevel | null;
    niveauMaitriseLabel?: string;
    cotationRisqueNet?: RiskLevel | null;
    cotationRisqueNetLabel?: string;

    aiAnalysisScore?: number | null;
    aiAnalysisImpact?: string | null;
    aiAnalysisTendance?: string | null;
    aiAnalysisSuggestion?: string | null;
    aiAnalysisDate?: Date | null;

    createdAt: Date;
    updatedAt: Date;
    riskAgent?: any;
    responsableTraitement?: any;
    departement?: any;
}

@Injectable({
    providedIn: 'root'
})
export class RiskService {
    private apiUrl = `${environment.apiUrl}/risk`;

    constructor(private http: HttpClient) { }

    getRisks(): Observable<Risk[]> {
        return this.http.get<Risk[]>(this.apiUrl);
    }

    createRisk(formData: FormData): Observable<Risk> {
        return this.http.post<Risk>(this.apiUrl, formData);
    }

    assignRisk(riskId: number, riskAgentId: number): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${riskId}/assign`, { riskAgentId });
    }

    updateStatus(riskId: number, statut: RiskStatus): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${riskId}/status`, { statut });
    }

    updateRisk(id: number, formData: FormData): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${id}`, formData);
    }

    addComment(riskId: number, formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/${riskId}/comments`, formData);
    }

    getComments(riskId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${riskId}/comments`);
    }

    generateRisks(situation: string): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiUrl}/assistant/generate-risks`, { situation });
    }

    generateRisksFromFile(file: File): Observable<any[]> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any[]>(`${environment.apiUrl}/assistant/generate-risks-file`, formData);
    }

    evaluateRisks(riskIds: number[]): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/evaluate`, { riskIds });
    }

    static calculateMaturityIndex(risks: Risk[]): number {
        if (!risks || risks.length === 0) return 0;

        const total = risks.length;
        const identifiedCount = risks.filter((risk) => risk.domaine && risk.departementId).length;
        const identificationScore = (identifiedCount / total) * 1.0;

        const treatedCount = risks.filter((risk) =>
            RiskService.getRiskStatusCode(risk) === RiskStatus.TREATED || RiskService.getRiskStatusCode(risk) === RiskStatus.CLOSED
        ).length;
        const treatmentScore = (treatedCount / total) * 2.0;

        const highSeverityUntreated = risks.filter((risk) =>
            (RiskService.getRiskLevelCode(risk) === RiskLevel.CRITICAL || RiskService.getRiskLevelCode(risk) === RiskLevel.HIGH) &&
            RiskService.getRiskStatusCode(risk) !== RiskStatus.TREATED &&
            RiskService.getRiskStatusCode(risk) !== RiskStatus.CLOSED
        ).length;
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

    static getRiskStatusCode(risk: Pick<Risk, 'statut' | 'statutCode'>): string {
        return RiskService.normalizeLookupValue(risk.statutCode || risk.statut);
    }

    static getRiskLevelCode(risk: Pick<Risk, 'niveauRisque' | 'niveauRisqueCode'>): string {
        return RiskService.normalizeLookupValue(risk.niveauRisqueCode || risk.niveauRisque);
    }

    static normalizeLookupValue(value: unknown): string {
        const stringValue = value == null ? '' : String(value);
        return stringValue
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }

    sendNotification(riskId: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${riskId}/notify`, {});
    }

    deleteRisk(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    exportIncident(id: number): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${id}/export-incident`, { responseType: 'blob' });
    }
}
