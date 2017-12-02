import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-wrapper-edit',
    templateUrl: './code-wrapper.component.html',
    styleUrls: ['./code-wrapper.component.css'],
})
export class CodeWrapperComponent implements OnInit{

    constructor(
        private router: Router) { }

    ngOnInit() {
    }
}
