import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk, RiskStatus } from '../../../../core/services/risk.service';
import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-assigned-risks',
    templateUrl: './assigned-risks.component.html',
    styleUrls: ['../../../dashboard.component.scss']
})
export class AssignedRisksComponent implements OnInit {
    environment = environment;
    assignedRisks: Risk[] = [];
    selectedRisk: Risk | null = null;
    showTreatmentModal = false;
    showDetailsModal = false;
    isAssigning = false;

    treatmentContent = '';
    selectedFile: File | null = null;
    comments: any[] = [];

    stats = {
        total: 0,
        unprocessed: 0,
        urgent: 0
    };
    currentUser: any;

    get authQueryToken(): string {
        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }

    constructor(
        private riskService: RiskService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            this.loadAssignedRisks();
        });
    }

    loadAssignedRisks() {
        this.riskService.getRisks().subscribe(risks => {
            if (this.currentUser) {
                this.assignedRisks = risks.filter(r => r.riskAgentId === this.currentUser.id);
            } else {
                this.assignedRisks = risks;
            }
            this.calculateStats();
        });
    }

    calculateStats() {
        this.stats.total = this.assignedRisks.length;
        this.stats.unprocessed = this.assignedRisks.filter(r =>
            this.isActiveRiskStatus(r.statutCode || r.statut)
        ).length;

        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const urgentRisks = this.assignedRisks.filter(r => {
            if (this.isCompletedRiskStatus(r.statutCode || r.statut)) return false;
            const dueDate = new Date(r.dateEcheance);
            return dueDate <= nextWeek;
        });

        this.stats.urgent = urgentRisks.length;
    }

    openTreatment(risk: Risk) {
        this.selectedRisk = risk;
        this.showTreatmentModal = true;
        this.loadComments(risk.id);
    }

    openDetails(risk: Risk) {
        this.selectedRisk = risk;
        this.showDetailsModal = true;
    }

    loadComments(riskId: number) {
        this.riskService.getComments(riskId).subscribe(comments => this.comments = comments);
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    addTreatment() {
        if (!this.selectedRisk) return;

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

    markAsTreated() {
        if (!this.selectedRisk) return;
        this.riskService.updateStatus(this.selectedRisk.id, RiskStatus.TREATED).subscribe(() => {
            this.showTreatmentModal = false;
            this.loadAssignedRisks();
        });
    }

    downloadIncident() {
        if (!this.selectedRisk) return;
        this.riskService.exportIncident(this.selectedRisk.id).subscribe((blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fiche_Incident_${this.selectedRisk!.id}.xlsm`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, error => {
            console.error('Erreur lors du téléchargement de la fiche incident:', error);
            alert('Erreur lors de la génération de la fiche incident');
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    private isActiveRiskStatus(status?: string | null): boolean {
        const normalizedStatus = this.normalizeStatus(status);
        return normalizedStatus === RiskStatus.OPEN || normalizedStatus === RiskStatus.IN_PROGRESS;
    }

    private isCompletedRiskStatus(status?: string | null): boolean {
        const normalizedStatus = this.normalizeStatus(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }

    private normalizeStatus(status?: string | null): string {
        return (status || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
