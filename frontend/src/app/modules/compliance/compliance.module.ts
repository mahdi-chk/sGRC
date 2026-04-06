import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComplianceComponent } from './compliance.component';
import { ComplianceFrameworksComponent } from './compliance-frameworks.component';
import { ComplianceMappingsComponent } from './compliance-mappings.component';
import { ComplianceAssessmentsComponent } from './compliance-assessments.component';
import { ComplianceGapsComponent } from './compliance-gaps.component';
import { ComplianceUpdatesComponent } from './compliance-updates.component';

@NgModule({
  declarations: [
    ComplianceComponent,
    ComplianceFrameworksComponent,
    ComplianceMappingsComponent,
    ComplianceAssessmentsComponent,
    ComplianceGapsComponent,
    ComplianceUpdatesComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    ComplianceComponent,
    ComplianceFrameworksComponent,
    ComplianceMappingsComponent,
    ComplianceAssessmentsComponent,
    ComplianceGapsComponent,
    ComplianceUpdatesComponent
  ]
})
export class ComplianceModule {}
