import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {BuscaPaginada} from '../model/busca-paginada';
import {VersiculoDiario} from '../model/versiculo-diario';

@Injectable()
export class VersiculoService extends AbstractApiService {

  consulta(filtro?: string, pagina?: number, total?: number): Observable<BuscaPaginada<VersiculoDiario>> {
    return this.doGet('/versiculo', {
      params: {
        filtro: filtro ? [filtro] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  remove(id: number): Observable<VersiculoDiario> {
    return this.doDelete(`/versiculo/${id}`);
  }

  cadastra(entidade: VersiculoDiario): Observable<VersiculoDiario> {
    return this.doPost('/versiculo', entidade);
  }

  habilita(id: number): Observable<VersiculoDiario> {
    return this.doPut<VersiculoDiario>(`/versiculo/habilita/${id}`);
  }

  desabilita(id: number): Observable<VersiculoDiario> {
    return this.doPut<VersiculoDiario>(`/versiculo/desabilita/${id}`);
  }
}
