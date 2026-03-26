import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from 'src/app/interface/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }
        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        } 
        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class LoginComponent {
    errorMessage = '';
        password!: string;
      email!: string; 

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    }
    signIn   () {
            if (!this.email || !this.password) {
              return;
            }
            const data: LoginRequest = { email: this.email, password: this.password };
            this.authService.login(data).subscribe({
              next: (token: any) => {
                console.log('Login success, token:', token);
                this.authService.setToken(token);
                this.router.navigate(['/']);
              },
              error: (err: any) => {
                console.error('Login failed:', err);
                this.errorMessage = 'Invalid email or password.';
              },
            });
          }
        }