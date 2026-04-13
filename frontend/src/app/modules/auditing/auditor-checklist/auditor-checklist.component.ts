import { Component, OnInit } from '@angular/core';
import {
  AuditingService,
  AuditMission
} from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-auditor-checklist',
  templateUrl: './auditor-checklist.component.html',
  styleUrls: ['./auditor-checklist.component.scss']
})
export class AuditorChecklistComponent implements OnInit {
  actionPlans: AuditMission[] = [];
  isLoading = false;
  currentUserRole: UserRole | null = getStoredAuditRole();

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) {}

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadActionPlans();
  }

  loadActionPlans(): void {
    this.isLoading = true;
    const userStr = sessionStorage.getItem('sgrc_user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const currentUser = JSON.parse(userStr);
    const userId = Number(currentUser.id);
    this.currentUserRole = currentUser.role || null;

    this.auditingService.getActionPlans().subscribe({
      next: (data) => {
        this.actionPlans = (this.isSuperAdmin ? data : data.filter((item) => Number(item.auditeurId) === userId))
          .map((item) => ({
            ...item,
            delai: item.delai ? new Date(item.delai).toISOString().slice(0, 10) : null
          }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  saveItem(item: AuditMission): void {
    this.auditingService.updateActionPlan(item.id, {
      code: item.code || null,
      titre: item.titre,
      ordre: item.ordre || 0,
      regleDnssi: item.regleDnssi || item.titre,
      recommandations: item.recommandations || item.objectifs || '',
      horizon: item.horizon,
      priorite: item.priorite,
      responsableId: item.auditeurId || null,
      responsableNom: item.responsabilites || '',
      echeance: item.delai ? String(item.delai) : null,
      etatAvancement: item.statut as string
    }).subscribe({
      next: (updatedItem) => {
        Object.assign(item, {
          ...updatedItem,
          delai: updatedItem.delai ? new Date(updatedItem.delai).toISOString().slice(0, 10) : null
        });
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get isSuperAdmin(): boolean {
    return this.currentUserRole === UserRole.SUPER_ADMIN;
  }
}
