import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTesterComponent } from './code-tester.component';

describe('CodeTesterComponent', () => {
  let component: CodeTesterComponent;
  let fixture: ComponentFixture<CodeTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
