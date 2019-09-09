import {Injectable} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {AssetsService} from '../../api/service/assets.service';

@Injectable()
export class EmpresasTranslateLoaderService implements TranslateLoader {
    private cacheLocales: {[key: string]: any} = {};
    private cacheEmpresas: {[key: string]: any} = {};

    empresa: string;

    constructor(
        private assetsService: AssetsService
    ) { }

    getTranslation(lang: string): Observable<any> {
        return Observable.create(async observer => {
            if (!this.cacheLocales[lang]) {
                this.cacheLocales[lang] = await this.assetsService.bundlePorLocale(lang).toPromise();
            }

            if (this.empresa) {
                if (!this.cacheEmpresas[this.empresa]) {
                    try {
                        this.cacheEmpresas[this.empresa] = await this.assetsService.bundlePorEmpresa(this.empresa).toPromise() || {};
                    } catch (ex) {
                        console.log('Falha ao buscar bundle da empresa. Aplicando bundle padrão', ex);
                    }
                }

                observer.next(this.mergeBundles(this.cacheLocales[lang], this.cacheEmpresas[this.empresa]));
            } else {
                observer.next(this.cacheLocales[lang]);
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
