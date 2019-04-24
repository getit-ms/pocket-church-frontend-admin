import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PATH_BASE} from '../base-path';
import {Observable} from 'rxjs';
import {ResumoIgreja} from '../model/resumo-igreja';
import {BuscaPaginada} from '../model/busca-paginada';
import {map} from 'rxjs/internal/operators';
import {Template} from '../model/template';

@Injectable()
export class IgrejaService {

  constructor(
    @Inject(API_PATH_BASE)
    @Optional()
    private pathBase: string = 'http://localhost',
    private httpClient: HttpClient
  ) { }

  busca(igreja: string): Observable<ResumoIgreja> {
    return this.httpClient.get<BuscaPaginada<ResumoIgreja>>(
      `${this.pathBase}/igreja`, {
        params: {
          'chave': [igreja],
          'pagina': ['1'],
          'tamanho': ['1']
        }
      }).pipe(map(pagina => {
        if (pagina.resultados) {
          return pagina.resultados[0];
        }

        return undefined;
    }));
  }


  template(): Observable<Template> {
    return this.httpClient.get<Template>(
      `${this.pathBase}/igreja/template`);
  }
}
