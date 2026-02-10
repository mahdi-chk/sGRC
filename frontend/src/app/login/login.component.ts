import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials = { mail: '', password: '' };
    error = '';
    loading = false;

    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

    onSubmit() {
        this.loading = true;
        this.error = '';
        this.authService.login(this.credentials).subscribe({
            next: () => {
                // Roles are handled by the Dashboard component itself based on currentUser$
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.error = 'Email ou mot de passe incorrect';
                this.loading = false;
            }
        });
    }
}
