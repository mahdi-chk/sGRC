import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService, Incident, IncidentImportDraft, IncidentStatus } from '../../core/services/incident.service';
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
    environment = environment;

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
            next: (data) => this.incidents = data,
            error: (err) => console.error('Erreur chargement incidents:', err)
        });
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
        if (normalized.includes('critique')) return 'Critique';
        if (normalized.includes('significatif')) return 'Significatif';
        if (normalized.includes('eleve')) return 'Élevé';
        if (normalized.includes('moyen')) return 'Moyen';
        if (normalized.includes('limit')) return 'Limité';
        if (normalized.includes('faible')) return 'Faible';
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

    getStatusClass(status: string): string {
        switch (status) {
            case 'Nouveau': return 'bg-blue-100 text-blue-800';
            case 'En cours': return 'bg-yellow-100 text-yellow-800';
            case 'Traité': return 'bg-green-100 text-green-800';
            case 'Clos': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getNiveauClass(niveau?: string): string {
        switch (niveau) {
            case 'Critique': return 'badge-danger';
            case 'Significatif':
            case 'Élevé': return 'badge-warning';
            case 'Modéré':
            case 'Moyen': return 'badge-info';
            case 'Faible': return 'badge-success';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getRiskTitle(riskId: number | null): string {
        if (!riskId) return 'Non défini';
        const risk = this.risks.find(r => r.id === riskId);
        return risk ? risk.titre : `Risque #${riskId}`;
    }
}
