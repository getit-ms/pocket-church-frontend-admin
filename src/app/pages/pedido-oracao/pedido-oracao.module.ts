import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InfraCoreModule} from '@gafs/infra-core';
import {ConsultaComponent} from "./consulta/consulta.component";

@NgModule({
    declarations: [ConsultaComponent],
    imports: [
        CommonModule,

        MatIconModule,

        InfraCoreModule,
        InfraDataModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplatePagesModule.forChild([
            {
                path: '',
                component: TabsRouteTemplateComponent,
                data: {
                    breadcrumb: `oracao.pedidos_oracao`,
                    tabs: [
                        {
                            label: `oracao.pedidos_oracao`,
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
                                    label: `oracao.pedidos_oracao`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class PedidoOracaoModule { }
