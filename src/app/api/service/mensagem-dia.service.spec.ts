import { TestBed } from '@angular/core/testing';

import { MensagemDiaService } from './mensagem-dia.service';

describe('VersiculoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagemDiaService = TestBed.get(MensagemDiaService);
    expect(service).toBeTruthy();
  });
});
