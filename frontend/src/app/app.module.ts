import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RiskManagerDashboardComponent } from './dashboard/roles/risk-manager/risk-manager-dashboard.component';
import { RiskAgentDashboardComponent } from './dashboard/roles/risk-agent/risk-agent-dashboard.component';
import { AuditSeniorDashboardComponent } from './dashboard/roles/audit-senior/audit-senior-dashboard.component';
import { AuditeurDashboardComponent } from './dashboard/roles/auditeur/auditeur-dashboard.component';
import { AdminSiDashboardComponent } from './dashboard/roles/admin-si/admin-si-dashboard.component';
import { SuperAdminDashboardComponent } from './dashboard/roles/super-admin/super-admin-dashboard.component';
import { TopManagementDashboardComponent } from './dashboard/roles/top-management/top-management-dashboard.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AiAssistantComponent } from './shared/components/ai-assistant/ai-assistant.component';
import { UserManagementComponent } from './shared/components/user-management/user-management.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { RiskManagementComponent } from './risks/risk-management.component';
import { AssignedRisksComponent } from './dashboard/roles/risk-agent/assigned-risks/assigned-risks.component';
import { PlanningComponent } from './modules/planning/planning.component';
import { RagConfigComponent } from './dashboard/components/rag-config/rag-config.component';
import { UserManagementCardComponent } from './dashboard/components/user-management-card/user-management-card.component';
import { RiskManagementCardComponent } from './dashboard/components/risk-management-card/risk-management-card.component';
import { RiskStatisticsComponent } from './dashboard/roles/top-management/risk-statistics/risk-statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'risks', component: RiskManagementComponent },
      { path: 'assigned-risks', component: AssignedRisksComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'statistics', component: RiskStatisticsComponent },
      { path: 'super-admin', component: SuperAdminDashboardComponent },
      { path: 'admin-si', component: AdminSiDashboardComponent },
      { path: 'auditeur', component: AuditeurDashboardComponent },
      { path: 'audit-senior', component: AuditSeniorDashboardComponent },
      { path: 'risk-manager', component: RiskManagerDashboardComponent },
      { path: 'risk-agent', component: RiskAgentDashboardComponent },
      { path: 'top-management', component: TopManagementDashboardComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ModalComponent,
    RiskManagerDashboardComponent,
    RiskAgentDashboardComponent,
    AuditSeniorDashboardComponent,
    AuditeurDashboardComponent,
    AdminSiDashboardComponent,
    SuperAdminDashboardComponent,
    TopManagementDashboardComponent,
    AiAssistantComponent,
    UserManagementComponent,
    DashboardHomeComponent,
    RiskManagementComponent,
    AssignedRisksComponent,
    PlanningComponent,
    RagConfigComponent,
    UserManagementCardComponent,
    RiskManagementCardComponent,
    RiskStatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
