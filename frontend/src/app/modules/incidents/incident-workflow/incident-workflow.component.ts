import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-workflow',
  templateUrl: './incident-workflow.component.html',
  styleUrls: ['./incident-workflow.component.scss']
})
export class IncidentWorkflowComponent implements OnInit {
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  selectedIncident: Incident | null = null;
  showDetailsModal = false;
  isLoading = false;
  searchTerm = '';
  statusFilter = '';

  // Expose Enums
  IncidentStatus = IncidentStatus;
  IncidentNiveauRisque = IncidentNiveauRisque;

  // Label mappings
  statusLabelMap: Record<string, string> = {
    [IncidentStatus.NOUVEAU]: 'Nouveau',
    [IncidentStatus.EN_COURS]: 'En cours',
    [IncidentStatus.TRAITE]: 'Traité',
    [IncidentStatus.CLOS]: 'Clos'
  };

  levelLabelMap: Record<string, string> = {
    [IncidentNiveauRisque.LOW]: 'Faible',
    [IncidentNiveauRisque.LIMITED]: 'Limité',
    [IncidentNiveauRisque.MEDIUM]: 'Moyen',
    [IncidentNiveauRisque.SIGNIFICANT]: 'Significatif',
    [IncidentNiveauRisque.HIGH]: 'Élevé',
    [IncidentNiveauRisque.CRITICAL]: 'Critique'
  };


  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.filteredIncidents = this.incidents.filter(i => {
      const matchSearch = !this.searchTerm || 
                          i.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          i.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const incidentStatut = ((i as any).statutCode || i.statut || '').toLowerCase();
      const filterStatut = (this.statusFilter || '').toLowerCase();
      const matchStatus = !filterStatut || incidentStatut === filterStatut;

      return matchSearch && matchStatus;
    });

  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.applyFilters();
  }


  updateStatus(incident: Incident, newStatus: IncidentStatus) {
    this.incidentService.updateIncident(incident.id, { statut: newStatus }).subscribe({
      next: (res) => {
        const idx = this.incidents.findIndex(i => i.id === res.id);
        if (idx !== -1) this.incidents[idx] = res;
        this.applyFilters();
        alert(`Statut mis à jour : ${newStatus}`);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour du statut.');
      }
    });
  }

  openDetailsModal(incident: Incident) {
    this.selectedIncident = incident;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedIncident = null;
  }

  getStatusClass(incident: any): string {
    const status = incident?.statutCode || incident?.statut;
    switch (status) {
      case IncidentStatus.NOUVEAU: return 'status-new';
      case IncidentStatus.EN_COURS: return 'status-progress';
      case IncidentStatus.TRAITE: return 'status-resolved';
      case IncidentStatus.CLOS: return 'status-closed';
      default: return '';
    }
  }

  getImpactClass(incident: any): string {
    const level = incident?.niveauRisqueCode || incident?.niveauRisque;
    if (!level) return '';
    switch (level) {
      case IncidentNiveauRisque.CRITICAL: return 'impact-critical';
      case IncidentNiveauRisque.SIGNIFICANT:
      case IncidentNiveauRisque.HIGH: return 'impact-high';
      case IncidentNiveauRisque.MEDIUM: return 'impact-medium';
      case IncidentNiveauRisque.LOW:
      case IncidentNiveauRisque.LIMITED: return 'impact-low';
      default: return '';
    }
  }


  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
