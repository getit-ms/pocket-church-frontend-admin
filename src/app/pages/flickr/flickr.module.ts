import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EdicaoComponent} from './edicao/edicao.component';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InfraCoreModule} from '@gafs/infra-core';

@NgModule({
    declarations: [EdicaoComponent],
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
                    breadcrumb: `flickr.configuracoes`,
                    tabs: [
                        {
                            label: `flickr.configuracoes`,
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
                                    label: `flickr.configuracoes`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class FlickrModule { }
