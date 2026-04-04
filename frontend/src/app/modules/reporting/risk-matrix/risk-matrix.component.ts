import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Risk,
  RiskImpact,
  RiskLevel,
  RiskProbability,
  RiskService,
  RiskStatus,
} from '../../../core/services/risk.service';

@Component({
  selector: 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls: [
    './risk-matrix.component.scss',
    '../../../dashboard/dashboard.component.scss',
  ]
})
export class RiskMatrixComponent implements OnInit {
  risks: Risk[] = [];
  isLoading = true;
  loadError = '';
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

  riskMatrix: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

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

  readonly probabilityLabels: Record<string, string> = {
    [RiskProbability.PERMANENT]: 'Permanent',
    [RiskProbability.PROBABLE]: 'Probable',
    [RiskProbability.POSSIBLE]: 'Possible',
    [RiskProbability.RARE]: 'Rare',
  };

  readonly impactLabels: Record<string, string> = {
    [RiskImpact.LIMITED]: 'Limite',
    [RiskImpact.MEDIUM]: 'Moyen',
    [RiskImpact.SIGNIFICANT]: 'Significatif',
    [RiskImpact.CRITICAL]: 'Critique',
  };

  readonly riskLevelLabels: Record<string, string> = {
    [RiskLevel.LOW]: 'Faible',
    [RiskLevel.LIMITED]: 'Limite',
    [RiskLevel.MEDIUM]: 'Moyen',
    [RiskLevel.HIGH]: 'Eleve',
    [RiskLevel.CRITICAL]: 'Critique',
  };

  readonly riskStatusLabels: Record<string, string> = {
    [RiskStatus.OPEN]: 'Ouvert',
    [RiskStatus.IN_PROGRESS]: 'En cours',
    [RiskStatus.TREATED]: 'Traite',
    [RiskStatus.CLOSED]: 'Cloture',
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

  readonly riskStatusAliases: Record<string, RiskStatus> = {
    open: RiskStatus.OPEN,
    ouvert: RiskStatus.OPEN,
    in_progress: RiskStatus.IN_PROGRESS,
    encours: RiskStatus.IN_PROGRESS,
    en_cours: RiskStatus.IN_PROGRESS,
    treated: RiskStatus.TREATED,
    traite: RiskStatus.TREATED,
    closed: RiskStatus.CLOSED,
    cloture: RiskStatus.CLOSED,
    clos: RiskStatus.CLOSED,
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

  constructor(
    private riskService: RiskService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRisks();
  }

  loadRisks(): void {
    this.isLoading = true;
    this.loadError = '';
    this.riskService.getRisks().subscribe({
      next: (risks) => {
        this.risks = risks;
        this.buildMatrix();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading risk matrix data', error);
        this.loadError = 'Impossible de charger la matrice de risque.';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get totalRisks(): number {
    return this.risks.length;
  }

  get risksOpenCount(): number {
    return this.risks.filter((risk) => this.resolveRiskStatus(risk.statutCode || risk.statut) === RiskStatus.OPEN).length;
  }

  get risksInProgressCount(): number {
    return this.risks.filter((risk) => this.resolveRiskStatus(risk.statutCode || risk.statut) === RiskStatus.IN_PROGRESS).length;
  }

  get risksManagedCount(): number {
    return this.risks.filter((risk) => {
      const status = this.resolveRiskStatus(risk.statutCode || risk.statut);
      return status === RiskStatus.TREATED || status === RiskStatus.CLOSED;
    }).length;
  }

  getMaxIndex(values: number[]): number {
    if (!values.length || values.every((value) => value === 0)) {
      return -1;
    }

    return values.reduce((maxIndex, value, index, array) => (
      value > array[maxIndex] ? index : maxIndex
    ), 0);
  }

  getMatrixShare(count: number): number {
    return this.totalRisks > 0 ? Math.round((count / this.totalRisks) * 100) : 0;
  }

  openMatrixCellDetails(row: number, col: number): void {
    this.selectedMatrixRow = row;
    this.selectedMatrixCol = col;
    this.selectedMatrixRisks = this.risks.filter(
      (risk) => this.getMatrixRowIndex(risk) === row && this.getMatrixColIndex(risk) === col
    );
    this.showMatrixDetailsModal = true;
  }

  closeMatrixDetails(): void {
    this.showMatrixDetailsModal = false;
    this.selectedMatrixRow = -1;
    this.selectedMatrixCol = -1;
    this.selectedMatrixRisks = [];
  }

  getSelectedMatrixTitle(): string {
    if (this.selectedMatrixRow === -1 || this.selectedMatrixCol === -1) {
      return 'Details de la zone';
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
    const resolved = this.resolveRiskLevel(level);
    return resolved ? this.riskLevelLabels[resolved] : 'Non defini';
  }

  getRiskStatusLabel(status?: string | null): string {
    const resolved = this.resolveRiskStatus(status);
    return resolved ? this.riskStatusLabels[resolved] : 'Non defini';
  }

  getProbabilityLabel(probability?: string | null): string {
    const resolved = this.resolveProbability(probability);
    return resolved ? this.probabilityLabels[resolved] : 'Non defini';
  }

  getImpactLabel(impact?: string | null): string {
    const resolved = this.resolveImpact(impact);
    return resolved ? this.impactLabels[resolved] : 'Non defini';
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

  private buildMatrix(): void {
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
      const row = this.getMatrixRowIndex(risk);
      const col = this.getMatrixColIndex(risk);

      if (row === -1 || col === -1) {
        return;
      }

      this.riskMatrix[row][col]++;
      this.matrixRowTotals[row]++;
      this.matrixColTotals[col]++;

      if ((row <= 1 && col >= 2) || (row === 0 && col === 1)) {
        this.criticalExposureCount++;
      }
    });

    this.computeMatrixHighlights();
  }

  private computeMatrixHighlights(): void {
    const topRowIndex = this.getMaxIndex(this.matrixRowTotals);
    const topColIndex = this.getMaxIndex(this.matrixColTotals);
    const topCell = this.getTopMatrixCell();

    this.dominantProbabilityLabel = topRowIndex === -1
      ? '-'
      : this.getProbabilityLabel(this.probabilityOrder[topRowIndex]);
    this.dominantImpactLabel = topColIndex === -1
      ? '-'
      : this.getImpactLabel(this.impactOrder[topColIndex]);

    if (!topCell) {
      return;
    }

    this.topZoneLabel = `${this.getProbabilityLabel(this.probabilityOrder[topCell.row])} x ${this.getImpactLabel(this.impactOrder[topCell.col])}`;
    this.topZoneCount = topCell.count;
    this.topZoneShare = this.getMatrixShare(topCell.count);
  }

  private getTopMatrixCell(): { row: number; col: number; count: number } | null {
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

  private resolveRiskLevel(level?: string | null): RiskLevel | null {
    return this.riskLevelAliases[this.normalize(level)] || null;
  }

  private resolveRiskStatus(status?: string | null): RiskStatus | null {
    return this.riskStatusAliases[this.normalize(status)] || null;
  }

  private resolveProbability(probability?: string | null): RiskProbability | null {
    return this.probabilityAliases[this.normalize(probability)] || null;
  }

  private resolveImpact(impact?: string | null): RiskImpact | null {
    return this.impactAliases[this.normalize(impact)] || null;
  }
}
