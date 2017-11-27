import { Component,Input } from '@angular/core';
import { HttpService } from './http.service';

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

    constructor(private httpservice: HttpService) {}

    loginHandler() {
        //console.log('loginHandler : ' + this.userid + ':' + this.userpw); // for debug
        //this.httpservice.doLogin().subscribe(result => console.log(result); //  request to url which process login
    }

    joinHandler() {
        //console.log('joinHandler : ' + this.userid + ':' + this.userpw); // for debug
        //this.httpservice.doJoin().subscribe(result => console.log(result); // request to url which process join
    }
}
