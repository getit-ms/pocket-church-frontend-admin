import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InputLotacaoColaboradorComponent} from "./input-lotacao-colaborador/input-lotacao-colaborador.component";
import {ModalLotacaoColaboradorComponent} from "./modal-lotacao-colaborador/modal-lotacao-colaborador.component";

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, ModalLotacaoColaboradorComponent, InputLotacaoColaboradorComponent],
    entryComponents: [ModalLotacaoColaboradorComponent],
    imports: [
        CommonModule,

        MatIconModule,
        InfraDataModule,
        InfraCoreModule,
        MatTooltipModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplateCrudModule.forChild({
            bundleBase: 'contato',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ]
})
export class ContatoModule { }
