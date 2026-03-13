import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from 'src/app/interface/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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

   /*  valCheck: string[] = ['remember'];
    password!: string; */
      loginForm!: FormGroup;
    errorMessage = '';
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
          });
    }




    signIn   () {
        
   
            if (this.loginForm.invalid) {
              return;
            }
        
            const data: LoginRequest = this.loginForm.value;
        
            this.authService.login(data).subscribe({
              next: (token: any) => {
                console.log('Login success, token:', token);
                localStorage.setItem('token', token);
                // Redirect to dashboard or home page
                this.router.navigate(['/']); // change '/dashboard' to your route
              },
              error: (err: any) => {
                console.error('Login failed:', err);
                this.errorMessage = 'Invalid email or password.';
              },
            });
          }
        }