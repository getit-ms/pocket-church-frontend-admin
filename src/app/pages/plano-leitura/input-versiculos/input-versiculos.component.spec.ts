import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVersiculosComponent } from './input-versiculos.component';

describe('InputVersiculosComponent', () => {
  let component: InputVersiculosComponent;
  let fixture: ComponentFixture<InputVersiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputVersiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputVersiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
