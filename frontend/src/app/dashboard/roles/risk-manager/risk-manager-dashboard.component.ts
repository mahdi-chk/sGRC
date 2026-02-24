import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RiskService, Risk, RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';

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
    today = new Date().toISOString().split('T')[0];

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

        // Formula from Top Management dashboard
        const maturityBonus = (treatmentRate / 100) * 2.0;
        const criticalPenalty = (criticalRate / 100) * 1.0;
        let avgMaturity = Number((2.0 + maturityBonus - criticalPenalty + 1.0).toFixed(1));
        if (avgMaturity > 5) avgMaturity = 5;

        this.stats = {
            total,
            treatmentRate,
            avgMaturity,
            criticalCount: critical
        };
    }

    loadInitialData() {
        this.http.get<any[]>('http://localhost:3000/api/departments').subscribe(data => this.departments = data);
        this.http.get<any[]>('http://localhost:3000/api/users').subscribe(users => {
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
                error: (err) => {
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
            departementId: '',
            dateEcheance: '',
            niveauRisque: RiskLevel.MEDIUM,
            responsableTraitementId: ''
        };
        this.selectedFile = null;
    }
}
