import { TestBed } from '@angular/core/testing';

import { VersiculoService } from './versiculo.service';

describe('VersiculoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VersiculoService = TestBed.get(VersiculoService);
    expect(service).toBeTruthy();
  });
});
