import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComplianceFrameworkRecord,
  ComplianceMappingRecord,
  ComplianceRequirementRecord,
  ComplianceService
} from './compliance.service';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';

@Component({
  selector: 'app-compliance-maturity',
  templateUrl: './compliance-maturity.component.html',
  styleUrls: ['./compliance-maturity.component.scss']
})
export class ComplianceMaturityComponent implements OnInit {
  readonly navItems = getComplianceNavItems(getStoredComplianceRole());
  readonly radarGridLevels = [20, 40, 60, 80, 100];
  readonly radarSeriesLegend = [
    { key: 'partial', label: 'Confo. totale et partielle', color: '#2c6fd6' },
    { key: 'total', label: 'Confo. totale', color: '#f08a24' }
  ];

  frameworks: ComplianceFrameworkRecord[] = [];
  requirements: ComplianceRequirementRecord[] = [];
  mappings: ComplianceMappingRecord[] = [];
  selectedFrameworkId: number | null = null;
  isLoading = false;
  isAutoMapping = false;
  error = '';
  autoMapResult: any = null;
  radarChartAnalytic = this.createEmptyRadarChart();
  radarChartDetailed = this.createEmptyRadarChart();
  radarChartDispositions = this.createEmptyRadarChart();

  constructor(
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    this.loadFrameworks();
  }

  get selectedFramework(): ComplianceFrameworkRecord | null {
    return this.frameworks.find(item => item.id === this.selectedFrameworkId) || null;
  }

  get frameworkCoverage(): number {
    const chart = this.radarChartAnalytic;
    if (!chart.labels.length) {
      return 0;
    }

    const total = chart.partialValues.reduce((sum, value) => sum + value, 0);
    return Math.round(total / chart.partialValues.length);
  }

  get frameworkFullCoverage(): number {
    const chart = this.radarChartAnalytic;
    if (!chart.labels.length) {
      return 0;
    }

    const total = chart.totalValues.reduce((sum, value) => sum + value, 0);
    return Math.round(total / chart.totalValues.length);
  }

  get uncoveredRequirementsCount(): number {
    if (!this.requirements.length) {
      return 0;
    }

    const coveredIds = new Set(
      this.mappings
        .filter(item => ['partial', 'covered'].includes(String(item.coverageLevelCode || item.coverageLevel || '').toLowerCase()))
        .map(item => item.requirementId)
    );

    return this.requirements.filter(item => !coveredIds.has(item.id)).length;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/compliance']);
  }

  loadFrameworks(): void {
    this.isLoading = true;
    this.error = '';

    this.complianceService.getFrameworks().subscribe({
      next: frameworks => {
        this.frameworks = frameworks;

        if (this.selectedFrameworkId && !frameworks.some(item => item.id === this.selectedFrameworkId)) {
          this.selectedFrameworkId = null;
        }

        if (!this.selectedFrameworkId && frameworks.length > 0) {
          this.selectedFrameworkId = frameworks[0].id;
        }

        this.isLoading = false;
        this.loadRequirements();
      },
      error: err => {
        this.frameworks = [];
        this.requirements = [];
        this.mappings = [];
        this.radarChartAnalytic = this.createEmptyRadarChart();
        this.radarChartDetailed = this.createEmptyRadarChart();
        this.radarChartDispositions = this.createEmptyRadarChart();
        this.isLoading = false;
        this.error = err?.error?.message || 'Impossible de charger les referentiels.';
      }
    });
  }

  selectFramework(frameworkId: number | null): void {
    this.selectedFrameworkId = frameworkId;
    this.loadRequirements();
  }

  loadRequirements(): void {
    if (!this.selectedFrameworkId) {
      this.requirements = [];
      this.mappings = [];
      this.radarChartAnalytic = this.createEmptyRadarChart();
      this.radarChartDetailed = this.createEmptyRadarChart();
      return;
    }

    this.complianceService.getRequirements(this.selectedFrameworkId).subscribe({
      next: items => {
        this.requirements = items;
        this.loadMappings();
      },
      error: err => {
        this.requirements = [];
        this.mappings = [];
        this.radarChartAnalytic = this.createEmptyRadarChart();
        this.radarChartDetailed = this.createEmptyRadarChart();
        this.radarChartDispositions = this.createEmptyRadarChart();
        this.error = err?.error?.message || 'Impossible de charger les exigences.';
      }
    });
  }

