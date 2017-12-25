import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Todo, TodoInterface} from './todo';

@Injectable()
export class TodoService {

  url = '/api';
  constructor(private http: HttpClient) { }

  /**
   * @returns {Observable<TodoInterface[]>}
   */
  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.url}/todos`)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  /**
   * @param {string} _id
   * @returns {Observable<any>}
   */
  getTodo(_id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/todo/${_id}`)
      .pipe(
        tap(todo => this.log(`fetched todo with id: ${_id}`)),
        catchError(this.handleError('getTodo', []))
      );
  }

  /**
   * @param {Todo} todo
   * @returns {Observable<Todo>}
   */
  saveTodo(todo: TodoInterface): Observable<any> {
    return this.http.post(`${this.url}/todo`, todo)
      .pipe(
        tap(() => this.log(`Saved todo: ${todo.text}`)),
        catchError(this.handleError('getTodo', []))
      );
  }

  /**
   * @param {TodoInterface} todo
   * @returns {Observable<any>}
   */
  updateTodo(todo: TodoInterface): Observable<any> {
    return this.http.put(`${this.url}/todo/${todo._id}`, todo)
      .pipe(
        tap(() => this.log(`Updated todo with id${todo._id}`)),
        catchError(this.handleError('updateTodo', []))
      );
  }

  /**
   * @param {number} _id
   * @returns {Observable<any>}
   */
  deleteTodo(_id: string): Observable<any>{
    return this.http.delete(`${this.url}/todo`, {params: {_id: _id}})
      .pipe(
        tap(() => this.log(`Deleted todo with id: ${_id}`)),
        catchError(this.handleError('deleteTodo', []))
      );
  }

  /**
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /**
   * @param {string} message
   */
  private log(message: string) {
    console.log(message);
  }
}
