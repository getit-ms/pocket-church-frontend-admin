import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjudaComponent } from './modal-ajuda.component';

describe('ModalAjudaComponent', () => {
  let component: ModalAjudaComponent;
  let fixture: ComponentFixture<ModalAjudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
