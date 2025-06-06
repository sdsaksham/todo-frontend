import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/interfaces/todo.interface';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';
  editingTodoId: string | null = null;
  editedTask: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loading = true;
    this.apiService.getTodos().subscribe({
      next: (data) => (this.todos = data),
      error: () => {},
      complete: () => (this.loading = false),
    });
  }

  addTodo(): void {
    if (!this.newTask.trim()) return;

    const newTodo: Todo = {
      task: this.newTask,
      isTaskCompleted: false,
    };

    this.loading = true;
    this.apiService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTask = '';
      },
      error: () => {},
      complete: () => (this.loading = false),
    });
  }

  toggleCompletion(todo: Todo): void {
    this.loading = true;
    this.apiService
      .updateTodo(todo._id!, { isTaskCompleted: !todo.isTaskCompleted })
      .subscribe({
        next: (updated) => {
          todo.isTaskCompleted = updated.isTaskCompleted;
        },
        error: () => {},
        complete: () => (this.loading = false),
      });
  }

  deleteTodo(id: string): void {
    this.loading = true;
    this.apiService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo._id !== id);
      },
      error: () => {},
      complete: () => (this.loading = false),
    });
  }

  startEdit(todo: Todo): void {
    this.editingTodoId = todo._id!;
    this.editedTask = todo.task;
  }

  saveEdit(todo: Todo): void {
    if (!this.editedTask.trim()) return;

    this.loading = true;
    this.apiService.updateTodo(todo._id!, { task: this.editedTask }).subscribe({
      next: (updated) => {
        todo.task = updated.task;
        this.cancelEdit();
      },
      error: () => {},
      complete: () => (this.loading = false),
    });
  }

  cancelEdit(): void {
    this.editingTodoId = null;
    this.editedTask = '';
  }
}
