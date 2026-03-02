import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
    selector: 'app-admin-si-dashboard',
    templateUrl: './admin-si-dashboard.component.html'
})
export class AdminSiDashboardComponent implements OnInit {
    @Input() title: string = 'Dashboard Admin SI';
    @Input() description: string = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();
    @Output() openUserManagement = new EventEmitter<void>();
    @Output() toggleAssistant = new EventEmitter<void>();

    constructor(private router: Router, private authService: AuthService, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            if (this.filteredModules.length === 0 && user?.role) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }

    onOpenModule(m: any, s: any) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }

    onOpenUserManagement() {
        this.router.navigate(['/dashboard/users']);
        this.openUserManagement.emit();
    }

    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
