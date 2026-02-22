import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk, RiskStatus } from '../../../../core/services/risk.service';

@Component({
    selector: 'app-assigned-risks',
    templateUrl: './assigned-risks.component.html',
    styles: []
})
export class AssignedRisksComponent implements OnInit {
    assignedRisks: Risk[] = [];
    selectedRisk: Risk | null = null;
    showTreatmentModal = false;
    showDetailsModal = false;

    treatmentContent = '';
    selectedFile: File | null = null;
    comments: any[] = [];

    constructor(private riskService: RiskService, private router: Router) { }

    ngOnInit() {
        this.loadAssignedRisks();
    }

    loadAssignedRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.assignedRisks = risks;
        });
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

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
