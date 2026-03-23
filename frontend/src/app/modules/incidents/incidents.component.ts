import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService, Incident, IncidentStatus } from '../../core/services/incident.service';
import { OrganigrammeService } from '../../core/services/organigramme.service';
import { RiskService, Risk } from '../../core/services/risk.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
    incidents: Incident[] = [];
    departments: any[] = [];
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

    // Selected state
    selectedIncident: Incident | null = null;

    constructor(
        private fb: FormBuilder,
        private incidentService: IncidentService,
        private organigrammeService: OrganigrammeService,
        private riskService: RiskService,
        private authService: AuthService,
        private location: Location
    ) {
        this.incidentForm = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            domaine: ['', []],
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
        this.organigrammeService.getAll().subscribe(d => this.departments = d);
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(r => this.risks = r);
    }

    goBack() {
        this.location.back();
    }

    openCreateModal() {
        this.incidentForm.reset({ statut: IncidentStatus.NOUVEAU });
        this.selectedFile = null;
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

    submitIncident() {
        if (this.incidentForm.invalid) return;

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
        this.selectedIncident = incident;
        const formattedDate = typeof incident.dateSurvenance === 'string' 
            ? incident.dateSurvenance.split('T')[0] 
            : new Date(incident.dateSurvenance).toISOString().split('T')[0];

        this.incidentForm.reset({
            titre: incident.titre,
            description: incident.description,
            domaine: incident.domaine || '',
            departementId: incident.departementId || null,
            dateSurvenance: formattedDate,
            statut: incident.statut,
            riskId: incident.riskId || null
        });
        
        this.showEditModal = true;
    }

    updateIncident() {
        if (this.incidentForm.invalid || !this.selectedIncident) return;

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
