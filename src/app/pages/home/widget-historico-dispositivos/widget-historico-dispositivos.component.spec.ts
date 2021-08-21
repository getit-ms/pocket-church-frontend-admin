import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHistoricoDispositivosComponent } from './widget-historico-dispositivos.component';

describe('WidgetHistoricoDispositivosComponent', () => {
  let component: WidgetHistoricoDispositivosComponent;
  let fixture: ComponentFixture<WidgetHistoricoDispositivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHistoricoDispositivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHistoricoDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
