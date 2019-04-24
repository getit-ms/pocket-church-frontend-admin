import { Injectable } from '@angular/core';
import {BuscaPaginada} from '../model/busca-paginada';
import {CategoriaEstudo} from '../model/categoria-estudo';
import {AbstractApiService} from './api-service.abstract';
import {Estudo} from '../model/estudo';
import {Observable} from 'rxjs';

@Injectable()
export class EstudoService extends AbstractApiService {

  consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Estudo>> {
    return this.doGet('/estudo', {
      params: {
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
}

  buscaCategorias(): Observable<Array<CategoriaEstudo>> {
    return this.doGet(`/estudo/categoria`);
}

  cadastraCategorias(categoria: CategoriaEstudo): Observable<CategoriaEstudo> {
    return this.doPost(`/estudo/categoria`, categoria);
}

  detalha(id: number): Observable<Estudo> {
    return this.doGet(`/estudo/${id}`);
}

  remove(id: number): Observable<Estudo> {
    return this.doDelete(`/estudo/${id}`);
}

  cadastra(entidade: Estudo): Observable<Estudo> {
    return this.doPost('/estudo', entidade);
}

  atualiza(entidade: Estudo): Observable<Estudo> {
    return this.doPut('/estudo', entidade);
}
}
