import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
    Risk,
    RiskImpact,
    RiskLevel,
    RiskProbability,
    RiskService,
    RiskStatus,
} from '../../../../core/services/risk.service';

@Component({
    selector: 'app-risk-statistics',
    templateUrl: './risk-statistics.component.html',
    styleUrls: ['../../../dashboard.component.scss'],
})
export class RiskStatisticsComponent implements OnInit {
    risks: Risk[] = [];

    levelStats: Record<string, number> = {};
    statusStats: Record<string, number> = {};
    domainStats: Record<string, number> = {};
    deptStats: Record<string, number> = {};

    totalRisks = 0;
    criticalRate = 0;
    treatmentRate = 0;
    avgMaturity = 0;
    showExportMenu = false;
    matrixRowTotals: number[] = [0, 0, 0, 0];
    matrixColTotals: number[] = [0, 0, 0, 0];
    criticalExposureCount = 0;
    dominantProbabilityLabel = '-';
    dominantImpactLabel = '-';
    topZoneLabel = '-';
    topZoneCount = 0;
    topZoneShare = 0;
    showMatrixDetailsModal = false;
    selectedMatrixRow = -1;
    selectedMatrixCol = -1;
    selectedMatrixRisks: Risk[] = [];

    readonly probabilityOrder = [
        RiskProbability.PERMANENT,
        RiskProbability.PROBABLE,
        RiskProbability.POSSIBLE,
        RiskProbability.RARE,
    ];

    readonly impactOrder = [
        RiskImpact.LIMITED,
        RiskImpact.MEDIUM,
        RiskImpact.SIGNIFICANT,
        RiskImpact.CRITICAL,
    ];

    readonly levelOrder = [
        RiskLevel.LOW,
        RiskLevel.LIMITED,
        RiskLevel.MEDIUM,
        RiskLevel.HIGH,
        RiskLevel.CRITICAL,
    ];

    readonly statusOrder = [
        RiskStatus.OPEN,
        RiskStatus.IN_PROGRESS,
        RiskStatus.TREATED,
        RiskStatus.CLOSED,
    ];

    readonly probabilityLabels: Record<string, string> = {
        [RiskProbability.PERMANENT]: 'Permanent',
        [RiskProbability.PROBABLE]: 'Probable',
        [RiskProbability.POSSIBLE]: 'Possible',
        [RiskProbability.RARE]: 'Rare',
    };

    readonly impactLabels: Record<string, string> = {
        [RiskImpact.LIMITED]: 'Limité',
        [RiskImpact.MEDIUM]: 'Moyen',
        [RiskImpact.SIGNIFICANT]: 'Significatif',
        [RiskImpact.CRITICAL]: 'Critique',
    };

    readonly levelLabels: Record<string, string> = {
        [RiskLevel.LOW]: 'Faible',
        [RiskLevel.LIMITED]: 'Limité',
        [RiskLevel.MEDIUM]: 'Moyen',
        [RiskLevel.HIGH]: 'Élevé',
        [RiskLevel.CRITICAL]: 'Critique',
    };

    readonly statusLabels: Record<string, string> = {
        [RiskStatus.OPEN]: 'Ouvert',
        [RiskStatus.IN_PROGRESS]: 'En cours',
        [RiskStatus.TREATED]: 'Traité',
        [RiskStatus.CLOSED]: 'Clôturé',
    };

    readonly probabilityAliases: Record<string, RiskProbability> = {
        permanent: RiskProbability.PERMANENT,
        probable: RiskProbability.PROBABLE,
        possible: RiskProbability.POSSIBLE,
        rare: RiskProbability.RARE,
    };

    readonly impactAliases: Record<string, RiskImpact> = {
        limited: RiskImpact.LIMITED,
        limite: RiskImpact.LIMITED,
        medium: RiskImpact.MEDIUM,
        moyen: RiskImpact.MEDIUM,
        significant: RiskImpact.SIGNIFICANT,
        significatif: RiskImpact.SIGNIFICANT,
        critical: RiskImpact.CRITICAL,
        critique: RiskImpact.CRITICAL,
    };

