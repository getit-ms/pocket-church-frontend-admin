import { TestBed } from '@angular/core/testing';

import { AplicativoService } from './aplicativo.service';

describe('AplicativoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplicativoService = TestBed.get(AplicativoService);
    expect(service).toBeTruthy();
  });
});
