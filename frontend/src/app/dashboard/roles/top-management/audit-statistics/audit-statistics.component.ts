import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    showExportMenu = false;

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
        // Replaced by XLSX and PDF
    }

    exportToXLSX() {
        this.showExportMenu = false;
        const rows = [
            ['Catégorie', 'Métrique', 'Valeur'],
            ['Vue d\'ensemble', 'Total Missions', this.totalMissions],
            ['Vue d\'ensemble', 'Taux de Complétion', this.completionRate + '%'],
            ['Vue d\'ensemble', 'Taux de Retard', this.delayedRate + '%'],
            ['Vue d\'ensemble', 'Taux à Temps', this.onTimeRate + '%'],
            [''],
            ['État d\'Avancement des Missions', '', ''],
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v])
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Statistiques Audit');
        XLSX.writeFile(wb, `statistiques_audit_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportToPDF() {
        this.showExportMenu = false;
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.setFontSize(18);
        doc.text('Statistiques d\'Audit', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

        const overviewData = [
            ['Missions Totales', this.totalMissions.toString()],
            ['Taux de Complétion', this.completionRate + '%'],
            ['Taux de Retard', this.delayedRate + '%'],
            ['Taux à Temps', this.onTimeRate + '%']
        ];

        autoTable(doc, {
            startY: 40,
            head: [['Métrique', 'Valeur']],
            body: overviewData,
            theme: 'grid',
            headStyles: { fillColor: [0, 74, 153] }
        });

        const statusData = Object.entries(this.statusStats).map(([k, v]) => [k, v.toString()]);

        doc.setFontSize(14);
        doc.text('État d\'Avancement', 14, (doc as any).lastAutoTable.finalY + 15);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [['Statut', 'Nombre']],
            body: statusData,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });

        doc.save(`statistiques_audit_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
