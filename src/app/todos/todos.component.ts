import { Component, OnInit } from '@angular/core';
import {TodoService} from './todo.service';
import {Todo, TodoInterface} from './todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: TodoInterface[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos: Array<any>) => {
      this.todos = todos;
    });
  }

  /**
   * @param event
   * @param text
   */
  addTodo(event, text) {
    if (event.which === 13) {
      const todo: TodoInterface = {text: text, isCompleted: false};
      this.todoService.saveTodo(todo).subscribe((t) => {
        this.todos.unshift(t);
      });
    }
  }

  /**
   * @param {TodoInterface} todo
   */
  updateStatus(todo: TodoInterface) {
    this.todoService.updateTodo(todo).subscribe(res => console.log(res));
  }

  /**
   * @param event
   * @param {TodoInterface} todo
   */
  updateTodoText(event, todo: TodoInterface) {
    const text = event.target.value.trim();
    if (event.which === 13 && text.length > 0) {
      todo.text = text;
      this.todoService.updateTodo(todo).subscribe(res => {
        todo.isEditMode = false;
      });
    }
  }

  /**
   * @param {Todo} todo
   * @param {boolean} isEditMode
   */
  setEditState(todo: TodoInterface, isEditMode: boolean) {
    todo.isEditMode = isEditMode;
  }

  /**
   * @param {TodoInterface} todo
   */
  deleteTodo(todo: TodoInterface) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      if (res.ok) {
        this.todos = this.todos.filter(t => t._id !== todo._id);
      }
    });
  }

}
