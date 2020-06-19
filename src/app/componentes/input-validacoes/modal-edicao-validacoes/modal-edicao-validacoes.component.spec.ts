import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicaoValidacoesComponent } from './modal-edicao-validacoes.component';

describe('ModalEdicaoValidacoesComponent', () => {
  let component: ModalEdicaoValidacoesComponent;
  let fixture: ComponentFixture<ModalEdicaoValidacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEdicaoValidacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEdicaoValidacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
