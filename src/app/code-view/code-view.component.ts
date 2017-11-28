import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../code.service';
import { Code } from '../code';
import { Result } from '../result';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  providers:  [ CodeService ]
})
export class CodeViewComponent implements OnInit, OnDestroy {
  code: Code;
  private sub: any;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

  ngOnInit() {
    this.code = new Code(); // before init...
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

  back() {
    this.location.back();
  }

  edit() {
    this.router.navigateByUrl('/edit/' + this.code.id);
  }

  delete() {
    let _id = this.code.ctxId;
    this.service.deleteCode(this.code).subscribe((r: Result) => {
      if (r.result == 'success') {
        alert('Done!');
        this.router.navigateByUrl('/list/' + _id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
