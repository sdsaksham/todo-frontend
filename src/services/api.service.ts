import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/interfaces/todo.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/todo`);
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/todo/${id}`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.baseUrl}/todo`, todo);
  }

  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.baseUrl}/todo/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/todo/${id}`);
  }
}
