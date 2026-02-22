import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk, RiskLevel, RiskStatus } from '../core/services/risk.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../core/models/user-role.enum';

@Component({
    selector: 'app-risk-management',
    templateUrl: './risk-management.component.html',
    styleUrls: []
})
export class RiskManagementComponent implements OnInit {

    risks: Risk[] = [];
    departments: any[] = [];
    allUsers: any[] = [];
    riskAgents: any[] = [];
    filteredAgents: any[] = [];
    comments: any[] = [];
    treatmentContent = '';
    selectedFile: File | null = null;

    showCreateModal = false;
    showAssignModal = false;
    showDetailsModal = false;
    isEditing = false;
    selectedRisk: Risk | null = null;
    editRiskId: number | null = null;

    newRisk = {
        titre: '',
        explication: '',
        domaine: '',
        departementId: '',
        dateEcheance: '',
        niveauRisque: RiskLevel.MEDIUM,
        responsableTraitementId: ''
    };
    riskLevels = Object.values(RiskLevel);
    riskStatuses = Object.values(RiskStatus);
    today = new Date().toISOString().split('T')[0];

    filterStatut = '';
    filterNiveau = '';
    searchText = '';

    constructor(
        private riskService: RiskService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRisks();
        this.loadInitialData();
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(risks => this.risks = risks);
    }

    loadInitialData() {
        this.http.get<any[]>('http://localhost:3000/api/departments').subscribe(data => this.departments = data);
        this.http.get<any[]>('http://localhost:3000/api/users').subscribe(users => {
            this.allUsers = users;
            this.riskAgents = users.filter(u => u.role === UserRole.RISK_AGENT);
            this.updateFilteredAgents();
        });
    }

    onDepartmentChange() {
        this.newRisk.responsableTraitementId = '';
        this.updateFilteredAgents();
    }

    updateFilteredAgents() {
        this.filteredAgents = this.allUsers.filter(u => {
            const deptId = Number(this.newRisk.departementId);
            return !deptId || u.departementId === deptId;
        });
    }

    isFormValid(): boolean {
        const isDateValid = this.newRisk.dateEcheance >= this.today;
        return !!(
            this.newRisk.titre &&
            this.newRisk.explication &&
            this.newRisk.domaine &&
            this.newRisk.departementId &&
            this.newRisk.dateEcheance &&
            isDateValid &&
            this.newRisk.responsableTraitementId
        );
    }

    openCreateModal() {
        this.isEditing = false;
        this.resetForm();
        this.showCreateModal = true;
    }

    onEditRisk(risk: Risk) {
        this.isEditing = true;
        this.editRiskId = risk.id;
        this.newRisk = {
            titre: risk.titre,
            explication: risk.explication,
            domaine: risk.domaine,
            departementId: risk.departementId.toString(),
            dateEcheance: new Date(risk.dateEcheance).toISOString().split('T')[0],
            niveauRisque: risk.niveauRisque,
            responsableTraitementId: risk.responsableTraitementId.toString()
        };
        this.updateFilteredAgents();
        this.showCreateModal = true;
    }

    onViewDetails(risk: Risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
        this.loadComments(risk.id);
    }

    loadComments(riskId: number) {
        this.riskService.getComments(riskId).subscribe(comments => this.comments = comments);
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    saveRisk() {
        if (!this.isFormValid()) return;

        const formData = new FormData();
        Object.keys(this.newRisk).forEach(key => {
            formData.append(key, (this.newRisk as any)[key]);
        });
        if (this.selectedFile) {
            formData.append('pieceJustificative', this.selectedFile);
        }

        if (this.isEditing && this.editRiskId) {
            this.riskService.updateRisk(this.editRiskId, formData).subscribe(() => this.finalizeSave());
        } else {
            this.riskService.createRisk(formData).subscribe(() => this.finalizeSave());
        }
    }

    finalizeSave() {
        this.showCreateModal = false;
        this.loadRisks();
        this.resetForm();
    }

    openAssign(risk: Risk) {
        this.selectedRisk = risk;
        // Show only Risk Agents, prioritized by department
        this.filteredAgents = this.riskAgents.filter(u =>
            u.departementId === risk.departementId
        );
        // If no risk agents in same department, show all risk agents
        if (this.filteredAgents.length === 0) {
            this.filteredAgents = [...this.riskAgents];
        }
        this.showAssignModal = true;
    }

    assignRisk(agentId: string) {
        if (this.selectedRisk) {
            this.riskService.assignRisk(this.selectedRisk.id, parseInt(agentId)).subscribe(() => {
                this.showAssignModal = false;
                this.loadRisks();
            });
        }
    }

    addComment() {
        if (!this.selectedRisk || !this.treatmentContent) return;

        const formData = new FormData();
        formData.append('content', this.treatmentContent);
        if (this.selectedFile) {
            formData.append('pieceJointe', this.selectedFile);
        }

        this.riskService.addComment(this.selectedRisk.id, formData).subscribe(() => {
            this.treatmentContent = '';
            this.selectedFile = null;
            this.loadComments(this.selectedRisk!.id);
        });
    }

    closeRisk(riskId: number) {
        if (confirm('Êtes-vous sûr de vouloir clôturer ce risque ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.CLOSED).subscribe(() => this.loadRisks());
        }
    }

    resetForm() {
        this.isEditing = false;
        this.editRiskId = null;
        this.newRisk = {
            titre: '',
            explication: '',
            domaine: '',
            departementId: '',
            dateEcheance: '',
            niveauRisque: RiskLevel.MEDIUM,
            responsableTraitementId: ''
        };
        this.selectedFile = null;
        this.filteredAgents = [];
    }

    getStatusCount(statut: string): number {
        return this.risks.filter(r => r.statut === statut).length;
    }

    getLevelCount(niveau: string): number {
        return this.risks.filter(r => r.niveauRisque === niveau).length;
    }

    downloadReport() {
        const headers = ['Titre', 'Domaine', 'Niveau', 'Statut', 'Responsable', 'Agent', 'Date Echéance', 'Date Création'];
        const rows = this.risks.map(r => [
            r.titre,
            r.domaine,
            r.niveauRisque,
            r.statut,
            `${r.responsableTraitement?.prenom || ''} ${r.responsableTraitement?.nom || ''}`.trim(),
            r.riskAgent ? `${r.riskAgent.prenom} ${r.riskAgent.nom}` : 'Non assigné',
            new Date(r.dateEcheance).toLocaleDateString('fr-FR'),
            new Date(r.createdAt).toLocaleDateString('fr-FR')
        ]);
        const csvContent = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport-risques-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    get filteredRisks(): Risk[] {
        return this.risks.filter(r => {
            const matchesStatut = !this.filterStatut || r.statut === this.filterStatut;
            const matchesNiveau = !this.filterNiveau || r.niveauRisque === this.filterNiveau;
            const matchesSearch = !this.searchText ||
                r.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
                r.domaine?.toLowerCase().includes(this.searchText.toLowerCase());
            return matchesStatut && matchesNiveau && matchesSearch;
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
