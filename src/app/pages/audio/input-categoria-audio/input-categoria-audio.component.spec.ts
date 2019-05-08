import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategoriaEstudoComponent } from './input-categoria.component';

describe('InputCategoriaComponent', () => {
  let component: InputCategoriaEstudoComponent;
  let fixture: ComponentFixture<InputCategoriaEstudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCategoriaEstudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCategoriaEstudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
