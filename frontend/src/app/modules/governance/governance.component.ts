import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GovernanceRoleTraceabilityProfile, GovernanceService } from './governance.service';
import { getGovernanceNavItems, getStoredGovernanceRole } from './governance-navigation';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss']
})
export class GovernanceComponent implements OnInit {
  readonly navItems = getGovernanceNavItems(getStoredGovernanceRole());
  readonly modules = this.navItems.map(item => ({
    title: item.label,
    route: item.route,
    description: this.getModuleDescription(item.label)
  }));

  risks: Risk[] = [];
  missions: AuditMission[] = [];
  traceabilityProfiles: GovernanceRoleTraceabilityProfile[] = [];
  isLoading = false;

  constructor(
    private router: Router,
    private riskService: RiskService,
    private auditingService: AuditingService,
    private governanceService: GovernanceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      risks: this.riskService.getRisks(),
      missions: this.auditingService.getMissions(),
      traceabilityProfiles: this.governanceService.getRoleTraceabilityProfiles()
    }).subscribe({
      next: ({ risks, missions, traceabilityProfiles }) => {
        this.risks = risks;
        this.missions = missions;
        this.traceabilityProfiles = traceabilityProfiles;
        this.isLoading = false;
      },
      error: () => {
        this.risks = [];
        this.missions = [];
        this.traceabilityProfiles = [];
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get maturityLevel(): number {
    return RiskService.calculateMaturityIndex(this.risks);
  }

  get treatmentRate(): number {
    if (!this.risks.length) {
      return 0;
    }

    const treated = this.risks.filter(risk => this.isCompletedRiskStatus((risk as any).statutCode || risk.statut)).length;
    return Math.round((treated / this.risks.length) * 100);
  }

  get criticalRisks(): number {
    return this.risks.filter(risk => this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque) === RiskLevel.CRITICAL).length;
  }

  get completionRate(): number {
    if (!this.missions.length) {
      return 0;
    }

    const completed = this.missions.filter(mission => mission.statut === AuditMissionStatus.TERMINE).length;
    return Math.round((completed / this.missions.length) * 100);
  }

  get supervisedUsersCount(): number {
    return this.traceabilityProfiles.reduce((sum, profile) => sum + profile.stats.members, 0);
  }

  get supervisedOpenItems(): number {
    return this.traceabilityProfiles.reduce((sum, profile) => sum + profile.stats.openItems, 0);
  }

  private isCompletedRiskStatus(status?: string | null): boolean {
    const normalizedStatus = this.normalize(status);
    return normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED;
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

  private getModuleDescription(label: string): string {
    switch (label) {
      case 'Gestion Documentaire':
        return 'Acces aux ressources documentaires autorisees pour votre role.';
      case 'Tracabilite et Historique':
        return 'Suivi des actions visibles dans votre perimetre et selon votre niveau d acces.';
      case 'Workflows d Approbation':
        return 'Avancement reel des risques, audits et incidents rattaches a votre profil.';
      case 'Indicateurs de Maturite':
        return 'KPIs consolides pour les profils de supervision et de pilotage.';
      case 'Adhesion et Application':
        return 'Couverture d execution sur les risques et les missions du perimetre autorise.';
      default:
        return 'Sous-module Gouvernance accessible selon votre profil.';
    }
  }
}
