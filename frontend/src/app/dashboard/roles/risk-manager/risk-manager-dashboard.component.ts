import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-risk-manager-dashboard',
    templateUrl: './risk-manager-dashboard.component.html'
})
export class RiskManagerDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Risk Manager';
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
