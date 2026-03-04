import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk } from '../../core/services/risk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-strategic-evaluation',
    templateUrl: './strategic-evaluation.component.html',
    styleUrls: ['./strategic-evaluation.component.scss']
})
export class StrategicEvaluationComponent implements OnInit {
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

            const matchesStatus = !this.statusFilter || risk.statut === this.statusFilter;

            const matchesLevel = !this.levelFilter || risk.niveauRisque === this.levelFilter;

            return matchesSearch && matchesStatus && matchesLevel;
        });
    }

    onFilterChange() {
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
        return this.risks.filter(r => r.statut === 'Traité' || r.statut === 'Clôturé').length;
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
