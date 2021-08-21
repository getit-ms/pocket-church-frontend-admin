import {Inject, Injectable, Optional} from '@angular/core';
import {Membro} from '../model/membro';
import {AbstractApiService} from './api-service.abstract';
import {Observable} from 'rxjs';
import {API_PATH_BASE} from '../base-path';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '@gafs/infra-autorizacao';
import {IgrejasUsuarioService} from '../../infra/contexto/igrejas-usuario.service';
import {DispositivoService} from '../../infra/dispositivo/dispositivo.service';
import {BuscaPaginada} from '../model/busca-paginada';
import {AcessoAdmin} from '../model/acesso-admin';

@Injectable()
export class MembroService extends AbstractApiService {

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

  consulta(nome?: string, email?: string, perfil?: Array<number>,
           pagina?: number, total?: number, pendentes?: boolean): Observable<BuscaPaginada<Membro>> {
    return this.doGet('/membro', {
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

  detalha(id: number): Observable<Membro> {
    return this.doGet(`/membro/${id}`);
  }

  remove(id: number): Observable<Membro> {
    return this.doDelete(`/membro/${id}`);
  }

  cadastra(entidade: Membro): Observable<Membro> {
    return this.doPost('/membro', entidade);
  }

  atualiza(entidade: Membro): Observable<Membro> {
    return this.doPut('/membro', entidade);
  }

  aprovaCadastroContato(entidade: Membro): Observable<Membro> {
    return this.doPut(`/membro/${entidade.id}/cadastro/contato`, undefined);
  }

  aprovaCadastroMembro(entidade: Membro): Observable<Membro> {
    return this.doPut(`/membro/${entidade.id}/cadastro`, undefined);
  }

  rejeitaCadastroMembro(entidade: Membro): Observable<Membro> {
    return this.doDelete(`/membro/${entidade.id}/cadastro`);
  }

  habilitarMembro(id: number): Observable<void> {
    return this.doPut(`/membro/${id}/membro`);
  }

  desabilitarMembro(id: number): Observable<void> {
    return this.doDelete(`/membro/${id}/membro`);
  }

  redefineSenha(id: number): Observable<void> {
    return this.doPut(`/membro/${id}/redefine-senha`);
  }

  desabilitarAdmin(id: number): Observable<void> {
    return this.doDelete(`/membro/${id}/acesso`);
  }

  salvaAdmin(id: number, acesso: AcessoAdmin): Observable<AcessoAdmin> {
    return this.doPut(`/membro/${id}/acesso`, acesso);
  }

  buscaAdmin(id: number): Observable<AcessoAdmin> {
    return this.doGet(`/membro/${id}/acesso`);
  }

  exportar() {
    const dispositivo = this.dispositivoService.uuid;
    const igreja = this.igrejasUsuarioService.atual.igreja.chave;
    const token = this.tokenService.token;

    const dialog = window.open(`${this.pathBase}/membro/exportar.xls?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`);

    dialog.onload = () => dialog.close();
  }
}
