import { Component, OnInit } from '@angular/core';
import { IncidentService, Incident, IncidentStatus, IncidentNiveauRisque } from '../../../core/services/incident.service';
import { UserService, User } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-incident-workflow',
  templateUrl: './incident-workflow.component.html',
  styleUrls: ['./incident-workflow.component.scss']
})
export class IncidentWorkflowComponent implements OnInit {
  currentUserRole = getStoredIncidentRole();
  incidents: Incident[] = [];
  users: User[] = [];
  filteredIncidents: Incident[] = [];
  selectedIncident: Incident | null = null;
  showDetailsModal = false;
  isLoading = false;
  searchTerm = '';
  statusFilter = '';
  onlyToProcess = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  environment = environment;
  IncidentStatus = IncidentStatus;
  IncidentNiveauRisque = IncidentNiveauRisque;

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
    private userService: UserService,
    private router: Router
  ) {}

  get navItems() {
    return getIncidentNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadIncidents();
    this.loadUsers();
  }

  loadIncidents() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        try {
          this.incidents = (data || []).map(incident => this.mapIncidentCodes(incident));
          this.applyFilters();
        } catch (err) {
          console.error('Erreur lors du mapping des incidents:', err);
        } finally {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erreur chargement incidents:', err);
        this.isLoading = false;
      }
    });
  }

  loadUsers() {
    this.userService.getAssignableIncidentUsers().subscribe(users => this.users = users);
  }

  applyFilters() {
    const search = (this.searchTerm || '').toLowerCase();
    
    this.filteredIncidents = this.incidents.filter(i => {
      // 1. Recherche
      const matchSearch = !search
        || (i.titre && i.titre.toLowerCase().includes(search))
        || (i.description && i.description.toLowerCase().includes(search));

      // 2. Filtre statut spécifique (Dropdown)
      const incidentStatut = this.getIncidentStatus(i);
      const filterStatut = this.normalizeStatus(this.statusFilter);
      const matchStatus = !filterStatut || incidentStatut === filterStatut;

      // 3. Filtre "À traiter" (Bouton rapide)
      const isToProcess = incidentStatut === IncidentStatus.NOUVEAU || incidentStatut === IncidentStatus.EN_COURS;
      const matchToProcess = !this.onlyToProcess || isToProcess;

      return matchSearch && matchStatus && matchToProcess;
    });
    
    this.currentPage = 1;
  }

  onFilterChange() {
    this.applyFilters();
  }

  toggleToProcess() {
    this.onlyToProcess = !this.onlyToProcess;
    if (this.onlyToProcess) {
      this.statusFilter = ''; // On réinitialise le filtre par statut spécifique quand on active "À traiter" pour éviter les conflits
    }
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.onlyToProcess = false;
    this.applyFilters();
  }

  get paginatedIncidents(): Incident[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIncidents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
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
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour du statut.');
      }
    });
  }

  assignUser(incident: Incident, userId: number | string) {
    const id = userId === 'null' ? null : Number(userId);
    this.incidentService.updateIncident(incident.id, { assigneeId: id }).subscribe({
      next: (res) => {
        const updated = this.mapIncidentCodes(res);
        const idx = this.incidents.findIndex(i => i.id === updated.id);
        if (idx !== -1) {
          this.incidents[idx] = updated;
        }
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'assignation.');
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
    const status = this.getIncidentStatus(incident);
    switch (status) {
        case IncidentStatus.NOUVEAU: return 'bg-blue-100 text-blue-800';
        case IncidentStatus.EN_COURS: return 'bg-yellow-100 text-yellow-800';
        case IncidentStatus.TRAITE: return 'bg-green-100 text-green-800';
        case IncidentStatus.CLOS: return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
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
    if (!level) return 'bg-gray-100 text-gray-800';

    switch (level) {
      case IncidentNiveauRisque.CRITICAL: return 'badge-danger';
      case IncidentNiveauRisque.SIGNIFICANT:
      case IncidentNiveauRisque.HIGH: return 'badge-warning';
      case IncidentNiveauRisque.MEDIUM: return 'badge-info';
      case IncidentNiveauRisque.LOW:
      case IncidentNiveauRisque.LIMITED: return 'badge-success';
      default: return 'bg-gray-100 text-gray-800';
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
