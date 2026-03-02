/**
 * @file app.module.ts
 * @description Module racine de l'application Angular. 
 * Déclare les composants, importe les modules nécessaires et configure le routage.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Imports des composants de l'application
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RiskManagerDashboardComponent } from './dashboard/roles/risk-manager/risk-manager-dashboard.component';
import { RiskAgentDashboardComponent } from './dashboard/roles/risk-agent/risk-agent-dashboard.component';
import { AuditSeniorDashboardComponent } from './dashboard/roles/audit-senior/audit-senior-dashboard.component';
import { AuditeurDashboardComponent } from './dashboard/roles/auditeur/auditeur-dashboard.component';
import { AdminSiDashboardComponent } from './dashboard/roles/admin-si/admin-si-dashboard.component';
import { SuperAdminDashboardComponent } from './dashboard/roles/super-admin/super-admin-dashboard.component';
import { TopManagementDashboardComponent } from './dashboard/roles/top-management/top-management-dashboard.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserManagementComponent } from './shared/components/user-management/user-management.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { RiskManagementComponent } from './risks/risk-management.component';
import { AssignedRisksComponent } from './dashboard/roles/risk-agent/assigned-risks/assigned-risks.component';
import { PlanningComponent } from './modules/planning/planning.component';
import { RiskStatisticsComponent } from './dashboard/roles/top-management/risk-statistics/risk-statistics.component';
import { AuditingModule } from './modules/auditing/auditing.module';
import { AuditingComponent } from './modules/auditing/auditing.component';
import { StrategicEvaluationComponent } from './modules/evaluation/strategic-evaluation.component';
import { AuditorMissionsComponent } from './modules/auditing/auditor-missions.component';
import { SharedModule } from './shared/shared.module';
import { OrganigrammeManagementComponent } from './dashboard/components/organigramme-management/organigramme-management.component';

/**
 * --- CONFIGURATION DU ROUTAGE ---
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protection des routes par garde d'authentification
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'risks', component: RiskManagementComponent },
      { path: 'strategic-evaluation', component: StrategicEvaluationComponent },
      { path: 'assigned-risks', component: AssignedRisksComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'statistics', component: RiskStatisticsComponent },
      // Routes spécifiques par rôle
      { path: 'super-admin', component: SuperAdminDashboardComponent },
      { path: 'admin-si', component: AdminSiDashboardComponent },
      { path: 'auditeur', component: AuditeurDashboardComponent },
      { path: 'audit-senior', component: AuditSeniorDashboardComponent },
      { path: 'risk-manager', component: RiskManagerDashboardComponent },
      { path: 'risk-agent', component: RiskAgentDashboardComponent },
      { path: 'top-management', component: TopManagementDashboardComponent },
      { path: 'auditing', component: AuditingComponent },
      { path: 'auditor-missions', component: AuditorMissionsComponent },
      { path: 'organigramme', component: OrganigrammeManagementComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' } // Redirection par défaut vers le dashboard
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RiskManagerDashboardComponent,
    RiskAgentDashboardComponent,
    AuditSeniorDashboardComponent,
    AuditeurDashboardComponent,
    AdminSiDashboardComponent,
    SuperAdminDashboardComponent,
    TopManagementDashboardComponent,
    DashboardHomeComponent,
    RiskManagementComponent,
    AssignedRisksComponent,
    PlanningComponent,
    RiskStatisticsComponent,
    StrategicEvaluationComponent,
    OrganigrammeManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    AuditingModule,
    RouterModule.forRoot(routes) // Initialisation du module de routage
  ],
  providers: [
    // Intercepteur HTTP pour injecter le token JWT dans chaque requête
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
