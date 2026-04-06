import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { RiskService, Risk, RiskStatus, RiskLevel } from '../../core/services/risk.service';

import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-strategic-evaluation',
    templateUrl: './strategic-evaluation.component.html',
    styleUrls: ['./strategic-evaluation.component.scss']
})
export class StrategicEvaluationComponent implements OnInit {
    environment = environment;
    showExportMenu = false;
    risks: (Risk & { treatments?: any[] })[] = [];
    filteredRisks: (Risk & { treatments?: any[] })[] = [];
    isEvaluating = false;
    aiResults: any[] = [];

    // Filtres
    searchTerm: string = '';
    statusFilter: string = '';
    levelFilter: string = '';

    // Modal Historique
    showHistoryModal = false;
    selectedRiskForHistory: (Risk & { treatments?: any[] }) | null = null;
    today = new Date().toISOString().split('T')[0];

    // Expose Enums to templates
    RiskStatus = RiskStatus;
    RiskLevel = RiskLevel;

    // Label mappings for UI
    statusLabelMap: Record<string, string> = {
        [RiskStatus.OPEN]: 'Ouvert',
        [RiskStatus.IN_PROGRESS]: 'En cours',
        [RiskStatus.TREATED]: 'Traité',
        [RiskStatus.CLOSED]: 'Clôturé'
    };

    levelLabelMap: Record<string, string> = {
        [RiskLevel.LOW]: 'Faible',
        [RiskLevel.LIMITED]: 'Limité',
        [RiskLevel.MEDIUM]: 'Moyen',
        [RiskLevel.HIGH]: 'Élevé',
        [RiskLevel.CRITICAL]: 'Critique'
    };


    get authQueryToken(): string {

        const token = sessionStorage.getItem('sgrc_token');
        return token ? '?token=' + token : '';
    }

    constructor(
        private riskService: RiskService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRisks();
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.applyFilters();
            this.loadTreatments();
        });
    }

    loadTreatments() {
        const commentRequests = this.risks.map(risk =>
            this.riskService.getComments(risk.id).pipe(
                catchError(() => of([]))
            )
        );

        if (commentRequests.length === 0) return;

        forkJoin(commentRequests).subscribe((results: any[]) => {
            this.risks = this.risks.map((risk, index) => ({
                ...risk,
                treatments: results[index] || []
            }));
            this.applyFilters();
        });
    }

    applyFilters() {
        this.filteredRisks = this.risks.filter(risk => {
            const matchesSearch = !this.searchTerm ||
                risk.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (risk.departement?.nom && risk.departement.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));

            const riskStatut = ((risk as any).statutCode || risk.statut || '').toLowerCase();
            const filterStatut = (this.statusFilter || '').toLowerCase();
            const matchesStatus = !filterStatut || riskStatut === filterStatut;

            const riskLevel = ((risk as any).niveauRisqueCode || risk.niveauRisque || '').toLowerCase();
            const filterLevel = (this.levelFilter || '').toLowerCase();
            const matchesLevel = !filterLevel || riskLevel === filterLevel;

            return matchesSearch && matchesStatus && matchesLevel;
        });
    }


    onFilterChange() {
        this.applyFilters();
    }

    clearFilters() {
        this.searchTerm = '';
        this.statusFilter = '';
        this.levelFilter = '';
        this.applyFilters();
    }


    openHistory(risk: (Risk & { treatments?: any[] })) {
        this.selectedRiskForHistory = risk;
        this.showHistoryModal = true;
    }

    closeHistory() {
        this.showHistoryModal = false;
        this.selectedRiskForHistory = null;
    }

    evaluateRisks() {
        const ids = this.risks.map(r => r.id);
        if (ids.length === 0) return;

        this.isEvaluating = true;
        this.riskService.evaluateRisks(ids).subscribe({
            next: (results) => {
                this.aiResults = results;
                this.isEvaluating = false;
            },
            error: (err) => {
                console.error(err);
                this.isEvaluating = false;
                alert("Erreur lors de l'analyse IA.");
            }
        });
    }

    getAiResult(riskId: number) {
        // First check in recent AI results
        const recent = this.aiResults.find(r => r.riskId === riskId);
        if (recent) return recent;

        // Otherwise check in saved risk data
        const risk = this.risks.find(r => r.id === riskId);
        if (risk && risk.aiAnalysisScore !== undefined && risk.aiAnalysisScore !== null) {
            return {
                priorite: risk.aiAnalysisScore,
                impact: risk.aiAnalysisImpact,
                tendance: risk.aiAnalysisTendance,
                suggestion: risk.aiAnalysisSuggestion,
                date: risk.aiAnalysisDate
            };
        }
        return null;
    }

    getHighPriorityCount(): number {
        return this.aiResults.filter(r => r.priorite >= 7).length;
    }

    getTreatedCount(): number {
        return this.risks.filter(r => this.isCompletedRiskStatus((r as any).statutCode || r.statut)).length;
    }


    goBack() {
        this.router.navigate(['/dashboard']);
    }

    exportToXLSX() {
        const dataToExport = this.filteredRisks.map(r => {
            const ai = this.getAiResult(r.id);
            const lastTreatment = r.treatments && r.treatments.length > 0
                ? r.treatments[r.treatments.length - 1].content
                : 'N/A';

            return {
                'Risque': r.titre,
                'Département': r.departement?.nom || 'N/A',
                'Statut': this.statusLabelMap[r.statut] || r.statut,
                'Sévérité': this.levelLabelMap[r.niveauRisque!] || r.niveauRisque,
                'Dernier Traitement': lastTreatment,
                'Score IA': ai?.priorite ? `${ai.priorite}/10` : 'N/A',
                'Impact IA': ai?.impact || 'N/A',
                'Tendance IA': ai?.tendance || 'N/A',
                'Suggestion IA': ai?.suggestion || 'N/A'

            };
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Evaluation_Strategique');
        XLSX.writeFile(wb, `Export_Evaluation_Strategique_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }

    exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4'); // Landscape for more space
        const datePipe = new DatePipe('en-US');

        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text("Rapport d'Évaluation Stratégique IA", 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);

        const columns = ['Risque', 'Département', 'Statut', 'Sévérité', 'Score IA', 'Analyse & Suggestion IA'];
        const rows = this.filteredRisks.map(r => {
            const ai = this.getAiResult(r.id);
            const aiText = ai ? `Impact: ${ai.impact}\nTendance: ${ai.tendance}\nSuggestion: ${ai.suggestion}` : 'N/A';
            return [
                r.titre,
                r.departement?.nom || 'N/A',
                this.statusLabelMap[r.statut] || r.statut || 'N/A',
                this.levelLabelMap[r.niveauRisque!] || r.niveauRisque || 'N/A',
                ai?.priorite ? `${ai.priorite}/10` : 'N/A',
                aiText
            ];

        });

        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            columnStyles: {
                5: { cellWidth: 80 } // Increase width for AI analysis
            },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });

        doc.save(`Export_Evaluation_Strategique_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }

    private isCompletedRiskStatus(status?: string | null): boolean {
        const normalizedStatus = this.normalize(status);
        return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
    }

    private normalize(value?: string | null): string {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }

}
