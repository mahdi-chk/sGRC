import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuditingComponent } from './auditing.component';
import { AuditorMissionsComponent } from './auditor-missions.component';
import { AuditChecklistsComponent } from './audit-checklists/audit-checklists.component';
import { SharedModule } from '../../shared/shared.module';
import { PlanificationComponent } from './planification/planification.component';
import { AuditorChecklistComponent } from './auditor-checklist/auditor-checklist.component';
import { AuditorEvidenceComponent } from './auditor-evidence/auditor-evidence.component';
import { AuditorReportComponent } from './auditor-report/auditor-report.component';
import { AuditEvidenceExplorerComponent } from './senior/audit-evidence-explorer.component';
import { AuditReportReviewComponent } from './senior/audit-report-review.component';

@NgModule({
  declarations: [
    AuditingComponent, 
    AuditorMissionsComponent, 
    AuditChecklistsComponent, 
    PlanificationComponent,
    AuditorChecklistComponent,
    AuditorEvidenceComponent,
    AuditorReportComponent,
    AuditEvidenceExplorerComponent,
    AuditReportReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AuditingComponent, 
    AuditorMissionsComponent, 
    AuditChecklistsComponent, 
    PlanificationComponent,
    AuditorChecklistComponent,
    AuditorEvidenceComponent,
    AuditorReportComponent,
    AuditEvidenceExplorerComponent,
    AuditReportReviewComponent
  ]
})
export class AuditingModule { }
