import { Component, OnInit } from '@angular/core';
import {
    AuditingService,
    AuditMission,
    AuditMissionStatus,
    AuditEvidence,
    AuditMissionHorizon,
    AuditRecordType
} from '../../core/services/auditing.service';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { getAuditNavItems, getStoredAuditRole } from './audit-navigation';

@Component({
    selector: 'app-auditor-missions',
    templateUrl: './auditor-missions.component.html',
    styleUrls: ['./auditor-missions.component.scss']
})
export class AuditorMissionsComponent implements OnInit {
    missions: AuditMission[] = [];
    filteredMissions: AuditMission[] = [];
    pagedMissions: AuditMission[] = [];
    isLoading = false;
    currentUserRole: UserRole | null = getStoredAuditRole();

    currentPage = 1;
    pageSize = 10;
    readonly pageSizeOptions = [10, 25, 50, 100];

    totalAssigned = 0;
    inProgressCount = 0;
    pendingCount = 0;
    completedCount = 0;

    filterSearch = '';
    filterStatus = '';

    showReportModal = false;
    showDetailModal = false;
    showChecklistModal = false;
    showEvidenceModal = false;
    selectedMission: AuditMission | null = null;
    currentChecklistItems: any[] = [];
    currentEvidences: AuditEvidence[] = [];
    selectedFile: File | null = null;
    isUploading = false;
    backendUrl = environment.apiUrl.replace('/api', '');

    reportData = {
        rapport: '',
        recommandations: ''
    };

    AuditMissionStatus = AuditMissionStatus;
    AuditMissionHorizon = AuditMissionHorizon;
    AuditRecordType = AuditRecordType;

    statusLabelMap: Record<string, string> = {
        [AuditMissionStatus.NOK]: 'NOK',
        [AuditMissionStatus.EN_COURS]: 'En cours',
        [AuditMissionStatus.OK]: 'OK'
    };

