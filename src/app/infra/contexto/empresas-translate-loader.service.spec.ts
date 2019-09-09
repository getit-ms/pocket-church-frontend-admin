import { TestBed } from '@angular/core/testing';

import { EmpresasTranslateLoaderService } from './empresas-trasnlate-loader.service';

describe('EmpresasTrasnlateLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresasTranslateLoaderService = TestBed.get(EmpresasTranslateLoaderService);
    expect(service).toBeTruthy();
  });
});
