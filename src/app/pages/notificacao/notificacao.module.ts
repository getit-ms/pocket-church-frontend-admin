import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnvioComponent} from './envio/envio.component';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from "@gafs/infra-template";

@NgModule({
    declarations: [EnvioComponent],
    imports: [
        CommonModule,
        InfraDataModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplatePagesModule.forChild([
            {
                path: '',
                component: TabsRouteTemplateComponent,
                data: {
                    breadcrumb: `notificacao.notificacoes`,
                    tabs: [
                        {
                            label: `notificacao.notificacoes`,
                            state: './'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        component: EnvioComponent,
                        data: {
                            tabs: [
                                {
                                    label: `notificacao.notificacoes`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class NotificacaoModule { }
