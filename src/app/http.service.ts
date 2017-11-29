import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }


    doLogin(userid: string, userpw: string) {
        const headers = new HttpHeaders();
        headers.append('Contents-type', 'application/json');
        return this.http.post('/login', {userid: userid, userpw: userpw}, {headers: headers});
    }

    doJoin(userid: string, userpw: string) {
        const headers = new HttpHeaders();
        headers.append('Contents-type', 'application/json');
        return this.http.post('/join', {userid: userid, userpw: userpw}, {headers: headers});
    }

    doLogout() {
        return this.http.post('/logout', { });
    }

    sessionCheck() {
        return this.http.post('/checkSess', {});
    }
}