    readonly levelAliases: Record<string, RiskLevel> = {
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

    readonly statusAliases: Record<string, RiskStatus> = {
        open: RiskStatus.OPEN,
        ouvert: RiskStatus.OPEN,
        in_progress: RiskStatus.IN_PROGRESS,
        encours: RiskStatus.IN_PROGRESS,
        en_cours: RiskStatus.IN_PROGRESS,
        treated: RiskStatus.TREATED,
        traite: RiskStatus.TREATED,
        closed: RiskStatus.CLOSED,
        cloture: RiskStatus.CLOSED,
    };

    riskMatrix: number[][] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    RiskStatus = RiskStatus;
    RiskLevel = RiskLevel;

    constructor(private riskService: RiskService, private router: Router) {}

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.riskService.getRisks().subscribe((risks) => {
            this.risks = risks;
            this.totalRisks = risks.length;
            this.calculateStats();
        });
    }

    calculateStats() {
        this.levelStats = this.levelOrder.reduce<Record<string, number>>((accumulator, code) => {
            accumulator[code] = 0;
            return accumulator;
        }, {});
        this.statusStats = this.statusOrder.reduce<Record<string, number>>((accumulator, code) => {
            accumulator[code] = 0;
            return accumulator;
        }, {});
        this.domainStats = {};
        this.deptStats = {};
        this.riskMatrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.matrixRowTotals = [0, 0, 0, 0];
        this.matrixColTotals = [0, 0, 0, 0];
        this.criticalExposureCount = 0;
        this.dominantProbabilityLabel = '-';
        this.dominantImpactLabel = '-';
        this.topZoneLabel = '-';
        this.topZoneCount = 0;
        this.topZoneShare = 0;

        this.risks.forEach((risk) => {
            const level = this.resolveRiskLevel(risk.niveauRisqueCode || risk.niveauRisque);
            const status = this.resolveRiskStatus(risk.statutCode || risk.statut);
            const row = this.getMatrixRowIndex(risk);
            const col = this.getMatrixColIndex(risk);

            if (level) {
                this.levelStats[level] = (this.levelStats[level] || 0) + 1;
            }

            if (status) {
                this.statusStats[status] = (this.statusStats[status] || 0) + 1;
            }

            const domain = risk.domaine?.trim() || 'Général';
            this.domainStats[domain] = (this.domainStats[domain] || 0) + 1;

            const dept = risk.departement?.nom?.trim() || 'Non spécifié';
            this.deptStats[dept] = (this.deptStats[dept] || 0) + 1;

            if (row !== -1 && col !== -1) {
                this.riskMatrix[row][col]++;
                this.matrixRowTotals[row]++;
                this.matrixColTotals[col]++;

                if ((row <= 1 && col >= 2) || (row === 0 && col === 1)) {
                    this.criticalExposureCount++;
                }
            }
        });

        this.computeMatrixHighlights();

        const criticalCount = this.levelStats[RiskLevel.CRITICAL] || 0;
        this.criticalRate = this.totalRisks > 0 ? Math.round((criticalCount / this.totalRisks) * 100) : 0;

        const treatedCount = (this.statusStats[RiskStatus.TREATED] || 0) + (this.statusStats[RiskStatus.CLOSED] || 0);
        this.treatmentRate = this.totalRisks > 0 ? Math.round((treatedCount / this.totalRisks) * 100) : 0;

        this.avgMaturity = RiskService.calculateMaturityIndex(this.risks);
    }

