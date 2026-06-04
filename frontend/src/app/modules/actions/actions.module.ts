import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionsCentralizedComponent } from './actions-centralized.component';
import { ActionsDeadlinesComponent } from './actions-deadlines.component';
import { ActionsNotificationsComponent } from './actions-notifications.component';
import { ActionsIndicatorsComponent } from './actions-indicators.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ActionsCentralizedComponent,
    ActionsDeadlinesComponent,
    ActionsNotificationsComponent,
    ActionsIndicatorsComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [
    ActionsCentralizedComponent,
    ActionsDeadlinesComponent,
    ActionsNotificationsComponent,
    ActionsIndicatorsComponent
  ]
})
export class ActionsModule {}
