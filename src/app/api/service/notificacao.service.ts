import { Injectable } from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {Notificacao} from '../model/notificacao';

@Injectable()
export class NotificacaoService extends AbstractApiService {

  envia(notificacao: Notificacao): Observable<void> {
    return this.doPost<void>('/notificacao', notificacao);
  }

}
