import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthService) {
    const token = localStorage.getItem('todo_access_token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.authService.setCurrentUser(payload.username);
    }
  }
  title = 'todo-app';
}
