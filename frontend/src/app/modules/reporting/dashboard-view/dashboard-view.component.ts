import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { KPI, ReportingService, ReportingStats } from '../../../core/services/reporting.service';
import { RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import { RadarChartSeries } from '../../../shared/components/radar-chart/radar-chart.component';

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
    globalRadarSeries: RadarChartSeries[] = [];
    readonly globalRadarLabels = [
        'Risques traites',
        'Exposition faible',
        'Incidents maitrises',
        'SLA incidents',
        'Avancement audit',
        'Audits sans retard',
    ];
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
                this.refreshGlobalRadarSeries();
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
        const kpi = this.kpis.find((item) => item.id === id);
        const value = Number(kpi?.value || 0);

        if (kpi?.unit === '%') {
            return Math.max(0, Math.min(100, value));
        }

        const target = Number(kpi?.target || 0);
        if (target > 0) {
            const ratio = kpi?.inverseTarget
                ? Math.max(0, 100 - Math.round((value / target) * 100))
                : Math.round((value / target) * 100);
            return Math.max(4, Math.min(100, ratio));
        }

        return value > 0 ? 35 : 4;
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

    refreshGlobalRadarSeries(): void {
        if (!this.stats) {
            this.globalRadarSeries = [];
            return;
        }

        const riskTreated = this.getStatusCount(RiskStatus.TREATED) + this.getStatusCount(RiskStatus.CLOSED);
        const incidentsManaged = this.stats.incidents.total - this.stats.incidents.sla.open;
        const auditWithoutOverdue = this.stats.audits.total - this.stats.audits.progress.overdue;

        this.globalRadarSeries = [
            {
                label: 'Performance actuelle',
                values: [
                    this.getPercent(riskTreated, this.stats.risks.total),
                    Math.max(0, 100 - Number(this.stats.risks.exposure.score || 0)),
                    this.getPercent(incidentsManaged, this.stats.incidents.total),
                    Math.max(0, 100 - this.getPercent(this.stats.incidents.sla.overdue, this.stats.incidents.total)),
                    Number(this.stats.audits.progress.average || 0),
                    this.getPercent(auditWithoutOverdue, this.stats.audits.total),
                ],
                color: '#2563eb',
                fillColor: 'rgba(37, 99, 235, 0.18)',
            },
            {
                label: 'Objectif cible',
                values: [80, 75, 85, 95, 80, 95],
                color: '#f59e0b',
                fillColor: 'rgba(245, 158, 11, 0.12)',
            },
        ];
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
