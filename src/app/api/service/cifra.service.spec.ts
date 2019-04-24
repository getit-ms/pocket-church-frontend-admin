import { TestBed } from '@angular/core/testing';

import { CifraService } from './cifra.service';

describe('CifraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CifraService = TestBed.get(CifraService);
    expect(service).toBeTruthy();
  });
});
