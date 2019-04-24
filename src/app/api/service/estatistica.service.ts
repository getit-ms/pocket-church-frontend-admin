import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {QuantidadeDispositivo} from '../model/quantidade-dispositivo';
import {EstatisticaDispositivo} from '../model/estatistica-dispositivo';
import {EstatisticaAcesso} from '../model/estatistica-acesso';

@Injectable()
export class EstatisticaService extends AbstractApiService {

  buscaQuantidadesDispositivos(): Observable<Array<QuantidadeDispositivo>> {
    return this.doGet<Array<QuantidadeDispositivo>>('/estatistica/dispositivos/quantidade');
  }

  buscaEstatisticasDispositivos(): Observable<Array<EstatisticaDispositivo>> {
    return this.doGet<Array<EstatisticaDispositivo>>('/estatistica/dispositivos');
  }

  buscaEstatisticasAcessoFuncionalidade(funcionalidade: string): Observable<Array<EstatisticaAcesso>> {
    return this.doGet<Array<EstatisticaAcesso>>(`/estatistica/acessos/${funcionalidade}`);
  }

}
