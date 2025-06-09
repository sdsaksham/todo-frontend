import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: string = '';
  @Input()
  currentUser: string = '';

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {}

  logout(): void {
    localStorage.removeItem('todo_access_token');
    this.authService.setCurrentUser('');
    this.router.navigate(['/login']);
  }
}
