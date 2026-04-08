import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus, AuditChecklistTemplate, AuditEvidence, AuditMissionActionPlanItem } from '../../core/services/auditing.service';
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
  showExportMenu = false;

  // Filter properties
  filterSearch = '';
  filterStatus = '';

  totalMissions = 0;
  inProgressCount = 0;
  completedCount = 0;
  unassignedCount = 0;


  // UI States
  isLoadingMissions = false;
  isCreatingMissions = false;
  isAssigning = false;
  isReporting = false;

  // Modals
  showAssignModal = false;
  showAssignChecklistModal = false;
  showReportModal = false;
  showDetailModal = false;
  showEvidenceModal = false;
  showChecklistModal = false;
  showEditModal = false;
  selectedMission: AuditMission | null = null;
  selectedAuditorId = '';
  currentEvidences: AuditEvidence[] = [];
  currentChecklistItems: AuditMissionActionPlanItem[] = [];
  backendUrl = environment.apiUrl.replace('/api', '');

  // Report Form
  reportData = {
    rapport: '',
    recommandations: ''
  };

  // Expose Enum to template
  AuditMissionStatus = AuditMissionStatus;

  // Label mappings for UI
  statusLabelMap: Record<string, string> = {
    [AuditMissionStatus.A_VENIR]: 'À venir',
    [AuditMissionStatus.EN_COURS]: 'En cours',
    [AuditMissionStatus.TERMINE]: 'Terminé',
    [AuditMissionStatus.EN_RETARD]: 'En retard',
    [AuditMissionStatus.ANNULE]: 'Annulé'
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
    this.auditingService.getMissions().subscribe({
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
    this.filteredMissions = this.missions.filter(m => {
      const matchSearch = !this.filterSearch || 
        m.titre.toLowerCase().includes(this.filterSearch.toLowerCase()) || 
        (m.auditeur && `${m.auditeur.prenom} ${m.auditeur.nom}`.toLowerCase().includes(this.filterSearch.toLowerCase()));
      
      const missionStatut = ((m as any).statutCode || m.statut || '').toLowerCase();
      const filterStatut = (this.filterStatus || '').toLowerCase();
      const matchStatus = !filterStatut || missionStatut === filterStatut;

      return matchSearch && matchStatus;
    });
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
    this.totalMissions = this.missions.length;
    this.inProgressCount = this.missions.filter(m => this.normalizeMissionStatus((m as any).statutCode || m.statut) === AuditMissionStatus.EN_COURS).length;
    this.completedCount = this.missions.filter(m => this.normalizeMissionStatus((m as any).statutCode || m.statut) === AuditMissionStatus.TERMINE).length;
    this.unassignedCount = this.missions.filter(m => !m.auditeurId).length;
  }


  loadUsers() {
    this.http.get<any[]>(`${environment.apiUrl}/users/assignable/auditors`).subscribe(users => {
      this.allUsers = users;
      this.auditors = [...users];
    });
  }



  openDetailModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.showDetailModal = true;
  }

  openAssignModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.selectedAuditorId = mission.auditeurId ? mission.auditeurId.toString() : '';
    this.showAssignModal = true;
  }

  openEditModal(mission: AuditMission) {
    this.selectedMission = JSON.parse(JSON.stringify(mission));
    if (this.selectedMission?.delai) {
      // Format date to YYYY-MM-DD for input type="date"
      this.selectedMission.delai = new Date(this.selectedMission.delai).toISOString().split('T')[0] as any;
    }
    this.showEditModal = true;
  }

  updateMission() {
    if (!this.selectedMission) return;
    this.auditingService.updateMission(this.selectedMission.id, this.selectedMission).subscribe({
      next: () => {
        this.showEditModal = false;
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la modification.');
      }
    });
  }

  assignMission(auditeurId: string = this.selectedAuditorId) {
    if (!this.selectedMission || !auditeurId) return;
    this.isAssigning = true;
    this.auditingService.assignMission(this.selectedMission.id, parseInt(auditeurId)).subscribe({
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

  getAssignAuditorModalTitle(): string {
    return this.selectedMission?.auditeurId ? 'Réassigner un auditeur' : 'Assigner un auditeur';
  }

  getAssignAuditorActionLabel(): string {
    return this.selectedMission?.auditeurId ? 'Réassigner' : 'Assigner';
  }

  canAssignAuditor(mission: AuditMission): boolean {
    const missionStatus = this.normalizeMissionStatus((mission as any).statutCode || mission.statut);
    return this.isSeniorAuditor && missionStatus !== AuditMissionStatus.TERMINE && missionStatus !== AuditMissionStatus.ANNULE;
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

  // --- EVIDENCE MANAGEMENT ---
  openEvidenceModal(mission: AuditMission) {
    this.selectedMission = mission;
    this.isLoadingMissions = true; // Use this to show a loading state
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
    
    // Get token for authorization (backend allows token in query string)
    const token = sessionStorage.getItem('sgrc_token');
    const urlWithToken = `${baseUrl}${finalPath}${token ? '?token=' + token : ''}`;
    
    window.open(urlWithToken, '_blank');
  }

  deleteEvidence(evidenceId: number) {
    if (!this.selectedMission || !confirm('Voulez-vous vraiment supprimer cette preuve ?')) return;
    this.auditingService.deleteMissionEvidence(this.selectedMission.id, evidenceId).subscribe({
      next: () => {
        this.currentEvidences = this.currentEvidences.filter(e => e.id !== evidenceId);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  openAssignChecklistModal(mission: AuditMission) {
    this.selectedMission = mission;
    // To support automatic pre-selection in HTML, we will bind [value] or [(ngModel)] to selectedMission.checklistTemplateId
    this.showAssignChecklistModal = true;
  }

  assignChecklistToMission(templateIdStr: string) {
    const templateId = parseInt(templateIdStr, 10);
    if (!this.selectedMission || isNaN(templateId)) return;

    this.auditingService.assignTemplateToMission(this.selectedMission.id, templateId).subscribe({
      next: () => {
        if (this.selectedMission) this.selectedMission.checklistTemplateId = templateId; // Local update
        this.showAssignChecklistModal = false;
        alert('Checklist assignée avec succès');
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'assignation de la checklist');
      }
    });
  }

  // --- VIEW CHECKLIST (SENIOR) ---
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) return;

    this.auditingService.deleteMission(id).subscribe({
      next: () => {
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      }
    });
  }

  resetMission(id: number) {
    if (!confirm('Réinitialiser cette mission (effacer rapport et assignation) ?')) return;

    this.auditingService.resetMission(id).subscribe({
      next: () => {
        this.loadMissions();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la réinitialisation.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  exportToXLSX() {
    const dataToExport = this.missions.map(m => ({
      'Mission': m.titre,
      'Objectifs': m.objectifs,
      'Risque Associé': m.risk?.titre || `ID: ${m.riskId}`,
      'Auditeur': m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
      'Échéance': new Date(m.delai).toLocaleDateString(),
      'Statut': this.statusLabelMap[m.statut] || m.statut
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Missions_Audit');
    XLSX.writeFile(wb, `Export_Audit_Missions_${new Date().getTime()}.xlsx`);
    this.showExportMenu = false;
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(0, 74, 153);
    doc.text('Rapport de Gestion des Audits', 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);

    const columns = ['Mission', 'Risque Associé', 'Auditeur', 'Échéance', 'Statut'];
    const rows = this.missions.map(m => [
      m.titre,
      m.risk?.titre || `ID: ${m.riskId}`,
      m.auditeur ? `${m.auditeur.prenom} ${m.auditeur.nom}` : 'Non assigné',
      new Date(m.delai).toLocaleDateString(),
      this.statusLabelMap[m.statut] || m.statut
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    doc.save(`Export_Audit_Missions_${new Date().getTime()}.pdf`);
    this.showExportMenu = false;
  }
}
