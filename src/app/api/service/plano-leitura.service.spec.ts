import { TestBed } from '@angular/core/testing';

import { PlanoLeituraService } from './plano-leitura.service';

describe('PlanoLeituraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanoLeituraService = TestBed.get(PlanoLeituraService);
    expect(service).toBeTruthy();
  });
});
