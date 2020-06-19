import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCampoEventoComponent } from './input-campo-evento.component';

describe('InputCampoEventoComponent', () => {
  let component: InputCampoEventoComponent;
  let fixture: ComponentFixture<InputCampoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCampoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCampoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
