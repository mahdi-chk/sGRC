import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    RiskService,
    Risk,
    RISK_LEVEL_LABELS,
    RISK_LEVEL_OPTIONS,
    RISK_STATUS_LABELS,
    RISK_STATUS_OPTIONS
} from '../../core/services/risk.service';

@Component({
    selector: 'app-risk-list',
    templateUrl: './risk-list.component.html',
    styleUrls: ['./risk-list.component.scss']
})
export class RiskListComponent implements OnInit {
    allRisks: Risk[] = [];
    filteredRisks: Risk[] = [];

    filterSearch = '';
    filterLevel = '';
    filterStatus = '';
    filterDomain = '';

    levelOptions = RISK_LEVEL_OPTIONS;
    statusOptions = RISK_STATUS_OPTIONS;
    levelLabelMap = RISK_LEVEL_LABELS;
    statusLabelMap = RISK_STATUS_LABELS;
    domains: string[] = [];

    selectedRisk: Risk | null = null;
    showDetailModal = false;

    pageSize = 10;
    currentPage = 1;
    totalPages = 1;

    constructor(private riskService: RiskService, private router: Router) { }

    ngOnInit() {
        this.loadRisks();
    }

    loadRisks() {
        this.riskService.getRisks().subscribe((risks) => {
            this.allRisks = risks;
            this.domains = [...new Set(risks.map((risk) => risk.domaine))].filter((domain): domain is string => !!domain);
            this.applyFilters();
        });
    }

    normalize(value: any): string {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return (value.code || '').toString().toLowerCase().trim();
        return value.toString().toLowerCase().trim();
    }

    applyFilters() {
        this.filteredRisks = this.allRisks.filter((risk) => {
            const search = this.normalize(this.filterSearch);
            const titre = this.normalize(risk.titre);
            const explication = this.normalize(risk.explication);
            const domaine = this.normalize(risk.domaine);

            const matchSearch = !search || titre.includes(search) || explication.includes(search) || domaine.includes(search);
            const riskLevel = this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque);
            const matchLevel = !this.filterLevel || riskLevel === this.normalize(this.filterLevel);
            const riskStatus = this.normalize((risk as any).statutCode || risk.statut);
            const matchStatus = !this.filterStatus || riskStatus === this.normalize(this.filterStatus);
            const matchDomain = !this.filterDomain || domaine === this.normalize(this.filterDomain);

            return matchSearch && matchLevel && matchStatus && matchDomain;
        });

        this.totalPages = Math.max(1, Math.ceil(this.filteredRisks.length / this.pageSize));
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
        this.router.navigate(['/risks/treat', risk.id]);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }

    getStatusClass(risk: any): string {
        const status = this.normalize(risk?.statutCode || risk?.statut);
        return `badge status-${status}`;
    }

    getNiveauClass(risk: any): string {
        const level = this.normalize(risk?.niveauRisqueCode || risk?.niveauRisque);
        return `badge level-${level}`;
    }

    getNiveauLabel(risk: any): string {
        const level = this.normalize(risk?.niveauRisqueCode || risk?.niveauRisque);
        return this.levelLabelMap[level] || risk?.niveauRisqueLabel || risk?.niveauRisque || '';
    }

    getStatusLabel(risk: any): string {
        const status = this.normalize(risk?.statutCode || risk?.statut);
        return this.statusLabelMap[status] || risk?.statutLabel || risk?.statut || '';
    }
}
