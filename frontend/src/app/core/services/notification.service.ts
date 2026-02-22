import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://localhost:3000/api/notifications';
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();
    private unreadCountSubject = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadCountSubject.asObservable();

    constructor(private http: HttpClient) {
        // Start polling every 30 seconds
        timer(0, 5000).pipe(
            switchMap(() => this.getNotifications().pipe(
                catchError(err => {
                    console.error('Error fetching notifications:', err);
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

    private refresh() {
        this.getNotifications().subscribe(notifications => {
            this.notificationsSubject.next(notifications);
            this.unreadCountSubject.next(notifications.filter(n => !n.isRead).length);
        });
    }
}
