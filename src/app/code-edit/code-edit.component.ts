import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../code.service';
import { Code } from '../code';
import { Result } from '../result';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.css'],
  providers:  [ CodeService ]
})
export class CodeEditComponent implements OnInit, OnDestroy {
  code: Code;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

  ngOnInit() {
    this.code = new Code();
    this.sub = this.route.params.subscribe(params => {
      this.getCode(params['id']);
    });
  }

  getCode(id) {
    this.service.getCode(id).subscribe((c: Code) => {
      this.code = c;
      this.code.id = id;
    });
  }

  submit() {
    let _id = this.code.id;
    this.service.updateCode(this.code).subscribe((m: Result) => {
      if (m.result == 'success') {
        alert("Done!");
        this.router.navigateByUrl('/view/' + _id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
