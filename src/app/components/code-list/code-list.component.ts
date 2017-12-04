import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Code } from '../../models/code';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css'],
})
export class CodeListComponent implements OnInit {
  @Input() codes: Code[];
  @Output() notify: EventEmitter<Code> = new EventEmitter<Code>();

  constructor(private router: Router) { }

  ngOnInit() { }

  newCode() {
    this.notify.emit(new Code());
  }

  selectCode(selectedCode: Code) {
    this.notify.emit(selectedCode);
  }

}
