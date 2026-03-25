import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus } from '../../../core/services/incident.service';
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
  statusFilter = 'All';

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
      const matchSearch = i.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          i.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'All' || i.statut === this.statusFilter;
      return matchSearch && matchStatus;
    });
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Nouveau': return 'status-new';
      case 'En cours': return 'status-progress';
      case 'Traité': return 'status-resolved';
      case 'Clos': return 'status-closed';
      default: return '';
    }
  }

  getImpactClass(level?: string): string {
    switch (level) {
      case 'Critique':
        return 'impact-critical';
      case 'Significatif':
      case 'Élevé':
        return 'impact-high';
      case 'Modéré':
      case 'Moyen':
        return 'impact-medium';
      case 'Faible':
        return 'impact-low';
      default:
        return '';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
