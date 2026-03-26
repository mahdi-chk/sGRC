import { Component, OnInit } from '@angular/core';
import { RiskService, Risk, RiskLevel, RiskStatus, RiskProbability, RiskImpact } from '../../../../core/services/risk.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-risk-statistics',
    templateUrl: './risk-statistics.component.html',
    styleUrls: ['../../../dashboard.component.scss']
})
export class RiskStatisticsComponent implements OnInit {
    risks: Risk[] = [];

    // Stats for Charts
    levelStats: { [key: string]: number } = {};
    statusStats: { [key: string]: number } = {};
    domainStats: { [key: string]: number } = {};
    deptStats: { [key: string]: number } = {};

    totalRisks: number = 0;
    criticalRate: number = 0;
    treatmentRate: number = 0;
    avgMaturity: number = 0;
    showExportMenu = false;
    matrixRowTotals: number[] = [0, 0, 0, 0];
    matrixColTotals: number[] = [0, 0, 0, 0];
    criticalExposureCount: number = 0;
    dominantProbabilityLabel: string = '-';
    dominantImpactLabel: string = '-';
    topZoneLabel: string = '-';
    topZoneCount: number = 0;
    topZoneShare: number = 0;
    showMatrixDetailsModal = false;
    selectedMatrixRow = -1;
    selectedMatrixCol = -1;
    selectedMatrixRisks: Risk[] = [];

    readonly probabilityLabels = ['Permanent', 'Probable', 'Possible', 'Rare'];
    readonly impactLabels = ['Limité', 'Moyen', 'Significatif', 'Critique'];

