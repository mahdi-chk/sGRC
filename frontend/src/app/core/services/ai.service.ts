import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AIService {
    private apiUrl = `${environment.apiUrl}/ai`;

    constructor(private http: HttpClient) { }

    chat(prompt: string): Observable<{ response: string }> {
        return this.http.post<{ response: string }>(`${this.apiUrl}/generate`, { prompt });
    }

    getStatus(): Observable<{ isInitialized: boolean }> {
        return this.http.get<{ isInitialized: boolean }>(`${this.apiUrl}/status`);
    }

    indexNormes(): Observable<{ success: boolean, count: number }> {
        return this.http.post<{ success: boolean, count: number }>(`${this.apiUrl}/index`, {});
    }
}
