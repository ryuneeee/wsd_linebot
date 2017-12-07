import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SessionService {
  private usernameSource = new Subject<String>();
  username$ = this.usernameSource.asObservable();

  constructor(private http: HttpClient) { }

  emitUsername(username: String) {
    this.usernameSource.next(username);
  }

  sessionCheck() {
    return this.http.post('/checkSess', {});
  }
}
