import { Component, OnInit } from '@angular/core';
import {
  AuditingService,
  AuditMission,
  AuditMissionStatus,
  AuditMissionHorizon,
  AuditChecklistTemplate,
  AuditEvidence,
  AuditMissionChecklistItem,
  AuditRecordType
} from '../../core/services/auditing.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../../core/models/user-role.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAuditNavItems, getStoredAuditRole } from './audit-navigation';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.scss']
})
export class AuditingComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  missions: AuditMission[] = [];
  allUsers: any[] = [];
  auditors: any[] = [];
  checklistTemplates: AuditChecklistTemplate[] = [];
  filteredMissions: AuditMission[] = [];
  pagedMissions: AuditMission[] = [];
  showExportMenu = false;

  filterSearch = '';
  filterStatus = '';
  filterHorizon = '';
  filterPriority = '';

  totalMissions = 0;
  inProgressCount = 0;
  completedCount = 0;
  unassignedCount = 0;

  isLoadingMissions = false;
  isAssigning = false;
  isReporting = false;
  isSaving = false;
  isImporting = false;
  isCreateMode = false;

  showAssignModal = false;
  showReportModal = false;
  showDetailModal = false;
  showEvidenceModal = false;
  showChecklistModal = false;
  showEditModal = false;
  showImportModal = false;
  selectedMission: AuditMission | null = null;
  selectedAuditorId = '';
  currentEvidences: AuditEvidence[] = [];
  currentChecklistItems: AuditMissionChecklistItem[] = [];
  backendUrl = environment.apiUrl.replace('/api', '');
  importFile: File | null = null;
  importPlanActionType = '';

  reportData = {
    rapport: '',
    recommandations: ''
  };

  AuditMissionStatus = AuditMissionStatus;
  AuditMissionHorizon = AuditMissionHorizon;

  statusLabelMap: Record<string, string> = {
    [AuditMissionStatus.NOK]: 'NOK',
    [AuditMissionStatus.EN_COURS]: 'En cours',
    [AuditMissionStatus.OK]: 'OK'
  };

  horizonLabelMap: Record<string, string> = {
    [AuditMissionHorizon.COURT_TERME]: 'A court terme',
    [AuditMissionHorizon.MOYEN_TERME]: 'A moyen terme'
  };

  constructor(
    private auditingService: AuditingService,
    private http: HttpClient,
    private router: Router
  ) {}

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  ngOnInit() {
    if (this.isAuditor && !this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/auditor-missions']);
      return;
    }

    this.loadMissions();
    if (this.isAuditResponsible) {
      this.loadUsers();
    }
    this.loadTemplates();
  }

  loadTemplates() {
    this.auditingService.getChecklistTemplates().subscribe({
      next: (data) => this.checklistTemplates = data,
      error: (err) => console.error(err)
    });
  }

  get isSeniorAuditor(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDIT_DIRECTEUR || user.role === UserRole.AUDIT_RESPONSABLE || user.role === UserRole.SUPER_ADMIN;
  }

  get isAuditDirector(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDIT_DIRECTEUR || user.role === UserRole.SUPER_ADMIN;
  }

  get isAuditResponsible(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDIT_RESPONSABLE || user.role === UserRole.SUPER_ADMIN;
  }

  get isAuditor(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDITEUR || user.role === UserRole.SUPER_ADMIN;
  }

  loadMissions() {
    this.isLoadingMissions = true;
    this.auditingService.getMissions('all').subscribe({
      next: (data) => {
        this.missions = data;
        this.applyFilters();
        this.calculateStats();
        this.isLoadingMissions = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMissions = false;
      }
    });
  }

  applyFilters() {
    this.filteredMissions = this.missions.filter((mission) => {
      const q = this.filterSearch.toLowerCase();
      const matchSearch = !this.filterSearch
        || String(mission.id).includes(q)
        || (mission.titre || '').toLowerCase().includes(q)
        || (mission.objectifs || mission.recommandations || '').toLowerCase().includes(q)
        || (mission.auditeur && `${mission.auditeur.prenom} ${mission.auditeur.nom}`.toLowerCase().includes(q))
        || (mission.responsabilites || '').toLowerCase().includes(q);

      const missionStatut = this.normalizeMissionStatus((mission as any).statutCode || mission.statut);
      const filterStatut = this.normalizeMissionStatus(this.filterStatus);
      const matchStatus = !filterStatut || missionStatut === filterStatut;
      const matchHorizon = !this.filterHorizon || (mission.horizon || '') === this.filterHorizon;
      const matchPriority = !this.filterPriority || String(mission.priorite ?? '') === this.filterPriority;

      return matchSearch && matchStatus && matchHorizon && matchPriority;
    });

    this.updatePagedMissions();
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.filterSearch = '';
    this.filterStatus = '';
    this.filterHorizon = '';
    this.filterPriority = '';
    this.applyFilters();
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
    this.totalMissions = this.missions.length;
    this.inProgressCount = this.missions.filter((mission) => this.normalizeMissionStatus((mission as any).statutCode || mission.statut) === AuditMissionStatus.EN_COURS).length;
    this.completedCount = this.missions.filter((mission) => this.normalizeMissionStatus((mission as any).statutCode || mission.statut) === AuditMissionStatus.OK).length;
    this.unassignedCount = this.missions.filter((mission) => !mission.auditeurId).length;
  }

  private updatePagedMissions() {
    this.pagedMissions = [...this.filteredMissions];
  }

  loadUsers() {
    this.http.get<any[]>(`${environment.apiUrl}/users/assignable/auditors`).subscribe((users) => {
      this.allUsers = users;
      this.auditors = [...users];
    });
  }

  openDetailModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.showDetailModal = true;
  }

  openCreateModal() {
    this.isCreateMode = true;
    this.selectedMission = {
      id: 0,
      type: AuditRecordType.MISSION_AUDIT,
      planActionType: null,
      titre: '',
      objectifs: '',
      responsabilites: '',
      statut: AuditMissionStatus.NOK,
      riskId: null,
      auditSeniorId: 0,
      auditeurId: null,
      delai: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      regleDnssi: '',
      recommandations: '',
      ordre: 0,
      horizon: AuditMissionHorizon.COURT_TERME,
      priorite: 1
    };
    this.showEditModal = true;
  }

  openImportModal() {
    this.importFile = null;
    this.importPlanActionType = '';
    this.showImportModal = true;
  }

  onImportFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.importFile = input.files?.[0] || null;
  }

  importFromExcel() {
    if (!this.importFile) {
      alert('Veuillez selectionner un fichier Excel.');
      return;
    }

    this.isImporting = true;
    this.auditingService.importMissions(this.importFile, this.importPlanActionType).subscribe({
      next: () => {
        this.isImporting = false;
        this.showImportModal = false;
        this.importFile = null;
        this.importPlanActionType = '';
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isImporting = false;
        alert(err?.error?.error || err?.error?.message || 'Erreur lors de l import Excel.');
      }
    });
  }

  openAssignModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.selectedAuditorId = mission.auditeurId ? mission.auditeurId.toString() : '';
    this.showAssignModal = true;
  }

  openEditModal(mission: AuditMission) {
    this.isCreateMode = false;
    this.selectedMission = JSON.parse(JSON.stringify(mission));
    if (this.selectedMission?.delai) {
      this.selectedMission.delai = new Date(this.selectedMission.delai).toISOString().split('T')[0] as any;
    }
    if (!this.selectedMission?.type) {
      this.selectedMission!.type = AuditRecordType.MISSION_AUDIT;
    }
    this.showEditModal = true;
  }

  saveRecord() {
    if (!this.selectedMission) return;

    this.isSaving = true;
    const payload = {
      ...this.selectedMission,
      type: AuditRecordType.MISSION_AUDIT,
      planActionType: null,
      titre: this.selectedMission.titre || '',
      objectifs: this.selectedMission.objectifs || '',
      recommandations: this.selectedMission.recommandations || this.selectedMission.objectifs || ''
    };
    const request = this.isCreateMode
      ? this.auditingService.createMission(payload)
      : this.auditingService.updateMission(this.selectedMission.id, payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditModal = false;
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        alert('Erreur lors de la sauvegarde.');
      }
    });
  }

  assignMission(auditeurId: string = this.selectedAuditorId) {
    if (!this.selectedMission || !auditeurId) return;
    this.isAssigning = true;
    this.auditingService.assignMission(this.selectedMission.id, parseInt(auditeurId, 10)).subscribe({
      next: () => {
        this.isAssigning = false;
        this.showAssignModal = false;
        this.selectedAuditorId = '';
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isAssigning = false;
      }
    });
  }

  canAssignAuditor(mission: AuditMission): boolean {
    const missionStatus = this.normalizeMissionStatus((mission as any).statutCode || mission.statut);
    return this.isAuditResponsible && missionStatus !== AuditMissionStatus.OK;
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

  openEvidenceModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.isLoadingMissions = true;
    this.auditingService.getMissionEvidence(mission.id).subscribe({
      next: (data) => {
        this.currentEvidences = data;
        this.isLoadingMissions = false;
        this.showEvidenceModal = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMissions = false;
      }
    });
  }

  downloadEvidence(path: string) {
    const baseUrl = this.backendUrl.endsWith('/') ? this.backendUrl.slice(0, -1) : this.backendUrl;
    const normalizedPath = path.replace(/\\/g, '/');
    const finalPath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
    const token = sessionStorage.getItem('sgrc_token');
    const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
    window.open(urlWithToken, '_blank');
  }

  deleteEvidence(evidenceId: number) {
    if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?')) return;
    this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
      next: () => {
        this.currentEvidences = this.currentEvidences.filter((e) => e.id !== evidenceId);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  openChecklistModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.isLoadingMissions = true;
    this.auditingService.getMissionChecklistItems(mission.id).subscribe({
      next: (data) => {
        this.currentChecklistItems = data;
        this.isLoadingMissions = false;
        this.showChecklistModal = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMissions = false;
        alert('Erreur lors du chargement de la checklist');
      }
    });
  }

  openReportModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.reportData = {
      rapport: mission.rapport || '',
      recommandations: mission.recommandations || ''
    };
    this.showReportModal = true;
  }

  submitReport() {
    if (!this.selectedMission) return;
    this.isReporting = true;
    this.auditingService.submitReport(this.selectedMission.id, this.reportData).subscribe({
      next: () => {
        this.isReporting = false;
        this.showReportModal = false;
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        this.isReporting = false;
      }
    });
  }

  deleteMission(id: number) {
    if (!confirm('Etes-vous sur de vouloir supprimer cette mission ?')) return;
    this.auditingService.deleteMission(id).subscribe({
      next: () => this.loadMissions(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  resetMission(id: number) {
    if (!confirm('Reinitialiser cette mission ?')) return;
    this.auditingService.resetMission(id).subscribe({
      next: () => this.loadMissions(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la reinitialisation.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  exportToXLSX() {
    const dataToExport = this.filteredMissions.map((m) => ({
      'ID': m.id,
      'Mission': m.regleDnssi || m.titre,
      'Objectifs': m.objectifs || m.recommandations || '',
      'Responsabilites': m.responsabilites || '',
      'Horizon': this.horizonLabelMap[String(m.horizon || '')] || '',
      'Priorite': m.priorite ?? '',
      'Responsable': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : (m.responsabilites || 'Non assigne'),
      'Echeance': m.delai ? new Date(m.delai).toLocaleDateString() : '',
      'Etat': this.statusLabelMap[this.normalizeMissionStatus((m as any).statutCode || m.statut)] || m.statut
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit');
    XLSX.writeFile(wb, `Export_Audit_${new Date().getTime()}.xlsx`);
    this.showExportMenu = false;
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(18);
    doc.setTextColor(0, 74, 153);
    doc.text('Rapport de Gestion des Audits', 14, 22);

    const columns = ['ID', 'Mission', 'Objectifs', 'Responsabilites', 'Horizon', 'Priorite', 'Responsable', 'Echeance', 'Etat'];
    const rows = this.filteredMissions.map((m) => [
      String(m.id),
      m.regleDnssi || m.titre,
      m.objectifs || m.recommandations || '',
      m.responsabilites || '',
      this.horizonLabelMap[String(m.horizon || '')] || '',
      m.priorite ?? '',
      m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : (m.responsabilites || 'Non assigne'),
      m.delai ? new Date(m.delai).toLocaleDateString() : '',
      this.statusLabelMap[this.normalizeMissionStatus((m as any).statutCode || m.statut)] || m.statut
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 }
    });

    doc.save(`Export_Audit_${new Date().getTime()}.pdf`);
    this.showExportMenu = false;
  }
}
