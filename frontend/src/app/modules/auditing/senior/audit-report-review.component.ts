import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';
import { getAuditNavItems, getStoredAuditRole } from '../audit-navigation';

@Component({
  selector: 'app-audit-report-review',
  templateUrl: './audit-report-review.component.html',
  styleUrls: ['./audit-report-review.component.scss']
})
export class AuditReportReviewComponent implements OnInit {
  currentUserRole = getStoredAuditRole();
  reports: AuditMission[] = [];
  filteredReports: AuditMission[] = [];
  selectedReport: AuditMission | null = null;
  isLoading = false;
  filterStatus: AuditMissionStatus | 'All' | 'a_reviser' = 'All';

  // Expose Enum to template
  AuditMissionStatus = AuditMissionStatus;

  // Label mappings for UI
  statusLabelMap: Record<string, string> = {
    [AuditMissionStatus.A_VENIR]: 'À venir',
    [AuditMissionStatus.EN_COURS]: 'En cours',
    [AuditMissionStatus.TERMINE]: 'Terminé',
    [AuditMissionStatus.EN_RETARD]: 'En retard',
    [AuditMissionStatus.ANNULE]: 'Annulé',
    'a_reviser': 'À réviser'
  };

  levelLabelMap: Record<string, string> = {
    'low': 'Faible',
    'limited': 'Limité',
    'medium': 'Moyen',
    'high': 'Élevé',
    'critical': 'Critique'
  };




  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

  get navItems() {
    return getAuditNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.isLoading = true;
    this.auditingService.getReportsToReview().subscribe({
      next: (data) => {
        this.reports = data;
        this.filteredReports = data;
        this.isLoading = false;
        if (this.reports.length > 0) {
          this.selectReport(this.reports[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  selectReport(report: AuditMission) {
    this.selectedReport = report;
  }

  applyFilter() {
    if (this.filterStatus === 'All') {
      this.filteredReports = this.reports;
    } else {
      this.filteredReports = this.reports.filter(r => {
          if (this.filterStatus === 'a_reviser') {
              return r.statut === AuditMissionStatus.TERMINE; // Or some other logic if 'a_reviser' is distinct
          }
          return r.statut === this.filterStatus;
      });

    }
  }

  validateReport(report: AuditMission) {
    if (!confirm('Voulez-vous valider ce rapport et clore la mission ?')) return;
    this.isLoading = true;
    // Assuming 'Terminé' means ready for review, and we might add a 'Validé' state or just keep it as Terminé.
    // For now, let's just mark it as Terminé (already is) but potentially add audit Senior notes.
    const updateData = {
        statut: AuditMissionStatus.TERMINE,
        // we could add a validation note here if the backend was updated
    };

    this.auditingService.updateMission(report.id, updateData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Rapport validé avec succès !');
        this.loadReports();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erreur lors de la validation.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
