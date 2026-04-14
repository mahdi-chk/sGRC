import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AuditingComponent } from './auditing.component';
import { AuditorMissionsComponent } from './auditor-missions.component';
import { PlanificationComponent } from './planification/planification.component';
import { AuditorEvidenceComponent } from './auditor-evidence/auditor-evidence.component';
import { AuditorReportComponent } from './auditor-report/auditor-report.component';
import { AuditEvidenceExplorerComponent } from './senior/audit-evidence-explorer.component';
import { AuditReportReviewComponent } from './senior/audit-report-review.component';

@NgModule({
  declarations: [
    AuditingComponent, 
    AuditorMissionsComponent, 
    PlanificationComponent,
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
    PlanificationComponent,
    AuditorEvidenceComponent,
    AuditorReportComponent,
    AuditEvidenceExplorerComponent,
    AuditReportReviewComponent
  ]
})
export class AuditingModule { }
