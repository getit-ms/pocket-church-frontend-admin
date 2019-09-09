import { Injectable } from '@angular/core';
import {MenuItem, MenuProvider} from '@gafs/infra-template';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {SessaoService} from '@gafs/infra-autorizacao';

@Injectable()
export class PocketCorporateMenuProviderService implements MenuProvider {

  constructor(
    private sessaoService: SessaoService,
    private translateService: TranslateService
  ) { }

  private todasFuncionalidades: any[] = [
      'MANTER_DADOS_INSTITUCIONAIS',
      'GERENCIAR_FUNCIONALIDADES_APLICATIVO',
      'MANTER_PERFIS',
      'MANTER_COLABORADORES',
      'GERENCIAR_ACESSO_COLABORADORES',
      'MANTER_AUDIOS',
      'MANTER_NOTICIAS',
      'MANTER_CLASSIFICADOS',
      'MANTER_BOLETINS',
      'MANTER_PUBLICACOES',
      'MANTER_DOCUMENTOS',
      'MANTER_ENQUETES',
      'CONSULTAR_CONTATOS_COLABORADORES',
      'MANTER_AGENDA',
      'MANTER_EVENTOS',
      'ENVIAR_NOTIFICACOES',
      'MANTER_MENSAGENS_DIA',
      'CONFIGURAR',
      'CONFIGURAR_FLICKR',
      'CONFIGURAR_YOUTUBE',
      'CONFIGURAR_GOOGLE_CALENDAR',
      'ABERTURA_CHAMADO_SUPORTE'
  ];

  menus(): Observable<Array<MenuItem>> {
    return Observable.create(observer => {
      this.sessaoService.principal.subscribe(acesso => {
        observer.next(this.todasFuncionalidades
          .map(fnc => this.mapMenu(acesso, fnc))
          .filter(mnu => mnu && (mnu.routerLink || (mnu.children && mnu.children.length)))
        );
      });
    });
  }

  private mapMenu(acesso: any, fnc: string | MenuItem): MenuItem {
    if (typeof fnc === 'string') {
      if (acesso.funcionalidades.indexOf(fnc) >= 0) {
        return {
          label: this.translateService.instant('global.menu.' + fnc + '.label'),
          iconeSet: 'fa',
          icone: 'fa-' + this.translateService.instant('global.menu.' + fnc + '.icon'),
          routerLink: '/' + this.translateService.instant('global.menu.' + fnc + '.state'),
        };
      }
    } else {
      return {
        ...fnc,
        children: fnc.children ? fnc.children
          .map(ch => this.mapMenu(acesso, ch))
          .filter(ch => !!ch)
          .sort((c1, c2) => c1.label.localeCompare(c2.label)) : undefined
      };
    }
  }
}
