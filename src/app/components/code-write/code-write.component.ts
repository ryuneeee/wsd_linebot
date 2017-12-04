import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
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

/*
  private  _code: Code;
  @Input() set code(c: Code) {
    if (c == null) return;
    if (c.id == undefined) {
      c.name = c.name || '';
      c.interval = c.interval || 0;
      c.content = c.content || '';

      this._code = c;
    } else {
      console.log(c.id);
      this.service.getCode(c.id).subscribe((cc: Code) => {
        this._code = cc;
      }, this.service.errorHandler);
    }
  }
  get code(): string { return this._code; }
*/
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
    //if (changes.hero.previousValue) {
    //  this.oldHero = changes.hero.previousValue.name;
    //}
    console.log(this.code);
  }
  options: any = {};

  constructor(
    private router: Router,
    private service: CodeService) { }

  ngOnInit() { }

  submit() {
    if (this.code.id == undefined) {
      this.service.createCode(this.code).subscribe((m: Result) => {
        if (m.result === 'success') {
          alert('Done!');
        }
      }, this.service.errorHandler);
    } else {
      this.service.updateCode(this.code).subscribe((m: Result) => {
        if (m.result === 'success') {
          alert('Done!');
        }
      }, this.service.errorHandler);
    }

    //console.log(this.code);
  }
}
