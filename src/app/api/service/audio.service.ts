import { Injectable } from '@angular/core';
import {Audio} from '../model/audio';
import {Observable} from 'rxjs';
import {AbstractApiService} from './api-service.abstract';
import {BuscaPaginada} from '../model/busca-paginada';
import {CategoriaAudio} from '../model/categoria-audio';

@Injectable()
export class AudioService extends AbstractApiService {

  consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Audio>> {
    return this.doGet('/audio', {
      params: {
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  buscaCategorias(): Observable<Array<CategoriaAudio>> {
    return this.doGet(`/audio/categoria`);
  }

  cadastraCategorias(categoria: CategoriaAudio): Observable<CategoriaAudio> {
    return this.doPost(`/audio/categoria`, categoria);
  }

  detalha(id: number): Observable<Audio> {
    return this.doGet(`/audio/${id}`);
  }

  remove(id: number): Observable<Audio> {
    return this.doDelete(`/audio/${id}`);
  }

  cadastra(entidade: Audio): Observable<Audio> {
    return this.doPost('/audio', entidade);
  }

  atualiza(entidade: Audio): Observable<Audio> {
    return this.doPut('/audio', entidade);
  }
}
