import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioComponent } from './funcionalidades.component';

describe('FuncionalidadesComponent', () => {
  let component: EnvioComponent;
  let fixture: ComponentFixture<EnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
