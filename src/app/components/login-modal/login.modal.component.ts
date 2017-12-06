import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login.modal.component.html',
    styleUrls: ['./login.modal.component.css'],
    animations: [
         trigger('dialog', [
             transition('void => *', []),
             transition('* => void', [])
         ])
    ]
})

export class LoginModalComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {  }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}
