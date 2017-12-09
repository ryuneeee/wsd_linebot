import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Code } from '../models/code';
import { Router } from '@angular/router';

@Injectable()
export class CodeService {
  public selectedCode: Code = null;

  constructor(private http: HttpClient,
              private router: Router) { }

  getCodes(ctxId) {
    return this.http.get('/codes/' + ctxId);
  }

  getCode(codeId) {
    return this.http.get('/code/' + codeId);
  }

  createCode(code: Code) {
    return this.http.post('/code/' + code.ctxId, {
      'name':     code.name,
      'interval': code.interval,
      'content':  code.content
    });
  }

  updateCode(code: Code) {
    return this.http.put('/code/' + code.id, {
      'name':     code.name,
      'interval': code.interval,
      'content':  code.content
    });
  }

  deleteCode(code: Code) {
    return this.http.delete('/code/' + code.id);
  }

  errorHandler(err: HttpErrorResponse) {
    const message = err.error;
    alert(message.error);
    console.log(err.status);
      if (err.status === 403) {
          window.location.reload();
      }
  }

  runCode(code: Code, input: string) {
    return this.http.post('/codes/test', {
      'code': code.content,
      'input': input
    });
  }
}
