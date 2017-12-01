import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../code.service';
import { Code } from '../code';
import { Result } from '../result';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.css'],
})
export class CodeEditComponent implements OnInit, OnDestroy {
  code: Code;
  content: string;
  @Input() test: string;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

  ngOnInit() {
    if (this.service.selectedCode == null) {
      this.code = new Code();
      this.sub = this.route.params.subscribe(params => {
        this.getCode(params['id']);
      });
    } else {
      this.code = this.service.selectedCode;
      this.service.selectedCode = null;

      this.content = this.code.content;
    }
  }

  getCode(id) {
    this.service.getCode(id).subscribe((c: Code) => {
      this.code = c;
      this.content = this.code.content;
    }, this.service.errorHandler);
  }

  submit() {
    let _id = this.code.id;
    this.code.content = this.content;
    this.service.updateCode(this.code).subscribe((m: Result) => {
      if (m.result == 'success') {
        alert("Done!");
        this.router.navigateByUrl('/view/' + _id);
      }
    }, this.service.errorHandler);
  }

  ngOnDestroy() {
    if (typeof(this.sub) != 'undefined') {
      this.sub.unsubscribe();
    }
    this.service.selectedCode = this.code;
  }

}
