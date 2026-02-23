import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-risk-management-card',
    templateUrl: './risk-management-card.component.html'
})
export class RiskManagementCardComponent {
    @Output() openRiskManagement = new EventEmitter<void>();

    onAccess() {
        this.openRiskManagement.emit();
    }
}
