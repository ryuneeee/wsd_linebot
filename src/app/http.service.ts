import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    doLogin(userid: string, userpw: string) {
        return this.http.post('/login.js', {userid: userid, userpw: userpw});
    }

    doJoin(userid: string, userpw: string) {
        return this.http.post('/join.js', {userid: userid, userpw: userpw});
    }
}