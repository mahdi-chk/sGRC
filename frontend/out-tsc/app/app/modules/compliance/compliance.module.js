import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComplianceComponent } from './compliance.component';
import { ComplianceFrameworksComponent } from './compliance-frameworks.component';
import { ComplianceMaturityComponent } from './compliance-maturity.component';
import { ComplianceMappingsComponent } from './compliance-mappings.component';
import { ComplianceAssessmentsComponent } from './compliance-assessments.component';
import { ComplianceGapsComponent } from './compliance-gaps.component';
import { ComplianceUpdatesComponent } from './compliance-updates.component';
import * as i0 from "@angular/core";
export class ComplianceModule {
}
ComplianceModule.ɵfac = function ComplianceModule_Factory(t) { return new (t || ComplianceModule)(); };
ComplianceModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ComplianceModule });
ComplianceModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, FormsModule, RouterModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ComplianceComponent,
                    ComplianceFrameworksComponent,
                    ComplianceMaturityComponent,
                    ComplianceMappingsComponent,
                    ComplianceAssessmentsComponent,
                    ComplianceGapsComponent,
                    ComplianceUpdatesComponent
                ],
                imports: [CommonModule, FormsModule, RouterModule],
                exports: [
                    ComplianceComponent,
                    ComplianceFrameworksComponent,
                    ComplianceMaturityComponent,
                    ComplianceMappingsComponent,
                    ComplianceAssessmentsComponent,
                    ComplianceGapsComponent,
                    ComplianceUpdatesComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ComplianceModule, { declarations: [ComplianceComponent,
        ComplianceFrameworksComponent,
        ComplianceMaturityComponent,
        ComplianceMappingsComponent,
        ComplianceAssessmentsComponent,
        ComplianceGapsComponent,
        ComplianceUpdatesComponent], imports: [CommonModule, FormsModule, RouterModule], exports: [ComplianceComponent,
        ComplianceFrameworksComponent,
        ComplianceMaturityComponent,
        ComplianceMappingsComponent,
        ComplianceAssessmentsComponent,
        ComplianceGapsComponent,
        ComplianceUpdatesComponent] }); })();
//# sourceMappingURL=compliance.module.js.map