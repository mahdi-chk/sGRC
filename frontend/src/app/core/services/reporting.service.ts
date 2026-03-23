import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReportingStats {
    risks: {
        total: number;
        byStatus: any[];
        byLevel: any[];
        recent: any[];
    };
    incidents: {
        total: number;
        byStatus: any[];
        recent: any[];
    };
    audits: {
        total: number;
        byStatus: any[];
    };
}

export interface KPI {
    id: string;
    label: string;
    value: number;
    unit: string;
}

export interface MultiEntityData {
    id: number;
    name: string;
    riskCount: number;
    criticalRiskCount: number;
    treatmentRate: number;
}

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    private apiUrl = `${environment.apiUrl}/reporting`;

    constructor(private http: HttpClient) { }

    getStats(): Observable<ReportingStats> {
        return this.http.get<ReportingStats>(`${this.apiUrl}/stats`);
    }

    getKpis(): Observable<KPI[]> {
        return this.http.get<KPI[]>(`${this.apiUrl}/kpis`);
    }

    getMultiEntityData(): Observable<MultiEntityData[]> {
        return this.http.get<MultiEntityData[]>(`${this.apiUrl}/multi-entity`);
    }

    exportData(params: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/export`, params);
    }
}
