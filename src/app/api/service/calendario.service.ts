import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginadaEventos} from "../model/busca-paginada-eventos";
import {CalendarioGoogle} from "../model/calendario-google";
import {ConfiguracaoCalendario} from "../model/configuracao-calendario";

@Injectable()
export class CalendarioService extends AbstractApiService {

    buscaEventos(pagina?: number, total?: number): Observable<BuscaPaginadaEventos> {
        return this.doGet('/calendario', {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    buscaVisoes(): Observable<Array<CalendarioGoogle>> {
        return this.doGet('/calendario/visoes');
    }

    buscaURL(): Observable<{url: string}> {
        return this.doGet('/calendario/url');
    }

    desativa(): Observable<string> {
        return this.doDelete('/calendario');
    }

    buscaConfiguracao(): Observable<ConfiguracaoCalendario> {
        return this.doGet('/calendario/configuracao');
    }

    salvaConfiguracao(configuracao: ConfiguracaoCalendario): Observable<void> {
        return this.doPut('/calendario', configuracao);
    }

    iniciaConfiguracao(code: string): Observable<void> {
        return this.doPut('/calendario/configuracao', {
            code: code
        });
    }
}

