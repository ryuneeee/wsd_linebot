import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { Code } from '../../models/code';
import { Result } from '../../models/result';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
})
export class CodeViewComponent implements OnInit, OnDestroy {
  code: Code;
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
    }
  }

  getCode(id) {
    this.service.getCode(id).subscribe((c: Code) => {
      this.code = c;
      this.code.id = id;
    }, this.service.errorHandler);
  }

  list() {
    this.router.navigate(['/list', this.code.ctxId]);
  }

  edit() {
    this.service.selectedCode = this.code;
    this.router.navigate(['/edit', this.code.id]);
  }

  delete() {
    let _id = this.code.ctxId;
    this.service.deleteCode(this.code).subscribe((r: Result) => {
      if (r.result == 'success') {
        alert('Done!');
        this.router.navigate(['/list', _id]);
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
