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
import { RiskDashboardComponent } from './dashboard/roles/risk-dashboard.component';
import { AuditDashboardComponent } from './dashboard/roles/audit-dashboard.component';
import { AdminSiDashboardComponent } from './dashboard/roles/admin-si-dashboard.component';
import { TopManagementDashboardComponent } from './dashboard/roles/top-management-dashboard.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AiAssistantComponent } from './shared/components/ai-assistant/ai-assistant.component';
import { UserManagementComponent } from './shared/components/user-management/user-management.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UserManagementComponent }
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
    RiskDashboardComponent,
    AuditDashboardComponent,
    AdminSiDashboardComponent,
    TopManagementDashboardComponent,
    AiAssistantComponent,
    UserManagementComponent,
    DashboardHomeComponent
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
