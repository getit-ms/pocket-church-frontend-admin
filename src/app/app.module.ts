import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {AcaoService, InfraCoreModule} from '@gafs/infra-core';
import {InfraDataModule} from '@gafs/infra-data';
import {BaseComponent, InfraTemplateModule} from '@gafs/infra-template';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {ApiModule} from './api/api.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {API_PATH_BASE} from './api/base-path';
import {permissoes} from './permissoes';
import {CheckAutorizacaoService, InfraAutorizacaoModule} from '@gafs/infra-autorizacao';
import {InfraModule} from './infra/infra.module';
import {ComponentesModule} from './componentes/componentes.module';
import {HttpInterceptorService} from './infra/http/http-interceptor.service';
import {environment} from '../environments/environment';
import {MenuHeaderComponent} from './template/menu-header/menu-header.component';
import {HeaderRightSideComponent} from './template/header-right-side/header-right-side.component';
import {PocketChurchMenuProviderService} from './template/menu/pocket-church-menu-provider.service';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MatBadgeModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    NativeDateAdapter
} from '@angular/material';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import {WidgetUsuariosComponent} from './pages/home/widget-usuarios/widget-usuarios.component';
import {WidgetDispositivosComponent} from './pages/home/widget-dispositivos/widget-dispositivos.component';
import {WidgetHistoricoDispositivosComponent} from './pages/home/widget-historico-dispositivos/widget-historico-dispositivos.component';
import {WidgetHistoricoUsuariosComponent} from './pages/home/widget-historico-usuarios/widget-historico-usuarios.component';
import {RouterModule, Routes} from '@angular/router';
import {PrepareContextService} from './infra/contexto/prepare-context.service';
import {IgrejasTranslateLoaderService} from './infra/contexto/igrejas-translate-loader.service';
import {CalendarModule} from 'angular-calendar';
import {SchedulerModule} from 'angular-calendar-scheduler';
import {ModalAjudaComponent} from './template/ajuda/modal-ajuda/modal-ajuda.component';
import {NotificacoesComponent} from './template/notificacoes/notificacoes.component';
import {NotificacoesService} from "./template/notificacoes/notificacoes.service";
import {AjudaComponent} from './template/ajuda/ajuda.component';
import {RedirectComponent} from './pages/redirect/redirect.component';


registerLocaleData(localePt, 'pt-BR', localePtExtra);


