import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentsComponent } from './incidents.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [IncidentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [IncidentsComponent]
})
export class IncidentsModule {}