    // 4x4 Matrix for Heat Map (Rows = Probabilite, Cols = Impact)
    // Probabilités: Permanent (0), Probable (1), Possible (2), Rare (3)
    // Impacts: Limité (0), Moyen (1), Significatif (2), Critique (3)
    riskMatrix: number[][] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    constructor(private riskService: RiskService, private router: Router) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.totalRisks = risks.length;
            this.calculateStats();
        });
    }

    calculateStats() {
        this.levelStats = {
            'Faible': 0,
            'Moyen': 0,
            'Élevé': 0,
            'Critique': 0
        };

        this.statusStats = {
            'Ouvert': 0,
            'En cours': 0,
            'Traité': 0,
            'Clôturé': 0
        };

        this.domainStats = {};
        this.deptStats = {};

        this.riskMatrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.matrixRowTotals = [0, 0, 0, 0];
        this.matrixColTotals = [0, 0, 0, 0];
        this.criticalExposureCount = 0;
        this.dominantProbabilityLabel = '-';
        this.dominantImpactLabel = '-';
        this.topZoneLabel = '-';
        this.topZoneCount = 0;
        this.topZoneShare = 0;

        this.risks.forEach(r => {
            if (this.levelStats[r.niveauRisque] !== undefined) this.levelStats[r.niveauRisque]++;
            if (this.statusStats[r.statut] !== undefined) this.statusStats[r.statut]++;

            const domain = r.domaine || 'Général';
            this.domainStats[domain] = (this.domainStats[domain] || 0) + 1;

            const dept = r.departement?.nom || 'Non spécifié';
            this.deptStats[dept] = (this.deptStats[dept] || 0) + 1;

            // Populate Matrix
            let row = -1;
            let col = -1;
            
            switch (r.probabilite) {
                case RiskProbability.PERMANENT: row = 0; break;
                case RiskProbability.PROBABLE: row = 1; break;
                case RiskProbability.POSSIBLE: row = 2; break;
                case RiskProbability.RARE: row = 3; break;
            }

            switch (r.impact) {
                case RiskImpact.LIMITÉ: col = 0; break;
                case RiskImpact.MOYEN: col = 1; break;
                case RiskImpact.SIGNIFICATIF: col = 2; break;
                case RiskImpact.CRITIQUE: col = 3; break;
            }

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

        const criticalCount = this.levelStats['Critique'] || 0;
        this.criticalRate = this.totalRisks > 0 ? Math.round((criticalCount / this.totalRisks) * 100) : 0;

        const treatedCount = (this.statusStats['Traité'] || 0) + (this.statusStats['Clôturé'] || 0);
        this.treatmentRate = this.totalRisks > 0 ? Math.round((treatedCount / this.totalRisks) * 100) : 0;

        this.avgMaturity = RiskService.calculateMaturityIndex(this.risks);
    }

    computeMatrixHighlights() {
        const topRowIndex = this.getMaxIndex(this.matrixRowTotals);
        const topColIndex = this.getMaxIndex(this.matrixColTotals);
        const topCell = this.getTopMatrixCell();

        this.dominantProbabilityLabel = topRowIndex === -1 ? '-' : this.probabilityLabels[topRowIndex];
        this.dominantImpactLabel = topColIndex === -1 ? '-' : this.impactLabels[topColIndex];

        if (topCell) {
            this.topZoneLabel = `${this.probabilityLabels[topCell.row]} x ${this.impactLabels[topCell.col]}`;
            this.topZoneCount = topCell.count;
            this.topZoneShare = this.getMatrixShare(topCell.count);
        }
    }

    getMaxIndex(values: number[]): number {
        if (!values.length || values.every(value => value === 0)) return -1;
        return values.reduce((maxIndex, value, index, array) => value > array[maxIndex] ? index : maxIndex, 0);
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

        if (bestCount > 0) {
            return { row: bestRow, col: bestCol, count: bestCount };
        }

        return null;
    }

    getMatrixShare(count: number): number {
        return this.totalRisks > 0 ? Math.round((count / this.totalRisks) * 100) : 0;
    }

    openMatrixCellDetails(row: number, col: number) {
        this.selectedMatrixRow = row;
        this.selectedMatrixCol = col;
        this.selectedMatrixRisks = this.risks.filter(risk =>
            this.getMatrixRowIndex(risk) === row && this.getMatrixColIndex(risk) === col
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

        return `${this.probabilityLabels[this.selectedMatrixRow]} x ${this.impactLabels[this.selectedMatrixCol]}`;
    }

    getMatrixRowIndex(risk: Risk): number {
        switch (risk.probabilite) {
            case RiskProbability.PERMANENT: return 0;
            case RiskProbability.PROBABLE: return 1;
            case RiskProbability.POSSIBLE: return 2;
            case RiskProbability.RARE: return 3;
            default: return -1;
        }
    }

    getMatrixColIndex(risk: Risk): number {
        switch (risk.impact) {
            case 'Limit\u00E9': return 0;
            case RiskImpact.MOYEN: return 1;
            case RiskImpact.SIGNIFICATIF: return 2;
            case RiskImpact.CRITIQUE: return 3;
            default: return -1;
        }
    }

    getRiskLevelClass(level?: string | null): string {
        switch (level) {
            case 'Critique': return 'critical';
            case '\u00C9lev\u00E9': return 'high';
            case 'Moyen': return 'medium';
            case 'Faible': return 'low';
            default: return 'default';
        }
    }

    // Helper for CSS Pie Charts
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
            ['Vue d\'ensemble', 'Total Risques', this.totalRisks],
            ['Vue d\'ensemble', 'Taux de Traitement', this.treatmentRate + '%'],
            ['Vue d\'ensemble', 'Niveau de Maturité', this.avgMaturity + '/5'],
            ['Vue d\'ensemble', 'Taux de Risques Critiques', this.criticalRate + '%'],
            [''],
            ['Distribution par Sévérité', '', ''],
            ...Object.entries(this.levelStats).map(([k, v]) => ['Sévérité', k, v]),
            [''],
            ['État d\'Avancement', '', ''],
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v]),
            [''],
            ['Distribution par Domaine', '', ''],
            ...Object.entries(this.domainStats).map(([k, v]) => ['Domaine', k, v]),
            [''],
            ['Distribution par Département', '', ''],
            ...Object.entries(this.deptStats).map(([k, v]) => ['Département', k, v])
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Statistiques Risques');
        XLSX.writeFile(wb, `statistiques_risques_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportToPDF() {
        this.showExportMenu = false;
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.setFontSize(18);
        doc.text('Statistiques des Risques', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

        const overviewData = [
            ['Risques Totaux', this.totalRisks.toString()],
            ['Taux de Traitement', this.treatmentRate + '%'],
            ['Indice de Maturité', this.avgMaturity + '/5'],
            ['Taux Critiques', this.criticalRate + '%']
        ];

        autoTable(doc, {
            startY: 40,
            head: [['Métrique', 'Valeur']],
            body: overviewData,
            theme: 'grid',
            headStyles: { fillColor: [0, 74, 153] }
        });

        // Distribution sections
        let finalY = (doc as any).lastAutoTable.finalY + 15;

        const sections = [
            { title: 'Distribution par Sévérité', data: this.levelStats, head: ['Sévérité', 'Nombre'] },
            { title: 'État d\'Avancement', data: this.statusStats, head: ['Statut', 'Nombre'] }
        ];

        sections.forEach(section => {
            if (finalY > 240) { doc.addPage(); finalY = 20; }
            doc.setFontSize(14);
            doc.text(section.title, 14, finalY);
            autoTable(doc, {
                startY: finalY + 5,
                head: [section.head],
                body: Object.entries(section.data).map(([k, v]) => [k, v.toString()]),
                theme: 'striped',
                headStyles: { fillColor: [0, 74, 153] }
            });
            finalY = (doc as any).lastAutoTable.finalY + 15;
        });

        doc.save(`statistiques_risques_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
