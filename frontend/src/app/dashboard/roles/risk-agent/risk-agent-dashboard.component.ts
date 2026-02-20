import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-risk-agent-dashboard',
    templateUrl: './risk-agent-dashboard.component.html'
})
export class RiskAgentDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Risk Agent';
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
