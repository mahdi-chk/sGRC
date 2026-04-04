import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsComponent } from './controls.component';
import { ControlsReferentialComponent } from './controls-referential.component';
import { ControlsPlanningComponent } from './controls-planning.component';
import { ControlsEvidenceComponent } from './controls-evidence.component';
import { ControlsEffectivenessComponent } from './controls-effectiveness.component';
import { ControlsNonConformitiesComponent } from './controls-non-conformities.component';

@NgModule({
  declarations: [
    ControlsComponent,
    ControlsReferentialComponent,
    ControlsPlanningComponent,
    ControlsEvidenceComponent,
    ControlsEffectivenessComponent,
    ControlsNonConformitiesComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ControlsComponent,
    ControlsReferentialComponent,
    ControlsPlanningComponent,
    ControlsEvidenceComponent,
    ControlsEffectivenessComponent,
    ControlsNonConformitiesComponent
  ]
})
export class ControlsModule {}
