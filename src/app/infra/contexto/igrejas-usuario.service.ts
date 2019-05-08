import {Injectable} from '@angular/core';
import {ResumoIgreja} from '../../api/model/resumo-igreja';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {DispositivoService} from '../dispositivo/dispositivo.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subject} from 'rxjs';
import {IgrejasTranslateLoaderService} from './igrejas-translate-loader.service';
import {take} from 'rxjs/internal/operators';
import {NotificacoesService} from "../../template/notificacoes/notificacoes.service";

export class ContextoIgreja {
  igreja: ResumoIgreja;
  token?: string;
  principal?: any;
}

@Injectable()
export class IgrejasUsuarioService {

  private _username: string;
  private _atual: ContextoIgreja;
  private _contextos: ContextoIgreja[];

  private _atualSubject = new Subject<ContextoIgreja>();

  constructor(
    private title: Title,
    private router: Router,
    private notificacoesService: NotificacoesService,
    private igrejasTranslateLoaderService: IgrejasTranslateLoaderService,
    private translateService: TranslateService,
    private sessaoService: SessaoService,
    private dispositivoService: DispositivoService
  ) { }

  onAtualChange(): Observable<ContextoIgreja> {
    return this._atualSubject;
  }

  get username() {
    return this._username;
  }

  get atual() {
    return this._atual;
  }

  get contextos() {
    return this._contextos;
  }

  login(token: string, principal: any, navigate = true) {
    this._atual.token = token;
    this._atual.principal = principal;
    this.notificacoesService.load();
    this.sessaoService.login({
      token: token,
      principal: principal
    }).subscribe(() => {
      if (navigate) {
        this.router.navigate(['']);
      }
    });
  }

  async select(igreja: ResumoIgreja, navigate = true) {
    this._atual = this._contextos.find(ctx => ctx.igreja.chave === igreja.chave);

    this.applyMetadata(this._atual.igreja);

    await this.aplicaBundleIgreja();

    this._atualSubject.next(this._atual);

    if (this._atual.token) {
      this.login(this._atual.token, this._atual.principal, navigate);
      if (navigate) {
        this.router.navigate(['']);
      }
    } else {
      this.sessaoService.logout();
      if (navigate) {
        this.router.navigate(['acesso', 'password']);
      }
    }
  }

  async init(username: string, contextos: ResumoIgreja[], navigate = true) {
    this._username = username;
    this._atual = undefined;
    this._contextos = contextos.map(i => ({igreja: i}));

    if (this._contextos.length === 1) {
      await this.select(this._contextos[0].igreja, navigate);
    } else {
      if (navigate) {
        this.router.navigate(['acesso', 'churches']);
      }
    }
  }

  logout() {
    this.sessaoService.logout();

    this._contextos = undefined;
    this._atual = undefined;
    this._username = undefined;
    this.applyMetadata(undefined);

    this.router.navigate(['acesso', 'login']);
  }

  private async aplicaBundleIgreja() {
    if (this._atual) {
      this.igrejasTranslateLoaderService.igreja = this._atual.igreja.chave;
    } else {
      this.igrejasTranslateLoaderService.igreja = this._atual.igreja.chave;
    }

    await this.translateService.reloadLang(
      this.translateService.currentLang || this.translateService.defaultLang
    ).pipe(take(1)).toPromise();
  }

  private applyMetadata(igreja: ResumoIgreja) {
    if (igreja) {
      this.title.setTitle(igreja.nomeAplicativo);
    } else {
      this.title.setTitle('Pocket Church');
    }

    document.getElementById('favicon').remove();

    if (igreja && igreja.logoPequena) {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('id', 'favicon');
      linkElement.setAttribute('rel', 'icon');
      linkElement.setAttribute('type', 'image/png');
      linkElement.setAttribute('href', `${environment.basePath}/arquivo/download/${this._atual.igreja.logoPequena.id}?` +
        `Igreja=${this._atual.igreja.chave}&` +
        `Dispositivo=${this.dispositivoService.uuid}`);
      document.head.appendChild(linkElement);
    } else {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('id', 'favicon');
      linkElement.setAttribute('rel', 'icon');
      linkElement.setAttribute('type', 'image/x-icon');
      linkElement.setAttribute('href', 'favicon.ico');
      document.head.appendChild(linkElement);
    }
  }
}
