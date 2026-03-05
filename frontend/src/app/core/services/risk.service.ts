/**
 * @file risk.service.ts
 * @description Service de communication avec l'API pour la gestion des risques.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Énumération des niveaux de risque (synchronisée avec le backend)
 */
export enum RiskLevel {
    LOW = 'Faible',
    MEDIUM = 'Moyen',
    HIGH = 'Élevé',
    CRITICAL = 'Critique',
}

/**
 * Énumération des statuts de risque (synchronisée avec le backend)
 */
export enum RiskStatus {
    OPEN = 'Ouvert',
    IN_PROGRESS = 'En cours',
    TREATED = 'Traité',
    CLOSED = 'Clôturé',
}

/**
 * Fréquences de traitement périodique (synchronisées avec le backend)
 */
export enum PeriodicFrequency {
    QUOTIDIEN = 'Quotidien',
    HEBDOMADAIRE = 'Hebdomadaire',
    BIMENSUEL = 'Bimensuel',
    MENSUEL = 'Mensuel',
    TRIMESTRIEL = 'Trimestriel',
    SEMESTRIEL = 'Semestriel',
    ANNUEL = 'Annuel',
    NONE = 'Aucun',
}

/**
 * Interface représentant l'objet Risque côté frontend
 */
export interface Risk {
    id: number;
    titre: string;
    explication: string;
    domaine: string;
    departementId: number;
    dateEcheance: Date;
    niveauRisque: RiskLevel;
    responsableTraitementId: number;
    riskManagerId: number;
    riskAgentId: number | null;
    statut: RiskStatus;
    pieceJustificative: string | null;
    frequenceTraitement: PeriodicFrequency;
    prochaineEcheance: Date | null;
    dernierTraitement: Date | null;
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

    /**
     * Récupère la liste des risques accessibles par l'utilisateur courant.
     */
    getRisks(): Observable<Risk[]> {
        return this.http.get<Risk[]>(this.apiUrl);
    }

    /**
     * Envoie une requête de création de risque avec les données (incluant le fichier).
     */
    createRisk(formData: FormData): Observable<Risk> {
        return this.http.post<Risk>(this.apiUrl, formData);
    }

    /**
     * Assigne un risque à un agent de traitement.
     */
    assignRisk(riskId: number, riskAgentId: number): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${riskId}/assign`, { riskAgentId });
    }

    /**
     * Met à jour le statut d'un risque (ex: Traité, Clôturé).
     */
    updateStatus(riskId: number, statut: RiskStatus): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${riskId}/status`, { statut });
    }

    /**
     * Modifie les informations générales d'un risque.
     */
    updateRisk(id: number, formData: FormData): Observable<Risk> {
        return this.http.put<Risk>(`${this.apiUrl}/${id}`, formData);
    }

    /**
     * Ajoute un commentaire ou une preuve de traitement.
     */
    addComment(riskId: number, formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/${riskId}/comments`, formData);
    }

    /**
     * Récupère le fil de discussion d'un risque spécifique.
     */
    getComments(riskId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${riskId}/comments`);
    }

    /**
     * Utilise l'IA pour générer des suggestions de risques à partir d'une situation donnée.
     */
    generateRisks(situation: string): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiUrl}/assistant/generate-risks`, { situation });
    }

    /**
     * Évaluation stratégique des risques via IA.
     */
    /**
     * Évaluation stratégique des risques via IA.
     */
    evaluateRisks(riskIds: number[]): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/evaluate`, { riskIds });
    }

    /**
     * Calcule l'indice de maturité globale (0 à 5) basé sur plusieurs dimensions.
     * @param risks Liste des risques à analyser
     */
    static calculateMaturityIndex(risks: Risk[]): number {
        if (!risks || risks.length === 0) return 0;

        const total = risks.length;

        // 1. Qualité d'Identification (Max 1.0)
        // Les risques doivent avoir un département et un domaine spécifiés
        const identifiedCount = risks.filter(r => r.domaine && r.departementId).length;
        const identificationScore = (identifiedCount / total) * 1.0;

        // 2. Efficacité du Traitement (Max 2.0)
        // Ratio de risques traités ou clôturés
        const treatedCount = risks.filter(r => r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED).length;
        const treatmentScore = (treatedCount / total) * 2.0;

        // 3. Maîtrise de la Sévérité (Max 1.0)
        // Pénalité pour les risques Critiques et Élevés non traités
        const highSeverityUntreated = risks.filter(r =>
            (r.niveauRisque === RiskLevel.CRITICAL || r.niveauRisque === RiskLevel.HIGH) &&
            (r.statut !== RiskStatus.TREATED && r.statut !== RiskStatus.CLOSED)
        ).length;
        const severityScore = Math.max(0, 1.0 - (highSeverityUntreated / total));

        // 4. Respect des Délais (Max 1.0)
        // Risques non en retard
        const today = new Date();
        const onTimeCount = risks.filter(r => {
            if (r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED) return true;
            return new Date(r.dateEcheance) >= today;
        }).length;
        const timelinessScore = (onTimeCount / total) * 1.0;

        const totalMaturity = identificationScore + treatmentScore + severityScore + timelinessScore;
        return Number(Math.min(5.0, totalMaturity).toFixed(1));
    }

    /**
     * Supprime un risque de la base de données.
     */
    deleteRisk(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
