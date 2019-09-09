import {Inject, Injectable, Optional} from '@angular/core';
import {Colaborador} from '../model/colaborador';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {API_PATH_BASE} from '../base-path';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '@gafs/infra-autorizacao';
import {EmpresasUsuarioService} from '../../infra/contexto/empresas-usuario.service';
import {DispositivoService} from '../../infra/dispositivo/dispositivo.service';
import {BuscaPaginada} from '../model/busca-paginada';
import {AcessoAdmin} from '../model/acesso-admin';
import {CategoriaDocumento} from "../model/categoria-documento";
import {LotacaoColaborador} from "../model/lotacao-colaborador";

@Injectable()
export class ColaboradorService extends AbstractApiService {

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

    consulta(nome?: string, email?: string, perfil?: Array<number>,
             pagina?: number, total?: number, pendentes?: boolean): Observable<BuscaPaginada<Colaborador>> {
        return this.doGet('/colaborador', {
            params: {
                nome: nome ? [nome] : [],
                email: email ? [email] : [],
                perfil: perfil ? <string[]> perfil.map(p => `${p}`) : [],
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : [],
                pendentes: pendentes ? [`${pendentes}`] : []
            }
        });
    }

    detalha(id: number): Observable<Colaborador> {
        return this.doGet(`/colaborador/${id}`);
    }

    remove(id: number): Observable<Colaborador> {
        return this.doDelete(`/colaborador/${id}`);
    }

    cadastra(entidade: Colaborador): Observable<Colaborador> {
        return this.doPost('/colaborador', entidade);
    }

    atualiza(entidade: Colaborador): Observable<Colaborador> {
        return this.doPut('/colaborador', entidade);
    }

    aprovaCadastroContato(entidade: Colaborador): Observable<Colaborador> {
        return this.doPut(`/colaborador/${entidade.id}/cadastro/contato`, undefined);
    }

    aprovaCadastroColaborador(entidade: Colaborador): Observable<Colaborador> {
        return this.doPut(`/colaborador/${entidade.id}/cadastro`, undefined);
    }

    rejeitaCadastroColaborador(entidade: Colaborador): Observable<Colaborador> {
        return this.doDelete(`/colaborador/${entidade.id}/cadastro`);
    }

    habilitarColaborador(id: number): Observable<void> {
        return this.doPut(`/colaborador/${id}/colaborador`);
    }

    desabilitarColaborador(id: number): Observable<void> {
        return this.doDelete(`/colaborador/${id}/colaborador`);
    }

    redefineSenha(id: number): Observable<void> {
        return this.doPut(`/colaborador/${id}/redefine-senha`);
    }

    desabilitarAdmin(id: number): Observable<void> {
        return this.doDelete(`/colaborador/${id}/acesso`);
    }

    salvaAdmin(id: number, acesso: AcessoAdmin): Observable<AcessoAdmin> {
        return this.doPut(`/colaborador/${id}/acesso`, acesso);
    }

    buscaAdmin(id: number): Observable<AcessoAdmin> {
        return this.doGet(`/colaborador/${id}/acesso`);
    }

    buscaLotacoes(): Observable<Array<LotacaoColaborador>> {
        return this.doGet(`/colaborador/lotacao`);
    }

    cadastraLotacao(categoria: LotacaoColaborador): Observable<LotacaoColaborador> {
        return this.doPost(`/colaborador/lotacao`, categoria);
    }

    exportar() {
        const dispositivo = this.dispositivoService.uuid;
        const empresa = this.empresasUsuarioService.atual.empresa.chave;
        const token = this.tokenService.token;

        const dialog = window.open(`${this.pathBase}/colaborador/exportar.xls?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`);

        dialog.onload = () => dialog.close();
    }
}
