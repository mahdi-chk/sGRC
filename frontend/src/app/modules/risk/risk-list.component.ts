import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk } from '../../core/services/risk.service';

@Component({
    selector: 'app-risk-list',
    templateUrl: './risk-list.component.html',
    styleUrls: ['./risk-list.component.scss']
})
export class RiskListComponent implements OnInit {
    allRisks: Risk[] = [];
    filteredRisks: Risk[] = [];

    // Filter properties
    filterSearch = '';
    filterLevel: string = '';
    filterStatus: string = '';
    filterDomain: string = '';

    // Unique values for filters
    levels: string[] = ['Faible', 'Moyen', 'Élevé', 'Critique'];
    statuses: string[] = ['Ouvert', 'En cours', 'Traité', 'Clôturé'];
    domains: string[] = [];

    selectedRisk: Risk | null = null;
    showDetailModal = false;

    // Pagination
    pageSize = 10;
    currentPage = 1;
    totalPages = 1;

    constructor(private riskService: RiskService, private router: Router) { }

    ngOnInit() {
        this.loadRisks();
    }

    loadRisks() {
        this.riskService.getRisks().subscribe(risks => {
            this.allRisks = risks;

            // Extract unique domains for filter dropdown
            this.domains = [...new Set(risks.map(r => r.domaine))].filter(d => d);

            this.applyFilters();
        });
    }

    applyFilters() {
        this.filteredRisks = this.allRisks.filter(risk => {
            const matchSearch = risk.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                risk.explication.toLowerCase().includes(this.filterSearch.toLowerCase());
            const matchLevel = !this.filterLevel || risk.niveauRisque === this.filterLevel;
            const matchStatus = !this.filterStatus || risk.statut === this.filterStatus;
            const matchDomain = !this.filterDomain || risk.domaine === this.filterDomain;

            return matchSearch && matchLevel && matchStatus && matchDomain;
        });

        this.totalPages = Math.ceil(this.filteredRisks.length / this.pageSize);
        this.currentPage = 1;
    }

    getPaginatedRisks(): Risk[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredRisks.slice(startIndex, startIndex + this.pageSize);
    }

    onSearchChange(value: string) {
        this.filterSearch = value;
        this.applyFilters();
    }

    onFilterChange() {
        this.applyFilters();
    }

    clearFilters() {
        this.filterSearch = '';
        this.filterLevel = '';
        this.filterStatus = '';
        this.filterDomain = '';
        this.applyFilters();
    }

    viewRiskDetails(risk: Risk) {
        this.selectedRisk = risk;
        this.showDetailModal = true;
    }

    closeDetailModal() {
        this.showDetailModal = false;
        this.selectedRisk = null;
    }

    treatRisk(risk: Risk) {
        // Navigate to treatment page or open the treatment modal
        this.router.navigate(['/risks/treat', risk.id]);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
}