    computeMatrixHighlights() {
        const topRowIndex = this.getMaxIndex(this.matrixRowTotals);
        const topColIndex = this.getMaxIndex(this.matrixColTotals);
        const topCell = this.getTopMatrixCell();

        this.dominantProbabilityLabel = topRowIndex === -1 ? '-' : this.getProbabilityLabel(this.probabilityOrder[topRowIndex]);
        this.dominantImpactLabel = topColIndex === -1 ? '-' : this.getImpactLabel(this.impactOrder[topColIndex]);

        if (topCell) {
            this.topZoneLabel = `${this.getProbabilityLabel(this.probabilityOrder[topCell.row])} x ${this.getImpactLabel(this.impactOrder[topCell.col])}`;
            this.topZoneCount = topCell.count;
            this.topZoneShare = this.getMatrixShare(topCell.count);
        }
    }

    getMaxIndex(values: number[]): number {
        if (!values.length || values.every((value) => value === 0)) {
            return -1;
        }

        return values.reduce((maxIndex, value, index, array) => (value > array[maxIndex] ? index : maxIndex), 0);
    }

    getTopMatrixCell(): { row: number; col: number; count: number } | null {
        let bestRow = -1;
        let bestCol = -1;
        let bestCount = 0;

        this.riskMatrix.forEach((matrixRow, rowIndex) => {
            matrixRow.forEach((count, colIndex) => {
                if (count > bestCount) {
                    bestCount = count;
                    bestRow = rowIndex;
                    bestCol = colIndex;
                }
            });
        });

        return bestCount > 0 ? { row: bestRow, col: bestCol, count: bestCount } : null;
    }

    getMatrixShare(count: number): number {
        return this.totalRisks > 0 ? Math.round((count / this.totalRisks) * 100) : 0;
    }

    openMatrixCellDetails(row: number, col: number) {
        this.selectedMatrixRow = row;
        this.selectedMatrixCol = col;
        this.selectedMatrixRisks = this.risks.filter(
            (risk) => this.getMatrixRowIndex(risk) === row && this.getMatrixColIndex(risk) === col,
        );
        this.showMatrixDetailsModal = true;
    }

    closeMatrixDetails() {
        this.showMatrixDetailsModal = false;
        this.selectedMatrixRow = -1;
        this.selectedMatrixCol = -1;
        this.selectedMatrixRisks = [];
    }

    getSelectedMatrixTitle(): string {
        if (this.selectedMatrixRow === -1 || this.selectedMatrixCol === -1) {
            return 'Détails de la zone';
        }

        return `${this.getProbabilityLabel(this.probabilityOrder[this.selectedMatrixRow])} x ${this.getImpactLabel(this.impactOrder[this.selectedMatrixCol])}`;
    }

    getMatrixRowIndex(risk: Risk): number {
        const probability = this.resolveProbability(risk.probabilite);
        return probability ? this.probabilityOrder.indexOf(probability) : -1;
    }

    getMatrixColIndex(risk: Risk): number {
        const impact = this.resolveImpact(risk.impact);
        return impact ? this.impactOrder.indexOf(impact) : -1;
    }

    getRiskLevelClass(level?: string | null): string {
        return this.resolveRiskLevel(level) || 'default';
    }

    getStatusClass(status?: string | null): string {
        return this.resolveRiskStatus(status) || 'default';
    }

    getRiskLevelLabel(level?: string | null): string {
        const code = this.resolveRiskLevel(level);
        return code ? this.levelLabels[code] : 'Non défini';
    }

    getStatusLabel(status?: string | null): string {
        const code = this.resolveRiskStatus(status);
        return code ? this.statusLabels[code] : 'Non défini';
    }

    getProbabilityLabel(probability?: string | null): string {
        const code = this.resolveProbability(probability);
        return code ? this.probabilityLabels[code] : 'Non défini';
    }

    getImpactLabel(impact?: string | null): string {
        const code = this.resolveImpact(impact);
        return code ? this.impactLabels[code] : 'Non défini';
    }

    getLevelCount(level: RiskLevel): number {
        return this.levelStats[level] || 0;
    }

