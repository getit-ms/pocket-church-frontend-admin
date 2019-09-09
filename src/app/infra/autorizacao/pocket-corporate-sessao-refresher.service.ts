import { Injectable } from '@angular/core';
import {DadosSessao, SessaoRefresher, TokenData} from '@gafs/infra-autorizacao';
import {Observable} from 'rxjs';
import {AcessoService} from '../../api/service/acesso.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class PocketCorporateSessaoRefresherService implements SessaoRefresher {

  constructor(
    private acessoService: AcessoService
  ) { }

  refresh(token: TokenData): Observable<DadosSessao> {
    return this.acessoService.refresh(environment.version)
      .pipe(map(acesso => ({
        principal: {
          colaborador: acesso.colaborador,
          funcionalidades: acesso.funcionalidades
        },
        token: acesso.auth
      })));
  }
}
