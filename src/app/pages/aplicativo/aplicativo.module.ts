import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuncionalidadesComponent} from './funcionalidades/funcionalidades.component';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplatePagesModule, TabsRouteTemplateComponent} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [FuncionalidadesComponent],
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
                    breadcrumb: `aplicativo.aplicativo`,
                    tabs: [
                        {
                            label: `aplicativo.aplicativo`,
                            state: './'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        component: FuncionalidadesComponent,
                        data: {
                            tabs: [
                                {
                                    label: `aplicativo.aplicativo`
                                },
                            ]
                        }
                    },
                ]
            },
        ]),
    ]
})
export class AplicativoModule { }
