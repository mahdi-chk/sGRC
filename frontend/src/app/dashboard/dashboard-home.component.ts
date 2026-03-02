import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { UserRole } from '../core/models/user-role.enum';
import { Router } from '@angular/router';
import { DashboardService } from '../core/services/dashboard.service';

interface Submodule {
    title: string;
    desc?: string;
}

interface ModuleItem {
    key: string;
    title: string;
    desc?: string;
    submodules: Submodule[];
    roles: UserRole[];
}

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit {
    modules: ModuleItem[] = [];
    currentUserRole: UserRole | null = null;
    UserRole = UserRole;

    constructor(
        private authService: AuthService,
        private router: Router,
        private dashboardService: DashboardService
    ) {
        this.modules = this.dashboardService.getModules();
    }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUserRole = user?.role;
            if (this.currentUserRole) {
                this.redirectByRole(this.currentUserRole);
            }
        });
    }

    private redirectByRole(role: UserRole) {
        let targetPath = '';
        switch (role) {
            case UserRole.SUPER_ADMIN: targetPath = 'super-admin'; break;
            case UserRole.ADMIN_SI: targetPath = 'admin-si'; break;
            case UserRole.AUDITEUR: targetPath = 'auditeur'; break;
            case UserRole.AUDIT_SENIOR: targetPath = 'audit-senior'; break;
            case UserRole.RISK_MANAGER: targetPath = 'risk-manager'; break;
            case UserRole.RISK_AGENT: targetPath = 'risk-agent'; break;
            case UserRole.TOP_MANAGEMENT: targetPath = 'top-management'; break;
        }

        if (targetPath && this.router.url === '/dashboard') {
            this.router.navigate(['/dashboard', targetPath]);
        }
    }

    get filteredModules(): ModuleItem[] {
        return this.dashboardService.getFilteredModules(this.currentUserRole);
    }

    onOpenModule(event: { m: ModuleItem, s: Submodule }) {
        this.dashboardService.openSubmoduleModal(event.m, event.s);
    }

    showUserManagementView() {
        this.router.navigate(['/dashboard/users']);
    }

    showRiskManagementView() {
        this.router.navigate(['/dashboard/risks']);
    }

    onToggleAiAssistant() {
        this.dashboardService.toggleAiAssistant();
    }
}
