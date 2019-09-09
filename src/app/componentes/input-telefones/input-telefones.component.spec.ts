import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTelefonesComponent } from './input-telefones.component';

describe('InputTelefonesComponent', () => {
  let component: InputTelefonesComponent;
  let fixture: ComponentFixture<InputTelefonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTelefonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
