import { Component, OnInit, OnChanges } from '@angular/core';
import {SessionService} from '../services/session.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    userObject: any;
    userId: string;
    isLoggedOn: boolean;

    constructor(private sessService: SessionService) {}

    ngOnInit() {
        this.checkSession();
    }

    checkSession() {
        this.sessService.sessionCheck().subscribe(res => {
            this.userObject = res;
            this.userId = this.userObject;
            this.isLoggedOn = true;
            this.sessService.emitLoginStatus(true);
        }, (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.isLoggedOn = false;
              this.sessService.emitLoginStatus(false);
            } else {
              // TODO: error handling
            }
        });
    }


}
