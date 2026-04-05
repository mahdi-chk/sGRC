import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { defer, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface RagIndexingResult {
    success: boolean;
    count: number;
    files: number;
    failedFiles: number;
    useOcr: boolean;
    ocrUsedFiles: number;
    nativeFiles: number;
    scannedPdfLikelyFiles: number;
}

@Injectable({
    providedIn: 'root'
})
export class AIService {
    private apiUrl = `${environment.apiUrl}/assistant`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    private trackLongRunningRequest<T>(factory: () => Observable<T>): Observable<T> {
        return defer(() => {
            this.authService.beginLongRunningTask();
            return factory().pipe(finalize(() => this.authService.endLongRunningTask()));
        });
    }

    chat(prompt: string, sessionId: string): Observable<{ response: string }> {
        return this.http.post<{ response: string }>(`${this.apiUrl}/generate`, { prompt, sessionId });
    }

    async *chatStream(prompt: string, sessionId: string, signal?: AbortSignal): AsyncIterable<string> {
        this.authService.beginLongRunningTask();

        try {
            const token = this.authService.getToken();
            const response = await fetch(`${this.apiUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt, sessionId }),
                signal
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
        } finally {
            this.authService.endLongRunningTask();
        }
    }

    getStatus(): Observable<{ isInitialized: boolean }> {
        return this.http.get<{ isInitialized: boolean }>(`${this.apiUrl}/status`);
    }

    indexNormes(): Observable<RagIndexingResult> {
        return this.trackLongRunningRequest(() => this.http.post<RagIndexingResult>(`${this.apiUrl}/index`, {}));
    }
    getRagDocuments(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/docs`);
    }

    uploadRagDocument(file: File): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);

        return this.trackLongRunningRequest(() => {
            const req = new HttpRequest('POST', `${this.apiUrl}/docs/upload`, formData, {
                reportProgress: true
            });

            return this.http.request(req);
        });
    }

    deleteRagDocument(relativePath: string): Observable<any> {
        return this.trackLongRunningRequest(() => this.http.delete(`${this.apiUrl}/docs/file?path=${encodeURIComponent(relativePath)}`));
    }
}
