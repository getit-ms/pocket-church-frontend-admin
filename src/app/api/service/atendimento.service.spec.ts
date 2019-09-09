import { TestBed } from '@angular/core/testing';

import { AtendimentoService } from './aconselhamento.service';

describe('AconselhamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtendimentoService = TestBed.get(AtendimentoService);
    expect(service).toBeTruthy();
  });
});
