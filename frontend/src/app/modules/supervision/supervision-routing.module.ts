import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisionComponent } from './supervision.component';
import { SupervisionBestPracticesComponent } from './supervision-best-practices.component';
import { SupervisionRecommendationsComponent } from './supervision-recommendations.component';
import { SupervisionBenchmarksComponent } from './supervision-benchmarks.component';
import { SupervisionAssistanceComponent } from './supervision-assistance.component';
import { SupervisionContinuousMonitoringComponent } from './supervision-continuous-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: SupervisionComponent,
    children: [
      { path: 'best-practices', component: SupervisionBestPracticesComponent },
      { path: 'recommendations', component: SupervisionRecommendationsComponent },
      { path: 'benchmarks', component: SupervisionBenchmarksComponent },
      { path: 'expert-assistance', component: SupervisionAssistanceComponent },
      { path: 'continuous-monitoring', component: SupervisionContinuousMonitoringComponent },
      { path: '', redirectTo: 'continuous-monitoring', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisionRoutingModule {}
