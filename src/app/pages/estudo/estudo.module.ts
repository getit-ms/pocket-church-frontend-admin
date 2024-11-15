import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatDialogModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InfraTemplateCrudModule} from "@gafs/infra-template";
import { InputCategoriaEstudoComponent } from './input-categoria-estudo/input-categoria-estudo.component';
import { ModalCategoriaEstudoComponent } from './modal-categoria-estudo/modal-categoria-estudo.component';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InputCategoriaEstudoComponent, ModalCategoriaEstudoComponent],
    imports: [
        CommonModule,

        MatDialogModule,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplateCrudModule.forChild({
            bundleBase: 'estudo',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ],
    entryComponents: [ModalCategoriaEstudoComponent]
})
export class EstudoModule { }
