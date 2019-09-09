import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {EmpresasUsuarioService} from './empresas-usuario.service';
import {SessaoService, TokenService} from '@gafs/infra-autorizacao';
import {EmpresaService} from '../../api/service/empresa.service';
import {AcessoService} from '../../api/service/acesso.service';
import {AcaoService} from '@gafs/infra-core';

@Injectable()
export class PrepareContextService implements CanActivate {

  constructor(
    private acaoService: AcaoService,
    private acessoService: AcessoService,
    private tokenService: TokenService,
    private sessaoService: SessaoService,
    private empresaService: EmpresaService,
    private empresasUsuarioService: EmpresasUsuarioService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(observer => {
      this.acaoService.executa(() => {
        this.tokenService.data.subscribe(token => {
          if (token) {
            const chave = token.roles.find(role => role.startsWith('empresa=')).split('=')[1];
            const strToken = this.tokenService.token;

            this.acaoService.executa(() => {
              this.sessaoService.principal.subscribe(async acesso => {
                if (acesso) {
                  const colaborador = acesso.colaborador;
                  if (!this.empresasUsuarioService.atual || this.empresasUsuarioService.atual.empresa.chave !== chave) {
                    if (!this.empresasUsuarioService.contextos || !this.empresasUsuarioService.contextos.find(ctx => ctx.empresa.chave === chave)) {
                      this.acaoService.executa(() => {
                        this.acessoService.iniciaLogin(colaborador.email).subscribe(async empresas => {
                          await this.empresasUsuarioService.init(colaborador.email, empresas, false);
                          await this.empresasUsuarioService.select({chave: chave}, false);
                          this.empresasUsuarioService.login(strToken, acesso, false);
                          observer.next(true);
                        }, err => this.handleError(observer, err));
                      });
                    } else {
                      await this.empresasUsuarioService.select({chave: chave}, false);
                      this.empresasUsuarioService.login(strToken, acesso, false);
                      observer.next(true);
                    }
                  } else {
                    observer.next(true);
                  }
                } else {
                  this.handleError(observer, 'Não autenticado');
                }
              }, err => this.handleError(observer, err));
            });
          } else {
            this.handleError(observer, 'Não autenticado');
          }
        }, err => this.handleError(observer, err));
      });
    });
  }

  private handleError(observer: Observer<any>, err: any) {
    observer.error(err);
    this.sessaoService.logout();
  }
}
