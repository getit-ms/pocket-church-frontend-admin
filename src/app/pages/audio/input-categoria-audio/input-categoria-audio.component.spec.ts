import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategoriaDocumentoComponent } from './input-categoria.component';

describe('InputCategoriaComponent', () => {
  let component: InputCategoriaDocumentoComponent;
  let fixture: ComponentFixture<InputCategoriaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCategoriaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCategoriaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
