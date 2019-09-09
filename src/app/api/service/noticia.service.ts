import { Injectable } from '@angular/core';
import {Noticia} from '../model/noticia';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {BuscaPaginada} from '../model/busca-paginada';

@Injectable()
export class NoticiaService extends AbstractApiService {

  consulta(tipo?: string, pagina?: number, total?: number): Observable<BuscaPaginada<Noticia>> {
    return this.doGet('/noticia', {
      params: {
        tipo: tipo ? [tipo] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  detalha(id: number): Observable<Noticia> {
    return this.doGet(`/noticia/${id}`);
  }

  remove(id: number): Observable<Noticia> {
    return this.doDelete(`/noticia/${id}`);
  }

  cadastra(entidade: Noticia): Observable<Noticia> {
    return this.doPost('/noticia', entidade);
  }

  atualiza(entidade: Noticia): Observable<Noticia> {
    return this.doPut('/noticia', entidade);
  }
}
