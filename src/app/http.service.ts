import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }


    doLogin(userid: string, userpw: string) {
        console.log('login button'); // debug.
        console.log(userid, userpw);

        return this.http.post('/login.js', {userid: userid, userpw: userpw});
    }

    doJoin(userid: string, userpw: string) {
        console.log('join button'); // debug
        const headers = new HttpHeaders();
        headers.append('Contents-type', 'application/json');
        return this.http.post('/join.js', {userid: userid, userpw: userpw}, {headers: headers});
    }
}