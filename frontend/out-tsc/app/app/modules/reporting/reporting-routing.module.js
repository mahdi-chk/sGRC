import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { KpiManagementComponent } from './kpi-management/kpi-management.component';
import { MultiEntityVisionComponent } from './multi-entity-vision/multi-entity-vision.component';
import { ExportCenterComponent } from './export-center/export-center.component';
import { ReportingComponent } from './reporting.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
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
export class ReportingRoutingModule {
}
ReportingRoutingModule.ɵfac = function ReportingRoutingModule_Factory(t) { return new (t || ReportingRoutingModule)(); };
ReportingRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ReportingRoutingModule });
ReportingRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[RouterModule.forChild(routes)], RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportingRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ReportingRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=reporting-routing.module.js.map