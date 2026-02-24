import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-audit-senior-dashboard',
    templateUrl: './audit-senior-dashboard.component.html'
})
export class AuditSeniorDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Audit Senior';
    @Output() openModule = new EventEmitter<any>();
    @Output() toggleAssistant = new EventEmitter<void>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }

    onToggleAssistant() {
        this.toggleAssistant.emit();
    }
}
