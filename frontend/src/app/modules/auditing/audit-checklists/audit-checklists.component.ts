import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuditingService,
  AuditMission,
  AuditMissionActionPlanPayload,
  AuditMissionHorizon,
  AuditMissionStatus
} from '../../../core/services/auditing.service';
import { Risk, RiskService } from '../../../core/services/risk.service';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-audit-checklists',
  templateUrl: './audit-checklists.component.html',
  styleUrls: ['./audit-checklists.component.scss']
})
export class AuditChecklistsComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  planItems: AuditMission[] = [];
  isLoading = false;
  isSaving = false;
  importFile: File | null = null;
  risks: Risk[] = [];
  selectedImportRiskId: number | null = null;
  feedback = '';
  error = '';

  newItem: AuditMissionActionPlanPayload = this.createEmptyItem();

  constructor(
    private auditingService: AuditingService,
    private riskService: RiskService,
    private router: Router
  ) {}

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadPlan();
    this.loadRisks();
  }

  loadPlan(): void {
    this.isLoading = true;
    this.auditingService.getActionPlans().subscribe({
      next: (items) => {
        this.planItems = items.map((item) => this.normalizeItem(item));
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.planItems = [];
        this.isLoading = false;
        this.error = 'Impossible de charger les plans d actions.';
      }
    });
  }

  loadRisks(): void {
    this.riskService.getRisks().subscribe({
      next: (risks) => {
        this.risks = risks;
        if (!this.selectedImportRiskId && risks.length > 0) {
          this.selectedImportRiskId = risks[0].id;
        }
        if (!this.newItem.riskId && risks.length > 0) {
          this.newItem.riskId = risks[0].id;
        }
      },
      error: (err) => {
        console.error(err);
        this.risks = [];
      }
    });
  }

  saveNewItem(): void {
    if (!this.newItem.regleDnssi?.trim() || !this.newItem.recommandations?.trim()) {
      this.error = 'La règle DNSSI et les recommandations sont obligatoires.';
      return;
    }

    if (!this.newItem.riskId) {
      this.error = 'Veuillez sÃ©lectionner un risque pour crÃ©er ce plan d actions.';
      return;
    }

    this.isSaving = true;
    this.auditingService.createActionPlan(this.newItem).subscribe({
      next: () => {
        this.newItem = this.createEmptyItem();
        this.feedback = 'Plan d actions ajouté avec succès.';
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

  saveRow(item: AuditMission): void {
    this.isSaving = true;
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
      riskId: item.riskId || null,
      etatAvancement: item.statut as string
    }).subscribe({
      next: (updated) => {
        Object.assign(item, this.normalizeItem(updated));
        this.feedback = 'Plan d actions mis à jour.';
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

  deleteRow(item: AuditMission): void {
    if (!window.confirm(`Supprimer le plan ${item.code || item.titre} ?`)) {
      return;
    }

    this.auditingService.deleteActionPlan(item.id).subscribe({
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
    if (!this.importFile) {
      return;
    }

    if (!this.selectedImportRiskId) {
      this.error = 'Veuillez sÃ©lectionner un risque avant l import.';
      return;
    }

    this.isSaving = true;
    this.auditingService.importActionPlans(this.importFile, this.selectedImportRiskId).subscribe({
      next: (items) => {
        this.planItems = items.map((item) => this.normalizeItem(item));
        this.importFile = null;
        this.feedback = 'Import Excel terminé avec succès.';
        this.error = '';
        this.isSaving = false;
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.error || err?.error?.message || 'Erreur lors de l import Excel.';
      }
    });
  }

  createEmptyItem(): AuditMissionActionPlanPayload {
    return {
      ordre: 0,
      regleDnssi: '',
      recommandations: '',
      horizon: AuditMissionHorizon.COURT_TERME,
      priorite: 1,
      responsableNom: '',
      riskId: null,
      echeance: '',
      etatAvancement: AuditMissionStatus.NOK
    };
  }

  private normalizeItem(item: AuditMission): AuditMission {
    return {
      ...item,
      delai: item.delai ? new Date(item.delai).toISOString().slice(0, 10) : null
    };
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
