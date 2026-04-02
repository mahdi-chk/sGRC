/**
 * @file app.module.ts
 * @description Module racine de l'application Angular.
 * Déclare les composants, importe les modules nécessaires et configure le routage.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
// Module Audit (déclare AuditingComponent, PlanificationComponent, AuditChecklistsComponent, AuditorMissionsComponent)
import { AuditingModule } from './modules/auditing/auditing.module';
import { AuditingComponent } from './modules/auditing/auditing.component';
import { PlanificationComponent } from './modules/auditing/planification/planification.component';
import { AuditChecklistsComponent } from './modules/auditing/audit-checklists/audit-checklists.component';
import { AuditorMissionsComponent } from './modules/auditing/auditor-missions.component';
import { AuditorChecklistComponent } from './modules/auditing/auditor-checklist/auditor-checklist.component';
import { AuditorEvidenceComponent } from './modules/auditing/auditor-evidence/auditor-evidence.component';
import { AuditorReportComponent } from './modules/auditing/auditor-report/auditor-report.component';
import { AuditEvidenceExplorerComponent } from './modules/auditing/senior/audit-evidence-explorer.component';
import { AuditReportReviewComponent } from './modules/auditing/senior/audit-report-review.component';
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
import { ControlsModule } from './modules/controls/controls.module';
import { ControlsComponent } from './modules/controls/controls.component';
import { UserRole } from './core/models/user-role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * --- CONFIGURATION DU ROUTAGE ---
 */
const routes = [
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
                        UserRole.AUDIT_SENIOR,
                        UserRole.TOP_MANAGEMENT
                    ]
                }
            },
            { path: 'strategic-evaluation', component: StrategicEvaluationComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_SENIOR, UserRole.RISK_MANAGER, UserRole.RISK_AGENT] } },
            { path: 'assigned-risks', component: AssignedRisksComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
            { path: 'planning', component: PlanningComponent },
            { path: 'statistics', component: RiskStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
            { path: 'audit-statistics', component: AuditStatisticsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
            { path: 'alertes-monitoring', component: AlertesMonitoringComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
            { path: 'treatment-plans', component: TreatmentPlansComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.TOP_MANAGEMENT, UserRole.RISK_AGENT] } },
            { path: 'controls', component: ControlsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.RISK_AGENT, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
            { path: 'incidents', component: IncidentsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
            { path: 'incident-registration', component: IncidentRegistrationComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR] } },
            { path: 'incident-workflow', component: IncidentWorkflowComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR] } },
            { path: 'incident-analysis', component: IncidentAnalysisComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
            { path: 'incident-reporting', component: IncidentReportingComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT] } },
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
                        UserRole.AUDIT_SENIOR,
                        UserRole.AUDITEUR
                    ]
                }
            },
            { path: 'governance-history', component: GovernanceHistoryComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
            { path: 'governance-workflows', component: GovernanceWorkflowsComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
            { path: 'governance-maturity', component: GovernanceMaturityComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
            { path: 'governance-adoption', component: GovernanceAdoptionComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
            { path: 'resources', redirectTo: 'governance-documents', pathMatch: 'full' },
            // Routes Audit (composants exportés par AuditingModule)
            { path: 'auditing', component: AuditingComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN] } },
            { path: 'audit-planning', component: PlanificationComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN] } },
            { path: 'audit-checklists', component: AuditChecklistsComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN] } },
            { path: 'auditor-missions', component: AuditorMissionsComponent, data: { expectedRoles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN] } },
            { path: 'auditor-checklist', component: AuditorChecklistComponent, data: { expectedRoles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN] } },
            { path: 'auditor-evidence', component: AuditorEvidenceComponent, data: { expectedRoles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN] } },
            { path: 'auditor-report', component: AuditorReportComponent, data: { expectedRoles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN] } },
            { path: 'audit-evidence-explorer', component: AuditEvidenceExplorerComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN] } },
            { path: 'audit-report-review', component: AuditReportReviewComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN] } },
            // Routes spécifiques par rôle
            { path: 'super-admin', component: SuperAdminDashboardComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN] } },
            { path: 'admin-si', component: AdminSiDashboardComponent, data: { expectedRoles: [UserRole.ADMIN_SI] } },
            { path: 'auditeur', component: AuditeurDashboardComponent, data: { expectedRoles: [UserRole.AUDITEUR] } },
            { path: 'audit-senior', component: AuditSeniorDashboardComponent, data: { expectedRoles: [UserRole.AUDIT_SENIOR] } },
            { path: 'risk-manager', component: RiskManagerDashboardComponent, data: { expectedRoles: [UserRole.RISK_MANAGER] } },
            { path: 'risk-agent', component: RiskAgentDashboardComponent, data: { expectedRoles: [UserRole.RISK_AGENT] } },
            { path: 'top-management', component: TopManagementDashboardComponent, data: { expectedRoles: [UserRole.TOP_MANAGEMENT] } },
            { path: 'organigramme', component: OrganigrammeManagementComponent, data: { expectedRoles: [UserRole.ADMIN_SI, UserRole.SUPER_ADMIN] } },
            { path: 'rag-manager', component: RagManagerComponent, data: { expectedRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_SI, UserRole.RISK_MANAGER] } },
            {
                path: 'reporting',
                loadChildren: () => import('./modules/reporting/reporting.module').then(m => m.ReportingModule),
                data: { expectedRoles: [UserRole.TOP_MANAGEMENT, UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR] }
            }
        ]
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
export class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ], imports: [[
            BrowserModule,
            HttpClientModule,
            FormsModule,
            SharedModule,
            AuditingModule,
            IncidentsModule,
            GovernanceModule,
            ControlsModule,
            RouterModule.forRoot(routes)
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
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
                    TreatmentPlansComponent,
                    RagManagerComponent
                ],
                imports: [
                    BrowserModule,
                    HttpClientModule,
                    FormsModule,
                    SharedModule,
                    AuditingModule,
                    IncidentsModule,
                    GovernanceModule,
                    ControlsModule,
                    RouterModule.forRoot(routes)
                ],
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
                ],
                bootstrap: [AppComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [AppComponent,
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
        TreatmentPlansComponent,
        RagManagerComponent], imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        AuditingModule,
        IncidentsModule,
        GovernanceModule,
        ControlsModule, i1.RouterModule] }); })();
//# sourceMappingURL=app.module.js.map