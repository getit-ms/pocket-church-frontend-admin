import { TestBed } from '@angular/core/testing';

import { PocketCorporateSessaoRefresherService } from './pocket-corporate-sessao-refresher.service';

describe('PocketChurchSessaoRefresherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketCorporateSessaoRefresherService = TestBed.get(PocketCorporateSessaoRefresherService);
    expect(service).toBeTruthy();
  });
});
