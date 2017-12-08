import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReferenceComponent } from './code-reference.component';

describe('CodeReferenceComponent', () => {
  let component: CodeReferenceComponent;
  let fixture: ComponentFixture<CodeReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
