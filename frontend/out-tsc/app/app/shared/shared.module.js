/**
 * @file shared.module.ts
 * @description Module regroupant les composants partagés.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementCardComponent } from '../dashboard/components/user-management-card/user-management-card.component';
import { RiskManagementCardComponent } from '../dashboard/components/risk-management-card/risk-management-card.component';
import { RagConfigComponent } from '../dashboard/components/rag-config/rag-config.component';
import { RiskEvalActionCardComponent } from '../dashboard/components/risk-eval-action-card/risk-eval-action-card.component';
import { AuditPlanGenCardComponent } from '../dashboard/components/audit-plan-gen-card/audit-plan-gen-card.component';
import { AuditorMissionCardComponent } from '../dashboard/components/auditor-mission-card/auditor-mission-card.component';
import { OrganigrammeManagementCardComponent } from '../dashboard/components/organigramme-management-card/organigramme-management-card.component';
import * as i0 from "@angular/core";
export class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            FormsModule
        ], CommonModule,
        FormsModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ModalComponent,
                    AiAssistantComponent,
                    UserManagementComponent,
                    UserManagementCardComponent,
                    RiskManagementCardComponent,
                    RagConfigComponent,
                    RiskEvalActionCardComponent,
                    AuditPlanGenCardComponent,
                    AuditorMissionCardComponent,
                    OrganigrammeManagementCardComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    ModalComponent,
                    AiAssistantComponent,
                    UserManagementComponent,
                    UserManagementCardComponent,
                    RiskManagementCardComponent,
                    RagConfigComponent,
                    RiskEvalActionCardComponent,
                    AuditPlanGenCardComponent,
                    AuditorMissionCardComponent,
                    OrganigrammeManagementCardComponent,
                    CommonModule,
                    FormsModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { declarations: [ModalComponent,
        AiAssistantComponent,
        UserManagementComponent,
        UserManagementCardComponent,
        RiskManagementCardComponent,
        RagConfigComponent,
        RiskEvalActionCardComponent,
        AuditPlanGenCardComponent,
        AuditorMissionCardComponent,
        OrganigrammeManagementCardComponent], imports: [CommonModule,
        FormsModule], exports: [ModalComponent,
        AiAssistantComponent,
        UserManagementComponent,
        UserManagementCardComponent,
        RiskManagementCardComponent,
        RagConfigComponent,
        RiskEvalActionCardComponent,
        AuditPlanGenCardComponent,
        AuditorMissionCardComponent,
        OrganigrammeManagementCardComponent,
        CommonModule,
        FormsModule] }); })();
//# sourceMappingURL=shared.module.js.map