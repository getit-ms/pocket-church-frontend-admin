import { TestBed } from '@angular/core/testing';

import { EstudoService } from './estudo.service';

describe('EstudoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstudoService = TestBed.get(EstudoService);
    expect(service).toBeTruthy();
  });
});
