import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuditingService,
  AuditMission,
  AuditMissionActionPlanItem,
  AuditMissionActionPlanPayload
} from '../../../core/services/auditing.service';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-audit-checklists',
  templateUrl: './audit-checklists.component.html',
  styleUrls: ['./audit-checklists.component.scss']
})
export class AuditChecklistsComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  missions: AuditMission[] = [];
  selectedMissionId: number | null = null;
  planItems: AuditMissionActionPlanItem[] = [];
  isLoading = false;
  isSaving = false;
  importFile: File | null = null;
  feedback = '';
  error = '';

  newItem: AuditMissionActionPlanPayload = this.createEmptyItem();

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) {}

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  get selectedMission(): AuditMission | null {
    return this.missions.find((mission) => mission.id === this.selectedMissionId) || null;
  }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.isLoading = true;
    this.auditingService.getMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
        if (!this.selectedMissionId && missions.length > 0) {
          this.selectedMissionId = missions[0].id;
        }
        this.isLoading = false;
        this.loadPlan();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.error = 'Impossible de charger les missions.';
      }
    });
  }

  selectMission(missionId: number | null): void {
    this.selectedMissionId = missionId;
    this.feedback = '';
    this.error = '';
    this.loadPlan();
  }

  loadPlan(): void {
    if (!this.selectedMissionId) {
      this.planItems = [];
      return;
    }

    this.isLoading = true;
    this.auditingService.getMissionActionPlanItems(this.selectedMissionId).subscribe({
      next: (items) => {
        this.planItems = this.normalizeItems(items);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.planItems = [];
        this.isLoading = false;
        this.error = 'Impossible de charger le plan d actions.';
      }
    });
  }

  saveNewItem(): void {
    if (!this.selectedMissionId || !this.newItem.regleDnssi?.trim() || !this.newItem.recommandations?.trim()) {
      this.error = 'La règle DNSSI et les recommandations sont obligatoires.';
      return;
    }

    this.isSaving = true;
    this.auditingService.createMissionActionPlanItem(this.selectedMissionId, this.newItem).subscribe({
      next: () => {
        this.newItem = this.createEmptyItem();
        this.feedback = 'Ligne ajoutée au plan d actions.';
        this.error = '';
        this.isSaving = false;
        this.loadPlan();
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.message || 'Erreur lors de l ajout.';
      }
    });
  }

  saveRow(item: AuditMissionActionPlanItem): void {
    if (!this.selectedMissionId) {
      return;
    }

    this.isSaving = true;
    this.auditingService.updateMissionActionPlanItem(this.selectedMissionId, item.id, {
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
      next: (updated) => {
        Object.assign(item, this.normalizeItem(updated));
        this.feedback = 'Ligne mise à jour.';
        this.error = '';
        this.isSaving = false;
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.message || 'Erreur lors de la mise à jour.';
      }
    });
  }

  deleteRow(item: AuditMissionActionPlanItem): void {
    if (!this.selectedMissionId || !window.confirm(`Supprimer la ligne ${item.regleDnssi} ?`)) {
      return;
    }

    this.auditingService.deleteMissionActionPlanItem(this.selectedMissionId, item.id).subscribe({
      next: () => {
        this.planItems = this.planItems.filter((entry) => entry.id !== item.id);
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Erreur lors de la suppression.';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.importFile = input.files?.[0] || null;
  }

  importExcel(): void {
    if (!this.selectedMissionId || !this.importFile) {
      return;
    }

    this.isSaving = true;
    this.auditingService.importMissionActionPlan(this.selectedMissionId, this.importFile).subscribe({
      next: (items) => {
        this.planItems = this.normalizeItems(items);
        this.importFile = null;
        this.feedback = 'Import Excel terminé avec succès.';
        this.error = '';
        this.isSaving = false;
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.message || 'Erreur lors de l import Excel.';
      }
    });
  }

  createEmptyItem(): AuditMissionActionPlanPayload {
    return {
      ordre: 0,
      regleDnssi: '',
      recommandations: '',
      horizon: 'court_terme',
      priorite: 1,
      responsableNom: '',
      echeance: '',
      etatAvancement: 'nok'
    };
  }

  formatDate(value: string | null | undefined): string {
    return value ? new Date(value).toISOString().slice(0, 10) : '';
  }

  private normalizeItems(items: AuditMissionActionPlanItem[]): AuditMissionActionPlanItem[] {
    return items.map((item) => this.normalizeItem(item));
  }

  private normalizeItem(item: AuditMissionActionPlanItem): AuditMissionActionPlanItem {
    return {
      ...item,
      echeance: item.echeance ? new Date(item.echeance).toISOString().slice(0, 10) : null
    };
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
