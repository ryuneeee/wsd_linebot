import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SessionService {
  private isLoggedOnSource = new Subject<boolean>();
  isLoggedOn$ = this.isLoggedOnSource.asObservable();

  constructor(private http: HttpClient) { }

  emitLoginStatus(isLoggedOn: boolean) {
    this.isLoggedOnSource.next(isLoggedOn);
  }

  sessionCheck() {
    return this.http.post('/checkSess', {});
  }
}
