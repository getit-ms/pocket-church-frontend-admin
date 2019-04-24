import { Injectable } from '@angular/core';
import {BuscaPaginada} from '../model/busca-paginada';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {Boletim} from '../model/boletim';

@Injectable()
export class BoletimService extends AbstractApiService {

  consulta(tipo?: 'BOLETIM' | 'PUBLICACAO', pagina?: number, total?: number): Observable<BuscaPaginada<Boletim>> {
    return this.doGet('/boletim', {
      params: {
        tipo: tipo ? [tipo] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  detalha(id: number): Observable<Boletim> {
    return this.doGet(`/boletim/${id}`);
  }

  remove(id: number): Observable<Boletim> {
    return this.doDelete(`/boletim/${id}`);
  }

  cadastra(entidade: Boletim): Observable<Boletim> {
    return this.doPost('/boletim', entidade);
  }

  atualiza(entidade: Boletim): Observable<Boletim> {
    return this.doPut('/boletim', entidade);
  }
}
