import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(private router: Router, private authService: AuthService) {}

private checkAuth(): boolean {
  if (this.authService.isLoggedIn()) {
    return true;
  }
  this.router.navigate(['/auth/login']);
  return false;
}

canActivate(): boolean {
  return this.checkAuth();
}

canActivateChild(): boolean {
  return this.checkAuth();
}
}
