/**
 * @file auth.guard.ts
 * @description Garde de navigation pour protéger les routes nécessitant une authentification.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Détermine si une route peut être activée.
     * @returns true si l'utilisateur est connecté, sinon redirige vers /login et retourne false.
     */
    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // Redirection vers la page de connexion si non authentifié
        this.router.navigate(['/login']);
        return false;
    }
}
