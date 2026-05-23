import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlsComponent } from './controls.component';
import { ControlsReferentialComponent } from './controls-referential.component';
import { ControlsPlanningComponent } from './controls-planning.component';
import { ControlsEvidenceComponent } from './controls-evidence.component';
import { ControlsEffectivenessComponent } from './controls-effectiveness.component';
import { ControlsNonConformitiesComponent } from './controls-non-conformities.component';
import { ControlEvaluationsComponent } from './control-evaluations.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ControlsComponent,
    ControlsReferentialComponent,
    ControlsPlanningComponent,
    ControlsEvidenceComponent,
    ControlsEffectivenessComponent,
    ControlsNonConformitiesComponent,
    ControlEvaluationsComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [
    ControlsComponent,
    ControlsReferentialComponent,
    ControlsPlanningComponent,
    ControlsEvidenceComponent,
    ControlsEffectivenessComponent,
    ControlsNonConformitiesComponent,
    ControlEvaluationsComponent
  ]
})
export class ControlsModule {}
