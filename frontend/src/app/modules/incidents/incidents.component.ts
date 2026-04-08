import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService, Incident, IncidentImportDraft, IncidentStatus, IncidentNiveauRisque } from '../../core/services/incident.service';

import { Department, DepartmentService } from '../../core/services/department.service';
import { RiskService, Risk } from '../../core/services/risk.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { UserRole } from '../../core/models/user-role.enum';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
    incidents: Incident[] = [];
    departments: Department[] = [];
    risks: Risk[] = [];
    filteredIncidents: Incident[] = [];
    environment = environment;


    // Filter properties
    filterSearch = '';
    filterStatus = '';
    filterLevel = '';

    // Pagination
    currentPage = 1;
    itemsPerPage = 10;


    // Modals state
    showCreateModal = false;
    showDetailsModal = false;
    showEditModal = false;

    // Forms & Loaders
    incidentForm: FormGroup;
    selectedFile: File | null = null;
    isSubmitting = false;
    isImporting = false;
    importMessage = '';
    importWarnings: string[] = [];
    importPreview = '';

    // Selected state
    selectedIncident: Incident | null = null;

    // Expose Enums to templates
    IncidentStatus = IncidentStatus;
    IncidentNiveauRisque = IncidentNiveauRisque;

    // Label mappings for UI 
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
        private fb: FormBuilder,
        private incidentService: IncidentService,
        private departmentService: DepartmentService,
        private riskService: RiskService,
        private authService: AuthService,
        private location: Location
    ) {
        this.incidentForm = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            domaine: ['', []],
            niveauRisque: [''],
            departementId: [null, []],
            dateSurvenance: ['', Validators.required],
            statut: [IncidentStatus.NOUVEAU, Validators.required],
            riskId: [null]
        });
    }

    get authQueryToken(): string {
        const token = this.authService.getToken();
        return token ? `?token=${token}` : '';
    }

    get currentUserRole(): UserRole | null {
        return this.authService.getUserRole();
    }

    get isReadOnlyRole(): boolean {
        return this.currentUserRole === UserRole.TOP_MANAGEMENT;
    }

    ngOnInit(): void {
        this.loadIncidents();
        this.loadDepartments();
        this.loadRisks();
    }

    loadIncidents() {
        this.incidentService.getIncidents().subscribe({
            next: (data) => {
                this.incidents = data;
                this.applyFilters();
            },
            error: (err) => console.error('Erreur chargement incidents:', err)
        });
    }

    applyFilters() {
        this.filteredIncidents = this.incidents.filter(incident => {
            const matchSearch = !this.filterSearch || 
                incident.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) || 
                incident.description.toLowerCase().includes(this.filterSearch.toLowerCase());
            
            const incidentStatut = ((incident as any).statutCode || incident.statut || '').toLowerCase();
            const filterStatut = (this.filterStatus || '').toLowerCase();
            const matchStatus = !filterStatut || incidentStatut === filterStatut;
            
            const incidentLevel = ((incident as any).niveauRisqueCode || incident.niveauRisque || '').toLowerCase();
            const filterLevel = (this.filterLevel || '').toLowerCase();
            const matchLevel = !filterLevel || incidentLevel === filterLevel;

            return matchSearch && matchStatus && matchLevel;
        });
        this.currentPage = 1;
    }

    get paginatedIncidents(): Incident[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredIncidents.slice(startIndex, startIndex + this.itemsPerPage);
    }

    onPageChanged(event: {page: number, pageSize: number}) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }

    onFilterChange() {
        this.applyFilters();
    }

    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.filterLevel = '';
        this.applyFilters();
    }


    loadDepartments() {
        this.departmentService.getAll().subscribe(d => this.departments = d);
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(r => this.risks = r);
    }

    goBack() {
        this.location.back();
    }

    openCreateModal() {
        if (this.isReadOnlyRole) {
            return;
        }

        this.incidentForm.reset({ statut: IncidentStatus.NOUVEAU });
        this.selectedFile = null;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';
        this.showCreateModal = true;
    }

    openDetailsModal(incident: Incident) {
        this.selectedIncident = incident;
        this.showDetailsModal = true;
    }

    onFileSelected(event: any) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
        }
    }

    onImportFileSelected(event: any) {
        const file = event?.target?.files?.[0] as File | undefined;
        if (!file) {
            return;
        }

        this.isImporting = true;
        this.importMessage = '';
        this.importWarnings = [];
        this.importPreview = '';

        this.incidentService.importIncidentDraft(file).subscribe({
            next: (draft) => {
                this.applyImportedDraft(draft);
                this.selectedFile = file;
                this.isImporting = false;
                this.importWarnings = draft.warnings || [];
                this.importPreview = draft.extractedTextPreview || '';
                this.importMessage = this.buildImportMessage(draft);
            },
            error: (err) => {
                console.error(err);
                this.isImporting = false;
                this.importMessage = err?.error?.message || 'Import impossible pour ce fichier.';
            }
        });

        event.target.value = '';
    }

    private applyImportedDraft(draft: IncidentImportDraft) {
        const patch: Record<string, any> = {};

        if (draft.titre) patch['titre'] = draft.titre;
        if (draft.description) patch['description'] = draft.description;
        if (draft.domaine) patch['domaine'] = draft.domaine;
        if (draft.niveauRisque) patch['niveauRisque'] = this.normalizeLevel(draft.niveauRisque);
        if (draft.departementId !== undefined && draft.departementId !== null) patch['departementId'] = draft.departementId;
        if (draft.dateSurvenance) patch['dateSurvenance'] = draft.dateSurvenance;

        this.incidentForm.patchValue(patch);
    }

    private buildImportMessage(draft: IncidentImportDraft): string {
        if (draft.sourceType === 'image-scan') {
            return draft.importReliability === 'low'
                ? 'Scan manuscrit analyse. Les champs peu fiables ont ete laisses vides pour verification.'
                : 'Scan manuscrit analyse et formulaire prerempli avec les champs reconnus.';
        }

        if (draft.importReliability === 'low') {
            return 'Document analyse avec prudence. Verifiez les champs proposes avant validation.';
        }

        return draft.departementId
            ? 'Le formulaire a ete prerempli a partir du document importe.'
            : `Le formulaire a ete prerempli. Departement a confirmer${draft.departementNom ? `: ${draft.departementNom}` : ''}.`;
    }

    private normalizeLevel(level?: string | null): string {
        if (!level) return '';
        const normalized = level.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (normalized.includes('critique')) return IncidentNiveauRisque.CRITICAL;
        if (normalized.includes('significatif')) return IncidentNiveauRisque.SIGNIFICANT;
        if (normalized.includes('eleve')) return IncidentNiveauRisque.HIGH;
        if (normalized.includes('moyen')) return IncidentNiveauRisque.MEDIUM;
        if (normalized.includes('limit')) return IncidentNiveauRisque.LIMITED;
        if (normalized.includes('faible')) return IncidentNiveauRisque.LOW;
        return level;
    }


    submitIncident() {
        if (this.isReadOnlyRole || this.incidentForm.invalid) return;

        this.isSubmitting = true;
        const formData = new FormData();
        const rawValues = this.incidentForm.getRawValue();

        Object.keys(rawValues).forEach(key => {
            if (rawValues[key] !== null && rawValues[key] !== undefined) {
                formData.append(key, rawValues[key]);
            }
        });

        if (this.selectedFile) {
            formData.append('pieceJointe', this.selectedFile);
        }

        this.incidentService.createIncident(formData).subscribe({
            next: (res) => {
                this.incidents.unshift(res);
                this.isSubmitting = false;
                this.showCreateModal = false;
            },
            error: (err) => {
                console.error('Erreur création', err);
                this.isSubmitting = false;
            }
        });
    }

    openEditModal(incident: Incident) {
        if (this.isReadOnlyRole) {
            return;
        }

        this.selectedIncident = incident;
        const formattedDate = typeof incident.dateSurvenance === 'string' 
            ? incident.dateSurvenance.split('T')[0] 
            : new Date(incident.dateSurvenance).toISOString().split('T')[0];

        this.incidentForm.reset({
            titre: incident.titre,
            description: incident.description,
            domaine: incident.domaine || '',
            niveauRisque: this.normalizeLevel(incident.niveauRisque),
            departementId: incident.departementId || null,
            dateSurvenance: formattedDate,
            statut: incident.statut,
            riskId: incident.riskId || null
        });
        
        this.showEditModal = true;
    }

    updateIncident() {
        if (this.isReadOnlyRole || this.incidentForm.invalid || !this.selectedIncident) return;

        this.isSubmitting = true;
        const data = this.incidentForm.getRawValue();

        this.incidentService.updateIncident(this.selectedIncident.id, data).subscribe({
            next: (res) => {
                // Remplacer l'incident dans la liste
                const index = this.incidents.findIndex(i => i.id === res.id);
                if (index !== -1) {
                    this.incidents[index] = res;
                }
                this.isSubmitting = false;
                this.showEditModal = false;
            },
            error: (err) => {
                console.error('Erreur modification incident', err);
                this.isSubmitting = false;
            }
        });
    }

    getStatusClass(incident: any): string {
        const status = incident?.statutCode || incident?.statut;
        switch (status) {
            case IncidentStatus.NOUVEAU: return 'bg-blue-100 text-blue-800';
            case IncidentStatus.EN_COURS: return 'bg-yellow-100 text-yellow-800';
            case IncidentStatus.TRAITE: return 'bg-green-100 text-green-800';
            case IncidentStatus.CLOS: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getNiveauClass(incident: any): string {
        const niveau = incident?.niveauRisqueCode || incident?.niveauRisque;
        switch (niveau) {
            case IncidentNiveauRisque.CRITICAL: return 'badge-danger';
            case IncidentNiveauRisque.SIGNIFICANT:
            case IncidentNiveauRisque.HIGH: return 'badge-warning';
            case IncidentNiveauRisque.MEDIUM: return 'badge-info';
            case IncidentNiveauRisque.LOW:
            case IncidentNiveauRisque.LIMITED: return 'badge-success';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getRiskTitle(riskId: number | null): string {
        if (!riskId) return 'Non défini';
        const risk = this.risks.find(r => r.id === riskId);
        return risk ? risk.titre : `Risque #${riskId}`;
    }
}
