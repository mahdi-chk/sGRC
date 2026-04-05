import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { ActionsCentralizedComponent } from './actions-centralized.component';
import { ActionsDeadlinesComponent } from './actions-deadlines.component';
import { ActionsNotificationsComponent } from './actions-notifications.component';
import { ActionsIndicatorsComponent } from './actions-indicators.component';
import * as i0 from "@angular/core";
export class ActionsModule {
}
ActionsModule.ɵfac = function ActionsModule_Factory(t) { return new (t || ActionsModule)(); };
ActionsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ActionsModule });
ActionsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, FormsModule, RouterModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ActionsComponent,
                    ActionsCentralizedComponent,
                    ActionsDeadlinesComponent,
                    ActionsNotificationsComponent,
                    ActionsIndicatorsComponent
                ],
                imports: [CommonModule, FormsModule, RouterModule],
                exports: [
                    ActionsComponent,
                    ActionsCentralizedComponent,
                    ActionsDeadlinesComponent,
                    ActionsNotificationsComponent,
                    ActionsIndicatorsComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ActionsModule, { declarations: [ActionsComponent,
        ActionsCentralizedComponent,
        ActionsDeadlinesComponent,
        ActionsNotificationsComponent,
        ActionsIndicatorsComponent], imports: [CommonModule, FormsModule, RouterModule], exports: [ActionsComponent,
        ActionsCentralizedComponent,
        ActionsDeadlinesComponent,
        ActionsNotificationsComponent,
        ActionsIndicatorsComponent] }); })();
//# sourceMappingURL=actions.module.js.map