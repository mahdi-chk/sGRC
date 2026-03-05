/**
 * @file auditing.service.ts
 * @description Service de communication avec l'API pour le module d'audit.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Énumération des statuts de mission d'audit (synchronisée avec le backend)
 */
export enum AuditMissionStatus {
    A_VENIR = 'À venir',
    EN_COURS = 'En cours',
    TERMINE = 'Terminé',
    EN_RETARD = 'En retard',
    ANNULE = 'Annulé',
}

/**
 * Interface représentant une Mission d'Audit côté frontend.
 */
export interface AuditMission {
    id: number;
    titre: string;
    objectifs: string;
    responsabilites: string;
    description: string | null;
    statut: AuditMissionStatus;
    riskId: number;
    auditeurSeniorId: number;
    auditeurId: number | null;
    delai: Date;
    rapport: string | null;
    recommandations: string | null;
    createdAt: Date;
    updatedAt: Date;
    risk?: any;
    auditeurSenior?: any;
    auditeur?: any;
}

@Injectable({
    providedIn: 'root'
})
export class AuditingService {
    private apiUrl = `${environment.apiUrl}/auditing`;

    constructor(private http: HttpClient) { }

    /**
     * Récupère la liste des missions d'audit.
     */
    getMissions(): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/missions`);
    }

    /**
     * Suggère un plan d'audit annuel via l'IA.
     */
    suggestPlan(): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/suggest-plan`, {});
    }

    /**
     * Crée des missions à partir d'un plan suggéré.
     */
    createMissionsFromPlan(missions: any[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/create-missions`, { missions });
    }

    /**
     * Assigne une mission à un auditeur.
     */
    assignMission(missionId: number, auditeurId: number): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/assign`, { auditeurId });
    }

    /**
     * Soumet un rapport d'audit.
     */
    submitReport(missionId: number, data: { rapport: string, recommandations: string }): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/report`, data);
    }

    /**
     * Supprime une mission d'audit.
     */
    deleteMission(missionId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}`);
    }

    /**
     * Réinitialise une mission d'audit.
     */
    resetMission(missionId: number): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}/reset`, {});
    }
}
