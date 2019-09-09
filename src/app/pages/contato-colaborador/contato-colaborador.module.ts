import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InfraCoreModule} from '@gafs/infra-core';
import {ConsultaComponent} from "./consulta/consulta.component";

@NgModule({
    declarations: [ConsultaComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatTooltipModule,
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
                    breadcrumb: `contato_colaborador.contatos_colaborador`,
                    tabs: [
                        {
                            label: `contato_colaborador.contatos_colaborador`,
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
                                    label: `contato_colaborador.contatos_colaborador`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class ContatoColaboradorModule { }
