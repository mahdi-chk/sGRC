import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-risk-dashboard',
    templateUrl: './risk-dashboard.component.html'
})
export class RiskDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
