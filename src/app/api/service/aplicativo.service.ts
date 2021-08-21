import { Injectable } from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';

@Injectable()
export class AplicativoService extends AbstractApiService {

  buscaTodasFuncionalidades(): Observable<Array<string>> {
    return this.doGet<Array<string>>('/aplicativo/funcionalidades/todas');
  }

  buscaFuncionalidadesAtivas(): Observable<Array<string>> {
    return this.doGet<Array<string>>('/aplicativo/funcionalidades');
  }

  salvaFuncionalidadesAtivas(funcionalidades: Array<string>): Observable<void> {
    return this.doPut<void>('/aplicativo/funcionalidades', funcionalidades);
  }

}
