import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PATH_BASE} from '../base-path';
import {Observable} from 'rxjs';
import {ResumoEmpresa} from '../model/resumo-empresa';
import {BuscaPaginada} from '../model/busca-paginada';
import {map} from 'rxjs/internal/operators';
import {Template} from '../model/template';
import {AbstractApiService} from "./api-service.abstract";

@Injectable()
export class EmpresaService extends AbstractApiService {

  busca(empresa: string): Observable<ResumoEmpresa> {
    return this.doGet<BuscaPaginada<ResumoEmpresa>>(
      `/empresa`, {
        params: {
          'chave': [empresa],
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
    return this.doGet<Template>(
      `/empresa/template`);
  }
}
