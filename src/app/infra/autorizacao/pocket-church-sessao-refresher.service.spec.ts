import { TestBed } from '@angular/core/testing';

import { PocketChurchSessaoRefresherService } from './pocket-church-sessao-refresher.service';

describe('PocketChurchSessaoRefresherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketChurchSessaoRefresherService = TestBed.get(PocketChurchSessaoRefresherService);
    expect(service).toBeTruthy();
  });
});
