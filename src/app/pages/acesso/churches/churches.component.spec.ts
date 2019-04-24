import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchesComponent } from './churches.component';

describe('ChurchesComponent', () => {
  let component: ChurchesComponent;
  let fixture: ComponentFixture<ChurchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
