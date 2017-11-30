import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input() userid: string;
    @Input() userpw: string;

    loginFailed1: boolean;
    loginFailed2: boolean;
    loginSuccess: boolean;
    unknownError: boolean;

    joinFailed1: boolean;
    joinFailed2: boolean;
    joinSuccess: boolean;

    showLoginModal = false;
    showJoinModal = false;

    constructor(private httpservice: UserService) {}

    loginHandler() {
        // console.log('loginHandler : ' + this.userid + ':' + this.userpw); // for debug
        this.httpservice.doLogin(this.userid, this.userpw).subscribe(res => {
            this.loginSuccess = true;
            setTimeout( () => {
                this.loginSuccess = false;
                this.showLoginModal = false;
                window.location.reload();
                }, 1000);
            }, (err: HttpErrorResponse) => {
            console.log('status ' + err.status)
            if (err.status === 401) {
                console.log('id or pw incorrect');
                this.loginFailed1 = true;
                setTimeout( () =>  this.loginFailed1 = false , 5000);
            } else if (err.status === 403) {
                console.log('already logged in');
                this.loginFailed2 = true;
                setTimeout( () => this.loginFailed2 = false , 5000);
            } else {
                console.log('unknown error');
                this.unknownError = true;
                setTimeout( () => this.unknownError = false , 5000);
            }
        }); //  request to url which process login
        this.userid = '';
        this.userpw = '';
    }

    joinHandler() {
        // console.log('joinHandler : ' + this.userid + ':' + this.userpw); // for debug
        this.httpservice.doJoin(this.userid, this.userpw).subscribe(res => {
            this.joinSuccess = true;
            setTimeout( () => {this.joinSuccess = false; this.showJoinModal = false; }, 1000);
        }, (err: HttpErrorResponse) => {
            if (err.status === 400) {
                console.log('id or pw is blank');
                this.joinFailed1 = true;
                setTimeout( () => this.joinFailed1 = false , 5000);
            } else if (err.status === 405) {
                console.log('already exist');
                this.joinFailed2 = true;
                setTimeout( () => this.joinFailed2 = false , 5000);
            } else {
                this.unknownError = true;
                setTimeout( () => this.unknownError = false , 5000);
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
