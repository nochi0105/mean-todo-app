import { Component, OnInit } from '@angular/core';
import {TodoService} from './todo.service';
import {Todo} from './todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos: Array<any>) => {
      this.todos = todos;
    });
  }

  addTodo(event, text) {
    if (event.which === 13) {
      const todo: Todo = new Todo({text: text, isCompleted: false});
      this.todoService.saveTodo(todo).subscribe((todo: Todo) => this.todos.unshift(todo));
    }
  }
  updateStatus(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(res => console.log(res));
  }
  // TODO unfinished
  updateTodoText(a, b) { }
  public setEditState(todo: Todo, isEditMode: boolean) {
    todo.isEditMode = isEditMode;
  }
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      if (res.ok) {
        this.todos = this.todos.filter(t => t._id !== todo._id);
      }
    });
  }

}
