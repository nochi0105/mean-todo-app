import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import {TodoService} from './todos/todo.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MessageComponent } from './message/message.component';
import {MessageService} from './message/message.service';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    OrderByPipe,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TodoService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
