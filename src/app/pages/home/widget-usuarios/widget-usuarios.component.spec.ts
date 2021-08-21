import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetUsuariosComponent } from './widget-usuarios.component';

describe('WidgetUsuariosComponent', () => {
  let component: WidgetUsuariosComponent;
  let fixture: ComponentFixture<WidgetUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