    getOrderedStatusEntries(): Array<{ key: RiskStatus; value: number }> {
        return this.statusOrder.map((code) => ({
            key: code,
            value: this.statusStats[code] || 0,
        }));
    }

    getRotation(value: number, total: number): number {
        return total > 0 ? (value / total) * 360 : 0;
    }

    exportCSV() {
        // Replaced by XLSX and PDF
    }

    exportToXLSX() {
        this.showExportMenu = false;

        const rows = [
            ['Catégorie', 'Métrique', 'Valeur'],
            ['Vue d’ensemble', 'Total des risques', this.totalRisks],
            ['Vue d’ensemble', 'Taux de traitement', `${this.treatmentRate}%`],
            ['Vue d’ensemble', 'Indice de maturité', `${this.avgMaturity}/5`],
            ['Vue d’ensemble', 'Taux de risques critiques', `${this.criticalRate}%`],
            [''],
            ['Distribution par sévérité', '', ''],
            ...this.levelOrder.map((code) => ['Sévérité', this.levelLabels[code], this.levelStats[code] || 0]),
            [''],
            ['État d’avancement', '', ''],
            ...this.statusOrder.map((code) => ['Statut', this.statusLabels[code], this.statusStats[code] || 0]),
            [''],
            ['Distribution par domaine', '', ''],
            ...Object.entries(this.domainStats).map(([key, value]) => ['Domaine', key, value]),
            [''],
            ['Distribution par département', '', ''],
            ...Object.entries(this.deptStats).map(([key, value]) => ['Département', key, value]),
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Statistiques risques');
        XLSX.writeFile(wb, `statistiques_risques_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportToPDF() {
        this.showExportMenu = false;
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.setFontSize(18);
        doc.text('Statistiques des risques', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

        const overviewData = [
            ['Risques totaux', this.totalRisks.toString()],
            ['Taux de traitement', `${this.treatmentRate}%`],
            ['Indice de maturité', `${this.avgMaturity}/5`],
            ['Taux critiques', `${this.criticalRate}%`],
        ];

        autoTable(doc, {
            startY: 40,
            head: [['Métrique', 'Valeur']],
            body: overviewData,
            theme: 'grid',
            headStyles: { fillColor: [0, 74, 153] },
        });

        let finalY = (doc as any).lastAutoTable.finalY + 15;

        const sections = [
            {
                title: 'Distribution par sévérité',
                data: this.levelOrder.map((code) => [this.levelLabels[code], (this.levelStats[code] || 0).toString()]),
                head: ['Sévérité', 'Nombre'],
            },
            {
                title: 'État d’avancement',
                data: this.statusOrder.map((code) => [this.statusLabels[code], (this.statusStats[code] || 0).toString()]),
                head: ['Statut', 'Nombre'],
            },
        ];

        sections.forEach((section) => {
            if (finalY > 240) {
                doc.addPage();
                finalY = 20;
            }

            doc.setFontSize(14);
            doc.text(section.title, 14, finalY);
            autoTable(doc, {
                startY: finalY + 5,
                head: [section.head],
                body: section.data,
                theme: 'striped',
                headStyles: { fillColor: [0, 74, 153] },
            });
            finalY = (doc as any).lastAutoTable.finalY + 15;
        });

        doc.save(`statistiques_risques_${new Date().toISOString().split('T')[0]}.pdf`);
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
        return this.levelAliases[normalized] || null;
    }

    private resolveRiskStatus(status?: string | null): RiskStatus | null {
        const normalized = this.normalize(status);
        return this.statusAliases[normalized] || null;
    }

    private resolveProbability(probability?: string | null): RiskProbability | null {
        const normalized = this.normalize(probability);
        return this.probabilityAliases[normalized] || null;
    }

    private resolveImpact(impact?: string | null): RiskImpact | null {
        const normalized = this.normalize(impact);
        return this.impactAliases[normalized] || null;
    }
}
