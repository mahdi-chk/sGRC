import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-audit-statistics',
    templateUrl: './audit-statistics.component.html',
    styleUrls: ['../../../dashboard.component.scss']
})
export class AuditStatisticsComponent implements OnInit {
    missions: AuditMission[] = [];

    // Stats for Charts
    statusStats: { [key: string]: number } = {};

    totalMissions: number = 0;
    completionRate: number = 0;
    delayedRate: number = 0;
    onTimeRate: number = 0;

    constructor(private auditingService: AuditingService, private router: Router) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.auditingService.getMissions().subscribe(missions => {
            this.missions = missions;
            this.totalMissions = missions.length;
            this.calculateStats();
        });
    }

    calculateStats() {
        this.statusStats = {
            'À venir': 0,
            'En cours': 0,
            'Terminé': 0,
            'En retard': 0,
            'Annulé': 0
        };

        this.missions.forEach(m => {
            if (this.statusStats[m.statut] !== undefined) {
                this.statusStats[m.statut]++;
            }
        });

        const completedCount = this.statusStats['Terminé'] || 0;
        this.completionRate = this.totalMissions > 0 ? Math.round((completedCount / this.totalMissions) * 100) : 0;

        const delayedCount = this.statusStats['En retard'] || 0;
        this.delayedRate = this.totalMissions > 0 ? Math.round((delayedCount / this.totalMissions) * 100) : 0;

        // On time rate = (Total - Late - Canceled) / Total
        const onTimeCount = this.totalMissions - delayedCount - (this.statusStats['Annulé'] || 0);
        this.onTimeRate = this.totalMissions > 0 ? Math.round((onTimeCount / this.totalMissions) * 100) : 0;
    }

    // Helper for CSS Pie Charts
    getRotation(value: number, total: number): number {
        return total > 0 ? (value / total) * 360 : 0;
    }

    exportCSV() {
        const rows = [
            ['Categorie', 'Metrique', 'Valeur'],
            ['Overview', 'Total Missions', this.totalMissions],
            ['Overview', 'Taux de Complétion', this.completionRate + '%'],
            ['Overview', 'Taux de Retard', this.delayedRate + '%'],
            [''],
            ['État d\'Avancement des Missions', '', ''],
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v])
        ];

        const csvContent = rows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `statistiques_audit_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
