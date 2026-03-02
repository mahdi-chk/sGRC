import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-eval-action-card',
  templateUrl: './risk-eval-action-card.component.html',
  styleUrls: ['./risk-eval-action-card.component.scss']
})
export class RiskEvalActionCardComponent {
  constructor(private router: Router) { }

  onLaunch() {
    this.router.navigate(['/dashboard/strategic-evaluation']);
  }
}
