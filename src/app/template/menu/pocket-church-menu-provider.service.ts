import { Injectable } from '@angular/core';
import {MenuItem, MenuProvider} from '@gafs/infra-template';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {SessaoService} from '@gafs/infra-autorizacao';

@Injectable()
export class PocketChurchMenuProviderService implements MenuProvider {

  constructor(
    private sessaoService: SessaoService,
    private translateService: TranslateService
  ) { }

  private todasFuncionalidades: any[] = [
    'MANTER_DADOS_INSTITUCIONAIS',
    'GERENCIAR_FUNCIONALIDADES_APLICATIVO',
    'MANTER_MINISTERIOS',
    'MANTER_PERFIS',
    'MANTER_MEMBROS',
    'GERENCIAR_ACESSO_MEMBROS',
    'MANTER_AUDIOS',
    'MANTER_BOLETINS',
    'MANTER_NOTICIAS',
    'MANTER_PUBLICACOES',
    'MANTER_CIFRAS',
    'MANTER_CANTICOS',
    'MANTEM_DEVOCIONARIO',
    'MANTER_ESTUDOS',
    'ENVIAR_NOTIFICACOES',
    'MANTER_VERSICULOS_DIARIOS',
    'MANTER_PLANOS_LEITURA_BIBLICA',
    'MANTER_TERMO_ACEITE',
    'MANTER_VOTACOES',
    'CONSULTAR_PEDIDOS_ORACAO',
    'MANTER_AGENDA',
    'MANTER_EVENTOS',
    'MANTER_EBD',
    'MANTER_INSCRICAO_CULTO',
    'CONFIGURAR_FLICKR',
    'CONFIGURAR_VIDEOS_FACEBOOK',
    'CONFIGURAR_YOUTUBE',
    'CONFIGURAR_GOOGLE_CALENDAR',
    'CONFIGURAR',
    'ABERTURA_CHAMADO_SUPORTE',
    'MANTER_BANNERS'
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
