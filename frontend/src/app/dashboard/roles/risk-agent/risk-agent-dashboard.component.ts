import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk, RiskStatus } from '../../../core/services/risk.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-risk-agent-dashboard',
    templateUrl: './risk-agent-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class RiskAgentDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Risk Agent';
    @Output() openModule = new EventEmitter<any>();

    allRisks: Risk[] = [];
    assignedRisks: Risk[] = [];
    urgentRisks: Risk[] = [];

    stats = {
        total: 0,
        unprocessed: 0,
        urgent: 0
    };

    currentUser: any;

    constructor(
        private router: Router,
        private riskService: RiskService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe((user: any) => {
            this.currentUser = user;
            if (this.currentUser) {
                this.loadRisks();
            }
        });
    }

    loadRisks() {
        this.riskService.getRisks().subscribe((risks: Risk[]) => {
            this.allRisks = risks;
            this.assignedRisks = risks.filter((r: Risk) => r.riskAgentId === this.currentUser.id);
            this.calculateStats();
        });
    }

    calculateStats() {
        this.stats.total = this.assignedRisks.length;
        this.stats.unprocessed = this.assignedRisks.filter(r =>
            r.statut === RiskStatus.OPEN || r.statut === RiskStatus.IN_PROGRESS
        ).length;

        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        this.urgentRisks = this.assignedRisks.filter(r => {
            if (r.statut === RiskStatus.TREATED || r.statut === RiskStatus.CLOSED) return false;
            const dueDate = new Date(r.dateEcheance);
            return dueDate <= nextWeek;
        });

        this.stats.urgent = this.urgentRisks.length;

        // Sort urgent risks by proximity of date
        this.urgentRisks.sort((a, b) => new Date(a.dateEcheance).getTime() - new Date(b.dateEcheance).getTime());
    }

    goToAssignedRisks() {
        this.router.navigate(['/dashboard/assigned-risks']);
    }

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
