import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';

@Component({
  selector: 'app-governance-history',
  templateUrl: './governance-history.component.html',
  styleUrls: ['./governance-history.component.scss']
})
export class GovernanceHistoryComponent implements OnInit {
  readonly navItems = GOVERNANCE_NAV_ITEMS;
  risks: Risk[] = [];
  missions: AuditMission[] = [];
  isLoading = false;

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
        this.risks = risks
          .slice()
          .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
        this.missions = missions
          .slice()
          .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
        this.isLoading = false;
      },
      error: () => {
        this.risks = [];
        this.missions = [];
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/governance']);
  }

  get openRisks(): number {
    return this.risks.filter(risk => this.isOpenRiskStatus(risk.statutCode || risk.statut)).length;
  }

  get criticalRisks(): number {
    return this.risks.filter(risk => this.normalizeRiskLevel(risk.niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
  }

  get activeMissions(): number {
    return this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_COURS).length;
  }

  get lateMissions(): number {
    return this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
  }

  getRiskBadgeClass(status: string): string {
    switch (this.normalizeRiskStatus(status)) {
      case RiskStatus.TREATED:
      case RiskStatus.CLOSED:
        return 'success';
      case RiskStatus.IN_PROGRESS:
        return 'info';
      default:
        return 'warning';
    }
  }

  getMissionBadgeClass(status: string): string {
    switch (status) {
      case AuditMissionStatus.TERMINE:
        return 'success';
      case AuditMissionStatus.EN_RETARD:
        return 'danger';
      case AuditMissionStatus.EN_COURS:
        return 'info';
      default:
        return 'warning';
    }
  }

  private isOpenRiskStatus(status?: string | null): boolean {
    const normalizedStatus = this.normalizeRiskStatus(status);
    return normalizedStatus === RiskStatus.OPEN || normalizedStatus === RiskStatus.IN_PROGRESS;
  }

  private normalizeRiskStatus(status?: string | null): string {
    return this.normalize(status);
  }

  private normalizeRiskLevel(level?: string | null): string {
    return this.normalize(level);
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
