import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidacoesComponent } from './input-validacoes.component';

describe('InputValidacoesComponent', () => {
  let component: InputValidacoesComponent;
  let fixture: ComponentFixture<InputValidacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputValidacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
