import {Injectable} from '@angular/core';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';

@Injectable()
export class AssetsService extends AbstractApiService {

  bundlePorLocale(locale: string): Observable<any> {
    return this.doGet(`/assets/i18n/locale/${locale}.json`);
  }

  bundlePorEmpresa(empresa: string): Observable<any> {
    return this.doGet(`/assets/i18n/empresa/${empresa}.json`);
  }

}
