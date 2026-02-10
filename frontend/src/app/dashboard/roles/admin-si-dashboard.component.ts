import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-admin-si-dashboard',
    templateUrl: './admin-si-dashboard.component.html'
})
export class AdminSiDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();
    @Output() manageUsers = new EventEmitter<void>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }

    onManageUsers() {
        this.manageUsers.emit();
    }
}
