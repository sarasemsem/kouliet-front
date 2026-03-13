import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private apiUrl = '/api/auth';
  private token = localStorage.getItem('token') || '';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, {  responseType: 'text' });
  }
}
