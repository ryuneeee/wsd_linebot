import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import {SessionService} from '../../services/session.service';
import { Code } from '../../models/code';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-code-wrapper',
    templateUrl: './code-wrapper.component.html',
    styleUrls: ['./code-wrapper.component.css'],
})
export class CodeWrapperComponent implements OnInit, OnDestroy {
    private sub: any;
    private sub2: any;

    isLogin: boolean;

    ctxId: string;

    selectedCode: Code;
    codes: Code[];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private service: CodeService,
      private sessService: SessionService) { }

    ngOnInit() {
      this.codes = null;
      this.selectedCode = null;

      this.sub = this.route.params.subscribe(params => {
         this.ctxId = params['ctxId'];
      });

      this.sub2 = this.sessService.username$.subscribe((username: string) => {
        this.isLogin = (username !== null);
        if (this.isLogin) {
          this.getCodeList();
        } else {
          this.router.navigateByUrl(this.router.url + '?notlogin=1');
        }
      });

    }

    getCodeList() {
      this.service.getCodes(this.ctxId).subscribe((c: Code[]) => {
        this.codes = c;
      }, (err: HttpErrorResponse) => {

      });
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
      this.sub2.unsubscribe();
    }

}
