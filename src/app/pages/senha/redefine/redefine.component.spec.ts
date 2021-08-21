import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefineComponent } from './base.component';

describe('BaseComponent', () => {
  let component: RedefineComponent;
  let fixture: ComponentFixture<RedefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
