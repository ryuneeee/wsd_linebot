import { Component } from '@angular/core';
import { UserService } from './user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    userObject: any;
    userid: string;
    isLoggedOn: boolean;
    constructor(private service: UserService) {
      this.service.sessionCheck().subscribe((res) => {
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
