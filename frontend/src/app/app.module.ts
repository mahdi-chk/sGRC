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
import { AuditStatisticsComponent } from './dashboard/roles/top-management/audit-statistics/audit-statistics.component';
import { AlertesMonitoringComponent } from './risks/alertes-monitoring/alertes-monitoring.component';
import { TreatmentPlansComponent } from './risks/treatment-plans/treatment-plans.component';

import { UserRole } from './core/models/user-role.enum';

/**
 * --- CONFIGURATION DU ROUTAGE ---
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protection racine
    canActivateChild: [AuthGuard], // Protection des sous-routes (RBAC)
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UserManagementComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_SI] } },
      { path: 'risks', component: RiskManagementComponent },
      { path: 'strategic-evaluation', component: StrategicEvaluationComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_SENIOR, UserRole.RISK_MANAGER, UserRole.RISK_AGENT] } },
      { path: 'assigned-risks', component: AssignedRisksComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
      { path: 'planning', component: PlanningComponent },
      { path: 'statistics', component: RiskStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      { path: 'audit-statistics', component: AuditStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
      { path: 'alertes-monitoring', component: AlertesMonitoringComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      { path: 'treatment-plans', component: TreatmentPlansComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      // Routes spécifiques par rôle (Strictement 1:1)
      { path: 'super-admin', component: SuperAdminDashboardComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'admin-si', component: AdminSiDashboardComponent, data: { expectedRoles: [UserRole.ADMIN_SI] } },
      { path: 'auditeur', component: AuditeurDashboardComponent, data: { expectedRoles: [UserRole.AUDITEUR] } },
      { path: 'audit-senior', component: AuditSeniorDashboardComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR] } },
      { path: 'risk-manager', component: RiskManagerDashboardComponent, data: { expectedRoles: [UserRole.RISK_MANAGER] } },
      { path: 'risk-agent', component: RiskAgentDashboardComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
      { path: 'top-management', component: TopManagementDashboardComponent, data: { expectedRoles: [UserRole.TOP_MANAGEMENT] } },
      { path: 'auditing', component: AuditingComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR, UserRole.SUPER_ADMIN] } },
      { path: 'auditor-missions', component: AuditorMissionsComponent, data: { expectedRoles: [UserRole.AUDITEUR] } },
      { path: 'organigramme', component: OrganigrammeManagementComponent, data: { expectedRoles: [UserRole.ADMIN_SI, UserRole.SUPER_ADMIN] } }
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
    OrganigrammeManagementComponent,
    AuditStatisticsComponent,
    AlertesMonitoringComponent,
    TreatmentPlansComponent
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
