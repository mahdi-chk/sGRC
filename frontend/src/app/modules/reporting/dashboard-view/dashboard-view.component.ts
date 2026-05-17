import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { KPI, ReportingService, ReportingStats } from '../../../core/services/reporting.service';
import { RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit {
    stats: ReportingStats | null = null;
    kpis: KPI[] = [];
    isLoading = true;
    selectedPeriod = 'all';
    readonly navItems = REPORTING_NAV_ITEMS;
    readonly periodOptions = [
        { value: 'all', label: 'Tout' },
        { value: '30', label: '30 j' },
        { value: '90', label: '90 j' },
        { value: '180', label: '180 j' },
        { value: '365', label: '12 mois' },
    ];

    readonly riskLevelOrder = [
        RiskLevel.LOW,
        RiskLevel.LIMITED,
        RiskLevel.MEDIUM,
        RiskLevel.HIGH,
        RiskLevel.CRITICAL,
    ];

    readonly riskStatusOrder = [
        RiskStatus.OPEN,
        RiskStatus.IN_PROGRESS,
        RiskStatus.TREATED,
        RiskStatus.CLOSED,
    ];

    readonly riskLevelLabels: Record<string, string> = {
        [RiskLevel.LOW]: 'Faible',
        [RiskLevel.LIMITED]: 'Limite',
        [RiskLevel.MEDIUM]: 'Moyen',
        [RiskLevel.HIGH]: 'Eleve',
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
        [RiskStatus.TREATED]: 'Traite',
        [RiskStatus.CLOSED]: 'Cloture',
    };

    constructor(
        private reportingService: ReportingService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.isLoading = true;
        forkJoin({
            stats: this.reportingService.getStats(this.selectedPeriod),
            kpis: this.reportingService.getKpis(this.selectedPeriod),
        }).subscribe(
            ({ stats, kpis }) => {
                this.stats = stats;
                this.kpis = kpis;
                this.isLoading = false;
            },
            (error) => {
                console.error('Error loading reporting dashboard data', error);
                this.isLoading = false;
            },
        );
    }

    setPeriod(period: string): void {
        if (this.selectedPeriod === period) {
            return;
        }

        this.selectedPeriod = period;
        this.loadStats();
    }

    getPercent(value: number, total: number): number {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    }

    getRiskLevelCount(code: RiskLevel): number {
        const entry = this.stats?.risks.byLevel?.find((level) => this.resolveRiskLevel(level?.code) === code);
        return Number(entry?.count || 0);
    }

    getStatusCount(status: RiskStatus): number {
        const entry = this.stats?.risks.byStatus?.find((item) => this.normalize(item?.code) === status);
        return Number(entry?.count || 0);
    }

    getRiskLevelLabel(level: any): string {
        if (level?.label) {
            return level.label;
        }

        const code = this.resolveRiskLevel(level?.code || level?.niveauRisque || level);
        return code ? this.riskLevelLabels[code] : 'Non defini';
    }

    getRiskLevelClass(level: any): string {
        return this.resolveRiskLevel(level?.code || level?.niveauRisque || level) || 'default';
    }

    getRiskStatusLabel(status: any): string {
        if (status?.label) {
            return status.label;
        }

        const normalized = this.normalize(status?.code || status?.statut || status);
        return this.riskStatusLabels[normalized] || status?.statut || status?.code || status || 'Non defini';
    }

    getStatusClass(status: any): string {
        return this.normalize(status?.code || status?.statut || status) || 'default';
    }

    getKpiValue(id: string): number {
        return Number(this.kpis.find((kpi) => kpi.id === id)?.value || 0);
    }

    getKpiUnit(id: string): string {
        return this.kpis.find((kpi) => kpi.id === id)?.unit || '';
    }

    getKpiProgress(id: string): number {
        const value = this.getKpiValue(id);
        return this.getKpiUnit(id) === '%' ? Math.max(0, Math.min(100, value)) : 100;
    }

    getKpiStatus(id: string): string {
        return this.kpis.find((kpi) => kpi.id === id)?.status || 'good';
    }

    getTrendMax(): number {
        const values = (this.stats?.trend || []).reduce((allValues: number[], month) => [
            ...allValues,
            month.risks,
            month.incidents,
            month.audits,
        ], []);

        return Math.max(1, ...values);
    }

    getTrendHeight(value: number): number {
        return Math.max(4, Math.round((value / this.getTrendMax()) * 100));
    }

    getDomainPercent(value: number): number {
        return Math.max(0, Math.min(100, value));
    }

    getMatrixCount(level: RiskLevel, status: RiskStatus): number {
        const entry = this.stats?.risks.matrix?.find((cell) =>
            this.resolveRiskLevel(cell.levelCode || cell.levelLabel) === level &&
            this.normalize(cell.statusCode || cell.statusLabel) === status
        );
        return Number(entry?.count || 0);
    }

    getMatrixTone(level: RiskLevel, status: RiskStatus): string {
        if (level === RiskLevel.CRITICAL && (status === RiskStatus.OPEN || status === RiskStatus.IN_PROGRESS)) {
            return 'tone-critical';
        }

        if (level === RiskLevel.HIGH && (status === RiskStatus.OPEN || status === RiskStatus.IN_PROGRESS)) {
            return 'tone-high';
        }

        if (status === RiskStatus.TREATED || status === RiskStatus.CLOSED) {
            return 'tone-managed';
        }

        return 'tone-neutral';
    }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }

    openRiskMatrix(): void {
        this.router.navigate(['/dashboard/reporting/risk-matrix']);
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
