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
    filteredMissions: AuditMission[] = [];
    pagedMissions: AuditMission[] = [];

    // Stats for Charts
    statusStats: { [key: string]: number } = {};
    statusSummary: { OK: number; 'En cours': number; NOK: number } = { OK: 0, 'En cours': 0, NOK: 0 };
    statusSummaryPercentages: { label: string; count: number; percent: number; class: string }[] = [];

    totalMissions: number = 0;
    completionRate: number = 0;
    delayedRate: number = 0;
    onTimeRate: number = 0;
    showExportMenu = false;

    // Table pagination
    currentPage = 1;
    pageSize = 10;
    readonly pageSizeOptions = [10, 25, 50, 100];
    filterSearch = '';
    filterStatus = '';

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
        this.auditingService.getMissions().subscribe(missions => {
            this.missions = missions;
            this.totalMissions = missions.length;
            this.applyFilters();
            this.calculateStats();
        });
    }

    applyFilters() {
        this.filteredMissions = this.missions.filter((m) => {
            const q = this.filterSearch.toLowerCase();
            const matchSearch = !this.filterSearch
                || String(m.id).includes(q)
                || (m.titre || '').toLowerCase().includes(q)
                || (m.regleDnssi || '').toLowerCase().includes(q)
                || (m.recommandations || m.objectifs || '').toLowerCase().includes(q)
                || (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(q))
                || (m.responsabilites || '').toLowerCase().includes(q);

            const missionStatut = this.normalizeMissionStatus((m as any).statutCode || m.statut);
            const filterStatut = this.normalizeMissionStatus(this.filterStatus);
            const matchStatus = !filterStatut || missionStatut === filterStatut;

            return matchSearch && matchStatus;
        });
        this.currentPage = 1;
        this.updatePagedMissions();
    }

    onFilterChange() {
        this.applyFilters();
    }

    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }

    onPaginationChange(event: { page: number; pageSize: number }) {
        this.currentPage = event.page;
        this.pageSize = event.pageSize;
        this.updatePagedMissions();
    }

    private updatePagedMissions() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedMissions = this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
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

    getRecommendationPreview(value?: string | null, maxWords: number = 10): string {
        const text = (value || '').trim();
        if (!text) {
            return '-';
        }

        const words = text.split(/\s+/);
        if (words.length <= maxWords) {
            return text;
        }

        return `${words.slice(0, maxWords).join(' ')}...`;
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

        this.statusSummary = { OK: 0, 'En cours': 0, NOK: 0 };
        this.missions.forEach(m => {
            const status = (m.statut || '').toString().trim();
            if (status.toLowerCase() === 'ok') {
                this.statusSummary.OK++;
            } else if (status.toLowerCase() === 'nok') {
                this.statusSummary.NOK++;
            } else {
                this.statusSummary['En cours']++;
            }
        });

        const summaryTotal = this.totalMissions;
        this.statusSummaryPercentages = [
            { label: 'OK', count: this.statusSummary.OK, percent: summaryTotal ? Math.round((this.statusSummary.OK / summaryTotal) * 100) : 0, class: 'ok' },
            { label: 'En cours', count: this.statusSummary['En cours'], percent: summaryTotal ? Math.round((this.statusSummary['En cours'] / summaryTotal) * 100) : 0, class: 'progress' },
            { label: 'NOK', count: this.statusSummary.NOK, percent: summaryTotal ? Math.round((this.statusSummary.NOK / summaryTotal) * 100) : 0, class: 'nok' }
        ];

        this.updatePagedMissions();
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
