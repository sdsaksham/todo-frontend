import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = environment.baseUrl;
  private currentUser: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  setCurrentUser(username: string) {
    this.currentUser = username;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, data);
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('todo_access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('todo_access_token');
  }

  logout(): void {
    localStorage.removeItem('todo_access_token');
    this.setCurrentUser('');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
