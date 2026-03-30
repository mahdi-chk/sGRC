import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RiskService, Risk, RiskLevel, RiskStatus, RiskProbability, RiskImpact, MaitriseLevel } from '../../../core/services/risk.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-risk-manager-dashboard',
    templateUrl: './risk-manager-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class RiskManagerDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Risk Manager';
    @Output() openModule = new EventEmitter<any>();
    @Output() openRiskManagement = new EventEmitter<void>();
    environment = environment;

    risks: Risk[] = [];
    departments: any[] = [];
    allUsers: any[] = [];
    filteredAgents: any[] = [];
    comments: any[] = [];
    treatmentContent = '';
    selectedFile: File | null = null;
    isAssigning = false;

    // Statistics
    stats = {
        total: 0,
        treatmentRate: 0,
        avgMaturity: 0,
        criticalCount: 0
    };

    showCreateModal = false;
    showAssignModal = false;
    showDetailsModal = false;
    isEditing = false;
    selectedRisk: Risk | null = null;
    editRiskId: number | null = null;

    newRisk: any = {
        titre: '',
        explication: '',
        domaine: '',
        macroProcessus: null,
        processus: null,
        departementId: '',
        dateEcheance: '',
        niveauRisque: RiskLevel.MEDIUM,
        probabilite: null,
        impact: null,
        niveauMaitrise: null,
        dmrExistant: '',
        planActionTraitement: '',
        cotationRisqueBrut: null,
        niveauCotationRisqueBrut: null,
        cotationRisqueNet: null,
        niveauCotationRisqueNet: null,
        responsableTraitementId: ''
    };
    riskLevels = Object.values(RiskLevel);
    riskProbabilities = Object.values(RiskProbability);
    riskImpacts = Object.values(RiskImpact);
    maitriseLevels = Object.values(MaitriseLevel);
    
    today = new Date().toISOString().split('T')[0];

    filterStatut = '';
    filterNiveau = '';
    searchText = '';

    get authQueryToken(): string {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }

    constructor(
        private riskService: RiskService,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.loadRisks();
        this.loadInitialData();
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && user?.role) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.calculateStats();
        });
    }

    calculateStats() {
        if (!this.risks || this.risks.length === 0) {
            this.stats = { total: 0, treatmentRate: 0, avgMaturity: 0, criticalCount: 0 };
            return;
        }

        const total = this.risks.length;
        const treated = this.risks.filter(r => r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED).length;
        const critical = this.risks.filter(r => r.niveauRisque === RiskLevel.CRITICAL).length;

        const treatmentRate = Math.round((treated / total) * 100);
        const criticalRate = Math.round((critical / total) * 100);

        const avgMaturity = RiskService.calculateMaturityIndex(this.risks);

        this.stats = {
            total,
            treatmentRate,
            avgMaturity,
            criticalCount: critical
        };
    }

    loadInitialData() {
        this.http.get<any[]>(`${environment.apiUrl}/departments`).subscribe(data => this.departments = data);
        this.http.get<any[]>(`${environment.apiUrl}/users/assignable/risk-agents`).subscribe(users => {
            this.allUsers = users;
            // Initially, filteredAgents will be empty or all Agents depending on dept selection
            this.updateFilteredAgents();
        });
    }

    onDepartmentChange() {
        this.newRisk.responsableTraitementId = ''; // Reset selection on dept change
        this.updateFilteredAgents();
    }

    updateFilteredAgents() {
        this.filteredAgents = this.allUsers.filter(u =>
            u.role === UserRole.RISK_AGENT
        );
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

    onOpenModule(m: any, s: any) {
        if (s.title === 'Nouveau Risque') {
            this.showCreateModal = true;
        } else if (s.title === 'Mes Risques') {
            this.loadRisks();
        } else {
            this.dashboardService.openSubmoduleModal(m, s);
            this.openModule.emit({ m, s });
        }
    }

    onOpenRiskManagement() {
        this.router.navigate(['/dashboard/risks']);
        this.openRiskManagement.emit();
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onEditRisk(risk: Risk) {
        this.isEditing = true;
        this.editRiskId = risk.id;
        this.newRisk = {
            ...risk,
            departementId: risk.departementId.toString(),
            dateEcheance: new Date(risk.dateEcheance).toISOString().split('T')[0],
            responsableTraitementId: risk.responsableTraitementId.toString()
        };
        this.calculateScores();
        this.updateFilteredAgents();
        this.showCreateModal = true;
    }

    calculateScores() {
        let probaVal = 0;
        switch (this.newRisk.probabilite) {
            case RiskProbability.RARE: probaVal = 1; break;
            case RiskProbability.POSSIBLE: probaVal = 2; break;
            case RiskProbability.PROBABLE: probaVal = 4; break;
            case RiskProbability.PERMANENT: probaVal = 8; break;
        }

        let impactVal = 0;
        switch (this.newRisk.impact) {
            case RiskImpact.LIMITÉ: impactVal = 1; break;
            case RiskImpact.MOYEN: impactVal = 4; break;
            case RiskImpact.SIGNIFICATIF: impactVal = 16; break;
            case RiskImpact.CRITIQUE: impactVal = 64; break;
        }

        if (probaVal && impactVal) {
            const brut = probaVal * impactVal;
            this.newRisk.niveauCotationRisqueBrut = brut;
            if (brut <= 8) this.newRisk.cotationRisqueBrut = RiskLevel.LOW;
            else if (brut <= 32) this.newRisk.cotationRisqueBrut = RiskLevel.LIMITED;
            else if (brut <= 128) this.newRisk.cotationRisqueBrut = RiskLevel.MEDIUM;
            else this.newRisk.cotationRisqueBrut = RiskLevel.HIGH;
        } else {
            this.newRisk.niveauCotationRisqueBrut = null;
            this.newRisk.cotationRisqueBrut = null;
        }

        let dmrVal = 0;
        switch (this.newRisk.niveauMaitrise) {
            case MaitriseLevel.FAIBLE: dmrVal = 4; break;
            case MaitriseLevel.LIMITÉ: dmrVal = 3; break;
            case MaitriseLevel.MOYEN: dmrVal = 2; break;
            case MaitriseLevel.ÉLEVÉ: dmrVal = 1; break;
        }

        if (this.newRisk.niveauCotationRisqueBrut && dmrVal) {
            const net = this.newRisk.niveauCotationRisqueBrut * dmrVal;
            this.newRisk.niveauCotationRisqueNet = net;
            if (net <= 32) this.newRisk.cotationRisqueNet = RiskLevel.LOW;
            else if (net <= 128) this.newRisk.cotationRisqueNet = RiskLevel.LIMITED;
            else if (net <= 512) this.newRisk.cotationRisqueNet = RiskLevel.MEDIUM;
            else this.newRisk.cotationRisqueNet = RiskLevel.HIGH;
            
            this.newRisk.niveauRisque = this.newRisk.cotationRisqueNet;
        } else {
             this.newRisk.niveauCotationRisqueNet = null;
             this.newRisk.cotationRisqueNet = null;
        }
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
            this.riskService.updateRisk(this.editRiskId, formData).subscribe(() => {
                this.finalizeSave();
            });
        } else {
            this.riskService.createRisk(formData).subscribe(() => {
                this.finalizeSave();
            });
        }
    }

    finalizeSave() {
        this.showCreateModal = false;
        this.loadRisks();
        this.resetForm();
    }

    openAssign(risk: Risk) {
        this.selectedRisk = risk;
        this.showAssignModal = true;
        // Update filteredAgents to show all Risk Agents from all departments
        this.filteredAgents = this.allUsers.filter(u =>
            u.role === UserRole.RISK_AGENT
        );
    }

    onViewDetails(risk: Risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
        this.loadComments(risk.id);
    }

    loadComments(riskId: number) {
        this.riskService.getComments(riskId).subscribe(comments => this.comments = comments);
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

    assignRisk(agentId: string) {
        if (this.selectedRisk && agentId) {
            this.isAssigning = true;
            this.riskService.assignRisk(this.selectedRisk.id, parseInt(agentId)).subscribe({
                next: () => {
                    this.isAssigning = false;
                    this.showAssignModal = false;
                    this.loadRisks();
                    this.selectedRisk = null;
                },
                error: (err: any) => {
                    this.isAssigning = false;
                    console.error('Error assigning risk:', err);
                    alert('Erreur lors de l\'assignation du risque. Veuillez réessayer.');
                }
            });
        }
    }

    closeRisk(riskId: number) {
        this.riskService.updateStatus(riskId, RiskStatus.CLOSED).subscribe(() => {
            this.loadRisks();
        });
    }

    resetForm() {
        this.isEditing = false;
        this.editRiskId = null;
        this.newRisk = {
            titre: '',
            explication: '',
            domaine: '',
            macroProcessus: null,
            processus: null,
            departementId: '',
            dateEcheance: '',
            niveauRisque: RiskLevel.MEDIUM,
            probabilite: null,
            impact: null,
            niveauMaitrise: null,
            dmrExistant: '',
            planActionTraitement: '',
            cotationRisqueBrut: null,
            niveauCotationRisqueBrut: null,
            cotationRisqueNet: null,
            niveauCotationRisqueNet: null,
            responsableTraitementId: ''
        };
        this.selectedFile = null;
    }
}
