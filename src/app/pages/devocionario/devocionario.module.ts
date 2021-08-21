import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiasComponent} from './dias/dias.component';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ComponentesModule} from "../../componentes/componentes.module";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
    declarations: [DiasComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        MatChipsModule,
        InfraDataModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplatePagesModule.forChild([
            {
                path: '',
                component: TabsRouteTemplateComponent,
                data: {
                    breadcrumb: `devocionario.devocionario`,
                    tabs: [
                        {
                            label: `devocionario.devocionario`,
                            state: './'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        component: DiasComponent,
                        data: {
                            tabs: [
                                {
                                    label: `devocionario.devocionario`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class DevocionarioModule { }
