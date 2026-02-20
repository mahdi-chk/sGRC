import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-top-management-dashboard',
    templateUrl: './top-management-dashboard.component.html'
})
export class TopManagementDashboardComponent {
    @Input() filteredModules: any[] = [];
    @Input() title: string = 'Dashboard Top Management';
    @Output() openModule = new EventEmitter<any>();

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }
}
