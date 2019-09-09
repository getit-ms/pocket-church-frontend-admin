import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHistoricoUsuariosComponent } from './widget-historico-usuarios.component';

describe('WidgetHistoricoUsuariosComponent', () => {
  let component: WidgetHistoricoUsuariosComponent;
  let fixture: ComponentFixture<WidgetHistoricoUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHistoricoUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHistoricoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
