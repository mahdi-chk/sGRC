import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
    selector: 'app-top-management-dashboard',
    templateUrl: './top-management-dashboard.component.html'
})
export class TopManagementDashboardComponent implements OnInit {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Top Management';
    @Output() openModule = new EventEmitter<any>();

    constructor(
        private authService: AuthService,
        private dashboardService: DashboardService
    ) { }

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
}
