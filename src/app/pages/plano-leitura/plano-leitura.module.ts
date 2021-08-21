import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import { InputVersiculosComponent } from './input-versiculos/input-versiculos.component';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InputVersiculosComponent],
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
        InfraTemplateCrudModule.forChild({
            bundleBase: 'plano_leitura',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ]
})
export class PlanoLeituraModule { }
