/**
 * @file auth.service.ts
 * @description Service gérant l'authentification des utilisateurs, 
 * le stockage du token JWT et la gestion de la session.
 */

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

    // Sujet pour suivre l'utilisateur actuellement connecté de manière réactive
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        // Restauration de la session depuis le sessionStorage au démarrage
        const savedUser = sessionStorage.getItem('sgrc_user');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    /**
     * Authentifie l'utilisateur avec ses identifiants.
     * @param credentials Objet contenant email et password
     */
    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap((res: any) => {
                // Sauvegarde du token et des infos user en cas de succès
                sessionStorage.setItem('sgrc_token', res.token);
                sessionStorage.setItem('sgrc_user', JSON.stringify(res.user));
                this.currentUserSubject.next(res.user);
            })
        );
    }

    /**
     * Déconnexion : supprime les données de session et redirige vers le login.
     */
    logout() {
        sessionStorage.removeItem('sgrc_token');
        sessionStorage.removeItem('sgrc_user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Vérifie si un token est présent en session.
     */
    isLoggedIn(): boolean {
        return !!sessionStorage.getItem('sgrc_token');
    }

    /**
     * Récupère le token JWT pour l'intercepteur HTTP.
     */
    getToken(): string | null {
        return sessionStorage.getItem('sgrc_token');
    }
}
