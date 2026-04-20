import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService, ModuleItem, Submodule } from '../../../core/services/dashboard.service';

@Component({
    selector: 'app-controller-dashboard',
    templateUrl: './controller-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class ControllerDashboardComponent implements OnInit {
    @Input() filteredModules: ModuleItem[] = [];
    @Input() title = 'Dashboard Controller';
    @Output() openModule = new EventEmitter<{ m: ModuleItem; s: Submodule }>();
    @Output() toggleAssistant = new EventEmitter<void>();

    currentUser: unknown;

    constructor(
        private authService: AuthService,
        private dashboardService: DashboardService
    ) {}

    ngOnInit() {
        this.authService.currentUser$.subscribe((user) => {
            this.currentUser = user;

            if (user?.role && this.filteredModules.length === 0) {
                this.filteredModules = this.dashboardService.getFilteredModules(user.role);
            }
        });
    }

    onOpenModule(m: ModuleItem, s: Submodule) {
        this.dashboardService.openSubmoduleModal(m, s);
        this.openModule.emit({ m, s });
    }

    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
