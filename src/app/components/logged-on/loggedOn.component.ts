import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-loggedon',
    templateUrl: './loggedOn.component.html',
    styleUrls: ['./loggedOn.component.css']
})

export class LoggedOnComponent {
    @Input() isLoggedOn: boolean;
    @Output() logoutEventEmitter = new EventEmitter<boolean>();
    constructor(private service: UserService, private router: Router) {}

    logoutHandler() {
        this.service.doLogout().subscribe(res => {
            this.router.navigate(['main']);
        });
    }
}
