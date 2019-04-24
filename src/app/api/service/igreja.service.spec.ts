import { TestBed } from '@angular/core/testing';

import { IgrejaService } from './igreja.service';

describe('IgrejaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IgrejaService = TestBed.get(IgrejaService);
    expect(service).toBeTruthy();
  });
});
