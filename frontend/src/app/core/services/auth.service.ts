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
import { environment } from '../../../environments/environment';
import { NgZone } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserRole } from '../models/user-role.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    // Sujet pour suivre l'utilisateur actuellement connecté de manière réactive
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    // Gestion de l'activité
    private lastActivityTimestamp: number = Date.now();
    private readonly INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
    private checkInterval: any;
    private longRunningTaskCount = 0;

    constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
        // Restauration de la session depuis le sessionStorage au démarrage
        const savedUser = sessionStorage.getItem('sgrc_user');
        const savedToken = sessionStorage.getItem('sgrc_token');

        if (savedUser && savedToken) {
            try {
                if (this.isTokenExpired(savedToken)) {
                    this.clearSession();
                    return;
                }
                this.currentUserSubject.next(JSON.parse(savedUser));
                this.startActivityMonitoring();
            } catch (e) {
                console.error('Error parsing saved user, clearing session');
                this.logout();
            }
        } else if (savedUser || savedToken) {
            // État incohérent : on nettoie tout
            console.warn('Inconsistent session state detected, clearing sessionStorage');
            sessionStorage.removeItem('sgrc_user');
            sessionStorage.removeItem('sgrc_token');
        }
    }

    private clearSession() {
        if (this.checkInterval) clearInterval(this.checkInterval);
        this.longRunningTaskCount = 0;
        sessionStorage.removeItem('sgrc_token');
        sessionStorage.removeItem('sgrc_user');
        this.currentUserSubject.next(null);
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payloadPart = token.split('.')[1];
            if (!payloadPart) return true;

            const normalizedPayload = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(normalizedPayload));
            if (!decodedPayload.exp) return false;

            return decodedPayload.exp * 1000 <= Date.now();
        } catch (error) {
            console.warn('Unable to decode JWT from sessionStorage, clearing session');
            return true;
        }
    }

    /**
     * Démarre la surveillance de l'activité utilisateur.
     */
    private startActivityMonitoring() {
        this.resetActivity();

        // On sort du cycle Angular pour éviter de déclencher la détection de changement sur chaque mouvement de souris
        this.ngZone.runOutsideAngular(() => {
            // Événements globaux pour détecter l'activité
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'popstate'];
            events.forEach(event => {
                window.addEventListener(event, () => this.resetActivity());
            });

            // Vérification périodique toutes les minutes
            if (this.checkInterval) clearInterval(this.checkInterval);
            this.checkInterval = setInterval(() => {
                this.ngZone.run(() => {
                    this.checkSessionStatus();
                });
            }, 60 * 1000);
        });
    }

    /**
     * Réinitialise le timestamp de dernière activité.
     */
    public resetActivity() {
        this.lastActivityTimestamp = Date.now();
    }

    beginLongRunningTask() {
        this.longRunningTaskCount += 1;
        this.resetActivity();
    }

    endLongRunningTask() {
        this.longRunningTaskCount = Math.max(0, this.longRunningTaskCount - 1);
        this.resetActivity();
    }

    /**
     * Vérifie si la session est toujours valide en fonction de l'activité.
     */
    private checkSessionStatus() {
        if (!this.isLoggedIn()) return;

        const now = Date.now();
        const elapsed = now - this.lastActivityTimestamp;

        if (this.longRunningTaskCount > 0) {
            this.lastActivityTimestamp = now;
            this.refreshToken().pipe(
                catchError(err => {
                    if (err.status === 401 || err.status === 403) {
                        this.logout();
                    }
                    return of(null);
                })
            ).subscribe();
            return;
        }

        if (elapsed >= this.INACTIVITY_LIMIT) {
            console.log('Session expirée pour inactivité (elapsed: ' + Math.round(elapsed / 1000) + 's)');
            this.logout();
        } else {
            // On tente le refresh
            this.refreshToken().pipe(
                catchError(err => {
                    if (err.status === 401 || err.status === 403) {
                        this.logout();
                    }
                    return of(null);
                })
            ).subscribe();
        }
    }

    /**
     * Rafraîchit le token JWT auprès du backend.
     */
    refreshToken(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/refresh`).pipe(
            tap((res: any) => {
                sessionStorage.setItem('sgrc_token', res.token);
            })
        );
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
                this.startActivityMonitoring();
            })
        );
    }

    /**
     * Déconnexion : supprime les données de session et redirige vers le login.
     */
    logout() {
        if (this.checkInterval) clearInterval(this.checkInterval);
        this.longRunningTaskCount = 0;
        sessionStorage.removeItem('sgrc_token');
        sessionStorage.removeItem('sgrc_user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Vérifie si un token est présent en session.
     */
    isLoggedIn(): boolean {
        const token = sessionStorage.getItem('sgrc_token');
        if (!token) return false;

        if (this.isTokenExpired(token)) {
            this.clearSession();
            return false;
        }

        return true;
    }

    /**
     * Récupère le token JWT pour l'intercepteur HTTP.
     */
    getToken(): string | null {
        const token = sessionStorage.getItem('sgrc_token');
        if (!token) return null;

        if (this.isTokenExpired(token)) {
            this.clearSession();
            return null;
        }

        return token;
    }

    /**
     * Récupère le rôle de l'utilisateur actuel.
     */
    getUserRole(): UserRole | null {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    /**
     * Récupère les informations de l'utilisateur actuel.
     */
    getCurrentUser(): any {
        const userJson = sessionStorage.getItem('sgrc_user');
        return userJson ? JSON.parse(userJson) : null;
    }
}
