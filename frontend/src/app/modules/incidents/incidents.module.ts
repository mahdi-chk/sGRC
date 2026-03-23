import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentsComponent } from './incidents.component';
import { SharedModule } from '../../shared/shared.module';
import { IncidentRegistrationComponent } from './incident-registration/incident-registration.component';
import { IncidentWorkflowComponent } from './incident-workflow/incident-workflow.component';
import { IncidentAnalysisComponent } from './incident-analysis/incident-analysis.component';
import { IncidentReportingComponent } from './incident-reporting/incident-reporting.component';

@NgModule({
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
})
export class IncidentsModule {}
