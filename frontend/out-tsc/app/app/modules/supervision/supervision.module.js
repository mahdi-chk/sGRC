import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupervisionRoutingModule } from './supervision-routing.module';
import { SupervisionComponent } from './supervision.component';
import { SupervisionBestPracticesComponent } from './supervision-best-practices.component';
import { SupervisionRecommendationsComponent } from './supervision-recommendations.component';
import { SupervisionBenchmarksComponent } from './supervision-benchmarks.component';
import { SupervisionAssistanceComponent } from './supervision-assistance.component';
import { SupervisionContinuousMonitoringComponent } from './supervision-continuous-monitoring.component';
import * as i0 from "@angular/core";
export class SupervisionModule {
}
SupervisionModule.ɵfac = function SupervisionModule_Factory(t) { return new (t || SupervisionModule)(); };
SupervisionModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SupervisionModule });
SupervisionModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            SharedModule,
            SupervisionRoutingModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SupervisionComponent,
                    SupervisionBestPracticesComponent,
                    SupervisionRecommendationsComponent,
                    SupervisionBenchmarksComponent,
                    SupervisionAssistanceComponent,
                    SupervisionContinuousMonitoringComponent
                ],
                imports: [
                    SharedModule,
                    SupervisionRoutingModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SupervisionModule, { declarations: [SupervisionComponent,
        SupervisionBestPracticesComponent,
        SupervisionRecommendationsComponent,
        SupervisionBenchmarksComponent,
        SupervisionAssistanceComponent,
        SupervisionContinuousMonitoringComponent], imports: [SharedModule,
        SupervisionRoutingModule] }); })();
//# sourceMappingURL=supervision.module.js.map