/**
 * @file risk.service.ts
 * @description Service de communication avec l'API pour la gestion des risques.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private apiUrl = 'http://localhost:3000/api/risk';

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
        return this.http.post<any[]>('http://localhost:3000/api/ai/generate-risks', { situation });
    }
}
