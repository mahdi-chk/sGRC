import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html'
})
export class GovernanceComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
