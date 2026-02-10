import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditingComponent } from './auditing.component';

@NgModule({
  declarations: [AuditingComponent],
  imports: [CommonModule],
  exports: [AuditingComponent]
})
export class AuditingModule {}