const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        canActivate: [
            PrepareContextService
        ],
        canActivateChild: [
            CheckAutorizacaoService
        ],
        data: {
            menuProvider: PocketChurchMenuProviderService,
            enableMenuFilter: true
        },
        children: [
            {
                path: '',
                component: MenuHeaderComponent,
                outlet: 'menuHeader'
            },
            {
                path: '',
                component: HeaderRightSideComponent,
                outlet: 'headerRightSide'
            },
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: HomeComponent,
                        data: {
                            breadcrumb: 'home.inicio'
                        }
                    },
                    {
                        path: 'institucional',
                        loadChildren: './pages/institucional/institucional.module#InstitucionalModule'
                    },
                    {
                        path: 'aplicativo',
                        loadChildren: './pages/aplicativo/aplicativo.module#AplicativoModule'
                    },
                    {
                        path: 'ministerio',
                        loadChildren: './pages/ministerio/ministerio.module#MinisterioModule'
                    },
                    {
                        path: 'perfil',
                        loadChildren: './pages/perfil/perfil.module#PerfilModule'
                    },
                    {
                        path: 'contato',
                        loadChildren: './pages/contato/contato.module#ContatoModule'
                    },
                    {
                        path: 'membro',
                        loadChildren: './pages/membro/membro.module#MembroModule'
                    },
                    {
                        path: 'audio',
                        loadChildren: './pages/audio/audio.module#AudioModule'
                    },
                    {
                        path: 'noticia',
                        loadChildren: './pages/noticia/noticia.module#NoticiaModule'
                    },
                    {
                        path: 'boletim',
                        loadChildren: './pages/boletim/boletim.module#BoletimModule'
                    },
                    {
                        path: 'publicacao',
                        loadChildren: './pages/publicacao/publicacao.module#PublicacaoModule'
                    },
                    {
                        path: 'cifra',
                        loadChildren: './pages/cifra/cifra.module#CifraModule'
                    },
                    {
                        path: 'cantico',
                        loadChildren: './pages/cantico/cantico.module#CanticoModule'
                    },
                    {
                        path: 'estudo',
                        loadChildren: './pages/estudo/estudo.module#EstudoModule'
                    },
                    {
                        path: 'notificacao',
                        loadChildren: './pages/notificacao/notificacao.module#NotificacaoModule'
                    },
                    {
                        path: 'versiculo',
                        loadChildren: './pages/versiculo/versiculo.module#VersiculoModule'
                    },
                    {
                        path: 'planoLeitura',
                        loadChildren: './pages/plano-leitura/plano-leitura.module#PlanoLeituraModule'
                    },
                    {
                        path: 'votacao',
                        loadChildren: './pages/votacao/votacao.module#VotacaoModule'
                    },
                    {
                        path: 'oracao',
                        loadChildren: './pages/pedido-oracao/pedido-oracao.module#PedidoOracaoModule'
                    },
                    {
                        path: 'agenda',
                        loadChildren: './pages/aconselhamento/aconselhamento.module#AconselhamentoModule'
                    },
                    {
                        path: 'evento',
                        loadChildren: './pages/evento/evento.module#EventoModule'
                    },
                    {
                        path: 'culto',
                        loadChildren: './pages/culto/culto.module#CultoModule'
                    },
                    {
                        path: 'ebd',
                        loadChildren: './pages/ebd/ebd.module#EBDModule'
                    },
                    {
                        path: 'configuracao',
                        loadChildren: './pages/configuracao/configuracao.module#ConfiguracaoModule'
                    },
                    {
                        path: 'flickr',
                        loadChildren: './pages/flickr/flickr.module#FlickrModule'
                    },
                    {
                        path: 'facebook',
                        loadChildren: './pages/facebook/facebook.module#FacebookModule'
                    },
                    {
                        path: 'youtube',
                        loadChildren: './pages/youtube/youtube.module#YoutubeModule'
                    },
                    {
                        path: 'calendario',
                        loadChildren: './pages/calendario/calendario.module#CalendarioModule'
                    },
                    {
                        path: 'chamado',
                        loadChildren: './pages/chamado/chamado.module#ChamadoModule'
                    },
                    {
                        path: 'devocionario',
                        loadChildren: './pages/devocionario/devocionario.module#DevocionarioModule'
                    },
                    {
                        path: 'termo-aceite',
                        loadChildren: './pages/termo-aceite/termo-aceite.module#TermoAceiteModule'
                    },
                    {
                        path: 'banner',
                        loadChildren: './pages/banner/banner.module#BannerModule'
                    },
                ]
            },
        ]
    },
    {
        path: 'acesso',
        loadChildren: './pages/acesso/acesso.module#AcessoModule'
    },
    {
        path: 'senha',
        loadChildren: './pages/senha/senha.module#SenhaModule'
    },
    {
        path: 'redirect',
        component: RedirectComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuHeaderComponent,
        HeaderRightSideComponent,
        WidgetUsuariosComponent,
        WidgetDispositivosComponent,
        WidgetHistoricoDispositivosComponent,
        WidgetHistoricoUsuariosComponent,
        ModalAjudaComponent,
        NotificacoesComponent,
        AjudaComponent,
        RedirectComponent
    ],
    entryComponents: [ModalAjudaComponent],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),

        ApiModule,
        InfraModule,
        ComponentesModule,
        RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'}),

        MatIconModule,
        MatMenuModule,
        MatBadgeModule,
        MatCardModule,
        MatTooltipModule,
        NgxChartsModule,
        MatDialogModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useClass: NativeDateAdapter
        }),
        SchedulerModule.forRoot({ locale: 'pt-br', headerDateFormat: 'daysRange' }),

        InfraAutorizacaoModule.forRoot(
            {
                pathRedirecionamento: '#/acesso/login',
                localStorageKey: 'pocket-church-token',
                permissoes: permissoes
            }
        ),
        InfraCoreModule.forRoot(),
        InfraDataModule.forRoot(),
        InfraTemplateModule.forRoot(),
        InfraFormularioModule.forRoot()
    ],
    providers: [
        PocketChurchMenuProviderService,
        NotificacoesService,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: HttpInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: AcaoService,
            multi: true
        },
        {
            provide: API_PATH_BASE,
            useValue: environment.basePath
        },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        },
        {
            provide: DateAdapter,
            useClass: NativeDateAdapter
        },
        {
            provide: TranslateLoader,
            useExisting: IgrejasTranslateLoaderService
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput: 'DD/MM/YYYY',
                    monthYearLabel: 'MM/YYYY',
                    dateAllyLabel: 'DD/MM/YYYY',
                    monthYearAllyLabel: 'MM/YYYY'
                }
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
