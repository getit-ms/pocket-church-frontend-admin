import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {ConfiguracaoEmpresa} from "../model/configuracao-empresa";

@Injectable()
export class ConfiguracaoService extends AbstractApiService {

    busca(): Observable<ConfiguracaoEmpresa> {
        return this.doGet('/configuracao');
    }

    atualiza(entidade: ConfiguracaoEmpresa): Observable<ConfiguracaoEmpresa> {
        return this.doPut('/configuracao', entidade);
    }
}

