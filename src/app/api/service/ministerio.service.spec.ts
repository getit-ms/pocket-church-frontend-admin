import { TestBed } from '@angular/core/testing';

import { MinisterioService } from './ministerio.service';

describe('MinisterioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinisterioService = TestBed.get(MinisterioService);
    expect(service).toBeTruthy();
  });
});
