import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {IgrejasUsuarioService} from './igrejas-usuario.service';
import {SessaoService, TokenService} from '@gafs/infra-autorizacao';
import {IgrejaService} from '../../api/service/igreja.service';
import {AcessoService} from '../../api/service/acesso.service';
import {AcaoService} from '@gafs/infra-core';

@Injectable()
export class PrepareContextService implements CanActivate {

  constructor(
    private acaoService: AcaoService,
    private acessoService: AcessoService,
    private tokenService: TokenService,
    private sessaoService: SessaoService,
    private igrejaService: IgrejaService,
    private igrejasUsuarioService: IgrejasUsuarioService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(observer => {
      this.acaoService.executa(() => {
        this.tokenService.data.subscribe(token => {
          if (token) {
            const chave = token.roles.find(role => role.startsWith('igreja=')).split('=')[1];
            const strToken = this.tokenService.token;

            this.acaoService.executa(() => {
              this.sessaoService.principal.subscribe(async acesso => {
                if (acesso) {
                  const membro = acesso.membro;
                  if (!this.igrejasUsuarioService.atual || this.igrejasUsuarioService.atual.igreja.chave !== chave) {
                    if (!this.igrejasUsuarioService.contextos || !this.igrejasUsuarioService.contextos.find(ctx => ctx.igreja.chave === chave)) {
                      this.acaoService.executa(() => {
                        this.acessoService.iniciaLogin(membro.email).subscribe(async igrejas => {
                          await this.igrejasUsuarioService.init(membro.email, igrejas, false);
                          await this.igrejasUsuarioService.select({chave: chave}, false);
                          this.igrejasUsuarioService.login(strToken, acesso, false);
                          observer.next(true);
                        }, err => this.handleError(observer, err));
                      });
                    } else {
                      await this.igrejasUsuarioService.select({chave: chave}, false);
                      this.igrejasUsuarioService.login(strToken, acesso, false);
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
