import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';

@Component({
  selector: 'app-incident-workflow',
  templateUrl: './incident-workflow.component.html',
  styleUrls: ['./incident-workflow.component.scss']
})
export class IncidentWorkflowComponent implements OnInit {
  currentUserRole = getStoredIncidentRole();
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  selectedIncident: Incident | null = null;
  showDetailsModal = false;
  isLoading = false;
  searchTerm = '';
  statusFilter = '';

  IncidentStatus = IncidentStatus;
  IncidentNiveauRisque = IncidentNiveauRisque;

  statusLabelMap: Record<string, string> = {
    [IncidentStatus.NOUVEAU]: 'Nouveau',
    [IncidentStatus.EN_COURS]: 'En cours',
    [IncidentStatus.TRAITE]: 'Traite',
    [IncidentStatus.CLOS]: 'Clos'
  };

  levelLabelMap: Record<string, string> = {
    [IncidentNiveauRisque.LOW]: 'Faible',
    [IncidentNiveauRisque.LIMITED]: 'Limite',
    [IncidentNiveauRisque.MEDIUM]: 'Moyen',
    [IncidentNiveauRisque.SIGNIFICANT]: 'Significatif',
    [IncidentNiveauRisque.HIGH]: 'Eleve',
    [IncidentNiveauRisque.CRITICAL]: 'Critique'
  };

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  get navItems() {
    return getIncidentNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = data.map(incident => this.mapIncidentCodes(incident));
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
      const matchSearch = !this.searchTerm
        || i.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
        || i.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const incidentStatut = this.getIncidentStatus(i);
      const filterStatut = this.normalizeStatus(this.statusFilter);
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
        const updated = this.mapIncidentCodes(res);
        const idx = this.incidents.findIndex(i => i.id === updated.id);
        if (idx !== -1) {
          this.incidents[idx] = updated;
        }
        this.applyFilters();
        alert(`Statut mis a jour : ${this.statusLabelMap[newStatus] || newStatus}`);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise a jour du statut.');
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

  getStatusClass(incident: Incident): string {
    switch (this.getIncidentStatus(incident)) {
      case IncidentStatus.NOUVEAU: return 'status-new';
      case IncidentStatus.EN_COURS: return 'status-progress';
      case IncidentStatus.TRAITE: return 'status-resolved';
      case IncidentStatus.CLOS: return 'status-closed';
      default: return '';
    }
  }

  getIncidentStatus(incident: Incident): string {
    return this.normalizeStatus((incident as any)?.statutCode || incident?.statut);
  }

  getIncidentStatusLabel(incident: Incident): string {
    const normalized = this.getIncidentStatus(incident);
    return incident.statutLabel || this.statusLabelMap[normalized] || incident.statut || '-';
  }

  getImpactClass(incident: Incident): string {
    const level = this.normalizeLevel((incident as any)?.niveauRisqueCode || incident?.niveauRisque);
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

  private mapIncidentCodes(incident: Incident): Incident {
    return {
      ...incident,
      statut: this.normalizeStatus((incident as any)?.statutCode || incident?.statut) as IncidentStatus,
      niveauRisque: this.normalizeLevel((incident as any)?.niveauRisqueCode || incident?.niveauRisque) as IncidentNiveauRisque
    };
  }

  private normalizeStatus(value?: string | null): string {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }

  private normalizeLevel(value?: string | null): string {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s-]+/g, '_');
  }
}
