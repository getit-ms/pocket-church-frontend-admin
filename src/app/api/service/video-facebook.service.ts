import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {Video} from "../model/video";
import {ConfiguracaoFacebook} from "../model/configuracao-facebook";
import {PaginaFacebook} from "../model/pagina-facebook";

@Injectable()
export class VideoFacebookService extends AbstractApiService {

    buscaVideos(): Observable<Array<Video>> {
        return this.doGet('/facebook/video');
    }

    buscaURL(): Observable<{url: string}> {
        return this.doGet('/facebook/video/url');
    }

    desativa(): Observable<string> {
        return this.doDelete('/facebook/video');
    }

    buscaConfiguracao(): Observable<ConfiguracaoFacebook> {
        return this.doGet('/facebook/video/configuracao');
    }

    buscaPaginas(): Observable<Array<PaginaFacebook>> {
        return this.doGet('/facebook/video/paginas');
    }

    salvaConfiguracao(configuracao: ConfiguracaoFacebook): Observable<ConfiguracaoFacebook> {
        return this.doPut('/facebook/video');
    }

    iniciaConfiguracao(code: string): Observable<void> {
        return this.doPut('/facebook/video/configuracao', {
            code: code
        });
    }
}
