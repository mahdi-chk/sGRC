import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingComponent } from './reporting.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { KpiManagementComponent } from './kpi-management/kpi-management.component';
import { MultiEntityVisionComponent } from './multi-entity-vision/multi-entity-vision.component';
import { ExportCenterComponent } from './export-center/export-center.component';
import { ReportingRoutingModule } from './reporting-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RiskMatrixComponent } from './risk-matrix/risk-matrix.component';
import * as i0 from "@angular/core";
export class ReportingModule {
}
ReportingModule.ɵfac = function ReportingModule_Factory(t) { return new (t || ReportingModule)(); };
ReportingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ReportingModule });
ReportingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            ReportingRoutingModule,
            SharedModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportingModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ReportingComponent,
                    DashboardViewComponent,
                    KpiManagementComponent,
                    MultiEntityVisionComponent,
                    ExportCenterComponent,
                    RiskMatrixComponent
                ],
                imports: [
                    CommonModule,
                    ReportingRoutingModule,
                    SharedModule
                ],
                exports: [
                    ReportingComponent,
                    DashboardViewComponent,
                    KpiManagementComponent,
                    MultiEntityVisionComponent,
                    ExportCenterComponent,
                    RiskMatrixComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ReportingModule, { declarations: [ReportingComponent,
        DashboardViewComponent,
        KpiManagementComponent,
        MultiEntityVisionComponent,
        ExportCenterComponent,
        RiskMatrixComponent], imports: [CommonModule,
        ReportingRoutingModule,
        SharedModule], exports: [ReportingComponent,
        DashboardViewComponent,
        KpiManagementComponent,
        MultiEntityVisionComponent,
        ExportCenterComponent,
        RiskMatrixComponent] }); })();
//# sourceMappingURL=reporting.module.js.map