import { TestBed } from '@angular/core/testing';

import { PocketCorporateFileManagementService } from './pocket-corporate-file-management.service';

describe('PocketChurchFileManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketCorporateFileManagementService = TestBed.get(PocketCorporateFileManagementService);
    expect(service).toBeTruthy();
  });
});
