import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupervisionRoutingModule } from './supervision-routing.module';
import { SupervisionComponent } from './supervision.component';
import { SupervisionBestPracticesComponent } from './supervision-best-practices.component';
import { SupervisionRecommendationsComponent } from './supervision-recommendations.component';
import { SupervisionBenchmarksComponent } from './supervision-benchmarks.component';
import { SupervisionAssistanceComponent } from './supervision-assistance.component';
import { SupervisionContinuousMonitoringComponent } from './supervision-continuous-monitoring.component';

@NgModule({
  declarations: [
    SupervisionComponent,
    SupervisionBestPracticesComponent,
    SupervisionRecommendationsComponent,
    SupervisionBenchmarksComponent,
    SupervisionAssistanceComponent,
    SupervisionContinuousMonitoringComponent
  ],
  imports: [
    SharedModule,
    SupervisionRoutingModule
  ]
})
export class SupervisionModule {}
