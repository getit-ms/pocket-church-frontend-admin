import { Injectable } from '@angular/core';
import {Chamado} from "../model/chamado";
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";

@Injectable()
export class ChamadoService extends AbstractApiService {

    consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Chamado>> {
        return this.doGet('/chamado', {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    detalha(id: number): Observable<Chamado> {
        return this.doGet(`/chamado/${id}`);
    }

    cadastra(entidade: Chamado): Observable<Chamado> {
        return this.doPost('/chamado', entidade);
    }

}
