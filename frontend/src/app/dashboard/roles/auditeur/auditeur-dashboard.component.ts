import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auditeur-dashboard',
    templateUrl: './auditeur-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class AuditeurDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Auditeur';
    @Output() openModule = new EventEmitter<any>();
    @Output() toggleAssistant = new EventEmitter<void>();

    allMissions: AuditMission[] = [];
    urgentMissions: AuditMission[] = [];
    currentUser: any;

    constructor(
        private authService: AuthService,
        private dashboardService: DashboardService,
        private auditingService: AuditingService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            if (user) {
                if (this.filteredModules.length === 0 && user.role) {
                    this.filteredModules = this.dashboardService.getFilteredModules(user.role);
                }
                this.loadMissions();
            }
        });
    }

    loadMissions() {
        this.auditingService.getMissions().subscribe(missions => {
            const userId = Number(this.currentUser.id);
            this.allMissions = missions.filter(m => Number(m.auditeurId) === userId);
            this.calculateUrgentMissions();
        });
    }

    calculateUrgentMissions() {
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        this.urgentMissions = this.allMissions.filter(m => {
            if (m.statut === AuditMissionStatus.TERMINE || m.statut === AuditMissionStatus.ANNULE) return false;
            const dueDate = new Date(m.delai);
            return dueDate <= nextWeek;
        });

        // Sort by deadline
        this.urgentMissions.sort((a, b) => new Date(a.delai).getTime() - new Date(b.delai).getTime());
    }

    goToMissions() {
        this.router.navigate(['/dashboard/auditor-missions']);
    }

    onOpenModule(m: any, s: any) {
        if (m.key === 'audit' || m.key === 'audit-auditeur') {
            if (s.title === 'Mes Missions') {
                this.goToMissions();
                return;
            }
        }
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }

    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
