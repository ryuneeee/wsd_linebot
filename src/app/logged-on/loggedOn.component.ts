import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-loggedon',
    templateUrl: './loggedOn.component.html',
    styleUrls: ['./loggedOn.component.css']
})

export class LoggedOnComponent {

    constructor(private service: UserService) {}

    logoutHandler() {
        this.service.doLogout().subscribe();
        window.location.reload();
    }
}
