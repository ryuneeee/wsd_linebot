import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeWriteComponent } from './code-write.component';

describe('CodeHelloComponent', () => {
  let component: CodeWriteComponent;
  let fixture: ComponentFixture<CodeWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
