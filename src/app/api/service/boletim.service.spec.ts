import { TestBed } from '@angular/core/testing';

import { BoletimService } from './boletim.service';

describe('BoletimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoletimService = TestBed.get(BoletimService);
    expect(service).toBeTruthy();
  });
});
