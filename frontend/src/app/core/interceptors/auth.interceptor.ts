/**
 * @file auth.interceptor.ts
 * @description Intercepteur HTTP pour injecter automatiquement le token JWT 
 * dans les en-têtes de chaque requête sortante.
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    /**
     * Intercepte les requêtes HTTP pour ajouter le header Authorization.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
