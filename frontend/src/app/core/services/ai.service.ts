import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AIService {
    private apiUrl = `${environment.apiUrl}/ai`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    chat(prompt: string, sessionId: string): Observable<{ response: string }> {
        return this.http.post<{ response: string }>(`${this.apiUrl}/generate`, { prompt, sessionId });
    }

    async *chatStream(prompt: string, sessionId: string): AsyncIterable<string> {
        const token = this.authService.getToken();
        const response = await fetch(`${this.apiUrl}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt, sessionId })
        });

        if (!response.ok) throw new Error('AI Service Error');

        const reader = response.body?.getReader();
        if (!reader) throw new Error('ReadableStream not supported');

        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') return;
                    try {
                        const parsed = JSON.parse(data);
                        yield parsed.content;
                    } catch (e) { }
                }
            }
        }
    }

    getStatus(): Observable<{ isInitialized: boolean }> {
        return this.http.get<{ isInitialized: boolean }>(`${this.apiUrl}/status`);
    }

    indexNormes(): Observable<{ success: boolean, count: number }> {
        return this.http.post<{ success: boolean, count: number }>(`${this.apiUrl}/index`, {});
    }
}
