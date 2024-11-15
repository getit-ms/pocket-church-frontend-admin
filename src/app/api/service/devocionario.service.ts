import { Injectable } from '@angular/core';
import {BuscaPaginada} from '../model/busca-paginada';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {DiaDevocionario} from "../model/dia-devocionario";

declare const moment: any;

@Injectable()
export class DevocionarioService extends AbstractApiService {

  consulta(dataInicio?: Date, dataTermino?: Date, pagina?: number, total?: number): Observable<BuscaPaginada<DiaDevocionario>> {
    return this.doGet('/devocionario', {
      params: {
        dataInicio: dataInicio ? [<string>moment(
            new Date(dataInicio.getFullYear(), dataInicio.getMonth(), dataInicio.getDate(), 0, 0, 0)
        ).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
        dataTermino: dataTermino ? [<string>moment(
            new Date(dataTermino.getFullYear(), dataTermino.getMonth(), dataTermino.getDate(), 23, 59, 59)
        ).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  remove(id: number): Observable<DiaDevocionario> {
    return this.doDelete(`/devocionario/${id}`);
  }

  cadastra(entidade: DiaDevocionario): Observable<DiaDevocionario> {
    return this.doPost('/devocionario', entidade);
  }

  atualiza(entidade: DiaDevocionario): Observable<DiaDevocionario> {
    return this.doPut('/devocionario', entidade);
  }
}
