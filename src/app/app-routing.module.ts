import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './login/auth.component';
import { AntiAuthGuard } from 'src/guards/anti-auth.guard';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [AntiAuthGuard] },
  { path: 'register', component: AuthComponent, canActivate: [AntiAuthGuard] },
  { path: 'dashboard', component: TodoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
