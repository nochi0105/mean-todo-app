import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
export interface MessageOption {
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
}

@Injectable()
export class MessageService {
  messageSubject = new Subject<MessageOption>();
  constructor() { }

  add(message: MessageOption) {
    this.messageSubject.next(message);
  }
  /**
   * @returns {Observable<MessageOption>}
   */
  get(): Observable<MessageOption> {
    return this.messageSubject.asObservable();
  }
}
