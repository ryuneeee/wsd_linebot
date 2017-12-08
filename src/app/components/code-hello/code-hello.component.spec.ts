import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeHelloComponent } from './code-hello.component';

describe('CodeHelloComponent', () => {
  let component: CodeHelloComponent;
  let fixture: ComponentFixture<CodeHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
