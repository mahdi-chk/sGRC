import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuditingService, AuditMission } from '../../../core/services/auditing.service';

@Component({
    selector: 'app-audit-senior-dashboard',
    templateUrl: './audit-senior-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class AuditSeniorDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Audit';
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
        const scopedMissions = missions.filter((mission) => !this.isCancelledMission(mission));

        this.stats.total = scopedMissions.length;
        this.stats.completed = scopedMissions.filter((mission) => this.isCompletedMission(mission)).length;
        this.stats.overdue = scopedMissions.filter((mission) => this.isOverdueMission(mission)).length;
        this.stats.inProgress = scopedMissions.filter((mission) =>
            !this.isCompletedMission(mission) && !this.isOverdueMission(mission)
        ).length;

        if (scopedMissions.length > 0) {
            this.stats.completionRate = Math.round((this.stats.completed / scopedMissions.length) * 100);
        } else {
            this.stats.completionRate = 0;
        }
    }

    private isCompletedMission(mission: AuditMission): boolean {
        const status = this.getMissionStatus(mission);
        return ['ok', 'termine', 'completed', 'closed', 'clos'].includes(status);
    }

    private isOverdueMission(mission: AuditMission): boolean {
        const status = this.getMissionStatus(mission);
        if (['en_retard', 'late', 'overdue'].includes(status)) {
            return true;
        }

        const dueDate = this.getMissionDueDate(mission);
        if (!dueDate || this.isCompletedMission(mission)) {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate.getTime() < today.getTime();
    }

    private isCancelledMission(mission: AuditMission): boolean {
        const status = this.getMissionStatus(mission);
        return ['annule', 'annulee', 'cancelled', 'canceled'].includes(status);
    }

    private getMissionStatus(mission: AuditMission): string {
        return this.normalizeMissionStatus((mission as any).statutCode || mission.statut);
    }

    private getMissionDueDate(mission: AuditMission): Date | null {
        const value = mission.datePrevueFin || mission.delai;
        if (!value) {
            return null;
        }

        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
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
