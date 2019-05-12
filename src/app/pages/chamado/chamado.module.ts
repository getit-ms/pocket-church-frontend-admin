import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { EdicaoComponent } from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {CodigoChamadoPipe} from "./codigo-chamado.pipe";

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, CodigoChamadoPipe],
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
        InfraTemplateCrudModule.forChild({
            bundleBase: 'chamado',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ]
})
export class ChamadoModule { }