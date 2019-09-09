import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";
import {ContatoColaborador} from "../model/contato-colaborador";

declare var moment: any;

@Injectable()
export class ContatoColaboradorService extends AbstractApiService {

    consulta(dataInicio?: Date, dataTermino?: Date, status?: Array<'PENDENTE' | 'ATENDIDO'>, pagina?: number, total?: number): Observable<BuscaPaginada<ContatoColaborador>> {
        return this.doGet('/contato-colaborador', {
            params: {
                dataInicio: dataInicio ? [<string>moment(dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                dataTermino: dataTermino ? [<string>moment(dataTermino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                status: status ? status : [],
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    atende(id: number): Observable<ContatoColaborador> {
        return this.doPut(`/contato-colaborador/atende/${id}`);
    }

}

