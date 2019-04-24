import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResumoIgreja} from '../model/resumo-igreja';
import {RequisicaoLogin} from '../model/requisicao-login';
import {Acesso} from '../model/acesso';
import {AbstractApiService} from './api-service.abstract';
import {StatusAdmin} from '../model/status-admin';

@Injectable()
export class AcessoService extends AbstractApiService {

  iniciaLogin(email: string): Observable<Array<ResumoIgreja>> {
    return this.doGet<Array<ResumoIgreja>>(
      `/acesso/login/${email}`
    );
  }

  login(requisicao: RequisicaoLogin): Observable<Acesso> {
    return this.doPut<Acesso>(
      `/acesso/login`,
      requisicao
    );
  }

  status(): Observable<StatusAdmin> {
    return this.doGet(`/acesso/status`);
  }

  refresh(version: string): Observable<Acesso> {
    return this.doGet(
      `/acesso`, {
        params: {
          'versao': [version]
        }
      });
  }
}
