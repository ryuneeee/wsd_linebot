import { Component } from '@angular/core';
import {HttpService} from './http.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [ HttpService ]
})
export class AppComponent {
    userObject: any;
    userid: string;
    isLoggedOn: boolean;
    constructor(private httpservice: HttpService) {
      this.httpservice.sessionCheck().subscribe((res) => {
          this.userObject = res;
          this.userid = this.userObject;
          this.isLoggedOn = true;
          console.log(this.userid);
      }, (err: HttpErrorResponse) => {
          if (err.status === 401) {
              this.isLoggedOn = false;
          } else {
              // TODO : error handling
          }
        });
    }
}
