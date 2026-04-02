import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth.service";
export class NotificationService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = `${environment.apiUrl}/notifications`;
        this.notificationsSubject = new BehaviorSubject([]);
        this.notifications$ = this.notificationsSubject.asObservable();
        this.unreadCountSubject = new BehaviorSubject(0);
        this.unreadCount$ = this.unreadCountSubject.asObservable();
        // Start polling only when authenticated
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.startPolling();
            }
            else {
                this.stopPolling();
            }
        });
    }
    startPolling() {
        this.stopPolling(); // Ensure no duplicate timers
        this.pollingSubscription = timer(0, 30000).pipe(// Changed to 30s to be more reasonable
        switchMap(() => this.getNotifications().pipe(catchError(err => {
            if (err.status !== 401) {
                console.error('Error fetching notifications:', err);
            }
            return of([]);
        })))).subscribe(notifications => {
            if (notifications) {
                this.notificationsSubject.next(notifications);
                this.unreadCountSubject.next(notifications.filter(n => !n.isRead).length);
            }
        });
    }
    stopPolling() {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
            this.pollingSubscription = null;
        }
    }
    getNotifications() {
        return this.http.get(this.apiUrl);
    }
    markAsRead(id) {
        return this.http.put(`${this.apiUrl}/${id}/read`, {}).pipe(tap(() => this.refresh()));
    }
    markAllAsRead() {
        return this.http.put(`${this.apiUrl}/read-all`, {}).pipe(tap(() => this.refresh()));
    }
    markManyAsRead(ids) {
        return this.http.put(`${this.apiUrl}/read-selected`, { ids }).pipe(tap(() => this.refresh()));
    }
    refresh() {
        this.getNotifications().subscribe(notifications => {
            this.notificationsSubject.next(notifications);
            this.unreadCountSubject.next(notifications.filter(n => !n.isRead).length);
        });
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
NotificationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=notification.service.js.map