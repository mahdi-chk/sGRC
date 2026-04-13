import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupervisionComponent } from './supervision.component';
import { SupervisionBestPracticesComponent } from './supervision-best-practices.component';
import { SupervisionRecommendationsComponent } from './supervision-recommendations.component';
import { SupervisionBenchmarksComponent } from './supervision-benchmarks.component';
import { SupervisionAssistanceComponent } from './supervision-assistance.component';
import { SupervisionContinuousMonitoringComponent } from './supervision-continuous-monitoring.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: SupervisionComponent,
        children: [
            { path: 'best-practices', component: SupervisionBestPracticesComponent },
            { path: 'recommendations', component: SupervisionRecommendationsComponent },
            { path: 'benchmarks', component: SupervisionBenchmarksComponent },
            { path: 'expert-assistance', component: SupervisionAssistanceComponent },
            { path: 'continuous-monitoring', component: SupervisionContinuousMonitoringComponent },
            { path: '', redirectTo: 'continuous-monitoring', pathMatch: 'full' }
        ]
    }
];
export class SupervisionRoutingModule {
}
SupervisionRoutingModule.ɵfac = function SupervisionRoutingModule_Factory(t) { return new (t || SupervisionRoutingModule)(); };
SupervisionRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SupervisionRoutingModule });
SupervisionRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[RouterModule.forChild(routes)], RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SupervisionRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=supervision-routing.module.js.map