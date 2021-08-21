import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaComponent } from './mocal-categoria.component';

describe('MocalCategoriaComponent', () => {
  let component: ModalCategoriaComponent;
  let fixture: ComponentFixture<ModalCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
