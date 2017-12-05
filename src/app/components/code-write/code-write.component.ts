import { Component, OnInit, OnDestroy, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CodeService } from '../../services/code.service';

import { Code }   from '../../models/code';
import { Result } from '../../models/result';
import { Chat }   from '../../models/chat';

@Component({
  selector: 'app-code-write',
  templateUrl: './code-write.component.html',
  styleUrls: ['./code-write.component.css'],
})
export class CodeWriteComponent implements OnInit, OnChanges {

  input = '';
  chats: Chat[] = [];

  @Input() code: Code;
  ngOnChanges(changes: SimpleChanges) {
    let c = changes.code.currentValue;
    if (c == null) return;
    if (c.id == undefined) {
      c.name = c.name || '';
      c.interval = c.interval || 0;
      c.content = c.content || '';
      this.code = c;
    } else {
      this.service.getCode(c.id).subscribe((cc: Code) => {
        this.code = cc;
      }, this.service.errorHandler);
    }
    // changes.code.previousValue
  }
  options: any = {};

  @Output() notify: EventEmitter<Code> = new EventEmitter<Code>();

  constructor(
    private router: Router,
    private service: CodeService) { }

  ngOnInit() { }

  submit() {
    let evnt = (m: Result) => {
      if (m.result === 'success') {
        alert('Done!');
        this.notify.emit();
      }
    };
    if (this.code.id == undefined) {
      this.service.createCode(this.code).subscribe(evnt, this.service.errorHandler);
    } else {
      this.service.updateCode(this.code).subscribe(evnt, this.service.errorHandler);
    }

  }
}
