import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";
import {PlanoLeitura} from "../model/plano-leitura";

declare var moment: any;

@Injectable()
export class PlanoLeituraService extends AbstractApiService {

    consulta(dataInicio?: Date, dataTermino?: Date, descricao?: string, pagina?: number, total?: number): Observable<BuscaPaginada<PlanoLeitura>> {
        return this.doGet('/planoLeitura', {
            params: {
                dataInicio: dataInicio ? [<string>moment(dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                dataTermino: dataTermino ? [<string>moment(dataTermino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                descricao: descricao ? [descricao] : [],
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    detalha(id: number): Observable<PlanoLeitura> {
        return this.doGet(`/planoLeitura/${id}`);
    }

    remove(id: number): Observable<void> {
        return this.doDelete(`/planoLeitura/${id}`);
    }

    cadastra(entidade: PlanoLeitura): Observable<PlanoLeitura> {
        return this.doPost('/planoLeitura', entidade);
    }

    atualiza(entidade: PlanoLeitura): Observable<PlanoLeitura> {
        return this.doPut('/planoLeitura', entidade);
    }

}
