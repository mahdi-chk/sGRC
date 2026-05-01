import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuditingService,
  AuditChecklistTemplate,
  AuditMission,
  AuditMissionChecklistItem,
  AuditRecordType
} from '../../../core/services/auditing.service';
import { getAuditManagementNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-audit-checklists',
  templateUrl: './audit-checklists.component.html',
  styleUrls: ['./audit-checklists.component.scss']
})
export class AuditChecklistsComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  templates: AuditChecklistTemplate[] = [];
  missions: AuditMission[] = [];
  missionChecklistItems: AuditMissionChecklistItem[] = [];
  selectedMission: AuditMission | null = null;
  isLoading = false;
  isSaving = false;
  selectedMissionId: number | null = null;
  selectedTemplateId: number | null = null;
  editingTemplateId: number | null = null;
  feedback = '';
  error = '';

  newTemplate = {
    titre: '',
    description: '',
    itemsText: ''
  };

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) {}

  get navItems() {
    return getAuditManagementNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadTemplates();
    this.loadMissions();
  }

  loadTemplates(): void {
    this.isLoading = true;
    this.auditingService.getChecklistTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
        if (!this.selectedTemplateId && templates.length > 0) {
          this.selectedTemplateId = templates[0].id;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.templates = [];
        this.isLoading = false;
        this.error = 'Impossible de charger les checklists.';
      }
    });
  }

  loadMissions(): void {
    this.auditingService.getMissions('all').subscribe({
      next: (missions) => {
        this.missions = missions;
        if (!this.selectedMissionId && missions.length > 0) {
          this.selectedMissionId = missions[0].id;
        }
        if (this.selectedMissionId) {
          this.selectMission(this.selectedMissionId);
        }
      },
      error: (err) => {
        console.error(err);
        this.missions = [];
      }
    });
  }

  saveNewTemplate(): void {
    const items = this.newTemplate.itemsText
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter((item) => !!item);

    if (!this.newTemplate.titre.trim() || items.length === 0) {
      this.error = 'Le titre et au moins un item de checklist sont obligatoires.';
      return;
    }

    this.isSaving = true;
    const payload = {
      titre: this.newTemplate.titre.trim(),
      description: this.newTemplate.description.trim() || '',
      items
    };
    const request = this.editingTemplateId
      ? this.auditingService.updateChecklistTemplate(this.editingTemplateId, payload)
      : this.auditingService.createChecklistTemplate(payload);

    request.subscribe({
      next: (template) => {
        const wasEditing = this.editingTemplateId !== null;
        this.newTemplate = { titre: '', description: '', itemsText: '' };
        this.editingTemplateId = null;
        this.feedback = wasEditing ? 'Checklist modifiee avec succes.' : 'Checklist ajoutee avec succes.';
        this.error = '';
        this.isSaving = false;
        this.templates = wasEditing
          ? this.templates.map((entry) => entry.id === template.id ? template : entry)
          : [template, ...this.templates];
        this.selectedTemplateId = template.id;
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.message || 'Erreur lors de la creation de la checklist.';
      }
    });
  }

  editTemplate(template: AuditChecklistTemplate): void {
    this.editingTemplateId = template.id;
    this.newTemplate = {
      titre: template.titre || '',
      description: template.description || '',
      itemsText: (template.items || []).map((item) => item.texte).join('\n')
    };
  }

  cancelEdit(): void {
    this.editingTemplateId = null;
    this.newTemplate = {
      titre: '',
      description: '',
      itemsText: ''
    };
  }

  assignTemplate(): void {
    if (!this.selectedMissionId || !this.selectedTemplateId) {
      this.error = 'Veuillez selectionner une mission et une checklist.';
      return;
    }

    this.isSaving = true;
    this.auditingService.assignTemplateToMission(this.selectedMissionId, this.selectedTemplateId).subscribe({
      next: () => {
        this.feedback = 'Checklist affectee a la mission.';
        this.error = '';
        this.isSaving = false;
        this.selectMission(this.selectedMissionId!);
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.error = err?.error?.message || 'Erreur lors de l affectation.';
      }
    });
  }

  selectMission(missionId: number): void {
    this.selectedMissionId = missionId;
    this.selectedMission = this.missions.find((mission) => mission.id === missionId) || null;
    if (!this.selectedMission) {
      this.missionChecklistItems = [];
      return;
    }

    this.isLoading = true;
    this.auditingService.getMissionChecklistItems(missionId).subscribe({
      next: (items) => {
        this.missionChecklistItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.missionChecklistItems = [];
        this.isLoading = false;
      }
    });
  }

  get selectedTemplate(): AuditChecklistTemplate | null {
    return this.templates.find((template) => template.id === this.selectedTemplateId) || null;
  }

  get assignedTemplate(): AuditChecklistTemplate | null {
    if (!this.selectedMission?.checklistTemplateId) {
      return null;
    }

    return this.templates.find((template) => template.id === this.selectedMission?.checklistTemplateId) || null;
  }

  get completedItems(): number {
    return this.missionChecklistItems.filter((item) => item.estFait).length;
  }

  get progressPercent(): number {
    if (!this.missionChecklistItems.length) {
      return 0;
    }

    return Math.round((this.completedItems / this.missionChecklistItems.length) * 100);
  }

  deleteTemplate(template: AuditChecklistTemplate): void {
    if (!window.confirm(`Supprimer la checklist ${template.titre} ?`)) {
      return;
    }

    this.auditingService.deleteChecklistTemplate(template.id).subscribe({
      next: () => {
        this.templates = this.templates.filter((entry) => entry.id !== template.id);
        if (this.selectedTemplateId === template.id) {
          this.selectedTemplateId = this.templates[0]?.id || null;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Erreur lors de la suppression.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
