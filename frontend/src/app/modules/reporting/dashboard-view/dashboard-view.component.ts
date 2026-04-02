import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportingService, ReportingStats } from '../../../core/services/reporting.service';
import { RiskLevel, RiskStatus } from '../../../core/services/risk.service';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit {
    stats: ReportingStats | null = null;
    isLoading = true;

    readonly riskLevelOrder = [
        RiskLevel.LOW,
        RiskLevel.LIMITED,
        RiskLevel.MEDIUM,
        RiskLevel.HIGH,
        RiskLevel.CRITICAL,
    ];

    readonly riskLevelLabels: Record<string, string> = {
        [RiskLevel.LOW]: 'Faible',
        [RiskLevel.LIMITED]: 'Limité',
        [RiskLevel.MEDIUM]: 'Moyen',
        [RiskLevel.HIGH]: 'Élevé',
        [RiskLevel.CRITICAL]: 'Critique',
    };

    readonly riskLevelAliases: Record<string, RiskLevel> = {
        low: RiskLevel.LOW,
        faible: RiskLevel.LOW,
        limited: RiskLevel.LIMITED,
        limite: RiskLevel.LIMITED,
        medium: RiskLevel.MEDIUM,
        moyen: RiskLevel.MEDIUM,
        high: RiskLevel.HIGH,
        eleve: RiskLevel.HIGH,
        critical: RiskLevel.CRITICAL,
        critique: RiskLevel.CRITICAL,
    };

    readonly riskStatusLabels: Record<string, string> = {
        [RiskStatus.OPEN]: 'Ouvert',
        [RiskStatus.IN_PROGRESS]: 'En cours',
        [RiskStatus.TREATED]: 'Traité',
        [RiskStatus.CLOSED]: 'Clôturé',
    };

    constructor(
        private reportingService: ReportingService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats() {
        this.isLoading = true;
        this.reportingService.getStats().subscribe(
            (data) => {
                this.stats = data;
                this.isLoading = false;
            },
            (error) => {
                console.error('Error loading stats', error);
                this.isLoading = false;
            },
        );
    }

    getPercent(value: number, total: number): number {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    }

    getRiskLevelCount(code: RiskLevel): number {
        const entry = this.stats?.risks.byLevel?.find((level) => this.resolveRiskLevel(level?.code) === code);
        return Number(entry?.count || 0);
    }

    getRiskLevelLabel(level: any): string {
        if (level?.label) {
            return level.label;
        }

        const code = this.resolveRiskLevel(level?.code || level?.niveauRisque || level);
        return code ? this.riskLevelLabels[code] : 'Non défini';
    }

    getRiskLevelClass(level: any): string {
        return this.resolveRiskLevel(level?.code || level?.niveauRisque || level) || 'default';
    }

    getRiskStatusLabel(status: any): string {
        if (status?.label) {
            return status.label;
        }

        const normalized = this.normalize(status?.code || status?.statut || status);
        return this.riskStatusLabels[normalized] || status?.statut || status?.code || status || 'Non défini';
    }

    getStatusClass(status: any): string {
        return this.normalize(status?.code || status?.statut || status) || 'default';
    }

    goBack() {
        this.router.navigate(['/dashboard']);
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

    private resolveRiskLevel(level?: string | null): RiskLevel | null {
        const normalized = this.normalize(level);
        return this.riskLevelAliases[normalized] || null;
    }
}
