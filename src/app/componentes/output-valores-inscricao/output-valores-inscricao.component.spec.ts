import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputValoresInscricaoComponent } from './output-valores-inscricao.component';

describe('OutputValoresInscricaoComponent', () => {
  let component: OutputValoresInscricaoComponent;
  let fixture: ComponentFixture<OutputValoresInscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputValoresInscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputValoresInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
