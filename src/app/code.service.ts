import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Code } from './code';

@Injectable()
export class CodeService {
  constructor(private http: HttpClient) { }

  getCodes(ctxId) {
    return this.http.get('/api/codes/' + ctxId);
  }

  getCode(codeId) {
    return this.http.get('/api/code/' + codeId);
  }

  createCode(code: Code) {
    return this.http.post('/api/code/' + code.ctxId, {
      'name': code.name,
      'content': code.content
    });
  }

  updateCode(code: Code) {
    return this.http.put('/api/code/' + code.id, {
      'name': code.name,
      'content': code.content
    });
  }

  deleteCode(code: Code) {
    return this.http.delete('/api/code/' + code.id);
  }
}
