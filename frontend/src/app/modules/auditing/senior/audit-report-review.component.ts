import { Component, OnInit } from '@angular/core';
import { AuditingService, AuditMission, AuditMissionStatus } from '../../../core/services/auditing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-report-review',
  templateUrl: './audit-report-review.component.html',
  styleUrls: ['./audit-report-review.component.scss']
})
export class AuditReportReviewComponent implements OnInit {
  reports: AuditMission[] = [];
  filteredReports: AuditMission[] = [];
  selectedReport: AuditMission | null = null;
  isLoading = false;
  filterStatus: 'All' | 'Terminé' | 'À réviser' = 'All';

  constructor(
    private auditingService: AuditingService,
    private router: Router
  ) { }

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
      this.filteredReports = this.reports.filter(r => r.statut === this.filterStatus);
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
