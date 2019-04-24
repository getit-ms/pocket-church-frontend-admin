import { TestBed } from '@angular/core/testing';

import { IgrejasTranslateLoaderService } from './igrejas-trasnlate-loader.service';

describe('IgrejasTrasnlateLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IgrejasTranslateLoaderService = TestBed.get(IgrejasTranslateLoaderService);
    expect(service).toBeTruthy();
  });
});
