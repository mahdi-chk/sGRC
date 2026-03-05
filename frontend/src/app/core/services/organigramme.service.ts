import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * @file organigramme.service.ts
 * @description Service pour la gestion de la table organigramme.
 */
@Injectable({
    providedIn: 'root'
})
export class OrganigrammeService {
    private apiUrl = `${environment.apiUrl}/organigramme`;

    constructor(private http: HttpClient) { }

    /**
     * Récupère tous les éléments de l'organigramme.
     */
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    /**
     * Crée un nouvel élément.
     */
    create(nom: string): Observable<any> {
        return this.http.post<any>(this.apiUrl, { nom });
    }

    /**
     * Modifie un élément existant.
     */
    update(id: number, nom: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, { nom });
    }

    /**
     * Supprime un élément.
     */
    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    /**
     * Importe des noms depuis un fichier Excel.
     */
    importExcel(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${this.apiUrl}/import`, formData);
    }
}
