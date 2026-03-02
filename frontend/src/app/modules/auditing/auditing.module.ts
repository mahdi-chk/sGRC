import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuditingComponent } from './auditing.component';
import { AuditorMissionsComponent } from './auditor-missions.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AuditingComponent, AuditorMissionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [AuditingComponent, AuditorMissionsComponent]
})
export class AuditingModule { }
