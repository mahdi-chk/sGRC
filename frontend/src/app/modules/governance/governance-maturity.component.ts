import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { getGovernanceNavItems, getStoredGovernanceRole } from './governance-navigation';
import { RadarChartSeries } from '../../shared/components/radar-chart/radar-chart.component';

@Component({
  selector: 'app-governance-maturity',
  templateUrl: './governance-maturity.component.html',
  styleUrls: ['./governance-maturity.component.scss']
})
export class GovernanceMaturityComponent implements OnInit {
  readonly navItems = getGovernanceNavItems(getStoredGovernanceRole());
  risks: Risk[] = [];
  missions: AuditMission[] = [];
  isLoading = false;
  governanceRadarSeries: RadarChartSeries[] = [];

  readonly governanceRadarLabels = [
    'Traitement risques',
    'Critiques maitrises',
    'Maturite risque',
    'Completion audit',
    'Missions a temps',
    'Retards maitrises'
  ];

  constructor(
    private router: Router,
    private riskService: RiskService,
    private auditingService: AuditingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      risks: this.riskService.getRisks(),
      missions: this.auditingService.getMissions()
    }).subscribe({
      next: ({ risks, missions }) => {
        this.risks = risks;
        this.missions = missions;
        this.refreshGovernanceRadarSeries();
        this.isLoading = false;
      },
      error: () => {
        this.risks = [];
        this.missions = [];
        this.governanceRadarSeries = [];
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get totalRisks(): number {
    return this.risks.length;
  }

  get criticalRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const critical = this.risks.filter(risk => this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
    return Math.round((critical / this.risks.length) * 100);
  }

  get treatmentRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const treated = this.risks.filter(risk => this.isCompletedRiskStatus(risk.statutCode || risk.statut)).length;
    return Math.round((treated / this.risks.length) * 100);
  }

  get maturityLevel(): number {
    return RiskService.calculateMaturityIndex(this.risks);
  }

  get totalMissions(): number {
    return this.missions.length;
  }

  get completionRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const completed = this.missions.filter(mission => this.getStatusBucket(mission) === 'OK').length;
    return Math.round((completed / this.missions.length) * 100);
  }

  get delayedRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const delayed = this.missions.filter(mission => this.getStatusBucket(mission) === 'NOK').length;
    return Math.round((delayed / this.missions.length) * 100);
  }

  get onTimeRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const onTime = this.missions.filter(mission => this.isMissionCompletedOnTime(mission)).length;
    return Math.round((onTime / this.missions.length) * 100);
  }

  refreshGovernanceRadarSeries(): void {
    this.governanceRadarSeries = [
      {
        label: 'Situation actuelle',
        values: [
          this.treatmentRate,
          100 - this.criticalRate,
          Math.round((this.maturityLevel / 5) * 100),
          this.completionRate,
          this.onTimeRate,
          100 - this.delayedRate
        ],
        color: '#2563eb',
        fillColor: 'rgba(37, 99, 235, 0.18)'
      },
      {
        label: 'Objectif cible',
        values: [80, 90, 80, 85, 90, 95],
        color: '#f59e0b',
        fillColor: 'rgba(245, 158, 11, 0.12)'
      }
    ];
  }

  private isCompletedRiskStatus(status?: string | null): boolean {
    const normalizedStatus = this.normalize(status);
    return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
  }

  private normalizeRiskLevel(level?: string | null): string {
    return this.normalize(level);
  }

  private getStatusBucket(mission: AuditMission): 'OK' | 'En cours' | 'NOK' {
    const rawStatus = this.normalize((mission as any).statutCode || mission.statut);
    if (rawStatus === 'ok' || rawStatus === 'termine') {
      return 'OK';
    }
    if (rawStatus === 'nok' || rawStatus === 'en_retard' || rawStatus.includes('retard') || rawStatus === 'annule') {
      return 'NOK';
    }
    return rawStatus === AuditMissionStatus.EN_COURS || rawStatus === 'in_progress' || rawStatus.includes('cours') ? 'En cours' : 'NOK';
  }

  private isMissionCompletedOnTime(mission: AuditMission): boolean {
    if (this.getStatusBucket(mission) !== 'OK') {
      return false;
    }

    const dueDate = this.getDueDate(mission);
    const realEndDate = this.parseDate(mission.dateReelleFin);
    if (!dueDate || !realEndDate) {
      return true;
    }

    return this.startOfDay(realEndDate) <= this.startOfDay(dueDate);
  }

  private getDueDate(mission: AuditMission): Date | null {
    const candidate = mission.datePrevueFin || (mission as any).echeance || mission.delai;
    return this.parseDate(candidate);
  }

  private parseDate(value: string | Date | null | undefined): Date | null {
    if (!value) {
      return null;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private startOfDay(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
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
}
