import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { KpiManagementComponent } from './kpi-management/kpi-management.component';
import { MultiEntityVisionComponent } from './multi-entity-vision/multi-entity-vision.component';
import { ExportCenterComponent } from './export-center/export-center.component';
import { ReportingComponent } from './reporting.component';

const routes: Routes = [
  {
    path: '',
    component: ReportingComponent,
    children: [
      { path: 'dashboard', component: DashboardViewComponent },
      { path: 'kpis', component: KpiManagementComponent },
      { path: 'multi-entity', component: MultiEntityVisionComponent },
      { path: 'exports', component: ExportCenterComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
