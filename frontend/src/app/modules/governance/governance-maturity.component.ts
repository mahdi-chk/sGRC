import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';

@Component({
  selector: 'app-governance-maturity',
  templateUrl: './governance-maturity.component.html',
  styleUrls: ['./governance-maturity.component.scss']
})
export class GovernanceMaturityComponent implements OnInit {
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
        this.risks = risks;
        this.missions = missions;
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

  get totalRisks(): number {
    return this.risks.length;
  }

  get criticalRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const critical = this.risks.filter(risk => risk.niveauRisque === RiskLevel.CRITICAL).length;
    return Math.round((critical / this.risks.length) * 100);
  }

  get treatmentRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const treated = this.risks.filter(risk => risk.statut === RiskStatus.TREATED || risk.statut === RiskStatus.CLOSED).length;
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

    const completed = this.missions.filter(mission => mission.statut === AuditMissionStatus.TERMINE).length;
    return Math.round((completed / this.missions.length) * 100);
  }

  get delayedRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const delayed = this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
    return Math.round((delayed / this.missions.length) * 100);
  }

  get onTimeRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const delayed = this.missions.filter(mission => mission.statut === AuditMissionStatus.EN_RETARD).length;
    const cancelled = this.missions.filter(mission => mission.statut === AuditMissionStatus.ANNULE).length;
    const onTime = this.missions.length - delayed - cancelled;
    return Math.round((onTime / this.missions.length) * 100);
  }
}
