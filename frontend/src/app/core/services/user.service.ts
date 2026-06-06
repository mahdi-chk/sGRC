import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  poste?: string | null;
  roleId?: number;
  role?: string | null;
  roleCode?: string | null;
  departementId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getAssignableIncidentUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/assignable/incidents`);
  }

  getUserAuditSkills(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/audit-skills`);
  }

  updateUserAuditSkills(userId: number, skillIds: number[]): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${userId}/audit-skills`, { skillIds });
  }
}
