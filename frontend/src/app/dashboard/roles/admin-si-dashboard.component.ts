import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-si-dashboard',
    templateUrl: './admin-si-dashboard.component.html'
})
export class AdminSiDashboardComponent {
    @Input() title: string = 'Dashboard Admin SI';
    @Input() description: string = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();
    @Output() openUserManagement = new EventEmitter<void>();

    constructor(private router: Router) { }

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }

    onOpenUserManagement() {
        this.router.navigate(['/dashboard/users']);
    }
}
