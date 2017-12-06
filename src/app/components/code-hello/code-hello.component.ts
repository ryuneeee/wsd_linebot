import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';


import { Code }   from '../../models/code';

@Component({
  selector: 'app-code-hello',
  templateUrl: './code-hello.component.html',
  styleUrls: ['./code-hello.component.css'],
})
export class CodeHelloComponent implements OnInit {
  @Output() notify: EventEmitter<Code> = new EventEmitter<Code>();
  ngOnInit() { }

  newCode() {
    this.notify.emit(new Code());
  }
}
