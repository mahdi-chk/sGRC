import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    CANONICAL_MAITRISE_LEVELS,
    CANONICAL_PERIODIC_FREQUENCIES,
    CANONICAL_RISK_IMPACTS,
    CANONICAL_RISK_LEVELS,
    CANONICAL_RISK_PROBABILITIES,
    MAITRISE_LEVEL_LABELS,
    MaitriseLevel,
    PERIODIC_FREQUENCY_LABELS,
    PeriodicFrequency,
    Risk,
    RiskImpact,
    RiskLevel,
    RiskProbability,
    RiskService,
    RiskStatus,
    RISK_IMPACT_LABELS,
    RISK_LEVEL_LABELS,
    RISK_LEVEL_OPTIONS,
    RISK_PROBABILITY_LABELS,
    RISK_STATUS_LABELS,
    RISK_STATUS_OPTIONS,
} from '../core/services/risk.service';
import { UserRole } from '../core/models/user-role.enum';
import { OrganigrammeService } from '../core/services/organigramme.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-risk-management',
    templateUrl: './risk-management.component.html',
    styleUrls: []
})
export class RiskManagementComponent implements OnInit {
    environment = environment;
    PeriodicFrequency = PeriodicFrequency;
    RiskLevel = RiskLevel;
    RiskStatus = RiskStatus;

    risks: Risk[] = [];
    departments: any[] = [];
    allUsers: any[] = [];
    organigrammeItems: any[] = [];
    riskAgents: any[] = [];
    filteredAgents: any[] = [];
    selectedAgentId = '';
    comments: any[] = [];
    treatmentContent = '';
    selectedFile: File | null = null;
    isAssigning = false;

    showCreateModal = false;
    showAssignModal = false;
    showDetailsModal = false;
    isEditing = false;
    selectedRisk: Risk | null = null;
    editRiskId: number | null = null;
    showExportMenu = false;

    showAiModal = false;
    situationText = '';
    isGenerating = false;
    suggestedRisks: any[] = [];
    aiMode: 'text' | 'file' = 'text';
    aiFile: File | null = null;
    aiFileError = '';

    showEvaluationModal = false;
    isEvaluating = false;
    aiEvaluationResults: any[] = [];

    newRisk: any = this.buildDefaultRisk();

    riskLevels = CANONICAL_RISK_LEVELS;
    riskStatuses = RISK_STATUS_OPTIONS.map((option) => option.code);
    periodicFrequencies = CANONICAL_PERIODIC_FREQUENCIES;
    riskProbabilities = CANONICAL_RISK_PROBABILITIES;
    riskImpacts = CANONICAL_RISK_IMPACTS;
    maitriseLevels = CANONICAL_MAITRISE_LEVELS;

    levelLabelMap = RISK_LEVEL_LABELS;
    statusLabelMap = RISK_STATUS_LABELS;
    levelOptions = RISK_LEVEL_OPTIONS;
    statusOptions = RISK_STATUS_OPTIONS;

    today = new Date().toISOString().split('T')[0];
    filterStatut = '';
    filterNiveau = '';
    searchText = '';
    
    // Pagination
    currentPage = 1;
    itemsPerPage = 10;

    constructor(
        private riskService: RiskService,
        private organigrammeService: OrganigrammeService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRisks();
        this.loadInitialData();
    }

    get currentUserRole(): UserRole | null {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role || null;
    }

    get isSeniorAuditor(): boolean {
        return this.currentUserRole === UserRole.AUDIT_SENIOR || this.currentUserRole === UserRole.SUPER_ADMIN;
    }

    get isRiskManager(): boolean {
        return this.currentUserRole === UserRole.RISK_MANAGER || this.currentUserRole === UserRole.SUPER_ADMIN;
    }

    get authQueryToken(): string {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? `?token=${token}` : '';
    }

