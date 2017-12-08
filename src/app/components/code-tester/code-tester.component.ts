import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { Code } from '../../models/code';
import { Result } from '../../models/result';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-code-tester',
  templateUrl: './code-tester.component.html',
  styleUrls: ['./code-tester.component.css'],
})

export class CodeTesterComponent {
  @Input() code: Code;
  input = '';
  chats: Chat[] = [];
  options: any = {};

  constructor(private service: CodeService) { }

  run() {
    if (this.input !== '') {
      this.pushMessage('me', this.input);
    }

    this.service.runCode(this.code, this.input).subscribe((m: Result) => {
      for (const msg of m.message){
        this.pushMessage('him', msg);
      }
    });

    this.input = '';
  }

  pushMessage(type, message) {
    let chat = new Chat();
    chat.type = type;
    chat.message = message;
    this.chats.push(chat);
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.run();
    }
  }
}
