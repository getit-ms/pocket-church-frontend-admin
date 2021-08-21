import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {ConfiguracaoIgreja} from "../model/configuracao-igreja";

@Injectable()
export class ConfiguracaoService extends AbstractApiService {

    busca(): Observable<ConfiguracaoIgreja> {
        return this.doGet('/configuracao');
    }

    atualiza(entidade: ConfiguracaoIgreja): Observable<ConfiguracaoIgreja> {
        return this.doPut('/configuracao', entidade);
    }
}

