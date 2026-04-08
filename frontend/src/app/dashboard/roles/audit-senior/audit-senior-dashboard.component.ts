import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../core/services/auditing.service';

@Component({
    selector: 'app-audit-senior-dashboard',
    templateUrl: './audit-senior-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class AuditSeniorDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Audit Senior';
    @Output() openModule = new EventEmitter<any>();
    @Output() toggleAssistant = new EventEmitter<void>();

    stats = {
        total: 0,
        completed: 0,
        inProgress: 0,
        overdue: 0,
        completionRate: 0
    };

    constructor(
        private authService: AuthService,
        private dashboardService: DashboardService,
        private auditingService: AuditingService
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                if (this.filteredModules.length === 0 && user.role) {
                    this.filteredModules = this.dashboardService.getFilteredModules(user.role);
                }
                this.loadPerformanceStats();
            }
        });
    }

    loadPerformanceStats() {
        this.auditingService.getMissions().subscribe(missions => {
            this.calculatePerformance(missions);
        });
    }

    calculatePerformance(missions: AuditMission[]) {
        const normalizedStatuses = missions.map((mission) =>
            this.normalizeMissionStatus((mission as any).statutCode || mission.statut)
        );
        const scopedStatuses = normalizedStatuses.filter((status) => status !== AuditMissionStatus.ANNULE);

        this.stats.total = scopedStatuses.length;
        this.stats.completed = scopedStatuses.filter((status) => status === AuditMissionStatus.TERMINE).length;
        this.stats.inProgress = scopedStatuses.filter((status) =>
            status === AuditMissionStatus.EN_COURS || status === AuditMissionStatus.A_VENIR
        ).length;
        this.stats.overdue = scopedStatuses.filter((status) => status === AuditMissionStatus.EN_RETARD).length;

        if (scopedStatuses.length > 0) {
            this.stats.completionRate = Math.round((this.stats.completed / scopedStatuses.length) * 100);
        } else {
            this.stats.completionRate = 0;
        }
    }

    private normalizeMissionStatus(value?: string | null): string {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }

    onOpenModule(m: any, s: any) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }

    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
