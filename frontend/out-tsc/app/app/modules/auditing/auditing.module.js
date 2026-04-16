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
import * as i0 from "@angular/core";
export class AuditingModule {
}
AuditingModule.ɵfac = function AuditingModule_Factory(t) { return new (t || AuditingModule)(); };
AuditingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AuditingModule });
AuditingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            FormsModule,
            RouterModule,
            SharedModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditingModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuditingModule, { declarations: [AuditingComponent,
        AuditorMissionsComponent,
        PlanificationComponent,
        AuditorEvidenceComponent,
        AuditorReportComponent,
        AuditEvidenceExplorerComponent,
        AuditReportReviewComponent], imports: [CommonModule,
        FormsModule,
        RouterModule,
        SharedModule], exports: [AuditingComponent,
        AuditorMissionsComponent,
        PlanificationComponent,
        AuditorEvidenceComponent,
        AuditorReportComponent,
        AuditEvidenceExplorerComponent,
        AuditReportReviewComponent] }); })();
//# sourceMappingURL=auditing.module.js.map