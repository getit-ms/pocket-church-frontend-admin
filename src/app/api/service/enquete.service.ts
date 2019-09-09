import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {BuscaPaginada} from "../model/busca-paginada";
import {Enquete} from "../model/enquete";
import {API_PATH_BASE} from "../base-path";
import {HttpClient} from "@angular/common/http";
import {DispositivoService} from "../../infra/dispositivo/dispositivo.service";
import {EmpresasUsuarioService} from "../../infra/contexto/empresas-usuario.service";
import {TokenService} from "@gafs/infra-autorizacao";

@Injectable()
export class EnqueteService extends AbstractApiService {

    constructor(
        private tokenService: TokenService,
        private dispositivoService: DispositivoService,
        private empresasUsuarioService: EmpresasUsuarioService,
        @Inject(API_PATH_BASE)
        @Optional()
            pathBase: string = 'http://localhost',
        httpClient: HttpClient
    ) {
        super(pathBase, httpClient);
    }

    consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Enquete>> {
        return this.doGet('/enquete', {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    remove(id: number): Observable<Enquete> {
        return this.doDelete(`/enquete/${id}`);
    }

    detalha(id: number): Observable<Enquete> {
        return this.doGet(`/enquete/${id}`);
    }

    resultado(id: number): Observable<Enquete> {
        return this.doGet(`/enquete/${id}/resultado`);
    }

    exportarResultado(id: number, filename: string, tipo: string = 'pdf') {
        const dispositivo = this.dispositivoService.uuid;
        const empresa = this.empresasUsuarioService.atual.empresa.chave;
        const token = this.tokenService.token;

        const dialog = window.open(`${this.pathBase}/enquete/${id}/resultado/${filename}.${tipo}?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`);

        dialog.onload = () => dialog.close();
    }

    cadastra(entidade: Enquete): Observable<Enquete> {
        return this.doPost('/enquete', entidade);
    }

    atualiza(entidade: Enquete): Observable<Enquete> {
        return this.doPut('/enquete', entidade);
    }

}
