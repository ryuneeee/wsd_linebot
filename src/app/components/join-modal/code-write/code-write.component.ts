import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { Code } from '../../models/code';
import { Result } from '../../models/result';

@Component({
  selector: 'app-code-write',
  templateUrl: './code-write.component.html',
  styleUrls: ['./code-write.component.css'],
})
export class CodeWriteComponent implements OnInit, OnDestroy {
  private sub: any;
  code: Code;
  options: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

  ngOnInit() {
    this.service.selectedCode = null;
    this.code = new Code();
    this.sub = this.route.params.subscribe(params => {
       this.code.ctxId = params['id'];
    });
  }

  submit() {
    const _id = this.code.ctxId;
    this.service.createCode(this.code).subscribe((m: Result) => {
      if (m.result === 'success') {
        alert('Done!');
        this.router.navigateByUrl('/list/' + _id);
      }
    }, this.service.errorHandler);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
