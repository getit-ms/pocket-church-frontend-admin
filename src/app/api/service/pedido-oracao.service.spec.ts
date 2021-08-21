import { TestBed } from '@angular/core/testing';

import { PedidoOracaoService } from './pedido-oracao.service';

describe('PedidoOracaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidoOracaoService = TestBed.get(PedidoOracaoService);
    expect(service).toBeTruthy();
  });
});
