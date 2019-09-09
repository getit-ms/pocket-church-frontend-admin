import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {GaleriaFoto} from "../model/galeria-foto";
import {BuscaPaginada} from "../model/busca-paginada";
import {ConfiguracaoFlickr} from "../model/configuracao-flickr";

@Injectable()
export class FotoService extends AbstractApiService {

    buscaGalerias(pagina?: number): Observable<BuscaPaginada<GaleriaFoto>> {
        return this.doGet('/foto/galeria', {
            params: {
                pagina: pagina ? [`${pagina}`] : undefined
            }
        });
    }

    buscaURL(): Observable<{url: string}> {
        return this.doGet('/foto/url');
    }

    desativa(): Observable<string> {
        return this.doDelete('/foto');
    }

    buscaConfiguracao(): Observable<ConfiguracaoFlickr> {
        return this.doGet('/foto/configuracao');
    }

    iniciaConfiguracao(token: string, verifier: string): Observable<void> {
        return this.doPut('/foto/configuracao', {
            token: token,
            verifier: verifier
        });
    }
}