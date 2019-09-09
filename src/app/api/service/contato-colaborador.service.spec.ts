import { TestBed } from '@angular/core/testing';

import { ContatoColaboradorService } from './contato-colaborador.service';

describe('ContatoColaboradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoColaboradorService = TestBed.get(ContatoColaboradorService);
    expect(service).toBeTruthy();
  });
});
