import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CodeService } from '../../services/code.service';

import { Code }   from '../../models/code';
import { Result } from '../../models/result';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css'],
})
export class CodeListComponent implements OnInit {
  @Input() codes: Code[];
  @Input() selectedCode: Code;
  @Output() notify: EventEmitter<Code> = new EventEmitter<Code>();
  @Output() notify2: EventEmitter<Object> = new EventEmitter<Object>();
  delList: Code[] = [];

  constructor(
    private router: Router,
    private service: CodeService) { }

  ngOnInit() { }

  newCode() {
    this.selectCode(new Code());
  }

  selectCode(selectedCode: Code) {
    this.notify.emit(selectedCode);
  }

  deleteCode() {
    if (this.delList.length === 0){
      alert("삭제 할 리스트가 없습니다!");
      return;
    }

    (function deleteOneByOne(self) {
      let code = self.delList.pop();

      if (code == self.selectedCode) {
        self.selectCode(null);
      }

      self.service.deleteCode(code).subscribe((m: Result) => {
        if (m.result === 'success') {
          if (self.delList.length == 0) {
            alert('Done!');
            self.notify2.emit();
          } else {
            deleteOneByOne(self);
          }
        }
      }, (err: HttpErrorResponse) => {
        const message = err.error;
        alert(message.error);
        if (err.status === 403) {
            window.location.reload();
        }
      });
    })(this);

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
