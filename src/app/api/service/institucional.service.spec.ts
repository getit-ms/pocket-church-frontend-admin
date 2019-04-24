import { TestBed } from '@angular/core/testing';

import { InstitucionalService } from './institucional.service';

describe('InstitucionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitucionalService = TestBed.get(InstitucionalService);
    expect(service).toBeTruthy();
  });
});