  loadMappings(): void {
    if (!this.selectedFrameworkId) {
      this.mappings = [];
      this.radarChartAnalytic = this.createEmptyRadarChart();
      this.radarChartDetailed = this.createEmptyRadarChart();
      return;
    }

    this.complianceService.getMappings().subscribe({
      next: items => {
        const requirementIds = new Set(this.requirements.map(item => item.id));
        this.mappings = items.filter(item => requirementIds.has(item.requirementId));
        this.refreshRadarChart();
      },
      error: () => {
        this.mappings = [];
        this.refreshRadarChart();
      }
    });
  }

  formatPercent(value: number): string {
    return `${Math.round(value)}%`;
  }

  autoMapSelectedFramework(): void {
    if (!this.selectedFrameworkId) {
      this.error = 'Selectionnez un referentiel a mapper.';
      return;
    }

    this.isAutoMapping = true;
    this.error = '';
    this.autoMapResult = null;

    this.complianceService.autoMapFramework(this.selectedFrameworkId).subscribe({
      next: result => {
        this.isAutoMapping = false;
        this.autoMapResult = result;
        this.loadRequirements();
      },
      error: err => {
        this.isAutoMapping = false;
        this.error = err?.error?.message || 'Impossible de lancer le mapping automatique.';
      }
    });
  }

  evaluateManually(): void {
    this.router.navigate(['/dashboard/compliance-mappings']);
  }

