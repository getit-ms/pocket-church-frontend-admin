import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDispositivosComponent } from './widget-dispositivos.component';

describe('WidgetDispositivosComponent', () => {
  let component: WidgetDispositivosComponent;
  let fixture: ComponentFixture<WidgetDispositivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDispositivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
