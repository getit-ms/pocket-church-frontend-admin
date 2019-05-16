import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {Ministerio} from '../model/ministerio';

@Injectable()
export class MinisterioService extends AbstractApiService {

  consulta(): Observable<Array<Ministerio>> {
    return this.doGet('/ministerio');
  }

  consultaPorAcesso(): Observable<Array<Ministerio>> {
      return this.doGet('/ministerio/acesso');
  }

  detalha(id: number): Observable<Ministerio> {
    return this.doGet(`/ministerio/${id}`);
  }

  remove(id: number): Observable<Ministerio> {
    return this.doDelete(`/ministerio/${id}`);
  }

  cadastra(entidade: Ministerio): Observable<Ministerio> {
    return this.doPost('/ministerio', entidade);
  }

  atualiza(entidade: Ministerio): Observable<Ministerio> {
    return this.doPut('/ministerio', entidade);
  }
}
