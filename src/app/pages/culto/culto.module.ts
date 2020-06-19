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
                        breadcrumb: `culto.breadcrumbs.list`,
                        tabs: [
                            {
                                label: `culto.tabs.list`,
                                state: './'
                            },
                            {
                                label: `culto.tabs.create`,
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
                                        label: `culto.tabs.list`
                                    },
                                ]
                            }
                        },
                        {
                            path: 'create',
                            component: EdicaoComponent,
                            data: {
                                edicao: true,
                                breadcrumb: `culto.breadcrumbs.create`,
                                tabs: [
                                    {
                                        label: `culto.tabs.create`
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
                                        breadcrumb: `culto.breadcrumbs.inscricao`,
                                        tabs: [
                                            {
                                                label: `culto.tabs.inscricao`
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
                                        breadcrumb: `culto.breadcrumbs.detail`,
                                        tabs: [
                                            {
                                                label: `culto.tabs.detail`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'update',
                                    data: {
                                        edicao: true,
                                        breadcrumb: `culto.breadcrumbs.update`,
                                        tabs: [
                                            {
                                                label: `culto.tabs.update`
                                            },
                                        ]
                                    }
                                },
                                {
                                    path: 'copy',
                                    data: {
                                        edicao: true,
                                        copy: true,
                                        breadcrumb: `culto.breadcrumbs.copy`,
                                        tabs: [
                                            {
                                                label: `culto.tabs.copy`
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
export class CultoModule { }
