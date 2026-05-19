import { Component, OnInit } from '@angular/core';
import { ReportingService, MultiEntityData } from '../../../core/services/reporting.service';
import { Router } from '@angular/router';
import { REPORTING_NAV_ITEMS } from '../reporting-navigation';
import * as XLSX from 'xlsx';

type EntitySortKey = 'name' | 'risk' | 'critical' | 'treatment' | 'score';

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
    return this.entities.find(entity => entity.id === this.selectedEntityId) || this.filteredEntities[0] || null;
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

  get bestEntity(): MultiEntityData | null {
    return [...this.entities].sort((left, right) => right.treatmentRate - left.treatmentRate)[0] || null;
  }

  get riskiestEntity(): MultiEntityData | null {
    return [...this.entities].sort((left, right) => right.criticalRiskCount - left.criticalRiskCount || right.riskCount - left.riskCount)[0] || null;
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

  getTreatmentTone(value: number): string {
    if (value >= 75) {
      return 'high';
    }

    if (value >= 45) {
      return 'medium';
    }

    return 'low';
  }

  exportComparison(): void {
    const workbook = XLSX.utils.book_new();
    const rows = this.filteredEntities.map(entity => ({
      Entite: entity.name,
      Risques: entity.riskCount,
      RisquesCritiques: entity.criticalRiskCount,
      PartCritique: `${this.getCriticalShare(entity)}%`,
      TauxTraitement: `${entity.treatmentRate}%`,
      ScoreGlobal: `${this.getEntityScore(entity)}%`,
    }));

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Comparatif');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
      ['Indicateur', 'Valeur'],
      ['Entites', this.entities.length],
      ['Risques totaux', this.totalRisks],
      ['Risques critiques', this.totalCriticalRisks],
      ['Taux moyen de traitement', `${this.averageTreatmentRate}%`],
      ['Score portefeuille', `${this.portfolioScore}%`],
      ['Entite la plus exposee', this.riskiestEntity?.name || '-'],
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
}
