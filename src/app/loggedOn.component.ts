import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-loggedon',
    templateUrl: './loggedOn.component.html',
    styleUrls: ['./loggedOn.component.css']
})

export class LoggedOnComponent {

    constructor(private httpservice: HttpService) {}

    logoutHandler() {
        this.httpservice.doLogout().subscribe();
        window.location.reload();
    }
}