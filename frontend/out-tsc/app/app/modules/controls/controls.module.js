import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsComponent } from './controls.component';
import { ControlsReferentialComponent } from './controls-referential.component';
import { ControlsPlanningComponent } from './controls-planning.component';
import { ControlsEvidenceComponent } from './controls-evidence.component';
import { ControlsEffectivenessComponent } from './controls-effectiveness.component';
import { ControlsNonConformitiesComponent } from './controls-non-conformities.component';
import * as i0 from "@angular/core";
export class ControlsModule {
}
ControlsModule.ɵfac = function ControlsModule_Factory(t) { return new (t || ControlsModule)(); };
ControlsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ControlsModule });
ControlsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, RouterModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ControlsComponent,
                    ControlsReferentialComponent,
                    ControlsPlanningComponent,
                    ControlsEvidenceComponent,
                    ControlsEffectivenessComponent,
                    ControlsNonConformitiesComponent
                ],
                imports: [CommonModule, RouterModule],
                exports: [
                    ControlsComponent,
                    ControlsReferentialComponent,
                    ControlsPlanningComponent,
                    ControlsEvidenceComponent,
                    ControlsEffectivenessComponent,
                    ControlsNonConformitiesComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ControlsModule, { declarations: [ControlsComponent,
        ControlsReferentialComponent,
        ControlsPlanningComponent,
        ControlsEvidenceComponent,
        ControlsEffectivenessComponent,
        ControlsNonConformitiesComponent], imports: [CommonModule, RouterModule], exports: [ControlsComponent,
        ControlsReferentialComponent,
        ControlsPlanningComponent,
        ControlsEvidenceComponent,
        ControlsEffectivenessComponent,
        ControlsNonConformitiesComponent] }); })();
//# sourceMappingURL=controls.module.js.map