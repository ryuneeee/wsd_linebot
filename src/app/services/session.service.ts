import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SessionService {
    constructor(private http: HttpClient) { }

    sessionCheck() {
         return this.http.post('/checkSess', {});
    }
}
