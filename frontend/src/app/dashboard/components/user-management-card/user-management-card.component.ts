import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-management-card',
    templateUrl: './user-management-card.component.html'
})
export class UserManagementCardComponent {
    @Output() openUserManagement = new EventEmitter<void>();

    onAccess() {
        this.openUserManagement.emit();
    }
}
