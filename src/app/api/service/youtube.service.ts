import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {Video} from "../model/video";
import {AbstractApiService} from "./api-service.abstract";
import {ConfiguracaoYoutube} from "../model/configuracao-youtube";

@Injectable()
export class YoutubeService extends AbstractApiService {

    buscaVideos(): Observable<Array<Video>> {
        return this.doGet('/youtube');
    }

    buscaURL(): Observable<{url: string}> {
        return this.doGet('/youtube/url');
    }

    desativa(): Observable<string> {
        return this.doDelete('/youtube');
    }

    buscaConfiguracao(): Observable<ConfiguracaoYoutube> {
        return this.doGet('/youtube/configuracao');
    }

    salvaConfiguracao(configuracao: ConfiguracaoYoutube): Observable<ConfiguracaoYoutube> {
        return this.doPut('/youtube');
    }

    iniciaConfiguracao(code: string): Observable<void> {
        return this.doPut('/youtube/configuracao', {
            code: code
        });
    }
}
