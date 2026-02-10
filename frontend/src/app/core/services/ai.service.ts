import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AIService {
    private apiUrl = `${environment.apiUrl}/ai/chat`;

    constructor(private http: HttpClient) { }

    chat(prompt: string): Observable<{ response: string }> {
        return this.http.post<{ response: string }>(this.apiUrl, { prompt });
    }
}
