import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";
import {Votacao} from "../model/votacao";
import {API_PATH_BASE} from "../base-path";
import {HttpClient} from "@angular/common/http";
import {DispositivoService} from "../../infra/dispositivo/dispositivo.service";
import {IgrejasUsuarioService} from "../../infra/contexto/igrejas-usuario.service";
import {TokenService} from "@gafs/infra-autorizacao";

@Injectable()
export class VotacaoService extends AbstractApiService {

    constructor(
        private tokenService: TokenService,
        private dispositivoService: DispositivoService,
        private igrejasUsuarioService: IgrejasUsuarioService,
        @Inject(API_PATH_BASE)
        @Optional()
            pathBase: string = 'http://localhost',
        httpClient: HttpClient
    ) {
        super(pathBase, httpClient);
    }

    consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Votacao>> {
        return this.doGet('/votacao', {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    remove(id: number): Observable<Votacao> {
        return this.doDelete(`/votacao/${id}`);
    }

    detalha(id: number): Observable<Votacao> {
        return this.doGet(`/votacao/${id}`);
    }

    resultado(id: number): Observable<Votacao> {
        return this.doGet(`/votacao/${id}/resultado`);
    }

    exportarResultado(id: number, filename: string, tipo: string = 'pdf') {
        const dispositivo = this.dispositivoService.uuid;
        const igreja = this.igrejasUsuarioService.atual.igreja.chave;
        const token = this.tokenService.token;

        const dialog = window.open(`${this.pathBase}/votacao/${id}/resultado/${filename}.${tipo}?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`);

        dialog.onload = () => dialog.close();
    }

    cadastra(entidade: Votacao): Observable<Votacao> {
        return this.doPost('/votacao', entidade);
    }

    atualiza(entidade: Votacao): Observable<Votacao> {
        return this.doPut('/votacao', entidade);
    }

}
