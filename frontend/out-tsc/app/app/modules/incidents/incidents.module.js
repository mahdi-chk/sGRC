import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentsComponent } from './incidents.component';
import { SharedModule } from '../../shared/shared.module';
import { IncidentRegistrationComponent } from './incident-registration/incident-registration.component';
import { IncidentWorkflowComponent } from './incident-workflow/incident-workflow.component';
import { IncidentAnalysisComponent } from './incident-analysis/incident-analysis.component';
import { IncidentReportingComponent } from './incident-reporting/incident-reporting.component';
import * as i0 from "@angular/core";
export class IncidentsModule {
}
IncidentsModule.ɵfac = function IncidentsModule_Factory(t) { return new (t || IncidentsModule)(); };
IncidentsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: IncidentsModule });
IncidentsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            SharedModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    IncidentsComponent,
                    IncidentRegistrationComponent,
                    IncidentWorkflowComponent,
                    IncidentAnalysisComponent,
                    IncidentReportingComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    SharedModule
                ],
                exports: [
                    IncidentsComponent,
                    IncidentRegistrationComponent,
                    IncidentWorkflowComponent,
                    IncidentAnalysisComponent,
                    IncidentReportingComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IncidentsModule, { declarations: [IncidentsComponent,
        IncidentRegistrationComponent,
        IncidentWorkflowComponent,
        IncidentAnalysisComponent,
        IncidentReportingComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule], exports: [IncidentsComponent,
        IncidentRegistrationComponent,
        IncidentWorkflowComponent,
        IncidentAnalysisComponent,
        IncidentReportingComponent] }); })();
//# sourceMappingURL=incidents.module.js.map