import { Component, OnInit } from '@angular/core';
import {
  AuditingService,
  AuditMission,
  AuditMissionStatus,
  AuditMissionHorizon,
  AuditChecklistTemplate,
  AuditEvidence,
  AuditMissionActionPlanItem,
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
  currentPage = 1;
  pageSize = 10;
  readonly pageSizeOptions = [10, 25, 50, 100];

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
  currentChecklistItems: AuditMissionActionPlanItem[] = [];
  backendUrl = environment.apiUrl.replace('/api', '');
  importFile: File | null = null;
  risks: any[] = [];

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
  ) { }

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  ngOnInit() {
    if (this.isAuditor && !this.isSeniorAuditor) {
      this.router.navigate(['/dashboard/auditor-missions']);
      return;
    }
    this.loadMissions();
    this.loadUsers();
    this.loadTemplates();
    this.loadRisks();
  }

  loadTemplates() {
    this.auditingService.getChecklistTemplates().subscribe({
      next: (data) => this.checklistTemplates = data,
      error: (err) => console.error(err)
    });
  }

  get isSeniorAuditor(): boolean {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return user.role === UserRole.AUDIT_SENIOR || user.role === UserRole.SUPER_ADMIN;
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
    this.inProgressCount = this.missions.filter((m) => this.normalizeMissionStatus((m as any).statutCode || m.statut) === AuditMissionStatus.EN_COURS).length;
    this.completedCount = this.missions.filter((m) => this.normalizeMissionStatus((m as any).statutCode || m.statut) === AuditMissionStatus.OK).length;
    this.unassignedCount = this.missions.filter((m) => !m.auditeurId).length;
  }

  private updatePagedMissions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedMissions = this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
  }

  loadUsers() {
    this.http.get<any[]>(`${environment.apiUrl}/users/assignable/auditors`).subscribe((users) => {
      this.allUsers = users;
      this.auditors = [...users];
    });
  }

  loadRisks() {
    this.http.get<any[]>(`${environment.apiUrl}/risk`).subscribe({
      next: (risks) => {
        this.risks = risks;
      },
      error: (err) => console.error(err)
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
      type: AuditRecordType.PLAN_ACTION_AUDIT,
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
    this.showImportModal = true;
  }

  onImportFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.importFile = input.files?.[0] || null;
  }

  importFromExcel() {
    if (!this.importFile) {
      alert('Veuillez sélectionner un fichier Excel.');
      return;
    }

    if (false) {
      alert('Veuillez sÃ©lectionner un risque avant l import.');
      return;
    }

    this.isImporting = true;
    this.auditingService.importMissions(this.importFile).subscribe({
      next: () => {
        this.isImporting = false;
        this.showImportModal = false;
        this.importFile = null;
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
      this.selectedMission!.type = AuditRecordType.PLAN_ACTION_AUDIT;
    }
    this.showEditModal = true;
  }

  saveRecord() {
    if (!this.selectedMission) return;

    this.isSaving = true;
    const payload = {
      ...this.selectedMission,
      type: this.selectedMission.type || AuditRecordType.PLAN_ACTION_AUDIT,
      titre: this.selectedMission.regleDnssi || this.selectedMission.titre || '',
      objectifs: this.selectedMission.recommandations || this.selectedMission.objectifs || '',
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
    return this.isSeniorAuditor && missionStatus !== AuditMissionStatus.OK;
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
    this.auditingService.getMissionActionPlanItems(mission.id).subscribe({
      next: (data) => {
        this.currentChecklistItems = data as any[];
        this.isLoadingMissions = false;
        this.showChecklistModal = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMissions = false;
        alert('Erreur lors du chargement du plan d actions');
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
    if (!confirm('Etes-vous sur de vouloir supprimer cet enregistrement ?')) return;
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
      'Règle DNSSI': m.regleDnssi || m.titre,
      'Recommandations': m.recommandations || m.objectifs || '',
      'Horizon': this.horizonLabelMap[String(m.horizon || '')] || '',
      'Priorité': m.priorite ?? '',
      'Responsable': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : (m.responsabilites || 'Non assigne'),
      'Echéance': m.delai ? new Date(m.delai).toLocaleDateString() : '',
      'Etat d\'avancement': this.statusLabelMap[this.normalizeMissionStatus((m as any).statutCode || m.statut)] || m.statut
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

    const columns = ['ID', 'Règle DNSSI', 'Recommandations', 'Horizon', 'Priorité', 'Responsable', 'Échéance', 'Etat d\'avancement'];
    const rows = this.filteredMissions.map((m) => [
      String(m.id),
      m.regleDnssi || m.titre,
      m.recommandations || m.objectifs || '',
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
