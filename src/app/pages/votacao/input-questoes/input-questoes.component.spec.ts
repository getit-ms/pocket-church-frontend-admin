import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuestoesComponent } from './input-questoes.component';

describe('InputQuestoesComponent', () => {
  let component: InputQuestoesComponent;
  let fixture: ComponentFixture<InputQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
