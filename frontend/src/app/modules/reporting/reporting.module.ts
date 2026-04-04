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

@NgModule({
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
})
export class ReportingModule { }
