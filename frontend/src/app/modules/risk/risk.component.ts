import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html'
})
export class RiskComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
