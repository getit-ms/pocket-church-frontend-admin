import { TestBed } from '@angular/core/testing';

import { AconselhamentoService } from './aconselhamento.service';

describe('AconselhamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AconselhamentoService = TestBed.get(AconselhamentoService);
    expect(service).toBeTruthy();
  });
});
