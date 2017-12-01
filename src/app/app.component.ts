import { Component } from '@angular/core';
import { UserService } from './user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    userObject: any;
    userid: string;
    constructor(private service: UserService, private router: Router) {
      this.service.sessionCheck().subscribe((res) => {
          this.userObject = res;
          this.userid = this.userObject;
          router.navigate(['menu']);
      }, (err: HttpErrorResponse) => {
          if (err.status === 401) {
              router.navigate(['main']);
          } else {
              // TODO : error handling
          }
        });
    }
}
