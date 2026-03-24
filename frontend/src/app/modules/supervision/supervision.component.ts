import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervision',
  templateUrl: './supervision.component.html'
})
export class SupervisionComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
