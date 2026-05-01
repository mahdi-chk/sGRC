import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AuditPlanDetailComponent } from './audit-plan-detail.component';
import { AuditPlansComponent } from './audit-plans.component';
import { PlanificationComponent } from './planification/planification.component';

@NgModule({
  declarations: [
    AuditPlansComponent,
    AuditPlanDetailComponent,
    PlanificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AuditPlansComponent,
    AuditPlanDetailComponent,
    PlanificationComponent
  ]
})
export class AuditPlanningModule { }
