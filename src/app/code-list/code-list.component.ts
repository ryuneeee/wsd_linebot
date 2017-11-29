import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../code.service';
import { Code } from '../code';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css'],
})
export class CodeListComponent implements OnInit, OnDestroy {
  ctxId: string;
  codes: Code[];
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CodeService) { }

  ngOnInit() {
    this.service.selectedCode = null;
    this.sub = this.route.params.subscribe(params => {
       this.ctxId = params['id'];
       this.getCodeList(this.ctxId);
    });
  }

  getCodeList(ctxId) {
    this.service.getCodes(this.ctxId).subscribe((c :Code[]) => {
      this.codes = c;
    });
  }

  view(code: Code) {
    this.router.navigateByUrl('/view/' + code.id);
  }

  write() {
    this.router.navigateByUrl('/write/' + this.ctxId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
