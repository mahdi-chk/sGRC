/**
 * @file auth.guard.ts
 * @description Garde de navigation pour protéger les routes nécessitant une authentification.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
export class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /**
     * Détermine si une route peut être activée.
     */
    canActivate(route) {
        // 1. Vérification de l'authentification
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        // 2. Vérification des rôles (RBAC)
        const expectedRoles = route.data['expectedRoles'];
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
    canActivateChild(childRoute) {
        return this.canActivate(childRoute);
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router)); };
AuthGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AuthService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auth.guard.js.map