import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus, AuditMissionHorizon } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAuditNavItems, getStoredAuditRole } from '../../../../modules/auditing/audit-navigation';

@Component({
    selector: 'app-audit-statistics',
    templateUrl: './audit-statistics.component.html',
    styleUrls: ['../../../dashboard.component.scss', '../../../../modules/auditing/auditing.component.scss']
})
export class AuditStatisticsComponent implements OnInit {
    currentUserRole = getStoredAuditRole();
    missions: AuditMission[] = [];


    // Stats for Charts
    statusStats: { [key: string]: number } = {};
    statusSummary: { OK: number; 'En cours': number; NOK: number } = { OK: 0, 'En cours': 0, NOK: 0 };
    statusSummaryPercentages: { label: string; count: number; percent: number; class: string }[] = [];

    totalMissions: number = 0;
    completionRate: number = 0;
    delayedRate: number = 0;
    onTimeRate: number = 0;
    showExportMenu = false;



    AuditMissionStatus = AuditMissionStatus;

    statusLabelMap: Record<string, string> = {
        [AuditMissionStatus.NOK]: 'NOK',
        [AuditMissionStatus.EN_COURS]: 'En cours',
        [AuditMissionStatus.OK]: 'OK'
    };

    horizonLabelMap: Record<string, string> = {
        [AuditMissionHorizon.COURT_TERME]: 'A court terme',
        [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
    };

    constructor(private auditingService: AuditingService, private router: Router) { }

    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.auditingService.getMissions('all').subscribe(missions => {
            this.missions = missions;
            this.totalMissions = missions.length;
            this.calculateStats();
        });
    }



    calculateStats() {
        this.statusStats = {
            'OK': 0,
            'En cours': 0,
            'NOK': 0
        };

        this.statusSummary = { OK: 0, 'En cours': 0, NOK: 0 };
        this.missions.forEach(m => {
            const rawStatus = (m.statut || '').toString().trim().toLowerCase();
            if (rawStatus === 'ok' || rawStatus === 'termine' || rawStatus === 'terminé') {
                this.statusSummary.OK++;
                this.statusStats['OK']++;
            } else if (rawStatus === 'nok' || rawStatus === 'en_retard' || rawStatus.includes('retard') || rawStatus === 'annule' || rawStatus === 'annulé') {
                this.statusSummary.NOK++;
                this.statusStats['NOK']++;
            } else {
                this.statusSummary['En cours']++;
                this.statusStats['En cours']++;
            }
        });

        const completedCount = this.statusStats['OK'] || 0;
        this.completionRate = this.totalMissions > 0 ? Math.round((completedCount / this.totalMissions) * 100) : 0;

        const delayedCount = this.statusStats['NOK'] || 0;
        this.delayedRate = this.totalMissions > 0 ? Math.round((delayedCount / this.totalMissions) * 100) : 0;

        // On time rate = (OK + En cours) / Total
        const onTimeCount = this.statusStats['OK'] + this.statusStats['En cours'];
        this.onTimeRate = this.totalMissions > 0 ? Math.round((onTimeCount / this.totalMissions) * 100) : 0;

        const summaryTotal = this.totalMissions;
        this.statusSummaryPercentages = [
            { label: 'OK', count: this.statusSummary.OK, percent: summaryTotal ? Math.round((this.statusSummary.OK / summaryTotal) * 100) : 0, class: 'ok' },
            { label: 'En cours', count: this.statusSummary['En cours'], percent: summaryTotal ? Math.round((this.statusSummary['En cours'] / summaryTotal) * 100) : 0, class: 'progress' },
            { label: 'NOK', count: this.statusSummary.NOK, percent: summaryTotal ? Math.round((this.statusSummary.NOK / summaryTotal) * 100) : 0, class: 'nok' }
        ];
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
            ['Vue d\'ensemble', 'Total (Missions & PA)', this.totalMissions],
            ['Vue d\'ensemble', 'Taux de Complétion', this.completionRate + '%'],
            ['Vue d\'ensemble', 'Taux de Retard', this.delayedRate + '%'],
            ['Vue d\'ensemble', 'Taux à Temps', this.onTimeRate + '%'],
            [''],
            ['État d\'Avancement Global', '', ''],
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
            ['Total (Missions & PA)', this.totalMissions.toString()],
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
