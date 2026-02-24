import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-super-admin-dashboard',
    templateUrl: './super-admin-dashboard.component.html'
})
export class SuperAdminDashboardComponent {
    @Input() title: string = 'Dashboard Super Admin';
    @Input() description: string = 'Accès complet à toutes les fonctionnalités et modules de la plateforme.';
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();
    @Output() openUserManagement = new EventEmitter<void>();
    @Output() openRiskManagement = new EventEmitter<void>();
    @Output() toggleAssistant = new EventEmitter<void>();

    constructor(private router: Router) { }

    onOpenRiskManagement() {
        this.router.navigate(['/dashboard/risks']);
        this.openRiskManagement.emit();
    }

    onOpenModule(m: any, s: any) {
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
