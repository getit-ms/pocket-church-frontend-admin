import { TestBed } from '@angular/core/testing';

import { PocketCorporateTokenDataFactoryService } from './pocket-corporate-token-data-factory.service';

describe('PocketChurchTokenDataFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketCorporateTokenDataFactoryService = TestBed.get(PocketCorporateTokenDataFactoryService);
    expect(service).toBeTruthy();
  });
});
