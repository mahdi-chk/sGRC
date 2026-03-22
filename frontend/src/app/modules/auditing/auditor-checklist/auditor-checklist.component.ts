import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditor-checklist',
  templateUrl: './auditor-checklist.component.html',
  styleUrls: ['./auditor-checklist.component.scss']
})
export class AuditorChecklistComponent implements OnInit {
  missions: AuditMission[] = [];
  selectedMission: AuditMission | null = null;
  checklistItems: any[] = [];
  isLoading = false;

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    this.isLoading = true;
    const userStr = sessionStorage.getItem('sgrc_user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    const currentUser = JSON.parse(userStr);
    const userId = Number(currentUser.id);

    this.auditingService.getMissions().subscribe({
      next: (data) => {
        this.missions = data.filter(m => Number(m.auditeurId) === userId && m.statut !== 'Annulé');
        this.isLoading = false;
        // Auto-select first mission if available
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

  selectMission(mission: AuditMission) {
    this.selectedMission = mission;
    this.isLoading = true;
    this.auditingService.getMissionChecklistItems(mission.id).subscribe({
      next: (items) => {
        this.checklistItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors du chargement de la checklist.');
      }
    });
  }

  toggleChecklistItem(item: any, isFinished: boolean) {
    if (!this.selectedMission) return;
    this.auditingService.toggleMissionChecklistItem(this.selectedMission.id, item.id, isFinished).subscribe({
      next: (updatedItem) => {
        item.estFait = updatedItem.estFait;
      },
      error: (err) => {
        console.error(err);
        item.estFait = !isFinished;
        alert('Erreur lors de la mise à jour.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
