import { TestBed } from '@angular/core/testing';

import { PocketChurchFileManagementService } from './pocket-church-file-management.service';

describe('PocketChurchFileManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketChurchFileManagementService = TestBed.get(PocketChurchFileManagementService);
    expect(service).toBeTruthy();
  });
});
