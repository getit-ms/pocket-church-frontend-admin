import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {TermoAceite} from "../model/termo-aceite";
import {map} from "rxjs/internal/operators";

@Injectable()
export class TermoAceiteService extends AbstractApiService {

  buscaAtual(): Observable<TermoAceite> {
    return this.doGet('/termo-aceite', ).pipe(map(termo => termo || {termo: ''}));
  }

  cadastra(entidade: TermoAceite): Observable<TermoAceite> {
    return this.doPost('/termo-aceite', entidade);
  }

  atualiza(entidade: TermoAceite): Observable<TermoAceite> {
    return this.doPut('/termo-aceite', entidade);
  }
}
