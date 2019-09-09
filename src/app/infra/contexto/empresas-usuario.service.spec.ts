import { TestBed } from '@angular/core/testing';

import { EmpresasUsuarioService } from './empresas-usuario.service';

describe('EmpresasUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresasUsuarioService = TestBed.get(EmpresasUsuarioService);
    expect(service).toBeTruthy();
  });
});
