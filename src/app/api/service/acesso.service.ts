import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResumoEmpresa} from '../model/resumo-empresa';
import {RequisicaoLogin} from '../model/requisicao-login';
import {Acesso} from '../model/acesso';
import {AbstractApiService} from './api-service.abstract';
import {StatusAdmin} from '../model/status-admin';
import {Colaborador} from "../model/colaborador";

@Injectable()
export class AcessoService extends AbstractApiService {

  iniciaLogin(email: string): Observable<Array<ResumoEmpresa>> {
    return this.doGet<Array<ResumoEmpresa>>(
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

    redefinirSenha(chave: string): Observable<Colaborador> {
        return this.doGet(
            `/acesso/senha/redefinir`, {
                params: {
                    'chave': [chave]
                }
            });
    }
}
