import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auditor-mission-card',
    templateUrl: './auditor-mission-card.component.html',
    styleUrls: []
})
export class AuditorMissionCardComponent {
    @Output() access = new EventEmitter<void>();

    constructor(private router: Router) { }

    onAccess() {
        this.router.navigate(['/dashboard/auditor-missions']);
    }
}
