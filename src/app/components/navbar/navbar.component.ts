import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input() userid: string;
    @Input() userpw: string;

    showLoginModal = false;
    showJoinModal = false;

    alertType: string;
    alertMessage: string;
    alertFlag: boolean;

    constructor(private httpservice: UserService, private router: Router) {}

    alert(type: number, message: string, ms: number) {
        if (type === 1) {
            this.alertType = 'alert alert-success';
        } else if (type === 2) {
            this.alertType = 'alert alert-danger';
        } else if (type === 3) {
            this.alertType = 'alert alert-warning';
        }
        this.alertMessage = message;
        this.alertFlag = true;
        setTimeout(() => this.alertFlag = false, ms);
    }

    loginHandler() {
        this.httpservice.doLogin(this.userid, this.userpw).subscribe(res => {
            this.alert(1, 'Login Success', 1000);
            this.router.navigate(['menu']);
        }, (err: HttpErrorResponse) => {
            if (err.status === 401) {
                this.alert(2, 'ID or PW Error', 5000);
            } else if (err.status === 403) {
                this.alert(2, 'already logged in', 5000);
            } else {
                this.alert(2, 'unknown error', 5000);
            }
        }); //  request to url which process login
        this.userid = '';
        this.userpw = '';
    }

    joinHandler() {
        this.httpservice.doJoin(this.userid, this.userpw).subscribe(res => {
            this.alert(1, 'Join Success', 1000);
        }, (err: HttpErrorResponse) => {
            if (err.status === 400) {
                this.alert(2, err.error.error, 5000);
            } else {
                this.alert(2, 'unknown error', 5000);
            }
        }); // request to url which process join
        this.userid = '';
        this.userpw = '';
    }

    loginModalControl() {
        if (this.showJoinModal !== true) {
            this.showLoginModal = !this.showLoginModal;
        }
    }

    joinModelControl() {
        if (this.showLoginModal !== true) {
            this.showJoinModal = !this.showJoinModal;
        }
    }

}
