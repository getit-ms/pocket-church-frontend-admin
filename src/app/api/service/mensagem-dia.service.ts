import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {BuscaPaginada} from '../model/busca-paginada';
import {MensagemDia} from '../model/mensagem-dia';

@Injectable()
export class MensagemDiaService extends AbstractApiService {

  consulta(filtro?: string, pagina?: number, total?: number): Observable<BuscaPaginada<MensagemDia>> {
    return this.doGet('/mensagem-dia', {
      params: {
        filtro: filtro ? [filtro] : [],
        pagina: pagina ? [`${pagina}`] : [],
        total: total ? [`${total}`] : []
      }
    });
  }

  remove(id: number): Observable<MensagemDia> {
    return this.doDelete(`/mensagem-dia/${id}`);
  }

  cadastra(entidade: MensagemDia): Observable<MensagemDia> {
    return this.doPost('/mensagem-dia', entidade);
  }

  habilita(id: number): Observable<MensagemDia> {
    return this.doPut<MensagemDia>(`/mensagem-dia/habilita/${id}`);
  }

  desabilita(id: number): Observable<MensagemDia> {
    return this.doPut<MensagemDia>(`/mensagem-dia/desabilita/${id}`);
  }
}
