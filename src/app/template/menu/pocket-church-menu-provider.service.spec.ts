import { TestBed } from '@angular/core/testing';

import { PocketChurchMenuProviderService } from './pocket-church-menu-provider.service';

describe('PocketChurchMenuProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketChurchMenuProviderService = TestBed.get(PocketChurchMenuProviderService);
    expect(service).toBeTruthy();
  });
});
