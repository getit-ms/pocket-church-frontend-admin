import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatTooltipModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplatePagesModule.forChild([
            {
                path: '',
                component: TabsRouteTemplateComponent,
                data: {
                    breadcrumb: `colaborador.breadcrumbs.list`,
                    tabs: [
                        {
                            label: `colaborador.tabs.list`,
                            state: './'
                        },
                        {
                            label: `colaborador.tabs.acesso_recente`,
                            state: './acesso-recente'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        component: ConsultaComponent,
                        data: {
                            acessoRecente: false,
                            tabs: [
                                {
                                    label: `colaborador.tabs.list`
                                },
                            ]
                        }
                    },
                    {
                        path: 'acesso-recente',
                        component: ConsultaComponent,
                        data: {
                            acessoRecente: true,
                            tabs: [
                                {
                                    label: `colaborador.tabs.acesso_recente`
                                },
                            ]
                        }
                    },
                    {
                        path: ':id',
                        component: EdicaoComponent,
                        data: {
                            edicao: true,
                            breadcrumb: `colaborador.breadcrumbs.update`,
                            tabs: [
                                {
                                    label: `colaborador.tabs.update`
                                },
                            ]
                        },
                    },
                ]
            },
        ]),
    ]
})
export class ColaboradorModule { }
