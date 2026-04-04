import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { ActionsCentralizedComponent } from './actions-centralized.component';
import { ActionsDeadlinesComponent } from './actions-deadlines.component';
import { ActionsNotificationsComponent } from './actions-notifications.component';
import { ActionsIndicatorsComponent } from './actions-indicators.component';

@NgModule({
  declarations: [
    ActionsComponent,
    ActionsCentralizedComponent,
    ActionsDeadlinesComponent,
    ActionsNotificationsComponent,
    ActionsIndicatorsComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    ActionsComponent,
    ActionsCentralizedComponent,
    ActionsDeadlinesComponent,
    ActionsNotificationsComponent,
    ActionsIndicatorsComponent
  ]
})
export class ActionsModule {}
