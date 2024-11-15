import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionalidadesComponent } from './dias.component';

describe('FuncionalidadesComponent', () => {
  let component: FuncionalidadesComponent;
  let fixture: ComponentFixture<FuncionalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
