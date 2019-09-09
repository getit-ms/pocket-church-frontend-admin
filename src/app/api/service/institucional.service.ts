import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Institucional} from '../model/institucional';
import {AbstractApiService} from './api-service.abstract';

@Injectable()
export class InstitucionalService extends AbstractApiService {

  get(): Observable<Institucional> {
    return this.doGet<Institucional>(
      `/institucional`
    );
  }

  update(institucional: Institucional): Observable<Institucional> {
    return this.doPut<Institucional>(
      `/institucional`,
      institucional
    );
  }
}
