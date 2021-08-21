import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule, InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InscricaoEvento} from "../../api/model/inscricao-evento";
import {InscricoesComponent} from "./inscricoes/inscricoes.component";
import { FormInscricaoComponent } from './form-inscricao/form-inscricao.component';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InscricoesComponent, FormInscricaoComponent],
    imports: [
        CommonModule,

        MatTooltipModule,
        MatChipsModule,
        MatIconModule,
        MatTabsModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplatePagesModule.forChild(
            [
                {
                    path: '',
                    component: TabsRouteTemplateComponent,
                    data: {
                        breadcrumb: `evento.breadcrumbs.list`,
                        tabs: [
                            {
                                label: `evento.tabs.list`,
                                state: './'
                            },
                            {
                                label: `evento.tabs.create`,
                                state: './create'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '',
                            component: ConsultaComponent,
                            data: {
                                tabs: [
                                    {
                                        label: `evento.tabs.list`
                                    },
                                ]
                            }
                        },
                        {
                            path: 'create',
                            component: EdicaoComponent,
                            data: {
                                edicao: true,
                                breadcrumb: `evento.breadcrumbs.create`,
                                tabs: [
                                    {
                                        label: `evento.tabs.create`
                                    },
                                ]
                            }
                        },
                        {
                            path: 'inscricao',
                            children: [
                                {
                                    path: ':id',
                                    component: InscricoesComponent,
                                    data: {
                                        breadcrumb: `evento.breadcrumbs.inscricao`,
                                        tabs: [
                                            {
                                                label: `evento.tabs.inscricao`
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            path: ':id',
                            component: EdicaoComponent,
                            children: [
                                {
                                    path: 'detail',
                                    data: {
                                        edicao: false,
                                        breadcrumb: `evento.breadcrumbs.detail`,
                                        tabs: [
                                            {
                                                label: `evento.tabs.detail`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'update',
                                    data: {
                                        edicao: true,
                                        breadcrumb: `evento.breadcrumbs.update`,
                                        tabs: [
                                            {
                                                label: `evento.tabs.update`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'copy',
                                    data: {
                                        edicao: true,
                                        copy: true,
                                        breadcrumb: `evento.breadcrumbs.copy`,
                                        tabs: [
                                            {
                                                label: `evento.tabs.copy`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: '',
                                    redirectTo: 'detail',
                                    pathMatch: 'full'
                                },
                            ]
                        },
                    ]
                },
            ]
        )
    ]
})
export class EventoModule { }