  private buildRadarChart() {
    const centerX = 280;
    const centerY = 195;
    const radius = 132;
    const chapterMap = new Map<string, {
      key: string;
      label: string;
      numericLabel: string;
      order: number;
      totalWeight: number;
      partialWeight: number;
      coveredWeight: number;
    }>();

    const mappingsByRequirement = new Map<number, string>();
    this.mappings.forEach(item => {
      const key = item.requirementId;
      const current = mappingsByRequirement.get(key);
      const next = String(item.coverageLevelCode || item.coverageLevel || '').toLowerCase();
      if (!current || this.getCoveragePriority(next) > this.getCoveragePriority(current)) {
        mappingsByRequirement.set(key, next);
      }
    });

    this.requirements.forEach(requirement => {
      const chapter = this.resolveChapterLabel(requirement);
      const numericLabel = String(this.resolveChapterOrder(requirement));
      const key = chapter.toLowerCase();
      const existing = chapterMap.get(key) || {
        key,
        label: chapter,
        numericLabel,
        order: this.resolveChapterOrder(requirement),
        totalWeight: 0,
        partialWeight: 0,
        coveredWeight: 0
      };

      const weight = Number(requirement.weight || 1);
      const coverage = mappingsByRequirement.get(requirement.id) || 'uncovered';

      existing.totalWeight += weight;
      if (coverage === 'covered') {
        existing.partialWeight += weight;
        existing.coveredWeight += weight;
      } else if (coverage === 'partial') {
        existing.partialWeight += weight;
      }

      chapterMap.set(key, existing);
    });

    const chapters = Array.from(chapterMap.values()).sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
    
    const isArticleOrDisposition = (str: string) => {
      const lower = str.toLowerCase();
      return lower.includes('article') || lower.includes('disposition') || lower.includes('entit');
    };

    // Séparation des données : Les Chapitres normaux et les Articles (Dispositions)
    const regularChapters = chapters.filter(c => !isArticleOrDisposition(c.label) && c.label.toLowerCase() !== 'hors chapitre');
    const articleChapters = chapters.filter(c => isArticleOrDisposition(c.label));

    const generateChart = (items: any[], labelFn: (item: any) => string, useDecimalScale: boolean = false) => {
      if (!items.length) return this.createEmptyRadarChart();

      const axes = items.map((item: any, index: number) => {
        const angle = this.toRadarAngle(index, items.length);
        const point = this.projectPoint(centerX, centerY, radius, angle);
        const labelPoint = this.projectPoint(centerX, centerY, radius + 38, angle);

        return {
          x: point.x,
          y: point.y,
          labelX: labelPoint.x,
          labelY: labelPoint.y
        };
      });

      const pValues = items.map((item: any) => item.totalWeight > 0 ? Math.round((item.partialWeight / item.totalWeight) * 100) : 0);
      const tValues = items.map((item: any) => item.totalWeight > 0 ? Math.round((item.coveredWeight / item.totalWeight) * 100) : 0);

      const pPoints = pValues.map((value: number, index: number) => this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), this.toRadarAngle(index, items.length)));
      const tPoints = tValues.map((value: number, index: number) => this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), this.toRadarAngle(index, items.length)));

      return {
        labels: items.map(labelFn),
        labelLines: items.map((item: any) => this.wrapRadarLabel(labelFn(item))),
        partialValues: pValues,
        totalValues: tValues,
        partialPolygon: this.buildRadarPolygon(pValues, centerX, centerY, radius),
        totalPolygon: this.buildRadarPolygon(tValues, centerX, centerY, radius),
        partialPoints: pPoints,
        totalPoints: tPoints,
        axes,
        gridPolygons: this.radarGridLevels.map(level => this.buildRadarPolygon(new Array(items.length).fill(level), centerX, centerY, radius)),
        levelLabels: this.radarGridLevels.map(level => {
          let displayedValue: string | number = level;
          if (useDecimalScale) {
            displayedValue = level === 100 ? '1' : level === 0 ? '0' : String(level / 100).replace('.', ',');
          } else {
            displayedValue = `${level}%`;
          }
          return {
            value: displayedValue,
            x: centerX + 8,
            y: centerY - (radius * level / 100) + 4
          };
        })
      };
    };

    return {
      analytic: generateChart(regularChapters.length ? regularChapters : chapters, (item: any) => item.numericLabel),
      detailed: generateChart(regularChapters.length ? regularChapters : chapters, (item: any) => item.label),
      dispositions: generateChart(articleChapters, (item: any) => item.label, true)
    };
  }

  private refreshRadarChart(): void {
    const charts = this.buildRadarChart();
    this.radarChartAnalytic = charts.analytic;
    this.radarChartDetailed = charts.detailed;
    this.radarChartDispositions = charts.dispositions;
  }

  private createEmptyRadarChart() {
    return {
      labels: [] as string[],
      labelLines: [] as string[][],
      partialValues: [] as number[],
      totalValues: [] as number[],
      partialPolygon: '',
      totalPolygon: '',
      partialPoints: [] as Array<{ x: number; y: number }>,
      totalPoints: [] as Array<{ x: number; y: number }>,
      axes: [] as Array<{ x: number; y: number; labelX: number; labelY: number }>,
      gridPolygons: [] as string[],
      levelLabels: [] as Array<{ value: number | string; x: number; y: number }>
    };
  }

  private resolveChapterLabel(requirement: ComplianceRequirementRecord): string {
    const articleMatch = String(requirement.code || '').match(/^(Article\s+\d+)/i);
    if (articleMatch) {
      return articleMatch[1];
    }

    const chapter = (requirement.chapter || '').trim();
    if (chapter) {
      return chapter;
    }

    const codeMatch = String(requirement.code || '').match(/^((?:[A-Z]\.)?\d+(?:\.\d+)?)/);
    return codeMatch ? `Chapitre ${codeMatch[1]}` : 'Hors chapitre';
  }

  private resolveChapterOrder(requirement: ComplianceRequirementRecord): number {
    const source = `${requirement.chapter || ''} ${requirement.code || ''}`;
    const numbers = source.match(/\d+/g);
    if (!numbers?.length) {
      return Number(requirement.orderIndex || 9999);
    }

    return numbers
      .slice(0, 3)
      .reduce((sum, value, index) => sum + Number(value) / Math.pow(100, index), 0);
  }

  private getCoveragePriority(value: string): number {
    if (value === 'covered') {
      return 3;
    }
    if (value === 'partial') {
      return 2;
    }
    return 1;
  }

  private buildRadarPolygon(values: number[], centerX: number, centerY: number, radius: number): string {
    return values
      .map((value, index) => {
        const angle = this.toRadarAngle(index, values.length);
        const point = this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), angle);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  }

  private projectPoint(centerX: number, centerY: number, radius: number, angle: number): { x: number; y: number } {
    return {
      x: Number((centerX + Math.cos(angle) * radius).toFixed(2)),
      y: Number((centerY + Math.sin(angle) * radius).toFixed(2))
    };
  }

  private toRadarAngle(index: number, total: number): number {
    return (-Math.PI / 2) + (Math.PI * 2 * index / total);
  }

  private wrapRadarLabel(label: string): string[] {
    const cleaned = label.replace(/\s+/g, ' ').trim();
    if (cleaned.length <= 24) {
      return [cleaned];
    }

    const words = cleaned.split(' ');
    const lines: string[] = [];
    let current = '';

    words.forEach(word => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= 24) {
        current = candidate;
      } else {
        if (current) {
          lines.push(current);
        }
        current = word;
      }
    });

    if (current) {
      lines.push(current);
    }

    return lines.slice(0, 3);
  }
}
