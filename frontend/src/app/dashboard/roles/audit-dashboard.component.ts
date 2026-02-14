import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-audit-dashboard',
    templateUrl: './audit-dashboard.component.html'
})
export class AuditDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Audit';
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
