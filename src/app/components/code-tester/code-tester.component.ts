import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

export class CodeTesterComponent implements OnInit, OnDestroy {
  private sub: any;
  @Input() code: Code;
  input = '';
  chats: Chat[] = [];
  options: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

    ngOnInit() { }

    run() {
      if (this.input !== '') {
        console.log(this.input);
        const chat = new Chat();
        chat.type = 'me';
        chat.message = this.input;
        this.chats.push(chat);
        this.input = '';
      }
      this.service.runCode(this.code, this.input).subscribe((m: Result) => {
        for (const msg of m.message){
          const chat = new Chat();
          chat.type = 'him';
          chat.message = msg;
          this.chats.push(chat);
        }
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

  }
