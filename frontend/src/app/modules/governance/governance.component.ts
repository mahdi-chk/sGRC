import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../core/services/auditing.service';
import { Risk, RiskLevel, RiskService, RiskStatus } from '../../core/services/risk.service';
import { GOVERNANCE_NAV_ITEMS } from './governance-navigation';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss']
})
export class GovernanceComponent implements OnInit {
  readonly navItems = GOVERNANCE_NAV_ITEMS;
  readonly modules = [
    {
      title: 'Gestion Documentaire',
      route: '/dashboard/governance-documents',
      description: 'Acces et administration des ressources documentaires de gouvernance.'
    },
    {
      title: 'Tracabilite et Historique',
      route: '/dashboard/governance-history',
      description: 'Suivi des risques et des missions via leurs derniers statuts et mises a jour.'
    },
    {
      title: 'Workflows d Approbation',
      route: '/dashboard/governance-workflows',
      description: 'Files de traitement construites a partir des risques et missions en attente.'
    },
    {
      title: 'Indicateurs de Maturite',
      route: '/dashboard/governance-maturity',
      description: 'KPIs alignes sur les indicateurs utilises par le Top Management.'
    },
    {
      title: 'Adhesion et Application',
      route: '/dashboard/governance-adoption',
      description: 'Couverture d execution reelle sur les risques et les missions.'
    }
  ];

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
}
