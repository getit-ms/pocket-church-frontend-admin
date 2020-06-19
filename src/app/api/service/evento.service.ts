import {Inject, Injectable, Optional} from '@angular/core';
import {API_PATH_BASE} from "../base-path";
import {HttpClient} from "@angular/common/http";
import {DispositivoService} from "../../infra/dispositivo/dispositivo.service";
import {Observable} from "rxjs/index";
import {AbstractApiService} from "./api-service.abstract";
import {IgrejasUsuarioService} from "../../infra/contexto/igrejas-usuario.service";
import {TokenService} from "@gafs/infra-autorizacao";
import {BuscaPaginada} from "../model/busca-paginada";
import {Evento} from "../model/evento";
import {InscricaoEvento} from "../model/inscricao-evento";

@Injectable()
export class EventoService extends AbstractApiService {

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

    consulta(tipo: 'EVENTO' | 'EBD' | 'CULTO' = 'EVENTO', pagina?: number, total?: number): Observable<BuscaPaginada<Evento>> {
        return this.doGet('/evento', {
            params: {
                tipo: [tipo],
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    remove(id: number): Observable<Evento> {
        return this.doDelete(`/evento/${id}`);
    }

    detalha(id: number): Observable<Evento> {
        return this.doGet(`/evento/${id}`);
    }

    inscricoesEvento(id: number, pagina?: number, total?: number): Observable<BuscaPaginada<Evento>> {
        return this.doGet(`/evento/${id}/inscricoes`, {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    exportarInscricoesEvento(id: number, filename: string, tipo: string = 'pdf') {
        const dispositivo = this.dispositivoService.uuid;
        const igreja = this.igrejasUsuarioService.atual.igreja.chave;
        const token = this.tokenService.token;

        const dialog = window.open(`${this.pathBase}/evento/${id}/inscricoes/${filename}.${tipo}?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`);

        dialog.onload = () => dialog.close();
    }

    exportarInscricoes(tipo: 'EVENTO' | 'EBD' | 'CULTO') {
        const dispositivo = this.dispositivoService.uuid;
        const igreja = this.igrejasUsuarioService.atual.igreja.chave;
        const token = this.tokenService.token;

        const dialog = window.open(`${this.pathBase}/evento/inscricoes/${tipo}.xls?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`);

        dialog.onload = () => dialog.close();
    }

    cadastra(entidade: Evento): Observable<Evento> {
        return this.doPost('/evento', entidade);
    }

    atualiza(entidade: Evento): Observable<Evento> {
        return this.doPut('/evento', entidade);
    }

    realizarInscricao(id: number, inscricoes: Array<InscricaoEvento>): Observable<Evento> {
        return this.doPost(`/evento/${id}/inscricao`, inscricoes);
    }

    confirmaInscricao(id: number, inscricao: number): Observable<void> {
        return this.doPut(`/evento/${id}/confirmar/${inscricao}`);
    }

    cancelaInscricao(id: number, inscricao: number): Observable<void> {
        return this.doDelete(`/evento/${id}/cancelar/${inscricao}`);
    }
}

