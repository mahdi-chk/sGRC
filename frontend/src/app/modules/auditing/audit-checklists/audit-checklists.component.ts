import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditChecklistTemplate } from '../../../core/services/auditing.service';

@Component({
  selector: 'app-audit-checklists',
  templateUrl: './audit-checklists.component.html',
  styleUrls: ['./audit-checklists.component.scss']
})
export class AuditChecklistsComponent implements OnInit {
  templates: AuditChecklistTemplate[] = [];
  isLoading = false;

  showModal = false;
  newTemplate = {
    titre: '',
    description: '',
    items: ['']
  };

  constructor(private auditingService: AuditingService) {}

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.isLoading = true;
    this.auditingService.getChecklistTemplates().subscribe({
      next: (data) => {
        this.templates = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  openCreateModal() {
    this.newTemplate = { titre: '', description: '', items: [''] };
    this.showModal = true;
  }

  addItem() {
    this.newTemplate.items.push('');
  }

  removeItem(index: number) {
    if (this.newTemplate.items.length > 1) {
      this.newTemplate.items.splice(index, 1);
    }
  }

  // Permet le two-way binding avec *ngFor pour le tableau de chaînes
  trackByFn(index: any, item: any) {
    return index;
  }

  saveTemplate() {
    if (!this.newTemplate.titre) return;
    const validItems = this.newTemplate.items.filter(i => i.trim() !== '');
    if (validItems.length === 0) {
      alert('Veuillez ajouter au moins un élément à la checklist.');
      return;
    }

    this.isLoading = true;
    this.auditingService.createChecklistTemplate({
      titre: this.newTemplate.titre,
      description: this.newTemplate.description,
      items: validItems
    }).subscribe({
      next: () => {
        this.showModal = false;
        this.loadTemplates();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors de la création du modèle.');
      }
    });
  }

  deleteTemplate(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) return;
    this.isLoading = true;
    this.auditingService.deleteChecklistTemplate(id).subscribe({
      next: () => {
        this.loadTemplates();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors de la suppression.');
      }
    });
  }
}
