import { TestBed } from '@angular/core/testing';

import { EnqueteService } from './enquete.service';

describe('EnqueteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnqueteService = TestBed.get(EnqueteService);
    expect(service).toBeTruthy();
  });
});
