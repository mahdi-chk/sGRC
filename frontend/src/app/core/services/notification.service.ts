import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Notification } from '../models/notification.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = `${environment.apiUrl}/notifications`;
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();
    private unreadCountSubject = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadCountSubject.asObservable();

    private pollingSubscription: any;

    constructor(private http: HttpClient, private authService: AuthService) {
        // Start polling only when authenticated
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.startPolling();
            } else {
                this.stopPolling();
            }
        });
    }

    private startPolling() {
        this.stopPolling(); // Ensure no duplicate timers
        this.pollingSubscription = timer(0, 30000).pipe( // Changed to 30s to be more reasonable
            switchMap(() => this.getNotifications().pipe(
                catchError(err => {
                    if (err.status !== 401) {
                        console.error('Error fetching notifications:', err);
                    }
                    return of([]);
                })
            ))
        ).subscribe(notifications => {
            if (notifications) {
                this.notificationsSubject.next(notifications);
                this.unreadCountSubject.next(notifications.filter(n => !n.isRead).length);
            }
        });
    }

    private stopPolling() {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
            this.pollingSubscription = null;
        }
    }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(this.apiUrl);
    }

    markAsRead(id: number): Observable<Notification> {
        return this.http.put<Notification>(`${this.apiUrl}/${id}/read`, {}).pipe(
            tap(() => this.refresh())
        );
    }

    markAllAsRead(): Observable<any> {
        return this.http.put(`${this.apiUrl}/read-all`, {}).pipe(
            tap(() => this.refresh())
        );
    }

    markManyAsRead(ids: number[]): Observable<any> {
        return this.http.put(`${this.apiUrl}/read-selected`, { ids }).pipe(
            tap(() => this.refresh())
        );
    }

    private refresh() {
        this.getNotifications().subscribe(notifications => {
            this.notificationsSubject.next(notifications);
            this.unreadCountSubject.next(notifications.filter(n => !n.isRead).length);
        });
    }
}
