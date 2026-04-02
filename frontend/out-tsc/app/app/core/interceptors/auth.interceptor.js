/**
 * @file auth.interceptor.ts
 * @description Intercepteur HTTP pour injecter automatiquement le token JWT
 * dans les en-têtes de chaque requête sortante.
 */
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class AuthInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * Intercepte les requêtes HTTP pour ajouter le header Authorization.
     */
    intercept(req, next) {
        const token = this.authService.getToken();
        if (token) {
            // Clonage de la requête pour ajouter le token de manière immuable
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(authReq);
        }
        // Si pas de token, on laisse passer la requête originale
        return next.handle(req);
    }
}
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(i0.ɵɵinject(i1.AuthService)); };
AuthInterceptor.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthInterceptor, [{
        type: Injectable
    }], function () { return [{ type: i1.AuthService }]; }, null); })();
//# sourceMappingURL=auth.interceptor.js.map