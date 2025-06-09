import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoginMode = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (!this.username || !this.password) return;

    this.loader.show(); // Start loader

    const authObservable = this.isLoginMode
      ? this.authService.login({
          username: this.username,
          password: this.password,
        })
      : this.authService.register({
          username: this.username,
          password: this.password,
        });

    authObservable.subscribe({
      next: (res) => {
        this.loader.hide();
        if (res?.access_token) {
          this.authService.setToken(res.access_token);
          const payload = JSON.parse(atob(res.access_token.split('.')[1]));
          this.authService.setCurrentUser(payload.username);
          this.router.navigate(['/dashboard']);
        } else {
          this.isLoginMode = true;
          this.onSubmit();
        }
      },
      error: (err) => {
        this.loader.hide();
        this.errorMessage = err.error?.message || 'Something went wrong';
      },
    });
  }
}
