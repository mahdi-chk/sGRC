import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus, AuditMissionHorizon, AuditRecordType } from '../../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAuditManagementNavItems, getStoredAuditRole } from '../../../../modules/auditing/audit-navigation';
import { RadarChartSeries } from '../../../../shared/components/radar-chart/radar-chart.component';

interface AuditDistributionItem {
    label: string;
    count: number;
    percent: number;
    className?: string;
}

interface AuditTimelineItem {
    label: string;
    count: number;
    completed: number;
    percent: number;
    completionPercent: number;
}

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
    auditMissionCount: number = 0;
    actionPlanCount: number = 0;
    averageProgress: number = 0;
    overdueCount: number = 0;
    dueSoonCount: number = 0;
    assignedRate: number = 0;
    unassignedCount: number = 0;
    typeDistribution: AuditDistributionItem[] = [];
    horizonDistribution: AuditDistributionItem[] = [];
    categoryDistribution: AuditDistributionItem[] = [];
    auditorDistribution: AuditDistributionItem[] = [];
    timelineDistribution: AuditTimelineItem[] = [];
    showExportMenu = false;
    auditRadarSeries: RadarChartSeries[] = [];

    readonly auditRadarLabels = [
        'Completion',
        'Ponctualite',
        'Assignation',
        'Progression',
        'Retards maitrises',
        'Couverture actions'
    ];



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
        return getAuditManagementNavItems(this.currentUserRole);
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        forkJoin({
            missions: this.auditingService.getMissions(AuditRecordType.MISSION_AUDIT),
            actionPlans: this.auditingService.getMissions(AuditRecordType.PLAN_ACTION_AUDIT)
        }).subscribe(({ missions, actionPlans }) => {
            const recordsById = new Map<number, AuditMission>();
            [...missions, ...actionPlans].forEach(record => recordsById.set(record.id, record));
            this.missions = Array.from(recordsById.values());
            this.calculateExtendedStats();
        });
    }



    calculateExtendedStats() {
        this.totalMissions = this.missions.length;
        this.statusStats = {
            'OK': 0,
            'En cours': 0,
            'NOK': 0
        };

        this.statusSummary = { OK: 0, 'En cours': 0, NOK: 0 };
        this.overdueCount = 0;
        this.dueSoonCount = 0;

        const typeCounts: { [key: string]: number } = {};
        const horizonCounts: { [key: string]: number } = {};
        const categoryCounts: { [key: string]: number } = {};
        const auditorCounts: { [key: string]: number } = {};
        const timelineCounts: { [key: string]: { label: string; count: number; completed: number; sortKey: string } } = {};
        let assignedCount = 0;
        let progressTotal = 0;
        const today = this.startOfDay(new Date());
        const soonLimit = new Date(today);
        soonLimit.setDate(soonLimit.getDate() + 30);

        this.missions.forEach(m => {
            const statusBucket = this.getStatusBucket(m);
            if (statusBucket === 'OK') {
                this.statusSummary.OK++;
                this.statusStats['OK']++;
            } else if (statusBucket === 'NOK') {
                this.statusSummary.NOK++;
                this.statusStats['NOK']++;
            } else {
                this.statusSummary['En cours']++;
                this.statusStats['En cours']++;
            }

            const typeLabel = this.getMissionTypeLabel(m);
            typeCounts[typeLabel] = (typeCounts[typeLabel] || 0) + 1;

            const horizonLabel = this.getHorizonLabel(m);
            horizonCounts[horizonLabel] = (horizonCounts[horizonLabel] || 0) + 1;

            const categoryLabel = this.getCategoryLabel(m);
            categoryCounts[categoryLabel] = (categoryCounts[categoryLabel] || 0) + 1;

            const auditorLabel = this.getAuditorLabel(m);
            auditorCounts[auditorLabel] = (auditorCounts[auditorLabel] || 0) + 1;

            if (this.isRecordAssigned(m)) {
                assignedCount++;
            }

            progressTotal += this.getMissionProgress(m, statusBucket);

            const dueDate = this.getDueDate(m);
            if (dueDate && statusBucket !== 'OK') {
                const dueDay = this.startOfDay(dueDate);
                if (dueDay < today) {
                    this.overdueCount++;
                } else if (dueDay <= soonLimit) {
                    this.dueSoonCount++;
                }
            }

            const period = this.getTimelinePeriod(m);
            if (!timelineCounts[period.sortKey]) {
                timelineCounts[period.sortKey] = { label: period.label, count: 0, completed: 0, sortKey: period.sortKey };
            }
            timelineCounts[period.sortKey].count++;
            if (statusBucket === 'OK') {
                timelineCounts[period.sortKey].completed++;
            }
        });

        const completedCount = this.statusStats['OK'] || 0;
        this.completionRate = this.totalMissions > 0 ? Math.round((completedCount / this.totalMissions) * 100) : 0;

        const delayedCount = this.statusStats['NOK'] || 0;
        this.delayedRate = this.totalMissions > 0 ? Math.round((delayedCount / this.totalMissions) * 100) : 0;

        const onTimeCount = this.missions.filter(mission => this.isMissionCompletedOnTime(mission)).length;
        this.onTimeRate = this.totalMissions > 0 ? Math.round((onTimeCount / this.totalMissions) * 100) : 0;

        const summaryTotal = this.totalMissions;
        this.statusSummaryPercentages = [
            { label: 'OK', count: this.statusSummary.OK, percent: summaryTotal ? Math.round((this.statusSummary.OK / summaryTotal) * 100) : 0, class: 'ok' },
            { label: 'En cours', count: this.statusSummary['En cours'], percent: summaryTotal ? Math.round((this.statusSummary['En cours'] / summaryTotal) * 100) : 0, class: 'progress' },
            { label: 'NOK', count: this.statusSummary.NOK, percent: summaryTotal ? Math.round((this.statusSummary.NOK / summaryTotal) * 100) : 0, class: 'nok' }
        ];

        this.auditMissionCount = typeCounts['Missions d audit'] || 0;
        this.actionPlanCount = typeCounts['Plans d action'] || 0;
        this.averageProgress = this.totalMissions > 0 ? Math.round(progressTotal / this.totalMissions) : 0;
        this.assignedRate = this.totalMissions > 0 ? Math.round((assignedCount / this.totalMissions) * 100) : 0;
        this.unassignedCount = Math.max(this.totalMissions - assignedCount, 0);
        this.typeDistribution = this.toDistribution(typeCounts);
        this.horizonDistribution = this.toDistribution(horizonCounts);
        this.categoryDistribution = this.toDistribution(categoryCounts, 6);
        this.auditorDistribution = this.toDistribution(auditorCounts, 6);
        const timelineItems = Object.values(timelineCounts)
            .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
            .slice(-6);
        const timelinePeak = Math.max(...timelineItems.map(item => item.count), 1);
        this.timelineDistribution = timelineItems
            .map(item => ({
                label: item.label,
                count: item.count,
                completed: item.completed,
                percent: Math.round((item.count / timelinePeak) * 100),
                completionPercent: item.count ? Math.round((item.completed / item.count) * 100) : 0
            }));
        this.refreshAuditRadarSeries();
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

        const onTimeCount = this.missions.filter(mission => this.isMissionCompletedOnTime(mission)).length;
        this.onTimeRate = this.totalMissions > 0 ? Math.round((onTimeCount / this.totalMissions) * 100) : 0;

        const summaryTotal = this.totalMissions;
        this.statusSummaryPercentages = [
            { label: 'OK', count: this.statusSummary.OK, percent: summaryTotal ? Math.round((this.statusSummary.OK / summaryTotal) * 100) : 0, class: 'ok' },
            { label: 'En cours', count: this.statusSummary['En cours'], percent: summaryTotal ? Math.round((this.statusSummary['En cours'] / summaryTotal) * 100) : 0, class: 'progress' },
            { label: 'NOK', count: this.statusSummary.NOK, percent: summaryTotal ? Math.round((this.statusSummary.NOK / summaryTotal) * 100) : 0, class: 'nok' }
        ];
        this.refreshAuditRadarSeries();
    }

    refreshAuditRadarSeries() {
        const overdueControl = 100 - this.getAuditPercent(this.overdueCount);
        const actionCoverage = this.totalMissions > 0 ? Math.round((this.actionPlanCount / this.totalMissions) * 100) : 0;

        this.auditRadarSeries = [
            {
                label: 'Performance actuelle',
                values: [
                    this.completionRate,
                    this.onTimeRate,
                    this.assignedRate,
                    this.averageProgress,
                    overdueControl,
                    actionCoverage
                ],
                color: '#2563eb',
                fillColor: 'rgba(37, 99, 235, 0.18)'
            },
            {
                label: 'Objectif cible',
                values: [85, 90, 90, 80, 95, 60],
                color: '#f59e0b',
                fillColor: 'rgba(245, 158, 11, 0.12)'
            }
        ];
    }

    getAuditPercent(value: number): number {
        return this.totalMissions > 0 ? Math.round((value / this.totalMissions) * 100) : 0;
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
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v]),
            [''],
            ['Repartition par type', '', ''],
            ...this.typeDistribution.map(item => ['Type', item.label, item.count]),
            [''],
            ['Repartition par horizon', '', ''],
            ...this.horizonDistribution.map(item => ['Horizon', item.label, item.count]),
            [''],
            ['Top categories', '', ''],
            ...this.categoryDistribution.map(item => ['Categorie', item.label, item.count]),
            [''],
            ['Charge par auditeur', '', ''],
            ...this.auditorDistribution.map(item => ['Auditeur', item.label, item.count])
        ];

        rows.splice(
            5,
            0,
            ['Vue d\'ensemble', 'Progression moyenne', this.averageProgress + '%'],
            ['Vue d\'ensemble', 'Echeances depassees', this.overdueCount],
            ['Vue d\'ensemble', 'Echeances a 30 jours', this.dueSoonCount],
            ['Vue d\'ensemble', 'Taux d assignation', this.assignedRate + '%']
        );

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

        overviewData.push(
            ['Progression moyenne', this.averageProgress + '%'],
            ['Echeances depassees', this.overdueCount.toString()],
            ['Echeances a 30 jours', this.dueSoonCount.toString()],
            ['Taux d assignation', this.assignedRate + '%']
        );

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

        const distributionData = [
            ...this.typeDistribution.map(item => ['Type', item.label, item.count.toString(), item.percent + '%']),
            ...this.horizonDistribution.map(item => ['Horizon', item.label, item.count.toString(), item.percent + '%']),
            ...this.categoryDistribution.map(item => ['Categorie', item.label, item.count.toString(), item.percent + '%'])
        ];

        doc.setFontSize(14);
        doc.text('Indicateurs complementaires', 14, (doc as any).lastAutoTable.finalY + 15);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [['Axe', 'Libelle', 'Nombre', 'Part']],
            body: distributionData,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153] }
        });

        doc.save(`statistiques_audit_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    private getStatusBucket(mission: AuditMission): 'OK' | 'En cours' | 'NOK' {
        const rawStatus = this.normalizeCode((mission as any).statutCode || mission.statut);
        if (rawStatus === 'ok' || rawStatus === 'termine' || rawStatus === 'terminé' || rawStatus === 'terminã©') {
            return 'OK';
        }
        if (rawStatus === 'nok' || rawStatus === 'en_retard' || rawStatus.includes('retard') || rawStatus === 'annule' || rawStatus === 'annulé' || rawStatus === 'annulã©') {
            return 'NOK';
        }
        return rawStatus === AuditMissionStatus.EN_COURS || rawStatus === 'in_progress' || rawStatus.includes('cours') ? 'En cours' : 'NOK';
    }

    private getMissionTypeLabel(mission: AuditMission): string {
        return this.isActionPlan(mission) ? 'Plans d action' : 'Missions d audit';
    }

    private getHorizonLabel(mission: AuditMission): string {
        const horizon = (mission.horizon || '').toString();
        return this.horizonLabelMap[horizon] || this.formatLabel(horizon || 'Non renseigne');
    }

    private getCategoryLabel(mission: AuditMission): string {
        return this.formatLabel(mission.category || mission.categoryCode || mission.axe || 'Non categorise');
    }

    private getAuditorLabel(mission: AuditMission): string {
        const name = this.formatUserName(mission.auditeur)
            || (this.isActionPlan(mission) ? this.formatLabel(mission.responsabilites || '') : '');
        return this.formatLabel(name || 'Non assigne');
    }

    private isRecordAssigned(mission: AuditMission): boolean {
        if (mission.auditeurId || this.formatUserName(mission.auditeur)) {
            return true;
        }
        return this.isActionPlan(mission) && !!String(mission.responsabilites || '').trim();
    }

    private getMissionProgress(mission: AuditMission, statusBucket: 'OK' | 'En cours' | 'NOK'): number {
        const explicitProgress = Number(mission.progressPercent);
        if (!Number.isNaN(explicitProgress) && explicitProgress >= 0) {
            return Math.min(Math.round(explicitProgress), 100);
        }
        if (statusBucket === 'OK') {
            return 100;
        }
        if (statusBucket === 'NOK') {
            return 0;
        }
        return 50;
    }

    private getDueDate(mission: AuditMission): Date | null {
        const candidate = mission.datePrevueFin || (mission as any).echeance || mission.delai;
        if (!candidate) {
            return null;
        }
        const date = new Date(candidate);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    private isMissionCompletedOnTime(mission: AuditMission): boolean {
        if (this.getStatusBucket(mission) !== 'OK') {
            return false;
        }

        const dueDate = this.getDueDate(mission);
        const realEndDate = this.parseDate(mission.dateReelleFin);
        if (!dueDate || !realEndDate) {
            return true;
        }

        return this.startOfDay(realEndDate) <= this.startOfDay(dueDate);
    }

    private getTimelinePeriod(mission: AuditMission): { label: string; sortKey: string } {
        const date = this.getDueDate(mission) || this.parseDate(mission.datePrevueDebut) || this.parseDate(mission.createdAt) || new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return {
            label: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
            sortKey: `${year}-${String(month + 1).padStart(2, '0')}`
        };
    }

    private parseDate(value: string | Date | null | undefined): Date | null {
        if (!value) {
            return null;
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    private startOfDay(date: Date): Date {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    }

    private isActionPlan(mission: AuditMission): boolean {
        return this.normalizeCode(mission.type) === AuditRecordType.PLAN_ACTION_AUDIT;
    }

    private normalizeCode(value: unknown): string {
        return String(value || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }

    private formatUserName(user: any): string {
        if (!user) {
            return '';
        }
        return [
            user.prenom,
            user.nom
        ].filter(Boolean).join(' ').trim()
            || user.fullName
            || user.name
            || user.mail
            || user.email
            || user.username
            || '';
    }

    private toDistribution(counts: { [key: string]: number }, limit?: number): AuditDistributionItem[] {
        const items = Object.entries(counts)
            .map(([label, count], index) => ({
                label,
                count,
                percent: this.totalMissions ? Math.round((count / this.totalMissions) * 100) : 0,
                className: `series-${(index % 6) + 1}`
            }))
            .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

        return typeof limit === 'number' ? items.slice(0, limit) : items;
    }

    private formatLabel(value: string): string {
        const cleaned = value.toString().trim().replace(/_/g, ' ');
        if (!cleaned) {
            return 'Non renseigne';
        }
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
