import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk, RiskLevel, RiskStatus, PeriodicFrequency, RiskProbability, RiskImpact, MaitriseLevel } from '../core/services/risk.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../core/models/user-role.enum';
import { OrganigrammeService } from '../core/services/organigramme.service';
import { environment } from '../../environments/environment';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-risk-management',
    templateUrl: './risk-management.component.html',
    styleUrls: []
})
export class RiskManagementComponent implements OnInit {
    environment = environment;

    risks: Risk[] = [];
    departments: any[] = [];
    allUsers: any[] = [];
    organigrammeItems: any[] = [];
    riskAgents: any[] = [];
    filteredAgents: any[] = [];
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

    // AI Generation
    showAiModal = false;
    situationText = '';
    isGenerating = false;
    suggestedRisks: any[] = [];
    aiMode: 'text' | 'file' = 'text';
    aiFile: File | null = null;
    aiFileError = '';

    // AI Evaluation
    showEvaluationModal = false;
    isEvaluating = false;
    aiEvaluationResults: any[] = [];


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
        
        responsableTraitementId: '',
        frequenceTraitement: PeriodicFrequency.NONE,
        prochaineEcheance: ''
    };
    riskLevels = Object.values(RiskLevel);
    riskStatuses = Object.values(RiskStatus);
    periodicFrequencies = Object.values(PeriodicFrequency);
    
    riskProbabilities = Object.values(RiskProbability);
    riskImpacts = Object.values(RiskImpact);
    maitriseLevels = Object.values(MaitriseLevel);
    
    today = new Date().toISOString().split('T')[0];

    filterStatut = '';
    filterNiveau = '';
    searchText = '';

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

    get isSeniorAuditor(): boolean {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role === UserRole.AUDIT_SENIOR || user.role === UserRole.SUPER_ADMIN;
    }

    get authQueryToken(): string {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(risks => this.risks = risks);
    }

    loadInitialData() {
        this.http.get<any[]>(`${environment.apiUrl}/departments`).subscribe(data => this.departments = data);
        this.organigrammeService.getAll().subscribe(data => this.organigrammeItems = data);
        this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe(users => {
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

    calculateScores() {
        // 1. Calcul Probabilité
        let probaVal = 0;
        switch (this.newRisk.probabilite) {
            case RiskProbability.RARE: probaVal = 1; break;
            case RiskProbability.POSSIBLE: probaVal = 2; break;
            case RiskProbability.PROBABLE: probaVal = 4; break;
            case RiskProbability.PERMANENT: probaVal = 8; break;
        }

        // 2. Calcul Impact
        let impactVal = 0;
        switch (this.newRisk.impact) {
            case RiskImpact.LIMITÉ: impactVal = 1; break;
            case RiskImpact.MOYEN: impactVal = 4; break;
            case RiskImpact.SIGNIFICATIF: impactVal = 16; break;
            case RiskImpact.CRITIQUE: impactVal = 64; break;
        }

        // 3. Risque Brut
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

        // 4. Calcul DMR
        let dmrVal = 0;
        switch (this.newRisk.niveauMaitrise) {
            case MaitriseLevel.FAIBLE: dmrVal = 4; break;
            case MaitriseLevel.LIMITÉ: dmrVal = 3; break;
            case MaitriseLevel.MOYEN: dmrVal = 2; break;
            case MaitriseLevel.ÉLEVÉ: dmrVal = 1; break;
        }

        // 5. Risque Net
        if (this.newRisk.niveauCotationRisqueBrut && dmrVal) {
            const net = this.newRisk.niveauCotationRisqueBrut * dmrVal;
            this.newRisk.niveauCotationRisqueNet = net;
            if (net <= 32) this.newRisk.cotationRisqueNet = RiskLevel.LOW;
            else if (net <= 128) this.newRisk.cotationRisqueNet = RiskLevel.LIMITED;
            else if (net <= 512) this.newRisk.cotationRisqueNet = RiskLevel.MEDIUM;
            else this.newRisk.cotationRisqueNet = RiskLevel.HIGH;
            
            this.newRisk.niveauRisque = this.newRisk.cotationRisqueNet; // Sync pour compatibilité visuelle
        } else {
             this.newRisk.niveauCotationRisqueNet = null;
             this.newRisk.cotationRisqueNet = null;
        }
    }

    onEditRisk(risk: Risk) {
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

    openAssignModal(risk: Risk) {
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

    evaluateRisksWithAi() {
        const riskIds = this.filteredRisks.map(r => r.id);
        if (riskIds.length === 0) return;

        this.isEvaluating = true;
        this.showEvaluationModal = true;
        this.aiEvaluationResults = [];

        this.riskService.evaluateRisks(riskIds).subscribe({
            next: (results) => {
                this.aiEvaluationResults = results;
                this.isEvaluating = false;
            },
            error: (err) => {
                console.error(err);
                this.isEvaluating = false;
                alert('Erreur lors de l\'évaluation des risques.');
            }
        });
    }

    revertToInProgress(riskId: number) {
        if (confirm('Voulez-vous vraiment remettre ce risque en cours de traitement ?')) {
            this.riskService.updateStatus(riskId, RiskStatus.IN_PROGRESS).subscribe(() => this.loadRisks());
        }
    }

    get isRiskManager(): boolean {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role === UserRole.RISK_MANAGER || user.role === UserRole.SUPER_ADMIN;
    }

    deleteRisk(riskId: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce risque ? Cette action est irréversible.')) {
            this.riskService.deleteRisk(riskId).subscribe({
                next: () => {
                    this.loadRisks();
                },
                error: (err: any) => {
                    console.error('Error deleting risk:', err);
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
            this.aiFileError = 'Les images pour l\'OCR sont limitées à 4Mo.';
            this.aiFile = null;
        } else if (file.size > 5 * 1024 * 1024) {
            this.aiFileError = 'Le fichier est trop volumineux (Max 5Mo).';
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

        const obs = this.aiMode === 'text'
            ? this.riskService.generateRisks(this.situationText)
            : this.riskService.generateRisksFromFile(this.aiFile!);

        obs.subscribe({
            next: (risks) => {
                this.suggestedRisks = risks
                    .filter(r => r && r.titre) // Exclure les risques invalides/vides
                    .map(r => {
                        const deptName = r.departement || '';
                        const dept = deptName ? this.departments.find(d => d.nom.toLowerCase().includes(deptName.toLowerCase())) : null;
                        const deptId = dept ? dept.id : null;

                        // Pre-calculate date
                        let suggestedDate = '';
                        if (r.delaiSuggestion) {
                            const date = new Date();
                            date.setDate(date.getDate() + r.delaiSuggestion);
                            suggestedDate = date.toISOString().split('T')[0];
                        }

                        // Try to match user
                        let matchedUserId = '';
                        const suggestedResp = (r.responsableSuggestion || '').toLowerCase();
                        if (suggestedResp) {
                            const matchedUser = this.allUsers.find(u =>
                                (deptId ? u.departementId === deptId : true) && (
                                    (u.prenom || '').toLowerCase().includes(suggestedResp) ||
                                    (u.nom || '').toLowerCase().includes(suggestedResp) ||
                                    (u.role || '').toLowerCase().includes(suggestedResp)
                                )
                            );
                            if (matchedUser) matchedUserId = matchedUser.id.toString();
                        }

                        return {
                            ...r,
                            selected: true,
                            deptId,
                            suggestedDate,
                            manualResponsableId: matchedUserId,
                            // Mappage par défaut si l'IA s'est trompée de case
                            probabilite: r.probabilite || null,
                            impact: r.impact || null,
                            niveauMaitrise: r.niveauMaitrise || null
                        };
                    });
                this.isGenerating = false;
            },
            error: (err) => {
                console.error(err);
                this.isGenerating = false;
                const msg = err.error?.error || 'Erreur lors de la génération des risques.';
                alert(msg);
            }
        });
    }

    toggleAiRiskSelection(risk: any) {
        risk.selected = !risk.selected;
    }

    isAiFormValid(): boolean {
        const selected = this.suggestedRisks.filter(r => r.selected);
        if (selected.length === 0) return false;
        // Every selected risk must have a responsible and a department
        return selected.every(r => !!r.manualResponsableId && !!r.deptId);
    }

    addSelectedRisks() {
        const selected = this.suggestedRisks.filter(r => r.selected);
        if (selected.length === 0) return;

        let completed = 0;
        selected.forEach(risk => {
            const formData = new FormData();
            formData.append('titre', risk.titre);
            formData.append('explication', risk.explication || '');
            formData.append('domaine', risk.domaine || '');
            if(risk.macroProcessus) formData.append('macroProcessus', risk.macroProcessus);
            if(risk.processus) formData.append('processus', risk.processus);
            if(risk.probabilite) formData.append('probabilite', risk.probabilite);
            if(risk.impact) formData.append('impact', risk.impact);
            if(risk.niveauMaitrise) formData.append('niveauMaitrise', risk.niveauMaitrise);
            if(risk.dmrExistant) formData.append('dmrExistant', risk.dmrExistant);
            if(risk.planActionTraitement) formData.append('planActionTraitement', risk.planActionTraitement);
            
            formData.append('niveauRisque', risk.niveauRisque || RiskLevel.MEDIUM);
            formData.append('departementId', risk.deptId.toString());
            formData.append('dateEcheance', risk.suggestedDate || this.today);
            formData.append('responsableTraitementId', risk.manualResponsableId);
            
            let freq = risk.frequenceTraitement;
            if (!Object.values(PeriodicFrequency).includes(freq)) {
                freq = PeriodicFrequency.NONE;
            }
            formData.append('frequenceTraitement', freq);

            this.riskService.createRisk(formData).subscribe(() => {
                completed++;
                if (completed === selected.length) {
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
            responsableTraitementId: '',
            frequenceTraitement: PeriodicFrequency.NONE,
            prochaineEcheance: ''
        };
        this.selectedFile = null;
        this.aiFile = null;
        this.aiFileError = '';
        this.aiMode = 'text';
        this.filteredAgents = [];
    }

    getStatusCount(statut: string): number {
        return this.risks.filter(r => r.statut === statut).length;
    }

    getLevelCount(niveau: string): number {
        return this.risks.filter(r => r.niveauRisque === niveau).length;
    }

    downloadReport() {
        // This is now replaced by the dropdown options
    }

    exportToXLSX() {
        this.showExportMenu = false;
        const data = this.risks.map(r => ({
            'Titre': r.titre,
            'Domaine': r.domaine,
            'Niveau': r.niveauRisque,
            'Statut': r.statut,
            'Responsable': `${r.responsableTraitement?.prenom || ''} ${r.responsableTraitement?.nom || ''}`.trim(),
            'Agent': r.riskAgent ? `${r.riskAgent.prenom} ${r.riskAgent.nom}` : 'Non assigné',
            'Date Echéance': new Date(r.dateEcheance).toLocaleDateString('fr-FR'),
            'Date Création': new Date(r.createdAt).toLocaleDateString('fr-FR')
        }));

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Risques');
        XLSX.writeFile(wb, `rapport-risques-${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportToPDF() {
        this.showExportMenu = false;
        const doc = new jsPDF('l', 'mm', 'a4');

        doc.setFontSize(18);
        doc.text('Rapport des Risques', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

        const head = [['Titre', 'Domaine', 'Niveau', 'Statut', 'Responsable', 'Agent', 'Échéance']];
        const rows = this.risks.map(r => [
            r.titre,
            r.domaine,
            r.niveauRisque,
            r.statut,
            `${r.responsableTraitement?.prenom || ''} ${r.responsableTraitement?.nom || ''}`.trim(),
            r.riskAgent ? `${r.riskAgent.prenom} ${r.riskAgent.nom}` : 'Non assigné',
            new Date(r.dateEcheance).toLocaleDateString('fr-FR')
        ]);

        autoTable(doc, {
            startY: 35,
            head: head,
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });

        doc.save(`rapport-risques-${new Date().toISOString().split('T')[0]}.pdf`);
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
