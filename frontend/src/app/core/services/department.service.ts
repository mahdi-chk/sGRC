import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Department {
    id: number;
    nom: string;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private apiUrl = `${environment.apiUrl}/departments`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Department[]> {
        return this.http.get<Department[]>(this.apiUrl);
    }

    create(nom: string): Observable<Department> {
        return this.http.post<Department>(this.apiUrl, { nom });
    }

    update(id: number, nom: string): Observable<Department> {
        return this.http.put<Department>(`${this.apiUrl}/${id}`, { nom });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    importExcel(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${this.apiUrl}/import`, formData);
    }
}