    horizonLabelMap: Record<string, string> = {
        [AuditMissionHorizon.COURT_TERME]: 'A court terme',
        [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
    };

    recordTypeLabelMap: Record<string, string> = {
        [AuditRecordType.MISSION_AUDIT]: 'Mission',
        [AuditRecordType.PLAN_ACTION_AUDIT]: 'Plan d action'
    };

    constructor(
        private auditingService: AuditingService,
        private router: Router
    ) { }

    get navItems() {
        return getAuditNavItems(this.currentUserRole);
    }

    ngOnInit() {
        this.loadMyMissions();
    }

    loadMyMissions() {
        this.isLoading = true;
        const userStr = sessionStorage.getItem('sgrc_user');
        if (!userStr) {
            this.isLoading = false;
            return;
        }

        const currentUser = JSON.parse(userStr);
        const userId = Number(currentUser.id);
        this.currentUserRole = currentUser.role || null;

        this.auditingService.getMissions('all').subscribe({
            next: (data) => {
                this.missions = this.isSuperAdmin
                    ? data
                    : data.filter((mission) => Number(mission.auditeurId) === userId);
                this.applyFilters();
                this.calculateStats();
                this.updatePagedMissions();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    applyFilters() {
        this.filteredMissions = this.missions.filter((mission) => {
            const q = this.filterSearch.toLowerCase();
            const matchSearch = !this.filterSearch
                || String(mission.id).includes(q)
                || (mission.titre || '').toLowerCase().includes(q)
                || (mission.regleDnssi || '').toLowerCase().includes(q)
                || (mission.recommandations || mission.objectifs || '').toLowerCase().includes(q)
                || (mission.responsabilites || '').toLowerCase().includes(q)
                || (mission.risk?.titre || '').toLowerCase().includes(q)
                || (mission.sourceMission?.titre || '').toLowerCase().includes(q)
                || (mission.auditSenior && `${mission.auditSenior.prenom} ${mission.auditSenior.nom}`.toLowerCase().includes(q));

            const missionStatut = this.normalizeMissionStatus((mission as any).statutCode || mission.statut);
            const filterStatut = this.normalizeMissionStatus(this.filterStatus);
            const matchStatus = !filterStatut || missionStatut === filterStatut;

            return matchSearch && matchStatus;
        });
        this.currentPage = 1;
        this.updatePagedMissions();
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

    onFilterChange() {
        this.applyFilters();
    }

    clearFilters() {
        this.filterSearch = '';
        this.filterStatus = '';
        this.applyFilters();
    }

    calculateStats() {
        const normalizedStatuses = this.missions.map((mission) =>
            this.normalizeMissionStatus((mission as any).statutCode || mission.statut)
        );

        this.totalAssigned = this.missions.length;
        this.inProgressCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.EN_COURS).length;
        this.pendingCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.NOK).length;
        this.completedCount = normalizedStatuses.filter((status) => status === AuditMissionStatus.OK).length;
    }

    normalizeMissionStatus(value?: string | null): string {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }

    getNormalizedStatus(mission: AuditMission | null | undefined): string {
        return this.normalizeMissionStatus((mission as any)?.statutCode || mission?.statut);
    }

    isMissionRecord(mission: AuditMission | null | undefined): boolean {
        return (mission?.type || AuditRecordType.MISSION_AUDIT) === AuditRecordType.MISSION_AUDIT;
    }

    isActionPlanRecord(mission: AuditMission | null | undefined): boolean {
        return mission?.type === AuditRecordType.PLAN_ACTION_AUDIT;
    }

    getRecordTypeLabel(mission: AuditMission | null | undefined): string {
        const type = mission?.type || AuditRecordType.MISSION_AUDIT;
        return this.recordTypeLabelMap[type] || 'Enregistrement';
    }

    getDisplayTitle(mission: AuditMission | null | undefined): string {
        if (!mission) {
            return '-';
        }

        return mission.regleDnssi || mission.titre || `Enregistrement #${mission.id}`;
    }

    getDisplayDescription(mission: AuditMission | null | undefined): string {
        if (!mission) {
            return '-';
        }

        return mission.recommandations || mission.objectifs || mission.responsabilites || '-';
    }

    getStatusLabel(value?: string | null): string {
        const normalized = this.normalizeMissionStatus(value);
        return this.statusLabelMap[normalized] || value || '-';
    }

    openDetailModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.showDetailModal = true;
    }

    openReportModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.reportData = {
            rapport: mission.rapport || '',
            recommandations: mission.recommandations || ''
        };
        this.showReportModal = true;
    }

    openChecklistModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.isLoading = true;
        const targetMissionId = mission.sourceMissionId || mission.id;
        this.auditingService.getMissionActionPlanItems(targetMissionId).subscribe({
            next: (items) => {
                this.currentChecklistItems = items as any[];
                this.isLoading = false;
                this.showChecklistModal = true;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors du chargement du plan d actions.');
            }
        });
    }

    openEvidenceModal(mission: AuditMission) {
        this.selectedMission = mission;
        this.loadEvidences(mission.id);
        this.showEvidenceModal = true;
    }

    loadEvidences(missionId: number) {
        this.isLoading = true;
        this.auditingService.getMissionEvidence(missionId).subscribe({
            next: (data) => {
                this.currentEvidences = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    uploadEvidence() {
        if (!this.selectedMission || !this.selectedFile) {
            return;
        }

        this.isUploading = true;
        this.auditingService.addMissionEvidence(this.selectedMission.id, this.selectedFile).subscribe({
            next: (newEvidence) => {
                this.currentEvidences.unshift(newEvidence);
                this.selectedFile = null;
                this.isUploading = false;
            },
            error: (err) => {
                console.error(err);
                this.isUploading = false;
                alert('Erreur lors de l upload du fichier.');
            }
        });
    }

    deleteEvidence(evidenceId: number) {
        if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?')) {
            return;
        }

        this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
            next: () => {
                this.currentEvidences = this.currentEvidences.filter((evidence) => evidence.id !== evidenceId);
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la suppression.');
            }
        });
    }

    downloadEvidence(path: string) {
        const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
        const normalizedPath = path.replace(/\\/g, '/');
        const finalPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
        const token = sessionStorage.getItem('sgrc_token');
        const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;

        window.open(urlWithToken, '_blank');
    }

    submitReport() {
        if (!this.selectedMission) {
            return;
        }

        this.isLoading = true;
        this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
            next: () => {
                this.isLoading = false;
                this.showReportModal = false;
                this.loadMyMissions();
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert('Erreur lors de l envoi du rapport.');
            }
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    get isSuperAdmin(): boolean {
        return this.currentUserRole === UserRole.SUPER_ADMIN;
    }
}
