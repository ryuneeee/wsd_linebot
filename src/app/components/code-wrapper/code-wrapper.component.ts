import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { Code } from '../../models/code';

@Component({
    selector: 'app-code-wrapper',
    templateUrl: './code-wrapper.component.html',
    styleUrls: ['./code-wrapper.component.css'],
})
export class CodeWrapperComponent implements OnInit, OnDestroy {
    private sub: any;

    isLogin: boolean;

    ctxId: string;

    selectedCode: Code;
    codes: Code[];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private service: CodeService) { }

    ngOnInit() {
      this.isLogin = true;

      this.codes = null;
      this.selectedCode = null;

      this.sub = this.route.params.subscribe(params => {
         this.ctxId = params['ctxId'];
         this.getCodeList();
      });

    }

    getCodeList() {
      this.service.getCodes(this.ctxId).subscribe((c: Code[]) => {
        this.codes = c;
      }, this.service.errorHandler);
    }

    selectCode(code: Code) {
      if (code !== null) {
        code.ctxId = code.ctxId || this.ctxId;
        code.content = "";
      }
      this.selectedCode = code;
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
