import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-risk-agent-dashboard',
    templateUrl: './risk-agent-dashboard.component.html',
    styleUrls: ['../../dashboard.component.scss']
})
export class RiskAgentDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Risk Agent';
    @Output() openModule = new EventEmitter<any>();

    constructor(private router: Router) { }

    goToAssignedRisks() {
        this.router.navigate(['/dashboard/assigned-risks']);
    }

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}

