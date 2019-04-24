import {Injectable} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {AssetsService} from '../../api/service/assets.service';

@Injectable()
export class IgrejasTranslateLoaderService implements TranslateLoader {
  private cacheLocales: {[key: string]: any} = {};
  private cacheIgrejas: {[key: string]: any} = {};

  igreja: string;

  constructor(
    private assetsService: AssetsService
  ) { }

  getTranslation(lang: string): Observable<any> {
    return Observable.create(async observer => {
      if (!this.cacheLocales[lang]) {
        this.cacheLocales[lang] = await this.assetsService.bundlePorLocale(lang).toPromise();
      }

      if (this.igreja) {
        if (!this.cacheIgrejas[this.igreja]) {
          try {
            this.cacheIgrejas[this.igreja] = await this.assetsService.bundlePorIgreja(this.igreja).toPromise() || {};
          } catch (ex) {
            console.log('Falha ao buscar bundle da igreja. Aplicando bundle padrão', ex);
          }
        }

        observer.next(this.mergeBundles(this.cacheLocales[lang], this.cacheIgrejas[this.igreja]));
      }
    });
  }

  private mergeBundles(original, enxuto): any {
    const custom = {};

    Object.keys(original).forEach(k => {
      if (typeof original[k] === 'string') {
        custom[k] = enxuto[k] || original[k];
      } else {
        custom[k] = this.mergeBundles(original[k], enxuto[k] || {});
      }
    });

    return custom;
  }
}
