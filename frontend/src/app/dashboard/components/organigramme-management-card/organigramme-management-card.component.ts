import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-organigramme-management-card',
    templateUrl: './organigramme-management-card.component.html',
    styleUrls: ['./organigramme-management-card.component.scss']
})
export class OrganigrammeManagementCardComponent {
    @Output() openOrganigramme = new EventEmitter<void>();

    onClick() {
        this.openOrganigramme.emit();
    }
}
