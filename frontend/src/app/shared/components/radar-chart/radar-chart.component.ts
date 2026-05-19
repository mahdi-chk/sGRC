import { Component, Input, OnChanges } from '@angular/core';

export interface RadarChartSeries {
  label: string;
  values: number[];
  color: string;
  fillColor?: string;
}

interface RadarAxis {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
}

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() labels: string[] = [];
  @Input() series: RadarChartSeries[] = [];
  @Input() maxValue = 100;
  @Input() levels: number[] = [20, 40, 60, 80, 100];
  @Input() valueSuffix = '%';
  @Input() emptyText = 'Aucune donnee disponible pour ce radar.';

  readonly centerX = 280;
  readonly centerY = 205;
  readonly radius = 130;
  axes: RadarAxis[] = [];
  labelLines: string[][] = [];
  gridPolygons: string[] = [];
  levelLabels: Array<{ value: string; x: number; y: number }> = [];
  normalizedSeries: Array<RadarChartSeries & { polygon: string; points: Array<{ x: number; y: number }> }> = [];

  ngOnChanges(): void {
    this.rebuildChart();
  }

  get hasData(): boolean {
    return this.labels.length >= 3 && this.normalizedSeries.some(item => item.values.some(value => value > 0));
  }

  get safeLevels(): number[] {
    return this.levels?.length ? this.levels : [20, 40, 60, 80, 100];
  }

  private rebuildChart(): void {
    const labels = this.labels || [];
    this.axes = labels.map((_, index) => {
      const angle = this.toRadarAngle(index, labels.length);
      const point = this.projectPoint(this.radius, angle);
      const labelPoint = this.projectPoint(this.radius + 42, angle);

      return {
        x: point.x,
        y: point.y,
        labelX: labelPoint.x,
        labelY: labelPoint.y
      };
    });

    this.labelLines = labels.map(label => this.wrapLabel(label));
    this.gridPolygons = this.safeLevels.map(level => this.buildPolygon(new Array(labels.length).fill(level)));
    this.levelLabels = this.safeLevels.map(level => ({
      value: `${Math.round(level)}${this.valueSuffix}`,
      x: this.centerX + 8,
      y: this.centerY - (this.radius * this.clamp(level) / this.maxValue) + 4
    }));

    this.normalizedSeries = (this.series || []).map(item => {
      const values = labels.map((_, index) => this.clamp(Number(item.values?.[index] || 0)));

      return {
        ...item,
        values,
        polygon: this.buildPolygon(values),
        points: values.map((value, index) => this.projectPoint(this.radius * (value / this.maxValue), this.toRadarAngle(index, labels.length)))
      };
    });
  }

  private buildPolygon(values: number[]): string {
    if (!values.length) {
      return '';
    }

    return values
      .map((value, index) => {
        const angle = this.toRadarAngle(index, values.length);
        const point = this.projectPoint(this.radius * (this.clamp(value) / this.maxValue), angle);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  }

  private projectPoint(radius: number, angle: number): { x: number; y: number } {
    return {
      x: Number((this.centerX + Math.cos(angle) * radius).toFixed(2)),
      y: Number((this.centerY + Math.sin(angle) * radius).toFixed(2))
    };
  }

  private toRadarAngle(index: number, total: number): number {
    return (-Math.PI / 2) + (Math.PI * 2 * index / Math.max(total, 1));
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(this.maxValue || 100, Number.isFinite(value) ? value : 0));
  }

  private wrapLabel(label: string): string[] {
    const cleaned = String(label || '').replace(/\s+/g, ' ').trim();
    if (cleaned.length <= 18) {
      return [cleaned];
    }

    const words = cleaned.split(' ');
    const lines: string[] = [];
    let current = '';

    words.forEach(word => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= 18) {
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
