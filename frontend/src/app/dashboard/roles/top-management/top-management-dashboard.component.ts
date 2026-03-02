import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RiskService, Risk, RiskLevel, RiskStatus } from '../../../core/services/risk.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
    selector: 'app-top-management-dashboard',
    templateUrl: './top-management-dashboard.component.html'
})
export class TopManagementDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Top Management';
    @Output() openModule = new EventEmitter<any>();

    risks: Risk[] = [];
    totalRisks: number = 0;
    criticalRisks: number = 0;
    maturityLevel: number = 0;
    treatmentRate: number = 0;

    constructor(
        private riskService: RiskService,
        private router: Router,
        private authService: AuthService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.loadStatistics();
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && user?.role) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }

    loadStatistics() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.totalRisks = risks.length;
            this.criticalRisks = risks.filter(r => r.niveauRisque === RiskLevel.CRITICAL).length;

            const treatedCount = risks.filter(r => r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED).length;
            this.treatmentRate = this.totalRisks > 0 ? Math.round((treatedCount / this.totalRisks) * 100) : 0;

            // Real maturity calculation: (Base 2.5) + (2.5 * treatmentRate/100)
            this.maturityLevel = Number((2.5 + (2.5 * (this.treatmentRate / 100))).toFixed(1));
        });
    }

    onOpenModule(m: any, s: any) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }

    goToStatistics() {
        this.router.navigate(['/dashboard/statistics']);
    }
}
