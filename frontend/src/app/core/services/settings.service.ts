import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private apiUrl = `${environment.apiUrl}/settings`;

    constructor(private http: HttpClient) { }

    getSettings(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    updateSetting(key: string, value: string): Observable<any> {
        return this.http.post<any>(this.apiUrl, { key, value });
    }
}
