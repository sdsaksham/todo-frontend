// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: string = '';

  constructor(private api: ApiService, private router: Router) {}

  setCurrentUser(username: string) {
    this.currentUser = username;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.api.post('login', data);
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.api.post('register', data);
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
