import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-auditeur-dashboard',
    templateUrl: './auditeur-dashboard.component.html'
})
export class AuditeurDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Auditeur';
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
