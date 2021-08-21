import { TestBed } from '@angular/core/testing';

import { PrepareContextService } from './prepare-context.service';

describe('PrepareContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepareContextService = TestBed.get(PrepareContextService);
    expect(service).toBeTruthy();
  });
});
