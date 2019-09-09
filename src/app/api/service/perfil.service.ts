import { Injectable } from '@angular/core';
import {Perfil} from '../model/perfil';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';

@Injectable()
export class PerfilService extends AbstractApiService {

  consulta(): Observable<Array<Perfil>> {
    return this.doGet('/perfil');
  }

  funcionalidades(): Observable<Array<string>> {
    return this.doGet('/perfil/funcionalidades');
  }

  detalha(id: number): Observable<Perfil> {
    return this.doGet(`/perfil/${id}`);
  }

  remove(id: number): Observable<Perfil> {
    return this.doDelete(`/perfil/${id}`);
  }

  cadastra(entidade: Perfil): Observable<Perfil> {
    return this.doPost('/perfil', entidade);
  }

  atualiza(entidade: Perfil): Observable<Perfil> {
    return this.doPut('/perfil', entidade);
  }
}
