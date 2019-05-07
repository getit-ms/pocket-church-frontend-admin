import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InscricoesComponent} from "./inscricoes/inscricoes.component";
import {FormInscricaoComponent} from './form-inscricao/form-inscricao.component';

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
                        breadcrumb: `ebd.breadcrumbs.list`,
                        tabs: [
                            {
                                label: `ebd.tabs.list`,
                                state: './'
                            },
                            {
                                label: `ebd.tabs.create`,
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
                                        label: `ebd.tabs.list`
                                    },
                                ]
                            }
                        },
                        {
                            path: 'create',
                            component: EdicaoComponent,
                            data: {
                                edicao: true,
                                breadcrumb: `ebd.breadcrumbs.create`,
                                tabs: [
                                    {
                                        label: `ebd.tabs.create`
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
                                        breadcrumb: `ebd.breadcrumbs.inscricao`,
                                        tabs: [
                                            {
                                                label: `ebd.tabs.inscricao`
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
                                        breadcrumb: `ebd.breadcrumbs.detail`,
                                        tabs: [
                                            {
                                                label: `ebd.tabs.detail`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'update',
                                    data: {
                                        edicao: true,
                                        breadcrumb: `ebd.breadcrumbs.update`,
                                        tabs: [
                                            {
                                                label: `ebd.tabs.update`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'copy',
                                    data: {
                                        edicao: true,
                                        copy: true,
                                        breadcrumb: `ebd.breadcrumbs.copy`,
                                        tabs: [
                                            {
                                                label: `ebd.tabs.copy`
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
export class EBDModule { }
