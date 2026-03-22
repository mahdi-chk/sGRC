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
    auditSeniorId: number;
    auditeurId?: number;
    checklistTemplateId?: number;
    delai: Date;
    rapport?: string;
    recommandations?: string;
    createdAt: Date;
    updatedAt: Date;
    risk?: any;
    auditSenior?: any;
    auditeur?: any;
}

export interface AuditChecklistTemplate {
    id: number;
    titre: string;
    description: string | null;
    createdById: number;
    createdAt: Date;
    items?: AuditChecklistTemplateItem[];
}

export interface AuditChecklistTemplateItem {
    id: number;
    templateId: number;
    texte: string;
}

export interface AuditMissionChecklistItem {
    id: number;
    missionId: number;
    texte: string;
    estFait: boolean;
}

export interface AuditEvidence {
    id: number;
    missionId: number;
    filename: string;
    path: string;
    uploadedById: number;
    createdAt: Date;
    uploader?: any;
    mission?: any;
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
     * Met à jour les détails d'une mission d'audit.
     */
    updateMission(missionId: number, data: Partial<AuditMission>): Observable<AuditMission> {
        return this.http.put<AuditMission>(`${this.apiUrl}/missions/${missionId}`, data);
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

    /**
     * --- CHECKLISTS TEMPLATES ---
     */

    getChecklistTemplates(): Observable<AuditChecklistTemplate[]> {
        return this.http.get<AuditChecklistTemplate[]>(`${this.apiUrl}/checklists`);
    }

    createChecklistTemplate(data: { titre: string, description?: string, items: string[] }): Observable<AuditChecklistTemplate> {
        return this.http.post<AuditChecklistTemplate>(`${this.apiUrl}/checklists`, data);
    }

    deleteChecklistTemplate(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/checklists/${id}`);
    }

    /**
     * --- MISSION CHECKLISTS ---
     */

    getMissionChecklistItems(missionId: number): Observable<AuditMissionChecklistItem[]> {
        return this.http.get<AuditMissionChecklistItem[]>(`${this.apiUrl}/missions/${missionId}/checklists`);
    }

    assignTemplateToMission(missionId: number, templateId: number): Observable<AuditMissionChecklistItem[]> {
        return this.http.post<AuditMissionChecklistItem[]>(`${this.apiUrl}/missions/${missionId}/checklists`, { templateId });
    }

    toggleMissionChecklistItem(missionId: number, itemId: number, estFait: boolean): Observable<AuditMissionChecklistItem> {
        return this.http.put<AuditMissionChecklistItem>(`${this.apiUrl}/missions/${missionId}/checklists/${itemId}`, { estFait });
    }

    /**
     * --- TRAÇABILITÉ DES PREUVES ---
     */

    getMissionEvidence(missionId: number): Observable<AuditEvidence[]> {
        return this.http.get<AuditEvidence[]>(`${this.apiUrl}/missions/${missionId}/evidence`);
    }

    addMissionEvidence(missionId: number, file: File): Observable<AuditEvidence> {
        const formData = new FormData();
        formData.append('evidenceFile', file);
        return this.http.post<AuditEvidence>(`${this.apiUrl}/missions/${missionId}/evidence`, formData);
    }

    deleteMissionEvidence(missionId: number, evidenceId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/evidence/${evidenceId}`);
    }

    /**
     * Récupère TOUTES les preuves d'audit (Global Explorer).
     */
    getAllEvidence(): Observable<AuditEvidence[]> {
        return this.http.get<AuditEvidence[]>(`${this.apiUrl}/evidence`);
    }

    /**
     * Récupère les missions avec rapports soumis (Review Center).
     */
    getReportsToReview(): Observable<AuditMission[]> {
        return this.http.get<AuditMission[]>(`${this.apiUrl}/reports`);
    }
}
