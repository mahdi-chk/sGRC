import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GovernanceComponent } from './governance.component';
import { GovernanceDocumentsComponent } from './governance-documents.component';
import { GovernanceHistoryComponent } from './governance-history.component';
import { GovernanceWorkflowsComponent } from './governance-workflows.component';
import { GovernanceMaturityComponent } from './governance-maturity.component';
import { GovernanceAdoptionComponent } from './governance-adoption.component';
import * as i0 from "@angular/core";
export class GovernanceModule {
}
GovernanceModule.ɵfac = function GovernanceModule_Factory(t) { return new (t || GovernanceModule)(); };
GovernanceModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: GovernanceModule });
GovernanceModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, FormsModule, RouterModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    GovernanceComponent,
                    GovernanceDocumentsComponent,
                    GovernanceHistoryComponent,
                    GovernanceWorkflowsComponent,
                    GovernanceMaturityComponent,
                    GovernanceAdoptionComponent
                ],
                imports: [CommonModule, FormsModule, RouterModule],
                exports: [
                    GovernanceComponent,
                    GovernanceDocumentsComponent,
                    GovernanceHistoryComponent,
                    GovernanceWorkflowsComponent,
                    GovernanceMaturityComponent,
                    GovernanceAdoptionComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GovernanceModule, { declarations: [GovernanceComponent,
        GovernanceDocumentsComponent,
        GovernanceHistoryComponent,
        GovernanceWorkflowsComponent,
        GovernanceMaturityComponent,
        GovernanceAdoptionComponent], imports: [CommonModule, FormsModule, RouterModule], exports: [GovernanceComponent,
        GovernanceDocumentsComponent,
        GovernanceHistoryComponent,
        GovernanceWorkflowsComponent,
        GovernanceMaturityComponent,
        GovernanceAdoptionComponent] }); })();
//# sourceMappingURL=governance.module.js.map