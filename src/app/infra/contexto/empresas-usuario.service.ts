import {Injectable} from '@angular/core';
import {ResumoEmpresa} from '../../api/model/resumo-empresa';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {DispositivoService} from '../dispositivo/dispositivo.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subject} from 'rxjs';
import {EmpresasTranslateLoaderService} from './empresas-translate-loader.service';
import {take} from 'rxjs/internal/operators';
import {NotificacoesService} from "../../template/notificacoes/notificacoes.service";

export class ContextoEmpresa {
    empresa: ResumoEmpresa;
    token?: string;
    principal?: any;
}

@Injectable()
export class EmpresasUsuarioService {

    private _username: string;
    private _atual: ContextoEmpresa;
    private _contextos: ContextoEmpresa[];

    private _atualSubject = new Subject<ContextoEmpresa>();

    constructor(
        private title: Title,
        private router: Router,
        private notificacoesService: NotificacoesService,
        private empresasTranslateLoaderService: EmpresasTranslateLoaderService,
        private translateService: TranslateService,
        private sessaoService: SessaoService,
        private dispositivoService: DispositivoService
    ) { }

    onAtualChange(): Observable<ContextoEmpresa> {
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
        this.sessaoService.login({
            token: token,
            principal: principal
        }).subscribe(() => {
            this.notificacoesService.load();

            if (navigate) {
                this.router.navigate(['']);
            }
        });
    }

    async select(empresa: ResumoEmpresa, navigate = true) {
        this._atual = this._contextos.find(ctx => ctx.empresa.chave === empresa.chave);

        await this.applyMetadata(this._atual.empresa);

        this._atualSubject.next(this._atual);

        if (this._atual.token) {
            this.login(this._atual.token, this._atual.principal, navigate);

            if (navigate) {
                this.router.navigate(['']);
            }

            return true;
        } else {
            this.sessaoService.logout();

            if (navigate) {
                this.router.navigate(['acesso', 'password']);
            }

            return false;
        }
    }

    async init(username: string, contextos: ResumoEmpresa[], navigate = true) {
        this._username = username;
        this._atual = undefined;
        this._contextos = contextos.map(i => ({empresa: i}));

        if (this._contextos.length === 1) {
            await this.select(this._contextos[0].empresa, navigate);
        } else {
            if (navigate) {
                this.router.navigate(['acesso', 'empresas']);
            }
        }
    }

    async logout() {
        this.sessaoService.logout();

        this._contextos = undefined;
        this._atual = undefined;
        this._username = undefined;

        await this.applyMetadata(undefined);

        this.router.navigate(['acesso', 'login']);
    }

    private async aplicaBundleEmpresa() {
        if (this._atual) {
            this.empresasTranslateLoaderService.empresa = this._atual.empresa.chave;
        } else {
            this.empresasTranslateLoaderService.empresa = undefined;
        }

        await this.translateService.reloadLang(
            this.translateService.currentLang || this.translateService.defaultLang
        ).pipe(take(1)).toPromise();
    }

    public async applyMetadata(empresa: ResumoEmpresa) {
        if (empresa) {
            this.title.setTitle(empresa.nomeAplicativo);
        } else {
            this.title.setTitle('Pocket Corporate');
        }

        document.getElementById('favicon').remove();

        if (empresa && empresa.logoPequena) {
            const linkElement = document.createElement('link');
            linkElement.setAttribute('id', 'favicon');
            linkElement.setAttribute('rel', 'icon');
            linkElement.setAttribute('type', 'image/png');
            linkElement.setAttribute('href', `${environment.basePath}/arquivo/download/${this._atual.empresa.logoPequena.id}?` +
                `Empresa=${this._atual.empresa.chave}&` +
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

        await this.aplicaBundleEmpresa();
    }
}
