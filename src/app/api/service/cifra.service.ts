import { Injectable } from '@angular/core';
import {BuscaPaginada} from '../model/busca-paginada';
import {Cifra} from '../model/cifra';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';

@Injectable()
export class CifraService extends AbstractApiService {

  consulta(tipo?: 'CIFRA' | 'CANTICO', pagina?: number, total?: number): Observable<BuscaPaginada<Cifra>> {
    return this.doGet('/cifra', {
      params: {
        tipo: tipo ? [tipo] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  letra(arquivo: number): Observable<{letra: string}> {
    return this.doGet(`/cifra/letra/${arquivo}`);
  }

  detalha(id: number): Observable<Cifra> {
    return this.doGet(`/cifra/${id}`);
  }

  remove(id: number): Observable<Cifra> {
    return this.doDelete(`/cifra/${id}`);
  }

  cadastra(entidade: Cifra): Observable<Cifra> {
    return this.doPost('/cifra', entidade);
  }

  atualiza(entidade: Cifra): Observable<Cifra> {
    return this.doPut('/cifra', entidade);
  }
}
