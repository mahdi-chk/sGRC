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
import { StrategicEvaluationComponent } from './modules/evaluation/strategic-evaluation.component';
import { SharedModule } from './shared/shared.module';
import { OrganigrammeManagementComponent } from './dashboard/components/organigramme-management/organigramme-management.component';
import { AuditStatisticsComponent } from './dashboard/roles/top-management/audit-statistics/audit-statistics.component';
import { AlertesMonitoringComponent } from './risks/alertes-monitoring/alertes-monitoring.component';
import { TreatmentPlansComponent } from './risks/treatment-plans/treatment-plans.component';
import { IncidentsComponent } from './modules/incidents/incidents.component';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { RagManagerComponent } from './dashboard/components/rag-manager/rag-manager.component';

// Module Audit (execution des audits)
import { AuditPlanningModule } from './modules/auditing/audit-planning.module';
import { PlanificationComponent } from './modules/auditing/planification/planification.component';
import { AuditPlansComponent } from './modules/auditing/audit-plans.component';
import { AuditPlanDetailComponent } from './modules/auditing/audit-plan-detail.component';
import { IncidentRegistrationComponent } from './modules/incidents/incident-registration/incident-registration.component';
import { IncidentWorkflowComponent } from './modules/incidents/incident-workflow/incident-workflow.component';
import { IncidentAnalysisComponent } from './modules/incidents/incident-analysis/incident-analysis.component';
import { IncidentReportingComponent } from './modules/incidents/incident-reporting/incident-reporting.component';
import { GovernanceDocumentsComponent } from './modules/governance/governance-documents.component';
import { GovernanceHistoryComponent } from './modules/governance/governance-history.component';
import { GovernanceWorkflowsComponent } from './modules/governance/governance-workflows.component';
import { GovernanceMaturityComponent } from './modules/governance/governance-maturity.component';
import { GovernanceAdoptionComponent } from './modules/governance/governance-adoption.component';
import { GovernanceModule } from './modules/governance/governance.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { ComplianceComponent } from './modules/compliance/compliance.component';
import { ComplianceFrameworksComponent } from './modules/compliance/compliance-frameworks.component';
import { ComplianceMaturityComponent } from './modules/compliance/compliance-maturity.component';
import { ComplianceMappingsComponent } from './modules/compliance/compliance-mappings.component';
import { ComplianceAssessmentsComponent } from './modules/compliance/compliance-assessments.component';
import { ComplianceGapsComponent } from './modules/compliance/compliance-gaps.component';
import { ComplianceUpdatesComponent } from './modules/compliance/compliance-updates.component';
import { ControlsModule } from './modules/controls/controls.module';
import { ControlsReferentialComponent } from './modules/controls/controls-referential.component';
import { ControlsPlanningComponent } from './modules/controls/controls-planning.component';
import { ControlsEvidenceComponent } from './modules/controls/controls-evidence.component';
import { ControlsEffectivenessComponent } from './modules/controls/controls-effectiveness.component';
import { ControlsNonConformitiesComponent } from './modules/controls/controls-non-conformities.component';
import { getControlsRolesByRoute } from './modules/controls/controls-navigation';
import { getComplianceRolesByRoute } from './modules/compliance/compliance-navigation';
import { ActionsModule } from './modules/actions/actions.module';
import { ActionsComponent } from './modules/actions/actions.component';
import { ActionsCentralizedComponent } from './modules/actions/actions-centralized.component';
import { ActionsDeadlinesComponent } from './modules/actions/actions-deadlines.component';
import { ActionsNotificationsComponent } from './modules/actions/actions-notifications.component';
import { ActionsIndicatorsComponent } from './modules/actions/actions-indicators.component';
import { getActionsRolesByRoute } from './modules/actions/actions-navigation';

import { UserRole } from './core/models/user-role.enum';
import { ControllerDashboardComponent } from './dashboard/roles/controller/controller-dashboard.component';

