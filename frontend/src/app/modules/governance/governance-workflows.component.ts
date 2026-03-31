import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';

@Component({
  selector: 'app-governance-workflows',
  templateUrl: './governance-workflows.component.html',
  styleUrls: ['./governance-workflows.component.scss']
})
export class GovernanceWorkflowsComponent implements OnInit {
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

  get priorityRisks(): Risk[] {
    return this.risks
      .filter(risk =>
        risk.niveauRisque === RiskLevel.CRITICAL ||
        risk.statut === RiskStatus.OPEN ||
        !risk.riskAgentId
      )
      .slice()
      .sort((left, right) => new Date(left.dateEcheance).getTime() - new Date(right.dateEcheance).getTime());
  }

  get priorityMissions(): AuditMission[] {
    return this.missions
      .filter(mission =>
        mission.statut === AuditMissionStatus.EN_RETARD ||
        mission.statut === AuditMissionStatus.EN_COURS ||
        !mission.auditeurId
      )
      .slice()
      .sort((left, right) => new Date(left.delai).getTime() - new Date(right.delai).getTime());
  }

  getRiskBadgeClass(risk: Risk): string {
    if (risk.niveauRisque === RiskLevel.CRITICAL) {
      return 'danger';
    }

    if (risk.statut === RiskStatus.TREATED || risk.statut === RiskStatus.CLOSED) {
      return 'success';
    }

    return 'warning';
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
}
