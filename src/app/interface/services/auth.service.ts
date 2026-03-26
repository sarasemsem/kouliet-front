import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(res: any) {
    localStorage.setItem('token', res.token);
  }
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}
  getToken(): string | null {
  return localStorage.getItem('token');
}

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        this.logout(); 
        return false;
      }

      return true;
    } catch (e) {
      this.logout();
      return false;
    }
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, data);
  }
   logout() {
    localStorage.removeItem('token');
    console.log('User logged out, token removed from localStorage');
    this.router.navigate(['/auth/login']);
  }
}
