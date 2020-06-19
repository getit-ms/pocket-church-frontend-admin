import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOpcoesComponent } from './input-telefones.component';

describe('InputTelefonesComponent', () => {
  let component: InputOpcoesComponent;
  let fixture: ComponentFixture<InputOpcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOpcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
