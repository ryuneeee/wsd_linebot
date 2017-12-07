import { Component, OnInit, OnChanges } from '@angular/core';
import {SessionService} from '../services/session.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    userId: String;
    isLoggedOn: boolean;

    constructor(private sessService: SessionService) {}

    ngOnInit() {
        this.checkSession();
    }

    checkSession() {
        this.sessService.sessionCheck().subscribe((res: String) => {
            this.setUserId(res);
        }, (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.setUserId(null);
            } else {
              // TODO: error handling
            }
        });
    }

    setUserId(userId: String) {
      this.userId = userId;
      this.isLoggedOn = (userId !== null);
      this.sessService.emitUsername(userId);
    }


}