/**
 * --- CONFIGURATION DU ROUTAGE ---
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UserManagementComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_SI] } },
      {
        path: 'risks',
        component: RiskManagementComponent,
        data: {
          expectedRoles: [
            UserRole.SUPER_ADMIN,
            UserRole.RISK_MANAGER,
            UserRole.RISK_AGENT,
            UserRole.AUDIT_DIRECTEUR,
            UserRole.AUDIT_RESPONSABLE,
            UserRole.CHEF_MISSION,
            UserRole.TOP_MANAGEMENT
          ]
        }
      },
      { path: 'strategic-evaluation', component: StrategicEvaluationComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.RISK_MANAGER, UserRole.RISK_AGENT] } },
      { path: 'assigned-risks', component: AssignedRisksComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
      { path: 'planning', component: PlanningComponent },
      { path: 'statistics', component: RiskStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      { path: 'audit-statistics', component: AuditStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.TOP_MANAGEMENT] } },
      { path: 'alertes-monitoring', component: AlertesMonitoringComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      { path: 'treatment-plans', component: TreatmentPlansComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
      { path: 'controls', redirectTo: 'controls-referential', pathMatch: 'full' },
      { path: 'controls-referential', component: ControlsReferentialComponent, data: { expectedRoles: getControlsRolesByRoute('/dashboard/controls-referential') } },
      { path: 'controls-planning', component: ControlsPlanningComponent, data: { expectedRoles: getControlsRolesByRoute('/dashboard/controls-planning') } },
      { path: 'controls-evidence', component: ControlsEvidenceComponent, data: { expectedRoles: getControlsRolesByRoute('/dashboard/controls-evidence') } },
      { path: 'controls-effectiveness', component: ControlsEffectivenessComponent, data: { expectedRoles: getControlsRolesByRoute('/dashboard/controls-effectiveness') } },
      { path: 'controls-non-conformities', component: ControlsNonConformitiesComponent, data: { expectedRoles: getControlsRolesByRoute('/dashboard/controls-non-conformities') } },
      { path: 'compliance', component: ComplianceComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance') } },
      { path: 'compliance-frameworks', component: ComplianceFrameworksComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-frameworks') } },
      { path: 'compliance-maturity', component: ComplianceMaturityComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-maturity') } },
      { path: 'compliance-mappings', component: ComplianceMappingsComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-mappings') } },
      { path: 'compliance-assessments', component: ComplianceAssessmentsComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-assessments') } },
      { path: 'compliance-gaps', component: ComplianceGapsComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-gaps') } },
      { path: 'compliance-updates', component: ComplianceUpdatesComponent, data: { expectedRoles: getComplianceRolesByRoute('/dashboard/compliance-updates') } },
      { path: 'actions', component: ActionsComponent, data: { expectedRoles: getActionsRolesByRoute('/dashboard/actions') } },
      { path: 'actions-centralized', component: ActionsCentralizedComponent, data: { expectedRoles: getActionsRolesByRoute('/dashboard/actions-centralized') } },
      { path: 'actions-deadlines', component: ActionsDeadlinesComponent, data: { expectedRoles: getActionsRolesByRoute('/dashboard/actions-deadlines') } },
      { path: 'actions-notifications', component: ActionsNotificationsComponent, data: { expectedRoles: getActionsRolesByRoute('/dashboard/actions-notifications') } },
      { path: 'actions-indicators', component: ActionsIndicatorsComponent, data: { expectedRoles: getActionsRolesByRoute('/dashboard/actions-indicators') } },
      { path: 'incidents', component: IncidentsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION, UserRole.TOP_MANAGEMENT] } },
      { path: 'incident-registration', component: IncidentRegistrationComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION] } },
      { path: 'incident-workflow', component: IncidentWorkflowComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION] } },
      { path: 'incident-analysis', component: IncidentAnalysisComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION, UserRole.TOP_MANAGEMENT] } },
      { path: 'incident-reporting', component: IncidentReportingComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION, UserRole.TOP_MANAGEMENT] } },
      {
        path: 'governance',
        redirectTo: 'governance-documents',
        pathMatch: 'full'
      },
      {
        path: 'governance-documents',
        component: GovernanceDocumentsComponent,
        data: {
          expectedRoles: [
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN_SI,
            UserRole.TOP_MANAGEMENT,
            UserRole.RISK_MANAGER,
            UserRole.RISK_AGENT,
            UserRole.AUDIT_DIRECTEUR,
            UserRole.AUDIT_RESPONSABLE,
            UserRole.CHEF_MISSION,
            UserRole.AUDITEUR,
            UserRole.CONTROLLER
          ]
        }
      },
      { path: 'governance-history', component: GovernanceHistoryComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'governance-workflows', component: GovernanceWorkflowsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'governance-maturity', component: GovernanceMaturityComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'governance-adoption', component: GovernanceAdoptionComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'resources', redirectTo: 'governance-documents', pathMatch: 'full' },
      // Routes Plan d Audit
      { path: 'audit-plans', component: AuditPlansComponent, data: { expectedRoles: [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.TOP_MANAGEMENT, UserRole.CONTROLLER, UserRole.SUPER_ADMIN] } },
      { path: 'audit-plans/:id', component: AuditPlanDetailComponent, data: { expectedRoles: [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.TOP_MANAGEMENT, UserRole.CONTROLLER, UserRole.SUPER_ADMIN] } },
      { path: 'audit-planning', component: PlanificationComponent, data: { expectedRoles: [UserRole.AUDIT_DIRECTEUR, UserRole.SUPER_ADMIN] } },
      { path: 'auditing', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'audit-checklists', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'audit-evidence-explorer', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'audit-report-review', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'auditor-checklist', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'auditor-missions', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'auditor-evidence', redirectTo: 'audit-plans', pathMatch: 'full' },
      { path: 'auditor-report', redirectTo: 'audit-plans', pathMatch: 'full' },
      // Routes spécifiques par rôle
      { path: 'super-admin', component: SuperAdminDashboardComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
      { path: 'admin-si', component: AdminSiDashboardComponent, data: { expectedRoles: [UserRole.ADMIN_SI] } },
      { path: 'auditeur', component: AuditeurDashboardComponent, data: { expectedRoles: [UserRole.AUDITEUR] } },
      { path: 'audit-directeur', component: AuditSeniorDashboardComponent, data: { expectedRoles: [UserRole.AUDIT_DIRECTEUR] } },
      { path: 'audit-responsable', component: AuditSeniorDashboardComponent, data: { expectedRoles: [UserRole.AUDIT_RESPONSABLE] } },
      { path: 'chef-mission', component: AuditSeniorDashboardComponent, data: { expectedRoles: [UserRole.CHEF_MISSION] } },
      { path: 'risk-manager', component: RiskManagerDashboardComponent, data: { expectedRoles: [UserRole.RISK_MANAGER] } },
      { path: 'risk-agent', component: RiskAgentDashboardComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
      { path: 'top-management', component: TopManagementDashboardComponent, data: { expectedRoles: [UserRole.TOP_MANAGEMENT] } },
      { path: 'organigramme', component: OrganigrammeManagementComponent, data: { expectedRoles: [UserRole.ADMIN_SI, UserRole.SUPER_ADMIN] } },
      { path: 'rag-manager', component: RagManagerComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_SI, UserRole.RISK_MANAGER] } },
      {
        path: 'reporting',
        loadChildren: () => import('./modules/reporting/reporting.module').then(m => m.ReportingModule),
        data: { expectedRoles: [UserRole.TOP_MANAGEMENT, UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.CHEF_MISSION] }
      },
      {
        path: 'supervision',
        loadChildren: () => import('./modules/supervision/supervision.module').then(m => m.SupervisionModule),
        data: { expectedRoles: [UserRole.TOP_MANAGEMENT, UserRole.SUPER_ADMIN, UserRole.ADMIN_SI] }
      }
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
    RiskManagerDashboardComponent,
    RiskAgentDashboardComponent,
    AuditSeniorDashboardComponent,
    AuditeurDashboardComponent,
    AdminSiDashboardComponent,
    SuperAdminDashboardComponent,
    TopManagementDashboardComponent,
    DashboardHomeComponent,
    RiskManagementComponent,
    ControllerDashboardComponent,
    AssignedRisksComponent,
    PlanningComponent,
    RiskStatisticsComponent,
    StrategicEvaluationComponent,
    OrganigrammeManagementComponent,
    AuditStatisticsComponent,
    AlertesMonitoringComponent,
    TreatmentPlansComponent,
    RagManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    AuditPlanningModule,
    IncidentsModule,
    GovernanceModule,
    ComplianceModule,
    ControlsModule,
    ActionsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