    get filteredRisks(): Risk[] {
        return this.risks.filter((risk) => {
            const search = this.normalize(this.searchText);
            const titre = this.normalize(risk.titre);
            const domaine = this.normalize(risk.domaine);

            const matchSearch = !search || titre.includes(search) || domaine.includes(search);
            const riskLevel = this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque);
            const filterLevel = this.normalize(this.filterNiveau);
            const matchLevel = !filterLevel || riskLevel === filterLevel;

            const riskStatut = this.normalize((risk as any).statutCode || risk.statut);
            const filterStatut = this.normalize(this.filterStatut);
            const matchStatus = !filterStatut || riskStatut === filterStatut;

            return matchSearch && matchLevel && matchStatus;
        });
    }

    get paginatedRisks(): Risk[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredRisks.slice(startIndex, startIndex + this.itemsPerPage);
    }

    onPageChanged(event: {page: number, pageSize: number}) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }

    onFilterChange() {
        this.currentPage = 1;
    }

    loadRisks() {
        this.riskService.getRisks().subscribe((risks) => {
            this.risks = risks;
        });
    }

    loadInitialData() {
        this.http.get<any[]>(`${environment.apiUrl}/departments`).subscribe((data) => this.departments = data);
        this.organigrammeService.getAll().subscribe((data) => this.organigrammeItems = data);

        if (!this.isRiskManager) {
            return;
        }

        this.http.get<any[]>(`${environment.apiUrl}/users/assignable/risk-agents`).subscribe((users) => {
            this.allUsers = users;
            this.riskAgents = [...users];
            this.updateFilteredAgents();
        });
    }

    buildDefaultRisk() {
        return {
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
            responsableTraitementId: '',
            frequenceTraitement: PeriodicFrequency.NONE,
            prochaineEcheance: ''
        };
    }

    onDepartmentChange() {
        this.newRisk.responsableTraitementId = '';
        this.updateFilteredAgents();
    }

    updateFilteredAgents() {
        const departmentId = Number(this.newRisk.departementId || 0);
        const departmentAgents = this.allUsers.filter((user) => {
            return !departmentId || Number(user.departementId) === departmentId;
        });

        this.filteredAgents = departmentAgents.length > 0 ? departmentAgents : [...this.allUsers];
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
        if (!this.isRiskManager) return;

        this.isEditing = false;
        this.resetForm();
        this.showCreateModal = true;
    }

    calculateScores() {
        let probabilityScore = 0;
        switch (this.newRisk.probabilite) {
            case RiskProbability.RARE: probabilityScore = 1; break;
            case RiskProbability.POSSIBLE: probabilityScore = 2; break;
            case RiskProbability.PROBABLE: probabilityScore = 4; break;
            case RiskProbability.PERMANENT: probabilityScore = 8; break;
        }

        let impactScore = 0;
        switch (this.newRisk.impact) {
            case RiskImpact.LIMITED: impactScore = 1; break;
            case RiskImpact.MEDIUM: impactScore = 4; break;
            case RiskImpact.SIGNIFICANT: impactScore = 16; break;
            case RiskImpact.CRITICAL: impactScore = 64; break;
        }

        if (probabilityScore && impactScore) {
            const grossRisk = probabilityScore * impactScore;
            this.newRisk.niveauCotationRisqueBrut = grossRisk;

            if (grossRisk <= 8) this.newRisk.cotationRisqueBrut = RiskLevel.LOW;
            else if (grossRisk <= 32) this.newRisk.cotationRisqueBrut = RiskLevel.LIMITED;
            else if (grossRisk <= 128) this.newRisk.cotationRisqueBrut = RiskLevel.MEDIUM;
            else this.newRisk.cotationRisqueBrut = RiskLevel.HIGH;
        } else {
            this.newRisk.niveauCotationRisqueBrut = null;
            this.newRisk.cotationRisqueBrut = null;
        }

        let dmrScore = 0;
        switch (this.newRisk.niveauMaitrise) {
            case MaitriseLevel.FAIBLE: dmrScore = 4; break;
            case MaitriseLevel.LIMITED: dmrScore = 3; break;
            case MaitriseLevel.MEDIUM: dmrScore = 2; break;
            case MaitriseLevel.HIGH: dmrScore = 1; break;
        }

        if (this.newRisk.niveauCotationRisqueBrut && dmrScore) {
            const netRisk = this.newRisk.niveauCotationRisqueBrut * dmrScore;
            this.newRisk.niveauCotationRisqueNet = netRisk;

            if (netRisk <= 32) this.newRisk.cotationRisqueNet = RiskLevel.LOW;
            else if (netRisk <= 128) this.newRisk.cotationRisqueNet = RiskLevel.LIMITED;
            else if (netRisk <= 512) this.newRisk.cotationRisqueNet = RiskLevel.MEDIUM;
            else this.newRisk.cotationRisqueNet = RiskLevel.HIGH;

            this.newRisk.niveauRisque = this.newRisk.cotationRisqueNet;
        } else {
            this.newRisk.niveauCotationRisqueNet = null;
            this.newRisk.cotationRisqueNet = null;
        }
    }

    onEditRisk(risk: Risk) {
        if (!this.isRiskManager) return;

        this.isEditing = true;
        this.editRiskId = risk.id;
        this.newRisk = {
            ...risk,
            departementId: risk.departementId.toString(),
            dateEcheance: new Date(risk.dateEcheance).toISOString().split('T')[0],
            responsableTraitementId: risk.responsableTraitementId.toString(),
            frequenceTraitement: risk.frequenceTraitement || PeriodicFrequency.NONE,
            prochaineEcheance: risk.prochaineEcheance ? new Date(risk.prochaineEcheance).toISOString().split('T')[0] : ''
        };
        this.calculateScores();
        this.updateFilteredAgents();
        this.showCreateModal = true;
    }

    onViewDetails(risk: Risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
        this.loadComments(risk.id);
    }

    loadComments(riskId: number) {
        this.riskService.getComments(riskId).subscribe((comments) => this.comments = comments);
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    saveRisk() {
        if (!this.isRiskManager || !this.isFormValid()) return;

        const formData = new FormData();
        Object.keys(this.newRisk).forEach((key) => {
            formData.append(key, (this.newRisk as any)[key]);
        });

        if (this.selectedFile) {
            formData.append('pieceJustificative', this.selectedFile);
        }

        if (this.isEditing && this.editRiskId) {
            this.riskService.updateRisk(this.editRiskId, formData).subscribe(() => this.finalizeSave());
            return;
        }

        this.riskService.createRisk(formData).subscribe(() => this.finalizeSave());
    }

    finalizeSave() {
        this.showCreateModal = false;
        this.loadRisks();
        this.resetForm();
    }

    openAssignModal(risk: Risk) {
        if (!this.isRiskManager) return;

        this.selectedRisk = risk;
        this.selectedAgentId = risk.riskAgentId ? risk.riskAgentId.toString() : '';
        this.filteredAgents = this.getAssignableAgentsForRisk(risk);
        this.showAssignModal = true;
    }

    assignRisk(agentId: string = this.selectedAgentId) {
        if (!this.isRiskManager || !this.selectedRisk || !agentId) return;

        this.isAssigning = true;
        this.riskService.assignRisk(this.selectedRisk.id, parseInt(agentId, 10)).subscribe({
            next: () => {
                this.isAssigning = false;
                this.showAssignModal = false;
                this.loadRisks();
                this.selectedAgentId = '';
                this.selectedRisk = null;
            },
            error: (error: any) => {
                this.isAssigning = false;
                console.error('Error assigning risk:', error);
                alert('Erreur lors de l\'assignation du risque. Veuillez réessayer.');
            }
        });
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
        if (!this.isRiskManager) return;

        if (confirm('Êtes-vous sûr de vouloir clôturer ce risque ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.CLOSED).subscribe(() => this.loadRisks());
        }
    }

    evaluateRisksWithAi() {
        const riskIds = this.filteredRisks.map((risk) => risk.id);
        if (riskIds.length === 0) return;

        this.isEvaluating = true;
        this.showEvaluationModal = true;
        this.aiEvaluationResults = [];

        this.riskService.evaluateRisks(riskIds).subscribe({
            next: (results) => {
                this.aiEvaluationResults = results;
                this.isEvaluating = false;
            },
            error: (error) => {
                console.error(error);
                this.isEvaluating = false;
                alert('Erreur lors de l\'évaluation des risques.');
            }
        });
    }

    revertToInProgress(riskId: number) {
        if (!this.isRiskManager) return;

        if (confirm('Voulez-vous vraiment remettre ce risque en cours de traitement ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.IN_PROGRESS).subscribe(() => this.loadRisks());
        }
    }

    deleteRisk(riskId: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce risque ? Cette action est irréversible.')) {
            this.riskService.deleteRisk(riskId).subscribe({
                next: () => this.loadRisks(),
                error: (error: any) => {
                    console.error('Error deleting risk:', error);
                    alert('Erreur lors de la suppression du risque.');
                }
            });
        }
    }

    onAiFileSelected(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        this.aiFileError = '';
        const extension = file.name.split('.').pop()?.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png'].includes(extension || '');

        if (isImage && file.size > 4 * 1024 * 1024) {
            this.aiFileError = 'Les images pour l\'OCR sont limitées à 4 Mo.';
            this.aiFile = null;
        } else if (file.size > 5 * 1024 * 1024) {
            this.aiFileError = 'Le fichier est trop volumineux (max 5 Mo).';
            this.aiFile = null;
        } else {
            this.aiFile = file;
        }
    }

    generateWithAi() {
        if (this.aiMode === 'text' && !this.situationText) return;
        if (this.aiMode === 'file' && !this.aiFile) return;

        this.isGenerating = true;
        this.suggestedRisks = [];

        const request$ = this.aiMode === 'text'
            ? this.riskService.generateRisks(this.situationText)
            : this.riskService.generateRisksFromFile(this.aiFile!);

        request$.subscribe({
            next: (risks) => {
                this.suggestedRisks = risks
                    .filter((risk) => risk && risk.titre)
                    .map((risk) => {
                        const departmentName = risk.departement || '';
                        const department = departmentName
                            ? this.departments.find((item) => item.nom.toLowerCase().includes(departmentName.toLowerCase()))
                            : null;
                        const departmentId = department ? department.id : null;

                        let suggestedDate = '';
                        if (risk.delaiSuggestion) {
                            const date = new Date();
                            date.setDate(date.getDate() + risk.delaiSuggestion);
                            suggestedDate = date.toISOString().split('T')[0];
                        }

                        let matchedUserId = '';
                        const suggestedResponsible = (risk.responsableSuggestion || '').toLowerCase();
                        if (suggestedResponsible) {
                            const matchedUser = this.allUsers.find((user) =>
                                (departmentId ? user.departementId === departmentId : true) &&
                                (
                                    (user.prenom || '').toLowerCase().includes(suggestedResponsible) ||
                                    (user.nom || '').toLowerCase().includes(suggestedResponsible) ||
                                    (user.role || '').toLowerCase().includes(suggestedResponsible)
                                )
                            );
                            if (matchedUser) {
                                matchedUserId = matchedUser.id.toString();
                            }
                        }

                        return {
                            ...risk,
                            selected: true,
                            deptId: departmentId,
                            suggestedDate,
                            manualResponsableId: matchedUserId,
                            probabilite: risk.probabilite || null,
                            impact: risk.impact || null,
                            niveauMaitrise: risk.niveauMaitrise || null
                        };
                    });
                this.isGenerating = false;
            },
            error: (error) => {
                console.error(error);
                this.isGenerating = false;
                const message = error.error?.error || 'Erreur lors de la génération des risques.';
                alert(message);
            }
        });
    }

    toggleAiRiskSelection(risk: any) {
        risk.selected = !risk.selected;
    }

    isAiFormValid(): boolean {
        const selectedRisks = this.suggestedRisks.filter((risk) => risk.selected);
        if (selectedRisks.length === 0) return false;

        return selectedRisks.every((risk) => !!risk.manualResponsableId && !!risk.deptId);
    }

    addSelectedRisks() {
        const selectedRisks = this.suggestedRisks.filter((risk) => risk.selected);
        if (selectedRisks.length === 0) return;

        let completed = 0;
        selectedRisks.forEach((risk) => {
            const formData = new FormData();
            formData.append('titre', risk.titre);
            formData.append('explication', risk.explication || '');
            formData.append('domaine', risk.domaine || '');
            if (risk.macroProcessus) formData.append('macroProcessus', risk.macroProcessus);
            if (risk.processus) formData.append('processus', risk.processus);
            if (risk.probabilite) formData.append('probabilite', risk.probabilite);
            if (risk.impact) formData.append('impact', risk.impact);
            if (risk.niveauMaitrise) formData.append('niveauMaitrise', risk.niveauMaitrise);
            if (risk.dmrExistant) formData.append('dmrExistant', risk.dmrExistant);
            if (risk.planActionTraitement) formData.append('planActionTraitement', risk.planActionTraitement);

            formData.append('niveauRisque', risk.niveauRisque || RiskLevel.MEDIUM);
            formData.append('departementId', risk.deptId.toString());
            formData.append('dateEcheance', risk.suggestedDate || this.today);
            formData.append('responsableTraitementId', risk.manualResponsableId);

            let frequency = risk.frequenceTraitement;
            if (!CANONICAL_PERIODIC_FREQUENCIES.includes(frequency)) {
                frequency = PeriodicFrequency.NONE;
            }
            formData.append('frequenceTraitement', frequency);

            this.riskService.createRisk(formData).subscribe(() => {
                completed += 1;
                if (completed === selectedRisks.length) {
                    this.showAiModal = false;
                    this.loadRisks();
                    this.situationText = '';
                    this.suggestedRisks = [];
                }
            });
        });
    }

    resetForm() {
        this.isEditing = false;
        this.editRiskId = null;
        this.newRisk = this.buildDefaultRisk();
        this.selectedFile = null;
        this.aiFile = null;
        this.aiFileError = '';
        this.aiMode = 'text';
        this.filteredAgents = [];
        this.selectedAgentId = '';
    }

    normalize(value: any): string {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return (value.code || value.id || '').toString().toLowerCase().trim();
        return value.toString().toLowerCase().trim();
    }

    getStatusCount(status: string): number {
        const target = this.normalize(status);
        return this.filteredRisks.filter((risk) => this.normalize(risk.statutCode || risk.statut) === target).length;
    }

    getLevelCount(level: string): number {
        const target = this.normalize(level);
        return this.filteredRisks.filter((risk) => this.normalize(risk.niveauRisqueCode || risk.niveauRisque) === target).length;
    }

    downloadReport() {
        // Kept for template compatibility.
    }

    exportToXLSX() {
        this.showExportMenu = false;
        const rows = this.risks.map((risk) => ({
            'Titre': risk.titre,
            'Domaine': risk.domaine,
            'Niveau': this.getNiveauLabel(risk),
            'Statut': this.getStatusLabel(risk),
            'Responsable': `${risk.responsableTraitement?.prenom || ''} ${risk.responsableTraitement?.nom || ''}`.trim(),
            'Agent': risk.riskAgent ? `${risk.riskAgent.prenom} ${risk.riskAgent.nom}` : 'Non assigné',
            'Date Échéance': new Date(risk.dateEcheance).toLocaleDateString('fr-FR'),
            'Date Création': new Date(risk.createdAt).toLocaleDateString('fr-FR')
        }));

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Risques');
        XLSX.writeFile(workbook, `rapport-risques-${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportToPDF() {
        this.showExportMenu = false;
        const document = new jsPDF('l', 'mm', 'a4');

        document.setFontSize(18);
        document.text('Rapport des risques', 14, 22);
        document.setFontSize(11);
        document.setTextColor(100);
        document.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

        const head = [['Titre', 'Domaine', 'Niveau', 'Statut', 'Responsable', 'Agent', 'Échéance']];
        const rows = this.risks.map((risk) => [
            risk.titre,
            risk.domaine,
            this.getNiveauLabel(risk),
            this.getStatusLabel(risk),
            `${risk.responsableTraitement?.prenom || ''} ${risk.responsableTraitement?.nom || ''}`.trim(),
            risk.riskAgent ? `${risk.riskAgent.prenom} ${risk.riskAgent.nom}` : 'Non assigné',
            new Date(risk.dateEcheance).toLocaleDateString('fr-FR')
        ]);

        autoTable(document, {
            startY: 35,
            head,
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });

        document.save(`rapport-risques-${new Date().toISOString().split('T')[0]}.pdf`);
    }

    getStatusClass(risk: any): string {
        if (!risk) return 'badge';
        const status = this.normalize(risk.statutCode || risk.statut);
        return `badge status-${status}`;
    }

    getNiveauClass(risk: any): string {
        if (!risk) return 'badge';
        const level = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
        return `badge level-${level}`;
    }

    getNiveauLabel(risk: any): string {
        if (!risk) return '';
        const level = this.normalize(risk.niveauRisqueCode || risk.niveauRisque);
        return this.levelLabelMap[level] || risk.niveauRisqueLabel || (typeof risk.niveauRisque === 'string' ? risk.niveauRisque : '');
    }

    getStatusLabel(risk: any): string {
        if (!risk) return '';
        const status = this.normalize(risk.statutCode || risk.statut);
        return this.statusLabelMap[status] || risk.statutLabel || (typeof risk.statut === 'string' ? risk.statut : '');
    }

    getProbabilityLabel(value: string | null | undefined): string {
        const normalized = this.normalize(value);
        return RISK_PROBABILITY_LABELS[normalized] || value || '';
    }

    getImpactLabel(value: string | null | undefined): string {
        const normalized = this.normalize(value);
        return RISK_IMPACT_LABELS[normalized] || value || '';
    }

    getMaitriseLabel(value: string | null | undefined): string {
        const normalized = this.normalize(value);
        return MAITRISE_LEVEL_LABELS[normalized] || value || '';
    }

    getFrequencyLabel(value: string | null | undefined): string {
        const normalized = this.normalize(value);
        return PERIODIC_FREQUENCY_LABELS[normalized] || value || '';
    }

    getAssignRiskModalTitle(): string {
        return this.selectedRisk?.riskAgentId ? 'Réassigner le risque' : 'Assigner le risque';
    }

    getAssignRiskActionLabel(): string {
        return this.selectedRisk?.riskAgentId ? 'Réassigner' : 'Assigner';
    }

    getAssignButtonTitle(risk: Risk): string {
        return risk.riskAgentId ? 'Réassigner' : 'Assigner';
    }

    getAssignableAgentsForRisk(risk: Risk | null): any[] {
        if (!risk) {
            return [...this.riskAgents];
        }

        const departmentId = Number(risk.departementId);
        const departmentAgents = this.riskAgents.filter((user) => Number(user.departementId) === departmentId);
        return departmentAgents.length > 0 ? departmentAgents : [...this.riskAgents];
    }

    hasAssignableAgents(): boolean {
        return this.filteredAgents.length > 0;
    }

    isCompletedRiskStatus(status?: string | null): boolean {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }

    getAgentDisplayLabel(user: any): string {
        if (!user) return '';

        const fullName = `${user.prenom || ''} ${user.nom || ''}`.trim();
        const department = user.departement?.nom || user.departementNom || '';
        return department ? `${fullName} - ${department}` : fullName;
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
