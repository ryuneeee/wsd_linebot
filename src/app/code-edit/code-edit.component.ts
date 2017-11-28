import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.css']
})
export class CodeEditComponent implements OnInit {
  code: string = "let test = 'a';\nreply('foobar');\n\n";

  constructor() { }

  ngOnInit() {
  }

}
