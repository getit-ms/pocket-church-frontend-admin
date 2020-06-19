import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCamposEventoComponent } from './input-campos-evento.component';

describe('InputCamposEventoComponent', () => {
  let component: InputCamposEventoComponent;
  let fixture: ComponentFixture<InputCamposEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCamposEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCamposEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
