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
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    GovernanceComponent,
    GovernanceDocumentsComponent,
    GovernanceHistoryComponent,
    GovernanceWorkflowsComponent,
    GovernanceMaturityComponent,
    GovernanceAdoptionComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [
    GovernanceComponent,
    GovernanceDocumentsComponent,
    GovernanceHistoryComponent,
    GovernanceWorkflowsComponent,
    GovernanceMaturityComponent,
    GovernanceAdoptionComponent
  ]
})
export class GovernanceModule {}
