import { TestBed } from '@angular/core/testing';

import { IgrejasUsuarioService } from './igrejas-usuario.service';

describe('IgrejasUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IgrejasUsuarioService = TestBed.get(IgrejasUsuarioService);
    expect(service).toBeTruthy();
  });
});
