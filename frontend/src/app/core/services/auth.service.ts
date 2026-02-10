import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        const savedUser = localStorage.getItem('sgrc_user');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap((res: any) => {
                localStorage.setItem('sgrc_token', res.token);
                localStorage.setItem('sgrc_user', JSON.stringify(res.user));
                this.currentUserSubject.next(res.user);
            })
        );
    }

    logout() {
        localStorage.removeItem('sgrc_token');
        localStorage.removeItem('sgrc_user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('sgrc_token');
    }

    getToken(): string | null {
        return localStorage.getItem('sgrc_token');
    }
}
