import { Component, OnInit } from '@angular/core';
import {
  AuditingService,
  AuditMission,
  AuditMissionChecklistItem,
  AuditRecordType
} from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { getAuditorNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-auditor-checklist',
  templateUrl: './auditor-checklist.component.html',
  styleUrls: ['./auditor-checklist.component.scss']
})
export class AuditorChecklistComponent implements OnInit {
  missions: AuditMission[] = [];
  checklistItems: AuditMissionChecklistItem[] = [];
  selectedMission: AuditMission | null = null;
  isLoading = false;
  currentUserRole: UserRole | null = getStoredAuditRole();

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) {}

  get navItems() {
    return getAuditorNavItems(this.currentUserRole);
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

    this.auditingService.getMissions('all').subscribe({
      next: (data) => {
        this.missions = (this.isSuperAdmin ? data : data.filter((item) => Number(item.auditeurId) === userId));
        if (this.missions.length > 0) {
          this.selectMission(this.missions[0]);
        } else {
          this.selectedMission = null;
          this.checklistItems = [];
          this.isLoading = false;
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
    this.auditingService.getMissionChecklistItems(mission.id).subscribe({
      next: (items) => {
        this.checklistItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.checklistItems = [];
        this.isLoading = false;
      }
    });
  }

  toggleItem(item: AuditMissionChecklistItem): void {
    if (!this.selectedMission) {
      return;
    }

    this.auditingService.toggleMissionChecklistItem(this.selectedMission.id, item.id, item.estFait).subscribe({
      next: (updatedItem) => {
        Object.assign(item, updatedItem);
      },
      error: (err) => {
        console.error(err);
        item.estFait = !item.estFait;
        alert('Erreur lors de la mise a jour.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get isSuperAdmin(): boolean {
    return this.currentUserRole === UserRole.SUPER_ADMIN;
  }

  get completedItems(): number {
    return this.checklistItems.filter((item) => item.estFait).length;
  }

  get progressPercent(): number {
    if (!this.checklistItems.length) {
      return 0;
    }

    return Math.round((this.completedItems / this.checklistItems.length) * 100);
  }
}
