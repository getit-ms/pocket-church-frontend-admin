import {Injectable} from '@angular/core';
import {Cifra} from "../model/cifra";
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";
import {PedidoOracao} from "../model/pedido-oracao";

declare var moment: any;

@Injectable()
export class PedidoOracaoService extends AbstractApiService {

    consulta(dataInicio?: Date, dataTermino?: Date, status?: Array<'PENDENTE' | 'ATENDIDO'>, pagina?: number, total?: number): Observable<BuscaPaginada<Cifra>> {
        return this.doGet('/oracao', {
            params: {
                dataInicio: dataInicio ? [<string>moment(dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                dataTermino: dataTermino ? [<string>moment(dataTermino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                status: status ? status : [],
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    atende(id: number): Observable<PedidoOracao> {
        return this.doPut(`/oracao/atende/${id}`);
    }

}

