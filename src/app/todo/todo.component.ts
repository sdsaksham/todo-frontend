import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/interfaces/todo.interface';
import { ApiService } from 'src/services/api.service';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';
  editingTodoId: string | null | undefined = null;
  editedTask: string = '';

  constructor(private api: ApiService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loader.show();
    this.api.get<Todo[]>('todo').subscribe({
      next: (data) => {
        this.todos = data;
        this.loader.hide();
      },
      error: () => {
        this.loader.hide();
      },
    });
  }

  addTodo(): void {
    if (!this.newTask.trim()) return;

    const newTodo: Partial<Todo> = {
      task: this.newTask,
      isTaskCompleted: false,
    };

    this.loader.show();
    this.api.post<Todo>('todo', newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTask = '';
        this.loader.hide();
      },
      error: () => {
        this.loader.hide();
      },
    });
  }

  toggleCompletion(todo: Todo): void {
    this.loader.show();
    this.api
      .patch<Todo>(`todo/${todo._id}`, {
        isTaskCompleted: !todo.isTaskCompleted,
      })
      .subscribe({
        next: (updated) => {
          todo.isTaskCompleted = updated.isTaskCompleted;
          this.loader.hide();
        },
        error: () => {
          this.loader.hide();
        },
      });
  }

  deleteTodo(id: string): void {
    this.loader.show();
    this.api.delete(`todo/${id}`).subscribe({
      next: () => {
        this.todos = this.todos.filter((t) => t._id !== id);
        this.loader.hide();
      },
      error: () => {
        this.loader.hide();
      },
    });
  }

  startEdit(todo: Todo): void {
    this.editingTodoId = todo._id;
    this.editedTask = todo.task;
  }

  saveEdit(todo: Todo): void {
    if (!this.editedTask.trim()) return;

    this.loader.show();
    this.api
      .patch<Todo>(`todo/${todo._id}`, { task: this.editedTask })
      .subscribe({
        next: (updated) => {
          todo.task = updated.task;
          this.cancelEdit();
          this.loader.hide();
        },
        error: () => {
          this.loader.hide();
        },
      });
  }

  cancelEdit(): void {
    this.editingTodoId = null;
    this.editedTask = '';
  }
}
