import {Component, Input, OnInit} from '@angular/core';
import {MessageOption, MessageService} from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input()autoFadeOut: true;
  messages: MessageOption[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.get().subscribe((message: MessageOption) => {
      this.messages.push(message);
      if (this.autoFadeOut && message.type !== 'error') {
        setTimeout(() => {this.messages.shift(); }, 2000);
      }
    });
  }

  clear() {
    this.messages = [];
  }
}
