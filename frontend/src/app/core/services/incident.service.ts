import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum IncidentStatus {
    NOUVEAU = 'nouveau',
    EN_COURS = 'en_cours',
    TRAITE = 'traite',
    CLOS = 'clos',
}

export enum IncidentNiveauRisque {
    LOW = 'low',
    LIMITED = 'limited',
    MEDIUM = 'medium',
    SIGNIFICANT = 'significant',
    HIGH = 'high',
    CRITICAL = 'critical',
}



export interface Incident {
    id: number;
    titre: string;
    description: string;
    dateSurvenance: Date | string;
    statut: IncidentStatus;
    statutLabel?: string;
    pieceJointe: string | null;
    userId: number | null;
    declareur?: { id: number; nom: string; prenom: string; mail: string };
    createdAt: Date | string;
    updatedAt: Date | string;
    
    // Fiche Incident Mapping fields 
    departementId?: number;
    domaine?: string;
    macroProcessus?: string;
    processus?: string;
    planActionTraitement?: string;
    dateEcheance?: Date | string;
    niveauRisque?: IncidentNiveauRisque;
    niveauRisqueLabel?: string;
    riskId?: number;
}


export interface IncidentImportDraft {
    titre: string | null;
    description: string | null;
    dateSurvenance: string | null;
    domaine?: string | null;
    departementId?: number | null;
    departementNom?: string | null;
    macroProcessus?: string | null;
    processus?: string | null;
    planActionTraitement?: string | null;
    niveauRisque?: string | null;
    extractedTextPreview?: string | null;
    sourceType?: 'excel' | 'document' | 'image-scan';
    importReliability?: 'high' | 'medium' | 'low';
    warnings?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    private apiUrl = `${environment.apiUrl}/incidents`;

    constructor(private http: HttpClient) { }

    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>(this.apiUrl);
    }

    createIncident(formData: FormData): Observable<Incident> {
        return this.http.post<Incident>(this.apiUrl, formData);
    }

    importIncidentDraft(file: File): Observable<IncidentImportDraft> {
        const formData = new FormData();
        formData.append('sourceFile', file);
        return this.http.post<IncidentImportDraft>(`${this.apiUrl}/import-draft`, formData);
    }

    updateIncident(id: number, data: any): Observable<Incident> {
        return this.http.put<Incident>(`${this.apiUrl}/${id}`, data);
    }

    generateRisksFromIncident(incidentId: number): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/${incidentId}/generate-risks`, {});
    }
}
