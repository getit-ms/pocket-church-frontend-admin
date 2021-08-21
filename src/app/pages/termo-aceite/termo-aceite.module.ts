import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';

@NgModule({
    declarations: [EdicaoComponent],
    imports: [
        CommonModule,

        MatChipsModule,
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
                    breadcrumb: `termo_aceite.termo_aceite`,
                    tabs: [
                        {
                            label: `termo_aceite.termo_aceite`,
                            state: './'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        component: EdicaoComponent,
                        data: {
                            tabs: [
                                {
                                    label: `termo_aceite.termo_aceite`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),

    ]
})
export class TermoAceiteModule { }
