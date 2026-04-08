import { Component, OnInit } from '@angular/core';
import {
  AuditingService,
  AuditMission,
  AuditMissionActionPlanItem,
  AuditMissionStatus
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
  missions: AuditMission[] = [];
  selectedMission: AuditMission | null = null;
  actionPlanItems: AuditMissionActionPlanItem[] = [];
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
    this.loadMissions();
  }

  loadMissions(): void {
    this.isLoading = true;
    const userStr = sessionStorage.getItem('sgrc_user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const currentUser = JSON.parse(userStr);
    const userId = Number(currentUser.id);
    this.currentUserRole = currentUser.role || null;

    this.auditingService.getMissions().subscribe({
      next: (data) => {
        this.missions = data.filter((mission) =>
          this.isSuperAdmin || (Number(mission.auditeurId) === userId && mission.statut !== AuditMissionStatus.ANNULE)
        );
        this.isLoading = false;
        if (this.missions.length > 0) {
          this.selectMission(this.missions[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  selectMission(mission: AuditMission): void {
    this.selectedMission = mission;
    this.isLoading = true;
    this.auditingService.getMissionActionPlanItems(mission.id).subscribe({
      next: (items) => {
        this.actionPlanItems = items.map((item) => ({
          ...item,
          echeance: item.echeance ? new Date(item.echeance).toISOString().slice(0, 10) : null
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors du chargement du plan d actions.');
      }
    });
  }

  saveItem(item: AuditMissionActionPlanItem): void {
    if (!this.selectedMission) {
      return;
    }

    this.auditingService.updateMissionActionPlanItem(this.selectedMission.id, item.id, {
      ordre: item.ordre,
      regleDnssi: item.regleDnssi,
      recommandations: item.recommandations,
      horizon: item.horizon,
      priorite: item.priorite,
      responsableId: item.responsableId,
      responsableNom: item.responsableNom,
      echeance: item.echeance,
      etatAvancement: item.etatAvancement
    }).subscribe({
      next: (updatedItem) => {
        Object.assign(item, {
          ...updatedItem,
          echeance: updatedItem.echeance ? new Date(updatedItem.echeance).toISOString().slice(0, 10) : null
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
