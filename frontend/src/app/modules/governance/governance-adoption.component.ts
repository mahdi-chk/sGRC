import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';

@Component({
  selector: 'app-governance-adoption',
  templateUrl: './governance-adoption.component.html',
  styleUrls: ['./governance-adoption.component.scss']
})
export class GovernanceAdoptionComponent implements OnInit {
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

  get assignedRisksRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const assigned = this.risks.filter(risk => !!risk.riskAgentId).length;
    return Math.round((assigned / this.risks.length) * 100);
  }

  get treatedRisksRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const treated = this.risks.filter(risk => risk.statut === RiskStatus.TREATED || risk.statut === RiskStatus.CLOSED).length;
    return Math.round((treated / this.risks.length) * 100);
  }

  get assignedMissionsRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const assigned = this.missions.filter(mission => !!mission.auditeurId).length;
    return Math.round((assigned / this.missions.length) * 100);
  }

  get reportedMissionsRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const reported = this.missions.filter(mission => !!mission.rapport || mission.statut === AuditMissionStatus.TERMINE).length;
    return Math.round((reported / this.missions.length) * 100);
  }
}
