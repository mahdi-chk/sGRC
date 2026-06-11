import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-rag-config',
    templateUrl: './rag-config.component.html'
})
export class RagConfigComponent {
    constructor(private router: Router) {}

    openManager() {
        this.router.navigate(['/dashboard/rag-manager']);
    }
}
