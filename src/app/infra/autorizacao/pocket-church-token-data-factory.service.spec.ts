import { TestBed } from '@angular/core/testing';

import { PocketChurchTokenDataFactoryService } from './pocket-church-token-data-factory.service';

describe('PocketChurchTokenDataFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketChurchTokenDataFactoryService = TestBed.get(PocketChurchTokenDataFactoryService);
    expect(service).toBeTruthy();
  });
});
