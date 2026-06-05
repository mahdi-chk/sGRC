import { Component, OnInit } from '@angular/core';
import { ReportingService, MultiEntityData } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as XLSX from 'xlsx';

type EntitySortKey = 'name' | 'risk' | 'critical' | 'criticalShare' | 'treatment' | 'score';

@Component({
  selector: 'app-multi-entity-vision',
  templateUrl: './multi-entity-vision.component.html',
  styleUrls: ['./multi-entity-vision.component.scss']
})
export class MultiEntityVisionComponent implements OnInit {
  entities: MultiEntityData[] = [];
  isLoading = true;
  searchTerm = '';
  sortBy: EntitySortKey = 'critical';
  selectedEntityId: number | null = null;
  statusMessage = '';
  readonly navItems = REPORTING_NAV_ITEMS;
  readonly sortOptions: Array<{ value: EntitySortKey; label: string }> = [
    { value: 'critical', label: 'Risques critiques' },
    { value: 'criticalShare', label: 'Part critique' },
    { value: 'risk', label: 'Volume de risques' },
    { value: 'treatment', label: 'Taux de traitement' },
    { value: 'score', label: 'Score global' },
    { value: 'name', label: 'Nom' },
  ];

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities() {
    this.isLoading = true;
    this.reportingService.getMultiEntityData().subscribe(
      data => {
        this.entities = data;
        this.selectedEntityId = data[0]?.id || null;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading multi-entity data', error);
        this.isLoading = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  get filteredEntities(): MultiEntityData[] {
    const query = this.normalize(this.searchTerm);

    return this.entities
      .filter(entity => !query || this.normalize(entity.name).includes(query))
      .sort((left, right) => this.compareEntities(left, right));
  }

  get selectedEntity(): MultiEntityData | null {
    return this.filteredEntities.find(entity => entity.id === this.selectedEntityId) || this.filteredEntities[0] || null;
  }

  get totalRisks(): number {
    return this.entities.reduce((sum, entity) => sum + Number(entity.riskCount || 0), 0);
  }

  get totalCriticalRisks(): number {
    return this.entities.reduce((sum, entity) => sum + Number(entity.criticalRiskCount || 0), 0);
  }

  get averageTreatmentRate(): number {
    if (!this.entities.length) {
      return 0;
    }

    return Math.round(this.entities.reduce((sum, entity) => sum + Number(entity.treatmentRate || 0), 0) / this.entities.length);
  }

  get weightedTreatmentRate(): number {
    if (!this.totalRisks) {
      return 0;
    }

    const weightedTotal = this.entities.reduce(
      (sum, entity) => sum + (Number(entity.treatmentRate || 0) * Number(entity.riskCount || 0)),
      0
    );

    return Math.round(weightedTotal / this.totalRisks);
  }

  get criticalRiskShare(): number {
    return this.totalRisks ? Math.round((this.totalCriticalRisks / this.totalRisks) * 100) : 0;
  }

  get entitiesWithoutCritical(): number {
    return this.entities.filter(entity => Number(entity.criticalRiskCount || 0) === 0).length;
  }

  get entitiesWithCritical(): number {
    return this.entities.filter(entity => Number(entity.criticalRiskCount || 0) > 0).length;
  }

  get entitiesUnderPressure(): number {
    return this.entities.filter(entity => this.getEntityScore(entity) < 45 || this.getCriticalShare(entity) >= 30).length;
  }

  get lowTreatmentEntities(): number {
    return this.entities.filter(entity => Number(entity.treatmentRate || 0) < 45).length;
  }

  get averageRisksPerEntity(): number {
    return this.entities.length ? Math.round(this.totalRisks / this.entities.length) : 0;
  }

  get coverageGap(): number {
    return Math.max(0, 100 - this.weightedTreatmentRate);
  }

  get bestEntity(): MultiEntityData | null {
    return [...this.entities].sort((left, right) => right.treatmentRate - left.treatmentRate)[0] || null;
  }

  get riskiestEntity(): MultiEntityData | null {
    return [...this.entities].sort((left, right) => right.criticalRiskCount - left.criticalRiskCount || right.riskCount - left.riskCount)[0] || null;
  }

  get topRiskEntity(): MultiEntityData | null {
    return [...this.entities].sort((left, right) => right.riskCount - left.riskCount || right.criticalRiskCount - left.criticalRiskCount)[0] || null;
  }

  get topRiskEntities(): MultiEntityData[] {
    return [...this.entities]
      .sort((left, right) => right.riskCount - left.riskCount || right.criticalRiskCount - left.criticalRiskCount)
      .slice(0, 5);
  }

  get scoreDistribution(): Array<{ label: string; count: number; tone: string; icon: string }> {
    return [
      {
        label: 'Maitrise forte',
        count: this.entities.filter(entity => this.getEntityScore(entity) >= 75).length,
        tone: 'high',
        icon: 'fa-shield-check',
      },
      {
        label: 'Vigilance',
        count: this.entities.filter(entity => {
          const score = this.getEntityScore(entity);
          return score >= 45 && score < 75;
        }).length,
        tone: 'medium',
        icon: 'fa-triangle-exclamation',
      },
      {
        label: 'Sous pression',
        count: this.entities.filter(entity => this.getEntityScore(entity) < 45).length,
        tone: 'low',
        icon: 'fa-fire-flame-curved',
      },
    ];
  }

  get executiveSignals(): Array<{ label: string; value: string | number; meta: string; tone: string; icon: string }> {
    return [
      {
        label: 'Part critique',
        value: `${this.criticalRiskShare}%`,
        meta: `${this.totalCriticalRisks} risque(s) critique(s)`,
        tone: this.getCriticalTone(this.criticalRiskShare),
        icon: 'fa-shield-virus',
      },
      {
        label: 'Couverture ponderee',
        value: `${this.weightedTreatmentRate}%`,
        meta: `${this.coverageGap}% de reste a couvrir`,
        tone: this.getTreatmentTone(this.weightedTreatmentRate),
        icon: 'fa-chart-simple',
      },
      {
        label: 'Sans critique',
        value: this.entitiesWithoutCritical,
        meta: `${this.entitiesWithCritical} entite(s) exposee(s)`,
        tone: this.entitiesWithoutCritical === this.entities.length ? 'high' : 'medium',
        icon: 'fa-circle-check',
      },
      {
        label: 'Sous pression',
        value: this.entitiesUnderPressure,
        meta: `${this.lowTreatmentEntities} traitement faible`,
        tone: this.entitiesUnderPressure === 0 ? 'high' : this.entitiesUnderPressure <= 2 ? 'medium' : 'low',
        icon: 'fa-bolt',
      },
    ];
  }

  get portfolioScore(): number {
    const treatment = this.averageTreatmentRate;
    const criticalPenalty = this.totalRisks ? Math.round((this.totalCriticalRisks / this.totalRisks) * 100) : 0;
    return Math.max(0, Math.min(100, treatment - criticalPenalty));
  }

  selectEntity(entity: MultiEntityData): void {
    this.selectedEntityId = entity.id;
  }

  getEntityScore(entity: MultiEntityData): number {
    const criticalPenalty = entity.riskCount ? Math.round((entity.criticalRiskCount / entity.riskCount) * 35) : 0;
    return Math.max(0, Math.min(100, Math.round(entity.treatmentRate - criticalPenalty)));
  }

  getCriticalShare(entity: MultiEntityData): number {
    return entity.riskCount ? Math.round((entity.criticalRiskCount / entity.riskCount) * 100) : 0;
  }

  getTreatmentPercent(entity: MultiEntityData): number {
    return this.clampPercent(Number(entity.treatmentRate || 0));
  }

  getRiskContribution(entity: MultiEntityData): number {
    return this.totalRisks ? Math.round((Number(entity.riskCount || 0) / this.totalRisks) * 100) : 0;
  }

  getEntityRank(entity: MultiEntityData): number {
    const ranked = [...this.entities].sort((left, right) => this.getEntityScore(right) - this.getEntityScore(left));
    return ranked.findIndex(item => item.id === entity.id) + 1;
  }

  getCriticalTone(value: number): string {
    if (value <= 10) {
      return 'high';
    }

    if (value <= 25) {
      return 'medium';
    }

    return 'low';
  }

  getTreatmentTone(value: number): string {
    if (value >= 75) {
      return 'high';
    }

    if (value >= 45) {
      return 'medium';
    }

    return 'low';
  }

  getEntityPriority(entity: MultiEntityData): string {
    if (entity.criticalRiskCount > 0 && this.getCriticalShare(entity) >= 30) {
      return 'Critique';
    }

    if (this.getEntityScore(entity) < 45 || entity.treatmentRate < 45) {
      return 'Prioritaire';
    }

    if (entity.criticalRiskCount > 0 || this.getEntityScore(entity) < 75) {
      return 'Surveillance';
    }

    return 'Stable';
  }

  getPriorityTone(entity: MultiEntityData): string {
    const priority = this.getEntityPriority(entity);

    if (priority === 'Stable') {
      return 'high';
    }

    if (priority === 'Surveillance') {
      return 'medium';
    }

    return 'low';
  }

  getRecommendation(entity: MultiEntityData): string {
    if (entity.criticalRiskCount > 0 && this.getCriticalShare(entity) >= 30) {
      return 'Reduire la concentration critique et lancer une revue dediee sur les plans de traitement.';
    }

    if (entity.treatmentRate < 45) {
      return 'Renforcer la cadence de traitement et arbitrer les actions ouvertes les plus bloquees.';
    }

    if (this.getEntityScore(entity) >= 75) {
      return 'Capitaliser sur les controles efficaces et partager les pratiques avec les autres entites.';
    }

    return 'Maintenir le suivi mensuel et securiser les risques critiques residuels.';
  }

  exportComparison(): void {
    const workbook = XLSX.utils.book_new();
    const rows = this.filteredEntities.map(entity => ({
      Entite: entity.name,
      Risques: entity.riskCount,
      RisquesCritiques: entity.criticalRiskCount,
      PartCritique: `${this.getCriticalShare(entity)}%`,
      TauxTraitement: `${entity.treatmentRate}%`,
      CouverturePonderee: `${this.getTreatmentPercent(entity)}%`,
      ScoreGlobal: `${this.getEntityScore(entity)}%`,
      ContributionPortefeuille: `${this.getRiskContribution(entity)}%`,
      Priorite: this.getEntityPriority(entity),
    }));

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Comparatif');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
      ['Indicateur', 'Valeur'],
      ['Entites', this.entities.length],
      ['Risques totaux', this.totalRisks],
      ['Risques critiques', this.totalCriticalRisks],
      ['Taux moyen de traitement', `${this.averageTreatmentRate}%`],
      ['Taux pondere de traitement', `${this.weightedTreatmentRate}%`],
      ['Part critique portefeuille', `${this.criticalRiskShare}%`],
      ['Score portefeuille', `${this.portfolioScore}%`],
      ['Risques moyens par entite', this.averageRisksPerEntity],
      ['Entites sans risque critique', this.entitiesWithoutCritical],
      ['Entites sous pression', this.entitiesUnderPressure],
      ['Entite la plus exposee', this.riskiestEntity?.name || '-'],
      ['Entite la plus chargee', this.topRiskEntity?.name || '-'],
      ['Meilleure couverture', this.bestEntity?.name || '-'],
    ]), 'Synthese');

    XLSX.writeFile(workbook, `vision_multi_entites_${new Date().toISOString().split('T')[0]}.xlsx`);
    this.statusMessage = 'Export comparatif genere avec succes.';
  }

  private compareEntities(left: MultiEntityData, right: MultiEntityData): number {
    switch (this.sortBy) {
      case 'name':
        return left.name.localeCompare(right.name);
      case 'risk':
        return right.riskCount - left.riskCount;
      case 'criticalShare':
        return this.getCriticalShare(right) - this.getCriticalShare(left);
      case 'treatment':
        return right.treatmentRate - left.treatmentRate;
      case 'score':
        return this.getEntityScore(right) - this.getEntityScore(left);
      case 'critical':
      default:
        return right.criticalRiskCount - left.criticalRiskCount || right.riskCount - left.riskCount;
    }
  }

  private normalize(value?: string | null): string {
    return String(value || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private clampPercent(value: number): number {
    return Math.max(0, Math.min(100, Math.round(value)));
  }
}
