import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-plan-gen-card',
  templateUrl: './audit-plan-gen-card.component.html',
  styleUrls: ['./audit-plan-gen-card.component.scss']
})
export class AuditPlanGenCardComponent {
  constructor(private router: Router) { }

  onLaunch() {
    this.router.navigate(['/dashboard/auditing'], { queryParams: { action: 'plan' } });
  }
}
