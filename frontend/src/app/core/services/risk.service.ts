import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum RiskLevel {
    LOW = 'Faible',
    MEDIUM = 'Moyen',
    HIGH = 'Élevé',
    CRITICAL = 'Critique',
}

export enum RiskStatus {
    IN_PROGRESS = 'En cours',
    TREATED = 'Traité',
    CLOSED = 'Clôturé',
}

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
}
