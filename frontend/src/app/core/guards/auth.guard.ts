/**
 * @file auth.guard.ts
 * @description Garde de navigation pour protéger les routes nécessitant une authentification.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user-role.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Détermine si une route peut être activée.
     */
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // 1. Vérification de l'authentification
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }

        // 2. Vérification des rôles (RBAC)
        const expectedRoles = route.data['expectedRoles'] as UserRole[];
        if (expectedRoles && expectedRoles.length > 0) {
            const userRole = this.authService.getUserRole();

            if (!userRole || !expectedRoles.includes(userRole)) {
                console.warn(`Accès refusé : rôle ${userRole} non autorisé pour cette route.`);
                this.router.navigate(['/dashboard']);
                return false;
            }
        }

        return true;
    }

    /**
     * Détermine si les sous-routes peuvent être activées.
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
        return this.canActivate(childRoute);
    }
}
