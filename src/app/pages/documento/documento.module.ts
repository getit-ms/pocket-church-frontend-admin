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
import { InputCategoriaDocumentoComponent } from './input-categoria-documento/input-categoria-documento.component';
import { ModalCategoriaDocumentoComponent } from './modal-categoria-documento/modal-categoria-documento.component';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InputCategoriaDocumentoComponent, ModalCategoriaDocumentoComponent],
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
            bundleBase: 'documento',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ],
    entryComponents: [ModalCategoriaDocumentoComponent]
})
export class DocumentoModule { }
