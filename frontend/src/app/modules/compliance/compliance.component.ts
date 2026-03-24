import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html'
})
export class ComplianceComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
