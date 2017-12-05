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
  delList: Code[] = [];

  constructor(private router: Router) { }

  ngOnInit() { }

  newCode() {
    this.notify.emit(new Code());
  }

  selectCode(selectedCode: Code) {
    this.notify.emit(selectedCode);
  }

  deleteCode() {
    if (this.delList.length === 0){
      alert("삭제 할 리스트가 없습니다!");
    }
  }

  checkedCode(el, code) {
    const idx = this.delList.indexOf(code);
    if (el.checked) {
      if (idx === -1) { this.delList.push(code); }
    }else {
      if (idx !== -1) { this.delList.splice(idx, 1); }
    }
  }
}
