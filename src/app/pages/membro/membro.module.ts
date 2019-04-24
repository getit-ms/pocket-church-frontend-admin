import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatIconModule} from '@angular/material';
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
                    breadcrumb: `membro.breadcrumbs.list`,
                    tabs: [
                        {
                            label: `membro.tabs.list`,
                            state: './'
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
                                    label: `membro.tabs.list`
                                },
                            ]
                        }
                    },
                    {
                        path: ':id',
                        component: EdicaoComponent,
                        data: {
                            edicao: true,
                            breadcrumb: `membro.breadcrumbs.update`,
                            tabs: [
                                {
                                    label: `membro.tabs.update`
                                },
                            ]
                        },
                    },
                ]
            },
        ]),
    ]
})
export class MembroModule { }
